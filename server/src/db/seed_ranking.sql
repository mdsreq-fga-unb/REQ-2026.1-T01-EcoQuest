-- 1. Limpar dados anteriores (CUIDADO: limpa usuários, transações, etc.)
-- Opcional: Se quiser manter os dados existentes, comente os truncates.
-- TRUNCATE TABLE "user" CASCADE;
-- TRUNCATE TABLE insignia CASCADE;

-- 2. Criar algumas insignias para o Ranking
INSERT INTO insignia (id, code, name, description, criteria, is_active)
VALUES 
(100, 'reciclador_iniciante', 'Iniciante', 'Fez o primeiro descarte', '{}', true),
(101, 'reciclador_prata', 'Prata', 'Atingiu 500 pontos', '{}', true),
(102, 'reciclador_ouro', 'Ouro', 'Atingiu 1000 pontos', '{}', true),
(103, 'rei_do_lixo', 'Eco King', 'Atingiu 5000 pontos', '{}', true)
ON CONFLICT (code) DO NOTHING;

-- 3. Inserir usuários fictícios com pontuações variadas para popular o Ranking (Top 20)
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

-- 4. Associar insignias aos usuários (isso aparecerá abaixo do nome no ranking)
INSERT INTO user_insignia (id_user, id_insignia, unlocked_at)
VALUES
(1001, 103, now()), -- Maria: Eco King
(1002, 103, now()), -- João: Eco King
(1003, 102, now()), -- Ana: Ouro
(1004, 102, now()), -- Lucas: Ouro
(1005, 102, now()), -- Carla: Ouro
(1006, 102, now()), -- Pedro: Ouro
(1007, 102, now()), -- Mariana: Ouro
(1008, 101, now()), -- Roberto: Prata
(1009, 101, now()), -- Julia: Prata
(1010, 101, now()), -- Marcos: Prata
(1011, 101, now()), -- Fernanda: Prata
(1012, 101, now()), -- Rafael: Prata
(1013, 101, now()), -- Patricia: Prata
(1014, 101, now()), -- Tiago: Prata
(1015, 101, now()), -- Camila: Prata
(1016, 101, now()), -- Diego: Prata
(1017, 101, now()), -- Letícia: Prata
(1018, 100, now()), -- Bruno: Iniciante
(1019, 100, now()), -- Amanda: Iniciante
(1020, 100, now()), -- Felipe: Iniciante
(1021, 100, now()), -- Larissa: Iniciante
(1022, 100, now()), -- Thiago: Iniciante
(1023, 100, now()), -- Beatriz: Iniciante
(1024, 100, now())  -- Eduardo: Iniciante
ON CONFLICT (id_user, id_insignia) DO NOTHING;

-- Atualiza a sequence do ID para evitar erros futuros em inserções normais
SELECT setval('user_id_seq', (SELECT MAX(id) FROM "user"));
SELECT setval('insignia_id_seq', (SELECT MAX(id) FROM insignia));
