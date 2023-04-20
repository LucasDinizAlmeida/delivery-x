import { Business } from '@prisma/client'
import { BusinessRepository } from '@/repositories/business-repository'
import { UsersRepository } from '@/repositories/users-repository'
import { UserNotFoundError } from './errors/user-not-found'

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
  constructor(
    private businessRepository: BusinessRepository,
    private usersRepository: UsersRepository,
  ) { }

  async execute({
    description,
    phone,
    title,
    id,
    user_id,
  }: CreateBusunessUseCaseRequest): Promise<CreateBusunessUseCaseResponse> {
    const user = await this.usersRepository.findById(user_id)

    if (!user) {
      throw new UserNotFoundError()
    }

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
