'use client'

import * as React from 'react'
import {
  AlertCircle,
  ArrowLeft,
  ArrowRight,
  Calendar,
  CheckCircle2,
  Coins,
  CreditCard,
  FileText,
  Landmark,
  PenLine,
  RotateCcw,
  Scale,
  ShieldCheck,
  Sparkles,
} from 'lucide-react'
import { Button } from '@/shared/ui/button'
import type {
  RentalApplicationContext,
  RentalExecutionPolicyRef,
} from '../api/rental-application-api'
import { FeeBreakdown } from '@/features/platform-fees'

export interface ApplyStepPackageProps {
  packages: RentalApplicationContext['packages']
  selectedPackageId: string
  selectedExecutionPolicy?: RentalExecutionPolicyRef | null
  selectedPaymentCycleMonths?: 1 | 3 | 6
  onSelectPaymentCycle?: (cycle: 1 | 3 | 6) => void
  onSelectPackage: (packageId: string) => void
  onSelectExecutionPolicy?: (policy: RentalExecutionPolicyRef) => void
  onBack: () => void
  onNext: () => void
}

function formatVnd(amount: number): string {
  return new Intl.NumberFormat('vi-VN').format(amount)
}

export function ApplyStepPackage({
  packages,
  selectedPackageId,
  selectedExecutionPolicy = null,
  selectedPaymentCycleMonths = 1,
  onSelectPaymentCycle = () => undefined,
  onSelectPackage,
  onSelectExecutionPolicy = () => undefined,
  onBack,
  onNext,
}: ApplyStepPackageProps): React.ReactElement {
  const activePackages = React.useMemo(
    () => packages.filter(pkg => pkg.status === 'active'),
    [packages]
  )

  const selectedPkg = React.useMemo(
    () => activePackages.find(p => p.packageId === selectedPackageId),
    [activePackages, selectedPackageId]
  )
  const executionPolicies = selectedPkg?.allowedExecutionPolicies ?? []

  const policyLabel = (policy: RentalExecutionPolicyRef): string =>
    policy.strategy === 'DEPOSIT_FIRST'
      ? 'Cọc trước, sau đó ký hợp đồng'
      : 'Ký hợp đồng trước, sau đó thanh toán cọc'

  return (
    <div data-testid="apply-step-package" className="space-y-6">
      <header className="border-b border-border/80 pb-4">
        <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-primary">
          <Calendar aria-hidden="true" className="h-4 w-4" />
          <span>Bước 2/4: Xác lập gói thuê & điều kiện tài chính</span>
        </div>
        <h2 className="mt-1 font-display text-xl font-bold text-fg sm:text-2xl">
          Lựa chọn gói thuê & Điều khoản đặt cọc
        </h2>
        <p className="mt-1 text-xs text-muted">
          Giá thuê được niêm yết minh bạch, cố định trong suốt kỳ hạn cam kết.
          Tiền cọc được bảo đảm theo khung pháp lý quy định.
        </p>
      </header>

      {activePackages.length === 0 ? (
        <div
          data-testid="no-active-packages"
          className="rounded-2xl border border-warning/30 bg-warning-soft/30 p-8 text-center text-xs text-fg"
        >
          <AlertCircle
            aria-hidden="true"
            className="mx-auto h-8 w-8 text-warning"
          />
          <h3 className="mt-3 font-display text-sm font-bold">
            Chưa có gói thuê đang hiệu lực
          </h3>
          <p className="mt-1 text-xs text-muted">
            Chủ nhà hiện đang cập nhật bảng giá niêm yết. Vui lòng liên hệ chủ
            nhà hoặc quay lại sau.
          </p>
        </div>
      ) : (
        <fieldset className="space-y-3">
          <legend className="sr-only">
            Danh sách gói thuê đang có hiệu lực
          </legend>
          <div className="grid gap-4 sm:grid-cols-2">
            {activePackages.map(pkg => {
              const isSelected = pkg.packageId === selectedPackageId
              const subtotalEstimate = pkg.monthlyRent * pkg.durationMonths
              const isLongTerm = pkg.durationMonths >= 12

              return (
                <label
                  key={`${pkg.packageId}-${pkg.version}`}
                  data-testid={`package-card-${pkg.packageId}`}
                  className={`relative flex cursor-pointer flex-col justify-between rounded-2xl border p-5 transition-all ${
                    isSelected
                      ? 'border-primary bg-primary-soft/20 shadow-sm ring-2 ring-primary/30'
                      : 'border-border bg-surface hover:border-border-strong hover:shadow-sm'
                  }`}
                >
                  <input
                    type="radio"
                    name="rental-package"
                    value={pkg.packageId}
                    checked={isSelected}
                    onChange={() => onSelectPackage(pkg.packageId)}
                    className="sr-only"
                  />

                  <div className="space-y-4">
                    {/* Header badge row */}
                    <div className="flex items-start justify-between gap-2">
                      <div className="flex items-center gap-2">
                        <div className="inline-flex items-center gap-1.5 rounded-full bg-surface-muted px-2.5 py-1 text-xs font-semibold text-fg">
                          <Calendar
                            aria-hidden="true"
                            className="h-3.5 w-3.5 text-primary"
                          />
                          <span>Thời hạn: {pkg.durationMonths} tháng</span>
                        </div>
                        {isLongTerm ? (
                          <span className="inline-flex items-center gap-1 rounded-full bg-accent-soft px-2 py-0.5 text-[10px] font-bold text-fg">
                            <Sparkles
                              aria-hidden="true"
                              className="h-3 w-3 text-primary"
                            />
                            Phổ biến nhất
                          </span>
                        ) : null}
                      </div>

                      {isSelected ? (
                        <CheckCircle2
                          aria-hidden="true"
                          className="h-5 w-5 text-primary"
                        />
                      ) : (
                        <div
                          aria-hidden="true"
                          className="h-5 w-5 rounded-full border border-border"
                        />
                      )}
                    </div>

                    {/* Price and Deposit metrics */}
                    <div>
                      <div className="flex items-baseline gap-1.5">
                        <span className="font-display text-2xl font-bold text-fg">
                          {formatVnd(pkg.monthlyRent)}
                        </span>
                        <span className="text-xs font-medium text-muted">
                          ₫/tháng
                        </span>
                      </div>

                      <div className="mt-2 flex items-center gap-1.5 text-xs text-muted">
                        <Coins
                          aria-hidden="true"
                          className="h-3.5 w-3.5 text-accent"
                        />
                        <span>
                          Tiền đặt cọc cam kết:{' '}
                          <strong className="text-fg">
                            {formatVnd(pkg.resolvedDepositAmount)} ₫
                          </strong>
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Footer estimate */}
                  <div className="mt-4 border-t border-border/80 pt-3 text-xs text-subtle">
                    <div className="flex items-center justify-between">
                      <span>Tổng tiền thuê ước tính:</span>
                      <strong className="font-semibold text-fg">
                        {formatVnd(subtotalEstimate)} ₫
                      </strong>
                    </div>
                  </div>
                </label>
              )
            })}
          </div>
        </fieldset>
      )}

      {/* Selected Package Confirmation Banner */}
      {selectedPkg ? (
        <div className="flex items-center gap-3 rounded-2xl border border-success/30 bg-success-soft/30 p-4 text-xs text-fg">
          <ShieldCheck
            aria-hidden="true"
            className="h-4 w-4 shrink-0 text-success"
          />
          <p>
            Bạn đã chọn gói <strong>{selectedPkg.durationMonths} tháng</strong>{' '}
            với mức giá{' '}
            <strong>{formatVnd(selectedPkg.monthlyRent)} ₫/tháng</strong>. Mức
            giá này được cam kết cố định không tăng giá trong suốt thời hạn hợp
            đồng.
          </p>
        </div>
      ) : null}

      {selectedPkg ? (
        <section
          className="space-y-3 rounded-xl border border-border bg-surface p-4"
          data-testid="payment-cycle-selection"
        >
          <label
            htmlFor="payment-cycle"
            className="block text-xs font-semibold text-fg"
          >
            Chu kỳ thanh toán tiền thuê
          </label>
          <select
            id="payment-cycle"
            value={selectedPaymentCycleMonths}
            onChange={event =>
              onSelectPaymentCycle(Number(event.target.value) as 1 | 3 | 6)
            }
            className="h-10 w-full rounded-lg border border-border bg-surface px-3 text-sm text-fg"
          >
            {(selectedPkg.settlementPolicy?.allowedPaymentCycles ?? [1]).map(
              cycle => (
                <option key={cycle} value={cycle}>
                  {cycle === 1 ? 'Hàng tháng' : `Mỗi ${cycle} tháng`}
                </option>
              )
            )}
          </select>
          <p className="text-xs text-muted">
            Kỳ đầu dự kiến:{' '}
            {formatVnd(selectedPkg.monthlyRent * selectedPaymentCycleMonths)} ₫
            {selectedPkg.resolvedSecurityTopUpAmount
              ? ` + bù cọc ${formatVnd(selectedPkg.resolvedSecurityTopUpAmount)} ₫`
              : ''}
          </p>
          <FeeBreakdown snapshot={selectedPkg.feeSnapshot ?? null} />
        </section>
      ) : null}

      {selectedPkg && executionPolicies.length > 0 ? (
        <section
          data-testid="execution-policy-selection"
          className="space-y-3 rounded-2xl border border-primary/25 bg-primary-soft/10 p-5"
        >
          <div className="flex items-start gap-2">
            <Landmark
              aria-hidden="true"
              className="mt-0.5 h-4 w-4 text-primary"
            />
            <div>
              <h3 className="text-xs font-bold uppercase tracking-wider text-fg">
                Trình tự đặt cọc và ký hợp đồng
              </h3>
              <p className="mt-1 text-xs leading-relaxed text-muted">
                Chủ nhà đã công bố các trình tự được phép cho gói thuê này. Bạn
                chọn một trình tự; lựa chọn sẽ được lưu cùng hồ sơ và không thể
                tự ý thay đổi sau khi gửi.
              </p>
            </div>
          </div>
          <div className="grid gap-3 sm:grid-cols-2">
            {executionPolicies.map(policy => {
              const isSelected =
                selectedExecutionPolicy?.policyId === policy.policyId &&
                selectedExecutionPolicy?.version === policy.version
              return (
                <label
                  key={`${policy.policyId}-${policy.version}`}
                  data-testid={`execution-policy-${policy.strategy}`}
                  className={`flex cursor-pointer items-start gap-3 rounded-xl border p-3 transition ${
                    isSelected
                      ? 'border-primary bg-surface ring-2 ring-primary/20'
                      : 'border-border bg-surface hover:border-border-strong'
                  }`}
                >
                  <input
                    type="radio"
                    name="rental-execution-policy"
                    value={policy.strategy}
                    checked={isSelected}
                    onChange={() => onSelectExecutionPolicy(policy)}
                    className="sr-only"
                  />
                  {policy.strategy === 'DEPOSIT_FIRST' ? (
                    <Coins
                      aria-hidden="true"
                      className="mt-0.5 h-4 w-4 shrink-0 text-accent"
                    />
                  ) : (
                    <PenLine
                      aria-hidden="true"
                      className="mt-0.5 h-4 w-4 shrink-0 text-primary"
                    />
                  )}
                  <span className="text-xs leading-relaxed text-fg">
                    <strong className="block">{policyLabel(policy)}</strong>
                    <span className="mt-1 block text-muted">
                      {policy.strategy === 'DEPOSIT_FIRST'
                        ? 'Hợp đồng chỉ được kích hoạt sau khi cọc đã xác nhận và hai bên ký hợp lệ.'
                        : 'Hai bên có thể ký trước; hợp đồng chờ xác nhận cọc rồi mới được kích hoạt.'}
                    </span>
                  </span>
                </label>
              )
            })}
          </div>
          {selectedExecutionPolicy ? (
            <div className="flex items-start gap-2 rounded-xl border border-success/30 bg-success-soft/30 p-3 text-xs text-fg">
              <ShieldCheck
                aria-hidden="true"
                className="mt-0.5 h-4 w-4 shrink-0 text-success"
              />
              <p>
                Trình tự đã chọn:{' '}
                <strong>{policyLabel(selectedExecutionPolicy)}</strong>. Hệ
                thống sẽ hiển thị lại lựa chọn này ở bước xác nhận.
              </p>
            </div>
          ) : null}
        </section>
      ) : null}

      {/* Statutory Deposit Regulation Notice */}
      <section className="space-y-3 rounded-2xl border border-border bg-surface p-5 shadow-sm">
        <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-muted">
          <Scale aria-hidden="true" className="h-4 w-4 text-primary" />
          <span>
            Quy chế đặt cọc & Quyền lợi người thuê (Nghị định 96/2024/NĐ-CP)
          </span>
        </div>
        <ul className="grid gap-2.5 text-xs text-muted sm:grid-cols-2">
          <li className="flex items-start gap-2 rounded-xl border border-border/70 bg-surface-muted/30 p-3">
            <CheckCircle2
              aria-hidden="true"
              className="mt-0.5 h-3.5 w-3.5 shrink-0 text-success"
            />
            <span>
              <strong>Mục đích tiền cọc:</strong> Bảo đảm thực hiện hợp đồng và
              trách nhiệm bảo toàn tài sản bàn giao.
            </span>
          </li>
          <li className="flex items-start gap-2 rounded-xl border border-border/70 bg-surface-muted/30 p-3">
            <RotateCcw
              aria-hidden="true"
              className="mt-0.5 h-3.5 w-3.5 shrink-0 text-primary"
            />
            <span>
              <strong>Thời hạn hoàn trả:</strong> Chủ nhà hoàn trả 100% tiền cọc
              trong vòng <strong>15 ngày</strong> khi thanh lý hợp đồng.
            </span>
          </li>
          <li className="flex items-start gap-2 rounded-xl border border-border/70 bg-surface-muted/30 p-3">
            <CreditCard
              aria-hidden="true"
              className="mt-0.5 h-3.5 w-3.5 shrink-0 text-accent"
            />
            <span>
              <strong>Kỳ thanh toán:</strong> Định kỳ từ ngày 01 đến 05 hàng
              tháng qua tài khoản định danh trong hợp đồng.
            </span>
          </li>
          <li className="flex items-start gap-2 rounded-xl border border-border/70 bg-surface-muted/30 p-3">
            <FileText
              aria-hidden="true"
              className="mt-0.5 h-3.5 w-3.5 shrink-0 text-muted"
            />
            <span>
              <strong>Gia hạn hợp đồng:</strong> Thông báo trước 30 ngày khi hết
              hạn để ký phụ lục điều chỉnh thời hạn thuê.
            </span>
          </li>
        </ul>
      </section>

      {/* Navigation actions */}
      <div className="flex flex-col-reverse gap-3 border-t border-border/80 pt-4 sm:flex-row sm:items-center sm:justify-between">
        <Button
          type="button"
          variant="outline"
          onClick={onBack}
          className="flex w-full items-center justify-center gap-2 border-border text-xs sm:w-auto"
        >
          <ArrowLeft aria-hidden="true" className="h-3.5 w-3.5" />
          <span>Quay lại thông tin người thuê</span>
        </Button>

        <Button
          type="button"
          disabled={
            !selectedPackageId ||
            (executionPolicies.length > 1 && !selectedExecutionPolicy)
          }
          onClick={onNext}
          className="flex w-full items-center justify-center gap-2 bg-control px-6 py-2.5 text-xs font-semibold text-on-control shadow-sm hover:opacity-90 disabled:opacity-50 sm:w-auto"
        >
          <span>Xem điều khoản & cam kết</span>
          <ArrowRight aria-hidden="true" className="h-3.5 w-3.5" />
        </Button>
      </div>
    </div>
  )
}
