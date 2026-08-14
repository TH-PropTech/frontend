import { beforeEach, describe, expect, it, vi } from 'vitest'
import { apiClient } from '@/shared/api'
import {
  createRentalApplication,
  getMyRentalApplications,
  respondToRentalApplication,
} from './rental-application-api'
vi.mock('@/shared/api', () => ({
  apiClient: { post: vi.fn(), get: vi.fn(), patch: vi.fn() },
}))
describe('rental application API', () => {
  beforeEach(() => vi.clearAllMocks())
  it('uses actor-scoped endpoints', async () => {
    vi.mocked(apiClient.post).mockResolvedValue({ _id: 'application-1' })
    vi.mocked(apiClient.get).mockResolvedValue({ items: [] })
    vi.mocked(apiClient.patch).mockResolvedValue({ status: 'accepted' })
    const input = {
      apartmentId: 'apartment-1',
      occupants: 2,
      moveInDate: '2030-01-01',
      leaseDurationMonths: 12,
      occupation: 'Engineer',
      hasPets: false,
    }
    await createRentalApplication(input)
    await getMyRentalApplications()
    await respondToRentalApplication('application-1', {
      status: 'accepted',
      reasonCode: 'meets_requirements',
    })
    expect(apiClient.post).toHaveBeenCalledWith('/rental-applications', input)
    expect(apiClient.get).toHaveBeenCalledWith(
      '/rental-applications/mine?page=1&limit=20'
    )
    expect(apiClient.patch).toHaveBeenCalledWith(
      '/rental-applications/application-1/respond',
      { status: 'accepted', reasonCode: 'meets_requirements' }
    )
  })
})
