import express from 'express'
import { AuthController } from './auth.controllers'
import { ValidationMiddleware } from '../../shared/validators/req-validator'
import {
  createUserSchema,
  loginUserSchema,
  requestPasswordResetSchema,
  resetPasswordSchema,
} from './validations'
import upload from '../../shared/middleware/upload.middleware'

const router = express.Router()

router.post(
  '/register',
  upload.single('profile image'),
  ValidationMiddleware.validateRequest(createUserSchema),
  AuthController.registerUser,
)

router.post(
  '/login',
  ValidationMiddleware.validateRequest(loginUserSchema),
  AuthController.loginUser,
)

router.post(
  '/forgot-password',
  ValidationMiddleware.validateRequest(requestPasswordResetSchema),
  AuthController.requestPasswordReset,
)

router.post(
  '/reset-password',
  ValidationMiddleware.validateRequest(resetPasswordSchema),
  AuthController.resetPassword,
)

export default router
