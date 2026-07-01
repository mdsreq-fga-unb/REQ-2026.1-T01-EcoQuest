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

		// ── insignia_reward ─────────────────────────────────────────────
		const [{ insigniaRewardExists }] = await db`
			SELECT EXISTS (
				SELECT 1
				FROM information_schema.tables
				WHERE table_schema = 'public'
				AND table_name = 'insignia_reward'
			) AS "insigniaRewardExists"
		`;
		if (!insigniaRewardExists) {
			await db.unsafe(`
				CREATE TABLE insignia_reward (
					id_insignia BIGINT NOT NULL REFERENCES insignia(id) ON DELETE CASCADE,
					id_reward   BIGINT NOT NULL REFERENCES reward(id) ON DELETE RESTRICT,
					created_at  TIMESTAMPTZ NOT NULL DEFAULT now(),
					PRIMARY KEY (id_insignia, id_reward)
				);
				CREATE INDEX insignia_reward_insignia_idx ON insignia_reward (id_insignia);
				CREATE INDEX insignia_reward_reward_idx   ON insignia_reward (id_reward);
			`);
			console.log("Tabela 'insignia_reward' criada.");
		}

		// Remove tabela antiga se ainda existir (migração de premio_insignia)
		await db.unsafe(`DROP TABLE IF EXISTS premio_insignia CASCADE`);

		// Relaxa constraint do reward_redemption para aceitar 0 (prêmios de insígnia)
		await db.unsafe(`
			ALTER TABLE reward_redemption
			DROP CONSTRAINT IF EXISTS reward_redemption_points_cost_snapshot_positive
		`);
		await db.unsafe(`
			ALTER TABLE reward_redemption
			ADD CONSTRAINT reward_redemption_points_cost_snapshot_non_negative
			CHECK (points_cost_snapshot >= 0)
		`);

		console.log("Schema do banco ja existe. Pulando inicializacao.");
		return;
	}

	console.log("Tabela 'user' nao encontrada. Criando schema a partir de schema.sql...");

	const schemaPath = new URL("./schema.sql", import.meta.url);
	const schemaSql = await Bun.file(schemaPath).text();


	await db.unsafe(schemaSql);

	console.log("Schema criado com sucesso.");
}