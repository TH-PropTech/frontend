'use client'

import * as React from 'react'
import Link from 'next/link'
import type { Route } from 'next'
import { HomeHeader } from '@/widgets/home-dashboard/ui/home-header'
import { Footer } from '@/shared/ui/footer'
import { mockApartments } from '@/entities/properties'
import { ApartmentCard } from '@/widgets/properties-dashboard/ui/components/apartment-card'
import { useFavorites } from '@/shared/lib/use-favorites'

export default function FavoritesPage(): React.ReactElement {
  const { favorites } = useFavorites()

  // Filter apartments matching current favorites
  const favoriteApartments = React.useMemo(() => {
    return mockApartments.filter(apt => favorites.includes(apt.id))
  }, [favorites])

  return (
    <div className="min-h-screen bg-bg text-fg selection:bg-primary/20 selection:text-primary relative overflow-x-hidden flex flex-col justify-between">
      <div>
        <HomeHeader />

        <main className="w-full pt-36 pb-20">
          <section className="mx-auto max-w-6xl px-6 md:px-10">
            <div className="mb-10 space-y-2">
              <span className="font-display text-xs font-bold uppercase tracking-widest text-primary">
                CÁ NHÂN HÓA
              </span>
              <h1 className="font-marketing text-3xl font-extrabold text-fg sm:text-5xl tracking-tight">
                Căn hộ đã lưu ({favoriteApartments.length})
              </h1>
              <p className="font-body text-sm text-muted max-w-xl">
                Danh sách các căn hộ chung cư bạn đã lưu để theo dõi và so sánh
                trước khi đặt lịch xem căn hộ.
              </p>
            </div>

            {favoriteApartments.length === 0 ? (
              <div className="text-center py-24 rounded-3xl border border-dashed border-border bg-white shadow-sm flex flex-col items-center justify-center p-8">
                <div className="h-16 w-16 rounded-full bg-primary-soft flex items-center justify-center text-primary mb-4 animate-pulse-subtle">
                  <svg
                    className="h-8 w-8"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth="1.8"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z"
                    />
                  </svg>
                </div>
                <h3 className="font-marketing text-lg font-bold text-fg mb-1">
                  Chưa có căn hộ nào được lưu
                </h3>
                <p className="font-body text-xs text-muted max-w-xs mb-6">
                  Hãy nhấn vào nút trái tim trên các căn hộ chung cư để lưu lại
                  tại đây nhé.
                </p>
                <Link href={'/properties' as Route}>
                  <button className="px-5 py-2.5 rounded-full bg-primary text-white text-xs font-bold shadow-md hover:bg-primary-hover hover:scale-102 active:scale-98 transition-all cursor-pointer">
                    Khám phá căn hộ ngay
                  </button>
                </Link>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {favoriteApartments.map(apt => (
                  <ApartmentCard key={apt.id} apt={apt} />
                ))}
              </div>
            )}
          </section>
        </main>
      </div>

      <Footer />
    </div>
  )
}
