'use client'

import { DateTimePicker } from '@/shared/ui/date-picker'
import { OptionSelect } from '@/shared/ui/option-select'
import * as React from 'react'
import { Plus, Trash2 } from 'lucide-react'
import { Button } from '@/shared/ui/button'
import { Input } from '@/shared/ui/input'
import { Textarea } from '@/shared/ui/textarea'
import {
  savePlatformFeeDraft,
  publishPlatformFeeSchedule,
  validatePlatformFeeSchedule,
  type PlatformFeeSchedule,
  type PlatformFeeScheduleRules,
  type PlatformFeeTier,
} from '../api/platform-fees-api'

export const DEFAULT_PLATFORM_FEE_RULES: PlatformFeeScheduleRules = {
  landlordCommission: {
    tiers: [
      {
        minDurationMonths: 3,
        maxDurationMonths: 6,
        basis: 'MONTHS_OF_RENT',
        value: 0.5,
      },
    ],
    dueDaysAfterActivation: 7,
  },
  tenantServiceFee: {
    basis: 'PERCENT_OF_MONTHLY_RENT',
    value: 2,
    minAmount: 100_000,
    maxAmount: 500_000,
  },
  vatRatePercent: 10,
  pricesIncludeVat: false,
  roundingUnit: 1000,
  disclosure: {
    tenantText: 'Phí dịch vụ nền tảng được thanh toán riêng.',
    landlordText: 'Hoa hồng nền tảng được thanh toán riêng.',
  },
}

interface FeeTierEditorProps {
  tier: PlatformFeeTier
  onChange: (tier: PlatformFeeTier) => void
  onRemove: () => void
  canRemove: boolean
}

function FeeTierEditor({
  tier,
  onChange,
  onRemove,
  canRemove,
}: FeeTierEditorProps): React.ReactElement {
  const update = <K extends keyof PlatformFeeTier>(
    key: K,
    value: PlatformFeeTier[K]
  ): void => {
    onChange({ ...tier, [key]: value })
  }

  return (
    <div className="grid gap-3 rounded-lg border border-line bg-surface-muted/30 p-3 sm:grid-cols-5">
      <Input
        label="Từ tháng"
        type="number"
        min={1}
        value={tier.minDurationMonths}
        onChange={event =>
          update('minDurationMonths', Number(event.target.value))
        }
      />
      <Input
        label="Đến tháng"
        type="number"
        min={1}
        value={tier.maxDurationMonths}
        onChange={event =>
          update('maxDurationMonths', Number(event.target.value))
        }
      />
      <OptionSelect
        label="Cách tính"
        value={tier.basis}
        onChange={value => update('basis', value as PlatformFeeTier['basis'])}
        options={[
          { value: 'MONTHS_OF_RENT', label: 'Số tháng tiền thuê' },
          { value: 'PERCENT_OF_TOTAL_RENT', label: '% tổng tiền thuê' },
        ]}
      />
      <Input
        label="Giá trị"
        type="number"
        min={0}
        step="0.01"
        value={tier.value}
        onChange={event => update('value', Number(event.target.value))}
      />
      <div className="flex items-end">
        <Button
          type="button"
          size="sm"
          variant="ghost"
          disabled={!canRemove}
          onClick={onRemove}
          aria-label="Xóa bậc phí"
          className="text-danger"
        >
          <Trash2 className="h-4 w-4" />
          Xóa bậc
        </Button>
      </div>
    </div>
  )
}

export interface FeeScheduleEditorProps {
  initialSchedule?: PlatformFeeSchedule | null
}

