import { describe, expect, it } from 'vitest'
import type { ContractPayoutSummary, PayoutItem } from '@/entities/payout'
import {
  cashflowCsv,
  cashflowRows,
  countCashflow,
  filterCashflow,
  paginate,
  type CashflowRow,
  cumulativeRevenue,
} from './landlord-cashflow'

describe('cashflowRows', () => {
  const summary: ContractPayoutSummary = {
    contractId: 'c1',
    wallet: { linked: true },
    totals: { received: 0, pending: 0 },
    items: [
      {
        kind: 'DEPOSIT',
        ref: 'r1',
        label: 'Cọc',
        dueAt: '2026-06-10',
        sentAmount: 100,
        receivedAmount: 95,
        status: 'paid-out',
      },
      {
        kind: 'RENT',
        ref: 'r2',
        label: 'Thuê T7',
        dueAt: '2026-07-05',
        sentAmount: 100,
        receivedAmount: 0,
        status: 'unpaid',
      },
    ],
  }

  it('mới nhất trước; đã nhận lấy số thực nhận, chưa nhận lấy số dự kiến', () => {
    const rows = cashflowRows([{ propertyName: 'Căn a', summary }])
    expect(rows.map(r => r.title)).toEqual(['Thuê T7 · Căn a', 'Cọc · Căn a'])
    expect(rows.map(r => r.amount)).toEqual([100, 95])
  })

  it('xuất CSV có BOM, escape dấu nháy kép', () => {
    const csv = cashflowCsv(
      [
        {
          key: 'k',
          title: 'A "x"',
          dueAt: null,
          amount: 5,
          status: 'unpaid',
          ref: null,
        },
      ],
      () => 'Chờ'
    )
    expect(csv.startsWith('﻿')).toBe(true)
    expect(csv).toContain('"A ""x"""')
  })
})

describe('cumulativeRevenue', () => {
  const payout = (
    received: number,
    at: string,
    status: PayoutItem['status'] = 'paid-out'
  ) =>
    ({
      receivedAmount: received,
      paidOutAt: at,
      createdAt: at,
      status,
    }) as PayoutItem

  it('tích lũy theo tháng, bỏ khoản chưa chuyển', () => {
    const pts = cumulativeRevenue(
      [
        payout(100, '2026-05-10T00:00:00Z'),
        payout(50, '2026-07-02T00:00:00Z'),
        payout(999, '2026-07-02T00:00:00Z', 'pending'),
      ],
      new Date('2026-07-15'),
      3
    )
    expect(pts.map(p => p.label)).toEqual(['T5', 'T6', 'T7'])
    expect(pts.map(p => p.value)).toEqual([100, 100, 150])
  })
})

describe('filter + paginate', () => {
  const row = (i: number, status: CashflowRow['status']): CashflowRow => ({
    key: String(i),
    title: `r${i}`,
    dueAt: null,
    amount: i,
    status,
    ref: null,
  })
  const rows = Array.from({ length: 23 }, (_, i) =>
    row(i, i % 5 === 0 ? 'paid-out' : 'unpaid')
  )

  it('đếm và lọc theo đã nhận / chưa nhận', () => {
    expect(countCashflow(rows)).toEqual({ all: 23, received: 5, waiting: 18 })
    expect(filterCashflow(rows, 'received')).toHaveLength(5)
    expect(filterCashflow(rows, 'all')).toHaveLength(23)
  })

  it('cắt trang 10 dòng, kẹp trang ngoài phạm vi', () => {
    expect(paginate(rows, 1).items).toHaveLength(10)
    expect(paginate(rows, 3).items).toHaveLength(3)
    expect(paginate(rows, 99).page).toBe(3)
    expect(paginate(rows, 0).page).toBe(1)
    expect(paginate([], 5)).toEqual({ page: 1, items: [] })
  })
})
