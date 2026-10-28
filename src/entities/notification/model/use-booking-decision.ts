import * as React from 'react'
import { toast } from 'sonner'
import { apiClient } from '@/shared/api'
import type { NotificationItem } from '../api/notifications-api'

export interface UseBookingDecisionOptions {
  /** Gọi sau khi quyết định thành công, thường để đánh dấu đã đọc và tải lại. */
  onDecided: (notificationId: string) => Promise<void> | void
}

export interface UseBookingDecisionResult {
  busy: boolean
  isRejecting: boolean
  reason: string
  setReason: (reason: string) => void
  approve: (notification: NotificationItem) => Promise<void>
  startReject: (notification: NotificationItem) => void
  cancelReject: () => void
  confirmReject: () => Promise<void>
}

interface PendingReject {
  notificationId: string
  bookingId: string
}

function bookingIdOf(notification: NotificationItem): string | null {
  const bookingId = notification.data?.bookingId
  return typeof bookingId === 'string' && bookingId !== '' ? bookingId : null
}

function errorMessage(error: unknown, fallback: string): string {
  return error instanceof Error ? error.message : fallback
}

export function useBookingDecision({
  onDecided,
}: UseBookingDecisionOptions): UseBookingDecisionResult {
  const [busy, setBusy] = React.useState(false)
  const [pendingReject, setPendingReject] =
    React.useState<PendingReject | null>(null)
  const [reason, setReason] = React.useState('')

  const approve = async (notification: NotificationItem): Promise<void> => {
    const bookingId = bookingIdOf(notification)
    if (!bookingId) return
    setBusy(true)
    try {
      await apiClient.patch(`/bookings/${bookingId}/status`, {
        status: 'confirmed',
      })
      toast.success('Đã xác nhận lịch hẹn xem nhà!')
      await onDecided(notification._id)
    } catch (error) {
      toast.error(errorMessage(error, 'Không thể xác nhận lịch hẹn'))
    } finally {
      setBusy(false)
    }
  }

  const startReject = (notification: NotificationItem): void => {
    const bookingId = bookingIdOf(notification)
    if (bookingId) {
      setPendingReject({ notificationId: notification._id, bookingId })
    }
  }

  const cancelReject = (): void => {
    setPendingReject(null)
    setReason('')
  }

  const confirmReject = async (): Promise<void> => {
    if (!pendingReject) return
    const trimmedReason = reason.trim()
    if (!trimmedReason) {
      toast.error('Vui lòng nhập lý do từ chối!')
      return
    }
    setBusy(true)
    try {
      await apiClient.patch(`/bookings/${pendingReject.bookingId}/status`, {
        status: 'rejected',
        rejectedReason: trimmedReason,
      })
      toast.info('Đã từ chối lịch hẹn xem nhà.')
      cancelReject()
      await onDecided(pendingReject.notificationId)
    } catch (error) {
      // Giữ hộp thoại và lý do đã nhập để người dùng thử lại.
      toast.error(errorMessage(error, 'Không thể từ chối lịch hẹn'))
    } finally {
      setBusy(false)
    }
  }

  return {
    busy,
    isRejecting: pendingReject !== null,
    reason,
    setReason,
    approve,
    startReject,
    cancelReject,
    confirmReject,
  }
}
