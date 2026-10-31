import { render, screen, fireEvent } from '@testing-library/react'
import { describe, expect, it, vi } from 'vitest'
import { AdminErrorState } from './admin-error-state'

describe('AdminErrorState', () => {
  it('renders alert role and default error message', () => {
    render(<AdminErrorState />)
    const alert = screen.getByRole('alert')
    expect(alert).toBeInTheDocument()
    expect(
      screen.getByText('Không thể tải dữ liệu. Vui lòng thử lại.')
    ).toBeInTheDocument()
  })

  it('renders custom message and title', () => {
    render(
      <AdminErrorState
        title="Lỗi tải hàng đợi"
        message="Không thể kết nối máy chủ hỗ trợ"
      />
    )
    expect(screen.getByText('Lỗi tải hàng đợi')).toBeInTheDocument()
    expect(
      screen.getByText('Không thể kết nối máy chủ hỗ trợ')
    ).toBeInTheDocument()
  })

  it('renders retry button and calls onRetry when clicked', () => {
    const onRetry = vi.fn()
    render(<AdminErrorState onRetry={onRetry} />)

    const retryBtn = screen.getByRole('button', { name: /Thử lại/i })
    expect(retryBtn).toBeInTheDocument()

    fireEvent.click(retryBtn)
    expect(onRetry).toHaveBeenCalledTimes(1)
  })

  it('does not render retry button if onRetry is not provided', () => {
    render(<AdminErrorState />)
    expect(
      screen.queryByRole('button', { name: /Thử lại/i })
    ).not.toBeInTheDocument()
  })
})
