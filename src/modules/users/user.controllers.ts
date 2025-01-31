import { Request, Response, NextFunction } from 'express'
import { UserService } from './services'
import { sanitizeUser } from '../../shared/utils/security-utils'
import {
  sendErrorResponse,
  sendSuccessResponse,
} from '../../shared/utils/response-utils'

export class UserController {
  static getAllUsers = async (
    _req: Request,
    res: Response,
    next: NextFunction,
  ) => {
    try {
      const users = await UserService.getAllUsers()
      sendSuccessResponse(res, 200, 'Users retrieved successfully', users)
    } catch (e) {
      next(e)
    }
  }

  static getUserById = async (
    req: Request,
    res: Response,
    next: NextFunction,
  ) => {
    try {
      const { id } = req.params
      const user = await UserService.getUserById(Number(id))

      if (!user) return sendErrorResponse(res, 404, 'User not found')

      sendSuccessResponse(
        res,
        200,
        'User retrieved successfully',
        sanitizeUser(user),
      )
    } catch (e) {
      next(e)
    }
  }

  static searchUsers = (req: Request, res: Response, next: NextFunction) => {
    const { query } = req.query
    try {
      const users = UserService.searchUsers(query as string)
      sendSuccessResponse(res, 200, 'Users retrieved successfully', users)
    } catch (e) {
      next(e)
    }
  }

  static deleteUser = async (
    req: Request,
    res: Response,
    next: NextFunction,
  ) => {
    const { id } = req.params
    try {
      await UserService.deleteUser(Number(id))
      sendSuccessResponse(res, 200, 'User deleted successfully')
    } catch (e) {
      next(e)
    }
  }

  static updateProfile = async (
    req: Request,
    res: Response,
    next: NextFunction,
  ) => {
    const { username, bio, role } = req.body
    const profileImageUrl = req.file ? req.file.path : undefined
    const { id } = req.params

    try {
      const updatedUser = await UserService.updateProfile({
        username,
        bio,
        profileImage: profileImageUrl,
        role,
        userId: Number(id),
      })

      sendSuccessResponse(res, 200, 'Profile updated successfully', updatedUser)
    } catch (e) {
      next(e)
    }
  }
}
