import { Html } from "@elysia/html";
import { Elysia } from "elysia";
import { obterSessao } from "../../../lib/session";
import { sessionPlugin } from "../../plugins/session";
import {
	CATEGORIAS_SIMULACAO,
	ErroSimulacaoDescarte,
	gerarSimulacaoQr,
} from "./service";
import { SimularDescarteResultado, SimularDescarteView } from "./views";

export const simularDescarteController = new Elysia({
	prefix: "/simular_descarte",
})
	.use(sessionPlugin)
	.get("/", async ({ request, set }) => {
		const sessao = await obterSessao(request.headers.get("cookie"));
		if (!sessao) {
			set.status = 302;
			set.headers.Location = "/auth/login";
			return;
		}

		return (
			<SimularDescarteView
				nomeUsuario={sessao.nome}
				categorias={CATEGORIAS_SIMULACAO}
			/>
		);
	})
	.post("/gerar-qr", async ({ request, body, set }) => {
		const sessao = await obterSessao(request.headers.get("cookie"));
		if (!sessao) {
			set.status = 401;
			return <div class="erro">Sessão expirada. Faça login novamente.</div>;
		}

		try {
			const payload = (body as Record<string, string | undefined>) ?? {};
			const resultado = await gerarSimulacaoQr(payload);
			const appHomeUrl = `${new URL(request.url).origin}/`;

			return (
				<SimularDescarteResultado
					resultado={resultado}
					appHomeUrl={appHomeUrl}
				/>
			);
		} catch (err) {
			if (err instanceof ErroSimulacaoDescarte) {
				set.status = 400;
				return <div class="erro">{err.message}</div>;
			}
			set.status = 500;
			return (
				<div class="erro">
					Falha inesperada ao gerar QR Code. Tente novamente em instantes.
				</div>
			);
		}
	});
