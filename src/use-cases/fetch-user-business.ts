import { Business } from '@prisma/client'
import { BusinessRepository } from '@/repositories/business-repository'
import { UsersRepository } from '@/repositories/users-repository'
import { UserNotFoundError } from './errors/user-not-found'

interface FetchUserBusinessRequest {
  userId: string
  page?: number
}

interface FetchUserBusinessResponse {
  business: Business[]
}

export class FetchUserBusiness {
  constructor(
    private businessRepository: BusinessRepository,
    private usersRepository: UsersRepository,
  ) { }

  async execute({
    userId,
    page = 1,
  }: FetchUserBusinessRequest): Promise<FetchUserBusinessResponse> {
    const userAlreadyExists = await this.usersRepository.findById(userId)

    if (!userAlreadyExists) {
      throw new UserNotFoundError()
    }

    const business = await this.businessRepository.findManyByUserId(
      userId,
      page,
    )

    return { business }
  }
}
