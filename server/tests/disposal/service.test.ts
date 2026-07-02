import { beforeEach, describe, expect, mock, test } from "bun:test";

const dbMock = mock();
const obterSimulacaoEmitidaPorJtiMock = mock();

mock.module("../../src/db", () => ({
  db: dbMock,
}));

mock.module("../../src/modules/simular_descarte/service", () => ({
  obterSimulacaoEmitidaPorJti: obterSimulacaoEmitidaPorJtiMock,
}));

const service = await import("../../src/modules/disposal/service");
const { validarTokenERegistrarDescarte, ErroValidacaoDescarte } = service;

describe("Disposal Service - Validação de Token (Híbrido)", () => {
  const validUUID = "123e4567-e89b-12d3-a456-426614174000";

  beforeEach(() => {
    dbMock.mockReset();
    obterSimulacaoEmitidaPorJtiMock.mockReset();
  });

  describe("validarTokenERegistrarDescarte", () => {
    test("deve validar token com sucesso sem simulação prévia", async () => {
      obterSimulacaoEmitidaPorJtiMock.mockReturnValue(null);

      dbMock.mockResolvedValueOnce([{ disposal_id: 10, points_balance: 115 }]);

      const resultado = await validarTokenERegistrarDescarte(1, validUUID);

      expect(resultado.status).toBe("token_validado");
      expect(resultado.pointsAwarded).toBe(15); // Fallback caso não haja simulação
      expect(resultado.pointsBalanceAfter).toBe(115);
      expect(resultado.disposalId).toBe(10);
      expect(resultado.token).toBe(validUUID);

      expect(dbMock).toHaveBeenCalledTimes(1);
      expect(obterSimulacaoEmitidaPorJtiMock).toHaveBeenCalledWith(validUUID);
    });

    test("deve validar token com cálculo de pontos dinâmico via simulação", async () => {
      obterSimulacaoEmitidaPorJtiMock.mockReturnValue({
        itensSelecionados: [
          { chave: "bateria_laptop", nome: "Bateria", quantidade: 1 }, // 20 pts
          { chave: "mouse", nome: "Mouse", quantidade: 2 }, // 6 * 2 = 12 pts
        ],
        totalPesoKg: 2.5, // 2.5 * 2 = 5 pts de bônus
      });

      dbMock.mockResolvedValueOnce([
        { disposal_id: 20, points_balance: 137 }, // Total: 20 + 12 + 5 = 37 pts
      ]);

      const resultado = await validarTokenERegistrarDescarte(1, validUUID);

      expect(resultado.pointsAwarded).toBe(37);
    });

    test("deve barrar UUID mal formatado antes mesmo de ir ao banco", async () => {
      const uuidInvalido = "um-token-qualquer-nao-uuid";

      await expect(
        validarTokenERegistrarDescarte(1, uuidInvalido),
      ).rejects.toMatchObject({
        codigo: "token_invalido",
        statusCode: 400,
      });

      expect(dbMock).not.toHaveBeenCalled();
      expect(obterSimulacaoEmitidaPorJtiMock).not.toHaveBeenCalled();
    });

    test("deve lançar token_ja_utilizado quando a CTE falha e o fallback identifica uso", async () => {
      // A CTE de atualização falhou
      dbMock.mockResolvedValueOnce([]);

      // O fallback validarEstadoToken pesquisa o token para ver o porquê
      dbMock.mockResolvedValueOnce([
        {
          jti: validUUID,
          used_at: new Date(),
          expires_at: new Date(Date.now() + 10000),
        },
      ]);

      await expect(
        validarTokenERegistrarDescarte(1, validUUID),
      ).rejects.toMatchObject({
        codigo: "token_ja_utilizado",
        statusCode: 409,
      });

      // Garante que o fallback foi executado fazendo 2 requisições ao DB
      expect(dbMock).toHaveBeenCalledTimes(2);
    });

    test("deve lançar token_expirado quando o fallback identifica expiração", async () => {
      dbMock.mockResolvedValueOnce([]); // CTE falha
      dbMock.mockResolvedValueOnce([
        {
          jti: validUUID,
          used_at: null,
          expires_at: new Date(Date.now() - 10000),
        }, // Expirado no passado
      ]);

      await expect(
        validarTokenERegistrarDescarte(1, validUUID),
      ).rejects.toMatchObject({
        codigo: "token_expirado",
        statusCode: 400,
      });
    });

    test("deve lançar token_invalido quando o token sequer existe na tabela", async () => {
      dbMock.mockResolvedValueOnce([]);
      dbMock.mockResolvedValueOnce([]);

      await expect(
        validarTokenERegistrarDescarte(1, validUUID),
      ).rejects.toMatchObject({
        codigo: "token_invalido",
        statusCode: 400,
      });
    });

    test("deve encapsular falhas de banco em um erro 503 (Caixa Branca - Exceções)", async () => {
      dbMock.mockRejectedValueOnce(new Error("Conexão perdida"));

      await expect(
        validarTokenERegistrarDescarte(1, validUUID),
      ).rejects.toMatchObject({
        codigo: "falha_validacao",
        statusCode: 503,
      });
    });
  });
});
