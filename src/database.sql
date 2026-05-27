CREATE TABLE users (
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
