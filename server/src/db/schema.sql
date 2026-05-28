CREATE TABLE user (
	id BIGSERIAL PRIMARY KEY,
	email VARCHAR(256) NOT NULL,
	name VARCHAR(256) NOT NULL,
	cpf VARCHAR(11) NOT NULL,
	phone VARCHAR(20) NOT NULL,
	password_hash VARCHAR(512) NOT NULL,
	points_balance INTEGER NOT NULL DEFAULT 0,
	points_total_earned INTEGER NOT NULL DEFAULT 0,
	created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
	updated_at TIMESTAMPTZ NOT NULL DEFAULT now(),
	CONSTRAINT user_email_not_empty CHECK (char_length(btrim(email)) > 0),
	CONSTRAINT user_name_not_empty CHECK (char_length(btrim(name)) > 0),
	CONSTRAINT user_cpf_format CHECK (cpf ~ '^[0-9]{11}$'),
	CONSTRAINT user_phone_not_empty CHECK (char_length(btrim(phone)) > 0),
	CONSTRAINT user_password_hash_not_empty CHECK (char_length(btrim(password_hash)) > 0),
	CONSTRAINT user_points_balance_non_negative CHECK (points_balance >= 0),
	CONSTRAINT user_points_total_earned_non_negative CHECK (points_total_earned >= 0)
);

CREATE UNIQUE INDEX user_email_lower_unique ON user (lower(email));
CREATE UNIQUE INDEX user_cpf_unique ON user (cpf);

CREATE TABLE pev (
	id BIGSERIAL PRIMARY KEY,
	name TEXT NOT NULL,
	-- code TEXT UNIQUE,
	created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
	CONSTRAINT pev_name_not_empty CHECK (char_length(btrim(name)) > 0)
	-- CONSTRAINT pev_code_not_empty CHECK (code IS NULL OR char_length(btrim(code)) > 0)
);

CREATE TYPE partner_type AS ENUM ('NGO', 'COMMERCIAL');

CREATE TABLE partner (
	id BIGSERIAL PRIMARY KEY,
	name TEXT NOT NULL,
	partner_type partner_type NOT NULL,
	-- external_ref TEXT,
	created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
	CONSTRAINT partners_name_not_empty CHECK (char_length(btrim(name)) > 0)
	-- CONSTRAINT partners_external_ref_not_empty CHECK (external_ref IS NULL OR char_length(btrim(external_ref)) > 0)
);

CREATE TYPE reward_type AS ENUM ('COUPON', 'BENEFIT', 'PRIZE');

CREATE TABLE reward (
	id BIGSERIAL PRIMARY KEY,
	id_partner BIGINT NOT NULL REFERENCES partner(id) ON DELETE RESTRICT,
	name TEXT NOT NULL,
	description TEXT,
	reward_type reward_type NOT NULL,
	points_cost INTEGER NOT NULL,
	stock INTEGER,
	is_active BOOLEAN NOT NULL DEFAULT TRUE,
	created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
	CONSTRAINT rewards_name_not_empty CHECK (char_length(btrim(name)) > 0),
	CONSTRAINT rewards_points_cost_positive CHECK (points_cost > 0),
	CONSTRAINT rewards_stock_non_negative CHECK (stock IS NULL OR stock >= 0)
);

CREATE INDEX rewards_is_active_idx ON reward (is_active);
CREATE INDEX rewards_partner_id_idx ON reward (id_partner);

CREATE TABLE disposal_token (
	jti UUID PRIMARY KEY,
	id_pev BIGINT NOT NULL REFERENCES pev(id) ON DELETE RESTRICT,
	issued_at TIMESTAMPTZ NOT NULL DEFAULT now(),
	expires_at TIMESTAMPTZ NOT NULL,
	used_at TIMESTAMPTZ,
	id_user_used_by BIGINT REFERENCES user(id) ON DELETE RESTRICT,
	CONSTRAINT disposal_token_expires_after_issue CHECK (expires_at > issued_at),
	CONSTRAINT disposal_token_used_consistency CHECK (
		(used_at IS NULL AND id_user_used_by IS NULL)
		OR
		(used_at IS NOT NULL AND id_user_used_by IS NOT NULL)
	)
);

