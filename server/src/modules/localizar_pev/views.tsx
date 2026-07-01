import { Html } from "@elysia/html";
import { AppLayout } from "../../components/Applayout";

const CSS_MAPA = `
	.localizar-pev-page {
		padding: 24px 28px 40px;
		border-radius: 16px;
		color: #f4f4f4;
	}

	.localizar-pev-header {
		margin-bottom: 20px;
		text-align: center;
		color: #d0eed6;
	}

	.localizar-pev-header h1 {
		font-family: 'Oxanium', sans-serif;
		font-size: 1.75rem;
		margin-bottom: 4px;
	}

	.localizar-pev-header p {
		color: #ababab;
		font-size: 0.9rem;
	}

	#mapa-pev {
		height: 66.67vh;
		width: 100%;
		border-radius: 12px;
		overflow: hidden;
		border: 2px solid rgba(93, 216, 121, 0.25);
	}

	.leaflet-popup-content-wrapper {
		border-radius: 10px;
		font-family: 'Poppins', sans-serif;
	}

	.leaflet-popup-content {
		margin: 10px 14px;
		font-size: 0.9rem;
	}

	.leaflet-popup-content strong {
		display: block;
		font-size: 1rem;
		margin-bottom: 4px;
		color: #2b5633;
	}

	.leaflet-popup-content .info-secundaria {
		color: #666;
		font-size: 0.8rem;
	}

	/* ── Produtos Aceitos ── */
	.produtos-aceitos {
		margin-bottom: 24px;
		padding: 20px 24px 12px;
		background: rgba(255, 255, 255, 0.04);
		border: 1px solid rgba(93, 216, 121, 0.15);
		border-radius: 14px;
	}

	.produtos-aceitos_titulo {
		font-family: 'Oxanium', sans-serif;
		font-size: 1.1rem;
		color: #d0eed6;
		margin: 0 0 4px;
		display: flex;
		align-items: center;
		gap: 8px;
	}

	.produtos-aceitos_titulo svg {
		flex-shrink: 0;
	}

	.produtos-aceitos_subtitulo {
		color: #ababab;
		font-size: 0.82rem;
		margin: 0 0 16px;
	}

	.produtos-aceitos_categoria {
		margin-bottom: 14px;
	}

	.produtos-aceitos_categoria:last-child {
		margin-bottom: 0;
	}

	.produtos-aceitos_cat-titulo {
		font-family: 'Oxanium', sans-serif;
		font-size: 0.85rem;
		color: #8bc99b;
		margin: 0 0 6px;
		display: flex;
		align-items: center;
		gap: 6px;
	}

	.produtos-aceitos_itens {
		display: flex;
		flex-wrap: wrap;
		gap: 6px 10px;
		list-style: none;
		padding: 0;
		margin: 0;
	}

	.produtos-aceitos_item {
		display: inline-flex;
		align-items: center;
		gap: 4px;
		font-size: 0.82rem;
		color: #d4d4d4;
		background: rgba(93, 216, 121, 0.08);
		padding: 3px 10px 3px 6px;
		border-radius: 20px;
		border: 1px solid rgba(93, 216, 121, 0.12);
		transition: background 0.15s ease, border-color 0.15s ease;
	}

	.produtos-aceitos_item:hover {
		background: rgba(93, 216, 121, 0.16);
		border-color: rgba(93, 216, 121, 0.3);
	}

	.produtos-aceitos_item .check-icone {
		width: 14px;
		height: 14px;
		flex-shrink: 0;
	}

	/* ── Geolocalização ── */
	.localizar-pev-status {
		margin-bottom: 14px;
		padding: 12px 16px;
		border-radius: 10px;
		font-size: 0.85rem;
		display: flex;
		align-items: center;
		gap: 10px;
	}

	.localizar-pev-status--carregando {
		background: rgba(93, 216, 121, 0.08);
		border: 1px solid rgba(93, 216, 121, 0.2);
		color: #ababab;
	}

	.localizar-pev-status--erro {
		background: rgba(255, 152, 0, 0.08);
		border: 1px solid rgba(255, 152, 0, 0.25);
		color: #ffb74d;
	}

	.localizar-pev-status--sucesso {
		background: rgba(93, 216, 121, 0.06);
		border: 1px solid rgba(93, 216, 121, 0.12);
		color: #a5d6a7;
		font-size: 0.8rem;
	}

	.localizar-pev-status-spinner {
		width: 18px;
		height: 18px;
		border: 2px solid rgba(93, 216, 121, 0.25);
		border-top-color: #5dd879;
		border-radius: 50%;
		animation: giro 0.8s linear infinite;
		flex-shrink: 0;
	}

	@keyframes giro { to { transform: rotate(360deg); } }

	.btn-tentar-novamente {
		background: none;
		border: 1px solid rgba(93, 216, 121, 0.3);
		color: #5dd879;
		padding: 6px 14px;
		border-radius: 2rem;
		font-family: 'Poppins', sans-serif;
		font-size: 0.8rem;
		cursor: pointer;
		transition: background 0.15s ease;
		margin-left: auto;
		flex-shrink: 0;
	}

	.btn-tentar-novamente:hover {
		background: rgba(93, 216, 121, 0.1);
	}

	.localizar-manual {
		margin-bottom: 14px;
		padding: 16px 20px;
		background: rgba(255, 255, 255, 0.04);
		border: 1px solid rgba(93, 216, 121, 0.15);
		border-radius: 12px;
		display: none;
	}

	.localizar-manual.visivel { display: block; }

	.localizar-manual_titulo {
		font-family: 'Oxanium', sans-serif;
		font-size: 0.9rem;
		color: #d0eed6;
		margin: 0 0 8px;
	}

	.localizar-manual_input-group {
		display: flex;
		flex-direction: column;
		gap: 8px;
	}

	.localizar-manual_input {
		flex: 1;
		padding: 10px 14px;
		border: 2px solid rgba(93, 216, 121, 0.3);
		border-radius: 2rem;
		background: #fffffc;
		color: #1f1f1f;
		font-family: 'Poppins', sans-serif;
		font-size: 0.9rem;
		outline: none;
		transition: border-color 0.2s ease;
		box-sizing: border-box;
	}

	.localizar-manual_input::placeholder { color: #777; }
	.localizar-manual_input:focus { border-color: #5dd879; }

	.localizar-manual_btn {
		padding: 10px 20px;
		border: none;
		border-radius: 2rem;
		background: #2e7d32;
		color: #fff;
		font-family: 'Poppins', sans-serif;
		font-size: 0.9rem;
		font-weight: 600;
		cursor: pointer;
		transition: background 0.15s ease;
		white-space: nowrap;
	}

	.localizar-manual_btn:hover { background: #1b5e20; }

	.localizar-manual_btn:disabled {
		background: #555;
		cursor: not-allowed;
	}

	.marcador-usuario {
		display: flex;
		align-items: center;
		justify-content: center;
	}

	.marcador-usuario-dot {
		width: 16px;
		height: 16px;
		background: #3b82f6;
		border: 3px solid #fff;
		border-radius: 50%;
		box-shadow: 0 0 0 2px rgba(59, 130, 246, 0.4), 0 2px 6px rgba(0,0,0,0.3);
	}

	.marcador-usuario-pulse {
		position: absolute;
		width: 32px;
		height: 32px;
		background: rgba(59, 130, 246, 0.2);
		border-radius: 50%;
		animation: pulsar 2s infinite;
	}

	@keyframes pulsar {
		0% { transform: scale(1); opacity: 0.6; }
		100% { transform: scale(2.5); opacity: 0; }
	}

	/* ── Search ── */
	.search-pev-wrap {
		position: relative;
		margin-bottom: 14px;
	}

	.search-pev-input {
		width: 100%;
		padding: 12px 44px 12px 16px;
		border: 2px solid rgba(93,216,121,0.3);
		border-radius: 2rem;
		background: #fffffc;
		color: rgb(43, 86, 51, 0.31);
		font-family: 'Poppins', sans-serif;
		font-size: 0.95rem;
		outline: none;
		transition: border-color 0.2s ease;
		box-sizing: border-box;
	}
	.search-pev-input::placeholder { color: #777; }
	.search-pev-input:focus { border-color: #5dd879; }

	.search-pev-icone {
		position: absolute;
		right: 1.33rem;
		top: 50%;
		transform: translateY(-50%);
		font-size: 1.1rem;
		pointer-events: none;

		svg {
			margin-top: 0.5rem;
			width: 2rem;
			height: 2rem;
		}
	}

	.search-pev-lista {
		position: absolute;
		top: calc(100% + 4px);
		left: 0;
		right: 0;
		background: #2a2a2a;
		border: 1px solid rgba(93,216,121,0.25);
		border-radius: 10px;
		max-height: 220px;
		overflow-y: auto;
		z-index: 1000;
		display: none;
		box-shadow: 0 8px 24px rgba(0,0,0,0.4);
	}
	.search-pev-lista.visivel { display: block; }

	.search-pev-item {
		padding: 10px 16px;
		cursor: pointer;
		border-bottom: 1px solid rgba(255,255,255,0.06);
		transition: background 0.15s ease;
		font-size: 0.9rem;
	}
	.search-pev-item:last-child { border-bottom: none; }
	.search-pev-item:hover,
	.search-pev-item.destaque {
		background: rgba(93,216,121,0.15);
		color: #5dd879;
	}
	.search-pev-item .item-cidade {
		font-size: 0.75rem;
		color: #888;
		display: block;
	}

	.search-pev-sem-resultado {
		padding: 16px;
		text-align: center;
		color: #777;
		font-size: 0.85rem;
	}
`;

