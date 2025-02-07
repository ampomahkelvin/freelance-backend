/* Replace with your SQL commands */
CREATE TABLE IF NOT EXISTS "conversations" (
    "conversation_id" SERIAL PRIMARY KEY UNIQUE NOT NULL,
    "user1_id" INTEGER NOT NULL,
    "user2_id" INTEGER NOT NULL,
    "created_at" TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    "updated_at" TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    FOREIGN KEY ("user1_id") REFERENCES "users"("id"),
    FOREIGN KEY ("user2_id") REFERENCES "users"("id")
);

CREATE INDEX idx_conversations_user1_id ON "conversations" ("user1_id");
CREATE INDEX idx_conversations_user2_id ON "conversations" ("user2_id");