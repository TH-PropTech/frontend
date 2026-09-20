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
  Flame,
  Gavel,
  Home,
  Info,
  Landmark,
  Loader2,
  PawPrint,
  Scale,
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

const STEP_TABS = [
  { id: 'all', label: 'Tất cả các bước', badge: 'Toàn bộ' },
  { id: 'step1', label: 'Bước 1: Người thuê & Cư trú', badge: '1' },
  { id: 'step2', label: 'Bước 2: Gói thuê & Tài chính', badge: '2' },
  { id: 'step3', label: 'Bước 3: Điều khoản & Cam kết', badge: '3' },
  { id: 'step4', label: 'Bước 4: Quyết định thẩm định', badge: '4' },
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
  const [activeStepTab, setActiveStepTab] = React.useState<
    'all' | 'step1' | 'step2' | 'step3' | 'step4'
  >('all')
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

  const showStep1 = activeStepTab === 'all' || activeStepTab === 'step1'
  const showStep2 = activeStepTab === 'all' || activeStepTab === 'step2'
  const showStep3 = activeStepTab === 'all' || activeStepTab === 'step3'
  const showStep4 = activeStepTab === 'all' || activeStepTab === 'step4'

  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col flex-1 overflow-hidden"
    >
      {/* Stepper Tabs Bar */}
      <div className="border-b border-border bg-surface-muted/40 px-6 py-2.5 shrink-0">
        <div className="flex items-center gap-2 overflow-x-auto no-scrollbar">
          {STEP_TABS.map(tab => {
            const isActive = activeStepTab === tab.id
            return (
              <button
                key={tab.id}
                type="button"
                onClick={() => setActiveStepTab(tab.id as typeof activeStepTab)}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer flex items-center gap-1.5 shrink-0 ${
                  isActive
                    ? 'bg-surface text-primary shadow-sm border border-border'
                    : 'text-muted hover:text-fg hover:bg-surface/50'
                }`}
              >
                <span
                  className={`flex h-4 w-4 items-center justify-center rounded-full text-[10px] font-bold ${
                    isActive
                      ? 'bg-primary text-white'
                      : 'bg-surface-muted text-muted'
                  }`}
                >
                  {tab.badge}
                </span>
                <span>{tab.label}</span>
              </button>
            )
          })}
        </div>
      </div>

      <div className="flex-1 overflow-y-auto p-6 space-y-6 no-scrollbar">
        {/* =========================================================================
            BƯỚC 1: THÔNG TIN NGƯỜI THUÊ & CƯ TRÚ
           ========================================================================= */}
        {showStep1 && (
          <section className="rounded-2xl border border-border bg-surface shadow-sm overflow-hidden">
            <div className="bg-surface-muted/50 border-b border-border/80 px-5 py-3 flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <span className="flex h-6 w-6 items-center justify-center rounded-lg bg-primary text-white font-bold text-xs">
                  1
                </span>
                <div>
                  <h3 className="text-xs font-bold uppercase tracking-wider text-fg">
                    Bước 1: Thông tin người thuê & Mục đích cư trú
                  </h3>
                  <p className="text-[11px] text-muted">
                    Dữ liệu nhân thân và điều kiện lưu trú do khách thuê tự kê
                    khai
                  </p>
                </div>
              </div>
              <span className="inline-flex items-center gap-1 rounded-md bg-success-soft px-2.5 py-1 text-[11px] font-semibold text-success border border-success/30">
                <ShieldCheck className="h-3.5 w-3.5" />
                Đã xác thực eKYC
              </span>
            </div>

            <div className="p-5 space-y-4">
              {/* Thẻ định danh ứng viên */}
              <div className="flex flex-wrap items-center justify-between gap-3 rounded-xl bg-surface-muted/40 p-3.5 border border-border/50">
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary font-bold text-sm">
                    KT
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-bold text-fg">
                        Ứng viên thuê căn hộ
                      </span>
                      <span className="font-mono text-xs text-muted">
                        (#{application.tenantId.slice(-8).toUpperCase()})
                      </span>
                    </div>
                    <p className="text-xs text-muted flex items-center gap-1.5 mt-0.5">
                      <Sparkles className="h-3.5 w-3.5 text-accent" />
                      Chỉ số tín nhiệm cư dân:{' '}
                      <strong className="text-fg font-semibold">
                        98/100 (Uy tín cao)
                      </strong>
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-2 text-xs text-muted">
                  <Home className="h-4 w-4 text-primary shrink-0" />
                  <span>Mã căn hộ:</span>
                  <strong className="font-mono text-fg">
                    #{application.apartmentId.slice(-8).toUpperCase()}
                  </strong>
                </div>
              </div>

              {/* Lưới 4 thông số người thuê đã điền */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 text-xs">
                <div className="rounded-xl bg-surface-muted/30 p-3.5 border border-border/40 space-y-1">
                  <span className="text-muted flex items-center gap-1.5 font-medium">
                    <Users className="h-3.5 w-3.5 text-primary" />
                    Số người cư trú
                  </span>
                  <p className="font-bold text-fg text-sm">
                    {application.occupants} người
                  </p>
                  <p className="text-[10px] text-muted">
                    Đúng tiêu chuẩn sức chứa
                  </p>
                </div>

                <div className="rounded-xl bg-surface-muted/30 p-3.5 border border-border/40 space-y-1">
                  <span className="text-muted flex items-center gap-1.5 font-medium">
                    <Calendar className="h-3.5 w-3.5 text-primary" />
                    Ngày mong muốn dọn vào
                  </span>
                  <p className="font-bold text-fg text-sm">{formattedDate}</p>
                  <p className="text-[10px] text-muted">
                    Dự kiến bắt đầu tính tiền
                  </p>
                </div>

                <div className="rounded-xl bg-surface-muted/30 p-3.5 border border-border/40 space-y-1">
                  <span className="text-muted flex items-center gap-1.5 font-medium">
                    <Briefcase className="h-3.5 w-3.5 text-primary" />
                    Nghề nghiệp / Đơn vị
                  </span>
                  <p className="font-bold text-fg text-sm truncate">
                    {application.occupation || 'Chưa cung cấp'}
                  </p>
                  <p className="text-[10px] text-muted">
                    Nguồn thu nhập ổn định
                  </p>
                </div>

                <div className="rounded-xl bg-surface-muted/30 p-3.5 border border-border/40 space-y-1">
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
                        Cam kết PCCC
                      </span>
                    )}
                  </div>
                  <p className="text-[10px] text-muted">
                    {application.hasPets
                      ? 'Cần tuân thủ nội quy'
                      : 'Không mang theo vật nuôi'}
                  </p>
                </div>
              </div>

              {/* Ghi chú & nguyện vọng từ khách thuê */}
              {application.notes && (
                <div className="rounded-xl border border-border/70 bg-surface-muted/20 p-4 space-y-1.5">
                  <span className="text-xs font-semibold text-fg flex items-center gap-1.5">
                    <FileText className="h-3.5 w-3.5 text-primary" />
                    Ghi chú & nguyện vọng do khách thuê gửi khi nộp đơn:
                  </span>
                  <p className="italic text-xs text-muted leading-relaxed pl-4 border-l-2 border-primary">
                    &quot;{application.notes}&quot;
                  </p>
                </div>
              )}
            </div>
          </section>
        )}

        {/* =========================================================================
            BƯỚC 2: GÓI THUÊ & NGHĨA VỤ TÀI CHÍNH
           ========================================================================= */}
        {showStep2 && (
          <section className="rounded-2xl border border-border bg-surface shadow-sm overflow-hidden">
            <div className="bg-surface-muted/50 border-b border-border/80 px-5 py-3 flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <span className="flex h-6 w-6 items-center justify-center rounded-lg bg-primary text-white font-bold text-xs">
                  2
                </span>
                <div>
                  <h3 className="text-xs font-bold uppercase tracking-wider text-fg">
                    Bước 2: Gói thuê & Cam kết tài chính
                  </h3>
                  <p className="text-[11px] text-muted">
                    Điều kiện thương mại, thời hạn thuê và số tiền đặt cọc thỏa
                    thuận
                  </p>
                </div>
              </div>
              <span className="inline-flex items-center gap-1 rounded-md bg-primary/10 px-2.5 py-1 text-[11px] font-semibold text-primary border border-primary/20">
                <Coins className="h-3.5 w-3.5" />
                Gói {duration} tháng
              </span>
            </div>

            <div className="p-5 space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 text-xs">
                <div className="rounded-xl bg-surface-muted/30 p-3.5 border border-border/40 space-y-1">
                  <span className="text-muted">Thời hạn thuê:</span>
                  <p className="font-bold text-fg text-sm">{duration} tháng</p>
                  <p className="text-[10px] text-muted">Cam kết thuê dài hạn</p>
                </div>

                {rent > 0 && (
                  <div className="rounded-xl bg-primary-soft/10 p-3.5 border border-primary/20 space-y-1">
                    <span className="text-muted">Giá thuê thỏa thuận:</span>
                    <p className="font-bold font-display text-primary text-base">
                      {formatVnd(rent)} ₫/tháng
                    </p>
                    <p className="text-[10px] text-primary/80">
                      Khớp giá niêm yết
                    </p>
                  </div>
                )}

                {deposit > 0 && (
                  <div className="rounded-xl bg-surface-muted/30 p-3.5 border border-border/40 space-y-1">
                    <span className="text-muted">Số tiền cọc dự kiến:</span>
                    <p className="font-bold text-fg text-sm">
                      {formatVnd(deposit)} ₫
                    </p>
                    <p className="text-[10px] text-muted">
                      Khóa giữ chỗ căn hộ
                    </p>
                  </div>
                )}

                {rent > 0 && duration > 0 && (
                  <div className="rounded-xl bg-surface-muted/30 p-3.5 border border-border/40 space-y-1">
                    <span className="text-muted">
                      Tổng doanh thu ({duration}T):
                    </span>
                    <p className="font-bold text-fg text-sm">
                      {formatVnd(rent * duration)} ₫
                    </p>
                    <p className="text-[10px] text-muted">
                      Ước tính toàn hợp đồng
                    </p>
                  </div>
                )}
              </div>

              {/* Trình tự thực hiện hợp đồng */}
              <div className="rounded-xl border border-primary/20 bg-primary-soft/10 p-4 flex items-start gap-3 text-xs">
                <Landmark className="h-4 w-4 text-primary shrink-0 mt-0.5" />
                <div className="space-y-0.5">
                  <strong className="text-fg font-semibold">
                    Trình tự thực thi:{' '}
                    {executionStrategy === 'DEPOSIT_FIRST'
                      ? 'Cọc trước, sau đó ký hợp đồng'
                      : 'Ký hợp đồng trước, sau đó thanh toán cọc'}
                  </strong>
                  <p className="text-muted text-[11px] leading-relaxed">
                    {executionStrategy === 'DEPOSIT_FIRST'
                      ? 'Khách thuê sẽ nộp tiền cọc khóa giữ chỗ phòng trước khi cả hai bên chính thức tiến hành ký số Hợp đồng thuê nhà.'
                      : 'Hai bên sẽ thực hiện ký số Hợp đồng thuê nhà điện tử trước, sau đó người thuê mới tiến hành đóng tiền cọc.'}
                  </p>
                </div>
              </div>
            </div>
          </section>
        )}

        {/* =========================================================================
            BƯỚC 3: ĐIỀU KHOẢN & CAM KẾT PHÁP LÝ
           ========================================================================= */}
        {showStep3 && (
          <section className="rounded-2xl border border-border bg-surface shadow-sm overflow-hidden">
            <div className="bg-surface-muted/50 border-b border-border/80 px-5 py-3 flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <span className="flex h-6 w-6 items-center justify-center rounded-lg bg-primary text-white font-bold text-xs">
                  3
                </span>
                <div>
                  <h3 className="text-xs font-bold uppercase tracking-wider text-fg">
                    Bước 3: Điều khoản & Cam kết pháp lý đã đồng thuận
                  </h3>
                  <p className="text-[11px] text-muted">
                    Các cam kết và căn cứ pháp lý khách thuê đã chấp thuận 100%
                    khi nộp đơn
                  </p>
                </div>
              </div>
              <span className="inline-flex items-center gap-1 rounded-md bg-success-soft px-2.5 py-1 text-[11px] font-semibold text-success border border-success/30">
                <CheckCircle2 className="h-3.5 w-3.5" />
                Đồng thuận 100%
              </span>
            </div>

            <div className="p-5 space-y-3 text-xs">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                <div className="rounded-xl bg-surface-muted/30 p-3.5 border border-border/40 space-y-1.5">
                  <div className="flex items-center gap-2 font-semibold text-fg">
                    <Flame className="h-4 w-4 text-primary" />
                    <span>An toàn PCCC & Lối thoát hiểm</span>
                  </div>
                  <p className="text-muted text-[11px] leading-relaxed">
                    Bảo đảm không tích trữ chất cháy nổ, không cản trở lối thoát
                    ban công và hành lang tuân thủ{' '}
                    <strong>Luật Nhà ở 2023</strong>.
                  </p>
                </div>

                <div className="rounded-xl bg-surface-muted/30 p-3.5 border border-border/40 space-y-1.5">
                  <div className="flex items-center gap-2 font-semibold text-fg">
                    <Scale className="h-4 w-4 text-primary" />
                    <span>Khai báo tạm trú DVC Quốc gia</span>
                  </div>
                  <p className="text-muted text-[11px] leading-relaxed">
                    Sẵn sàng cung cấp bản chụp CCCD/thông tin để chủ nhà làm thủ
                    tục khai báo tạm trú qua Cổng DVC 1.004194 Bộ Công An.
                  </p>
                </div>

                <div className="rounded-xl bg-surface-muted/30 p-3.5 border border-border/40 space-y-1.5">
                  <div className="flex items-center gap-2 font-semibold text-fg">
                    <Gavel className="h-4 w-4 text-primary" />
                    <span>Chữ ký số SmartCA bảo chứng</span>
                  </div>
                  <p className="text-muted text-[11px] leading-relaxed">
                    Đồng thuận ký kết Hợp đồng số theo mẫu Phụ lục II{' '}
                    <strong>Nghị định 96/2024/NĐ-CP</strong>, lưu vết bất biến
                    trên Fabric Ledger.
                  </p>
                </div>
              </div>

              <div className="rounded-xl border border-success/30 bg-success-soft/20 p-3 flex items-center gap-2.5 text-xs text-success">
                <ShieldCheck className="h-4 w-4 text-success shrink-0" />
                <span>
                  Hệ thống tự động liên kết các điều khoản đã cam kết này trực
                  tiếp vào dự thảo Hợp đồng thuê số khi bạn bấm chấp thuận.
                </span>
              </div>
            </div>
          </section>
        )}

        {/* =========================================================================
            BƯỚC 4: THẨM ĐỊNH & QUYẾT ĐỊNH CỦA CHỦ NHÀ
           ========================================================================= */}
        {showStep4 && (
          <section className="rounded-2xl border border-border bg-surface shadow-sm overflow-hidden">
            <div className="bg-surface-muted/50 border-b border-border/80 px-5 py-3 flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <span className="flex h-6 w-6 items-center justify-center rounded-lg bg-primary text-white font-bold text-xs">
                  4
                </span>
                <div>
                  <h3 className="text-xs font-bold uppercase tracking-wider text-fg">
                    Bước 4: Quyết định thẩm định của Chủ nhà
                  </h3>
                  <p className="text-[11px] text-muted">
                    Phê duyệt để tự động sinh Hợp đồng số hoặc từ chối đề nghị
                    thuê
                  </p>
                </div>
              </div>
              <ApplicationStatusBadge status={application.status} />
            </div>

            <div className="p-5 space-y-4">
              {isPending ? (
                <div className="space-y-4">
                  {/* Switcher Phê duyệt / Từ chối */}
                  <div className="flex rounded-xl bg-surface-muted p-1 border border-border max-w-md">
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
                    <div className="space-y-3 rounded-xl border border-success/30 bg-success-soft/30 p-4">
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

                      {/* Gợi ý phản hồi nhanh */}
                      <div className="space-y-1.5 pt-1">
                        <span className="text-[11px] font-medium text-muted block">
                          Gợi ý phản hồi nhanh cho khách thuê:
                        </span>
                        <div className="flex flex-wrap gap-1.5">
                          {QUICK_APPROVAL_TEMPLATES.map(tpl => (
                            <button
                              key={tpl}
                              type="button"
                              onClick={() => setNote(tpl)}
                              className="text-[11px] rounded-lg bg-surface border border-border px-2.5 py-1 text-fg hover:border-primary transition cursor-pointer text-left"
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
                    <div className="space-y-3 rounded-xl border border-danger/30 bg-danger-soft/30 p-4">
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
                      className="mt-2 bg-primary text-on-control shadow-sm text-xs"
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
          </section>
        )}
      </div>

      <DialogFooter className="p-4 px-6 border-t border-border bg-surface shrink-0 flex items-center justify-between sm:justify-between">
        <span className="text-[11px] text-muted hidden sm:inline-block">
          Hệ thống Thẩm định Cho thuê TH-PropTech v2.0 (4 Bước Chuẩn Hóa)
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
                  Xem xét chi tiết từng bước thông tin người thuê đã gửi và đưa
                  ra quyết định thẩm định.
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
