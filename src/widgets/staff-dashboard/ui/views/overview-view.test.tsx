import { act, render, screen } from '@testing-library/react'
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'

import { apiClient } from '@/shared/api/api-client'
import { OverviewView } from './overview-view'

vi.mock('@/shared/api/api-client', () => ({
  apiClient: {
    get: vi.fn(),
  },
}))

describe('OverviewView data loading', () => {
  beforeEach(() => {
    vi.useFakeTimers()
    vi.mocked(apiClient.get).mockReturnValue(new Promise(() => undefined))
  })

  afterEach(() => {
    vi.useRealTimers()
    vi.clearAllMocks()
  })

  it('loads dashboard data after the component effect is scheduled', () => {
    render(<OverviewView />)

    expect(apiClient.get).not.toHaveBeenCalled()

    act(() => vi.runOnlyPendingTimers())

    expect(apiClient.get).toHaveBeenCalledWith('/operations/stats')
    expect(apiClient.get).toHaveBeenCalledWith('/operations/chart-data?days=7')
  })

  it('cancels scheduled loading when unmounted immediately', () => {
    const { unmount } = render(<OverviewView />)

    unmount()
    act(() => vi.runOnlyPendingTimers())

    expect(apiClient.get).not.toHaveBeenCalled()
  })

  it('renders confirmation rate accurately without negative badge when all are pending', async () => {
    vi.mocked(apiClient.get).mockImplementation((url: string) => {
      if (url === '/operations/stats') {
        return Promise.resolve({
          bookings: {
            total: 2,
            pending: 2,
            confirmed: 0,
            cancelled: 0,
            completed: 0,
          },
          kyc: { total: 0, pending: 0, verified: 0, rejected: 0 },
          apartments: { total: 0, pending: 0, available: 0, rejected: 0 },
          tickets: { total: 0, open: 0, inProgress: 0, resolved: 0 },
        })
      }
      return Promise.resolve({ trend: [], statusBreakdown: [] })
    })

    render(<OverviewView />)
    await act(async () => {
      vi.runAllTimers()
    })

    expect(screen.getByText('Tỷ lệ đã xác nhận')).toBeTruthy()
    expect(screen.getByText('0%')).toBeTruthy()
    expect(screen.getByText('Chờ xử lý')).toBeTruthy()
    expect(screen.queryByText('Cần cải thiện')).toBeNull()
  })

  it('renders "Chưa có dữ liệu" when total bookings is 0', async () => {
    vi.mocked(apiClient.get).mockImplementation((url: string) => {
      if (url === '/operations/stats') {
        return Promise.resolve({
          bookings: {
            total: 0,
            pending: 0,
            confirmed: 0,
            cancelled: 0,
            completed: 0,
          },
          kyc: { total: 0, pending: 0, verified: 0, rejected: 0 },
          apartments: { total: 0, pending: 0, available: 0, rejected: 0 },
          tickets: { total: 0, open: 0, inProgress: 0, resolved: 0 },
        })
      }
      return Promise.resolve({ trend: [], statusBreakdown: [] })
    })

    render(<OverviewView />)
    await act(async () => {
      vi.runAllTimers()
    })

    expect(screen.getByText('Tỷ lệ đã xác nhận')).toBeTruthy()
    expect(screen.getByText('Chưa có dữ liệu')).toBeTruthy()
  })
})
