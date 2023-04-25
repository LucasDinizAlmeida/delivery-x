import { UsersRepository } from '@/repositories/users-repository'
import { User } from '@prisma/client'
import { UserNotFoundError } from './errors/user-not-found'

interface ChangeUserRoleDeliverymanRequest {
  userId: string
}

interface ChangeUserRoleDeliverymanResponse {
  updateUser: User
}

export class ChangeUserRoleDeliverymanUseCase {
  constructor(private userRepository: UsersRepository) { }

  async execute({
    userId,
  }: ChangeUserRoleDeliverymanRequest): Promise<ChangeUserRoleDeliverymanResponse> {
    const user = await this.userRepository.findById(userId)

    if (!user) {
      throw new UserNotFoundError()
    }

    user.role = user.role === 'MEMBER' ? 'DELIVERYMAN' : 'MEMBER'

    const updateUser = await this.userRepository.save(user)

    return { updateUser }
  }
}
