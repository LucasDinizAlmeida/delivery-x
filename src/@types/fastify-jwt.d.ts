import '@fastify/jwt'

declare module '@fastify/jwt' {
  export interface FastifyJWT {
    user: {
      role: 'ADMIN' | 'MEMBER' | 'DELIVERYMAN' | 'MASTER'
      sub: string
    } // user type is return type of `request.user` object
  }
}
