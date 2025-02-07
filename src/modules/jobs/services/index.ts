import { JobSchema, UpdateJobSchema } from '../validations'
import { JobRepository } from '../repositories'
import { ApiError } from '../../../shared/utils/api-error'

export class JobService {
  static getAllJobs = async (limit: number, offset: number) => {
    try {
      const totalJobs = await JobRepository.getNumberOfJobs()
      const jobs = await JobRepository.getAllJobs(limit, offset)

      return { totalJobs, jobs }
    } catch (e) {
      if (e instanceof ApiError)
        throw new ApiError(
          500,
          `An error occurred while processing your request: ${e.message}`,
        )
      throw e
    }
  }

  static getJobsByUser = async (userId: number) => {
    try {
      const totalJobs = await JobRepository.getNumberOfJobsByUser(userId)
      const jobs = await JobRepository.getJobsByUser(userId)

      return {totalJobs, jobs}
    } catch (e) {
      if (e instanceof ApiError)
        throw new ApiError(
          500,
          `An error occurred while processing your request: ${e.message}`,
        )
      throw e
    }
  }

  static createJob = async (body: JobSchema) => {
    try {
      return await JobRepository.createJob(body)
    } catch (e) {
      if (e instanceof ApiError)
        throw new ApiError(
          500,
          `An error occurred while processing your request: ${e.message}`,
        )
      throw e
    }
  }

  static getJobById = async (id: number) => {
    try {
      return await JobRepository.getJobById(id)
    } catch (e) {
      if (e instanceof ApiError)
        throw new ApiError(
          500,
          `An error occurred while processing your request: ${e.message}`,
        )
      throw e
    }
  }

  static updateJob = async (body: UpdateJobSchema & { id: number }) => {
    const job = await JobRepository.getJobById(body.id)
    if (!job) throw new ApiError(404, 'Job not found')
    try {
      return await JobRepository.updateJob({
        id: body.id,
        title: body.title || job.title,
        description: body.description || job.description,
        requirements: body.requirements || job.requirements,
        budgetType: body.budgetType || job.budgetType,
        budget: body.budget || job.budget,
        jobStatus: body.jobStatus || job.status,
      })
    } catch (e) {
      if (e instanceof ApiError)
        throw new ApiError(
          500,
          `An error occurred while processing your request: ${e.message}`,
        )
      throw e
    }
  }

  static deleteJob = async (id: number) => {
    try {
      return await JobRepository.deleteJob(id)
    } catch (e) {
      if (e instanceof ApiError)
        throw new ApiError(
          500,
          `An error occurred while processing your request: ${e.message}`,
        )
      throw e
    }
  }

  static findJob = async (query: string) => {
    try {
      return await JobRepository.findJob(query)
    } catch (e) {
      if (e instanceof ApiError)
        throw new ApiError(
          500,
          `An error occurred while processing your request: ${e.message}`,
        )
      throw e
    }
  }
}
