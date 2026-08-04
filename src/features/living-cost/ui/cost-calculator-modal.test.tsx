import { fireEvent, render, screen, waitFor } from '@testing-library/react'
import { beforeEach, describe, expect, it, vi } from 'vitest'
import { CostCalculatorModal } from './cost-calculator-modal'

const mocks = vi.hoisted(() => ({
  calculate: vi.fn(),
  errorToast: vi.fn(),
}))

vi.mock('../api/living-cost-api', () => ({
  calculateLivingCost: mocks.calculate,
}))

vi.mock('@/shared/ui/app-toast', () => ({
  appToast: {
    success: vi.fn(),
    error: mocks.errorToast,
    info: vi.fn(),
  },
}))

describe('CostCalculatorModal', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  it('keeps the calculator open and shows a custom toast on API failure', async () => {
    mocks.calculate.mockRejectedValue(new Error('Calculation failed'))
    render(<CostCalculatorModal />)

    fireEvent.click(
      screen.getByRole('button', { name: /tính chi phí sinh hoạt/i })
    )
    fireEvent.click(screen.getByRole('button', { name: /tính toán ngay/i }))

    await waitFor(() => {
      expect(mocks.errorToast).toHaveBeenCalledWith('Calculation failed')
    })
    expect(screen.getByRole('dialog')).toBeTruthy()
  })
})
