import { db } from "../../db";
import {
	avaliarCriterios,
	parseCriteria,
	type UserStats,
} from "./criteria";

export interface PremioConquista {
	nome: string;
	descricao: string;
	idRecompensa: number | null;
	custoPontos: number;
	jaResgatado: boolean;
	codigoCupom: string | null;
}

export type EstadoConquista = "obtida" | "bloqueada";

export interface Conquista {
	id: number | string;
	nome: string;
	criterio: string;
	progresso: number | null;
	estado: EstadoConquista;
	premios: PremioConquista[];
}

export interface VitrineConquistas {
	conquistas: Conquista[];
	fonte: "banco" | "mock";
}

interface LinhaConquista {
	id: number | string;
	nome: string;
	descricao: string;
	criteria: unknown;
	desbloqueada: boolean;
	premios: unknown;
}

export class ErroVitrineIndisponivel extends Error {
	constructor(causa?: unknown) {
		super(
			"A vitrine de conquistas está temporariamente indisponível. Tente novamente.",
		);
		this.name = "ErroVitrineIndisponivel";
		if (causa instanceof Error) this.cause = causa;
	}
}

function obterTextoCriterio(criteria: unknown, fallback: string): string {
	if (!criteria || typeof criteria !== "object") return fallback;

	// Se for array, pega a descricao do primeiro item
	const lista = Array.isArray(criteria) ? criteria : [criteria];
	for (const item of lista) {
		if (item && typeof item === "object") {
			const d = (item as Record<string, unknown>).descricao;
			if (typeof d === "string" && d.trim()) return d.trim();
		}
	}
	return fallback;
}

async function buscarStatsUsuario(idUsuario: number): Promise<UserStats> {
	const [[totalRow], typeRows, [pevRow], [pointRow]] = await Promise.all([
		db`SELECT COUNT(*)::int AS total FROM disposal WHERE id_user = ${idUsuario}`,
		db`
			SELECT COALESCE(material_type, 'outros') AS tipo, COUNT(*)::int AS qtd
			FROM disposal
			WHERE id_user = ${idUsuario}
			GROUP BY material_type
		`,
		db`
			SELECT COUNT(DISTINCT id_pev)::int AS total
			FROM disposal
			WHERE id_user = ${idUsuario}
		`,
		db`
			SELECT points_balance::int, points_total_earned::int
			FROM "user"
			WHERE id = ${idUsuario}
		`,
	]);

	const total_disposals = Number((totalRow as any)?.total ?? 0);
	const disposal_by_type: Record<string, number> = {};
	for (const r of typeRows as any[]) {
		disposal_by_type[String(r.tipo).toLowerCase()] = Number(r.qtd);
	}
	const unique_pevs_count = Number((pevRow as any)?.total ?? 0);
	const points_balance = Number((pointRow as any)?.points_balance ?? 0);
	const total_points_earned = Number((pointRow as any)?.points_total_earned ?? 0);

	return {
		total_disposals,
		disposal_by_type,
		total_points_earned,
		points_balance,
		unique_pevs_count,
	};
}

