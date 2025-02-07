import { z } from 'zod'
import { Role } from '../../../shared/enums/roles'

export const updateProfileSchema = z.object({
  email: z.string().email().optional(),
  password: z
    .string()
    .min(6, 'Password has to be more than 6 letters')
    .optional(),
  username: z.string().optional(),
  profileImage: z.string().optional().optional(),
  bio: z.string().optional().optional(),
  role: z.enum([Role.Admin, Role.Freelancer, Role.Client]).optional(),
})

export type UpdateProfileSchema = typeof updateProfileSchema._type
