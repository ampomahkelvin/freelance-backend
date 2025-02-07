import express from 'express'
import { FreelancerController } from './freelancer.controllers'
import { ValidationMiddleware } from '../../shared/validators/req-validator'
import { createFreelancerProfileSchema } from './validations'
// import { isLoggedInUser } from '../../shared/middleware/authorize-user.middleware'

const router = express.Router()

router.post(
  '/',
  // isLoggedInUser,
  ValidationMiddleware.validateRequest(createFreelancerProfileSchema),
  FreelancerController.createFreelancerProfile,
)

router.put(
  '/update-profile',
  // isLoggedInUser,
  ValidationMiddleware.validateRequest(createFreelancerProfileSchema),
  FreelancerController.updateFreelancerProfile,
)

router.get('/all', FreelancerController.getAllFreelancers)

export default router
