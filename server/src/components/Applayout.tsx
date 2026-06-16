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
	// { href: "/simular_descarte", label: "Simular descarte", Icone: IcoDescarte },
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

const CSS_APP = `
@import url('https://fonts.googleapis.com/css2?family=Oxanium:wght@700&family=Poppins:wght@400;500;600&display=swap');

*, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

:root {
  --color-bg:         #D0EFD6;
  --color-surface:    #F0FAF2;
  --color-border:     #2B5633;
  --color-primary:    #2B5633;
  --color-primary-dk: #1e3d24;
  --color-text:       #1F1F1F;
  --color-muted:      #7A7A7A;
  --color-white:      #ffffff;
  --shadow-sm:        0 2px 8px rgba(0,0,0,.05);
  --shadow-md:        0 4px 16px rgba(0,0,0,.10);
  --sidebar-w:        72px;
  --sidebar-w-open:   200px;
  --transition:       .2s ease;
  --radius-card:      12px;
}

body {
  background: var(--color-bg);
  font-family: 'Poppins', sans-serif;
  color: var(--color-text);
  min-height: 100vh;
}

/* ── Layout raiz ── */
.app-layout {
  display: flex;
  min-height: 100vh;
}

/* ── Sidebar ── */
.sidebar {
  width: var(--sidebar-w);
  min-height: 100vh;
  background: var(--color-surface);
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 24px 0 28px;
  flex-shrink: 0;
  border-right: 1px solid rgba(43,86,51,.15);
  position: sticky;
  top: 0;
  height: 100vh;
  overflow: hidden;
  transition: width .25s ease, box-shadow .25s ease;
  z-index: 100;
}
.sidebar:hover {
  width: var(--sidebar-w-open);
  box-shadow: 4px 0 20px rgba(43,86,51,.12);
}

.sidebar_logo { margin-bottom: 32px; flex-shrink: 0; }
.sidebar_logo-img {
  width: 48px; height: 48px;
  object-fit: contain; display: block;
}

.sidebar_nav { flex: 1; width: 100%; padding: 0 10px; }
.sidebar_nav ul { list-style: none; display: flex; flex-direction: column; gap: 4px; }

/* ── Links de navegação (sidebar + menu compartilham .nav_link) ── */
.nav_link {
  display: flex; align-items: center; gap: 10px;
  padding: 10px 13px; border-radius: 8px;
  text-decoration: none; color: var(--color-text);
  font-size: .9rem; font-weight: 500;
  white-space: nowrap;
  transition: background var(--transition), color var(--transition);
}
.nav_link:hover, .nav_link:focus-visible {
  background: rgba(43,86,51,.10); color: var(--color-primary);
}
.nav_link--ativo {
  background: rgba(43,86,51,.13); color: var(--color-primary); font-weight: 600;
}
.nav_label {
  font-family: 'Poppins', sans-serif;
  opacity: 0;
  transition: opacity .15s ease;
  pointer-events: none;
}
.sidebar:hover .nav_label { opacity: 1; }
.nav_icon { width: 22px; height: 22px; flex-shrink: 0; color: var(--color-primary); }

/* ── Rodapé da sidebar ── */
.sidebar_rodape {
  display: flex; align-items: center; gap: 8px;
  padding: 0 13px; width: 100%;
  white-space: nowrap;
}
.sidebar_avatar {
  width: 36px; height: 36px; border-radius: 50%;
  background: #b0cbb5; flex-shrink: 0;
}
.sidebar_perfil-nome {
  font-size: .82rem; color: var(--color-muted);
  flex: 1; white-space: nowrap; overflow: hidden; text-overflow: ellipsis;
  opacity: 0; transition: opacity .15s ease;
}
.sidebar:hover .sidebar_perfil-nome { opacity: 1; }
.sidebar_logout {
  color: var(--color-muted); display: flex; align-items: center;
  padding: 4px; border-radius: 4px;
  text-decoration: none; flex-shrink: 0;
  opacity: 0; transition: opacity .15s ease, color var(--transition);
}
.sidebar:hover .sidebar_logout { opacity: 1; }
.sidebar_logout:hover, .sidebar_logout:focus-visible { color: #c62828; }

/* ── Área de conteúdo ── */
.app-main {
  flex: 1; display: flex; flex-direction: column; min-width: 0; position: relative;
}

/* ── Header mobile ── */
.header-mobile {
  display: none;
  background: var(--color-bg);
  padding: 14px 20px;
  align-items: center;
  gap: 12px;
  border-bottom: 1px solid rgba(43,86,51,.12);
  position: sticky; top: 0; z-index: 50;
}
.header-mobile_menu {
  background: none; border: none; cursor: pointer;
  color: var(--color-primary); display: flex; align-items: center;
  padding: 4px; border-radius: 6px; transition: background var(--transition);
}
.header-mobile_menu:hover, .header-mobile_menu:focus-visible {
  background: rgba(43,86,51,.1);
}
.header-mobile_logo { display: flex; align-items: center; flex: 1; justify-content: center; }
.header-mobile_logo-img { height: 36px; object-fit: contain; }

/* ── FAB câmera ── */
.btn-camera {
  display: none;
  position: fixed; bottom: 28px; right: 24px;
  width: 56px; height: 56px; border-radius: 50%;
  background: var(--color-primary); color: var(--color-white);
  align-items: center; justify-content: center;
  box-shadow: 0 4px 16px rgba(43,86,51,.40);
  text-decoration: none;
  transition: background var(--transition), transform var(--transition), box-shadow var(--transition);
  z-index: 100;
}
.btn-camera:hover, .btn-camera:focus-visible {
  background: var(--color-primary-dk); transform: scale(1.06);
  box-shadow: 0 6px 20px rgba(43,86,51,.50);
}

.qr-modal {
	position: fixed;
	inset: 0;
	z-index: 1000;
	background: rgba(0,0,0,.55);
	display: none;
	align-items: center;
	justify-content: center;
	padding: 1rem;
}

.qr-modal.aberto {
	display: flex;
}

.qr-modal_card {
	width: min(95vw, 420px);
	background: #fff;
	border-radius: 14px;
	padding: 1rem;
	box-shadow: 0 10px 35px rgba(0,0,0,.25);
	display: grid;
	gap: .75rem;
}

.qr-modal_header {
	display: flex;
	align-items: center;
	justify-content: space-between;
}

.qr-modal_header h3 {
	font-family: 'Oxanium', sans-serif;
	color: var(--color-primary);
	font-size: 1.15rem;
}

.qr-modal_close {
	border: none;
	background: transparent;
	color: #5f5f5f;
	font-size: 1.2rem;
	cursor: pointer;
	padding: .2rem .4rem;
}

.qr-reader {
	min-height: 280px;
	border: 1px solid rgba(43,86,51,.18);
	border-radius: 10px;
	overflow: hidden;
}

.qr-modal_result {
	font-size: .9rem;
	color: #1e3d24;
	word-break: break-all;
}

.qr-modal_result-destaque {
	display: inline-block;
	font-size: 1.35rem;
	font-weight: 700;
	color: #1f6d2f;
	margin-bottom: .4rem;
}

.qr-modal_actions {
	display: flex;
	flex-wrap: wrap;
	gap: .5rem;
}

.qr-modal_btn {
	border: none;
	border-radius: 8px;
	padding: .5rem .75rem;
	font-size: .9rem;
	font-weight: 600;
	cursor: pointer;
	background: var(--color-primary);
	color: #fff;
}

.qr-modal_btn.secundario {
	background: #eaf5ec;
	color: #1e3d24;
	border: 1px solid rgba(43,86,51,.25);
}

.qr-file-input {
	display: none;
}

/* ── Pop-up E2: Falha ao registrar descarte ── */
.descarte-erro-overlay {
	display: none;
	position: fixed;
	inset: 0;
	background: rgba(0, 0, 0, 0.55);
	z-index: 900;
	align-items: center;
	justify-content: center;
	padding: 1rem;
}
.descarte-erro-overlay.aberto {
	display: flex;
}
.descarte-erro-card {
	background: var(--color-surface, #fff);
	border-radius: 16px;
	box-shadow: 0 8px 32px rgba(0, 0, 0, 0.18);
	padding: 2rem 1.75rem 1.5rem;
	max-width: 360px;
	width: 100%;
	display: flex;
	flex-direction: column;
	align-items: center;
	gap: 0.85rem;
	text-align: center;
	animation: descarte-erro-entrada 0.2s ease;
}
@keyframes descarte-erro-entrada {
	from { opacity: 0; transform: scale(0.93) translateY(8px); }
	to   { opacity: 1; transform: scale(1)   translateY(0);    }
}
.descarte-erro-icone {
	width: 52px;
	height: 52px;
	border-radius: 50%;
	background: #fff3f3;
	border: 2px solid #f5c6c6;
	display: flex;
	align-items: center;
	justify-content: center;
	color: #c62828;
	flex-shrink: 0;
}
.descarte-erro-icone svg {
	width: 28px;
	height: 28px;
}
.descarte-erro-titulo {
	font-size: 1.05rem;
	font-weight: 700;
	color: var(--color-text, #1a1a1a);
	margin: 0;
	line-height: 1.3;
}
.descarte-erro-mensagem {
	font-size: 0.88rem;
	color: var(--color-text-secondary, #555);
	margin: 0;
	line-height: 1.55;
}
.descarte-erro-btn {
	margin-top: 0.4rem;
	width: 100%;
	padding: 0.7rem 1rem;
	border: none;
	border-radius: 8px;
	background: #c62828;
	color: #fff;
	font-size: 0.95rem;
	font-weight: 600;
	cursor: pointer;
	transition: background 0.15s ease;
}
.descarte-erro-btn:hover,
.descarte-erro-btn:focus-visible {
	background: #a31515;
}

/* ── Menu overlay ── */
.menu-overlay {
  display: none; position: fixed; inset: 0;
  background: rgba(0,0,0,.40); z-index: 200;
  opacity: 0; transition: opacity var(--transition);
}
.menu-overlay.aberto { display: block; opacity: 1; }

/* ── Menu ── */
.menu {
  position: fixed; top: 0; left: 0;
  width: 268px; height: 100%;
  background: var(--color-surface); z-index: 300;
  padding: 24px 20px 32px;
  display: flex; flex-direction: column; gap: 20px;
  transform: translateX(-100%);
  transition: transform .25s ease;
  box-shadow: 4px 0 20px rgba(0,0,0,.12);
}
.menu.aberto { transform: translateX(0); }

.menu_fechar {
  align-self: flex-end; background: none; border: none;
  font-size: 1.2rem; cursor: pointer; color: var(--color-muted);
  padding: 4px 8px; border-radius: 4px; transition: color var(--transition);
}
.menu_fechar:hover { color: var(--color-text); }

.menu_lista { list-style: none; display: flex; flex-direction: column; gap: 4px; flex: 1; }

.menu_link {
  font-size: .95rem;
}

.menu_rodape {
  display: flex; align-items: center; gap: 12px;
  padding-top: 16px; border-top: 1px solid rgba(43,86,51,.15);
}
.menu_rodape-info { display: flex; flex-direction: column; gap: 2px; }
.menu_nome { font-size: .88rem; font-weight: 500; color: var(--color-text); }
.menu_logout {
  font-size: .78rem; color: #c62828; text-decoration: none;
  transition: opacity var(--transition);
}
.menu_logout:hover { opacity: .75; }

/* ── Tablet (≤ 1024px) ── */
@media (max-width: 1024px) {
  .sidebar { display: none; }
  .header-mobile { display: flex; }
  .btn-camera { display: flex; }
}

/* ── Mobile (≤ 600px) ── */
@media (max-width: 600px) {
  .btn-camera { bottom: 20px; right: 16px; width: 52px; height: 52px; }
}
`;

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
			<style>{CSS_APP}</style>

			{cssExtra && <link rel="stylesheet" href={cssExtra} />}

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

		var titulo = document.getElementById('qr-modal-title');
		if (titulo) titulo.textContent = 'Validação concluída';

		resultado.innerHTML =
			'<span class="qr-modal_result-destaque">+' + payload.pointsAwarded + ' pontos</span>' +
			'<br>Descarte validado com sucesso.' +
			'<br>Saldo atual: ' + payload.pointsBalanceAfter;
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