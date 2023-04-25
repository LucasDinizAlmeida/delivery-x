import { prisma } from '@/lib/prisma'
import { hash } from 'bcryptjs'
import { FastifyInstance } from 'fastify'
import request from 'supertest'

type Role = 'MASTER' | 'ADMIN' | 'MEMBER'

interface CreateAndAuthenticateUserProps {
  app: FastifyInstance
  role?: Role
}

export async function createAndAuthenticateUser({
  app,
  role = 'MEMBER',
}: CreateAndAuthenticateUserProps) {
  await prisma.user.create({
    data: {
      name: 'Lucas',
      email: 'lucas@example.com',
      password_hash: await hash('123456', 6),
      role,
    },
  })

  const authResponse = await request(app.server).post('/session').send({
    email: 'lucas@example.com',
    password: '123456',
  })

  const { token } = authResponse.body

  return {
    token,
  }
}
