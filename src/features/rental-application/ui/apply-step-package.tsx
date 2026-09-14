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
  RotateCcw,
  Scale,
  ShieldCheck,
  Sparkles,
} from 'lucide-react'
import { Button } from '@/shared/ui/button'
import type { RentalApplicationContext } from '../api/rental-application-api'

export interface ApplyStepPackageProps {
  packages: RentalApplicationContext['packages']
  selectedPackageId: string
  onSelectPackage: (packageId: string) => void
  onBack: () => void
  onNext: () => void
}

function formatVnd(amount: number): string {
  return new Intl.NumberFormat('vi-VN').format(amount)
}

export function ApplyStepPackage({
  packages,
  selectedPackageId,
  onSelectPackage,
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

  return (
    <div data-testid="apply-step-package" className="space-y-8">
      <header className="border-b border-border/80 pb-5">
        <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-primary">
          <Calendar aria-hidden="true" className="h-4 w-4" />
          <span>Giai đoạn 2 / 4: Xác lập gói thuê & điều kiện tài chính</span>
        </div>
        <h2 className="mt-1.5 font-display text-xl font-bold text-fg sm:text-2xl">
          Lựa chọn gói thuê & Điều khoản đặt cọc
        </h2>
        <p className="mt-1 text-sm text-muted">
          Giá thuê được niêm yết minh bạch, cố định trong suốt kỳ hạn cam kết.
          Tiền cọc được bảo đảm theo khung pháp lý quy định.
        </p>
      </header>

      {activePackages.length === 0 ? (
        <div
          data-testid="no-active-packages"
          className="rounded-2xl border border-warning/30 bg-warning-soft/30 p-8 text-center text-sm text-fg"
        >
          <AlertCircle
            aria-hidden="true"
            className="mx-auto h-8 w-8 text-warning"
          />
          <h3 className="mt-3 font-display text-base font-bold">
            Chưa có gói thuê đang hiệu lực
          </h3>
          <p className="mt-1 text-xs text-muted">
            Chủ nhà hiện đang cập nhật bảng giá niêm yết. Vui lòng liên hệ chủ
            nhà hoặc quay lại sau.
          </p>
        </div>
      ) : (
        <fieldset className="space-y-4">
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
                      ? 'border-primary bg-primary-soft/20 shadow-md ring-2 ring-primary/30'
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
                        <div className="inline-flex items-center gap-1.5 rounded-full bg-surface-muted px-3 py-1 text-xs font-semibold text-fg">
                          <Calendar
                            aria-hidden="true"
                            className="h-3.5 w-3.5 text-primary"
                          />
                          <span>Thời hạn: {pkg.durationMonths} tháng</span>
                        </div>
                        {isLongTerm ? (
                          <span className="inline-flex items-center gap-1 rounded-full bg-accent-soft px-2.5 py-0.5 text-[10px] font-bold text-fg">
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

                      <div className="mt-2.5 flex items-center gap-1.5 text-xs text-muted">
                        <Coins
                          aria-hidden="true"
                          className="h-4 w-4 text-accent"
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
                  <div className="mt-5 border-t border-border/80 pt-3 text-xs text-subtle">
                    <div className="flex items-center justify-between">
                      <span>Tổng tiền thuê ước tính (UI):</span>
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
        <div className="flex items-center gap-3 rounded-2xl border border-success/30 bg-success-soft/40 p-4 text-xs text-fg">
          <ShieldCheck
            aria-hidden="true"
            className="h-5 w-5 shrink-0 text-success"
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

      {/* Statutory Deposit Regulation Notice (Decree 96/2024/ND-CP Article 12) */}
      <section className="space-y-3 rounded-2xl border border-border bg-surface p-5 shadow-sm">
        <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-primary">
          <Scale aria-hidden="true" className="h-4 w-4" />
          <span>Quy định pháp lý về tiền đặt cọc</span>
        </div>
        <h3 className="font-display text-sm font-bold text-fg">
          Khoản 2 Điều 12 Nghị định 96/2024/NĐ-CP & Bảo vệ quyền lợi người thuê
        </h3>
        <ul className="grid gap-2 text-xs text-muted sm:grid-cols-2">
          <li className="flex items-start gap-2 rounded-xl border border-border/70 bg-surface-muted/40 p-3">
            <CheckCircle2
              aria-hidden="true"
              className="mt-0.5 h-3.5 w-3.5 shrink-0 text-success"
            />
            <span>
              <strong>Mục đích tiền cọc:</strong> Chỉ dùng để bảo đảm thực hiện
              hợp đồng và trách nhiệm bảo toàn tài sản nội thất bàn giao.
            </span>
          </li>
          <li className="flex items-start gap-2 rounded-xl border border-border/70 bg-surface-muted/40 p-3">
            <RotateCcw
              aria-hidden="true"
              className="mt-0.5 h-3.5 w-3.5 shrink-0 text-primary"
            />
            <span>
              <strong>Thời hạn hoàn trả:</strong> Chủ nhà có nghĩa vụ hoàn trả
              đầy đủ tiền cọc trong vòng <strong>15 ngày</strong> kể từ ngày hai
              bên thanh lý hợp đồng và bàn giao nhà.
            </span>
          </li>
          <li className="flex items-start gap-2 rounded-xl border border-border/70 bg-surface-muted/40 p-3">
            <CreditCard
              aria-hidden="true"
              className="mt-0.5 h-3.5 w-3.5 shrink-0 text-accent"
            />
            <span>
              <strong>Kỳ thanh toán tiền thuê:</strong> Định kỳ từ ngày 01 đến
              ngày 05 hàng tháng qua tài khoản ngân hàng được định danh trong
              hợp đồng.
            </span>
          </li>
          <li className="flex items-start gap-2 rounded-xl border border-border/70 bg-surface-muted/40 p-3">
            <FileText
              aria-hidden="true"
              className="mt-0.5 h-3.5 w-3.5 shrink-0 text-muted"
            />
            <span>
              <strong>Thông báo gia hạn:</strong> Trước khi hết hạn 30 ngày, hai
              bên sẽ tiến hành thỏa thuận gia hạn hoặc ký phụ lục điều chỉnh
              thời hạn.
            </span>
          </li>
        </ul>
      </section>

      {/* Navigation actions */}
      <div className="flex items-center justify-between border-t border-border/80 pt-5">
        <Button
          type="button"
          variant="outline"
          onClick={onBack}
          className="flex items-center gap-2 border-border"
        >
          <ArrowLeft aria-hidden="true" className="h-4 w-4" />
          <span>Quay lại thông tin người thuê</span>
        </Button>

        <Button
          type="button"
          disabled={!selectedPackageId}
          onClick={onNext}
          className="flex items-center gap-2 bg-control px-6 py-2.5 text-sm font-semibold text-on-control shadow-sm hover:opacity-90 disabled:opacity-50"
        >
          <span>Xem điều khoản & cam kết</span>
          <ArrowRight aria-hidden="true" className="h-4 w-4" />
        </Button>
      </div>
    </div>
  )
}
