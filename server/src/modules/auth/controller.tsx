import { Html } from "@elysia/html";
import { Elysia } from "elysia";
import { Layout } from "../../components/Layout-auth";
import {
	cookieDeLogin,
	cookieDeLogout,
	obterSessao,
} from "../../../lib/session";
import { sessionPlugin } from "../../plugins/session";
import {
	autenticarUsuario,
	cpfJaCadastrado,
	criarUsuario,
	ErroAutenticacaoIndisponivel,
	ErroConsentimentoObrigatorio,
	ErroPersistenciaCadastro,
	emailJaCadastrado,
} from "./service";
import { CadastroView, LoginView } from "./views";

const SESSION_DEBUG = process.env.SESSION_DEBUG === "1";

function authDebug(evento: string, detalhes?: Record<string, unknown>) {
	if (!SESSION_DEBUG) return;
	if (detalhes) {
		console.log(`[auth] ${evento}`, detalhes);
		return;
	}
	console.log(`[auth] ${evento}`);
}

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

export const authController = new Elysia({ prefix: "/auth" })
	.use(sessionPlugin)

	.get("/login", async ({ request, set }) => {
		const cookieHeader = request.headers.get("cookie");
		const sessaoAtual = await obterSessao(cookieHeader);
		authDebug("get-login", {
			temSessao: !!sessaoAtual,
			usuarioId: sessaoAtual?.id ?? null,
			temCookieHeader: !!cookieHeader,
			cookieNames: cookieHeader?.split(";").map((c) => c.trim().split("=")[0]),
			url: request.url,
		});
		if (sessaoAtual) {
			authDebug("get-login-redirecionando-home", {
				usuarioId: sessaoAtual.id,
			});
			set.status = 302;
			set.headers["Location"] = "/";
			return;
		}
		authDebug("get-login-exibindo-formulario", {
			motivo: !cookieHeader
				? "nenhum cookie enviado"
				: "sessão inválida ou expirada",
		});
		return <LoginView />;
	})

	.get("/cadastro", async ({ request, set }) => {
		const sessaoAtual = await obterSessao(request.headers.get("cookie"));
		authDebug("get-cadastro", {
			temSessao: !!sessaoAtual,
			usuarioId: sessaoAtual?.id ?? null,
		});
		if (sessaoAtual) {
			set.status = 302;
			set.headers["Location"] = "/";
			return;
		}
		return <CadastroView />;
	})

	.get("/termos-de-uso", () => (
		<Layout title="Termos de Uso - EcoQuest">
			<main style="max-width:720px;margin:0 auto;padding:48px 24px;font-family:'Poppins',sans-serif;line-height:1.6;color:#333;">
				<h1 style="font-family:'Oxanium',sans-serif;">Termos de Uso</h1>
				<p>
					Ao criar uma conta no EcoQuest, você concorda em utilizar a
					plataforma de forma responsável, fornecer informações verdadeiras no
					cadastro e respeitar as regras de pontuação, resgate de recompensas
					e descarte de resíduos descritas nesta plataforma.
				</p>
				<p>
					O EcoQuest pode atualizar estes termos periodicamente. O uso
					continuado da plataforma após alterações implica aceite dos novos
					termos.
				</p>
			</main>
		</Layout>
	))

	.get("/politica-de-privacidade", () => (
		<Layout title="Política de Privacidade - EcoQuest">
			<main style="max-width:720px;margin:0 auto;padding:48px 24px;font-family:'Poppins',sans-serif;line-height:1.6;color:#333;">
				<h1 style="font-family:'Oxanium',sans-serif;">
					Política de Privacidade
				</h1>
				<p>
					Coletamos apenas os dados necessários para o funcionamento do
					EcoQuest (nome, CPF, telefone, e-mail e histórico de descartes), em
					conformidade com a Lei Geral de Proteção de Dados (LGPD).
				</p>
				<p>
					Seus dados não são vendidos a terceiros. Você pode solicitar a
					exclusão ou correção dos seus dados a qualquer momento entrando em
					contato com o suporte.
				</p>
			</main>
		</Layout>
	))

	.get("/logout", ({ set }) => {
		console.log("ENTROU NO LOGOUT");

		set.status = 302;
		set.headers["Set-Cookie"] = cookieDeLogout();
		set.headers["Location"] = "/auth/login";

		return "";
	})

	.get("/check-email", async ({ query }) => {
		const email = (query.email ?? "").trim();
		if (!email) return { status: "vazio", message: "" };
		if (!emailValido(email))
			return { status: "pendente", message: "Informe um email válido" };
		try {
			if (await emailJaCadastrado(email))
				return {
					status: "pendente",
					message: "Já existe uma conta com este email",
				};
		} catch {
			return { status: "vazio", message: "" };
		}
	})

	.get("/check-cpf", async ({ query }) => {
		const cpfRaw = (query.cpf ?? "").trim();
		const cpfDigits = cpfRaw.replace(/\D/g, "");
		if (!cpfDigits) return { status: "vazio", message: "" };
		if (cpfDigits.length < 11)
			return { status: "pendente", message: "Digite os 11 números do CPF" };
		if (!cpfValido(cpfDigits))
			return { status: "pendente", message: "CPF inválido" };
		try {
			if (await cpfJaCadastrado(cpfDigits))
				return {
					status: "pendente",
					message: "Já existe uma conta com este CPF",
				};
		} catch {
			return { status: "vazio", message: "" };
		}
		return { status: "cumprido", message: "CPF válido" };
	})

	.post("/cadastro", async ({ body, set }) => {
		const { nome, cpf, telefone, email, senha, confirmarSenha, termosAceitos } =
			body as Record<string, string>;

		const cpfDigits = (cpf ?? "").replace(/\D/g, "");
		const telefoneDigits = (telefone ?? "").replace(/\D/g, "");
		const nomeTrim = (nome ?? "").trim();
		const emailTrim = (email ?? "").trim();
		// Checkbox HTML só é enviado quando marcado (valor "on" por padrão).
		const aceitouTermos = termosAceitos === "on" || termosAceitos === "true";

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
		if (!aceitouTermos) {
			set.status = 400;
			return (
				<div class="erro">
					É necessário aceitar os termos de uso e a política de privacidade
					para continuar.
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
					<div class="erro">Já existe uma conta com este email e este CPF.</div>
				);
			}
			if (cpfExiste) {
				set.status = 400;
				return <div class="erro">Já existe uma conta com o CPF {cpf}.</div>;
			}
			if (emailExiste) {
				set.status = 400;
				return <div class="erro">Já existe uma conta com este email.</div>;
			}
			await criarUsuario({
				nome: nomeTrim,
				cpf: cpfDigits,
				telefone: telefoneDigits,
				email: emailTrim,
				senha,
				termosAceitos: aceitouTermos,
			});
		} catch (err) {
			if (err instanceof ErroPersistenciaCadastro) {
				set.status = 503;
				popupHeader(set, false, err.message);
				return <div class="erro">{err.message}</div>;
			}
			if (err instanceof ErroConsentimentoObrigatorio) {
				set.status = 400;
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
		authDebug("post-login-inicio", {
			email: email?.trim() || null,
			temSenha: !!senha,
		});

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
			authDebug("post-login-usuario-nao-encontrado", {
				email: email.trim(),
			});
			set.status = 401;
			popupHeader(set, false, "Não existe conta cadastrada com este email.");
			return (
				<div class="erro">Não existe conta cadastrada com este email.</div>
			);
		}
		if (resultado.status === "senha_invalida") {
			authDebug("post-login-senha-invalida", {
				email: email.trim(),
				tentativasRestantes: resultado.tentativasRestantes,
			});
			set.status = 401;
			const aviso =
				resultado.tentativasRestantes <= 2
					? ` Você tem mais ${resultado.tentativasRestantes} tentativa(s) antes do bloqueio temporário da conta.`
					: "";
			const mensagem = `Senha incorreta. Verifique e tente novamente.${aviso}`;
			popupHeader(set, false, mensagem);
			return <div class="erro">{mensagem}</div>;
		}
		// FE-E3 — Bloqueio por excesso de tentativas (RN15).
		if (resultado.status === "conta_bloqueada") {
			authDebug("post-login-conta-bloqueada", {
				email: email.trim(),
				bloqueadaAte: resultado.bloqueadaAte,
			});
			set.status = 423;
			const minutos = Math.max(
				1,
				Math.ceil((resultado.bloqueadaAte.getTime() - Date.now()) / 60000),
			);
			const mensagem = `Muitas tentativas de login inválidas. Sua conta foi temporariamente bloqueada. Aguarde cerca de ${minutos} minuto(s) ou utilize a recuperação de senha.`;
			popupHeader(set, false, mensagem);
			return <div class="erro">{mensagem}</div>;
		}
		// FE-E4 — Conta inativa, suspensa ou bloqueada por motivo administrativo.
		if (resultado.status === "conta_inativa") {
			authDebug("post-login-conta-inativa", {
				email: email.trim(),
			});
			set.status = 403;
			const mensagem =
				"Sua conta está inativa ou suspensa. Entre em contato com o suporte para mais informações.";
			popupHeader(set, false, mensagem);
			return <div class="erro">{mensagem}</div>;
		}

		const { usuario } = resultado;
		const cookie = await cookieDeLogin({
			id: usuario.id,
			nome: usuario.nome,
			email: usuario.email,
		});
		authDebug("post-login-sucesso-cookie-gerado", {
			usuarioId: usuario.id,
			email: usuario.email,
			cookieTemHttpOnly: cookie.includes("HttpOnly"),
			cookieTemSameSiteLax: cookie.includes("SameSite=Lax"),
			cookieTemDomain: cookie.includes("Domain="),
			dominioEnv: process.env.DOMAIN ?? "(não definido)",
		});

		if (cookie.includes("Domain=")) {
			console.warn(
				`⚠️  [auth] Cookie de sessão contém "Domain=${process.env.DOMAIN}". ` +
				`Se o servidor não estiver rodando em ${process.env.DOMAIN}, ` +
				"o navegador REJEITARÁ este cookie e o login não funcionará.\n" +
				`  → Cookie: ${cookie}`,
			);
		}

		set.headers["Set-Cookie"] = cookie;
		set.headers["HX-Redirect"] = "/";
		authDebug("post-login-headers-definidos", {
			hxRedirect: set.headers["HX-Redirect"],
			temSetCookie: !!set.headers["Set-Cookie"],
		});

		return (
			<div class="sucesso">
				Login realizado com sucesso! Bem-vindo(a), {usuario.nome}.
			</div>
		);
	});