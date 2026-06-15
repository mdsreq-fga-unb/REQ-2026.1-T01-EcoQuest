import { html } from "@elysia/html";
import { Elysia } from "elysia";
import { authController } from "./modules/auth/controller";
import { extratoController } from "./modules/extrato/controller";
import { ensureSchema } from "./db";

await ensureSchema();

const app = new Elysia()
	.use(html())

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