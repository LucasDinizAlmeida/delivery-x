import { beforeEach, describe, expect, it } from 'vitest'
import { InMemoryUsersRepository } from '@/repositories/in-memory/in-memory-users-repository'
import { InMemoryOrdersRepository } from '@/repositories/in-memory/in-memory-orders-repository'
import { AssignOrderUseCase } from './assignOrder'
import { UserNotFoundError } from './errors/user-not-found'
import { OrderNotFound } from './errors/order-not-found'

let inMemoryUserRepository: InMemoryUsersRepository
let inMemoryOrderRepository: InMemoryOrdersRepository
let sut: AssignOrderUseCase

describe('Assign Order Use Case', () => {
  beforeEach(() => {
    inMemoryUserRepository = new InMemoryUsersRepository()
    inMemoryOrderRepository = new InMemoryOrdersRepository()
    sut = new AssignOrderUseCase(
      inMemoryUserRepository,
      inMemoryOrderRepository,
    )
  })

  it('should be able to assing order ', async () => {
    await inMemoryUserRepository.create({
      id: 'user-01',
      name: 'John Doe',
      email: 'johndoe@example.com',
      password_hash: '123456',
    })

    await inMemoryOrderRepository.create({
      id: 'order-01',
      address: 'saida: rua dos bobos entregar: rua dos idiotas',
      business_id: 'business-01',
    })

    const { updateOrder } = await sut.execute({
      userId: 'user-01',
      orderId: 'order-01',
    })

    expect(updateOrder.userId).toEqual('user-01')
  })

  it('should not be able to assign a order with a non-existent user', async () => {
    await inMemoryUserRepository.create({
      id: 'user-01',
      name: 'John Doe',
      email: 'johndoe@example.com',
      password_hash: '123456',
    })

    await inMemoryOrderRepository.create({
      id: 'order-01',
      address: 'saida: rua dos bobos entregar: rua dos idiotas',
      business_id: 'business-01',
    })

    await expect(async () => {
      await sut.execute({
        userId: 'user-02',
        orderId: 'order-01',
      })
    }).rejects.toBeInstanceOf(UserNotFoundError)
  })

  it('it should not be able to assign a not-exist order', async () => {
    await inMemoryUserRepository.create({
      id: 'user-01',
      name: 'John Doe',
      email: 'johndoe@example.com',
      password_hash: '123456',
    })

    await inMemoryOrderRepository.create({
      id: 'order-01',
      address: 'saida: rua dos bobos entregar: rua dos idiotas',
      business_id: 'business-01',
    })

    await expect(async () => {
      await sut.execute({
        userId: 'user-01',
        orderId: 'order-02',
      })
    }).rejects.toBeInstanceOf(OrderNotFound)
  })
})
