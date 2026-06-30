import { beforeEach, describe, expect, mock, test } from "bun:test";

// ─── Mock do banco ──────────────────────────────────────────────────────────
// NOTA: mock.module com tagged templates do Bun tem limitações quanto à
// propriedade `.name` (conflito com `Function.name`). Por isso usamos um
// DbMock próprio que gerencia handlers sequenciais.

type DbCallHandler = (sql: string, params: unknown[]) => Promise<unknown[]>;

class DbMock {
	private handlers: DbCallHandler[] = [];

	reset() {
		this.handlers = [];
	}

	/** Define o handler para a PRÓXIMA chamada SQL. Retorna this para encadeamento. */
	define(handler: DbCallHandler): this {
		this.handlers.push(handler);
		return this;
	}

	/** Chamado como tagged template — delega ao primeiro handler disponível. */
	async query(
		strings: TemplateStringsArray,
		...params: unknown[]
	): Promise<unknown[]> {
		const sql = strings.reduce(
			(acc, str, i) => acc + str + (i < params.length ? `$${i + 1}` : ""),
			"",
		);
		const handler = this.handlers.shift();
		if (!handler) {
			throw new Error(
				`DbMock sem handler definido para SQL: ${sql.slice(0, 80)}...`,
			);
		}
		return handler(sql, params);
	}
}

const dbMock = new DbMock();

// Substitui o módulo do banco — usamos uma função simples que o
// tagged template do Bun consegue invocar sem processamento interno.
const dbFn = mock(
	(strings: TemplateStringsArray | string, ...params: unknown[]) => {
		if (Array.isArray(strings)) {
			return dbMock.query(strings as TemplateStringsArray, ...params);
		}
		return dbMock.query(
			[strings as string] as unknown as TemplateStringsArray,
			...params,
		);
	},
);

mock.module("../../src/db", () => ({
	db: dbFn,
}));

const service = await import("../../src/modules/reward/service");

const {
	listarRecompensas,
	buscarRecompensaPorId,
	resgatarRecompensa,
	ErroRecompensaIndisponivel,
	ErroSaldoInsuficiente,
	ErroFalhaGeracaoCupom,
	ErroFalhaDebitoPosCupom,
} = service;

// ─── Helpers ────────────────────────────────────────────────────────────────

function recompensaDB(overrides: Record<string, unknown> = {}) {
	return {
		id: 1,
		name: "10% OFF em eletrônicos",
		description: "Cupom de 10% de desconto",
		tipo: "COUPON",
		custoPontos: 500,
		stock: 10,
		parceiro: "Amazon",
		ativo: true,
		...overrides,
	};
}

function usuarioDB(overrides: Record<string, unknown> = {}) {
	return {
		pointsBalance: 1000,
		...overrides,
	};
}

// ─── Testes ─────────────────────────────────────────────────────────────────

describe("Reward Service — listarRecompensas", () => {
	beforeEach(() => {
		dbMock.reset();
	});

	test("retorna lista de recompensas ativas", async () => {
		dbMock.define(() =>
			Promise.resolve([
				recompensaDB({ id: 1, name: "Cupom A", parceiro: "Loja X" }),
				recompensaDB({ id: 2, name: "Cupom B", parceiro: "Loja Y" }),
			]),
		);

		const resultado = await listarRecompensas();

		expect(resultado).toHaveLength(2);
		expect(resultado[0]!.nome).toBe("Cupom A");
		expect(resultado[1]!.nome).toBe("Cupom B");
	});

	test("retorna lista vazia quando não há recompensas", async () => {
		dbMock.define(() => Promise.resolve([]));

		const resultado = await listarRecompensas();

		expect(resultado).toHaveLength(0);
	});

	test("retorna null para estoque ilimitado", async () => {
		dbMock.define(() => Promise.resolve([recompensaDB({ stock: null })]));

		const resultado = await listarRecompensas();

		expect(resultado[0]!.estoque).toBeNull();
	});

	test("mapeia campos corretamente", async () => {
		dbMock.define(() => Promise.resolve([recompensaDB()]));

		const resultado = await listarRecompensas();

		expect(resultado[0]).toEqual({
			id: 1,
			nome: "10% OFF em eletrônicos",
			descricao: "Cupom de 10% de desconto",
			tipo: "COUPON",
			custoPontos: 500,
			estoque: 10,
			parceiro: "Amazon",
			ativo: true,
		});
	});
});

