import { render, screen } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import * as React from 'react'
import { Input } from './input'

describe('Input Component - Density & Sizing Refinement', () => {
  it('renders with compact padding and label (Happy Path)', () => {
    render(
      <Input label="Email đăng nhập" placeholder="example@th-proptech.vn" />
    )
    const label = screen.getByText('Email đăng nhập')
    const input = screen.getByPlaceholderText('example@th-proptech.vn')

    expect(label).toBeInTheDocument()
    expect(input.className).toContain('py-2')
    expect(input.className).toContain('px-3')
  })

  it('renders with icon and proper padding-left (Edge Case)', () => {
    render(
      <Input
        placeholder="Tìm kiếm"
        icon={<span data-testid="search-icon">🔍</span>}
      />
    )
    const icon = screen.getByTestId('search-icon')
    const input = screen.getByPlaceholderText('Tìm kiếm')

    expect(icon).toBeInTheDocument()
    expect(input.className).toContain('pl-10')
  })

  it('renders error state properly (Negative Scenario)', () => {
    render(<Input label="Số điện thoại" error="Số điện thoại không hợp lệ" />)
    const errorMessage = screen.getByRole('alert')
    const input = screen.getByLabelText('Số điện thoại')

    expect(errorMessage).toHaveTextContent('Số điện thoại không hợp lệ')
    expect(input).toHaveAttribute('aria-invalid', 'true')
    expect(input.className).toContain('border-danger')
  })

  it('handles disabled state correctly', () => {
    render(<Input placeholder="Vô hiệu hóa" disabled />)
    const input = screen.getByPlaceholderText('Vô hiệu hóa')
    expect(input).toBeDisabled()
    expect(input.className).toContain('disabled:opacity-50')
  })

  it('forwards ref properly to HTMLInputElement', () => {
    const ref = React.createRef<HTMLInputElement>()
    render(<Input ref={ref} placeholder="Ref test" />)
    expect(ref.current).not.toBeNull()
    expect(ref.current?.tagName).toBe('INPUT')
  })
})
