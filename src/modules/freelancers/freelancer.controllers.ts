import { Request, Response, NextFunction } from 'express'
import { FreelancerService } from './services'
import { sendSuccessResponse } from '../../shared/utils/response-utils'

export class FreelancerController {
  static createFreelancerProfile = async (
    req: Request,
    res: Response,
    next: NextFunction,
  ) => {
    try {
      const { hourlyRate, skills, portfolio } = req.body
      const { id } = req.params

      const freelancer = await FreelancerService.createFreelancerProfile({
        userId: Number(id),
        hourlyRate,
        skills,
        portfolio,
      })

      sendSuccessResponse(
        res,
        200,
        'Freelancer profile created successfully',
        freelancer,
      )
    } catch (e) {
      next(e)
    }
  }

  static updateFreelancerProfile = async (
    req: Request,
    res: Response,
    next: NextFunction,
  ) => {
    const { username, bio, role, hourlyRate, skills, portfolio } = req.body
    const profileImageUrl = req.file ? req.file.path : undefined
    const { id } = req.params

    try {
      const updatedFreelancer = await FreelancerService.updateFreelancerProfile(
        {
          username,
          bio,
          profileImage: profileImageUrl,
          role,
          hourlyRate,
          skills,
          portfolio,
          userId: Number(id),
        },
      )

      sendSuccessResponse(
        res,
        200,
        'Freelancer profile updated successfully',
        updatedFreelancer,
      )
    } catch (e) {
      next(e)
    }
  }

  static getAllFreelancers = async (
    req: Request,
    res: Response,
    next: NextFunction,
  ) => {
    try {
      const freelancers = await FreelancerService.getAllFreelancers()
      sendSuccessResponse(
        res,
        200,
        'Freelancers retrieved successfully',
        freelancers,
      )
    } catch (e) {
      next(e)
    }
  }

  static getFreelancerBySkill = async (
    req: Request,
    res: Response,
    next: NextFunction,
  ) => {
    const { skill } = req.body
    try {
      const freelancers = await FreelancerService.getFreelancerBySkill(skill)
      sendSuccessResponse(
        res,
        200,
        'Freelancers retrieved successfully',
        freelancers,
      )
    } catch (e) {
      next(e)
    }
  }
}
