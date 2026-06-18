import * as React from 'react'
import { toast } from 'sonner'
import { apiClient } from '@/shared/api/api-client'
import { DEMO_APPOINTMENTS } from './mock-data'
import { Appointment } from './types'

interface BookingItem {
  _id?: string
  id?: string
  tenantName?: string
  tenantPhone?: string
  apartmentId?: string
  apartmentTitle?: string
  visitAt?: string
  status?: 'pending' | 'confirmed' | 'rejected'
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
      setAppointments(DEMO_APPOINTMENTS)
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
      setAppointments(DEMO_APPOINTMENTS)
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
      // Mock update
      setAppointments(prev =>
        prev.map(a => (a.id === id ? { ...a, status: 'confirmed' } : a))
      )
      toast.success('Đã xác nhận lịch hẹn xem nhà! (Chế độ Demo)')
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

  const handleRejectAppointment = async (id: string): Promise<void> => {
    const token =
      typeof window !== 'undefined' ? localStorage.getItem('accessToken') : null
    if (!token) {
      // Mock update
      setAppointments(prev =>
        prev.map(a => (a.id === id ? { ...a, status: 'rejected' } : a))
      )
      toast.info('Đã từ chối lịch hẹn xem nhà. (Chế độ Demo)')
      return
    }

    const reason = prompt('Vui lòng nhập lý do từ chối lịch hẹn:')
    if (reason === null) return // User clicked Cancel
    if (!reason.trim()) {
      toast.error('Vui lòng nhập lý do từ chối!')
      return
    }

    try {
      await apiClient.patch(`/bookings/${id}/status`, {
        status: 'rejected',
        rejectedReason: reason.trim(),
      })
      toast.info('Đã từ chối lịch hẹn xem nhà.')
      fetchAppointments()
    } catch (err) {
      const message =
        err instanceof Error ? err.message : 'Không thể từ chối lịch hẹn'
      toast.error(message)
    }
  }

  return {
    appointments,
    loading,
    setAppointments,
    handleApproveAppointment,
    handleRejectAppointment,
    refetchAppointments: fetchAppointments,
  }
}
