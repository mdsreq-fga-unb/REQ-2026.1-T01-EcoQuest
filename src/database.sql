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
		(used_at IS NULL AND used_by_user_id IS NULL)
		OR
		(used_at IS NOT NULL AND used_by_user_id IS NOT NULL)
	)
);

CREATE INDEX disposal_token_pev_expires_idx ON disposal_token (id_pev, expires_at);
CREATE INDEX disposal_token_unused_idx ON disposal_token (expires_at) WHERE used_at IS NULL;

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
