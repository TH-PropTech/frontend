import { beforeEach, describe, expect, it, vi } from 'vitest'
import { ApiClientError, apiClient } from '@/shared/api'
import {
  createRentalApplication,
  getRentalApplicationContext,
  getMyRentalApplications,
  respondToRentalApplication,
  isRentalPackageStaleError,
} from './rental-application-api'
vi.mock('@/shared/api', () => ({
  ApiClientError: class MockApiClientError extends Error {
    status: number
    body: unknown
    constructor(message: string, status: number, body: unknown) {
      super(message)
      this.status = status
      this.body = body
    }
  },
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
      packageId: 'pkg-12',
      packageVersion: 3,
      occupants: 2,
      moveInDate: '2030-01-01',
      occupation: 'Engineer',
      hasPets: false,
      disclosureVersion: 'rental-review-v1',
      acknowledgedDisclosureIds: [
        'listing-terms',
        'pre-contract-request',
        'future-payment-and-signing',
      ],
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

  it('loads server-owned context before rendering the review flow', async () => {
    vi.mocked(apiClient.get).mockResolvedValue({ enabled: true })
    await getRentalApplicationContext('apartment-1')
    expect(apiClient.get).toHaveBeenCalledWith(
      '/rental-applications/context/apartment-1'
    )
  })

  it('identifies a stale package response without treating it as a client validation success', () => {
    const stale = new ApiClientError('PACKAGE_STALE', 409, {
      code: 'HTTP_409',
      message: 'PACKAGE_STALE',
    })
    expect(isRentalPackageStaleError(stale)).toBe(true)
    expect(isRentalPackageStaleError(new Error('PACKAGE_STALE'))).toBe(false)
  })
})
