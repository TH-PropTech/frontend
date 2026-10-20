'use client'

import * as React from 'react'
import { Clock, LifeBuoy, Loader2 } from 'lucide-react'
import { Button } from '@/shared/ui/button'
import {
  getTicketQueue,
  resolveSupportTicket,
  type SupportTicketItem,
} from '@/features/support-tickets'
import { appToast } from '@/shared/ui/app-toast'
import { AdminCard } from '@/shared/ui/admin-card'
import { useCan } from '@/shared/lib/permissions'

export function SupportQueueView(): React.ReactElement {
  const can = useCan()
  const canUpdate = can('update', 'SupportTicket')
  const [tickets, setTickets] = React.useState<SupportTicketItem[]>([])
  const [loading, setLoading] = React.useState(true)
  const [now] = React.useState(() => Date.now())

  React.useEffect(() => {
    getTicketQueue()
      .then(result => setTickets(result.items))
      .catch((error: unknown) =>
        appToast.error(
          error instanceof Error
            ? error.message
            : 'Không thể tải hàng đợi hỗ trợ'
        )
      )
      .finally(() => setLoading(false))
  }, [])

  const resolve = async (ticket: SupportTicketItem): Promise<void> => {
    try {
      const updated = await resolveSupportTicket(
        ticket._id,
        'Đã xử lý bởi bộ phận hỗ trợ'
      )
      setTickets(current =>
        current.map(item => (item._id === updated._id ? updated : item))
      )
      appToast.success('Đã giải quyết yêu cầu hỗ trợ')
    } catch (error: unknown) {
      appToast.error(
        error instanceof Error ? error.message : 'Không thể giải quyết yêu cầu'
      )
    }
  }

  if (loading)
    return (
      <div className="flex items-center gap-2 p-8 text-muted">
        <Loader2 className="h-5 w-5 animate-spin" /> Đang tải ticket...
      </div>
    )

  return (
    <div className="space-y-4">
      <div>
        <h2 className="flex items-center gap-2 text-xl font-bold text-fg">
          <LifeBuoy className="h-5 w-5 text-primary" /> Hàng đợi hỗ trợ SLA
        </h2>
        <p className="mt-1 text-sm text-muted">
          Ticket gần hết hạn được đưa lên trước từ backend.
        </p>
      </div>
      {tickets.length === 0 ? (
        <AdminCard className="border-dashed p-8 text-center text-sm text-muted">
          Không có ticket cần xử lý.
        </AdminCard>
      ) : (
        tickets.map(ticket => {
          const breached =
            !['resolved', 'closed'].includes(ticket.status) &&
            new Date(ticket.slaDeadline).getTime() < now
          return (
            <article
              key={ticket._id}
              className="rounded-2xl border border-border bg-surface p-5"
            >
              <div className="flex flex-wrap items-start justify-between gap-3">
                <div>
                  <h3 className="font-bold text-fg">{ticket.subject}</h3>
                  <p className="mt-1 text-sm text-muted">
                    {ticket.description}
                  </p>
                </div>
                <span className="rounded-full bg-primary-soft px-3 py-1 text-xs font-bold text-primary">
                  {ticket.priority} · {ticket.status}
                </span>
              </div>
              <div className="mt-4 flex items-center justify-between gap-3">
                <span
                  className={
                    breached
                      ? 'flex items-center gap-1 text-xs font-bold text-danger'
                      : 'flex items-center gap-1 text-xs text-muted'
                  }
                >
                  <Clock className="h-4 w-4" /> SLA:{' '}
                  {new Date(ticket.slaDeadline).toLocaleString('vi-VN')}
                </span>
                {canUpdate &&
                  !['resolved', 'closed'].includes(ticket.status) && (
                    <Button size="sm" onClick={() => void resolve(ticket)}>
                      Đánh dấu đã xử lý
                    </Button>
                  )}
              </div>
            </article>
          )
        })
      )}
    </div>
  )
}
