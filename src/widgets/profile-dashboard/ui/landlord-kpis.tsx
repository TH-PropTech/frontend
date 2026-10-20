'use client'

import * as React from 'react'
import { Card } from '@/shared/ui/card'
import { Building2, TrendingUp, Banknote, AlertCircle } from 'lucide-react'
import type { LandlordStats } from '../model/types'

interface LandlordKpisProps {
  /** Số liệu thật; bỏ trống = số demo. */
  stats?: LandlordStats | undefined
  /** Số sự cố chờ duyệt; null = chưa có dữ liệu. Bỏ trống = số demo. */
  pendingIssues?: number | null | undefined
}

const DEMO_STATS: LandlordStats = {
  total: 3,
  occupied: 2,
  occupancyPct: 66.7,
  monthlyRevenue: 36_000_000,
}

const fmtRevenue = (vnd: number): string =>
  vnd >= 1_000_000
    ? `${Math.round((vnd / 1_000_000) * 10) / 10}M VND`
    : `${vnd.toLocaleString('vi-VN')} VND`

export function LandlordKpis({
  stats = DEMO_STATS,
  pendingIssues = 1,
}: LandlordKpisProps): React.ReactElement {
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
          <span className="text-lg font-bold text-fg block font-mono">
            {stats.total}
          </span>
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
            {stats.occupancyPct}%
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
            {fmtRevenue(stats.monthlyRevenue)}
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
            {pendingIssues ?? '—'}
          </span>
        </div>
      </Card>
    </div>
  )
}
