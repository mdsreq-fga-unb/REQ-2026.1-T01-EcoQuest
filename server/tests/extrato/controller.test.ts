import { beforeEach, describe, expect, mock, test } from "bun:test";
import { ErroExtratoIndisponivel } from "../../src/modules/extrato/service";

const buscarExtratoPorUsuarioMock = mock();
const obterSessaoMock = mock();

// Mock do extrato
mock.module("../../src/modules/extrato/service", () => ({
  buscarExtratoPorUsuario: buscarExtratoPorUsuarioMock,
  ErroExtratoIndisponivel: ErroExtratoIndisponivel,
}));

// Mock
mock.module("../../src/plugins/session", () => {
  const { Elysia } = require("elysia");
  return {
    sessionPlugin: new Elysia({ name: "session" })
      .derive(async () => {
        return { sessaoAtual: await obterSessaoMock() };
      })
      .macro({
        auth: {
          async resolve() {
            const sessao = await obterSessaoMock();
            return { sessao };
          },
        },
      }),
  };
});

const { extratoController } =
  await import("../../src/modules/extrato/controller");

describe("Extrato Controller (Híbrido)", () => {
  beforeEach(() => {
    buscarExtratoPorUsuarioMock.mockReset();
    obterSessaoMock.mockReset();
  });

  describe("GET /", () => {
    test("deve redirecionar para login caso o usuário não tenha sessão", async () => {
      obterSessaoMock.mockResolvedValue(null);

      const req = new Request("http://localhost/");
      const res = await extratoController.handle(req);

      expect(res.status).toBe(302);
      expect(res.headers.get("Location")).toBe("/auth/login");
    });

    test("deve renderizar o ExtratoView corretamente", async () => {
      obterSessaoMock.mockResolvedValue({ id: 1, nome: "Alice" });
      buscarExtratoPorUsuarioMock.mockResolvedValue({
        registros: [],
        saldo: 100,
        saldoIndisponivel: false,
      });

      const req = new Request("http://localhost/", {
        headers: { cookie: "eq_session=dummy" },
      });
      const res = await extratoController.handle(req);
      const html = await res.text();

      expect(res.status).toBe(200);
      expect(html).toContain("100 pts");
      expect(html).toContain("Extrato");
      expect(buscarExtratoPorUsuarioMock).toHaveBeenCalledWith(1);
    });

    test("deve interceptar ErroExtratoIndisponivel e renderizar mensagem 503", async () => {
      obterSessaoMock.mockResolvedValue({ id: 1, nome: "Alice" });

      // Força o erro do if (err instanceof ErroExtratoIndisponivel)
      buscarExtratoPorUsuarioMock.mockRejectedValue(
        new ErroExtratoIndisponivel(),
      );

      const req = new Request("http://localhost/", {
        headers: { cookie: "eq_session=dummy" },
      });
      const res = await extratoController.handle(req);
      const html = await res.text();

      expect(res.status).toBe(503);
      expect(html).toContain(
        "Não foi possível carregar o extrato. Tente novamente mais tarde.",
      );
    });

    test("deve relançar (throw) qualquer outro erro não mapeado para ser tratado pelo framework", async () => {
      obterSessaoMock.mockResolvedValue({ id: 1, nome: "Alice" });

      // Força um erro genérico
      buscarExtratoPorUsuarioMock.mockRejectedValue(
        new Error("Generic Server Error"),
      );

      const req = new Request("http://localhost/", {
        headers: { cookie: "eq_session=dummy" },
      });

      // Captura erros não tratados globalmente e converte para 500,
      const res = await extratoController.handle(req);
      expect(res.status).toBe(500);
    });
  });
});
