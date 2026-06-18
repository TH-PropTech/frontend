'use client'

import * as React from 'react'
import Link from 'next/link'
import type { Route } from 'next'
import { HomeHeader } from '@/widgets/home-dashboard/ui/home-header'
import { Footer } from '@/shared/ui/footer'
import { mockApartments, ApartmentItem } from '@/entities/properties'
import { apiClient } from '@/shared/api/api-client'
import { ApartmentCard } from '@/widgets/properties-dashboard/ui/components/apartment-card'
import { useFavorites } from '@/shared/lib/use-favorites'
import { Button } from '@/shared/ui/button'
import {
  Heart,
  Scale,
  X,
  Trash2,
  Maximize2,
  BedDouble,
  MapPin,
  Compass,
  Armchair,
  Clock,
  Sparkles,
  ArrowRight,
  Eye,
  Info,
} from 'lucide-react'

export default function FavoritesPage(): React.ReactElement {
  const { favorites } = useFavorites()
  const [compareIds, setCompareIds] = React.useState<string[]>([])
  const [showCompareModal, setShowCompareModal] = React.useState(false)
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

  // Filter apartments matching current favorites
  const favoriteApartments = React.useMemo(() => {
    return apartments.filter(apt => favorites.includes(apt.id))
  }, [favorites, apartments])

  // Filter compareIds to only include active favorites
  const activeCompareIds = React.useMemo(() => {
    return compareIds.filter(id => favorites.includes(id))
  }, [compareIds, favorites])

  // Get selected apartments for comparison
  const compareApartments = React.useMemo(() => {
    return apartments.filter(apt => activeCompareIds.includes(apt.id))
  }, [activeCompareIds, apartments])

  const handleToggleCompare = (id: string): void => {
    setCompareIds(prev => {
      const active = prev.filter(item => favorites.includes(item))
      if (active.includes(id)) {
        return active.filter(item => item !== id)
      } else {
        if (active.length >= 3) return active // Limit to max 3
        return [...active, id]
      }
    })
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
            {/* Header / Hero Section */}
            <div className="relative mb-12 rounded-3xl border border-border/60 bg-gradient-to-br from-surface-muted/30 to-surface/40 p-8 md:p-10 shadow-sm overflow-hidden">
              {/* Background decorative elements */}
              <div className="absolute top-0 right-0 -mt-6 -mr-6 w-32 h-32 bg-primary/5 rounded-full blur-2xl pointer-events-none" />
              <div className="absolute bottom-0 left-0 -mb-6 -ml-6 w-48 h-48 bg-accent/5 rounded-full blur-3xl pointer-events-none" />

              <div className="relative z-10 space-y-3">
                <span className="inline-flex items-center gap-1.5 rounded-full bg-primary-soft px-3 py-1 text-[10px] font-bold uppercase tracking-widest text-primary">
                  <Sparkles className="h-3 w-3" />
                  CÁ NHÂN HÓA
                </span>
                <h1 className="font-marketing text-3xl font-extrabold text-fg sm:text-5xl tracking-tight leading-tight">
                  Căn hộ đã lưu{' '}
                  <span className="inline-flex items-center justify-center bg-primary text-white text-lg font-bold px-3 py-0.5 rounded-full font-mono align-middle ml-2">
                    {favoriteApartments.length}
                  </span>
                </h1>
                <p className="font-body text-sm text-muted max-w-2xl leading-relaxed">
                  Danh sách các căn hộ chung cư bạn đã lưu để theo dõi và đối
                  chiếu thông số trước khi đặt lịch xem nhà trực tiếp hoặc trải
                  nghiệm không gian 3D.
                </p>
              </div>
            </div>

            {/* Main Content Area */}
            {favoriteApartments.length === 0 ? (
              <div className="text-center py-20 rounded-3xl border border-dashed border-border-strong/60 bg-white/50 backdrop-blur-sm shadow-sm flex flex-col items-center justify-center p-8 max-w-2xl mx-auto transition-all duration-300 hover:border-primary/40 hover:shadow-md">
                <div className="h-20 w-20 rounded-full bg-primary-soft flex items-center justify-center text-primary mb-6 animate-pulse-subtle">
                  <Heart className="h-10 w-10 text-primary fill-primary/10" />
                </div>
                <h3 className="font-marketing text-xl font-bold text-fg mb-2">
                  Chưa có căn hộ nào được lưu
                </h3>
                <p className="font-body text-sm text-muted max-w-md mb-8 leading-relaxed">
                  Hãy nhấn vào biểu tượng trái tim trên các thẻ căn hộ trong lúc
                  duyệt tin để lưu lại danh sách yêu thích tại đây nhé.
                </p>
                <Link href="/properties" className="group">
                  <Button className="px-6 py-5 rounded-full bg-primary hover:bg-primary-hover text-white text-xs font-bold shadow-md transition-all duration-200 flex items-center gap-2">
                    Khám phá căn hộ ngay
                    <ArrowRight className="h-3.5 w-3.5 transition-transform duration-200 group-hover:translate-x-1" />
                  </Button>
                </Link>
              </div>
            ) : (
              <div className="space-y-4">
                <div className="flex items-center justify-between text-xs text-muted mb-2 px-2">
                  <span>
                    Hiển thị {favoriteApartments.length} căn hộ yêu thích
                  </span>
                  {activeCompareIds.length > 0 && (
                    <button
                      onClick={handleClearCompare}
                      className="text-primary hover:underline font-semibold"
                    >
                      Bỏ chọn tất cả ({activeCompareIds.length})
                    </button>
                  )}
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {favoriteApartments.map(apt => (
                    <ApartmentCard
                      key={apt.id}
                      apt={apt}
                      showCompareCheckbox={true}
                      isSelected={activeCompareIds.includes(apt.id)}
                      disableCompare={activeCompareIds.length >= 3}
                      onToggleCompare={() => handleToggleCompare(apt.id)}
                    />
                  ))}
                </div>
              </div>
            )}
          </section>
        </main>
      </div>

      {/* Floating Compare Bar */}
      {activeCompareIds.length > 0 && (
        <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-40 w-[92%] max-w-2xl bg-white/90 backdrop-blur-md border border-border shadow-2xl rounded-2xl py-3.5 px-5 flex items-center justify-between gap-4 transition-all duration-300 animate-in slide-in-from-bottom-5 duration-300">
          <div className="flex items-center gap-3">
            <span className="h-6 w-6 rounded-full bg-primary text-white text-[11px] font-bold flex items-center justify-center font-mono">
              {activeCompareIds.length}
            </span>
            <div className="flex flex-col">
              <span className="font-display text-xs font-bold text-fg">
                So sánh căn hộ
              </span>
              <span className="font-body text-[10px] text-muted hidden sm:inline">
                Đã chọn {activeCompareIds.length}/3 căn hộ. Chọn tối thiểu 2 để
                đối chiếu.
              </span>
              <span className="font-body text-[10px] text-muted sm:hidden">
                Tối đa 3 căn hộ
              </span>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handleClearCompare}
              className="text-xs text-muted hover:text-danger font-semibold px-3 py-2 transition-colors flex items-center gap-1"
            >
              <Trash2 className="h-3.5 w-3.5" />
              <span>Xóa</span>
            </button>
            <button
              disabled={activeCompareIds.length < 2}
              onClick={() => setShowCompareModal(true)}
              className="bg-primary text-white text-xs font-bold rounded-full px-5 py-2.5 hover:bg-primary-hover shadow-sm transition-all active:scale-95 disabled:opacity-40 disabled:pointer-events-none flex items-center gap-1.5 cursor-pointer"
            >
              <Scale className="h-3.5 w-3.5" />
              <span>So sánh ngay</span>
            </button>
          </div>
        </div>
      )}

      {/* Compare Modal */}
      {showCompareModal && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl w-full max-w-4xl p-6 md:p-8 max-h-[90vh] overflow-y-auto space-y-6 shadow-2xl animate-in fade-in zoom-in-95 duration-200 border border-border flex flex-col justify-between">
            <div className="flex items-start justify-between border-b border-border pb-4">
              <div>
                <h3 className="font-marketing text-xl font-bold text-fg flex items-center gap-2">
                  <Scale className="h-5 w-5 text-primary" />
                  So sánh thông số chi tiết
                </h3>
                <p className="font-body text-xs text-muted">
                  Đối chiếu thông tin để chọn ra căn hộ ưng ý nhất cho nhu cầu
                  của bạn.
                </p>
              </div>
              <button
                onClick={() => setShowCompareModal(false)}
                className="h-9 w-9 rounded-full border border-border flex items-center justify-center text-muted hover:text-fg hover:bg-surface-muted transition-all duration-200 hover:rotate-90"
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            {/* Comparison Table Grid */}
            <div className="overflow-x-auto -mx-2 px-2 scrollbar-thin scrollbar-thumb-border scrollbar-track-transparent">
              <table className="w-full text-left border-collapse text-xs">
                <thead>
                  <tr className="border-b border-border">
                    <th className="p-4 text-muted uppercase tracking-wider font-semibold min-w-[150px] font-display">
                      Đặc tính
                    </th>
                    {compareApartments.map(apt => (
                      <th key={apt.id} className="p-4 min-w-[220px] align-top">
                        <div className="bg-surface-muted rounded-xl p-3 border border-border space-y-2 relative overflow-hidden text-left group">
                          {/* Decorative pattern top */}
                          <div
                            className="absolute inset-0 opacity-10"
                            style={{
                              backgroundImage:
                                'radial-gradient(circle at 50% 50%, var(--primary) 1.5px, transparent 0)',
                              backgroundSize: '8px 8px',
                            }}
                          />
                          <div className="relative z-10 space-y-1">
                            <span className="inline-block px-2 py-0.5 rounded-full bg-primary-soft text-primary text-[9px] font-bold uppercase tracking-wider">
                              {apt.category}
                            </span>
                            <h4 className="font-marketing text-xs font-bold line-clamp-2 min-h-[32px] text-fg leading-tight">
                              {apt.title}
                            </h4>
                            <p className="text-primary text-xs font-extrabold">
                              {apt.price}
                            </p>
                          </div>
                        </div>
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody className="divide-y divide-border/60">
                  {/* Gia thue */}
                  <tr className="hover:bg-surface-muted/20 transition-colors">
                    <td className="p-4 font-semibold text-muted flex items-center gap-2">
                      <Sparkles className="h-3.5 w-3.5 text-primary shrink-0" />
                      <span>Giá thuê</span>
                    </td>
                    {compareApartments.map(apt => (
                      <td
                        key={apt.id}
                        className="p-4 font-bold text-primary text-sm bg-primary-soft/10"
                      >
                        {apt.price}
                      </td>
                    ))}
                  </tr>

                  {/* Dien tich */}
                  <tr className="hover:bg-surface-muted/20 transition-colors">
                    <td className="p-4 font-semibold text-muted flex items-center gap-2">
                      <Maximize2 className="h-3.5 w-3.5 text-muted shrink-0" />
                      <span>Diện tích</span>
                    </td>
                    {compareApartments.map(apt => (
                      <td key={apt.id} className="p-4 text-fg font-medium">
                        {apt.area}
                      </td>
                    ))}
                  </tr>

                  {/* Phong ngu */}
                  <tr className="hover:bg-surface-muted/20 transition-colors">
                    <td className="p-4 font-semibold text-muted flex items-center gap-2">
                      <BedDouble className="h-3.5 w-3.5 text-muted shrink-0" />
                      <span>Phòng ngủ</span>
                    </td>
                    {compareApartments.map(apt => (
                      <td key={apt.id} className="p-4 text-fg">
                        {apt.rooms}
                      </td>
                    ))}
                  </tr>

                  {/* Vi tri */}
                  <tr className="hover:bg-surface-muted/20 transition-colors">
                    <td className="p-4 font-semibold text-muted flex items-center gap-2">
                      <MapPin className="h-3.5 w-3.5 text-muted shrink-0" />
                      <span>Vị trí</span>
                    </td>
                    {compareApartments.map(apt => (
                      <td key={apt.id} className="p-4 text-fg leading-relaxed">
                        <span className="line-clamp-2">{apt.location}</span>
                      </td>
                    ))}
                  </tr>

                  {/* Huong ban cong */}
                  <tr className="hover:bg-surface-muted/20 transition-colors">
                    <td className="p-4 font-semibold text-muted flex items-center gap-2">
                      <Compass className="h-3.5 w-3.5 text-muted shrink-0" />
                      <span>Hướng ban công</span>
                    </td>
                    {compareApartments.map(apt => (
                      <td key={apt.id} className="p-4 text-fg">
                        {apt.balconyDirection ||
                          apt.direction ||
                          'Chưa cập nhật'}
                      </td>
                    ))}
                  </tr>

                  {/* Tinh trang noi that */}
                  <tr className="hover:bg-surface-muted/20 transition-colors">
                    <td className="p-4 font-semibold text-muted flex items-center gap-2">
                      <Armchair className="h-3.5 w-3.5 text-muted shrink-0" />
                      <span>Nội thất</span>
                    </td>
                    {compareApartments.map(apt => (
                      <td key={apt.id} className="p-4 text-fg">
                        {apt.furniture || 'Chưa cập nhật'}
                      </td>
                    ))}
                  </tr>

                  {/* Thoi gian don vao */}
                  <tr className="hover:bg-surface-muted/20 transition-colors">
                    <td className="p-4 font-semibold text-muted flex items-center gap-2">
                      <Clock className="h-3.5 w-3.5 text-muted shrink-0" />
                      <span>Dọn vào từ</span>
                    </td>
                    {compareApartments.map(apt => (
                      <td key={apt.id} className="p-4 text-fg">
                        {apt.moveInTime || 'Liên hệ'}
                      </td>
                    ))}
                  </tr>

                  {/* Tien ich noi khu */}
                  <tr className="hover:bg-surface-muted/20 transition-colors">
                    <td className="p-4 font-semibold text-muted flex items-center gap-2">
                      <Info className="h-3.5 w-3.5 text-muted shrink-0" />
                      <span>Tiện ích</span>
                    </td>
                    {compareApartments.map(apt => (
                      <td key={apt.id} className="p-4 text-fg">
                        <div className="flex flex-wrap gap-1 max-w-[240px]">
                          {apt.amenities && apt.amenities.length > 0 ? (
                            apt.amenities.map((amenity, index) => (
                              <span
                                key={index}
                                className="px-2 py-0.5 rounded bg-surface border border-border text-[9px] font-medium text-muted whitespace-nowrap"
                              >
                                {amenity === 'pool'
                                  ? '🏊‍♂️ Hồ bơi'
                                  : amenity === 'gym'
                                    ? '🏋️‍♂️ Phòng gym'
                                    : amenity === 'parking'
                                      ? '🚗 Đỗ xe'
                                      : amenity === 'elevator'
                                        ? '🛗 Thang máy'
                                        : amenity === 'security'
                                          ? '🛡️ Bảo vệ'
                                          : amenity === 'pets'
                                            ? '🐾 Thú cưng'
                                            : amenity === 'park'
                                              ? '🌳 Công viên'
                                              : amenity}
                              </span>
                            ))
                          ) : (
                            <span className="text-muted text-[10px]">
                              Chưa có thông tin
                            </span>
                          )}
                        </div>
                      </td>
                    ))}
                  </tr>

                  {/* Hanh dong nhanh */}
                  <tr className="hover:bg-surface-muted/20 transition-colors">
                    <td className="p-4 font-semibold text-muted">
                      <span>Thao tác nhanh</span>
                    </td>
                    {compareApartments.map(apt => (
                      <td key={apt.id} className="p-4">
                        <div className="flex gap-2">
                          <Link
                            href={`/properties/${apt.id}` as Route}
                            className="w-full"
                          >
                            <Button
                              variant="primary"
                              className="w-full py-2 px-3 text-[10px] font-bold rounded-lg flex items-center justify-center gap-1"
                            >
                              <Eye className="h-3 w-3" />
                              Xem chi tiết
                            </Button>
                          </Link>
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
                className="px-5 py-2.5 rounded-full border border-border text-xs font-bold hover:bg-surface-muted transition-all cursor-pointer font-display"
              >
                Đóng
              </button>
            </div>
          </div>
        </div>
      )}

      <Footer />
    </div>
  )
}
