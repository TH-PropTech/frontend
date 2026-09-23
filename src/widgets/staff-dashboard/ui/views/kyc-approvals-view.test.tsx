import {
  cleanup,
  fireEvent,
  render,
  screen,
  waitFor,
} from '@testing-library/react'
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'
import { KycApprovalsView } from './kyc-approvals-view'
import { apiClient } from '@/shared/api/api-client'

vi.mock('@/shared/api/api-client', () => ({
  apiClient: {
    get: vi.fn(),
    patch: vi.fn(),
    getBlob: vi.fn().mockRejectedValue(new Error('media unavailable')),
  },
}))

vi.mock('next/image', () => ({
  default: (props: React.ComponentProps<'img'>) => <img alt="" {...props} />,
}))

vi.mock('sonner', () => ({
  toast: {
    success: vi.fn(),
    info: vi.fn(),
    error: vi.fn(),
  },
}))

const response = {
  items: [
    {
      _id: 'kyc-pending',
      userId: 'user-1',
      idCardNumber: '079123456789',
      frontCardUrl: 'front',
      backCardUrl: 'back',
      selfieUrl: 'selfie',
      fullName: 'Nguyễn Văn A',
      dateOfBirth: '01/01/1990',
      gender: 'Nam',
      placeOfOrigin: 'Hà Nội',
      placeOfResidence: 'Hà Nội',
      ocrMatchRate: 96,
      status: 'pending' as const,
      createdAt: '2026-09-20T08:00:00.000Z',
      user: { email: 'a@example.com', phone: '0901234567' },
    },
    {
      _id: 'kyc-verified',
      userId: 'user-2',
      idCardNumber: '079987654321',
      frontCardUrl: 'front-2',
      backCardUrl: 'back-2',
      selfieUrl: 'selfie-2',
      fullName: 'Trần Thị B',
      ocrMatchRate: 99,
      status: 'verified' as const,
      createdAt: '2026-09-19T08:00:00.000Z',
      user: { email: 'b@example.com', phone: '0912345678' },
    },
  ],
  total: 2,
  page: 1,
  limit: 100,
  totalPages: 1,
}

describe('KycApprovalsView', () => {
  beforeEach(() => {
    vi.mocked(apiClient.get).mockResolvedValue(response)
    vi.mocked(apiClient.patch).mockResolvedValue(response.items[0])
  })

  afterEach(() => {
    cleanup()
    vi.clearAllMocks()
  })

  it('loads records, filters status, and searches by name or card number', async () => {
    render(<KycApprovalsView />)

    expect(await screen.findByText('Nguyễn Văn A')).toBeInTheDocument()
    fireEvent.click(screen.getByRole('button', { name: 'Tất cả' }))
    expect(screen.getByText('Trần Thị B')).toBeInTheDocument()

    fireEvent.click(screen.getByRole('button', { name: 'Đã xác minh' }))
    expect(screen.queryByText('Nguyễn Văn A')).not.toBeInTheDocument()
    expect(screen.getByText('Trần Thị B')).toBeInTheDocument()

    const search = screen.getByPlaceholderText('Tìm theo tên hoặc số CCCD')
    fireEvent.change(search, { target: { value: 'Nguyễn' } })

    await waitFor(() => {
      expect(apiClient.get).toHaveBeenLastCalledWith(
        `/kyc?limit=100&search=${encodeURIComponent('Nguyễn')}`
      )
    })
  })

  it('opens the comparison workspace and approves a pending record', async () => {
    render(<KycApprovalsView />)

    await screen.findByText('Nguyễn Văn A')
    fireEvent.click(screen.getByRole('button', { name: 'Đối chiếu & Duyệt' }))
    expect(screen.getByText('Dữ liệu trích xuất từ OCR')).toBeInTheDocument()

    fireEvent.click(screen.getByRole('button', { name: 'Xác nhận KYC' }))

    await waitFor(() => {
      expect(apiClient.patch).toHaveBeenCalledWith('/kyc/kyc-pending/review', {
        status: 'verified',
      })
    })
  })

  it('requires and submits a rejection reason', async () => {
    render(<KycApprovalsView />)

    await screen.findByText('Nguyễn Văn A')
    fireEvent.click(screen.getByRole('button', { name: 'Đối chiếu & Duyệt' }))
    fireEvent.click(screen.getByRole('button', { name: 'Yêu cầu chụp lại' }))

    fireEvent.change(
      screen.getByPlaceholderText(
        'Ví dụ: Ảnh mặt sau của thẻ CCCD bị lóa sáng mất phần mã MRZ...'
      ),
      { target: { value: 'Ảnh CCCD bị lóa' } }
    )
    fireEvent.click(screen.getByRole('button', { name: 'Xác nhận từ chối' }))

    await waitFor(() => {
      expect(apiClient.patch).toHaveBeenCalledWith('/kyc/kyc-pending/review', {
        status: 'rejected',
        rejectedReason: 'Ảnh CCCD bị lóa',
      })
    })
  })
})
