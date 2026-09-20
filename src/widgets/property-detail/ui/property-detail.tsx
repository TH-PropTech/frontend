'use client'

import * as React from 'react'
import Image from 'next/image'
import { useQuery } from '@tanstack/react-query'
import { useParams } from 'next/navigation'
import { HomeHeader } from '@/widgets/home-dashboard/ui/home-header'
import { Footer } from '@/shared/ui/footer'
import { mockApartments, type ApartmentItem } from '@/entities/properties'
import { env } from '@/shared/config/env'
import { PropertyDetailHero } from './components/property-detail-hero'
import { BookingWidget } from './components/booking-widget'
import { PropertyGallery } from './components/property-gallery'
import { Property360Modal } from './components/property-360-modal'
import { PropertyReviews } from './components/property-reviews'
import { LandlordChatModal } from './components/landlord-chat-modal'
import { PropertyDecisionActions } from './components/property-decision-actions'
import { PriceTrendPanel } from './components/price-trend-panel'
import { CostBreakdownPanel } from './components/cost-breakdown-panel'
import { RentCalculator } from './components/rent-calculator'
import { CommuteEstimator } from './components/commute-estimator'
import { AmbientRadarPanel } from './components/ambient-radar-panel'
import { EnergyEfficiencyPanel } from './components/energy-efficiency-panel'
import { PropertyComparison } from './components/property-comparison'
import { AnalyticsExplainModal } from './components/analytics-explain-modal'
import { apiClient } from '@/shared/api/api-client'
import Link from 'next/link'
import type { Route } from 'next'
import { Button } from '@/shared/ui/button'
import {
  Compass,
  CheckCircle2,
  Phone,
  Mail,
  FileText,
  Coins,
  MapPin,
  Sparkles,
  Scale,
} from 'lucide-react'
import { FreshnessBadge } from '@/features/listing-freshness'
import { PriceBenchmarkCard } from '@/features/price-benchmark'
import { ViewingNoteEditor } from '@/features/viewing-notes'
import {
  getAreaProfileForApartment,
  NearbyFacilitiesCard,
} from '@/features/area-profile'
import {
  getListingQualityScore,
  ImprovementChecklist,
  QualityScoreCard,
} from '@/features/listing-quality'
import { ConditionAnalysisPanel } from '@/features/condition-analysis'
import { LocationRiskPanel } from '@/features/location-risk'
import { ApartmentFloorplanSection } from '@/features/apartment-floorplan'

const DETAIL_TABS = [
  {
    id: 'finance',
    label: 'Tài chính & Chi phí',
    icon: Coins,
  },
  {
    id: 'location',
    label: 'Vị trí & Kết nối',
    icon: MapPin,
  },
  {
    id: 'living',
    label: 'Môi trường sống',
    icon: Sparkles,
  },
  {
    id: 'reviews',
    label: 'Đánh giá & So sánh',
    icon: Scale,
  },
] as const

type DetailTabId = (typeof DETAIL_TABS)[number]['id']

const formatCurrency = (val: number): string => {
  return val.toLocaleString('vi-VN') + ' đ'
}

function subscribeToSession(onStoreChange: () => void): () => void {
  window.addEventListener('storage', onStoreChange)
  return () => window.removeEventListener('storage', onStoreChange)
}

function getStoredUser(): string | null {
  return window.localStorage.getItem('user')
}

function getServerUser(): null {
  return null
}

function OwnerQualitySection({
  apartmentId,
  enabled,
}: {
  apartmentId: string
  enabled: boolean
}): React.ReactElement | null {
  const quality = useQuery({
    queryKey: ['listing-quality', apartmentId],
    queryFn: () => getListingQualityScore(apartmentId),
    enabled,
  })
  if (!enabled) return null
  if (quality.isLoading)
    return <div className="h-48 animate-pulse rounded-3xl bg-surface-muted" />
  if (quality.isError || !quality.data)
    return (
      <p className="rounded-2xl border border-danger/30 bg-danger/10 p-4 text-sm text-danger">
        Không tải được chất lượng tin đăng.
      </p>
    )
  return (
    <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
      <QualityScoreCard result={quality.data} />
      <ImprovementChecklist checklist={quality.data.checklist} />
    </div>
  )
}

