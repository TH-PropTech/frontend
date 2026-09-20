import { fireEvent, render, screen, waitFor } from '@testing-library/react'
import { beforeEach, describe, expect, it, vi } from 'vitest'
import { ApiClientError } from '@/shared/api/api-client'
import { NotificationBell } from './notification-bell'

const mocks = vi.hoisted(() => ({
  get: vi.fn(),
  patch: vi.fn(),
  post: vi.fn(),
}))

vi.mock('@/shared/api/api-client', async importOriginal => {
  const actual =
    await importOriginal<typeof import('@/shared/api/api-client')>()
  return {
    ...actual,
    apiClient: mocks,
  }
})

describe('NotificationBell API failure states', () => {
  beforeEach(() => {
    window.localStorage.clear()
    window.localStorage.setItem('accessToken', 'token')
    window.localStorage.setItem('user', JSON.stringify({ id: 'user-1' }))
    mocks.get.mockReset()
    mocks.patch.mockReset()
    mocks.post.mockReset()
  })

  it('shows recoverable feedback for a temporary network failure', async () => {
    mocks.get.mockRejectedValue(
      new ApiClientError('Không thể kết nối tới máy chủ API', 0, null)
    )

    render(<NotificationBell isLightHeader />)

    await waitFor(() => expect(mocks.get).toHaveBeenCalled())
    fireEvent.click(screen.getByTitle('Thông báo'))

    expect(
      await screen.findByText(/Không thể kết nối máy chủ thông báo/i)
    ).toBeInTheDocument()
    expect(
      screen.queryByText('Bạn chưa có thông báo nào.')
    ).not.toBeInTheDocument()
  })

  it('shows authentication recovery feedback for unauthorized responses', async () => {
    mocks.get.mockRejectedValue(new ApiClientError('Unauthorized', 401, null))

    render(<NotificationBell isLightHeader />)

    await waitFor(() => expect(mocks.get).toHaveBeenCalled())
    fireEvent.click(screen.getByTitle('Thông báo'))

    expect(
      await screen.findByText(/Phiên đăng nhập không còn hợp lệ/i)
    ).toBeInTheDocument()
  })
})
