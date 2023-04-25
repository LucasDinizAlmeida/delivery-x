import { Prisma, Order } from '@prisma/client'
import { OrdersRepository } from '../orders-repository'
import { randomUUID } from 'crypto'

export class InMemoryOrdersRepository implements OrdersRepository {
  public orders: Order[] = []

  async create(data: Prisma.OrderUncheckedCreateInput): Promise<Order> {
    const order: Order = {
      id: data.id ?? randomUUID(),
      address: data.address,
      created_at: new Date(),
      business_id: data.business_id,
      status: 'pending',
      userId: data.userId ?? null,
    }

    this.orders.push(order)

    return order
  }

  async findById(id: string): Promise<Order | null> {
    const order = this.orders.find((item) => item.id === id)

    if (!order) return null

    return order
  }

  async save(order: Order) {
    const orderIndex = this.orders.findIndex((item) => item.id === order.id)

    if (orderIndex >= 0) {
      this.orders[orderIndex] = order
    }

    return order
  }

  async findManyByUserId(userId: string, page: number): Promise<Order[]> {
    const orders = this.orders
      .filter((item) => item.userId === userId)
      .slice((page - 1) * 20, page * 20)

    return orders
  }

  async countByUserId(userId: string): Promise<number> {
    const userOrders = this.orders.filter((item) => item.userId === userId)

    return userOrders.length
  }
}
