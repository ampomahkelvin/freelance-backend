import { sqlQuest } from '../../../config/database'
import { resetTokenQueries } from '../queries'

export class TokenRepository {
  static storeToken = async ({
    userId,
    token,
  }: {
    userId: number
    token: string
  }) => {
    try {
      return await sqlQuest.oneOrNone(resetTokenQueries.storeToken, [
        userId,
        token,
      ])
    } catch (e) {
      throw e
    }
  }

  static setTokenUsed = async (tokenId: number) => {
    try {
      return await sqlQuest.oneOrNone(resetTokenQueries.markTokenAsUsed, [
        tokenId,
      ])
    } catch (e) {
      throw e
    }
  }

  static getTokenByUserId = async (userId: number) => {
    try {
      return await sqlQuest.oneOrNone(resetTokenQueries.getToken, [userId])
    } catch (e) {
      throw e
    }
  }
}
