import { db } from "../../db";

/** E1 / E3 — Falha ao carregar ranking ou ranking indisponível */
export class ErroRankingIndisponivel extends Error {
  constructor(causa?: unknown) {
    super(
      "O ranking está temporariamente indisponível. Tente novamente mais tarde.",
    );
    this.name = "ErroRankingIndisponivel";
    if (causa instanceof Error) this.cause = causa;
  }
}

/** E2 — Falha ao aplicar preferências de anonimato */
export class ErroAnonimato extends Error {
  constructor(causa?: unknown) {
    super(
      "Não foi possível exibir o ranking no momento. Tente novamente mais tarde.",
    );
    this.name = "ErroAnonimato";
    if (causa instanceof Error) this.cause = causa;
  }
}

export interface EntradaRanking {
  posicao: number;
  nome: string;
  pontuacao: number;
  insigniaMaisRecente: string | null;
  ehUsuarioAtual: boolean;
}

export interface PosicaoUsuario {
  posicao: number;
  pontuacao: number;
  nome: string;
  insigniaMaisRecente: string | null;
}

export interface ResultadoRanking {
  top20: EntradaRanking[];
  posicaoUsuario: PosicaoUsuario;
}

interface LinhaTop20Bruta {
  id: number | string;
  name: string;
  pointsTotalEarned: number | string;
  rankingAnonymous: boolean;
  insigniaMaisRecente: string | null;
}

interface LinhaPosicaoUsuarioBruta {
  posicao: number | string;
  name: string;
  pointsTotalEarned: number | string;
  insigniaMaisRecente: string | null;
}

// ── Lógica ──

const TOP_N = 20;

function mascararNome(nome: string): string {
  const primeiraLetra = nome.trim().charAt(0).toUpperCase();
  return `${primeiraLetra}***`;
}

export async function buscarRanking(
  idUsuario: number,
): Promise<ResultadoRanking> {
  // 1. Buscar Top N com insígnia mais recente
  let linhasTop: LinhaTop20Bruta[];
  try {
    const rows = await db`
			SELECT
				u.id,
				u.name,
				u.points_total_earned AS "pointsTotalEarned",
				u.ranking_anonymous   AS "rankingAnonymous",
				(
					SELECT ins.name
					FROM user_insignia ui
					JOIN insignia ins ON ins.id = ui.id_insignia
					WHERE ui.id_user = u.id
					ORDER BY ui.unlocked_at DESC
					LIMIT 1
				) AS "insigniaMaisRecente"
			FROM "user" u
			WHERE u.points_total_earned > 0
			ORDER BY u.points_total_earned DESC, u.created_at ASC
			LIMIT ${TOP_N}
		`;
    linhasTop = rows as LinhaTop20Bruta[];
  } catch (causa) {
    throw new ErroRankingIndisponivel(causa);
  }

  // 2. Buscar posição global do usuário logado + insígnia
  let linhaPosicao: LinhaPosicaoUsuarioBruta;
  try {
    const rows = await db`
			SELECT
				ranked.posicao,
				ranked.name,
				ranked."pointsTotalEarned",
				(
					SELECT ins.name
					FROM user_insignia ui
					JOIN insignia ins ON ins.id = ui.id_insignia
					WHERE ui.id_user = ranked.id
					ORDER BY ui.unlocked_at DESC
					LIMIT 1
				) AS "insigniaMaisRecente"
			FROM (
				SELECT
					id,
					name,
					points_total_earned AS "pointsTotalEarned",
					RANK() OVER (ORDER BY points_total_earned DESC, created_at ASC) AS posicao
				FROM "user"
				WHERE points_total_earned > 0
			) ranked
			WHERE ranked.id = ${idUsuario}
		`;

    if (rows.length === 0) {
      // Usuário sem pontuação — posição fora do ranking
      const [usr] = await db`
				SELECT
					u.name,
					u.points_total_earned AS "pointsTotalEarned",
					(
						SELECT ins.name
						FROM user_insignia ui
						JOIN insignia ins ON ins.id = ui.id_insignia
						WHERE ui.id_user = u.id
						ORDER BY ui.unlocked_at DESC
						LIMIT 1
					) AS "insigniaMaisRecente"
				FROM "user" u
				WHERE u.id = ${idUsuario}
			`;
      linhaPosicao = {
        posicao: 0,
        name: usr?.name ?? "",
        pointsTotalEarned: usr?.pointsTotalEarned ?? 0,
        insigniaMaisRecente: usr?.insigniaMaisRecente ?? null,
      };
    } else {
      linhaPosicao = rows[0] as LinhaPosicaoUsuarioBruta;
    }
  } catch (causa) {
    throw new ErroRankingIndisponivel(causa);
  }

  // 3. Aplicar anonimato (E2: se falhar, não exibir ranking)
  let top20: EntradaRanking[];
  try {
    top20 = linhasTop.map((row, idx) => {
      const ehUsuarioAtual = Number(row.id) === idUsuario;
      const nome =
        row.rankingAnonymous && !ehUsuarioAtual
          ? mascararNome(String(row.name))
          : String(row.name);

      return {
        posicao: idx + 1,
        nome,
        pontuacao: Number(row.pointsTotalEarned),
        insigniaMaisRecente: row.insigniaMaisRecente
          ? String(row.insigniaMaisRecente)
          : null,
        ehUsuarioAtual,
      };
    });
  } catch (causa) {
    throw new ErroAnonimato(causa);
  }

  const posicaoUsuario: PosicaoUsuario = {
    posicao: Number(linhaPosicao.posicao),
    pontuacao: Number(linhaPosicao.pointsTotalEarned),
    nome: String(linhaPosicao.name),
    insigniaMaisRecente: linhaPosicao.insigniaMaisRecente
      ? String(linhaPosicao.insigniaMaisRecente)
      : null,
  };

  return { top20, posicaoUsuario };
}
