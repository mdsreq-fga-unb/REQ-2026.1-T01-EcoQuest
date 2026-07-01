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
		const [{ disposalMaterialExists }] = await db`
			SELECT EXISTS (
				SELECT 1
				FROM information_schema.columns
				WHERE table_schema = 'public'
				AND table_name = 'disposal'
				AND column_name = 'material_type'
			) AS "disposalMaterialExists"
		`;
		const [{ disposalWeightExists }] = await db`
			SELECT EXISTS (
				SELECT 1
				FROM information_schema.columns
				WHERE table_schema = 'public'
				AND table_name = 'disposal'
				AND column_name = 'weight_kg'
			) AS "disposalWeightExists"
		`;

		if (!disposalMaterialExists) {
			await db.unsafe(`ALTER TABLE disposal ADD COLUMN material_type TEXT`);
		}
		if (!disposalWeightExists) {
			await db.unsafe(`ALTER TABLE disposal ADD COLUMN weight_kg NUMERIC`);
		}

		const [{ rankingAnonymousExists }] = await db`
			SELECT EXISTS (
				SELECT 1
				FROM information_schema.columns
				WHERE table_schema = 'public'
				AND table_name = 'user'
				AND column_name = 'ranking_anonymous'
			) AS "rankingAnonymousExists"
		`;
		if (!rankingAnonymousExists) {
			await db.unsafe(
				`ALTER TABLE "user" ADD COLUMN ranking_anonymous BOOLEAN NOT NULL DEFAULT FALSE`,
			);
		}

		const [{ pevLatExists }] = await db`
			SELECT EXISTS (
				SELECT 1
				FROM information_schema.columns
				WHERE table_schema = 'public'
				AND table_name = 'pev'
				AND column_name = 'latitude'
			) AS "pevLatExists"
		`;
		if (!pevLatExists) {
			await db.unsafe(`ALTER TABLE pev ADD COLUMN latitude NUMERIC`);
		}

		const [{ pevLngExists }] = await db`
			SELECT EXISTS (
				SELECT 1
				FROM information_schema.columns
				WHERE table_schema = 'public'
				AND table_name = 'pev'
				AND column_name = 'longitude'
			) AS "pevLngExists"
		`;
		if (!pevLngExists) {
			await db.unsafe(`ALTER TABLE pev ADD COLUMN longitude NUMERIC`);
		}

		console.log("Schema do banco ja existe. Pulando inicializacao.");
		return;
	}

	console.log("Tabela 'user' nao encontrada. Criando schema a partir de schema.sql...");

	const schemaPath = new URL("./schema.sql", import.meta.url);
	const schemaSql = await Bun.file(schemaPath).text();


	await db.unsafe(schemaSql);

	console.log("Schema criado com sucesso.");
}