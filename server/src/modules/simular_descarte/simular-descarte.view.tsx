import { Html } from "@elysia/html";
import { AppLayout } from "../../components/Applayout";
import { assetUrl } from "../../lib/asset-url";
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

function IconePilha() {
	return (
		<svg
			xmlns="http://www.w3.org/2000/svg"
			viewBox="0 0 24 24"
			fill="none"
			stroke="currentColor"
			strokeWidth="1.8"
			strokeLinecap="round"
			strokeLinejoin="round"
			aria-hidden="true"
			class="simular-cat_icone-svg"
		>
			<rect x="6" y="4" width="12" height="16" rx="2" />
			<line x1="10" y1="2" x2="14" y2="2" />
			<line x1="10" y1="8" x2="14" y2="8" />
		</svg>
	);
}

function IconeBateria() {
	return (
		<svg
			xmlns="http://www.w3.org/2000/svg"
			viewBox="0 0 24 24"
			fill="none"
			stroke="currentColor"
			strokeWidth="1.8"
			strokeLinecap="round"
			strokeLinejoin="round"
			aria-hidden="true"
			class="simular-cat_icone-svg"
		>
			<rect x="2" y="7" width="18" height="10" rx="2" />
			<line x1="22" y1="10" x2="22" y2="14" />
			<line x1="6" y1="12" x2="10" y2="12" />
			<line x1="8" y1="10" x2="8" y2="14" />
		</svg>
	);
}

function IconeTelefone() {
	return (
		<svg
			xmlns="http://www.w3.org/2000/svg"
			viewBox="0 0 24 24"
			fill="none"
			stroke="currentColor"
			strokeWidth="1.8"
			strokeLinecap="round"
			strokeLinejoin="round"
			aria-hidden="true"
			class="simular-cat_icone-svg"
		>
			<rect x="7" y="2" width="10" height="20" rx="2" />
			<line x1="11" y1="18" x2="13" y2="18" />
		</svg>
	);
}

function IconeComputador() {
	return (
		<svg
			xmlns="http://www.w3.org/2000/svg"
			viewBox="0 0 24 24"
			fill="none"
			stroke="currentColor"
			strokeWidth="1.8"
			strokeLinecap="round"
			strokeLinejoin="round"
			aria-hidden="true"
			class="simular-cat_icone-svg"
		>
			<rect x="2" y="3" width="20" height="14" rx="2" />
			<line x1="8" y1="21" x2="16" y2="21" />
			<line x1="12" y1="17" x2="12" y2="21" />
		</svg>
	);
}

function IconeOutros() {
	return (
		<svg
			xmlns="http://www.w3.org/2000/svg"
			viewBox="0 0 24 24"
			fill="none"
			stroke="currentColor"
			stroke-width="1.8"
			stroke-linecap="round"
			stroke-linejoin="round"
			aria-hidden="true"
			class="simular-cat_icone-svg"
		>
			<polyline points="1 4 1 10 7 10" />
			<polyline points="23 20 23 14 17 14" />
			<path d="M20.49 9A9 9 0 0 0 5.64 5.64L1 10m22 4l-4.64 4.36A9 9 0 0 1 3.51 15" />
		</svg>
	);
}

function IconeTv() {
	return (
		<svg
			xmlns="http://www.w3.org/2000/svg"
			viewBox="0 0 24 24"
			fill="none"
			stroke="currentColor"
			stroke-width="1.8"
			stroke-linecap="round"
			stroke-linejoin="round"
			aria-hidden="true"
			class="simular-cat_icone-svg"
		>
			<rect x="2" y="4" width="20" height="14" rx="2" />
			<line x1="10" y1="18" x2="8" y2="22" />
			<line x1="14" y1="18" x2="16" y2="22" />
			<line x1="12" y1="14" x2="12" y2="18" />
		</svg>
	);
}

function IconeEletro() {
	return (
		<svg
			xmlns="http://www.w3.org/2000/svg"
			viewBox="0 0 24 24"
			fill="none"
			stroke="currentColor"
			stroke-width="1.8"
			stroke-linecap="round"
			stroke-linejoin="round"
			aria-hidden="true"
			class="simular-cat_icone-svg"
		>
			<circle cx="12" cy="12" r="7" />
			<path d="M12 9v3l2 2" />
			<path d="M5 5L3 3M19 5l2-2" />
		</svg>
	);
}

