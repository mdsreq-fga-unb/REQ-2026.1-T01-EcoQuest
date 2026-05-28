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
	CONSTRAINT users_email_not_empty CHECK (char_length(btrim(email)) > 0),
	CONSTRAINT users_name_not_empty CHECK (char_length(btrim(name)) > 0),
	CONSTRAINT users_cpf_format CHECK (cpf ~ '^[0-9]{11}$'),
	CONSTRAINT users_phone_not_empty CHECK (char_length(btrim(phone)) > 0),
	CONSTRAINT users_password_hash_not_empty CHECK (char_length(btrim(password_hash)) > 0),
	CONSTRAINT users_points_balance_non_negative CHECK (points_balance >= 0),
	CONSTRAINT users_points_total_earned_non_negative CHECK (points_total_earned >= 0)
);

CREATE UNIQUE INDEX users_email_lower_unique ON users (lower(email));
CREATE UNIQUE INDEX users_cpf_unique ON users (cpf);

CREATE TABLE pev (
	id BIGSERIAL PRIMARY KEY,
	name TEXT NOT NULL,
	-- code TEXT UNIQUE,
	created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
	CONSTRAINT pevs_name_not_empty CHECK (char_length(btrim(name)) > 0)
	-- CONSTRAINT pevs_code_not_empty CHECK (code IS NULL OR char_length(btrim(code)) > 0)
);

CREATE TABLE partner (
	id BIGSERIAL PRIMARY KEY,
	name TEXT NOT NULL,
	partner_type TEXT NOT NULL,
	external_ref TEXT,
	created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
	CONSTRAINT partners_name_not_empty CHECK (char_length(btrim(name)) > 0),
	CONSTRAINT partners_partner_type_valid CHECK (partner_type IN ('ngo', 'commercial')),
	CONSTRAINT partners_external_ref_not_empty CHECK (external_ref IS NULL OR char_length(btrim(external_ref)) > 0)
);

CREATE TABLE reward (
	id BIGSERIAL PRIMARY KEY,
	partner_id BIGINT NOT NULL REFERENCES partners(id) ON DELETE RESTRICT,
	name TEXT NOT NULL,
	description TEXT,
	reward_type TEXT NOT NULL,
	points_cost INTEGER NOT NULL,
	stock INTEGER,
	is_active BOOLEAN NOT NULL DEFAULT TRUE,
	created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
	CONSTRAINT rewards_name_not_empty CHECK (char_length(btrim(name)) > 0),
	CONSTRAINT rewards_reward_type_valid CHECK (reward_type IN ('coupon', 'benefit', 'prize')),
	CONSTRAINT rewards_points_cost_positive CHECK (points_cost > 0),
	CONSTRAINT rewards_stock_non_negative CHECK (stock IS NULL OR stock >= 0)
);

CREATE INDEX rewards_is_active_idx ON rewards (is_active);
CREATE INDEX rewards_partner_id_idx ON rewards (partner_id);

