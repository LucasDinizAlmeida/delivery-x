import { beforeEach, describe, expect, it } from 'vitest'
import { CreateOrderUseCase } from './create-order'
import { InMemoryOrdersRepository } from '@/repositories/in-memory/in-memory-orders-repository'
import { InMemoryBusinessRepository } from '@/repositories/in-memory/in-memory-business-repository'
import { BusinessNotFound } from './errors/business-not-found'
import { UnvalidatedBusiness } from './errors/unvalidated-business'

let inMemoryOrdersRepository: InMemoryOrdersRepository
let inMemoryBusinessRepository: InMemoryBusinessRepository
let sut: CreateOrderUseCase

describe('Create order Use Case', () => {
  beforeEach(() => {
    inMemoryOrdersRepository = new InMemoryOrdersRepository()
    inMemoryBusinessRepository = new InMemoryBusinessRepository()
    sut = new CreateOrderUseCase(
      inMemoryOrdersRepository,
      inMemoryBusinessRepository,
    )
  })

  it('should able to created order', async () => {
    const business = await inMemoryBusinessRepository.create({
      id: 'business_01',
      title: 'Lanchonet JS',
      user_id: 'user_01',
      description: null,
      phone: null,
      validated_at: new Date(),
    })

    const { order } = await sut.execute({
      id: 'order_01',
      address: 'saida: rua dos bobos entregar: rua dos idiotas',
      business_id: business.id,
    })

    expect(order.id).toEqual(expect.any(String))
  })

  it('should not be possible to create an order with non-existent business_id', async () => {
    await inMemoryBusinessRepository.create({
      id: 'business_01',
      title: 'Lanchonet JS',
      user_id: 'user_01',
      description: null,
      phone: null,
      validated_at: new Date(),
    })

    await expect(async () => {
      await sut.execute({
        id: 'order_01',
        address: 'saida: rua dos bobos entregar: rua dos idiotas',
        business_id: 'id-not-existy',
      })
    }).rejects.toBeInstanceOf(BusinessNotFound)
  })

  it('should not be possible to create an order unvalidated business', async () => {
    await inMemoryBusinessRepository.create({
      id: 'business_01',
      title: 'Lanchonet JS',
      user_id: 'user_01',
      description: null,
      phone: null,
    })

    await expect(async () => {
      await sut.execute({
        id: 'order_01',
        address: 'saida: rua dos bobos entregar: rua dos idiotas',
        business_id: 'business_01',
      })
    }).rejects.toBeInstanceOf(UnvalidatedBusiness)
  })
})
