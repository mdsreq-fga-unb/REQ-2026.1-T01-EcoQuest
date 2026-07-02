import { beforeEach, describe, expect, mock, test } from "bun:test";

const dbMock = mock();

// Mock do módulo de banco de dados (Spy)
mock.module("../../src/db", () => ({
  db: dbMock,
}));

// Importamos os services e exceções *após* o mock ser registrado
const service = await import("../../src/modules/ranking/service");
const { buscarRanking, ErroRankingIndisponivel, ErroAnonimato } = service;

describe("Ranking Service", () => {
  beforeEach(() => {
    dbMock.mockReset();
  });

  describe("buscarRanking", () => {
    test("deve retornar Top 20 e Posição do Usuário perfeitamente", async () => {
      const top20Mock = [
        {
          id: 1,
          name: "Alice",
          pointsTotalEarned: 150,
          rankingAnonymous: false,
          insigniaMaisRecente: "Reciclador Ouro",
        },
        {
          id: 2,
          name: "Bob",
          pointsTotalEarned: 50,
          rankingAnonymous: true,
          insigniaMaisRecente: null,
        },
      ];

      const posicaoMock = [
        {
          posicao: 2,
          name: "Bob",
          pointsTotalEarned: 50,
          insigniaMaisRecente: null,
        },
      ];

      dbMock
        .mockResolvedValueOnce(top20Mock)
        .mockResolvedValueOnce(posicaoMock);

      const idUsuario = 2; // Testando com o id de Bob
      const resultado = await buscarRanking(idUsuario);

      // Assert: Verifica retornos da Caixa Preta
      expect(resultado.posicaoUsuario.posicao).toBe(2);
      expect(resultado.posicaoUsuario.nome).toBe("Bob");

      expect(resultado.top20.length).toBe(2);

      // Verifica anonimato (Alice publica, Bob anônimo mas é o próprio usuário)
      expect(resultado.top20[0].nome).toBe("Alice");
      expect(resultado.top20[1].nome).toBe("Bob"); // Como Bob é o idUsuario (2), não mascara o nome

      expect(resultado.top20[0].ehUsuarioAtual).toBe(false);
      expect(resultado.top20[1].ehUsuarioAtual).toBe(true);

      expect(dbMock).toHaveBeenCalledTimes(2);
    });

    test("deve aplicar máscara de anonimato para usuários que não são o logado", async () => {
      const top20Mock = [
        {
          id: 1,
          name: "Carlos",
          pointsTotalEarned: 150,
          rankingAnonymous: true, // Quer ficar anônimo
          insigniaMaisRecente: null,
        },
      ];
      const posicaoMock = [
        {
          posicao: 2,
          name: "Diana",
          pointsTotalEarned: 50,
          insigniaMaisRecente: null,
        },
      ];

      dbMock
        .mockResolvedValueOnce(top20Mock)
        .mockResolvedValueOnce(posicaoMock);

      const idUsuarioLogado = 2; // Diana
      const resultado = await buscarRanking(idUsuarioLogado);

      // Como o id é 2 e Carlos é 1, ele deve aparecer com máscara
      expect(resultado.top20[0].nome).toBe("C***");
      expect(resultado.top20[0].ehUsuarioAtual).toBe(false);
    });

    test("deve lidar com o desvio interno de usuário sem pontuação executando uma terceira query", async () => {
      const idUsuarioMock = 99;

      // 1ª Chamada: Top 20 (apenas outros usuários)
      const top20Mock = [
        {
          id: 1,
          name: "Alice",
          pointsTotalEarned: 100,
          rankingAnonymous: false,
          insigniaMaisRecente: null,
        },
      ];
      // 2ª Chamada: Não encontra a posição do usuário (rows.length === 0)
      const posicaoVaziaMock: any[] = [];

      // 3ª Chamada: Fallback de usuário sem pontos
      const usuarioFallbackMock = [
        {
          name: "Bob Sem Pontos",
          pointsTotalEarned: 0,
          insigniaMaisRecente: null,
        },
      ];

      dbMock
        .mockResolvedValueOnce(top20Mock)
        .mockResolvedValueOnce(posicaoVaziaMock)
        .mockResolvedValueOnce(usuarioFallbackMock);

      const resultado = await buscarRanking(idUsuarioMock);

      // Assert Negócio
      expect(resultado.posicaoUsuario.posicao).toBe(0);
      expect(resultado.posicaoUsuario.nome).toBe("Bob Sem Pontos");
      expect(resultado.posicaoUsuario.pontuacao).toBe(0);

      // Assert Estrutural (Spy)
      expect(dbMock).toHaveBeenCalledTimes(3);
    });

    test("deve lidar com usuário inexistente no fallback da terceira query", async () => {
      dbMock
        .mockResolvedValueOnce([]) // Sem Top 20
        .mockResolvedValueOnce([]) // Sem Posição Rankeada
        .mockResolvedValueOnce([]); // Não encontrou o usuário no DB

      const resultado = await buscarRanking(999);

      expect(resultado.posicaoUsuario.posicao).toBe(0);
      expect(resultado.posicaoUsuario.nome).toBe(""); // Fallback de default
      expect(resultado.posicaoUsuario.pontuacao).toBe(0);

      expect(dbMock).toHaveBeenCalledTimes(3);
    });

    test("deve lançar ErroRankingIndisponivel se a query de Top 20 falhar", async () => {
      dbMock.mockRejectedValueOnce(new Error("Falha no banco"));

      await expect(buscarRanking(1)).rejects.toBeInstanceOf(
        ErroRankingIndisponivel,
      );

      // Verifica que parou na primeira chamada
      expect(dbMock).toHaveBeenCalledTimes(1);
    });

    test("deve lançar ErroRankingIndisponivel se a query de posição falhar", async () => {
      dbMock
        .mockResolvedValueOnce([]) // Top 20 ok
        .mockRejectedValueOnce(new Error("Falha no banco 2")); // Posição falha

      await expect(buscarRanking(1)).rejects.toBeInstanceOf(
        ErroRankingIndisponivel,
      );

      expect(dbMock).toHaveBeenCalledTimes(2);
    });

    test("deve lançar ErroAnonimato se houver falha durante o loop de mapeamento", async () => {
      // Simular uma falha bizarra no mapeamento retornando null no array do top20 para que row.id dispare Type Error
      const top20Mock = [null];

      dbMock
        .mockResolvedValueOnce(top20Mock)
        .mockResolvedValueOnce([
          { posicao: 1, name: "A", pointsTotalEarned: 10 },
        ]);

      await expect(buscarRanking(1)).rejects.toBeInstanceOf(ErroAnonimato);
    });
  });
});
