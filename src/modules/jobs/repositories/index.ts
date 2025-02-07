import { JobSchema, UpdateJobSchema } from '../validations'
import { sqlQuest } from '../../../config/database'
import { jobQueries } from '../queries'

export class JobRepository {
  static getAllJobs = async (limit:number, offset:number) => {
    try {
      return await sqlQuest.manyOrNone(jobQueries.getAllJobs, [limit, offset])
    } catch (e) {
      throw e
    }
  }

  static createJob = async (body: JobSchema) => {
    const { clientId, title, description, requirements, skills, budgetType, budget } =
      body

    try {
      return await sqlQuest.oneOrNone(jobQueries.createJob, [
        clientId,
        title,
        description,
        requirements,
        skills,
        budgetType,
        budget,
      ])
    } catch (e) {
      throw e
    }
  }

  static getJobById = async (id: number) => {
    try {
      return await sqlQuest.oneOrNone(jobQueries.getJobById, [id])
    } catch (e) {
      throw e
    }
  }

  static getJobsByUser = async (userId: number) => {
    try {
      return await sqlQuest.manyOrNone(jobQueries.getJobsByUser, [userId])
    } catch (e) {
      throw e
    }
  }

  static getNumberOfJobs = async () => {
    try {
      return await sqlQuest.oneOrNone(jobQueries.getNumberOfJobs)
    } catch (e) {
      throw e
    }
  }

  static getNumberOfJobsByUser = async (userId: number) => {
    try {
      return await sqlQuest.oneOrNone(jobQueries.getNumberOfJobsByUser, [userId])
    } catch (e) {
      throw e
    }
  }

  static updateJob = async (body: UpdateJobSchema & { id: number }) => {
    const {
      id,
      title,
      description,
      requirements,
      budgetType,
      budget,
      jobStatus,
    } = body
    try {
      return await sqlQuest.oneOrNone(jobQueries.updateJob, [
        title,
        description,
        requirements,
        budgetType,
        budget,
        jobStatus,
        id,
      ])
    } catch (e) {
      throw e
    }
  }

  static deleteJob = async (id: number) => {
    try {
      return await sqlQuest.oneOrNone(jobQueries.deleteJob, [id])
    } catch (e) {
      throw e
    }
  }

  static findJob = async (query: string) => {
    try {
      return await sqlQuest.manyOrNone(jobQueries.findJob, [query])
    } catch (e) {
      throw e
    }
  }
}
