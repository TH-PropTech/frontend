'use client'

import * as React from 'react'
import { Button } from '@/shared/ui/button'

export function BookingWidget(): React.ReactElement {
  // Form states for booking/consultation
  const [formData, setFormData] = React.useState({
    fullName: '',
    phone: '',
    visitDate: '',
    visitTime: 'morning', // morning, afternoon, evening
    notes: '',
  })
  const [isSubmitting, setIsSubmitting] = React.useState(false)
  const [showSuccessToast, setShowSuccessToast] = React.useState(false)

  const handleInputChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!formData.fullName || !formData.phone) {
      alert('Vui lòng điền đầy đủ Họ tên và Số điện thoại')
      return
    }

    setIsSubmitting(true)
    setTimeout(() => {
      setIsSubmitting(false)
      setShowSuccessToast(true)
      // Reset form
      setFormData({
        fullName: '',
        phone: '',
        visitDate: '',
        visitTime: 'morning',
        notes: '',
      })
      setTimeout(() => setShowSuccessToast(false), 4000)
    }, 1200)
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
              Ngày xem phòng
            </label>
            <input
              type="date"
              name="visitDate"
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

      {/* Success Notification Toast */}
      <div
        className={`fixed top-24 right-6 z-[100] max-w-md transition-all duration-300 transform will-change-[transform,opacity] ${
          showSuccessToast
            ? 'translate-y-0 opacity-100'
            : '-translate-y-4 opacity-0 pointer-events-none'
        }`}
      >
        <div className="rounded-2xl border border-success-strong bg-success-soft/20 backdrop-blur-md p-4 shadow-lg flex gap-3">
          <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-success text-white">
            <svg
              className="h-4 w-4"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth="3"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="m4.5 12.75 6 6 9-13.5"
              />
            </svg>
          </div>
          <div className="text-left">
            <h4 className="font-marketing text-sm font-bold text-success-strong">
              Đăng ký xem phòng thành công!
            </h4>
            <p className="font-body text-xs text-muted mt-0.5 leading-relaxed">
              Yêu cầu của bạn đã được ghi nhận. Nhân viên tư vấn căn hộ sẽ gọi
              điện xác nhận lịch hẹn xem phòng với bạn trong vòng 15 phút tới.
            </p>
          </div>
        </div>
      </div>
    </>
  )
}
