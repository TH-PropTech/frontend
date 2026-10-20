import type {
  ContractPayoutSummary,
  PayoutItem,
  PayoutStatus,
} from '@/entities/payout'

/** Một dòng của bảng "Quản lý dòng tiền & Doanh thu" (khoản chủ nhà nhận theo hợp đồng). */
export interface CashflowRow {
  key: string
  title: string
  dueAt: string | null
  amount: number
  status: PayoutStatus | 'unpaid'
  ref: string | null
}

export type CashflowFilter = 'all' | 'received' | 'waiting'

export const CASHFLOW_PAGE_SIZE = 10

export const CASHFLOW_FILTERS: { id: CashflowFilter; label: string }[] = [
  { id: 'all', label: 'Tất cả' },
  { id: 'received', label: 'Đã nhận' },
  { id: 'waiting', label: 'Chưa nhận' },
]

/** Lọc theo việc đã nhận tiền về tài khoản hay chưa (chờ khách, đang chuyển, chờ liên kết, thất bại). */
export function filterCashflow(
  rows: CashflowRow[],
  filter: CashflowFilter
): CashflowRow[] {
  if (filter === 'all') return rows
  return rows.filter(r => (r.status === 'paid-out') === (filter === 'received'))
}

export function countCashflow(
  rows: CashflowRow[]
): Record<CashflowFilter, number> {
  const received = filterCashflow(rows, 'received').length
  return { all: rows.length, received, waiting: rows.length - received }
}

/** Cắt một trang (bắt đầu từ 1); trang vượt giới hạn được kéo về trang cuối. */
export function paginate<T>(
  items: T[],
  page: number,
  size = CASHFLOW_PAGE_SIZE
): { page: number; items: T[] } {
  const last = Math.max(1, Math.ceil(items.length / size))
  const p = Math.min(Math.max(1, page), last)
  return { page: p, items: items.slice((p - 1) * size, p * size) }
}

export interface RevenuePoint {
  label: string
  value: number
}

/** Gộp tổng hợp khoản nhận của từng hợp đồng thành các dòng dòng-tiền, mới nhất trước. */
export function cashflowRows(
  entries: { propertyName: string; summary: ContractPayoutSummary }[]
): CashflowRow[] {
  const rows: CashflowRow[] = []
  for (const { propertyName, summary } of entries) {
    for (const item of summary.items) {
      const paid = item.status === 'paid-out'
      rows.push({
        key: `${summary.contractId}:${item.ref}`,
        title: `${item.label} · ${propertyName}`,
        dueAt: item.dueAt,
        amount: paid ? item.receivedAmount : item.sentAmount,
        status: item.status as CashflowRow['status'],
        ref: item.ref || null,
      })
    }
  }
  return rows.sort((a, b) => {
    if (!a.dueAt) return 1
    if (!b.dueAt) return -1
    return b.dueAt.localeCompare(a.dueAt)
  })
}

/** Doanh thu ròng tích lũy theo tháng (khoản đã chuyển về tài khoản), `months` tháng gần nhất. */
export function cumulativeRevenue(
  payouts: PayoutItem[],
  now: Date = new Date(),
  months = 6
): RevenuePoint[] {
  const paid = payouts.filter(p => p.status === 'paid-out')
  const points: RevenuePoint[] = []
  for (let i = months - 1; i >= 0; i--) {
    const end = new Date(now.getFullYear(), now.getMonth() - i + 1, 1)
    const value = paid.reduce((sum, p) => {
      const at = new Date(p.paidOutAt ?? p.createdAt)
      return at < end ? sum + p.receivedAmount : sum
    }, 0)
    const m = new Date(end.getFullYear(), end.getMonth() - 1, 1)
    points.push({ label: `T${m.getMonth() + 1}`, value })
  }
  return points
}

const csvCell = (v: string | number): string =>
  `"${String(v).replace(/"/g, '""')}"`

/** CSV (UTF-8, có BOM để Excel đọc đúng tiếng Việt) của bảng dòng tiền. */
export function cashflowCsv(
  rows: CashflowRow[],
  statusLabel: (s: CashflowRow['status']) => string
): string {
  const head = [
    'Khoản thu',
    'Thời gian',
    'Số tiền (VND)',
    'Trạng thái',
    'Mã giao dịch',
  ]
  const lines = rows.map(r =>
    [
      r.title,
      r.dueAt ? new Date(r.dueAt).toLocaleDateString('vi-VN') : '',
      r.amount,
      statusLabel(r.status),
      r.ref ?? '',
    ]
      .map(csvCell)
      .join(',')
  )
  return `﻿${[head.map(csvCell).join(','), ...lines].join('\r\n')}`
}