interface ProdutoAceito {
	chave: string;
	nome: string;
}

interface CategoriaProdutos {
	id: string;
	titulo: string;
	itens: ProdutoAceito[];
}

const PRODUTOS_ACEITOS: CategoriaProdutos[] = [
	{
		id: "equipamentos-informatica",
		titulo: "Equipamentos de Informática",
		itens: [
			{ chave: "microcomputador", nome: "Microcomputador" },
			{ chave: "monitor_tubo", nome: "Monitor (Tubo)" },
			{ chave: "monitor_lcd", nome: "Monitor (LCD)" },
			{ chave: "monitor_led", nome: "Monitor (LED)" },
			{ chave: "monitor_plasma", nome: "Monitor (Plasma)" },
			{ chave: "notebook", nome: "Notebook" },
			{ chave: "servidor", nome: "Servidor" },
			{ chave: "teclado", nome: "Teclado" },
			{ chave: "mouse", nome: "Mouse" },
			{ chave: "modem", nome: "Modem" },
			{ chave: "roteador", nome: "Roteador" },
			{ chave: "impressora", nome: "Impressora" },
			{ chave: "estabilizador", nome: "Estabilizador" },
			{ chave: "tablet", nome: "Tablet" },
			{ chave: "no_break", nome: "No-break" },
		],
	},
	{
		id: "televisores",
		titulo: "Televisores",
		itens: [
			{ chave: "tv_tubo", nome: "Televisão de tubo de imagem" },
			{ chave: "tv_led", nome: "Televisão de LED" },
			{ chave: "tv_lcd", nome: "Televisão de LCD" },
			{ chave: "tv_plasma", nome: "Televisão de Plasma" },
		],
	},
	{
		id: "equipamentos-eletronicos",
		titulo: "Equipamentos eletrônicos",
		itens: [
			{ chave: "video_cassete", nome: "Vídeo cassete" },
			{ chave: "dvd_player", nome: "DVD player" },
			{ chave: "aparelho_som", nome: "Aparelho de som" },
			{ chave: "controle_remoto", nome: "Controle remoto" },
			{ chave: "forno_microondas", nome: "Forno microondas" },
			{ chave: "secador_cabelo", nome: "Secador de cabelo" },
			{ chave: "prancha_cabelo", nome: "Prancha de cabelo" },
		],
	},
	{
		id: "aparelhos-telefonicos",
		titulo: "Aparelhos telefônicos",
		itens: [
			{ chave: "aparelho_celular", nome: "Aparelho celular" },
			{ chave: "acessorios", nome: "Acessórios" },
			{ chave: "smartphone", nome: "Smartphone" },
			{ chave: "telefone_sem_fio", nome: "Aparelho telefônico sem fio" },
			{ chave: "telefone_com_fio", nome: "Aparelho telefônico com fio" },
			{ chave: "fax", nome: "Fax" },
			{ chave: "secretaria_eletronica", nome: "Secretária eletrônica" },
		],
	},
	{
		id: "residuos-eletronicos",
		titulo: "Resíduos eletrônicos",
		itens: [
			{ chave: "bateria_notebook", nome: "Baterias de notebooks" },
			{ chave: "bateria_no_break", nome: "Baterias de no-breaks" },
			{ chave: "chapa_raio_x", nome: "Chapas de raio X" },
			{ chave: "cabos_forca", nome: "Cabos de força" },
			{ chave: "cabos_geral", nome: "Cabos" },
			{ chave: "carregadores", nome: "Carregadores" },
			{ chave: "adaptadores", nome: "Adaptadores" },
		],
	},
];

