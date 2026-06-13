'use client'

import * as React from 'react'
import { Button } from '@/shared/ui/button'
import { Badge } from '@/shared/ui/badge'
import { Card } from '@/shared/ui/card'
import { UseProfileReturn } from '../model/use-profile'
import { Wrench, UploadCloud, Clock, Hammer } from 'lucide-react'

import { LandlordReviews } from './landlord-reviews'

interface TabMaintenanceProps {
  profile: UseProfileReturn
}

export function TabMaintenance({
  profile,
}: TabMaintenanceProps): React.ReactElement {
  const {
    role,
    handleNewMaintenanceTicket,
    newTicketTitle,
    setNewTicketTitle,
    newTicketDesc,
    setNewTicketDesc,
    maintenanceTickets,
    handleApproveTicket,
  } = profile

  return (
    <div className="space-y-6 mt-0 outline-none">
      {/* Submit new issue (Only for Tenant) */}
      {role === 'tenant' && (
        <Card className="bg-white border border-border rounded-3xl p-6 md:p-8 shadow-sm space-y-5">
          <h3 className="font-marketing text-base font-bold text-fg flex items-center gap-2 text-left">
            <Wrench className="h-4 w-4 text-primary" />
            Báo cáo sự cố thiết bị trong căn hộ
          </h3>
          <form onSubmit={handleNewMaintenanceTicket} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-left">
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-fg">
                  Tiêu đề lỗi thiết bị
                </label>
                <input
                  type="text"
                  required
                  value={newTicketTitle}
                  onChange={e => setNewTicketTitle(e.target.value)}
                  placeholder="Ví dụ: Hỏng cửa sổ, rò rỉ nước..."
                  className="w-full border border-border rounded-xl px-4 py-2.5 text-xs text-fg bg-surface focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary/20"
                />
              </div>
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-fg">
                  Hình ảnh đính kèm minh họa
                </label>
                <div className="border border-dashed border-border rounded-xl p-2.5 flex items-center justify-center gap-2 bg-surface-muted/10 text-xs text-muted hover:bg-surface-muted/20 hover:border-primary/40 transition-colors cursor-pointer min-h-[42px]">
                  <UploadCloud className="h-4 w-4 text-subtle" />
                  <span>Click chọn hoặc kéo ảnh lỗi thả vào đây</span>
                </div>
              </div>
            </div>
            <div className="space-y-1.5 text-left">
              <label className="text-xs font-bold text-fg">
                Mô tả chi tiết vị trí và tình trạng sự cố
              </label>
              <textarea
                required
                value={newTicketDesc}
                onChange={e => setNewTicketDesc(e.target.value)}
                placeholder="Nhập mô tả chi tiết vị trí lỗi, tình trạng lỗi hiện tại để chủ nhà và kỹ thuật viên nắm rõ phương án sửa chữa..."
                rows={3}
                className="w-full border border-border rounded-xl px-4 py-2.5 text-xs text-fg bg-surface focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary/20 resize-none"
              />
            </div>
            <div className="text-left">
              <Button
                type="submit"
                className="h-10 text-xs px-6 rounded-full font-bold shadow-md hover:bg-primary-hover active:scale-95 transition-all"
              >
                Gửi yêu cầu bảo trì
              </Button>
            </div>
          </form>
        </Card>
      )}

      {/* Tickets list */}
      <Card className="bg-white border border-border rounded-3xl p-6 md:p-8 shadow-sm space-y-6">
        <h3 className="font-marketing text-base font-bold text-fg flex items-center gap-2 text-left">
          <Clock className="h-4 w-4 text-primary" />
          {role === 'tenant'
            ? 'Lịch sử yêu cầu sửa chữa'
            : 'Yêu cầu bảo trì từ khách thuê'}
        </h3>
        <div className="space-y-4">
          {maintenanceTickets.map(t => (
            <div
              key={t.id}
              className="border border-border rounded-2xl p-5 flex flex-col md:flex-row md:items-start justify-between gap-4 bg-surface/40 hover:border-border-strong hover:shadow-sm transition-all text-left"
            >
              <div className="space-y-2">
                <div className="flex items-center gap-2.5">
                  <span className="text-xs font-bold text-fg font-display">
                    {t.title}
                  </span>
                  <span className="inline-flex items-center gap-1 text-[10px] text-muted">
                    <Clock className="h-3 w-3 text-subtle" />
                    {t.createdAt}
                  </span>
                </div>
                <p className="text-xs text-muted font-body leading-relaxed max-w-2xl">
                  {t.description}
                </p>
                {t.cost && (
                  <span className="inline-block px-2.5 py-0.5 rounded bg-primary-soft text-primary text-[10px] font-bold font-mono">
                    Chi phí: {t.cost.toLocaleString('vi-VN')} VND{' '}
                    {role === 'tenant'
                      ? '(Đã trừ vào tiền thuê/smart contract)'
                      : '(Đã duyệt chi từ tài khoản ký quỹ)'}
                  </span>
                )}
              </div>

              <div className="flex items-center gap-3 shrink-0">
                {/* Landlord Action Button */}
                {role === 'landlord' && t.status === 'pending' && (
                  <button
                    type="button"
                    onClick={() => handleApproveTicket(t.id)}
                    className="px-4 py-1.5 bg-primary hover:bg-primary-hover text-white text-[10px] font-bold rounded-full transition-all active:scale-95 shadow-sm flex items-center gap-1 cursor-pointer animate-none border-none"
                  >
                    <Hammer className="h-3 w-3" />
                    Phê duyệt & Gọi thợ
                  </button>
                )}

                <Badge
                  variant="outline"
                  className={`uppercase tracking-wider py-0.5 ${
                    t.status === 'completed'
                      ? 'bg-success-soft text-success border-success/20'
                      : t.status === 'processing'
                        ? 'bg-primary-soft text-primary border-primary/20 animate-pulse-subtle'
                        : 'bg-warning-soft text-warning border-warning/20'
                  }`}
                >
                  <span
                    className={`h-1.5 w-1.5 rounded-full mr-1 ${t.status === 'completed' ? 'bg-success' : t.status === 'processing' ? 'bg-primary' : 'bg-warning'}`}
                  />
                  {t.status === 'completed'
                    ? 'Đã hoàn thành'
                    : t.status === 'processing'
                      ? 'Đang sửa chữa'
                      : 'Chờ duyệt'}
                </Badge>
              </div>
            </div>
          ))}
        </div>
      </Card>

      {/* Tenant reviews card for landlord */}
      {role === 'landlord' && <LandlordReviews />}
    </div>
  )
}
