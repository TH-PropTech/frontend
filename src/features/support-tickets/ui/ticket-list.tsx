'use client'

import React, { useEffect, useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/shared/ui/card'
import { TicketStatusBadge, TicketPriorityBadge } from './ticket-status-badge'
import { LifeBuoy, Clock, Calendar, Loader2 } from 'lucide-react'
import {
  getMySupportTickets,
  SupportTicketItem,
} from '../api/support-ticket-api'
import { appToast } from '@/shared/ui/app-toast'

interface TicketListProps {
  onSelectTicket?: (ticket: SupportTicketItem) => void
}

export const TicketList: React.FC<TicketListProps> = ({ onSelectTicket }) => {
  const [tickets, setTickets] = useState<SupportTicketItem[]>([])
  const [loading, setLoading] = useState(true)
  const [now] = useState(() => Date.now())

  useEffect(() => {
    let active = true
    getMySupportTickets()
      .then(res => {
        if (active) setTickets(res.items || [])
      })
      .catch((error: unknown) =>
        appToast.error(
          error instanceof Error
            ? error.message
            : 'Không thể tải yêu cầu hỗ trợ'
        )
      )
      .finally(() => {
        if (active) setLoading(false)
      })
    return () => {
      active = false
    }
  }, [])

  if (loading) {
    return (
      <div className="flex items-center justify-center p-8 text-muted gap-2">
        <Loader2 className="w-5 h-5 animate-spin" />
        <span>Đang tải danh sách yêu cầu hỗ trợ...</span>
      </div>
    )
  }

  if (tickets.length === 0) {
    return (
      <Card className="text-center p-8 border-dashed">
        <CardContent className="space-y-3">
          <LifeBuoy className="w-12 h-12 mx-auto text-primary-500 opacity-50" />
          <p className="font-medium text-fg">Chưa có yêu cầu hỗ trợ nào</p>
          <p className="text-sm text-muted">
            Nếu bạn gặp thắc mắc hoặc cần giúp đỡ, hãy tạo ticket hỗ trợ.
          </p>
        </CardContent>
      </Card>
    )
  }

  return (
    <div className="space-y-3">
      {tickets.map(ticket => {
        const isSlaBreached =
          ticket.status !== 'resolved' &&
          ticket.status !== 'closed' &&
          new Date(ticket.slaDeadline).getTime() < now

        return (
          <Card
            key={ticket._id}
            className="hover:border-border-strong transition-colors cursor-pointer"
            onClick={() => onSelectTicket?.(ticket)}
          >
            <CardHeader className="py-3 px-4 flex flex-row items-center justify-between space-y-0">
              <CardTitle className="text-sm font-semibold text-fg flex items-center gap-2">
                <span>{ticket.subject}</span>
              </CardTitle>
              <div className="flex items-center gap-2">
                <TicketPriorityBadge priority={ticket.priority} />
                <TicketStatusBadge status={ticket.status} />
              </div>
            </CardHeader>
            <CardContent className="py-2 px-4 space-y-2 text-xs text-muted border-t border-border flex items-center justify-between">
              <span className="text-muted">Loại: {ticket.category}</span>
              <div className="flex items-center gap-3">
                {isSlaBreached && (
                  <span className="text-danger font-medium flex items-center gap-1">
                    <Clock className="w-3 h-3" /> Trễ SLA
                  </span>
                )}
                <span className="text-subtle flex items-center gap-1">
                  <Calendar className="w-3 h-3" />
                  {new Date(ticket.createdAt).toLocaleDateString('vi-VN')}
                </span>
              </div>
            </CardContent>
          </Card>
        )
      })}
    </div>
  )
}
