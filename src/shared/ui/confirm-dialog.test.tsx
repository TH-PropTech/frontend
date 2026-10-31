import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import { describe, it, expect, vi } from 'vitest'
import { ConfirmDialog } from './confirm-dialog'

describe('ConfirmDialog', () => {
  it('renders title, description and buttons when open', () => {
    render(
      <ConfirmDialog
        open={true}
        title="Xác nhận xóa"
        description="Hành động này không thể hoàn tác."
        confirmText="Xóa ngay"
        cancelText="Bỏ qua"
        onConfirm={vi.fn()}
      />
    )

    expect(screen.getByText('Xác nhận xóa')).toBeInTheDocument()
    expect(
      screen.getByText('Hành động này không thể hoàn tác.')
    ).toBeInTheDocument()
    expect(screen.getByRole('button', { name: 'Xóa ngay' })).toBeInTheDocument()
    expect(screen.getByRole('button', { name: 'Bỏ qua' })).toBeInTheDocument()
  })

  it('does not render when open is false', () => {
    render(
      <ConfirmDialog open={false} title="Xác nhận xóa" onConfirm={vi.fn()} />
    )

    expect(screen.queryByText('Xác nhận xóa')).not.toBeInTheDocument()
  })

  it('calls onConfirm when confirm button clicked', async () => {
    const handleConfirm = vi.fn().mockResolvedValue(undefined)
    const handleOpenChange = vi.fn()

    render(
      <ConfirmDialog
        open={true}
        onOpenChange={handleOpenChange}
        title="Xác nhận duyệt"
        onConfirm={handleConfirm}
      />
    )

    fireEvent.click(screen.getByRole('button', { name: 'Xác nhận' }))

    await waitFor(() => {
      expect(handleConfirm).toHaveBeenCalledTimes(1)
      expect(handleOpenChange).toHaveBeenCalledWith(false)
    })
  })

  it('calls onCancel when cancel button clicked', () => {
    const handleCancel = vi.fn()
    const handleOpenChange = vi.fn()

    render(
      <ConfirmDialog
        open={true}
        onOpenChange={handleOpenChange}
        onCancel={handleCancel}
        title="Xác nhận"
        onConfirm={vi.fn()}
      />
    )

    fireEvent.click(screen.getByRole('button', { name: 'Hủy' }))

    expect(handleCancel).toHaveBeenCalledTimes(1)
    expect(handleOpenChange).toHaveBeenCalledWith(false)
  })
})
