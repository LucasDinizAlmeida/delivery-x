import { beforeEach, describe, expect, it } from 'vitest'
import { InMemoryUsersRepository } from '@/repositories/in-memory/in-memory-users-repository'
import { InMemoryOrdersRepository } from '@/repositories/in-memory/in-memory-orders-repository'
// import { AssignOrderUseCase } from './assignOrder'
// import { UserNotFoundError } from './errors/user-not-found'
// import { OrderNotFound } from './errors/order-not-found'
import { GetUserMetricsUseCaseUseCase } from './get-user-metrics'
import { UserNotFoundError } from './errors/user-not-found'

let inMemoryUserRepository: InMemoryUsersRepository
let inMemoryOrderRepository: InMemoryOrdersRepository
let sut: GetUserMetricsUseCaseUseCase

describe('Get User Metrics Use Case', () => {
  beforeEach(() => {
    inMemoryUserRepository = new InMemoryUsersRepository()
    inMemoryOrderRepository = new InMemoryOrdersRepository()
    sut = new GetUserMetricsUseCaseUseCase(
      inMemoryUserRepository,
      inMemoryOrderRepository,
    )
  })

  it('should be able to assing Get User Metrics ', async () => {
    await inMemoryUserRepository.create({
      id: 'user-01',
      name: 'John Doe',
      email: 'johndoe@example.com',
      password_hash: '123456',
    })

    await inMemoryUserRepository.create({
      id: 'user-02',
      name: 'John Doe',
      email: 'johndoe@example.com',
      password_hash: '123456',
    })

    await inMemoryOrderRepository.create({
      userId: 'user-01',
      id: 'order-01',
      address: 'saida: rua dos bobos entregar: rua dos idiotas',
      business_id: 'business-01',
    })

    await inMemoryOrderRepository.create({
      userId: 'user-01',
      id: 'order-02',
      address: 'saida: rua dos bobos entregar: rua dos idiotas',
      business_id: 'business-01',
    })
    await inMemoryOrderRepository.create({
      userId: 'user-02',
      id: 'order-03',
      address: 'saida: rua dos bobos entregar: rua dos idiotas',
      business_id: 'business-01',
    })

    const { countOrder } = await sut.execute({
      userId: 'user-01',
    })

    expect(countOrder).toEqual(2)
  })

  it('should not be able to get metrics with a non-existent user', async () => {
    await inMemoryUserRepository.create({
      id: 'user-01',
      name: 'John Doe',
      email: 'johndoe@example.com',
      password_hash: '123456',
    })

    await inMemoryOrderRepository.create({
      userId: 'user-01',
      id: 'order-02',
      address: 'saida: rua dos bobos entregar: rua dos idiotas',
      business_id: 'business-01',
    })
    await inMemoryOrderRepository.create({
      userId: 'user-01',
      id: 'order-03',
      address: 'saida: rua dos bobos entregar: rua dos idiotas',
      business_id: 'business-01',
    })

    await expect(async () => {
      await sut.execute({
        userId: 'user-02',
      })
    }).rejects.toBeInstanceOf(UserNotFoundError)
  })

  // it('it should not be able to assign a not-exist order', async () => {
  //   await inMemoryUserRepository.create({
  //     id: 'user-01',
  //     name: 'John Doe',
  //     email: 'johndoe@example.com',
  //     password_hash: '123456',
  //   })

  //   await inMemoryOrderRepository.create({
  //     id: 'order-01',
  //     address: 'saida: rua dos bobos entregar: rua dos idiotas',
  //     business_id: 'business-01',
  //   })

  //   await expect(async () => {
  //     await sut.execute({
  //       userId: 'user-01',
  //       orderId: 'order-02',
  //     })
  //   }).rejects.toBeInstanceOf(OrderNotFound)
  // })
})
