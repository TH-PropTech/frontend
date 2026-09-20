import { render, screen } from '@testing-library/react'
import { describe, it, expect, vi } from 'vitest'
import * as React from 'react'
import { Button } from './button'

describe('Button Component - Density & Sizing Refinement', () => {
  it('renders with default compact size and primary variant (Happy Path)', () => {
    render(<Button>Xác nhận</Button>)
    const button = screen.getByRole('button', { name: /xác nhận/i })

    expect(button).toBeInTheDocument()
    expect(button.className).toContain('h-9')
    expect(button.className).toContain('px-3.5')
  })

  it('renders small and large sizes correctly (Boundary Cases)', () => {
    const { rerender } = render(<Button size="sm">Nút nhỏ</Button>)
    let button = screen.getByRole('button', { name: /nút nhỏ/i })
    expect(button.className).toContain('h-7')
    expect(button.className).toContain('px-2.5')

    rerender(<Button size="lg">Nút lớn</Button>)
    button = screen.getByRole('button', { name: /nút lớn/i })
    expect(button.className).toContain('h-10')
    expect(button.className).toContain('px-4')
  })

  it('renders icon button size correctly', () => {
    render(
      <Button size="icon" aria-label="Đóng">
        <span>X</span>
      </Button>
    )
    const button = screen.getByRole('button', { name: /đóng/i })
    expect(button.className).toContain('h-9')
    expect(button.className).toContain('w-9')
  })

  it('renders loading state and disables interaction (Negative Scenario)', () => {
    const handleClick = vi.fn()
    render(
      <Button loading onClick={handleClick}>
        Đang xử lý
      </Button>
    )

    const button = screen.getByRole('button')
    expect(button).toBeDisabled()
    expect(button.className).toContain('disabled:opacity-50')
  })

  it('forwards ref properly to HTMLButtonElement', () => {
    const ref = React.createRef<HTMLButtonElement>()
    render(<Button ref={ref}>Ref Button</Button>)
    expect(ref.current).not.toBeNull()
    expect(ref.current?.tagName).toBe('BUTTON')
  })
})