function IconeCheckVerde() {
	return (
		<svg
			class="check-icone"
			viewBox="0 0 24 24"
			fill="none"
			xmlns="http://www.w3.org/2000/svg"
		>
			<title>Produto aceito</title>
			<circle cx="12" cy="12" r="10" fill="#2e7d32" />
			<path
				d="M8 12l3 3 5-5"
				stroke="#fff"
				stroke-width="2"
				stroke-linecap="round"
				stroke-linejoin="round"
			/>
		</svg>
	);
}

function IconeCaixa() {
	return (
		<svg
			width="20"
			height="20"
			viewBox="0 0 24 24"
			fill="none"
			stroke="#5dd879"
			stroke-width="1.8"
			stroke-linecap="round"
			stroke-linejoin="round"
		>
			<title>Produtos</title>
			<path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z" />
			<polyline points="3.27 6.96 12 12.01 20.73 6.96" />
			<line x1="12" y1="22.08" x2="12" y2="12" />
		</svg>
	);
}

function IconeCategoriaTag({ id }: { id: string }) {
	switch (id) {
		case "equipamentos-informatica":
			return (
				<svg
					width="16"
					height="16"
					viewBox="0 0 24 24"
					fill="none"
					stroke="#8bc99b"
					stroke-width="1.8"
					stroke-linecap="round"
					stroke-linejoin="round"
				>
					<title>Equipamentos de Informática</title>
					<rect x="2" y="3" width="20" height="14" rx="2" />
					<line x1="8" y1="21" x2="16" y2="21" />
					<line x1="12" y1="17" x2="12" y2="21" />
				</svg>
			);
		case "televisores":
			return (
				<svg
					width="16"
					height="16"
					viewBox="0 0 24 24"
					fill="none"
					stroke="#8bc99b"
					stroke-width="1.8"
					stroke-linecap="round"
					stroke-linejoin="round"
				>
					<title>Televisores</title>
					<rect x="2" y="4" width="20" height="14" rx="2" />
					<line x1="10" y1="18" x2="8" y2="22" />
					<line x1="14" y1="18" x2="16" y2="22" />
					<line x1="12" y1="14" x2="12" y2="18" />
				</svg>
			);
		case "equipamentos-eletronicos":
			return (
				<svg
					width="16"
					height="16"
					viewBox="0 0 24 24"
					fill="none"
					stroke="#8bc99b"
					stroke-width="1.8"
					stroke-linecap="round"
					stroke-linejoin="round"
				>
					<title>Equipamentos eletrônicos</title>
					<circle cx="12" cy="12" r="7" />
					<path d="M12 9v3l2 2" />
					<path d="M5 5L3 3M19 5l2-2" />
				</svg>
			);
		case "aparelhos-telefonicos":
			return (
				<svg
					width="16"
					height="16"
					viewBox="0 0 24 24"
					fill="none"
					stroke="#8bc99b"
					stroke-width="1.8"
					stroke-linecap="round"
					stroke-linejoin="round"
				>
					<title>Aparelhos telefônicos</title>
					<rect x="7" y="2" width="10" height="20" rx="2" />
					<line x1="11" y1="18" x2="13" y2="18" />
				</svg>
			);
		case "residuos-eletronicos":
			return (
				<svg
					width="16"
					height="16"
					viewBox="0 0 24 24"
					fill="none"
					stroke="#8bc99b"
					stroke-width="1.8"
					stroke-linecap="round"
					stroke-linejoin="round"
				>
					<title>Resíduos eletrônicos</title>
					<rect x="2" y="7" width="20" height="10" rx="2" />
					<line x1="22" y1="10" x2="22" y2="14" />
					<line x1="6" y1="12" x2="10" y2="12" />
					<line x1="8" y1="10" x2="8" y2="14" />
				</svg>
			);
		default:
			return null;
	}
}

