import { afterAll, beforeAll, describe, expect, it } from 'vitest'
import request from 'supertest'
import { app } from '@/app'
import { createAndAuthenticateUser } from '@/utils/create-and-authenticate-user'
import { prisma } from '@/lib/prisma'

describe('Get history test e2e', () => {
  beforeAll(async () => {
    await app.ready()
  })

  afterAll(async () => {
    await app.close()
  })

  it('should be possible to get a user orders history', async () => {
    const { token } = await createAndAuthenticateUser({ app })

    const user = await prisma.user.findFirstOrThrow()

    const userBusiness = await prisma.user.create({
      data: {
        name: 'Didi',
        email: 'didimoco@example.com',
        password_hash: '123546',
      },
    })

    const business = await prisma.business.create({
      data: {
        title: 'Lanchonet JS',
        description: 'Melhor hamburguer',
        phone: '99999999',
        user_id: userBusiness.id,
      },
    })

    await prisma.order.createMany({
      data: [
        {
          id: 'order_01',
          address: 'saida: rua dos bobos entregar: rua dos idiotas',
          business_id: business.id,
          userId: user.id,
        },
        {
          id: 'order_02',
          address: 'saida: rua dos bobos entregar: rua dos idiotas',
          business_id: business.id,
          userId: user.id,
        },
      ],
    })

    const historyResponse = await request(app.server)
      .get(`/orders/history`)
      .set('Authorization', `Bearer ${token}`)
      .send()

    expect(historyResponse.statusCode).toEqual(200)
    expect(historyResponse.body.orders).toEqual([
      expect.objectContaining({
        userId: user.id,
      }),
      expect.objectContaining({
        userId: user.id,
      }),
    ])
  })
})
