'use client'

import * as React from 'react'
import Image from 'next/image'
import { apiClient } from '@/shared/api/api-client'
import { toast } from 'sonner'
import {
  Building2,
  Search,
  Eye,
  ImageIcon,
  MapPin,
  BedDouble,
  Bath,
  LayoutGrid,
} from 'lucide-react'
import { AdminErrorState } from '@/shared/ui/admin-error-state'
import { DetailDrawer } from './components/apartment-management/detail-drawer'
import { StatusBadge } from './components/apartment-management/status-badge'
import {
  FILTER_OPTIONS,
  formatPrice,
} from './components/apartment-management/types'
import { joinAddressParts } from '@/shared/lib/join-address'
import type {
  StaffApartment,
  ApartmentStatus,
  FilterStatus,
} from './components/apartment-management/types'

// ─── ApartmentCard ─────────────────────────────────────────────────────────────

interface ApartmentCardProps {
  apartment: StaffApartment
  onSelect: (apt: StaffApartment) => void
}

function ApartmentCard({
  apartment,
  onSelect,
}: ApartmentCardProps): React.ReactElement {
  const apt = apartment
  const thumb = apt.gallery[0] ?? apt.images360[0]
  const imageCount = apt.gallery.length + apt.images360.length

  return (
    <div className="bg-[color:var(--surface)] border border-[color:var(--border)] rounded-2xl overflow-hidden shadow-[var(--shadow-sm)] hover:shadow-[var(--shadow-md)] hover:-translate-y-0.5 transition-all duration-200 flex flex-col">
      {/* Thumbnail */}
      <div className="relative h-40 bg-[color:var(--surface-muted)] overflow-hidden">
        {thumb ? (
          <Image
            src={thumb}
            alt={apt.title}
            fill
            sizes="(max-width: 768px) 100vw, 33vw"
            className="object-cover"
            unoptimized
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-[color:var(--muted)]">
            <ImageIcon className="w-8 h-8 opacity-30" />
          </div>
        )}
        <div className="absolute top-2 right-2">
          <StatusBadge status={apt.status} />
        </div>
        {imageCount > 0 && (
          <div className="absolute bottom-2 left-2 flex items-center gap-1 bg-[color:var(--fg)]/60 text-white text-[9px] font-bold px-1.5 py-0.5 rounded-full">
            <ImageIcon className="w-2.5 h-2.5" />
            {imageCount}
          </div>
        )}
      </div>

      {/* Info */}
      <div className="p-4 flex-1 flex flex-col gap-2">
        <h3 className="text-sm font-bold text-[color:var(--fg)] line-clamp-2 leading-snug">
          {apt.title}
        </h3>
        <p className="text-[10px] text-[color:var(--muted)] flex items-center gap-1">
          <MapPin className="w-2.5 h-2.5 shrink-0" />
          {joinAddressParts(apt.district, apt.city)}
        </p>
        <div className="flex items-center justify-between mt-auto pt-2 border-t border-[color:var(--border)]/50">
          <span className="text-xs font-bold text-[color:var(--primary)]">
            {formatPrice(apt.priceMonthly)}
          </span>
          <div className="flex items-center gap-2 text-[10px] text-[color:var(--muted)]">
            <span className="flex items-center gap-0.5">
              <BedDouble className="w-2.5 h-2.5" /> {apt.bedrooms}
            </span>
            <span className="flex items-center gap-0.5">
              <Bath className="w-2.5 h-2.5" /> {apt.bathrooms}
            </span>
            <span className="flex items-center gap-0.5">
              <LayoutGrid className="w-2.5 h-2.5" /> {apt.area}m²
            </span>
          </div>
        </div>
      </div>

      {/* CTA */}
      <div className="px-4 pb-4">
        <button
          onClick={() => onSelect(apt)}
          className="w-full py-2 text-xs font-semibold rounded-xl bg-[color:var(--fg)]/5 hover:bg-[color:var(--primary)] hover:text-[color:var(--on-control)] text-[color:var(--fg)] border border-[color:var(--border)] hover:border-transparent transition-all duration-200 flex items-center justify-center gap-1.5"
        >
          <Eye className="w-3.5 h-3.5" />
          Xem chi tiết
        </button>
      </div>
    </div>
  )
}

// ─── StatusFilterBar ──────────────────────────────────────────────────────────

interface StatusFilterBarProps {
  activeFilter: FilterStatus
  counts: Record<string, number>
  totalCount: number
  onChange: (f: FilterStatus) => void
}

