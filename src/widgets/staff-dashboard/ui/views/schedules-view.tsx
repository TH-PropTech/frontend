'use client'

import * as React from 'react'
import { apiClient } from '@/shared/api/api-client'

interface Appointment {
  id: string
  propertyTitle: string
  tenantName: string
  tenantPhone: string
  landlordName: string
  landlordPhone: string
  dateTime: string
  type: 'vr_guide' | 'in_person'
  status: 'pending' | 'confirmed' | 'cancelled' | 'rejected' | 'completed'
}

interface BackendBookingResponse {
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

interface BackendBookingListResult {
  items: BackendBookingResponse[]
  total: number
  page: number
  limit: number
  totalPages: number
}

export function SchedulesView(): React.ReactElement {
  const [appointments, setAppointments] = React.useState<Appointment[]>([])
  const [loading, setLoading] = React.useState(true)
  const [filter, setFilter] = React.useState<
    'all' | 'pending' | 'confirmed' | 'cancelled' | 'rejected' | 'completed'
  >('pending')

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
      }
    },
    []
  )

  const loadAppointments = React.useCallback(async () => {
    setLoading(true)
    try {
      const data = await apiClient.get<BackendBookingListResult>(
        '/bookings?limit=100'
      )
      if (data && data.items) {
        setAppointments(data.items.map(mapAppointment))
      }
    } catch (err) {
      console.error('Failed to load bookings:', err)
    } finally {
      setLoading(false)
    }
  }, [mapAppointment])

  React.useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    loadAppointments()
  }, [loadAppointments])

  const filteredAppointments = appointments.filter(
    a => filter === 'all' || a.status === filter
  )

  if (loading) {
    return (
      <div className="flex h-64 items-center justify-center">
        <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent" />
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
        <div className="flex flex-wrap rounded-lg border border-line p-1 bg-surface-muted/30 text-xs gap-1 font-semibold self-start">
          <button
            onClick={() => setFilter('all')}
            className={`px-2.5 py-1.5 rounded-md transition-all ${filter === 'all' ? 'bg-primary text-on-control shadow-sm' : 'text-muted hover:text-fg'}`}
          >
            Tất cả
          </button>
          <button
            onClick={() => setFilter('pending')}
            className={`px-2.5 py-1.5 rounded-md transition-all ${filter === 'pending' ? 'bg-primary text-on-control shadow-sm' : 'text-muted hover:text-fg'}`}
          >
            Chờ duyệt ({appointments.filter(a => a.status === 'pending').length}
            )
          </button>
          <button
            onClick={() => setFilter('confirmed')}
            className={`px-2.5 py-1.5 rounded-md transition-all ${filter === 'confirmed' ? 'bg-primary text-on-control shadow-sm' : 'text-muted hover:text-fg'}`}
          >
            Đã xác nhận (
            {appointments.filter(a => a.status === 'confirmed').length})
          </button>
          <button
            onClick={() => setFilter('rejected')}
            className={`px-2.5 py-1.5 rounded-md transition-all ${filter === 'rejected' ? 'bg-primary text-on-control shadow-sm' : 'text-muted hover:text-fg'}`}
          >
            Bị từ chối
          </button>
          <button
            onClick={() => setFilter('cancelled')}
            className={`px-2.5 py-1.5 rounded-md transition-all ${filter === 'cancelled' ? 'bg-primary text-on-control shadow-sm' : 'text-muted hover:text-fg'}`}
          >
            Đã hủy
          </button>
          <button
            onClick={() => setFilter('completed')}
            className={`px-2.5 py-1.5 rounded-md transition-all ${filter === 'completed' ? 'bg-primary text-on-control shadow-sm' : 'text-muted hover:text-fg'}`}
          >
            Hoàn thành
          </button>
        </div>
      </div>

      {/* Appointment Cards */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {filteredAppointments.map(app => (
          <div
            key={app.id}
            className="bg-surface border border-line rounded-xl p-5 shadow-sm space-y-4 flex flex-col justify-between hover:translate-y-[-2px] hover:shadow-md transition-all duration-300"
          >
            <div>
              <div className="flex justify-between items-center">
                <span className="text-[10px] font-bold text-muted bg-fg/5 px-2.5 py-0.5 rounded font-display uppercase">
                  {app.id}
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
              <p className="text-xs text-primary font-semibold font-body mt-1.5 flex items-center gap-1">
                <svg
                  width="12"
                  height="12"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <circle cx="12" cy="12" r="10" />
                  <polyline points="12 6 12 12 16 14" />
                </svg>
                Thời gian: {app.dateTime}
              </p>

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
        {filteredAppointments.length === 0 && (
          <div className="col-span-2 bg-surface border border-line rounded-xl p-10 text-center text-subtle font-body">
            Không có lịch xem nhà nào trong danh sách.
          </div>
        )}
      </div>
    </div>
  )
}
