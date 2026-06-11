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
  const [compareIds, setCompareIds] = React.useState<string[]>([])
  const [showCompareModal, setShowCompareModal] = React.useState(false)

  // Filter apartments matching current favorites
  const favoriteApartments = React.useMemo(() => {
    return mockApartments.filter(apt => favorites.includes(apt.id))
  }, [favorites])

  // Get selected apartments for comparison
  const compareApartments = React.useMemo(() => {
    return mockApartments.filter(apt => compareIds.includes(apt.id))
  }, [compareIds])

  const handleToggleCompare = (id: string): void => {
    setCompareIds(prev =>
      prev.includes(id) ? prev.filter(item => item !== id) : [...prev, id]
    )
  }

  const handleClearCompare = (): void => {
    setCompareIds([])
  }

  return (
    <div className="min-h-screen bg-bg text-fg selection:bg-primary/20 selection:text-primary relative overflow-x-hidden flex flex-col justify-between">
      <div>
        <HomeHeader />

        <main className="w-full pt-36 pb-20">
          <section className="mx-auto max-w-6xl px-6 md:px-10">
            <div className="mb-10 space-y-2">
              <span className="font-display text-xs font-bold uppercase tracking-widest text-primary">
                CA NHAN HOA
              </span>
              <h1 className="font-marketing text-3xl font-extrabold text-fg sm:text-5xl tracking-tight">
                Can ho da luu ({favoriteApartments.length})
              </h1>
              <p className="font-body text-sm text-muted max-w-xl">
                Danh sach cac can ho chung cu ban da luu de theo doi va so sanh
                truoc khi dat lich xem can ho.
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
                  Chua co can ho nao duoc luu
                </h3>
                <p className="font-body text-xs text-muted max-w-xs mb-6">
                  Hay nhan vao nut trai tim tren cac can ho chung cu de luu lai
                  tai day nhe.
                </p>
                <Link href={'/properties' as Route}>
                  <button className="px-5 py-2.5 rounded-full bg-primary text-white text-xs font-bold shadow-md hover:bg-primary-hover hover:scale-102 active:scale-98 transition-all cursor-pointer">
                    Kham pha can ho ngay
                  </button>
                </Link>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {favoriteApartments.map(apt => (
                  <ApartmentCard
                    key={apt.id}
                    apt={apt}
                    showCompareCheckbox={true}
                    isSelected={compareIds.includes(apt.id)}
                    onToggleCompare={() => handleToggleCompare(apt.id)}
                  />
                ))}
              </div>
            )}
          </section>
        </main>
      </div>

      {/* Floating Compare Bar */}
      {compareIds.length > 0 && (
        <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-40 w-[90%] max-w-2xl bg-white border border-border rounded-full py-4 px-6 shadow-2xl flex items-center justify-between gap-4 animate-slide-up">
          <div className="flex items-center gap-3">
            <span className="h-6 w-6 rounded-full bg-primary text-white text-xs font-bold flex items-center justify-center">
              {compareIds.length}
            </span>
            <span className="font-body text-xs text-muted hidden sm:inline">
              Can ho duoc chon de so sanh (Toi da 3)
            </span>
            <span className="font-body text-xs text-muted sm:hidden">
              Can ho duoc chon
            </span>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handleClearCompare}
              className="text-xs text-muted hover:text-fg font-semibold px-3 py-2 transition-colors cursor-pointer"
            >
              Xoa
            </button>
            <button
              disabled={compareIds.length < 2}
              onClick={() => setShowCompareModal(true)}
              className="bg-primary text-white text-xs font-bold rounded-full px-5 py-2.5 hover:bg-primary-hover transition-all active:scale-95 disabled:opacity-50 disabled:pointer-events-none cursor-pointer"
            >
              So sanh ngay
            </button>
          </div>
        </div>
      )}

      {/* Compare Modal */}
      {showCompareModal && (
        <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl w-full max-w-4xl p-6 md:p-8 max-h-[90vh] overflow-y-auto space-y-6 shadow-2xl animate-fade-in">
            <div className="flex items-center justify-between border-b border-border pb-4">
              <div>
                <h3 className="font-marketing text-lg font-bold text-fg">
                  So sanh thong so can ho
                </h3>
                <p className="font-body text-xs text-muted">
                  Doi chieu dac tinh giua cac can ho ban dang xem xet.
                </p>
              </div>
              <button
                onClick={() => setShowCompareModal(false)}
                className="h-10 w-10 rounded-full border border-border flex items-center justify-center text-muted hover:text-fg hover:bg-surface-muted transition-all cursor-pointer"
              >
                <svg
                  className="h-5 w-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth="2.2"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </div>

            {/* Comparison Grid */}
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse text-xs">
                <thead>
                  <tr className="border-b border-border">
                    <th className="p-4 text-muted uppercase tracking-wider font-semibold min-w-[150px]">
                      Dac tinh
                    </th>
                    {compareApartments.map(apt => (
                      <th
                        key={apt.id}
                        className="p-4 font-bold text-fg min-w-[200px]"
                      >
                        <div className="space-y-1">
                          <span className="text-[10px] font-bold text-primary uppercase">
                            {apt.category}
                          </span>
                          <h4 className="font-marketing text-sm line-clamp-1">
                            {apt.title}
                          </h4>
                        </div>
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody className="divide-y divide-border/60">
                  <tr className="hover:bg-surface-muted/10 transition-colors">
                    <td className="p-4 font-semibold text-muted">Gia thue</td>
                    {compareApartments.map(apt => (
                      <td
                        key={apt.id}
                        className="p-4 font-bold text-primary text-sm"
                      >
                        {apt.price}
                      </td>
                    ))}
                  </tr>
                  <tr className="hover:bg-surface-muted/10 transition-colors">
                    <td className="p-4 font-semibold text-muted">Dien tich</td>
                    {compareApartments.map(apt => (
                      <td key={apt.id} className="p-4 text-fg">
                        {apt.area}
                      </td>
                    ))}
                  </tr>
                  <tr className="hover:bg-surface-muted/10 transition-colors">
                    <td className="p-4 font-semibold text-muted">Phong ngu</td>
                    {compareApartments.map(apt => (
                      <td key={apt.id} className="p-4 text-fg">
                        {apt.rooms}
                      </td>
                    ))}
                  </tr>
                  <tr className="hover:bg-surface-muted/10 transition-colors">
                    <td className="p-4 font-semibold text-muted">Vi tri</td>
                    {compareApartments.map(apt => (
                      <td key={apt.id} className="p-4 text-fg line-clamp-2">
                        {apt.location}
                      </td>
                    ))}
                  </tr>
                  <tr className="hover:bg-surface-muted/10 transition-colors">
                    <td className="p-4 font-semibold text-muted">
                      Tien ich noi khu
                    </td>
                    {compareApartments.map(apt => (
                      <td key={apt.id} className="p-4 text-fg">
                        <div className="flex flex-wrap gap-1">
                          {apt.amenities.map((amenity, index) => (
                            <span
                              key={index}
                              className="px-2 py-0.5 rounded bg-surface border border-border text-[10px] font-medium text-muted"
                            >
                              {amenity}
                            </span>
                          ))}
                        </div>
                      </td>
                    ))}
                  </tr>
                </tbody>
              </table>
            </div>

            <div className="flex justify-end gap-3 border-t border-border pt-4">
              <button
                onClick={() => setShowCompareModal(false)}
                className="px-5 py-2.5 rounded-full border border-border text-xs font-bold hover:bg-surface-muted transition-all cursor-pointer"
              >
                Dong
              </button>
            </div>
          </div>
        </div>
      )}

      <Footer />
    </div>
  )
}
