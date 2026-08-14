import React from 'react'
import { Badge } from '@/shared/ui/badge'
import {
  AlertTriangle,
  CheckCircle2,
  Clock,
  ShieldAlert,
  XCircle,
} from 'lucide-react'
import type { SafetyReportStatus } from '../api/safety-report-api'

interface ReportStatusBadgeProps {
  status: SafetyReportStatus
}

export const ReportStatusBadge: React.FC<ReportStatusBadgeProps> = ({
  status,
}) => {
  switch (status) {
    case 'pending':
      return (
        <Badge
          variant="outline"
          style={{
            borderColor: 'var(--warning)',
            color: 'var(--warning)',
            backgroundColor: 'var(--warning-soft)',
          }}
          className="gap-1 font-semibold"
        >
          <Clock className="w-3 h-3" />
          Chờ xử lý
        </Badge>
      )
    case 'investigating':
      return (
        <Badge
          variant="outline"
          style={{
            borderColor: 'var(--primary)',
            color: 'var(--primary)',
            backgroundColor: 'var(--primary-soft)',
          }}
          className="gap-1 font-semibold"
        >
          <ShieldAlert className="w-3 h-3" />
          Đang xác minh
        </Badge>
      )
    case 'resolved':
      return (
        <Badge
          variant="outline"
          style={{
            borderColor: 'var(--success)',
            color: 'var(--success)',
            backgroundColor: 'var(--success-soft)',
          }}
          className="gap-1 font-semibold"
        >
          <CheckCircle2 className="w-3 h-3" />
          Đã xử lý
        </Badge>
      )
    case 'dismissed':
      return (
        <Badge
          variant="outline"
          style={{
            borderColor: 'var(--border-strong)',
            color: 'var(--muted)',
            backgroundColor: 'var(--surface-muted)',
          }}
          className="gap-1 font-semibold"
        >
          <XCircle className="w-3 h-3" />
          Bác bỏ
        </Badge>
      )
    case 'appealed':
      return (
        <Badge
          variant="outline"
          style={{
            borderColor: 'var(--danger)',
            color: 'var(--danger)',
            backgroundColor: 'var(--danger-soft)',
          }}
          className="gap-1 font-semibold"
        >
          <AlertTriangle className="w-3 h-3" />
          Đang khiếu nại
        </Badge>
      )
    default:
      return <Badge variant="secondary">{status}</Badge>
  }
}
