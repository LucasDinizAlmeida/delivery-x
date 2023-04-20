import { beforeEach, describe, expect, it } from 'vitest'
import { InMemoryUsersRepository } from '@/repositories/in-memory/in-memory-users-repository'
import { DeleteUserUseCase } from './delete-user'
import { UserNotFoundError } from './errors/user-not-found'

let inMemoryUserRepository: InMemoryUsersRepository
let sut: DeleteUserUseCase

describe('Delete Use Case', () => {
  beforeEach(() => {
    inMemoryUserRepository = new InMemoryUsersRepository()
    sut = new DeleteUserUseCase(inMemoryUserRepository)
  })

  it('should able to delete user', async () => {
    await inMemoryUserRepository.create({
      id: 'user-99',
      name: 'John Doe',
      email: 'johndoe@example.com',
      password_hash: '123456',
    })

    await sut.execute({
      id: 'user-99',
    })

    expect(inMemoryUserRepository.items).toHaveLength(0)
  })

  it('should not able to delete user id-not-found', async () => {
    await inMemoryUserRepository.create({
      id: 'user-99',
      name: 'John Doe',
      email: 'johndoe@example.com',
      password_hash: '123456',
    })

    await expect(async () => {
      await sut.execute({
        id: 'id-not-found',
      })
    }).rejects.toBeInstanceOf(UserNotFoundError)
  })

  // it('should hash user password upon registration', async () => {
  //   const { user } = await sut.execute({
  //     name: 'John Doe',
  //     email: 'johndoe@example.com',
  //     password: '123456',
  //   })

  //   const isPasswordCorrectlyHashd = await compare('123456', user.password_hash)

  //   expect(isPasswordCorrectlyHashd).toBe(true)
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
