import { PrismaUserRepository } from '@/repositories/prisma/prisma-users-repository'
import { DeleteAdmUserUseCase } from '../delete-adm-user'

export function makeDeleteAdminUseCase() {
  const userRepository = new PrismaUserRepository()
  const useCase = new DeleteAdmUserUseCase(userRepository)

  return useCase
}