type TipoIcone =
	| "pilha"
	| "bateria"
	| "telefone"
	| "computador"
	| "tv"
	| "eletro"
	| "outros";

const CHAVE_PARA_TIPO: Record<string, TipoIcone> = {
	microcomputador: "computador",
	monitor_tubo: "computador",
	monitor_lcd: "computador",
	monitor_led: "computador",
	monitor_plasma: "computador",
	notebook: "computador",
	servidor: "computador",
	teclado: "computador",
	mouse: "computador",
	impressora: "computador",
	estabilizador: "computador",
	tablet: "computador",
	no_break: "computador",
	tv_tubo: "tv",
	tv_led: "tv",
	tv_lcd: "tv",
	tv_plasma: "tv",
	video_cassete: "eletro",
	dvd_player: "eletro",
	aparelho_som: "eletro",
	controle_remoto: "eletro",
	forno_microondas: "eletro",
	secador_cabelo: "eletro",
	prancha_cabelo: "eletro",
	aparelho_celular: "telefone",
	acessorios: "telefone",
	smartphone: "telefone",
	telefone_sem_fio: "telefone",
	telefone_com_fio: "telefone",
	fax: "telefone",
	secretaria_eletronica: "telefone",
	carregadores: "telefone",
	adaptadores: "telefone",
	bateria_notebook: "bateria",
	bateria_no_break: "bateria",
	chapa_raio_x: "outros",
	cabos_forca: "outros",
	cabos_geral: "outros",
	modem: "outros",
	roteador: "outros",
};

const ROTULO_TIPO: Record<TipoIcone, string> = {
	pilha: "Pilhas e outros",
	bateria: "Baterias",
	telefone: "Telefones e acessórios",
	computador: "Computadores e acessórios",
	tv: "Televisores",
	eletro: "Equipamentos eletrônicos",
	outros: "Outros",
};

const ICONE_TIPO: Record<TipoIcone, () => JSX.Element> = {
	pilha: IconePilha,
	bateria: IconeBateria,
	telefone: IconeTelefone,
	computador: IconeComputador,
	tv: IconeTv,
	eletro: IconeEletro,
	outros: IconeOutros,
};

const ORDEM_TIPO: TipoIcone[] = [
	"bateria",
	"telefone",
	"computador",
	"tv",
	"eletro",
	"outros",
];

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

function IconeCategoria({ tipo }: { tipo: TipoIcone }) {
	const Icone = ICONE_TIPO[tipo];
	return <Icone />;
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
			cssExtra={assetUrl("css/simular.css")}
			jsExtra={assetUrl("js/simular.js")}
		>
			<main class="simular-conteudo" id="conteudo-principal">
				<header class="simular-topo">
					<h1>Simulação de descarte</h1>
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
					{(() => {
						const todosItens = categorias.flatMap((cat) => cat.itens);

						// Agrupa por tipo de ícone
						const porTipo = new Map<TipoIcone, typeof todosItens>();
						for (const item of todosItens) {
							const tipo = CHAVE_PARA_TIPO[item.chave] ?? "pilha";
							if (!porTipo.has(tipo)) porTipo.set(tipo, []);
							porTipo.get(tipo)!.push(item);
						}

						return ORDEM_TIPO.filter((tipo) => porTipo.has(tipo)).map(
							(tipo) => (
								<section
									class="simular-categoria"
									aria-labelledby={`cat-icone-${tipo}`}
									key={tipo}
									data-categoria={tipo}
								>
									<h2 id={`cat-icone-${tipo}`} class="simular-categoria_titulo">
										<span class="simular-cat_icone" aria-hidden="true">
											<IconeCategoria tipo={tipo} />
										</span>
										{ROTULO_TIPO[tipo]}
									</h2>
									<div class="simular-grid">
										{porTipo.get(tipo)!.map((item) => (
											<CardItem
												key={item.chave}
												nome={item.nome}
												chave={item.chave}
												pesoUnitarioKg={item.pesoUnitarioKg}
											/>
										))}
									</div>
								</section>
							),
						);
					})()}

					<section
						class="simular-resumo-parcial"
						aria-live="polite"
						style="background-color: var(--color-white);"
					>
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
