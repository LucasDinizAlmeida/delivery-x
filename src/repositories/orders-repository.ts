import { Order, Prisma } from '@prisma/client'

export interface OrdersRepository {
  create(data: Prisma.OrderUncheckedCreateInput): Promise<Order>
  findById(id: string): Promise<Order | null>
  findManyByUserId(userId: string, page: number): Promise<Order[]>
  countByUserId(userId: string): Promise<number>
  save(order: Order): Promise<Order>
}
