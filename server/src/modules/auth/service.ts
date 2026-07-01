import { db } from "../../db";

export interface NovoUsuario {
	nome: string;
	cpf: string;
	telefone: string;
	email: string;
	senha: string;
	termosAceitos: boolean;
}

export interface UsuarioPublico {
	id: number;
	nome: string;
	email: string;
	cpf: string;
	telefone: string;
	pointsBalance: number;
	pointsTotalEarned: number;
}
export const DURACAO_BLOQUEIO_LOGIN_MS = 15 * 60 * 1000;
export const LIMITE_TENTATIVAS_LOGIN = 5;

export class ErroConsentimentoObrigatorio extends Error {
	constructor() {
		super(
			"É necessário aceitar os termos de uso e a política de privacidade para concluir o cadastro.",
		);
		this.name = "ErroConsentimentoObrigatorio";
	}
}

export class ErroPersistenciaCadastro extends Error {
	constructor(causa?: unknown) {
		super("Não foi possível concluir o cadastro. Tente novamente mais tarde.");
		this.name = "ErroPersistenciaCadastro";
		if (causa instanceof Error) this.cause = causa;
	}
}

export class ErroAutenticacaoIndisponivel extends Error {
	constructor(causa?: unknown) {
		super("Serviço de autenticação temporariamente indisponível. Tente novamente mais tarde.");
		this.name = "ErroAutenticacaoIndisponivel";
		if (causa instanceof Error) this.cause = causa;
	}
}

export async function emailJaCadastrado(email: string): Promise<boolean> {
	try {
		const rows = await db`
			SELECT 1
			FROM "user"
			WHERE lower(email) = lower(${email})
			LIMIT 1
		`;
		return rows.length > 0;
	} catch (causa) {
		throw new ErroPersistenciaCadastro(causa);
	}
}

export async function cpfJaCadastrado(cpf: string): Promise<boolean> {
	try {
		const rows = await db`
			SELECT 1
			FROM "user"
			WHERE cpf = ${cpf}
			LIMIT 1
		`;
		return rows.length > 0;
	} catch (causa) {
		throw new ErroPersistenciaCadastro(causa);
	}
}

export async function criarUsuario(dados: NovoUsuario): Promise<UsuarioPublico> {
	if (!dados.termosAceitos) {
		throw new ErroConsentimentoObrigatorio();
	}

	const passwordHash = await Bun.password.hash(dados.senha, {
		algorithm: "bcrypt",
		cost: 12,
	});

	try {
		const [usuario] = await db`
			INSERT INTO "user" (email, name, cpf, phone, password_hash, terms_accepted_at)
			VALUES (${dados.email}, ${dados.nome}, ${dados.cpf}, ${dados.telefone}, ${passwordHash}, now())
			RETURNING
				id,
				name AS nome,
				email,
				cpf,
				phone AS telefone,
				points_balance AS "pointsBalance",
				points_total_earned AS "pointsTotalEarned"
		`;
		return usuario as UsuarioPublico;
	} catch (causa) {
		throw new ErroPersistenciaCadastro(causa);
	}
}

export type LoginResultado =
	| { status: "ok"; usuario: UsuarioPublico }
	| { status: "usuario_nao_encontrado" }
	| { status: "senha_invalida"; tentativasRestantes: number }
	| { status: "conta_bloqueada"; bloqueadaAte: Date }
	| { status: "conta_inativa" };

export async function autenticarUsuario(
	email: string,
	senha: string,
): Promise<LoginResultado> {
	let rows: any[];

	try {
		rows = await db`
			SELECT
				id,
				name AS nome,
				email,
				cpf,
				phone AS telefone,
				password_hash AS "passwordHash",
				points_balance AS "pointsBalance",
				points_total_earned AS "pointsTotalEarned",
				status,
				failed_login_attempts AS "failedLoginAttempts",
				locked_until AS "lockedUntil"
			FROM "user"
			WHERE lower(email) = lower(${email})
			LIMIT 1
		`;
	} catch (causa) {
		throw new ErroAutenticacaoIndisponivel(causa);
	}

	if (rows.length === 0) {
		return { status: "usuario_nao_encontrado" };
	}

	const row = rows[0] as UsuarioPublico & {
		passwordHash: string;
		status: "ACTIVE" | "INACTIVE" | "BLOCKED";
		failedLoginAttempts: number;
		lockedUntil: Date | string | null;
	};

	if (row.status !== "ACTIVE") {
		return { status: "conta_inativa" };
	}

	const bloqueadaAte = row.lockedUntil ? new Date(row.lockedUntil) : null;
	if (bloqueadaAte && bloqueadaAte.getTime() > Date.now()) {
		return { status: "conta_bloqueada", bloqueadaAte };
	}

	const senhaCorreta = await Bun.password.verify(senha, row.passwordHash);

	if (!senhaCorreta) {
		return registrarTentativaInvalida(row.id, row.failedLoginAttempts);
	}

	try {
		await db`
			UPDATE "user"
			SET failed_login_attempts = 0, locked_until = NULL
			WHERE id = ${row.id}
		`;
	} catch (causa) {
		throw new ErroAutenticacaoIndisponivel(causa);
	}

	const { passwordHash, status, failedLoginAttempts, lockedUntil, ...usuario } = row;

	return { status: "ok", usuario };
}

async function registrarTentativaInvalida(
	idUsuario: number,
	tentativasAtuais: number,
): Promise<LoginResultado> {
	const novasTentativas = tentativasAtuais + 1;

	if (novasTentativas >= LIMITE_TENTATIVAS_LOGIN) {
		const bloqueadaAte = new Date(Date.now() + DURACAO_BLOQUEIO_LOGIN_MS);
		try {
			await db`
				UPDATE "user"
				SET failed_login_attempts = 0, locked_until = ${bloqueadaAte}
				WHERE id = ${idUsuario}
			`;
		} catch (causa) {
			throw new ErroAutenticacaoIndisponivel(causa);
		}
		return { status: "conta_bloqueada", bloqueadaAte };
	}

	try {
		await db`
			UPDATE "user"
			SET failed_login_attempts = ${novasTentativas}
			WHERE id = ${idUsuario}
		`;
	} catch (causa) {
		throw new ErroAutenticacaoIndisponivel(causa);
	}

	return {
		status: "senha_invalida",
		tentativasRestantes: LIMITE_TENTATIVAS_LOGIN - novasTentativas,
	};
}