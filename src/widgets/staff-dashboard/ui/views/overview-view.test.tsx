import { act, render } from '@testing-library/react'
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

  it('does not display OK or 0 on cards when operations/stats fails', async () => {
    vi.mocked(apiClient.get).mockRejectedValue(new Error('Lỗi máy chủ nội bộ'))
    const { container } = render(<OverviewView />)

    await act(async () => {
      vi.runOnlyPendingTimers()
    })

    expect(container.textContent).toContain('Lỗi máy chủ nội bộ')
    expect(container.textContent).not.toContain('OK')
    expect(container.textContent).not.toMatch(/[A-Z]{3,}(_[A-Z0-9]+){2,}/)
  })
})
