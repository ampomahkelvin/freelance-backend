/* Replace with your SQL commands */
CREATE TYPE "application_status" AS ENUM('pending', 'accepted', 'rejected');

CREATE TABLE IF NOT EXISTS "applications" (
    "application_id" SERIAL PRIMARY KEY UNIQUE NOT NULL,
    "job_id" INTEGER NOT NULL,
    "freelancer_id" INTEGER NOT NULL,
    "status" application_status DEFAULT 'pending',
    "created_at" TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    "updated_at" TIMESTAMPTZ NOT NULL DEFAULT NOW()
)