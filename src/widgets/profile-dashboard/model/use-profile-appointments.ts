import * as React from 'react'
import { toast } from 'sonner'
import { DEMO_APPOINTMENTS } from './mock-data'

export function useProfileAppointments() {
  const [appointments, setAppointments] = React.useState(DEMO_APPOINTMENTS)

  const handleApproveAppointment = (id: string): void => {
    setAppointments(prev =>
      prev.map(a => (a.id === id ? { ...a, status: 'confirmed' } : a))
    )
    toast.success('Đã xác nhận lịch hẹn xem nhà!')
  }

  const handleRejectAppointment = (id: string): void => {
    setAppointments(prev =>
      prev.map(a => (a.id === id ? { ...a, status: 'rejected' } : a))
    )
    toast.info('Đã từ chối lịch hẹn xem nhà.')
  }

  return {
    appointments,
    setAppointments,
    handleApproveAppointment,
    handleRejectAppointment,
  }
}
