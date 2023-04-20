import { BusinessRepository } from '@/repositories/business-repository'
import { OrdersRepository } from '@/repositories/orders-repository'
import { Order } from '@prisma/client'
import { BusinessNotFound } from './errors/business-not-found'
import { UnvalidatedBusiness } from './errors/unvalidated-business'

interface CreateOrderUseCaseRequest {
  id?: string
  address: string
  business_id: string
}

interface CreateOrderUseCaseResponse {
  order: Order
}

export class CreateOrderUseCase {
  constructor(
    private ordersRepository: OrdersRepository,
    private businessRepository: BusinessRepository,
  ) { }

  async execute({
    address,
    business_id,
    id,
  }: CreateOrderUseCaseRequest): Promise<CreateOrderUseCaseResponse> {
    const business = await this.businessRepository.findById(business_id)

    if (!business) {
      throw new BusinessNotFound()
    }

    if (!business?.validated_at) {
      throw new UnvalidatedBusiness()
    }

    const order = await this.ordersRepository.create({
      address,
      business_id,
      id,
    })

    return { order }
  }
}
