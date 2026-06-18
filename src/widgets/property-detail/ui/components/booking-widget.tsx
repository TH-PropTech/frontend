'use client'

import * as React from 'react'
import { Button } from '@/shared/ui/button'
import { apiClient } from '@/shared/api/api-client'
import { toast } from 'sonner'

interface BookingWidgetProps {
  propertyId: string
}

export function BookingWidget({
  propertyId,
}: BookingWidgetProps): React.ReactElement {
  // Form states for booking/consultation
  const [formData, setFormData] = React.useState({
    fullName: '',
    phone: '',
    visitDate: '',
    visitTime: 'morning', // morning, afternoon, evening
    notes: '',
  })
  const [isSubmitting, setIsSubmitting] = React.useState(false)

  // Auto-fill tenant info from localStorage user object if available
  React.useEffect(() => {
    let timer: NodeJS.Timeout | undefined
    if (typeof window !== 'undefined') {
      const stored = localStorage.getItem('user')
      if (stored) {
        try {
          const u = JSON.parse(stored)
          timer = setTimeout(() => {
            setFormData(prev => ({
              ...prev,
              fullName: u.name || '',
              phone: u.phone || '',
            }))
          }, 0)
        } catch (e) {
          console.error(e)
        }
      }
    }
    return () => {
      if (timer) clearTimeout(timer)
    }
  }, [])

  const handleInputChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!formData.fullName || !formData.phone) {
      toast.error('Vui lòng điền đầy đủ Họ tên và Số điện thoại')
      return
    }
    if (!formData.visitDate) {
      toast.error('Vui lòng chọn ngày xem phòng')
      return
    }

    const token =
      typeof window !== 'undefined' ? localStorage.getItem('accessToken') : null
    if (!token) {
      toast.warning('Vui lòng đăng nhập trước khi đặt lịch hẹn xem nhà.')
      return
    }

    setIsSubmitting(true)
    try {
      // Map visitTime to exact time segment
      const timeMap: Record<string, string> = {
        morning: '09:00',
        afternoon: '14:00',
        evening: '19:00',
      }
      const timeStr = timeMap[formData.visitTime] || '14:00'
      const visitAt = `${formData.visitDate}T${timeStr}:00`

      await apiClient.post('/bookings', {
        apartmentId: propertyId,
        visitAt: new Date(visitAt).toISOString(),
        method: 'onsite',
        note: formData.notes || '',
      })

      toast.success('Đăng ký xem phòng thành công!', {
        description:
          'Yêu cầu đặt lịch của bạn đã được ghi nhận. Chủ nhà sẽ nhận được thông báo ngay lập tức và xác nhận lịch hẹn với bạn.',
      })
      // Reset form (keeping full name and phone)
      setFormData(prev => ({
        ...prev,
        visitDate: '',
        visitTime: 'morning',
        notes: '',
      }))
    } catch (err) {
      console.error('Booking failed:', err)
      const message =
        err instanceof Error
          ? err.message
          : 'Không thể đăng ký lịch hẹn. Vui lòng thử lại!'
      toast.error(message)
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <>
      <div className="bg-white border border-border rounded-3xl p-6 shadow-md relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-1.5 bg-primary" />
        <h3 className="font-marketing text-base font-bold text-fg mb-1">
          Lên lịch xem căn hộ
        </h3>
        <p className="text-xs text-muted leading-relaxed mb-4">
          Để lại thông tin, chuyên viên tư vấn sẽ chuẩn bị khóa phòng và dẫn bạn
          xem trực tiếp trong vòng 15 phút.
        </p>

        <form onSubmit={handleFormSubmit} className="space-y-3.5 text-left">
          <div>
            <label className="text-[10px] uppercase font-bold text-muted tracking-wider block mb-1">
              Họ và tên *
            </label>
            <input
              type="text"
              name="fullName"
              required
              value={formData.fullName}
              onChange={handleInputChange}
              placeholder="Nguyễn Văn A"
              className="w-full px-3 py-2 text-xs font-semibold rounded-xl border border-border bg-surface-muted/50 focus:outline-none focus:border-primary"
            />
          </div>

          <div>
            <label className="text-[10px] uppercase font-bold text-muted tracking-wider block mb-1">
              Số điện thoại *
            </label>
            <input
              type="tel"
              name="phone"
              required
              value={formData.phone}
              onChange={handleInputChange}
              placeholder="0901234567"
              className="w-full px-3 py-2 text-xs font-semibold rounded-xl border border-border bg-surface-muted/50 focus:outline-none focus:border-primary"
            />
          </div>

          <div>
            <label className="text-[10px] uppercase font-bold text-muted tracking-wider block mb-1">
              Ngày xem phòng *
            </label>
            <input
              type="date"
              name="visitDate"
              required
              value={formData.visitDate}
              onChange={handleInputChange}
              className="w-full px-3 py-2 text-xs font-semibold rounded-xl border border-border bg-surface-muted/50 focus:outline-none focus:border-primary cursor-pointer"
            />
          </div>
          <div>
            <label className="text-[10px] uppercase font-bold text-muted tracking-wider block mb-1">
              Khung giờ
            </label>
            <select
              name="visitTime"
              value={formData.visitTime}
              onChange={handleInputChange}
              className="w-full pl-3 pr-10 py-2 text-xs font-semibold rounded-xl border border-border bg-surface-muted/50 focus:outline-none focus:border-primary cursor-pointer"
            >
              <option value="morning">Sáng (8:00-12:00)</option>
              <option value="afternoon">Chiều (13:00-18:00)</option>
              <option value="evening">Tối (18:00-21:00)</option>
            </select>
          </div>

          <div>
            <label className="text-[10px] uppercase font-bold text-muted tracking-wider block mb-1">
              Ghi chú yêu cầu
            </label>
            <textarea
              name="notes"
              value={formData.notes}
              onChange={handleInputChange}
              rows={2}
              placeholder="Có thú cưng đi cùng, cần thang máy..."
              className="w-full px-3 py-2 text-xs font-semibold rounded-xl border border-border bg-surface-muted/50 focus:outline-none focus:border-primary resize-none"
            />
          </div>

          <Button
            type="submit"
            loading={isSubmitting}
            className="w-full rounded-xl py-3 text-xs font-bold shadow-md shadow-primary/10 mt-2"
          >
            Đăng ký lịch hẹn ngay
          </Button>
        </form>
      </div>
    </>
  )
}
