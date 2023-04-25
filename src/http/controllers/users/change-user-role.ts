import { makeChangeUserRoleDeliverymanUseCase } from '@/use-cases/factories/make-change-user-role-deliveryman'
import { FastifyReply, FastifyRequest } from 'fastify'

export async function changeUserRole(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  const getUserProfile = makeChangeUserRoleDeliverymanUseCase()

  const { updateUser } = await getUserProfile.execute({
    userId: request.user.sub,
  })

  return reply.code(201).send({
    ...updateUser,
    password_hash: undefined,
  })
}
