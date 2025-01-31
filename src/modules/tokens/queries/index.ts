const storeToken = `
    INSERT INTO "reset_tokens"
        ("user_id", "token_hash", "expires_at", "used")
    VALUES ($1, $2, NOW() + INTERVAL '10 minutes', false)
    ON CONFLICT ("user_id") DO UPDATE
        SET
            "token_hash" = EXCLUDED.token_hash,
            "expires_at" = EXCLUDED.expires_at,
            "used" = EXCLUDED.used
    RETURNING "id";
`

const getToken = `
    SELECT * FROM "reset_tokens"
    WHERE "user_id" = $1
    LIMIT 1;
`

const markTokenAsUsed = `
    UPDATE "reset_tokens"
    SET "used" = true
    WHERE "user_id" = $1
    RETURNING *;
`

export const resetTokenQueries = {
  storeToken,
  getToken,
  markTokenAsUsed,
}
