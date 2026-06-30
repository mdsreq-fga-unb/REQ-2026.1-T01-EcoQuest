import { Html } from "@elysia/html";
import { AppLayout } from "../../components/Applayout";
import { assetUrl } from "../../lib/asset-url";
import type { EntradaRanking, PosicaoUsuario } from "./service";

// ── Pódio visual (Top 3) ──

function Podio({ top3 }: { top3: EntradaRanking[] }) {
  const primeiro = top3[0];
  const segundo = top3[1];
  const terceiro = top3[2];

  return (
    <div class="ranking-podio" aria-label="Pódio dos 3 primeiros colocados">
      {segundo ? (
        <div class="ranking-podio_lugar ranking-podio_lugar--2">
          <div class="ranking-podio_texto_topo">
            <span class="ranking-podio_nome" title={segundo.nome}>
              {segundo.nome.split(" ")[0]}
            </span>
            <span class="ranking-podio_xp">
              {segundo.pontuacao.toLocaleString("pt-BR")} XP
            </span>
          </div>
          <div class="ranking-podio_avatar" aria-hidden="true"></div>
          <div class="ranking-podio_bloco">
            <span class="ranking-podio_pos">2º</span>
          </div>
        </div>
      ) : (
        <div class="ranking-podio_lugar ranking-podio_lugar--vazio"></div>
      )}

      {primeiro ? (
        <div class="ranking-podio_lugar ranking-podio_lugar--1">
          <div class="ranking-podio_texto_topo">
            <span class="ranking-podio_nome" title={primeiro.nome}>
              {primeiro.nome.split(" ")[0]}
            </span>
            <span class="ranking-podio_xp">
              {primeiro.pontuacao.toLocaleString("pt-BR")} XP
            </span>
          </div>
          <div class="ranking-podio_avatar" aria-hidden="true"></div>
          <div class="ranking-podio_bloco">
            <span class="ranking-podio_pos">1º</span>
          </div>
        </div>
      ) : (
        <div class="ranking-podio_lugar ranking-podio_lugar--vazio"></div>
      )}

      {terceiro ? (
        <div class="ranking-podio_lugar ranking-podio_lugar--3">
          <div class="ranking-podio_texto_topo">
            <span class="ranking-podio_nome" title={terceiro.nome}>
              {terceiro.nome.split(" ")[0]}
            </span>
            <span class="ranking-podio_xp">
              {terceiro.pontuacao.toLocaleString("pt-BR")} XP
            </span>
          </div>
          <div class="ranking-podio_avatar" aria-hidden="true"></div>
          <div class="ranking-podio_bloco">
            <span class="ranking-podio_pos">3º</span>
          </div>
        </div>
      ) : (
        <div class="ranking-podio_lugar ranking-podio_lugar--vazio"></div>
      )}
    </div>
  );
}

function LinhaRanking({ entrada }: { entrada: EntradaRanking }) {
  const classeExtra = entrada.ehUsuarioAtual ? " ranking-linha--eu" : "";

  return (
    <li
      class={`ranking-linha${classeExtra}`}
      aria-label={`${entrada.posicao}º lugar: ${entrada.nome}, ${entrada.pontuacao} XP`}
    >
      <span class="ranking-linha_pos">{entrada.posicao}º</span>

      <div class="ranking-linha_avatar" aria-hidden="true"></div>

      <div class="ranking-linha_info">
        <span class="ranking-linha_nome">{entrada.nome}</span>
        <span class="ranking-linha_insignia">
          {entrada.insigniaMaisRecente ?? "Sem insígnia"}
        </span>
      </div>

      <span class="ranking-linha_xp">
        {entrada.pontuacao.toLocaleString("pt-BR")} XP
      </span>
    </li>
  );
}

function LinhaUsuario({ posicao }: { posicao: PosicaoUsuario }) {
  const posTexto = posicao.posicao > 0 ? `${posicao.posicao}º` : "—";

  return (
    <div
      class="ranking-linha ranking-linha--voce"
      role="status"
      aria-label={`Sua posição: ${posTexto}, ${posicao.pontuacao} XP`}
    >
      <span class="ranking-linha_pos">{posTexto}</span>

      <div class="ranking-linha_avatar" aria-hidden="true"></div>

      <div class="ranking-linha_info">
        <span class="ranking-linha_nome ranking-linha_nome--voce">Você</span>
        <span class="ranking-linha_insignia">
          {posicao.insigniaMaisRecente ?? "Sem insígnia"}
        </span>
      </div>

      <span class="ranking-linha_xp">
        {posicao.pontuacao.toLocaleString("pt-BR")} XP
      </span>
    </div>
  );
}

export function RankingView({
  top20,
  posicaoUsuario,
  nomeUsuario,
}: {
  top20: EntradaRanking[];
  posicaoUsuario: PosicaoUsuario;
  nomeUsuario: string;
}) {
  return (
    <AppLayout
      title="Ranking – EcoQuest"
      rotaAtiva="/ranking"
      nomeUsuario={nomeUsuario}
    >
      <link rel="stylesheet" href={assetUrl("css/ranking.css")} />

      <main class="ranking-conteudo" id="conteudo-principal">
        {top20.length === 0 ? (
          <div class="ranking-vazio" role="note" aria-live="polite">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="1.5"
              stroke-linecap="round"
              stroke-linejoin="round"
              class="ranking-vazio_icone"
              aria-hidden="true"
            >
              <polyline points="18 20 18 10" />
              <polyline points="12 20 12 4" />
              <polyline points="6 20 6 14" />
            </svg>
            <p class="ranking-vazio_texto">
              Nenhum usuário possui pontuação registrada ainda.
            </p>
            <p class="ranking-vazio_subtexto">
              Faça descartes em um Ponto de Entrega Voluntária (PEV) para
              aparecer no ranking!
            </p>
          </div>
        ) : (
          <>
            {/* Pódio visual — Top 3 */}
            <Podio top3={top20.slice(0, 3)} />

            {/* Card com lista completa */}
            <div class="ranking-card">
              <ol class="ranking-lista" aria-label="Classificação dos usuários">
                {top20.slice(3).map((entrada) => (
                  <LinhaRanking entrada={entrada} />
                ))}
              </ol>

              {/* Separador + posição do usuário logado */}
              <div class="ranking-separador" aria-hidden="true"></div>
              <LinhaUsuario posicao={posicaoUsuario} />
            </div>
          </>
        )}
      </main>
    </AppLayout>
  );
}
