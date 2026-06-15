'use client'

import * as React from 'react'
import { useParams } from 'next/navigation'
import { HomeHeader } from '@/widgets/home-dashboard/ui/home-header'
import { Footer } from '@/shared/ui/footer'
import { mockApartments, type ApartmentItem } from '@/entities/properties'
import { PropertyDetailHero } from './components/property-detail-hero'
import { BookingWidget } from './components/booking-widget'
import { PropertyAnalytics } from './components/property-analytics'

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

export function PropertyDetail(): React.ReactElement {
  const params = useParams()
  const propertyId = (params?.id as string) || 'PROP-CAR-101'

  // Retrieve matching property item from mock data
  const property = React.useMemo(() => {
    return (mockApartments.find(apt => apt.id === propertyId) ||
      mockApartments[0]) as ApartmentItem
  }, [propertyId])

  // Direct Chat states & handlers
  const [showChat, setShowChat] = React.useState(false)
  const [chatMessages, setChatMessages] = React.useState<
    { sender: 'user' | 'landlord'; text: string }[]
  >([])
  const [inputText, setInputText] = React.useState('')

  const handleSendMessage = (e: React.FormEvent): void => {
    e.preventDefault()
    const trimmed = inputText.trim()
    if (!trimmed) return
    setChatMessages(prev => [...prev, { sender: 'user', text: trimmed }])
    setInputText('')

    // Auto response simulator
    setTimeout(() => {
      setChatMessages(prev => [
        ...prev,
        {
          sender: 'landlord',
          text: 'Chào bạn, mình là Nguyễn Văn A. Căn hộ này vẫn còn trống và bạn có thể đặt lịch xem bất cứ lúc nào nhé.',
        },
      ])
    }, 1000)
  }

  return (
    <div className="min-h-screen bg-bg text-fg selection:bg-primary/20 selection:text-primary relative pb-28">
      <HomeHeader />

      <main className="w-full">
        {/* Premium Banner Hero Section (Warm Cream Design with Topography Overlay) */}
        <PropertyDetailHero property={property} />

        {/* Details and Bento Info Section */}
        <section className="mx-auto max-w-6xl px-6 py-12 md:px-10 grid grid-cols-1 lg:grid-cols-[2fr_1fr] gap-8">
          <div className="space-y-8">
            {/* Description Card */}
            <div className="bg-white border border-border rounded-3xl p-6 md:p-8 shadow-sm">
              <h3 className="font-marketing text-lg font-bold text-fg mb-4 flex items-center gap-2">
                <span className="h-2 w-2 rounded-full bg-primary" />
                Mô tả chi tiết căn hộ
              </h3>
              <p className="font-body text-sm text-muted leading-relaxed whitespace-pre-line">
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
                <span className="h-2 w-2 rounded-full bg-primary" />
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
                <span className="h-2 w-2 rounded-full bg-primary" />
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
                <span className="h-2 w-2 rounded-full bg-accent animate-pulse-subtle" />
                Tiện ích tích hợp
              </h3>
              <ul className="grid grid-cols-1 gap-2.5">
                {property.amenities.map((item, idx) => (
                  <li
                    key={idx}
                    className="flex items-center gap-2.5 text-xs font-semibold text-muted bg-surface-muted/40 px-3.5 py-2.5 rounded-xl border border-border/30"
                  >
                    <svg
                      className="h-4 w-4 text-primary shrink-0"
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
            <BookingWidget />

            {/* Direct Landlord Chat Button */}
            <button
              onClick={() => setShowChat(true)}
              className="w-full bg-accent-2 text-white text-xs font-bold rounded-2xl py-4 hover:bg-accent-2/90 transition-all active:scale-95 shadow-sm cursor-pointer"
            >
              Trò chuyện trực tiếp với chủ nhà
            </button>
          </div>
        </section>

        {/* Full-width Property Analytics and Data Visualizations */}
        <section className="mx-auto max-w-6xl px-6 py-6 md:px-10 space-y-8">
          <PropertyAnalytics property={property} />
        </section>

        {/* Full-width Two-Way Reviews & Landlord Trust Score */}
        <section className="mx-auto max-w-6xl px-6 py-6 md:px-10">
          <div className="bg-white border border-border rounded-3xl p-6 md:p-8 shadow-sm space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-border/60 pb-4">
              <h3 className="font-marketing text-lg font-bold text-fg flex items-center gap-2">
                <span className="h-2 w-2 rounded-full bg-primary" />
                Đánh giá từ khách thuê
              </h3>
              <div className="flex items-center gap-2 text-sm">
                <span className="text-muted-foreground font-semibold">
                  Tín nhiệm chủ nhà:
                </span>
                <span className="bg-success/15 text-success px-3 py-1 rounded-full font-bold uppercase tracking-wider text-[11px] border border-success/20">
                  98% Tín nhiệm (Xác thực Blockchain)
                </span>
              </div>
            </div>

            <div className="space-y-6">
              <div className="space-y-3 border-b border-border/40 pb-5">
                <div className="flex justify-between items-center text-sm">
                  <span className="font-bold text-fg text-base">
                    Trần Minh H.
                  </span>
                  <span className="text-muted-foreground font-semibold">
                    15/05/2026
                  </span>
                </div>
                <div className="flex text-amber-500 gap-1 items-center">
                  {[1, 2, 3, 4, 5].map(s => (
                    <svg
                      key={s}
                      className="h-4 w-4 fill-current"
                      viewBox="0 0 20 20"
                    >
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                  <span className="text-xs font-bold text-amber-600 ml-1">
                    5.0
                  </span>
                </div>
                <p className="text-sm text-fg-muted font-body leading-relaxed font-semibold">
                  Căn hộ rất sạch sẽ, đúng như hình ảnh thực tế trên ứng dụng.
                  Chủ nhà nhiệt tình hỗ trợ và ký kết hợp đồng thông qua hệ
                  thống rất nhanh chóng.
                </p>
              </div>

              <div className="space-y-3">
                <div className="flex justify-between items-center text-sm">
                  <span className="font-bold text-fg text-base">
                    Nguyễn Quốc T.
                  </span>
                  <span className="text-muted-foreground font-semibold">
                    28/04/2026
                  </span>
                </div>
                <div className="flex text-amber-500 gap-1 items-center">
                  {[1, 2, 3, 4].map(s => (
                    <svg
                      key={s}
                      className="h-4 w-4 fill-current"
                      viewBox="0 0 20 20"
                    >
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                  <svg
                    className="h-4 w-4 text-gray-300 fill-current"
                    viewBox="0 0 20 20"
                  >
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                  <span className="text-xs font-bold text-amber-600 ml-1">
                    4.5
                  </span>
                </div>
                <p className="text-sm text-fg-muted font-body leading-relaxed font-semibold">
                  Không gian yên tĩnh, dịch vụ quản lý tòa nhà tốt. Các hóa đơn
                  thanh toán đều rõ ràng trên lịch sử Blockchain.
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* Floating Chat Modal Overlay */}
      {showChat && (
        <div className="fixed bottom-6 right-6 z-50 w-80 bg-white border border-border rounded-2xl shadow-2xl overflow-hidden flex flex-col h-96 animate-slide-up">
          {/* Header */}
          <div className="bg-primary text-white p-4 flex justify-between items-center">
            <div className="space-y-0.5">
              <h4 className="text-xs font-bold">Chủ nhà (Nguyễn Văn A)</h4>
              <span className="text-[10px] text-white/80">
                Phản hồi trong vài phút
              </span>
            </div>
            <button
              onClick={() => setShowChat(false)}
              className="text-white hover:text-white/80 text-xs font-bold cursor-pointer"
            >
              Đóng
            </button>
          </div>

          {/* Messages */}
          <div className="flex-1 p-4 overflow-y-auto space-y-3 bg-surface-muted/30">
            {chatMessages.length === 0 ? (
              <p className="text-[10px] text-muted text-center py-12">
                Bắt đầu cuộc trò chuyện với chủ nhà căn hộ.
              </p>
            ) : (
              chatMessages.map((msg, idx) => (
                <div
                  key={idx}
                  className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div
                    className={`max-w-[80%] rounded-2xl p-3 text-xs font-body ${
                      msg.sender === 'user'
                        ? 'bg-primary text-white rounded-br-none'
                        : 'bg-white border border-border text-fg rounded-bl-none'
                    }`}
                  >
                    {msg.text}
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Input form */}
          <form
            onSubmit={handleSendMessage}
            className="border-t border-border p-3 flex gap-2"
          >
            <input
              type="text"
              placeholder="Nhập tin nhắn..."
              value={inputText}
              onChange={e => setInputText(e.target.value)}
              className="flex-1 bg-surface-muted/50 border border-border rounded-xl px-3 text-xs focus:outline-none focus:border-primary"
            />
            <button
              type="submit"
              className="bg-primary text-white text-xs font-bold rounded-xl px-3 py-2 cursor-pointer"
            >
              Gửi
            </button>
          </form>
        </div>
      )}

      <Footer />
    </div>
  )
}
