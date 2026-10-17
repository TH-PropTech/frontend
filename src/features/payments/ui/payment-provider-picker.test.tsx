import { useState } from 'react'
import { describe, expect, it, vi } from 'vitest'
import { fireEvent, render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
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
  { provider: 'mocbank', label: 'Mộc Bank (sandbox)', simulation: false },
  { provider: 'mock-bank', label: 'Mock Bank (sandbox)', simulation: true },
]

function PaymentProviderPickerHarness() {
  const [value, setValue] = useState<PaymentProviderOption['provider']>('vnpay')

  return (
    <PaymentProviderPicker
      providers={gateways}
      value={value}
      onChange={setValue}
    />
  )
}

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
    // getByRole dùng accessible-name computation, bỏ qua phần aria-hidden
    // (huy hiệu chữ VN/M/Z cạnh tên cổng), khác getByLabelText vốn so khớp
    // nguyên textContent của <label>.
    expect(screen.getByRole('radio', { name: 'VNPAY' })).toBeTruthy()
    expect(screen.getByRole('radio', { name: 'MoMo' })).toBeTruthy()
    expect(screen.getByText('Mô phỏng')).toBeTruthy()

    fireEvent.click(screen.getByRole('radio', { name: 'ZaloPay' }))

    expect(onChange).toHaveBeenCalledWith('zalopay')

    fireEvent.click(screen.getByRole('radio', { name: 'Mộc Bank (sandbox)' }))

    expect(onChange).toHaveBeenCalledWith('mocbank')
  })

  it('renders token-based provider visuals without changing accessible names', () => {
    render(
      <PaymentProviderPicker
        providers={gateways}
        value="vnpay"
        onChange={vi.fn()}
      />
    )

    const mockBankVisual = screen.getByTestId(
      'payment-provider-visual-mock-bank'
    )
    expect(mockBankVisual).toHaveAttribute('aria-hidden', 'true')
    expect(mockBankVisual).toHaveClass('bg-[var(--primary-soft)]')
    expect(
      screen.getByRole('radio', { name: 'Mock Bank (sandbox)' })
    ).toBeInTheDocument()
    expect(
      screen.queryByRole('radio', { name: /MB Mock Bank/i })
    ).not.toBeInTheDocument()
    expect(screen.queryByText(/^mock-bank$/i)).not.toBeInTheDocument()
  })

  it('shows a non-color selected indicator and keeps responsive touch targets', () => {
    render(
      <PaymentProviderPicker
        providers={gateways}
        value="vnpay"
        onChange={vi.fn()}
      />
    )

    const selectedCard = screen.getByTestId('payment-provider-card-vnpay')
    expect(selectedCard).toHaveClass('min-h-16')
    expect(selectedCard).toHaveClass('bg-[var(--primary-soft)]')
    expect(selectedCard).toHaveClass('focus-within:ring-2')
    expect(screen.getByTestId('payment-provider-selected-vnpay')).toBeVisible()
    expect(
      screen.getByRole('radiogroup', { name: 'Cổng thanh toán' })
    ).toHaveClass('grid-cols-[repeat(auto-fit,minmax(20rem,1fr))]')
  })

  it('supports arrow-key selection through the semantic radio group', async () => {
    const user = userEvent.setup()
    render(<PaymentProviderPickerHarness />)

    const vnpay = screen.getByRole('radio', { name: 'VNPAY' })
    const momo = screen.getByRole('radio', { name: 'MoMo' })
    await user.click(vnpay)
    await user.keyboard('{ArrowRight}')
    await user.keyboard(' ')

    expect(momo).toBeChecked()
    expect(screen.getByTestId('payment-provider-selected-momo')).toBeVisible()
  })

  it('is hidden when only the Mock Bank simulation is enabled', () => {
    const { container } = render(
      <PaymentProviderPicker
        providers={[gateways[4] as PaymentProviderOption]}
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
