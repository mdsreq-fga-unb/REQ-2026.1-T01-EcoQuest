import { db } from "../../db";

export interface NovoUsuario {
	nome: string;
	cpf: string;
	telefone: string;
	email: string;
	senha: string;
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
	const passwordHash = await Bun.password.hash(dados.senha, {
		algorithm: "bcrypt",
		cost: 12,
	});

	try {
		const [usuario] = await db`
			INSERT INTO "user" (email, name, cpf, phone, password_hash)
			VALUES (${dados.email}, ${dados.nome}, ${dados.cpf}, ${dados.telefone}, ${passwordHash})
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
	| { status: "senha_invalida" };

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
				points_total_earned AS "pointsTotalEarned"
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

	const row = rows[0] as UsuarioPublico & { passwordHash: string };

	const senhaCorreta = await Bun.password.verify(senha, row.passwordHash);

	if (!senhaCorreta) {
		return { status: "senha_invalida" };
	}

	const { passwordHash, ...usuario } = row;

	return { status: "ok", usuario };
}