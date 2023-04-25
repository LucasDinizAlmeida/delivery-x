import { PrismaBusinessRepository } from '@/repositories/prisma/prisma-business-repository'
import { DeleteBusinessUseCase } from '../delete-business'

export function makeDeleteBusinessUseCase() {
  const businessRepository = new PrismaBusinessRepository()
  const useCase = new DeleteBusinessUseCase(businessRepository)

  return useCase
}
