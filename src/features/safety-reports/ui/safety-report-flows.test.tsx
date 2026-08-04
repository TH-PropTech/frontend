import { render, waitFor } from '@testing-library/react'
import { beforeEach, describe, expect, it, vi } from 'vitest'
import { MyReportsList } from './my-reports-list'

const mocks = vi.hoisted(() => ({
  getReports: vi.fn(),
  errorToast: vi.fn(),
}))

vi.mock('../api/safety-report-api', () => ({
  getMySafetyReports: mocks.getReports,
}))

vi.mock('@/shared/ui/app-toast', () => ({
  appToast: {
    success: vi.fn(),
    error: mocks.errorToast,
    info: vi.fn(),
  },
}))

describe('MyReportsList', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  it('renders the error state and shared custom toast when loading fails', async () => {
    mocks.getReports.mockRejectedValue(new Error('Reports unavailable'))

    render(<MyReportsList />)

    await waitFor(() => {
      expect(mocks.errorToast).toHaveBeenCalledWith('Reports unavailable')
    })
  })
})
