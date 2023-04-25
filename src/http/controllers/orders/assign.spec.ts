import { afterAll, beforeAll, describe, expect, it } from 'vitest'
import request from 'supertest'
import { app } from '@/app'
import { createAndAuthenticateUser } from '@/utils/create-and-authenticate-user'
import { prisma } from '@/lib/prisma'

describe('Assign Order test e2e', () => {
  beforeAll(async () => {
    await app.ready()
  })

  afterAll(async () => {
    await app.close()
  })

  it('should be possible to assign an order to a certain user deliveryman', async () => {
    const { token } = await createAndAuthenticateUser({ app, role: 'ADMIN' })

    // const user = await prisma.user.findFirstOrThrow()

    const userFake = await prisma.user.create({
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
        user_id: userFake.id,
      },
    })

    let order = await prisma.order.create({
      data: {
        address: 'saida: rua dos bobos entregar: rua dos idiotas',
        business_id: business.id,
      },
    })

    const updateResponse = await request(app.server)
      .patch(`/orders/${order.id}/users/${userFake.id}/assign`)
      .set('Authorization', `Bearer ${token}`)
      .send()

    expect(updateResponse.statusCode).toEqual(204)

    order = await prisma.order.findFirstOrThrow({
      where: {
        id: order.id,
      },
    })
    expect(order.userId).toEqual(userFake.id)
  })
})
