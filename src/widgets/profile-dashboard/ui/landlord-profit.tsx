'use client'

import * as React from 'react'
import { Card } from '@/shared/ui/card'
import { Badge } from '@/shared/ui/badge'
import { DollarSign, TrendingUp, ArrowDown, ArrowUp } from 'lucide-react'
import { DEMO_PROFIT_ITEMS } from '../model/mock-data'

export function LandlordProfit(): React.ReactElement {
  const totalIncome = DEMO_PROFIT_ITEMS.reduce(
    (acc, item) => (item.type === 'income' ? acc + item.amount : acc),
    0
  )
  const totalExpense = DEMO_PROFIT_ITEMS.reduce(
    (acc, item) =>
      item.type === 'expense' ? acc + Math.abs(item.amount) : acc,
    0
  )
  const netProfit = totalIncome - totalExpense
  const marginPercent = ((netProfit / totalIncome) * 100).toFixed(1)

  return (
    <Card className="bg-white border border-border rounded-3xl p-6 shadow-sm text-left space-y-4">
      <div className="flex items-center justify-between border-b border-border/50 pb-3">
        <div className="flex items-center gap-2">
          <DollarSign className="h-4.5 w-4.5 text-primary" />
          <h4 className="font-marketing text-sm font-bold text-fg">
            Phân tích lợi nhuận ròng hàng tháng
          </h4>
        </div>
        <Badge
          variant="outline"
          className="text-[10px] font-bold bg-secondary-soft text-secondary border-secondary/15"
        >
          Tỷ suất: {marginPercent}%
        </Badge>
      </div>

      <div className="space-y-3">
        {DEMO_PROFIT_ITEMS.map((item, idx) => (
          <div
            key={idx}
            className="flex items-center justify-between border-b border-border/30 pb-2.5 text-xs last:border-0 last:pb-0"
          >
            <span className="text-muted flex items-center gap-1.5 font-medium">
              {item.type === 'income' ? (
                <ArrowUp className="h-3.5 w-3.5 text-success shrink-0" />
              ) : (
                <ArrowDown className="h-3.5 w-3.5 text-danger shrink-0" />
              )}
              {item.label}
            </span>
            <span
              className={`font-mono font-bold ${
                item.type === 'income' ? 'text-success' : 'text-danger'
              }`}
            >
              {item.amount > 0 ? '+' : ''}
              {item.amount.toLocaleString()}đ
            </span>
          </div>
        ))}
      </div>

      <div className="bg-primary-soft/10 border border-primary/15 rounded-2xl p-4 flex items-center justify-between gap-4 text-xs mt-2">
        <div className="space-y-0.5">
          <span className="text-muted block font-medium">
            Lợi nhuận ròng thực nhận
          </span>
          <span className="text-base font-bold text-primary font-mono">
            {netProfit.toLocaleString()}đ
          </span>
        </div>
        <div className="text-right">
          <span className="text-muted block font-medium">Xu hướng tháng</span>
          <span className="text-success font-bold flex items-center justify-end gap-0.5">
            <TrendingUp className="h-3.5 w-3.5" />
            +4.2%
          </span>
        </div>
      </div>
    </Card>
  )
}
