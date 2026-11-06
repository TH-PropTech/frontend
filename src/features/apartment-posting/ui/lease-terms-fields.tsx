'use client'

import * as React from 'react'
import { Input } from '@/shared/ui/input'
import { Textarea } from '@/shared/ui/textarea'
import { LegalReferences, LEGAL_SOURCE_KEYS } from '@/entities/legal-source'
import {
  CUSTOM_CLAUSES_MAX_LENGTH,
  type RentalPackagePostingSchemaType,
} from '../model/apartment-posting-schema'

export const LEASE_TERM_DEFAULTS = {
  paymentDay: 1,
  latePenaltyRate: 0,
  terminationNoticeDays: 30,
} as const

export type LeaseTermsPatch = Partial<
  Pick<
    RentalPackagePostingSchemaType,
    | 'paymentDay'
    | 'latePenaltyRate'
    | 'terminationNoticeDays'
    | 'customClauses'
    | 'utilityRates'
  >
>

export interface LeaseTermsFieldsProps {
  duration: number
  pkg: LeaseTermsPatch
  onChange: (patch: LeaseTermsPatch) => void
}

function parseOptionalNumber(raw: string): number | undefined {
  if (raw.trim() === '') return undefined
  const value = Number(raw)
  return Number.isFinite(value) ? value : undefined
}

type UtilityRatesValue = NonNullable<
  RentalPackagePostingSchemaType['utilityRates']
>
type UtilityRateField = 'electricityPerKwh' | 'waterPerM3' | 'serviceFeeMonthly'

const UTILITY_NOTE =
  'Đơn giá do hai bên thỏa thuận và ghi vào hợp đồng; hệ thống không áp bảng giá nhà nước. Tiền điện, nước và dịch vụ được tính vào lúc bàn giao lại nhà khi hết hợp đồng, theo chỉ số công tơ và ảnh công tơ trong biên bản nhận nhà và trả nhà.'

/** Ba đơn giá đi cùng nhau: nhập một ô thì các ô còn lại coi là 0; xóa hết thì bỏ đơn giá. */
function nextUtilityRates(
  current: UtilityRatesValue | undefined,
  patch: Partial<UtilityRatesValue>
): UtilityRatesValue | undefined {
  const merged: UtilityRatesValue = {
    electricityPerKwh: 0,
    waterPerM3: 0,
    serviceFeeMonthly: 0,
    ...current,
    ...patch,
  }
  const empty =
    merged.electricityPerKwh === 0 &&
    merged.waterPerM3 === 0 &&
    merged.serviceFeeMonthly === 0 &&
    !merged.note?.trim()
  if (empty) return undefined
  if (!merged.note?.trim()) delete merged.note
  return merged
}

