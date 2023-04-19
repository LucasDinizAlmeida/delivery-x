import { Business } from '@prisma/client'
import { BusinessRepository } from '@/repositories/business-repository'

interface CreateBusunessUseCaseRequest {
  id?: string
  user_id: string
  title: string
  description: string | null
  phone: string | null
}

interface CreateBusunessUseCaseResponse {
  business: Business
}

export class CreateBusinessUseCase {
  constructor(private businessRepository: BusinessRepository) { }

  async execute({
    description,
    phone,
    title,
    id,
    user_id,
  }: CreateBusunessUseCaseRequest): Promise<CreateBusunessUseCaseResponse> {
    const business = await this.businessRepository.create({
      id,
      title,
      description,
      phone,
      user_id,
    })

    return { business }
  }
}
