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

  it('should not be able to validate the deal if the logged in user is MEMBER ', async () => {
    const { token } = await createAndAuthenticateUser({ app, role: 'MEMBER' })

    const user = await prisma.user.findFirstOrThrow()

    const business = await prisma.business.create({
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

    expect(validateBusinessResponse.statusCode).toEqual(401)
  })
})
