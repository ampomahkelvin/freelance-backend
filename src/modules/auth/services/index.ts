import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import { AuthRepository } from '../repositories'
import { ApiError } from '../../../shared/utils/api-error'
import Env from '../../../shared/utils/env'
import { TokenService } from '../../tokens/services'
import { generateToken, verifyToken } from '../../tokens/token-utils'
import EmailService from '../../../shared/services/email-service'
import { CreateUserSchema } from '../validations'

export class AuthService {
  private static checkJwtSecret = () => {
    const jwtSecret = Env.get('JWT_SECRET')
    if (!jwtSecret) throw new ApiError(500, 'JWT secret not found')
    return jwtSecret
  }

  static loginUser = async (email: string, password: string) => {
    const user = await AuthRepository.getUserByEmail(email)
    if (!user) throw new ApiError(404, 'User not found')

    const isPasswordValid = await bcrypt.compare(password, user.password)
    if (!isPasswordValid) throw new ApiError(401, 'Invalid password')

    const jwtSecret = this.checkJwtSecret()
    const token = jwt.sign(
      { email: user.email, id: user.id, role: user.role },
      jwtSecret,
      { expiresIn: '1d' },
    )

    return { user: { id: user.id, email }, token }
  }

  static createUser = async ({
    email,
    password,
    profileImage,
    username,
    bio,
    role,
  }: CreateUserSchema) => {

    const existingUser = await AuthRepository.getUserByEmail(email)
    if (existingUser) throw new ApiError(400, 'User already exists')

    const hashedPassword = await bcrypt.hash(password.trim(), 10)
    if (!hashedPassword) throw new ApiError(500, 'Error hashing password')

    const jwtSecret = this.checkJwtSecret()
    try {
      const user = await AuthRepository.createUser({
        email: email.trim().toLowerCase(),
        password: hashedPassword,
        username,
        bio,
        profileImage,
        role,
      })

      const token = jwt.sign(
        { email: user.email, id: user.id, role: user.role },
        jwtSecret,
        { expiresIn: '1d' },
      )

      await EmailService.sendWelcomeEmail(user.email, user.username)
      return { user, token }
    } catch (e) {
      if (e instanceof Error)
        throw new ApiError(500, `Error creating user: ${e.message}`)

      throw new ApiError(500, 'Unknown error creating user')
    }
  }

  static requestPasswordReset = async (email: string) => {
    const user = await AuthRepository.getUserByEmail(email)
    if (!user) return

    const { rawToken, hashedToken } = await generateToken()
    await TokenService.storeToken(user.id, hashedToken)

    const resetLink = `${Env.get('CLIENT_URL')}/user/reset-password?token=${encodeURIComponent(rawToken)}&email=${encodeURIComponent(user.email)}`

    try {
      await EmailService.sendPasswordResetLink({
        name: user.username,
        email,
        resetLink,
      })
    } catch (e) {
      if (e instanceof Error)
        throw new ApiError(500, `Error sending email: ${e.message}`)

      throw new ApiError(500, 'Unknown error sending email')
    }
  }

  static resetPassword = async (
    email: string,
    token: string,
    newPassword: string,
  ) => {
    const user = await AuthRepository.getUserByEmail(email)
    if (!user) throw new ApiError(404, 'User not found')

    const hashedToken = await TokenService.getTokenByUserId(user.id)
    if (!hashedToken)
      throw new ApiError(400, 'No reset token found for this user')
    if (hashedToken.used) throw new ApiError(400, 'Token already used')

    const tokenExpiry = new Date(hashedToken.expires_at)
    if (tokenExpiry < new Date()) throw new ApiError(400, 'Token has expired')

    const isTokenValid = await verifyToken(token, hashedToken.token_hash)
    if (!isTokenValid) throw new ApiError(400, 'Invalid token')

    try {
      const hashedPassword = await bcrypt.hash(newPassword, 12)
      await AuthRepository.updatePassword(user.id, hashedPassword)
      await TokenService.setTokenUsed(user.id)
      await EmailService.sendPasswordResetConfirmation(email, user.username)
      return { success: true }
    } catch (e) {
      if (e instanceof Error)
        throw new ApiError(500, `Error resetting password: ${e.message}`)

      throw new ApiError(500, 'Unknown error resetting password')
    }
  }
}
