import { Html } from "@elysia/html";
import { AppLayout } from "../../components/Applayout";

const CSS_MAPA = `
	.localizar-pev-page {
		padding: 24px 28px 40px;
		margin: 80px;
		background: #303030;
		border-radius: 16px;
		color: #f4f4f4;
	}

	.localizar-pev-header {
		margin-bottom: 20px;
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
		height: 520px;
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
					<h1>📍 Localizar PEV</h1>
					<p>Encontre pontos de entrega voluntária perto de você</p>
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

							pins.forEach(function(pin) {
								var popupHtml = '<strong>' + pin.name + '</strong>';
								if (pin.endereco) {
									popupHtml += '<span class="info-secundaria">' + pin.endereco + '</span>';
								}

								L.marker([pin.lat, pin.lng], { icon: iconePev })
									.addTo(map)
									.bindPopup(popupHtml);
							});

							// Ajusta zoom para caber todos os pins
							if (pins.length > 1) {
								var bounds = pins.map(function(p) { return [p.lat, p.lng]; });
								map.fitBounds(bounds, { padding: [50, 50] });
							}
						})
						.catch(function() {
							container.textContent = 'Não foi possível carregar os pontos de coleta.';
						});
				})();
			`}</script>
		</AppLayout>
	);
}
