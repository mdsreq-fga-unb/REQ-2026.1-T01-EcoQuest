import { Elysia } from "elysia";
import { obterSessao } from "../../lib/session";

const SESSION_DEBUG = process.env.SESSION_DEBUG === "1";

function pluginDebug(evento: string, detalhes?: Record<string, unknown>) {
	if (!SESSION_DEBUG) return;
	if (detalhes) {
		console.log(`[session-plugin] ${evento}`, detalhes);
		return;
	}
	console.log(`[session-plugin] ${evento}`);
}

export const sessionPlugin = new Elysia({ name: "session" })
	.derive(async ({ request }) => {
		const pathname = new URL(request.url).pathname;
		pluginDebug("derive-inicio", {
			method: request.method,
			path: pathname,
			temCookieHeader: !!request.headers.get("cookie"),
		});
		const sessaoAtual = await obterSessao(request.headers.get("cookie"));
		pluginDebug("derive-fim", {
			path: pathname,
			sessaoResolvida: !!sessaoAtual,
			usuarioId: sessaoAtual?.id ?? null,
		});
		return { sessaoAtual };
	})
	.macro({
		auth: {
			async resolve({ request }) {
				const sessao = await obterSessao(request.headers.get("cookie"));
			pluginDebug("macro-auth-resolve", {
					temSessao: !!sessao,
					usuarioId: sessao?.id ?? null,
			});
				return { sessao };
			},
		},
	});