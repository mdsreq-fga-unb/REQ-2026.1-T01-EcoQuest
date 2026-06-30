import { Html } from "@elysia/html";
import { AppLayout } from "../../components/Applayout";

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
			{ titulo: "R$ 50 OFF em compras", loja: "Carrefour", pontos: 600, emoji: "🛒" },
			{ titulo: "15% OFF em hortifruti", loja: "Pão de Açúcar", pontos: 350, emoji: "🥦" },
			{ titulo: "R$ 30 OFF acima de R$ 150", loja: "Extra", pontos: 420, emoji: "🧺" },
			{ titulo: "10% OFF em produtos de limpeza", loja: "Assaí", pontos: 280, emoji: "🧴" },
		],
	},
	{
		nome: "Eletrônicos",
		itens: [
			{ titulo: "10% OFF em eletrônicos", loja: "Amazon", pontos: 950, emoji: "📦" },
			{ titulo: "R$ 80 OFF em fones e áudio", loja: "Magalu", pontos: 700, emoji: "🎧" },
			{ titulo: "15% OFF em acessórios", loja: "Kabum", pontos: 600, emoji: "🔌" },
			{ titulo: "5% OFF em smartphones", loja: "Fast Shop", pontos: 1100, emoji: "📱" },
		],
	},
	{
		nome: "Roupas",
		itens: [
			{ titulo: "20% OFF na coleção", loja: "Renner", pontos: 380, emoji: "👕" },
			{ titulo: "R$ 40 OFF acima de R$ 200", loja: "C&A", pontos: 420, emoji: "🧥" },
			{ titulo: "15% OFF em calçados", loja: "Centauro", pontos: 350, emoji: "👟" },
			{ titulo: "10% OFF em qualquer compra", loja: "Riachuelo", pontos: 220, emoji: "🛍️" },
		],
	},
	{
		nome: "Plantas & Jardim",
		itens: [
			{ titulo: "20% OFF em mudas e vasos", loja: "Casa & Jardim", pontos: 250, emoji: "🪴" },
			{ titulo: "R$ 25 OFF em compostagem", loja: "Verde Vida", pontos: 320, emoji: "♻️" },
			{ titulo: "15% OFF em ferramentas de jardim", loja: "Leroy Merlin", pontos: 400, emoji: "🌱" },
		],
	},
	{
		nome: "Experiências",
		itens: [
			{ titulo: "30% OFF em passeios ecológicos", loja: "Trilha Verde", pontos: 450, emoji: "🥾" },
			{ titulo: "R$ 20 OFF em ingressos", loja: "Jardim Botânico", pontos: 300, emoji: "🌳" },
			{ titulo: "15% OFF em workshops", loja: "Oficina Eco", pontos: 380, emoji: "🎨" },
		],
	},
];

function CardCatalogo({ item }: { item: Catalogo }) {
	return (
		<article
			class="catalogo-card"
			tabindex="0"
			aria-label={`${item.titulo} na ${item.loja}, ${item.pontos} pontos`}
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

function SecaoCategoria({ categoria, indice }: { categoria: Categoria; indice: number }) {
	const trilhaId = `catalogo-trilha-${indice}`;

	return (
		<section class="catalogo-categoria" aria-label={`Categoria ${categoria.nome}`}>
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
						<CardCatalogo item={item} />
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

export function CatalogoView({
	nomeUsuario,
	pontos,
}: {
	nomeUsuario: string;
	pontos: number;
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

				{CATEGORIAS.map((categoria, indice) => (
					<SecaoCategoria categoria={categoria} indice={indice} />
				))}
			</main>
			<script src="/assets/catalogo.js"></script>
		</AppLayout>
	);
}