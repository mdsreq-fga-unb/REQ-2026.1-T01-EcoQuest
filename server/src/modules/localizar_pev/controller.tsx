import { Html } from "@elysia/html";
import { Elysia } from "elysia";
import { obterSessao } from "../../../lib/session";
import { sessionPlugin } from "../../plugins/session";
import { MapaView } from "./views";

export const localizarPevController = new Elysia()
	.use(sessionPlugin)
	.get("/localizar-pev", async ({ request }) => {
		const sessaoAtual = await obterSessao(request.headers.get("cookie"));
		return (
			<MapaView
				nomeUsuario={sessaoAtual?.nome ?? "Visitante"}
				logado={!!sessaoAtual}
			/>
		);
	});
