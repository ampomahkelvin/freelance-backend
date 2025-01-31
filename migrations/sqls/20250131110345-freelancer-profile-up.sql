/* Replace with your SQL commands */
CREATE TABLE IF NOT EXISTS "freelancer_details" (
    "id" SERIAL PRIMARY KEY,
    "user_id" INTEGER NOT NULL,
    "skills" TEXT[],
    "hourly_rate" DECIMAL(10, 2),
    "portfolio" TEXT,
    "location" VARCHAR(255),
    "availability" VARCHAR(50),
    "rating" DECIMAL,
    "rating_count" INTEGER DEFAULT 0,
    "created_at" TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    "updated_at" TIMESTAMPTZ NOT NULL DEFAULT NOW()
--     FOREIGN KEY ("freelancer_id") REFERENCES "users"("id") ON DELETE CASCADE
);