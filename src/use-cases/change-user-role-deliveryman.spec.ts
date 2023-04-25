import { beforeEach, describe, expect, it } from 'vitest'
import { InMemoryUsersRepository } from '@/repositories/in-memory/in-memory-users-repository'
import { ChangeUserRoleDeliverymanUseCase } from './change-user-role-deliveryman'
import { UserNotFoundError } from './errors/user-not-found'
// import { compare } from 'bcryptjs'
// import { UserAlreadyExistsError } from './errors/user-already-exists-error'

let inMemoryUserRepository: InMemoryUsersRepository
let sut: ChangeUserRoleDeliverymanUseCase

describe('Change user role for deliveryman Use Case', () => {
  beforeEach(() => {
    inMemoryUserRepository = new InMemoryUsersRepository()
    sut = new ChangeUserRoleDeliverymanUseCase(inMemoryUserRepository)
  })

  it('should be able to Change user role for deliveryman ', async () => {
    await inMemoryUserRepository.create({
      id: 'user-1',
      name: 'John Doe',
      email: 'johndoe@example.com',
      password_hash: '123456',
    })

    const { updateUser } = await sut.execute({
      userId: 'user-1',
    })

    expect(updateUser.role).toEqual('DELIVERYMAN')
  })
  it('should be able to Change user role for member ', async () => {
    await inMemoryUserRepository.create({
      id: 'user-1',
      name: 'John Doe',
      email: 'johndoe@example.com',
      password_hash: '123456',
    })

    await sut.execute({
      userId: 'user-1',
    })
    const { updateUser } = await sut.execute({
      userId: 'user-1',
    })

    expect(updateUser.role).toEqual('MEMBER')
  })

  it('should not be able to Change user role for deliveryman with not-user-id ', async () => {
    await inMemoryUserRepository.create({
      id: 'user-1',
      name: 'John Doe',
      email: 'johndoe@example.com',
      password_hash: '123456',
    })

    await expect(async () => {
      await sut.execute({
        userId: 'user-',
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
