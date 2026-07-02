import { Html } from "@elysia/html";
import { Elysia } from "elysia";
import { obterSessao } from "../../../lib/session";
import { sessionPlugin } from "../../plugins/session";
import { db } from "../../db";
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
  })
  .get("/api/pins", async () => {
    const rows = await db`SELECT name, lat, lng FROM pev WHERE lat IS NOT NULL AND lng IS NOT NULL`;
    return rows;
  });
