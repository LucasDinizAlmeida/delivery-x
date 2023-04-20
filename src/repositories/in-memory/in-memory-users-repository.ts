import { Prisma, User } from '@prisma/client'
import { UsersRepository } from '../users-repository'

export class InMemoryUsersRepository implements UsersRepository {
  public items: User[] = []

  async create(data: Prisma.UserUncheckedCreateInput) {
    const user: User = {
      id: data.id ?? 'user-1',
      name: data.name,
      email: data.email,
      password_hash: data.password_hash,
      created_at: new Date(),
      validated_at: data.validated_at ? new Date() : null,
      role: data.role ?? 'MEMBER',
    }

    this.items.push(user)

    return user
  }

  async delete(id: string): Promise<void> {
    const userIndex = this.items.findIndex((item) => item.id === id)

    if (userIndex >= 0) {
      this.items.splice(userIndex)
    }
  }

  async findById(id: string): Promise<User | null> {
    const user = this.items.find((item) => item.id === id)

    if (!user) return null

    return user
  }

  async findByEmail(email: string): Promise<User | null> {
    const user = this.items.find((item) => item.email === email)

    if (!user) return null

    return user
  }
}
