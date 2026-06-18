'use client'

import * as React from 'react'
import { apiClient } from '@/shared/api/api-client'
import { toast } from 'sonner'
import { Bell, Check, X, Clock } from 'lucide-react'

interface NotificationItem {
  _id: string
  title: string
  body: string
  type: string
  data?: {
    bookingId?: string
    apartmentId?: string
    status?: string
    rejectedReason?: string
  }
  isRead: boolean
  createdAt: string
}

interface NotificationBellProps {
  isLightHeader: boolean
}

export function NotificationBell({
  isLightHeader,
}: NotificationBellProps): React.ReactElement {
  const [notifications, setNotifications] = React.useState<NotificationItem[]>(
    []
  )
  const [unreadCount, setUnreadCount] = React.useState(0)
  const [isOpen, setIsOpen] = React.useState(false)
  const [loading, setLoading] = React.useState(false)
  const dropdownRef = React.useRef<HTMLDivElement>(null)

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
      }
    } catch (err) {
      console.error('Failed to fetch notifications:', err)
    }
  }, [])

  // Poll for new notifications every 15 seconds
  React.useEffect(() => {
    const timer = setTimeout(() => {
      fetchNotifications()
    }, 0)
    const interval = setInterval(fetchNotifications, 15000)
    return () => {
      clearTimeout(timer)
      clearInterval(interval)
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

  const handleRejectBooking = async (
    e: React.MouseEvent,
    notificationId: string,
    bookingId: string
  ) => {
    e.stopPropagation()
    const reason = prompt('Vui lòng nhập lý do từ chối lịch hẹn:')
    if (reason === null) return // Cancelled
    if (!reason.trim()) {
      toast.error('Vui lòng nhập lý do từ chối!')
      return
    }

    setLoading(true)
    try {
      await apiClient.patch(`/bookings/${bookingId}/status`, {
        status: 'rejected',
        rejectedReason: reason.trim(),
      })
      toast.info('Đã từ chối lịch hẹn xem nhà.')
      await handleMarkAsRead(notificationId)
      fetchNotifications()
    } catch (err) {
      const message =
        err instanceof Error ? err.message : 'Không thể từ chối lịch hẹn'
      toast.error(message)
    } finally {
      setLoading(false)
    }
  }

  const formatTime = (dateStr: string) => {
    const date = new Date(dateStr)
    const now = new Date()
    const diffMs = now.getTime() - date.getTime()
    const diffMins = Math.floor(diffMs / 60000)
    const diffHours = Math.floor(diffMins / 600)

    if (diffMins < 1) return 'Vừa xong'
    if (diffMins < 60) return `${diffMins} phút trước`
    if (diffHours < 24) return `${Math.floor(diffMins / 60)} giờ trước`
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

          <div className="max-h-80 overflow-y-auto space-y-2.5 pr-1 scrollbar-thin">
            {notifications.length === 0 ? (
              <div className="py-8 text-center text-xs text-muted font-medium">
                Bạn chưa có thông báo nào.
              </div>
            ) : (
              notifications.map(n => {
                const isBookingRequest =
                  n.type === 'BOOKING' &&
                  n.title.includes('Yêu cầu đặt lịch') &&
                  n.data?.bookingId
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
                      <div className="mt-2.5 flex gap-2">
                        <button
                          disabled={loading}
                          onClick={e =>
                            handleApproveBooking(e, n._id, n.data!.bookingId!)
                          }
                          className="px-3 py-1.5 bg-primary hover:bg-primary-hover text-white text-[9px] font-bold rounded-lg flex items-center gap-1 cursor-pointer disabled:opacity-50"
                        >
                          <Check className="h-2.5 w-2.5" />
                          Đồng ý
                        </button>
                        <button
                          disabled={loading}
                          onClick={e =>
                            handleRejectBooking(e, n._id, n.data!.bookingId!)
                          }
                          className="px-3 py-1.5 border border-border hover:bg-surface-muted text-fg text-[9px] font-bold rounded-lg flex items-center gap-1 cursor-pointer disabled:opacity-50"
                        >
                          <X className="h-2.5 w-2.5" />
                          Từ chối
                        </button>
                      </div>
                    )}

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
    </div>
  )
}