CREATE INDEX disposal_token_pev_expires_idx ON disposal_token (id_pev, expires_at); -- Para listar tokens recentes por PEV, mesmo os usados (útil para auditoria)
CREATE INDEX disposal_token_unused_idx ON disposal_token (expires_at) WHERE used_at IS NULL; -- Isso permite encontrar rapidamente um token válido para um PEV no momento do descarte, ignorando os usados/expirados

CREATE TABLE disposal (
	id BIGSERIAL PRIMARY KEY,
	id_user BIGINT NOT NULL REFERENCES user(id) ON DELETE CASCADE,
	id_pev BIGINT NOT NULL REFERENCES pev(id) ON DELETE RESTRICT,
	jti_token UUID NOT NULL UNIQUE REFERENCES disposal_token(jti) ON DELETE RESTRICT,
	points_awarded INTEGER NOT NULL,
	created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
	CONSTRAINT disposal_points_awarded_non_negative CHECK (points_awarded >= 0)
);

CREATE INDEX disposal_user_created_at_idx ON disposal (id_user, created_at DESC);
CREATE INDEX disposal_pev_created_at_idx ON disposal (id_pev, created_at DESC);

CREATE TYPE reward_redemption_status AS ENUM ('ISSUED', 'CANCELLED', 'USED');

CREATE TABLE reward_redemption (
	id BIGSERIAL PRIMARY KEY,
	id_user BIGINT NOT NULL REFERENCES user(id) ON DELETE CASCADE,
	id_reward BIGINT NOT NULL REFERENCES reward(id) ON DELETE RESTRICT,
	points_cost_snapshot INTEGER NOT NULL,
	code TEXT NOT NULL,
	status reward_redemption_status NOT NULL DEFAULT 'ISSUED',
	created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
	expires_at TIMESTAMPTZ,
	CONSTRAINT reward_redemption_points_cost_snapshot_positive CHECK (points_cost_snapshot > 0),
	CONSTRAINT reward_redemption_code_not_empty CHECK (char_length(btrim(code)) > 0)
);

CREATE UNIQUE INDEX reward_redemption_code_unique ON reward_redemption (code);
CREATE INDEX reward_redemption_user_created_at_idx ON reward_redemption (id_user, created_at DESC);
CREATE INDEX reward_redemption_reward_created_at_idx ON reward_redemption (id_reward, created_at DESC);

CREATE TYPE points_transaction_kind AS ENUM ('DISPOSAL', 'REDEMPTION', 'ADJUSTMENT');

CREATE TABLE points_transaction (
	id BIGSERIAL PRIMARY KEY,
	id_user BIGINT NOT NULL REFERENCES user(id) ON DELETE CASCADE,
	amount INTEGER NOT NULL,
	kind points_transaction_kind NOT NULL,
	id_disposal BIGINT REFERENCES disposal(id) ON DELETE CASCADE,
	id_reward_redemption BIGINT REFERENCES reward_redemption(id) ON DELETE CASCADE,
	created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
	CONSTRAINT points_transaction_amount_non_zero CHECK (amount <> 0),
	CONSTRAINT points_transaction_kind_reference CHECK (
		(kind = 'DISPOSAL' AND id_disposal IS NOT NULL AND id_reward_redemption IS NULL AND amount > 0)
		OR
		(kind = 'REDEMPTION' AND id_reward_redemption IS NOT NULL AND id_disposal IS NULL AND amount < 0)
		OR
		(kind = 'ADJUSTMENT' AND id_disposal IS NULL AND id_reward_redemption IS NULL)
	)
);

CREATE INDEX points_transaction_user_created_at_idx ON points_transaction (id_user, created_at DESC);
CREATE UNIQUE INDEX points_transaction_disposal_unique ON points_transaction (id_disposal) WHERE id_disposal IS NOT NULL;
CREATE UNIQUE INDEX points_transaction_redemption_unique ON points_transaction (id_reward_redemption) WHERE id_reward_redemption IS NOT NULL;

CREATE TABLE achievement (
	id BIGSERIAL PRIMARY KEY,
	code TEXT NOT NULL,
	name TEXT NOT NULL,
	description TEXT NOT NULL,
	criteria JSONB NOT NULL,
	is_active BOOLEAN NOT NULL DEFAULT TRUE,
	created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
	CONSTRAINT achievement_code_not_empty CHECK (char_length(btrim(code)) > 0),
	CONSTRAINT achievement_name_not_empty CHECK (char_length(btrim(name)) > 0),
	CONSTRAINT achievement_description_not_empty CHECK (char_length(btrim(description)) > 0)
);

