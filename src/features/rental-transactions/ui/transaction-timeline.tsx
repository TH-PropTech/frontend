'use client'

import * as React from 'react'
import { RefreshCw } from 'lucide-react'
import { Button } from '@/shared/ui/button'
import {
  getRentalTransactionTimeline,
  type RentalTransactionEvent,
} from '../api/rental-transactions-api'

export function sanitizeTimelineEvent(
  event: RentalTransactionEvent
): RentalTransactionEvent {
  return {
    id: event.id,
    applicationId: event.applicationId ?? null,
    contractId: event.contractId ?? null,
    eventType: event.eventType,
    status: event.status,
    occurredAt: event.occurredAt,
    actorRole: event.actorRole ?? null,
    summary: event.summary ?? null,
  }
}

export interface TransactionTimelineProps {
  applicationId: string
  initialEvents?: RentalTransactionEvent[]
}

export function TransactionTimeline({
  applicationId,
  initialEvents,
}: TransactionTimelineProps): React.ReactElement {
  const [events, setEvents] = React.useState<RentalTransactionEvent[]>(
    initialEvents ?? []
  )
  const [loading, setLoading] = React.useState(initialEvents === undefined)
  const [error, setError] = React.useState<string | null>(null)

  const load = React.useCallback(async (): Promise<void> => {
    setLoading(true)
    setError(null)
    try {
      const next = await getRentalTransactionTimeline(applicationId)
      setEvents(next.map(sanitizeTimelineEvent))
    } catch (cause: unknown) {
      setError(
        cause instanceof Error ? cause.message : 'Không thể tải dòng thời gian.'
      )
    } finally {
      setLoading(false)
    }
  }, [applicationId])

  React.useEffect(() => {
    if (initialEvents !== undefined) return
    const timer = window.setTimeout(() => {
      void load()
    }, 0)
    return () => window.clearTimeout(timer)
  }, [initialEvents, load])

  return (
    <section
      data-testid="transaction-timeline"
      className="space-y-4 rounded-xl border border-line bg-surface p-5"
    >
      <header className="flex items-center justify-between gap-3">
        <div>
          <h2 className="text-base font-bold text-fg">
            Dòng thời gian giao dịch
          </h2>
          <p className="mt-1 text-xs text-muted">
            Chỉ hiển thị sự kiện đã làm sạch cho participant.
          </p>
        </div>
        <Button
          type="button"
          size="sm"
          variant="secondary"
          loading={loading}
          onClick={() => void load()}
          aria-label="Làm mới dòng thời gian"
        >
          <RefreshCw className="h-4 w-4" />
          Làm mới
        </Button>
      </header>
      {error ? (
        <p role="alert" className="text-sm text-danger">
          {error}
        </p>
      ) : null}
      {loading && events.length === 0 ? (
        <p role="status" className="text-sm text-muted">
          Đang tải dòng thời gian...
        </p>
      ) : null}
      {!loading && !error && events.length === 0 ? (
        <p role="status" className="text-sm text-muted">
          Chưa có sự kiện giao dịch.
        </p>
      ) : null}
      <ol className="space-y-3">
        {events.map(event => (
          <li
            key={event.id}
            className="rounded-lg border border-line bg-surface-muted/30 p-3"
          >
            <div className="flex items-center justify-between gap-3">
              <span className="text-xs font-bold text-fg">
                {event.eventType}
              </span>
              <span className="text-[10px] text-muted">
                {new Date(event.occurredAt).toLocaleString('vi-VN')}
              </span>
            </div>
            <p className="mt-1 text-xs text-muted">
              {event.summary ?? event.status}
            </p>
          </li>
        ))}
      </ol>
    </section>
  )
}
