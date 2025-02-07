const createJob = `
  INSERT INTO "jobs" (client_id, title, description, requirements, skills, budget_type, budget) VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *
`

const getAllJobs = `
  SELECT "job_id", "title", "description", "created_at" FROM "jobs"
  LIMIT $1 OFFSET $2;
`

const getJobsByUser = `
  SELECT * FROM "jobs" WHERE "client_id" = $1
`

const getNumberOfJobs = `
  SELECT COUNT(*) FROM "jobs"
`

const getNumberOfJobsByUser = `
  SELECT COUNT(*) FROM "jobs" WHERE "client_id" = $1
`

const updateJob = `
  UPDATE "jobs" SET "title" = $1, "description" = $2, "requirements" = $3, "budget_type" = $4, "budget" = $5, "status" = $6, "updated_at" = NOW()
    WHERE "job_id" = $7
    RETURNING *
`

const deleteJob = `
  DELETE FROM "jobs" WHERE "job_id" = $1
`

const getJobById = `
  SELECT * FROM "jobs" WHERE "job_id" = $1
`

const findJob = `
    SELECT "job_id", "title", "description", "created_at"
    FROM jobs
    WHERE websearch_to_tsquery($1) @@ to_tsvector(
            title || ' ' ||
            array_to_string(requirements, ' ') || ' ' ||
            array_to_string(skills, ' ')
                                      )
    ORDER BY created_at DESC;
`

export const jobQueries = {
  createJob,
  getAllJobs,
  getJobsByUser,
  getNumberOfJobs,
  getNumberOfJobsByUser,
  updateJob,
  deleteJob,
  getJobById,
  findJob,
}
