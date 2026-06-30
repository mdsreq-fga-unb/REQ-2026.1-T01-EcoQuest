import { Html } from "@elysia/html";
import { Elysia } from "elysia";
import { obterSessao } from "../../../lib/session";
import { sessionPlugin } from "../../plugins/session";
import { buscarExtratoPorUsuario, ErroExtratoIndisponivel } from "./service";
import { ExtratoView } from "./views";

const EXTRATO_DEBUG = process.env.SESSION_DEBUG === "1";

function extratoDebug(evento: string, detalhes?: Record<string, unknown>) {
	if (!EXTRATO_DEBUG) return;
	if (detalhes) {
		console.log(`[extrato] ${evento}`, detalhes);
		return;
	}
	console.log(`[extrato] ${evento}`);
}

export const extratoController = new Elysia().use(sessionPlugin).get(
	"/",
	async ({ request, sessao, set }) => {
		extratoDebug("rota-raiz-inicio", {
			temCookieHeader: !!request.headers.get("cookie"),
			cookieHeader: request.headers
				.get("cookie")
				?.split(";")
				.map((c) => c.trim().split("=")[0])
				.filter(Boolean),
			temSessaoMacro: !!sessao,
			usuarioId: sessao?.id ?? null,
		});

		if (!sessao) {
			// Verificação direta como fallback de diagnóstico
			const sessaoDireta = await obterSessao(request.headers.get("cookie"));
			extratoDebug("rota-raiz-sessao-ausente", {
				sessaoMacro: !!sessao,
				sessaoDireta: !!sessaoDireta,
				usuarioIdDireto: sessaoDireta?.id ?? null,
			});

			set.status = 302;
			set.headers["Location"] = "/auth/login";
			return;
		}

		extratoDebug("rota-raiz-sessao-ok", {
			usuarioId: sessao.id,
			nome: sessao.nome,
		});

		try {
			const registros = await buscarExtratoPorUsuario(sessao.id);
			return <ExtratoView registros={registros} nomeUsuario={sessao.nome} />;
		} catch (err) {
			if (err instanceof ErroExtratoIndisponivel) {
				set.status = 503;
				return (
					<p style="color:#c62828;font-family:sans-serif;padding:2rem;">
						{err.message}
					</p>
				);
			}
			throw err;
		}
	},
	{ auth: true },
);
