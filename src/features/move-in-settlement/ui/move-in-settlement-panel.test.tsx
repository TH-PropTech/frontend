import { fireEvent, render, screen, waitFor } from '@testing-library/react'
import { describe, expect, it, vi } from 'vitest'
import type { MoveInSettlementView } from '@/features/contracts/api/contracts-api'
import { MoveInSettlementPanel } from './move-in-settlement-panel'
import * as api from '../api/move-in-settlement-api'

vi.mock('../api/move-in-settlement-api', () => ({
  updateHandover: vi.fn(),
  confirmHandover: vi.fn(),
}))

const settlement: MoveInSettlementView = {
  id: 'settle-1',
  status: 'pending',
  total: 44_000_000,
  dueAt: '2026-10-01T00:00:00.000Z',
  statementHash: 'statement-hash',
  lines: [{ kind: 'FIRST_RENT', amount: 14_000_000, paymentId: 'pay-1' }],
  handover: {
    revision: 2,
    handedOverAt: '2026-10-01T00:00:00.000Z',
    meterReadings: { electricity: 100, water: 25 },
    keyCount: 2,
    inventoryReference: null,
    notes: null,
    handoverHash: 'handover-hash',
    tenantConfirmation: null,
    landlordConfirmation: null,
    completedAt: null,
  },
}

describe('MoveInSettlementPanel', () => {
  it('shows invoices action and lets tenant confirm a recorded handover', async () => {
    vi.mocked(api.confirmHandover).mockResolvedValue(settlement)
    const onOpenInvoices = vi.fn()
    const onRefresh = vi.fn()
    render(
      <MoveInSettlementPanel
        settlement={settlement}
        role="tenant"
        onRefresh={onRefresh}
        onOpenInvoices={onOpenInvoices}
      />
    )

    expect(screen.getByText(/44\.000\.000/)).toBeInTheDocument()
    fireEvent.click(
      screen.getByRole('button', { name: 'Mở hóa đơn cần thanh toán' })
    )
    expect(onOpenInvoices).toHaveBeenCalledOnce()
    fireEvent.click(screen.getByRole('button', { name: 'Xác nhận biên bản' }))
    await waitFor(() =>
      expect(api.confirmHandover).toHaveBeenCalledWith(
        'settle-1',
        'handover-hash',
        'tenant'
      )
    )
    expect(onRefresh).toHaveBeenCalledOnce()
  })

  it('lets landlord record a handover after settlement is paid', async () => {
    vi.mocked(api.updateHandover).mockResolvedValue(settlement)
    render(
      <MoveInSettlementPanel
        settlement={{ ...settlement, status: 'paid', handover: null }}
        role="landlord"
        onRefresh={vi.fn()}
        onOpenInvoices={vi.fn()}
      />
    )
    fireEvent.change(screen.getByLabelText('Thời gian bàn giao'), {
      target: { value: '2026-10-01T10:00' },
    })
    fireEvent.change(screen.getByLabelText('Chỉ số điện'), {
      target: { value: '100' },
    })
    fireEvent.change(screen.getByLabelText('Chỉ số nước'), {
      target: { value: '25' },
    })
    fireEvent.change(screen.getByLabelText('Số chìa khóa'), {
      target: { value: '2' },
    })
    fireEvent.click(
      screen.getByRole('button', { name: 'Ghi biên bản bàn giao' })
    )
    await waitFor(() =>
      expect(api.updateHandover).toHaveBeenCalledWith(
        'settle-1',
        expect.objectContaining({ electricity: 100, water: 25, keyCount: 2 })
      )
    )
  })
})
