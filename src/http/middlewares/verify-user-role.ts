import { FastifyReply, FastifyRequest } from 'fastify'

export function verifyUserRole(verifyRoles: string[]) {
  return async (request: FastifyRequest, reply: FastifyReply) => {
    const { role } = request.user

    if (!verifyRoles.includes(role)) {
      return reply.code(401).send('Unauthorized')
    }
  }
}
