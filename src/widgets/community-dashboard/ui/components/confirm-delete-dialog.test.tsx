import { fireEvent, render, screen } from '@testing-library/react'
import { describe, expect, it, vi } from 'vitest'
import { ConfirmDeleteDialog } from './confirm-delete-dialog'

function renderDialog(
  overrides: Partial<React.ComponentProps<typeof ConfirmDeleteDialog>> = {}
) {
  const handlers = { onOpenChange: vi.fn(), onConfirm: vi.fn() }
  render(
    <ConfirmDeleteDialog
      open
      title="Xóa bài viết này?"
      description="Không thể hoàn tác."
      {...handlers}
      {...overrides}
    />
  )
  return handlers
}

describe('ConfirmDeleteDialog', () => {
  it('renders nothing while closed', () => {
    renderDialog({ open: false })
    expect(screen.queryByRole('alertdialog')).not.toBeInTheDocument()
  })

  it('explains the action and confirms on request', () => {
    const { onConfirm } = renderDialog({ confirmLabel: 'Xóa bài' })

    expect(screen.getByRole('alertdialog')).toHaveAccessibleName(
      'Xóa bài viết này?'
    )
    expect(screen.getByText('Không thể hoàn tác.')).toBeInTheDocument()

    fireEvent.click(screen.getByRole('button', { name: 'Xóa bài' }))
    expect(onConfirm).toHaveBeenCalledOnce()
  })

  it('defaults the confirm label to "Xóa"', () => {
    renderDialog()
    expect(screen.getByRole('button', { name: 'Xóa' })).toBeInTheDocument()
  })

  it('cancels without confirming', () => {
    const { onConfirm, onOpenChange } = renderDialog()

    fireEvent.click(screen.getByRole('button', { name: 'Hủy' }))

    expect(onOpenChange).toHaveBeenCalledWith(false)
    expect(onConfirm).not.toHaveBeenCalled()
  })

  it('disables the confirm button while a request is pending', () => {
    renderDialog({ isPending: true })
    expect(screen.getByRole('button', { name: 'Xóa' })).toBeDisabled()
  })
})
