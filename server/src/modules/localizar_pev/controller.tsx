import { Html } from "@elysia/html";
import { Elysia } from "elysia";
import { sessionPlugin } from "../../plugins/session";
import { MapaView } from "./views";

export const localizarPevController = new Elysia()
	.use(sessionPlugin)
	.get("/localizar-pev", async ({ sessao }) => {
		return <MapaView nomeUsuario={sessao?.nome ?? "Visitante"} />;
	});
