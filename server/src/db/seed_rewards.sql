-- Seed de parceiros e recompensas para o Catálogo / Resgate (UC11)
-- Compatível com o schema atual (reward.id_partner → partner.id)

-- 1. Parceiros (lojas/fornecedores das recompensas)
INSERT INTO partner (id, name, partner_type)
VALUES
    (200, 'Carrefour',      'COMMERCIAL'),
    (201, 'Pão de Açúcar',  'COMMERCIAL'),
    (202, 'Extra',          'COMMERCIAL'),
    (203, 'Assaí',          'COMMERCIAL'),
    (204, 'Amazon',         'COMMERCIAL'),
    (205, 'Magalu',         'COMMERCIAL'),
    (206, 'Kabum',          'COMMERCIAL'),
    (207, 'Fast Shop',      'COMMERCIAL'),
    (208, 'Renner',         'COMMERCIAL'),
    (209, 'C&A',            'COMMERCIAL'),
    (210, 'Centauro',       'COMMERCIAL'),
    (211, 'Riachuelo',      'COMMERCIAL'),
    (212, 'Casa & Jardim',  'COMMERCIAL'),
    (213, 'Verde Vida',     'COMMERCIAL'),
    (214, 'Leroy Merlin',   'COMMERCIAL'),
    (215, 'Trilha Verde',   'COMMERCIAL'),
    (216, 'Jardim Botânico','COMMERCIAL'),
    (217, 'Oficina Eco',    'COMMERCIAL')
ON CONFLICT (id) DO NOTHING;

-- 2. Recompensas (correspondem ao catálogo estático em catalogo.view.tsx)
INSERT INTO reward (id, id_partner, name, description, reward_type, points_cost, stock, is_active)
VALUES
    -- Mercado
    (300, 200, 'R$ 50 OFF em compras',          'Cupom de R$ 50 de desconto em compras no Carrefour.',                'COUPON', 600, 50,  true),
    (301, 201, '15% OFF em hortifruti',         '15% de desconto em hortifruti no Pão de Açúcar.',                    'COUPON', 350, 30,  true),
    (302, 202, 'R$ 30 OFF acima de R$ 150',     'R$ 30 de desconto em compras acima de R$ 150 no Extra.',             'COUPON', 420, 40,  true),
    (303, 203, '10% OFF em produtos de limpeza', '10% de desconto em produtos de limpeza no Assaí.',                   'COUPON', 280, 25,  true),

    -- Eletrônicos
    (304, 204, '10% OFF em eletrônicos',        '10% de desconto em eletrônicos na Amazon.',                           'COUPON', 950, 20,  true),
    (305, 205, 'R$ 80 OFF em fones e áudio',    'R$ 80 de desconto em fones e áudio no Magalu.',                     'COUPON', 700, 15,  true),
    (306, 206, '15% OFF em acessórios',         '15% de desconto em acessórios no Kabum.',                            'COUPON', 600, 20,  true),
    (307, 207, '5% OFF em smartphones',          '5% de desconto em smartphones na Fast Shop.',                        'COUPON', 1100, 10, true),

    -- Roupas
    (308, 208, '20% OFF na coleção',            '20% de desconto na coleção da Renner.',                              'COUPON', 380, 35,  true),
    (309, 209, 'R$ 40 OFF acima de R$ 200',     'R$ 40 de desconto em compras acima de R$ 200 na C&A.',               'COUPON', 420, 30,  true),
    (310, 210, '15% OFF em calçados',           '15% de desconto em calçados na Centauro.',                           'COUPON', 350, 25,  true),
    (311, 211, '10% OFF em qualquer compra',    '10% de desconto em qualquer compra na Riachuelo.',                    'COUPON', 220, 40,  true),

    -- Plantas & Jardim
    (312, 212, '20% OFF em mudas e vasos',      '20% de desconto em mudas e vasos na Casa & Jardim.',                 'COUPON', 250, 20,  true),
    (313, 213, 'R$ 25 OFF em compostagem',      'R$ 25 de desconto em compostagem na Verde Vida.',                    'COUPON', 320, 15,  true),
    (314, 214, '15% OFF em ferramentas',        '15% de desconto em ferramentas de jardim na Leroy Merlin.',           'COUPON', 400, 20,  true),

    -- Experiências
    (315, 215, '30% OFF em passeios ecológicos','30% de desconto em passeios ecológicos na Trilha Verde.',            'COUPON', 450, 30,  true),
    (316, 216, 'R$ 20 OFF em ingressos',        'R$ 20 de desconto em ingressos no Jardim Botânico.',                 'COUPON', 300, 50,  true),
    (317, 217, '15% OFF em workshops',          '15% de desconto em workshops na Oficina Eco.',                       'COUPON', 380, 20,  true),

    -- Recompensa extra (sem estoque — para testar FE-E3)
    (318, 204, 'Item esgotado (teste)',         'Recompensa com estoque zerado para testes.',                          'COUPON', 100, 0,   true)
ON CONFLICT (id) DO NOTHING;

-- Atualiza a sequence
SELECT setval('partner_id_seq', (SELECT MAX(id) FROM partner));
SELECT setval('reward_id_seq', (SELECT MAX(id) FROM reward));
