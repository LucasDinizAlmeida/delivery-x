import { beforeEach, describe, expect, it } from 'vitest'
import { InMemoryUsersRepository } from '@/repositories/in-memory/in-memory-users-repository'
import { CreateBusinessUseCase } from './create-business'
import { InMemoryBusinessRepository } from '@/repositories/in-memory/in-memory-business-repository'

let inMemoryBusinessRepository: InMemoryBusinessRepository
let inMemoryUserRepository: InMemoryUsersRepository
let sut: CreateBusinessUseCase

describe('Create Business Use Case', () => {
  beforeEach(() => {
    inMemoryBusinessRepository = new InMemoryBusinessRepository()
    inMemoryUserRepository = new InMemoryUsersRepository()
    sut = new CreateBusinessUseCase(inMemoryBusinessRepository)

    inMemoryUserRepository.create({
      id: 'user_01',
      name: 'John Doe',
      email: 'johndoe@example.com',
      password_hash: '123456',
    })
  })

  it('should able to create business', async () => {
    const { business } = await sut.execute({
      title: 'Lanchonet JS',
      user_id: 'user_01',
      description: null,
      phone: null,
    })

    expect(business.id).toEqual(expect.any(String))
    expect(business.user_id).toEqual('user_01')
  })
})
