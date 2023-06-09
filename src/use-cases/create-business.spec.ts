import { beforeEach, describe, expect, it } from 'vitest'
import { InMemoryUsersRepository } from '@/repositories/in-memory/in-memory-users-repository'
import { CreateBusinessUseCase } from './create-business'
import { InMemoryBusinessRepository } from '@/repositories/in-memory/in-memory-business-repository'
import { UserNotFoundError } from './errors/user-not-found'

let inMemoryBusinessRepository: InMemoryBusinessRepository
let inMemoryUserRepository: InMemoryUsersRepository
let sut: CreateBusinessUseCase

describe('Create Business Use Case', () => {
  beforeEach(() => {
    inMemoryBusinessRepository = new InMemoryBusinessRepository()
    inMemoryUserRepository = new InMemoryUsersRepository()
    sut = new CreateBusinessUseCase(
      inMemoryBusinessRepository,
      inMemoryUserRepository,
    )
  })

  it('should able to create business', async () => {
    await inMemoryUserRepository.create({
      id: 'user_01',
      name: 'John Doe',
      email: 'johndoe@example.com',
      password_hash: '123456',
    })

    const { business } = await sut.execute({
      title: 'Lanchonet JS',
      user_id: 'user_01',
      description: null,
      phone: null,
    })

    expect(business.id).toEqual(expect.any(String))
    expect(business.user_id).toEqual('user_01')
  })

  it('should not be ebla to create a business with non-existent user_id', async () => {
    await inMemoryUserRepository.create({
      id: 'user_01',
      name: 'John Doe',
      email: 'johndoe@example.com',
      password_hash: '123456',
    })

    await expect(async () => {
      await sut.execute({
        title: 'Lanchonet JS',
        user_id: 'user-id-not-found',
        description: null,
        phone: null,
      })
    }).rejects.toBeInstanceOf(UserNotFoundError)
  })
})
