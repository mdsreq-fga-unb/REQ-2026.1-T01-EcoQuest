import { Html } from "@elysia/html";
import { Elysia } from "elysia";
import {
	autenticarUsuario,
	cpfJaCadastrado,
	criarUsuario,
	ErroAutenticacaoIndisponivel,
	ErroPersistenciaCadastro,
	emailJaCadastrado,
} from "./service";
import { CadastroView, LoginView } from "./views";

function cpfValido(digits: string): boolean {
	if (digits.length !== 11) return false;
	if (/^(\d)\1{10}$/.test(digits)) return false;

	let soma = 0;
	for (let i = 0; i < 9; i++) soma += parseInt(digits[i]!) * (10 - i);
	let resto = (soma * 10) % 11;
	if (resto === 10 || resto === 11) resto = 0;
	if (resto !== parseInt(digits[9]!)) return false;

	soma = 0;
	for (let i = 0; i < 10; i++) soma += parseInt(digits[i]!) * (11 - i);
	resto = (soma * 10) % 11;
	if (resto === 10 || resto === 11) resto = 0;
	if (resto !== parseInt(digits[10]!)) return false;

	return true;
}

function popupHeader(
	set: any,
	ok: boolean,
	message: string,
	redirect?: string,
) {
	const detail: Record<string, unknown> = { ok, message };
	if (redirect) detail.redirect = redirect;
	set.headers["HX-Trigger"] = JSON.stringify({ popup: detail });
}

