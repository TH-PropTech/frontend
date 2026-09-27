import { render, screen, within } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import type {
  ContractLedgerSummary,
  ContractOverviewSnapshot,
  ContractPartyView,
} from '../api/contracts-api'
import { ContractSummaryCard } from './contract-summary-card'

const party = (
  role: ContractPartyView['role'],
  name: string
): ContractPartyView => ({
  id: `${role}-1`,
  name,
  role,
  maskedCccd: null,
  address: null,
  kycStatus: 'verified',
  hasSigned: false,
})

const contract: ContractOverviewSnapshot = {
  id: 'c-1',
  code: 'HD-2026-001',
  status: 'draft',
  property: {
    id: 'p-1',
    title: 'Căn hộ Sunrise City',
    address: '23 Nguyễn Hữu Thọ, Q7',
    area: 70,
    furniture: null,
    value: 15_000_000,
  },
  commercial: {
    monthlyRent: 15_000_000,
    deposit: 30_000_000,
    paymentDay: 5,
    durationMonths: 12,
    latePenaltyRate: 0.05,
    terminationNoticeDays: 30,
  },
  startDate: '2026-10-01T00:00:00.000Z',
  endDate: '2027-10-01T00:00:00.000Z',
  executionMethod: 'SMARTCA',
  notarizationStatus: 'not-requested',
}

const ledger: ContractLedgerSummary = {
  networkMode: 'simulation',
  status: 'pending',
  txHash: null,
  blockNumber: null,
  verifiedAt: null,
}

describe('ContractSummaryCard', () => {
  it('hiển thị các bên, căn hộ, thời hạn và tài chính', () => {
    render(
      <ContractSummaryCard
        contract={contract}
        parties={{
          tenant: party('tenant', 'Trần Văn Thuê'),
          landlord: party('landlord', 'Lê Thị Chủ'),
        }}
        ledger={ledger}
        activeStage="deposit"
      />
    )

    const card = screen.getByTestId('contract-summary-card')
    expect(card).toHaveTextContent('HD-2026-001')
    expect(card).toHaveTextContent('Căn hộ Sunrise City')
    expect(card).toHaveTextContent('Trần Văn Thuê')
    expect(card).toHaveTextContent('Lê Thị Chủ')
    expect(card).toHaveTextContent('12 tháng')
    expect(card).toHaveTextContent(/15\.000\.000/)
    expect(card).toHaveTextContent(/30\.000\.000/)
  })

  it('tách trạng thái nghiệp vụ khỏi trạng thái sổ cái', () => {
    render(
      <ContractSummaryCard
        contract={contract}
        parties={{
          tenant: party('tenant', 'A'),
          landlord: party('landlord', 'B'),
        }}
        ledger={ledger}
        activeStage="deposit"
      />
    )

    expect(
      within(screen.getByTestId('summary-business-status')).getByText('Đặt cọc')
    ).toBeInTheDocument()
    expect(
      within(screen.getByTestId('summary-ledger-status')).getByText(
        'Đang chờ ghi sổ cái (mô phỏng)'
      )
    ).toBeInTheDocument()
  })

  it('không có thời hạn thì ghi chưa xác định', () => {
    render(
      <ContractSummaryCard
        contract={{
          ...contract,
          commercial: { ...contract.commercial, durationMonths: null },
        }}
        parties={{
          tenant: party('tenant', 'A'),
          landlord: party('landlord', 'B'),
        }}
        ledger={{
          ...ledger,
          networkMode: 'fabric',
          status: 'confirmed-fabric',
        }}
        activeStage="completed"
      />
    )

    expect(screen.getByTestId('contract-summary-card')).toHaveTextContent(
      'Chưa xác định'
    )
    expect(screen.getByTestId('summary-ledger-status')).toHaveTextContent(
      'Đã xác nhận trên Fabric'
    )
    expect(screen.getByTestId('summary-business-status')).toHaveTextContent(
      'Hoàn tất'
    )
  })
})
