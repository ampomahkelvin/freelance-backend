import { z } from 'zod'

export const freelancerProfileSchema = z.object({
  userId: z.number(),
  username: z.string(),
  bio: z.string(),
  profileImage: z.string().optional().optional(),
  role: z.string(),
  hourlyRate: z.number(),
  skills: z.array(z.string()),
  portfolio: z.string().optional(),
})

export const createFreelancerProfileSchema = z.object({
  hourlyRate: z.number(),
  skills: z.array(z.string()).optional(),
  portfolio: z.string().optional(),
})

export type FreelancerProfileSchema = typeof freelancerProfileSchema._type
export type CreateFreelancerProfileSchema =
  typeof createFreelancerProfileSchema._type
