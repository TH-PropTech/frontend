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
    expect(screen.getByTestId('network-mode-simulation')).toHaveTextContent(
      'Chế độ thử nghiệm'
    )
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

  it('renders the three integrity layers with unavailable explanations', () => {
    render(
      <FabricLedgerEvidenceCard
        contractId="ctr-123"
        integrityResult={{
          isValid: null,
          verificationStatus: 'unavailable',
          layers: {
            offChain: { status: 'valid', hash: 'a'.repeat(64), reason: null },
            artifact: {
              status: 'unavailable',
              hash: null,
              reason: 'Artifact chưa được lưu',
            },
            onChain: {
              status: 'not-recorded',
              hash: null,
              reason: 'Chưa có transaction',
            },
          },
        }}
      />
    )

    expect(screen.getByTestId('integrity-layers')).toBeDefined()
    expect(screen.getByTestId('integrity-layer-offChain')).toHaveTextContent(
      'Đã xác minh'
    )
    expect(screen.getByTestId('integrity-layer-artifact')).toHaveTextContent(
      'Không khả dụng'
    )
    expect(screen.getByText('Artifact chưa được lưu')).toBeDefined()
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

describe('FabricLedgerEvidenceCard tri-state verification', () => {
  const layers = (
    offChain: string,
    artifact: string,
    onChain: string,
    reason: string | null = null
  ) => ({
    offChain: { status: offChain, hash: null, reason: null },
    artifact: { status: artifact, hash: null, reason: null },
    onChain: { status: onChain, hash: null, reason },
  })

  function renderWithLayers(
    isValid: boolean | null,
    verificationStatus: 'valid' | 'invalid' | 'not-recorded' | 'unavailable',
    layerSet: ReturnType<typeof layers>
  ) {
    return render(
      <FabricLedgerEvidenceCard
        contractId="ctr-1"
        integrityResult={{
          isValid,
          verificationStatus,
          layers: layerSet as never,
        }}
      />
    )
  }

  it('labels verified, mismatch, unavailable and not-recorded layers distinctly', () => {
    renderWithLayers(
      false,
      'invalid',
      layers('valid', 'mismatch', 'unavailable') as ReturnType<typeof layers>
    )
    expect(screen.getByTestId('integrity-layer-offChain')).toHaveTextContent(
      'Đã xác minh'
    )
    expect(screen.getByTestId('integrity-layer-artifact')).toHaveTextContent(
      'Sai lệch'
    )
    expect(screen.getByTestId('integrity-layer-onChain')).toHaveTextContent(
      'Không khả dụng'
    )
  })

  it('accepts the spec status "verified" as well as the legacy "valid"', () => {
    renderWithLayers(true, 'valid', layers('verified', 'valid', 'not-recorded'))
    expect(screen.getByTestId('integrity-layer-offChain')).toHaveTextContent(
      'Đã xác minh'
    )
    expect(screen.getByTestId('integrity-layer-artifact')).toHaveTextContent(
      'Đã xác minh'
    )
    expect(screen.getByTestId('integrity-layer-onChain')).toHaveTextContent(
      'Chưa ghi nhận'
    )
  })

  it('never reports an unknown layer status as a mismatch', () => {
    renderWithLayers(
      null,
      'unavailable',
      layers('valid', 'valid', 'future-state')
    )
    const onChain = screen.getByTestId('integrity-layer-onChain')
    expect(onChain).toHaveTextContent('Không khả dụng')
    expect(onChain).not.toHaveTextContent('Sai lệch')
  })

  it('does not claim a mismatch (or success) when verification is unavailable', () => {
    renderWithLayers(
      null,
      'unavailable',
      layers('valid', 'valid', 'unavailable')
    )
    const banner = screen.getByTestId('integrity-result-banner')
    expect(banner).toHaveTextContent('Chưa thể xác minh')
    expect(banner).not.toHaveTextContent('sai lệch')
    expect(banner).not.toHaveTextContent('thành công')
  })

  it('reports not-recorded evidence without calling it a mismatch', () => {
    renderWithLayers(
      null,
      'not-recorded',
      layers('valid', 'not-recorded', 'not-recorded')
    )
    const banner = screen.getByTestId('integrity-result-banner')
    expect(banner).toHaveTextContent('Chưa có bản ghi')
    expect(banner).not.toHaveTextContent('sai lệch')
  })

  it('keeps simulation labelled and shows no Fabric block', () => {
    render(
      <FabricLedgerEvidenceCard
        contractId="ctr-1"
        networkMode="simulation"
        blockNumber={123}
      />
    )
    expect(screen.getByTestId('network-mode-simulation')).toBeInTheDocument()
    expect(screen.getByTestId('fabric-block-number')).toHaveTextContent(
      'Mô phỏng'
    )
    expect(screen.queryByText('#123')).toBeNull()
  })

  it('offers the evidence package download for the current contract', () => {
    render(<FabricLedgerEvidenceCard contractId="ctr-1" />)
    expect(
      screen.getByRole('button', { name: /Tải gói bằng chứng/ })
    ).toBeInTheDocument()
  })
})
