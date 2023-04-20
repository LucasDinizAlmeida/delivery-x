import { beforeEach, describe, expect, it } from 'vitest'
import { InMemoryBusinessRepository } from '@/repositories/in-memory/in-memory-business-repository'
import { ValidateBusinessUseCase } from './validate-business'

let inMemoryBusinessRepository: InMemoryBusinessRepository
let sut: ValidateBusinessUseCase

describe('Validate Business Use Case', () => {
  beforeEach(() => {
    inMemoryBusinessRepository = new InMemoryBusinessRepository()
    sut = new ValidateBusinessUseCase(inMemoryBusinessRepository)
  })

  it('should able to validate business', async () => {
    await inMemoryBusinessRepository.create({
      id: 'business-01',
      title: 'Lanchonet JS',
      user_id: 'user_01',
      description: null,
      phone: null,
    })

    const { businessUpdate } = await sut.execute({
      businessId: 'business-01',
    })

    expect(businessUpdate.validated_at).toEqual(expect.any(Date))
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
