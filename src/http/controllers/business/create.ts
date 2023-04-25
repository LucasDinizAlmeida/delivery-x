import { UserNotFoundError } from '@/use-cases/errors/user-not-found'
import { makeCreateBusinessUseCase } from '@/use-cases/factories/make-create-business'
import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

export async function create(request: FastifyRequest, reply: FastifyReply) {
  const bodySchema = z.object({
    title: z.string(),
    description: z.string().nullable(),
    phone: z.string().nullable(),
  })

  const { title, description, phone } = bodySchema.parse(request.body)

  try {
    const createBusinessUseCase = makeCreateBusinessUseCase()

    await createBusinessUseCase.execute({
      user_id: request.user.sub,
      title,
      description,
      phone,
    })
  } catch (error) {
    if (error instanceof UserNotFoundError) {
      return reply.code(404).send({ message: error.message })
    }

    throw error
  }
  return reply.code(201).send()
}
