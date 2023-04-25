import { PrismaUserRepository } from '@/repositories/prisma/prisma-users-repository'
import { ChangeUserRoleDeliverymanUseCase } from '../change-user-role-deliveryman'

export function makeChangeUserRoleDeliverymanUseCase() {
  const userRepository = new PrismaUserRepository()
  const useCase = new ChangeUserRoleDeliverymanUseCase(userRepository)

  return useCase
}
