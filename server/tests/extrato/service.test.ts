import { beforeEach, describe, expect, mock, test } from "bun:test";
import { ErroExtratoIndisponivel } from "../../src/modules/extrato/service";

const dbMock = mock();
const obterSimulacaoMock = mock();

// Mock do banco de dados
mock.module("../../src/db", () => ({ db: dbMock }));

// Mock do módulo de simulação
mock.module("../../src/modules/simular_descarte/service", () => ({
  obterSimulacaoEmitidaPorJti: obterSimulacaoMock,
}));

const { buscarExtratoPorUsuario } =
  await import("../../src/modules/extrato/service");

describe("Extrato Service (Híbrido)", () => {
  const ID_USUARIO = 1;

  beforeEach(() => {
    dbMock.mockReset();
    obterSimulacaoMock.mockReset();
  });

  describe("buscarExtratoPorUsuario", () => {
    test("deve retornar registros formatados usando dados da simulação (Regra de Negócio / Desvio)", async () => {
      // Mock DB
      dbMock.mockResolvedValueOnce([
        {
          id: 10,
          jtiToken: "mock-jti",
          materialTipo: "ignorado-db",
          pesoKg: 10,
          nomePev: "PEV Central",
          pontosGanhos: 25,
          criadoEm: "2026-01-01T10:00:00Z",
        },
      ]);

      // Mock DB: saldo
      dbMock.mockResolvedValueOnce([{ pointsBalance: 150 }]);

      // Mock Simulação: sobrescreve dados do banco (Desvio do IF)
      obterSimulacaoMock.mockReturnValue({
        itensSelecionados: [{ nome: "Bateria", quantidade: 3 }],
        totalPesoKg: 1.5,
      });

      const extrato = await buscarExtratoPorUsuario(ID_USUARIO);

      expect(extrato.saldo).toBe(150);
      expect(extrato.saldoIndisponivel).toBe(false);
      expect(extrato.registros).toHaveLength(1);
      expect(extrato.registros[0].materialTipo).toBe("Bateria (3x)");
      expect(extrato.registros[0].pesoKg).toBe(1.5);
      expect(obterSimulacaoMock).toHaveBeenCalledWith("mock-jti");
    });

    test("deve usar o fallback do banco quando não há simulação em memória (Caixa Branca / Fallback)", async () => {
      // Mock DB: registros
      dbMock.mockResolvedValueOnce([
        {
          id: 11,
          jtiToken: "outro-jti",
          materialTipo: "TV Quebrada",
          pesoKg: 5,
          nomePev: "PEV Sul",
          pontosGanhos: 15,
          criadoEm: "2026-01-02T10:00:00Z",
        },
      ]);

      // Mock DB: saldo
      dbMock.mockResolvedValueOnce([{ pointsBalance: 30 }]);

      obterSimulacaoMock.mockReturnValue(undefined);

      const extrato = await buscarExtratoPorUsuario(ID_USUARIO);

      expect(extrato.registros[0].materialTipo).toBe("TV Quebrada");
      expect(extrato.registros[0].pesoKg).toBe(5);
    });

    test("deve lançar ErroExtratoIndisponivel se a query principal falhar (Caixa Branca / Fail Fast)", async () => {
      // Mock DB: falha na primeira query
      dbMock.mockRejectedValueOnce(new Error("Database timeout"));

      await expect(buscarExtratoPorUsuario(ID_USUARIO)).rejects.toThrow(
        ErroExtratoIndisponivel,
      );

      // Garante que não tentou buscar o saldo se os registros falharam
      expect(dbMock).toHaveBeenCalledTimes(1);
    });

    test("deve tolerar falha na query de saldo marcando saldoIndisponivel = true (Caixa Branca / Desvio)", async () => {
      // Mock DB: registro - SUCESSO
      dbMock.mockResolvedValueOnce([]);

      // Mock DB: saldo - FALHA
      dbMock.mockRejectedValueOnce(new Error("Falha no saldo"));

      const extrato = await buscarExtratoPorUsuario(ID_USUARIO);

      expect(extrato.registros).toEqual([]);
      expect(extrato.saldo).toBeNull();
      expect(extrato.saldoIndisponivel).toBe(true);

      // Garante que as 2 queries foram executadas
      expect(dbMock).toHaveBeenCalledTimes(2);
    });
  });
});
