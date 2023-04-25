import { PrismaOrdersRepository } from '@/repositories/prisma/prisma-orders-repository'
import { UpdateOrderStatus } from '../update-order-status'

export function makeUpdateOrderStatusUseCase() {
  const orderRepository = new PrismaOrdersRepository()
  const useCase = new UpdateOrderStatus(orderRepository)

  return useCase
}
