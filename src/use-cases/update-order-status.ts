import { OrdersRepository } from '@/repositories/orders-repository'
import { Order } from '@prisma/client'
import { OrderNotFound } from './errors/order-not-found'

export type Status = 'pending' | 'inTransit' | 'delivered' | 'canceled'

interface UpdateOrderStatusRequest {
  order_id: string
  status: Status
}

interface UpdateOrderStatusResponse {
  updateOrder: Order
}

export class UpdateOrderStatus {
  constructor(private ordersRepository: OrdersRepository) { }

  async execute({
    order_id,
    status,
  }: UpdateOrderStatusRequest): Promise<UpdateOrderStatusResponse> {
    const order = await this.ordersRepository.findById(order_id)

    if (!order) {
      throw new OrderNotFound()
    }

    const updateOrder = await this.ordersRepository.save({
      ...order,
      status,
    })

    return { updateOrder }
  }
}
