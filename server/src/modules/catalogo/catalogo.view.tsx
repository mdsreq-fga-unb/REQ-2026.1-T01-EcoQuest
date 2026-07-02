import { Html } from "@elysia/html";
import { AppLayout } from "../../components/Applayout";
import type { ResgateUsuario } from "../reward/service";

interface Catalogo {
	titulo: string;
	loja: string;
	pontos: number;
	emoji: string;
}

interface Categoria {
	nome: string;
	itens: Catalogo[];
}

const CATEGORIAS: Categoria[] = [
	{
		nome: "Mercado",
		itens: [
			{
				titulo: "R$ 50 OFF em compras",
				loja: "Carrefour",
				pontos: 600,
				emoji: "🛒",
			},
			{
				titulo: "15% OFF em hortifruti",
				loja: "Pão de Açúcar",
				pontos: 350,
				emoji: "🥦",
			},
			{
				titulo: "R$ 30 OFF acima de R$ 150",
				loja: "Extra",
				pontos: 420,
				emoji: "🧺",
			},
			{
				titulo: "10% OFF em produtos de limpeza",
				loja: "Assaí",
				pontos: 280,
				emoji: "🧴",
			},
		],
	},
	{
		nome: "Eletrônicos",
		itens: [
			{
				titulo: "10% OFF em eletrônicos",
				loja: "Amazon",
				pontos: 950,
				emoji: "📦",
			},
			{
				titulo: "R$ 80 OFF em fones e áudio",
				loja: "Magalu",
				pontos: 700,
				emoji: "🎧",
			},
			{
				titulo: "15% OFF em acessórios",
				loja: "Kabum",
				pontos: 600,
				emoji: "🔌",
			},
			{
				titulo: "5% OFF em smartphones",
				loja: "Fast Shop",
				pontos: 1100,
				emoji: "📱",
			},
		],
	},
	{
		nome: "Roupas",
		itens: [
			{
				titulo: "20% OFF na coleção",
				loja: "Renner",
				pontos: 380,
				emoji: "👕",
			},
			{
				titulo: "R$ 40 OFF acima de R$ 200",
				loja: "C&A",
				pontos: 420,
				emoji: "🧥",
			},
			{
				titulo: "15% OFF em calçados",
				loja: "Centauro",
				pontos: 350,
				emoji: "👟",
			},
			{
				titulo: "10% OFF em qualquer compra",
				loja: "Riachuelo",
				pontos: 220,
				emoji: "🛍️",
			},
		],
	},
	{
		nome: "Plantas & Jardim",
		itens: [
			{
				titulo: "20% OFF em mudas e vasos",
				loja: "Casa & Jardim",
				pontos: 250,
				emoji: "🪴",
			},
			{
				titulo: "R$ 25 OFF em compostagem",
				loja: "Verde Vida",
				pontos: 320,
				emoji: "♻️",
			},
			{
				titulo: "15% OFF em ferramentas de jardim",
				loja: "Leroy Merlin",
				pontos: 400,
				emoji: "🌱",
			},
		],
	},
	{
		nome: "Experiências",
		itens: [
			{
				titulo: "30% OFF em passeios ecológicos",
				loja: "Trilha Verde",
				pontos: 450,
				emoji: "🥾",
			},
			{
				titulo: "R$ 20 OFF em ingressos",
				loja: "Jardim Botânico",
				pontos: 300,
				emoji: "🌳",
			},
			{
				titulo: "15% OFF em workshops",
				loja: "Oficina Eco",
				pontos: 380,
				emoji: "🎨",
			},
		],
	},
];

