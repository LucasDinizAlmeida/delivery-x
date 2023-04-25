import { afterAll, beforeAll, describe, expect, it } from 'vitest'
import request from 'supertest'
import { app } from '@/app'
import { createAndAuthenticateUser } from '@/utils/create-and-authenticate-user'
import { prisma } from '@/lib/prisma'

describe('Update order status test e2e', () => {
  beforeAll(async () => {
    await app.ready()
  })

  afterAll(async () => {
    await app.close()
  })

  it('should not be able to update the status of an order as an MEMBER user', async () => {
    const { token } = await createAndAuthenticateUser({ app })

    // const user = await prisma.user.findFirstOrThrow()

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

    const order = await prisma.order.create({
      data: {
        id: 'order_01',
        address: 'saida: rua dos bobos entregar: rua dos idiotas',
        business_id: business.id,
        userId: userBusiness.id,
      },
    })

    const updateResponse = await request(app.server)
      .patch(`/orders/${order.id}/update`)
      .set('Authorization', `Bearer ${token}`)
      .send({
        status: 'inTransit',
      })

    expect(updateResponse.statusCode).toEqual(401)
  })
})
