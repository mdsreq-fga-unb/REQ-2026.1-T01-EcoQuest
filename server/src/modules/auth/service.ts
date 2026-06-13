// Business logic & native Postgres queries
import { db } from "../../db";

export interface NovoUsuario {
	nome: string;
	cpf: string; // apenas digitos (11 caracteres)
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

/**
 * Verifica se já existe um usuário cadastrado com o e-mail informado.
 * A comparação é case-insensitive (mesmo critério do índice único do banco).
 */
export async function emailJaCadastrado(email: string): Promise<boolean> {
	const rows = await db`
		SELECT 1
		FROM "user"
		WHERE lower(email) = lower(${email})
		LIMIT 1
	`;

	return rows.length > 0;
}

/**
 * Verifica se já existe um usuário cadastrado com o CPF informado.
 * Espera o CPF apenas com dígitos (11 caracteres).
 */
export async function cpfJaCadastrado(cpf: string): Promise<boolean> {
	const rows = await db`
		SELECT 1
		FROM "user"
		WHERE cpf = ${cpf}
		LIMIT 1
	`;

	return rows.length > 0;
}

/**
 * Cria um novo usuário no banco, salvando o hash da senha (nunca em texto puro).
 * Retorna o usuário criado (sem o hash da senha).
 */
export async function criarUsuario(dados: NovoUsuario): Promise<UsuarioPublico> {
	const passwordHash = await Bun.password.hash(dados.senha, {
		algorithm: "bcrypt",
		cost: 12,
	});

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
}

/**
 * Resultado da tentativa de login.
 * - "ok": credenciais válidas, retorna o usuário.
 * - "usuario_nao_encontrado": não existe usuário com esse e-mail.
 * - "senha_invalida": usuário existe, mas a senha não confere.
 */
export type LoginResultado =
	| { status: "ok"; usuario: UsuarioPublico }
	| { status: "usuario_nao_encontrado" }
	| { status: "senha_invalida" };

/**
 * Autentica um usuário pelo e-mail e senha.
 * A senha informada é comparada com o hash salvo via Bun.password.verify.
 */
export async function autenticarUsuario(email: string, senha: string): Promise<LoginResultado> {
	const rows = await db`
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