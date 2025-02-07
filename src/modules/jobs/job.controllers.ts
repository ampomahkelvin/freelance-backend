import { Request, Response, NextFunction } from 'express'
import { JobService } from './services'
import {
  sendErrorResponse,
  sendSuccessResponse,
} from '../../shared/utils/response-utils'

export class JobController {
  static getAllJobs = async (
    req: Request,
    res: Response,
    next: NextFunction,
  ) => {
    const limit = 10
    const page = Number(req.query.page) || 1
    const offset = (page - 1) * limit

    try {
      const { totalJobs, jobs } = await JobService.getAllJobs(limit, offset)
      sendSuccessResponse(res, 200, 'Jobs retrieved successfully', {
        totalJobs: Number(totalJobs.count),
        jobs,
      })
    } catch (e) {
      next(e)
    }
  }

  static getJobById = async (
    req: Request,
    res: Response,
    next: NextFunction,
  ) => {
    try {
      const { id } = req.params
      const job = await JobService.getJobById(Number(id))

      if (!job) return sendErrorResponse(res, 404, 'Job not found')

      sendSuccessResponse(res, 200, 'Job retrieved successfully', job)
    } catch (e) {
      next(e)
    }
  }

  static getJobsByUser = async (
    req: Request,
    res: Response,
    next: NextFunction,
  ) => {
    try {
      const { totalJobs, jobs } = await JobService.getJobsByUser(
        Number(req.user!.id),
      )
      sendSuccessResponse(res, 200, 'Job retrieved successfully', {
        totalJobs: Number(totalJobs.count),
        jobs,
      })
    } catch (e) {
      next(e)
    }
  }

  static createJob = async (
    req: Request,
    res: Response,
    next: NextFunction,
  ) => {
    const { id } = req.user!
    const { title, description, requirements, skills, budgetType, budget } =
      req.body
    try {
      const newJob = await JobService.createJob({
        clientId: id,
        title,
        description,
        requirements,
        skills,
        budgetType,
        budget,
      })
      sendSuccessResponse(res, 201, 'Job created successfully', newJob)
    } catch (e) {
      next(e)
    }
  }

  static updateJob = async (
    req: Request,
    res: Response,
    next: NextFunction,
  ) => {
    const { id } = req.params
    const { title, description, requirements, budgetType, jobStatus } = req.body
    try {
      const updatedJob = await JobService.updateJob({
        id: Number(id),
        title,
        description,
        requirements,
        budgetType,
        jobStatus,
      })

      sendSuccessResponse(res, 200, 'Job updated successfully', updatedJob)
    } catch (e) {
      next(e)
    }
  }

  static deleteJob = async (
    req: Request,
    res: Response,
    next: NextFunction,
  ) => {
    const { id } = req.params
    try {
      await JobService.deleteJob(Number(id))
      sendSuccessResponse(res, 200, 'Job deleted successfully')
    } catch (e) {
      next(e)
    }
  }

  static searchJobs = async (
    req: Request,
    res: Response,
    next: NextFunction,
  ) => {
    const { query } = req.query as { query: string }

    try {
      if (!query || query.trim() === '') {
        return sendSuccessResponse(res, 200, 'No search query provided', [])
      }

      const jobs = await JobService.findJob(query)
      sendSuccessResponse(res, 200, 'Jobs retrieved successfully', jobs)
    } catch (e) {
      next(e)
    }
  }
}

// TODO: Add pagination
// TODO: Add sorting
// TODO: Add filtering
