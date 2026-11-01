import { describe, expect, it } from 'vitest'
import type { ContractItem } from '@/features/contracts'
import {
  contractToBills,
  contractToProperty,
  pickActiveContract,
} from './use-tenant-portfolio'

const mockContractActive: ContractItem = {
  _id: 'ctr-123',
  contractCode: 'CTR-2026-0001',
  propertyId: 'prop-123',
  propertyTitle: 'Căn hộ Landmark 81 - Tầng 25',
  tenantId: 'tenant-1',
  landlordId: 'landlord-1',
  startDate: '2026-03-01',
  endDate: '2027-03-01',
  monthlyRent: 15_000_000,
  deposit: 30_000_000,
  paymentDay: 5,
  status: 'active',
  contractHash: '0xabc123',
  blockchainAddress: '0x123',
  signedByTenant: true,
  signedByLandlord: true,
}

const mockContractPending: ContractItem = {
  _id: 'ctr-456',
  contractCode: 'CTR-2026-0002',
  propertyId: 'prop-456',
  propertyTitle: 'Căn hộ Vinhomes Central Park',
  tenantId: 'tenant-1',
  landlordId: 'landlord-2',
  startDate: '2026-04-01',
  endDate: '2027-04-01',
  monthlyRent: 12_000_000,
  deposit: 24_000_000,
  paymentDay: 10,
  status: 'deposit-pending',
  contractHash: null,
  blockchainAddress: null,
  signedByTenant: false,
  signedByLandlord: false,
}

describe('useTenantPortfolio utilities', () => {
  it('contractToProperty maps contract to Property structure correctly', () => {
    const prop = contractToProperty(mockContractActive)
    expect(prop.id).toBe('prop-123')
    expect(prop.name).toBe('Căn hộ Landmark 81 - Tầng 25')
    expect(prop.code).toBe('CTR-2026-0001')
    expect(prop.price).toBe(15_000_000)
    expect(prop.status).toBe('Đang thuê')
    expect(prop.contractId).toBe('ctr-123')
  })

  it('contractToProperty maps pending contract status to Đang chờ cọc', () => {
    const prop = contractToProperty(mockContractPending)
    expect(prop.status).toBe('Đang chờ cọc')
  })

  it('contractToBills generates deposit and monthly rent bills for active contract', () => {
    const bills = contractToBills(mockContractActive)
    expect(bills).toHaveLength(2)
    expect(bills[0]?.id).toBe('BILL-DEP-CTR-2026-0001')
    expect(bills[0]?.title).toBe('Tiền đặt cọc giữ chỗ căn hộ')
    expect(bills[0]?.contractCode).toBe('CTR-2026-0001')
    expect(bills[0]?.amount).toBe(30_000_000)
    expect(bills[0]?.status).toBe('paid')
    expect(bills[0]?.txHash).toBe('0xabc123')

    expect(bills[1]?.id).toBe('BILL-RENT-CTR-2026-0001')
    expect(bills[1]?.title).toBe('Tiền thuê nhà định kỳ')
    expect(bills[1]?.amount).toBe(15_000_000)
    expect(bills[1]?.status).toBe('paid')
  })

  it('contractToBills generates only unpaid deposit bill for deposit-pending contract', () => {
    const bills = contractToBills(mockContractPending)
    expect(bills).toHaveLength(1)
    expect(bills[0]?.amount).toBe(24_000_000)
    expect(bills[0]?.status).toBe('unpaid')
    expect(bills[0]?.txHash).toBeUndefined()
  })

  it('pickActiveContract prioritizes active contracts over pending contracts', () => {
    const active = pickActiveContract([mockContractPending, mockContractActive])
    expect(active?._id).toBe('ctr-123')
  })

  it('pickActiveContract returns pending contract if no active contract exists', () => {
    const pending = pickActiveContract([mockContractPending])
    expect(pending?._id).toBe('ctr-456')
  })

  it('pickActiveContract returns null for empty list', () => {
    expect(pickActiveContract([])).toBeNull()
  })
})