function SecaoProdutosAceitos() {
	return (
		<section class="produtos-aceitos" aria-label="Produtos aceitos nos PEVs">
			<h2 class="produtos-aceitos_titulo">
				<IconeCaixa />
				Itens aceitos
			</h2>
			<p class="produtos-aceitos_subtitulo">
				Confira os itens que você pode descartar nos Pontos de Entrega
				Voluntária
			</p>
			{PRODUTOS_ACEITOS.map((cat) => (
				<div class="produtos-aceitos_categoria" key={cat.id}>
					<h3 class="produtos-aceitos_cat-titulo">
						<IconeCategoriaTag id={cat.id} />
						{cat.titulo}
					</h3>
					<ul class="produtos-aceitos_itens">
						{cat.itens.map((item) => (
							<li class="produtos-aceitos_item" key={item.chave}>
								<IconeCheckVerde />
								{item.nome}
							</li>
						))}
					</ul>
				</div>
			))}
		</section>
	);
}

export function MapaView({
	nomeUsuario,
	logado = false,
}: {
	nomeUsuario: string;
	logado?: boolean;
}) {
	return (
		<AppLayout
			title="Localizar PEV – EcoQuest"
			rotaAtiva="/localizar-pev"
			nomeUsuario={nomeUsuario}
			logado={logado}
		>
			<style>{CSS_MAPA}</style>

			<link
				rel="stylesheet"
				href="https://unpkg.com/leaflet@1.9.4/dist/leaflet.css"
				crossorigin=""
			/>
			<script
				src="https://unpkg.com/leaflet@1.9.4/dist/leaflet.js"
				crossorigin=""
			/>

			<main class="localizar-pev-page" id="conteudo-principal">
				<div class="localizar-pev-header">
					<h1>Encontre um Ponto de Entrega Voluntária perto de você!</h1>
				</div>
				<SecaoProdutosAceitos />

				<div
					id="geo-status"
					class="localizar-pev-status localizar-pev-status--carregando"
				>
					<div class="localizar-pev-status-spinner"></div>
					<span>Obtendo sua localização...</span>
				</div>

				<div id="localizar-manual" class="localizar-manual">
					<p class="localizar-manual_titulo">
						Informe sua localização manualmente
					</p>
					<div class="localizar-manual_input-group">
						<input
							id="localizar-manual-input"
							class="localizar-manual_input"
							type="text"
							placeholder="Digite uma cidade, bairro ou endereço..."
						/>
						<button
							id="localizar-manual-btn"
							class="localizar-manual_btn"
							type="button"
						>
							Buscar
						</button>
					</div>
				</div>

				<div class="search-pev-wrap">
					<input
						id="search-pev-input"
						class="search-pev-input"
						type="text"
						placeholder="Pesquisar por cidade ou nome do PEV..."
						autocomplete="off"
					/>
					<span class="search-pev-icone">
						<svg
							width="800px"
							height="800px"
							viewBox="0 0 24 24"
							fill="none"
							xmlns="http://www.w3.org/2000/svg"
						>
							<title>Ícone de lupa</title>
							<path
								d="M15.7955 15.8111L21 21M18 10.5C18 14.6421 14.6421 18 10.5 18C6.35786 18 3 14.6421 3 10.5C3 6.35786 6.35786 3 10.5 3C14.6421 3 18 6.35786 18 10.5Z"
								stroke="#2b5633"
								stroke-width="2"
								stroke-linecap="round"
								stroke-linejoin="round"
							/>
						</svg>
					</span>
					<div id="search-pev-lista" class="search-pev-lista"></div>
				</div>
				<div id="mapa-pev" />
			</main>

			<script>{`
				(function() {
					var container = document.getElementById('mapa-pev');
					if (!container) return;

					if (typeof L === 'undefined') {
						container.textContent = 'Erro ao carregar o mapa.';
						return;
					}

					// Elementos DOM
					var geoStatus = document.getElementById('geo-status');
					var manualBox = document.getElementById('localizar-manual');
					var manualInput = document.getElementById('localizar-manual-input');
					var manualBtn = document.getElementById('localizar-manual-btn');
					var searchWrap = document.querySelector('.search-pev-wrap');

					// Estado
					var map, userMarker, userLat, userLng;
					var markerData = [];
					var mapReady = false;

					function fmtDist(km) {
						if (km < 1) return Math.round(km * 1000) + ' m';
						return km.toFixed(1).replace('.', ',') + ' km';
					}

					function exibirErro(msg, podeTentarNovamente) {
						geoStatus.className = 'localizar-pev-status localizar-pev-status--erro';
						geoStatus.innerHTML = '<span>' + msg + '</span>'
							+ (podeTentarNovamente
								? '<button class="btn-tentar-novamente" id="btn-reload">Tentar novamente</button>'
								: '');
						if (podeTentarNovamente) {
							document.getElementById('btn-reload').addEventListener('click', function() {
								window.location.reload();
							});
						}
					}

					function exibirSucesso(msg) {
						geoStatus.className = 'localizar-pev-status localizar-pev-status--sucesso';
						geoStatus.innerHTML = '<span>' + msg + '</span>';
					}

					function initMap(lat, lng) {
						if (mapReady) return;

						map = L.map('mapa-pev', {
							center: [lat, lng],
							zoom: 13,
							zoomControl: true,
							scrollWheelZoom: true,
						});

						L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
							attribution: '&copy; <a href="https://openstreetmap.org/copyright">OpenStreetMap</a> contributors',
							maxZoom: 19,
						}).addTo(map);

						mapReady = true;
					}

					function addUserMarker(lat, lng) {
						if (userMarker) map.removeLayer(userMarker);

						var icon = L.divIcon({
							className: 'marcador-usuario',
							html: '<div class="marcador-usuario-pulse"></div><div class="marcador-usuario-dot"></div>',
							iconSize: [32, 32],
							iconAnchor: [16, 16],
						});

						userMarker = L.marker([lat, lng], { icon: icon })
							.addTo(map)
							.bindPopup('<strong>Sua localização</strong>');
					}

					var iconePev = L.divIcon({
						className: '',
						html: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="32" height="32" fill="#2e7d32" stroke="#fff" stroke-width="1.5"><circle cx="12" cy="12" r="10"/><path d="M12 6v6l4 2" stroke="#fff" stroke-width="2" fill="none"/></svg>',
						iconSize: [32, 32],
						iconAnchor: [16, 32],
						popupAnchor: [0, -34],
					});

					function carregarPins(lat, lng) {
						var url = '/api/pins';
						if (lat != null && lng != null) {
							url += '?lat=' + lat + '&lng=' + lng + '&raio=10';
						}

						console.log('[carregarPins] URL:', url);

						fetch(url)
							.then(function(res) {
								console.log('[carregarPins] status:', res.status);
								if (!res.ok) {
									return res.text().then(function(body) {
										console.error('[carregarPins] corpo do erro:', body);
										throw new Error('HTTP ' + res.status);
									});
								}
								return res.json();
							})
							.then(function(pins) {
								console.log('[carregarPins] dados recebidos:', pins);
								if (!pins || pins.length === 0) {
									// FA-3A: Nenhum PEV encontrado
									geoStatus.className = 'localizar-pev-status localizar-pev-status--erro';
									geoStatus.innerHTML = '<span>Nenhum ponto de coleta encontrado em um raio de 10 km.</span>';
									return;
								}

								// Converte lat/lng de string para número (PostgreSQL NUMERIC vem como string no JSON)
								pins = pins.map(function(p) {
									return {
										name: p.name,
										lat: Number(p.lat),
										lng: Number(p.lng),
										distanciaKm: p.distanciaKm != null ? Number(p.distanciaKm) : null,
									};
								});

								exibirSucesso(pins.length + ' PEV' + (pins.length !== 1 ? 's' : '') + ' encontrado' + (pins.length !== 1 ? 's' : '') + ' em um raio de 10 km');

								var markers = [];
								markerData = [];

								pins.forEach(function(pin) {
									var distHtml = '';
									if (pin.distanciaKm != null) {
										distHtml = '<span class="info-secundaria">Distância: ' + fmtDist(pin.distanciaKm) + '</span>';
									}

									var popupHtml = '<strong>' + pin.name + '</strong>' + distHtml;

									var m = L.marker([pin.lat, pin.lng], { icon: iconePev })
										.addTo(map)
										.bindPopup(popupHtml);

									markers.push(m);
									markerData.push({ name: pin.name, lat: pin.lat, lng: pin.lng, marker: m });
								});

								if (pins.length > 1) {
									var bounds = pins.map(function(p) { return [p.lat, p.lng]; });
									map.fitBounds(bounds, { padding: [50, 50] });
								} else {
									map.setView([pins[0].lat, pins[0].lng], 14);
								}

								setupSearch();
							})
							.catch(function(err) {
								console.error('[carregarPins] erro capturado:', err);
								// FE-E2: Falha ao carregar PEVs
								exibirErro('Não foi possível carregar os pontos de coleta.', true);
							});
					}

					function setupSearch() {
						var input = document.getElementById('search-pev-input');
						var lista = document.getElementById('search-pev-lista');
						if (!input || !lista) return;

						function buscar(q) {
							var termo = q.toLowerCase().trim();
							if (!termo) { lista.classList.remove('visivel'); return; }

							var resultados = markerData.filter(function(item) {
								return item.name.toLowerCase().includes(termo);
							});

							if (resultados.length === 0) {
								lista.innerHTML = '<div class="search-pev-sem-resultado">Nenhum PEV encontrado para "' + q + '"</div>';
								lista.classList.add('visivel');
								return;
							}

							var html = '';
							resultados.forEach(function(item) {
								html += '<div class="search-pev-item" data-lat="' + item.lat + '" data-lng="' + item.lng + '">';
								html += item.name;
								html += '</div>';
							});
							lista.innerHTML = html;
							lista.classList.add('visivel');
						}

						function irPara(lat, lng) {
							lista.classList.remove('visivel');
							input.value = '';
							map.setView([lat, lng], 15, { animate: true });
							for (var i = 0; i < markerData.length; i++) {
								if (markerData[i].lat === lat && markerData[i].lng === lng) {
									markerData[i].marker.openPopup();
									break;
								}
							}
						}

						input.addEventListener('input', function() { buscar(input.value); });

						lista.addEventListener('click', function(ev) {
							var item = ev.target.closest('.search-pev-item');
							if (!item) return;
							irPara(parseFloat(item.getAttribute('data-lat')), parseFloat(item.getAttribute('data-lng')));
						});

						document.addEventListener('click', function(ev) {
							if (!ev.target.closest('.search-pev-wrap')) lista.classList.remove('visivel');
						});

						input.addEventListener('keydown', function(ev) {
							var itens = lista.querySelectorAll('.search-pev-item');
							if (itens.length === 0) return;
							var atual = lista.querySelector('.search-pev-item.destaque');
							var idx = -1;
							if (atual) {
								for (var i = 0; i < itens.length; i++) {
									if (itens[i] === atual) { idx = i; break; }
								}
							}
							if (ev.key === 'ArrowDown') {
								ev.preventDefault();
								var next = (idx + 1) % itens.length;
								if (atual) atual.classList.remove('destaque');
								itens[next].classList.add('destaque');
							} else if (ev.key === 'ArrowUp') {
								ev.preventDefault();
								var prev = (idx - 1 + itens.length) % itens.length;
								if (atual) atual.classList.remove('destaque');
								itens[prev].classList.add('destaque');
							} else if (ev.key === 'Enter' && atual) {
								ev.preventDefault();
								irPara(parseFloat(atual.getAttribute('data-lat')), parseFloat(atual.getAttribute('data-lng')));
							}
						});
					}

					// ── Início: tenta geolocalização ──

					if ('geolocation' in navigator) {
						navigator.geolocation.getCurrentPosition(
							// Sucesso
							function(pos) {
								userLat = pos.coords.latitude;
								userLng = pos.coords.longitude;

								initMap(userLat, userLng);
								addUserMarker(userLat, userLng);

								geoStatus.className = 'localizar-pev-status localizar-pev-status--carregando';
								geoStatus.innerHTML = '<div class="localizar-pev-status-spinner"></div><span>Buscando PEVs próximos...</span>';

								carregarPins(userLat, userLng);
							},
							// Erro / Negado (FA-2A, FE-E1)
							function(err) {
								initMap(-15.800, -48.000);

								if (err.code === err.PERMISSION_DENIED) {
									exibirErro('Acesso à localização negado. Informe sua localização manualmente.', false);
								} else {
									exibirErro('Não foi possível obter sua localização. Informe manualmente.', false);
								}

								manualBox.classList.add('visivel');
								searchWrap.style.display = 'none';
								carregarPins(null, null);
							},
							{
								enableHighAccuracy: true,
								timeout: 8000,
								maximumAge: 60000,
							}
						);
					} else {
						// FE-E1: Geolocalização não suportada
						initMap(-15.800, -48.000);
						exibirErro('Seu navegador não suporta geolocalização. Informe sua localização manualmente.', false);
						manualBox.classList.add('visivel');
						searchWrap.style.display = 'none';
						carregarPins(null, null);
					}

					// ── Busca manual (FA-2A) ──
					function buscarManual() {
						var q = manualInput.value.trim();
						if (!q) return;

						manualBtn.disabled = true;
						manualBtn.textContent = 'Buscando...';

						fetch('https://nominatim.openstreetmap.org/search?format=json&q=' + encodeURIComponent(q) + '&limit=1&countrycodes=br')
							.then(function(r) { return r.json(); })
							.then(function(data) {
								manualBtn.disabled = false;
								manualBtn.textContent = 'Buscar';

								if (!data || data.length === 0) {
									exibirErro('Local não encontrado. Tente um termo diferente.', false);
									return;
								}

								var loc = data[0];
								userLat = parseFloat(loc.lat);
								userLng = parseFloat(loc.lon);

								if (!userMarker) {
									addUserMarker(userLat, userLng);
									map.setView([userLat, userLng], 13);
								} else {
									userMarker.setLatLng([userLat, userLng]);
									map.setView([userLat, userLng], 13);
								}

								exibirSucesso('Localização definida: ' + loc.display_name.split(',')[0]);
								manualBox.classList.remove('visivel');
								searchWrap.style.display = '';

								carregarPins(userLat, userLng);
							})
							.catch(function() {
								manualBtn.disabled = false;
								manualBtn.textContent = 'Buscar';
								exibirErro('Falha ao buscar localização. Tente novamente.', true);
							});
					}

					manualBtn.addEventListener('click', buscarManual);
					manualInput.addEventListener('keydown', function(ev) {
						if (ev.key === 'Enter') buscarManual();
					});
				})();
			`}</script>
		</AppLayout>
	);
}
