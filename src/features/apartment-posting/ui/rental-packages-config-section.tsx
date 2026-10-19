'use client'

import * as React from 'react'
import type { UseFormReturn } from 'react-hook-form'
import type { ApartmentFormValues } from '../model/types'
import type { RentalPackagePostingSchemaType } from '../model/apartment-posting-schema'
import { Checkbox } from '@/shared/ui/checkbox'
import { Input } from '@/shared/ui/input'
import { Label } from '@/shared/ui/label'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/shared/ui/select'
import {
  CalendarDays,
  CircleDollarSign,
  Info,
  ShieldCheck,
  Wallet,
} from 'lucide-react'
import { LandlordCommissionDialog } from '@/features/platform-fees/ui/landlord-commission-dialog'
import { appToast } from '@/shared/ui/app-toast'
import { resolvePrepaidMonths } from '@/shared/lib/prepaid-rent'

export interface RentalPackagesConfigSectionProps {
  form: UseFormReturn<ApartmentFormValues, unknown, ApartmentFormValues>
}

const SUPPORTED_DURATIONS: Array<{
  duration: 3 | 6 | 12 | 24
  label: string
  recommendedBadge?: string
}> = [
  {
    duration: 12,
    label: '12 tháng (Hợp đồng năm)',
    recommendedBadge: 'Phổ biến nhất',
  },
  { duration: 6, label: '6 tháng (Nửa năm)', recommendedBadge: 'Linh hoạt' },
  {
    duration: 3,
    label: '3 tháng (Ngắn hạn)',
    recommendedBadge: 'Khách công tác',
  },
  { duration: 24, label: '24 tháng (Dài hạn 2 năm)' },
]

function formatVnd(amount: number): string {
  return new Intl.NumberFormat('vi-VN').format(amount)
}

