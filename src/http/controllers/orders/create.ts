import { BusinessNotFound } from '@/use-cases/errors/business-not-found'
import { UnvalidatedBusiness } from '@/use-cases/errors/unvalidated-business'
import { makeCreateOrderUseCase } from '@/use-cases/factories/make-create-order'
import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

export async function create(request: FastifyRequest, reply: FastifyReply) {
  const bodySchema = z.object({
    address: z.string(),
  })

  const parmsSchema = z.object({
    businessId: z.string().uuid(),
  })

  const { address } = bodySchema.parse(request.body)
  const { businessId } = parmsSchema.parse(request.params)

  try {
    const createOrderUseCase = makeCreateOrderUseCase()

    await createOrderUseCase.execute({
      business_id: businessId,
      address,
    })
  } catch (error) {
    if (error instanceof BusinessNotFound) {
      return reply.code(404).send({ message: error.message })
    }

    if (error instanceof UnvalidatedBusiness) {
      return reply.code(403).send({ message: error.message })
    }

    throw error
  }
  return reply.code(201).send()
}
