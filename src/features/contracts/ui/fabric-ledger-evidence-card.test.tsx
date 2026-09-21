import { describe, it, expect, vi, beforeEach } from 'vitest'
import { render, screen, fireEvent } from '@testing-library/react'
import * as React from 'react'
import { FabricLedgerEvidenceCard } from './fabric-ledger-evidence-card'

describe('FabricLedgerEvidenceCard', () => {
  const writeTextMock = vi.fn().mockResolvedValue(undefined)

  beforeEach(() => {
    vi.clearAllMocks()
    Object.assign(navigator, {
      clipboard: {
        writeText: writeTextMock,
      },
    })
  })

  it('renders Fabric production ledger evidence with block number, txID and hash', () => {
    render(
      <FabricLedgerEvidenceCard
        contractId="ctr-123"
        contractCode="HD-2026-001"
        blockNumber={10492}
        txHash="7f8b9a1c2d3e4f5a6b7c8d9e0f1a2b3c4d5e6f7a8b9c0d1e2f3a4b5c6d7e8f9a"
        contractHash="e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855"
        connectionState="connected"
        status="confirmed-fabric"
        verifiedAt="2026-09-18T12:00:00.000Z"
        networkMode="fabric"
      />
    )

    expect(screen.getByTestId('fabric-ledger-evidence-card')).toBeDefined()
    expect(screen.getByTestId('network-mode-fabric')).toBeDefined()
    expect(screen.getByTestId('fabric-connection-state')).toHaveTextContent(
      'Đã kết nối'
    )
    expect(screen.getByTestId('fabric-ledger-status')).toHaveTextContent(
      'confirmed-fabric'
    )
    expect(screen.getByTestId('fabric-block-number').textContent).toBe('#10492')
    expect(screen.getByTestId('fabric-tx-hash')).toBeDefined()
    expect(screen.getByTestId('fabric-contract-hash')).toBeDefined()
  })

  it('renders simulation mode indicator when networkMode is simulation', () => {
    render(
      <FabricLedgerEvidenceCard contractId="ctr-123" networkMode="simulation" />
    )

    expect(screen.getByTestId('network-mode-simulation')).toBeDefined()
    expect(screen.getByText(/Mô phỏng blockchain/i)).toBeDefined()
  })

  it('copies transaction ID and contract hash to clipboard when clicking copy buttons', async () => {
    render(
      <FabricLedgerEvidenceCard
        contractId="ctr-123"
        txHash="tx-sample-123456789"
        contractHash="hash-sample-987654321"
      />
    )

    const copyTxBtn = screen.getByTestId('copy-tx-btn')
    fireEvent.click(copyTxBtn)
    expect(writeTextMock).toHaveBeenCalledWith('tx-sample-123456789')

    const copyHashBtn = screen.getByTestId('copy-hash-btn')
    fireEvent.click(copyHashBtn)
    expect(writeTextMock).toHaveBeenCalledWith('hash-sample-987654321')
  })

  it('invokes onVerifyIntegrity when clicking verification button', () => {
    const onVerifyMock = vi.fn()
    render(
      <FabricLedgerEvidenceCard
        contractId="ctr-123"
        onVerifyIntegrity={onVerifyMock}
      />
    )

    const verifyBtn = screen.getByTestId('verify-integrity-btn')
    fireEvent.click(verifyBtn)
    expect(onVerifyMock).toHaveBeenCalledTimes(1)
  })

  it('renders valid integrity result banner', () => {
    render(
      <FabricLedgerEvidenceCard
        contractId="ctr-123"
        integrityResult={{
          isValid: true,
          verificationStatus: 'valid',
          message: 'Khớp 100% với dữ liệu khối',
        }}
      />
    )

    expect(screen.getByTestId('integrity-result-banner')).toBeDefined()
    expect(screen.getByText('Xác thực toàn vẹn thành công')).toBeDefined()
    expect(screen.getByText('Khớp 100% với dữ liệu khối')).toBeDefined()
  })

  it('renders warning integrity result banner when mismatch detected', () => {
    render(
      <FabricLedgerEvidenceCard
        contractId="ctr-123"
        integrityResult={{
          isValid: false,
          verificationStatus: 'invalid',
          message: 'Phát hiện sai lệch mã băm',
        }}
      />
    )

    expect(screen.getByTestId('integrity-result-banner')).toBeDefined()
    expect(screen.getByText('Cảnh báo sai lệch toàn vẹn dữ liệu')).toBeDefined()
  })

  it('handles missing/null properties gracefully', () => {
    render(
      <FabricLedgerEvidenceCard
        contractId="ctr-999"
        blockNumber={null}
        txHash={null}
        contractHash={null}
        verifiedAt={null}
      />
    )

    expect(screen.getByTestId('fabric-ledger-evidence-card')).toBeDefined()
    expect(screen.queryByTestId('copy-tx-btn')).toBeNull()
    expect(screen.queryByTestId('copy-hash-btn')).toBeNull()
  })
})
