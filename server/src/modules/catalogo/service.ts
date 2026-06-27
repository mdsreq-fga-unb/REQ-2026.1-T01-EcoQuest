import { db } from "../../db";

export class ErroSaldoIndisponivel extends Error {
	constructor(causa?: unknown) {
		super("Não foi possível carregar seu saldo de pontos. Tente novamente mais tarde.");
		this.name = "ErroSaldoIndisponivel";
		if (causa instanceof Error) this.cause = causa;
	}
}

export async function buscarSaldoPontos(idUsuario: number): Promise<number> {
	try {
		const [row] = await db`
			SELECT points_balance AS "pointsBalance"
			FROM "user"
			WHERE id = ${idUsuario}
		`;

		if (!row) return 0;
		return Number(row.pointsBalance);
	} catch (causa) {
		throw new ErroSaldoIndisponivel(causa);
	}
}