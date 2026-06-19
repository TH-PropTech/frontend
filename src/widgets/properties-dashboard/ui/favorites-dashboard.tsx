'use client'

import * as React from 'react'
import { HomeHeader } from '@/widgets/home-dashboard/ui/home-header'
import { Footer } from '@/shared/ui/footer'
import { mockApartments, ApartmentItem } from '@/entities/properties'
import { apiClient } from '@/shared/api/api-client'
import { ApartmentCard } from '@/widgets/properties-dashboard/ui/components/apartment-card'
import { useFavorites } from '@/shared/lib/use-favorites'

export function FavoritesDashboard(): React.ReactElement {
  const { favorites } = useFavorites()
  const [apartments, setApartments] =
    React.useState<ApartmentItem[]>(mockApartments)

  React.useEffect(() => {
    let active = true
    apiClient
      .get<ApartmentItem[]>('/apartments?format=web')
      .then(data => {
        if (active && data && Array.isArray(data) && data.length > 0) {
          setApartments(data)
        }
      })
      .catch(err => {
        console.error('Failed to fetch apartments on favorites page:', err)
      })
    return () => {
      active = false
    }
  }, [])

  const favoriteApartments = React.useMemo(() => {
    return apartments.filter(apt => favorites.includes(apt.id))
  }, [favorites, apartments])

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 dark:bg-surface">
      <HomeHeader />

      <div className="flex-1 flex flex-col">
        {/* Breadcrumbs / Header */}
        <section className="bg-white dark:bg-surface-muted border-b border-border py-6 px-4 md:px-8">
          <div className="max-w-6xl mx-auto space-y-1">
            <div className="flex items-center gap-2 text-[10px] uppercase font-bold tracking-wider text-muted">
              <span>Đường dẫn</span>
              <span>/</span>
              <span>Khám phá</span>
              <span>/</span>
              <span className="text-primary font-extrabold">Yêu thích</span>
            </div>
            <h1 className="font-marketing text-2xl font-black text-fg tracking-tight">
              Danh Sách Căn Hộ Yêu Thích
            </h1>
            <p className="font-body text-xs text-muted max-w-xl leading-relaxed">
              Lưu trữ những căn hộ bạn quan tâm từ sổ cái Blockchain và tìm ra
              nơi an cư lý tưởng nhất.
            </p>
          </div>
        </section>

        {/* Content list */}
        <main className="flex-1 max-w-6xl w-full mx-auto p-4 md:p-8">
          <section className="space-y-6">
            {favoriteApartments.length === 0 ? (
              <div className="bg-white dark:bg-surface-muted border border-border rounded-2xl p-12 text-center space-y-4 max-w-lg mx-auto shadow-sm">
                <div className="h-16 w-16 rounded-full bg-slate-100 dark:bg-surface flex items-center justify-center mx-auto text-muted">
                  💔
                </div>
                <div className="space-y-2">
                  <h3 className="font-marketing text-lg font-bold text-fg">
                    Chưa có căn hộ yêu thích
                  </h3>
                  <p className="font-body text-xs text-muted leading-relaxed">
                    Hãy quay lại bản đồ khám phá và nhấn vào biểu tượng trái tim
                    để lưu các căn hộ ưng ý tại đây nhé!
                  </p>
                </div>
              </div>
            ) : (
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <h2 className="font-marketing text-sm font-extrabold text-fg uppercase tracking-wider flex items-center gap-2">
                    <span>Căn hộ đã lưu</span>
                    <span className="h-5 px-2 rounded-full bg-primary-soft text-primary text-[10px] font-bold flex items-center justify-center font-mono">
                      {favoriteApartments.length}
                    </span>
                  </h2>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {favoriteApartments.map(apt => (
                    <ApartmentCard key={apt.id} apt={apt} />
                  ))}
                </div>
              </div>
            )}
          </section>
        </main>
      </div>

      <Footer />
    </div>
  )
}
