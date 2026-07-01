import { SQL } from "bun";

export const db = new SQL({
	url: process.env.POSTGRES_URL ?? process.env.DATABASE_URL,
});

export async function ensureSchema() {
	const [{ exists }] = await db`
		SELECT EXISTS (
			SELECT 1
			FROM information_schema.tables
			WHERE table_schema = 'public'
			AND table_name = 'user'
		) AS exists
	`;

	if (exists) {
		console.log("Schema ja existe. Pulando criacao.");
		return;
	}

	console.log("Criando schema a partir de schema.sql...");

	const schemaPath = new URL("./schema.sql", import.meta.url);
	const schemaSql = await Bun.file(schemaPath).text();

	await db.unsafe(schemaSql);

	console.log("Schema criado com sucesso.");
}