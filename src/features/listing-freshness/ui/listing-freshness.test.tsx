import {
  fireEvent,
  render,
  screen,
  waitFor,
  type RenderResult,
} from '@testing-library/react'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { beforeEach, describe, expect, it, vi } from 'vitest'
import { FreshnessBadge } from './freshness-badge'
import { ListingReviewQueue } from './listing-review-queue'

const mocks = vi.hoisted(() => ({
  getFreshness: vi.fn(),
  confirm: vi.fn(),
  getQueue: vi.fn(),
  review: vi.fn(),
}))

vi.mock('../api/listing-freshness-api', () => ({
  getListingFreshness: mocks.getFreshness,
  confirmListingFreshness: mocks.confirm,
  getListingReviewQueue: mocks.getQueue,
  reviewListingCase: mocks.review,
}))

function renderWithQuery(ui: React.ReactNode): RenderResult {
  const client = new QueryClient({
    defaultOptions: { queries: { retry: false } },
  })
  return render(<QueryClientProvider client={client}>{ui}</QueryClientProvider>)
}

describe('listing freshness UI', () => {
  beforeEach(() => vi.clearAllMocks())

  it('shows a stale badge and lets an owner confirm the listing', async () => {
    mocks.getFreshness.mockResolvedValue({
      apartmentId: 'listing-1',
      status: 'stale',
      daysSinceUpdate: 70,
      needsConfirmation: true,
      lastUpdatedAt: '2026-06-01T00:00:00.000Z',
    })
    mocks.confirm.mockResolvedValue({
      apartmentId: 'listing-1',
      status: 'fresh',
      daysSinceUpdate: 0,
      needsConfirmation: false,
      lastUpdatedAt: '2026-08-11T00:00:00.000Z',
    })

    renderWithQuery(<FreshnessBadge listingId="listing-1" canConfirm />)

    expect(await screen.findByText(/tin đã lâu chưa cập nhật/i)).toBeTruthy()
    fireEvent.click(
      screen.getByRole('button', { name: /xác nhận tin còn hiệu lực/i })
    )

    await waitFor(() => expect(mocks.confirm).toHaveBeenCalledWith('listing-1'))
    expect(await screen.findByText(/tin mới cập nhật/i)).toBeTruthy()
  })

  it('renders the empty and recoverable error queue states', async () => {
    mocks.getQueue.mockResolvedValueOnce({
      items: [],
      total: 0,
      page: 1,
      limit: 20,
      totalPages: 0,
    })
    const view = renderWithQuery(<ListingReviewQueue />)
    expect(
      await screen.findByText(/không có tín hiệu cần kiểm tra/i)
    ).toBeTruthy()

    view.unmount()
    mocks.getQueue.mockRejectedValueOnce(new Error('Queue unavailable'))
    renderWithQuery(<ListingReviewQueue />)
    expect(await screen.findByText(/không tải được hàng đợi/i)).toBeTruthy()
  })
})
