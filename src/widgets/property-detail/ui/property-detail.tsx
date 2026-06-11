'use client'

import * as React from 'react'
import { useParams } from 'next/navigation'
import { HomeHeader } from '@/widgets/home-dashboard/ui/home-header'
import { Footer } from '@/shared/ui/footer'
import { mockApartments, type ApartmentItem } from '@/entities/properties'
import { PropertyDetailHero } from './components/property-detail-hero'
import { BookingWidget } from './components/booking-widget'

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
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}