function CardCatalogo({ item, id }: { item: Catalogo; id: number }) {
	return (
		<article
			class="catalogo-card"
			tabindex="0"
			// role="button"
			aria-label={`${item.titulo} na ${item.loja}, ${item.pontos} pontos — Clique para ver detalhes`}
			hx-get={`/recompensas/${id}/detalhes`}
			hx-target="#modal-recompensa"
			hx-swap="innerHTML"
			hx-trigger="click"
		>
			<div class="catalogo-card_corpo">
				<div class="catalogo-card_icone" aria-hidden="true">
					<span class="catalogo-card_emoji">{item.emoji}</span>
				</div>
				<p class="catalogo-card_titulo">{item.titulo}</p>
				<p class="catalogo-card_loja">{item.loja}</p>
			</div>
			<div class="catalogo-card_divisor" aria-hidden="true"></div>
			<p class="catalogo-card_pontos">{item.pontos} pts</p>
		</article>
	);
}

function SecaoCategoria({
	categoria,
	indice,
	mapaIdRecompensa,
}: {
	categoria: Categoria;
	indice: number;
	mapaIdRecompensa: Map<string, number>;
}) {
	const trilhaId = `catalogo-trilha-${indice}`;

	return (
		<section
			class="catalogo-categoria"
			aria-label={`Categoria ${categoria.nome}`}
		>
			<h2 class="catalogo-categoria_titulo">{categoria.nome}</h2>
			<div class="catalogo-carrossel">
				<button
					type="button"
					class="catalogo-carrossel_seta catalogo-carrossel_seta--prev"
					data-carrossel-prev={trilhaId}
					aria-label={`Ver recompensas anteriores de ${categoria.nome}`}
				>
					‹
				</button>

				<div class="catalogo-grid catalogo-trilha" id={trilhaId}>
					{categoria.itens.map((item) => (
						<CardCatalogo
							item={item}
							id={mapaIdRecompensa.get(item.titulo) ?? 0}
						/>
					))}
				</div>

				<button
					type="button"
					class="catalogo-carrossel_seta catalogo-carrossel_seta--next"
					data-carrossel-next={trilhaId}
					aria-label={`Ver mais recompensas de ${categoria.nome}`}
				>
					›
				</button>
			</div>
		</section>
	);
}

function SecaoResgatados({ resgates }: { resgates: ResgateUsuario[] }) {
	const resgatesFiltrados = resgates.filter((r) => r.pontosGastos > 0);

	if (resgatesFiltrados.length === 0) {
		return null;
	}

	return (
		<section class="resgatados" aria-label="Meus cupons resgatados">
			<h2 class="resgatados_titulo">
				<span>Meus Cupons Resgatados</span>
				<span class="resgatados_contagem">{resgatesFiltrados.length}</span>
			</h2>
			<div class="resgatados_grid">
				{resgatesFiltrados.map((r) => (
					<article class="resgatados-card" tabindex="0">
						<div class="resgatados-card_cabecalho">
							<p class="resgatados-card_nome">{r.nomeRecompensa}</p>
							<p class="resgatados-card_parceiro">{r.parceiro}</p>
						</div>
						<div class="resgatados-card_codigo-wrapper">
							<span class="resgatados-card_codigo-label">Cupom</span>
							<code class="resgatados-card_codigo">{r.codigo}</code>
						</div>
						<div class="resgatados-card_rodape">
							<span class="resgatados-card_pontos">-{r.pontosGastos} pts</span>
							<time
								class="resgatados-card_data"
								datetime={r.criadoEm.toISOString()}
							>
								{r.criadoEm.toLocaleDateString("pt-BR")}
							</time>
						</div>
					</article>
				))}
			</div>
		</section>
	);
}

