import { describe, expect, it } from 'vitest'
import type { ContractItem } from '@/features/contracts'
import type { LandlordApartmentItem } from '@/features/apartment-posting'
import {
  buildPortfolio,
  currentContract,
  progressFlags,
} from './landlord-portfolio'

const listing = (
  id: string,
  status: LandlordApartmentItem['status'] = 'available'
): LandlordApartmentItem =>
  ({ id, title: `Căn ${id}`, priceMonthly: 10_000_000, status }) as never

const contract = (over: Partial<ContractItem>): ContractItem => ({
  _id: 'c1',
  contractCode: 'CTR-1',
  propertyId: 'a',
  propertyTitle: 'Căn a',
  tenantId: 't',
  landlordId: 'l',
  startDate: '2026-01-01',
  endDate: '2027-01-01',
  monthlyRent: 12_000_000,
  deposit: 12_000_000,
  paymentDay: 5,
  status: 'active',
  contractHash: null,
  blockchainAddress: null,
  signedByTenant: true,
  signedByLandlord: true,
  ...over,
})

describe('buildPortfolio', () => {
  const now = new Date('2026-07-01')

  it('tính trạng thái căn, tỷ lệ lấp đầy và doanh thu từ hợp đồng thật', () => {
    const p = buildPortfolio(
      [listing('a'), listing('b'), listing('c')],
      [
        contract({ propertyId: 'a', tenantName: 'Lan', tenantPhone: '0900' }),
        contract({
          _id: 'c2',
          propertyId: 'b',
          status: 'deposit-pending',
          monthlyRent: 5_000_000,
        }),
      ],
      now
    )
    expect(p.properties.map(x => x.status)).toEqual([
      'Đang thuê',
      'Đang chờ cọc',
      'Trống',
    ])
    expect(p.stats).toEqual({
      total: 3,
      occupied: 1,
      occupancyPct: 33.3,
      monthlyRevenue: 12_000_000,
    })
    expect(p.tenantInfo.a?.name).toBe('Lan')
    expect(p.contractSummary.a?.duration).toBe('12 tháng')
    expect(p.contractSummary.a?.daysRemaining).toBe(184)
    expect(p.alerts).toHaveLength(1)
    expect(p.alerts[0]).toMatchObject({ type: 'danger', propertyName: 'Căn b' })
  })

  it('bỏ tin chưa duyệt / bị từ chối chưa có hợp đồng; giữ tin có hợp đồng', () => {
    const p = buildPortfolio(
      [
        listing('a', 'pending'),
        listing('b', 'rejected'),
        listing('c', 'expired'),
      ],
      [contract({ propertyId: 'c' })],
      now
    )
    expect(p.properties.map(x => x.id)).toEqual(['c'])
  })

  it('không có dữ liệu: danh mục rỗng, số liệu 0', () => {
    const p = buildPortfolio([], [])
    expect(p.stats.occupancyPct).toBe(0)
    expect(p.properties).toEqual([])
  })
})

describe('currentContract / progressFlags', () => {
  it('bỏ hợp đồng đã hủy / chấm dứt; ưu tiên đang hiệu lực', () => {
    const list = [
      contract({ _id: 'x', status: 'terminated' }),
      contract({
        _id: 'y',
        status: 'awaiting-signature',
        startDate: '2026-05-01',
      }),
      contract({ _id: 'z', status: 'active' }),
    ]
    expect(currentContract('a', list)?._id).toBe('z')
    expect(currentContract('a', [list[0]!])).toBeUndefined()
  })

  it('cờ tiến độ theo trạng thái hợp đồng', () => {
    expect(progressFlags(undefined).depositPaid).toBe(false)
    expect(
      progressFlags(
        contract({ status: 'deposit-pending', signedByTenant: false })
      )
    ).toMatchObject({
      depositPaid: false,
      contractSigned: false,
    })
    expect(progressFlags(contract({ status: 'active' }))).toMatchObject({
      depositPaid: true,
      contractSigned: true,
      firstMonthPaid: true,
      leaseTerminated: false,
    })
    expect(
      progressFlags(contract({ status: 'completed' })).leaseTerminated
    ).toBe(true)
  })
})
