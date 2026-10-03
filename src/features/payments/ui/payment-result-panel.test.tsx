import { render, screen } from '@testing-library/react'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { beforeEach, describe, expect, it, vi } from 'vitest'
import { getGatewayPaymentResult } from '../api/payments-api'
import { PaymentResultPanel } from './payment-result-panel'

vi.mock('../api/payments-api', () => ({
  getGatewayPaymentResult: vi.fn(),
}))

describe('PaymentResultPanel', () => {
  beforeEach(() => vi.clearAllMocks())

  function renderPanel(txRef: string | null): void {
    render(
      <QueryClientProvider client={new QueryClient()}>
        <PaymentResultPanel txRef={txRef} />
      </QueryClientProvider>
    )
  }

  it('shows paid only when the server confirms the payment target', async () => {
    vi.mocked(getGatewayPaymentResult).mockResolvedValue({
      txRef: 'MOMO-1',
      provider: 'momo',
      paymentType: 'deposit',
      attemptStatus: 'succeeded',
      targetPaid: true,
      contractId: null,
    })

    renderPanel('MOMO-1')

    expect(await screen.findByText('Thanh toán đã được xác nhận')).toBeTruthy()
    expect(getGatewayPaymentResult).toHaveBeenCalledWith('MOMO-1')
  })

  it('does not trust a successful return when the server has not confirmed payment', async () => {
    vi.mocked(getGatewayPaymentResult).mockResolvedValue({
      txRef: 'ZALO-1',
      provider: 'zalopay',
      paymentType: 'deposit',
      attemptStatus: 'pending',
      targetPaid: false,
      contractId: null,
    })

    renderPanel('ZALO-1')

    expect(await screen.findByText('Đang chờ xác nhận thanh toán')).toBeTruthy()
    expect(screen.queryByText('Thanh toán đã được xác nhận')).toBeNull()
  })

  it('shows a failed transaction from server state', async () => {
    vi.mocked(getGatewayPaymentResult).mockResolvedValue({
      txRef: 'MOMO-FAILED',
      provider: 'momo',
      paymentType: 'deposit',
      attemptStatus: 'failed',
      targetPaid: false,
      contractId: 'contract-1',
    })

    renderPanel('MOMO-FAILED')

    expect(await screen.findByText('Thanh toán chưa hoàn tất')).toBeTruthy()
    expect(screen.getByRole('link', { name: 'Về hợp đồng' })).toHaveAttribute(
      'href',
      '/contracts/contract-1'
    )
  })

  it('shows a retryable read error without claiming payment succeeded', async () => {
    vi.mocked(getGatewayPaymentResult).mockRejectedValue(new Error('offline'))

    renderPanel('MOMO-1')

    expect(
      await screen.findByText('Không tải được trạng thái thanh toán')
    ).toBeTruthy()
    expect(screen.queryByText('Thanh toán đã được xác nhận')).toBeNull()
  })

  it('shows a safe fallback when no reference is available', () => {
    renderPanel(null)

    expect(
      screen.getByText('Không tìm thấy giao dịch để kiểm tra')
    ).toBeTruthy()
    expect(getGatewayPaymentResult).not.toHaveBeenCalled()
  })
})
