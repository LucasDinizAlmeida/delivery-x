import { Business } from '@prisma/client'
import { BusinessRepository } from '@/repositories/business-repository'
import { BusinessNotFound } from './errors/business-not-found'

interface ValidateBusinessUseCaseRequest {
  businessId: string
}

interface ValidateBusinessUseCaseResponse {
  businessUpdate: Business
}

export class ValidateBusinessUseCase {
  constructor(private businessRepository: BusinessRepository) { }

  async execute({
    businessId,
  }: ValidateBusinessUseCaseRequest): Promise<ValidateBusinessUseCaseResponse> {
    const business = await this.businessRepository.findById(businessId)

    if (!business) {
      throw new BusinessNotFound()
    }

    business.validated_at = new Date()

    const businessUpdate = await this.businessRepository.save(business)

    return { businessUpdate }
  }
}
