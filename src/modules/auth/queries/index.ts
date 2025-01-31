const createUser = `
    INSERT INTO "users" ("email", "password", "username", "profile_image", "bio", "role", "created_at", "updated_at")
    VALUES ($1, $2, $3, $4, $5, $6, NOW(), NOW())
    RETURNING "id", "email", "username", "profile_image", "role";
`;

const getUserByEmail = `
    SELECT *
    FROM "users" 
    WHERE "email" = $1;
`;

const updatePassword = `
    UPDATE "users" 
    SET "password" = $1, "updated_at" = NOW() 
    WHERE "id" = $2;
`;

export const authQueries = {
  createUser,
  getUserByEmail,
  updatePassword,
};
