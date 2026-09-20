'use client'

import * as React from 'react'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from '@/shared/ui/dialog'
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
  Clock,
  Coins,
  FileSignature,
  FileText,
  Flame,
  Gavel,
  Landmark,
  PawPrint,
  Scale,
  Shield,
  ShieldAlert,
  ShieldCheck,
  UserCheck,
  Users,
} from 'lucide-react'
import { ApplicationStatusBadge } from './application-status-badge'
import type { RentalApplicationItem } from '../api/rental-application-api'

export interface ApplicationDetailDialogProps {
  application: RentalApplicationItem | null
  open: boolean
  onOpenChange: (open: boolean) => void
}

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

  const executionPolicy = application.executionPolicySnapshot
  const executionPolicyLabel =
    executionPolicy?.strategy === 'DEPOSIT_FIRST'
      ? 'Cọc trước, sau đó ký hợp đồng'
      : executionPolicy?.strategy === 'SIGN_FIRST'
        ? 'Ký hợp đồng trước, sau đó thanh toán cọc'
        : 'Chưa xác định'

  const isAccepted = application.status === 'accepted'
  const isRejected = application.status === 'rejected'
  const hasContract = application.contractHandoff
    ? application.contractHandoff.state === 'ready' &&
      Boolean(application.contractHandoff.href)
    : Boolean(application.contractId)

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-5xl bg-surface p-0 sm:rounded-3xl border border-border overflow-hidden flex flex-col max-h-[90vh]">
        <DialogHeader className="border-b border-border p-6 bg-surface-muted/30">
          <div className="flex items-center justify-between">
            <div>
              <DialogTitle className="font-display text-xl font-bold text-fg">
                Chi tiết hồ sơ đề nghị thuê nhà
              </DialogTitle>
              <DialogDescription className="mt-1 text-sm text-muted">
                Mã hồ sơ:{' '}
                <span className="font-mono font-medium text-fg">
                  #{application._id.slice(-8).toUpperCase()}
                </span>
              </DialogDescription>
            </div>
            <ApplicationStatusBadge status={application.status} />
          </div>
        </DialogHeader>

        <div className="flex-1 overflow-y-auto p-6 no-scrollbar">
          <div className="grid gap-6 md:grid-cols-12">
            {/* Cột trái: Thông tin chính */}
            <div className="space-y-6 md:col-span-7">
              {/* Lộ trình & Trạng thái */}
              <div className="rounded-2xl border border-border bg-surface p-5 shadow-sm">
                <h3 className="mb-4 text-xs font-bold uppercase tracking-wider text-primary flex items-center gap-2">
                  <Clock className="h-4 w-4" />
                  Tiến trình hồ sơ
                </h3>
                <div className="relative space-y-4 before:absolute before:inset-y-2 before:left-[11px] before:w-[2px] before:bg-border/60">
                  <div className="relative flex gap-4">
                    <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-success text-on-control z-10">
                      <CheckCircle2 className="h-4 w-4" />
                    </div>
                    <div>
                      <p className="font-semibold text-fg text-sm">
                        Hồ sơ đã gửi
                      </p>
                      <p className="text-xs text-muted mt-0.5">
                        Yêu cầu thuê đã được gửi tới chủ nhà.
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
                        className={`font-semibold text-sm ${isRejected ? 'text-danger' : 'text-fg'}`}
                      >
                        {isAccepted
                          ? 'Chủ nhà đã duyệt'
                          : isRejected
                            ? 'Chủ nhà từ chối'
                            : 'Chờ chủ nhà xét duyệt'}
                      </p>
                      {isRejected && application.reasonCode && (
                        <p className="text-xs text-danger mt-1">
                          Lý do: {application.reasonCode}
                        </p>
                      )}
                      {!isAccepted && !isRejected && (
                        <p className="text-xs text-muted mt-0.5">
                          Chủ nhà đang xem xét thông tin của bạn.
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
                        Ký hợp đồng số
                      </p>
                      <p className="text-xs text-muted mt-0.5">
                        Ký hợp đồng SmartCA sau khi được duyệt.
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Thông tin cư trú */}
              <div className="rounded-2xl border border-border bg-surface p-5 shadow-sm">
                <h3 className="mb-4 text-xs font-bold uppercase tracking-wider text-primary flex items-center gap-2">
                  <Users className="h-4 w-4" />
                  Thông tin người nộp & Cư trú
                </h3>
                <div className="grid grid-cols-2 gap-4">
                  <div className="rounded-xl bg-surface-muted/30 p-3">
                    <span className="text-xs text-muted flex items-center gap-1.5 mb-1">
                      <Users className="h-3.5 w-3.5" /> Số người cư trú
                    </span>
                    <p className="font-semibold text-fg">
                      {application.occupants} người
                    </p>
                  </div>
                  <div className="rounded-xl bg-surface-muted/30 p-3">
                    <span className="text-xs text-muted flex items-center gap-1.5 mb-1">
                      <Calendar className="h-3.5 w-3.5" /> Ngày dọn vào
                    </span>
                    <p className="font-semibold text-fg">{formattedDate}</p>
                  </div>
                  <div className="rounded-xl bg-surface-muted/30 p-3">
                    <span className="text-xs text-muted flex items-center gap-1.5 mb-1">
                      <Briefcase className="h-3.5 w-3.5" /> Nghề nghiệp
                    </span>
                    <p className="font-semibold text-fg">
                      {application.occupation || 'Chưa cung cấp'}
                    </p>
                  </div>
                  <div className="rounded-xl bg-surface-muted/30 p-3">
                    <span className="text-xs text-muted flex items-center gap-1.5 mb-1">
                      <PawPrint className="h-3.5 w-3.5" /> Thú cưng
                    </span>
                    <p className="font-semibold text-fg">
                      {application.hasPets ? 'Có nuôi thú cưng' : 'Không có'}
                    </p>
                  </div>
                </div>
                {application.notes && (
                  <div className="mt-4 rounded-xl border border-border/60 bg-surface-muted/10 p-3">
                    <span className="text-xs text-muted flex items-center gap-1.5 mb-1.5">
                      <FileText className="h-3.5 w-3.5" /> Ghi chú gửi chủ nhà
                    </span>
                    <p className="text-sm italic text-fg">
                      &quot;{application.notes}&quot;
                    </p>
                  </div>
                )}
              </div>

              {/* Điều khoản đã đồng ý */}
              <div className="rounded-2xl border border-border bg-surface p-5 shadow-sm">
                <h3 className="mb-4 text-xs font-bold uppercase tracking-wider text-primary flex items-center gap-2">
                  <Scale className="h-4 w-4" />
                  Điều khoản pháp lý đã cam kết
                </h3>
                <p className="text-xs text-muted mb-4">
                  Bạn đã xác nhận đồng thuận với các quy chế sau đây khi nộp hồ
                  sơ. Các điều khoản này sẽ được tự động đính kèm vào Hợp đồng
                  số.
                </p>

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

                <div className="mt-4 rounded-xl border border-success/30 bg-success-soft/10 p-3 flex items-start gap-3">
                  <ShieldCheck className="h-4 w-4 text-success mt-0.5 shrink-0" />
                  <div>
                    <p className="text-xs font-semibold text-success">
                      Đã xác nhận: Quy chế Điều khoản dịch vụ và pháp lý
                    </p>
                    <p className="text-[10px] text-muted mt-1">
                      Ký xác nhận tự động khi nộp hồ sơ.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Cột phải: Gói thuê & Tài chính */}
            <div className="space-y-6 md:col-span-5">
              {/* Card Gói thuê */}
              <div className="rounded-2xl border border-border bg-surface shadow-sm overflow-hidden">
                <div className="bg-primary/5 border-b border-primary/10 p-4">
                  <h3 className="text-xs font-bold uppercase tracking-wider text-primary flex items-center gap-2">
                    <Coins className="h-4 w-4" />
                    Tài chính & Gói thuê
                  </h3>
                </div>
                <div className="p-5 space-y-4">
                  <div className="flex items-center justify-between pb-3 border-b border-border/50">
                    <span className="text-sm text-muted">
                      Thời hạn cam kết:
                    </span>
                    <strong className="text-base text-fg">
                      {duration} tháng
                    </strong>
                  </div>
                  {rent > 0 && (
                    <div className="flex items-center justify-between pb-3 border-b border-border/50">
                      <span className="text-sm text-muted">
                        Giá thuê thỏa thuận:
                      </span>
                      <strong className="text-base font-display text-fg">
                        {formatVnd(rent)} ₫
                      </strong>
                    </div>
                  )}
                  {deposit > 0 && (
                    <div className="flex items-center justify-between pb-3 border-b border-border/50">
                      <span className="text-sm text-muted">Tiền đặt cọc:</span>
                      <strong className="text-base font-display text-fg">
                        {formatVnd(deposit)} ₫
                      </strong>
                    </div>
                  )}

                  {rent > 0 && duration > 0 && (
                    <div className="rounded-xl bg-surface-muted p-3 flex justify-between items-center mt-2">
                      <span className="text-xs text-muted">
                        Tổng ước tính ({duration}T):
                      </span>
                      <strong className="text-sm text-primary">
                        {formatVnd(rent * duration)} ₫
                      </strong>
                    </div>
                  )}
                </div>
              </div>

              {/* Trình tự thực hiện */}
              {executionPolicy && (
                <div className="rounded-2xl border border-primary/20 bg-primary-soft/5 p-5 shadow-sm">
                  <h3 className="mb-3 text-xs font-bold uppercase tracking-wider text-primary flex items-center gap-2">
                    <Landmark className="h-4 w-4" />
                    Trình tự thực hiện hợp đồng
                  </h3>
                  <p className="text-sm font-semibold text-fg">
                    {executionPolicyLabel}
                  </p>
                  <p className="text-xs text-muted mt-1 leading-relaxed">
                    {executionPolicy.strategy === 'DEPOSIT_FIRST'
                      ? 'Yêu cầu thanh toán tiền cọc để khóa giữ chỗ trước khi hai bên chính thức ký hợp đồng số.'
                      : 'Hai bên sẽ thực hiện ký hợp đồng số trước, sau đó mới tiến hành thanh toán khoản tiền cọc.'}
                  </p>
                </div>
              )}

              {/* Bảo vệ pháp lý */}
              <div className="rounded-2xl border border-success/30 bg-success-soft/10 p-4 text-xs text-muted flex items-start gap-3">
                <Shield className="h-5 w-5 text-success shrink-0" />
                <p className="leading-relaxed">
                  Thông tin hồ sơ được bảo mật và áp dụng làm căn cứ tự động tạo
                  Hợp đồng thuê nhà điện tử tuân thủ{' '}
                  <strong>Nghị định 96/2024/NĐ-CP</strong>.
                </p>
              </div>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
