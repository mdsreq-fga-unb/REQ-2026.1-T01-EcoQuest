import { Html } from "@elysia/html";
import { Elysia } from "elysia";
import { sessionPlugin } from "../../plugins/session";
import {
	buscarVitrinePorUsuario,
	ErroVitrineIndisponivel,
} from "./service";
import { AchievementView } from "./views";

export const achievementController = new Elysia()
	.use(sessionPlugin)
	.get(
		"/insignias",
		async ({ sessao, set }) => {
			if (!sessao) {
				set.status = 302;
				set.headers.Location = "/auth/login";
				return;
			}

			try {
				const vitrine = await buscarVitrinePorUsuario(sessao.id);
				return AchievementView({
					vitrine,
					nomeUsuario: sessao.nome,
				});
			} catch (erro) {
				if (erro instanceof ErroVitrineIndisponivel) {
					set.status = 503;
					return AchievementView({
						erro: erro.message,
						nomeUsuario: sessao.nome,
					});
				}				throw erro;
			}
		},
		{ auth: true },
	);