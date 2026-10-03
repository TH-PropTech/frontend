import { describe, expect, it, vi } from 'vitest'
import { fireEvent, render, screen } from '@testing-library/react'
import {
  PaymentProviderPicker,
  choiceLimitNote,
} from './payment-provider-picker'
import type { PaymentProviderOption } from '../api/payments-api'

const gateways: PaymentProviderOption[] = [
  { provider: 'vnpay', label: 'VNPAY', simulation: false },
  {
    provider: 'momo',
    label: 'MoMo',
    simulation: false,
    methods: [
      {
        method: 'wallet',
        label: 'Ví MoMo / QR',
        minAmount: 1_000,
        maxAmount: 50_000_000,
      },
      {
        method: 'card',
        label: 'Thẻ Visa / Master / JCB',
        minAmount: 1_000,
        maxAmount: 10_000_000,
      },
    ],
  },
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

  it('shows MoMo methods and dims the one over its limit with a note', () => {
    const onMethod = vi.fn()
    render(
      <PaymentProviderPicker
        providers={gateways}
        value="momo"
        onChange={vi.fn()}
        momoMethod="wallet"
        onMomoMethodChange={onMethod}
        amount={15_000_000}
      />
    )

    const card = screen.getByLabelText(/Thẻ Visa/)
    expect(card.hasAttribute('disabled')).toBe(true)
    expect(screen.getByText(/Vượt hạn mức/)).toBeTruthy()
    expect(screen.getByText(/^Hạn mức/)).toBeTruthy()
    fireEvent.click(card)
    expect(onMethod).not.toHaveBeenCalled()
  })

  it('hides MoMo methods when another gateway is selected', () => {
    render(
      <PaymentProviderPicker
        providers={gateways}
        value="vnpay"
        onChange={vi.fn()}
      />
    )

    expect(screen.queryByLabelText(/Thẻ Visa/)).toBeNull()
  })

  it('explains why the chosen method cannot pay an amount', () => {
    const choice = { provider: 'momo' as const, momoMethod: 'card' as const }

    expect(choiceLimitNote(gateways, choice, 12_000_000)).toMatch(/chỉ nhận/)
    expect(choiceLimitNote(gateways, choice, 5_000_000)).toBeNull()
    expect(
      choiceLimitNote(gateways, { provider: 'vnpay' }, 99_000_000)
    ).toBeNull()
  })
})
