'use client'

import * as React from 'react'
import Link from 'next/link'
import type { Route } from 'next'
import { useQuery } from '@tanstack/react-query'
import {
  AlertCircle,
  ArrowLeft,
  ArrowRight,
  BadgeCheck,
  Calendar,
  Coins,
  FileSignature,
  Home,
  Landmark,
  RotateCcw,
  Shield,
  ShieldCheck,
  Users,
} from 'lucide-react'
import { Button } from '@/shared/ui/button'
import { getMyRentalApplicationById } from '../api/rental-application-api'

interface ContractInvitePanelProps {
  applicationId: string
}

function formatVnd(amount: number): string {
  return new Intl.NumberFormat('vi-VN').format(amount)
}

const SIGNING_STEPS = [
  {
    num: 1,
    title: 'Đọc & đối soát hợp đồng',
    desc: 'Kiểm tra kỹ 12 điều khoản pháp lý theo Nghị định 96/2024/NĐ-CP trước khi ký.',
    icon: FileSignature,
  },
  {
    num: 2,
    title: 'Xác thực sinh trắc học',
    desc: 'Hệ thống xác minh danh tính qua eKYC để đảm bảo tính pháp lý của chữ ký.',
    icon: BadgeCheck,
  },
  {
    num: 3,
    title: 'Ký số SmartCA',
    desc: 'Ký điện tử an toàn — hợp đồng được lưu bất biến trên Hyperledger Fabric.',
    icon: ShieldCheck,
  },
]

