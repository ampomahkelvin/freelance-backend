import { FreelancerRepository } from '../repositories'
import { ApiError } from '../../../shared/utils/api-error'
import {
  CreateFreelancerProfileSchema,
  FreelancerProfileSchema,
} from '../validations'

export class FreelancerService {
  static getAllFreelancers = async () => {
    return await FreelancerRepository.getAllFreelancers()
  }

  static getFreelancer = async (freelancerId: number) => {
    return await FreelancerRepository.getFreelancer(freelancerId)
  }

  static createFreelancerProfile = async (
    body: CreateFreelancerProfileSchema & { userId: number },
  ) => {
    const { userId, hourlyRate, skills, portfolio } = body

    const existingUser = await FreelancerRepository.getFreelancer(userId)
    if (!existingUser) throw new ApiError(400, 'User profile does not exist')

    try {
      return await FreelancerRepository.createFreelancerProfile({
        userId,
        hourlyRate,
        skills,
        portfolio,
      })
    } catch (e) {
      if (e instanceof Error)
        throw new ApiError(
          500,
          `Error creating freelancer profile: ${e.message}`,
        )

      throw new ApiError(
        500,
        'Unknown error occurred while creating freelancer profile',
      )
    }
  }

  static updateFreelancerProfile = async ({
    username,
    bio,
    profileImage,
    role,
    userId,
    hourlyRate,
    skills,
    portfolio,
  }: FreelancerProfileSchema) => {
    return await FreelancerRepository.updateFreelancerProfile({
      username,
      bio,
      profileImage,
      role,
      userId,
      hourlyRate,
      skills,
      portfolio,
    })
  }

  static getFreelancerBySkill = async (skill: string) => {
    return await FreelancerRepository.getFreelancerBySkill(skill)
  }
}
