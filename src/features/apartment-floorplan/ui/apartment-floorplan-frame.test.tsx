import { act, fireEvent, render, screen } from '@testing-library/react'
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'
import type { FloorplanConfig } from '../model/floorplan-config'
import { ApartmentFloorplanFrame } from './apartment-floorplan-frame'

const LOAD_TIMEOUT_MS = 10_000

const config: FloorplanConfig = {
  version: 1,
  apartmentId: 'apt-1',
  bedrooms: 2,
  bathrooms: 2,
  areaM2: 75,
  furnishing: 'full',
}

describe('ApartmentFloorplanFrame', () => {
  beforeEach(() => {
    vi.useFakeTimers()
  })

  afterEach(() => {
    vi.useRealTimers()
  })

  it('times out again after the user retries', () => {
    render(<ApartmentFloorplanFrame config={config} onClose={() => {}} />)

    act(() => {
      vi.advanceTimersByTime(LOAD_TIMEOUT_MS)
    })
    expect(screen.getByText('Mã lỗi: FRAME_TIMEOUT')).toBeInTheDocument()

    fireEvent.click(screen.getByRole('button', { name: 'Thử lại' }))
    expect(screen.queryByText(/Mã lỗi/)).not.toBeInTheDocument()

    act(() => {
      vi.advanceTimersByTime(LOAD_TIMEOUT_MS)
    })
    expect(screen.getByText('Mã lỗi: FRAME_TIMEOUT')).toBeInTheDocument()
  })

  it('expands to the full window when the viewer asks and collapses on Escape', () => {
    render(<ApartmentFloorplanFrame config={config} onClose={() => {}} />)
    const frame = screen.getByTitle('Sơ đồ 3D minh hoạ') as HTMLIFrameElement
    expect(frame).toHaveAttribute('allowfullscreen')
    const container = frame.parentElement?.parentElement as HTMLElement
    expect(container.className).not.toContain('fixed')

    act(() => {
      window.dispatchEvent(
        new MessageEvent('message', {
          data: { version: 1, type: 'FLOORPLAN_EXPAND_TOGGLE' },
          origin: window.location.origin,
          source: frame.contentWindow,
        })
      )
    })
    expect(container.className).toContain('fixed inset-0')

    act(() => {
      window.dispatchEvent(new KeyboardEvent('keydown', { key: 'Escape' }))
    })
    expect(container.className).not.toContain('fixed')
  })
})
