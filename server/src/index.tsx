import { Html, html } from "@elysia/html";
import { Elysia } from "elysia";

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

	// 3. HTMX Endpoint: Returns raw hypermedia fragments (not full pages)
	.post("/clicked", () => (
		<div id="result" style="color: green; font-weight: bold;">
			⚡ Content swapped instantly by HTMX from Elysia!
		</div>
	))

	.listen(3000);

console.log(
	`🦊 Elysia is running at ${app.server?.hostname}:${app.server?.port}`,
);