describe("Reward Service — buscarRecompensaPorId", () => {
	beforeEach(() => {
		dbMock.reset();
	});

	test("retorna recompensa quando encontrada", async () => {
		dbMock.define(() => Promise.resolve([recompensaDB()]));

		const resultado = await buscarRecompensaPorId(1);

		expect(resultado).not.toBeNull();
		expect(resultado!.id).toBe(1);
		if (resultado) {
			expect(resultado.nome).toBe("10% OFF em eletrônicos");
			expect(resultado.descricao).toBe("Cupom de 10% de desconto");
			expect(resultado.tipo).toBe("COUPON");
			expect(resultado.custoPontos).toBe(500);
			expect(resultado.parceiro).toBe("Amazon");
			expect(resultado.ativo).toBe(true);
		}
	});

	test("retorna null quando recompensa não existe", async () => {
		dbMock.define(() => Promise.resolve([]));

		const resultado = await buscarRecompensaPorId(999);

		expect(resultado).toBeNull();
	});
});

describe("Reward Service — resgatarRecompensa", () => {
	beforeEach(() => {
		dbMock.reset();
	});

	// ── Fluxo Principal ──────────────────────────────────────────────────

	test("resgata recompensa com sucesso", async () => {
		dbMock
			// 1: buscarRecompensaPorId
			.define(() => Promise.resolve([recompensaDB()]))
			// 2: consulta saldo
			.define(() => Promise.resolve([usuarioDB({ pointsBalance: 1000 })]))
			// 3: CTE de redenção (sucesso)
			.define(() =>
				Promise.resolve([
					{
						redemptionId: 42,
						code: "ECO-ABC12345",
						custoPontos: 500,
						criadoEm: "2026-06-30T10:00:00.000Z",
						expiraEm: null,
						saldoApos: 500,
					},
				]),
			);

		const resultado = await resgatarRecompensa(1001, 1);

		expect(resultado).toEqual({
			id: 42,
			idRecompensa: 1,
			codigo: "ECO-ABC12345",
			custoPontos: 500,
			saldoApos: 500,
			criadoEm: new Date("2026-06-30T10:00:00.000Z"),
			expiraEm: null,
		});
	});

	// ── RN1 / RN13 — Recompensa inexistente ou inativa ──────────────────

	test("lança ErroRecompensaIndisponivel quando recompensa não existe", async () => {
		dbMock.define(() => Promise.resolve([]));

		await expect(resgatarRecompensa(1001, 999)).rejects.toBeInstanceOf(
			ErroRecompensaIndisponivel,
		);
	});

	test("lança ErroRecompensaIndisponivel quando recompensa está inativa", async () => {
		dbMock.define(() => Promise.resolve([recompensaDB({ ativo: false })]));

		await expect(resgatarRecompensa(1001, 1)).rejects.toBeInstanceOf(
			ErroRecompensaIndisponivel,
		);
	});

	// ── FE-E3 — Recompensa esgotada ─────────────────────────────────────

	test("lança ErroRecompensaIndisponivel quando estoque é zero", async () => {
		dbMock.define(() => Promise.resolve([recompensaDB({ stock: 0 })]));

		await expect(resgatarRecompensa(1001, 1)).rejects.toBeInstanceOf(
			ErroRecompensaIndisponivel,
		);
	});

	test("lança ErroRecompensaIndisponivel quando estoque é negativo", async () => {
		dbMock.define(() => Promise.resolve([recompensaDB({ stock: -1 })]));

		await expect(resgatarRecompensa(1001, 1)).rejects.toBeInstanceOf(
			ErroRecompensaIndisponivel,
		);
	});

	test("permite resgate quando estoque é ilimitado (null)", async () => {
		dbMock
			.define(() => Promise.resolve([recompensaDB({ stock: null })]))
			.define(() => Promise.resolve([usuarioDB({ pointsBalance: 1000 })]))
			.define(() =>
				Promise.resolve([
					{
						redemptionId: 43,
						code: "ECO-DEF67890",
						custoPontos: 500,
						criadoEm: "2026-06-30T10:00:00.000Z",
						expiraEm: null,
						saldoApos: 500,
					},
				]),
			);

		const resultado = await resgatarRecompensa(1001, 1);

		expect(resultado.saldoApos).toBe(500);
	});

	// ── FA-4A — Saldo insuficiente ──────────────────────────────────────

	test("lança ErroSaldoInsuficiente quando saldo é menor que o custo", async () => {
		dbMock
			.define(() => Promise.resolve([recompensaDB({ custoPontos: 500 })]))
			.define(() => Promise.resolve([usuarioDB({ pointsBalance: 100 })]));

		try {
			await resgatarRecompensa(1001, 1);
			expect.unreachable("Deveria ter lançado erro");
		} catch (err) {
			expect(err).toBeInstanceOf(ErroSaldoInsuficiente);
			if (err instanceof ErroSaldoInsuficiente) {
				expect(err.saldoAtual).toBe(100);
				expect(err.custoNecessario).toBe(500);
			}
		}
	});

	test("saldo igual ao custo permite resgate", async () => {
		// RN5: "saldo igual ou superior" — igual deve passar
		dbMock
			.define(() => Promise.resolve([recompensaDB({ custoPontos: 500 })]))
			.define(() => Promise.resolve([usuarioDB({ pointsBalance: 500 })]))
			.define(() =>
				Promise.resolve([
					{
						redemptionId: 44,
						code: "ECO-GHI12345",
						custoPontos: 500,
						criadoEm: "2026-06-30T10:00:00.000Z",
						expiraEm: null,
						saldoApos: 0,
					},
				]),
			);

		const resultado = await resgatarRecompensa(1001, 1);

		expect(resultado.saldoApos).toBe(0);
	});

	// ── FE-E2 — Falha na geração do cupom ───────────────────────────────

	test("lança ErroFalhaGeracaoCupom quando a CTE retorna vazio sem redenção criada", async () => {
		dbMock
			.define(() => Promise.resolve([recompensaDB()]))
			.define(() => Promise.resolve([usuarioDB({ pointsBalance: 1000 })]))
			// CTE retorna vazio
			.define(() => Promise.resolve([]))
			// Verifica se redenção foi criada (não foi)
			.define(() => Promise.resolve([]));

		await expect(resgatarRecompensa(1001, 1)).rejects.toBeInstanceOf(
			ErroFalhaGeracaoCupom,
		);
	});

	test("lança ErroFalhaGeracaoCupom quando ocorre erro inesperado no banco", async () => {
		dbMock
			.define(() => Promise.resolve([recompensaDB()]))
			.define(() => Promise.resolve([usuarioDB({ pointsBalance: 1000 })]))
			.define(() => Promise.reject(new Error("conexão perdida")));

		await expect(resgatarRecompensa(1001, 1)).rejects.toBeInstanceOf(
			ErroFalhaGeracaoCupom,
		);
	});

	// ── FE-E1 — Falha ao debitar pontos após geração do cupom ───────────

	test("lança ErroFalhaDebitoPosCupom e faz rollback quando cupom foi gerado mas débito falhou", async () => {
		dbMock
			.define(() => Promise.resolve([recompensaDB({ stock: 5 })]))
			.define(() => Promise.resolve([usuarioDB({ pointsBalance: 1000 })]))
			// CTE retorna vazio (débito falhou)
			.define(() => Promise.resolve([]))
			// Verifica se redenção existe → sim
			.define(() => Promise.resolve([{ id: 42 }]))
			// Rollback: cancela redenção
			.define(() => Promise.resolve(undefined))
			// Rollback: restaura estoque
			.define(() => Promise.resolve(undefined));

		await expect(resgatarRecompensa(1001, 1)).rejects.toBeInstanceOf(
			ErroFalhaDebitoPosCupom,
		);
	});

	test("rollback restaura estoque quando recompensa tem estoque finito", async () => {
		const chamadas: string[] = [];

		dbMock
			.define(() => {
				chamadas.push("recompensa");
				return Promise.resolve([recompensaDB({ stock: 5 })]);
			})
			.define(() => {
				chamadas.push("saldo");
				return Promise.resolve([usuarioDB({ pointsBalance: 1000 })]);
			})
			.define(() => {
				chamadas.push("cte");
				return Promise.resolve([]);
			})
			.define(() => {
				chamadas.push("verifica-redencao");
				return Promise.resolve([{ id: 42 }]);
			})
			.define(() => {
				chamadas.push("cancela");
				return Promise.resolve(undefined);
			})
			.define(() => {
				chamadas.push("restaura-estoque");
				return Promise.resolve(undefined);
			});

		try {
			await resgatarRecompensa(1001, 1);
		} catch (err) {
			expect(err).toBeInstanceOf(ErroFalhaDebitoPosCupom);
		}

		expect(chamadas).toContain("restaura-estoque");
	});

	// ─── Usuário não encontrado ─────────────────────────────────────────

	test("lança ErroRecompensaIndisponivel quando usuário não existe", async () => {
		dbMock
			.define(() => Promise.resolve([recompensaDB()]))
			.define(() => Promise.resolve([]));

		await expect(resgatarRecompensa(99999, 1)).rejects.toBeInstanceOf(
			ErroRecompensaIndisponivel,
		);
	});
});
