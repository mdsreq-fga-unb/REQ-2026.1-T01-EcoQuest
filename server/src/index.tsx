import { Html, html } from "@elysia/html";
import { Elysia } from "elysia";
import { authController } from "./modules/auth/controller";
import { ensureSchema } from "./db";

await ensureSchema();

const app = new Elysia()
	.use(html())
	.get("/", () => (
		<html lang="en">
			<head>
				<meta charset="UTF-8" />
				<title>Elysia + HTMX + TSX</title>
				{/* Load HTMX via CDN */}
				<script
					src="https://cdn.jsdelivr.net/npm/htmx.org@2.0.10/dist/htmx.min.js"
					integrity="sha384-H5SrcfygHmAuTDZphMHqBJLc3FhssKjG7w/CeCpFReSfwBWDTKpkzPP8c+cLsK+V"
					crossorigin="anonymous"
				></script>
			</head>
			<body>
				<main style="padding: 2rem; font-family: sans-serif;">
					<h1>Hello Elysia + HTMX</h1>

					{/* HTMX Button triggering a partial DOM swap */}
					<button
						type="button"
						hx-post="/clicked"
						hx-target="#result"
						hx-swap="innerHTML"
					>
						Click Me
					</button>

					<div id="result" style="margin-top: 1rem;">
						Ready to swap content...
					</div>
				</main>
			</body>
		</html>
	))
	.post("/clicked", () => (
		<div id="result" style="color: green; font-weight: bold;">
			⚡ Content swapped instantly by HTMX from Elysia!
		</div>
	))
	.get("/assets/*", async ({ path, set }) => {
		const file = Bun.file(`./src${path}`);
		if (!(await file.exists())) {
			set.status = 404;
			return "Not found";
		}

		return file;
	})
	.use(authController)
	.listen(3000);

console.log(
	`🦊 Elysia is running at ${app.server?.hostname}:${app.server?.port}`,
);
