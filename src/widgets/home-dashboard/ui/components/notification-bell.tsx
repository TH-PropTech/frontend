'use client'

import * as React from 'react'
import { ApiClientError, apiClient } from '@/shared/api/api-client'
import { toast } from 'sonner'
import { Bell, Check, X, Clock } from 'lucide-react'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from '@/shared/ui/dialog'

interface NotificationItem {
  _id: string
  title: string
  body: string
  type: string
  data?: {
    bookingId?: string
    apartmentId?: string
    link?: string
    amount?: number
    receivedAmount?: number
    status?: string
    rejectedReason?: string
  }
  isRead: boolean
  createdAt: string
}

interface NotificationBellProps {
  isLightHeader: boolean
}

type NotificationError = 'network' | 'auth' | 'unknown'

export function NotificationBell({
  isLightHeader,
}: NotificationBellProps): React.ReactElement {
  const [notifications, setNotifications] = React.useState<NotificationItem[]>(
    []
  )
  const [unreadCount, setUnreadCount] = React.useState(0)
  const [isOpen, setIsOpen] = React.useState(false)
  const [loading, setLoading] = React.useState(false)
  const [notificationError, setNotificationError] =
    React.useState<NotificationError | null>(null)
  const dropdownRef = React.useRef<HTMLDivElement>(null)
  const [rejectingBooking, setRejectingBooking] = React.useState<{
    notifId: string
    bookingId: string
  } | null>(null)
  const [rejectReason, setRejectReason] = React.useState('')

  const fetchNotifications = React.useCallback(async () => {
    const token =
      typeof window !== 'undefined' ? localStorage.getItem('accessToken') : null
    if (!token) return

    try {
      const data = await apiClient.get<{
        items: NotificationItem[]
        total: number
      }>('/notifications?limit=10')
      if (data && data.items) {
        setNotifications(data.items)
        const unread = data.items.filter(n => !n.isRead).length
        // Fetch unread count specifically or calculate from current list
        setUnreadCount(unread)
        setNotificationError(null)
      }
    } catch (err) {
      if (err instanceof ApiClientError && err.status === 0) {
        setNotificationError('network')
        return
      }
      if (err instanceof ApiClientError && [401, 403].includes(err.status)) {
        setNotificationError('auth')
        return
      }
      setNotificationError('unknown')
      console.error('Failed to fetch notifications:', err)
    }
  }, [])

  React.useEffect(() => {
    const timer = setTimeout(() => {
      void fetchNotifications()
    }, 0)
    return () => {
      clearTimeout(timer)
    }
  }, [fetchNotifications])

  // Close dropdown on click outside
  React.useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  const handleToggle = () => {
    setIsOpen(!isOpen)
    if (!isOpen) {
      // Mark all as read visually or fetch fresh
      fetchNotifications()
    }
  }

  const handleMarkAsRead = async (id: string) => {
    try {
      await apiClient.patch(`/notifications/${id}/read`, {})
      setNotifications(prev =>
        prev.map(n => (n._id === id ? { ...n, isRead: true } : n))
      )
      setUnreadCount(prev => Math.max(0, prev - 1))
    } catch (err) {
      console.error('Failed to mark notification as read:', err)
    }
  }

  const handleMarkAllRead = async () => {
    try {
      await apiClient.post('/notifications/read-all', {})
      setNotifications(prev => prev.map(n => ({ ...n, isRead: true })))
      setUnreadCount(0)
      toast.success('Đã đánh dấu tất cả là đã đọc')
    } catch (err) {
      console.error('Failed to mark all as read:', err)
    }
  }

  const handleApproveBooking = async (
    e: React.MouseEvent,
    notificationId: string,
    bookingId: string
  ) => {
    e.stopPropagation()
    setLoading(true)
    try {
      await apiClient.patch(`/bookings/${bookingId}/status`, {
        status: 'confirmed',
      })
      toast.success('Đã xác nhận lịch hẹn xem nhà!')
      await handleMarkAsRead(notificationId)
      fetchNotifications()
    } catch (err) {
      const message =
        err instanceof Error ? err.message : 'Không thể xác nhận lịch hẹn'
      toast.error(message)
    } finally {
      setLoading(false)
    }
  }

  const handleRejectBookingClick = (
    e: React.MouseEvent,
    notificationId: string,
    bookingId: string
  ) => {
    e.stopPropagation()
    setRejectingBooking({ notifId: notificationId, bookingId })
  }

  const handleConfirmReject = async () => {
    if (!rejectReason.trim()) {
      toast.error('Vui lòng nhập lý do từ chối!')
      return
    }
    if (!rejectingBooking) return

    const { notifId, bookingId } = rejectingBooking
    setLoading(true)
    try {
      await apiClient.patch(`/bookings/${bookingId}/status`, {
        status: 'rejected',
        rejectedReason: rejectReason.trim(),
      })
      toast.info('Đã từ chối lịch hẹn xem nhà.')
      await handleMarkAsRead(notifId)
      fetchNotifications()
    } catch (err) {
      const message =
        err instanceof Error ? err.message : 'Không thể từ chối lịch hẹn'
      toast.error(message)
    } finally {
      setLoading(false)
      setRejectingBooking(null)
      setRejectReason('')
    }
  }

  const formatTime = (dateStr: string) => {
    const date = new Date(dateStr)
    const now = new Date()
    const diffMs = now.getTime() - date.getTime()
    const diffMins = Math.floor(diffMs / 60000)
    const diffHours = Math.floor(diffMins / 60)
    const diffDays = Math.floor(diffHours / 24)

    if (diffMins < 1) return 'Vừa xong'
    if (diffMins < 60) return `${diffMins} phút trước`
    if (diffHours < 24) return `${diffHours} giờ trước`
    if (diffDays < 30) return `${diffDays} ngày trước`
    return date.toLocaleDateString('vi-VN', {
      day: '2-digit',
      month: '2-digit',
      hour: '2-digit',
      minute: '2-digit',
    })
  }

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={handleToggle}
        className={`flex h-11 w-11 items-center justify-center rounded-full border transition-all hover:scale-105 active:scale-95 relative cursor-pointer ${
          isLightHeader
            ? 'border-border bg-white text-primary hover:bg-surface-muted'
            : 'border-white/25 bg-black/20 text-white hover:bg-black/40'
        }`}
        title="Thông báo"
      >
        <Bell className="h-5 w-5" />
        {unreadCount > 0 && (
          <span className="absolute -right-1 -top-1 flex h-5 w-5 items-center justify-center rounded-full bg-danger text-[10px] font-bold text-white shadow-sm animate-pulse-subtle">
            {unreadCount}
          </span>
        )}
      </button>

      {/* Beautiful Dropdown Card */}
      {isOpen && (
        <div className="absolute right-0 mt-3 w-80 sm:w-96 rounded-3xl border border-border bg-white p-4 shadow-xl z-50 animate-in fade-in slide-in-from-top-2 duration-200">
          <div className="flex items-center justify-between border-b border-border/50 pb-2.5 mb-2">
            <h4 className="font-marketing text-sm font-bold text-fg">
              Thông báo mới nhận
            </h4>
            {unreadCount > 0 && (
              <button
                onClick={handleMarkAllRead}
                className="text-[10px] font-bold text-primary hover:text-primary-hover flex items-center gap-1 cursor-pointer"
              >
                Đọc tất cả
              </button>
            )}
          </div>

          {notificationError ? (
            <p
              role="alert"
              className="mb-2 rounded-xl border border-warning/30 bg-warning/10 p-3 text-xs font-medium text-warning"
            >
              {notificationError === 'network'
                ? 'Không thể kết nối máy chủ thông báo. Vui lòng thử lại khi mở lại danh sách.'
                : notificationError === 'auth'
                  ? 'Phiên đăng nhập không còn hợp lệ. Vui lòng đăng nhập lại.'
                  : 'Không thể tải thông báo lúc này. Vui lòng thử lại sau.'}
            </p>
          ) : null}

          <div className="max-h-80 overflow-y-auto space-y-2.5 pr-1 scrollbar-thin">
            {notificationError ? null : notifications.length === 0 ? (
              <div className="py-8 text-center text-xs text-muted font-medium">
                Bạn chưa có thông báo nào.
              </div>
            ) : (
              notifications.map(n => {
                const isBookingRequest =
                  n.type === 'BOOKING' &&
                  n.title.includes('Yêu cầu đặt lịch') &&
                  n.data?.bookingId
                const payoutLink =
                  n.type === 'PAYOUT_PENDING' ||
                  n.type === 'PLATFORM_FEE_INVOICE'
                    ? n.data?.link
                    : undefined
                const payoutLinkLabel =
                  n.type === 'PLATFORM_FEE_INVOICE'
                    ? 'Xem hóa đơn phí hoa hồng'
                    : 'Mở trang xác nhận chuyển tiền'
                return (
                  <div
                    key={n._id}
                    onClick={() => handleMarkAsRead(n._id)}
                    className={`p-3 rounded-2xl border text-left transition-all relative group cursor-pointer ${
                      n.isRead
                        ? 'bg-white border-border/40 hover:bg-surface-muted/30'
                        : 'bg-primary-soft/10 border-primary/20 hover:bg-primary-soft/20'
                    }`}
                  >
                    {!n.isRead && (
                      <span className="absolute right-3 top-3.5 h-2 w-2 rounded-full bg-primary" />
                    )}
                    <div className="pr-4">
                      <h5 className="font-marketing text-xs font-bold text-fg leading-tight">
                        {n.title}
                      </h5>
                      <p className="font-body text-[11px] text-muted mt-1 leading-relaxed">
                        {n.body}
                      </p>
                    </div>

                    {/* Pending booking action buttons inside notification */}
                    {isBookingRequest && (
                      <div className="mt-2.5">
                        {!n.data?.status || n.data.status === 'pending' ? (
                          <div className="flex gap-2">
                            <button
                              disabled={loading}
                              onClick={e =>
                                handleApproveBooking(
                                  e,
                                  n._id,
                                  n.data!.bookingId!
                                )
                              }
                              className="px-3 py-1.5 bg-primary hover:bg-primary-hover text-white text-[9px] font-bold rounded-lg flex items-center gap-1 cursor-pointer disabled:opacity-50"
                            >
                              <Check className="h-2.5 w-2.5" />
                              Đồng ý
                            </button>
                            <button
                              disabled={loading}
                              onClick={e =>
                                handleRejectBookingClick(
                                  e,
                                  n._id,
                                  n.data!.bookingId!
                                )
                              }
                              className="px-3 py-1.5 border border-border hover:bg-surface-muted text-fg text-[9px] font-bold rounded-lg flex items-center gap-1 cursor-pointer disabled:opacity-50"
                            >
                              <X className="h-2.5 w-2.5" />
                              Từ chối
                            </button>
                          </div>
                        ) : (
                          <div className="text-[10px] font-bold flex items-center gap-1 mt-1">
                            {n.data.status === 'confirmed' && (
                              <span className="text-success bg-success-soft/20 px-2 py-0.5 rounded-md border border-success/15 flex items-center gap-0.5">
                                <Check className="h-2.5 w-2.5" /> Đã đồng ý
                              </span>
                            )}
                            {n.data.status === 'rejected' && (
                              <span className="text-danger bg-danger-soft/20 px-2 py-0.5 rounded-md border border-danger/15 flex items-center gap-0.5">
                                <X className="h-2.5 w-2.5" /> Đã từ chối
                              </span>
                            )}
                            {n.data.status === 'cancelled' && (
                              <span className="text-subtle bg-surface-muted px-2 py-0.5 rounded-md border border-border flex items-center gap-0.5 font-normal">
                                <X className="h-2.5 w-2.5" /> Đã hủy
                              </span>
                            )}
                          </div>
                        )}
                      </div>
                    )}

                    {payoutLink ? (
                      <a
                        href={payoutLink}
                        onClick={event => event.stopPropagation()}
                        className="mt-2 inline-flex min-h-8 items-center rounded-lg bg-primary px-3 py-1.5 text-[10px] font-bold text-white transition-colors hover:bg-primary-hover focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"
                      >
                        {payoutLinkLabel}
                        {typeof n.data?.amount === 'number'
                          ? ` (${n.data.amount.toLocaleString('vi-VN')} VND)`
                          : ''}
                      </a>
                    ) : null}

                    <div className="mt-2 flex items-center gap-1 text-[9px] text-muted font-semibold">
                      <Clock className="h-3 w-3" />
                      <span>{formatTime(n.createdAt)}</span>
                    </div>
                  </div>
                )
              })
            )}
          </div>

          <div className="border-t border-border/50 pt-2 mt-2 text-center">
            <a
              href="/profile"
              onClick={() => setIsOpen(false)}
              className="text-[10px] font-bold text-muted hover:text-fg block py-1 transition-all"
            >
              Xem tất cả trên trang cá nhân
            </a>
          </div>
        </div>
      )}

      {/* Reject Reason Dialog */}
      <Dialog
        open={!!rejectingBooking}
        onOpenChange={open => {
          if (!open) {
            setRejectingBooking(null)
            setRejectReason('')
          }
        }}
      >
        <DialogContent className="bg-white rounded-3xl max-w-md p-6 border border-border shadow-lg text-left">
          <DialogHeader>
            <DialogTitle className="font-marketing text-lg font-bold text-fg">
              Từ chối lịch hẹn
            </DialogTitle>
            <DialogDescription className="text-xs text-muted font-body">
              Vui lòng nhập lý do từ chối lịch hẹn xem phòng này.
            </DialogDescription>
          </DialogHeader>
          <div className="py-2">
            <textarea
              value={rejectReason}
              onChange={e => setRejectReason(e.target.value)}
              placeholder="Lý do từ chối..."
              className="w-full min-h-24 p-3 border border-border rounded-xl text-xs focus:outline-none focus:ring-1 focus:ring-primary font-body text-fg bg-white"
            />
          </div>
          <DialogFooter className="flex justify-end gap-2 mt-2">
            <button
              onClick={() => {
                setRejectingBooking(null)
                setRejectReason('')
              }}
              className="border border-border hover:bg-surface-muted text-xs rounded-xl h-9 px-4 cursor-pointer text-fg"
            >
              Hủy bỏ
            </button>
            <button
              onClick={handleConfirmReject}
              disabled={loading}
              className="bg-primary hover:bg-primary-hover text-white text-xs rounded-xl h-9 px-4 cursor-pointer font-bold disabled:opacity-50"
            >
              Xác nhận từ chối
            </button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
