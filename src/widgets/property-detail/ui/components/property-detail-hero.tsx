'use client'

import * as React from 'react'
import Link from 'next/link'
import type { Route } from 'next'
import {
  formatRentPrice,
  getRentalAvailabilityPresentation,
  type ApartmentItem,
} from '@/entities/properties'
import { useFavorites } from '@/shared/lib/use-favorites'
import { AuthRequiredModal } from '@/widgets/community-dashboard/ui/components/auth-required-modal'

const subscribeNoop = (): (() => void) => () => {}

function readStoredUserId(): string | null {
  try {
    const raw = localStorage.getItem('user')
    if (!raw) return null
    const u = JSON.parse(raw) as { id?: string; _id?: string }
    return u.id ?? u._id ?? null
  } catch {
    return null
  }
}

interface PropertyDetailHeroProps {
  property: ApartmentItem
}

export function PropertyDetailHero({
  property,
}: PropertyDetailHeroProps): React.ReactElement {
  const { isFavorite, toggleFavorite } = useFavorites()
  const [showAuthModal, setShowAuthModal] = React.useState(false)
  const favorite = isFavorite(property.id)
  const viewerId = React.useSyncExternalStore(
    subscribeNoop,
    readStoredUserId,
    () => null
  )
  const isOwnListing = Boolean(viewerId) && property.landlord?.id === viewerId
  const availability = getRentalAvailabilityPresentation(property)
  const [copied, setCopied] = React.useState(false)
  const shortListingId = property.id.slice(-8)
  const specs = [
    { label: 'Diện tích', value: property.area },
    { label: 'Thiết kế', value: property.rooms },
    { label: 'Hướng nhà', value: property.direction },
    { label: 'Nội thất', value: property.furniture },
  ]

  const copyListingId = async (): Promise<void> => {
    try {
      await navigator.clipboard.writeText(property.id)
      setCopied(true)
      setTimeout(() => setCopied(false), 1500)
    } catch (error) {
      console.warn('Failed to copy listing id:', error)
    }
  }

  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-[#f5ece2] via-[#faf6f1] to-bg pb-8 pt-36 rounded-b-[40px] border-b border-border">
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
            stroke="currentColor"
            className="text-primary"
            strokeWidth="1.5"
            fill="none"
          />
          <path
            d="M-100 130 C 300 50, 600 210, 1000 110 C 1200 70, 1500 150, 1600 130"
            stroke="currentColor"
            className="text-primary"
            strokeWidth="1.5"
            fill="none"
          />
          <path
            d="M-100 160 C 300 80, 600 240, 1000 140 C 1200 100, 1500 180, 1600 160"
            stroke="currentColor"
            className="text-primary"
            strokeWidth="1.5"
            fill="none"
          />
          <path
            d="M-100 190 C 300 110, 600 270, 1000 170 C 1200 130, 1500 210, 1600 190"
            stroke="currentColor"
            className="text-primary"
            strokeWidth="1.5"
            fill="none"
          />
          <path
            d="M-100 220 C 300 140, 600 300, 1000 200 C 1200 160, 1500 240, 1600 220"
            stroke="currentColor"
            className="text-primary"
            strokeWidth="1.5"
            fill="none"
          />
          <path
            d="M-100 250 C 300 170, 600 330, 1000 230 C 1200 190, 1500 270, 1600 250"
            stroke="currentColor"
            className="text-primary"
            strokeWidth="1.5"
            fill="none"
          />
        </svg>
      </div>

      <div className="absolute -left-32 -top-32 w-96 h-96 bg-primary/5 rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute -right-32 -bottom-32 w-96 h-96 bg-accent/5 rounded-full blur-[100px] pointer-events-none" />

      <div className="mx-auto w-full max-w-6xl px-6 md:px-10 z-10 relative">
        {/* Back Button & Favorite Toggle Row */}
        <div className="mb-4 flex items-center justify-between">
          <Link href={'/properties?tab=single' as Route}>
            <span className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-border bg-white text-xs font-bold text-fg hover:text-primary hover:border-primary/40 hover:shadow-sm active:scale-95 transition-all cursor-pointer">
              <svg
                className="w-3.5 h-3.5 text-primary"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth="2.5"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M10.5 19.5 3 12m0 0 7.5-7.5M3 12h18"
                />
              </svg>
              <span>Quay lại danh sách căn hộ</span>
            </span>
          </Link>
          {!isOwnListing && (
            <button
              onClick={() => {
                const success = toggleFavorite(property.id, property.title)
                if (!success) {
                  setShowAuthModal(true)
                }
              }}
              className="flex shrink-0 items-center gap-2 whitespace-nowrap px-4 py-2 rounded-full border border-border bg-white shadow-sm hover:border-danger/40 hover:bg-danger/5 active:scale-95 transition-all text-xs font-bold text-fg cursor-pointer"
            >
              <svg
                className={`h-4 w-4 shrink-0 transition-colors ${favorite ? 'fill-danger text-danger' : 'text-primary'}`}
                fill={favorite ? 'currentColor' : 'none'}
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth="2.2"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z"
                />
              </svg>
              <span>{favorite ? 'Đã lưu' : 'Lưu tin'}</span>
            </button>
          )}
        </div>

        <div className="flex flex-wrap items-center gap-3 mb-3">
          <span
            role="status"
            aria-label={`Tình trạng thuê: ${availability.label}`}
            className={`rounded-full px-3.5 py-1 text-[11px] font-extrabold uppercase tracking-wider border backdrop-blur-sm ${
              availability.status === 'available'
                ? 'bg-success-soft/60 text-success border-success/25'
                : availability.status === 'reserved'
                  ? 'bg-warning-soft/60 text-warning border-warning/25'
                  : availability.status === 'deposit-paid'
                    ? 'bg-accent-soft/60 text-primary border-primary/25'
                    : 'bg-info-soft/60 text-info border-info/25'
            }`}
          >
            {availability.label}
          </span>
          {property.isVerified && (
            <span className="inline-flex items-center gap-1 text-[11px] font-extrabold uppercase tracking-widest text-success bg-success-soft/80 border border-success/20 px-3 py-1 rounded-full backdrop-blur-sm">
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
          <button
            type="button"
            onClick={copyListingId}
            title={`Sao chép mã tin ${property.id}`}
            aria-label={`Sao chép mã tin ${property.id}`}
            className="inline-flex cursor-pointer items-center gap-1.5 text-xs font-bold text-muted hover:text-primary transition-colors"
          >
            Mã tin:
            <span className="font-mono font-extrabold text-fg">
              #{shortListingId}
            </span>
            <span className="text-[11px] font-semibold">
              {copied ? 'Đã chép' : 'Sao chép'}
            </span>
          </button>
        </div>

        <h1 className="font-marketing text-3xl font-extrabold leading-tight text-fg md:text-5xl tracking-tight max-w-4xl">
          {property.title}
        </h1>

        {/* Price tag below title */}
        <div className="mt-3 flex flex-wrap items-baseline gap-2">
          <span className="text-muted text-sm font-semibold">
            Giá thuê căn hộ:
          </span>
          <span className="text-3xl font-black text-primary tabular-nums">
            {formatRentPrice(property.priceNum, property.price)}
          </span>
        </div>

        {/* Quick Specs Bento Widget */}
        <div className="mt-4 grid grid-cols-2 sm:grid-cols-4 gap-3 border-t border-border/80 pt-4">
          {specs.map(spec => (
            <div
              key={spec.label}
              className="bg-white/60 border border-border/80 p-3 rounded-xl shadow-sm"
            >
              <span className="text-[11px] uppercase font-bold text-muted tracking-wider block">
                {spec.label}
              </span>
              <p
                className={`font-body text-sm mt-1 ${
                  spec.value
                    ? 'font-bold text-fg tabular-nums'
                    : 'font-medium text-subtle'
                }`}
              >
                {spec.value || 'Chưa cập nhật'}
              </p>
            </div>
          ))}
        </div>
      </div>

      <AuthRequiredModal
        isOpen={showAuthModal}
        onClose={() => setShowAuthModal(false)}
        title="Yêu cầu đăng nhập"
        description={
          <>
            Vui lòng đăng nhập để lưu căn hộ yêu thích.
            <br />
            <span className="text-xs text-subtle">
              Bạn có thể lưu tin, theo dõi biến động giá và đặt lịch xem nhà sau
              khi đăng nhập.
            </span>
          </>
        }
      />
    </section>
  )
}
