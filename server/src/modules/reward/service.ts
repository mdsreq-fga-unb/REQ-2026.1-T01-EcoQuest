import { db } from "../../db";

// ─── Tipos ──────────────────────────────────────────────────────────────────

export interface RecompensaCatalogo {
	id: number;
	nome: string;
	descricao: string | null;
	tipo: string;
	custoPontos: number;
	estoque: number | null;
	parceiro: string;
	ativo: boolean;
}

export interface ResultadoResgate {
	id: number;
	idRecompensa: number;
	codigo: string;
	custoPontos: number;
	saldoApos: number;
	criadoEm: Date;
	expiraEm: Date | null;
}

// ─── Erros ──────────────────────────────────────────────────────────────────

export class ErroRecompensaIndisponivel extends Error {
	constructor(motivo: string, causa?: unknown) {
		super(motivo);
		this.name = "ErroRecompensaIndisponivel";
		if (causa instanceof Error) this.cause = causa;
	}
}

export class ErroSaldoInsuficiente extends Error {
	constructor(
		public saldoAtual: number,
		public custoNecessario: number,
	) {
		super(
			`Saldo insuficiente. Você tem ${saldoAtual} pontos, mas são necessários ${custoNecessario} pontos.`,
		);
		this.name = "ErroSaldoInsuficiente";
	}
}

export class ErroFalhaGeracaoCupom extends Error {
	constructor(causa?: unknown) {
		super(
			"Não foi possível gerar o cupom no momento. Tente novamente mais tarde.",
		);
		this.name = "ErroFalhaGeracaoCupom";
		if (causa instanceof Error) this.cause = causa;
	}
}

export class ErroFalhaDebitoPosCupom extends Error {
	constructor(
		public idRedencao: number,
		causa?: unknown,
	) {
		super(
			"O cupom foi gerado, mas ocorreu uma falha ao debitar os pontos. A operação foi revertida.",
		);
		this.name = "ErroFalhaDebitoPosCupom";
		if (causa instanceof Error) this.cause = causa;
	}
}

// ─── Serviços ───────────────────────────────────────────────────────────────

/**
 * Busca todas as recompensas ativas do catálogo ordenadas por parceiro.
 */
export async function listarRecompensas(): Promise<RecompensaCatalogo[]> {
	const rows = await db`
		SELECT
			r.id,
			r.name,
			r.description,
			r.reward_type    AS "tipo",
			r.points_cost    AS "custoPontos",
			r.stock,
			p.name           AS "parceiro",
			r.is_active      AS "ativo"
		FROM reward r
		JOIN partner p ON p.id = r.id_partner
		WHERE r.is_active = TRUE
		ORDER BY p.name, r.name
	`;

	return rows.map((row: Record<string, unknown>) => ({
		id: Number(row.id),
		nome: String(row.name),
		descricao: row.description ? String(row.description) : null,
		tipo: String(row.tipo),
		custoPontos: Number(row.custoPontos),
		estoque: row.stock !== null ? Number(row.stock) : null,
		parceiro: String(row.parceiro),
		ativo: Boolean(row.ativo),
	}));
}

/**
 * Busca uma recompensa específica pelo ID.
 */
export async function buscarRecompensaPorId(
	idRecompensa: number,
): Promise<RecompensaCatalogo | null> {
	const rows = await db`
		SELECT
			r.id,
			r.name,
			r.description,
			r.reward_type    AS "tipo",
			r.points_cost    AS "custoPontos",
			r.stock,
			p.name           AS "parceiro",
			r.is_active      AS "ativo"
		FROM reward r
		JOIN partner p ON p.id = r.id_partner
		WHERE r.id = ${idRecompensa}
		LIMIT 1
	`;

	if (rows.length === 0) return null;

	const row = rows[0] as Record<string, unknown>;
	return {
		id: Number(row.id),
		nome: String(row.name),
		descricao: row.description ? String(row.description) : null,
		tipo: String(row.tipo),
		custoPontos: Number(row.custoPontos),
		estoque: row.stock !== null ? Number(row.stock) : null,
		parceiro: String(row.parceiro),
		ativo: Boolean(row.ativo),
	};
}

/**
 * Gera um código único de cupom no formato ECO-XXXXXXXX.
 */
function gerarCodigoCupom(): string {
	const randomPart = crypto.randomUUID().replace(/-/g, "").slice(0, 8).toUpperCase();
	return `ECO-${randomPart}`;
}

/**
 * Processa o resgate de uma recompensa por um usuário.
 *
 * Fluxo principal:
 * 1. Valida existência e disponibilidade da recompensa (RN1, RN13, RN17)
 * 2. Verifica saldo do usuário (RN5)
 * 3. Gera código do cupom
 * 4. Registra a redenção e, em uma única operação atômica:
 *    - Reserva unidade do estoque (se aplicável)
 *    - Debita pontos do saldo
 *    - Registra transação de pontos
 *
 * Fluxos de exceção:
 * - FE-E3: Recompensa esgotada → ErroRecompensaIndisponivel
 * - FA-4A: Saldo insuficiente → ErroSaldoInsuficiente
 * - FE-E2: Falha ao gerar cupom → ErroFalhaGeracaoCupom
 * - FE-E1: Falha ao debitar pós-cupom → ErroFalhaDebitoPosCupom (com rollback)
 */
