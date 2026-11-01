'use client'

import * as React from 'react'
import { HomeHeader } from '@/widgets/home-dashboard/ui/home-header'
import { Footer } from '@/shared/ui/footer'
import type { ApartmentItem } from '@/entities/properties'
import { apiClient } from '@/shared/api/api-client'
import { ApartmentCard } from '@/widgets/properties-dashboard/ui/components/apartment-card'
import { useFavorites } from '@/shared/lib/use-favorites'
import { CompareModal } from '@/widgets/properties-dashboard/ui/components/compare-modal'
import { Modal } from '@/shared/ui/modal'
import { toast } from 'sonner'

export type FavoritesSortOption =
  | 'default'
  | 'price-asc'
  | 'price-desc'
  | 'newest'

export function FavoritesDashboard(): React.ReactElement {
  const { favorites, clearFavorites } = useFavorites()
  const [apartments, setApartments] = React.useState<ApartmentItem[]>([])
  const [isLoading, setIsLoading] = React.useState(true)
  const [loadError, setLoadError] = React.useState<Error | null>(null)

  // Sort state
  const [sortBy, setSortBy] = React.useState<FavoritesSortOption>('default')

  // Batch clear confirmation modal
  const [showClearConfirm, setShowClearConfirm] = React.useState(false)
  const [isClearing, setIsClearing] = React.useState(false)

  // Compare states
  const [compareIds, setCompareIds] = React.useState<string[]>([])
  const [showCompareModal, setShowCompareModal] = React.useState(false)

  const favoriteApartments = React.useMemo(() => {
    return apartments.filter(apt => favorites.includes(apt.id))
  }, [favorites, apartments])

  const sortedFavoriteApartments = React.useMemo(() => {
    const list = [...favoriteApartments]
    switch (sortBy) {
      case 'price-asc':
        return list.sort((a, b) => (a.priceNum || 0) - (b.priceNum || 0))
      case 'price-desc':
        return list.sort((a, b) => (b.priceNum || 0) - (a.priceNum || 0))
      case 'newest':
        return list.sort((a, b) => {
          const timeA = (a as unknown as { createdAt?: string }).createdAt
            ? new Date(
                (a as unknown as { createdAt?: string }).createdAt!
              ).getTime()
            : 0
          const timeB = (b as unknown as { createdAt?: string }).createdAt
            ? new Date(
                (b as unknown as { createdAt?: string }).createdAt!
              ).getTime()
            : 0
          if (timeA && timeB) return timeB - timeA
          return favorites.indexOf(b.id) - favorites.indexOf(a.id)
        })
      default:
        return list
    }
  }, [favoriteApartments, sortBy, favorites])

  const compareApartments = React.useMemo(() => {
    return favoriteApartments.filter(apt => compareIds.includes(apt.id))
  }, [compareIds, favoriteApartments])

  const handleToggleCompare = (id: string): void => {
    setCompareIds(prev => {
      if (prev.includes(id)) {
        return prev.filter(item => item !== id)
      } else {
        if (prev.length >= 4) {
          toast.warning('Chỉ có thể chọn tối đa 4 căn hộ để so sánh.')
          return prev
        }
        return [...prev, id]
      }
    })
  }

  const handleConfirmClearAll = async (): Promise<void> => {
    setIsClearing(true)
    try {
      await clearFavorites()
      setCompareIds([])
      setShowClearConfirm(false)
    } catch {
      // toast error is dispatched by useFavorites
    } finally {
      setIsClearing(false)
    }
  }

  React.useEffect(() => {
    let active = true
    apiClient
      .get<ApartmentItem[]>('/apartments?format=web')
      .then(data => {
        if (active && data && Array.isArray(data)) {
          setApartments(data)
        }
      })
      .catch(err => {
        console.error('Failed to fetch apartments on favorites page:', err)
        if (active) {
          setLoadError(err instanceof Error ? err : new Error('Fetch failed'))
        }
      })
      .finally(() => {
        if (active) setIsLoading(false)
      })
    return () => {
      active = false
    }
  }, [])

  return (
    <div className="min-h-screen flex flex-col bg-bg text-fg selection:bg-primary/20 selection:text-primary relative overflow-x-hidden">
      <HomeHeader />

      <div className="flex-1 flex flex-col">
        {/* Breadcrumbs / Header */}
        <section className="bg-white dark:bg-surface-muted border-b border-border pt-28 pb-6 px-4 md:px-8">
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
              Lưu trữ những căn hộ bạn quan tâm và tìm ra nơi an cư lý tưởng
              nhất.
            </p>
          </div>
        </section>

        {/* Content list */}
        <main className="flex-1 max-w-6xl w-full mx-auto p-4 md:p-8 pb-20">
          <section className="space-y-6">
            {isLoading ? (
              <div
                data-testid="favorites-loading"
                className="text-center py-20 text-sm font-semibold text-muted"
              >
                Đang tải căn hộ yêu thích...
              </div>
            ) : loadError ? (
              <div
                role="alert"
                className="rounded-2xl border border-danger/30 bg-danger/10 p-4 text-sm text-danger"
              >
                Không thể tải danh sách căn hộ từ máy chủ. Vui lòng kiểm tra kết
                nối và thử lại.
              </div>
            ) : favoriteApartments.length === 0 ? (
              <div className="text-center py-20 rounded-3xl border border-dashed border-border bg-surface-muted/40 max-w-lg mx-auto shadow-sm">
                <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center mx-auto text-primary mb-4">
                  <svg
                    className="h-6 w-6 stroke-current fill-none"
                    viewBox="0 0 24 24"
                    strokeWidth="2"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z"
                    />
                  </svg>
                </div>
                <div className="space-y-2 max-w-xs mx-auto">
                  <h3 className="font-marketing text-sm font-extrabold text-fg uppercase tracking-wider">
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
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-2 border-b border-border/60">
                  <h2 className="font-marketing text-sm font-extrabold text-fg uppercase tracking-wider flex items-center gap-2">
                    <span>Căn hộ đã lưu</span>
                    <span className="h-5 px-2 rounded-full bg-primary-soft text-primary text-[10px] font-bold flex items-center justify-center font-mono">
                      {favoriteApartments.length}
                    </span>
                  </h2>

                  <div className="flex items-center gap-3 self-end sm:self-auto">
                    <div className="flex items-center gap-2">
                      <label
                        htmlFor="favorites-sort"
                        className="text-xs text-muted font-medium hidden sm:inline-block"
                      >
                        Sắp xếp:
                      </label>
                      <select
                        id="favorites-sort"
                        aria-label="Sắp xếp căn hộ yêu thích"
                        value={sortBy}
                        onChange={e =>
                          setSortBy(e.target.value as FavoritesSortOption)
                        }
                        className="text-xs font-semibold bg-white dark:bg-surface-muted border border-border rounded-lg px-2.5 py-1.5 text-fg focus:outline-none focus:ring-1 focus:ring-primary cursor-pointer"
                      >
                        <option value="default">Mặc định</option>
                        <option value="price-asc">Giá: Thấp đến cao</option>
                        <option value="price-desc">Giá: Cao đến thấp</option>
                        <option value="newest">Mới nhất</option>
                      </select>
                    </div>

                    <button
                      type="button"
                      onClick={() => setShowClearConfirm(true)}
                      className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-danger/30 text-danger hover:bg-danger/10 text-xs font-semibold transition-colors cursor-pointer"
                      title="Xóa tất cả căn hộ yêu thích"
                      aria-label="Xóa tất cả"
                    >
                      <svg
                        className="w-3.5 h-3.5"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth="2"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                        />
                      </svg>
                      <span>Xóa tất cả</span>
                    </button>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {sortedFavoriteApartments.map(apt => (
                    <ApartmentCard
                      key={apt.id}
                      apt={apt}
                      showCompareCheckbox={true}
                      isSelected={compareIds.includes(apt.id)}
                      onToggleCompare={() => handleToggleCompare(apt.id)}
                      disableCompare={compareIds.length >= 4}
                    />
                  ))}
                </div>
              </div>
            )}
          </section>
        </main>
      </div>

      <Footer />

      {/* Confirmation modal for clearing all favorites */}
      <Modal
        isOpen={showClearConfirm}
        onClose={() => setShowClearConfirm(false)}
        title="Xác nhận xóa tất cả yêu thích"
        hideFooter={true}
      >
        <div className="space-y-4">
          <p className="text-xs sm:text-sm text-muted leading-relaxed">
            Bạn có chắc chắn muốn xóa tất cả căn hộ khỏi danh sách yêu thích
            không? Thao tác này sẽ đồng bộ trên toàn bộ thiết bị của bạn.
          </p>
          <div className="flex items-center justify-end gap-3 pt-3 border-t border-border">
            <button
              type="button"
              onClick={() => setShowClearConfirm(false)}
              className="px-4 py-2 border border-border rounded-xl text-xs font-semibold text-fg hover:bg-surface-muted transition-colors cursor-pointer"
            >
              Hủy
            </button>
            <button
              type="button"
              data-testid="confirm-clear-all"
              onClick={handleConfirmClearAll}
              disabled={isClearing}
              className="px-4 py-2 bg-danger hover:bg-danger/90 text-white rounded-xl text-xs font-semibold transition-colors cursor-pointer disabled:opacity-50"
            >
              {isClearing ? 'Đang xóa...' : 'Xác nhận xóa'}
            </button>
          </div>
        </div>
      </Modal>

      {/* Floating Compare Action Bar for Guest and Authenticated Users */}
      {compareIds.length >= 2 && (
        <div className="fixed bottom-6 left-1/2 -translate-x-1/2 bg-surface/95 backdrop-blur-md border border-border-strong text-fg px-6 py-4 rounded-2xl shadow-2xl flex items-center justify-between gap-8 z-[999] w-[90%] max-w-xl animate-in slide-in-from-bottom duration-300">
          <div className="space-y-0.5">
            <p className="font-marketing text-xs font-bold text-fg flex items-center gap-1.5">
              <span className="h-2.5 w-2.5 rounded-full bg-primary animate-pulse" />
              Đã chọn {compareIds.length}/4 căn hộ. Chọn tối thiểu 2 để đối
              chiếu.
            </p>
            <p className="font-body text-[10px] text-fg/70 font-medium">
              Hỗ trợ cả khách vãng lai chưa cần tài khoản
            </p>
          </div>
          <div className="flex items-center gap-3 shrink-0">
            <button
              onClick={() => setCompareIds([])}
              className="px-4 py-2 border border-border-strong rounded-xl text-xs font-bold text-fg/85 hover:text-danger hover:bg-surface-muted transition-all cursor-pointer"
            >
              Xóa chọn
            </button>
            <button
              onClick={() => setShowCompareModal(true)}
              className="px-5 py-2 bg-primary rounded-xl text-xs font-bold text-white hover:bg-primary-hover transition-all cursor-pointer shadow-md shadow-primary/10"
            >
              So sánh ngay
            </button>
          </div>
        </div>
      )}

      {/* Compare Modal Panel */}
      <CompareModal
        show={showCompareModal}
        onClose={() => setShowCompareModal(false)}
        compareApartments={compareApartments}
      />
    </div>
  )
}
