import { beforeEach, describe, expect, mock, test } from "bun:test";

const dbMock = mock();

// Mock do módulo do banco
mock.module("../../src/db", () => ({
  db: dbMock,
}));

// Importa o service somente depois do mock
const service = await import("../../src/modules/auth/service");

const {
  emailJaCadastrado,
  cpfJaCadastrado,
  criarUsuario,
  autenticarUsuario,
  ErroPersistenciaCadastro,
  ErroAutenticacaoIndisponivel,
  ErroConsentimentoObrigatorio,
  LIMITE_TENTATIVAS_LOGIN,
} = service;

function usuarioBase(overrides: Record<string, unknown> = {}) {
  return {
    id: 1,
    nome: "João",
    email: "joao@email.com",
    cpf: "123",
    telefone: "61999999999",
    passwordHash: "hash",
    pointsBalance: 0,
    pointsTotalEarned: 0,
    status: "ACTIVE",
    failedLoginAttempts: 0,
    lockedUntil: null,
    ...overrides,
  };
}

describe("Auth Service", () => {
  beforeEach(() => {
    dbMock.mockReset();
  });

  describe("emailJaCadastrado", () => {
    test("retorna true quando email existe", async () => {
      dbMock.mockResolvedValue([{ id: 1 }]);

      expect(await emailJaCadastrado("teste@email.com")).toBe(true);
    });

    test("retorna false quando email não existe", async () => {
      dbMock.mockResolvedValue([]);

      expect(await emailJaCadastrado("teste@email.com")).toBe(false);
    });

    test("lança erro de persistência", async () => {
      dbMock.mockRejectedValue(new Error("falha"));

      await expect(emailJaCadastrado("teste@email.com")).rejects.toBeInstanceOf(
        ErroPersistenciaCadastro,
      );
    });
  });

  describe("cpfJaCadastrado", () => {
    test("retorna true quando CPF existe", async () => {
      dbMock.mockResolvedValue([{ id: 1 }]);

      expect(await cpfJaCadastrado("123")).toBe(true);
    });

    test("retorna false quando CPF não existe", async () => {
      dbMock.mockResolvedValue([]);

      expect(await cpfJaCadastrado("123")).toBe(false);
    });

    test("lança erro de persistência", async () => {
      dbMock.mockRejectedValue(new Error("falha"));

      await expect(cpfJaCadastrado("123")).rejects.toBeInstanceOf(
        ErroPersistenciaCadastro,
      );
    });
  });

  describe("criarUsuario", () => {
    test("cria usuário com sucesso quando os termos são aceitos (RN18)", async () => {
      const hashMock = mock().mockResolvedValue("hash");

      Bun.password.hash = hashMock as any;

      dbMock.mockResolvedValue([
        {
          id: 1,
          nome: "João",
          email: "joao@email.com",
          cpf: "123",
          telefone: "61999999999",
          pointsBalance: 0,
          pointsTotalEarned: 0,
        },
      ]);

      const usuario = await criarUsuario({
        nome: "João",
        email: "joao@email.com",
        cpf: "123",
        telefone: "61999999999",
        senha: "123456",
        termosAceitos: true,
      });

      expect(usuario).toEqual({
        id: 1,
        nome: "João",
        email: "joao@email.com",
        cpf: "123",
        telefone: "61999999999",
        pointsBalance: 0,
        pointsTotalEarned: 0,
      });

      expect(hashMock).toHaveBeenCalledTimes(1);

      expect(hashMock).toHaveBeenCalledWith("123456", {
        algorithm: "bcrypt",
        cost: 12,
      });
    });

    test("lança erro quando insert falha", async () => {
      Bun.password.hash = mock().mockResolvedValue("hash") as any;

      dbMock.mockRejectedValue(new Error("falha"));

      await expect(
        criarUsuario({
          nome: "João",
          email: "joao@email.com",
          cpf: "123",
          telefone: "61999999999",
          senha: "123456",
          termosAceitos: true,
        }),
      ).rejects.toBeInstanceOf(ErroPersistenciaCadastro);
    });

    test("lança ErroConsentimentoObrigatorio quando os termos não são aceitos (FE-E4/RN18)", async () => {
      Bun.password.hash = mock().mockResolvedValue("hash") as any;

      await expect(
        criarUsuario({
          nome: "João",
          email: "joao@email.com",
          cpf: "123",
          telefone: "61999999999",
          senha: "123456",
          termosAceitos: false,
        }),
      ).rejects.toBeInstanceOf(ErroConsentimentoObrigatorio);

      expect(dbMock).not.toHaveBeenCalled();
    });
  });

  describe("autenticarUsuario", () => {
    test("autentica usuário corretamente e zera tentativas anteriores", async () => {
      dbMock.mockResolvedValueOnce([usuarioBase()]).mockResolvedValueOnce([]);

      const verifyMock = mock().mockResolvedValue(true);

      Bun.password.verify = verifyMock as any;

      const resultado = await autenticarUsuario("joao@email.com", "123456");

      expect(resultado.status).toBe("ok");

      expect(verifyMock).toHaveBeenCalledTimes(1);

      expect(verifyMock).toHaveBeenCalledWith("123456", "hash");

      if (resultado.status === "ok") {
        expect(resultado.usuario).toEqual({
          id: 1,
          nome: "João",
          email: "joao@email.com",
          cpf: "123",
          telefone: "61999999999",
          pointsBalance: 0,
          pointsTotalEarned: 0,
        });
      }

      expect(dbMock).toHaveBeenCalledTimes(2);
    });

    test("retorna usuario_nao_encontrado", async () => {
      dbMock.mockResolvedValue([]);

      const resultado = await autenticarUsuario("teste@email.com", "123456");

      expect(resultado).toEqual({
        status: "usuario_nao_encontrado",
      });
    });

    test("retorna senha_invalida com contagem de tentativas restantes (RN15)", async () => {
      dbMock
        .mockResolvedValueOnce([usuarioBase({ failedLoginAttempts: 0 })])
        .mockResolvedValueOnce([]);

      const verifyMock = mock().mockResolvedValue(false);

      Bun.password.verify = verifyMock as any;

      const resultado = await autenticarUsuario(
        "joao@email.com",
        "senhaErrada",
      );

      expect(resultado).toEqual({
        status: "senha_invalida",
        tentativasRestantes: LIMITE_TENTATIVAS_LOGIN - 1,
      });

      expect(verifyMock).toHaveBeenCalledTimes(1);

      expect(verifyMock).toHaveBeenCalledWith("senhaErrada", "hash");
    });

    test("bloqueia a conta ao atingir o limite de tentativas inválidas (RN15/FE-E3)", async () => {
      dbMock
        .mockResolvedValueOnce([
          usuarioBase({ failedLoginAttempts: LIMITE_TENTATIVAS_LOGIN - 1 }),
        ])
        .mockResolvedValueOnce([]);

      Bun.password.verify = mock().mockResolvedValue(false) as any;

      const resultado = await autenticarUsuario(
        "joao@email.com",
        "senhaErrada",
      );

      expect(resultado.status).toBe("conta_bloqueada");
      if (resultado.status === "conta_bloqueada") {
        expect(resultado.bloqueadaAte.getTime()).toBeGreaterThan(Date.now());
      }
    });

    test("impede login enquanto o bloqueio temporário estiver vigente (RN15/FE-E3)", async () => {
      const bloqueadaAte = new Date(Date.now() + 5 * 60 * 1000);
      dbMock.mockResolvedValueOnce([
        usuarioBase({ lockedUntil: bloqueadaAte.toISOString() }),
      ]);

      const verifyMock = mock().mockResolvedValue(true);
      Bun.password.verify = verifyMock as any;

      const resultado = await autenticarUsuario("joao@email.com", "123456");

      expect(resultado.status).toBe("conta_bloqueada");
      expect(verifyMock).not.toHaveBeenCalled();
    });

    test("impede login de conta inativa/bloqueada administrativamente (FE-E4)", async () => {
      dbMock.mockResolvedValueOnce([usuarioBase({ status: "INACTIVE" })]);

      const verifyMock = mock().mockResolvedValue(true);
      Bun.password.verify = verifyMock as any;

      const resultado = await autenticarUsuario("joao@email.com", "123456");

      expect(resultado).toEqual({ status: "conta_inativa" });
      expect(verifyMock).not.toHaveBeenCalled();
    });

    test("lança erro quando banco falha", async () => {
      dbMock.mockRejectedValue(new Error("falha"));

      await expect(
        autenticarUsuario("teste@email.com", "123456"),
      ).rejects.toBeInstanceOf(ErroAutenticacaoIndisponivel);
    });
  });
  test("lança ErroAutenticacaoIndisponivel quando falha ao resetar tentativas no login de sucesso (Caixa Branca / Try-Catch - Linha 173)", async () => {
    dbMock
      .mockResolvedValueOnce([usuarioBase()])
      .mockRejectedValueOnce(new Error("Timeout no UPDATE do banco"));

    const verifyMock = mock().mockResolvedValue(true);
    Bun.password.verify = verifyMock as any;

    await expect(
      autenticarUsuario("joao@email.com", "123456"),
    ).rejects.toBeInstanceOf(ErroAutenticacaoIndisponivel);
  });

  test("lança ErroAutenticacaoIndisponivel quando falha ao aplicar o bloqueio no limite de tentativas (Caixa Branca / Try-Catch - Linha 196)", async () => {
    dbMock
      .mockResolvedValueOnce([
        usuarioBase({ failedLoginAttempts: LIMITE_TENTATIVAS_LOGIN - 1 }),
      ])
      .mockRejectedValueOnce(new Error("Timeout no UPDATE de bloqueio"));

    const verifyMock = mock().mockResolvedValue(false);
    Bun.password.verify = verifyMock as any;

    await expect(
      autenticarUsuario("joao@email.com", "senhaErrada"),
    ).rejects.toBeInstanceOf(ErroAutenticacaoIndisponivel);
  });
});
