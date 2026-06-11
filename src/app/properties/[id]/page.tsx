'use client'

import * as React from 'react'
import Link from 'next/link'
import type { Route } from 'next'
import { useParams } from 'next/navigation'
import { HomeHeader } from '@/widgets/home-dashboard/ui/home-header'
import { Footer } from '@/shared/ui/footer'
import { Button } from '@/shared/ui/button'
import { mockApartments, type ApartmentItem } from '../page'

// Map amenities keys to Vietnamese labels
const AMENITY_LABELS: Record<string, string> = {
  pool: 'Hồ bơi tràn bờ',
  gym: 'Phòng Gym hiện đại',
  parking: 'Bãi đỗ xe thông minh',
  elevator: 'Thang máy thẻ từ',
  security: 'Bảo vệ & Camera 24/7',
  pets: 'Cho phép nuôi thú cưng',
  park: 'Công viên nội khu xanh mát',
}

export default function PropertyDetailPage(): React.ReactElement {
  const params = useParams()
  const propertyId = (params?.id as string) || 'PROP-CAR-101'

  // Retrieve matching property item from mock data
  const property = React.useMemo(() => {
    return (mockApartments.find(apt => apt.id === propertyId) ||
      mockApartments[0]) as ApartmentItem
  }, [propertyId])

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
    <div className="min-h-screen bg-bg text-fg selection:bg-primary/20 selection:text-primary relative pb-28">
      <HomeHeader />

      <main className="w-full">
        {/* Premium Banner Hero Section (Warm Cream Design with Topography Overlay) */}
        <section className="relative overflow-hidden bg-gradient-to-b from-[#f5ece2] via-[#faf6f1] to-bg pb-20 pt-36 rounded-b-[40px] border-b border-border">
          {/* Topography SVG Background (extremely lightweight, vector-rendered) */}
          <div
            className="absolute inset-0 opacity-[0.08] pointer-events-none select-none overflow-hidden"
            style={{
              willChange: 'transform',
              transform: 'translate3d(0, 0, 0)',
              backfaceVisibility: 'hidden',
            }}
          >
            <svg
              className="w-full h-full min-w-[1440px] min-h-[400px]"
              viewBox="0 0 1440 400"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              preserveAspectRatio="none"
            >
              <path
                d="M-100 100 C 300 20, 600 180, 1000 80 C 1200 40, 1500 120, 1600 100"
                stroke="#c65a3a"
                strokeWidth="1.5"
                fill="none"
              />
              <path
                d="M-100 130 C 300 50, 600 210, 1000 110 C 1200 70, 1500 150, 1600 130"
                stroke="#c65a3a"
                strokeWidth="1.5"
                fill="none"
              />
              <path
                d="M-100 160 C 300 80, 600 240, 1000 140 C 1200 100, 1500 180, 1600 160"
                stroke="#c65a3a"
                strokeWidth="1.5"
                fill="none"
              />
              <path
                d="M-100 190 C 300 110, 600 270, 1000 170 C 1200 130, 1500 210, 1600 190"
                stroke="#c65a3a"
                strokeWidth="1.5"
                fill="none"
              />
              <path
                d="M-100 220 C 300 140, 600 300, 1000 200 C 1200 160, 1500 240, 1600 220"
                stroke="#c65a3a"
                strokeWidth="1.5"
                fill="none"
              />
              <path
                d="M-100 250 C 300 170, 600 330, 1000 230 C 1200 190, 1500 270, 1600 250"
                stroke="#c65a3a"
                strokeWidth="1.5"
                fill="none"
              />
            </svg>
          </div>

          <div className="absolute -left-32 -top-32 w-96 h-96 bg-[#c65a3a]/5 rounded-full blur-[100px] pointer-events-none" />
          <div className="absolute -right-32 -bottom-32 w-96 h-96 bg-[#f2b66d]/5 rounded-full blur-[100px] pointer-events-none" />

          <div className="mx-auto w-full max-w-6xl px-6 md:px-10 z-10 relative">
            {/* Back Button */}
            <div className="mb-6">
              <Link href={'/properties?tab=single' as Route}>
                <span className="text-xs font-bold text-primary hover:underline flex items-center gap-1.5 cursor-pointer w-fit">
                  &larr; Quay lại danh sách căn hộ
                </span>
              </Link>
            </div>

            <div className="flex flex-wrap items-center gap-3 mb-5">
              <span
                className={`rounded-full px-3.5 py-1 text-[10px] font-extrabold uppercase tracking-wider border backdrop-blur-sm ${
                  property.tag === 'empty'
                    ? 'bg-success-soft/60 text-success border-success/25'
                    : property.tag === 'pending'
                      ? 'bg-accent-soft/60 text-primary border-primary/25'
                      : 'bg-info-soft/60 text-info border-info/25'
                }`}
              >
                {property.tagText}
              </span>
              {property.isVerified && (
                <span className="inline-flex items-center gap-1 text-[10px] font-extrabold uppercase tracking-widest text-[#6b8e4e] bg-[#e8f0df]/80 border border-[#6b8e4e]/20 px-3 py-1 rounded-full backdrop-blur-sm">
                  <svg
                    className="h-3 w-3"
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
                  Tin xác thực
                </span>
              )}
              <span className="font-mono text-xs font-bold text-[#7a6a61]">
                Mã tin:{' '}
                <span className="text-fg font-extrabold font-mono">
                  {property.id}
                </span>
              </span>
            </div>

            <h1 className="font-display text-3xl font-extrabold leading-tight text-[#2b211e] md:text-5xl tracking-tight max-w-4xl">
              {property.title}
            </h1>

            {/* Price tag below title */}
            <div className="mt-6 flex flex-wrap items-baseline gap-2">
              <span className="text-muted text-sm font-semibold">
                Giá thuê căn hộ:
              </span>
              <span className="text-3xl font-black text-primary font-mono">
                {property.price}
              </span>
            </div>

            {/* Quick Specs Bento Widget */}
            <div className="mt-8 grid grid-cols-2 sm:grid-cols-4 gap-4 max-w-3xl border-t border-border/80 pt-6">
              <div className="bg-white/60 border border-border/80 p-3.5 rounded-xl shadow-sm">
                <span className="text-[10px] uppercase font-bold text-muted tracking-wider block">
                  Diện tích
                </span>
                <p className="font-mono text-sm font-bold text-[#2b211e] mt-1">
                  {property.area}
                </p>
              </div>
              <div className="bg-white/60 border border-border/80 p-3.5 rounded-xl shadow-sm">
                <span className="text-[10px] uppercase font-bold text-muted tracking-wider block">
                  Thiết kế
                </span>
                <p className="font-body text-sm font-bold text-[#2b211e] mt-1">
                  {property.rooms}
                </p>
              </div>
              <div className="bg-white/60 border border-border/80 p-3.5 rounded-xl shadow-sm">
                <span className="text-[10px] uppercase font-bold text-muted tracking-wider block">
                  Hướng nhà
                </span>
                <p className="font-body text-sm font-bold text-[#2b211e] mt-1">
                  {property.direction}
                </p>
              </div>
              <div className="bg-white/60 border border-border/80 p-3.5 rounded-xl shadow-sm">
                <span className="text-[10px] uppercase font-bold text-muted tracking-wider block">
                  Nội thất
                </span>
                <p className="font-body text-sm font-bold text-[#2b211e] mt-1">
                  {property.furniture}
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Details and Bento Info Section */}
        <section className="mx-auto max-w-6xl px-6 py-12 md:px-10 grid grid-cols-1 lg:grid-cols-[2fr_1fr] gap-8">
          <div className="space-y-8">
            {/* Description Card */}
            <div className="bg-white border border-border rounded-3xl p-6 md:p-8 shadow-sm">
              <h3 className="font-marketing text-lg font-bold text-fg mb-4 flex items-center gap-2">
                <span className="h-2 w-2 rounded-full bg-[#c65a3a]" />
                Mô tả chi tiết căn hộ
              </h3>
              <p className="font-body text-sm text-[#7a6a61] leading-relaxed whitespace-pre-line">
                {property.description}
              </p>

              {property.projectName && (
                <div className="mt-6 p-4 rounded-2xl bg-surface-muted/50 border border-border flex items-center justify-between">
                  <div className="flex items-center gap-2.5">
                    <svg
                      className="h-5 w-5 text-primary shrink-0"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth="2.5"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M2.25 21h19.5m-18-18v18m10.5-18v18m6-13.5V21M6.75 6.75h.75m-.75 3h.75m-.75 3h.75m3-6h.75m-.75 3h.75m-.75 3h.75M6.75 21v-3h10.5v3"
                      />
                    </svg>
                    <span className="text-xs font-semibold text-fg">
                      Căn hộ thuộc dự án chung cư
                    </span>
                  </div>
                  <span className="text-xs font-bold text-primary bg-primary-soft px-3 py-1.5 rounded-xl border border-primary/15">
                    {property.projectName}
                  </span>
                </div>
              )}
            </div>

            {/* Detailed Parameters Grid */}
            <div className="bg-white border border-border rounded-3xl p-6 md:p-8 shadow-sm">
              <h3 className="font-marketing text-lg font-bold text-fg mb-5 flex items-center gap-2">
                <span className="h-2 w-2 rounded-full bg-[#c65a3a]" />
                Thông số & Đặc điểm
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-4 gap-x-8 text-sm">
                <div className="flex justify-between py-2 border-b border-border/40">
                  <span className="text-muted font-medium">Loại hình</span>
                  <span className="text-fg font-bold">{property.category}</span>
                </div>
                <div className="flex justify-between py-2 border-b border-border/40">
                  <span className="text-muted font-medium">
                    Diện tích tim tường
                  </span>
                  <span className="text-fg font-mono font-bold">
                    {property.area}
                  </span>
                </div>
                <div className="flex justify-between py-2 border-b border-border/40">
                  <span className="text-muted font-medium">Số phòng ngủ</span>
                  <span className="text-fg font-bold">
                    {property.bedrooms} PN
                  </span>
                </div>
                <div className="flex justify-between py-2 border-b border-border/40">
                  <span className="text-muted font-medium">
                    Số phòng vệ sinh
                  </span>
                  <span className="text-fg font-bold">
                    {property.bathrooms} WC
                  </span>
                </div>
                <div className="flex justify-between py-2 border-b border-border/40">
                  <span className="text-muted font-medium">
                    Hướng cửa chính
                  </span>
                  <span className="text-fg font-bold">
                    {property.direction}
                  </span>
                </div>
                <div className="flex justify-between py-2 border-b border-border/40">
                  <span className="text-muted font-medium">Hướng ban công</span>
                  <span className="text-fg font-bold">
                    {property.balconyDirection}
                  </span>
                </div>
                <div className="flex justify-between py-2 border-b border-border/40">
                  <span className="text-muted font-medium">
                    Tình trạng nội thất
                  </span>
                  <span className="text-fg font-bold">
                    {property.furniture}
                  </span>
                </div>
                <div className="flex justify-between py-2 border-b border-border/40">
                  <span className="text-muted font-medium">
                    Thời gian nhận nhà
                  </span>
                  <span className="text-fg font-bold text-primary">
                    {property.moveInTime}
                  </span>
                </div>
              </div>
            </div>

            {/* Operating Fees Profile */}
            <div className="bg-white border border-border rounded-3xl p-6 md:p-8 shadow-sm">
              <h3 className="font-marketing text-lg font-bold text-fg mb-4 flex items-center gap-2">
                <span className="h-2 w-2 rounded-full bg-[#c65a3a]" />
                Biểu phí sinh hoạt dự kiến
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="border border-border rounded-2xl p-4 bg-surface-muted/30">
                  <span className="text-[9px] font-bold text-muted uppercase tracking-wider block">
                    Đơn giá điện
                  </span>
                  <p className="font-body text-xs font-bold text-fg mt-1">
                    {property.electricityPriceType}
                  </p>
                </div>
                <div className="border border-border rounded-2xl p-4 bg-surface-muted/30">
                  <span className="text-[9px] font-bold text-muted uppercase tracking-wider block">
                    Đơn giá nước
                  </span>
                  <p className="font-body text-xs font-bold text-fg mt-1">
                    {property.waterPriceType}
                  </p>
                </div>
                <div className="border border-border rounded-2xl p-4 bg-surface-muted/30">
                  <span className="text-[9px] font-bold text-muted uppercase tracking-wider block">
                    Mạng Internet
                  </span>
                  <p className="font-body text-xs font-bold text-fg mt-1">
                    {property.internetPriceType}
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="space-y-6">
            {/* Amenities Checklist */}
            <div className="bg-white border border-border rounded-3xl p-6 shadow-sm">
              <h3 className="font-marketing text-base font-bold text-fg mb-4 flex items-center gap-2">
                <span className="h-2 w-2 rounded-full bg-[#f2b66d]" />
                Tiện ích tích hợp
              </h3>
              <ul className="grid grid-cols-1 gap-2.5">
                {property.amenities.map((item, idx) => (
                  <li
                    key={idx}
                    className="flex items-center gap-2.5 text-xs font-semibold text-[#7a6a61] bg-surface-muted/40 px-3.5 py-2.5 rounded-xl border border-border/30"
                  >
                    <svg
                      className="h-4 w-4 text-[#c65a3a] shrink-0"
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
                    <span>{AMENITY_LABELS[item] || item}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Visit Booking Widget */}
            <div className="bg-white border border-border rounded-3xl p-6 shadow-md relative overflow-hidden">
              <div className="absolute top-0 left-0 w-full h-1.5 bg-[#c65a3a]" />
              <h3 className="font-marketing text-base font-bold text-[#2b211e] mb-1">
                Lên lịch xem căn hộ
              </h3>
              <p className="text-xs text-muted leading-relaxed mb-4">
                Để lại thông tin, chuyên viên tư vấn sẽ chuẩn bị khóa phòng và
                dẫn bạn xem trực tiếp trong vòng 15 phút.
              </p>

              <form
                onSubmit={handleFormSubmit}
                className="space-y-3.5 text-left"
              >
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
          </div>
        </section>
      </main>

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
            <p className="font-body text-xs text-[#7a6a61] mt-0.5 leading-relaxed">
              Yêu cầu của bạn đã được ghi nhận. Nhân viên tư vấn căn hộ sẽ gọi
              điện xác nhận lịch hẹn xem phòng với bạn trong vòng 15 phút tới.
            </p>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  )
}