export function LeaseTermsFields({
  duration,
  pkg,
  onChange,
}: LeaseTermsFieldsProps): React.JSX.Element {
  const clauses = pkg.customClauses ?? ''
  const remaining = CUSTOM_CLAUSES_MAX_LENGTH - clauses.length
  const hintId = `custom-clauses-hint-${duration}`
  const rates = pkg.utilityRates

  const rateInput = (
    field: UtilityRateField,
    label: string,
    testId: string
  ): React.JSX.Element => (
    <label className="block space-y-1 text-[11px] font-semibold text-fg">
      {label}
      <Input
        type="number"
        min={0}
        max={10_000_000}
        step={500}
        placeholder="0"
        data-testid={`${testId}-${duration}`}
        value={rates?.[field] ?? ''}
        onChange={event =>
          onChange({
            utilityRates: nextUtilityRates(rates, {
              [field]: parseOptionalNumber(event.target.value) ?? 0,
            }),
          })
        }
        className="h-8 text-xs bg-surface"
      />
    </label>
  )

  return (
    <section
      className="space-y-3 rounded-lg border border-border/70 bg-surface-muted/30 p-3"
      data-testid={`lease-terms-${duration}`}
    >
      <p className="text-[11px] font-semibold text-fg">
        Điều khoản hợp đồng do bạn đặt
      </p>
      <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
        <label className="block space-y-1 text-[11px] font-semibold text-fg">
          Ngày thanh toán hằng tháng
          <Input
            type="number"
            min={1}
            max={31}
            step={1}
            placeholder={String(LEASE_TERM_DEFAULTS.paymentDay)}
            data-testid={`payment-day-${duration}`}
            value={pkg.paymentDay ?? ''}
            onChange={event =>
              onChange({ paymentDay: parseOptionalNumber(event.target.value) })
            }
            className="h-8 text-xs bg-surface"
          />
        </label>
        <label className="block space-y-1 text-[11px] font-semibold text-fg">
          Lãi phạt chậm đóng (%/năm)
          <Input
            type="number"
            min={0}
            max={20}
            step={0.5}
            placeholder={String(LEASE_TERM_DEFAULTS.latePenaltyRate)}
            data-testid={`late-penalty-rate-${duration}`}
            value={pkg.latePenaltyRate ?? ''}
            onChange={event =>
              onChange({
                latePenaltyRate: parseOptionalNumber(event.target.value),
              })
            }
            className="h-8 text-xs bg-surface"
          />
        </label>
        <label className="block space-y-1 text-[11px] font-semibold text-fg">
          Báo trước khi chấm dứt (ngày)
          <Input
            type="number"
            min={30}
            max={365}
            step={1}
            placeholder={String(LEASE_TERM_DEFAULTS.terminationNoticeDays)}
            data-testid={`termination-notice-days-${duration}`}
            value={pkg.terminationNoticeDays ?? ''}
            onChange={event =>
              onChange({
                terminationNoticeDays: parseOptionalNumber(event.target.value),
              })
            }
            className="h-8 text-xs bg-surface"
          />
        </label>
      </div>
      <div
        className="space-y-2 rounded-md border border-border/60 p-3"
        data-testid={`utility-rates-${duration}`}
      >
        <p className="text-[11px] font-semibold text-fg">
          Đơn giá điện, nước và dịch vụ (không bắt buộc)
        </p>
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
          {rateInput(
            'electricityPerKwh',
            'Điện (đồng/kWh)',
            'electricity-rate'
          )}
          {rateInput('waterPerM3', 'Nước (đồng/m³)', 'water-rate')}
          {rateInput(
            'serviceFeeMonthly',
            'Phí dịch vụ (đồng/tháng)',
            'service-fee'
          )}
        </div>
        <label className="block space-y-1 text-[11px] font-semibold text-fg">
          Ghi chú cách tính
          <Input
            maxLength={500}
            placeholder="Ví dụ: tính theo chỉ số công tơ riêng"
            data-testid={`utility-note-${duration}`}
            value={rates?.note ?? ''}
            onChange={event =>
              onChange({
                utilityRates: nextUtilityRates(rates, {
                  note: event.target.value,
                }),
              })
            }
            className="h-8 text-xs bg-surface"
          />
        </label>
        <p className="text-[10px] text-muted">{UTILITY_NOTE}</p>
        <LegalReferences sourceKeys={LEGAL_SOURCE_KEYS.utilities} />
      </div>
      <label className="block space-y-1 text-[11px] font-semibold text-fg">
        Điều khoản riêng của chủ nhà
        <Textarea
          rows={3}
          maxLength={CUSTOM_CLAUSES_MAX_LENGTH}
          aria-describedby={hintId}
          placeholder="Ví dụ: không nuôi thú cưng, giờ yên tĩnh 22:00 đến 06:00."
          data-testid={`custom-clauses-${duration}`}
          value={clauses}
          onChange={event => onChange({ customClauses: event.target.value })}
          className="text-xs bg-surface"
        />
      </label>
      <p
        id={hintId}
        className="text-[10px] text-muted"
        data-testid={`custom-clauses-remaining-${duration}`}
      >
        Còn {remaining} ký tự. Nội dung này hiện thành phụ lục riêng của hợp
        đồng, không thay đổi 12 điều bắt buộc, và khách xem được trước khi nộp
        hồ sơ. Để trống nếu không cần.
      </p>
    </section>
  )
}
