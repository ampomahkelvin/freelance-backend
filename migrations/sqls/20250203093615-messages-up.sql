/* Replace with your SQL commands */
CREATE TYPE "message_type" AS ENUM ('text', 'file', 'image', 'video', 'audio');

CREATE TABLE IF NOT EXISTS "messages" (
    "message_id" SERIAL PRIMARY KEY UNIQUE NOT NULL,
    "conversation_id" INTEGER NOT NULL,
    "sender_id" INTEGER NOT NULL,
    "message" TEXT NOT NULL DEFAULT '',
    "message_type" message_type NOT NULL DEFAULT 'text',
    "delivered" BOOLEAN DEFAULT FALSE,
    "created_at" TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    "updated_at" TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    FOREIGN KEY ("sender_id") REFERENCES "users"("id")
);