export function CatalogoView({
	nomeUsuario,
	pontos,
	mapaIdRecompensa,
	resgates = [],
}: {
	nomeUsuario: string;
	pontos: number;
	mapaIdRecompensa: Map<string, number>;
	resgates?: ResgateUsuario[];
}) {
	return (
		<AppLayout
			title="Catálogo – EcoQuest"
			rotaAtiva="/catalogo"
			nomeUsuario={nomeUsuario}
		>
			<link rel="stylesheet" href="../assets/catalogo.css" />

			<main class="catalogo-page" id="conteudo-principal">
				<div class="catalogo-header">
					<div>
						<h1 class="catalogo-header_titulo">Catálogo de Recompensas</h1>
						<p class="catalogo-header_subtitulo">
							Troque seus pontos por benefícios exclusivos
						</p>
					</div>
					<span class="catalogo-header_pontos">{pontos} pts</span>
				</div>

				<SecaoResgatados resgates={resgates} />

				{CATEGORIAS.map((categoria, indice) => (
					<SecaoCategoria
						categoria={categoria}
						indice={indice}
						mapaIdRecompensa={mapaIdRecompensa}
					/>
				))}
			</main>

			{/* ── Modal de detalhes da recompensa ── */}
			<div
				id="modal-recompensa"
				class="modal-overlay"
				style="display:none"
				role="dialog"
				aria-modal="true"
				aria-label="Detalhes da recompensa"
			></div>

			{/* ── Botão para fechar modal manualmente (injetado via JS) ── */}

			<script src="/assets/catalogo.js"></script>

			<style>{`
				/* ── Seção Meus Cupons Resgatados ── */
				.resgatados {
					margin-bottom: 28px;
				}

				.resgatados_titulo {
					font-family: 'Oxanium', sans-serif;
					font-size: 1.15rem;
					color: #d0eed6;
					display: flex;
					align-items: center;
					gap: 10px;
					margin: 0 0 14px;
				}

				.resgatados_contagem {
					background: rgba(93, 216, 121, 0.12);
					color: #8bc99b;
					font-size: 0.8rem;
					font-weight: 600;
					padding: 2px 10px;
					border-radius: 20px;
					font-family: 'Poppins', sans-serif;
				}

				.resgatados_grid {
					
					gap: 12px;
					display: flex;
					overflow: scroll;
					flex-direction: row;
					scrollbar-width: none;
				}

				.resgatados-card {
					background: #EAF4EC;
					border: 2px solid transparent;
					border-radius: 12px;
					padding: 16px;
					display: flex;
					flex-direction: column;
					gap: 10px;
					transition: transform 0.15s ease, box-shadow 0.15s ease, border-color 0.15s ease;
					cursor: default;
					color: #1F1F1F;
					min-width: 280px;
				}

				.resgatados-card:hover {
					transform: translateY(-3px);
					box-shadow: 0 8px 20px rgba(0, 0, 0, 0.25);
					border-color: #5DD879;
				}

				.resgatados-card_cabecalho {
					display: flex;
					flex-direction: column;
					gap: 2px;
				}

				.resgatados-card_nome {
					margin: 0;
					font-family: 'Oxanium', sans-serif;
					font-size: 0.78rem;
					font-weight: 700;
					text-transform: uppercase;
					letter-spacing: 0.02em;
					line-height: 1.3;
					color: #1F1F1F;
				}

				.resgatados-card_parceiro {
					margin: 0;
					font-size: 0.82rem;
					color: #3F3F3F;
				}

				.resgatados-card_codigo-wrapper {
					display: flex;
					flex-direction: column;
					gap: 2px;
				}

				.resgatados-card_codigo-label {
					font-size: 0.7rem;
					color: #5a5a5a;
					text-transform: uppercase;
					letter-spacing: 0.05em;
				}

				.resgatados-card_codigo {
					background: #fff;
					border: 1px solid #ccc;
					border-radius: 8px;
					padding: 8px 12px;
					font-family: 'Poppins', monospace;
					font-size: 0.95rem;
					font-weight: 600;
					color: #2e7d32;
					letter-spacing: 0.08em;
					user-select: all;
					overflow: hidden;
					text-overflow: ellipsis;
					white-space: nowrap;
				}

				.resgatados-card_rodape {
					display: flex;
					align-items: center;
					justify-content: space-between;
					margin-top: 2px;
				}

				.resgatados-card_pontos {
					font-size: 0.85rem;
					font-weight: 600;
					color: var(--color-overlay);
				}

				.resgatados-card_data {
					font-size: 0.78rem;
					color: #888;
				}

				.modal-overlay {
					position: fixed;
					inset: 0;
					background: rgba(0,0,0,0.55);
					display: flex;
					align-items: center;
					justify-content: center;
					z-index: 9999;
					padding: 1rem;
				}
				.modal-overlay > * {
					background: #fff;
					border-radius: 16px;
					padding: 2rem;
					max-width: 420px;
					width: 100%;
					box-shadow: 0 12px 40px rgba(0,0,0,0.25);
					font-family: 'Poppins', sans-serif;
					color: #1F1F1F;
					position: relative;
				}
				.modal-overlay h2 {
					margin: 0 0 0.25rem;
					font-size: 1.25rem;
				}
				.modal-overlay .recompensa-detalhes_parceiro {
					color: #5a5a5a;
					font-size: 0.85rem;
					margin-bottom: 1rem;
				}
				.modal-overlay .recompensa-detalhes_descricao {
					font-size: 0.9rem;
					margin-bottom: 1rem;
					line-height: 1.5;
				}
				.modal-overlay .recompensa-detalhes_custo {
					font-size: 1.1rem;
					margin-bottom: 0.5rem;
				}
				.modal-overlay .recompensa-detalhes_estoque {
					font-size: 0.85rem;
					color: #5a5a5a;
					margin-bottom: 1.25rem;
				}
				.modal-overlay .recompensa-detalhes_saldo {
					font-size: 0.95rem;
					margin-bottom: 0.75rem;
					padding: 0.5rem 0.75rem;
					border-radius: 8px;
					background: #f5f5f5;
				}
				.btn--resgatar {
					background: #2e7d32;
					color: #fff;
					border: none;
					border-radius: 10px;
					padding: 0.75rem 1.5rem;
					font-size: 1rem;
					font-weight: 600;
					cursor: pointer;
					width: 100%;
					transition: background 0.15s ease;
				}
				.btn--resgatar:hover {
					background: #1b5e20;
				}
				.btn--resgatar:disabled,
				.btn:disabled {
					background: #bbb;
					cursor: not-allowed;
					opacity: 0.7;
				}
				.erro {
					color: #c62828;
					background: #ffebee;
					border-radius: 10px;
					padding: 1rem;
					font-size: 0.9rem;
				}
				.resgate-sucesso {
					text-align: center;
				}
				.resgate-sucesso h2 {
					color: #2e7d32;
					margin-bottom: 1rem;
				}
				.resgate-sucesso p {
					margin: 0.5rem 0;
					font-size: 0.95rem;
				}
			`}</style>

			<script>{`
				(function() {
					var _sucesso = false;

					function fechar(reload) {
						var overlay = document.getElementById('modal-recompensa');
						if (overlay) {
							overlay.style.display = 'none';
							overlay.innerHTML = '';
						}
						_sucesso = false;
						if (reload) {
							window.location.reload();
						}
					}

					// Expõe globalmente para os botões inline do controller
					window.fecharModal = fechar;

					document.addEventListener('htmx:afterSwap', function(evt) {
						if (evt.detail.target && evt.detail.target.id === 'modal-recompensa') {
							var overlay = document.getElementById('modal-recompensa');
							if (overlay && overlay.innerHTML.trim() !== '') {
								overlay.style.display = 'flex';
								_sucesso = overlay.querySelector('.resgate-sucesso') !== null;
							}
						}
					});

					// Fechar clicando fora — recarrega se foi sucesso
					document.addEventListener('click', function(evt) {
						var overlay = document.getElementById('modal-recompensa');
						if (overlay && evt.target === overlay) {
							fechar(_sucesso);
						}
					});
				})();
			`}</script>
		</AppLayout>
	);
}