export function FeeScheduleEditor({
  initialSchedule = null,
}: FeeScheduleEditorProps): React.ReactElement {
  const [scheduleId, setScheduleId] = React.useState(
    initialSchedule?.scheduleId ?? 'platform-fee-default'
  )
  const [version, setVersion] = React.useState(initialSchedule?.version ?? 1)
  const [rules, setRules] = React.useState<PlatformFeeScheduleRules>(
    initialSchedule?.rules ?? DEFAULT_PLATFORM_FEE_RULES
  )
  const [legalReviewStatus, setLegalReviewStatus] = React.useState<
    'draft' | 'reviewed'
  >(initialSchedule?.legalReviewStatus ?? 'draft')
  const [reviewReference, setReviewReference] = React.useState(
    initialSchedule?.reviewReference ?? ''
  )
  const [effectiveFrom, setEffectiveFrom] = React.useState('')
  const [reason, setReason] = React.useState('Cập nhật biểu phí nền tảng')
  const [busyAction, setBusyAction] = React.useState<
    'save' | 'validate' | 'publish' | null
  >(null)
  const [error, setError] = React.useState<string | null>(null)
  const [message, setMessage] = React.useState<string | null>(null)
  const [validationErrors, setValidationErrors] = React.useState<string[]>([])

  const updateTier = (index: number, tier: PlatformFeeTier): void => {
    setRules(current => ({
      ...current,
      landlordCommission: {
        ...current.landlordCommission,
        tiers: current.landlordCommission.tiers.map((item, itemIndex) =>
          itemIndex === index ? tier : item
        ),
      },
    }))
  }

  const addTier = (): void => {
    setRules(current => ({
      ...current,
      landlordCommission: {
        ...current.landlordCommission,
        tiers: [
          ...current.landlordCommission.tiers,
          {
            minDurationMonths: 7,
            maxDurationMonths: 12,
            basis: 'MONTHS_OF_RENT',
            value: 1,
          },
        ],
      },
    }))
  }

  const removeTier = (index: number): void => {
    setRules(current => ({
      ...current,
      landlordCommission: {
        ...current.landlordCommission,
        tiers: current.landlordCommission.tiers.filter(
          (_, itemIndex) => itemIndex !== index
        ),
      },
    }))
  }

  const runAction = async (
    action: 'save' | 'validate' | 'publish'
  ): Promise<void> => {
    setBusyAction(action)
    setError(null)
    setMessage(null)
    setValidationErrors([])
    try {
      if (action === 'save') {
        const saved = await savePlatformFeeDraft({
          scheduleId,
          version,
          rules,
          legalReviewStatus,
          ...(reviewReference.trim()
            ? { reviewReference: reviewReference.trim() }
            : {}),
          reason: reason.trim(),
        })
        setVersion(saved.version)
        setMessage(`Đã lưu nháp ${saved.scheduleId}@${saved.version}.`)
      } else if (action === 'validate') {
        const result = await validatePlatformFeeSchedule(scheduleId, version)
        setValidationErrors(result.errors)
        setMessage(result.valid ? 'Biểu phí hợp lệ.' : null)
      } else {
        if (legalReviewStatus !== 'reviewed' || !reviewReference.trim()) {
          throw new Error(
            'Cần mã tham chiếu rà soát pháp lý trước khi publish.'
          )
        }
        if (!effectiveFrom) {
          throw new Error('Cần chọn thời điểm áp dụng biểu phí.')
        }
        const published = await publishPlatformFeeSchedule({
          scheduleId,
          version,
          effectiveFrom: new Date(effectiveFrom).toISOString(),
          reason: reason.trim(),
        })
        setMessage(`Đã publish ${published.scheduleId}@${published.version}.`)
      }
    } catch (cause: unknown) {
      setError(
        cause instanceof Error ? cause.message : 'Không thể cập nhật biểu phí.'
      )
    } finally {
      setBusyAction(null)
    }
  }

  return (
    <section
      data-testid="fee-schedule-editor"
      className="space-y-5 rounded-xl border border-line bg-surface p-5"
    >
      <header>
        <h2 className="text-base font-bold text-fg">Biểu phí nền tảng</h2>
        <p className="mt-1 text-xs text-muted">
          Chỉnh các bậc hoa hồng, VAT và chỉ publish sau khi có rà soát pháp lý.
        </p>
      </header>

      {error ? (
        <p role="alert" className="text-sm text-danger">
          {error}
        </p>
      ) : null}
      {message ? (
        <p role="status" className="text-sm text-success">
          {message}
        </p>
      ) : null}
      {validationErrors.length > 0 ? (
        <ul
          role="alert"
          className="list-disc space-y-1 pl-5 text-sm text-danger"
        >
          {validationErrors.map(item => (
            <li key={item}>{item}</li>
          ))}
        </ul>
      ) : null}

      <div className="grid gap-3 sm:grid-cols-3">
        <Input
          label="Mã biểu phí"
          value={scheduleId}
          onChange={event => setScheduleId(event.target.value)}
        />
        <Input
          label="Version"
          type="number"
          min={1}
          value={version}
          onChange={event => setVersion(Number(event.target.value))}
        />
        <DateTimePicker
          label="Áp dụng từ"
          value={effectiveFrom}
          onChange={setEffectiveFrom}
        />
      </div>

      <div className="space-y-3">
        <div className="flex items-center justify-between gap-3">
          <h3 className="text-sm font-semibold text-fg">
            Bậc hoa hồng chủ nhà
          </h3>
          <Button type="button" size="sm" variant="secondary" onClick={addTier}>
            <Plus className="h-4 w-4" /> Thêm bậc
          </Button>
        </div>
        {rules.landlordCommission.tiers.map((tier, index) => (
          <FeeTierEditor
            key={`${tier.minDurationMonths}-${tier.maxDurationMonths}-${index}`}
            tier={tier}
            canRemove={rules.landlordCommission.tiers.length > 1}
            onChange={nextTier => updateTier(index, nextTier)}
            onRemove={() => removeTier(index)}
          />
        ))}
        <Input
          label="Số ngày đến hạn sau kích hoạt"
          type="number"
          min={0}
          value={rules.landlordCommission.dueDaysAfterActivation}
          onChange={event =>
            setRules(current => ({
              ...current,
              landlordCommission: {
                ...current.landlordCommission,
                dueDaysAfterActivation: Number(event.target.value),
              },
            }))
          }
        />
      </div>

      <div className="grid gap-3 sm:grid-cols-3">
        <OptionSelect
          label="Phí dịch vụ người thuê"
          value={rules.tenantServiceFee?.basis ?? 'FIXED'}
          onChange={value =>
            setRules(current => {
              const basis = value as 'FIXED' | 'PERCENT_OF_MONTHLY_RENT'
              return {
                ...current,
                tenantServiceFee: current.tenantServiceFee
                  ? { ...current.tenantServiceFee, basis }
                  : { basis, value: 0 },
              }
            })
          }
          options={[
            { value: 'FIXED', label: 'Mức cố định' },
            { value: 'PERCENT_OF_MONTHLY_RENT', label: '% tiền thuê tháng' },
          ]}
        />
        <Input
          label="Giá trị phí thuê"
          type="number"
          min={0}
          value={rules.tenantServiceFee?.value ?? 0}
          onChange={event =>
            setRules(current => ({
              ...current,
              tenantServiceFee: current.tenantServiceFee
                ? {
                    ...current.tenantServiceFee,
                    value: Number(event.target.value),
                  }
                : { basis: 'FIXED', value: Number(event.target.value) },
            }))
          }
        />
        <Input
          label="VAT (%)"
          type="number"
          min={0}
          max={100}
          value={rules.vatRatePercent}
          onChange={event =>
            setRules(current => ({
              ...current,
              vatRatePercent: Number(event.target.value),
            }))
          }
        />
      </div>

      <label className="flex items-center gap-2 text-xs text-fg">
        <input
          type="checkbox"
          checked={rules.pricesIncludeVat}
          onChange={event =>
            setRules(current => ({
              ...current,
              pricesIncludeVat: event.target.checked,
            }))
          }
        />
        Giá đã bao gồm VAT
      </label>

      <div className="grid gap-3 sm:grid-cols-2">
        <OptionSelect
          label="Trạng thái rà soát pháp lý"
          value={legalReviewStatus}
          onChange={value =>
            setLegalReviewStatus(value as 'draft' | 'reviewed')
          }
          options={[
            { value: 'draft', label: 'Chưa rà soát' },
            { value: 'reviewed', label: 'Đã rà soát' },
          ]}
        />
        <Input
          label="Mã tham chiếu rà soát"
          value={reviewReference}
          onChange={event => setReviewReference(event.target.value)}
        />
      </div>
      <Textarea
        aria-label="Lý do thay đổi biểu phí"
        value={reason}
        onChange={event => setReason(event.target.value)}
        placeholder="Lý do thay đổi"
        className="border-border bg-surface text-sm text-fg"
      />

      <div className="flex flex-wrap gap-2 border-t border-line pt-4">
        <Button
          type="button"
          loading={busyAction === 'save'}
          onClick={() => void runAction('save')}
        >
          Lưu nháp
        </Button>
        <Button
          type="button"
          variant="secondary"
          loading={busyAction === 'validate'}
          onClick={() => void runAction('validate')}
        >
          Kiểm tra hợp lệ
        </Button>
        <Button
          type="button"
          variant="secondary"
          loading={busyAction === 'publish'}
          onClick={() => void runAction('publish')}
        >
          Publish biểu phí
        </Button>
      </div>
    </section>
  )
}
