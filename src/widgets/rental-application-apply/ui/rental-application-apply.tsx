'use client'

import * as React from 'react'
import Link from 'next/link'
import type { Route } from 'next'
import {
  AlertCircle,
  ArrowLeft,
  Building2,
  Calendar,
  CheckCircle2,
  Clock,
  RotateCcw,
  ShieldAlert,
  ShieldCheck,
  Users,
} from 'lucide-react'
import { Button } from '@/shared/ui/button'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/shared/ui/dialog'
import {
  ApplyStepInfo,
  ApplyStepPackage,
  ApplyStepConsent,
  ApplyStepSubmitted,
} from '@/features/rental-application'
import {
  useRentalApplicationFlow,
  type FlowStep,
} from '../model/use-rental-application-flow'

export interface RentalApplicationApplyProps {
  apartmentId: string
}

const STEP_DEFINITIONS: Array<{
  step: FlowStep
  label: string
}> = [
  {
    step: 1,
    label: 'Thông tin người thuê',
  },
  {
    step: 2,
    label: 'Gói thuê & Đặt cọc',
  },
  {
    step: 3,
    label: 'Điều khoản & Cam kết',
  },
  {
    step: 4,
    label: 'Xác nhận hồ sơ',
  },
]

function formatVnd(amount: number): string {
  return new Intl.NumberFormat('vi-VN').format(amount)
}

