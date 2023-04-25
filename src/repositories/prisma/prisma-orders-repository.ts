import { Prisma, Order } from '@prisma/client'
import { OrdersRepository } from '../orders-repository'
import { prisma } from '@/lib/prisma'

export class PrismaOrdersRepository implements OrdersRepository {
  async create(data: Prisma.OrderUncheckedCreateInput): Promise<Order> {
    const order = await prisma.order.create({
      data,
    })

    return order
  }

  async findById(id: string): Promise<Order | null> {
    const order = await prisma.order.findUnique({
      where: {
        id,
      },
    })

    return order
  }

  async findManyByUserId(userId: string, page: number): Promise<Order[]> {
    const orders = await prisma.order.findMany({
      where: {
        userId,
      },
      take: 20,
      skip: (page - 1) * 20,
    })

    return orders
  }

  async countByUserId(userId: string): Promise<number> {
    const countOrders = await prisma.order.count({
      where: {
        userId,
      },
    })

    return countOrders
  }

  async save(order: Order): Promise<Order> {
    const updateOrder = await prisma.order.update({
      where: {
        id: order.id,
      },
      data: order,
    })

    return updateOrder
  }
}
