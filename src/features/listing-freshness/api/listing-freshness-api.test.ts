import { beforeEach, describe, expect, it, vi } from 'vitest'
import { apiClient } from '@/shared/api'
import {
  confirmListingFreshness,
  getListingFreshness,
  getListingReviewQueue,
  reviewListingCase,
} from './listing-freshness-api'

vi.mock('@/shared/api', () => ({
  apiClient: {
    get: vi.fn(),
    patch: vi.fn(),
  },
}))

describe('listing freshness API', () => {
  beforeEach(() => vi.clearAllMocks())

  it('uses the public freshness endpoint for a listing', async () => {
    vi.mocked(apiClient.get).mockResolvedValue({ status: 'fresh' })
    await getListingFreshness('listing-1')
    expect(apiClient.get).toHaveBeenCalledWith('/listing-freshness/listing-1')
  })

  it('confirms a listing through the authenticated endpoint', async () => {
    vi.mocked(apiClient.patch).mockResolvedValue({ status: 'fresh' })
    await confirmListingFreshness('listing-1')
    expect(apiClient.patch).toHaveBeenCalledWith(
      '/listing-freshness/listing-1/confirm',
      {}
    )
  })

  it('loads pending review cases and resolves one explicitly', async () => {
    vi.mocked(apiClient.get).mockResolvedValue({ items: [], total: 0 })
    vi.mocked(apiClient.patch).mockResolvedValue({ status: 'dismissed' })

    await getListingReviewQueue({ status: 'pending', page: 1, limit: 20 })
    await reviewListingCase('case-1', 'dismissed')

    expect(apiClient.get).toHaveBeenCalledWith(
      '/listing-freshness/queue?status=pending&page=1&limit=20'
    )
    expect(apiClient.patch).toHaveBeenCalledWith(
      '/listing-freshness/cases/case-1',
      { status: 'dismissed' }
    )
  })
})
