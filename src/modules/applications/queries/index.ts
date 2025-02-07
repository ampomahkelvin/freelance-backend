const applyForJob = `
  INSERT INTO "applications" ("job_id", "freelancer_id", "created_at") VALUES ($1, $2, NOW()) RETURNING *
`

const deleteApplication = `
  DELETE FROM "applications" WHERE "job_id" = $1 AND "freelancer_id" = $2
`

const acceptApplication = `
  UPDATE "applications" 
  SET "status" = 'accepted', "updated_at" = NOW() 
  WHERE "job_id" = $1 AND "freelancer_id" = $2
  RETURNING * 
`

const getApplicationsForJob = `
  SELECT * 
  FROM "applications" 
  WHERE "job_id" = $1
`

const getApplicationsByFreelancer = `
  SELECT * 
  FROM "applications" 
  WHERE "freelancer_id" = $1
`

const getApplicationStatus = `
  SELECT "status" 
  FROM "applications" 
  WHERE "job_id" = $1 AND "freelancer_id" = $2
`

const updateApplicationStatus = `
  UPDATE "applications" 
  SET "status" = $1, "updated_at" = NOW() 
  WHERE "job_id" = $2 AND "freelancer_id" = $3
  RETURNING *
`

const checkIfAlreadyApplied = `
  SELECT 1 
  FROM "applications" 
  WHERE "job_id" = $1 AND "freelancer_id" = $2
  LIMIT 1
`

export const applicationQueries = {
  applyForJob,
  deleteApplication,
  acceptApplication,
  checkIfAlreadyApplied,
  updateApplicationStatus,
  getApplicationStatus,
  getApplicationsByFreelancer,
  getApplicationsForJob,
}