export async function buscarVitrinePorUsuario(
	idUsuario: number,
): Promise<VitrineConquistas> {
	try {
		const [rows, stats] = await Promise.all([
			db`
				SELECT
					i.id,
					i.name AS nome,
					i.description AS descricao,
					i.criteria,
					(ui.id_user IS NOT NULL) AS desbloqueada,
					COALESCE(
						json_agg(
							json_build_object(
								'nome', rw.name,
								'descricao', rw.description,
								'idRecompensa', rw.id,
								'custoPontos', rw.points_cost,
								'jaResgatado', (rr.id IS NOT NULL),
							'codigoCupom', rr.code
							)
							ORDER BY rw.id
						) FILTER (WHERE rw.id IS NOT NULL),
						'[]'::json
					) AS premios
				FROM insignia i
				LEFT JOIN user_insignia ui
					ON ui.id_insignia = i.id
					AND ui.id_user = ${idUsuario}
				LEFT JOIN insignia_reward ir
					ON ir.id_insignia = i.id
				LEFT JOIN reward rw
					ON rw.id = ir.id_reward
				LEFT JOIN reward_redemption rr
					ON rr.id_reward = rw.id
					AND rr.id_user = ${idUsuario}
					AND rr.status != 'CANCELLED'
				WHERE i.is_active = TRUE
				GROUP BY i.id, i.name, i.description, i.criteria, ui.id_user, ui.unlocked_at, i.created_at
				ORDER BY ui.unlocked_at DESC NULLS LAST, i.created_at ASC
			`,
			buscarStatsUsuario(idUsuario),
		]) as [LinhaConquista[], UserStats];

		if (rows.length === 0) {
			const { ACHIEVEMENT_MOCK_DATA } = await import("./achievementMockData");
			return {
				conquistas: ACHIEVEMENT_MOCK_DATA.map((conquista) => ({
					...conquista,
					premios: conquista.premios.map((premio) => ({ ...premio })),
				})),
				fonte: "mock",
			};
		}

		function parsePremios(raw: unknown): PremioConquista[] {
			if (!Array.isArray(raw)) return [];
			return raw.map((p: Record<string, unknown>) => ({
				nome: String(p.nome ?? ""),
				descricao: String(p.descricao ?? ""),
				idRecompensa: p.idRecompensa ? Number(p.idRecompensa) : null,
				custoPontos: Number(p.custoPontos ?? 0),
				jaResgatado: Boolean(p.jaResgatado),
				codigoCupom: p.codigoCupom ? String(p.codigoCupom) : null,
			}));
		}

		// ── Auto‑unlock + auto‑generate coupons ────────────────────────
		let algoMudou = false;

		for (const row of rows) {
			const criterios = parseCriteria(row.criteria);
			const progresso = avaliarCriterios(criterios, stats);

			if (progresso !== null && progresso >= 100 && !row.desbloqueada) {
				algoMudou = true;

				// Marca como desbloqueada em user_insignia
				await db`
					INSERT INTO user_insignia (id_user, id_insignia)
					VALUES (${idUsuario}, ${row.id})
					ON CONFLICT DO NOTHING
				`.catch(() => {});

				// Gera cupons automáticos para cada recompensa vinculada
				const premios = row.premios as Record<string, unknown>[];
				if (Array.isArray(premios)) {
					for (const p of premios) {
						const idReward = p.idRecompensa ? Number(p.idRecompensa) : null;
						const jaFoi = Boolean(p.jaResgatado);

						if (idReward && !jaFoi) {
							const code = `INS-${crypto.randomUUID().replace(/-/g, "").slice(0, 8).toUpperCase()}`;
							await db`
								INSERT INTO reward_redemption (id_user, id_reward, points_cost_snapshot, code)
								VALUES (${idUsuario}, ${idReward}, 0, ${code})
								ON CONFLICT DO NOTHING
							`.catch(() => {});
						}
					}
				}
			}
		}

		// Se algo mudou, busca os dados atualizados (com os códigos)
		let dadosFinais = rows;
		if (algoMudou) {
			[dadosFinais] = await Promise.all([
				db`
					SELECT
						i.id,
						i.name AS nome,
						i.description AS descricao,
						i.criteria,
						(ui.id_user IS NOT NULL) AS desbloqueada,
						COALESCE(
							json_agg(
								json_build_object(
									'nome', rw.name,
									'descricao', rw.description,
									'idRecompensa', rw.id,
									'custoPontos', rw.points_cost,
									'jaResgatado', (rr.id IS NOT NULL),
									'codigoCupom', rr.code
								)
								ORDER BY rw.id
							) FILTER (WHERE rw.id IS NOT NULL),
							'[]'::json
						) AS premios
					FROM insignia i
					LEFT JOIN user_insignia ui
						ON ui.id_insignia = i.id
						AND ui.id_user = ${idUsuario}
					LEFT JOIN insignia_reward ir
						ON ir.id_insignia = i.id
					LEFT JOIN reward rw
						ON rw.id = ir.id_reward
					LEFT JOIN reward_redemption rr
						ON rr.id_reward = rw.id
						AND rr.id_user = ${idUsuario}
						AND rr.status != 'CANCELLED'
					WHERE i.is_active = TRUE
					GROUP BY i.id, i.name, i.description, i.criteria, ui.id_user, ui.unlocked_at, i.created_at
					ORDER BY ui.unlocked_at DESC NULLS LAST, i.created_at ASC
				`,
			]) as [LinhaConquista[]];
		}

		return {
			conquistas: dadosFinais.map((row) => {
				const criterios = parseCriteria(row.criteria);
				const progresso = avaliarCriterios(criterios, stats);
				const estado: EstadoConquista =
					progresso !== null && progresso >= 100 ? "obtida" : "bloqueada";

				return {
					id: Number(row.id),
					nome: String(row.nome),
					criterio: obterTextoCriterio(row.criteria, String(row.descricao)),
					progresso,
					estado,
					premios: parsePremios(row.premios),
				};
			}),
			fonte: "banco",
		};
	} catch (causa) {
		throw new ErroVitrineIndisponivel(causa);
	}
}