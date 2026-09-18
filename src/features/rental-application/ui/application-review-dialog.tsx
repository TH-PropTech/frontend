'use client'

import * as React from 'react'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from '@/shared/ui/dialog'
import { Button } from '@/shared/ui/button'
import { Label } from '@/shared/ui/label'
import { Textarea } from '@/shared/ui/textarea'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/shared/ui/select'
import {
  Briefcase,
  Calendar,
  CheckCircle2,
  FileText,
  Loader2,
  PawPrint,
  ShieldAlert,
  Users,
  XCircle,
} from 'lucide-react'
import { ApplicationStatusBadge } from './application-status-badge'
import type { RentalApplicationItem } from '../api/rental-application-api'
import type { RespondApplicationParams } from '../model/use-landlord-applications'

export interface ApplicationReviewDialogProps {
  application: RentalApplicationItem | null
  open: boolean
  onOpenChange: (open: boolean) => void
  onRespond?:
    | ((params: RespondApplicationParams) => Promise<unknown>)
    | undefined
  isResponding?: boolean | undefined
}

const REJECTION_REASONS = [
  {
    value: 'PROPERTY_UNAVAILABLE',
    label: 'Căn hộ không còn trống / Đã cho người khác thuê',
  },
  {
    value: 'PET_POLICY_VIOLATION',
    label: 'Vi phạm quy định cấm nuôi thú cưng của tòa nhà',
  },
  { value: 'OCCUPANCY_EXCEEDED', label: 'Vượt quá số lượng cư trú cho phép' },
  {
    value: 'INSUFFICIENT_CRITERIA',
    label: 'Chưa đáp ứng đầy đủ tiêu chí thẩm định người thuê',
  },
  { value: 'OTHER', label: 'Lý do khác' },
] as const

function formatVnd(amount: number): string {
  return new Intl.NumberFormat('vi-VN').format(amount)
}

