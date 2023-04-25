import { UserNotFoundError } from '@/use-cases/errors/user-not-found'
import { makeFetchUserOrderHistory } from '@/use-cases/factories/make-fetch-user-order-history'
import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

export async function history(request: FastifyRequest, reply: FastifyReply) {
  const querySchema = z.object({
    page: z.coerce.number().min(1).default(1),
  })

  const { page } = querySchema.parse(request.query)

  try {
    const fetchUserOrderHistory = makeFetchUserOrderHistory()

    const { orders } = await fetchUserOrderHistory.execute({
      userId: request.user.sub,
      page,
    })

    return reply.code(200).send({ orders })
  } catch (error) {
    if (error instanceof UserNotFoundError) {
      return reply.code(404).send({ message: error.message })
    }

    throw error
  }
}
