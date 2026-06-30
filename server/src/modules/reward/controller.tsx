import { Html } from "@elysia/html";
import { Elysia } from "elysia";
import { sessionPlugin } from "../../plugins/session";
import { buscarSaldoPontos } from "../catalogo/service";
import {
	buscarRecompensaPorId,
	ErroFalhaDebitoPosCupom,
	ErroFalhaGeracaoCupom,
	ErroRecompensaIndisponivel,
	ErroSaldoInsuficiente,
	listarRecompensas,
	resgatarRecompensa,
} from "./service";

export const rewardController = new Elysia()
	.use(sessionPlugin)

	/**
	 * POST /recompensas/:id/resgatar
	 *
	 * Processa o resgate de uma recompensa do catálogo.
	 */
	.post(
		"/recompensas/:id/resgatar",
		async ({ sessao, params, set }) => {
			if (!sessao) {
				set.status = 401;
				return (
					<div class="erro" safe>
						Sessão expirada. Faça login novamente.
					</div>
				);
			}

			const idRecompensa = Number(params.id);

			if (!Number.isFinite(idRecompensa) || idRecompensa <= 0) {
				set.status = 400;
				return (
					<div class="erro" safe>
						Recompensa inválida.
					</div>
				);
			}

			try {
				const resultado = await resgatarRecompensa(sessao.id, idRecompensa);
				set.status = 200;

				return (
					<div class="resgate-sucesso" safe>
						<h2>✅ Resgate realizado com sucesso!</h2>
						<p>
							Seu cupom: <strong>{resultado.codigo}</strong>
						</p>
						<p>
							Pontos utilizados: <strong>{resultado.custoPontos}</strong>
						</p>
						<p>
							Saldo atual: <strong>{resultado.saldoApos} pts</strong>
						</p>
						<button
							class="btn btn--fechar-modal"
							type="button"
							onclick="fecharModal()"
							style="margin-top: 1.25rem; padding: 0.6rem 1.5rem; background: #2e7d32; color: #fff; border: none; border-radius: 8px; font-size: 0.95rem; cursor: pointer; width: 100%;"
						>
							OK
						</button>
					</div>
				);
			} catch (err) {
				if (err instanceof ErroRecompensaIndisponivel) {
					set.status = 404;
					return (
						<div class="erro" safe>
							<p>{err.message}</p>
							<button
								class="btn btn--fechar-modal"
								type="button"
								onclick="fecharModal()"
								style="margin-top: 1rem; padding: 0.5rem 1.25rem; background: #666; color: #fff; border: none; border-radius: 8px; font-size: 0.9rem; cursor: pointer;"
							>
								Fechar
							</button>
						</div>
					);
				}

				if (err instanceof ErroSaldoInsuficiente) {
					set.status = 400;
					return (
						<div class="erro" safe>
							<p style="margin-bottom: 0.75rem;">{err.message}</p>
							<button
								class="btn btn--fechar-modal"
								type="button"
								onclick="fecharModal()"
								style="padding: 0.5rem 1.25rem; background: #c62828; color: #fff; border: none; border-radius: 8px; font-size: 0.9rem; cursor: pointer;"
							>
								OK
							</button>
						</div>
					);
				}

				if (err instanceof ErroFalhaGeracaoCupom) {
					set.status = 503;
					return (
						<div class="erro" safe>
							<p>{err.message}</p>
							<button
								class="btn btn--fechar-modal"
								type="button"
								onclick="fecharModal()"
								style="margin-top: 1rem; padding: 0.5rem 1.25rem; background: #666; color: #fff; border: none; border-radius: 8px; font-size: 0.9rem; cursor: pointer;"
							>
								Fechar
							</button>
						</div>
					);
				}

				if (err instanceof ErroFalhaDebitoPosCupom) {
					set.status = 500;
					return (
						<div class="erro" safe>
							<p>{err.message}</p>
							<button
								class="btn btn--fechar-modal"
								type="button"
								onclick="fecharModal()"
								style="margin-top: 1rem; padding: 0.5rem 1.25rem; background: #c62828; color: #fff; border: none; border-radius: 8px; font-size: 0.9rem; cursor: pointer;"
							>
								Fechar
							</button>
						</div>
					);
				}

				throw err;
			}
		},
		{ auth: true },
	)

	/**
	 * GET /recompensas/:id/detalhes
	 *
	 * Retorna HTML com os detalhes de uma recompensa (para exibir no modal).
	 * Inclui o saldo do usuário para comparação visual (ajuda a evitar FA-4A).
	 */
	.get(
		"/recompensas/:id/detalhes",
		async ({ sessao, params, set }) => {
			if (!sessao) {
				set.status = 401;
				return (
					<div class="erro" safe>
						Sessão expirada. Faça login novamente.
					</div>
				);
			}

			const idRecompensa = Number(params.id);

			if (!Number.isFinite(idRecompensa) || idRecompensa <= 0) {
				set.status = 400;
				return (
					<div class="erro" safe>
						Recompensa inválida.
					</div>
				);
			}

			try {
				const [recompensa, saldo] = await Promise.all([
					buscarRecompensaPorId(idRecompensa),
					buscarSaldoPontos(sessao.id),
				]);

				if (!recompensa || !recompensa.ativo) {
					set.status = 404;
					return (
						<div class="erro" safe>
							Recompensa não encontrada.
						</div>
					);
				}

				const esgotada = recompensa.estoque !== null && recompensa.estoque <= 0;
				const pontosSuficientes = saldo >= recompensa.custoPontos;

				return (
					<div class="recompensa-detalhes">
						<h2>{recompensa.nome}</h2>
						<p class="recompensa-detalhes_parceiro">{recompensa.parceiro}</p>
						{recompensa.descricao && (
							<p class="recompensa-detalhes_descricao">
								{recompensa.descricao}
							</p>
						)}
						<p class="recompensa-detalhes_custo">
							Custo: <strong>{recompensa.custoPontos} pts</strong>
						</p>
						<p class="recompensa-detalhes_saldo">
							Seu saldo: <strong>{saldo} pts</strong>
							{pontosSuficientes ? " ✅" : " ❌ — Saldo insuficiente"}
						</p>
						<p class="recompensa-detalhes_estoque">
							{esgotada
								? "⚠️ Esgotada"
								: recompensa.estoque !== null
									? `📦 Estoque: ${recompensa.estoque} unidade(s)`
									: "♾️ Estoque ilimitado"}
						</p>
						{esgotada || !pontosSuficientes ? (
							<button class="btn" disabled>
								{esgotada ? "Indisponível" : "Saldo insuficiente"}
							</button>
						) : (
							<button
								class="btn btn--resgatar"
								hx-post={`/recompensas/${recompensa.id}/resgatar`}
								hx-target="#modal-recompensa"
								hx-swap="innerHTML"
							>
								Resgatar
							</button>
						)}
					</div>
				);
			} catch {
				set.status = 500;
				return (
					<div class="erro" safe>
						Erro ao carregar detalhes da recompensa.
					</div>
				);
			}
		},
		{ auth: true },
	);