function ApplicationReviewForm({
  application,
  onOpenChange,
  onRespond,
  isResponding = false,
}: {
  application: RentalApplicationItem
  onOpenChange: (open: boolean) => void
  onRespond?:
    | ((params: RespondApplicationParams) => Promise<unknown>)
    | undefined
  isResponding?: boolean | undefined
}) {
  const [decisionMode, setDecisionMode] = React.useState<'approve' | 'reject'>(
    'approve'
  )
  const [note, setNote] = React.useState('')
  const [reasonCode, setReasonCode] = React.useState<string>(
    'PROPERTY_UNAVAILABLE'
  )

  const snapshot = application.packageSnapshot
  const duration = snapshot?.durationMonths ?? 12
  const rent = snapshot?.monthlyRent ?? 0
  const deposit = snapshot?.resolvedDepositAmount ?? 0

  const formattedDate = (() => {
    try {
      return new Date(application.moveInDate).toLocaleDateString('vi-VN')
    } catch {
      return application.moveInDate
    }
  })()

  const isPending = application.status === 'pending'

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!onRespond) return

    if (decisionMode === 'approve') {
      await onRespond({
        id: application._id,
        status: 'accepted',
        reasonCode: 'APPROVED',
        note: note.trim() || undefined,
        expectedRevision: application.applicationRevision ?? 1,
      })
    } else {
      await onRespond({
        id: application._id,
        status: 'rejected',
        reasonCode,
        note: note.trim() || undefined,
        expectedRevision: application.applicationRevision ?? 1,
      })
    }
    onOpenChange(false)
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4 p-5">
      {/* Thông tin nhân thân & người thuê */}
      <div className="rounded-xl border border-border bg-surface-muted/50 p-4 space-y-3">
        <h4 className="text-xs font-semibold uppercase tracking-wider text-muted">
          Thông tin người nộp & Cư trú
        </h4>
        <div className="grid grid-cols-2 gap-3 text-xs">
          <div className="space-y-1">
            <span className="text-muted flex items-center gap-1.5">
              <Users className="h-3.5 w-3.5 text-primary" />
              Số người cư trú
            </span>
            <p className="font-semibold text-fg">
              {application.occupants} người
            </p>
          </div>

          <div className="space-y-1">
            <span className="text-muted flex items-center gap-1.5">
              <Calendar className="h-3.5 w-3.5 text-primary" />
              Ngày mong muốn dọn vào
            </span>
            <p className="font-semibold text-fg">{formattedDate}</p>
          </div>

          <div className="space-y-1">
            <span className="text-muted flex items-center gap-1.5">
              <Briefcase className="h-3.5 w-3.5 text-primary" />
              Nghề nghiệp / Đơn vị
            </span>
            <p className="font-semibold text-fg">
              {application.occupation || 'Chưa cung cấp'}
            </p>
          </div>

          <div className="space-y-1">
            <span className="text-muted flex items-center gap-1.5">
              <PawPrint className="h-3.5 w-3.5 text-primary" />
              Nuôi thú cưng
            </span>
            <p className="font-semibold text-fg">
              {application.hasPets ? 'Có nuôi thú cưng' : 'Không có'}
            </p>
          </div>
        </div>

        {application.notes && (
          <div className="border-t border-border/60 pt-2 text-xs">
            <span className="text-muted flex items-center gap-1.5 mb-1">
              <FileText className="h-3.5 w-3.5 text-primary" />
              Ghi chú từ khách thuê
            </span>
            <p className="italic text-fg">&quot;{application.notes}&quot;</p>
          </div>
        )}
      </div>

      {/* Gói thuê đã chọn */}
      <div className="rounded-xl border border-border bg-surface p-4 text-xs space-y-2">
        <h4 className="font-semibold uppercase tracking-wider text-muted">
          Gói thuê đã chọn
        </h4>
        <div className="flex items-center justify-between">
          <span className="text-muted">Thời hạn thuê:</span>
          <strong className="text-fg">{duration} tháng</strong>
        </div>
        {rent > 0 && (
          <div className="flex items-center justify-between">
            <span className="text-muted">Giá thuê thỏa thuận:</span>
            <strong className="text-fg">{formatVnd(rent)} ₫/tháng</strong>
          </div>
        )}
        {deposit > 0 && (
          <div className="flex items-center justify-between">
            <span className="text-muted">Số tiền cọc dự kiến:</span>
            <strong className="text-primary">{formatVnd(deposit)} ₫</strong>
          </div>
        )}
      </div>

      {/* Quyết định của Chủ nhà (chỉ hiển thị form tương tác khi đang pending) */}
      {isPending ? (
        <div className="space-y-3 pt-2">
          <div className="flex rounded-lg bg-surface-muted p-1 border border-border">
            <button
              type="button"
              onClick={() => setDecisionMode('approve')}
              className={`flex-1 py-1.5 text-xs font-semibold rounded-md transition-colors cursor-pointer flex items-center justify-center gap-1.5 ${
                decisionMode === 'approve'
                  ? 'bg-control text-on-control shadow-sm'
                  : 'text-muted hover:text-fg'
              }`}
              data-testid="mode-approve-btn"
            >
              <CheckCircle2 className="h-3.5 w-3.5" />
              <span>Chấp thuận</span>
            </button>
            <button
              type="button"
              onClick={() => setDecisionMode('reject')}
              className={`flex-1 py-1.5 text-xs font-semibold rounded-md transition-colors cursor-pointer flex items-center justify-center gap-1.5 ${
                decisionMode === 'reject'
                  ? 'bg-danger text-on-control shadow-sm'
                  : 'text-muted hover:text-fg'
              }`}
              data-testid="mode-reject-btn"
            >
              <XCircle className="h-3.5 w-3.5" />
              <span>Từ chối</span>
            </button>
          </div>

          {decisionMode === 'approve' ? (
            <div className="space-y-2 rounded-xl border border-success/30 bg-success-soft/30 p-3.5">
              <div className="flex items-start gap-2 text-xs text-fg">
                <CheckCircle2 className="h-4 w-4 text-success shrink-0 mt-0.5" />
                <div>
                  <strong className="block text-success font-semibold">
                    Sẵn sàng chấp thuận hồ sơ
                  </strong>
                  <p className="text-muted mt-0.5">
                    Khi bấm chấp thuận, hệ thống sẽ tự động giữ chỗ căn hộ, sinh
                    thỏa thuận đặt cọc và khởi tạo dự thảo Hợp đồng thuê số để
                    hai bên ký kết.
                  </p>
                </div>
              </div>

              <div className="space-y-1 pt-1">
                <Label htmlFor="approve-note" className="text-xs">
                  Lời nhắn gửi khách thuê (Tùy chọn)
                </Label>
                <Textarea
                  id="approve-note"
                  value={note}
                  onChange={e => setNote(e.target.value)}
                  placeholder="Ví dụ: Hồ sơ đã được duyệt, hẹn gặp bạn ký số và bàn giao căn hộ..."
                  rows={2}
                  className="text-xs resize-none bg-surface"
                  data-testid="approve-note-input"
                />
              </div>
            </div>
          ) : (
            <div className="space-y-3 rounded-xl border border-danger/30 bg-danger-soft/30 p-3.5">
              <div className="flex items-start gap-2 text-xs text-fg">
                <ShieldAlert className="h-4 w-4 text-danger shrink-0 mt-0.5" />
                <div>
                  <strong className="block text-danger font-semibold">
                    Từ chối đề nghị thuê
                  </strong>
                  <p className="text-muted mt-0.5">
                    Vui lòng chọn lý do rõ ràng để hệ thống gửi thông báo phản
                    hồi lịch sự cho khách thuê.
                  </p>
                </div>
              </div>

              <div className="space-y-1.5">
                <Label htmlFor="reject-reason" className="text-xs">
                  Lý do từ chối *
                </Label>
                <Select value={reasonCode} onValueChange={setReasonCode}>
                  <SelectTrigger
                    id="reject-reason"
                    className="text-xs bg-surface"
                    data-testid="reject-reason-select"
                  >
                    <SelectValue placeholder="Chọn lý do từ chối" />
                  </SelectTrigger>
                  <SelectContent>
                    {REJECTION_REASONS.map(r => (
                      <SelectItem
                        key={r.value}
                        value={r.value}
                        className="text-xs"
                      >
                        {r.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-1">
                <Label htmlFor="reject-note" className="text-xs">
                  Ghi chú thêm (Tùy chọn)
                </Label>
                <Textarea
                  id="reject-note"
                  value={note}
                  onChange={e => setNote(e.target.value)}
                  placeholder="Giải thích thêm chi tiết nếu cần..."
                  rows={2}
                  className="text-xs resize-none bg-surface"
                  data-testid="reject-note-input"
                />
              </div>
            </div>
          )}
        </div>
      ) : (
        <div className="rounded-xl border border-border bg-surface-muted p-4 text-xs text-muted">
          Hồ sơ này đã được xử lý (trạng thái:{' '}
          <strong>{application.status}</strong>). Không thể thực hiện lại quyết
          định phê duyệt.
        </div>
      )}

      <DialogFooter className="pt-2">
        <Button
          type="button"
          variant="outline"
          size="sm"
          onClick={() => onOpenChange(false)}
          className="border-border text-xs cursor-pointer"
        >
          Đóng
        </Button>
        {isPending && (
          <Button
            type="submit"
            size="sm"
            disabled={isResponding}
            className={`text-xs cursor-pointer ${
              decisionMode === 'approve'
                ? 'bg-control text-on-control shadow-sm'
                : 'bg-danger text-on-control shadow-sm'
            }`}
            data-testid="submit-decision-btn"
          >
            {isResponding ? (
              <>
                <Loader2 className="h-3.5 w-3.5 animate-spin mr-1.5" />
                <span>Đang xử lý...</span>
              </>
            ) : decisionMode === 'approve' ? (
              <>
                <CheckCircle2 className="h-3.5 w-3.5 mr-1.5" />
                <span>Xác nhận chấp thuận</span>
              </>
            ) : (
              <>
                <XCircle className="h-3.5 w-3.5 mr-1.5" />
                <span>Xác nhận từ chối</span>
              </>
            )}
          </Button>
        )}
      </DialogFooter>
    </form>
  )
}

export function ApplicationReviewDialog({
  application,
  open,
  onOpenChange,
  onRespond,
  isResponding = false,
}: ApplicationReviewDialogProps): React.ReactElement | null {
  if (!application) return null

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent
        className="max-w-lg overflow-hidden p-0 sm:max-w-xl"
        data-testid="application-review-dialog"
      >
        <DialogHeader className="border-b border-border p-5">
          <div className="flex items-center justify-between gap-3">
            <DialogTitle className="font-display text-lg font-bold text-fg">
              Thẩm định hồ sơ #{application._id.slice(-8)}
            </DialogTitle>
            <ApplicationStatusBadge status={application.status} />
          </div>
          <DialogDescription className="text-xs text-muted">
            Xem xét thông tin người thuê và đưa ra quyết định chấp thuận hoặc từ
            chối đề nghị thuê.
          </DialogDescription>
        </DialogHeader>

        <ApplicationReviewForm
          key={application._id}
          application={application}
          onOpenChange={onOpenChange}
          onRespond={onRespond}
          isResponding={isResponding}
        />
      </DialogContent>
    </Dialog>
  )
}
