import { Html } from "@elysia/html";
import { Elysia } from "elysia";
import { sessionPlugin } from "../../plugins/session";
import { MapaView } from "./views";

import { db } from "../../db";

export const localizarPevController = new Elysia()
	.use(sessionPlugin)
	.get("/localizar-pev", async ({ sessaoAtual }) => {
		return <MapaView nomeUsuario={sessaoAtual?.nome ?? "Visitante"} />;
	})
	.get("/api/pins", async () => {
		const pevs = await db`
			SELECT
				name,
				latitude  AS "lat",
				longitude AS "lng"
			FROM pev
			WHERE latitude IS NOT NULL
			  AND longitude IS NOT NULL
			ORDER BY name
		`;
		return pevs;
	});
