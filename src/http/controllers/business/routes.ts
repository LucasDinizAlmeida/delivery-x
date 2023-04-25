import { verifyJwt } from '@/http/middlewares/verify-jwt'
import { FastifyInstance } from 'fastify'
import { create } from './create'
import { fetchBusiness } from './fetch-business'
// import { verifyUserRole } from '@/http/middlewares/verify-user-role'
import { validate } from './validate'
import { verifyUserRole } from '@/http/middlewares/verify-user-role'
import { deleteBusiness } from './delete'

export async function businessRoutes(app: FastifyInstance) {
  app.addHook('onRequest', verifyJwt)

  app.post('/business', create)
  app.get('/business', fetchBusiness)
  app.patch(
    '/business/:businessId/validate',
    { onRequest: [verifyUserRole(['ADMIN', 'MASTER'])] },
    validate,
  )
  app.delete(
    '/business/:businessId/delete',
    { onRequest: verifyUserRole(['MASTER', 'ADMIN']) },
    deleteBusiness,
  )
}
