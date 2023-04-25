import { afterAll, beforeAll, describe, expect, it } from 'vitest'
import request from 'supertest'
import { app } from '@/app'
import { createAndAuthenticateUser } from '@/utils/create-and-authenticate-user'
import { prisma } from '@/lib/prisma'

describe('Fetch business test e2e', () => {
  beforeAll(async () => {
    await app.ready()
  })

  afterAll(async () => {
    await app.close()
  })

  it('it should be possible to fetch the business of a logged in user', async () => {
    const { token } = await createAndAuthenticateUser({ app })

    const user = await prisma.user.findFirstOrThrow()

    await prisma.business.createMany({
      data: [
        {
          title: 'Lanchonet JS',
          description: 'Melhor hamburguer',
          phone: '99999999',
          user_id: user.id,
        },
        {
          title: 'Mercado JS',
          description: 'Melhor hamburguer',
          phone: '99999999',
          user_id: user.id,
        },
      ],
    })

    const fetchBusinessResponse = await request(app.server)
      .get('/business')
      .set('Authorization', `Bearer ${token}`)
      .send()

    expect(fetchBusinessResponse.statusCode).toEqual(200)
    expect(fetchBusinessResponse.body.business).toEqual([
      expect.objectContaining({
        user_id: user.id,
      }),
      expect.objectContaining({
        user_id: user.id,
      }),
    ])
  })
})
