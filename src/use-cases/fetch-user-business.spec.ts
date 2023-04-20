import { beforeEach, describe, expect, it } from 'vitest'
import { InMemoryUsersRepository } from '@/repositories/in-memory/in-memory-users-repository'
import { InMemoryBusinessRepository } from '@/repositories/in-memory/in-memory-business-repository'
import { UserNotFoundError } from './errors/user-not-found'
import { FetchUserBusiness } from './fetch-user-business'

let inMemoryBusinessRepository: InMemoryBusinessRepository
let inMemoryUserRepository: InMemoryUsersRepository
let sut: FetchUserBusiness

describe('Fetch user business Use Case', () => {
  beforeEach(() => {
    inMemoryBusinessRepository = new InMemoryBusinessRepository()
    inMemoryUserRepository = new InMemoryUsersRepository()
    sut = new FetchUserBusiness(
      inMemoryBusinessRepository,
      inMemoryUserRepository,
    )
  })

  it('should able to fetch user business', async () => {
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

    await inMemoryBusinessRepository.create({
      title: 'Lanchonet JS',
      user_id: 'user-02',
      description: null,
      phone: null,
    })

    await inMemoryBusinessRepository.create({
      title: 'Lanchonet JS',
      user_id: 'user-01',
      description: null,
      phone: null,
    })

    const { business } = await sut.execute({
      userId: 'user-01',
    })

    expect(business).toHaveLength(1)
    expect(business).toEqual([expect.objectContaining({ user_id: 'user-01' })])
  })

  it('should not be eable to fetch a business with non-existent user_id', async () => {
    await inMemoryUserRepository.create({
      id: 'user-01',
      name: 'John Doe',
      email: 'johndoe@example.com',
      password_hash: '123456',
    })

    await inMemoryBusinessRepository.create({
      title: 'Lanchonet JS',
      user_id: 'user-01',
      description: null,
      phone: null,
    })

    await expect(async () => {
      await sut.execute({
        userId: 'user-id-not-existe',
      })
    }).rejects.toBeInstanceOf(UserNotFoundError)
  })
})
