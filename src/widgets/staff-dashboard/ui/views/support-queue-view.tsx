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
import { AdminErrorState } from '@/shared/ui/admin-error-state'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from '@/shared/ui/dialog'
import { Textarea } from '@/shared/ui/textarea'
import { useCan } from '@/shared/lib/permissions'
import {
  getPriorityLabel,
  getTicketStatusLabel,
} from '../../model/admin-labels'

export function SupportQueueView(): React.ReactElement {
  const can = useCan()
  const canUpdate = can('update', 'SupportTicket')
  const [tickets, setTickets] = React.useState<SupportTicketItem[]>([])
  const [loading, setLoading] = React.useState(true)
  const [error, setError] = React.useState<string | null>(null)
  const [now] = React.useState(() => Date.now())

  const [resolvingTicket, setResolvingTicket] =
    React.useState<SupportTicketItem | null>(null)
  const [resolutionNote, setResolutionNote] = React.useState('')
  const [isSubmitting, setIsSubmitting] = React.useState(false)

  const loadTickets = React.useCallback(() => {
    setLoading(true)
    setError(null)
    getTicketQueue()
      .then(result => setTickets(result.items))
      .catch((err: unknown) => {
        const msg =
          err instanceof Error ? err.message : 'Không thể tải hàng đợi hỗ trợ'
        setError(msg)
        appToast.error(msg)
      })
      .finally(() => setLoading(false))
  }, [])

  React.useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    loadTickets()
  }, [loadTickets])

  const handleOpenResolveDialog = (ticket: SupportTicketItem): void => {
    setResolvingTicket(ticket)
    setResolutionNote('')
  }

  const handleConfirmResolve = async (): Promise<void> => {
    if (!resolvingTicket) return
    const note = resolutionNote.trim()
    if (note.length < 5) {
      appToast.error('Ghi chú xử lý phải có ít nhất 5 ký tự')
      return
    }

    setIsSubmitting(true)
    try {
      const updated = await resolveSupportTicket(resolvingTicket._id, note)
      setTickets(current =>
        current.map(item => (item._id === updated._id ? updated : item))
      )
      appToast.success('Đã giải quyết yêu cầu hỗ trợ')
      setResolvingTicket(null)
      setResolutionNote('')
    } catch (err: unknown) {
      appToast.error(
        err instanceof Error ? err.message : 'Không thể giải quyết yêu cầu'
      )
    } finally {
      setIsSubmitting(false)
    }
  }

  if (loading) {
    return (
      <div className="flex items-center gap-2 p-8 text-muted">
        <Loader2 className="h-5 w-5 animate-spin" /> Đang tải ticket...
      </div>
    )
  }

  if (error) {
    return (
      <AdminErrorState
        title="Lỗi tải hàng đợi hỗ trợ"
        message={error}
        onRetry={loadTickets}
      />
    )
  }

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
                  {getPriorityLabel(ticket.priority)} ·{' '}
                  {getTicketStatusLabel(ticket.status)}
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
                    <Button
                      type="button"
                      size="sm"
                      onClick={() => handleOpenResolveDialog(ticket)}
                    >
                      Đánh dấu đã xử lý
                    </Button>
                  )}
              </div>
            </article>
          )
        })
      )}

      {/* Dialog nhập ghi chú giải quyết ticket */}
      <Dialog
        open={!!resolvingTicket}
        onOpenChange={open => {
          if (!open) {
            setResolvingTicket(null)
            setResolutionNote('')
          }
        }}
      >
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>Ghi chú giải quyết yêu cầu</DialogTitle>
            <DialogDescription>
              Nhập nội dung xử lý cho yêu cầu: &quot;{resolvingTicket?.subject}
              &quot;
            </DialogDescription>
          </DialogHeader>
          <div className="py-2 space-y-2">
            <Textarea
              value={resolutionNote}
              onChange={e => setResolutionNote(e.target.value)}
              placeholder="Mô tả phương án xử lý hoặc kết quả giải quyết (tối thiểu 5 ký tự)..."
              rows={4}
              className="resize-none text-xs"
            />
          </div>
          <DialogFooter className="gap-2 sm:gap-0">
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={() => {
                setResolvingTicket(null)
                setResolutionNote('')
              }}
              disabled={isSubmitting}
            >
              Hủy
            </Button>
            <Button
              type="button"
              size="sm"
              onClick={() => void handleConfirmResolve()}
              disabled={isSubmitting || resolutionNote.trim().length < 5}
            >
              {isSubmitting ? 'Đang lưu...' : 'Xác nhận xử lý'}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
