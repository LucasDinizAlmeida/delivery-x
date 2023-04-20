import { Prisma, Business } from '@prisma/client'
import { BusinessRepository } from '../business-repository'
import { randomUUID } from 'crypto'

export class InMemoryBusinessRepository implements BusinessRepository {
  public businessArray: Business[] = []

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

  async save(business: Business) {
    const businessIndex = this.businessArray.findIndex(
      (item) => item.id === business.id,
    )

    if (businessIndex >= 0) {
      this.businessArray[businessIndex] = business
    }

    return business
  }

  async delete(id: string): Promise<void> {
    const businessIndex = this.businessArray.findIndex((item) => item.id === id)

    if (businessIndex >= 0) {
      this.businessArray.splice(businessIndex)
    }
  }

  async findById(id: string): Promise<Business | null> {
    const business = this.businessArray.find((item) => item.id === id)

    if (!business) return null

    return business
  }

  async findManyByUserId(userId: string, page: number): Promise<Business[]> {
    const business = this.businessArray
      .filter((item) => item.user_id === userId)
      .slice((page - 1) * 20, page * 20)

    return business
  }
}
