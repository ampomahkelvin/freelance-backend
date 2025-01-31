import { sqlQuest } from '../../../config/database'
import { freelancerQueries } from '../queries'
import {
  CreateFreelancerProfileSchema,
  FreelancerProfileSchema,
} from '../validations'

export class FreelancerRepository {
  static getAllFreelancers = async () => {
    try {
      return await sqlQuest.manyOrNone(freelancerQueries.getAllFreelancers)
    } catch (e) {
      throw e
    }
  }

  static getFreelancer = async (freelancerId: number) => {
    try {
      return await sqlQuest.oneOrNone(freelancerQueries.getFreelancer, [
        freelancerId,
      ])
    } catch (e) {
      throw e
    }
  }

  static createFreelancerProfile = async ({
    userId,
    hourlyRate,
    skills,
    portfolio,
  }: CreateFreelancerProfileSchema & { userId: number }) => {
    try {
      return await sqlQuest.none(freelancerQueries.insertFreelancer, [
        userId,
        hourlyRate,
        skills,
        portfolio,
      ])
    } catch (e) {
      throw e
    }
  }

  static updateFreelancerProfile = async ({
    userId,
    username,
    bio,
    profileImage,
    role,
    hourlyRate,
    skills,
    portfolio,
  }: FreelancerProfileSchema) => {
    try {
      return await sqlQuest.none(
        freelancerQueries.updateFreelancerTransaction,
        [
          username,
          bio,
          profileImage,
          role,
          userId,
          hourlyRate,
          skills,
          portfolio,
        ],
      )
    } catch (e) {
      throw e
    }
  }

  static getFreelancerBySkill = async (skill: string) => {
    try {
      return await sqlQuest.manyOrNone(freelancerQueries.getFreelancersBySkill, [
        `%${skill}%`,
      ])
    } catch (e) {
      throw e
    }
  }
}
