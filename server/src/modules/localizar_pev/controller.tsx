import { Html } from "@elysia/html";
import { Elysia } from "elysia";
import { sessionPlugin } from "../../plugins/session";
import { MapaView } from "./views";

export const localizarPevController = new Elysia().use(sessionPlugin).get(
	"/localizar-pev",
	async ({ sessao, set }) => {
		if (!sessao) {
			set.status = 302;
			set.headers["Location"] = "/auth/login";
			return;
		}

		return <MapaView nomeUsuario={sessao.nome} />;
	},
	{ auth: true },
);
