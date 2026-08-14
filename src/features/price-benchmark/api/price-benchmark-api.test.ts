import { beforeEach, describe, expect, it, vi } from 'vitest'
import { apiClient } from '@/shared/api'
import { getPriceBenchmark } from './price-benchmark-api'

vi.mock('@/shared/api', () => ({ apiClient: { get: vi.fn() } }))

describe('price benchmark API', () => {
  beforeEach(() => vi.clearAllMocks())

  it('serializes the complete comparable criteria', async () => {
    vi.mocked(apiClient.get).mockResolvedValue({ sampleCount: 8 })
    await getPriceBenchmark({
      district: 'Quận 7',
      bedrooms: 2,
      priceMonthly: 15_000_000,
      area: 70,
      furniture: 'Đầy đủ',
    })
    expect(apiClient.get).toHaveBeenCalledWith(
      '/price-benchmark?district=Qu%E1%BA%ADn+7&bedrooms=2&priceMonthly=15000000&area=70&furniture=%C4%90%E1%BA%A7y+%C4%91%E1%BB%A7'
    )
  })
})
