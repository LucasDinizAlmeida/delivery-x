import { afterAll, beforeAll, describe, expect, it } from 'vitest'
import request from 'supertest'
import { app } from '@/app'
import { createAndAuthenticateUser } from '@/utils/create-and-authenticate-user'
import { prisma } from '@/lib/prisma'

describe('Delete user test e2e', () => {
  beforeAll(async () => {
    await app.ready()
  })

  afterAll(async () => {
    await app.close()
  })

  it('should not be possible to delete a user when the logged in user is MEMBER', async () => {
    const { token } = await createAndAuthenticateUser({ app, role: 'MEMBER' })

    const userFake = await prisma.user.create({
      data: {
        name: 'John Doe',
        email: 'johndoe@example.com',
        password_hash: '123456',
      },
    })

    const deleteUserResponse = await request(app.server)
      .delete(`/user/${userFake.id}/delete`)
      .set('Authorization', `Bearer ${token}`)
      .send()

    expect(deleteUserResponse.statusCode).toEqual(401)
  })
})
