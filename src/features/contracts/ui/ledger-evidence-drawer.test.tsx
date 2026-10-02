import { describe, expect, it, vi, beforeEach } from 'vitest'
import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import { LedgerEvidenceDrawer } from './ledger-evidence-drawer'
import { getContractLedgerEvidence } from '../api/contracts-api'

vi.mock('../api/contracts-api', () => ({
  getContractLedgerEvidence: vi.fn(),
}))

describe('LedgerEvidenceDrawer', () => {
  beforeEach(() => vi.clearAllMocks())

  it('renders a cleaned simulation timeline without Explorer links', async () => {
    vi.mocked(getContractLedgerEvidence).mockResolvedValue({
      networkMode: 'simulation',
      connectionState: 'disabled',
      explorerAvailable: false,
      events: [
        {
          id: 'log-1',
          eventType: 'createContract',
          aggregateType: 'contract',
          aggregateRef: '123456',
          status: 'confirmed',
          networkMode: 'simulation',
          txId: 'sim_tx_1',
          blockNumber: null,
          recordedAt: '2026-09-14T10:00:00Z',
          payloadHash: 'a'.repeat(64),
          dependsOn: null,
          attempts: 1,
          errorCode: null,
          explorerUrl: null,
        },
      ],
    })

    render(
      <LedgerEvidenceDrawer
        contractId="contract-1"
        open
        onOpenChange={vi.fn()}
      />
    )

    await waitFor(() =>
      expect(screen.getByTestId('ledger-evidence-event')).toBeDefined()
    )
    expect(screen.getByText('Chế độ mô phỏng')).toBeDefined()
    expect(screen.queryByTestId('ledger-explorer-link')).toBeNull()
    expect(getContractLedgerEvidence).toHaveBeenCalledWith('contract-1')
  })

  it('shows loading and error states', async () => {
    let rejectRequest: ((reason?: unknown) => void) | undefined
    vi.mocked(getContractLedgerEvidence).mockReturnValue(
      new Promise((_, reject) => {
        rejectRequest = reject
      })
    )

    render(
      <LedgerEvidenceDrawer
        contractId="contract-2"
        open
        onOpenChange={vi.fn()}
      />
    )
    await waitFor(() =>
      expect(screen.getByTestId('ledger-evidence-loading')).toBeDefined()
    )
    rejectRequest?.(new Error('offline'))
    await waitFor(() =>
      expect(screen.getByTestId('ledger-evidence-error')).toBeDefined()
    )
    fireEvent.keyDown(document, { key: 'Escape' })
  })
})
