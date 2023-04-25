import { UserNotFoundError } from '@/use-cases/errors/user-not-found'
import { UserUnauthorizedDelete } from '@/use-cases/errors/user-unauthorized-delete'
import { makeDeleteUserUseCase } from '@/use-cases/factories/make-delete-user-use-case'
import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

export async function deleteUser(request: FastifyRequest, reply: FastifyReply) {
  const parmasSchema = z.object({
    userId: z.string().uuid(),
  })

  const { userId } = parmasSchema.parse(request.params)

  try {
    const deletUserUseCase = makeDeleteUserUseCase()

    await deletUserUseCase.execute({
      id: userId,
    })
  } catch (error) {
    if (error instanceof UserNotFoundError) {
      return reply.code(404).send({ message: error.message })
    }
    if (error instanceof UserUnauthorizedDelete) {
      return reply.code(403).send({ message: error.message })
    }
    console.log(error)

    throw error
  }
  return reply.code(204).send()
}
