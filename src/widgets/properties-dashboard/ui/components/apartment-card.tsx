'use client'

import * as React from 'react'
import Link from 'next/link'
import type { Route } from 'next'
import { Button } from '@/shared/ui/button'
import { useFavorites } from '@/shared/lib/use-favorites'
import { AuthRequiredModal } from '@/widgets/community-dashboard/ui/components/auth-required-modal'

interface Apartment {
  id: string
  title: string
  price: string
  priceNum: number
  area: string
  areaNum: number
  rooms: string
  category: string
  location: string
  tag: string
  tagText: string
  description: string
  isVerified: boolean
  hasMedia: boolean
  amenities: string[]
  image?: string
  gallery?: string[]
}

interface ApartmentCardProps {
  apt: Apartment
  showCompareCheckbox?: boolean
  isSelected?: boolean
  onToggleCompare?: () => void
  disableCompare?: boolean
}

export function ApartmentCard({
  apt,
  showCompareCheckbox = false,
  isSelected = false,
  onToggleCompare,
  disableCompare = false,
}: ApartmentCardProps): React.ReactElement {
  const { isFavorite, toggleFavorite } = useFavorites()
  const [showAuthModal, setShowAuthModal] = React.useState(false)
  const favorite = isFavorite(apt.id)

  return (
    <article className="flex flex-col justify-between rounded-2xl border border-border bg-white p-5 shadow-sm hover:translate-y-[-4px] hover:border-border-strong hover:shadow-md transition-all duration-300">
      <div>
        {/* Visual Card Top */}
        <div className="relative mb-4 flex h-36 flex-col justify-between rounded-xl border border-border bg-surface-muted p-4 overflow-hidden">
          {apt.image ? (
            <img
              src={apt.image}
              alt={apt.title}
              className="absolute inset-0 h-full w-full object-cover transition-transform duration-500 hover:scale-105"
            />
          ) : (
            /* Grid background simulation */
            <div
              className="absolute inset-0 opacity-15"
              style={{
                backgroundImage:
                  'radial-gradient(circle at 50% 50%, var(--primary) 1.5px, transparent 0)',
                backgroundSize: '10px 10px',
              }}
            />
          )}
          {/* Overlay gradient to keep text/buttons readable */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-black/20" />

          <div className="relative z-10 flex items-center justify-between">
            <div className="flex items-center gap-2">
              {showCompareCheckbox && (
                <input
                  type="checkbox"
                  checked={isSelected}
                  disabled={disableCompare && !isSelected}
                  onChange={e => {
                    e.stopPropagation()
                    onToggleCompare?.()
                  }}
                  className="h-4 w-4 rounded border-border text-primary focus:ring-primary cursor-pointer accent-primary disabled:opacity-40 disabled:cursor-not-allowed"
                />
              )}
              <span
                className={`rounded-full px-2.5 py-0.5 text-[10px] font-bold ${
                  apt.tag === 'empty'
                    ? 'bg-success-soft text-success'
                    : apt.tag === 'pending'
                      ? 'bg-accent-soft text-primary'
                      : 'bg-info-soft text-info'
                }`}
              >
                {apt.tagText}
              </span>
            </div>
            <button
              onClick={e => {
                e.preventDefault()
                e.stopPropagation()
                const success = toggleFavorite(apt.id, apt.title)
                if (!success) {
                  setShowAuthModal(true)
                }
              }}
              className="flex h-8 w-8 items-center justify-center rounded-full bg-black/40 hover:bg-black/60 active:scale-95 transition-all text-white border border-white/10"
              title={favorite ? 'Bỏ lưu' : 'Lưu tin'}
            >
              <svg
                className={`h-4.5 w-4.5 transition-colors ${favorite ? 'fill-danger text-danger' : 'text-white'}`}
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
            </button>
          </div>
          <span className="relative z-10 font-mono text-[10px] font-bold text-white uppercase drop-shadow-md">
            {apt.category}
          </span>
        </div>

        <h3 className="font-marketing text-lg font-bold text-fg line-clamp-1">
          {apt.title}
        </h3>
        <div className="mt-1 flex items-baseline">
          <span className="text-base font-extrabold text-primary">
            {apt.price}
          </span>
        </div>
        <p className="mt-2.5 font-body text-xs text-muted leading-relaxed line-clamp-2 min-h-[36px]">
          {apt.description}
        </p>

        {/* Specs & Location section */}
        <div className="mt-4 pt-4 border-t border-border/60 space-y-3">
          {/* Location */}
          <div className="flex items-center gap-1.5 text-xs font-medium text-muted">
            <svg
              className="h-3.5 w-3.5 text-subtle shrink-0"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth="2.5"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
              />
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1 1 15 0Z"
              />
            </svg>
            <span className="truncate">{apt.location}</span>
          </div>

          {/* Specs grid */}
          <div className="flex items-center gap-3 text-xs font-semibold text-fg/80">
            <span className="flex items-center gap-1">
              <svg
                className="h-3.5 w-3.5 text-muted shrink-0"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth="2.5"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M3.75 3.75v16.5m0-16.5h16.5m-16.5 0v16.5m16.5-16.5v16.5m0-16.5H3.75m16.5 16.5H3.75m16.5 0V3.75"
                />
              </svg>
              <span>{apt.area}</span>
            </span>
            <span className="h-3 w-px bg-border-strong/40" />
            <span className="flex items-center gap-1">
              <svg
                className="h-3.5 w-3.5 text-muted shrink-0"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth="2.5"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M20.25 14.15v-2.625c0-1.036-.84-1.875-1.875-1.875H5.625c-1.036 0-1.875.84-1.875 1.875v2.625M3 16.25V5.625C3 4.59 3.84 3.75 4.875 3.75H9.75c1.036 0 1.875.84 1.875 1.875v2.25m3 0V5.625c0-1.036.84-1.875 1.875-1.875h4.875c1.036 0 1.875.84 1.875 1.875V16.25M3 16.25h18M3 16.25v2.25m18-2.25v2.25"
                />
              </svg>
              <span>{apt.rooms}</span>
            </span>
          </div>
        </div>
      </div>

      <div className="mt-5 flex">
        <Link href={`/properties/${apt.id}` as Route} className="w-full">
          <Button
            variant="primary"
            className="w-full rounded-xl py-2.5 text-xs font-bold transition-all"
          >
            Xem chi tiết
          </Button>
        </Link>
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
    </article>
  )
}
