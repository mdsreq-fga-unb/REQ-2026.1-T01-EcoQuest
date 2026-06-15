import { Html, html } from "@elysia/html";
import { Elysia } from "elysia";
import { ensureSchema } from "./db";
import { authController } from "./modules/auth/controller";
import { extratoController } from "./modules/extrato/controller";
import { sessionPlugin } from "./plugins/session";

await ensureSchema();

const app = new Elysia()
	.use(html())
	.use(sessionPlugin)

	.get("/assets/*", async ({ path, set }) => {
		const file = Bun.file(`./src${path}`);
		if (!(await file.exists())) {
			set.status = 404;
			return "Not found";
		}
		return file;
	})

	.use(authController)
	.use(extratoController)

	.listen(3000);

console.log(
	`🦊 Elysia rodando em http://${app.server?.hostname}:${app.server?.port}`,
);
