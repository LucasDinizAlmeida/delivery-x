import { Order, Prisma } from '@prisma/client'

export interface OrdersRepository {
  create(data: Prisma.OrderUncheckedCreateInput): Promise<Order>
  findById(id: string): Promise<Order | null>
  save(order: Order): Promise<Order>
}
