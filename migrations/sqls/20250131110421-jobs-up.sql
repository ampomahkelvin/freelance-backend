/* Replace with your SQL commands */
CREATE TYPE "budget_type" AS ENUM('hourly', 'fixed');

CREATE TABLE IF NOT EXISTS "jobs" (
    "job_id" SERIAL PRIMARY KEY UNIQUE NOT NULL,
    "client_id" INTEGER NOT NULL,
    "title" VARCHAR NOT NULL,
    "description" TEXT,
    "budget_type" budget_type DEFAULT 'fixed',
    "budget" DECIMAL,
    "status" VARCHAR NOT NULL,
    "created_at" TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    "updated_at" TIMESTAMPTZ NOT NULL DEFAULT NOW()
)