function StatusFilterBar({
  activeFilter,
  counts,
  totalCount,
  onChange,
}: StatusFilterBarProps): React.ReactElement {
  return (
    <div className="flex flex-wrap sm:flex-nowrap rounded-xl border border-[color:var(--border)] p-1 bg-[color:var(--surface-muted)]/20 text-xs gap-1 font-semibold overflow-x-auto no-scrollbar">
      {FILTER_OPTIONS.map(opt => {
        const count =
          opt.value === 'all' ? totalCount : (counts[opt.value] ?? 0)
        const isActive = activeFilter === opt.value
        return (
          <button
            type="button"
            key={opt.value}
            aria-pressed={isActive}
            onClick={() => onChange(opt.value)}
            className={`px-3 py-1.5 rounded-lg whitespace-nowrap transition-all flex items-center gap-1 cursor-pointer ${
              isActive
                ? 'bg-[color:var(--primary)] text-[color:var(--on-control)] shadow-sm'
                : 'text-[color:var(--muted)] hover:text-[color:var(--fg)]'
            }`}
          >
            {opt.label}
            {count > 0 && (
              <span
                className={`text-[9px] font-bold px-1 py-0.5 rounded ${isActive ? 'bg-white/20' : 'bg-[color:var(--fg)]/8'}`}
              >
                {count}
              </span>
            )}
          </button>
        )
      })}
    </div>
  )
}

// ─── Main View ────────────────────────────────────────────────────────────────

