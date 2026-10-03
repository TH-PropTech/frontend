import { describe, expect, it, vi, beforeEach } from 'vitest'
import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import { LedgerEvidenceDrawer } from './ledger-evidence-drawer'
import {
  getContractLedgerEvidence,
  type ContractLedgerEvidence,
  type LedgerEvidenceEvent,
} from '../api/contracts-api'

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

  function evidence(
    events: Partial<LedgerEvidenceEvent>[],
    networkMode: 'fabric' | 'simulation' = 'fabric'
  ): ContractLedgerEvidence {
    return {
      networkMode,
      connectionState: networkMode === 'fabric' ? 'connected' : 'disabled',
      explorerAvailable: networkMode === 'fabric',
      events: events.map((event, index) => ({
        id: `log-${index}`,
        eventType: 'contract.activated',
        aggregateType: 'contract',
        aggregateRef: 'abc123',
        status: 'confirmed',
        networkMode,
        txId: 'tx-fabric-1',
        blockNumber: 77,
        recordedAt: '2026-10-01T10:00:00Z',
        payloadHash: 'a'.repeat(64),
        dependsOn: null,
        attempts: 1,
        errorCode: null,
        explorerUrl: null,
        ...event,
      })),
    }
  }

  async function renderDrawer(data: ContractLedgerEvidence): Promise<void> {
    vi.mocked(getContractLedgerEvidence).mockResolvedValue(data)
    render(
      <LedgerEvidenceDrawer
        contractId="contract-1"
        open
        onOpenChange={vi.fn()}
      />
    )
    await waitFor(() =>
      expect(
        screen.getAllByTestId('ledger-evidence-event').length
      ).toBeGreaterThan(0)
    )
  }

  it('labels move-in settlement and handover evidence with readable titles', async () => {
    await renderDrawer(
      evidence([
        {
          id: 'log-a',
          eventType: 'MOVE_IN_SETTLED',
          aggregateType: 'move-in-settlement',
        },
        {
          id: 'log-b',
          eventType: 'HANDOVER_RECORDED',
          aggregateType: 'move-in-handover',
        },
      ])
    )
    const rows = screen.getAllByTestId('ledger-evidence-event')
    expect(rows[0]).toHaveTextContent('Quyết toán nhận nhà')
    expect(rows[1]).toHaveTextContent('Bàn giao nhận nhà')
  })

  it('renders an unknown future event type safely with a generic label', async () => {
    await renderDrawer(
      evidence([
        {
          eventType: '<img src=x onerror=alert(1)>',
          aggregateType: 'brand-new-thing',
        },
      ])
    )
    const row = screen.getByTestId('ledger-evidence-event')
    expect(row.querySelector('img')).toBeNull()
    expect(row).toHaveTextContent('img src x onerror alert 1')
    expect(row).toHaveTextContent('brand new thing')
  })

  it('shows the governing snapshot reference and its verification state', async () => {
    await renderDrawer(
      evidence([
        {
          id: 'log-gov',
          eventType: 'governance.published',
          aggregateType: 'governance-snapshot',
          aggregateRef: 'gov999',
        },
        { id: 'log-contract' },
      ])
    )
    const reference = screen.getByTestId('ledger-governance-reference')
    expect(reference).toHaveTextContent('gov999')
    expect(reference).toHaveTextContent('Đã xác minh')
  })

  it('reports a legacy contract without a governance snapshot as not-recorded', async () => {
    await renderDrawer(evidence([{}]))
    const reference = screen.getByTestId('ledger-governance-reference')
    expect(reference).toHaveTextContent('Chưa ghi nhận')
    expect(reference).not.toHaveTextContent('gov')
  })

  it('never shows a Fabric block or verification claim for simulation evidence', async () => {
    await renderDrawer(
      evidence(
        [
          {
            id: 'log-gov',
            eventType: 'governance.published',
            aggregateType: 'governance-snapshot',
            aggregateRef: 'gov1',
            blockNumber: 99,
          },
          { id: 'log-contract', blockNumber: 88 },
        ],
        'simulation'
      )
    )
    expect(screen.queryByText(/#88|#99|Block: 88|Block: 99/)).toBeNull()
    for (const row of screen.getAllByTestId('ledger-evidence-event')) {
      expect(row).toHaveTextContent('Mô phỏng')
    }
    const reference = screen.getByTestId('ledger-governance-reference')
    expect(reference).toHaveTextContent('Không khả dụng')
    expect(reference).not.toHaveTextContent('Đã xác minh')
  })

  it('shows the block number for live evidence only', async () => {
    await renderDrawer(evidence([{ blockNumber: 77 }]))
    expect(screen.getByTestId('ledger-evidence-event')).toHaveTextContent('#77')
  })

  it('requests only the evidence of the current contract', async () => {
    await renderDrawer(evidence([{}]))
    expect(getContractLedgerEvidence).toHaveBeenCalledTimes(1)
    expect(getContractLedgerEvidence).toHaveBeenCalledWith('contract-1')
  })
})
