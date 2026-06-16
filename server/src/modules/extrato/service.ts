import { db } from "../../db";
import { obterSimulacaoEmitidaPorJti } from "../simular_descarte/service";

export interface RegistroExtrato {
	id: number;
	materialTipo: string | null;
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

interface LinhaExtratoBruta {
	id: number | string;
	jtiToken: string;
	materialTipo: string | null;
	pesoKg: number | string | null;
	nomePev: string;
	pontosGanhos: number | string;
	criadoEm: Date | string;
}

export async function buscarExtratoPorUsuario(
	idUsuario: number,
): Promise<RegistroExtrato[]> {
	try {
		const rows = await db`
			SELECT
				d.id,
				d.jti_token    AS "jtiToken",
				d.material_type AS "materialTipo",
				d.weight_kg     AS "pesoKg",
				p.name            AS "nomePev",
				d.points_awarded  AS "pontosGanhos",
				d.created_at      AS "criadoEm"
			FROM disposal d
			JOIN pev p ON p.id = d.id_pev
			WHERE d.id_user = ${idUsuario}
			ORDER BY d.created_at DESC
		`;

		const linhas = rows as LinhaExtratoBruta[];
		const registros: RegistroExtrato[] = [];
		for (const row of linhas) {
			const simulacao = obterSimulacaoEmitidaPorJti(String(row.jtiToken));
			const materialTipo = simulacao
				? simulacao.itensSelecionados
						.map((item) => `${item.nome} (${item.quantidade}x)`)
						.join(", ")
				: row.materialTipo
					? String(row.materialTipo)
					: null;
			console.log("Material tipo bruto:", row.materialTipo, "Material tipo processado:", materialTipo);
			const pesoKg = simulacao?.totalPesoKg ?? (row.pesoKg == null ? null : Number(row.pesoKg));

			registros.push({
				id: Number(row.id),
				materialTipo,
				pesoKg,
				pontosGanhos: Number(row.pontosGanhos),
				nomePev: String(row.nomePev),
				criadoEm: new Date(row.criadoEm),
			});
		}

		return registros;
	} catch (causa) {
		throw new ErroExtratoIndisponivel(causa);
	}
}
