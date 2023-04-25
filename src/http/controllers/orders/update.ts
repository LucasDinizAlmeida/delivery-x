import { OrderNotFound } from '@/use-cases/errors/order-not-found'
import { makeUpdateOrderStatusUseCase } from '@/use-cases/factories/make-update-order-status'
import { Status } from '@/use-cases/update-order-status'
import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

const statusValues = ['pending', 'inTransit', 'delivered', 'canceled']

export async function update(request: FastifyRequest, reply: FastifyReply) {
  const bodySchema = z.object({
    orderStatus: z.string().refine((value) => statusValues.includes(value)),
  })

  const parmsSchema = z.object({
    orderId: z.string().uuid(),
  })

  const { orderStatus } = bodySchema.parse(request.body)
  const { orderId } = parmsSchema.parse(request.params)

  try {
    const updateOrderStatusUseCase = makeUpdateOrderStatusUseCase()

    await updateOrderStatusUseCase.execute({
      order_id: orderId,
      status: orderStatus as Status,
    })
  } catch (error) {
    if (error instanceof OrderNotFound) {
      return reply.code(404).send({ message: error.message })
    }

    throw error
  }
  return reply.code(204).send()
}
