'use client'

import * as React from 'react'
import Link from 'next/link'
import type { Route } from 'next'
import {
  ArrowRight,
  Calendar,
  Check,
  CheckCircle2,
  Clock,
  Coins,
  Copy,
  FileCheck,
  FileSignature,
  Home,
  Info,
  Landmark,
  Scale,
  Shield,
  UserCheck,
  Users,
} from 'lucide-react'
import { Button } from '@/shared/ui/button'
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/shared/ui/accordion'
import type { RentalApplicationItem } from '../api/rental-application-api'

export interface ApplyStepSubmittedProps {
  application: RentalApplicationItem
  apartmentId: string
  propertyTitle?: string
}

function formatVnd(amount: number): string {
  return new Intl.NumberFormat('vi-VN').format(amount)
}

const DECREE_96_ARTICLES = [
  {
    num: 1,
    title: 'Điều 1: Thông tin các bên ký kết',
    desc: 'Định danh pháp lý Bên cho thuê và Bên thuê dựa trên CCCD gắn chip và kết quả eKYC.',
  },
  {
    num: 2,
    title: 'Điều 2: Thông tin căn hộ & trang thiết bị',
    desc: 'Diện tích sàn sử dụng, số phòng, hiện trạng kỹ thuật và biên bản kiểm kê nội thất bàn giao.',
  },
  {
    num: 3,
    title: 'Điều 3: Mục đích sử dụng',
    desc: 'Cam kết căn hộ sử dụng duy nhất vào mục đích để ở, không dùng làm kho hàng hay kinh doanh dịch vụ gây ồn.',
  },
  {
    num: 4,
    title: 'Điều 4: Thời hạn thuê & thời điểm bàn giao',
    desc: 'Ngày bắt đầu tính tiền thuê, thời hạn cam kết và mốc thời gian kiểm tra chỉ số đồng hồ điện nước.',
  },
  {
    num: 5,
    title: 'Điều 5: Giá thuê & phương thức thanh toán',
    desc: 'Mức tiền thuê hàng tháng cố định, kỳ hạn thanh toán (từ ngày 01 đến 05) và tài khoản ngân hàng thụ hưởng.',
  },
  {
    num: 6,
    title: 'Điều 6: Chi phí dịch vụ & tiện ích',
    desc: 'Quy định chi trả tiền điện (giá EVN), tiền nước sinh hoạt, internet và phí quản lý vận hành chung cư.',
  },
  {
    num: 7,
    title: 'Điều 7: Quyền và nghĩa vụ của bên cho thuê',
    desc: 'Bảo đảm quyền sử dụng ổn định, bảo trì kết cấu nhà và hỗ trợ thủ tục đăng ký tạm trú cho bên thuê.',
  },
  {
    num: 8,
    title: 'Điều 8: Quyền và nghĩa vụ của bên thuê',
    desc: 'Sử dụng đúng mục đích, giữ gìn vệ sinh chung, tuân thủ PCCC và thanh toán đúng hạn quy định.',
  },
  {
    num: 9,
    title: 'Điều 9: Chấm dứt hợp đồng & hoàn trả cọc',
    desc: 'Nghĩa vụ thông báo trước 30 ngày và thời hạn chủ nhà hoàn trả 100% tiền cọc trong vòng 15 ngày.',
  },
  {
    num: 10,
    title: 'Điều 10: Phạt vi phạm & bồi thường thiệt hại',
    desc: 'Tỷ lệ phạt vi phạm hợp đồng và nguyên tắc đền bù khi làm hư hại trang thiết bị nội thất.',
  },
  {
    num: 11,
    title: 'Điều 11: Phương thức giải quyết tranh chấp',
    desc: 'Ưu tiên hòa giải thương lượng; trường hợp không đạt thỏa thuận sẽ khởi kiện tại Tòa án nhân dân có thẩm quyền.',
  },
  {
    num: 12,
    title: 'Điều 12: Hiệu lực thi hành & chữ ký số',
    desc: 'Giá trị pháp lý của hợp đồng số, cấp grant ký điện tử và lưu trữ toàn vẹn trên Hyperledger Fabric.',
  },
]

