'use client'

import * as React from 'react'
import { toast } from 'sonner'
import {
  NOTIFICATION_ERROR_MESSAGES,
  NotificationCard,
  RejectBookingDialog,
  groupNotificationsByDay,
  useBookingDecision,
  useNotifications,
  type NotificationErrorKind,
  type UseBookingDecisionResult,
  type UseNotificationsResult,
} from '@/entities/notification'

type Filter = 'all' | 'unread'

const PAGE_SIZE = 20

const FILTER_TABS: ReadonlyArray<{ id: Filter; label: string }> = [
  { id: 'all', label: 'Tất cả' },
  { id: 'unread', label: 'Chưa đọc' },
]

const FOCUS_RING =
  'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2'

const PANEL_ID = 'notification-center-panel'

interface FilterTabsProps {
  value: Filter
  onChange: (filter: Filter) => void
}

function FilterTabs({ value, onChange }: FilterTabsProps): React.ReactElement {
  return (
    <div
      role="tablist"
      aria-label="Lọc thông báo"
      className="mt-6 flex gap-2 overflow-x-auto border-b border-border"
    >
      {FILTER_TABS.map(tab => (
        <button
          key={tab.id}
          type="button"
          role="tab"
          id={`notification-tab-${tab.id}`}
          aria-selected={value === tab.id}
          aria-controls={PANEL_ID}
          onClick={() => onChange(tab.id)}
          className={`min-h-11 shrink-0 cursor-pointer whitespace-nowrap border-b-2 px-4 text-sm font-bold ${FOCUS_RING} ${
            value === tab.id
              ? 'border-primary text-primary'
              : 'border-transparent text-muted hover:text-fg'
          }`}
        >
          {tab.label}
        </button>
      ))}
    </div>
  )
}

interface PaginationProps {
  page: number
  totalPages: number
  onChange: (page: number) => void
}

function Pagination({
  page,
  totalPages,
  onChange,
}: PaginationProps): React.ReactElement | null {
  if (totalPages <= 1) return null
  const buttonClass = `min-h-11 cursor-pointer rounded-xl border border-border px-4 text-sm font-bold text-fg hover:bg-surface-muted disabled:cursor-not-allowed disabled:opacity-50 ${FOCUS_RING}`
  return (
    <nav
      aria-label="Phân trang thông báo"
      className="mt-6 flex items-center justify-between gap-3"
    >
      <button
        type="button"
        aria-label="Trang trước"
        disabled={page <= 1}
        onClick={() => onChange(page - 1)}
        className={buttonClass}
      >
        Trước
      </button>
      <span className="text-sm font-semibold text-muted">
        {`Trang ${page} / ${totalPages}`}
      </span>
      <button
        type="button"
        aria-label="Trang sau"
        disabled={page >= totalPages}
        onClick={() => onChange(page + 1)}
        className={buttonClass}
      >
        Sau
      </button>
    </nav>
  )
}

interface PanelProps {
  items: UseNotificationsResult['items']
  status: UseNotificationsResult['status']
  errorKind: NotificationErrorKind | null
  filter: Filter
  decision: UseBookingDecisionResult
  onRetry: () => void
  onOpen: (id: string) => void
  onDelete: (id: string) => void
}

