import { Prisma, Business } from '@prisma/client'
import { BusinessRepository } from '../business-repository'
import { prisma } from '@/lib/prisma'

export class PrismaBusinessRepository implements BusinessRepository {
  async create(data: Prisma.BusinessUncheckedCreateInput): Promise<Business> {
    const business = await prisma.business.create({
      data,
    })

    return business
  }

  async delete(id: string): Promise<void> {
    await prisma.business.delete({
      where: {
        id,
      },
    })
  }

  async save(data: Business): Promise<Business> {
    const updateBusiness = await prisma.business.update({
      where: {
        id: data.id,
      },
      data,
    })

    return updateBusiness
  }

  async findById(id: string): Promise<Business | null> {
    const business = await prisma.business.findUnique({
      where: {
        id,
      },
    })

    return business
  }

  async findManyByUserId(userId: string, page: number): Promise<Business[]> {
    const business = await prisma.business.findMany({
      where: {
        user_id: userId,
      },
      take: 20,
      skip: (page - 1) * 20,
    })

    return business
  }
}
