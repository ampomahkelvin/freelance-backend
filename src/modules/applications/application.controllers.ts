import { ApplicationService } from './services'
import { Request, Response, NextFunction } from 'express'
import { sendSuccessResponse } from '../../shared/utils/response-utils'

export class ApplicationController {
  static applyForJob = async (
    req: Request,
    res: Response,
    next: NextFunction,
  ) => {
    const { jobId } = req.params
    const { id } = req.user!

    try {
      const application = await ApplicationService.applyForJob({
        jobId: Number(jobId),
        freelancerId: id,
      })
      sendSuccessResponse(
        res,
        200,
        'Application created successfully',
        application,
      )
    } catch (e) {
      next(e)
    }
  }

  static deleteApplication = async (
    req: Request,
    res: Response,
    next: NextFunction,
  ) => {
    const { jobId } = req.params
    const { id } = req.user!

    try {
      await ApplicationService.deleteApplication({
        jobId: Number(jobId),
        freelancerId: id,
      })
      sendSuccessResponse(res, 200, 'Application deleted successfully')
    } catch (e) {
      next(e)
    }
  }

  static acceptApplication = async (
    req: Request,
    res: Response,
    next: NextFunction,
  ) => {
    const { jobId, id } = req.params

    try {
      await ApplicationService.acceptApplication({
        jobId: Number(jobId),
        freelancerId: Number(id),
      })
      sendSuccessResponse(res, 200, 'Application accepted successfully')
    } catch (e) {
      next(e)
    }
  }

  static getApplicationsForJob = async (
    req: Request,
    res: Response,
    next: NextFunction,
  ) => {
    const { jobId } = req.params
    try {
      const applications = await ApplicationService.getApplicationsForJob(
        Number(jobId),
      )
      sendSuccessResponse(
        res,
        200,
        'Applications retrieved successfully',
        applications,
      )
    } catch (e) {
      next(e)
    }
  }

  static getApplicationsByFreelancer = async (
    req: Request,
    res: Response,
    next: NextFunction,
  ) => {
    const { id } = req.user!
    try {
      const applications = await ApplicationService.getApplicationsByFreelancer(
        Number(id),
      )
      sendSuccessResponse(
        res,
        200,
        'Applications retrieved successfully',
        applications,
      )
    } catch (e) {
      next(e)
    }
  }

  static getApplicationStatus = async (
    req: Request,
    res: Response,
    next: NextFunction,
  ) => {
    const { jobId } = req.params
    const { id } = req.user!
    try {
      const application = await ApplicationService.getApplicationStatus(
        Number(jobId),
        Number(id),
      )
      sendSuccessResponse(
        res,
        200,
        'Application status retrieved successfully',
        application,
      )
    } catch (e) {
      next(e)
    }
  }

  static updateApplicationStatus = async (
    req: Request,
    res: Response,
    next: NextFunction,
  ) => {
    const { jobId } = req.params
    const { id } = req.user!
    const { status } = req.body
    try {
      const application = await ApplicationService.updateApplicationStatus(
        Number(jobId),
        Number(id),
        status,
      )
      sendSuccessResponse(
        res,
        200,
        'Application status updated successfully',
        application,
      )
    } catch (e) {
      next(e)
    }
  }
}
