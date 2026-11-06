'use client'

import * as React from 'react'
import { Zap } from 'lucide-react'
import { LegalReferences } from './legal-references'
import { LEGAL_SOURCE_KEYS } from '../model/legal-source-keys'

/** Ghi chú cố định in trong biên bản nhận nhà và trả nhà; khớp ghi chú ở bản PDF. */
export const UTILITY_SETTLEMENT_NOTE =
  'Tiền dịch vụ và tiền điện, nước được tính vào lúc bàn giao lại nhà khi hết hợp đồng, theo chỉ số công tơ ghi trong Biên bản nhận nhà và Biên bản trả nhà.'

export interface UtilityRatesView {
  electricityPerKwh: number
  waterPerM3: number
  serviceFeeMonthly: number
  note?: string | undefined
}

const vnd = (value: number): string => value.toLocaleString('vi-VN')

export function describeUtilityRates(rates: UtilityRatesView): string {
  const note = rates.note?.trim()
  return (
    `Đơn giá thỏa thuận: điện ${vnd(rates.electricityPerKwh)} đồng/kWh; ` +
    `nước ${vnd(rates.waterPerM3)} đồng/m³; ` +
    `phí dịch vụ ${vnd(rates.serviceFeeMonthly)} đồng/tháng.` +
    (note ? ` Ghi chú: ${note}` : '')
  )
}

export interface UtilitySettlementNoteProps {
  rates?: UtilityRatesView | undefined
}

/** Ghi chú tính điện nước, dịch vụ khi trả nhà, kèm đơn giá hợp đồng và cơ sở pháp lý. */
export function UtilitySettlementNote({
  rates,
}: UtilitySettlementNoteProps): React.ReactElement {
  return (
    <section
      data-testid="utility-settlement-note"
      className="space-y-2 rounded-lg border border-border bg-surface p-3 text-xs sm:col-span-2"
    >
      <p className="flex items-center gap-1.5 font-semibold text-fg">
        <Zap className="h-3.5 w-3.5 text-info" aria-hidden="true" />
        Điện, nước và dịch vụ
      </p>
      <p className="text-muted">{UTILITY_SETTLEMENT_NOTE}</p>
      {rates ? (
        <p data-testid="utility-rates-line" className="text-fg">
          {describeUtilityRates(rates)}
        </p>
      ) : (
        <p className="text-muted">
          Hợp đồng không ghi đơn giá; hai bên tự thỏa thuận cách tính.
        </p>
      )}
      <LegalReferences sourceKeys={LEGAL_SOURCE_KEYS.utilities} />
    </section>
  )
}
