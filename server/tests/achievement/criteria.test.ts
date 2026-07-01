import { describe, expect, test } from "bun:test";
import {
	avaliarCriterio,
	avaliarCriterios,
	type CriterioDef,
	parseCriteria,
	type UserStats,
} from "../../src/modules/achievement/criteria";

const stats_base: UserStats = {
	total_disposals: 3,
	disposal_by_type: { eletrônicos: 2, pilhas: 1 },
	total_points_earned: 450,
	points_balance: 120,
	unique_pevs_count: 2,
};

describe("avaliarCriterio", () => {
	test("disposal_count — abaixo da meta", () => {
		expect(
			avaliarCriterio(
				{ descricao: "", tipo: "disposal_count", meta: 10 },
				stats_base,
			),
		).toBe(30); // 3/10
	});

	test("disposal_count — acima da meta (cap 100)", () => {
		expect(
			avaliarCriterio(
				{ descricao: "", tipo: "disposal_count", meta: 2 },
				stats_base,
			),
		).toBe(100);
	});

	test("disposal_count — zero disposal retorna 0", () => {
		const s = { ...stats_base, total_disposals: 0 };
		expect(
			avaliarCriterio({ descricao: "", tipo: "disposal_count", meta: 5 }, s),
		).toBe(0);
	});

	test("disposal_type_count — subtipo presente", () => {
		expect(
			avaliarCriterio(
				{
					descricao: "",
					tipo: "disposal_type_count",
					subtipo: "eletrônicos",
					meta: 5,
				},
				stats_base,
			),
		).toBe(40); // 2/5
	});

	test("disposal_type_count — subtipo sem descarte retorna 0", () => {
		expect(
			avaliarCriterio(
				{
					descricao: "",
					tipo: "disposal_type_count",
					subtipo: "papel",
					meta: 3,
				},
				stats_base,
			),
		).toBe(0);
	});

	test("total_points — parcial", () => {
		expect(
			avaliarCriterio(
				{ descricao: "", tipo: "total_points", meta: 1000 },
				stats_base,
			),
		).toBe(45); // 450/1000
	});

	test("total_points — exato 100%", () => {
		expect(
			avaliarCriterio(
				{ descricao: "", tipo: "total_points", meta: 450 },
				stats_base,
			),
		).toBe(100);
	});

	test("points_balance", () => {
		expect(
			avaliarCriterio(
				{ descricao: "", tipo: "points_balance", meta: 200 },
				stats_base,
			),
		).toBe(60); // 120/200
	});

	test("unique_pevs", () => {
		expect(
			avaliarCriterio(
				{ descricao: "", tipo: "unique_pevs", meta: 4 },
				stats_base,
			),
		).toBe(50); // 2/4
	});

	test("meta zero retorna null", () => {
		expect(
			avaliarCriterio(
				{ descricao: "", tipo: "disposal_count", meta: 0 },
				stats_base,
			),
		).toBeNull();
	});

	test("tipo inválido retorna null", () => {
		expect(
			avaliarCriterio(
				{ descricao: "", tipo: "invalid_type" as any, meta: 10 },
				stats_base,
			),
		).toBeNull();
	});
});

describe("avaliarCriterios", () => {
	test("média de dois critérios", () => {
		const criterios: CriterioDef[] = [
			{ descricao: "", tipo: "disposal_count", meta: 10 }, // 30%
			{ descricao: "", tipo: "total_points", meta: 500 }, // 90%
		];
		expect(avaliarCriterios(criterios, stats_base)).toBe(60); // (30+90)/2
	});

	test("array vazio retorna null", () => {
		expect(avaliarCriterios([], stats_base)).toBeNull();
	});

	test("critério com meta zero faz tudo retornar null (FE-E2)", () => {
		const criterios: CriterioDef[] = [
			{ descricao: "", tipo: "disposal_count", meta: 5 },
			{ descricao: "", tipo: "total_points", meta: 0 }, // inválido
		];
		expect(avaliarCriterios(criterios, stats_base)).toBeNull();
	});
});

describe("parseCriteria", () => {
	test("objeto único", () => {
		const raw = { tipo: "disposal_count", meta: 5, descricao: "teste" };
		const result = parseCriteria(raw);
		expect(result).toHaveLength(1);
		expect(result[0]!.tipo).toBe("disposal_count");
		expect(result[0]!.meta).toBe(5);
	});

	test("array de critérios", () => {
		const raw = [
			{ tipo: "disposal_count", meta: 10, descricao: "a" },
			{ tipo: "total_points", meta: 500, descricao: "b" },
		];
		const result = parseCriteria(raw);
		expect(result).toHaveLength(2);
	});

	test("objeto sem tipo retorna vazio", () => {
		expect(parseCriteria({ foo: "bar" })).toEqual([]);
	});

	test("null retorna vazio", () => {
		expect(parseCriteria(null)).toEqual([]);
	});

	test("{} (criteria vazio do seed antigo) retorna vazio", () => {
		expect(parseCriteria({})).toEqual([]);
	});
});
