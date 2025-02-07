const insertFreelancer = `
    INSERT INTO "freelancer_details" ("user_id", "skills", "hourly_rate", "portfolio", "location", "availability", "created_at", "updated_at")
    VALUES ($1, $2, $3, $4, $5, NOW(), NOW())
    RETURNING *;
`

const updateFreelancerTransaction = `
  BEGIN;

  -- Update the users table
  UPDATE "users"
  SET "username" = $1, "profile_image" = $2, "bio" = $3, "role" = $4, "updated_at" = NOW()
  WHERE "id" = $5;

  -- Update the freelancer_details table
  UPDATE "freelancer_details"
  SET 
    "hourly_rate" = $6, 
    "skills" = $7, 
    "portfolio" = $8,
    "location" = $9,
    "availability" = $10,
    "updated_at" = NOW()
  WHERE "freelancer_id" = $5;

  COMMIT;
`

const getFreelancer = `
    SELECT
        users.id,
        users.username,
        users.email,
        users.profile_image,
        users.bio,
        users.role,
        freelancer_details.*
    FROM users
    INNER JOIN freelancer_details ON users.id = freelancer_details.user_id
    WHERE users.id = $1;
`

const getAllFreelancers = `
    SELECT
        users.id,
        users.username,
        users.email,
        users.profile_image,
        users.bio,
        users.role,
        freelancer_details.*
    FROM users
    INNER JOIN freelancer_details ON users.id = freelancer_details.user_id;
`

const getFreelancersBySkill = `
    SELECT users.id, users.username, users.email, users.profile_image, users.bio,
           freelancer_details.*
    FROM users
    INNER JOIN freelancer_details ON users.id = freelancer_details.user_id
    WHERE freelancer_details.skills ILIKE $1;
`

export const freelancerQueries = {
  insertFreelancer,
  updateFreelancerTransaction,
  getFreelancer,
  getAllFreelancers,
  getFreelancersBySkill,
}
