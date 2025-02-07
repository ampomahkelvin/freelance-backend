/* Replace with your SQL commands */
CREATE TABLE IF NOT EXISTS "attachments" (
    "attachment_id" SERIAL PRIMARY KEY UNIQUE NOT NULL,
    "message_id" INTEGER NOT NULL,
    "file_name" VARCHAR(255) NOT NULL,
    "file_type" VARCHAR(50) NOT NULL,
    "file_size" INTEGER NOT NULL,
    "file_url" TEXT NOT NULL,
    "created_at" TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    FOREIGN KEY ("message_id") REFERENCES "messages"("message_id")
);

CREATE INDEX idx_attachments_message_id ON "attachments" ("message_id");
