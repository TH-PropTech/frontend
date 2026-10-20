'use client'

import * as React from 'react'
import { Copy } from 'lucide-react'
import { Badge } from '@/shared/ui/badge'
import { TableCell, TableRow } from '@/shared/ui/table'
import type { CashflowRow } from '../model/landlord-cashflow'

export const CASHFLOW_STATUS: Record<
  CashflowRow['status'],
  { label: string; className: string }
> = {
  'paid-out': {
    label: 'Đã nhận về tài khoản',
    className: 'bg-success-soft text-success border-success/20',
  },
  pending: {
    label: 'Đang chuyển',
    className: 'bg-info/10 text-info border-info/20',
  },
  'awaiting-wallet': {
    label: 'Chờ liên kết ngân hàng',
    className: 'bg-warning-soft text-warning border-warning/20',
  },
  failed: {
    label: 'Chuyển thất bại',
    className: 'bg-destructive/10 text-destructive border-destructive/20',
  },
  unpaid: {
    label: 'Chờ khách thanh toán',
    className: 'bg-surface-muted text-muted border-border/60',
  },
}

interface LandlordCashflowRowsProps {
  rows: CashflowRow[]
  isLoading: boolean
  isError: boolean
  onCopy: (text: string) => void
}

/** Các dòng của bảng dòng tiền chủ nhà, lấy từ backend (có trạng thái đang tải / lỗi / trống). */
export function LandlordCashflowRows({
  rows,
  isLoading,
  isError,
  onCopy,
}: LandlordCashflowRowsProps): React.ReactElement {
  if (isLoading || isError || rows.length === 0) {
    return (
      <TableRow>
        <TableCell
          colSpan={5}
          className="p-6 text-center text-muted border-none"
        >
          {isLoading
            ? 'Đang tải dòng tiền...'
            : isError
              ? 'Không tải được dòng tiền. Vui lòng thử lại sau.'
              : 'Chưa có khoản thu nào từ hợp đồng của bạn.'}
        </TableCell>
      </TableRow>
    )
  }

  return (
    <>
      {rows.map(r => {
        const status = CASHFLOW_STATUS[r.status] ?? CASHFLOW_STATUS.unpaid
        return (
          <TableRow
            key={r.key}
            className="hover:bg-surface-muted/10 transition-colors"
          >
            <TableCell className="p-4 font-semibold text-fg flex items-center gap-1.5 border-none h-12">
              <span className="h-1.5 w-1.5 rounded-full bg-primary shrink-0" />
              {r.title}
            </TableCell>
            <TableCell className="p-4 text-muted border-none">
              {r.dueAt ? new Date(r.dueAt).toLocaleDateString('vi-VN') : '—'}
            </TableCell>
            <TableCell className="p-4 font-bold text-fg text-sm border-none">
              {r.amount.toLocaleString('vi-VN')} VND
            </TableCell>
            <TableCell className="p-4 border-none">
              <Badge
                variant="outline"
                className={`gap-1.5 ${status.className}`}
              >
                {status.label}
              </Badge>
            </TableCell>
            <TableCell className="p-4 border-none">
              {r.ref ? (
                <div className="flex items-center gap-1.5 font-mono text-primary max-w-[180px]">
                  <span className="truncate" title={r.ref}>
                    {r.ref}
                  </span>
                  <button
                    type="button"
                    onClick={() => onCopy(r.ref ?? '')}
                    title="Sao chép mã giao dịch"
                  >
                    <Copy className="h-3.5 w-3.5" />
                  </button>
                </div>
              ) : (
                <span className="text-muted/60 font-mono italic">N/A</span>
              )}
            </TableCell>
          </TableRow>
        )
      })}
    </>
  )
}
