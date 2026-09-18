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
import { CalendarDays, CircleDollarSign, Info, ShieldCheck } from 'lucide-react'

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
        </div>
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
