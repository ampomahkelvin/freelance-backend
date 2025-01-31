import { UserRepository } from '../repositories'
import { ApiError } from '../../../shared/utils/api-error'
import { UpdateProfileSchema } from '../validations'

export class UserService {
  static getUserById = async (id: number) => {
    const user = await UserRepository.getUserById(id)
    if (!user) throw new ApiError(404, 'User not found')

    return user
  }

  static getUserByEmail = async (email: string) => {
    return await UserRepository.getUserByEmail(email)
  }

  static getAllUsers = async () => {
    return await UserRepository.getAllUsers()
  }

  static updateProfile = async ({
    username,
    profileImage,
    bio,
    role,
    userId,
  }: UpdateProfileSchema & { userId: number }) => {
    const user = await this.getUserById(userId)

    return await UserRepository.updateProfile({
      username: username || user.username,
      profileImage: profileImage || user.profileImage,
      bio: bio || user.bio,
      role: role || user.role,
      userId: userId || user.id,
    })
  }

  static deleteUser = async (id: number) => {
    await this.getUserById(id)
    return await UserRepository.deleteUser(id)
  }

  static searchUsers = async (query: string) => {
    return await UserRepository.searchUsers(query)
  }
}
