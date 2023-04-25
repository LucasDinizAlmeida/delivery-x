import { FastifyInstance } from 'fastify'
import { register } from './register'
import { authenticate } from './authenticate'
import { verifyJwt } from '@/http/middlewares/verify-jwt'
import { profile } from './profile'
import { refresh } from './refresh'
import { changeUserRole } from './change-user-role'
import { verifyUserRole } from '@/http/middlewares/verify-user-role'
import { deleteUser } from './delete'
import { deleteAdmin } from './delete-admin'

export async function userRoutes(app: FastifyInstance) {
  app.post('/users', register)
  app.post('/session', authenticate)
  app.patch('/token/refreshToken', refresh)

  /** Authenticated */
  app.get('/me', { onRequest: [verifyJwt] }, profile)
  app.patch('/me/role', { onRequest: [verifyJwt] }, changeUserRole)
  app.delete(
    '/user/:userId/delete',
    { onRequest: [verifyJwt, verifyUserRole(['MASTER', 'ADMIN'])] },
    deleteUser,
  )
  app.delete(
    '/user/master/:userId/delete',
    { onRequest: [verifyJwt, verifyUserRole(['MASTER'])] },
    deleteAdmin,
  )
}
