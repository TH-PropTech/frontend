'use client'

import * as React from 'react'
import Link from 'next/link'
import type { Route } from 'next'
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
  Coins,
  FileSignature,
  FileText,
  Home,
  Info,
  Landmark,
  Loader2,
  PawPrint,
  Scale,
  Shield,
  ShieldAlert,
  ShieldCheck,
  Sparkles,
  UserCheck,
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

const QUICK_APPROVAL_TEMPLATES = [
  'Hồ sơ đạt tiêu chuẩn, tôi đồng ý cho thuê!',
  'Đã duyệt hồ sơ, mời bạn ký hợp đồng số.',
  'Đồng ý đề nghị thuê, hẹn gặp bạn nhận bàn giao căn hộ.',
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

  const executionPolicy = application.executionPolicySnapshot
  const executionStrategy =
    executionPolicy?.strategy ??
    snapshot?.defaultExecutionPolicy?.strategy ??
    'DEPOSIT_FIRST'

  const formattedDate = (() => {
    try {
      return new Date(application.moveInDate).toLocaleDateString('vi-VN')
    } catch {
      return application.moveInDate
    }
  })()

  const isPending = application.status === 'pending'
  const isAccepted = application.status === 'accepted'

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
    <form
      onSubmit={handleSubmit}
      className="flex flex-col flex-1 overflow-hidden"
    >
      <div className="flex-1 overflow-y-auto p-6 space-y-6 no-scrollbar">
        <div className="grid gap-6 md:grid-cols-12">
          {/* CỘT TRÁI (7 cols): Hồ sơ ứng viên & Cam kết pháp lý */}
          <div className="space-y-6 md:col-span-7">
            {/* Thẻ 1: Thông tin ứng viên & Nhân khẩu */}
            <div className="rounded-2xl border border-border bg-surface p-5 shadow-sm space-y-4">
              <div className="flex items-center justify-between border-b border-border/60 pb-3">
                <h3 className="text-xs font-bold uppercase tracking-wider text-primary flex items-center gap-2">
                  <UserCheck className="h-4 w-4" />
                  Hồ sơ ứng viên & Cư trú
                </h3>
                <span className="font-mono text-[11px] text-muted">
                  ID: #{application.tenantId.slice(-8).toUpperCase()}
                </span>
              </div>

              {/* Huy hiệu xác thực định danh */}
              <div className="flex flex-wrap items-center gap-2 rounded-xl bg-surface-muted/50 p-3 border border-border/50">
                <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary font-bold text-xs">
                  KT
                </div>
                <div className="flex-1 min-w-[200px]">
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-bold text-fg">
                      Khách thuê nộp hồ sơ
                    </span>
                    <span className="inline-flex items-center gap-1 rounded-md bg-success-soft px-2 py-0.5 text-[10px] font-semibold text-success border border-success/30">
                      <ShieldCheck className="h-3 w-3" />
                      eKYC CCCD Gắn chip
                    </span>
                  </div>
                  <p className="text-[11px] text-muted mt-0.5 flex items-center gap-1">
                    <Sparkles className="h-3 w-3 text-accent" />
                    Chỉ số tín nhiệm cư dân:{' '}
                    <strong className="text-fg font-semibold">
                      98/100 (Uy tín cao)
                    </strong>
                  </p>
                </div>
              </div>

              {/* Lưới 4 thông số cư trú */}
              <div className="grid grid-cols-2 gap-3.5 text-xs">
                <div className="rounded-xl bg-surface-muted/30 p-3 border border-border/40 space-y-1">
                  <span className="text-muted flex items-center gap-1.5 font-medium">
                    <Users className="h-3.5 w-3.5 text-primary" />
                    Số người cư trú
                  </span>
                  <p className="font-bold text-fg text-sm">
                    {application.occupants} người
                  </p>
                </div>

                <div className="rounded-xl bg-surface-muted/30 p-3 border border-border/40 space-y-1">
                  <span className="text-muted flex items-center gap-1.5 font-medium">
                    <Calendar className="h-3.5 w-3.5 text-primary" />
                    Ngày dọn vào dự kiến
                  </span>
                  <p className="font-bold text-fg text-sm">{formattedDate}</p>
                </div>

                <div className="rounded-xl bg-surface-muted/30 p-3 border border-border/40 space-y-1">
                  <span className="text-muted flex items-center gap-1.5 font-medium">
                    <Briefcase className="h-3.5 w-3.5 text-primary" />
                    Nghề nghiệp / Đơn vị
                  </span>
                  <p className="font-bold text-fg text-sm truncate">
                    {application.occupation || 'Chưa cung cấp'}
                  </p>
                </div>

                <div className="rounded-xl bg-surface-muted/30 p-3 border border-border/40 space-y-1">
                  <span className="text-muted flex items-center gap-1.5 font-medium">
                    <PawPrint className="h-3.5 w-3.5 text-primary" />
                    Nuôi thú cưng
                  </span>
                  <div className="flex items-center gap-1.5">
                    <p className="font-bold text-fg text-sm">
                      {application.hasPets ? 'Có nuôi thú cưng' : 'Không có'}
                    </p>
                    {application.hasPets && (
                      <span className="rounded bg-warning-soft px-1.5 py-0.5 text-[9px] font-semibold text-warning">
                        Cần tuân thủ nội quy
                      </span>
                    )}
                  </div>
                </div>
              </div>

              {/* Ghi chú & nguyện vọng */}
              {application.notes && (
                <div className="rounded-xl border border-border/60 bg-surface-muted/20 p-3.5 space-y-1.5">
                  <span className="text-xs font-semibold text-fg flex items-center gap-1.5">
                    <FileText className="h-3.5 w-3.5 text-primary" />
                    Ghi chú & nguyện vọng từ khách thuê
                  </span>
                  <p className="italic text-xs text-muted leading-relaxed pl-5 border-l-2 border-primary/40">
                    &quot;{application.notes}&quot;
                  </p>
                </div>
              )}
            </div>

            {/* Thẻ 2: Căn hộ & Điều khoản cam kết */}
            <div className="rounded-2xl border border-border bg-surface p-5 shadow-sm space-y-3.5">
              <h3 className="text-xs font-bold uppercase tracking-wider text-primary flex items-center gap-2">
                <Scale className="h-4 w-4" />
                Quy chuẩn cư trú & Cam kết pháp lý
              </h3>
              <p className="text-xs text-muted leading-relaxed">
                Người thuê đã xác nhận đồng thuận với các quy chế bắt buộc trước
                khi gửi hồ sơ:
              </p>

              <div className="space-y-2 text-xs">
                <div className="flex items-start gap-2.5 rounded-lg bg-surface-muted/30 p-2.5 border border-border/40">
                  <ShieldCheck className="h-4 w-4 text-success shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-fg font-semibold block">
                      An toàn PCCC & Lối thoát hiểm
                    </strong>
                    <span className="text-muted text-[11px]">
                      Không tích trữ chất dễ cháy nổ, bảo đảm thông thoáng ban
                      công theo Luật Nhà ở 2023.
                    </span>
                  </div>
                </div>

                <div className="flex items-start gap-2.5 rounded-lg bg-surface-muted/30 p-2.5 border border-border/40">
                  <ShieldCheck className="h-4 w-4 text-success shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-fg font-semibold block">
                      Khai báo lưu trú & Trật tự chung cư
                    </strong>
                    <span className="text-muted text-[11px]">
                      Cung cấp thông tin nhân khẩu để chủ hộ khai báo lưu trú
                      qua Cổng Dịch vụ công Quốc gia.
                    </span>
                  </div>
                </div>

                <div className="flex items-start gap-2.5 rounded-lg bg-surface-muted/30 p-2.5 border border-border/40">
                  <ShieldCheck className="h-4 w-4 text-success shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-fg font-semibold block">
                      Ký số Hợp đồng điện tử SmartCA
                    </strong>
                    <span className="text-muted text-[11px]">
                      Đồng ý sử dụng chữ ký số bảo đảm giá trị pháp lý theo Nghị
                      định 96/2024/NĐ-CP.
                    </span>
                  </div>
                </div>
              </div>

              <div className="rounded-xl border border-primary/20 bg-primary-soft/10 p-3 flex items-center justify-between text-xs">
                <div className="flex items-center gap-2">
                  <Home className="h-4 w-4 text-primary shrink-0" />
                  <span className="text-muted">Căn hộ đăng ký thuê:</span>
                  <strong className="font-mono text-fg">
                    #{application.apartmentId.slice(-8).toUpperCase()}
                  </strong>
                </div>
                <Link
                  href={`/properties/${application.apartmentId}` as Route}
                  target="_blank"
                  className="text-primary hover:underline font-semibold text-[11px]"
                >
                  Xem chi tiết căn hộ →
                </Link>
              </div>
            </div>
          </div>

          {/* CỘT PHẢI (5 cols): Gói thuê & Bảng điều khiển quyết định */}
          <div className="space-y-6 md:col-span-5">
            {/* Card Tài chính & Gói thuê */}
            <div className="rounded-2xl border border-border bg-surface shadow-sm overflow-hidden">
              <div className="bg-primary/5 border-b border-primary/10 p-4">
                <h3 className="text-xs font-bold uppercase tracking-wider text-primary flex items-center gap-2">
                  <Coins className="h-4 w-4" />
                  Tài chính & Gói thuê đã chọn
                </h3>
              </div>
              <div className="p-4 space-y-3 text-xs">
                <div className="flex items-center justify-between pb-2 border-b border-border/50">
                  <span className="text-muted">Thời hạn cam kết:</span>
                  <strong className="text-fg text-sm">{duration} tháng</strong>
                </div>

                {rent > 0 && (
                  <div className="flex items-center justify-between pb-2 border-b border-border/50">
                    <span className="text-muted">Giá thuê thỏa thuận:</span>
                    <strong className="text-fg font-display text-base text-primary">
                      {formatVnd(rent)} ₫/tháng
                    </strong>
                  </div>
                )}

                {deposit > 0 && (
                  <div className="flex items-center justify-between pb-2 border-b border-border/50">
                    <span className="text-muted">Số tiền cọc dự kiến:</span>
                    <strong className="text-fg text-sm">
                      {formatVnd(deposit)} ₫
                    </strong>
                  </div>
                )}

                {rent > 0 && duration > 0 && (
                  <div className="rounded-xl bg-surface-muted p-2.5 flex justify-between items-center">
                    <span className="text-[11px] text-muted">
                      Tổng ước tính ({duration}T):
                    </span>
                    <strong className="text-xs text-primary">
                      {formatVnd(rent * duration)} ₫
                    </strong>
                  </div>
                )}

                <div className="pt-1 flex items-start gap-2 text-[11px] text-muted">
                  <Landmark className="h-3.5 w-3.5 text-primary shrink-0 mt-0.5" />
                  <span>
                    Trình tự:{' '}
                    <strong className="text-fg">
                      {executionStrategy === 'DEPOSIT_FIRST'
                        ? 'Cọc trước, sau đó ký hợp đồng'
                        : 'Ký hợp đồng trước, sau đó đóng cọc'}
                    </strong>
                  </span>
                </div>
              </div>
            </div>

            {/* Bảng điều khiển Quyết định thẩm định */}
            <div className="rounded-2xl border border-border bg-surface p-5 shadow-sm space-y-4">
              <h3 className="text-xs font-bold uppercase tracking-wider text-primary flex items-center gap-2">
                <FileSignature className="h-4 w-4" />
                Quyết định của Chủ nhà
              </h3>

              {isPending ? (
                <div className="space-y-4">
                  {/* Switcher Phê duyệt / Từ chối */}
                  <div className="flex rounded-xl bg-surface-muted p-1 border border-border">
                    <button
                      type="button"
                      onClick={() => setDecisionMode('approve')}
                      className={`flex-1 py-2 text-xs font-bold rounded-lg transition-all cursor-pointer flex items-center justify-center gap-1.5 ${
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
                      className={`flex-1 py-2 text-xs font-bold rounded-lg transition-all cursor-pointer flex items-center justify-center gap-1.5 ${
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
                    <div className="space-y-3 rounded-xl border border-success/30 bg-success-soft/30 p-3.5">
                      <div className="flex items-start gap-2.5 text-xs text-fg">
                        <CheckCircle2 className="h-4 w-4 text-success shrink-0 mt-0.5" />
                        <div>
                          <strong className="block text-success font-semibold text-xs">
                            Sẵn sàng chấp thuận hồ sơ
                          </strong>
                          <p className="text-muted mt-0.5 text-[11px] leading-relaxed">
                            Khi bấm chấp thuận, hệ thống sẽ tự động giữ chỗ căn
                            hộ, sinh thỏa thuận đặt cọc và khởi tạo dự thảo Hợp
                            đồng thuê số để hai bên ký kết.
                          </p>
                        </div>
                      </div>

                      {/* Mẫu lời nhắn nhanh */}
                      <div className="space-y-1.5 pt-1">
                        <span className="text-[11px] font-medium text-muted block">
                          Gợi ý phản hồi nhanh:
                        </span>
                        <div className="flex flex-wrap gap-1.5">
                          {QUICK_APPROVAL_TEMPLATES.map(tpl => (
                            <button
                              key={tpl}
                              type="button"
                              onClick={() => setNote(tpl)}
                              className="text-[10px] rounded-lg bg-surface border border-border px-2 py-1 text-fg hover:border-primary transition cursor-pointer text-left"
                            >
                              + {tpl}
                            </button>
                          ))}
                        </div>
                      </div>

                      <div className="space-y-1.5 pt-1">
                        <Label
                          htmlFor="approve-note"
                          className="text-xs font-medium"
                        >
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
                      <div className="flex items-start gap-2.5 text-xs text-fg">
                        <ShieldAlert className="h-4 w-4 text-danger shrink-0 mt-0.5" />
                        <div>
                          <strong className="block text-danger font-semibold text-xs">
                            Từ chối đề nghị thuê
                          </strong>
                          <p className="text-muted mt-0.5 text-[11px] leading-relaxed">
                            Vui lòng chọn lý do rõ ràng để hệ thống gửi thông
                            báo phản hồi lịch sự cho khách thuê.
                          </p>
                        </div>
                      </div>

                      <div className="space-y-1.5">
                        <Label
                          htmlFor="reject-reason"
                          className="text-xs font-medium"
                        >
                          Lý do từ chối *
                        </Label>
                        <Select
                          value={reasonCode}
                          onValueChange={setReasonCode}
                        >
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
                        <Label
                          htmlFor="reject-note"
                          className="text-xs font-medium"
                        >
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
                <div className="rounded-xl border border-border bg-surface-muted/50 p-4 text-xs space-y-3">
                  <div className="flex items-center gap-2 text-fg font-semibold">
                    <Info className="h-4 w-4 text-primary" />
                    <span>Hồ sơ này đã được xử lý</span>
                  </div>
                  <p className="text-muted leading-relaxed">
                    Trạng thái hiện tại:{' '}
                    <strong className="text-fg">{application.status}</strong>.
                    Không thể thực hiện lại quyết định phê duyệt.
                  </p>
                  {isAccepted && application.contractId && (
                    <Button
                      asChild
                      size="sm"
                      className="w-full mt-2 bg-primary text-on-control shadow-sm text-xs"
                    >
                      <Link
                        href={`/contracts/${application.contractId}` as Route}
                      >
                        <FileSignature className="h-3.5 w-3.5 mr-1.5" />
                        <span>Mở bản Hợp đồng số</span>
                      </Link>
                    </Button>
                  )}
                </div>
              )}
            </div>

            {/* Quy chuẩn an toàn */}
            <div className="rounded-xl border border-success/30 bg-success-soft/15 p-3.5 text-xs text-muted flex items-start gap-2.5">
              <Shield className="h-4 w-4 text-success shrink-0 mt-0.5" />
              <p className="leading-relaxed text-[11px]">
                Toàn bộ dữ liệu thẩm định được bảo chứng tính toàn vẹn và tuân
                thủ quy chuẩn bảo vệ dữ liệu cá nhân theo{' '}
                <strong>Nghị định 13/2023/NĐ-CP</strong>.
              </p>
            </div>
          </div>
        </div>
      </div>

      <DialogFooter className="p-4 px-6 border-t border-border bg-surface shrink-0 flex items-center justify-between sm:justify-between">
        <span className="text-[11px] text-muted hidden sm:inline-block">
          Hệ thống Thẩm định Cho thuê TH-PropTech v2.0
        </span>
        <div className="flex items-center gap-2 w-full sm:w-auto justify-end">
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
              className={`text-xs cursor-pointer font-semibold px-4 shadow-sm ${
                decisionMode === 'approve'
                  ? 'bg-control text-on-control hover:opacity-90'
                  : 'bg-danger text-on-control hover:opacity-90'
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
        </div>
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
        className="max-w-5xl bg-surface p-0 sm:rounded-2xl border border-border overflow-hidden flex flex-col max-h-[90vh]"
        data-testid="application-review-dialog"
      >
        <DialogHeader className="border-b border-border p-6 bg-surface-muted/30 shrink-0">
          <div className="flex items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10 text-primary border border-primary/20 shrink-0">
                <UserCheck className="h-5 w-5" />
              </div>
              <div>
                <div className="flex items-center gap-2.5">
                  <DialogTitle className="font-display text-xl font-bold text-fg">
                    Thẩm định hồ sơ #{application._id.slice(-8).toUpperCase()}
                  </DialogTitle>
                  <ApplicationStatusBadge status={application.status} />
                </div>
                <DialogDescription className="text-xs text-muted mt-0.5">
                  Xem xét thông tin người thuê, năng lực tài chính và đưa ra
                  quyết định chấp thuận hoặc từ chối đề nghị thuê.
                </DialogDescription>
              </div>
            </div>
          </div>
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
