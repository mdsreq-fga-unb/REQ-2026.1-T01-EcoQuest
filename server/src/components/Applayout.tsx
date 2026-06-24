import { Html } from "@elysia/html";
import { Layout } from "./Layout-auth";

export interface AppLayoutProps {
	title: string;
	rotaAtiva?: string;
	nomeUsuario: string;
	cssExtra?: string;
	jsExtra?: string;
	children: any;
}

function IcoDescarte() {
	return (
		<svg
			xmlns="http://www.w3.org/2000/svg"
			viewBox="0 0 24 24"
			fill="none"
			stroke="currentColor"
			stroke-width="2"
			stroke-linecap="round"
			stroke-linejoin="round"
			class="nav_icon"
			aria-hidden="true"
		>
			<path d="M11 20A7 7 0 0 1 9.8 6.1C15.5 5 17 4.48 19 2c1 2 2 4.18 2 8 0 5.5-4.78 10-10 10z" />
			<path d="M2 21c0-3 1.85-5.36 5.08-6C9.5 14.52 12 13 13 12" />
		</svg>
	);
}

function IcoInsignia() {
	return (
		<svg
			xmlns="http://www.w3.org/2000/svg"
			viewBox="0 0 24 24"
			fill="none"
			stroke="currentColor"
			stroke-width="2"
			stroke-linecap="round"
			stroke-linejoin="round"
			class="nav_icon"
			aria-hidden="true"
		>
			<path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
		</svg>
	);
}

function IcoRanking() {
	return (
		<svg
			xmlns="http://www.w3.org/2000/svg"
			viewBox="0 0 24 24"
			fill="none"
			stroke="currentColor"
			stroke-width="2"
			stroke-linecap="round"
			stroke-linejoin="round"
			class="nav_icon"
			aria-hidden="true"
		>
			<polyline points="18 20 18 10" />
			<polyline points="12 20 12 4" />
			<polyline points="6 20 6 14" />
		</svg>
	);
}

function IcoMenu() {
	return (
		<svg
			xmlns="http://www.w3.org/2000/svg"
			viewBox="0 0 24 24"
			fill="none"
			stroke="currentColor"
			stroke-width="2"
			stroke-linecap="round"
			stroke-linejoin="round"
			aria-hidden="true"
			width="24"
			height="24"
		>
			<line x1="3" y1="6" x2="21" y2="6" />
			<line x1="3" y1="12" x2="21" y2="12" />
			<line x1="3" y1="18" x2="21" y2="18" />
		</svg>
	);
}

function IcoCamera() {
	return (
		<svg
			xmlns="http://www.w3.org/2000/svg"
			viewBox="0 0 24 24"
			fill="none"
			stroke="currentColor"
			stroke-width="2"
			stroke-linecap="round"
			stroke-linejoin="round"
			aria-hidden="true"
			width="28"
			height="28"
		>
			<path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z" />
			<circle cx="12" cy="13" r="4" />
		</svg>
	);
}

const NAV_ITEMS = [
	{ href: "/", label: "Extrato", Icone: IcoDescarte },
	{ href: "/insignias", label: "Insígnias", Icone: IcoInsignia },
	{ href: "/ranking", label: "Ranking", Icone: IcoRanking },
] as const;

function Sidebar({
	rotaAtiva,
	nomeUsuario,
}: {
	rotaAtiva: string;
	nomeUsuario: string;
}) {
	const primeiroNome = nomeUsuario.split(" ")[0] || "Perfil";

	return (
		<aside class="sidebar" aria-label="Navegação principal">
			<div class="sidebar_logo">
				<a href="/" aria-label="EcoQuest – página inicial">
					<img
						src="/assets/img/logo.png"
						alt="EcoQuest"
						class="sidebar_logo-img"
					/>
				</a>
			</div>

			<nav class="sidebar_nav" aria-label="Menu principal">
				<ul role="list">
					{NAV_ITEMS.map(({ href, label, Icone }) => {
						const ativo = rotaAtiva === href;
						return (
							<li>
								<a
									href={href}
									class={`nav_link${ativo ? " nav_link--ativo" : ""}`}
									aria-current={ativo ? "page" : undefined}
									aria-label={label}
								>
									<Icone />
									<span class="nav_label">{label}</span>
								</a>
							</li>
						);
					})}
				</ul>
			</nav>

			<div class="sidebar_rodape">
				<div class="sidebar_avatar" aria-hidden="true"></div>
				<span class="sidebar_perfil-nome">{primeiroNome}</span>
				<a
					href="/auth/logout"
					class="sidebar_logout"
					aria-label="Sair da conta"
				>
					<svg
						xmlns="http://www.w3.org/2000/svg"
						viewBox="0 0 24 24"
						fill="none"
						stroke="currentColor"
						stroke-width="2"
						stroke-linecap="round"
						stroke-linejoin="round"
						aria-hidden="true"
						width="18"
						height="18"
					>
						<path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
						<polyline points="16 17 21 12 16 7" />
						<line x1="21" y1="12" x2="9" y2="12" />
					</svg>
				</a>
			</div>
		</aside>
	);
}

