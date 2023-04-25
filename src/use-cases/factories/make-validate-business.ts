import { PrismaBusinessRepository } from '@/repositories/prisma/prisma-business-repository'
import { ValidateBusinessUseCase } from '../validate-business'

export function makeValidateBusinessUseCase() {
  const businessRepository = new PrismaBusinessRepository()
  const useCase = new ValidateBusinessUseCase(businessRepository)

  return useCase
}