export function ContractInvitePanel({
  applicationId,
}: ContractInvitePanelProps): React.ReactElement {
  const {
    data: application,
    isLoading,
    isError,
    refetch,
  } = useQuery({
    queryKey: ['rental-application', applicationId],
    queryFn: () => getMyRentalApplicationById(applicationId),
  })

  if (isLoading) {
    return (
      <div
        data-testid="contract-invite-loading"
        className="mx-auto max-w-3xl space-y-4 px-4 py-12"
      >
        <div className="h-6 w-1/3 animate-pulse rounded-lg bg-surface-muted" />
        <div className="h-48 animate-pulse rounded-3xl bg-surface-muted" />
        <div className="h-32 animate-pulse rounded-2xl bg-surface-muted" />
      </div>
    )
  }

  if (isError || !application) {
    return (
      <div
        data-testid="contract-invite-error"
        className="mx-auto max-w-3xl px-4 py-12"
      >
        <div className="rounded-3xl border border-danger/30 bg-danger-soft p-8">
          <div className="flex items-center gap-3">
            <AlertCircle className="h-6 w-6 text-danger" aria-hidden="true" />
            <p className="font-semibold text-danger">
              Không tải được thông tin hồ sơ.
            </p>
          </div>
          <Button
            size="sm"
            variant="outline"
            className="mt-4 border-danger/40"
            onClick={() => void refetch()}
          >
            <RotateCcw className="h-3.5 w-3.5" aria-hidden="true" />
            Thử lại
          </Button>
        </div>
      </div>
    )
  }

  const snapshot = application.packageSnapshot
  const durationMonths = snapshot?.durationMonths ?? 12
  const monthlyRent = snapshot?.monthlyRent ?? 0
  const deposit = snapshot?.resolvedDepositAmount ?? 0
  const totalEstimate = monthlyRent * durationMonths

  const executionPolicy = application.executionPolicySnapshot
  const executionPolicyLabel = 'Ký hợp đồng → Thanh toán cọc'

  const handoff = application.contractHandoff
  const contractHref =
    handoff?.href ??
    (application.contractId ? `/contracts/${application.contractId}` : null)

  const formattedMoveIn = (() => {
    try {
      return new Date(application.moveInDate).toLocaleDateString('vi-VN')
    } catch {
      return application.moveInDate
    }
  })()

  const referenceCode = `#HS-${applicationId.slice(-6).toUpperCase()}`

  return (
    <div
      data-testid="contract-invite-panel"
      className="mx-auto max-w-6xl space-y-6 px-4 py-8 sm:px-6"
    >
      {/* Breadcrumb */}
      <nav
        aria-label="Điều hướng"
        className="flex items-center gap-2 text-xs text-muted"
      >
        <Link
          href={'/rental-applications' as Route}
          className="inline-flex items-center gap-1.5 font-semibold transition hover:text-primary"
        >
          <ArrowLeft className="h-3.5 w-3.5" aria-hidden="true" />
          Hồ sơ của tôi
        </Link>
        <span className="text-subtle">/</span>
        <span className="font-semibold text-fg">Đề nghị ký hợp đồng</span>
      </nav>

      {/* Hero Banner */}
      <section
        data-testid="contract-invite-hero"
        className="rounded-3xl border border-success/30 bg-success-soft/20 p-8 text-center shadow-sm"
      >
        <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-success text-on-control shadow-md">
          <BadgeCheck className="h-9 w-9" aria-hidden="true" />
        </div>
        <h1 className="mt-4 font-display text-2xl font-bold tracking-tight text-fg sm:text-3xl">
          Chủ nhà đã chấp thuận hồ sơ của bạn!
        </h1>
        <p className="mx-auto mt-2 max-w-lg text-sm leading-relaxed text-muted">
          Hợp đồng thuê căn hộ đã được lập và sẵn sàng để bạn đọc, xác nhận và
          ký số. Vui lòng hoàn tất trong thời gian sớm nhất.
        </p>
        <div className="mt-4 inline-flex items-center gap-2 rounded-full border border-border bg-surface px-4 py-1.5 text-xs text-muted shadow-sm">
          <span>Mã hồ sơ:</span>
          <strong className="font-mono text-fg">{referenceCode}</strong>
        </div>
      </section>

      {/* Signing Steps */}
      <section className="rounded-2xl border border-border bg-surface p-5 shadow-sm">
        <div className="mb-4 flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-primary">
          <FileSignature className="h-4 w-4" aria-hidden="true" />
          <span>Quy trình ký hợp đồng (3 bước)</span>
        </div>
        <ol className="grid gap-3 sm:grid-cols-3">
          {SIGNING_STEPS.map(item => {
            const Icon = item.icon
            return (
              <li
                key={item.num}
                className="flex flex-col gap-2 rounded-xl border border-border/70 bg-surface-muted/30 p-3.5"
              >
                <div className="flex items-center justify-between">
                  <div className="flex h-6 w-6 items-center justify-center rounded-full bg-primary text-[11px] font-bold text-on-control">
                    {item.num}
                  </div>
                  <Icon className="h-4 w-4 text-primary" aria-hidden="true" />
                </div>
                <p className="font-display text-xs font-bold text-fg">
                  {item.title}
                </p>
                <p className="text-[11px] leading-relaxed text-muted">
                  {item.desc}
                </p>
              </li>
            )
          })}
        </ol>
      </section>

      {/* Contract Summary */}
      <section className="space-y-3 rounded-2xl border border-border bg-surface p-5 shadow-sm">
        <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-primary">
          <Landmark className="h-4 w-4" aria-hidden="true" />
          <span>Tóm tắt thông số hợp đồng</span>
        </div>

        <div className="grid gap-3 sm:grid-cols-2">
          <div className="flex items-start gap-2.5 rounded-xl border border-border/70 bg-surface-muted/30 p-3 text-xs">
            <Calendar
              className="mt-0.5 h-3.5 w-3.5 shrink-0 text-primary"
              aria-hidden="true"
            />
            <div>
              <span className="text-muted">Ngày vào ở dự kiến:</span>
              <p className="font-semibold text-fg">{formattedMoveIn}</p>
            </div>
          </div>

          <div className="flex items-start gap-2.5 rounded-xl border border-border/70 bg-surface-muted/30 p-3 text-xs">
            <Users
              className="mt-0.5 h-3.5 w-3.5 shrink-0 text-primary"
              aria-hidden="true"
            />
            <div>
              <span className="text-muted">Số người ở:</span>
              <p className="font-semibold text-fg">
                {application.occupants} người
              </p>
            </div>
          </div>

          <div className="flex items-start gap-2.5 rounded-xl border border-border/70 bg-surface-muted/30 p-3 text-xs">
            <Coins
              className="mt-0.5 h-3.5 w-3.5 shrink-0 text-accent"
              aria-hidden="true"
            />
            <div>
              <span className="text-muted">Tiền thuê hàng tháng:</span>
              <p className="font-semibold text-fg">
                {monthlyRent > 0
                  ? `${formatVnd(monthlyRent)} ₫/tháng`
                  : 'Theo hợp đồng'}
              </p>
            </div>
          </div>

          <div className="flex items-start gap-2.5 rounded-xl border border-border/70 bg-surface-muted/30 p-3 text-xs">
            <Shield
              className="mt-0.5 h-3.5 w-3.5 shrink-0 text-success"
              aria-hidden="true"
            />
            <div>
              <span className="text-muted">Tiền đặt cọc:</span>
              <p className="font-semibold text-fg">
                {deposit > 0 ? `${formatVnd(deposit)} ₫` : 'Theo hợp đồng'}
              </p>
            </div>
          </div>
        </div>

        {monthlyRent > 0 && (
          <div className="flex items-center justify-between rounded-xl bg-surface-muted px-3.5 py-2.5 text-xs">
            <span className="text-muted">
              Tổng giá trị hợp đồng ({durationMonths} tháng):
            </span>
            <strong className="font-display text-sm font-bold text-primary">
              {formatVnd(totalEstimate)} ₫
            </strong>
          </div>
        )}

        {executionPolicy && (
          <div className="flex items-start gap-2.5 rounded-xl border border-primary/25 bg-primary-soft/10 p-3 text-xs">
            <Landmark
              className="mt-0.5 h-3.5 w-3.5 shrink-0 text-primary"
              aria-hidden="true"
            />
            <div>
              <span className="font-semibold text-fg">Trình tự thực hiện:</span>
              <p className="mt-0.5 font-medium text-primary">
                {executionPolicyLabel}
              </p>
            </div>
          </div>
        )}
      </section>

      {/* Tenant Protection */}
      <section className="flex items-start gap-3 rounded-2xl border border-success/30 bg-success-soft/15 p-4 text-xs text-muted">
        <ShieldCheck
          className="mt-0.5 h-5 w-5 shrink-0 text-success"
          aria-hidden="true"
        />
        <p className="leading-relaxed">
          <strong className="text-fg">Hợp đồng số được bảo vệ pháp lý:</strong>{' '}
          Sau khi hai bên ký số, toàn bộ nội dung được lưu trữ bất biến trên sổ
          cái Hyperledger Fabric và có hiệu lực theo Nghị định 96/2024/NĐ-CP.
        </p>
      </section>

      {/* CTA */}
      <div className="flex flex-col-reverse gap-3 border-t border-border/80 pt-4 sm:flex-row sm:items-center sm:justify-between">
        <Button
          asChild
          variant="outline"
          className="flex items-center justify-center gap-2 border-border text-xs"
        >
          <Link href={'/rental-applications' as Route}>
            <Home className="h-3.5 w-3.5" aria-hidden="true" />
            Quay lại hồ sơ của tôi
          </Link>
        </Button>

        {contractHref ? (
          <Button
            asChild
            data-testid="go-to-contract-btn"
            className="flex items-center justify-center gap-2 bg-primary px-8 py-2.5 text-sm font-bold text-on-control shadow-md hover:bg-primary-hover"
          >
            <Link href={contractHref as Route}>
              <FileSignature className="h-4 w-4" aria-hidden="true" />
              <span>Mở hợp đồng &amp; Ký số</span>
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </Link>
          </Button>
        ) : (
          <div className="flex items-center gap-2 rounded-xl border border-warning/30 bg-warning-soft/20 px-4 py-2.5 text-xs text-warning">
            <AlertCircle className="h-4 w-4 shrink-0" aria-hidden="true" />
            <span>Hệ thống đang chuẩn bị hợp đồng, vui lòng chờ…</span>
          </div>
        )}
      </div>
    </div>
  )
}
