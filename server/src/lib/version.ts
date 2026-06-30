/**
 * Version hash gerado na inicialização do servidor.
 * Usa o hash do git (se disponível) ou um timestamp como fallback.
 * Anexado como query param em URLs de assets para cache busting.
 *
 * NOTA: Este módulo usa import.meta.resolve para descobrir o diretório
 * raiz e executar git. A versão é computada uma vez na primeira
 * importação.
 */

let _version: string | null = null;

function computeVersion(): string {
	try {
		// Tenta descobrir a raiz do projeto a partir do diretório deste arquivo
		const rootDir = import.meta.dir
			? `${import.meta.dir}/../..`
			: undefined;
		const proc = Bun.spawnSync(["git", "rev-parse", "--short", "HEAD"], {
			cwd: rootDir,
		});
		if (proc.exitCode === 0) {
			const hash = proc.stdout.toString().trim();
			if (hash) return hash;
		}
	} catch {
		// git não disponível — fallback
	}
	// Fallback: timestamp base-36 (compacto e único por inicialização)
	return Date.now().toString(36);
}

export function getVersion(): string {
	if (!_version) {
		_version = computeVersion();
	}
	return _version;
}
