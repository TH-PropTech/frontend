'use client'

import * as React from 'react'
import { Card } from '@/shared/ui/card'
import { Badge } from '@/shared/ui/badge'
import {
  FileText,
  Calendar,
  DollarSign,
  Clock,
  ShieldAlert,
} from 'lucide-react'
import type { ContractSummary } from '../model/types'

interface LandlordContractSummaryProps {
  /** Hợp đồng thật từ backend. */
  summary: ContractSummary
}

export function LandlordContractSummary({
  summary,
}: LandlordContractSummaryProps): React.ReactElement {
  return (
    <Card className="bg-white border border-border rounded-3xl p-6 shadow-sm text-left space-y-4">
      <div className="flex items-center justify-between border-b border-border/50 pb-3">
        <div className="flex items-center gap-2">
          <FileText className="h-4.5 w-4.5 text-primary" />
          <h4 className="font-marketing text-sm font-bold text-fg">
            Tóm tắt điều khoản hợp đồng thông minh
          </h4>
        </div>
        <Badge
          variant="outline"
          className="text-[9px] font-mono bg-success-soft text-success border-success/15"
        >
          Mã HĐ: {summary.code}
        </Badge>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-3 text-xs">
        <div className="flex items-center justify-between border-b border-border/40 pb-2">
          <span className="text-muted flex items-center gap-1.5 font-medium">
            <Calendar className="h-3.5 w-3.5 text-subtle" />
            Thời hạn thuê
          </span>
          <span className="text-fg font-bold">{summary.duration}</span>
        </div>

        <div className="flex items-center justify-between border-b border-border/40 pb-2">
          <span className="text-muted flex items-center gap-1.5 font-medium">
            <Calendar className="h-3.5 w-3.5 text-subtle" />
            Ngày hiệu lực
          </span>
          <span className="text-fg font-semibold">
            {summary.startDate} → {summary.endDate}
          </span>
        </div>

        <div className="flex items-center justify-between border-b border-border/40 pb-2">
          <span className="text-muted flex items-center gap-1.5 font-medium">
            <DollarSign className="h-3.5 w-3.5 text-subtle" />
            Giá thuê mỗi tháng
          </span>
          <span className="text-fg font-bold text-primary">
            {summary.monthlyRent.toLocaleString()}đ
          </span>
        </div>

        <div className="flex items-center justify-between border-b border-border/40 pb-2">
          <span className="text-muted flex items-center gap-1.5 font-medium">
            <DollarSign className="h-3.5 w-3.5 text-subtle" />
            Tiền đặt cọc
          </span>
          <span className="text-fg font-bold">
            {summary.deposit.toLocaleString()}đ
          </span>
        </div>

        <div className="flex items-center justify-between border-b border-border/40 pb-2">
          <span className="text-muted flex items-center gap-1.5 font-medium">
            <Clock className="h-3.5 w-3.5 text-subtle" />
            Ngày thanh toán hàng tháng
          </span>
          <span className="text-fg font-semibold">
            Trước mùng {summary.paymentDay}
          </span>
        </div>

        <div className="flex items-center justify-between border-b border-border/40 pb-2">
          <span className="text-muted flex items-center gap-1.5 font-medium">
            <ShieldAlert className="h-3.5 w-3.5 text-subtle" />
            Phạt chậm thanh toán
          </span>
          <span className="text-fg font-semibold text-danger">
            {summary.latePenalty}
          </span>
        </div>
      </div>

      <div className="bg-success-soft/10 border border-success/15 rounded-2xl p-4 flex items-center justify-between gap-4 text-xs">
        <div className="space-y-0.5">
          <span className="text-muted block font-medium">
            Trạng thái vận hành
          </span>
          <span className="text-success font-bold flex items-center gap-1">
            <span className="h-1.5 w-1.5 rounded-full bg-success animate-pulse" />
            Hợp đồng thông minh đang hoạt động
          </span>
        </div>
        <div className="text-right">
          <span className="text-muted block font-medium">
            Thời gian còn lại
          </span>
          <span className="font-mono font-bold text-fg">
            {summary.daysRemaining} ngày
          </span>
        </div>
      </div>
    </Card>
  )
}
