import { UserNotFoundError } from '@/use-cases/errors/user-not-found'
import { makeGetUserMetricsUseCase } from '@/use-cases/factories/make-get-user-metrics'
import { FastifyReply, FastifyRequest } from 'fastify'

export async function metrics(request: FastifyRequest, reply: FastifyReply) {
  try {
    const getUserMetricsUseCase = makeGetUserMetricsUseCase()

    const { countOrder } = await getUserMetricsUseCase.execute({
      userId: request.user.sub,
    })

    return reply.code(200).send({ countOrder })
  } catch (error) {
    if (error instanceof UserNotFoundError) {
      return reply.code(404).send({ message: error.message })
    }

    throw error
  }
}
