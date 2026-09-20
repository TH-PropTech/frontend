'use client'

import * as React from 'react'
import {
  RotateCw,
  Clock,
  ChevronLeft,
  ChevronRight,
  AlertCircle,
  FileText,
} from 'lucide-react'
import { apiClient } from '@/shared/api/api-client'

export type FilterStatus =
  | 'all'
  | 'pending'
  | 'confirmed'
  | 'rejected'
  | 'cancelled'
  | 'completed'

export interface Appointment {
  id: string
  propertyTitle: string
  tenantName: string
  tenantPhone: string
  landlordName: string
  landlordPhone: string
  dateTime: string
  type: 'vr_guide' | 'in_person'
  status: 'pending' | 'confirmed' | 'cancelled' | 'rejected' | 'completed'
  rejectedReason?: string | null
  note?: string | null
}

export interface BackendBookingResponse {
  _id: string
  apartmentId: string
  apartmentTitle: string
  landlordId: string
  tenantId: string
  tenantName?: string | null
  tenantPhone?: string | null
  visitAt: string
  method: 'onsite' | 'video'
  status: 'pending' | 'confirmed' | 'rejected' | 'cancelled' | 'completed'
  rejectedReason?: string | null
  note?: string | null
  landlordName?: string
  landlordPhone?: string
  tenantEmail?: string
  createdAt: string
}

export interface BookingStatusCounts {
  pending: number
  confirmed: number
  rejected: number
  cancelled: number
  completed: number
}

export interface BackendBookingListResult {
  items: BackendBookingResponse[]
  total: number
  page: number
  limit: number
  totalPages: number
  statusCounts?: BookingStatusCounts
}

const FILTERS: { id: FilterStatus; label: string }[] = [
  { id: 'all', label: 'Tất cả' },
  { id: 'pending', label: 'Chờ duyệt' },
  { id: 'confirmed', label: 'Đã xác nhận' },
  { id: 'rejected', label: 'Bị từ chối' },
  { id: 'cancelled', label: 'Đã hủy' },
  { id: 'completed', label: 'Hoàn thành' },
]