function HeaderMobile() {
	return (
		<header class="header-mobile" role="banner">
			<button
				class="header-mobile_menu"
				aria-label="Abrir menu de navegação"
				aria-expanded="false"
				aria-controls="menu-mobile"
				id="btn-menu-mobile"
			>
				<IcoMenu />
			</button>

			<a href="/" class="header-mobile_logo" aria-label="EcoQuest – início">
				<img
					src="/assets/img/logo.png"
					alt="EcoQuest"
					class="header-mobile_logo-img"
				/>
			</a>
		</header>
	);
}

function MenuMobile({
	rotaAtiva,
	nomeUsuario,
}: {
	rotaAtiva: string;
	nomeUsuario: string;
}) {
	return (
		<>
			<div class="menu-overlay" id="menu-overlay" aria-hidden="true"></div>

			<nav
				class="menu"
				id="menu-mobile"
				role="navigation"
				aria-label="Menu de navegação"
				aria-hidden="true"
			>
				<button
					class="menu_fechar"
					aria-label="Fechar menu"
					id="btn-fechar-menu"
				>
					✕
				</button>

				<ul role="list" class="menu_lista">
					{NAV_ITEMS.map(({ href, label, Icone }) => {
						const ativo = rotaAtiva === href;
						return (
							<li>
								<a
									href={href}
									class={`nav_link menu_link${ativo ? " nav_link--ativo" : ""}`}
									aria-current={ativo ? "page" : undefined}
								>
									<Icone />
									{label}
								</a>
							</li>
						);
					})}
				</ul>

				<div class="menu_rodape">
					<div class="sidebar_avatar" aria-hidden="true"></div>
					<div class="menu_rodape-info">
						<span class="menu_nome">{nomeUsuario || "Meu perfil"}</span>
						<a href="/auth/logout" class="menu_logout">
							Sair da conta
						</a>
					</div>
				</div>
			</nav>
		</>
	);
}

function BotaoCamera() {
	return (
		<button
			type="button"
			class="btn-camera"
			id="btn-camera-scan"
			data-open-qr-scanner="true"
			aria-label="Escanear QR Code para novo descarte"
		>
			<IcoCamera />
		</button>
	);
}

