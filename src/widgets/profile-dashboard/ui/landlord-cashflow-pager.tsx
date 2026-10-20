'use client'

import * as React from 'react'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { Button } from '@/shared/ui/button'
import {
  CASHFLOW_FILTERS,
  CASHFLOW_PAGE_SIZE,
  type CashflowFilter,
} from '../model/landlord-cashflow'

interface FilterProps {
  value: CashflowFilter
  counts: Record<CashflowFilter, number>
  onChange: (next: CashflowFilter) => void
}

/** Chip lọc dòng tiền theo trạng thái nhận tiền. */
export function CashflowFilterChips({
  value,
  counts,
  onChange,
}: FilterProps): React.ReactElement {
  return (
    <div
      className="flex flex-wrap gap-2"
      role="tablist"
      aria-label="Lọc khoản thu"
    >
      {CASHFLOW_FILTERS.map(f => (
        <button
          key={f.id}
          type="button"
          role="tab"
          aria-selected={value === f.id}
          onClick={() => onChange(f.id)}
          className={`rounded-full border px-3.5 py-1.5 text-xs font-bold transition-colors cursor-pointer ${
            value === f.id
              ? 'border-primary bg-primary text-white'
              : 'border-border bg-white text-muted hover:text-fg'
          }`}
        >
          {f.label} <span className="font-mono opacity-80">{counts[f.id]}</span>
        </button>
      ))}
    </div>
  )
}

interface PagerProps {
  page: number
  total: number
  onPage: (next: number) => void
}

/** Thanh phân trang của bảng dòng tiền; không hiện khi chỉ có một trang. */
export function CashflowPager({
  page,
  total,
  onPage,
}: PagerProps): React.ReactElement | null {
  const pageCount = Math.max(1, Math.ceil(total / CASHFLOW_PAGE_SIZE))
  if (pageCount <= 1) return null
  const from = (page - 1) * CASHFLOW_PAGE_SIZE + 1
  const to = Math.min(total, page * CASHFLOW_PAGE_SIZE)
  return (
    <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-2 text-xs text-muted">
      <span>
        Hiển thị{' '}
        <strong className="text-fg">
          {from}–{to}
        </strong>{' '}
        / {total} khoản
      </span>
      <div className="flex items-center gap-2">
        <Button
          type="button"
          variant="outline"
          disabled={page <= 1}
          onClick={() => onPage(page - 1)}
          aria-label="Trang trước"
        >
          <ChevronLeft className="h-3.5 w-3.5" />
        </Button>
        <span className="font-mono">
          Trang {page} / {pageCount}
        </span>
        <Button
          type="button"
          variant="outline"
          disabled={page >= pageCount}
          onClick={() => onPage(page + 1)}
          aria-label="Trang sau"
        >
          <ChevronRight className="h-3.5 w-3.5" />
        </Button>
      </div>
    </div>
  )
}
