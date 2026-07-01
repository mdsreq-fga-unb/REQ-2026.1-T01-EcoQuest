import { Html, html } from "@elysia/html";
import { Elysia } from "elysia";
import { networkInterfaces } from "os";
import { db, ensureSchema } from "./db";
import { authController } from "./modules/auth/controller";
import { catalogoController } from "./modules/catalogo/controller";
import { disposalController } from "./modules/disposal/controller";
import { extratoController } from "./modules/extrato/controller";
import { localizarPevController } from "./modules/localizar_pev/controller";
import { rankingController } from "./modules/ranking/controller";
import { rewardController } from "./modules/reward/controller";
import { simularDescarteController } from "./modules/simular_descarte/controller";
import { sessionPlugin } from "./plugins/session";

await ensureSchema();

const CERTIFICATE_PATH = process.env.CERTIFICATE_PATH;
const PORT = process.env.PORT || 3000;

if (!CERTIFICATE_PATH) {
	throw new Error(
		"CERTIFICATE_PATH is not defined in the environment variables.",
	);
}

const CERTIFICATE_KEY_PATH = process.env.CERTIFICATE_KEY_PATH;
if (!CERTIFICATE_KEY_PATH) {
	throw new Error(
		"CERTIFICATE_KEY_PATH is not defined in the environment variables.",
	);
}

const app = new Elysia({
	serve: {
		tls: {
			key: Bun.file(CERTIFICATE_KEY_PATH),
			cert: Bun.file(CERTIFICATE_PATH),
		},
	},
})
	.use(html())
	.use(sessionPlugin)
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
	})
	.get("/assets/*", async ({ path, set }) => {
		const file = Bun.file(`./src${path}`);
		if (!(await file.exists())) {
			set.status = 404;
			return "Not found";
		}

		// Cache agressivo: o navegador nunca revalida — a versão é controlada
		// pelo query param `?v=XXXX` incluído nas URLs dos assets.
		set.headers["Cache-Control"] = "public, max-age=31536000, immutable";

		return file;
	})

	.use(authController)
	.use(disposalController)
	.use(extratoController)
	.use(catalogoController)
	.use(rewardController)
	.use(rankingController)
	.use(localizarPevController)
	.use(simularDescarteController)
	.listen(PORT);

function getLocalIP() {
	const nets = networkInterfaces();
	for (const name of Object.keys(nets)) {
		if (!nets[name]) continue;
		for (const net of nets[name]) {
			// Skip internal (localhost) and non-IPv4 addresses
			if (net.family === "IPv4" && !net.internal) {
				return net.address;
			}
		}
	}
	return "127.0.0.1";
}
console.log(
	`🔋 EcoQuest rodando em https://${getLocalIP()}:${app.server?.port}`,
);
