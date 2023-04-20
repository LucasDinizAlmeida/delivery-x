import { UsersRepository } from '@/repositories/users-repository'
import { UserNotFoundError } from './errors/user-not-found'

interface DeleteUserUseCaseRequest {
  id: string
}

export class DeleteUserUseCase {
  constructor(private userRepository: UsersRepository) { }

  async execute({ id }: DeleteUserUseCaseRequest): Promise<void> {
    const userAlreadyExists = await this.userRepository.findById(id)

    if (!userAlreadyExists) {
      throw new UserNotFoundError()
    }

    await this.userRepository.delete(id)
  }
}
