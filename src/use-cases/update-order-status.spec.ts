import { beforeEach, describe, expect, it } from 'vitest'
// eslint-disable-next-line no-unused-vars
import { InMemoryOrdersRepository } from '@/repositories/in-memory/in-memory-orders-repository'
import { InMemoryBusinessRepository } from '@/repositories/in-memory/in-memory-business-repository'
import { UpdateOrderStatus } from './update-order-status'

let inMemoryOrdersRepository: InMemoryOrdersRepository
let inMemoryBusinessRepository: InMemoryBusinessRepository
let sut: UpdateOrderStatus

describe('Update order status Use Case', () => {
  beforeEach(() => {
    inMemoryOrdersRepository = new InMemoryOrdersRepository()
    inMemoryBusinessRepository = new InMemoryBusinessRepository()
    sut = new UpdateOrderStatus(inMemoryOrdersRepository)
  })

  it('should able to update order status', async () => {
    const business = await inMemoryBusinessRepository.create({
      id: 'business_01',
      title: 'Lanchonet JS',
      user_id: 'user_01',
      description: null,
      phone: null,
    })

    await inMemoryOrdersRepository.create({
      id: 'order_01',
      address: 'saida: rua dos bobos entregar: rua dos idiotas',
      business_id: business.id,
    })

    const { updateOrder } = await sut.execute({
      order_id: 'order_01',
      status: 'inTransit',
    })

    expect(updateOrder.status).toEqual('inTransit')
  })

  // it('should not be possible to create an order with non-existent business_id', async () => {
  //   await inMemoryBusinessRepository.create({
  //     id: 'business_01',
  //     title: 'Lanchonet JS',
  //     user_id: 'user_01',
  //     description: null,
  //     phone: null,
  //   })

  //   await expect(async () => {
  //     await sut.execute({
  //       id: 'order_01',
  //       address: 'saida: rua dos bobos entregar: rua dos idiotas',
  //       business_id: 'id-not-existy',
  //     })
  //   }).rejects.toBeInstanceOf(BusinessNotFound)
  // })

  // it('should not be able to register with same email twice', async () => {
  //   const email = 'johndoe@example.com'

  //   await sut.execute({
  //     name: 'John Doe',
  //     email,
  //     password: '123456',
  //   })

  //   await expect(() =>
  //     sut.execute({
  //       name: 'John Doe',
  //       email,
  //       password: '123456',
  //     }),
  //   ).rejects.toBeInstanceOf(UserAlreadyExistsError)
  // })
})
