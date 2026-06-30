import { Html } from "@elysia/html";
import { AppLayout } from "../../components/Applayout";
import type {
	Conquista,
	PremioConquista,
	VitrineConquistas,
} from "./service";

interface AchievementViewProps {
	nomeUsuario: string;
	vitrine?: VitrineConquistas;
	erro?: string;
}

function IconeInsignia({ bloqueada }: { bloqueada: boolean }) {
	return (
		<span
			class={`insignias-card_icone${bloqueada ? " insignias-card_icone--bloqueada" : ""}`}
			aria-hidden="true"
		>
			<svg viewBox="0 0 24 24" fill="none">
				<path d="M4 7.5h5.2M6.5 4.7v5.6M14.8 5.2a3 3 0 1 1 0 6h-2.1M16.5 14.2a3 3 0 1 1 0 6h-4.2M4.2 16.8h5.1M6.7 14v5.6" />
			</svg>
		</span>
	);
}

function IconePremio() {
	return (
		<span class="insignias-premio_icone" aria-hidden="true">
			<svg viewBox="0 0 24 24" fill="none">
				<path d="M19.3 4.7c-4.8-.8-9.5 1.2-12.1 5.2-1.5 2.3-1.8 5-1 7.5 2.5.8 5.2.5 7.5-1 4-2.6 6-7.3 5.6-11.7Z" />
				<path d="M4 20c3.1-4.2 6.9-7.6 11.5-10.2M10.4 12.4l.4 4M13.1 9.9l3.8.2" />
			</svg>
		</span>
	);
}

function Premio({ premio }: { premio: PremioConquista }) {
	return (
		<li class="insignias-premio">
			<IconePremio />
			<div>
				<strong>{premio.nome}</strong>
				<p>{premio.descricao}</p>
			</div>
		</li>
	);
}

function CardConquista({ conquista }: { conquista: Conquista }) {
	const bloqueada = conquista.estado === "bloqueada";
	const progressoTexto =
		conquista.progresso === null ? "Não calculado" : `${conquista.progresso}%`;
	const progressoBarra = conquista.progresso ?? 0;
	const estadoTexto =
		conquista.estado === "obtida"
			? "Insígnia conquistada"
			: progressoBarra > 0
				? "Insígnia em progresso"
				: "Insígnia bloqueada";

	return (		<article class={`insignias-card insignias-card--${conquista.estado}`}>
			<header class="insignias-card_cabecalho">
				<IconeInsignia bloqueada={bloqueada} />
				<div class="insignias-card_resumo">
					<div class="insignias-card_titulo">
						<h2>{conquista.nome}</h2>
						<span>{progressoTexto}</span>
					</div>
					<div
						class="insignias-progresso"
						role="progressbar"
						aria-label={`Progresso de ${conquista.nome}`}
						aria-valuemin="0"
						aria-valuemax="100"
						aria-valuenow={conquista.progresso ?? undefined}
						aria-valuetext={progressoTexto}
					>
						<span style={`width:${progressoBarra}%`}></span>
					</div>
					<span class="insignias-card_estado">{estadoTexto}</span>
				</div>			</header>

			<section class="insignias-card_secao" aria-labelledby={`criterio-${conquista.id}`}>
				<h3 id={`criterio-${conquista.id}`}>Critérios</h3>
				<p>{conquista.criterio}</p>
			</section>

			<section class="insignias-card_secao" aria-labelledby={`premios-${conquista.id}`}>
				<h3 id={`premios-${conquista.id}`}>Prêmios</h3>
				{conquista.premios.length > 0 ? (
					<ul class="insignias-premios" role="list">
						{conquista.premios.map((premio) => (
							<Premio premio={premio} />
						))}
					</ul>
				) : (
					<p class="insignias-card_sem-premio">
						Nenhum prêmio vinculado a esta insígnia.
					</p>
				)}
			</section>
		</article>
	);
}

function EstadoErro({ mensagem }: { mensagem: string }) {
	return (
		<section class="insignias-feedback" role="alert">
			<IconeInsignia bloqueada={true} />
			<h2>Não foi possível carregar as conquistas</h2>
			<p>{mensagem}</p>
			<a class="insignias-feedback_acao" href="/insignias">
				Tentar novamente
			</a>
		</section>
	);
}

export function AchievementView({
	nomeUsuario,
	vitrine,
	erro,
}: AchievementViewProps) {
	const nenhumaObtida =
		vitrine?.conquistas.every((conquista) => conquista.estado !== "obtida") ??
		false;

	return (
		<AppLayout
			title="Insígnias | EcoQuest"
			rotaAtiva="/insignias"
			nomeUsuario={nomeUsuario}
			cssExtra="/assets/achievement.css"
		>
			<main class="insignias-pagina">
				<h1>Insígnias</h1>

				{erro ? (
					<EstadoErro mensagem={erro} />
				) : (
					<>
						{nenhumaObtida && (
							<section class="insignias-vazio" aria-label="Nenhuma conquista obtida">
								<strong>Você ainda não conquistou insígnias.</strong>
								<span>Confira abaixo as conquistas disponíveis para obter.</span>
							</section>
						)}

						<div class="insignias-lista">
							{vitrine?.conquistas.map((conquista) => (
								<CardConquista conquista={conquista} />
							))}
						</div>
					</>
				)}
			</main>
		</AppLayout>
	);
}