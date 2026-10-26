import { fireEvent, render, screen } from '@testing-library/react'
import { describe, expect, it, vi } from 'vitest'
import { RejectBookingDialog } from './reject-booking-dialog'

function setup(
  props: Partial<React.ComponentProps<typeof RejectBookingDialog>> = {}
) {
  const handlers = {
    onReasonChange: vi.fn(),
    onConfirm: vi.fn(),
    onCancel: vi.fn(),
  }
  render(
    <RejectBookingDialog open reason="" busy={false} {...handlers} {...props} />
  )
  return handlers
}

describe('RejectBookingDialog', () => {
  it('hiện tiêu đề và ô nhập lý do khi mở', () => {
    setup()

    expect(
      screen.getByRole('dialog', { name: 'Từ chối lịch hẹn' })
    ).toBeInTheDocument()
    expect(screen.getByLabelText('Lý do từ chối')).toBeInTheDocument()
  })

  it('không dựng gì khi đóng', () => {
    setup({ open: false })

    expect(screen.queryByRole('dialog')).not.toBeInTheDocument()
  })

  it('báo thay đổi lý do', () => {
    const { onReasonChange } = setup()

    fireEvent.change(screen.getByLabelText('Lý do từ chối'), {
      target: { value: 'Đã cho thuê' },
    })

    expect(onReasonChange).toHaveBeenCalledWith('Đã cho thuê')
  })

  it('hiện lý do đang nhập', () => {
    setup({ reason: 'Bận việc' })

    expect(screen.getByLabelText('Lý do từ chối')).toHaveValue('Bận việc')
  })

  it('xác nhận và hủy bỏ gọi đúng xử lý', () => {
    const { onConfirm, onCancel } = setup()

    fireEvent.click(screen.getByRole('button', { name: 'Xác nhận từ chối' }))
    fireEvent.click(screen.getByRole('button', { name: 'Hủy bỏ' }))

    expect(onConfirm).toHaveBeenCalledTimes(1)
    expect(onCancel).toHaveBeenCalledTimes(1)
  })

  it('vô hiệu hóa nút xác nhận khi đang xử lý', () => {
    setup({ busy: true })

    expect(
      screen.getByRole('button', { name: 'Xác nhận từ chối' })
    ).toBeDisabled()
  })

  it('đóng bằng phím Escape gọi onCancel', () => {
    const { onCancel } = setup()

    fireEvent.keyDown(screen.getByRole('dialog'), { key: 'Escape' })

    expect(onCancel).toHaveBeenCalled()
  })
})
