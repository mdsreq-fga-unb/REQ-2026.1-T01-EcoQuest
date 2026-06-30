import { Html } from "@elysia/html";
import { Elysia } from "elysia";
import { sessionPlugin } from "../../plugins/session";
import { CatalogoView } from "./catalogo.view";
import { buscarSaldoPontos, ErroSaldoIndisponivel } from "./service";

export const catalogoController = new Elysia().use(sessionPlugin).get(
	"/recompensas",
	async ({ sessao, set }) => {
		if (!sessao) {
			set.status = 302;
			set.headers["Location"] = "/auth/login";
			return;
		}

		try {
			const pontos = await buscarSaldoPontos(sessao.id);
			return <CatalogoView nomeUsuario={sessao.nome} pontos={pontos} />;
		} catch (err) {
			if (err instanceof ErroSaldoIndisponivel) {
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