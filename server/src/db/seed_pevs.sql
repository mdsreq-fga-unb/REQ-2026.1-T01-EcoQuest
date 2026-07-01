-- Seed de PEVs com coordenadas geográficas (região do Gama / DF)
-- Usa INSERT ... ON CONFLICT para ser seguro executar múltiplas vezes.

INSERT INTO pev (id, name, latitude, longitude)
VALUES
    (500, 'PEV Gama — Praça do Relógio',      -16.017, -48.065),
    (501, 'PEV Gama — Setor Sul',              -16.030, -48.057),
    (502, 'PEV Gama — Setor Oeste',            -16.008, -48.080),
    (503, 'PEV Santa Maria — Centro',          -16.012, -48.015),
    (504, 'PEV Taguatinga — Centro',           -15.834, -48.056),
    (505, 'PEV Taguatinga — Norte',            -15.819, -48.042),
    (506, 'PEV Ceilândia — Centro',            -15.818, -48.109),
    (507, 'PEV Ceilândia — Sul',               -15.842, -48.117),
    (508, 'PEV Guará — Guará I',               -15.827, -47.983),
    (509, 'PEV Guará — Guará II',              -15.842, -47.977),
    (510, 'PEV Águas Claras — Av. das Águas',  -15.842, -48.025),
    (511, 'PEV Samambaia — Norte',             -15.875, -48.089),
    (512, 'PEV Samambaia — Sul',               -15.903, -48.078),
    (513, 'PEV Recanto das Emas — Centro',     -15.912, -48.036),
    (514, 'PEV Riacho Fundo — QR 1',           -15.876, -48.002),
    (515, 'PEV Núcleo Bandeirante — Centro',   -15.870, -47.970)
ON CONFLICT (id) DO NOTHING;

SELECT setval('pev_id_seq', (SELECT MAX(id) FROM pev));
