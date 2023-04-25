import { BusinessNotFound } from '@/use-cases/errors/business-not-found'
import { makeDeleteBusinessUseCase } from '@/use-cases/factories/make-delete-business'
import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

export async function deleteBusiness(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  const parmasSchema = z.object({
    businessId: z.string().uuid(),
  })

  const { businessId } = parmasSchema.parse(request.params)

  try {
    const deleteBusinessUsecase = makeDeleteBusinessUseCase()

    await deleteBusinessUsecase.execute({
      id: businessId,
    })
  } catch (error) {
    if (error instanceof BusinessNotFound) {
      return reply.code(404).send({ message: error.message })
    }

    throw error
  }
  return reply.code(204).send()
}
