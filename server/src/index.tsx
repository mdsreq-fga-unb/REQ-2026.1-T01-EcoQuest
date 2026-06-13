import { Html, html } from "@elysia/html";
import { Elysia } from "elysia";
import { CadastroView, LoginView } from "./modules/auth/views";

const app = new Elysia()
	.use(html())
	.get("/", () => (
		<html lang="en">
			<head>
				<meta charset="UTF-8" />
				<title>Elysia + HTMX + TSX</title>
				{/* Load HTMX via CDN */}
				<script
					src="https://cdn.jsdelivr.net/npm/htmx.org@2.0.10/dist/htmx.min.js"
					integrity="sha384-H5SrcfygHmAuTDZphMHqBJLc3FhssKjG7w/CeCpFReSfwBWDTKpkzPP8c+cLsK+V"
					crossorigin="anonymous"
				></script>
			</head>
			<body>
				<main style="padding: 2rem; font-family: sans-serif;">
					<h1>Hello Elysia + HTMX</h1>

					{/* HTMX Button triggering a partial DOM swap */}
					<button
						type="button"
						hx-post="/clicked"
						hx-target="#result"
						hx-swap="innerHTML"
					>
						Click Me
					</button>

					<div id="result" style="margin-top: 1rem;">
						Ready to swap content...
					</div>
				</main>
			</body>
		</html>
	))
	.get('/auth/login', () => <LoginView />)
	.get('/auth/cadastro', () => <CadastroView />)
	.post("/clicked", () => (
		<div id="result" style="color: green; font-weight: bold;">
			⚡ Content swapped instantly by HTMX from Elysia!
		</div>
	))
	.get("/assets/*", async ({ path, set }) => {
		const file = Bun.file(`./src${path}`);
		if (!(await file.exists())) {
			set.status = 404;
			return "Not found";
		}
		
		return file;
	})
	.post("/auth/cadastro", ({ body }) => {
		const { nome, cpf, telefone, email, senha, confirmarSenha } = body as Record<string, string>;
		const cpfDigits = (cpf ?? "").replace(/\D/g, "");

		function cpfValido(digits: string) {
			if (digits.length !== 11) return false;
			if (/^(\d)\1{10}$/.test(digits)) return false;

			let soma = 0;
			for (let i = 0; i < 9; i++) soma += parseInt(digits[i]) * (10 - i);
			let resto = (soma * 10) % 11;
			if (resto === 10 || resto === 11) resto = 0;
			if (resto !== parseInt(digits[9])) return false;

			soma = 0;
			for (let i = 0; i < 10; i++) soma += parseInt(digits[i]) * (11 - i);
			resto = (soma * 10) % 11;
			if (resto === 10 || resto === 11) resto = 0;
			if (resto !== parseInt(digits[10])) return false;

			return true;
		}

		if (!cpfValido(cpfDigits)) {
			return <div class="erro">CPF inválido. Verifique os números digitados.</div>;
		}

		// substituir por consulta real ao banco
		const cpfJaExiste = false;

		if (cpfJaExiste) {
			return <div class="erro">Este CPF já está cadastrado no sistema.</div>;
		}

		return <div class="sucesso">Conta criada com sucesso!</div>;
	})


	.listen(8080);

console.log(
	`🦊 Elysia is running at ${app.server?.hostname}:${app.server?.port}`,
);
