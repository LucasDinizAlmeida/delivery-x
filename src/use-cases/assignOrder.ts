import { UsersRepository } from '@/repositories/users-repository'
import { Order } from '@prisma/client'
import { OrdersRepository } from '@/repositories/orders-repository'
import { OrderNotFound } from './errors/order-not-found'
import { UserNotFoundError } from './errors/user-not-found'

interface AssignOrderRequest {
  orderId: string
  userId: string
}

interface AssignOrderResponse {
  updateOrder: Order
}

export class AssignOrderUseCase {
  constructor(
    private userRepository: UsersRepository,
    private orderRepository: OrdersRepository,
  ) { }

  async execute({
    orderId,
    userId,
  }: AssignOrderRequest): Promise<AssignOrderResponse> {
    const user = await this.userRepository.findById(userId)

    if (!user) {
      throw new UserNotFoundError()
    }

    const order = await this.orderRepository.findById(orderId)

    if (!order) {
      throw new OrderNotFound()
    }

    order.userId = user.id

    const updateOrder = await this.orderRepository.save(order)

    return { updateOrder }
  }
}