function Panel({
  items,
  status,
  errorKind,
  filter,
  decision,
  onRetry,
  onOpen,
  onDelete,
}: PanelProps): React.ReactElement {
  const groups = React.useMemo(() => groupNotificationsByDay(items), [items])

  if (errorKind) {
    return (
      <div
        role="alert"
        className="rounded-2xl border border-warning/30 bg-warning/10 p-4"
      >
        <p className="text-sm font-medium text-warning">
          {NOTIFICATION_ERROR_MESSAGES[errorKind]}
        </p>
        <button
          type="button"
          onClick={onRetry}
          className={`mt-3 min-h-11 cursor-pointer rounded-xl bg-primary px-4 text-sm font-bold text-white hover:bg-primary-hover ${FOCUS_RING}`}
        >
          Thử lại
        </button>
      </div>
    )
  }
  if (status === 'loading') {
    return (
      <p
        role="status"
        className="py-12 text-center text-sm font-medium text-muted"
      >
        Đang tải thông báo...
      </p>
    )
  }
  if (items.length === 0) {
    return (
      <p className="py-12 text-center text-sm font-medium text-muted">
        {filter === 'unread'
          ? 'Không có thông báo chưa đọc.'
          : 'Bạn chưa có thông báo nào.'}
      </p>
    )
  }
  return (
    <div className="space-y-6">
      {groups.map(group => (
        <section key={group.label} aria-label={group.label}>
          <h2 className="mb-3 text-xs font-bold uppercase tracking-wide text-muted">
            {group.label}
          </h2>
          <ul className="space-y-2.5">
            {group.items.map(notification => (
              <NotificationCard
                key={notification._id}
                notification={notification}
                onOpen={onOpen}
                onDelete={onDelete}
                bookingBusy={decision.busy}
                onApproveBooking={decision.approve}
                onRejectBooking={decision.startReject}
              />
            ))}
          </ul>
        </section>
      ))}
    </div>
  )
}

export function NotificationCenter(): React.ReactElement {
  const [filter, setFilter] = React.useState<Filter>('all')
  const [page, setPage] = React.useState(1)
  const {
    items,
    unreadCount,
    totalPages,
    status,
    errorKind,
    refresh,
    markRead,
    markAllRead,
    remove,
  } = useNotifications({
    page,
    limit: PAGE_SIZE,
    ...(filter === 'unread' && { isRead: false }),
  })
  const decision = useBookingDecision({
    onDecided: async id => {
      await markRead(id)
      await refresh()
    },
  })

  const handleFilterChange = (next: Filter): void => {
    setFilter(next)
    setPage(1)
  }

  const handleMarkAllRead = async (): Promise<void> => {
    if (await markAllRead()) {
      toast.success('Đã đánh dấu tất cả là đã đọc')
      return
    }
    toast.error('Không thể đánh dấu đã đọc. Vui lòng thử lại.')
  }

  const handleDelete = async (id: string): Promise<void> => {
    const wasLastOnPage = items.length === 1 && page > 1
    if (!(await remove(id))) {
      toast.error('Không thể xóa thông báo. Vui lòng thử lại.')
      return
    }
    toast.success('Đã xóa thông báo')
    if (wasLastOnPage) setPage(page - 1)
  }

  return (
    <section
      aria-labelledby="notification-center-title"
      className="mx-auto w-full max-w-3xl"
    >
      <header className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <h1
            id="notification-center-title"
            className="font-marketing text-2xl font-bold text-fg"
          >
            Thông báo
          </h1>
          <p aria-live="polite" className="mt-1 text-sm text-muted">
            {unreadCount > 0
              ? `Bạn có ${unreadCount} thông báo chưa đọc`
              : 'Bạn đã đọc hết thông báo'}
          </p>
        </div>
        {unreadCount > 0 ? (
          <button
            type="button"
            onClick={() => void handleMarkAllRead()}
            className={`min-h-11 cursor-pointer rounded-xl border border-border px-4 text-sm font-bold text-primary hover:bg-surface-muted ${FOCUS_RING}`}
          >
            Đọc tất cả
          </button>
        ) : null}
      </header>

      <FilterTabs value={filter} onChange={handleFilterChange} />

      <div
        role="tabpanel"
        id={PANEL_ID}
        aria-labelledby={`notification-tab-${filter}`}
        className="mt-6"
      >
        <Panel
          items={items}
          status={status}
          errorKind={errorKind}
          filter={filter}
          decision={decision}
          onRetry={() => void refresh()}
          onOpen={id => void markRead(id)}
          onDelete={id => void handleDelete(id)}
        />
      </div>

      <Pagination page={page} totalPages={totalPages} onChange={setPage} />

      <RejectBookingDialog
        open={decision.isRejecting}
        reason={decision.reason}
        busy={decision.busy}
        onReasonChange={decision.setReason}
        onConfirm={() => void decision.confirmReject()}
        onCancel={decision.cancelReject}
      />
    </section>
  )
}
