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
		<a
			href="/"
			class="btn-camera"
			aria-label="Escanear QR Code para novo descarte"
			role="button"
		>
			<IcoCamera />
		</a>
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

			<MenuMobile rotaAtiva={rotaAtiva} nomeUsuario={nomeUsuario} />

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

`}</script>
			{jsExtra && <script src={jsExtra}></script>}
		</Layout>
	);
}
