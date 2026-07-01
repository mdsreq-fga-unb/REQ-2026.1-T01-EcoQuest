import { Html } from "@elysia/html";
import { AppLayout } from "../../components/Applayout";
import { assetUrl } from "../../lib/asset-url";
import type { RegistroExtrato } from "./service";


function formatarData(data: Date): string {
	return new Intl.DateTimeFormat("pt-BR", {
		day: "2-digit",
		month: "2-digit",
		year: "numeric",
	}).format(new Date(data));
}

function formatarPeso(pesoKg: number | null): string {
	if (pesoKg == null) return "—";
	return pesoKg >= 1
		? `${pesoKg.toFixed(2).replace(".", ",")} kg`
		: `${(pesoKg * 1000).toFixed(0)} g`;
}

// Mesmas categorias da página de simulação, detectadas pelo nome do item no texto.
// O materialTipo é uma string como "Bateria de laptop (1x), Carregadores (2x)".
function classificarIcone(
	tipo: string | null,
): "bateria" | "telefone" | "computador" | "outros" {
	const t = (tipo ?? "").toLowerCase();

	const BATERIA = ["bateria"];
	const TELEFONE = [
		"celular",
		"smartphone",
		"telefone",
		"fax",
		"carregador",
		"adaptador",
	];
	const COMPUTADOR = [
		"microcomputador",
		"monitor",
		"notebook",
		"servidor",
		"teclado",
		"mouse",
		"impressora",
		"estabilizador",
		"tablet",
		"no-break",
	];

	if (BATERIA.some((p) => t.includes(p))) return "bateria";
	if (TELEFONE.some((p) => t.includes(p))) return "telefone";
	if (COMPUTADOR.some((p) => t.includes(p))) return "computador";
	return "outros";
}

function IconeMaterial({ tipo }: { tipo: string | null }) {
	const categoria = classificarIcone(tipo);

	if (categoria === "bateria") {
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
				class="extrato-card_icone-svg"
			>
				<rect x="2" y="7" width="18" height="10" rx="2" />
				<line x1="22" y1="10" x2="22" y2="14" />
				<line x1="6" y1="12" x2="10" y2="12" />
				<line x1="8" y1="10" x2="8" y2="14" />
			</svg>
		);
	}
	if (categoria === "telefone") {
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
				class="extrato-card_icone-svg"
			>
				<rect x="7" y="2" width="10" height="20" rx="2" />
				<line x1="11" y1="18" x2="13" y2="18" />
			</svg>
		);
	}
	if (categoria === "computador") {
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
				class="extrato-card_icone-svg"
			>
				<rect x="2" y="3" width="20" height="14" rx="2" />
				<line x1="8" y1="21" x2="16" y2="21" />
				<line x1="12" y1="17" x2="12" y2="21" />
			</svg>
		);
	}
	// "outros" — setas de reciclagem
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
			class="extrato-card_icone-svg"
		>
			<polyline points="1 4 1 10 7 10" />
			<polyline points="23 20 23 14 17 14" />
			<path d="M20.49 9A9 9 0 0 0 5.64 5.64L1 10m22 4l-4.64 4.36A9 9 0 0 1 3.51 15" />
		</svg>
	);
}

function CardExtrato({ registro }: { registro: RegistroExtrato }) {
	const label = registro.materialTipo?.trim()
		? registro.materialTipo
		: registro.nomePev;

	return (
		<article
			class="extrato-card"
			aria-label={`Descarte em ${registro.nomePev}`}
		>
			<div class="extrato-card_icone" aria-hidden="true">
				<IconeMaterial tipo={registro.materialTipo} />
			</div>

			<div class="extrato-card_info">
				<p class="extrato-card_material">
					Material descartado: <strong>{label}</strong>
				</p>
				<p class="extrato-card_meta">
					Peso: <span>{formatarPeso(registro.pesoKg)}</span>
					<span class="extrato-card_sep" aria-hidden="true">
						·
					</span>
					<time datetime={new Date(registro.criadoEm).toISOString()}>
						{formatarData(registro.criadoEm)}
					</time>
				</p>
			</div>

			<div
				class="extrato-card_pontos"
				role="note"
				aria-label={`${registro.pontosGanhos} pontos ganhos`}
			>
				+{registro.pontosGanhos} pontos
			</div>
		</article>
	);
}

function formatarSaldo(saldo: number): string {
	return new Intl.NumberFormat("pt-BR").format(saldo);
}

function SaldoHeader({
	saldo,
	saldoIndisponivel,
}: {
	saldo: number | null;
	saldoIndisponivel: boolean;
}) {
	return (
		<div class="extrato-header">
			<div class="extrato-header_topo">
				<div>
					<h1 class="extrato-header_titulo">Extrato</h1>
				</div>
				{saldo !== null ? (
					<span class="extrato-header_pontos">
						{formatarSaldo(saldo)} pts
					</span>
				) : (
					<span class="extrato-header_pontos extrato-header_pontos-indisponivel">
						—
					</span>
				)}
			</div>
			{saldoIndisponivel && (
				<p class="extrato-saldo_aviso" role="alert">
					Não foi possível atualizar o saldo agora. Tente novamente mais
					tarde.
				</p>
			)}
		</div>
	);
}

export function ExtratoView({
	registros,
	saldo,
	saldoIndisponivel,
	nomeUsuario,
}: {
	registros: RegistroExtrato[];
	saldo: number | null;
	saldoIndisponivel: boolean;
	nomeUsuario: string;
}) {
	return (
		<AppLayout
			title="Extrato – EcoQuest"
			rotaAtiva="/"
			nomeUsuario={nomeUsuario}
		>
			<link rel="stylesheet" href={assetUrl("css/extrato.css")} />

			<main class="extrato-conteudo" id="conteudo-principal">
				<SaldoHeader saldo={saldo} saldoIndisponivel={saldoIndisponivel} />

				{registros.length === 0 ? (
					<div class="extrato-vazio" role="note" aria-live="polite">
						<svg
							xmlns="http://www.w3.org/2000/svg"
							viewBox="0 0 24 24"
							fill="none"
							stroke="currentColor"
							stroke-width="1.5"
							stroke-linecap="round"
							stroke-linejoin="round"
							class="extrato-vazio_icone"
							aria-hidden="true"
						>
							<polyline points="1 4 1 10 7 10" />
							<polyline points="23 20 23 14 17 14" />
							<path d="M20.49 9A9 9 0 0 0 5.64 5.64L1 10m22 4l-4.64 4.36A9 9 0 0 1 3.51 15" />
						</svg>
						<p class="extrato-vazio_texto">
							Você ainda não possui descartes registrados.
						</p>
						<p class="extrato-vazio_subtexto">
							Visite um Ponto de Entrega Voluntária (PEV) e escaneie o QR Code
							para começar a acumular pontos!
						</p>
						<button
							type="button"
							data-open-qr-scanner="true"
							class="extrato-vazio_cta extrato-vazio_cta-mobile"
						>
							Fazer meu primeiro descarte
						</button>

						<button
							type="button"
							class="extrato-vazio_cta-desktop"
							id="btn-descarte-desktop"
						>
							Fazer meu primeiro descarte
						</button>
					</div>
				) : (
					<section class="extrato-lista" aria-label="Histórico de descartes">
						{registros.map((r) => (
							<CardExtrato registro={r} />
						))}
					</section>
				)}
			</main>
		</AppLayout>
	);
}