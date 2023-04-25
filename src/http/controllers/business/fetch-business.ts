import { UserNotFoundError } from '@/use-cases/errors/user-not-found'
import { makeFetchUserBusinessUseCase } from '@/use-cases/factories/make-fetch-user-business'
import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

export async function fetchBusiness(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  const searchGymsQuerySchema = z.object({
    page: z.coerce.number().min(1).default(1),
  })

  const { page } = searchGymsQuerySchema.parse(request.query)
  try {
    const fetchUserBusinessUseCase = makeFetchUserBusinessUseCase()

    const { business } = await fetchUserBusinessUseCase.execute({
      userId: request.user.sub,
      page,
    })

    return reply.code(200).send({
      business,
    })
  } catch (error) {
    if (error instanceof UserNotFoundError) {
      return reply.code(404).send({ message: error.message })
    }

    throw error
  }
}
