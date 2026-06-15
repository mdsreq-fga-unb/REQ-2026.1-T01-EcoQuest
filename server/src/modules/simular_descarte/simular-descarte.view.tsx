import { Html } from "@elysia/html";
import { AppLayout } from "../../components/Applayout";
import type {
	CategoriaSimulacao,
	ItemResumoGerado,
	SimulacaoQrGerada,
} from "./service";

function formatarPeso(pesoKg: number): string {
	if (pesoKg >= 1) return `${pesoKg.toFixed(2).replace(".", ",")} kg`;
	return `${Math.round(pesoKg * 1000)} g`;
}

function formatarDataHora(data: Date): string {
	return new Intl.DateTimeFormat("pt-BR", {
		day: "2-digit",
		month: "2-digit",
		year: "numeric",
		hour: "2-digit",
		minute: "2-digit",
	}).format(data);
}

function qrSvgToDataUri(svg: string): string {
	return `data:image/svg+xml;utf8,${encodeURIComponent(svg)}`;
}

function CardItem({
	nome,
	chave,
	pesoUnitarioKg,
}: {
	nome: string;
	chave: string;
	pesoUnitarioKg: number;
}) {
	return (
		<article
			class="simular-item"
			data-item={chave}
			data-peso-unitario={pesoUnitarioKg}
		>
			<h3 class="simular-item_nome">{nome}</h3>
			<p class="simular-item_meta">
				Peso unitário: <strong>{formatarPeso(pesoUnitarioKg)}</strong>
			</p>
			<div class="simular-item_controles">
				<button type="button" class="simular-item_btn" data-action="diminuir">
					-
				</button>
				<output
					class="simular-item_quantidade"
					data-role="quantidade"
					aria-live="polite"
				>
					0
				</output>
				<button type="button" class="simular-item_btn" data-action="aumentar">
					+
				</button>
			</div>
			<p class="simular-item_peso">
				Peso simulado: <strong data-role="peso-item">0 g</strong>
			</p>
			<input
				type="hidden"
				name={`qty_${chave}`}
				value="0"
				data-role="input-qty"
			/>
		</article>
	);
}

function ResumoItens({ itens }: { itens: ItemResumoGerado[] }) {
	return (
		<ul class="simular-resultado_lista">
			{itens.map((item) => (
				<li class="simular-resultado_item" key={item.chave}>
					<span>{item.nome}</span>
					<span>{item.quantidade}x</span>
					<span>{formatarPeso(item.pesoTotalKg)}</span>
				</li>
			))}
		</ul>
	);
}

export function SimularDescarteResultado({
	resultado,
	appHomeUrl,
}: {
	resultado: SimulacaoQrGerada;
	appHomeUrl: string;
}) {
	return (
		<section class="simular-resultado" aria-live="polite">
			<h2>QR Code gerado com sucesso</h2>
			<div class="simular-resultado_qr">
				<img
					src={qrSvgToDataUri(resultado.qrSvg)}
					alt="QR Code do token simulado"
				/>
			</div>
			<p class="simular-resultado_jti">
				Token: <strong>{resultado.jti}</strong>
			</p>
			<p class="simular-resultado_expira">
				Válido até: <strong>{formatarDataHora(resultado.expiresAt)}</strong>
			</p>
			<div class="simular-resultado_totais">
				<p>
					Itens simulados: <strong>{resultado.totalItens}</strong>
				</p>
				<p>
					Peso total: <strong>{formatarPeso(resultado.totalPesoKg)}</strong>
				</p>
			</div>
			<ResumoItens itens={resultado.itensSelecionados} />
			<div class="simular-resultado_acoes">
				<a class="simular-btn simular-btn_secundario" href="/simular_descarte">
					Gerar outro QR Code
				</a>
				<a class="simular-btn" href={appHomeUrl}>
					Voltar para a aplicação central
				</a>
			</div>
		</section>
	);
}

export function SimularDescarteView({
	nomeUsuario,
	categorias,
}: {
	nomeUsuario: string;
	categorias: CategoriaSimulacao[];
}) {
	return (
		<AppLayout
			title="Simular Descarte - EcoQuest"
			rotaAtiva="/simular_descarte"
			nomeUsuario={nomeUsuario}
			cssExtra="/assets/simular_descarte.css"
			jsExtra="/assets/simular_descarte.js"
		>
			<main class="simular-conteudo" id="conteudo-principal">
				<header class="simular-topo">
					<h1>Simulação de descarte (UC08)</h1>
					<p>
						Esta tela gera um QR Code simulado com os itens e o peso do descarte
						selecionado.
					</p>
				</header>

				<form
					class="simular-form"
					hx-post="/simular_descarte/gerar-qr"
					hx-target="#simulacao-resultado"
					hx-swap="innerHTML"
				>
					{categorias.map((categoria) => (
						<section
							class="simular-categoria"
							aria-labelledby={`cat-${categoria.id}`}
							key={categoria.id}
						>
							<h2 id={`cat-${categoria.id}`}>{categoria.titulo}</h2>
							<div class="simular-grid">
								{categoria.itens.map((item) => (
									<CardItem
										key={item.chave}
										nome={item.nome}
										chave={item.chave}
										pesoUnitarioKg={item.pesoUnitarioKg}
									/>
								))}
							</div>
						</section>
					))}

					<section class="simular-resumo-parcial" aria-live="polite">
						<p>
							Total de itens: <strong id="simular-total-itens">0</strong>
						</p>
						<p>
							Peso total simulado: <strong id="simular-total-peso">0 g</strong>
						</p>
					</section>

					<button class="simular-btn" type="submit">
						Gerar QR Code
					</button>
				</form>

				<div id="simulacao-resultado" class="simular-resultado-placeholder">
					Aguardando geração do QR Code...
				</div>
			</main>
		</AppLayout>
	);
}
