import { beforeEach, describe, expect, mock, test } from "bun:test";

const buscarRankingMock = mock();
const obterSessaoMock = mock();

// Mock do service de ranking
mock.module("../../src/modules/ranking/service", () => ({
	buscarRanking: buscarRankingMock,
	ErroAnonimato: class ErroAnonimato extends Error {},
	ErroRankingIndisponivel: class ErroRankingIndisponivel extends Error {}
}));

// Mock do lib de sessão para bypassar JWT real
mock.module("../../lib/session", () => {
	return {
		obterSessao: obterSessaoMock
	};
});

// Importa o controller após aplicar os mocks
const { rankingController } = await import("../../src/modules/ranking/controller");
const { ErroAnonimato, ErroRankingIndisponivel } = await import("../../src/modules/ranking/service");

describe("Ranking Controller", () => {
	beforeEach(() => {
		buscarRankingMock.mockReset();
		obterSessaoMock.mockReset();
	});

	test("deve redirecionar para /auth/login se não houver sessão", async () => {
		obterSessaoMock.mockResolvedValue(null);

		const req = new Request("http://localhost/ranking");
		const res = await rankingController.handle(req);

		expect(res.status).toBe(302);
		expect(res.headers.get("Location")).toBe("/auth/login");
		expect(buscarRankingMock).not.toHaveBeenCalled();
	});

	test("deve renderizar RankingView corretamente com sessão válida", async () => {
		obterSessaoMock.mockResolvedValue({ id: 1, nome: "Alice" });
		
		const resultadoMock = {
			top20: [{ posicao: 1, nome: "Alice", pontuacao: 100, insigniaMaisRecente: null, ehUsuarioAtual: true }],
			posicaoUsuario: { posicao: 1, nome: "Alice", pontuacao: 100, insigniaMaisRecente: null }
		};

		buscarRankingMock.mockResolvedValue(resultadoMock);

		const req = new Request("http://localhost/ranking", {
			headers: { "cookie": "eq_session=dummy" }
		});
		
		const res = await rankingController.handle(req);
		const html = await res.text();

		expect(res.status).toBe(200);
		// HTML element asserting: ensure the component renders the name or some expected part of the view
		expect(html).toContain("Alice");
		expect(buscarRankingMock).toHaveBeenCalledTimes(1);
		expect(buscarRankingMock).toHaveBeenCalledWith(1);
	});

	test("deve retornar 503 com mensagem se lançar ErroAnonimato", async () => {
		obterSessaoMock.mockResolvedValue({ id: 1, nome: "Alice" });
		
		buscarRankingMock.mockRejectedValue(new ErroAnonimato("Erro simulado anonimato"));

		const req = new Request("http://localhost/ranking", {
			headers: { "cookie": "eq_session=dummy" }
		});
		
		const res = await rankingController.handle(req);
		const html = await res.text();

		expect(res.status).toBe(503);
		expect(html).toContain("Erro simulado anonimato");
	});

	test("deve retornar 503 com mensagem se lançar ErroRankingIndisponivel", async () => {
		obterSessaoMock.mockResolvedValue({ id: 1, nome: "Alice" });
		
		buscarRankingMock.mockRejectedValue(new ErroRankingIndisponivel("Erro simulado DB"));

		const req = new Request("http://localhost/ranking", {
			headers: { "cookie": "eq_session=dummy" }
		});
		
		const res = await rankingController.handle(req);
		const html = await res.text();

		expect(res.status).toBe(503);
		expect(html).toContain("Erro simulado DB");
	});

	test("deve repassar outros erros genéricos", async () => {
		obterSessaoMock.mockResolvedValue({ id: 1, nome: "Alice" });
		
		buscarRankingMock.mockRejectedValue(new Error("Erro interno bizarro"));

		const req = new Request("http://localhost/ranking", {
			headers: { "cookie": "eq_session=dummy" }
		});
		
		const res = await rankingController.handle(req);
		expect(res.status).toBe(500);
	});
});
