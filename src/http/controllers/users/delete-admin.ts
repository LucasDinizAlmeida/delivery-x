import { UserNotFoundError } from '@/use-cases/errors/user-not-found'
import { makeDeleteAdminUseCase } from '@/use-cases/factories/make-delete-admin-use-case'
import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

export async function deleteAdmin(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  const parmasSchema = z.object({
    userId: z.string().uuid(),
  })

  const { userId } = parmasSchema.parse(request.params)

  try {
    const deletUserUseCase = makeDeleteAdminUseCase()

    await deletUserUseCase.execute({
      id: userId,
    })
  } catch (error) {
    if (error instanceof UserNotFoundError) {
      return reply.code(404).send({ message: error.message })
    }

    throw error
  }
  return reply.code(204).send()
}
