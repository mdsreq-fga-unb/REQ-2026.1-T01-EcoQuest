import { getVersion } from "./version";

/**
 * Retorna a URL absoluta de um asset com query string de versionamento
 * para cache busting. Exemplo: `/assets/css/auth.css?v=abc1234`
 *
 * Uso: `assetUrl("css/auth.css")` → `/assets/css/auth.css?v=abc1234`
 */
export function assetUrl(path: string): string {
	const version = getVersion();
	const cleanPath = path.startsWith("/") ? path.slice(1) : path;
	return `/assets/${cleanPath}?v=${version}`;
}
