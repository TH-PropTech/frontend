'use client'

import * as React from 'react'
import Link from 'next/link'
import type { Route } from 'next'
import {
  ArrowRight,
  Calendar,
  CheckCircle2,
  Clock,
  Coins,
  FileCheck,
  FileSignature,
  Home,
  Info,
  Scale,
  Shield,
  ShieldCheck,
  UserCheck,
  Users,
} from 'lucide-react'
import { Button } from '@/shared/ui/button'
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
    desc: 'Yêu cầu thuê đã được lưu trữ an toàn trong cơ sở dữ liệu hệ thống.',
    icon: CheckCircle2,
    status: 'completed',
  },
  {
    step: 2,
    title: 'Chủ nhà xét duyệt',
    desc: 'Chủ nhà sẽ đối chiếu thông tin và phản hồi phê duyệt trong vòng 24 - 48 giờ.',
    icon: UserCheck,
    status: 'current',
  },
  {
    step: 3,
    title: 'Khởi tạo & Ký số hợp đồng',
    desc: 'Hệ thống tự động lập hợp đồng số theo Phụ lục II NĐ 96/2024 để hai bên xem xét và ký số qua VNPT SmartCA.',
    icon: FileSignature,
    status: 'upcoming',
  },
  {
    step: 4,
    title: 'Đăng ký tạm trú trực tuyến',
    desc: 'Sử dụng hợp đồng số đã kích hoạt để đăng ký tạm trú theo thủ tục Dịch vụ công 1.004194.',
    icon: ShieldCheck,
    status: 'upcoming',
  },
]

