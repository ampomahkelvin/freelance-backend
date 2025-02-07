/* Replace with your SQL commands */
ALTER TABLE "messages"
    ADD CONSTRAINT fk_conversation_id
        FOREIGN KEY ("conversation_id")
            REFERENCES "conversations"("conversation_id")
            ON DELETE CASCADE;
