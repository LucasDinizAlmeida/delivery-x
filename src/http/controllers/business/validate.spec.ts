import { afterAll, beforeAll, describe, expect, it } from 'vitest'
import request from 'supertest'
import { app } from '@/app'
import { createAndAuthenticateUser } from '@/utils/create-and-authenticate-user'
import { prisma } from '@/lib/prisma'

describe('Validate business test e2e', () => {
  beforeAll(async () => {
    await app.ready()
  })

  afterAll(async () => {
    await app.close()
  })

  it('should be able to validate the business of a logged in user', async () => {
    const { token } = await createAndAuthenticateUser({ app, role: 'ADMIN' })

    const user = await prisma.user.findFirstOrThrow()

    let business = await prisma.business.create({
      data: {
        title: 'Lanchonet JS',
        description: 'Melhor hamburguer',
        phone: '99999999',
        user_id: user.id,
      },
    })

    const validateBusinessResponse = await request(app.server)
      .patch(`/business/${business.id}/validate`)
      .set('Authorization', `Bearer ${token}`)
      .send()

    expect(validateBusinessResponse.statusCode).toEqual(204)

    business = await prisma.business.findFirstOrThrow({
      where: {
        id: business.id,
      },
    })

    expect(business.validated_at).toEqual(expect.any(Date))
  })
})
