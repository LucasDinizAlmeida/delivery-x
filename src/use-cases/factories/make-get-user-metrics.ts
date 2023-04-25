import { PrismaUserRepository } from '@/repositories/prisma/prisma-users-repository'
import { GetUserMetricsUseCaseUseCase } from '../get-user-metrics'
import { PrismaOrdersRepository } from '@/repositories/prisma/prisma-orders-repository'

export function makeGetUserMetricsUseCase() {
  const userRepository = new PrismaUserRepository()
  const orderRepository = new PrismaOrdersRepository()
  const useCase = new GetUserMetricsUseCaseUseCase(
    userRepository,
    orderRepository,
  )

  return useCase
}
