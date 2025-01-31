/* Replace with your SQL commands */
CREATE TYPE "user_role" AS ENUM ('admin', 'freelancer', 'client');

CREATE TABLE IF NOT EXISTS "users" (
    "id" SERIAL PRIMARY KEY NOT NULL UNIQUE ,
    "email" VARCHAR NOT NULL UNIQUE,
    "password" VARCHAR NOT NULL,
    "username" VARCHAR,
    "profile_image" VARCHAR,
    "bio" TEXT,
    "role" user_role NOT NULL DEFAULT 'client',
    "is_verified" BOOLEAN DEFAULT FALSE,
    "status" VARCHAR DEFAULT 'active',
    "created_at" TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    "updated_at" TIMESTAMPTZ NOT NULL DEFAULT NOW()
);