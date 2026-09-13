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
})
