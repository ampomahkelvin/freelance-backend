import { TokenRepository } from '../repositories'
import { ApiError } from '../../../shared/utils/api-error'

export class TokenService {
  static getTokenByUserId(userId: number) {
    try {
      const token = TokenRepository.getTokenByUserId(userId)
      if (!token) throw new ApiError(404, `Token not found for user ${userId}`)

      return token
    } catch (e) {
      if (e instanceof Error)
        throw new ApiError(500, `Error getting token: ${e.message}`)

      throw new ApiError(500, 'Unknown error getting token')
    }
  }

  static setTokenUsed(userId: number) {
    try {
      const token = this.getTokenByUserId(userId)
      if (!token) throw new ApiError(404, 'Token not found')

      return TokenRepository.setTokenUsed(userId)
    } catch (e) {
      if (e instanceof Error)
        throw new ApiError(500, `Error setting token as used: ${e.message}`)

      throw new ApiError(500, 'Unknown error setting token as used')
    }
  }

  static storeToken(userId: number, code: string) {
    try {
      const token = TokenRepository.storeToken({ userId, token: code })
      if (!token) throw new ApiError(500, 'Error storing tokens')

      return token
    } catch (e) {
      if (e instanceof Error)
        throw new ApiError(500, `Error storing token: ${e.message}`)

      throw new ApiError(500, 'Error storing token')
    }
  }
}
