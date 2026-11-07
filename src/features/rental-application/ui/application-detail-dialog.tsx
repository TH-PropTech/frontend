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
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/shared/ui/accordion'
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
  Landmark,
  PawPrint,
  Scale,
  ShieldAlert,
  ShieldCheck,
  UserCheck,
  Users,
} from 'lucide-react'
import { getApplicationReasonLabel } from '../lib/application-labels'
import { ApplicationStatusBadge } from './application-status-badge'
import type { RentalApplicationItem } from '../api/rental-application-api'

export interface ApplicationDetailDialogProps {
  application: RentalApplicationItem | null
  open: boolean
  onOpenChange: (open: boolean) => void
}

const STEP_TABS = [
  { id: 'all', label: 'Toàn bộ hồ sơ', badge: '★' },
  { id: 'step1', label: 'B1: Thông tin đã nộp', badge: '1' },
  { id: 'step2', label: 'B2: Gói thuê & Tài chính', badge: '2' },
  { id: 'step3', label: 'B3: Điều khoản & PCCC', badge: '3' },
  { id: 'step4', label: 'B4: Tiến trình & Ký HĐ', badge: '4' },
] as const

function formatVnd(amount: number): string {
  return new Intl.NumberFormat('vi-VN').format(amount)
}

const STATUTORY_LEGAL_SECTIONS = [
  {
    id: 'law-basis',
    title: 'Căn cứ pháp lý & Hiệu lực quy chuẩn',
    icon: Scale,
    summary:
      'Hợp đồng và hồ sơ tuân thủ Bộ luật Dân sự 2015, Luật Nhà ở 2023 và Luật Kinh doanh Bất động sản 2023.',
    content:
      'Toàn bộ thỏa thuận thuê nhà ở được xây dựng trên nguyên tắc bình đẳng, tự nguyện và thiện chí giữa hai bên. Khi chủ nhà phê duyệt, các điều khoản đã đồng thuận sẽ được liên kết trực tiếp vào bản nháp hợp đồng số theo mẫu Phụ lục II Nghị định 96/2024/NĐ-CP.',
  },
  {
    id: 'fire-safety',
    title: 'Quy chế An toàn Phòng cháy Chữa cháy (PCCC)',
    icon: Flame,
    summary:
      'Trách nhiệm bảo đảm lối thoát hiểm, thiết bị báo khói và nội quy phòng chống cháy nổ tại căn hộ.',
    content:
      'Bên thuê có trách nhiệm tuân thủ nghiêm ngặt quy định PCCC của tòa nhà chung cư: không tích trữ chất dễ cháy nổ, không cản trở lối thoát hiểm ban công/cửa chính, và kiểm tra định kỳ bình chữa cháy trang bị trong căn hộ.',
  },
  {
    id: 'dispute-resolution',
    title: 'Cơ chế Giải quyết Tranh chấp & Chấm dứt',
    icon: Gavel,
    summary:
      'Thủ tục hòa giải thương lượng trước khi yêu cầu Tòa án nhân dân có thẩm quyền giải quyết.',
    content:
      'Mọi bất đồng phát sinh sẽ được ưu tiên giải quyết qua thương lượng hòa giải trên nền tảng. Trường hợp một bên đơn phương chấm dứt hợp đồng trái quy định, bên vi phạm phải bồi thường thiệt hại và chịu phạt vi phạm theo đúng điều khoản cam kết.',
  },
]

