import { afterAll, beforeAll, describe, expect, it } from 'vitest'
import request from 'supertest'
import { app } from '@/app'

describe('Create test e2e', () => {
  beforeAll(async () => {
    await app.ready()
  })

  afterAll(async () => {
    await app.close()
  })

  it('should be able create business', async () => {
    await request(app.server).post('/users').send({
      name: 'Lucas',
      email: 'lucas@example.com',
      password: '123456',
    })

    const authResponse = await request(app.server).post('/session').send({
      email: 'lucas@example.com',
      password: '123456',
    })

    const { token } = authResponse.body

    const createBusinessResponse = await request(app.server)
      .post('/business')
      .set('Authorization', `Bearer ${token}`)
      .send({
        title: 'Lanchonet JS',
        description: 'Melgor hamburguer',
        phone: '99999999',
      })

    expect(createBusinessResponse.statusCode).toEqual(201)
  })
})
