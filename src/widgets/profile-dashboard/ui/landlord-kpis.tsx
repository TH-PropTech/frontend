'use client'

import * as React from 'react'
import { Card } from '@/shared/ui/card'
import { Building2, TrendingUp, Banknote, AlertCircle } from 'lucide-react'

export function LandlordKpis(): React.ReactElement {
  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-left">
      <Card className="bg-white border border-border rounded-2xl p-4 flex items-center gap-3.5 shadow-sm">
        <div className="text-primary flex items-center justify-center shrink-0">
          <Building2 className="h-6 w-6" />
        </div>
        <div className="space-y-0.5">
          <span className="text-[10px] text-muted font-bold uppercase tracking-wider block">
            Tổng căn hộ
          </span>
          <span className="text-lg font-bold text-fg block font-mono">3</span>
        </div>
      </Card>

      <Card className="bg-white border border-border rounded-2xl p-4 flex items-center gap-3.5 shadow-sm">
        <div className="h-10 w-10 rounded-full bg-success-soft/50 flex items-center justify-center text-success shrink-0">
          <TrendingUp className="h-5 w-5" />
        </div>
        <div className="space-y-0.5">
          <span className="text-[10px] text-muted font-bold uppercase tracking-wider block">
            Tỷ lệ lấp đầy
          </span>
          <span className="text-lg font-bold text-fg block font-mono">
            66.7%
          </span>
        </div>
      </Card>

      <Card className="bg-white border border-border rounded-2xl p-4 flex items-center gap-3.5 shadow-sm">
        <div className="h-10 w-10 rounded-full bg-secondary-soft/50 flex items-center justify-center text-secondary shrink-0">
          <Banknote className="h-5 w-5" />
        </div>
        <div className="space-y-0.5">
          <span className="text-[10px] text-muted font-bold uppercase tracking-wider block">
            Doanh thu tháng
          </span>
          <span className="text-lg font-bold text-fg block font-mono">
            36M VND
          </span>
        </div>
      </Card>

      <Card className="bg-white border border-border rounded-2xl p-4 flex items-center gap-3.5 shadow-sm">
        <div className="h-10 w-10 rounded-full bg-warning-soft/50 flex items-center justify-center text-warning shrink-0">
          <AlertCircle className="h-5 w-5" />
        </div>
        <div className="space-y-0.5">
          <span className="text-[10px] text-muted font-bold uppercase tracking-wider block">
            Sự cố chờ duyệt
          </span>
          <span className="text-lg font-bold text-fg block font-mono font-bold text-warning">
            1
          </span>
        </div>
      </Card>
    </div>
  )
}
