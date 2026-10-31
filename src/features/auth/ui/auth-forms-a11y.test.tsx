import { describe, it, expect, vi } from 'vitest'
import { render } from '@testing-library/react'
import * as React from 'react'
import { LoginForm } from './login-form'
import { RegisterForm } from './register-form'
import { ForgotPasswordForm } from './forgot-password-form'

vi.mock('next/navigation', () => ({
  useRouter: () => ({ push: vi.fn(), replace: vi.fn() }),
  useSearchParams: () => new URLSearchParams(),
}))
vi.mock('@/shared/api/api-client', () => ({
  apiClient: { post: vi.fn(), get: vi.fn() },
}))
vi.mock('sonner', () => ({
  toast: { success: vi.fn(), error: vi.fn(), info: vi.fn() },
}))

// Class contract: jsdom không áp CSS nên chỉ kiểm tra class kích thước/màu.
const forms = [
  ['đăng nhập', <LoginForm key="l" />],
  ['đăng ký', <RegisterForm key="r" />],
  ['quên mật khẩu', <ForgotPasswordForm key="f" />],
] as const

describe.each(forms)('form %s', (_name, element) => {
  it('mọi ô nhập cao tối thiểu 44px', () => {
    const { container } = render(element)
    const inputs = container.querySelectorAll('input:not([type="checkbox"])')
    expect(inputs.length).toBeGreaterThan(0)
    for (const input of inputs) {
      expect(input.className).toContain('min-h-11')
    }
  })

  it('nút chính cao tối thiểu 44px và giữ màu điều khiển mặc định (đủ tương phản AA)', () => {
    const { container } = render(element)
    const submit = container.querySelector('button[type="submit"]')
    expect(submit).not.toBeNull()
    expect(submit!.className).toContain('bg-control')
    expect(submit!.className).not.toMatch(/(^|\s)bg-primary(\s|$)/)
    expect(submit!.className).toContain('min-h-11')
  })
})
