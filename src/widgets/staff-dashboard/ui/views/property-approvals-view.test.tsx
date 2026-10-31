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
import { toast } from 'sonner'

vi.mock('@/shared/api/api-client', () => ({
  apiClient: { get: vi.fn(), patch: vi.fn() },
}))

vi.mock('@/features/listing-freshness', () => ({
  ListingReviewQueue: () => null,
}))

vi.mock('sonner', () => ({
  toast: { success: vi.fn(), error: vi.fn(), info: vi.fn() },
}))

const apiGet = vi.mocked(apiClient.get)
const apiPatch = vi.mocked(apiClient.patch)
const toastError = vi.mocked(toast.error)
const toastSuccess = vi.mocked(toast.success)
const toastInfo = vi.mocked(toast.info)

function apartment(
  id: string,
  title: string,
  status: string,
  extra: Record<string, unknown> = {}
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
    images360: [],
    gallery: [],
    documents: [],
    landlord: { fullName: 'Nguyễn Văn A', phone: '0901234567' },
    ...extra,
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

  it('does not put rented apartments into the pending queue', async () => {
    mockLists({
      pending: [],
      approved: [apartment('rented1', 'Căn hộ đã thuê', 'rented')],
      rejected: [],
    })
    render(<PropertyApprovalsView />)

    expect(await screen.findByText('Chờ duyệt (0)')).toBeTruthy()
    expect(screen.queryByText('Căn hộ đã thuê')).toBeNull()

    // When switching to 'all' tab, it shows with label 'Đang cho thuê'
    fireEvent.click(screen.getByRole('button', { name: 'Tất cả' }))
    expect(await screen.findByText('Căn hộ đã thuê')).toBeTruthy()
    expect(screen.getByText('Đang cho thuê')).toBeTruthy()
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
    fireEvent.click(screen.getByRole('button', { name: /Thẩm định & Duyệt/ }))
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

  it('approves through the API successfully', async () => {
    mockLists({ pending: [apartment('p1', 'Căn hộ chờ duyệt', 'pending')] })
    render(<PropertyApprovalsView />)
    await screen.findByText('Căn hộ chờ duyệt')
    fireEvent.click(screen.getByRole('button', { name: /Thẩm định & Duyệt/ }))

    fireEvent.click(await screen.findByRole('button', { name: /Phê duyệt/ }))

    await waitFor(() =>
      expect(apiPatch).toHaveBeenCalledWith('/apartments/p1/approve', {})
    )
    expect(toastSuccess).toHaveBeenCalledWith(
      'Đã phê duyệt tin đăng căn hộ thành công!'
    )
  })

  it('rejects through the API with valid reason', async () => {
    mockLists({ pending: [apartment('p1', 'Căn hộ chờ duyệt', 'pending')] })
    render(<PropertyApprovalsView />)
    await screen.findByText('Căn hộ chờ duyệt')
    fireEvent.click(screen.getByRole('button', { name: /Thẩm định & Duyệt/ }))
    fireEvent.click(await screen.findByRole('button', { name: /^Từ chối/ }))

    const reason = screen.getByPlaceholderText(/Ví dụ/)
    fireEvent.change(reason, {
      target: { value: 'Giấy tờ pháp lý không rõ ràng' },
    })

    fireEvent.click(screen.getByRole('button', { name: 'Xác nhận từ chối' }))

    await waitFor(() =>
      expect(apiPatch).toHaveBeenCalledWith('/apartments/p1/reject', {
        rejectedReason: 'Giấy tờ pháp lý không rõ ràng',
      })
    )
    expect(toastInfo).toHaveBeenCalledWith('Đã từ chối tin đăng căn hộ.')
  })

  it('handles 400 invalid status error by reloading list and notifying user', async () => {
    mockLists({
      pending: [apartment('p1', 'Căn hộ đã đổi trạng thái', 'pending')],
    })
    apiPatch.mockRejectedValueOnce({
      statusCode: 400,
      message: 'Chỉ có thể duyệt bài đăng đang chờ duyệt',
    })

    render(<PropertyApprovalsView />)
    await screen.findByText('Căn hộ đã đổi trạng thái')
    fireEvent.click(screen.getByRole('button', { name: /Thẩm định & Duyệt/ }))
    fireEvent.click(await screen.findByRole('button', { name: /Phê duyệt/ }))

    await waitFor(() => {
      expect(toastError).toHaveBeenCalledWith(
        'Tin này đã được xử lý hoặc không còn ở trạng thái chờ duyệt.'
      )
    })
    // Modal closes and properties reload
    expect(
      screen.queryByRole('heading', { level: 4, name: /Thông tin căn hộ/i })
    ).toBeNull()
  })

  it('keeps modal open on network error during approval', async () => {
    mockLists({ pending: [apartment('p1', 'Căn hộ chờ duyệt', 'pending')] })
    apiPatch.mockRejectedValueOnce(
      new Error('Network error connecting to host')
    )

    render(<PropertyApprovalsView />)
    await screen.findByText('Căn hộ chờ duyệt')
    fireEvent.click(screen.getByRole('button', { name: /Thẩm định & Duyệt/ }))
    fireEvent.click(await screen.findByRole('button', { name: /Phê duyệt/ }))

    await waitFor(() => {
      expect(toastError).toHaveBeenCalledWith(
        'Network error connecting to host'
      )
    })
    // Modal remains open so user can retry
    expect(
      screen.getByRole('heading', { level: 4, name: /Thông tin căn hộ/i })
    ).toBeTruthy()
  })

  it('displays empty 360 state and empty legal documents message', async () => {
    mockLists({
      pending: [
        apartment('p1', 'Căn hộ không có tài liệu', 'pending', {
          images360: [],
          vrUrl: '',
          documents: [],
        }),
      ],
    })
    render(<PropertyApprovalsView />)
    await screen.findByText('Căn hộ không có tài liệu')
    fireEvent.click(screen.getByRole('button', { name: /Thẩm định & Duyệt/ }))

    expect(await screen.findByText('Chưa có ảnh 360°')).toBeTruthy()
    expect(
      screen.getByText('Chưa có hồ sơ pháp lý đính kèm trong hệ thống')
    ).toBeTruthy()
    expect(screen.queryByText('Ảnh quét đạt tiêu chuẩn')).toBeNull()
  })
})
