const COOKIE_NAME = "eq_session";
const MAX_AGE_SECONDS = 60 * 60 * 24 * 7; 
const SESSION_DEBUG = process.env.SESSION_DEBUG === "1";

function sessionDebug(evento: string, detalhes?: Record<string, unknown>) {
	if (!SESSION_DEBUG) return;
	if (detalhes) {
		console.log(`[session] ${evento}`, detalhes);
		return;
	}
	console.log(`[session] ${evento}`);
}

function resumirToken(token: string): string {
	if (token.length <= 14) return token;
	return `${token.slice(0, 8)}...${token.slice(-6)}`;
}

export interface SessaoUsuario {
	id: number;
	nome: string;
	email: string;
	iat: number; 
}

let _chave: CryptoKey | null = null;

async function obterChave(): Promise<CryptoKey> {
	if (_chave) return _chave;

	const segredo = process.env.JWT_SECRET;
	if (!segredo || segredo.length < 16) {
		throw new Error("JWT_SECRET não configurado ou muito curto.");
	}

	const enc = new TextEncoder();
	_chave = await crypto.subtle.importKey(
		"raw",
		enc.encode(segredo),
		{ name: "HMAC", hash: "SHA-256" },
		false,
		["sign", "verify"],
	);

	return _chave;
}

function b64Encode(data: ArrayBuffer | string): string {
	const bytes =
		typeof data === "string"
			? new TextEncoder().encode(data)
			: new Uint8Array(data);
	let bin = "";
	for (const b of bytes) bin += String.fromCharCode(b);
	return btoa(bin).replace(/\+/g, "-").replace(/\//g, "_").replace(/=/g, "");
}

function b64Decode(s: string): Uint8Array<ArrayBuffer> {
	const padded = s.replace(/-/g, "+").replace(/_/g, "/");
	const bin = atob(padded);
	const bytes = new Uint8Array(bin.length) as Uint8Array<ArrayBuffer>;
	for (let i = 0; i < bin.length; i++) bytes[i] = bin.charCodeAt(i);
	return bytes;
}

export async function criarToken(sessao: Omit<SessaoUsuario, "iat">): Promise<string> {
	const chave = await obterChave();
	const payload: SessaoUsuario = {
		...sessao,
		iat: Math.floor(Date.now() / 1000),
	};
	const partePayload = b64Encode(JSON.stringify(payload));
	const sig = await crypto.subtle.sign(
		"HMAC",
		chave,
		new TextEncoder().encode(partePayload),
	);
	const token = `${partePayload}.${b64Encode(sig)}`;
	sessionDebug("token-criado", {
		usuarioId: sessao.id,
		email: sessao.email,
		token: resumirToken(token),
	});
	return token;
}

export async function verificarToken(token: string): Promise<SessaoUsuario | null> {
	try {
		const ponto = token.lastIndexOf(".");
		if (ponto === -1) {
			sessionDebug("token-invalido-sem-assinatura", {
				token: resumirToken(token),
			});
			return null;
		}

		const partePayload = token.slice(0, ponto);
		const parteSig = token.slice(ponto + 1);

		const chave = await obterChave();
		const valido = await crypto.subtle.verify(
			"HMAC",
			chave,
			b64Decode(parteSig),
			new TextEncoder().encode(partePayload),
		);
		if (!valido) {
			sessionDebug("token-assinatura-invalida", {
				token: resumirToken(token),
			});
			return null;
		}

		const sessao: SessaoUsuario = JSON.parse(
			new TextDecoder().decode(b64Decode(partePayload)),
		);

		// Expiração de 7 dias
		const agora = Math.floor(Date.now() / 1000);
		if (agora - sessao.iat > MAX_AGE_SECONDS) {
			sessionDebug("token-expirado", {
				usuarioId: sessao.id,
				iat: sessao.iat,
				agora,
			});
			return null;
		}

		sessionDebug("token-valido", {
			usuarioId: sessao.id,
			email: sessao.email,
		});

		return sessao;
	} catch (erro) {
		sessionDebug("erro-verificar-token", {
			erro: erro instanceof Error ? erro.message : String(erro),
		});
		return null;
	}
}

export function lerCookieDeRequest(cookieHeader: string | null | undefined): string | null {
	if (!cookieHeader) {
		sessionDebug("cookie-header-ausente");
		return null;
	}
	for (const parte of cookieHeader.split(";")) {
		const [chave, ...resto] = parte.trim().split("=");
		if (chave?.trim() === COOKIE_NAME) {
			const token = decodeURIComponent(resto.join("="));
			sessionDebug("cookie-encontrado", {
				token: resumirToken(token),
			});
			return token;
		}
	}
	sessionDebug("cookie-nao-encontrado", {
		cookies: cookieHeader.split(";").map((parte) => parte.trim().split("=")[0]),
	});
	return null;
}

export async function obterSessao(
	cookieHeader: string | null | undefined,
): Promise<SessaoUsuario | null> {
	const token = lerCookieDeRequest(cookieHeader);
	if (!token) {
		sessionDebug("sessao-ausente");
		return null;
	}
	const sessao = await verificarToken(token);
	if (!sessao) {
		sessionDebug("sessao-invalida", { token: resumirToken(token) });
		return null;
	}
	sessionDebug("sessao-resolvida", {
		usuarioId: sessao.id,
		email: sessao.email,
	});
	return sessao;
}

export async function cookieDeLogin(sessao: Omit<SessaoUsuario, "iat">): Promise<string> {
	const token = await criarToken(sessao);
	const dominio = process.env.DOMAIN ? `; Domain=${process.env.DOMAIN}` : "";
	const cookie = (
		`${COOKIE_NAME}=${encodeURIComponent(token)}` +
		`; Path=/` +
		`; HttpOnly` +
		`; SameSite=Lax` +
		`; Max-Age=${MAX_AGE_SECONDS}` +
		dominio
	);
	sessionDebug("cookie-login-gerado", {
		usuarioId: sessao.id,
		domain: process.env.DOMAIN ?? null,
		sameSite: "Lax",
		maxAge: MAX_AGE_SECONDS,
		token: resumirToken(token),
	});
	return cookie;
}

export function cookieDeLogout(): string {
	return `${COOKIE_NAME}=; Path=/; HttpOnly; SameSite=Lax; Max-Age=0`;
}

export { COOKIE_NAME };