function AreaProfileSection({
  apartmentId,
}: {
  apartmentId: string
}): React.ReactElement {
  const profile = useQuery({
    queryKey: ['area-profile', apartmentId],
    queryFn: () => getAreaProfileForApartment(apartmentId),
  })
  if (profile.isLoading)
    return <div className="h-32 animate-pulse rounded-3xl bg-surface-muted" />
  if (profile.isError)
    return (
      <p className="rounded-2xl border border-danger/30 bg-danger/10 p-4 text-sm text-danger">
        Không tải được thông tin khu vực.
      </p>
    )
  if (!profile.data)
    return (
      <p className="rounded-2xl border border-border bg-surface p-4 text-sm text-muted">
        Chưa có thông tin khu vực.
      </p>
    )
  return <NearbyFacilitiesCard profile={profile.data} />
}

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
  const propertyId = (params?.id as string) || ''
  const storedUser = React.useSyncExternalStore(
    subscribeToSession,
    getStoredUser,
    getServerUser
  )
  const viewer = React.useMemo(() => {
    if (!storedUser) return null
    try {
      return JSON.parse(storedUser) as {
        id?: string
        _id?: string
        roles?: string[]
      }
    } catch (error) {
      console.warn('Failed to parse current user:', error)
      return null
    }
  }, [storedUser])

  const [property, setProperty] = React.useState<ApartmentItem | null>(null)
  const [propertyError, setPropertyError] = React.useState<Error | null>(null)
  const [loading, setLoading] = React.useState(true)
  const [isOpen360, setIsOpen360] = React.useState(false)
  const [showChat, setShowChat] = React.useState(false)
  const [activeTab, setActiveTab] = React.useState<DetailTabId>('finance')
  const [explainData, setExplainData] = React.useState<{
    title: string
    description: string
    formula?: string
    visualExample?: string
    steps?: string[]
  } | null>(null)

  React.useEffect(() => {
    let active = true
    const requestTimer = setTimeout(() => {
      if (!active) return
      setLoading(true)
      setProperty(null)
      setPropertyError(null)
      if (!propertyId) {
        const demoProperty = env.enableMocks ? mockApartments[0] : null
        setProperty(demoProperty || null)
        if (!demoProperty) {
          setPropertyError(new Error('Missing property resource id'))
        }
        setLoading(false)
        return
      }

      const demoProperty = env.enableMocks
        ? mockApartments.find(apt => apt.id === propertyId)
        : undefined
      if (demoProperty) {
        setProperty(demoProperty)
        setLoading(false)
        return
      }

      apiClient
        .get<ApartmentItem>(`/apartments/${propertyId}?format=web`)
        .then(data => {
          if (active && data) {
            setProperty(data)
          }
        })
        .catch(err => {
          const normalizedError =
            err instanceof Error
              ? err
              : new Error('Failed to fetch property details')
          console.error('Failed to fetch property details:', normalizedError)
          if (active) {
            setProperty(null)
            setPropertyError(normalizedError)
          }
        })
        .finally(() => {
          if (active) setLoading(false)
        })
    }, 0)

    return () => {
      active = false
      clearTimeout(requestTimer)
    }
  }, [propertyId])

  if (loading) {
    return (
      <div className="min-h-screen bg-bg text-fg flex flex-col justify-between">
        <HomeHeader />
        <main className="flex-1 flex items-center justify-center py-20">
          <div className="flex flex-col items-center gap-4">
            <div className="h-10 w-10 animate-spin rounded-full border-4 border-primary border-t-transparent" />
            <span className="text-sm font-bold text-muted">
              Đang tải thông tin căn hộ...
            </span>
          </div>
        </main>
        <Footer />
      </div>
    )
  }

  if (!property) {
    return (
      <div className="min-h-screen bg-bg text-fg flex flex-col justify-between">
        <HomeHeader />
        <main className="flex-1 flex items-center justify-center px-6 py-20">
          <div className="max-w-md space-y-4 text-center">
            <p role="alert" className="text-sm font-semibold text-danger">
              {propertyError
                ? 'Không thể tải thông tin căn hộ này từ máy chủ.'
                : 'Không tìm thấy thông tin căn hộ này.'}
            </p>
            <p className="text-sm text-muted">
              Vui lòng quay lại danh sách và chọn một căn hộ đang có dữ liệu.
            </p>
            <Button asChild variant="primary" className="rounded-xl">
              <Link href="/properties">Quay lại danh sách căn hộ</Link>
            </Button>
          </div>
        </main>
        <Footer />
      </div>
    )
  }

  const apartmentResourceId = propertyId || property.id
  const price = property.priceNum ? property.priceNum * 1_000_000 : 18_000_000
  const bookingDeposit = price
  const escrowDeposit = price * 2
  const firstMonthRent = price
  const totalInitial = bookingDeposit + escrowDeposit + firstMonthRent

  return (
    <div className="min-h-screen bg-bg text-fg selection:bg-primary/20 selection:text-primary relative">
      <HomeHeader />

      <main className="w-full">
        {/* Premium Banner Hero Section (Warm Cream Design with Topography Overlay) */}
        <PropertyDetailHero property={property} />

        {/* Real Premium Gallery */}
        <section className="mx-auto max-w-6xl px-6 pt-10 md:px-10">
          <PropertyGallery gallery={property.gallery || []} />
        </section>

        <PropertyDecisionActions
          propertyId={apartmentResourceId}
          title={property.title}
          monthlyRent={property.priceNum * 1_000_000}
        />

        {viewer?.roles?.includes('tenant') ? (
          <section className="mx-auto flex max-w-6xl justify-end px-6 pt-4 md:px-10">
            <Button
              asChild
              className="flex items-center gap-2 rounded-2xl bg-primary text-white shadow-sm hover:bg-primary-hover"
            >
              <Link href={`/properties/${apartmentResourceId}/apply` as Route}>
                <FileText aria-hidden="true" className="h-4 w-4" />
                <span>Đặt thuê căn hộ</span>
              </Link>
            </Button>
          </section>
        ) : null}

        <section className="mx-auto max-w-6xl px-6 pt-6 md:px-10">
          <FreshnessBadge listingId={apartmentResourceId} />
        </section>

        {/* 360 Tour Interactive CTA Banner */}
        {property.images360 && property.images360.length > 0 && (
          <section className="mx-auto max-w-6xl px-6 pt-6 md:px-10">
            <div className="bg-gradient-to-r from-primary/10 via-primary/5 to-transparent border border-primary/20 rounded-3xl p-6 flex flex-col md:flex-row items-center justify-between gap-6 shadow-sm">
              <div className="space-y-1.5 text-center md:text-left">
                <div className="inline-flex items-center gap-1.5 bg-primary/10 border border-primary/20 px-2.5 py-1 rounded-full text-[10px] font-bold text-[#c65a3a] uppercase tracking-wider animate-pulse">
                  Tính năng mới
                </div>
                <h4 className="font-marketing text-base font-bold text-fg">
                  Tham quan thực tế ảo 360° VR Tour
                </h4>
                <p className="font-body text-xs text-muted">
                  Trải nghiệm góc nhìn panorama toàn cảnh các phòng khách, phòng
                  ngủ, WC, bếp và ban công của căn hộ.
                </p>
              </div>
              <button
                onClick={() => setIsOpen360(true)}
                className="w-full md:w-auto px-6 py-3.5 bg-primary hover:bg-[#b04a2d] text-white rounded-2xl font-semibold text-xs transition-all duration-300 shadow-lg shadow-primary/20 flex items-center justify-center gap-2 group active:scale-[0.98]"
              >
                <Compass className="h-4 w-4 text-white group-hover:rotate-45 transition-transform duration-300" />
                Trải nghiệm 360° ngay
              </button>
            </div>
          </section>
        )}

        <ApartmentFloorplanSection property={property} />

        {/* Details and Bento Info Section */}
        <section className="mx-auto max-w-6xl px-6 py-12 md:px-10 grid grid-cols-1 lg:grid-cols-[2fr_1fr] gap-8">
          <div className="space-y-8">
            {/* Description Card */}
            <div className="bg-white border border-border rounded-3xl p-6 md:p-8 shadow-sm">
              <h3 className="font-marketing text-lg font-bold text-fg mb-4 flex items-center gap-2">
                <span className="h-2 w-2 rounded-full bg-primary" />
                Mô tả chi tiết căn hộ
              </h3>
              <p className="font-body text-sm text-muted leading-relaxed whitespace-pre-line text-left">
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
                    className="flex items-center gap-2.5 text-xs font-semibold text-muted bg-surface-muted/40 px-3.5 py-2.5 rounded-xl border border-border/30 text-left"
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
            <BookingWidget propertyId={apartmentResourceId} />

            {/* Personal Viewing Notes (Ghi chú xem phòng cá nhân) */}
            <ViewingNoteEditor apartmentId={apartmentResourceId} />

            {/* Landlord Info Card */}
            {property.landlord && (
              <div className="bg-white border border-border rounded-3xl p-6 shadow-sm space-y-4">
                <h3 className="font-marketing text-base font-bold text-fg flex items-center gap-2">
                  <span className="h-2 w-2 rounded-full bg-primary" />
                  Thông tin chủ nhà
                </h3>
                <div className="flex items-center gap-4">
                  <Image
                    src={
                      property.landlord.avatar ||
                      'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e'
                    }
                    alt={property.landlord.fullName}
                    width={56}
                    height={56}
                    unoptimized
                    className="w-14 h-14 rounded-full object-cover border-2 border-primary/15 shadow-sm"
                  />
                  <div className="space-y-1 text-left">
                    <div className="flex items-center gap-1.5 flex-wrap">
                      <h4 className="font-marketing text-sm font-bold text-fg">
                        {property.landlord.fullName}
                      </h4>
                      {property.landlord.kycStatus === 'verified' && (
                        <span className="inline-flex items-center gap-1 bg-success-soft text-success text-[9px] font-bold px-2 py-0.5 rounded-full border border-success/20">
                          <CheckCircle2 className="h-2.5 w-2.5 text-success animate-pulse" />
                          Đã KYC
                        </span>
                      )}
                    </div>
                    <p className="text-xs text-muted font-semibold">
                      Chủ sở hữu căn hộ
                    </p>
                  </div>
                </div>

                <div className="pt-2 border-t border-border/50 space-y-2 text-xs">
                  <div className="flex items-center gap-2.5 text-muted">
                    <Phone className="h-3.5 w-3.5 text-primary/70" />
                    <span className="font-mono text-fg font-semibold">
                      {property.landlord.phone}
                    </span>
                  </div>
                  <div className="flex items-center gap-2.5 text-muted">
                    <Mail className="h-3.5 w-3.5 text-primary/70" />
                    <span className="text-fg font-semibold">
                      {property.landlord.email}
                    </span>
                  </div>
                </div>
              </div>
            )}

            {/* Direct Landlord Chat Button */}
            <button
              onClick={() => setShowChat(true)}
              className="w-full bg-primary text-white text-xs font-bold rounded-2xl py-4 hover:bg-primary-hover transition-all active:scale-95 shadow-sm cursor-pointer"
            >
              Trò chuyện trực tiếp với chủ nhà
            </button>
          </div>
        </section>

        {/* Tabbed Property Intelligence & Decision Center */}
        <section
          className="mx-auto max-w-6xl px-6 py-10 md:px-10 space-y-6"
          aria-label="Trung tâm thẩm định và phân tích căn hộ"
        >
          {/* Section Header */}
          <div className="space-y-2 text-left border-b border-border/80 pb-5">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider bg-primary-soft text-primary border border-primary/20">
              <Sparkles className="h-3 w-3" />
              <span>PropTech Intelligence Suite</span>
            </div>
            <h3 className="font-marketing text-2xl md:text-3xl font-bold text-fg">
              Dữ liệu phân tích & Thẩm định chuyên sâu
            </h3>
            <p className="text-xs md:text-sm text-muted max-w-2xl leading-relaxed">
              Thông tin được chuẩn hóa và minh bạch hóa bằng chuỗi khối, giúp
              bạn đối chiếu chi phí, vị trí và tiện nghi một cách toàn diện.
            </p>
          </div>

          {/* Full-width Responsive Grid Tab Bar (No overflow, no text truncation) */}
          <div
            role="tablist"
            aria-label="Nhóm dữ liệu phân tích căn hộ"
            className="grid grid-cols-2 md:grid-cols-4 gap-2 p-1.5 rounded-2xl bg-surface-muted/70 border border-border shadow-sm"
          >
            {DETAIL_TABS.map(tab => {
              const Icon = tab.icon
              const isActive = activeTab === tab.id
              return (
                <button
                  key={tab.id}
                  type="button"
                  role="tab"
                  id={`tab-${tab.id}`}
                  aria-controls={`tabpanel-${tab.id}`}
                  aria-selected={isActive}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center justify-center gap-2.5 px-4 py-3 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                    isActive
                      ? 'bg-white text-primary shadow-sm border border-border ring-1 ring-primary/10'
                      : 'text-muted hover:text-fg hover:bg-white/50'
                  }`}
                >
                  <Icon
                    className={`h-4 w-4 shrink-0 ${isActive ? 'text-primary' : 'text-muted'}`}
                  />
                  <span className="truncate">{tab.label}</span>
                </button>
              )
            })}
          </div>

          {/* Tab 1: Finance Panel */}
          <div
            role="tabpanel"
            id="tabpanel-finance"
            aria-labelledby="tab-finance"
            className={activeTab === 'finance' ? 'space-y-8' : 'hidden'}
          >
            <PriceBenchmarkCard
              criteria={{
                district: property.district,
                bedrooms: property.bedrooms,
                priceMonthly: property.priceNum * 1_000_000,
                area: property.areaNum,
                furniture: property.furniture,
              }}
            />
            <PriceTrendPanel property={property} onExplain={setExplainData} />
            <CostBreakdownPanel
              bookingDeposit={bookingDeposit}
              escrowDeposit={escrowDeposit}
              firstMonthRent={firstMonthRent}
              totalInitial={totalInitial}
              formatCurrency={formatCurrency}
              onExplain={setExplainData}
            />
            <RentCalculator price={price} />
          </div>

          {/* Tab 2: Location Panel */}
          <div
            role="tabpanel"
            id="tabpanel-location"
            aria-labelledby="tab-location"
            className={activeTab === 'location' ? 'space-y-8' : 'hidden'}
          >
            <CommuteEstimator property={property} />
            <AreaProfileSection apartmentId={apartmentResourceId} />
            <LocationRiskPanel apartmentId={apartmentResourceId} />
          </div>

          {/* Tab 3: Living Environment Panel */}
          <div
            role="tabpanel"
            id="tabpanel-living"
            aria-labelledby="tab-living"
            className={activeTab === 'living' ? 'space-y-8' : 'hidden'}
          >
            <AmbientRadarPanel onExplain={setExplainData} />
            <EnergyEfficiencyPanel onExplain={setExplainData} />
            {viewer ? (
              <ConditionAnalysisPanel apartmentId={apartmentResourceId} />
            ) : null}
          </div>

          {/* Tab 4: Reviews & Comparison Panel */}
          <div
            role="tabpanel"
            id="tabpanel-reviews"
            aria-labelledby="tab-reviews"
            className={activeTab === 'reviews' ? 'space-y-8' : 'hidden'}
          >
            <PropertyComparison property={property} />
            <OwnerQualitySection
              apartmentId={apartmentResourceId}
              enabled={Boolean(
                viewer?.roles?.includes('landlord') &&
                property.landlord?.id === (viewer.id ?? viewer._id)
              )}
            />
            <PropertyReviews />
          </div>
        </section>

        {/* Logic Explanation Modal */}
        <AnalyticsExplainModal
          isOpen={explainData !== null}
          onClose={() => setExplainData(null)}
          data={explainData}
        />
      </main>

      {/* Floating Chat Modal Overlay */}
      <LandlordChatModal
        isOpen={showChat}
        onClose={() => setShowChat(false)}
        landlord={property.landlord}
      />

      <Property360Modal
        isOpen={isOpen360}
        onClose={() => setIsOpen360(false)}
        images360={property.images360 || []}
      />

      <Footer />
    </div>
  )
}
