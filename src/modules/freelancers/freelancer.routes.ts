import express from 'express'
import { FreelancerController } from './freelancer.controllers'
import { ValidationMiddleware } from '../../shared/validators/req-validator'
import { createFreelancerProfileSchema } from './validations'

const router = express.Router()

router.post(
  '/:id',
  ValidationMiddleware.validateRequest(createFreelancerProfileSchema),
  FreelancerController.createFreelancerProfile,
)

router.put(
  '/:id',
  ValidationMiddleware.validateRequest(createFreelancerProfileSchema),
  FreelancerController.updateFreelancerProfile,
)

router.get('/all', FreelancerController.getAllFreelancers)

export default router
