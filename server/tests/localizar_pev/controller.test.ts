import { beforeEach, describe, expect, mock, test } from "bun:test";

const obterSessaoMock = mock();
const dbMock = mock();

// Mock do banco de dados
mock.module("../../src/db", () => ({
  db: dbMock,
}));

// Mock do plugin de sessão para forçar o retorno na injeção do Elysia
mock.module("../../src/plugins/session", () => {
	const { Elysia } = require("elysia");
	return {
		sessionPlugin: new Elysia({ name: "session" }).derive(async () => {
			return {
				// Retorna o valor atual do mock aguardando a promise
				sessaoAtual: await obterSessaoMock(),
			};
		})
	};
});

const { localizarPevController } =
  await import("../../src/modules/localizar_pev/controller");

describe("Localizar PEVs Controller (Híbrido)", () => {
  beforeEach(() => {
    obterSessaoMock.mockReset();
    dbMock.mockReset();
  });

  describe("GET /api/pins (API de Markers)", () => {
    test("deve retornar a lista de PEVs corretamente configurados (Caixa Preta)", async () => {
      const mockPevs = [
        { name: "PEV Gama", lat: -15.1, lng: -48.1 },
        { name: "PEV Taguatinga", lat: -15.2, lng: -48.2 },
      ];
      dbMock.mockResolvedValueOnce(mockPevs);

      const req = new Request("http://localhost/api/pins");
      const res = await localizarPevController.handle(req);

      expect(res.status).toBe(200);
      const json = await res.json();

      expect(json).toEqual(mockPevs);
      expect(dbMock).toHaveBeenCalledTimes(1);
    });

    test("deve retornar array vazio se não houver PEVs cadastrados (Caixa Branca)", async () => {
      dbMock.mockResolvedValueOnce([]);

      const req = new Request("http://localhost/api/pins");
      const res = await localizarPevController.handle(req);
      const json = await res.json();

      expect(res.status).toBe(200);
      expect(json).toEqual([]);
    });

    test("deve repassar o erro (status 500 pelo Elysia) caso a consulta ao banco falhe (Caixa Branca/Exceção)", async () => {
      dbMock.mockRejectedValueOnce(new Error("Banco de dados inacessível"));

      const req = new Request("http://localhost/api/pins");
      const res = await localizarPevController.handle(req);

      // Intercepta a falha e converte para HTTP 500
      expect(res.status).toBe(500);
      expect(dbMock).toHaveBeenCalledTimes(1);
    });
  });
});
