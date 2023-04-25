import fastify from 'fastify'
import { userRoutes } from './http/controllers/users/routes'
import fastifyJwt from '@fastify/jwt'
import { ZodError } from 'zod'
import { env } from './env'
import fastifyCookie from '@fastify/cookie'
import { businessRoutes } from './http/controllers/business/routes'
import { orderRoutes } from './http/controllers/orders/routes'

export const app = fastify()

app.register(fastifyJwt, {
  secret: env.JWT_SECRET,
  cookie: {
    cookieName: 'refreshToken',
    signed: false,
  },
  sign: {
    expiresIn: '10m',
  },
})
app.register(fastifyCookie)

app.register(userRoutes)
app.register(businessRoutes)
app.register(orderRoutes)

app.setErrorHandler((error, _, reply) => {
  if (error instanceof ZodError) {
    return reply
      .status(400)
      .send({ message: 'Validation error', issues: error.format() })
  }

  if (env.NODE_ENV !== 'production') {
    console.error(error)
  } else {
    // usar um serviço de terceiro para log de erros com Datadog
  }

  console.log(error)

  return reply.code(500).send({ message: 'Internal error message' })
})
