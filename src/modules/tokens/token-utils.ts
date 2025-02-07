import * as crypto from 'crypto'
import bcrypt from 'bcrypt'
import Env from '../../shared/utils/env'
import { ApiError } from '../../shared/utils/api-error'

export const generateToken = async () => {
  try {
    const salt = Env.get('SALT_ROUNDS')
    const rawToken = crypto.randomBytes(32).toString('hex')
    const hashedToken = await bcrypt.hash(rawToken, salt)

    return { rawToken, hashedToken }
  } catch (e) {
    if (e instanceof Error)
      throw new ApiError(500, `Error generating token: ${e.message}`)

    throw new ApiError(500, 'Unknown error generating token')
  }
}

export const verifyToken = async (token: string, hashedToken: string) => {
  try {
    return await bcrypt.compare(token, hashedToken)
  } catch (e) {
    if (e instanceof Error)
      throw new ApiError(500, `Error verifying token: ${e.message}`)

    throw new ApiError(500, 'Unknown error verifying token')
  }
}
