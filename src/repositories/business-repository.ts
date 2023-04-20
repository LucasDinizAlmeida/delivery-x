import { Business, Prisma } from '@prisma/client'

export interface BusinessRepository {
  create(data: Prisma.BusinessUncheckedCreateInput): Promise<Business>
  delete(id: string): Promise<void>
  save(business: Business): Promise<Business>
  findById(id: string): Promise<Business | null>
  findManyByUserId(userId: string, page: number): Promise<Business[]>
}
