import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import { describe, expect, it, vi } from 'vitest'
import { BlockchainVerifyBadge } from './blockchain-verify-badge'
import type { ContractLedgerSummary } from '../api/contracts-api'

describe('BlockchainVerifyBadge', () => {
  const mockSimulationLedger: ContractLedgerSummary = {
    networkMode: 'simulation',
    status: 'confirmed-simulation',
    txHash: '0xabcdef1234567890abcdef1234567890',
    blockNumber: null,
    verifiedAt: '2026-03-14T01:00:00Z',
    onChainValid: true,
  }

  const mockFabricLedger: ContractLedgerSummary = {
    networkMode: 'fabric',
    status: 'confirmed-fabric',
    txHash: '0x99998888777766665555444433332222',
    blockNumber: 1045,
    verifiedAt: '2026-03-14T01:00:00Z',
    onChainValid: true,
  }

  it('renders simulation badge and block number as not applicable', () => {
    render(
      <BlockchainVerifyBadge ledger={mockSimulationLedger} contractId="c1" />
    )
    expect(screen.getByTestId('network-mode-simulation')).toBeInTheDocument()
    expect(screen.getByTestId('network-mode-simulation')).toHaveTextContent(
      'Chế độ thử nghiệm'
    )
    expect(screen.getByText('Không áp dụng (thử nghiệm)')).toBeInTheDocument()
  })

  it('renders fabric badge and block number when on fabric network', () => {
    render(<BlockchainVerifyBadge ledger={mockFabricLedger} contractId="c1" />)
    expect(screen.getByTestId('network-mode-fabric')).toBeInTheDocument()
    expect(screen.getByText('#1045')).toBeInTheDocument()
  })

  it('copies txHash to clipboard when copy button clicked', async () => {
    const writeTextMock = vi.fn().mockResolvedValue(undefined)
    Object.assign(navigator, {
      clipboard: {
        writeText: writeTextMock,
      },
    })

    render(
      <BlockchainVerifyBadge ledger={mockSimulationLedger} contractId="c1" />
    )

    const copyBtn = screen.getByLabelText('Sao chép mã giao dịch')
    fireEvent.click(copyBtn)

    expect(writeTextMock).toHaveBeenCalledWith(
      '0xabcdef1234567890abcdef1234567890'
    )
    await waitFor(() => {
      expect(screen.getByText('Đã sao chép!')).toBeInTheDocument()
    })
  })

  it('triggers onVerifyIntegrity when tamper check button clicked', () => {
    const onVerifyMock = vi.fn()
    render(
      <BlockchainVerifyBadge
        ledger={mockSimulationLedger}
        contractId="c1"
        onVerifyIntegrity={onVerifyMock}
      />
    )

    const verifyBtn = screen.getByLabelText('Xác minh tính toàn vẹn')
    fireEvent.click(verifyBtn)

    expect(onVerifyMock).toHaveBeenCalledTimes(1)
  })

  it('displays integrity result banner when valid', () => {
    render(
      <BlockchainVerifyBadge
        ledger={mockSimulationLedger}
        contractId="c1"
        integrityResult={{
          isValid: true,
          verificationStatus: 'valid',
          message: 'Hash khớp tuyệt đối.',
        }}
      />
    )

    expect(screen.getByTestId('integrity-result-box')).toBeInTheDocument()
    expect(screen.getByText('Hash khớp tuyệt đối.')).toBeInTheDocument()
  })

  it('displays warning banner when integrity is invalid', () => {
    render(
      <BlockchainVerifyBadge
        ledger={mockFabricLedger}
        contractId="c1"
        integrityResult={{
          isValid: false,
          verificationStatus: 'invalid',
        }}
      />
    )

    expect(screen.getByTestId('integrity-result-box')).toBeInTheDocument()
    expect(
      screen.getByText(
        'Cảnh báo sai lệch: nội dung đã bị thay đổi so với bản gốc đã lưu vết!'
      )
    ).toBeInTheDocument()
  })

  it('displays not-recorded message when contract has not been recorded', () => {
    render(
      <BlockchainVerifyBadge
        ledger={mockFabricLedger}
        contractId="c1"
        integrityResult={{
          isValid: null,
          verificationStatus: 'not-recorded',
        }}
      />
    )

    expect(screen.getByTestId('integrity-result-box')).toBeInTheDocument()
    expect(
      screen.getByText('Chưa lưu vết: hợp đồng chưa có bản ghi xác nhận.')
    ).toBeInTheDocument()
  })

  it('displays unavailable message when fabric network is unreachable', () => {
    render(
      <BlockchainVerifyBadge
        ledger={mockFabricLedger}
        contractId="c1"
        integrityResult={{
          isValid: null,
          verificationStatus: 'unavailable',
        }}
      />
    )

    expect(screen.getByTestId('integrity-result-box')).toBeInTheDocument()
    expect(
      screen.getByText(
        'Hệ thống lưu vết tạm thời không khả dụng: không thể kết nối để đối soát.'
      )
    ).toBeInTheDocument()
  })
})
