-- Seed de PEVs com coordenadas geográficas (região do Gama / DF)
-- Usa INSERT ... ON CONFLICT para ser seguro executar múltiplas vezes.

INSERT INTO pev (id, name, latitude, longitude)
VALUES
    -- Gama
    (500,  'PEV Gama - Administração',                  -16.01588922155796,  -48.064635961384816),
    (501,  'PEV Gama - Programando o Futuro - SEDE',    -16.01578856836766,  -48.05493378258836),
    (502,  'PEV Gama - SESI/Senai',                     -16.011986287191505, -48.06420089260132),
    (503,  'PEV Gama - SESC',                           -16.0101968344107,   -48.05902640321003),
    (504,  'PEV Gama - IFB',                            -15.99292624053854,  -48.052731072886296),
    (505,  'PEV Gama - Edusesc',                        -16.01032826522558,  -48.05829895257148),
    (506,  'PEV Gama - UnB Campus Gama',                -15.989414001219618, -48.043903974474524),

    -- Cruzeiro
    (507,  'PEV Cruzeiro - Ginásio',                    -15.792189562935347, -47.939241429162024),

    -- Ceilândia
    (508,  'PEV Ceilândia - SESC',                      -15.820171473785695, -48.12207696450244),
    (509,  'PEV Ceilândia - Edusesc Norte',             -15.819606305252837, -48.12230492052915),
    (510,  'PEV Ceilândia - Estação Sul - Metrô',       -15.837573537437637, -48.10321490067216),

    -- Águas Claras
    (511,  'PEV Águas Claras - Instituto Levo',         -15.833383898334736, -48.03765137142727),
    (512,  'PEV Águas Claras - Estação - Metrô',        -15.839843862102033, -48.02847000262642),
    (513,  'PEV Águas Claras - Estação Estrada Parque', -15.832255142447279, -48.045182188690085),

    -- Guará
    (514,  'PEV Guará - SESC',                          -15.817823499812224, -47.98369986955595),
    (515,  'PEV Guará - Estação - Metrô',               -15.826027934756752, -47.98261181045218),
    (516,  'PEV Guará - Leroy Merlin',                  -15.835135961428296, -47.95018954912652),

    -- Lago Sul
    (517,  'PEV Lago Sul - Administração',              -15.840609643928005, -47.86934454927456),

    -- Núcleo Bandeirante
    (518,  'PEV Núcleo Bandeirante - Prog. Futuro',     -15.87171928352326,  -48.102456391506884),

    -- Paranoá
    (519,  'PEV Paranoá - Administração',               -15.778487798778826, -47.779686202374826),

    -- Planaltina
    (520,  'PEV Planaltina - Casas Bahia',              -15.618320575950618, -47.65192252251129),
    (521,  'PEV Planaltina - Instituto Murialdo',       -15.620808309974754, -47.66050613572953),
    (522,  'PEV Planaltina - Hotel Fazenda Águas',      -15.516086702454007, -47.56588884618295),
    (523,  'PEV Planaltina - Supermercado Piauí',       -15.624028276183703, -47.64777716217367),

    -- Plano Piloto
    (524,  'PEV Plano Piloto - BB Sede III',            -15.798114929365404, -47.88209174853048),
    (525,  'PEV Plano Piloto - BB Sede IV',             -15.737700529159111, -47.90170134236431),
    (526,  'PEV Plano Piloto - CCBB',                   -15.813482290704341, -47.837900275522834),
    (527,  'PEV Plano Piloto - Conjunto Nacional',      -15.791260318080047, -47.8828775917855),
    (528,  'PEV Plano Piloto - Estação 108 Sul',        -15.818831196278408, -47.90377743761865),
    (529,  'PEV Plano Piloto - Estação 102 Sul',        -15.805454795017102, -47.88907178042863),
    (530,  'PEV Plano Piloto - Estação 110 Sul',        -15.822747627716861, -47.90888885828729),
    (531,  'PEV Plano Piloto - Estação 112 Sul',        -15.826543843038786, -47.91428793220277),
    (532,  'PEV Plano Piloto - Estação 114 Sul',        -15.83001088072154,  -47.92002176153148),
    (533,  'PEV Plano Piloto - Estação Asa Sul',        -15.836893535386592, -47.93249761201298),
    (534,  'PEV Plano Piloto - Estação Galeria',        -15.799480615960757, -47.885935626593664),
    (535,  'PEV Plano Piloto - Estação Central',        -15.793584148345067, -47.882937157316135),
    (536,  'PEV Plano Piloto - TRT10',                  -15.798492551799212, -47.878466048957044),
    (537,  'PEV Plano Piloto - TCU',                    -15.80663950414073,  -47.842598750269055),
    (538,  'PEV Plano Piloto - UnB Darcy Ribeiro',      -15.765595753704313, -47.871413353060134),

    -- Recanto das Emas
    (539,  'PEV Recanto das Emas - Administração',      -15.904985591361436, -48.07562193112758),
    (540,  'PEV Recanto das Emas - Casas Bahia',        -15.903312171934907, -48.0652583384957),

    -- Riacho Fundo I
    (541,  'PEV Riacho Fundo I - Administração',        -15.883840402262349, -48.01855135412517),

    -- Samambaia
    (542,  'PEV Samambaia - Estação Terminal - Metrô',  -15.873617086495466, -48.08450084618555),
    (543,  'PEV Samambaia - Estação Furnas - Metrô',    -15.864712924677146, -48.05972417210054),
    (544,  'PEV Samambaia - IFB',                       -15.862837862090748, -48.05352148030842),
    (545,  'PEV Samambaia - OASIS',                     -15.856632231786168, -48.07628537691857),
    (546,  'PEV Samambaia - Parque Três Meninas',       -15.873399487521995, -48.1043201678999),

    -- Santa Maria
    (547,  'PEV Santa Maria - Casas Bahia',             -16.005921736374667, -48.000218860076494),

    -- São Sebastião
    (548,  'PEV São Sebastião - IFB',                   -15.890512451301197, -47.77945263592962),
    (549,  'PEV São Sebastião - OASIS',                 -15.900198639905406, -47.770339774581615),
    (550,  'PEV São Sebastião - Administração',         -15.899228803888107, -47.77304845068872),

    -- SIA
    (551,  'PEV SIA - SESC',                            -15.802377847946977, -47.94947663774477),
    (552,  'PEV SIA - SESI/SENAI',                      -15.803647303943055, -47.96147456401585),
    (553,  'PEV SIA - Sam''s Club',                     -15.788023415367114, -47.943990292157785),
    (554,  'PEV SIA - Feira dos Importados',            -15.795698107950201, -47.947627803138616),

    -- Sobradinho
    (555,  'PEV Sobradinho - Adm / Biblioteca',         -15.637422060714089, -47.848382940425616),

    -- Sudoeste/Octogonal
    (556,  'PEV Sudoeste - Adm / Parque Sudoeste',      -15.795047224298576, -47.92356489099895),
    (557,  'PEV Sudoeste - AGU',                        -15.790993209427288, -47.911889071050496),

    -- Taguatinga
    (558,  'PEV Taguatinga - SESC Norte',               -15.818853556310518, -48.06055204428591),
    (559,  'PEV Taguatinga - EDUSESC Norte',            -15.819279417553151, -48.06202425900222),
    (560,  'PEV Taguatinga - SESC Sul',                 -15.865864979321687, -48.03501698212315),
    (561,  'PEV Taguatinga - Makotec',                  -15.85279497563942,  -48.038750174485976),
    (562,  'PEV Taguatinga - Estação Praça do Relógio', -15.832857862953016, -48.05529254151377),
    (563,  'PEV Taguatinga - Estação Sul - Metrô',      -15.851107604250984, -48.04013339990268),
    (564,  'PEV Taguatinga - Alameda Shopping',         -15.835677005476855, -48.05426902150645),
    (565,  'PEV Taguatinga - Sesi',                     -15.812326157489688, -48.07018435746086),
    (566,  'PEV Taguatinga - Senai',                    -15.820143637276477, -48.06782442323283),
    (567,  'PEV Taguatinga - UCB',                      -15.86473725292333,  -48.02764868907007)
ON CONFLICT (id) DO NOTHING;

SELECT setval('pev_id_seq', (SELECT MAX(id) FROM pev));
