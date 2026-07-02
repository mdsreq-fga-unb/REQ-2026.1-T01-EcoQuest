-- 1. Limpar dados anteriores (CUIDADO: limpa usuários, transações, etc.)
-- Opcional: Se quiser manter os dados existentes, comente os truncates.
-- TRUNCATE TABLE "user" CASCADE;
-- TRUNCATE TABLE insignia CASCADE;

-- As insignias utilizadas abaixo são definidas no seed_insignias.sql (executado antes via db:seed:all)
--  104 = Primeiro Descarte  
--  106 = Eco Frequente      |  107 = Bronze
--  108 = Amigo da Coleta    |  109 = Eco Star

-- 2. Inserir usuários fictícios com pontuações variadas para popular o Ranking (Top 20)
-- Os CPFs e emails são fictícios para garantir o UNIQUE constraint
INSERT INTO "user" (id, name, email, cpf, phone, password_hash, points_balance, points_total_earned, ranking_anonymous)
VALUES
(1001, 'Maria Silva', 'maria@email.com', '11111111111', '11999999991', 'hash', 100, 5200, false),
(1002, 'João Souza', 'joao@email.com', '11111111112', '11999999992', 'hash', 0, 4800, false),
(1003, 'Ana Oliveira', 'ana@email.com', '11111111113', '11999999993', 'hash', 50, 4500, false),
(1004, 'Lucas Santos', 'lucas@email.com', '11111111114', '11999999994', 'hash', 200, 4100, true), -- Anônimo
(1005, 'Carla Costa', 'carla@email.com', '11111111115', '11999999995', 'hash', 0, 3900, false),
(1006, 'Pedro Alves', 'pedro@email.com', '11111111116', '11999999996', 'hash', 10, 3500, false),
(1007, 'Mariana Lima', 'mariana@email.com', '11111111117', '11999999997', 'hash', 0, 3200, false),
(1008, 'Roberto Dias', 'roberto@email.com', '11111111118', '11999999998', 'hash', 100, 2900, true), -- Anônimo
(1009, 'Julia Mendes', 'julia@email.com', '11111111119', '11999999999', 'hash', 20, 2600, false),
(1010, 'Marcos Rocha', 'marcos@email.com', '11111111120', '11999999910', 'hash', 0, 2400, false),
(1011, 'Fernanda Gomes', 'fernanda@email.com', '11111111121', '11999999911', 'hash', 5, 2100, false),
(1012, 'Rafael Martins', 'rafael@email.com', '11111111122', '11999999912', 'hash', 0, 1900, false),
(1013, 'Patrícia Nunes', 'patricia@email.com', '11111111123', '11999999913', 'hash', 0, 1750, false),
(1014, 'Tiago Correia', 'tiago@email.com', '11111111124', '11999999914', 'hash', 10, 1600, false),
(1015, 'Camila Ribeiro', 'camila@email.com', '11111111125', '11999999915', 'hash', 0, 1400, false),
(1016, 'Diego Barbosa', 'diego@email.com', '11111111126', '11999999916', 'hash', 50, 1250, false),
(1017, 'Letícia Farias', 'leticia@email.com', '11111111127', '11999999917', 'hash', 0, 1100, false),
(1018, 'Bruno Cardoso', 'bruno@email.com', '11111111128', '11999999918', 'hash', 0, 950, true), -- Anônimo
(1019, 'Amanda Castro', 'amanda@email.com', '11111111129', '11999999919', 'hash', 0, 800, false),
(1020, 'Felipe Moura', 'felipe@email.com', '11111111130', '11999999920', 'hash', 0, 600, false),
(1021, 'Larissa Vieira', 'larissa@email.com', '11111111131', '11999999921', 'hash', 0, 400, false),
(1022, 'Thiago Silva', 'thiago@email.com', '11111111132', '11999999922', 'hash', 0, 200, false),
(1023, 'Beatriz Melo', 'beatriz@email.com', '11111111133', '11999999923', 'hash', 0, 150, false),
(1024, 'Eduardo Pinto', 'eduardo@email.com', '11111111134', '11999999924', 'hash', 0, 50, false)
ON CONFLICT (cpf) DO NOTHING;

-- 3. Associar insignias reais (do seed_insignias.sql) aos usuários
INSERT INTO user_insignia (id_user, id_insignia, unlocked_at)
VALUES
-- Eco Star (109) — topo do ranking (2000+ pontos)
(1001, 109, now()), -- Maria: 5200 pts
(1002, 109, now()), -- João:  4800 pts

-- Eco Frequente (106) — usuários intermediários (10+ descartes)
(1003, 106, now()), -- Ana:     4500 pts
(1004, 106, now()), -- Lucas:   4100 pts
(1005, 106, now()), -- Carla:   3900 pts
(1006, 106, now()), -- Pedro:   3500 pts
(1007, 106, now()), -- Mariana: 3200 pts

-- Bronze (107) — 200+ pontos
(1008, 107, now()), -- Roberto:  2900 pts
(1009, 107, now()), -- Julia:    2600 pts
(1010, 107, now()), -- Marcos:   2400 pts
(1011, 107, now()), -- Fernanda: 2100 pts
(1012, 107, now()), -- Rafael:   1900 pts
(1013, 107, now()), -- Patrícia: 1750 pts
(1014, 107, now()), -- Tiago:    1600 pts
(1015, 107, now()), -- Camila:   1400 pts
(1016, 107, now()), -- Diego:    1250 pts
(1017, 107, now()), -- Letícia:  1100 pts

-- Primeiro Descarte (104) — usuários iniciais
(1018, 104, now()), -- Bruno:    950 pts
(1019, 104, now()), -- Amanda:   800 pts
(1020, 104, now()), -- Felipe:   600 pts
(1021, 104, now()), -- Larissa:  400 pts
(1022, 104, now()), -- Thiago:   200 pts
(1023, 104, now()), -- Beatriz:  150 pts
(1024, 104, now())  -- Eduardo:   50 pts
ON CONFLICT (id_user, id_insignia) DO NOTHING;

-- Atualiza a sequence do ID para evitar erros futuros em inserções normais
SELECT setval('user_id_seq', (SELECT MAX(id) FROM "user"));
