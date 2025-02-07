const getConversationByUsers = `
  SELECT * FROM "conversations" WHERE "user1_id" = $1 AND "user2_id" = $2
`

const getConversationById = `
  SELECT * FROM "conversations" WHERE "conversation_id" = $1
`

const createConversation = `
  INSERT INTO "conversations" ("user1_id", "user2_id") VALUES ($1, $2) RETURNING *
`

const insertMessage = `
  INSERT INTO "messages" ("conversation_id", "sender_id", "message", "created_at") VALUES ($1, $2, $3, NOW()) RETURNING *
`

const getMessages = `
    SELECT
        m.message_id,
        m.message,
        m.sender_id,
        m.created_at,
        m.message_type,
        a.attachment_id,
        a.file_url,
        a.file_name,
        a.file_type,
        a.file_size
    FROM messages m
             LEFT JOIN attachments a ON m.message_id = a.message_id
    WHERE m.conversation_id = $1
      AND m.conversation_id IN (
        SELECT conversation_id FROM conversations
        WHERE user1_id = $2 OR user2_id = $2
    )
    ORDER BY m.created_at DESC
    LIMIT $3
        OFFSET $4
`;

const getConversationParticipants = `
  SELECT user1_id, user2_id FROM conversations 
  WHERE conversation_id = $1
`;

const getUserConversations = `
  SELECT * FROM "conversations"
    WHERE "user1_id" = $1 OR "user2_id" = $1
`

const sendAttachment = `
    WITH inserted_message AS (
        INSERT INTO "messages" ("conversation_id", "sender_id", "message", "message_type", "created_at")
            VALUES ($1, $2, $3, $4, NOW())
            RETURNING "message_id"
    )
    INSERT INTO "attachments" ("message_id", "file_name", "file_type", "file_size", "file_url")
    SELECT "message_id", $5, $6, $7, $8
    FROM inserted_message
    RETURNING *;
`;

const getAttachment = `
  SELECT 
    a.attachment_id,
    a.file_name,
    a.file_type,
    a.file_size,
    a.file_url,
    a.created_at AS attachment_date,
    m.message_id,
    m.sender_id,
    m.conversation_id,
    m.message AS caption,
    m.created_at AS message_date
  FROM attachments a
  JOIN messages m ON a.message_id = m.message_id
  JOIN conversations c ON m.conversation_id = c.conversation_id
  WHERE a.attachment_id = $1
    AND (c.user1_id = $2 OR c.user2_id = $2)
  LIMIT 1
`;


export const messageQueries = {
  getConversationByUsers,
  getConversationById,
  createConversation,
  getConversationParticipants,
  insertMessage,
  getMessages,
  getUserConversations,
  sendAttachment,
  getAttachment
}