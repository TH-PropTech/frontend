'use client'

import * as React from 'react'
import { joinAddressParts } from '@/shared/lib/join-address'
import { useVietnamLocations } from '@/shared/lib/use-vietnam-locations'
import { OptionSelect, type SelectOption } from '@/shared/ui/option-select'
import { splitAddress, splitWard } from '../../lib/kyc-address'

interface KycAddressFieldProps {
  label: string
  /** Whole address as one string, as the KYC form and backend store it. */
  value: string
  onChange: (value: string) => void
  /** Offer a ward/commune picker below the province (current residence only). */
  withWard?: boolean
  error?: string
}

interface Edits {
  provinceCode: number | null
  wardCode: number | null
  detail: string
}

const INPUT_CLASS =
  'w-full border border-slate-200 rounded-xl px-3.5 py-2 text-xs text-fg focus:outline-none focus:border-[#9F3F2A] bg-white font-semibold'

/**
 * Province (and optional ward) pickers plus a free-text detail line.
 * Until the user edits, everything is derived from the OCR text, so there is no effect
 * copying props into state; after the first edit the pickers own the value.
 */
export function KycAddressField({
  label,
  value,
  onChange,
  withWard = false,
  error,
}: KycAddressFieldProps): React.ReactElement {
  const { provinces, isLoadingProvinces } = useVietnamLocations(null)
  const [edits, setEdits] = React.useState<Edits | null>(null)

  const parsed = React.useMemo(
    () => splitAddress(value, provinces),
    [value, provinces]
  )
  const provinceCode = edits
    ? edits.provinceCode
    : (parsed.province?.code ?? null)
  const { wards, isLoadingWards } = useVietnamLocations(provinceCode)

  const parsedWard = React.useMemo(
    () =>
      withWard && parsed.province
        ? splitWard(parsed.rest, wards)
        : { ward: null, rest: parsed.rest },
    [withWard, parsed, wards]
  )
  const wardCode = edits ? edits.wardCode : (parsedWard.ward?.code ?? null)
  const detail = edits ? edits.detail : parsedWard.rest

  const provinceOptions = React.useMemo<SelectOption[]>(
    () =>
      [...provinces]
        .sort((a, b) => a.name.localeCompare(b.name, 'vi'))
        .map(p => ({ value: String(p.code), label: p.name })),
    [provinces]
  )
  const wardOptions = React.useMemo<SelectOption[]>(
    () => wards.map(w => ({ value: String(w.code), label: w.name })),
    [wards]
  )

  const apply = (next: Edits): void => {
    setEdits(next)
    onChange(
      joinAddressParts(
        next.detail,
        wards.find(w => w.code === next.wardCode)?.name,
        provinces.find(p => p.code === next.provinceCode)?.name
      )
    )
  }

  const heading = (
    <label className="text-[10px] font-bold text-muted-foreground uppercase tracking-wider block">
      {label}
    </label>
  )
  const errorLine = error ? (
    <p role="alert" className="text-[11px] font-semibold text-red-600">
      {error}
    </p>
  ) : null

  // Province list unavailable (offline or API down): fall back to a single free-text line.
  if (!isLoadingProvinces && provinces.length === 0) {
    return (
      <div className="space-y-1">
        {heading}
        <input
          type="text"
          aria-label={label}
          value={value}
          onChange={e => onChange(e.target.value)}
          className={INPUT_CLASS}
        />
        {errorLine}
      </div>
    )
  }

  return (
    <div className="space-y-1.5">
      {heading}
      <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
        <OptionSelect
          aria-label={`${label}: Tỉnh/Thành phố`}
          placeholder={
            isLoadingProvinces ? 'Đang tải...' : 'Chọn Tỉnh/Thành phố'
          }
          value={provinceCode === null ? '' : String(provinceCode)}
          options={provinceOptions}
          onChange={next =>
            apply({
              provinceCode: next ? Number(next) : null,
              wardCode: null,
              detail,
            })
          }
        />
        {withWard && (
          <OptionSelect
            aria-label={`${label}: Phường/Xã`}
            placeholder={
              provinceCode === null
                ? 'Chọn tỉnh trước'
                : isLoadingWards
                  ? 'Đang tải...'
                  : 'Chọn Phường/Xã'
            }
            disabled={provinceCode === null}
            value={wardCode === null ? '' : String(wardCode)}
            options={wardOptions}
            onChange={next =>
              apply({
                provinceCode,
                wardCode: next ? Number(next) : null,
                detail,
              })
            }
          />
        )}
      </div>
      <input
        type="text"
        aria-label={`${label}: Địa chỉ chi tiết`}
        placeholder="Số nhà, tên đường, thôn/xóm..."
        value={detail}
        onChange={e =>
          apply({ provinceCode, wardCode, detail: e.target.value })
        }
        className={INPUT_CLASS}
      />
      {provinceCode === null && value.trim() !== '' && (
        <p className="text-[11px] text-amber-700">
          Chọn Tỉnh/Thành phố hiện hành. Địa chỉ trên thẻ có thể còn tên tỉnh cũ
          (trước 1/7/2025).
        </p>
      )}
      {errorLine}
    </div>
  )
}
