import { render, screen } from '@testing-library/react'
import { describe, expect, it, vi } from 'vitest'
import {
  UTILITY_SETTLEMENT_NOTE,
  UtilitySettlementNote,
  describeUtilityRates,
} from './utility-settlement-note'

vi.mock('./legal-references', () => ({ LegalReferences: () => null }))

const rates = {
  electricityPerKwh: 3500,
  waterPerM3: 20000,
  serviceFeeMonthly: 200000,
}

describe('UtilitySettlementNote', () => {
  it('states that utilities are settled at hand-back and shows the agreed rates', () => {
    render(<UtilitySettlementNote rates={{ ...rates, note: 'Theo công tơ' }} />)
    expect(screen.getByText(UTILITY_SETTLEMENT_NOTE)).toBeTruthy()
    const line = screen.getByTestId('utility-rates-line').textContent
    expect(line).toContain('điện 3.500 đồng/kWh')
    expect(line).toContain('nước 20.000 đồng/m³')
    expect(line).toContain('phí dịch vụ 200.000 đồng/tháng')
    expect(line).toContain('Ghi chú: Theo công tơ')
  })

  it('tells the parties to agree by themselves when the contract has no rates', () => {
    render(<UtilitySettlementNote />)
    expect(screen.queryByTestId('utility-rates-line')).toBeNull()
    expect(
      screen.getByText(/Hợp đồng không ghi đơn giá; hai bên tự thỏa thuận/)
    ).toBeTruthy()
  })

  it('formats rates the same way the PDF does', () => {
    expect(describeUtilityRates(rates)).toBe(
      'Đơn giá thỏa thuận: điện 3.500 đồng/kWh; nước 20.000 đồng/m³; phí dịch vụ 200.000 đồng/tháng.'
    )
  })
})
