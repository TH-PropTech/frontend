'use client'

import * as React from 'react'
import { Card } from '@/shared/ui/card'
import { Badge } from '@/shared/ui/badge'
import { Lock, AlertCircle, ShieldCheck } from 'lucide-react'
import { DEMO_ESCROW_ITEMS } from '../model/mock-data'

export function LandlordEscrow(): React.ReactElement {
  const totalLocked = DEMO_ESCROW_ITEMS.reduce(
    (acc, item) => (item.status === 'locked' ? acc + item.amount : acc),
    0
  )
  const totalPending = DEMO_ESCROW_ITEMS.reduce(
    (acc, item) => (item.status === 'pending' ? acc + item.amount : acc),
    0
  )

  return (
    <Card className="bg-white border border-border rounded-3xl p-6 shadow-sm text-left space-y-4">
      <div className="flex items-center justify-between border-b border-border/50 pb-3">
        <div className="flex items-center gap-2">
          <ShieldCheck className="h-4.5 w-4.5 text-primary" />
          <h4 className="font-marketing text-sm font-bold text-fg">
            Tổng hợp tiền ký quỹ (Bảo chứng qua Techcombank/TPBank)
          </h4>
        </div>
        <Badge
          variant="outline"
          className="text-[10px] font-bold bg-success-soft text-success border-success/15"
        >
          Ngân Hàng Bảo Chứng
        </Badge>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 bg-surface-muted/20 rounded-2xl p-4 text-xs">
        <div className="space-y-1">
          <span className="text-muted block font-medium">
            Đang khóa an toàn (Locked)
          </span>
          <span className="text-lg font-bold text-success font-mono">
            {totalLocked.toLocaleString()}đ
          </span>
        </div>
        <div className="space-y-1">
          <span className="text-muted block font-medium">
            Chờ giải tỏa/nộp (Pending)
          </span>
          <span className="text-lg font-bold text-warning font-mono">
            {totalPending.toLocaleString()}đ
          </span>
        </div>
      </div>

      <div className="space-y-3">
        {DEMO_ESCROW_ITEMS.map((item, idx) => (
          <div
            key={idx}
            className="flex items-center justify-between border-b border-border/30 pb-2.5 text-xs last:border-0 last:pb-0"
          >
            <span className="font-semibold text-fg">{item.propertyName}</span>
            <div className="flex items-center gap-3">
              <span className="font-mono font-bold text-fg">
                {item.amount > 0 ? `${item.amount.toLocaleString()}đ` : '0đ'}
              </span>
              <Badge
                variant="outline"
                className={`gap-1 py-0.5 text-[9px] ${
                  item.status === 'locked'
                    ? 'bg-success-soft text-success border-success/15'
                    : item.status === 'pending'
                      ? 'bg-warning-soft text-warning border-warning/15'
                      : 'bg-surface-muted text-muted border-border/60'
                }`}
              >
                {item.status === 'locked' && (
                  <>
                    <Lock className="h-2.5 w-2.5" />
                    Đang khóa
                  </>
                )}
                {item.status === 'pending' && (
                  <>
                    <AlertCircle className="h-2.5 w-2.5 animate-pulse" />
                    Đang chờ cọc
                  </>
                )}
                {item.status === 'empty' && 'Không có cọc'}
              </Badge>
            </div>
          </div>
        ))}
      </div>
    </Card>
  )
}
