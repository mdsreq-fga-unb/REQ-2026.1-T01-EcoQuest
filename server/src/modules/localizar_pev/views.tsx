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

export function MapaView({ nomeUsuario }: { nomeUsuario: string }) {
	return (
		<AppLayout
			title="Localizar PEV – EcoQuest"
			rotaAtiva="/localizar-pev"
			nomeUsuario={nomeUsuario}
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

					// Verifica se Leaflet carregou
					if (typeof L === 'undefined') {
						container.textContent = 'Erro ao carregar o mapa.';
						return;
					}

					// Centraliza no DF (Gama / Brasília)
					var map = L.map('mapa-pev', {
						center: [-15.800, -48.000],
						zoom: 12,
						zoomControl: true,
						scrollWheelZoom: true,
					});

					L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
						attribution: '&copy; <a href="https://openstreetmap.org/copyright">OpenStreetMap</a> contributors',
						maxZoom: 19,
					}).addTo(map);

					// Ícone personalizado verde
					var iconePev = L.divIcon({
						className: '',
						html: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="32" height="32" fill="#2e7d32" stroke="#fff" stroke-width="1.5"><circle cx="12" cy="12" r="10"/><path d="M12 6v6l4 2" stroke="#fff" stroke-width="2" fill="none"/></svg>',
						iconSize: [32, 32],
						iconAnchor: [16, 32],
						popupAnchor: [0, -34],
					});

					// Busca os PEVs cadastrados
					fetch('/api/pins')
						.then(function(res) { return res.json(); })
						.then(function(pins) {
							if (!pins || pins.length === 0) {
								L.marker([-15.800, -48.000], { icon: iconePev })
									.addTo(map)
									.bindPopup('<strong>Nenhum PEV cadastrado</strong><span class="info-secundaria">Adicione pontos de coleta no banco de dados.</span>');
								return;
							}

							var markers = [];
							var markerData = [];

							pins.forEach(function(pin) {
								var popupHtml = '<strong>' + pin.name + '</strong>';
								if (pin.endereco) {
									popupHtml += '<span class="info-secundaria">' + pin.endereco + '</span>';
								}

								var m = L.marker([pin.lat, pin.lng], { icon: iconePev })
									.addTo(map)
									.bindPopup(popupHtml);

								markers.push(m);
								markerData.push({ name: pin.name, lat: pin.lat, lng: pin.lng, marker: m });
							});

							// Ajusta zoom para caber todos os pins
							if (pins.length > 1) {
								var bounds = pins.map(function(p) { return [p.lat, p.lng]; });
								map.fitBounds(bounds, { padding: [50, 50] });
							}

							// ── Search ──
							var input = document.getElementById('search-pev-input');
							var lista = document.getElementById('search-pev-lista');
							if (!input || !lista) return;

							function extrairCidade(nome) {
								var match = nome.match(/PEVs+(.+?)s*[—–-]/);
								return match ? match[1].trim() : nome;
							}

							function buscar(q) {
								var termo = q.toLowerCase().trim();
								if (!termo) {
									lista.classList.remove('visivel');
									return;
								}

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
									var cidade = extrairCidade(item.name);
									html += '<div class="search-pev-item" data-lat="' + item.lat + '" data-lng="' + item.lng + '">';
									html += item.name;
									html += '<span class="item-cidade">' + cidade + '</span>';
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

							input.addEventListener('input', function() {
								buscar(input.value);
							});

							lista.addEventListener('click', function(ev) {
								var item = ev.target.closest('.search-pev-item');
								if (!item) return;
								var lat = parseFloat(item.getAttribute('data-lat'));
								var lng = parseFloat(item.getAttribute('data-lng'));
								irPara(lat, lng);
							});

							document.addEventListener('click', function(ev) {
								if (!ev.target.closest('.search-pev-wrap')) {
									lista.classList.remove('visivel');
								}
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
									var lat = parseFloat(atual.getAttribute('data-lat'));
									var lng = parseFloat(atual.getAttribute('data-lng'));
									irPara(lat, lng);
								}
							});
						})
						.catch(function() {
							container.textContent = 'Não foi possível carregar os pontos de coleta.';
						});
				})();
			`}</script>
		</AppLayout>
	);
}
