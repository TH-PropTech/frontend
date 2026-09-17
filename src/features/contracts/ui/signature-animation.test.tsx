import { render, screen, act } from '@testing-library/react'
import { describe, expect, it, vi, beforeEach, afterEach } from 'vitest'
import { SignatureAnimation } from './signature-animation'

describe('SignatureAnimation', () => {
  beforeEach(() => {
    vi.useFakeTimers()
  })

  afterEach(() => {
    vi.useRealTimers()
  })

  it('renders cursive signature container and signer name', () => {
    render(<SignatureAnimation signerName="Trần Thị Thuê" role="tenant" />)
    expect(screen.getByTestId('signature-animation')).toBeInTheDocument()
    expect(screen.getByText('Trần Thị Thuê')).toBeInTheDocument()
    expect(screen.getByText('Bên thuê (Bên B)')).toBeInTheDocument()
    expect(screen.getByTestId('digital-seal-stamp')).toBeInTheDocument()
  })

  it('triggers onComplete callback after duration', () => {
    const onComplete = vi.fn()
    render(
      <SignatureAnimation
        signerName="Trần Thị Thuê"
        durationMs={2000}
        onComplete={onComplete}
      />
    )

    expect(onComplete).not.toHaveBeenCalled()
    act(() => {
      vi.advanceTimersByTime(2100)
    })
    expect(onComplete).toHaveBeenCalledTimes(1)
  })
})
