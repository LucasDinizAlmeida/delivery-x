import { UsersRepository } from '@/repositories/users-repository'
import { UserNotFoundError } from './errors/user-not-found'

interface DeleteAdmUserUseCaseRequest {
  id: string
}

export class DeleteAdmUserUseCase {
  constructor(private userRepository: UsersRepository) { }

  async execute({ id }: DeleteAdmUserUseCaseRequest): Promise<void> {
    const user = await this.userRepository.findById(id)

    if (!user) {
      throw new UserNotFoundError()
    }

    await this.userRepository.delete(id)
  }
}
