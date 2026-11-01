import * as React from 'react'
import { toast } from 'sonner'
import { apiClient } from '@/shared/api/api-client'
import { Appointment } from './types'

interface BookingItem {
  _id?: string
  id?: string
  tenantName?: string
  tenantPhone?: string
  apartmentId?: string
  apartmentTitle?: string
  visitAt?: string
  status?: 'pending' | 'confirmed' | 'rejected' | 'cancelled' | 'completed'
}

interface BookingResponse {
  items?: BookingItem[]
}

export function useProfileAppointments(role: 'tenant' | 'landlord' = 'tenant') {
  const [appointments, setAppointments] = React.useState<Appointment[]>([])
  const [loading, setLoading] = React.useState(false)

  const fetchAppointments = React.useCallback(async () => {
    const token =
      typeof window !== 'undefined' ? localStorage.getItem('accessToken') : null
    if (!token) {
      setAppointments([])
      return
    }

    setLoading(true)
    try {
      const path =
        role === 'landlord'
          ? '/bookings/landlord?limit=100'
          : '/bookings/my?limit=100'
      const response = await apiClient.get<BookingResponse>(path)
      const items = response?.items || []

      const mapped = items.map((b: BookingItem) => ({
        id: b._id || b.id || '',
        guestName: b.tenantName || 'Ẩn danh',
        phone: b.tenantPhone || 'Không có',
        propertyId: b.apartmentId || '',
        propertyName: b.apartmentTitle || 'Căn hộ',
        date: b.visitAt ? new Date(b.visitAt).toLocaleDateString('vi-VN') : '',
        time: b.visitAt
          ? new Date(b.visitAt).toLocaleTimeString('vi-VN', {
              hour: '2-digit',
              minute: '2-digit',
            })
          : '',
        status: b.status || 'pending',
      }))
      setAppointments(mapped)
    } catch (err) {
      console.error('Failed to fetch appointments:', err)
      setAppointments([])
    } finally {
      setLoading(false)
    }
  }, [role])

  React.useEffect(() => {
    const timer = setTimeout(() => {
      fetchAppointments()
    }, 0)
    return () => clearTimeout(timer)
  }, [fetchAppointments])

  const handleApproveAppointment = async (id: string): Promise<void> => {
    const token =
      typeof window !== 'undefined' ? localStorage.getItem('accessToken') : null
    if (!token) {
      toast.error('Vui lòng đăng nhập để thực hiện thao tác')
      return
    }

    try {
      await apiClient.patch(`/bookings/${id}/status`, { status: 'confirmed' })
      toast.success('Đã xác nhận lịch hẹn xem nhà!')
      fetchAppointments()
    } catch (err) {
      const message =
        err instanceof Error ? err.message : 'Không thể xác nhận lịch hẹn'
      toast.error(message)
    }
  }

  const handleRejectAppointment = async (
    id: string,
    reason: string
  ): Promise<void> => {
    const token =
      typeof window !== 'undefined' ? localStorage.getItem('accessToken') : null
    if (!token) {
      toast.error('Vui lòng đăng nhập để thực hiện thao tác')
      return
    }

    try {
      await apiClient.patch(`/bookings/${id}/status`, {
        status: 'rejected',
        rejectedReason: reason,
      })
      toast.info('Đã từ chối lịch hẹn xem nhà.')
      fetchAppointments()
    } catch (err) {
      const message =
        err instanceof Error ? err.message : 'Không thể từ chối lịch hẹn'
      toast.error(message)
    }
  }

  const handleCancelAppointment = async (id: string): Promise<void> => {
    const token =
      typeof window !== 'undefined' ? localStorage.getItem('accessToken') : null
    if (!token) {
      toast.error('Vui lòng đăng nhập để thực hiện thao tác')
      return
    }

    try {
      await apiClient.patch(`/bookings/${id}/cancel`, {})
      toast.success('Đã hủy lịch hẹn xem nhà thành công!')
      fetchAppointments()
    } catch (err) {
      const message =
        err instanceof Error ? err.message : 'Không thể hủy lịch hẹn'
      toast.error(message)
    }
  }

  const handleCompleteAppointment = async (id: string): Promise<void> => {
    const token =
      typeof window !== 'undefined' ? localStorage.getItem('accessToken') : null
    if (!token) {
      toast.error('Vui lòng đăng nhập để thực hiện thao tác')
      return
    }

    try {
      await apiClient.patch(`/bookings/${id}/status`, { status: 'completed' })
      toast.success('Đã đánh dấu lịch hẹn xem nhà hoàn tất!')
      fetchAppointments()
    } catch (err) {
      const message =
        err instanceof Error ? err.message : 'Không thể cập nhật lịch hẹn'
      toast.error(message)
    }
  }

  return {
    appointments,
    loading,
    setAppointments,
    handleApproveAppointment,
    handleRejectAppointment,
    handleCancelAppointment,
    handleCompleteAppointment,
    refetchAppointments: fetchAppointments,
  }
}
