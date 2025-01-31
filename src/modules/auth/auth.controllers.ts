import { Request, Response, NextFunction } from 'express'
import { AuthService } from './services'
import { sanitizeUser } from '../../shared/utils/security-utils'
import {
  sendErrorResponse,
  sendSuccessResponse,
} from '../../shared/utils/response-utils'

export class AuthController {
  static registerUser = async (
    req: Request,
    res: Response,
    next: NextFunction,
  ) => {
    const { email, password, username, bio, role } = req.body
    const profileImageUrl = req.file ? req.file.path : undefined

    console.log(req.file);

    if (req.file) {
      console.log('File path:', req.file.path);  // Directly log req.file.path
      const profileImageUrl = req.file.path;
      console.log('Profile Image URL:', profileImageUrl);
    }


    try {
      const { user, token } = await AuthService.createUser({
        email,
        password,
        username,
        profileImage: profileImageUrl,
        bio,
        role,
      })

      if (!user) return sendErrorResponse(res, 400, 'User registration failed')

      sendSuccessResponse(res, 201, 'User created successfully', {
        token,
        user: sanitizeUser(user),
      })
    } catch (e) {
      next(e)
    }
  }

  static loginUser = async (
    req: Request,
    res: Response,
    next: NextFunction,
  ) => {
    const { email, password } = req.body

    try {
      const { token, user } = await AuthService.loginUser(email, password)

      sendSuccessResponse(res, 200, 'User logged in successfully', {
        token,
        user: sanitizeUser(user),
      })
    } catch (e) {
      next(e)
    }
  }

  static requestPasswordReset = async (
    req: Request,
    res: Response,
    next: NextFunction,
  ) => {
    try {
      const { email } = req.body

      await AuthService.requestPasswordReset(email)

      sendSuccessResponse(res, 200, 'A reset link will be sent')
    } catch (e) {
      next(e)
    }
  }

  static resetPassword = async (
    req: Request,
    res: Response,
    next: NextFunction,
  ) => {
    try {
      const { email, token } = req.query
      const { newPassword } = req.body

      const decodedEmail = decodeURIComponent(email as string)
      const decodedToken = decodeURIComponent(token as string)

      await AuthService.resetPassword(decodedEmail, decodedToken, newPassword)

      sendSuccessResponse(res, 200, 'Password has been successfully reset')
    } catch (e) {
      next(e)
    }
  }
}