export function RentalPackagesConfigSection({
  form,
}: RentalPackagesConfigSectionProps): React.ReactElement {
  const { watch, setValue } = form
  const currentPackages = (watch('rentalPackages') ||
    []) as RentalPackagePostingSchemaType[]
  const basePriceMonthly = watch('priceMonthly') || 0

  const activeCommissionPackages = currentPackages
    .filter(p => p.status === 'active')
    .map(p => ({
      durationMonths: p.durationMonths,
      monthlyRent: p.monthlyRent,
    }))

  const handleToggleDuration = (
    duration: 3 | 6 | 12 | 24,
    checked: boolean
  ) => {
    if (checked) {
      // Add or activate package
      const existing = currentPackages.find(p => p.durationMonths === duration)
      if (existing) {
        setValue(
          'rentalPackages',
          currentPackages.map(p =>
            p.durationMonths === duration ? { ...p, status: 'active' } : p
          ),
          { shouldValidate: true }
        )
      } else {
        const defaultRent =
          basePriceMonthly > 0
            ? Math.round(basePriceMonthly * 1_000_000)
            : 10_000_000
        const newPackage: RentalPackagePostingSchemaType = {
          packageId: `pkg-${duration}m`,
          version: 1,
          durationMonths: duration,
          monthlyRent: defaultRent,
          depositPolicy: {
            type: 'MONTHS_OF_RENT',
            months: 1,
          },
          status: 'active',
        }
        setValue('rentalPackages', [...currentPackages, newPackage], {
          shouldValidate: true,
        })
      }
    } else {
      // Deactivate or remove package
      setValue(
        'rentalPackages',
        currentPackages.filter(p => p.durationMonths !== duration),
        { shouldValidate: true }
      )
    }
  }

  const handleUpdatePrice = (duration: number, priceMillion: number) => {
    const rentVnd = Math.round(priceMillion * 1_000_000)
    setValue(
      'rentalPackages',
      currentPackages.map(p =>
        p.durationMonths === duration ? { ...p, monthlyRent: rentVnd } : p
      ),
      { shouldValidate: true }
    )
  }

  const handleUpdateDepositPolicy = (
    duration: number,
    policyType: 'MONTHS_OF_RENT' | 'FIXED_AMOUNT',
    val: number
  ) => {
    setValue(
      'rentalPackages',
      currentPackages.map(p => {
        if (p.durationMonths !== duration) return p
        if (policyType === 'MONTHS_OF_RENT') {
          return {
            ...p,
            depositPolicy: {
              type: 'MONTHS_OF_RENT',
              months: Math.max(1, Math.round(val)),
            },
          }
        }
        return {
          ...p,
          depositPolicy: {
            type: 'FIXED_AMOUNT',
            amount: Math.max(1, Math.round(val * 1_000_000)),
          },
        }
      }),
      { shouldValidate: true }
    )
  }

  /**
   * Chọn cách thu tiền thuê trả trước. Chọn một phương án cụ thể là cam kết với khách thuê và được ghi vào
   * hợp đồng nên luôn nhắc chủ nhà phải quy định rõ ràng (hoàn / khấu trừ khi chấm dứt sớm).
   */
  const handleChoosePrepaidRent = (
    duration: number,
    mode: 'DEFAULT' | 'NONE' | 'MONTHS' | 'FULL'
  ): void => {
    const next: RentalPackagePostingSchemaType['prepaidRent'] =
      mode === 'DEFAULT'
        ? undefined
        : mode === 'MONTHS'
          ? { type: 'MONTHS', months: Math.min(2, Math.max(1, duration - 1)) }
          : { type: mode }
    setValue(
      'rentalPackages',
      currentPackages.map(pkg =>
        pkg.durationMonths !== duration ? pkg : { ...pkg, prepaidRent: next }
      ),
      { shouldValidate: true }
    )
    if (mode === 'DEFAULT') return
    appToast.info(
      mode === 'NONE'
        ? 'Gói này chỉ thu tiền cọc khi nhận nhà, tiền thuê thu theo lịch thanh toán. Hãy ghi rõ trong hợp đồng thời điểm thu tiền thuê tháng đầu.'
        : 'Khoản tiền thuê trả trước sẽ được ghi vào hợp đồng và khách thuê thấy trước khi đặt cọc. Hãy quy định rõ việc hoàn lại hoặc khấu trừ khi chấm dứt hợp đồng sớm.',
      { title: 'Cần quy định rõ ràng', duration: 7000 }
    )
  }

  const handleUpdatePrepaidMonths = (
    duration: number,
    months: number
  ): void => {
    setValue(
      'rentalPackages',
      currentPackages.map(pkg =>
        pkg.durationMonths !== duration
          ? pkg
          : {
              ...pkg,
              prepaidRent: {
                type: 'MONTHS',
                months: Math.min(
                  Math.max(1, duration - 1),
                  Math.max(1, Math.round(months) || 1)
                ),
              },
            }
      ),
      { shouldValidate: true }
    )
  }

  const handleToggleSettlementPolicy = (
    duration: number,
    enabled: boolean
  ): void => {
    setValue(
      'rentalPackages',
      currentPackages.map(pkg =>
        pkg.durationMonths !== duration
          ? pkg
          : {
              ...pkg,
              settlementPolicy: enabled
                ? {
                    holdingDeposit: {
                      type: 'PERCENT_OF_SECURITY',
                      percent: 30,
                    },
                    allowedPaymentCycles: [1, 3, 6],
                    defaultPaymentCycle: 1,
                    firstPaymentDueOffsetDays: 3,
                  }
                : undefined,
            }
      ),
      { shouldValidate: true }
    )
  }

  const updateSettlementPolicy = (
    duration: number,
    update: (
      policy: NonNullable<RentalPackagePostingSchemaType['settlementPolicy']>
    ) => NonNullable<RentalPackagePostingSchemaType['settlementPolicy']>
  ): void => {
    setValue(
      'rentalPackages',
      currentPackages.map(pkg => {
        if (pkg.durationMonths !== duration || !pkg.settlementPolicy) return pkg
        return { ...pkg, settlementPolicy: update(pkg.settlementPolicy) }
      }),
      { shouldValidate: true }
    )
  }

  return (
    <div
      className="space-y-4 rounded-xl border border-border bg-surface p-5"
      data-testid="rental-packages-config-section"
    >
      <div className="flex items-start justify-between gap-3">
        <div>
          <div className="flex items-center gap-2 text-primary font-semibold text-sm">
            <CalendarDays className="h-4 w-4" />
            <span>Gói thuê linh hoạt & Chính sách cọc (Tùy chọn)</span>
          </div>
          <p className="text-xs text-muted mt-1">
            Chủ động thiết lập các gói thời hạn (3, 6, 12, 24 tháng) để tiếp cận
            nhiều đối tượng khách thuê hơn.
          </p>
          <p className="text-xs text-muted mt-1">
            Luồng thuê: ký hợp đồng số trước, sau đó khách đặt cọc.
          </p>
        </div>
        <LandlordCommissionDialog
          packages={activeCommissionPackages}
          disabled={activeCommissionPackages.length === 0}
        />
      </div>

      <div className="grid gap-3 sm:grid-cols-2">
        {SUPPORTED_DURATIONS.map(({ duration, label, recommendedBadge }) => {
          const pkg = currentPackages.find(
            p => p.durationMonths === duration && p.status === 'active'
          )
          const isEnabled = Boolean(pkg)
          const currentPriceMillion = pkg
            ? pkg.monthlyRent / 1_000_000
            : basePriceMonthly

          const depositDisplay = (() => {
            if (!pkg) return null
            if (pkg.depositPolicy.type === 'MONTHS_OF_RENT') {
              const depositVnd = pkg.monthlyRent * pkg.depositPolicy.months
              return `${formatVnd(depositVnd)} ₫ (${pkg.depositPolicy.months} tháng)`
            }
            return `${formatVnd(pkg.depositPolicy.amount)} ₫ (Cố định)`
          })()

          return (
            <div
              key={duration}
              data-testid={`package-card-${duration}`}
              className={`rounded-lg border p-4 transition-all ${
                isEnabled
                  ? 'border-primary/50 bg-primary-soft/10 shadow-sm'
                  : 'border-border/80 bg-surface-muted/30 hover:border-border'
              }`}
            >
              <div className="flex items-center justify-between gap-2">
                <div className="flex items-center gap-2">
                  <Checkbox
                    id={`toggle-duration-${duration}`}
                    checked={isEnabled}
                    onCheckedChange={checked =>
                      handleToggleDuration(duration, Boolean(checked))
                    }
                    data-testid={`toggle-duration-${duration}`}
                  />
                  <Label
                    htmlFor={`toggle-duration-${duration}`}
                    className="text-xs font-bold text-fg cursor-pointer"
                  >
                    {label}
                  </Label>
                </div>
                {recommendedBadge && (
                  <span className="rounded-md bg-surface-muted px-2 py-0.5 text-[10px] font-semibold text-primary">
                    {recommendedBadge}
                  </span>
                )}
              </div>

              {isEnabled && pkg && (
                <div className="mt-3 space-y-3 border-t border-border/50 pt-3">
                  <div className="space-y-1">
                    <Label
                      htmlFor={`price-input-${duration}`}
                      className="text-[11px] text-muted flex items-center gap-1"
                    >
                      <CircleDollarSign className="h-3 w-3 text-primary" />
                      Giá thuê (Triệu VNĐ/tháng) *
                    </Label>
                    <Input
                      id={`price-input-${duration}`}
                      type="number"
                      step="0.1"
                      min="0.1"
                      value={currentPriceMillion || ''}
                      onChange={e =>
                        handleUpdatePrice(
                          duration,
                          parseFloat(e.target.value) || 0
                        )
                      }
                      className="h-8 text-xs bg-surface"
                      data-testid={`price-input-${duration}`}
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-2">
                    <div className="space-y-1">
                      <Label
                        htmlFor={`deposit-type-${duration}`}
                        className="text-[11px] text-muted"
                      >
                        Kiểu tiền cọc
                      </Label>
                      <Select
                        value={pkg.depositPolicy.type}
                        onValueChange={val =>
                          handleUpdateDepositPolicy(
                            duration,
                            val as 'MONTHS_OF_RENT' | 'FIXED_AMOUNT',
                            val === 'MONTHS_OF_RENT' ? 1 : currentPriceMillion
                          )
                        }
                      >
                        <SelectTrigger
                          id={`deposit-type-${duration}`}
                          className="h-8 text-[11px] bg-surface"
                          data-testid={`deposit-type-${duration}`}
                        >
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem
                            value="MONTHS_OF_RENT"
                            className="text-xs"
                          >
                            Theo tháng tiền nhà
                          </SelectItem>
                          <SelectItem value="FIXED_AMOUNT" className="text-xs">
                            Số tiền cố định
                          </SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="space-y-1">
                      <Label
                        htmlFor={`deposit-val-${duration}`}
                        className="text-[11px] text-muted"
                      >
                        {pkg.depositPolicy.type === 'MONTHS_OF_RENT'
                          ? 'Số tháng cọc'
                          : 'Tiền cọc (Triệu đ)'}
                      </Label>
                      <Input
                        id={`deposit-val-${duration}`}
                        type="number"
                        min="1"
                        step={
                          pkg.depositPolicy.type === 'MONTHS_OF_RENT'
                            ? '1'
                            : '0.5'
                        }
                        value={
                          pkg.depositPolicy.type === 'MONTHS_OF_RENT'
                            ? pkg.depositPolicy.months
                            : pkg.depositPolicy.amount / 1_000_000
                        }
                        onChange={e =>
                          handleUpdateDepositPolicy(
                            duration,
                            pkg.depositPolicy.type,
                            parseFloat(e.target.value) || 1
                          )
                        }
                        className="h-8 text-xs bg-surface"
                        data-testid={`deposit-val-${duration}`}
                      />
                    </div>
                  </div>

                  <div className="flex items-center gap-1 text-[11px] text-muted">
                    <ShieldCheck className="h-3 w-3 text-success shrink-0" />
                    <span>
                      Cọc ước tính:{' '}
                      <strong className="text-fg">{depositDisplay}</strong>
                    </span>
                  </div>

                  <section
                    className="space-y-2 rounded-lg border border-border/70 bg-surface-muted/30 p-3"
                    data-testid={`prepaid-rent-${duration}`}
                  >
                    <div className="flex items-center gap-1.5 text-[11px] font-semibold text-fg">
                      <Wallet className="h-3 w-3 text-primary" />
                      <span>Tiền thuê trả trước khi nhận nhà</span>
                    </div>
                    <div
                      role="radiogroup"
                      aria-label={`Tiền thuê trả trước gói ${duration} tháng`}
                      className="space-y-1.5"
                    >
                      {(
                        [
                          ['DEFAULT', 'Theo kỳ thanh toán mặc định'],
                          ['NONE', 'Chỉ đặt cọc, không trả trước tiền thuê'],
                          ['MONTHS', 'Trả trước một số tháng'],
                          ['FULL', `Trả trước toàn bộ (${duration} tháng)`],
                        ] as const
                      ).map(([mode, text]) => {
                        const current = pkg.prepaidRent?.type ?? 'DEFAULT'
                        return (
                          <label
                            key={mode}
                            className="flex items-center gap-2 text-[11px] text-muted"
                          >
                            <input
                              type="radio"
                              name={`prepaid-mode-${duration}`}
                              checked={current === mode}
                              onChange={() =>
                                handleChoosePrepaidRent(duration, mode)
                              }
                              data-testid={`prepaid-mode-${duration}-${mode}`}
                              className="accent-[var(--primary)]"
                            />
                            <span className={current === mode ? 'text-fg' : ''}>
                              {text}
                            </span>
                            {mode === 'MONTHS' &&
                            pkg.prepaidRent?.type === 'MONTHS' ? (
                              <Input
                                type="number"
                                min={1}
                                max={Math.max(1, duration - 1)}
                                step={1}
                                aria-label={`Số tháng trả trước gói ${duration} tháng`}
                                value={pkg.prepaidRent.months}
                                onChange={e =>
                                  handleUpdatePrepaidMonths(
                                    duration,
                                    parseFloat(e.target.value) || 1
                                  )
                                }
                                className="h-7 w-16 bg-surface text-xs"
                                data-testid={`prepaid-months-${duration}`}
                              />
                            ) : null}
                          </label>
                        )
                      })}
                    </div>
                    {pkg.prepaidRent ? (
                      <p
                        className="text-[10px] text-muted"
                        data-testid={`prepaid-summary-${duration}`}
                      >
                        {(() => {
                          const months =
                            resolvePrepaidMonths(pkg.prepaidRent, duration) ?? 0
                          const prepaid = pkg.monthlyRent * months
                          const deposit =
                            pkg.depositPolicy.type === 'MONTHS_OF_RENT'
                              ? pkg.monthlyRent * pkg.depositPolicy.months
                              : pkg.depositPolicy.amount
                          return months === 0
                            ? `Khách trả khi nhận nhà: ${formatVnd(deposit)} ₫ (chỉ cọc).`
                            : `Khách trả khi nhận nhà: ${formatVnd(deposit)} ₫ cọc + ${formatVnd(prepaid)} ₫ tiền thuê (${months} tháng) = ${formatVnd(deposit + prepaid)} ₫.`
                        })()}
                        {pkg.prepaidRent.type !== 'NONE' &&
                        !pkg.settlementPolicy
                          ? ' Bật "Quyết toán nhận nhà" bên dưới để thu khoản này cùng lúc nhận nhà.'
                          : ''}
                      </p>
                    ) : (
                      <p className="text-[10px] text-muted">
                        Chưa chọn: áp dụng kỳ thanh toán đầu theo quy tắc hiện
                        tại.
                      </p>
                    )}
                  </section>

                  <section
                    className="space-y-2 rounded-lg border border-border/70 bg-surface-muted/30 p-3"
                    data-testid={`settlement-policy-${duration}`}
                  >
                    <label className="flex items-center gap-2 text-[11px] font-semibold text-fg">
                      <Checkbox
                        checked={Boolean(pkg.settlementPolicy)}
                        onCheckedChange={checked =>
                          handleToggleSettlementPolicy(
                            duration,
                            checked === true
                          )
                        }
                      />
                      Quyết toán nhận nhà và chọn chu kỳ thanh toán
                    </label>
                    {pkg.settlementPolicy ? (
                      <div className="space-y-2 pl-6">
                        <div className="flex flex-wrap gap-3 text-[11px] text-muted">
                          {[1, 3, 6].map(value => {
                            const cycle = value as 1 | 3 | 6
                            const checked =
                              pkg.settlementPolicy?.allowedPaymentCycles.includes(
                                cycle
                              ) ?? false
                            return (
                              <label
                                key={cycle}
                                className="flex items-center gap-1.5"
                              >
                                <Checkbox
                                  checked={checked}
                                  onCheckedChange={next =>
                                    updateSettlementPolicy(duration, policy => {
                                      const cycles: (1 | 3 | 6)[] = next
                                        ? [
                                            ...new Set([
                                              ...policy.allowedPaymentCycles,
                                              cycle,
                                            ]),
                                          ].sort((a, b) => a - b)
                                        : policy.allowedPaymentCycles.filter(
                                            item => item !== cycle
                                          )
                                      const allowed: (1 | 3 | 6)[] =
                                        cycles.length ? cycles : [1]
                                      return {
                                        ...policy,
                                        allowedPaymentCycles: allowed,
                                        defaultPaymentCycle: allowed.includes(
                                          policy.defaultPaymentCycle
                                        )
                                          ? policy.defaultPaymentCycle
                                          : (allowed[0] ?? 1),
                                      }
                                    })
                                  }
                                />
                                {cycle} tháng
                              </label>
                            )
                          })}
                        </div>
                        <label className="block space-y-1 text-[11px] text-muted">
                          Chu kỳ mặc định
                          <select
                            aria-label={`Chu kỳ mặc định ${duration} tháng`}
                            className="h-8 w-full rounded-md border border-border bg-surface px-2 text-fg"
                            value={pkg.settlementPolicy.defaultPaymentCycle}
                            onChange={event =>
                              updateSettlementPolicy(duration, policy => ({
                                ...policy,
                                defaultPaymentCycle: Number(
                                  event.target.value
                                ) as 1 | 3 | 6,
                              }))
                            }
                          >
                            {pkg.settlementPolicy.allowedPaymentCycles.map(
                              cycle => (
                                <option key={cycle} value={cycle}>
                                  {cycle} tháng
                                </option>
                              )
                            )}
                          </select>
                        </label>
                        <label className="block space-y-1 text-[11px] text-muted">
                          Cọc giữ chỗ (% cọc bảo đảm)
                          <Input
                            type="number"
                            min="1"
                            max="100"
                            value={
                              pkg.settlementPolicy.holdingDeposit?.type ===
                              'PERCENT_OF_SECURITY'
                                ? pkg.settlementPolicy.holdingDeposit.percent
                                : 30
                            }
                            onChange={event =>
                              updateSettlementPolicy(duration, policy => ({
                                ...policy,
                                holdingDeposit: {
                                  type: 'PERCENT_OF_SECURITY',
                                  percent: Number(event.target.value) || 1,
                                },
                              }))
                            }
                            className="h-8 text-xs bg-surface"
                          />
                        </label>
                        <label className="block space-y-1 text-[11px] text-muted">
                          Hạn thanh toán trước ngày nhận nhà (ngày)
                          <Input
                            type="number"
                            min="0"
                            max="15"
                            value={
                              pkg.settlementPolicy.firstPaymentDueOffsetDays
                            }
                            onChange={event =>
                              updateSettlementPolicy(duration, policy => ({
                                ...policy,
                                firstPaymentDueOffsetDays: Math.min(
                                  15,
                                  Math.max(0, Number(event.target.value) || 0)
                                ),
                              }))
                            }
                            className="h-8 text-xs bg-surface"
                          />
                        </label>
                        <p className="text-[10px] text-muted">
                          Kỳ đầu:{' '}
                          {formatVnd(
                            pkg.monthlyRent *
                              (pkg.prepaidRent
                                ? (resolvePrepaidMonths(
                                    pkg.prepaidRent,
                                    duration
                                  ) ?? 0)
                                : pkg.settlementPolicy.defaultPaymentCycle)
                          )}{' '}
                          ₫ thuê + bù cọc được tính khi gửi hồ sơ.
                        </p>
                      </div>
                    ) : null}
                  </section>
                </div>
              )}
            </div>
          )
        })}
      </div>

      {currentPackages.filter(p => p.status === 'active').length === 0 && (
        <div className="flex items-center gap-2 rounded-lg bg-surface-muted p-2.5 text-xs text-muted">
          <Info className="h-4 w-4 text-primary shrink-0" />
          <span>
            Nếu bạn không chọn gói cụ thể, hệ thống sẽ tự động tạo một gói chuẩn{' '}
            <strong>12 tháng</strong> từ giá thuê cơ bản bên trên với chính sách
            cọc 1 tháng.
          </span>
        </div>
      )}
    </div>
  )
}
