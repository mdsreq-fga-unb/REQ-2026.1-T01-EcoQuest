import { Html } from "@elysia/html";
import { Elysia } from "elysia";
import { sessionPlugin } from "../../plugins/session";
import {
	ErroValidacaoDescarte,
	validarTokenERegistrarDescarte,
} from "./service";

export const disposalController = new Elysia({ prefix: "/disposal" })
	.use(sessionPlugin)
	.post(
		"/validate-token",
		async ({ sessao, body, set }) => {
			if (!sessao) {
				set.status = 401;
				return {
					status: "unauthorized",
					message: "Sessão expirada. Faça login novamente.",
				};
			}

			const payload = body as { jti?: string };
			if (!payload?.jti || typeof payload.jti !== "string") {
				set.status = 400;
				return {
					status: "token_invalido",
					message: "QR Code inválido.",
				};
			}

			try {
				const result = await validarTokenERegistrarDescarte(
					sessao.id,
					payload.jti,
				);
				return result;
			} catch (err) {
				if (err instanceof ErroValidacaoDescarte) {
					set.status = err.statusCode;
					return { status: err.codigo, message: err.message };
				}
				set.status = 500;
				return {
					status: "falha_validacao",
					message: "Não foi possível validar o QR Code.",
				};
			}
		},
		{ auth: true },
	);
