import { UsersRepository } from '@/repositories/users-repository'
import { OrdersRepository } from '@/repositories/orders-repository'
import { UserNotFoundError } from './errors/user-not-found'

interface GetUserMetricsUseCaseRequest {
  userId: string
}

interface GetUserMetricsUseCaseResponse {
  countOrder: number
}

export class GetUserMetricsUseCaseUseCase {
  constructor(
    private userRepository: UsersRepository,
    private orderRepository: OrdersRepository,
  ) { }

  async execute({
    userId,
  }: GetUserMetricsUseCaseRequest): Promise<GetUserMetricsUseCaseResponse> {
    const user = await this.userRepository.findById(userId)

    if (!user) {
      throw new UserNotFoundError()
    }

    const countOrder = await this.orderRepository.countByUserId(userId)

    return { countOrder }
  }
}
