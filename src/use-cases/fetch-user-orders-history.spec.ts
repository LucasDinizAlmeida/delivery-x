import { beforeEach, describe, expect, it } from 'vitest'
import { InMemoryUsersRepository } from '@/repositories/in-memory/in-memory-users-repository'
import { InMemoryOrdersRepository } from '@/repositories/in-memory/in-memory-orders-repository'
// import { AssignOrderUseCase } from './assignOrder'
// import { UserNotFoundError } from './errors/user-not-found'
// import { OrderNotFound } from './errors/order-not-found'
import { UserNotFoundError } from './errors/user-not-found'
import { FetchuserOrdersHistoryUseCase } from './fetch-user-orders-history'

let inMemoryUserRepository: InMemoryUsersRepository
let inMemoryOrderRepository: InMemoryOrdersRepository
let sut: FetchuserOrdersHistoryUseCase

describe('Fetch user orders history Use Case', () => {
  beforeEach(() => {
    inMemoryUserRepository = new InMemoryUsersRepository()
    inMemoryOrderRepository = new InMemoryOrdersRepository()
    sut = new FetchuserOrdersHistoryUseCase(
      inMemoryUserRepository,
      inMemoryOrderRepository,
    )
  })

  it('should be able to fetch paginated orders history', async () => {
    await inMemoryUserRepository.create({
      id: 'user-01',
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

    // for (let i = 1; i <= 22; i++) {
    //   inMemoryOrderRepository.create({
    //     userId: 'user-01',
    //     id: `order-${i}`,
    //     address: 'saida: rua dos bobos entregar: rua dos idiotas',
    //     business_id: 'business-01',
    //   })
    // }

    const { orders } = await sut.execute({
      userId: 'user-01',
    })

    expect(orders).toHaveLength(2) // aqui
  })

  it('should be able to fetch user orders history', async () => {
    await inMemoryUserRepository.create({
      id: 'user-01',
      name: 'John Doe',
      email: 'johndoe@example.com',
      password_hash: '123456',
    })

    for (let i = 1; i <= 22; i++) {
      inMemoryOrderRepository.create({
        userId: 'user-01',
        id: `order-${i}`,
        address: 'saida: rua dos bobos entregar: rua dos idiotas',
        business_id: 'business-01',
      })
    }

    const { orders } = await sut.execute({
      userId: 'user-01',
      page: 2,
    })

    expect(orders).toHaveLength(2)
    expect(orders).toEqual([
      expect.objectContaining({ id: 'order-21' }),
      expect.objectContaining({ id: 'order-22' }),
    ])
  })
})
