import { render, screen } from '@testing-library/react'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { beforeEach, describe, expect, it, vi } from 'vitest'
import * as api from '../api/move-out-api'
import {
  BANNED_TERMS,
  INTERNAL_CODE,
  makeHandover,
  makeStatement,
} from '../test-fixtures/move-out.fixtures'
import { toMoveOutGates } from '../lib/move-out-gates'
import { MoveOutPanel } from './move-out-panel'

vi.mock('../api/move-out-api', () => ({
  getMoveOutHandover: vi.fn(),
  getDepositStatement: vi.fn(),
}))

const renderPanel = (
  phase: 'awaiting-move-out' | 'awaiting-deposit-settlement' | 'settled'
) =>
  render(
    <QueryClientProvider client={new QueryClient()}>
      <MoveOutPanel
        contractId="c1"
        role="tenant"
        depositAmount={10_000_000}
        phase={phase}
        gates={toMoveOutGates([
          {
            action: 'RESPOND_DEPOSIT_STATEMENT',
            actorRole: 'tenant',
            enabled: false,
            reasonCode: 'STATEMENT_NOT_AWAITING_TENANT',
            stage: 'move-out',
          },
        ])}
      />
    </QueryClientProvider>
  )

describe('MoveOutPanel', () => {
  beforeEach(() => vi.clearAllMocks())

  it.each([
    ['awaiting-move-out', 'Chờ trả nhà'],
    ['awaiting-deposit-settlement', 'Chờ quyết toán cọc'],
    ['settled', 'Đã quyết toán'],
  ] as const)('shows the %s phase as "%s"', async (phase, label) => {
    vi.mocked(api.getMoveOutHandover).mockResolvedValue(null)
    renderPanel(phase)
    expect(await screen.findByText(`Giai đoạn: ${label}`)).toBeDefined()
  })

  it('opens the deposit statement after a completed handover and leaks no codes or banned terms', async () => {
    vi.mocked(api.getMoveOutHandover).mockResolvedValue(
      makeHandover({ status: 'completed', completionReason: 'both-confirmed' })
    )
    vi.mocked(api.getDepositStatement).mockResolvedValue(
      makeStatement({ status: 'refund-recorded' })
    )
    renderPanel('awaiting-deposit-settlement')
    expect(await screen.findByText('Bảng khấu trừ cọc')).toBeDefined()
    const text = document.body.textContent ?? ''
    expect(text).not.toMatch(BANNED_TERMS)
    expect(text).not.toMatch(INTERNAL_CODE)
  })
})