export function AppLayout({
	title,
	rotaAtiva = "/",
	nomeUsuario,
	cssExtra,
	jsExtra,
	children,
}: AppLayoutProps) {
	return (
		<Layout title={title}>
			<link rel="stylesheet" href="/assets/css/globals.css" />
			<link rel="stylesheet" href="/assets/css/components.css" />
			{cssExtra && <link rel="stylesheet" href={cssExtra} />}
			<script src="/assets/js/menu.js"></script>
			{jsExtra && <script src={jsExtra} />}

			<div class="app-layout">
				<Sidebar rotaAtiva={rotaAtiva} nomeUsuario={nomeUsuario} />

				<div class="app-main">
					<HeaderMobile />

					{children}

					<BotaoCamera />
				</div>
			</div>

			<div class="qr-modal" id="qr-modal" aria-hidden="true">
				<div
					class="qr-modal_card"
					role="dialog"
					aria-modal="true"
					aria-labelledby="qr-modal-title"
				>
					<div class="qr-modal_header">
						<h3 id="qr-modal-title">Ler Token de Descarte</h3>
						<button
							type="button"
							class="qr-modal_close"
							id="btn-fechar-qr"
							aria-label="Fechar leitor"
						>
							✕
						</button>
					</div>
					<div id="reader" class="qr-reader"></div>
					<p id="qr-modal-result" class="qr-modal_result">
						Aponte a câmera para o QR Code.
					</p>
					<div class="qr-modal_actions">
						<button
							type="button"
							id="btn-permissao-camera"
							class="qr-modal_btn"
						>
							Permitir câmera
						</button>
						<label for="qr-file-input" class="qr-modal_btn secundario">
							Ler por foto
						</label>
						<input
							id="qr-file-input"
							class="qr-file-input"
							type="file"
							accept="image/*"
						/>
					</div>
				</div>
			</div>

			{/* Pop-up E2 — Falha ao registrar o descarte */}
			<div
				class="descarte-erro-overlay"
				id="descarte-erro-overlay"
				aria-hidden="true"
			>
				<div
					class="descarte-erro-card"
					role="alertdialog"
					aria-modal="true"
					aria-labelledby="descarte-erro-titulo"
					aria-describedby="descarte-erro-mensagem"
				>
					<div class="descarte-erro-icone" aria-hidden="true">
						<svg
							xmlns="http://www.w3.org/2000/svg"
							viewBox="0 0 24 24"
							fill="none"
							stroke="currentColor"
							stroke-width="1.8"
							stroke-linecap="round"
							stroke-linejoin="round"
						>
							<circle cx="12" cy="12" r="10" />
							<line x1="12" y1="8" x2="12" y2="12" />
							<line x1="12" y1="16" x2="12.01" y2="16" />
						</svg>
					</div>
					<h3 class="descarte-erro-titulo" id="descarte-erro-titulo">
						Não foi possível registrar o descarte
					</h3>
					<p class="descarte-erro-mensagem" id="descarte-erro-mensagem">
						Ocorreu um problema ao comunicar com o servidor. O descarte não foi
						registrado, nenhum ponto foi creditado e as insígnias não foram
						verificadas. Por favor, tente novamente mais tarde.
					</p>
					<button
						type="button"
						class="descarte-erro-btn"
						id="btn-fechar-descarte-erro"
						aria-label="Fechar aviso de erro"
					>
						Entendido
					</button>
				</div>
			</div>

			<MenuMobile rotaAtiva={rotaAtiva} nomeUsuario={nomeUsuario} />

			<script src="https://unpkg.com/html5-qrcode@2.3.8/html5-qrcode.min.js"></script>
			<script>{`
(function(){
  var btn    = document.getElementById('btn-menu-mobile');
  var fechar = document.getElementById('btn-fechar-menu');
  var menu = document.getElementById('menu-mobile');
  var overlay= document.getElementById('menu-overlay');
  if(!btn||!menu||!overlay) return;

  function abrir(){
    menu.classList.add('aberto');
    overlay.classList.add('aberto');
    menu.setAttribute('aria-hidden','false');
    btn.setAttribute('aria-expanded','true');
    var first = menu.querySelector('a,button');
    if(first) first.focus();
  }
  function fecharFn(){
    menu.classList.remove('aberto');
    overlay.classList.remove('aberto');
    menu.setAttribute('aria-hidden','true');
    btn.setAttribute('aria-expanded','false');
    btn.focus();
  }
  btn.addEventListener('click', abrir);
  if(fechar) fechar.addEventListener('click', fecharFn);
  overlay.addEventListener('click', fecharFn);
  document.addEventListener('keydown', function(e){
    if(e.key==='Escape' && menu.classList.contains('aberto')) fecharFn();
  });
})();

(function(){
	var botoesAbrir = document.querySelectorAll('[data-open-qr-scanner="true"]');
	var btnFechar = document.getElementById('btn-fechar-qr');
	var modal = document.getElementById('qr-modal');
	var modalCard = modal ? modal.querySelector('.qr-modal_card') : null;
	var resultado = document.getElementById('qr-modal-result');
	if(!botoesAbrir.length || !btnFechar || !modal || !modalCard || !resultado) return;

	var btnPermissao = null;
	var fileInput = null;

	var qr = null;
	var lendo = false;
	var validando = false;
	var recarregarAoFechar = false;

	function capturarControlesLeitura() {
		btnPermissao = document.getElementById('btn-permissao-camera');
		fileInput = document.getElementById('qr-file-input');
		if (fileInput) {
			fileInput.setAttribute('capture', 'environment');
		}
	}

	function registrarEventosControlesLeitura() {
		if (btnPermissao && !btnPermissao.dataset.bound) {
			btnPermissao.addEventListener('click', function(){
				pedirPermissaoCamera();
			});
			btnPermissao.dataset.bound = '1';
		}
		if (fileInput && !fileInput.dataset.bound) {
			fileInput.addEventListener('change', function(ev){
				var file = ev && ev.target && ev.target.files ? ev.target.files[0] : null;
				if (file) lerPorFoto(file);
			});
			fileInput.dataset.bound = '1';
		}
	}

	function restaurarElementosDeLeitura() {
		if (!document.getElementById('reader')) {
			var reader = document.createElement('div');
			reader.id = 'reader';
			reader.className = 'qr-reader';
			modalCard.insertBefore(reader, resultado);
		}

		if (!modalCard.querySelector('.qr-modal_actions')) {
			var actions = document.createElement('div');
			actions.className = 'qr-modal_actions';
			actions.innerHTML =
				'<button type="button" id="btn-permissao-camera" class="qr-modal_btn">Permitir c\u00e2mera</button>' +
				'<label for="qr-file-input" class="qr-modal_btn secundario">Ler por foto</label>' +
				'<input id="qr-file-input" class="qr-file-input" type="file" accept="image/*" />';
			modalCard.appendChild(actions);
		}

		capturarControlesLeitura();
		registrarEventosControlesLeitura();
	}

	function mostrarMensagem(texto) {
		resultado.textContent = texto;
	}

	function mostrarResultadoSucesso(payload) {
		var reader = document.getElementById('reader');
		var actions = modalCard.querySelector('.qr-modal_actions');
		if (reader) reader.remove();
		if (actions) actions.remove();

		var titulo = document.getElementById('qr-modal-title');\r\n\t\tif (titulo) titulo.textContent = 'Validação concluída';

		resultado.innerHTML =
			'<span class="qr-modal_result-destaque">+' + payload.pointsAwarded + ' pontos</span>' +
			'<br>Descarte validado com sucesso.' +
			'<br>Saldo atual: ' + payload.pointsBalanceAfter;

		var btnFechar = document.getElementById('btn-fechar-qr');
		if (btnFechar) {
			btnFechar.textContent = 'Ver no extrato';
		}

		recarregarAoFechar = true;
	}

	function mostrarResultadoErro(mensagem) {
		mostrarMensagem(mensagem);
	}

	function abrirPopupErroDescarte() {
		fecharModal();
		var overlay = document.getElementById('descarte-erro-overlay');
		var btnFecharErro = document.getElementById('btn-fechar-descarte-erro');
		if (!overlay) return;
		overlay.classList.add('aberto');
		overlay.setAttribute('aria-hidden', 'false');
		if (btnFecharErro) btnFecharErro.focus();

		function fecharErro() {
			overlay.classList.remove('aberto');
			overlay.setAttribute('aria-hidden', 'true');
		}
		if (btnFecharErro && !btnFecharErro.dataset.erroBound) {
			btnFecharErro.addEventListener('click', fecharErro);
			btnFecharErro.dataset.erroBound = '1';
		}
		overlay.addEventListener('click', function(ev) {
			if (ev.target === overlay) fecharErro();
		});
		document.addEventListener('keydown', function handler(e) {
			if (e.key === 'Escape' && overlay.classList.contains('aberto')) {
				fecharErro();
				document.removeEventListener('keydown', handler);
			}
		});
	}

	function validarTokenNoBackend(decodedText) {
		if (validando) return;
		validando = true;
		mostrarMensagem('Validando token...');

		fetch('/disposal/validate-token', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
				'Accept': 'application/json'
			},
			body: JSON.stringify({ jti: decodedText })
		})
			.then(function(response){
				return response.json().then(function(data){
					return { ok: response.ok, status: response.status, data: data };
				});
			})
			.then(function(result){
				if (result.ok) {
					mostrarResultadoSucesso(result.data);
					return;
				}
				var codigo = result.data && result.data.status;
				var ehFalhaRegistro = codigo === 'falha_validacao' || result.status >= 500;
				if (ehFalhaRegistro) {
					abrirPopupErroDescarte();
					return;
				}
				mostrarResultadoErro((result.data && result.data.message) ? result.data.message : 'Falha ao validar o token.');
			})
			.catch(function(){
				abrirPopupErroDescarte();
			})
			.finally(function(){
				validando = false;
			});
	}

	function qrCodeSuccessCallback(decodedText, decodedResult) {
		mostrarMensagem('Token lido. Validando...');
		if (qr && lendo) {
			qr.stop().catch(function(){});
			lendo = false;
		}
		validarTokenNoBackend(decodedText);
	}

	function obterLeitor() {
		if (!window.Html5Qrcode || !window.Html5QrcodeSupportedFormats) {
			resultado.textContent = 'Não foi possível carregar o leitor de QR Code.';
			return null;
		}

		if (!qr) {
			qr = new window.Html5Qrcode('reader', {
				formatsToSupport: [window.Html5QrcodeSupportedFormats.QR_CODE]
			});
		}

		return qr;
	}

	function iniciarLeituraCamera() {
		if (lendo) return;
		var leitor = obterLeitor();
		if (!leitor) return;

		if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia || !window.isSecureContext) {
			resultado.textContent = 'Streaming de câmera indisponível neste navegador. Use Ler por foto.';
			return;
		}

		var config = { fps: 10, qrbox: { width: 250, height: 250 } };
		leitor.start({ facingMode: 'environment' }, config, qrCodeSuccessCallback).then(function(){
			lendo = true;
			resultado.textContent = 'Câmera iniciada. Aponte para o QR Code.';
		}).catch(function(err){
			resultado.textContent = 'Falha ao iniciar câmera: ' + (err && err.message ? err.message : String(err));
		});
	}

	function pedirPermissaoCamera() {
		if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
			resultado.textContent = 'Permissão de câmera indisponível. Use Ler por foto.';
			return;
		}

		navigator.mediaDevices.getUserMedia({ video: { facingMode: 'environment' } }).then(function(stream){
			resultado.textContent = 'Permissão concedida. Iniciando leitor...';
			stream.getTracks().forEach(function(track){ track.stop(); });
			iniciarLeituraCamera();
		}).catch(function(err){
			resultado.textContent = 'Permissão negada ou indisponível: ' + (err && err.message ? err.message : String(err));
		});
	}

	function lerPorFoto(file) {
		if (!file) return;
		var leitor = obterLeitor();
		if (!leitor) return;

		resultado.textContent = 'Lendo QR Code da imagem...';
		leitor.scanFile(file, true).then(function(decodedText){
			qrCodeSuccessCallback(decodedText, null);
		}).catch(function(err){
			resultado.textContent = 'Não foi possível ler QR da imagem: ' + (err && err.message ? err.message : String(err));
		});
	}

	function abrirModal() {
		restaurarElementosDeLeitura();
		var titulo = document.getElementById('qr-modal-title');
		if (titulo) titulo.textContent = 'Ler Token de Descarte';
		qr = null;
		lendo = false;
		modal.classList.add('aberto');
		modal.setAttribute('aria-hidden', 'false');
		resultado.textContent = 'Permita o uso da câmera ou escolha Ler por foto.';
		pedirPermissaoCamera();
	}

	function fecharModal() {
		modal.classList.remove('aberto');
		modal.setAttribute('aria-hidden', 'true');
		if (qr && lendo) {
			qr.stop().catch(function(){});
			lendo = false;
		}
		if (fileInput) fileInput.value = '';
		if (recarregarAoFechar) {
			window.location.reload();
		}
	}

	botoesAbrir.forEach(function(btn){
		btn.addEventListener('click', function(ev){
			ev.preventDefault();
			abrirModal();
		});
	});
	restaurarElementosDeLeitura();
	btnFechar.addEventListener('click', fecharModal);
	modal.addEventListener('click', function(ev){
		if (ev.target === modal) fecharModal();
	});
	document.addEventListener('keydown', function(e){
		if (e.key === 'Escape' && modal.classList.contains('aberto')) fecharModal();
	});
})();

`}</script>
			{jsExtra && <script src={jsExtra}></script>}
		</Layout>
	);
}
