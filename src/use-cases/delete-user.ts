import { UsersRepository } from '@/repositories/users-repository'
import { UserNotFoundError } from './errors/user-not-found'
import { UserUnauthorizedDelete } from './errors/user-unauthorized-delete'

interface DeleteUserUseCaseRequest {
  id: string
}

export class DeleteUserUseCase {
  constructor(private userRepository: UsersRepository) { }

  async execute({ id }: DeleteUserUseCaseRequest): Promise<void> {
    const user = await this.userRepository.findById(id)

    if (!user) {
      throw new UserNotFoundError()
    }

    if (user.role === 'ADMIN' || user.role === 'MASTER') {
      throw new UserUnauthorizedDelete()
    }

    await this.userRepository.delete(id)
  }
}
