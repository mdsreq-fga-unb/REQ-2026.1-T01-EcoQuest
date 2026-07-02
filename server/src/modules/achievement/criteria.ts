/**
 * ── Sistema de avaliação de critérios para conquistas ─────────────────────
 *
 * Cada insígnia possui um campo `criteria` (JSONB) no banco que define
 * o que o usuário precisa atingir. Este módulo avalia esses critérios
 * a partir das estatísticas do usuário e retorna o percentual de progresso.
 */

export type CriterioTipo =
	| "disposal_count"
	| "disposal_type_count"
	| "total_points"
	| "points_balance"
	| "unique_pevs";

export interface CriterioDef {
	descricao: string;
	tipo: CriterioTipo;
	meta: number;
	subtipo?: string;
}

export interface UserStats {
	total_disposals: number;
	disposal_by_type: Record<string, number>;
	total_points_earned: number;
	points_balance: number;
	unique_pevs_count: number;
}

/**
 * Avalia um critério e retorna o progresso em porcentagem (0–100).
 * Retorna `null` se não for possível calcular (FE-E2).
 */
export function avaliarCriterio(
	criterio: CriterioDef,
	stats: UserStats,
): number | null {
	if (criterio.meta <= 0) return null;

	let atual = 0;

	switch (criterio.tipo) {
		case "disposal_count":
			atual = stats.total_disposals;
			break;
		case "disposal_type_count": {
			const chave = (criterio.subtipo ?? "").toLowerCase();
			atual = stats.disposal_by_type[chave] ?? 0;
			break;
		}
		case "total_points":
			atual = stats.total_points_earned;
			break;
		case "points_balance":
			atual = stats.points_balance;
			break;
		case "unique_pevs":
			atual = stats.unique_pevs_count;
			break;
		default:
			return null;
	}

	return Math.min(100, Math.round((atual / criterio.meta) * 100));
}

/**
 * Avalia uma lista de critérios e retorna a média aritmética do progresso.
 * Se algum critério não puder ser calculado, retorna null (FE-E2).
 * Se a lista estiver vazia, retorna null.
 */
export function avaliarCriterios(
	criterios: CriterioDef[],
	stats: UserStats,
): number | null {
	if (criterios.length === 0) return null;

	const progressos: number[] = [];

	for (const c of criterios) {
		const p = avaliarCriterio(c, stats);
		if (p === null) return null;
		progressos.push(p);
	}

	const soma = progressos.reduce((acc, v) => acc + v, 0);
	return Math.min(100, Math.round(soma / progressos.length));
}

/**
 * Converte o JSONB bruto do banco para um array de CriterioDef.
 * Aceita tanto um objeto único quanto um array.
 */
export function parseCriteria(raw: unknown): CriterioDef[] {
	if (!raw || typeof raw !== "object") return [];

	if (Array.isArray(raw)) {
		return raw.flatMap((item) => parseCriteria(item));
	}

	const obj = raw as Record<string, unknown>;

	if (typeof obj.tipo === "string") {
		const criterio: CriterioDef = {
			descricao: String(obj.descricao ?? ""),
			tipo: obj.tipo as CriterioTipo,
			meta: Number(obj.meta) || 0,
			subtipo: typeof obj.subtipo === "string" ? obj.subtipo : undefined,
		};
		const tiposValidos: string[] = [
			"disposal_count",
			"disposal_type_count",
			"total_points",
			"points_balance",
			"unique_pevs",
		];
		return tiposValidos.includes(criterio.tipo) ? [criterio] : [];
	}

	return [];
}
