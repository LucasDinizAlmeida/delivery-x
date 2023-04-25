import { PrismaUserRepository } from '@/repositories/prisma/prisma-users-repository'
import { PrismaOrdersRepository } from '@/repositories/prisma/prisma-orders-repository'
import { FetchuserOrdersHistoryUseCase } from '../fetch-user-orders-history'

export function makeFetchUserOrderHistory() {
  const userRepository = new PrismaUserRepository()
  const orderRepository = new PrismaOrdersRepository()
  const useCase = new FetchuserOrdersHistoryUseCase(
    userRepository,
    orderRepository,
  )

  return useCase
}