const NEXT_STEPS_TIMELINE = [
  {
    step: 1,
    title: 'Hồ sơ đã được gửi',
    desc: 'Yêu cầu thuê đã được tiếp nhận an toàn trên hệ thống TH-PropTech.',
    icon: CheckCircle2,
    status: 'completed',
  },
  {
    step: 2,
    title: 'Chủ nhà xét duyệt',
    desc: 'Chủ nhà đối chiếu thông tin và phản hồi phê duyệt trong vòng 24 - 48 giờ.',
    icon: UserCheck,
    status: 'current',
  },
  {
    step: 3,
    title: 'Ký hợp đồng & Nhận nhà',
    desc: 'Hai bên thẩm định dự thảo hợp đồng điện tử, hoàn tất ký số bảo mật và nhận bàn giao căn hộ.',
    icon: FileSignature,
    status: 'upcoming',
  },
]

export function ApplyStepSubmitted({
  application,
  apartmentId,
  propertyTitle,
}: ApplyStepSubmittedProps): React.ReactElement {
  const [copied, setCopied] = React.useState(false)

  const snapshot = application.packageSnapshot
  const durationMonths = snapshot?.durationMonths ?? 12
  const monthlyRent = snapshot?.monthlyRent ?? 0
  const deposit = snapshot?.resolvedDepositAmount ?? 0
  const subtotalEstimate = monthlyRent * durationMonths
  const handoff =
    application.contractHandoff ??
    ({
      state:
        application.status === 'accepted'
          ? application.provisioningStatus === 'failed'
            ? 'failed'
            : application.contractId
              ? 'ready'
              : 'provisioning'
          : application.status === 'rejected'
            ? 'rejected'
            : 'pending',
      contractId: application.contractId ?? null,
      href: application.contractId
        ? `/contracts/${application.contractId}`
        : null,
      reasonCode: application.provisioningErrorCode ?? null,
    } as const)
  const isContractReady = handoff.state === 'ready' && Boolean(handoff.href)
  const executionPolicy = application.executionPolicySnapshot
  const executionPolicyLabel =
    executionPolicy?.strategy === 'DEPOSIT_FIRST'
      ? 'Cọc trước, sau đó ký hợp đồng'
      : 'Ký hợp đồng trước, sau đó thanh toán cọc'

  const formattedMoveIn = React.useMemo(() => {
    try {
      return new Date(application.moveInDate).toLocaleDateString('vi-VN')
    } catch {
      return application.moveInDate
    }
  }, [application.moveInDate])

  const referenceCode = `#HS-${(application._id || '').slice(-6).toUpperCase()}`

  const handleCopyId = async (): Promise<void> => {
    try {
      if (typeof navigator !== 'undefined' && navigator.clipboard?.writeText) {
        await navigator.clipboard.writeText(application._id)
      }
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch (e) {
      console.error(e)
    }
  }

  return (
    <div data-testid="apply-step-submitted" className="space-y-6">
      {/* 1. Success Hero Receipt Banner */}
      <section className="rounded-3xl border border-success/30 bg-success-soft/25 p-6 text-center shadow-sm sm:p-8">
        <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-success text-on-control shadow-sm">
          <CheckCircle2 aria-hidden="true" className="h-8 w-8" />
        </div>
        <h2 className="mt-3 font-display text-xl font-bold text-fg sm:text-2xl">
          {isContractReady
            ? 'Hợp đồng thuê đã sẵn sàng để xem và ký'
            : application.status === 'accepted'
              ? 'Hồ sơ thuê đã được chấp thuận'
              : 'Hồ sơ đặt thuê đã được gửi thành công'}
        </h2>
        <p className="mx-auto mt-1.5 max-w-lg text-xs leading-relaxed text-muted">
          {isContractReady
            ? 'Hãy mở bản hợp đồng chính thức để kiểm tra nội dung và hoàn tất ký số SmartCA.'
            : application.status === 'accepted'
              ? 'Chủ nhà đã chấp thuận hồ sơ. Hệ thống đang chuẩn bị bản hợp đồng điện tử.'
              : 'Yêu cầu thuê căn hộ của bạn đã được ghi nhận. Chủ nhà sẽ nhận được thông báo ngay để xét duyệt.'}
        </p>

        <div className="mt-4 inline-flex flex-wrap items-center justify-center gap-2.5 rounded-full border border-border bg-surface px-4 py-1.5 text-xs text-muted shadow-sm">
          <span>Mã hồ sơ:</span>
          <strong
            data-testid="application-reference-code"
            className="font-mono text-fg"
          >
            {referenceCode}
          </strong>
          <button
            type="button"
            onClick={() => void handleCopyId()}
            aria-label="Sao chép mã hồ sơ"
            className="inline-flex items-center gap-1 rounded-md bg-surface-muted px-1.5 py-0.5 text-[10px] text-muted hover:text-fg transition"
          >
            {copied ? (
              <>
                <Check className="h-3 w-3 text-success" />
                <span className="text-success">Đã sao chép</span>
              </>
            ) : (
              <>
                <Copy className="h-3 w-3" />
                <span>Sao chép</span>
              </>
            )}
          </button>
          <span className="h-3 w-px bg-border hidden sm:block" />
          <span className="inline-flex items-center gap-1 font-medium text-warning">
            <Clock aria-hidden="true" className="h-3.5 w-3.5" />
            {handoff.state === 'ready'
              ? 'Hợp đồng đã sẵn sàng'
              : handoff.state === 'failed'
                ? 'Cần thử lại provisioning'
                : application.status === 'accepted'
                  ? 'Đang chuẩn bị hợp đồng'
                  : 'Đang chờ chủ nhà phản hồi'}
          </span>
        </div>
      </section>

      {executionPolicy ? (
        <section
          data-testid="submitted-execution-policy"
          className="flex items-start gap-3 rounded-2xl border border-primary/25 bg-primary-soft/10 p-5"
        >
          <Landmark
            aria-hidden="true"
            className="mt-0.5 h-5 w-5 shrink-0 text-primary"
          />
          <div className="space-y-1.5 text-xs">
            <h3 className="font-bold uppercase tracking-wider text-fg">
              Trình tự thực hiện đã được chụp
            </h3>
            <p className="font-semibold text-primary">{executionPolicyLabel}</p>
            <p className="leading-relaxed text-muted">
              {executionPolicy.strategy === 'DEPOSIT_FIRST'
                ? 'Hồ sơ sẽ chuyển sang ký SmartCA sau khi khoản cọc được xác nhận.'
                : 'Hai bên có thể ký SmartCA trước; hợp đồng sẽ chờ xác nhận cọc để kích hoạt.'}
            </p>
          </div>
        </section>
      ) : null}

      {/* 2. Process Roadmap Timeline */}
      <section className="space-y-3 rounded-2xl border border-border bg-surface p-5 shadow-sm">
        <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-primary">
          <FileCheck aria-hidden="true" className="h-4 w-4" />
          <span>Lộ trình tiếp theo từ hồ sơ đến nhận nhà</span>
        </div>

        <div className="grid gap-3 sm:grid-cols-3">
          {NEXT_STEPS_TIMELINE.map(item => {
            const Icon = item.icon
            const isCompleted = item.status === 'completed'
            const isCurrent = item.status === 'current'

            return (
              <div
                key={item.step}
                className={`relative flex flex-col justify-between rounded-xl border p-3.5 transition-all ${
                  isCompleted
                    ? 'border-success/30 bg-success-soft/20'
                    : isCurrent
                      ? 'border-primary/40 bg-primary-soft/15 shadow-sm'
                      : 'border-border bg-surface-muted/20 opacity-75'
                }`}
              >
                <div>
                  <div className="flex items-center justify-between">
                    <div
                      className={`flex h-6 w-6 items-center justify-center rounded-full text-xs font-bold ${
                        isCompleted
                          ? 'bg-success text-on-control'
                          : isCurrent
                            ? 'bg-primary text-on-control'
                            : 'bg-surface text-subtle border border-border'
                      }`}
                    >
                      {isCompleted ? (
                        <CheckCircle2
                          aria-hidden="true"
                          className="h-3.5 w-3.5"
                        />
                      ) : (
                        item.step
                      )}
                    </div>
                    <Icon
                      aria-hidden="true"
                      className={`h-3.5 w-3.5 ${
                        isCompleted
                          ? 'text-success'
                          : isCurrent
                            ? 'text-primary'
                            : 'text-subtle'
                      }`}
                    />
                  </div>
                  <p className="mt-2 font-display text-xs font-bold text-fg">
                    {item.title}
                  </p>
                  <p className="mt-0.5 text-[11px] leading-relaxed text-muted">
                    {item.desc}
                  </p>
                </div>
              </div>
            )
          })}
        </div>
      </section>

      {/* 3. Snapshot Summary Card */}
      <section className="space-y-3 rounded-2xl border border-border bg-surface p-5 shadow-sm">
        <div className="flex items-center justify-between border-b border-border/80 pb-3">
          <div>
            <span className="text-[11px] font-semibold uppercase tracking-wider text-muted">
              Tóm tắt thông số yêu cầu thuê
            </span>
            <p className="font-display text-base font-bold text-fg">
              {propertyTitle || 'Căn hộ chung cư'}
            </p>
          </div>
          <span className="rounded-full bg-primary-soft px-3 py-0.5 text-xs font-semibold text-primary">
            Kỳ hạn: {durationMonths} tháng
          </span>
        </div>

        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          <div className="flex items-start gap-2.5 rounded-xl border border-border/70 bg-surface-muted/30 p-3 text-xs">
            <Calendar
              aria-hidden="true"
              className="mt-0.5 h-3.5 w-3.5 text-primary shrink-0"
            />
            <div>
              <span className="text-muted">Ngày vào ở dự kiến:</span>
              <p className="font-semibold text-fg">{formattedMoveIn}</p>
            </div>
          </div>

          <div className="flex items-start gap-2.5 rounded-xl border border-border/70 bg-surface-muted/30 p-3 text-xs">
            <Users
              aria-hidden="true"
              className="mt-0.5 h-3.5 w-3.5 text-primary shrink-0"
            />
            <div>
              <span className="text-muted">Số lượng người ở:</span>
              <p className="font-semibold text-fg">
                {application.occupants} người
              </p>
            </div>
          </div>

          <div className="flex items-start gap-2.5 rounded-xl border border-border/70 bg-surface-muted/30 p-3 text-xs">
            <Coins
              aria-hidden="true"
              className="mt-0.5 h-3.5 w-3.5 text-accent shrink-0"
            />
            <div>
              <span className="text-muted">Tiền thuê hàng tháng:</span>
              <p className="font-semibold text-fg">
                {formatVnd(monthlyRent)} ₫/tháng
              </p>
            </div>
          </div>

          <div className="flex items-start gap-2.5 rounded-xl border border-border/70 bg-surface-muted/30 p-3 text-xs">
            <Shield
              aria-hidden="true"
              className="mt-0.5 h-3.5 w-3.5 text-success shrink-0"
            />
            <div>
              <span className="text-muted">Tiền đặt cọc bảo đảm:</span>
              <p className="font-semibold text-fg">{formatVnd(deposit)} ₫</p>
            </div>
          </div>
        </div>

        {monthlyRent > 0 ? (
          <div className="flex items-center justify-between rounded-xl bg-surface-muted px-3.5 py-2.5 text-xs text-muted">
            <span>Tổng giá trị tiền thuê ước tính toàn kỳ hạn:</span>
            <strong className="font-display text-sm font-bold text-fg">
              {formatVnd(subtotalEstimate)} ₫
            </strong>
          </div>
        ) : null}
      </section>

      {/* 4. Collapsible Statutory Legal Reference (Decree 96/2024/ND-CP Appendix II) */}
      <section className="rounded-2xl border border-border bg-surface p-5 shadow-sm">
        <Accordion type="single" collapsible className="w-full">
          <AccordionItem value="decree-framework" className="border-none">
            <AccordionTrigger className="text-left font-display text-sm font-bold text-fg hover:no-underline py-1">
              <div className="flex items-center gap-2">
                <Scale aria-hidden="true" className="h-4 w-4 text-primary" />
                <span>
                  12 Điều khoản chuẩn theo Phụ lục II Nghị định 96/2024/NĐ-CP
                </span>
              </div>
            </AccordionTrigger>
            <AccordionContent className="pt-3">
              <p className="text-xs leading-relaxed text-muted mb-3">
                Bản hợp đồng số chính thức sẽ được tạo lập dựa trên 12 điều
                khoản pháp lý tiêu chuẩn dưới đây khi chủ nhà phê duyệt hồ sơ:
              </p>

              <div className="grid gap-2.5 sm:grid-cols-2">
                {DECREE_96_ARTICLES.map(item => (
                  <div
                    key={item.num}
                    className="flex items-start gap-2.5 rounded-xl border border-border/80 bg-surface-muted/30 p-3 text-xs"
                  >
                    <div className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-primary/10 text-[11px] font-bold text-primary">
                      {item.num}
                    </div>
                    <div className="space-y-0.5">
                      <p className="font-semibold text-fg">{item.title}</p>
                      <p className="text-[11px] leading-relaxed text-muted">
                        {item.desc}
                      </p>
                    </div>
                  </div>
                ))}
              </div>

              {/* Blockchain Integrity Boundary Notice */}
              <div className="mt-3.5 flex items-start gap-2.5 rounded-xl border border-border bg-surface-muted/50 p-3 text-xs text-muted">
                <Info
                  aria-hidden="true"
                  className="mt-0.5 h-4 w-4 shrink-0 text-primary"
                />
                <p className="leading-relaxed text-[11px]">
                  <strong>Ghi nhận sổ cái Hyperledger Fabric:</strong> Toàn bộ
                  dữ liệu hồ sơ được mã hóa an toàn. Khi hợp đồng được kích hoạt
                  sau khi hai bên ký số, bản ghi toàn vẹn sẽ được lưu trữ bất
                  biến trên sổ cái blockchain.
                </p>
              </div>
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </section>

      {/* 5. Navigation CTAs */}
      <div className="flex flex-col-reverse gap-3 border-t border-border/80 pt-4 sm:flex-row sm:items-center sm:justify-between">
        <Button
          asChild
          variant="outline"
          className="flex items-center justify-center gap-2 border-border text-xs"
        >
          <Link href={`/properties/${apartmentId}` as Route}>
            <Home aria-hidden="true" className="h-3.5 w-3.5" />
            <span>Quay lại chi tiết căn hộ</span>
          </Link>
        </Button>

        {isContractReady && handoff.href ? (
          <Button
            asChild
            className="flex items-center justify-center gap-2 bg-control px-6 py-2 text-xs font-semibold text-on-control shadow-sm hover:opacity-90"
          >
            <Link href={handoff.href as Route}>
              <FileSignature aria-hidden="true" className="h-3.5 w-3.5" />
              <span>Xem hợp đồng số</span>
              <ArrowRight aria-hidden="true" className="h-3.5 w-3.5" />
            </Link>
          </Button>
        ) : (
          <Button
            asChild
            className="flex items-center justify-center gap-2 bg-control px-6 py-2 text-xs font-semibold text-on-control shadow-sm hover:opacity-90"
          >
            <Link href={'/rental-applications' as Route}>
              <span>Theo dõi tiến trình hồ sơ của tôi</span>
              <ArrowRight aria-hidden="true" className="h-3.5 w-3.5" />
            </Link>
          </Button>
        )}
      </div>
    </div>
  )
}
