import { Html } from "@elysia/html";
import { Elysia } from "elysia";
import { sessionPlugin } from "../../plugins/session";
import {
	buscarRanking,
	ErroAnonimato,
	ErroRankingIndisponivel,
} from "./service";
import { RankingView } from "./views";

export const rankingController = new Elysia({ prefix: "/ranking" })
	.use(sessionPlugin)
	.get(
		"/",
		async ({ sessao, set }) => {
			if (!sessao) {
				set.status = 302;
				set.headers["Location"] = "/auth/login";
				return;
			}

			try {
				const resultado = await buscarRanking(sessao.id);
				return (
					<RankingView
						top20={resultado.top20}
						posicaoUsuario={resultado.posicaoUsuario}
						nomeUsuario={sessao.nome}
					/>
				);
			} catch (err) {
				if (err instanceof ErroAnonimato) {
					// E2 — Preserva privacidade, não exibe ranking
					set.status = 503;
					return (
						<p style="color:#c62828;font-family:sans-serif;padding:2rem;">
							{err.message}
						</p>
					);
				}
				if (err instanceof ErroRankingIndisponivel) {
					// E1 / E3 — Indisponibilidade temporária
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
