import { db } from "../../db";
import { ACHIEVEMENT_MOCK_DATA } from "./achievementMockData";

export interface PremioConquista {
	nome: string;
	descricao: string;
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

function obterTextoCriterio(criteria: unknown, descricao: string): string {
	if (!criteria || typeof criteria !== "object" || Array.isArray(criteria)) {
		return descricao;
	}

	const dados = criteria as Record<string, unknown>;
	for (const chave of ["descricao", "description", "label"]) {
		const valor = dados[chave];
		if (typeof valor === "string" && valor.trim()) return valor.trim();
	}

	return descricao;
}

export async function buscarVitrinePorUsuario(
	idUsuario: number,
): Promise<VitrineConquistas> {
	try {
		const rows = (await db`
			SELECT
				i.id,
				i.name AS nome,
				i.description AS descricao,
				i.criteria,
				(ui.id_user IS NOT NULL) AS desbloqueada
			FROM insignia i
			LEFT JOIN user_insignia ui
				ON ui.id_insignia = i.id
				AND ui.id_user = ${idUsuario}
			WHERE i.is_active = TRUE
			ORDER BY ui.unlocked_at DESC NULLS LAST, i.created_at ASC
		`) as LinhaConquista[];

		if (rows.length === 0) {
			return {
				conquistas: ACHIEVEMENT_MOCK_DATA.map((conquista) => ({
					...conquista,
					premios: conquista.premios.map((premio) => ({ ...premio })),
				})),
				fonte: "mock",
			};
		}

		return {
			conquistas: rows.map((row) => ({
				id: Number(row.id),
				nome: String(row.nome),
				criterio: obterTextoCriterio(row.criteria, String(row.descricao)),
				progresso: row.desbloqueada ? 100 : null,
				estado: row.desbloqueada ? "obtida" : "bloqueada",
				premios: [],
			})),
			fonte: "banco",
		};
	} catch (causa) {
		throw new ErroVitrineIndisponivel(causa);
	}
}