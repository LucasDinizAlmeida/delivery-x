import { afterAll, beforeAll, describe, expect, it } from 'vitest'
import request from 'supertest'
import { app } from '@/app'
import { createAndAuthenticateUser } from '@/utils/create-and-authenticate-user'
import { prisma } from '@/lib/prisma'

describe('Delete business test e2e', () => {
  beforeAll(async () => {
    await app.ready()
  })

  afterAll(async () => {
    await app.close()
  })

  it('should be able to business', async () => {
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

    const deleteBusinessResponse = await request(app.server)
      .delete(`/business/${business.id}/delete`)
      .set('Authorization', `Bearer ${token}`)
      .send()

    expect(deleteBusinessResponse.statusCode).toEqual(401)
  })
})
