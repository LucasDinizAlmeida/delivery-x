import { PrismaUserRepository } from '@/repositories/prisma/prisma-users-repository'
import { DeleteUserUseCase } from '../delete-user'

export function makeDeleteUserUseCase() {
  const userRepository = new PrismaUserRepository()
  const useCase = new DeleteUserUseCase(userRepository)

  return useCase
}
