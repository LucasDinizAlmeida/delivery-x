import { Business, Prisma } from '@prisma/client'

export interface BusinessRepository {
  create(data: Prisma.BusinessUncheckedCreateInput): Promise<Business>
}
