import { UsersRepository } from '@/repositories/users-repository'
import { OrdersRepository } from '@/repositories/orders-repository'
import { UserNotFoundError } from './errors/user-not-found'
import { Order } from '@prisma/client'

interface FetchuserOrdersHistoryRequest {
  userId: string
  page?: number
}

interface FetchuserOrdersHistoryResponse {
  orders: Order[]
}

export class FetchuserOrdersHistoryUseCase {
  constructor(
    private userRepository: UsersRepository,
    private orderRepository: OrdersRepository,
  ) { }

  async execute({
    userId,
    page = 1,
  }: FetchuserOrdersHistoryRequest): Promise<FetchuserOrdersHistoryResponse> {
    const user = await this.userRepository.findById(userId)

    if (!user) {
      throw new UserNotFoundError()
    }

    const orders = await this.orderRepository.findManyByUserId(userId, page)

    return { orders }
  }
}
