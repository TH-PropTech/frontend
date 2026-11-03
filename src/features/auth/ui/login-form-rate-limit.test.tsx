import { describe, it, expect, vi, beforeEach } from 'vitest'
import { fireEvent, render, screen, waitFor } from '@testing-library/react'
import * as React from 'react'
import { toast } from 'sonner'
import { apiClient } from '@/shared/api/api-client'
import { ApiClientError } from '@/shared/api/api-client'
import { LoginForm } from './login-form'

vi.mock('next/navigation', () => ({
  useRouter: () => ({ push: vi.fn(), replace: vi.fn() }),
  useSearchParams: () => new URLSearchParams(),
}))
vi.mock('@/shared/api/api-client', async () => {
  const actual = await vi.importActual<
    typeof import('@/shared/api/api-client')
  >('@/shared/api/api-client')
  return { ...actual, apiClient: { post: vi.fn(), get: vi.fn() } }
})
vi.mock('sonner', () => ({
  toast: { success: vi.fn(), error: vi.fn(), info: vi.fn() },
}))

function submitLogin(): void {
  fireEvent.change(
    screen.getByPlaceholderText('email@example.com hoặc admin'),
    {
      target: { value: 'user@example.com' },
    }
  )
  fireEvent.change(screen.getByPlaceholderText('••••••••'), {
    target: { value: 'secret-pass' },
  })
  fireEvent.click(screen.getByRole('button', { name: 'Đăng nhập' }))
}

describe('LoginForm rate limit', () => {
  beforeEach(() => {
    vi.mocked(apiClient.post).mockReset()
    vi.mocked(toast.error).mockReset()
  })

  it('shows one message with the reason and the wait, and locks the submit button', async () => {
    vi.mocked(apiClient.post).mockRejectedValue(
      new ApiClientError('Quá nhanh', 429, {
        code: 'HTTP_429',
        message: 'Quá nhanh',
        details: { code: 'RATE_LIMITED', scope: 'auth', retryAfterSeconds: 30 },
      })
    )
    render(<LoginForm />)
    submitLogin()

    const alert = await screen.findByRole('alert')
    expect(alert.textContent).toBe(
      'Bạn đã thử đăng nhập hoặc xác thực quá nhiều lần. Vui lòng thử lại sau 30 giây.'
    )
    expect(toast.error).not.toHaveBeenCalled()
    await waitFor(() => {
      const submit = screen.getByRole('button', { name: 'Đăng nhập' })
      expect((submit as HTMLButtonElement).disabled).toBe(true)
    })
  })

  it('keeps the toast and inline message for other errors', async () => {
    vi.mocked(apiClient.post).mockRejectedValue(
      new ApiClientError('Sai mật khẩu', 401, {
        code: 'HTTP_401',
        message: 'Sai mật khẩu',
      })
    )
    render(<LoginForm />)
    submitLogin()

    expect(await screen.findByText('Sai mật khẩu')).toBeTruthy()
    expect(toast.error).toHaveBeenCalledWith('Sai mật khẩu')
    const submit = screen.getByRole('button', { name: 'Đăng nhập' })
    expect((submit as HTMLButtonElement).disabled).toBe(false)
  })
})
