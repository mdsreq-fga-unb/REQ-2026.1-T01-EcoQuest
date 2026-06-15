import { db } from "../../db";
import { obterSimulacaoEmitidaPorJti } from "../simular_descarte/service";

type CodigoErroValidacao =
	| "token_invalido"
	| "token_expirado"
	| "token_ja_utilizado"
	| "falha_validacao";

export class ErroValidacaoDescarte extends Error {
	statusCode: number;
	codigo: CodigoErroValidacao;

	constructor(
		codigo: CodigoErroValidacao,
		message: string,
		statusCode = 400,
		causa?: unknown,
	) {
		super(message);
		this.name = "ErroValidacaoDescarte";
		this.statusCode = statusCode;
		this.codigo = codigo;
		if (causa instanceof Error) this.cause = causa;
	}
}

export interface ResultadoValidacaoDescarte {
	status: "token_validado";
	message: string;
	pointsAwarded: number;
	pointsBalanceAfter: number;
	disposalId: number;
	token: string;
}

const PONTOS_POR_ITEM: Record<string, number> = {
	bateria_laptop: 20,
	bateria_prova_falhas: 30,
	cabos_alimentacao: 6,
	cabos_forca: 7,
	carregadores: 8,
	adaptadores: 5,
	aparelho_celular: 15,
	smartphone: 18,
	telefone_sem_fio: 12,
	telefone_com_fio: 14,
	fax: 16,
	microcomputador: 40,
	monitor_tubo: 28,
	monitor_lcd: 24,
	monitor_led: 24,
	monitor_plasma: 26,
	notebook: 30,
	servidor: 45,
	teclado: 8,
	mouse: 6,
	modem: 8,
	roteador: 8,
	impressora: 20,
	estabilizador: 12,
	tablet: 16,
	no_break: 24,
};

const UUID_V4_REGEX =
	/^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;

function extrairJtiValido(raw: string): string {
	const jti = raw.trim().toLowerCase();
	if (!UUID_V4_REGEX.test(jti)) {
		throw new ErroValidacaoDescarte(
			"token_invalido",
			"QR Code inválido. Tente escanear novamente.",
			400,
		);
	}
	return jti;
}

function calcularPontosSimulados(jti: string): number {
	const simulacao = obterSimulacaoEmitidaPorJti(jti);
	if (!simulacao) return 15;

	const pontosItens = simulacao.itensSelecionados.reduce((acc, item) => {
		const pontosUnitarios = PONTOS_POR_ITEM[item.chave] ?? 10;
		return acc + pontosUnitarios * item.quantidade;
	}, 0);
	const bonusPeso = Math.round(simulacao.totalPesoKg * 2);

	return Math.max(5, Math.min(500, pontosItens + bonusPeso));
}

async function validarEstadoToken(jti: string): Promise<void> {
	const rows = await db`
		SELECT jti, used_at, expires_at
		FROM disposal_token
		WHERE jti = ${jti}::uuid
		LIMIT 1
	`;

	if (rows.length === 0) {
		throw new ErroValidacaoDescarte(
			"token_invalido",
			"QR Code inválido ou inexistente.",
			400,
		);
	}

	const token = rows[0];
	if (!token) {
		throw new ErroValidacaoDescarte(
			"falha_validacao",
			"Não foi possível validar o token.",
			500,
		);
	}

	if (token.used_at) {
		throw new ErroValidacaoDescarte(
			"token_ja_utilizado",
			"Este token já foi utilizado anteriormente.",
			409,
		);
	}

	if (new Date(token.expires_at) <= new Date()) {
		throw new ErroValidacaoDescarte(
			"token_expirado",
			"Este token expirou. Gere um novo QR Code.",
			400,
		);
	}
}

export async function validarTokenERegistrarDescarte(
	idUsuario: number,
	rawJti: string,
): Promise<ResultadoValidacaoDescarte> {
	const jti = extrairJtiValido(rawJti);
	const pointsAwarded = calcularPontosSimulados(jti);

	try {
		const rows = await db`
			WITH token_consumido AS (
				UPDATE disposal_token
				SET used_at = now(), id_user_used_by = ${idUsuario}
				WHERE jti = ${jti}::uuid
					AND used_at IS NULL
					AND expires_at > now()
				RETURNING id_pev
			), descarte_criado AS (
				INSERT INTO disposal (id_user, id_pev, jti_token, points_awarded)
				SELECT ${idUsuario}, id_pev, ${jti}::uuid, ${pointsAwarded}
				FROM token_consumido
				RETURNING id
			), transacao_criada AS (
				INSERT INTO points_transaction (id_user, amount, kind, id_disposal)
				SELECT ${idUsuario}, ${pointsAwarded}, 'DISPOSAL', id
				FROM descarte_criado
				RETURNING id
			), usuario_atualizado AS (
				UPDATE "user"
				SET points_balance = points_balance + ${pointsAwarded},
					points_total_earned = points_total_earned + ${pointsAwarded},
					updated_at = now()
				WHERE id = ${idUsuario}
					AND EXISTS (SELECT 1 FROM descarte_criado)
				RETURNING points_balance
			)
			SELECT d.id AS disposal_id, u.points_balance
			FROM descarte_criado d
			JOIN usuario_atualizado u ON TRUE
		`;

		if (rows.length === 0) {
			await validarEstadoToken(jti);
			throw new ErroValidacaoDescarte(
				"falha_validacao",
				"Não foi possível concluir a validação do token.",
				500,
			);
		}

		const row = rows[0];
		if (!row) {
			throw new ErroValidacaoDescarte(
				"falha_validacao",
				"Falha ao processar retorno da validação.",
				500,
			);
		}

		return {
			status: "token_validado",
			message: `Descarte validado com sucesso. +${pointsAwarded} pontos.`,
			pointsAwarded,
			pointsBalanceAfter: Number(row.points_balance),
			disposalId: Number(row.disposal_id),
			token: jti,
		};
	} catch (err) {
		if (err instanceof ErroValidacaoDescarte) throw err;
		throw new ErroValidacaoDescarte(
			"falha_validacao",
			"Falha ao validar o token de descarte. Tente novamente.",
			503,
			err,
		);
	}
}
