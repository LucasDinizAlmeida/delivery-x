import { afterAll, beforeAll, describe, expect, it } from 'vitest'
import request from 'supertest'
import { app } from '@/app'
import { createAndAuthenticateUser } from '@/utils/create-and-authenticate-user'
import { prisma } from '@/lib/prisma'

describe('Create test e2e', () => {
  beforeAll(async () => {
    await app.ready()
  })

  afterAll(async () => {
    await app.close()
  })

  it('should be able create order', async () => {
    const { token } = await createAndAuthenticateUser({ app })

    const user = await prisma.user.findFirstOrThrow()

    const business = await prisma.business.create({
      data: {
        user_id: user.id,
        title: 'Lanchonet JS',
        description: 'Melgor hamburguer',
        phone: '99999999',
        validated_at: new Date(),
      },
    })

    const createOrderResponse = await request(app.server)
      .post(`/business/${business.id}/orders`)
      .set('Authorization', `Bearer ${token}`)
      .send({
        address: 'entrgar na rua projetada 01',
      })

    expect(createOrderResponse.statusCode).toEqual(201)
  })
})
