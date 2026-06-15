import { db } from "../../db";

export interface RegistroExtrato {
	id: number;
	materialTipo: string;
	pesoKg: number | null;
	pontosGanhos: number;
	nomePev: string;
	criadoEm: Date;
}

export class ErroExtratoIndisponivel extends Error {
	constructor(causa?: unknown) {
		super("Não foi possível carregar o extrato. Tente novamente mais tarde.");
		this.name = "ErroExtratoIndisponivel";
		if (causa instanceof Error) this.cause = causa;
	}
}

export async function buscarExtratoPorUsuario(
	idUsuario: number,
): Promise<RegistroExtrato[]> {
	try {
		const rows = await db`
			SELECT
				d.id,
				p.name            AS "nomePev",
				d.points_awarded  AS "pontosGanhos",
				d.created_at      AS "criadoEm",
				-- Colunas opcionais que podem não existir ainda no schema:
				-- di.material_type AS "materialTipo",
				-- di.weight_kg     AS "pesoKg"
				NULL::TEXT        AS "materialTipo",
				NULL::NUMERIC     AS "pesoKg"
			FROM disposal d
			JOIN pev p ON p.id = d.id_pev
			WHERE d.id_user = ${idUsuario}
			ORDER BY d.created_at DESC
		`;

		return rows as RegistroExtrato[];
	} catch (causa) {
		throw new ErroExtratoIndisponivel(causa);
	}
}