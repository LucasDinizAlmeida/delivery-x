import { Prisma, Business } from '@prisma/client'
import { BusinessRepository } from '../business-repository'
import { randomUUID } from 'crypto'

export class InMemoryBusinessRepository implements BusinessRepository {
  private businessArray: Business[] = []

  async create(data: Prisma.BusinessUncheckedCreateInput) {
    const business: Business = {
      id: data.id ?? randomUUID(),
      title: data.title,
      description: data.description ?? null,
      phone: data.phone ?? null,
      user_id: data.user_id,
      validated_at: data.validated_at ? new Date() : null,
    }

    this.businessArray.push(business)

    return business
  }
}
