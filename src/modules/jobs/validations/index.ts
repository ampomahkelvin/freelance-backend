import { string, z } from 'zod'

export const jobSchema = z.object({
  clientId: z.number().optional(),
  title: z.string(),
  description: z.string(),
  requirements: z.array(string()),
  skills: z.array(string()),
  budgetType: z.enum(['hourly', 'fixed']),
  budget: z.number(),
})

export const updateJobSchema = z.object({
  title: z.string().optional(),
  description: z.string().optional(),
  requirements: z.array(string()).optional(),
  budgetType: z.enum(['hourly', 'fixed']).optional(),
  budget: z.number().optional(),
  jobStatus: z
    .enum(['pending', 'accepted', 'declined', 'closed', 'completed'])
    .optional(),
})

export type JobSchema = typeof jobSchema._type
export type UpdateJobSchema = typeof updateJobSchema._type
