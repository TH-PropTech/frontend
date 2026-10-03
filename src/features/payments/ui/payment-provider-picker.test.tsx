import { describe, expect, it, vi } from 'vitest'
import { fireEvent, render, screen } from '@testing-library/react'
import { PaymentProviderPicker } from './payment-provider-picker'
import type { PaymentProviderOption } from '../api/payments-api'

const gateways: PaymentProviderOption[] = [
  { provider: 'vnpay', label: 'VNPAY', simulation: false },
  { provider: 'momo', label: 'MoMo', simulation: false },
  { provider: 'zalopay', label: 'ZaloPay', simulation: false },
  { provider: 'mock-bank', label: 'Mock Bank (sandbox)', simulation: true },
]

describe('PaymentProviderPicker', () => {
  it('renders accessible options and reports the selection', () => {
    const onChange = vi.fn()
    render(
      <PaymentProviderPicker
        providers={gateways}
        value="vnpay"
        onChange={onChange}
      />
    )

    expect(
      screen.getByRole('radiogroup', { name: 'Cổng thanh toán' })
    ).toBeTruthy()
    expect(screen.getByLabelText('VNPAY')).toBeTruthy()
    expect(screen.getByLabelText('MoMo')).toBeTruthy()
    expect(screen.getByText('Mô phỏng')).toBeTruthy()

    fireEvent.click(screen.getByLabelText('ZaloPay'))

    expect(onChange).toHaveBeenCalledWith('zalopay')
  })

  it('is hidden when only the Mock Bank simulation is enabled', () => {
    const { container } = render(
      <PaymentProviderPicker
        providers={[gateways[3] as PaymentProviderOption]}
        value="mock-bank"
        onChange={vi.fn()}
      />
    )

    expect(container.innerHTML).toBe('')
  })
})
