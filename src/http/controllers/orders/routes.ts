import { verifyJwt } from '@/http/middlewares/verify-jwt'
import { FastifyInstance } from 'fastify'
import { create } from './create'
import { metrics } from './metrics'
import { history } from './history'
import { verifyUserRole } from '@/http/middlewares/verify-user-role'
import { update } from './update'
import { assign } from './assign'

export async function orderRoutes(app: FastifyInstance) {
  app.addHook('onRequest', verifyJwt)

  app.post('/business/:businessId/orders', create)
  app.get('/orders/history', history)
  app.get('/orders/metrics', metrics)

  app.patch(
    '/orders/:orderId/users/:userId/assign',
    { onRequest: [verifyUserRole(['ADMIN', 'MASTER'])] },
    assign,
  )
  app.patch(
    '/orders/:orderId/update',
    { onRequest: [verifyUserRole(['ADMIN', 'MASTER'])] },
    update,
  )
}
