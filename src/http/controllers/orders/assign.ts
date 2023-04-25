import { OrderNotFound } from '@/use-cases/errors/order-not-found'
import { UserNotFoundError } from '@/use-cases/errors/user-not-found'
import { makeAssignOrderUseCase } from '@/use-cases/factories/make-assign-order-use-case'
import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

export async function assign(request: FastifyRequest, reply: FastifyReply) {
  const parmsSchema = z.object({
    orderId: z.string().uuid(),
    userId: z.string().uuid(),
  })

  const { orderId, userId } = parmsSchema.parse(request.params)

  try {
    const assignOrderUseCase = makeAssignOrderUseCase()

    await assignOrderUseCase.execute({
      orderId,
      userId,
    })
  } catch (error) {
    if (error instanceof UserNotFoundError || error instanceof OrderNotFound) {
      return reply.code(404).send({ message: error.message })
    }

    throw error
  }
  return reply.code(204).send()
}
