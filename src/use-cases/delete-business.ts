import { BusinessNotFound } from './errors/business-not-found'
import { BusinessRepository } from '@/repositories/business-repository'

interface DeleteBusinessUseCaseRequest {
  id: string
}

export class DeleteBusinessUseCase {
  constructor(private businessRepository: BusinessRepository) { }

  async execute({ id }: DeleteBusinessUseCaseRequest): Promise<void> {
    const businessAlreadyExists = await this.businessRepository.findById(id)

    if (!businessAlreadyExists) {
      console.log('entrou aqui')
      throw new BusinessNotFound()
    }

    await this.businessRepository.delete(id)
  }
}
