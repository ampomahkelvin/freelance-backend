import { z } from 'zod'
import { Role } from '../../../shared/enums/roles'

export const createUserSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6, 'Password has to be more than 6 letters'),
  username: z.string(),
  profileImage: z.string().optional(),
  bio: z.string().optional(),
  role: z.enum([Role.Admin, Role.Freelancer, Role.Client]),
})

export const loginUserSchema = z.object({
  email: z.string().email(),
  password: z.string(),
})

export const requestPasswordResetSchema = z.object({
  email: z.string().email(),
})

export const resetPasswordSchema = z.object({
  newPassword: z.string().min(6, 'Password has to be more than 6 letters'),
})

export type CreateUserSchema = typeof createUserSchema._type
export type LoginUserSchema = typeof loginUserSchema._type
export type RequestPasswordResetSchema = typeof requestPasswordResetSchema._type
export type ResetPasswordSchema = typeof resetPasswordSchema._type
