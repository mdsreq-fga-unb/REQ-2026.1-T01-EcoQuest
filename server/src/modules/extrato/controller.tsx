import { Html } from "@elysia/html";
import { Elysia } from "elysia";
import { sessionPlugin } from "../../plugins/session";
import { buscarExtratoPorUsuario, ErroExtratoIndisponivel } from "./service";
import { ExtratoView } from "./views";

export const extratoController = new Elysia().use(sessionPlugin).get(
	"/",
	async ({ sessao, set }) => {
		if (!sessao) {
			set.status = 302;
			set.headers["Location"] = "/auth/login";
			return;
		}
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