export function RentalApplicationApply({
  apartmentId,
}: RentalApplicationApplyProps): React.ReactElement {
  const { state, actions } = useRentalApplicationFlow(apartmentId)

  if (state.loadingContext) {
    return (
      <main
        data-testid="rental-application-loading"
        className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8"
      >
        <div className="space-y-6">
          <div className="h-6 w-1/4 animate-pulse rounded bg-surface-muted" />
          <div className="h-12 w-2/3 animate-pulse rounded-2xl bg-surface-muted" />
          <div className="grid gap-8 lg:grid-cols-12">
            <div className="h-96 animate-pulse rounded-3xl bg-surface-muted lg:col-span-8" />
            <div className="h-96 animate-pulse rounded-3xl bg-surface-muted lg:col-span-4" />
          </div>
        </div>
      </main>
    )
  }

  if (state.error && !state.context) {
    return (
      <main
        data-testid="rental-application-context-error"
        className="mx-auto max-w-4xl px-4 py-16 sm:px-6"
      >
        <div className="rounded-3xl border border-danger/30 bg-danger-soft p-8 shadow-sm">
          <div className="flex items-center gap-3">
            <AlertCircle aria-hidden="true" className="h-7 w-7 text-danger" />
            <h1 className="font-display text-xl font-bold text-danger">
              Không thể tải thông tin điều kiện thuê
            </h1>
          </div>
          <p className="mt-3 text-sm text-fg leading-relaxed">{state.error}</p>
          <div className="mt-6 flex items-center gap-3">
            <Button
              type="button"
              onClick={() => void actions.loadContext()}
              className="flex items-center gap-2 bg-control text-on-control shadow-sm"
            >
              <RotateCcw aria-hidden="true" className="h-4 w-4" />
              <span>Thử lại</span>
            </Button>
            <Button asChild variant="outline" className="border-border">
              <Link href={`/properties/${apartmentId}` as Route}>
                <span>Quay lại chi tiết căn hộ</span>
              </Link>
            </Button>
          </div>
        </div>
      </main>
    )
  }

  if (state.context && !state.context.enabled) {
    return (
      <main
        data-testid="rental-application-disabled"
        className="mx-auto max-w-4xl px-4 py-16 sm:px-6"
      >
        <div className="rounded-3xl border border-warning/30 bg-warning-soft p-8 text-center shadow-sm">
          <AlertCircle
            aria-hidden="true"
            className="mx-auto h-10 w-10 text-warning"
          />
          <h1 className="mt-4 font-display text-xl font-bold text-fg">
            Hệ thống đặt thuê đang bảo trì
          </h1>
          <p className="mt-2 text-sm text-muted">
            Luồng tiếp nhận hồ sơ đặt thuê trực tuyến đang tạm tắt để cập nhật.
            Vui lòng liên hệ trực tiếp chủ nhà hoặc quay lại sau.
          </p>
          <div className="mt-6">
            <Button asChild variant="outline" className="border-border">
              <Link href={`/properties/${apartmentId}` as Route}>
                Quay lại chi tiết căn hộ
              </Link>
            </Button>
          </div>
        </div>
      </main>
    )
  }

  if (state.context && !state.context.eligible) {
    return (
      <main
        data-testid="rental-application-ineligible"
        className="mx-auto max-w-4xl px-4 py-16 sm:px-6"
      >
        <div className="rounded-3xl border border-border bg-surface p-8 text-center shadow-sm">
          <ShieldAlert
            aria-hidden="true"
            className="mx-auto h-10 w-10 text-muted"
          />
          <h1 className="mt-4 font-display text-xl font-bold text-fg">
            Chưa đủ điều kiện đăng ký thuê
          </h1>
          <p className="mt-2 text-sm text-muted">
            Căn hộ hiện không sẵn sàng nhận hồ sơ ứng tuyển hoặc bạn đang đăng
            nhập bằng tài khoản chủ sở hữu căn hộ này.
          </p>
          <div className="mt-6">
            <Button asChild variant="outline" className="border-border">
              <Link href={`/properties/${apartmentId}` as Route}>
                Quay lại chi tiết căn hộ
              </Link>
            </Button>
          </div>
        </div>
      </main>
    )
  }

  const listing = state.context?.listing
  const listingTitle = listing?.title || 'Căn hộ chung cư cao cấp'
  const listingAddress = listing?.address || ''
  const apartmentArea = listing?.area || 68

  // Active package details
  const selectedPkg = state.context?.packages.find(
    p => p.packageId === state.selectedPackageId
  )
  const durationMonths = selectedPkg?.durationMonths ?? 12
  const monthlyRent = selectedPkg?.monthlyRent ?? 0
  const deposit = selectedPkg?.resolvedDepositAmount ?? 0
  const totalEstimate = monthlyRent * durationMonths

  return (
    <main
      data-testid="rental-application-apply-page"
      className="mx-auto max-w-7xl px-3.5 py-4 sm:px-6 sm:py-8 lg:px-8"
    >
      {/* Top Header & Breadcrumb */}
      <div className="mb-6 flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
        <nav aria-label="Điều hướng" className="flex items-center gap-2">
          <Link
            href={`/properties/${apartmentId}` as Route}
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-muted transition hover:text-primary"
          >
            <ArrowLeft aria-hidden="true" className="h-3.5 w-3.5" />
            <span>Chi tiết căn hộ</span>
          </Link>
          <span className="text-subtle">/</span>
          <span className="text-xs font-semibold text-fg">Hồ sơ thuê nhà</span>
        </nav>

        <div className="inline-flex items-center gap-1.5 rounded-full border border-border bg-surface px-3 py-1 text-xs text-muted shadow-sm">
          <ShieldCheck
            aria-hidden="true"
            className="h-3.5 w-3.5 text-success"
          />
          <span>Khung hợp đồng chuẩn Nghị định 96/2024/NĐ-CP</span>
        </div>
      </div>

      {/* Main Page Title */}
      <header className="mb-8 space-y-1.5">
        <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-primary">
          <Building2 aria-hidden="true" className="h-4 w-4" />
          <span>Quy trình nộp hồ sơ & xác lập hợp đồng số</span>
        </div>
        <h1 className="font-display text-2xl font-bold tracking-tight text-fg sm:text-3xl lg:text-4xl">
          Đặt thuê: {listingTitle}
        </h1>
        {listingAddress ? (
          <p className="text-sm text-muted">{listingAddress}</p>
        ) : null}
      </header>

      {/* Horizontal Multi-Step Progress Header */}
      <nav
        aria-label="Tiến trình 4 bước hoàn thành hồ sơ"
        className="mb-8 rounded-2xl border border-border bg-surface p-4 sm:px-6 sm:py-4 shadow-sm"
      >
        <ol className="grid grid-cols-2 gap-3 sm:grid-cols-4 sm:gap-4">
          {STEP_DEFINITIONS.map(({ step, label }) => {
            const isCurrent = state.step === step
            const isCompleted = state.step > step

            return (
              <li
                key={step}
                aria-current={isCurrent ? 'step' : undefined}
                className="flex items-center gap-3"
              >
                <div
                  className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-xs font-semibold transition-all ${
                    isCompleted
                      ? 'bg-success text-on-control shadow-sm'
                      : isCurrent
                        ? 'bg-primary text-on-control ring-4 ring-primary/20 shadow-sm'
                        : 'border border-border bg-surface text-subtle'
                  }`}
                >
                  {isCompleted ? (
                    <CheckCircle2 aria-hidden="true" className="h-4 w-4" />
                  ) : (
                    <span>{step}</span>
                  )}
                </div>

                <div className="min-w-0 flex-1">
                  <p
                    className={`truncate text-xs transition-colors ${
                      isCurrent
                        ? 'font-semibold text-fg'
                        : isCompleted
                          ? 'font-medium text-fg'
                          : 'text-subtle'
                    }`}
                  >
                    {label}
                  </p>
                </div>
              </li>
            )
          })}
        </ol>
      </nav>

      {/* Recoverable Flow Error Banner */}
      {state.error ? (
        <div
          role="alert"
          data-testid="flow-error-banner"
          className="mb-6 flex items-start justify-between gap-3 rounded-2xl border border-danger/30 bg-danger-soft p-4.5 text-xs text-danger shadow-sm"
        >
          <div className="flex items-center gap-2.5">
            <AlertCircle aria-hidden="true" className="h-5 w-5 shrink-0" />
            <p className="font-medium leading-relaxed">{state.error}</p>
          </div>
          <button
            type="button"
            onClick={actions.clearError}
            className="rounded-lg p-1 text-subtle hover:bg-surface hover:text-fg transition"
          >
            ✕
          </button>
        </div>
      ) : null}

      {/* Wide 2-Column Portal Layout */}
      <div className="grid grid-cols-1 gap-8 lg:grid-cols-12">
        {/* Left Column: Active Step Workspace (8 cols) */}
        <div className="lg:col-span-8">
          <div className="rounded-2xl border border-border bg-surface p-4 shadow-sm sm:rounded-3xl sm:p-8">
            {state.step === 1 ? (
              <ApplyStepInfo
                values={state.details}
                apartmentArea={apartmentArea}
                step1Config={state.context?.flowProfile?.steps?.step1}
                onChange={actions.updateDetails}
                onNext={actions.goToStep2}
              />
            ) : null}

            {state.step === 2 && state.context ? (
              <ApplyStepPackage
                packages={state.context.packages}
                selectedPackageId={state.selectedPackageId}
                selectedPaymentCycleMonths={state.selectedPaymentCycleMonths}
                onSelectPaymentCycle={actions.selectPaymentCycle}
                onSelectPackage={actions.selectPackage}
                onBack={() => actions.backToStep(1)}
                onNext={actions.goToStep3}
              />
            ) : null}

            {state.step === 3 && state.context ? (
              <ApplyStepConsent
                disclosure={state.context.disclosure}
                terms={state.termsDoc}
                loadingTerms={state.loadingTerms}
                termsError={state.termsError}
                acknowledgedDisclosures={state.acknowledgedDisclosures}
                termsAccepted={state.termsAccepted}
                executionPolicy={state.selectedExecutionPolicy}
                executionPolicyAccepted={state.executionPolicyAccepted}
                feeSnapshot={selectedPkg?.feeSnapshot ?? null}
                feeAcknowledged={state.feeAcknowledged}
                submitting={state.submitting}
                onToggleDisclosure={actions.toggleDisclosure}
                onToggleTermsAccepted={actions.setTermsAccepted}
                onToggleExecutionPolicyAccepted={
                  actions.setExecutionPolicyAccepted
                }
                onToggleFeeAcknowledged={actions.setFeeAcknowledged}
                onBack={() => actions.backToStep(2)}
                onSubmit={actions.submitApplication}
              />
            ) : null}

            {state.step === 4 && state.submittedApplication ? (
              <ApplyStepSubmitted
                application={state.submittedApplication}
                apartmentId={apartmentId}
                propertyTitle={listingTitle}
                onRefreshStatus={actions.refreshSubmittedApplication}
              />
            ) : null}
          </div>
        </div>

        {/* Right Column: Sticky Live Dossier & Protection Sidebar (4 cols) */}
        <aside className="space-y-6 lg:col-span-4">
          <div className="sticky top-6 space-y-6">
            {/* 1. Apartment Overview & Financial Dossier */}
            <div className="space-y-4 rounded-3xl border border-border bg-surface p-6 shadow-sm">
              <div className="flex items-center justify-between border-b border-border/80 pb-3.5">
                <span className="text-xs font-semibold uppercase tracking-wider text-muted">
                  Hồ sơ căn hộ & Chi phí
                </span>
                <span className="rounded-full bg-surface-muted px-2.5 py-0.5 text-[11px] font-semibold text-fg">
                  {apartmentArea} m²
                </span>
              </div>

              <div className="space-y-2">
                <h3 className="font-display text-base font-bold text-fg leading-snug">
                  {listingTitle}
                </h3>
                {listingAddress ? (
                  <p className="text-xs leading-relaxed text-muted">
                    {listingAddress}
                  </p>
                ) : null}
              </div>

              {listing?.landlordDisplayName ? (
                <div className="flex items-center justify-between rounded-xl bg-surface-muted/50 p-2.5 text-xs">
                  <span className="text-muted">Chủ sở hữu:</span>
                  <strong className="text-fg">
                    {listing.landlordDisplayName}
                  </strong>
                </div>
              ) : null}

              <div className="space-y-2.5 border-t border-border/80 pt-3 text-xs">
                <div className="flex items-center justify-between text-muted">
                  <span className="inline-flex items-center gap-1.5">
                    <Calendar
                      aria-hidden="true"
                      className="h-3.5 w-3.5 text-primary"
                    />
                    Ngày vào ở:
                  </span>
                  <strong className="text-fg">
                    {state.details.moveInDate || 'Chưa chọn'}
                  </strong>
                </div>

                <div className="flex items-center justify-between text-muted">
                  <span className="inline-flex items-center gap-1.5">
                    <Users
                      aria-hidden="true"
                      className="h-3.5 w-3.5 text-primary"
                    />
                    Số người ở:
                  </span>
                  <strong className="text-fg">
                    {state.details.occupants} người
                  </strong>
                </div>

                <div className="flex items-center justify-between text-muted">
                  <span>Kỳ hạn cam kết:</span>
                  <strong className="font-mono font-semibold text-primary">
                    {durationMonths} tháng
                  </strong>
                </div>

                <div className="flex items-center justify-between text-muted">
                  <span>Tiền thuê hàng tháng:</span>
                  <strong className="font-display text-sm font-bold text-fg">
                    {monthlyRent > 0
                      ? `${formatVnd(monthlyRent)} ₫`
                      : 'Theo gói chọn'}
                  </strong>
                </div>

                <div className="flex items-center justify-between text-muted">
                  <span>Tiền đặt cọc cam kết:</span>
                  <strong className="text-fg">
                    {deposit > 0 ? `${formatVnd(deposit)} ₫` : 'Theo gói chọn'}
                  </strong>
                </div>

                {monthlyRent > 0 ? (
                  <div className="border-t border-border/80 pt-3">
                    <div className="flex items-center justify-between text-xs">
                      <span className="font-semibold text-fg">
                        Tổng giá trị hợp đồng:
                      </span>
                      <span className="font-display text-base font-bold text-primary">
                        {formatVnd(totalEstimate)} ₫
                      </span>
                    </div>
                    <p className="mt-1 text-[11px] text-subtle">
                      Ước tính theo thời hạn cam kết {durationMonths} tháng.
                    </p>
                  </div>
                ) : null}
              </div>
            </div>

            {/* 2. Tenant Protection Guarantee */}
            <div className="space-y-4 rounded-3xl border border-success/30 bg-success-soft/20 p-6 text-xs text-muted shadow-sm">
              <div className="flex items-center gap-2 font-semibold text-success">
                <ShieldCheck aria-hidden="true" className="h-4 w-4" />
                <span>Bảo vệ quyền lợi người thuê</span>
              </div>
              <ul className="space-y-2 leading-relaxed text-fg">
                <li className="flex items-start gap-2">
                  <CheckCircle2
                    aria-hidden="true"
                    className="mt-0.5 h-3.5 w-3.5 shrink-0 text-success"
                  />
                  <span>Giá thuê cam kết cố định theo gói niêm yết.</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2
                    aria-hidden="true"
                    className="mt-0.5 h-3.5 w-3.5 shrink-0 text-success"
                  />
                  <span>
                    Tiền đặt cọc được hoàn trả trong vòng 15 ngày khi thanh lý.
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2
                    aria-hidden="true"
                    className="mt-0.5 h-3.5 w-3.5 shrink-0 text-success"
                  />
                  <span>
                    Hỗ trợ xác nhận đăng ký tạm trú trực tuyến (DVC 1.004194).
                  </span>
                </li>
              </ul>

              <div className="rounded-2xl border border-border/70 bg-surface/80 p-3 text-[11px] leading-relaxed text-muted">
                <div className="mb-1 flex items-center gap-1.5 font-semibold text-fg">
                  <ShieldCheck
                    aria-hidden="true"
                    className="h-3.5 w-3.5 text-primary"
                  />
                  <span>Chứng thực số an toàn</span>
                </div>
                <p>
                  Hồ sơ và thỏa thuận đặt thuê được bảo đảm tính pháp lý và lưu
                  trữ toàn vẹn, bảo vệ tối đa quyền lợi chính đáng của người
                  thuê.
                </p>
              </div>
            </div>
          </div>
        </aside>
      </div>

      {/* Pending Application Exists Modal */}
      <Dialog
        open={state.pendingApplicationExists}
        onOpenChange={open => {
          if (!open) {
            actions.dismissPendingApplicationModal()
          }
        }}
      >
        <DialogContent
          className="sm:max-w-md border-border bg-surface"
          data-testid="pending-application-modal"
        >
          <DialogHeader className="flex flex-col items-center text-center">
            <div className="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-warning-soft text-warning">
              <Clock aria-hidden="true" className="h-6 w-6" />
            </div>
            <DialogTitle className="text-center font-display text-lg font-bold text-fg">
              Hồ sơ đang chờ phản hồi
            </DialogTitle>
            <DialogDescription className="mt-2 text-center text-sm leading-relaxed text-muted">
              Bạn đã gửi hồ sơ cho căn hộ này rồi, vui lòng chờ chủ nhà phản
              hồi.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter className="mt-6 flex flex-col-reverse gap-2 sm:flex-row sm:justify-end">
            <Button
              asChild
              variant="outline"
              className="w-full border-border sm:w-auto"
              onClick={() => actions.dismissPendingApplicationModal()}
            >
              <Link href={`/properties/${apartmentId}` as Route}>
                Quay lại căn hộ
              </Link>
            </Button>
            <Button
              asChild
              className="w-full bg-primary text-on-control hover:bg-primary-hover sm:w-auto"
            >
              <Link href={'/rental-applications' as Route}>
                Xem hồ sơ đã gửi
              </Link>
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </main>
  )
}
