import { sqlQuest } from '../../../config/database'
import { authQueries } from '../queries'
import { CreateUserSchema } from '../validations'

export class AuthRepository {
  static createUser = async ({
    email,
    password,
    username,
    profileImage,
    bio,
    role,
  }: CreateUserSchema) => {
    try {
      return await sqlQuest.oneOrNone(authQueries.createUser, [
        email,
        password,
        username,
        profileImage,
        bio,
        role,
      ])
    } catch (e) {
      throw e
    }
  }

  static getUserByEmail = async (email: string) => {
    try {
      return await sqlQuest.oneOrNone(authQueries.getUserByEmail, [email])
    } catch (e) {
      throw e
    }
  }

  static updatePassword = async (userId: number, password: string) => {
    try {
      return await sqlQuest.oneOrNone(authQueries.updatePassword, [
        password,
        userId,
      ])
    } catch (e) {
      throw e
    }
  }
}
