'use client'

import * as React from 'react'
import Link from 'next/link'
import type { Route } from 'next'
import { MapPin } from 'lucide-react'
import type { DistrictStat } from '../../model/home-apartment-stats'

interface FeaturedLocationsProps {
  districts: DistrictStat[]
}

export function FeaturedLocations({
  districts,
}: FeaturedLocationsProps): React.ReactElement | null {
  if (districts.length === 0) return null

  return (
    <section className="mx-auto max-w-6xl px-6 py-20 md:px-10">
      <div className="mb-12 text-center">
        <span className="font-mono text-xs font-bold uppercase tracking-widest text-primary">
          KHU VỰC NỔI BẬT
        </span>
        <h2 className="mt-3 font-marketing text-2xl font-bold text-fg sm:text-3xl">
          Khám phá căn hộ theo khu vực ưa thích
        </h2>
        <p className="mx-auto mt-4 max-w-xl font-body text-sm text-muted">
          Các khu vực đang có nhiều căn hộ cho thuê nhất trên hệ thống.
        </p>
      </div>
      <div className="flex overflow-x-auto pb-3 gap-3 snap-x snap-mandatory no-scrollbar -mx-6 px-6 sm:mx-0 sm:px-0 sm:grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6 sm:overflow-visible sm:pb-0">
        {districts.map(area => (
          <Link
            key={area.name}
            href={
              `/properties?district=${encodeURIComponent(area.name)}` as Route
            }
            className="snap-start shrink-0 w-[140px] sm:w-auto group flex flex-col items-center gap-3 rounded-2xl border border-border bg-white p-4 sm:p-5 text-center shadow-sm hover:shadow-md hover:border-primary/30 transition-all"
          >
            <div className="flex h-10 w-10 items-center justify-center rounded-xl text-primary group-hover:text-primary-hover transition-colors">
              <MapPin className="h-5 w-5" aria-hidden="true" />
            </div>
            <span className="font-display text-xs font-bold text-fg">
              {area.name}
            </span>
            <div className="space-y-0.5">
              <span className="block font-display text-sm font-bold text-primary">
                {area.count}
              </span>
              <span className="font-body text-[11px] text-muted">
                căn hộ{area.priceRange ? ` · ${area.priceRange}` : ''}
              </span>
            </div>
          </Link>
        ))}
      </div>
      {/* Mobile Swipe Hint */}
      <div className="mt-3 flex sm:hidden items-center justify-center gap-1 text-[11px] font-medium text-muted">
        <span>← Vuốt sang để xem thêm quận →</span>
      </div>
    </section>
  )
}
