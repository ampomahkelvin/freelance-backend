/* Replace with your SQL commands */
CREATE TYPE "budget_type" AS ENUM('hourly', 'fixed');
CREATE TYPE "job_status" AS ENUM('opened', 'accepted', 'declined', 'closed', 'completed');

CREATE TABLE IF NOT EXISTS "jobs" (
    "job_id" SERIAL PRIMARY KEY UNIQUE NOT NULL,
    "client_id" INTEGER NOT NULL,
    "title" VARCHAR NOT NULL,
    "description" TEXT,
    "budget_type" budget_type DEFAULT 'fixed',
    "budget" DECIMAL,
    "status" job_status NOT NULL,
    "created_at" TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    "updated_at" TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX idx_jobs_client_id ON "jobs" ("client_id");
CREATE INDEX idx_jobs_status ON "jobs" ("status");
