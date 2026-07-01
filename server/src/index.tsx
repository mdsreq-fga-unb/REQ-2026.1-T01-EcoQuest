import { Html, html } from "@elysia/html";
import { Elysia } from "elysia";
import { networkInterfaces } from "os";
import { db, ensureSchema } from "./db";
import { achievementController } from "./modules/achievement/controller";
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
	.get("/api/pins", async ({ query, set }) => {
		try {
			const userLat = query["lat"] ? Number.parseFloat(query["lat"]) : null;
			const userLng = query["lng"] ? Number.parseFloat(query["lng"]) : null;
			const raioKm = query["raio"] ? Number.parseFloat(query["raio"]) : 10;

			console.log("[api/pins] query params:", { userLat, userLng, raioKm });

			if (
				userLat !== null &&
				userLng !== null &&
				Number.isFinite(userLat) &&
				Number.isFinite(userLng)
			) {
				console.log(
					`
					WITH params AS (
						SELECT
							${userLat}::numeric AS u_lat,
							${userLng}::numeric AS u_lng,
							${raioKm}::numeric  AS raio
					)
					SELECT
						p.name,
						p.latitude  AS "lat",
						p.longitude AS "lng",
						ROUND(CAST(
							6371 * 2 * ASIN(
								LEAST(1, SQRT(GREATEST(0,
									POWER(SIN(RADIANS(p.latitude  - params.u_lat) / 2), 2)
									+ COS(RADIANS(params.u_lat)) * COS(RADIANS(p.latitude))
									* POWER(SIN(RADIANS(p.longitude - params.u_lng) / 2), 2)
								))
							)
						AS numeric), 1) AS "distanciaKm"
					FROM pev p, params
					WHERE p.latitude IS NOT NULL
					  AND p.longitude IS NOT NULL
					  AND 6371 * 2 * ASIN(
							LEAST(1, SQRT(GREATEST(0,
								POWER(SIN(RADIANS(p.latitude  - params.u_lat) / 2), 2)
								+ COS(RADIANS(params.u_lat)) * COS(RADIANS(p.latitude))
								* POWER(SIN(RADIANS(p.longitude - params.u_lng) / 2), 2)
							))
						) <= params.raio
					ORDER BY "distanciaKm"
				`,
				);
				const pevs = await db`
    WITH params AS (
        SELECT
            ${userLat}::numeric AS u_lat,
            ${userLng}::numeric AS u_lng,
            ${raioKm}::numeric  AS raio
    ),
    calculated_distances AS (
        SELECT
            p.name,
            p.latitude  AS "lat",
            p.longitude AS "lng",
            ROUND(CAST(
                6371 * 2 * ASIN(
                    LEAST(1, SQRT(GREATEST(0,
                        POWER(SIN(RADIANS(p.latitude  - params.u_lat) / 2), 2)
                        + COS(RADIANS(params.u_lat)) * COS(RADIANS(p.latitude))
                        * POWER(SIN(RADIANS(p.longitude - params.u_lng) / 2), 2)
                    )))
                )
            AS numeric), 1) AS "distanciaKm"
        FROM pev p
        CROSS JOIN params
        WHERE p.latitude IS NOT NULL
          AND p.longitude IS NOT NULL
    )
    SELECT * 
    FROM calculated_distances
    WHERE "distanciaKm" <= (SELECT raio FROM params)
    ORDER BY "distanciaKm" ASC;
				`;

				console.log("[api/pins] com geo — encontrados:", pevs.length);
				if (pevs.length > 0) {
					console.log(
						"[api/pins] primeiro:",
						pevs[0].name,
						"distância:",
						pevs[0].distanciaKm,
					);
				}

				return pevs;
			}

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

			console.log("[api/pins] sem geo — total:", pevs.length);

			return pevs;
		} catch (err) {
			console.error("[api/pins] ERRO:", err);
			set.status = 500;
			return { erro: "Erro ao consultar PEVs.", detalhe: String(err) };
		}
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
	.use(achievementController)
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
