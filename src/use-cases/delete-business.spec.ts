import { beforeEach, describe, expect, it } from 'vitest'
import { DeleteBusinessUseCase } from './delete-business'
import { InMemoryBusinessRepository } from '@/repositories/in-memory/in-memory-business-repository'

let inMemoryBusinessRepository: InMemoryBusinessRepository
let sut: DeleteBusinessUseCase

describe('Delete Business Case', () => {
  beforeEach(() => {
    inMemoryBusinessRepository = new InMemoryBusinessRepository()
    sut = new DeleteBusinessUseCase(inMemoryBusinessRepository)
  })

  it('should able to delete business', async () => {
    await inMemoryBusinessRepository.create({
      id: 'business-01',
      title: 'Lanchonet JS',
      user_id: 'user_01',
      description: null,
      phone: null,
    })

    await sut.execute({
      id: 'business-01',
    })

    expect(inMemoryBusinessRepository.businessArray).toHaveLength(0)
  })

  // it('should not able to delete user id-not-found', async () => {
  //   await inMemoryUserRepository.create({
  //     id: 'user-99',
  //     name: 'John Doe',
  //     email: 'johndoe@example.com',
  //     password_hash: '123456',
  //   })

  //   await expect(async () => {
  //     await sut.execute({
  //       id: 'id-not-found',
  //     })
  //   }).rejects.toBeInstanceOf(UserNotFoundError)
  // })
})
