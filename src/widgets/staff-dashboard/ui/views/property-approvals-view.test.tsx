import {
  cleanup,
  fireEvent,
  render,
  screen,
  waitFor,
} from '@testing-library/react'
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'
import { PropertyApprovalsView } from './property-approvals-view'
import { apiClient } from '@/shared/api/api-client'

vi.mock('@/shared/api/api-client', () => ({
  apiClient: { get: vi.fn(), patch: vi.fn() },
}))

vi.mock('@/features/listing-freshness', () => ({
  ListingReviewQueue: () => null,
}))

vi.mock('./components/vr-preview-panel', () => ({
  VrPreviewPanel: () => null,
}))

vi.mock('sonner', () => ({
  toast: { success: vi.fn(), error: vi.fn(), info: vi.fn() },
}))

const apiGet = vi.mocked(apiClient.get)
const apiPatch = vi.mocked(apiClient.patch)

function apartment(
  id: string,
  title: string,
  status: string
): Record<string, unknown> {
  return {
    id,
    title,
    category: 'Chung cư',
    location: 'Quận 9, TP.HCM',
    price: '15 triệu',
    status,
    isVerified: status === 'available',
    vrUrl: '',
    landlord: { fullName: 'Nguyễn Văn A', phone: '0901234567' },
  }
}

function mockLists(lists: {
  pending?: unknown[]
  approved?: unknown[]
  rejected?: unknown[]
}): void {
  apiGet.mockImplementation((url: string) => {
    if (url.startsWith('/apartments/pending')) {
      return Promise.resolve(lists.pending ?? [])
    }
    if (url.startsWith('/apartments/rejected')) {
      return Promise.resolve(lists.rejected ?? [])
    }
    return Promise.resolve(lists.approved ?? [])
  })
}

describe('PropertyApprovalsView', () => {
  beforeEach(() => {
    vi.clearAllMocks()
    apiPatch.mockResolvedValue({})
  })
  afterEach(() => cleanup())

  it('loads the moderation queue from the staff endpoints, not only the public list', async () => {
    mockLists({
      pending: [apartment('p1', 'Căn hộ chờ duyệt', 'pending')],
    })
    render(<PropertyApprovalsView />)

    expect(await screen.findByText('Căn hộ chờ duyệt')).toBeTruthy()
    const urls = apiGet.mock.calls.map(call => String(call[0]))
    expect(urls.some(url => url.startsWith('/apartments/pending'))).toBe(true)
    expect(urls.some(url => url.startsWith('/apartments/rejected'))).toBe(true)
  })

  it('shows rejected listings under the rejected filter', async () => {
    mockLists({
      pending: [apartment('p1', 'Căn hộ chờ duyệt', 'pending')],
      rejected: [apartment('r1', 'Căn hộ bị từ chối', 'rejected')],
    })
    render(<PropertyApprovalsView />)
    await screen.findByText('Căn hộ chờ duyệt')

    fireEvent.click(screen.getByRole('button', { name: /Đã từ chối/ }))

    expect(await screen.findByText('Căn hộ bị từ chối')).toBeTruthy()
    expect(screen.queryByText('Căn hộ chờ duyệt')).toBeNull()
  })

  it('shows zero pending when nothing is waiting', async () => {
    mockLists({})
    render(<PropertyApprovalsView />)

    expect(await screen.findByText(/Chờ duyệt \(0\)/)).toBeTruthy()
  })

  it('keeps confirm-reject disabled until the reason has 10 characters', async () => {
    mockLists({ pending: [apartment('p1', 'Căn hộ chờ duyệt', 'pending')] })
    render(<PropertyApprovalsView />)
    await screen.findByText('Căn hộ chờ duyệt')
    fireEvent.click(screen.getByRole('button', { name: /Thẩm định/ }))
    fireEvent.click(await screen.findByRole('button', { name: /^Từ chối/ }))

    const confirm = await screen.findByRole('button', {
      name: 'Xác nhận từ chối',
    })
    const reason = screen.getByPlaceholderText(/Ví dụ/)

    fireEvent.change(reason, { target: { value: 'quá ngắn' } })
    expect((confirm as HTMLButtonElement).disabled).toBe(true)

    fireEvent.change(reason, { target: { value: 'Ảnh không rõ ràng' } })
    expect((confirm as HTMLButtonElement).disabled).toBe(false)
  })

  it('approves through the API', async () => {
    mockLists({ pending: [apartment('p1', 'Căn hộ chờ duyệt', 'pending')] })
    render(<PropertyApprovalsView />)
    await screen.findByText('Căn hộ chờ duyệt')
    fireEvent.click(screen.getByRole('button', { name: /Thẩm định/ }))

    fireEvent.click(await screen.findByRole('button', { name: /Phê duyệt/ }))

    await waitFor(() =>
      expect(apiPatch).toHaveBeenCalledWith('/apartments/p1/approve', {})
    )
  })
})
