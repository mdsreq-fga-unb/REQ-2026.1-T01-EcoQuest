import { Html } from "@elysia/html";
import { Elysia } from "elysia";
import { sessionPlugin } from "../../plugins/session";
import { listarRecompensas, listarResgatesUsuario } from "../reward/service";
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
			const [pontos, recompensas, resgates] = await Promise.all([
				buscarSaldoPontos(sessao.id),
				listarRecompensas(),
				listarResgatesUsuario(sessao.id),
			]);

			// Monta um mapa: nome da recompensa → id real no banco
			const mapaId = new Map(recompensas.map((r) => [r.nome, r.id]));

			return (
				<CatalogoView
					nomeUsuario={sessao.nome}
					pontos={pontos}
					mapaIdRecompensa={mapaId}
					resgates={resgates}
				/>
			);
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
