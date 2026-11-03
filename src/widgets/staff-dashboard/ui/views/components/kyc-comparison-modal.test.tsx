import { fireEvent, render, screen } from '@testing-library/react'
import { describe, expect, it, vi } from 'vitest'
import { KycComparisonModal } from './kyc-comparison-modal'
import type { KycRecord } from '../kyc-approvals-view'

vi.mock('@/shared/api/api-client', () => ({
  apiClient: {
    getBlob: vi.fn().mockRejectedValue(new Error('media unavailable')),
  },
}))

vi.mock('next/image', () => ({
  default: (props: React.ComponentProps<'img'>) => <img alt="" {...props} />,
}))

const record: KycRecord = {
  id: 'kyc-001',
  name: 'Nguyễn Văn Đức',
  email: 'duc@example.com',
  cccdNumber: '035098001234',
  dob: '11.02.1998',
  gender: 'Nam',
  hometown: 'Hà Nam',
  address: 'Thanh Liêm, Hà Nam',
  ocrScore: null,
  submittedAt: '2026-09-13',
  status: 'pending',
}

describe('KycComparisonModal', () => {
  it('shows both document sides, compact OCR fields, and fixed review actions', () => {
    render(
      <KycComparisonModal
        selectedRecord={record}
        onClose={vi.fn()}
        onVerify={vi.fn().mockResolvedValue(undefined)}
        onShowReject={vi.fn()}
      />
    )

    expect(screen.getByText('Mặt trước CCCD')).toBeInTheDocument()
    expect(screen.getByText('Mặt sau CCCD')).toBeInTheDocument()
    expect(screen.getByText('Chưa có điểm OCR')).toBeInTheDocument()
    expect(
      screen.getByRole('button', { name: 'Yêu cầu chụp lại' })
    ).toBeInTheDocument()
    expect(
      screen.getByRole('button', { name: 'Xác nhận KYC' })
    ).toBeInTheDocument()
    // Shows label indicating fallback mockups are used
    expect(
      screen.getAllByText('Bản dựng từ dữ liệu OCR').length
    ).toBeGreaterThanOrEqual(1)
  })

  it('shows face match, liveness and spoof score when recorded', () => {
    render(
      <KycComparisonModal
        selectedRecord={{
          ...record,
          face: { match: true, liveness: false, spoofScore: 0.73 },
        }}
        onClose={vi.fn()}
        onVerify={vi.fn().mockResolvedValue(undefined)}
        onShowReject={vi.fn()}
      />
    )

    expect(screen.getByText(/Khuôn mặt khớp/)).toBeInTheDocument()
    expect(screen.getByText(/Nghi ngờ giả mạo/)).toBeInTheDocument()
    expect(screen.getByText('Điểm giả mạo: 0.73')).toBeInTheDocument()
  })

  it('marks legacy records without selfie as not recorded', () => {
    render(
      <KycComparisonModal
        selectedRecord={record}
        onClose={vi.fn()}
        onVerify={vi.fn().mockResolvedValue(undefined)}
        onShowReject={vi.fn()}
      />
    )

    expect(
      screen.getByText(/Chưa ghi nhận kết quả khuôn mặt/)
    ).toBeInTheDocument()
  })

  it('displays "Hình ảnh CCCD" header when no selfie is available', () => {
    render(
      <KycComparisonModal
        selectedRecord={record}
        onClose={vi.fn()}
        onVerify={vi.fn().mockResolvedValue(undefined)}
        onShowReject={vi.fn()}
      />
    )
    expect(
      screen.getByRole('heading', { level: 3, name: 'Hình ảnh CCCD' })
    ).toBeInTheDocument()
    expect(screen.queryByText(/& selfie chân dung/i)).toBeNull()
  })

  it('warns when CCCD number is not 12 numeric digits', () => {
    const invalidRecord: KycRecord = {
      ...record,
      cccdNumber: '03509800s',
    }
    render(
      <KycComparisonModal
        selectedRecord={invalidRecord}
        onClose={vi.fn()}
        onVerify={vi.fn().mockResolvedValue(undefined)}
        onShowReject={vi.fn()}
      />
    )

    expect(
      screen.getByText('Số CCCD không đúng định dạng 12 chữ số')
    ).toBeInTheDocument()
    // Review controls remain available
    expect(
      screen.getByRole('button', { name: 'Yêu cầu chụp lại' })
    ).toBeInTheDocument()
  })

  it('keeps review controls connected to their callbacks', () => {
    const onClose = vi.fn()
    const onVerify = vi.fn().mockResolvedValue(undefined)
    const onShowReject = vi.fn()
    render(
      <KycComparisonModal
        selectedRecord={record}
        onClose={onClose}
        onVerify={onVerify}
        onShowReject={onShowReject}
      />
    )

    fireEvent.click(
      screen.getByRole('button', { name: 'Đóng cửa sổ xác minh KYC' })
    )
    fireEvent.click(screen.getByRole('button', { name: 'Yêu cầu chụp lại' }))
    fireEvent.click(screen.getByRole('button', { name: 'Xác nhận KYC' }))

    expect(onClose).toHaveBeenCalledOnce()
    expect(onShowReject).toHaveBeenCalledOnce()
    expect(onVerify).toHaveBeenCalledWith(record.id)
  })

  it('hides the confirm / retake actions when the user may only view', () => {
    render(
      <KycComparisonModal
        selectedRecord={record}
        onClose={vi.fn()}
        onVerify={vi.fn().mockResolvedValue(undefined)}
        onShowReject={vi.fn()}
        canReview={false}
      />
    )
    expect(screen.getByText('Mặt trước CCCD')).toBeInTheDocument()
    expect(screen.queryByRole('button', { name: 'Xác nhận KYC' })).toBeNull()
    expect(
      screen.queryByRole('button', { name: 'Yêu cầu chụp lại' })
    ).toBeNull()
  })
})
