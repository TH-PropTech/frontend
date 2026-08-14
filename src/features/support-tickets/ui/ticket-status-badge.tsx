import React from 'react'
import { Badge } from '@/shared/ui/badge'
import {
  Clock,
  CheckCircle2,
  AlertTriangle,
  MessageSquare,
  ArrowUpRight,
  Lock,
} from 'lucide-react'
import type { TicketStatus, TicketPriority } from '../api/support-ticket-api'

interface TicketStatusBadgeProps {
  status: TicketStatus
}

export const TicketStatusBadge: React.FC<TicketStatusBadgeProps> = ({
  status,
}) => {
  switch (status) {
    case 'open':
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
          <Clock className="w-3 h-3" />
          Mới mở
        </Badge>
      )
    case 'in_progress':
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
          <Clock className="w-3 h-3 animate-pulse" />
          Đang xử lý
        </Badge>
      )
    case 'waiting_customer':
      return (
        <Badge
          variant="outline"
          style={{
            borderColor: 'var(--accent)',
            color: 'var(--fg)',
            backgroundColor: 'var(--accent-soft)',
          }}
          className="gap-1 font-semibold"
        >
          <MessageSquare className="w-3 h-3" />
          Chờ phản hồi
        </Badge>
      )
    case 'waiting_staff':
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
          Chờ nhân viên
        </Badge>
      )
    case 'escalated':
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
          <ArrowUpRight className="w-3 h-3" />
          Đã chuyển tiếp
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
          Đã giải quyết
        </Badge>
      )
    case 'closed':
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
          <Lock className="w-3 h-3" />
          Đã đóng
        </Badge>
      )
    default:
      return <Badge variant="secondary">{status}</Badge>
  }
}

export const TicketPriorityBadge: React.FC<{ priority: TicketPriority }> = ({
  priority,
}) => {
  switch (priority) {
    case 'urgent':
      return (
        <Badge
          style={{
            backgroundColor: 'var(--danger)',
            color: 'var(--surface)',
          }}
          className="font-bold gap-1"
        >
          <AlertTriangle className="w-3 h-3" /> Khẩn cấp (SLA 4h)
        </Badge>
      )
    case 'high':
      return (
        <Badge
          style={{
            backgroundColor: 'var(--warning)',
            color: 'var(--surface)',
          }}
          className="font-medium"
        >
          Cao (SLA 8h)
        </Badge>
      )
    case 'normal':
      return (
        <Badge
          style={{
            backgroundColor: 'var(--surface-muted)',
            color: 'var(--fg)',
            borderColor: 'var(--border)',
          }}
          className="border"
        >
          Bình thường (SLA 24h)
        </Badge>
      )
    case 'low':
      return (
        <Badge
          variant="outline"
          style={{
            borderColor: 'var(--border)',
            color: 'var(--muted)',
          }}
        >
          Thấp (SLA 72h)
        </Badge>
      )
    default:
      return null
  }
}