export async function resgatarRecompensa(
	idUsuario: number,
	idRecompensa: number,
): Promise<ResultadoResgate> {
	// ── Passo 1: Validar recompensa ──────────────────────────────────────────
	const recompensa = await buscarRecompensaPorId(idRecompensa);

	if (!recompensa || !recompensa.ativo) {
		throw new ErroRecompensaIndisponivel(
			"Recompensa não encontrada ou indisponível.",
		);
	}

	// FE-E3: Verificar estoque
	if (recompensa.estoque !== null && recompensa.estoque <= 0) {
		throw new ErroRecompensaIndisponivel(
			"Esta recompensa está esgotada no momento.",
		);
	}

	// ── Passo 2: Verificar saldo do usuário ──────────────────────────────────
	const [linhaSaldo] = await db`
		SELECT points_balance AS "pointsBalance"
		FROM "user"
		WHERE id = ${idUsuario}
	`;

	if (!linhaSaldo) {
		throw new ErroRecompensaIndisponivel("Usuário não encontrado.");
	}

	const saldoAtual = Number(linhaSaldo.pointsBalance);

	// FA-4A: Saldo insuficiente
	if (saldoAtual < recompensa.custoPontos) {
		throw new ErroSaldoInsuficiente(saldoAtual, recompensa.custoPontos);
	}

	// ── Passo 3: Gerar código do cupom ───────────────────────────────────────
	const codigoCupom = gerarCodigoCupom();

	// ── Passo 4: Executar a redenção em uma transação atômica ────────────────
	// Usamos uma única query CTE para garantir atomicidade.
	// As CTEs executam em sequência; se qualquer uma falhar, nada é persistido.

	try {
		const rows = await db`
			WITH redencao_criada AS (
				INSERT INTO reward_redemption (id_user, id_reward, points_cost_snapshot, code)
				VALUES (${idUsuario}, ${idRecompensa}, ${recompensa.custoPontos}, ${codigoCupom})
				RETURNING id, code, points_cost_snapshot, created_at, expires_at
			),
			estoque_atualizado AS (
				UPDATE reward
				SET stock = CASE
					WHEN stock IS NOT NULL THEN stock - 1
					ELSE NULL
				END
				WHERE id = ${idRecompensa}
					AND (stock IS NULL OR stock > 0)
				RETURNING id
			),
			usuario_atualizado AS (
				UPDATE "user"
				SET points_balance = points_balance - ${recompensa.custoPontos},
					updated_at = now()
				WHERE id = ${idUsuario}
					AND points_balance >= ${recompensa.custoPontos}
				RETURNING points_balance
			),
			transacao_criada AS (
				INSERT INTO points_transaction (id_user, amount, kind, id_reward_redemption)
				SELECT ${idUsuario}, ${-recompensa.custoPontos}, 'REDEMPTION', id
				FROM redencao_criada
				RETURNING id
			)
			SELECT
				r.id           AS "redemptionId",
				r.code,
				r.points_cost_snapshot AS "custoPontos",
				r.created_at   AS "criadoEm",
				r.expires_at   AS "expiraEm",
				u.points_balance AS "saldoApos"
			FROM redencao_criada r
			JOIN usuario_atualizado u ON TRUE
		`;

		// Se a consulta retornou vazio, algo deu errado na transação
		if (rows.length === 0) {
			// Tenta verificar se o problema foi na geração do cupom (FE-E2)
			// ou no débito após geração (FE-E1)
			const redencaoExiste = await db`
				SELECT id FROM reward_redemption WHERE code = ${codigoCupom}
			`;

			if (redencaoExiste.length > 0) {
				// FE-E1: Cupom foi gerado mas houve falha no débito — fazer rollback
				await db`
					UPDATE reward_redemption
					SET status = 'CANCELLED'
					WHERE code = ${codigoCupom}
				`;

				if (recompensa.estoque !== null) {
					await db`
						UPDATE reward
						SET stock = stock + 1
						WHERE id = ${idRecompensa}
					`;
				}

				throw new ErroFalhaDebitoPosCupom(Number(redencaoExiste[0]!.id));
			}

			// FE-E2: Falha na geração do cupom
			throw new ErroFalhaGeracaoCupom();
		}

		const row = rows[0] as Record<string, unknown>;

		return {
			id: Number(row.redemptionId),
			idRecompensa,
			codigo: String(row.code),
			custoPontos: Number(row.custoPontos),
			saldoApos: Number(row.saldoApos),
			criadoEm: new Date(row.criadoEm as string),
			expiraEm: row.expiraEm ? new Date(row.expiraEm as string) : null,
		};
	} catch (err) {
		// Se já é um dos nossos erros conhecidos, repassa
		if (
			err instanceof ErroFalhaDebitoPosCupom ||
			err instanceof ErroFalhaGeracaoCupom ||
			err instanceof ErroRecompensaIndisponivel ||
			err instanceof ErroSaldoInsuficiente
		) {
			throw err;
		}

		// Erro inesperado — tenta rollback se o cupom foi gerado
		try {
			const redencaoExiste = await db`
				SELECT id FROM reward_redemption WHERE code = ${codigoCupom}
			`;

			if (redencaoExiste.length > 0) {
				await db`
					UPDATE reward_redemption
					SET status = 'CANCELLED'
					WHERE code = ${codigoCupom}
				`;

				if (recompensa.estoque !== null) {
					await db`
						UPDATE reward
						SET stock = stock + 1
						WHERE id = ${idRecompensa}
					`;
				}
			}
		} catch {
			// Silencia erros do rollback — o erro original é mais importante
		}

		throw new ErroFalhaGeracaoCupom(err);
	}
}
