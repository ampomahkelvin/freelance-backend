import { sqlQuest } from '../../../config/database'
import { userQueries } from '../queries'
import { UpdateProfileSchema } from '../validations'

export class UserRepository {
  static getUserById = async (id: number) => {
    try {
      return await sqlQuest.oneOrNone(userQueries.getUserById, [id])
    } catch (e) {
      throw e
    }
  }

  static getUserByEmail = async (email: string) => {
    try {
      return await sqlQuest.oneOrNone(userQueries.getUserByEmail, [email])
    } catch (e) {
      throw e
    }
  }

  static getAllUsers = async () => {
    try {
      return await sqlQuest.manyOrNone(userQueries.getAllUsers)
    } catch (e) {
      throw e
    }
  }

  static updateProfile = async ({
    username,
    bio,
    profileImage,
    role,
    userId,
  }: UpdateProfileSchema & { userId: number }) => {
    try {
      return await sqlQuest.oneOrNone(userQueries.updateProfile, [
        username,
        profileImage,
        bio,
        role,
        userId,
      ])
    } catch (e) {
      throw e
    }
  }

  static deleteUser = async (id: number) => {
    try {
      return await sqlQuest.none(userQueries.deleteUser, [id])
    } catch (e) {
      throw e
    }
  }

  static searchUsers = async (username: string) => {
    try {
      return await sqlQuest.manyOrNone(userQueries.searchUsers, [username])
    } catch (e) {
      throw e
    }
  }
}
