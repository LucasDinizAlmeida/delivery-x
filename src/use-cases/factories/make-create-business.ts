import { CreateBusinessUseCase } from '../create-business'
import { PrismaBusinessRepository } from '@/repositories/prisma/prisma-business-repository'
import { PrismaUserRepository } from '@/repositories/prisma/prisma-users-repository'

export function makeCreateBusinessUseCase() {
  const businessRepository = new PrismaBusinessRepository()
  const userRepository = new PrismaUserRepository()
  const useCase = new CreateBusinessUseCase(businessRepository, userRepository)

  return useCase
}