export function ApplyStepSubmitted({
  application,
  apartmentId,
  propertyTitle,
}: ApplyStepSubmittedProps): React.ReactElement {
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

  const formattedMoveIn = React.useMemo(() => {
    try {
      return new Date(application.moveInDate).toLocaleDateString('vi-VN')
    } catch {
      return application.moveInDate
    }
  }, [application.moveInDate])

  return (
    <div data-testid="apply-step-submitted" className="space-y-8">
      {/* 1. Success Hero Banner */}
      <section className="rounded-3xl border border-success/30 bg-success-soft/30 p-8 text-center shadow-sm">
        <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-success text-on-control shadow-md">
          <CheckCircle2 aria-hidden="true" className="h-9 w-9" />
        </div>
        <h2 className="mt-4 font-display text-2xl font-bold text-fg sm:text-3xl">
          {isContractReady
            ? 'Hợp đồng thuê đã sẵn sàng để xem và ký'
            : application.status === 'accepted'
              ? 'Hồ sơ thuê đã được chấp thuận'
              : 'Hồ sơ đặt thuê đã được gửi thành công'}
        </h2>
        <p className="mx-auto mt-2 max-w-lg text-sm text-muted">
          {isContractReady
            ? 'Hãy mở bản hợp đồng chính thức để kiểm tra nội dung và hoàn tất ký SmartCA.'
            : application.status === 'accepted'
              ? 'Chủ nhà đã chấp thuận. Hệ thống đang chuẩn bị hợp đồng và thỏa thuận cọc.'
              : 'Yêu cầu thuê căn hộ của bạn đã được ghi nhận. Hợp đồng chính thức chỉ được tạo sau khi chủ nhà phê duyệt.'}
        </p>
        <div className="mt-5 inline-flex flex-wrap items-center justify-center gap-3 rounded-full border border-border bg-surface px-5 py-2 text-xs text-muted shadow-sm">
          <span>Mã định danh hồ sơ:</span>
          <strong className="font-mono text-fg">{application._id}</strong>
          <span className="h-3 w-px bg-border hidden sm:block" />
          <span className="inline-flex items-center gap-1 font-semibold text-warning">
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

      {/* 2. Process Roadmap Timeline */}
      <section className="space-y-4 rounded-3xl border border-border bg-surface p-6 shadow-sm sm:p-7">
        <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-primary">
          <FileCheck aria-hidden="true" className="h-4 w-4" />
          <span>Lộ trình xử lý hồ sơ tiếp theo</span>
        </div>
        <h3 className="font-display text-base font-bold text-fg">
          Các giai đoạn từ hồ sơ đến khi nhận nhà
        </h3>

        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {NEXT_STEPS_TIMELINE.map(item => {
            const Icon = item.icon
            const isCompleted = item.status === 'completed'
            const isCurrent = item.status === 'current'

            return (
              <div
                key={item.step}
                className={`relative flex flex-col justify-between rounded-2xl border p-4.5 transition-all ${
                  isCompleted
                    ? 'border-success/40 bg-success-soft/30'
                    : isCurrent
                      ? 'border-primary/50 bg-primary-soft/20 shadow-sm'
                      : 'border-border bg-surface-muted/30 opacity-75'
                }`}
              >
                <div>
                  <div className="flex items-center justify-between">
                    <div
                      className={`flex h-7 w-7 items-center justify-center rounded-full text-xs font-bold ${
                        isCompleted
                          ? 'bg-success text-on-control'
                          : isCurrent
                            ? 'bg-primary text-on-control'
                            : 'bg-surface text-subtle border border-border'
                      }`}
                    >
                      {isCompleted ? (
                        <CheckCircle2 aria-hidden="true" className="h-4 w-4" />
                      ) : (
                        item.step
                      )}
                    </div>
                    <Icon
                      aria-hidden="true"
                      className={`h-4 w-4 ${
                        isCompleted
                          ? 'text-success'
                          : isCurrent
                            ? 'text-primary'
                            : 'text-subtle'
                      }`}
                    />
                  </div>
                  <p className="mt-3 font-display text-xs font-bold text-fg">
                    {item.title}
                  </p>
                  <p className="mt-1 text-[11px] leading-relaxed text-muted">
                    {item.desc}
                  </p>
                </div>
              </div>
            )
          })}
        </div>
      </section>

      {/* 3. Snapshot Summary Card */}
      <section className="space-y-4 rounded-3xl border border-border bg-surface p-6 shadow-sm sm:p-7">
        <div className="flex items-center justify-between border-b border-border/80 pb-4">
          <div>
            <span className="text-xs font-semibold uppercase tracking-wider text-muted">
              Tóm tắt thông số yêu cầu thuê
            </span>
            <p className="font-display text-lg font-bold text-fg">
              {propertyTitle || 'Căn hộ chung cư'}
            </p>
          </div>
          <span className="rounded-full bg-primary-soft px-3.5 py-1 text-xs font-semibold text-primary">
            Kỳ hạn: {durationMonths} tháng
          </span>
        </div>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <div className="flex items-start gap-3 rounded-2xl border border-border/70 bg-surface-muted/30 p-3.5">
            <Calendar
              aria-hidden="true"
              className="mt-0.5 h-4 w-4 text-primary"
            />
            <div className="text-xs">
              <span className="text-muted">Ngày vào ở dự kiến:</span>
              <p className="font-semibold text-fg">{formattedMoveIn}</p>
            </div>
          </div>

          <div className="flex items-start gap-3 rounded-2xl border border-border/70 bg-surface-muted/30 p-3.5">
            <Users aria-hidden="true" className="mt-0.5 h-4 w-4 text-primary" />
            <div className="text-xs">
              <span className="text-muted">Số lượng người ở:</span>
              <p className="font-semibold text-fg">
                {application.occupants} người
              </p>
            </div>
          </div>

          <div className="flex items-start gap-3 rounded-2xl border border-border/70 bg-surface-muted/30 p-3.5">
            <Coins aria-hidden="true" className="mt-0.5 h-4 w-4 text-accent" />
            <div className="text-xs">
              <span className="text-muted">Tiền thuê hàng tháng:</span>
              <p className="font-semibold text-fg">
                {formatVnd(monthlyRent)} ₫/tháng
              </p>
            </div>
          </div>

          <div className="flex items-start gap-3 rounded-2xl border border-border/70 bg-surface-muted/30 p-3.5">
            <Shield
              aria-hidden="true"
              className="mt-0.5 h-4 w-4 text-success"
            />
            <div className="text-xs">
              <span className="text-muted">Tiền đặt cọc bảo đảm:</span>
              <p className="font-semibold text-fg">{formatVnd(deposit)} ₫</p>
            </div>
          </div>
        </div>

        {monthlyRent > 0 ? (
          <div className="flex items-center justify-between rounded-xl bg-surface-muted px-4 py-3 text-xs text-muted">
            <span>Tổng giá trị tiền thuê ước tính toàn kỳ hạn:</span>
            <strong className="font-display text-sm font-bold text-fg">
              {formatVnd(subtotalEstimate)} ₫
            </strong>
          </div>
        ) : null}
      </section>

      {/* 4. 12-Article Legal Reference Framework (Decree 96/2024/ND-CP Appendix II) */}
      <section className="space-y-4 rounded-3xl border border-border bg-surface p-6 shadow-sm sm:p-7">
        <div className="flex flex-col gap-1 sm:flex-row sm:items-center sm:justify-between border-b border-border/80 pb-4">
          <div className="space-y-1">
            <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-primary">
              <Scale aria-hidden="true" className="h-4 w-4" />
              <span>Khung tham chiếu hợp đồng số</span>
            </div>
            <h3 className="font-display text-base font-bold text-fg">
              12 Điều khoản chuẩn theo Phụ lục II Nghị định 96/2024/NĐ-CP
            </h3>
          </div>
          <span className="rounded-full border border-border bg-surface-muted px-3 py-1 text-xs font-mono text-muted">
            Chuẩn mẫu pháp lý
          </span>
        </div>

        <p className="text-xs leading-relaxed text-muted">
          Bản hợp đồng số chính thức sẽ được lập dựa trên 12 điều khoản pháp lý
          tiêu chuẩn dưới đây. Khi chủ nhà phê duyệt hồ sơ, bạn sẽ được mời vào
          phòng ký số để thẩm định và hoàn tất chữ ký điện tử:
        </p>

        <div className="grid gap-3 sm:grid-cols-2">
          {DECREE_96_ARTICLES.map(item => (
            <div
              key={item.num}
              className="flex items-start gap-3 rounded-2xl border border-border/80 bg-surface-muted/40 p-3.5 text-xs"
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
        <div className="flex items-start gap-3 rounded-2xl border border-border bg-surface-muted/60 p-4 text-xs text-muted">
          <Info
            aria-hidden="true"
            className="mt-0.5 h-4 w-4 shrink-0 text-primary"
          />
          <p className="leading-relaxed">
            <strong>Ghi nhận sổ cái Hyperledger Fabric:</strong> Ở giai đoạn nộp
            hồ sơ ứng tuyển, dữ liệu được bảo mật ngoài chuỗi (off-chain). Khi
            chủ nhà phê duyệt và hai bên hoàn tất ký số sinh trắc học, mã băm
            toàn vẹn của hợp đồng và snapshot cam kết mới được neo vĩnh viễn lên
            blockchain.
          </p>
        </div>
      </section>

      {/* 5. Navigation CTAs */}
      <div className="flex flex-col-reverse gap-3 border-t border-border/80 pt-5 sm:flex-row sm:items-center sm:justify-between">
        <Button
          asChild
          variant="outline"
          className="flex items-center justify-center gap-2 border-border"
        >
          <Link href={`/properties/${apartmentId}` as Route}>
            <Home aria-hidden="true" className="h-4 w-4" />
            <span>Quay lại chi tiết căn hộ</span>
          </Link>
        </Button>

        {isContractReady && handoff.href ? (
          <Button
            asChild
            className="flex items-center justify-center gap-2 bg-control px-6 py-2.5 text-sm font-semibold text-on-control shadow-sm hover:opacity-90"
          >
            <Link href={handoff.href as Route}>
              <FileSignature aria-hidden="true" className="h-4 w-4" />
              <span>Xem hợp đồng số</span>
              <ArrowRight aria-hidden="true" className="h-4 w-4" />
            </Link>
          </Button>
        ) : (
          <Button
            asChild
            className="flex items-center justify-center gap-2 bg-control px-6 py-2.5 text-sm font-semibold text-on-control shadow-sm hover:opacity-90"
          >
            <Link href={'/rental-applications' as Route}>
              <span>Theo dõi tiến trình hồ sơ của tôi</span>
              <ArrowRight aria-hidden="true" className="h-4 w-4" />
            </Link>
          </Button>
        )}
      </div>
    </div>
  )
}