CREATE UNIQUE INDEX achievement_code_unique ON achievement (code);
CREATE INDEX achievement_is_active_idx ON achievement (is_active);

CREATE TABLE user_achievement (
	id_user BIGINT NOT NULL REFERENCES user(id) ON DELETE CASCADE,
	id_achievement BIGINT NOT NULL REFERENCES achievement(id) ON DELETE RESTRICT,
	unlocked_at TIMESTAMPTZ NOT NULL DEFAULT now(),
	PRIMARY KEY (id_user, id_achievement)
);

-- Documentação (comentários curtos por tabela/coluna)
COMMENT ON TABLE user IS 'Usuários cadastrados (autenticação e pontos).';
COMMENT ON COLUMN user.id IS 'Identificador do usuário.';
COMMENT ON COLUMN user.email IS 'E-mail de login (único via índice em lower(email)).';
COMMENT ON COLUMN user.name IS 'Nome do usuário.';
COMMENT ON COLUMN user.cpf IS 'CPF do usuário (11 dígitos, único).';
COMMENT ON COLUMN user.phone IS 'Telefone do usuário.';
COMMENT ON COLUMN user.password_hash IS 'Hash da senha (ex: Argon2/BCrypt).';
COMMENT ON COLUMN user.points_balance IS 'Saldo atual de pontos disponível para resgate.';
COMMENT ON COLUMN user.points_total_earned IS 'Total de pontos ganhos (base para ranking).';
COMMENT ON COLUMN user.created_at IS 'Data/hora de criação do registro.';
COMMENT ON COLUMN user.updated_at IS 'Data/hora da última atualização do registro.';

COMMENT ON TABLE pev IS 'Pontos de Entrega Voluntária (PEVs) para descarte.';
COMMENT ON COLUMN pev.id IS 'Identificador do PEV.';
COMMENT ON COLUMN pev.name IS 'Nome do ponto de coleta.';
-- COMMENT ON COLUMN pev.code IS 'Código externo/identificador opcional (único se informado).';
COMMENT ON COLUMN pev.created_at IS 'Data/hora de cadastro do PEV.';

COMMENT ON TABLE partner IS 'Parceiros/ONGs que fornecem recompensas.';
COMMENT ON COLUMN partner.id IS 'Identificador do parceiro.';
COMMENT ON COLUMN partner.name IS 'Nome do parceiro.';
COMMENT ON COLUMN partner.partner_type IS 'Tipo do parceiro (NGO/COMMERCIAL).';
-- COMMENT ON COLUMN partner.external_ref IS 'Referência externa opcional (ex: ID em sistema parceiro).';
COMMENT ON COLUMN partner.created_at IS 'Data/hora de cadastro do parceiro.';

COMMENT ON TABLE reward IS 'Catálogo de recompensas resgatáveis por pontos.';
COMMENT ON COLUMN reward.id IS 'Identificador da recompensa.';
COMMENT ON COLUMN reward.id_partner IS 'Parceiro responsável pela recompensa.';
COMMENT ON COLUMN reward.name IS 'Nome da recompensa.';
COMMENT ON COLUMN reward.description IS 'Descrição da recompensa (opcional).';
COMMENT ON COLUMN reward.reward_type IS 'Tipo (COUPON/BENEFIT/PRIZE).';
COMMENT ON COLUMN reward.points_cost IS 'Custo em pontos para resgate.';
COMMENT ON COLUMN reward.stock IS 'Estoque (null = ilimitado; senão, quantidade restante).';
COMMENT ON COLUMN reward.is_active IS 'Disponível para exibição/resgate.';
COMMENT ON COLUMN reward.created_at IS 'Data/hora de criação da recompensa.';

