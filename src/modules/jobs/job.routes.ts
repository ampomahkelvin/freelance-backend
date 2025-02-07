import express from 'express'
import { JobController } from './job.controllers'
import { ValidationMiddleware } from '../../shared/validators/req-validator'
import { updateJobSchema, jobSchema } from './validations'
import { isJobOwner } from '../../shared/middleware/authorize-user.middleware'
// import upload from '../../shared/middleware/upload.middleware';

const router = express.Router()

router.get('/all', JobController.getAllJobs)

router.get('/', JobController.getJobsByUser)

router.get('/search', JobController.searchJobs)

router.post(
  '/',
  ValidationMiddleware.validateRequest(jobSchema),
  JobController.createJob,
)

router.delete('/:id', isJobOwner, JobController.deleteJob)

router.patch(
  '/:id',
  isJobOwner,
  // upload.single('jobImage'),
  ValidationMiddleware.validateRequest(updateJobSchema),
  JobController.updateJob,
)

router.get('/:id', JobController.getJobById)

export default router
