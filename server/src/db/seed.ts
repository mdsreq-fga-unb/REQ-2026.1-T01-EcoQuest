import { SQL } from "bun";

const db = new SQL({
	url: process.env.POSTGRES_URL ?? process.env.DATABASE_URL,
});

const filePath = process.argv[2];

if (!filePath) {
	console.error("Uso: bun run db:seed <caminho-do-arquivo.sql>");
	console.error("Exemplo: bun run db:seed src/db/seed_ranking.sql");
	process.exit(1);
}

const sqlFile = Bun.file(filePath);
const exists = await sqlFile.exists();

if (!exists) {
	console.error(`Arquivo não encontrado: ${filePath}`);
	process.exit(1);
}

const sql = await sqlFile.text();

console.log(`Executando seed: ${filePath}...`);

try {
	await db.unsafe(sql);
	console.log("Seed executado com sucesso.");
} catch (error) {
	console.error("Erro ao executar seed:", error);
	process.exit(1);
}

process.exit(0);