export function ApplicationDetailDialog({
  application,
  open,
  onOpenChange,
}: ApplicationDetailDialogProps): React.ReactElement | null {
  const [activeStepTab, setActiveStepTab] = React.useState<
    'all' | 'step1' | 'step2' | 'step3' | 'step4'
  >('all')

  if (!application) return null

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

  const isAccepted = application.status === 'accepted'
  const isRejected = application.status === 'rejected'
  const hasContract = application.contractHandoff
    ? application.contractHandoff.state === 'ready' &&
      Boolean(application.contractHandoff.href)
    : Boolean(application.contractId)

  const contractHref =
    application.contractHandoff?.href ||
    (application.contractId ? `/contracts/${application.contractId}` : null)

  const showStep1 = activeStepTab === 'all' || activeStepTab === 'step1'
  const showStep2 = activeStepTab === 'all' || activeStepTab === 'step2'
  const showStep3 = activeStepTab === 'all' || activeStepTab === 'step3'
  const showStep4 = activeStepTab === 'all' || activeStepTab === 'step4'

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent
        className="w-[96vw] max-w-6xl 2xl:max-w-7xl max-h-[92vh] h-[92vh] bg-surface p-0 sm:rounded-2xl border border-border overflow-hidden flex flex-col shadow-2xl"
        data-testid="application-detail-dialog"
      >
        <DialogHeader className="border-b border-border p-6 bg-surface-muted/30 shrink-0">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10 text-primary border border-primary/20 shrink-0">
                <FileText className="h-5 w-5" />
              </div>
              <div>
                <div className="flex items-center gap-2.5">
                  <DialogTitle className="font-display text-xl font-bold text-fg">
                    Chi tiết hồ sơ đề nghị thuê nhà
                  </DialogTitle>
                  <ApplicationStatusBadge status={application.status} />
                </div>
                <DialogDescription className="mt-0.5 text-xs text-muted">
                  Mã hồ sơ:{' '}
                  <span className="font-mono font-medium text-fg">
                    #{application._id.slice(-8).toUpperCase()}
                  </span>{' '}
                  • Xem lại chi tiết từng bước thông tin bạn đã gửi cho chủ nhà
                </DialogDescription>
              </div>
            </div>
          </div>
        </DialogHeader>

        {/* Stepper Tabs Bar */}
        <div className="border-b border-border bg-surface-muted/40 px-6 py-2.5 shrink-0">
          <div className="grid grid-cols-2 sm:grid-cols-5 gap-2">
            {STEP_TABS.map(tab => {
              const isActive = activeStepTab === tab.id
              return (
                <button
                  key={tab.id}
                  type="button"
                  onClick={() =>
                    setActiveStepTab(tab.id as typeof activeStepTab)
                  }
                  className={`px-3 py-2 rounded-xl text-xs font-semibold transition-all cursor-pointer flex items-center justify-center sm:justify-start gap-2 border ${
                    isActive
                      ? 'bg-surface text-primary shadow-sm border-primary/40'
                      : 'bg-surface/60 text-muted hover:text-fg hover:bg-surface border-border/60'
                  }`}
                >
                  <span
                    className={`flex h-4 w-4 shrink-0 items-center justify-center rounded-full text-[10px] font-bold ${
                      isActive
                        ? 'bg-primary text-white'
                        : 'bg-surface-muted text-muted'
                    }`}
                  >
                    {tab.badge}
                  </span>
                  <span className="truncate">{tab.label}</span>
                </button>
              )
            })}
          </div>
        </div>

        <div className="flex-1 overflow-y-auto p-6 space-y-6 no-scrollbar">
          {/* =========================================================================
              BƯỚC 1: THÔNG TIN BẠN ĐÃ KHAI BÁO
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
                      Thông tin cá nhân, nhân khẩu và nghề nghiệp bạn đã điền ở
                      Bước 1
                    </p>
                  </div>
                </div>
                <span className="inline-flex items-center gap-1 rounded-md bg-success-soft px-2.5 py-1 text-[11px] font-semibold text-success border border-success/30">
                  <CheckCircle2 className="h-3.5 w-3.5" />
                  Đã điền đầy đủ
                </span>
              </div>

              <div className="p-5 space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 text-xs">
                  <div className="rounded-xl bg-surface-muted/30 p-3.5 border border-border/40 space-y-1">
                    <span className="text-muted flex items-center gap-1.5 font-medium">
                      <Users className="h-3.5 w-3.5 text-primary" />
                      Số người cư trú
                    </span>
                    <p className="font-bold text-fg text-sm">
                      {application.occupants} người
                    </p>
                  </div>

                  <div className="rounded-xl bg-surface-muted/30 p-3.5 border border-border/40 space-y-1">
                    <span className="text-muted flex items-center gap-1.5 font-medium">
                      <Calendar className="h-3.5 w-3.5 text-primary" />
                      Ngày dọn vào dự kiến
                    </span>
                    <p className="font-bold text-fg text-sm">{formattedDate}</p>
                  </div>

                  <div className="rounded-xl bg-surface-muted/30 p-3.5 border border-border/40 space-y-1">
                    <span className="text-muted flex items-center gap-1.5 font-medium">
                      <Briefcase className="h-3.5 w-3.5 text-primary" />
                      Nghề nghiệp / Lĩnh vực
                    </span>
                    <p className="font-bold text-fg text-sm truncate">
                      {application.occupation || 'Chưa cung cấp'}
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
                          Tuân thủ nội quy
                        </span>
                      )}
                    </div>
                  </div>
                </div>

                {application.notes && (
                  <div className="rounded-xl border border-border/70 bg-surface-muted/20 p-4 space-y-1.5">
                    <span className="text-xs font-semibold text-fg flex items-center gap-1.5">
                      <FileText className="h-3.5 w-3.5 text-primary" />
                      Ghi chú bạn đã gửi cho chủ nhà:
                    </span>
                    <p className="italic text-xs text-muted leading-relaxed pl-4 border-l-2 border-primary">
                      &quot;{application.notes}&quot;
                    </p>
                  </div>
                )}

                <div className="rounded-xl border border-primary/20 bg-primary-soft/10 p-3 flex items-center justify-between text-xs">
                  <div className="flex items-center gap-2">
                    <Home className="h-4 w-4 text-primary shrink-0" />
                    <span className="text-muted">Căn hộ bạn đăng ký thuê:</span>
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
            </section>
          )}

          {/* =========================================================================
              BƯỚC 2: GÓI THUÊ & TÀI CHÍNH ĐÃ CHỌN
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
                      Bước 2: Gói thuê & Nghĩa vụ tài chính
                    </h3>
                    <p className="text-[11px] text-muted">
                      Chi tiết gói thuê, tiền thuê hàng tháng và tiền đặt cọc
                      bạn đã chọn ở Bước 2
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
                    <p className="font-bold text-fg text-sm">
                      {duration} tháng
                    </p>
                  </div>

                  {rent > 0 && (
                    <div className="rounded-xl bg-primary-soft/10 p-3.5 border border-primary/20 space-y-1">
                      <span className="text-muted">Giá thuê thỏa thuận:</span>
                      <p className="font-bold font-display text-primary text-base">
                        {formatVnd(rent)} ₫/tháng
                      </p>
                    </div>
                  )}

                  {deposit > 0 && (
                    <div className="rounded-xl bg-surface-muted/30 p-3.5 border border-border/40 space-y-1">
                      <span className="text-muted">Tiền đặt cọc giữ chỗ:</span>
                      <p className="font-bold text-fg text-sm">
                        {formatVnd(deposit)} ₫
                      </p>
                    </div>
                  )}

                  {rent > 0 && duration > 0 && (
                    <div className="rounded-xl bg-surface-muted/30 p-3.5 border border-border/40 space-y-1">
                      <span className="text-muted">
                        Tổng ước tính ({duration}T):
                      </span>
                      <p className="font-bold text-fg text-sm">
                        {formatVnd(rent * duration)} ₫
                      </p>
                    </div>
                  )}
                </div>

                <div className="rounded-xl border border-primary/20 bg-primary-soft/10 p-4 flex items-start gap-3 text-xs">
                  <Landmark className="h-4 w-4 text-primary shrink-0 mt-0.5" />
                  <div className="space-y-0.5">
                    <strong className="text-fg font-semibold">
                      Trình tự thực thi: Ký hợp đồng trước, sau đó thanh toán
                      cọc
                    </strong>
                    <p className="text-muted text-[11px] leading-relaxed">
                      Hai bên sẽ thực hiện ký hợp đồng số trước, sau đó mới tiến
                      hành thanh toán khoản tiền cọc.
                    </p>
                  </div>
                </div>
              </div>
            </section>
          )}

          {/* =========================================================================
              BƯỚC 3: ĐIỀU KHOẢN PHÁP LÝ BẠN ĐÃ CAM KẾT
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
                      Các cam kết pháp lý chuẩn bạn đã xác nhận đồng thuận khi
                      nộp hồ sơ ở Bước 3
                    </p>
                  </div>
                </div>
                <span className="inline-flex items-center gap-1 rounded-md bg-success-soft px-2.5 py-1 text-[11px] font-semibold text-success border border-success/30">
                  <ShieldCheck className="h-3.5 w-3.5" />
                  Đã cam kết
                </span>
              </div>

              <div className="p-5 space-y-4 text-xs">
                <Accordion type="single" collapsible className="w-full">
                  {STATUTORY_LEGAL_SECTIONS.map(sec => {
                    const Icon = sec.icon
                    return (
                      <AccordionItem
                        key={sec.id}
                        value={sec.id}
                        className="border-border"
                      >
                        <AccordionTrigger className="text-left text-xs font-semibold text-fg hover:no-underline py-2.5">
                          <div className="flex items-center gap-2">
                            <Icon
                              aria-hidden="true"
                              className="h-3.5 w-3.5 text-primary"
                            />
                            <span>{sec.title}</span>
                          </div>
                        </AccordionTrigger>
                        <AccordionContent className="text-xs text-muted leading-relaxed pt-1 pb-3 pl-5">
                          <p className="font-medium text-fg mb-1">
                            {sec.summary}
                          </p>
                          <p>{sec.content}</p>
                        </AccordionContent>
                      </AccordionItem>
                    )
                  })}
                </Accordion>

                <div className="rounded-xl border border-success/30 bg-success-soft/20 p-3.5 flex items-center gap-2.5 text-xs text-success">
                  <ShieldCheck className="h-4 w-4 text-success shrink-0" />
                  <span>
                    Toàn bộ các điều khoản trên được tự động liên kết vào bản
                    thảo Hợp đồng số bảo đảm tính pháp lý theo{' '}
                    <strong>Nghị định 96/2024/NĐ-CP</strong>.
                  </span>
                </div>
              </div>
            </section>
          )}

          {/* =========================================================================
              BƯỚC 4: TIẾN TRÌNH XÉT DUYỆT & KÝ HỢP ĐỒNG SỐ
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
                      Bước 4: Tiến trình xét duyệt & Ký kết hợp đồng số
                    </h3>
                    <p className="text-[11px] text-muted">
                      Theo dõi phản hồi từ chủ nhà và chuyển tiếp sang bước ký
                      số SmartCA
                    </p>
                  </div>
                </div>
                <ApplicationStatusBadge status={application.status} />
              </div>

              <div className="p-5 space-y-5">
                {/* Lộ trình tiến trình */}
                <div className="relative space-y-4 before:absolute before:inset-y-2 before:left-[11px] before:w-[2px] before:bg-border/60">
                  <div className="relative flex gap-4">
                    <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-success text-on-control z-10">
                      <CheckCircle2 className="h-4 w-4" />
                    </div>
                    <div>
                      <p className="font-semibold text-fg text-sm">
                        Hồ sơ đã gửi thành công
                      </p>
                      <p className="text-xs text-muted mt-0.5">
                        Yêu cầu thuê nhà và toàn bộ thông tin 3 bước đã được
                        chuyển tới chủ nhà.
                      </p>
                    </div>
                  </div>

                  <div className="relative flex gap-4">
                    <div
                      className={`flex h-6 w-6 shrink-0 items-center justify-center rounded-full z-10 ${
                        isAccepted
                          ? 'bg-success text-on-control'
                          : isRejected
                            ? 'bg-danger text-on-control'
                            : 'bg-primary text-on-control shadow-[0_0_0_4px_rgba(var(--primary-rgb),0.1)]'
                      }`}
                    >
                      {isAccepted ? (
                        <CheckCircle2 className="h-4 w-4" />
                      ) : isRejected ? (
                        <ShieldAlert className="h-4 w-4" />
                      ) : (
                        <UserCheck className="h-3 w-3" />
                      )}
                    </div>
                    <div>
                      <p
                        className={`font-semibold text-sm ${
                          isRejected ? 'text-danger' : 'text-fg'
                        }`}
                      >
                        {isAccepted
                          ? 'Chủ nhà đã phê duyệt hồ sơ'
                          : isRejected
                            ? 'Chủ nhà đã từ chối đề nghị thuê'
                            : 'Chủ nhà đang xem xét thẩm định'}
                      </p>
                      {isRejected && application.reasonCode && (
                        <p className="text-xs text-danger mt-1">
                          Lý do:{' '}
                          <strong>
                            {getApplicationReasonLabel(application.reasonCode)}
                          </strong>
                        </p>
                      )}
                      {!isAccepted && !isRejected && (
                        <p className="text-xs text-muted mt-0.5">
                          Chủ nhà đang đối chiếu thông tin cư trú và năng lực
                          của bạn. Bạn sẽ nhận được thông báo ngay khi có kết
                          quả.
                        </p>
                      )}
                    </div>
                  </div>

                  <div className="relative flex gap-4">
                    <div
                      className={`flex h-6 w-6 shrink-0 items-center justify-center rounded-full z-10 ${
                        hasContract
                          ? 'bg-success text-on-control'
                          : 'bg-surface-muted border border-border text-subtle'
                      }`}
                    >
                      {hasContract ? (
                        <CheckCircle2 className="h-4 w-4" />
                      ) : (
                        <FileSignature className="h-3 w-3" />
                      )}
                    </div>
                    <div
                      className={
                        !hasContract && !isAccepted ? 'opacity-50' : ''
                      }
                    >
                      <p className="font-semibold text-fg text-sm">
                        Ký hợp đồng số SmartCA
                      </p>
                      <p className="text-xs text-muted mt-0.5">
                        Ký kết hợp đồng điện tử tích hợp chữ ký số và giải tỏa
                        đặt cọc.
                      </p>
                    </div>
                  </div>
                </div>

                {/* Nút hành động nếu đã được duyệt */}
                {isAccepted && contractHref && (
                  <div className="rounded-xl border border-success/30 bg-success-soft/20 p-4 flex flex-col sm:flex-row items-center justify-between gap-3">
                    <div>
                      <strong className="text-success font-semibold text-sm block">
                        Hợp đồng số đã sẵn sàng để ký kết
                      </strong>
                      <span className="text-xs text-muted">
                        Mời bạn mở bản hợp đồng chính thức để kiểm tra nội dung
                        và ký số SmartCA.
                      </span>
                    </div>
                    <Button
                      asChild
                      size="sm"
                      className="bg-primary text-on-control font-semibold px-4 shadow-sm hover:opacity-90 shrink-0"
                    >
                      <Link href={contractHref as Route}>
                        <FileSignature className="h-4 w-4 mr-1.5" />
                        <span>Xem & Ký hợp đồng</span>
                      </Link>
                    </Button>
                  </div>
                )}
              </div>
            </section>
          )}
        </div>

        <DialogFooter className="p-4 px-6 border-t border-border bg-surface shrink-0 flex items-center justify-between sm:justify-between">
          <span className="text-[11px] text-muted hidden sm:inline-block">
            Hồ sơ điện tử TH-PropTech v2.0 (4 Bước Chuẩn Hóa)
          </span>
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={() => onOpenChange(false)}
            className="border-border text-xs cursor-pointer ml-auto"
          >
            Đóng
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
