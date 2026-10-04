import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import { PartyInfoCards } from './party-info-cards'
import type { ContractPartyView } from '../api/contracts-api'

describe('PartyInfoCards', () => {
  const mockLandlord: ContractPartyView = {
    id: 'user-landlord-1',
    name: 'Nguyễn Văn Chủ',
    role: 'landlord',
    maskedCccd: '079***888',
    address: '123 Đường Số 1, Quận 1, TP.HCM',
    kycStatus: 'verified',
    hasSigned: true,
  }

  const mockTenant: ContractPartyView = {
    id: 'user-tenant-1',
    name: 'Trần Thị Thuê',
    role: 'tenant',
    maskedCccd: '079***999',
    address: '456 Đường Số 2, Quận 7, TP.HCM',
    kycStatus: 'unverified',
    hasSigned: false,
  }

  it('renders both party cards with masked CCCDs and addresses', () => {
    render(
      <PartyInfoCards
        landlord={mockLandlord}
        tenant={mockTenant}
        currentUserId="user-tenant-1"
      />
    )

    expect(screen.getByText('Nguyễn Văn Chủ')).toBeInTheDocument()
    expect(screen.getByText('079***888')).toBeInTheDocument()
    expect(
      screen.getByText('123 Đường Số 1, Quận 1, TP.HCM')
    ).toBeInTheDocument()

    expect(screen.getByText('Trần Thị Thuê')).toBeInTheDocument()
    expect(screen.getByText('079***999')).toBeInTheDocument()
    expect(
      screen.getByText('456 Đường Số 2, Quận 7, TP.HCM')
    ).toBeInTheDocument()
  })

  it('indicates current user with a badge', () => {
    render(
      <PartyInfoCards
        landlord={mockLandlord}
        tenant={mockTenant}
        currentUserId="user-tenant-1"
      />
    )
    expect(screen.getByTestId('current-user-badge')).toBeInTheDocument()
    expect(screen.getByText('Bạn')).toBeInTheDocument()
  })

  it('displays KYC verification and signature badges accurately', () => {
    render(<PartyInfoCards landlord={mockLandlord} tenant={mockTenant} />)

    expect(screen.getByText('Đã xác thực KYC')).toBeInTheDocument()
    expect(screen.getByText('Chưa hoàn tất KYC')).toBeInTheDocument()

    expect(screen.getByText('Đã ký xác nhận')).toBeInTheDocument()
    expect(screen.getByText('Chưa ký')).toBeInTheDocument()
  })
})