COMMENT ON TABLE disposal_token IS 'Tokens (QR) emitidos por PEV para validar descartes.';
COMMENT ON COLUMN disposal_token.jti IS 'Identificador único do token (vai no QR).';
COMMENT ON COLUMN disposal_token.id_pev IS 'PEV que emitiu o token.';
COMMENT ON COLUMN disposal_token.issued_at IS 'Data/hora de emissão do token.';
COMMENT ON COLUMN disposal_token.expires_at IS 'Data/hora de expiração (curta; anti-replay).';
COMMENT ON COLUMN disposal_token.used_at IS 'Data/hora em que o token foi usado (null se não usado).';
COMMENT ON COLUMN disposal_token.id_user_used_by IS 'Usuário que consumiu o token (null se não usado).';

COMMENT ON TABLE disposal IS 'Descartes registrados após validação do token.';
COMMENT ON COLUMN disposal.id IS 'Identificador do descarte.';
COMMENT ON COLUMN disposal.id_user IS 'Usuário que realizou o descarte.';
COMMENT ON COLUMN disposal.id_pev IS 'PEV onde o descarte ocorreu.';
COMMENT ON COLUMN disposal.jti_token IS 'Token consumido (único por descarte).';
COMMENT ON COLUMN disposal.points_awarded IS 'Pontos concedidos pelo descarte.';
COMMENT ON COLUMN disposal.created_at IS 'Data/hora do registro do descarte.';

COMMENT ON TABLE reward_redemption IS 'Resgates de recompensas e códigos/cupons gerados.';
COMMENT ON COLUMN reward_redemption.id IS 'Identificador do resgate.';
COMMENT ON COLUMN reward_redemption.id_user IS 'Usuário que resgatou.';
COMMENT ON COLUMN reward_redemption.id_reward IS 'Recompensa resgatada.';
COMMENT ON COLUMN reward_redemption.points_cost_snapshot IS 'Custo em pontos no momento do resgate.';
COMMENT ON COLUMN reward_redemption.code IS 'Código/cupom gerado para uso externo. Exemplo: código de desconto, voucher, etc.';
COMMENT ON COLUMN reward_redemption.status IS 'Status do cupom (ISSUED/CANCELLED/USED).';
COMMENT ON COLUMN reward_redemption.created_at IS 'Data/hora do resgate.';
COMMENT ON COLUMN reward_redemption.expires_at IS 'Expiração do cupom (opcional).';

COMMENT ON TABLE points_transaction IS 'Extrato (ledger) de pontos: créditos e débitos.';
COMMENT ON COLUMN points_transaction.id IS 'Identificador da transação.';
COMMENT ON COLUMN points_transaction.id_user IS 'Usuário dono da transação.';
COMMENT ON COLUMN points_transaction.amount IS 'Valor em pontos (positivo=crédito; negativo=débito).';
COMMENT ON COLUMN points_transaction.kind IS 'Origem do lançamento (DISPOSAL/REDEMPTION/ADJUSTMENT).';
COMMENT ON COLUMN points_transaction.id_disposal IS 'Descarte associado (apenas kind=DISPOSAL).';
COMMENT ON COLUMN points_transaction.id_reward_redemption IS 'Resgate associado (apenas kind=REDEMPTION).';
COMMENT ON COLUMN points_transaction.created_at IS 'Data/hora do lançamento.';

COMMENT ON TABLE achievement IS 'Catálogo de conquistas (definições e critérios).';
COMMENT ON COLUMN achievement.id IS 'Identificador da conquista.';
COMMENT ON COLUMN achievement.code IS 'Código único da conquista. Exemplo: "first_disposal", "recycler_level_2".';
COMMENT ON COLUMN achievement.name IS 'Nome da conquista.';
COMMENT ON COLUMN achievement.description IS 'Descrição/condição apresentada ao usuário.';
COMMENT ON COLUMN achievement.criteria IS 'Critério em JSON para avaliação no backend.';
COMMENT ON COLUMN achievement.is_active IS 'Conquista ativa para desbloqueio/exibição.';
COMMENT ON COLUMN achievement.created_at IS 'Data/hora de criação da conquista.';

COMMENT ON TABLE user_achievement IS 'Conquistas desbloqueadas por usuário.';
COMMENT ON COLUMN user_achievement.id_user IS 'Usuário que desbloqueou.';
COMMENT ON COLUMN user_achievement.id_achievement IS 'Conquista desbloqueada.';
COMMENT ON COLUMN user_achievement.unlocked_at IS 'Data/hora do desbloqueio.';
