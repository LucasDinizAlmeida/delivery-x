import { PrismaOrdersRepository } from '@/repositories/prisma/prisma-orders-repository'
import { AssignOrderUseCase } from '../assignOrder'
import { PrismaUserRepository } from '@/repositories/prisma/prisma-users-repository'

export function makeAssignOrderUseCase() {
  const orderRepository = new PrismaOrdersRepository()
  const userRepository = new PrismaUserRepository()
  const useCase = new AssignOrderUseCase(userRepository, orderRepository)

  return useCase
}
