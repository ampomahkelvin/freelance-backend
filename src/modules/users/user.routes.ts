import express from 'express'
import { UserController } from './user.controllers'
import { ValidationMiddleware } from '../../shared/validators/req-validator'
import { updateProfileSchema } from './validations'
import  upload from '../../shared/middleware/upload.middleware'

const router = express.Router()

router.get('/all', UserController.getAllUsers)

router.get('/search', UserController.searchUsers)

router.delete('/:id', UserController.deleteUser)

router.patch(
  '/',
  upload('profile picture', 'profile pictures', ['image/jpeg', 'image/png', 'image/jpg']),
  ValidationMiddleware.validateRequest(updateProfileSchema),
  UserController.updateProfile,
)

router.get('/:id', UserController.getUserById)

export default router
