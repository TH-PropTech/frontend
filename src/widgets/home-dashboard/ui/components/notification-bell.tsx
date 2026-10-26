'use client'

import * as React from 'react'
import { Bell } from 'lucide-react'
import { toast } from 'sonner'
import {
  RejectBookingDialog,
  useBookingDecision,
  useNotifications,
} from '@/entities/notification'
import { NotificationDropdown } from './notification-dropdown'

interface NotificationBellProps {
  isLightHeader: boolean
}

const BADGE_MAX = 99
const DROPDOWN_LIMIT = 10

export function NotificationBell({
  isLightHeader,
}: NotificationBellProps): React.ReactElement {
  const [isOpen, setIsOpen] = React.useState(false)
  const containerRef = React.useRef<HTMLDivElement>(null)
  const buttonRef = React.useRef<HTMLButtonElement>(null)
  const dropdownId = React.useId()
  const {
    items,
    unreadCount,
    status,
    errorKind,
    refresh,
    markRead,
    markAllRead,
  } = useNotifications({ limit: DROPDOWN_LIMIT })
  const decision = useBookingDecision({
    onDecided: async id => {
      await markRead(id)
      await refresh()
    },
  })

  React.useEffect(() => {
    if (!isOpen) return
    function handleMouseDown(event: MouseEvent): void {
      if (!containerRef.current?.contains(event.target as Node)) {
        setIsOpen(false)
      }
    }
    function handleKeyDown(event: KeyboardEvent): void {
      if (event.key !== 'Escape') return
      setIsOpen(false)
      buttonRef.current?.focus()
    }
    document.addEventListener('mousedown', handleMouseDown)
    document.addEventListener('keydown', handleKeyDown)
    return () => {
      document.removeEventListener('mousedown', handleMouseDown)
      document.removeEventListener('keydown', handleKeyDown)
    }
  }, [isOpen])

  const handleToggle = (): void => {
    if (!isOpen) void refresh()
    setIsOpen(!isOpen)
  }

  const handleMarkAllRead = async (): Promise<void> => {
    if (await markAllRead()) {
      toast.success('Đã đánh dấu tất cả là đã đọc')
      return
    }
    toast.error('Không thể đánh dấu đã đọc. Vui lòng thử lại.')
  }

  return (
    <div className="relative" ref={containerRef}>
      <button
        ref={buttonRef}
        type="button"
        onClick={handleToggle}
        title="Thông báo"
        aria-label={
          unreadCount > 0 ? `Thông báo, ${unreadCount} chưa đọc` : 'Thông báo'
        }
        aria-expanded={isOpen}
        aria-controls={isOpen ? dropdownId : undefined}
        className={`relative flex h-11 w-11 cursor-pointer items-center justify-center rounded-full border transition-all hover:scale-105 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 active:scale-95 ${
          isLightHeader
            ? 'border-border bg-white text-primary hover:bg-surface-muted'
            : 'border-white/25 bg-black/20 text-white hover:bg-black/40'
        }`}
      >
        <Bell className="h-5 w-5" aria-hidden="true" />
        {unreadCount > 0 ? (
          <span
            aria-hidden="true"
            className="animate-pulse-subtle absolute -right-1 -top-1 flex min-h-5 min-w-5 items-center justify-center rounded-full bg-danger px-1 text-[11px] font-bold text-white shadow-sm"
          >
            {unreadCount > BADGE_MAX ? `${BADGE_MAX}+` : unreadCount}
          </span>
        ) : null}
      </button>

      {isOpen ? (
        <NotificationDropdown
          id={dropdownId}
          items={items}
          unreadCount={unreadCount}
          status={status}
          errorKind={errorKind}
          decision={decision}
          onOpenNotification={id => void markRead(id)}
          onMarkAllRead={() => void handleMarkAllRead()}
          onClose={() => setIsOpen(false)}
        />
      ) : null}

      <RejectBookingDialog
        open={decision.isRejecting}
        reason={decision.reason}
        busy={decision.busy}
        onReasonChange={decision.setReason}
        onConfirm={() => void decision.confirmReject()}
        onCancel={decision.cancelReject}
      />
    </div>
  )
}