export function ApartmentManagementView(): React.ReactElement {
  const [apartments, setApartments] = React.useState<StaffApartment[]>([])
  const [loading, setLoading] = React.useState(true)
  const [error, setError] = React.useState<string | null>(null)
  const [filter, setFilter] = React.useState<FilterStatus>('all')
  const [search, setSearch] = React.useState('')
  const [selected, setSelected] = React.useState<StaffApartment | null>(null)

  const loadApartments = React.useCallback(async (): Promise<void> => {
    setLoading(true)
    setError(null)
    try {
      // GET /apartments là danh sách công khai (chỉ tin đang hiển thị); màn quản lý cần mọi trạng thái.
      const data = await apiClient.get<StaffApartment[]>('/apartments/manage')
      setApartments(data)
    } catch (err) {
      const msg =
        err instanceof Error ? err.message : 'Không thể tải danh sách căn hộ'
      console.warn('Không thể tải danh sách căn hộ:', err)
      setError(msg)
      toast.error('Không thể tải danh sách căn hộ')
    } finally {
      setLoading(false)
    }
  }, [])

  React.useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    void loadApartments()
  }, [loadApartments])

  const handleStatusChange = (id: string, status: ApartmentStatus): void => {
    setApartments(prev => prev.map(a => (a.id === id ? { ...a, status } : a)))
    setSelected(prev => (prev?.id === id ? { ...prev, status } : prev))
  }

  // Nhận bản cập nhật (ảnh, VR, thông tin) từ API; giữ thông tin chủ nhà vì PATCH không kèm theo.
  const handleMediaChange = (updated: StaffApartment): void => {
    const merge = (current: StaffApartment): StaffApartment => ({
      ...current,
      ...updated,
      landlord: updated.landlord ?? current.landlord ?? null,
    })
    setApartments(prev =>
      prev.map(apartment =>
        apartment.id === updated.id ? merge(apartment) : apartment
      )
    )
    setSelected(prev => (prev?.id === updated.id ? merge(prev) : prev))
  }

  const handleApprove = async (id: string): Promise<void> => {
    try {
      await apiClient.patch(`/apartments/${id}/approve`, {})
      handleStatusChange(id, 'available')
      setSelected(null)
      toast.success('Đã phê duyệt tin đăng căn hộ!')
    } catch (err: unknown) {
      console.error('Failed to approve apartment:', err)
      toast.error(
        err instanceof Error ? err.message : 'Không thể phê duyệt tin đăng'
      )
    }
  }

  const handleReject = async (id: string, reason: string): Promise<void> => {
    try {
      await apiClient.patch(`/apartments/${id}/reject`, {
        rejectedReason: reason,
      })
      handleStatusChange(id, 'rejected')
      setSelected(null)
      toast.info('Đã từ chối tin đăng căn hộ.')
    } catch (err: unknown) {
      console.error('Failed to reject apartment:', err)
      toast.error(
        err instanceof Error ? err.message : 'Không thể từ chối tin đăng'
      )
    }
  }

  // Derived: status counts
  const statusCounts = React.useMemo(
    () =>
      apartments.reduce<Record<string, number>>((acc, a) => {
        acc[a.status] = (acc[a.status] ?? 0) + 1
        return acc
      }, {}),
    [apartments]
  )

  const filtered = React.useMemo(
    () =>
      apartments.filter(a => {
        const matchStatus = filter === 'all' || a.status === filter
        const q = search.trim().toLowerCase()
        const matchSearch =
          q === '' ||
          a.title.toLowerCase().includes(q) ||
          (a.location ?? '').toLowerCase().includes(q) ||
          a.district.toLowerCase().includes(q)
        return matchStatus && matchSearch
      }),
    [apartments, filter, search]
  )

  return (
    <div className="space-y-5 animate-in fade-in slide-in-from-bottom-4 duration-300">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-bold text-[color:var(--fg)] font-marketing flex items-center gap-2">
            <Building2 className="w-5 h-5 text-[color:var(--primary)]" />
            Quản lý Căn hộ
          </h2>
          <p className="text-xs text-[color:var(--muted)] mt-1">
            Xem, kiểm duyệt ảnh, ẩn/hiện và phê duyệt tin đăng căn hộ.
          </p>
        </div>
        <div className="flex items-center gap-3 shrink-0">
          <span className="text-xs font-semibold text-[color:var(--muted)]">
            Tổng:{' '}
            <span className="text-[color:var(--fg)] font-bold">
              {apartments.length}
            </span>
          </span>
          <button
            onClick={loadApartments}
            disabled={loading}
            aria-label="Tải lại danh sách"
            className="p-2 rounded-lg border border-[color:var(--border)] text-[color:var(--muted)] hover:text-[color:var(--fg)] hover:bg-[color:var(--fg)]/5 transition-colors disabled:opacity-50"
          >
            <svg
              width="14"
              height="14"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              className={loading ? 'animate-spin' : ''}
            >
              <path d="M23 4v6h-6" />
              <path d="M1 20v-6h6" />
              <path d="M3.51 9a9 9 0 0 1 14.85-3.36L23 10M1 14l4.64 4.36A9 9 0 0 0 20.49 15" />
            </svg>
          </button>
        </div>
      </div>

      {/* Filter + Search */}
      <div className="flex flex-col sm:flex-row gap-3">
        <StatusFilterBar
          activeFilter={filter}
          counts={statusCounts}
          totalCount={apartments.length}
          onChange={setFilter}
        />
        <div className="relative flex flex-1 min-w-[200px]">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-[color:var(--muted)]" />
          <input
            type="text"
            value={search}
            onChange={e => setSearch(e.target.value)}
            placeholder="Tìm theo tên, địa chỉ, quận..."
            className="h-full w-full pl-9 pr-4 py-2 text-xs border border-[color:var(--border)] rounded-xl bg-[color:var(--surface)] text-[color:var(--fg)] placeholder:text-[color:var(--muted)] focus:outline-none focus:border-[color:var(--primary)] transition-colors"
          />
        </div>
      </div>

      {/* States */}
      {loading && (
        <div className="flex items-center justify-center h-48">
          <div className="h-8 w-8 border-4 border-[color:var(--primary)] border-t-transparent rounded-full animate-spin" />
        </div>
      )}

      {error && !loading && (
        <AdminErrorState
          title="Lỗi tải danh sách căn hộ"
          message={error}
          onRetry={() => void loadApartments()}
        />
      )}

      {!loading && !error && filtered.length === 0 && (
        <div className="flex flex-col items-center justify-center h-48 text-[color:var(--muted)]">
          <Building2 className="w-10 h-10 mb-3 opacity-30" />
          <p className="text-sm font-semibold">Không có căn hộ nào</p>
          <p className="text-xs mt-1 opacity-70">
            Thử thay đổi bộ lọc hoặc từ khóa tìm kiếm
          </p>
        </div>
      )}

      {!loading && !error && filtered.length > 0 && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {filtered.map(apt => (
            <ApartmentCard
              key={apt.id}
              apartment={apt}
              onSelect={setSelected}
            />
          ))}
        </div>
      )}

      {/* Detail Modal */}
      {selected && (
        <DetailDrawer
          apartment={selected}
          onClose={() => setSelected(null)}
          onStatusChange={handleStatusChange}
          onApprove={handleApprove}
          onReject={handleReject}
          onMediaChange={handleMediaChange}
        />
      )}
    </div>
  )
}
