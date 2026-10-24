import { fireEvent, render, screen } from '@testing-library/react'
import { describe, expect, it, vi } from 'vitest'
import { AuthRequiredModal } from './auth-required-modal'

describe('AuthRequiredModal', () => {
  it('renders nothing while closed', () => {
    render(<AuthRequiredModal isOpen={false} onClose={vi.fn()} />)
    expect(screen.queryByRole('dialog')).not.toBeInTheDocument()
  })

  it('shows the default title, message and a login link', () => {
    render(<AuthRequiredModal isOpen onClose={vi.fn()} />)

    expect(screen.getByRole('dialog')).toHaveAccessibleName('Yêu cầu đăng nhập')
    expect(
      screen.getByText(/Vui lòng đăng nhập để tương tác với cộng đồng/)
    ).toBeInTheDocument()
    expect(screen.getByRole('link', { name: 'Đăng nhập' })).toHaveAttribute(
      'href',
      '/login'
    )
  })

  it('accepts a custom title and description', () => {
    render(
      <AuthRequiredModal
        isOpen
        onClose={vi.fn()}
        title="Đăng nhập để lưu"
        description="Bạn cần đăng nhập để lưu căn hộ."
      />
    )

    expect(screen.getByRole('dialog')).toHaveAccessibleName('Đăng nhập để lưu')
    expect(
      screen.getByText('Bạn cần đăng nhập để lưu căn hộ.')
    ).toBeInTheDocument()
    expect(
      screen.queryByText(/tương tác với cộng đồng/)
    ).not.toBeInTheDocument()
  })

  it('closes from the dismiss button', () => {
    const onClose = vi.fn()
    render(<AuthRequiredModal isOpen onClose={onClose} />)

    fireEvent.click(screen.getByRole('button', { name: 'Để sau' }))

    expect(onClose).toHaveBeenCalledOnce()
  })

  it('closes on Escape', () => {
    const onClose = vi.fn()
    render(<AuthRequiredModal isOpen onClose={onClose} />)

    fireEvent.keyDown(screen.getByRole('dialog'), { key: 'Escape' })

    expect(onClose).toHaveBeenCalled()
  })
})
