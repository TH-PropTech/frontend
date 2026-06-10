'use client'

import * as React from 'react'

interface Appointment {
  id: string
  propertyTitle: string
  tenantName: string
  tenantPhone: string
  landlordName: string
  landlordPhone: string
  dateTime: string
  type: 'vr_guide' | 'in_person'
  status: 'pending' | 'confirmed' | 'cancelled'
}

const mockAppointments: Appointment[] = [
  {
    id: 'APP-501',
    propertyTitle: 'Căn hộ Studio Vinhomes Grand Park',
    tenantName: 'Lê Văn Tám',
    tenantPhone: '0901 222 333',
    landlordName: 'Nguyễn Văn Hoàng',
    landlordPhone: '0912 345 678',
    dateTime: '11/06/2026 09:30 AM',
    type: 'vr_guide',
    status: 'pending',
  },
  {
    id: 'APP-502',
    propertyTitle: 'Căn hộ 2PN Landmark 81 Luxury',
    tenantName: 'Đặng Minh Châu',
    tenantPhone: '0933 444 555',
    landlordName: 'Lê Đình Quốc Khánh',
    landlordPhone: '0988 777 666',
    dateTime: '12/06/2026 14:00 PM',
    type: 'in_person',
    status: 'pending',
  },
  {
    id: 'APP-503',
    propertyTitle: 'Căn hộ Horizon Sunshine 1PN',
    tenantName: 'Ngô Quốc Bảo',
    tenantPhone: '0977 888 999',
    landlordName: 'Trần Minh Quân',
    landlordPhone: '0909 123 456',
    dateTime: '10/06/2026 10:00 AM',
    type: 'vr_guide',
    status: 'confirmed',
  },
]

