import { PrismaBusinessRepository } from '@/repositories/prisma/prisma-business-repository'
import { PrismaOrdersRepository } from '@/repositories/prisma/prisma-orders-repository'
import { CreateOrderUseCase } from '../create-order'

export function makeCreateOrderUseCase() {
  const orderRepository = new PrismaOrdersRepository()
  const businessRepository = new PrismaBusinessRepository()
  const useCase = new CreateOrderUseCase(orderRepository, businessRepository)

  return useCase
}
