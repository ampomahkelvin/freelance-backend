const getUserById = `
    SELECT "id", "email", "username", "profile_image", "bio", "role", "is_verified", "status", "created_at", "updated_at"
    FROM "users" 
    WHERE "id" = $1;
`;

const getUserByEmail = `
    SELECT "id", "email", "username", "profile_image", "bio", "role", "is_verified", "status", "created_at", "updated_at"
    FROM "users" 
    WHERE "email" = $1;
`;

const getAllUsers = `
    SELECT "id", "email", "username", "profile_image", "bio", "role", "created_at"
    FROM "users";
`;

const updateProfile = `
    UPDATE "users"
    SET "username" = $1, "profile_image" = $2, "bio" = $3, "role" = $4, "updated_at" = NOW()
    WHERE "id" = $5
    RETURNING "id", "email", "username", "profile_image", "bio", "role", "updated_at";
`;

const deleteUser = `
    DELETE FROM "users" WHERE "id" = $1;
`;

const searchUsers = `
    SELECT "id", "username", "email", "profile_image", "role"
    FROM "users"
    WHERE LOWER("username") LIKE LOWER($1) OR LOWER("email") LIKE LOWER($2)
    LIMIT $3 OFFSET $4;
`;


export const userQueries = {
  getUserById,
  getUserByEmail,
  getAllUsers,
  updateProfile,
  deleteUser,
  searchUsers,
};