function emailValido(email: string): boolean {
	return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

function senhaForte(senha: string): boolean {
	return (
		senha.length >= 8 &&
		/[A-Z]/.test(senha) &&
		/[a-z]/.test(senha) &&
		/[0-9]/.test(senha) &&
		/[^A-Za-z0-9]/.test(senha)
	);
}

export const authController = new Elysia({ prefix: "/auth" })
	.get("/login", () => <LoginView />)
	.get("/cadastro", () => <CadastroView />)

	.get("/check-email", async ({ query }) => {
		const email = (query.email ?? "").trim();

		if (!email) {
			return { status: "vazio", message: "" };
		}

		if (!emailValido(email)) {
			return { status: "pendente", message: "Informe um email válido" };
		}

		try {
			const jaExiste = await emailJaCadastrado(email);
			if (jaExiste) {
				return {
					status: "pendente",
					message: `Já existe uma conta com este email`,
				};
			}
		} catch {
			return { status: "vazio", message: "" };
		}
	})

	.get("/check-cpf", async ({ query }) => {
		const cpfRaw = (query.cpf ?? "").trim();
		const cpfDigits = cpfRaw.replace(/\D/g, "");

		if (!cpfDigits) {
			return { status: "vazio", message: "" };
		}

		if (cpfDigits.length < 11) {
			return { status: "pendente", message: "Digite os 11 números do CPF" };
		}

		if (!cpfValido(cpfDigits)) {
			return { status: "pendente", message: "CPF inválido" };
		}

		try {
			const jaExiste = await cpfJaCadastrado(cpfDigits);
			if (jaExiste) {
				return {
					status: "pendente",
					message: `Já existe uma conta com este CPF`,
				};
			}
		} catch {
			return { status: "vazio", message: "" };
		}

		return { status: "cumprido", message: "CPF válido" };
	})

	.post("/cadastro", async ({ body, set }) => {
		const { nome, cpf, telefone, email, senha, confirmarSenha } =
			body as Record<string, string>;

		const cpfDigits = (cpf ?? "").replace(/\D/g, "");
		const telefoneDigits = (telefone ?? "").replace(/\D/g, "");
		const nomeTrim = (nome ?? "").trim();
		const emailTrim = (email ?? "").trim();

		if (!nomeTrim) {
			set.status = 400;
			popupHeader(set, false, "Informe seu nome completo.");
			return <div class="erro">Informe seu nome completo.</div>;
		}

		if (!cpfValido(cpfDigits)) {
			set.status = 400;
			popupHeader(set, false, "CPF inválido. Verifique os números digitados.");
			return (
				<div class="erro">CPF inválido. Verifique os números digitados.</div>
			);
		}

		if (telefoneDigits.length !== 11) {
			set.status = 400;
			popupHeader(
				set,
				false,
				"Telefone inválido. Verifique os números digitados.",
			);
			return (
				<div class="erro">
					Telefone inválido. Verifique os números digitados.
				</div>
			);
		}

		if (!emailValido(emailTrim)) {
			set.status = 400;
			popupHeader(set, false, "Informe um email válido.");
			return <div class="erro">Informe um email válido.</div>;
		}

		if (!senha || !senhaForte(senha)) {
			set.status = 400;
			popupHeader(
				set,
				false,
				"A senha deve ter no mínimo 8 caracteres, com letra maiúscula, minúscula, número e caractere especial.",
			);
			return (
				<div class="erro">
					A senha deve ter no mínimo 8 caracteres, com letra maiúscula,
					minúscula, número e caractere especial.
				</div>
			);
		}

		if (senha !== confirmarSenha) {
			set.status = 400;
			popupHeader(
				set,
				false,
				"As senhas não coincidem. Verifique e tente novamente.",
			);
			return (
				<div class="erro">
					As senhas não coincidem. Verifique e tente novamente.
				</div>
			);
		}

		try {
			const [cpfExiste, emailExiste] = await Promise.all([
				cpfJaCadastrado(cpfDigits),
				emailJaCadastrado(emailTrim),
			]);

			if (cpfExiste && emailExiste) {
				set.status = 400;
				return (
					<div class="erro">
						Já existe uma conta com este email e este CPF. Verifique os campos
						destacados.
					</div>
				);
			}

			if (cpfExiste) {
				set.status = 400;
				return (
					<div class="erro">
						Já existe uma conta com o CPF {cpf}. Verifique o campo destacado.
					</div>
				);
			}

			if (emailExiste) {
				set.status = 400;
				return (
					<div class="erro">
						Já existe uma conta com este email. Verifique o campo destacado.
					</div>
				);
			}

			await criarUsuario({
				nome: nomeTrim,
				cpf: cpfDigits,
				telefone: telefoneDigits,
				email: emailTrim,
				senha,
			});
		} catch (err) {
			if (err instanceof ErroPersistenciaCadastro) {
				set.status = 503;
				popupHeader(set, false, err.message);
				return <div class="erro">{err.message}</div>;
			}
			throw err;
		}

		popupHeader(set, true, "Conta criada com sucesso!", "/auth/login");
		return (
			<div class="sucesso">Conta criada com sucesso! Você já pode entrar.</div>
		);
	})

	.post("/login", async ({ body, set }) => {
		const { email, senha } = body as Record<string, string>;

		if (!email || !senha) {
			set.status = 400;
			popupHeader(set, false, "Informe email e senha.");
			return <div class="erro">Informe email e senha.</div>;
		}

		let resultado: Awaited<ReturnType<typeof autenticarUsuario>>;
		try {
			resultado = await autenticarUsuario(email.trim(), senha);
		} catch (err) {
			if (err instanceof ErroAutenticacaoIndisponivel) {
				set.status = 503;
				popupHeader(set, false, err.message);
				return <div class="erro">{err.message}</div>;
			}
			throw err;
		}

		if (resultado.status === "usuario_nao_encontrado") {
			set.status = 401;
			popupHeader(set, false, "Não existe conta cadastrada com este email.");
			return (
				<div class="erro">Não existe conta cadastrada com este email.</div>
			);
		}

		if (resultado.status === "senha_invalida") {
			set.status = 401;
			popupHeader(set, false, "Senha incorreta. Verifique e tente novamente.");
			return (
				<div class="erro">Senha incorreta. Verifique e tente novamente.</div>
			);
		}

		popupHeader(
			set,
			true,
			`Login realizado com sucesso! Bem-vindo(a), ${resultado.usuario.nome}.`,
			"/",
		);
		return (
			<div class="sucesso">
				Login realizado com sucesso! Bem-vindo(a), {resultado.usuario.nome}.
			</div>
		);
	});
