-- Seed de insígnias e recompensas vinculadas do catálogo
-- Cada insígnia libera rewards existentes na tabela reward (ids 300-318)

INSERT INTO insignia (id, code, name, description, criteria, is_active)
VALUES
    (104, 'primeiro_descarte', 'Primeiro Descarte',
     'Realize seu primeiro descarte responsável em um PEV.',
     '[{"tipo":"disposal_count","meta":1,"descricao":"Realizar 1 descarte em qualquer PEV"}]', true),
    (106, 'eco_frequente', 'Eco Frequente',
     'Realize 10 descartes no total.',
     '[{"tipo":"disposal_count","meta":10,"descricao":"Acumular 10 descartes no histórico"}]', true),

    (107, 'reciclador_bronze', 'Bronze',
     'Atingiu 200 pontos.',
     '[{"tipo":"total_points","meta":200,"descricao":"Acumular 200 pontos no total"}]', true),

    (108, 'amigo_da_coleta', 'Amigo da Coleta',
     'Use 3 PEVs diferentes.',
     '[{"tipo":"unique_pevs","meta":3,"descricao":"Visitar 3 PEVs distintos"}]', true),

    (109, 'eco_star', 'Eco Star',
     'Atingiu 2000 pontos.',
     '[{"tipo":"total_points","meta":2000,"descricao":"Acumular 2000 pontos no total"}]', true)
ON CONFLICT (code) DO NOTHING;

-- Vincular recompensas reais do catálogo às insígnias
INSERT INTO insignia_reward (id_insignia, id_reward)
VALUES
    -- Primeiro Descarte: recompensas mais baratas
    (104, 303),  -- Assaí 10% OFF (280 pts)
    (104, 311),  -- Riachuelo 10% OFF (220 pts)

    -- Guardião dos Eletrônicos: recompensas de eletrônicos
    (105, 304),  -- Amazon 10% OFF (950 pts)
    (105, 306),  -- Kabum 15% OFF (600 pts)
    (105, 307),  -- Fast Shop 5% OFF (1100 pts)

    -- Eco Frequente: recompensas de mercado
    (106, 300),  -- Carrefour R$50 OFF (600 pts)
    (106, 302),  -- Extra R$30 OFF (420 pts)

    -- Bronze: uma recompensa intermediária
    (107, 301),  -- Pão de Açúcar 15% OFF (350 pts)

    -- Amigo da Coleta: experiências
    (108, 315),  -- Trilha Verde 30% OFF (450 pts)
    (108, 316),  -- Jardim Botânico R$20 OFF (300 pts)

    -- Eco Star: recompensas premium
    (109, 304),  -- Amazon 10% OFF (950 pts)
    (109, 305),  -- Magalu R$80 OFF (700 pts)
    (109, 307)   -- Fast Shop 5% OFF (1100 pts)
ON CONFLICT DO NOTHING;

SELECT setval('insignia_id_seq', (SELECT MAX(id) FROM insignia));
