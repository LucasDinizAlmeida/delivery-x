import { BusinessNotFound } from '@/use-cases/errors/business-not-found'
import { makeValidateBusinessUseCase } from '@/use-cases/factories/make-validate-business'
import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

export async function validate(request: FastifyRequest, reply: FastifyReply) {
  const parmasSchema = z.object({
    businessId: z.string().uuid(),
  })

  const { businessId } = parmasSchema.parse(request.params)

  try {
    const validateBusinessUseCase = makeValidateBusinessUseCase()

    await validateBusinessUseCase.execute({
      businessId,
    })

    return reply.code(204).send()
  } catch (error) {
    if (error instanceof BusinessNotFound) {
      return reply.code(404).send({ message: error.message })
    }

    throw error
  }
}