export function SchedulesView(): React.ReactElement {
  const [appointments, setAppointments] = React.useState<Appointment[]>(mockAppointments)
  const [selectedApp, setSelectedApp] = React.useState<Appointment | null>(null)
  const [filter, setFilter] = React.useState<'all' | 'pending' | 'confirmed' | 'cancelled'>('pending')
  const [rescheduleDate, setRescheduleDate] = React.useState('')
  const [showRescheduleDialog, setShowRescheduleDialog] = React.useState(false)

  const filteredAppointments = appointments.filter(
    (a) => filter === 'all' || a.status === filter
  )

  const handleConfirm = (id: string): void => {
    setAppointments(prev => prev.map(a => a.id === id ? { ...a, status: 'confirmed' } : a))
  }

  const handleCancel = (id: string): void => {
    setAppointments(prev => prev.map(a => a.id === id ? { ...a, status: 'cancelled' } : a))
  }

  const handleReschedule = (id: string): void => {
    if (!rescheduleDate) return
    setAppointments(prev => prev.map(a => a.id === id ? { ...a, dateTime: rescheduleDate, status: 'confirmed' } : a))
    setShowRescheduleDialog(false)
    setSelectedApp(null)
    setRescheduleDate('')
  }

  return (
    <div className="space-y-6">
      {/* Title & Filter Headers */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-bold text-fg font-marketing">Quản lý lịch hẹn xem nhà</h2>
          <p className="text-xs text-muted mt-1">Hỗ trợ kết nối, duyệt và điều phối lịch xem phòng ảo qua VR 360° hoặc gặp mặt trực tiếp.</p>
        </div>
        <div className="flex rounded-lg border border-line p-1 bg-surface-muted/30 text-xs gap-1 font-semibold self-start">
          <button
            onClick={() => setFilter('all')}
            className={`px-3 py-1.5 rounded-md transition-all ${filter === 'all' ? 'bg-primary text-on-control shadow-sm' : 'text-muted hover:text-fg'}`}
          >
            Tất cả
          </button>
          <button
            onClick={() => setFilter('pending')}
            className={`px-3 py-1.5 rounded-md transition-all ${filter === 'pending' ? 'bg-primary text-on-control shadow-sm' : 'text-muted hover:text-fg'}`}
          >
            Chờ duyệt ({appointments.filter(a => a.status === 'pending').length})
          </button>
          <button
            onClick={() => setFilter('confirmed')}
            className={`px-3 py-1.5 rounded-md transition-all ${filter === 'confirmed' ? 'bg-primary text-on-control shadow-sm' : 'text-muted hover:text-fg'}`}
          >
            Đã xác nhận
          </button>
          <button
            onClick={() => setFilter('cancelled')}
            className={`px-3 py-1.5 rounded-md transition-all ${filter === 'cancelled' ? 'bg-primary text-on-control shadow-sm' : 'text-muted hover:text-fg'}`}
          >
            Đã hủy
          </button>
        </div>
      </div>

      {/* Appointment Cards */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {filteredAppointments.map((app) => (
          <div key={app.id} className="bg-surface border border-line rounded-xl p-5 shadow-sm space-y-4 flex flex-col justify-between hover:translate-y-[-2px] hover:shadow-md transition-all duration-300">
            <div>
              <div className="flex justify-between items-center">
                <span className="text-[10px] font-bold text-muted bg-fg/5 px-2.5 py-0.5 rounded font-display uppercase">{app.id}</span>
                <div className="flex gap-2 items-center">
                  <span className={`text-[9px] font-bold px-2 py-0.5 rounded-full ${
                    app.type === 'vr_guide' 
                      ? 'bg-accent-2/10 text-accent-2' 
                      : 'bg-accent-3/10 text-accent-3'
                  }`}>
                    {app.type === 'vr_guide' ? 'VR 360 Tour' : 'Xem trực tiếp'}
                  </span>
                  <span className={`text-[9px] font-bold px-2 py-0.5 rounded-full ${
                    app.status === 'confirmed' 
                      ? 'bg-accent-2/10 text-accent-2' 
                      : app.status === 'cancelled' 
                      ? 'bg-accent/10 text-accent' 
                      : 'bg-accent-3/10 text-accent-3'
                  }`}>
                    {app.status === 'confirmed' ? 'Đã duyệt' : app.status === 'cancelled' ? 'Đã hủy' : 'Đang chờ'}
                  </span>
                </div>
              </div>
              <h3 className="mt-3.5 text-sm font-bold text-fg font-marketing line-clamp-1">{app.propertyTitle}</h3>
              <p className="text-xs text-primary font-semibold font-body mt-1.5 flex items-center gap-1">
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10" /><polyline points="12 6 12 12 16 14" /></svg>
                Thời gian: {app.dateTime}
              </p>

              {/* Parties info */}
              <div className="mt-4 grid grid-cols-2 gap-4 border-t border-line/50 pt-3 text-xs">
                <div>
                  <span className="text-subtle block font-body">Khách thuê</span>
                  <span className="font-bold text-fg">{app.tenantName}</span>
                  <span className="text-subtle block mt-0.5">{app.tenantPhone}</span>
                </div>
                <div>
                  <span className="text-subtle block font-body">Chủ nhà</span>
                  <span className="font-bold text-fg">{app.landlordName}</span>
                  <span className="text-subtle block mt-0.5">{app.landlordPhone}</span>
                </div>
              </div>
            </div>

            {/* Actions footer */}
            {app.status === 'pending' && (
              <div className="border-t border-line/30 pt-3 flex justify-end gap-2 text-xs">
                <button
                  onClick={() => handleCancel(app.id)}
                  className="px-3.5 py-2 border border-accent hover:bg-accent/5 text-accent font-semibold rounded-lg transition-colors"
                >
                  Từ chối lịch
                </button>
                <button
                  onClick={() => {
                    setSelectedApp(app)
                    setShowRescheduleDialog(true)
                  }}
                  className="px-3.5 py-2 border border-line text-muted hover:text-fg font-semibold rounded-lg transition-colors"
                >
                  Đổi giờ hẹn
                </button>
                <button
                  onClick={() => handleConfirm(app.id)}
                  className="px-3.5 py-2 bg-accent-2 hover:bg-accent-2/95 text-white font-semibold rounded-lg shadow-sm transition-colors"
                >
                  Xác nhận lịch
                </button>
              </div>
            )}
          </div>
        ))}
        {filteredAppointments.length === 0 && (
          <div className="col-span-2 bg-surface border border-line rounded-xl p-10 text-center text-subtle font-body">
            Không có lịch xem nhà nào trong danh sách.
          </div>
        )}
      </div>

      {/* Reschedule modal */}
      {showRescheduleDialog && selectedApp && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-fg/40 backdrop-blur-sm" onClick={() => setShowRescheduleDialog(false)} />
          <div className="relative z-10 w-full max-w-md bg-surface border border-line rounded-xl shadow-lg overflow-hidden animate-in fade-in zoom-in-95 duration-200">
            <div className="p-5">
              <h3 className="text-base font-bold text-fg font-marketing">Đổi giờ hẹn xem nhà</h3>
              <p className="text-xs text-muted mt-1">Vui lòng thỏa thuận giờ hẹn mới với cả khách và chủ nhà trước khi lưu thay đổi.</p>
              
              <div className="mt-4">
                <label className="block text-[10px] font-bold text-muted uppercase tracking-wider font-body">Thời gian mới</label>
                <input
                  type="text"
                  value={rescheduleDate}
                  onChange={(e) => setRescheduleDate(e.target.value)}
                  placeholder="Ví dụ: 13/06/2026 15:30 PM"
                  className="w-full mt-1.5 p-2.5 bg-bg/30 border border-line rounded-lg text-xs font-semibold text-fg focus:outline-none focus:border-accent"
                  required
                />
              </div>

              <div className="flex justify-end gap-2 mt-5">
                <button
                  onClick={() => {
                    setShowRescheduleDialog(false)
                    setRescheduleDate('')
                  }}
                  className="px-4 py-2 border border-line text-muted hover:text-fg text-xs font-semibold rounded-lg transition-colors"
                >
                  Hủy
                </button>
                <button
                  onClick={() => handleReschedule(selectedApp.id)}
                  disabled={!rescheduleDate.trim()}
                  className="px-4 py-2 bg-primary hover:bg-primary/95 text-on-control text-xs font-semibold rounded-lg shadow-sm disabled:opacity-50 transition-colors"
                >
                  Lưu thay đổi
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