export function SchedulesView(): React.ReactElement {
  const [appointments, setAppointments] = React.useState<Appointment[]>([])
  const [loading, setLoading] = React.useState(true)
  const [error, setError] = React.useState<string | null>(null)
  const [filter, setFilter] = React.useState<FilterStatus>('pending')
  const [page, setPage] = React.useState<number>(1)
  const [totalPages, setTotalPages] = React.useState<number>(1)
  const [total, setTotal] = React.useState<number>(0)
  const [statusCounts, setStatusCounts] = React.useState<BookingStatusCounts>({
    pending: 0,
    confirmed: 0,
    rejected: 0,
    cancelled: 0,
    completed: 0,
  })

  const mapAppointment = React.useCallback(
    (b: BackendBookingResponse): Appointment => {
      return {
        id: b._id || '',
        propertyTitle: b.apartmentTitle || 'Căn hộ TH PropTech',
        tenantName: b.tenantName || 'Khách thuê',
        tenantPhone: b.tenantPhone || 'Chưa cung cấp',
        landlordName: b.landlordName || 'Chủ nhà',
        landlordPhone: b.landlordPhone || 'Chưa cung cấp',
        dateTime: b.visitAt
          ? new Date(b.visitAt).toLocaleString('vi-VN')
          : 'Chưa cập nhật',
        type: b.method === 'video' ? 'vr_guide' : 'in_person',
        status: b.status,
        rejectedReason: b.rejectedReason ?? null,
        note: b.note ?? null,
      }
    },
    []
  )

  const loadAppointments = React.useCallback(async () => {
    setLoading(true)
    setError(null)
    try {
      const queryParams = new URLSearchParams()
      if (filter !== 'all') {
        queryParams.set('status', filter)
      }
      queryParams.set('page', String(page))
      queryParams.set('limit', '20')

      const data = await apiClient.get<BackendBookingListResult>(
        `/bookings?${queryParams.toString()}`
      )
      if (data && Array.isArray(data.items)) {
        setAppointments(data.items.map(mapAppointment))
        setTotal(data.total ?? 0)
        setTotalPages(data.totalPages ?? 1)
        if (data.statusCounts) {
          setStatusCounts(data.statusCounts)
        }
      }
    } catch (err) {
      console.error('Failed to load bookings:', err)
      const message =
        err instanceof Error ? err.message : 'Không thể tải dữ liệu lịch hẹn'
      setError(message)
    } finally {
      setLoading(false)
    }
  }, [filter, page, mapAppointment])

  React.useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    void loadAppointments()
  }, [loadAppointments])

  const handleFilterChange = (newFilter: FilterStatus) => {
    if (newFilter !== filter) {
      setFilter(newFilter)
      setPage(1)
    }
  }

  const getFilterCount = (id: FilterStatus): number => {
    if (id === 'all') return total
    return statusCounts[id] ?? 0
  }

  if (loading && appointments.length === 0) {
    return (
      <div className="flex h-64 items-center justify-center">
        <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent" />
      </div>
    )
  }

  if (error && appointments.length === 0) {
    return (
      <div className="flex h-64 flex-col items-center justify-center gap-3 text-center">
        <div className="flex items-center gap-1.5 text-sm font-medium text-danger">
          <AlertCircle className="w-4 h-4" />
          <span>{error}</span>
        </div>
        <button
          onClick={() => {
            void loadAppointments()
          }}
          className="rounded-lg bg-primary px-4 py-2 text-xs font-semibold text-on-control hover:bg-primary-hover transition-colors"
        >
          Thử lại
        </button>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* Title & Filter Headers */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-bold text-fg font-marketing">
            Giám sát lịch hẹn xem nhà
          </h2>
          <p className="text-xs text-muted mt-1">
            Theo dõi, giám sát trạng thái và điều phối lịch xem phòng của khách
            thuê và chủ nhà.
          </p>
        </div>
        <div className="flex items-center gap-2 self-start flex-wrap">
          <div className="flex flex-wrap rounded-lg border border-line p-1 bg-surface-muted/30 text-xs gap-1 font-semibold">
            {FILTERS.map(f => {
              const active = filter === f.id
              const count = getFilterCount(f.id)
              return (
                <button
                  key={f.id}
                  onClick={() => handleFilterChange(f.id)}
                  className={`px-2.5 py-1.5 rounded-md transition-all ${
                    active
                      ? 'bg-primary text-on-control shadow-sm'
                      : 'text-muted hover:text-fg'
                  }`}
                >
                  {f.label} ({count})
                </button>
              )
            })}
          </div>
          <button
            onClick={() => {
              void loadAppointments()
            }}
            disabled={loading}
            className="flex items-center gap-1.5 px-3 py-2 rounded-lg border border-line bg-surface hover:bg-surface-muted text-xs font-semibold text-fg transition-colors disabled:opacity-50"
            title="Làm mới danh sách"
          >
            <RotateCw
              className={`w-3.5 h-3.5 text-muted ${loading ? 'animate-spin' : ''}`}
            />
            <span>Làm mới</span>
          </button>
        </div>
      </div>

      {/* Appointment Cards */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {appointments.map(app => (
          <div
            key={app.id}
            className="bg-surface border border-line rounded-xl p-5 shadow-sm space-y-4 flex flex-col justify-between hover:translate-y-[-2px] hover:shadow-md transition-all duration-300"
          >
            <div>
              <div className="flex justify-between items-center">
                <span
                  title={app.id}
                  className="text-[10px] font-bold text-muted bg-fg/5 px-2.5 py-0.5 rounded font-display uppercase tracking-wider cursor-help"
                >
                  #{app.id.slice(-6)}
                </span>
                <div className="flex gap-2 items-center">
                  <span
                    className={`text-[9px] font-bold px-2 py-0.5 rounded-full ${
                      app.type === 'vr_guide'
                        ? 'bg-accent-2/10 text-accent-2'
                        : 'bg-accent-3/10 text-accent-3'
                    }`}
                  >
                    {app.type === 'vr_guide' ? 'VR 360 Tour' : 'Xem trực tiếp'}
                  </span>
                  <span
                    className={`text-[9px] font-bold px-2 py-0.5 rounded-full ${
                      app.status === 'confirmed' || app.status === 'completed'
                        ? 'bg-accent-2/10 text-accent-2'
                        : app.status === 'cancelled' ||
                            app.status === 'rejected'
                          ? 'bg-accent/10 text-accent'
                          : 'bg-accent-3/10 text-accent-3'
                    }`}
                  >
                    {app.status === 'confirmed' && 'Đã duyệt'}
                    {app.status === 'completed' && 'Hoàn thành'}
                    {app.status === 'rejected' && 'Bị từ chối'}
                    {app.status === 'cancelled' && 'Đã hủy'}
                    {app.status === 'pending' && 'Đang chờ'}
                  </span>
                </div>
              </div>

              <h3 className="mt-3.5 text-sm font-bold text-fg font-marketing line-clamp-1">
                {app.propertyTitle}
              </h3>

              <p className="text-xs text-primary font-semibold font-body mt-1.5 flex items-center gap-1.5">
                <Clock className="w-3.5 h-3.5 shrink-0" />
                <span>Thời gian: {app.dateTime}</span>
              </p>

              {/* Note if present */}
              {app.note && (
                <div className="mt-2.5 rounded-lg bg-surface-muted/60 p-2.5 text-xs text-muted flex items-start gap-1.5 border border-line/50">
                  <FileText className="w-3.5 h-3.5 text-primary shrink-0 mt-0.5" />
                  <div className="line-clamp-2">
                    <span className="font-semibold text-fg">Ghi chú:</span>{' '}
                    {app.note}
                  </div>
                </div>
              )}

              {/* Rejected reason banner */}
              {app.status === 'rejected' && app.rejectedReason && (
                <div className="mt-2.5 rounded-lg bg-danger/10 p-2.5 text-xs text-danger flex items-start gap-1.5 border border-danger/20">
                  <AlertCircle className="w-3.5 h-3.5 shrink-0 mt-0.5" />
                  <div>
                    <span className="font-semibold">Lý do từ chối:</span>{' '}
                    {app.rejectedReason}
                  </div>
                </div>
              )}

              {/* Parties info */}
              <div className="mt-4 grid grid-cols-2 gap-4 border-t border-line/50 pt-3 text-xs">
                <div>
                  <span className="text-subtle block font-body">
                    Khách thuê
                  </span>
                  <span className="font-bold text-fg">{app.tenantName}</span>
                  <span className="text-subtle block mt-0.5">
                    {app.tenantPhone}
                  </span>
                </div>
                <div>
                  <span className="text-subtle block font-body">Chủ nhà</span>
                  <span className="font-bold text-fg">{app.landlordName}</span>
                  <span className="text-subtle block mt-0.5">
                    {app.landlordPhone}
                  </span>
                </div>
              </div>
            </div>

            {/* Read-only monitoring footer */}
            <div className="border-t border-line/30 pt-3.5 mt-2 text-xs flex justify-between items-center text-muted font-body">
              <span>Trạng thái lịch hẹn</span>
              <span
                className={`font-semibold ${
                  app.status === 'confirmed' || app.status === 'completed'
                    ? 'text-accent-2'
                    : app.status === 'pending'
                      ? 'text-accent-3'
                      : 'text-accent'
                }`}
              >
                {app.status === 'pending' && 'Chờ chủ nhà xác nhận/sắp xếp'}
                {app.status === 'confirmed' && 'Chủ nhà đã đồng ý lịch hẹn'}
                {app.status === 'rejected' && 'Chủ nhà từ chối lịch hẹn'}
                {app.status === 'cancelled' && 'Khách thuê đã hủy lịch'}
                {app.status === 'completed' && 'Đã thực hiện cuộc gặp'}
              </span>
            </div>
          </div>
        ))}

        {appointments.length === 0 && (
          <div className="col-span-2 bg-surface border border-line rounded-xl p-10 text-center text-subtle font-body">
            Không có lịch xem nhà nào trong danh sách.
          </div>
        )}
      </div>

      {/* Pagination Controls */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-3 border-t border-line/50 pt-4 text-xs font-medium text-muted">
        <span>
          Trang {page} / {Math.max(totalPages, 1)} (Tổng {total} lịch hẹn)
        </span>
        <div className="flex items-center gap-2">
          <button
            onClick={() => setPage(p => Math.max(p - 1, 1))}
            disabled={page <= 1 || loading}
            className="flex items-center gap-1 rounded-md border border-line px-3 py-1.5 hover:bg-surface-muted text-fg disabled:opacity-40 disabled:cursor-not-allowed transition-colors font-medium"
          >
            <ChevronLeft className="w-3.5 h-3.5" />
            <span>Trước</span>
          </button>
          <button
            onClick={() => setPage(p => Math.min(p + 1, totalPages))}
            disabled={page >= totalPages || loading}
            className="flex items-center gap-1 rounded-md border border-line px-3 py-1.5 hover:bg-surface-muted text-fg disabled:opacity-40 disabled:cursor-not-allowed transition-colors font-medium"
          >
            <span>Sau</span>
            <ChevronRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </div>
  )
}
