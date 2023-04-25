import { PrismaBusinessRepository } from '@/repositories/prisma/prisma-business-repository'
import { PrismaUserRepository } from '@/repositories/prisma/prisma-users-repository'
import { FetchUserBusiness } from '../fetch-user-business'

export function makeFetchUserBusinessUseCase() {
  const businessRepository = new PrismaBusinessRepository()
  const userRepository = new PrismaUserRepository()
  const useCase = new FetchUserBusiness(businessRepository, userRepository)

  return useCase
}
