import { fireEvent, render, screen } from '@testing-library/react'
import { describe, expect, it, vi } from 'vitest'
import { LeaseTermsFields, type LeaseTermsPatch } from './lease-terms-fields'

vi.mock('@/entities/legal-source', () => ({
  LegalReferences: () => null,
  LEGAL_SOURCE_KEYS: { utilities: ['circular-16-2014-bct'] },
}))

function setup(pkg: LeaseTermsPatch = {}) {
  const onChange = vi.fn()
  render(<LeaseTermsFields duration={12} pkg={pkg} onChange={onChange} />)
  return onChange
}

describe('LeaseTermsFields utility rates', () => {
  it('treats the other two rates as 0 when one is entered', () => {
    const onChange = setup()
    fireEvent.change(screen.getByTestId('electricity-rate-12'), {
      target: { value: '3500' },
    })
    expect(onChange).toHaveBeenCalledWith({
      utilityRates: {
        electricityPerKwh: 3500,
        waterPerM3: 0,
        serviceFeeMonthly: 0,
      },
    })
  })

  it('keeps the other rates when editing one and carries the note', () => {
    const onChange = setup({
      utilityRates: {
        electricityPerKwh: 3500,
        waterPerM3: 20000,
        serviceFeeMonthly: 0,
      },
    })
    fireEvent.change(screen.getByTestId('service-fee-12'), {
      target: { value: '200000' },
    })
    expect(onChange).toHaveBeenCalledWith({
      utilityRates: {
        electricityPerKwh: 3500,
        waterPerM3: 20000,
        serviceFeeMonthly: 200000,
      },
    })
    fireEvent.change(screen.getByTestId('utility-note-12'), {
      target: { value: 'Theo công tơ riêng' },
    })
    expect(onChange).toHaveBeenLastCalledWith({
      utilityRates: {
        electricityPerKwh: 3500,
        waterPerM3: 20000,
        serviceFeeMonthly: 0,
        note: 'Theo công tơ riêng',
      },
    })
  })

  it('clears the rates when every field is emptied', () => {
    const onChange = setup({
      utilityRates: {
        electricityPerKwh: 3500,
        waterPerM3: 0,
        serviceFeeMonthly: 0,
      },
    })
    fireEvent.change(screen.getByTestId('electricity-rate-12'), {
      target: { value: '' },
    })
    expect(onChange).toHaveBeenCalledWith({ utilityRates: undefined })
  })

  it('tells the landlord that rates are agreed and settled at hand-back', () => {
    setup()
    expect(screen.getByText(/hệ thống không áp bảng giá nhà nước/)).toBeTruthy()
    expect(screen.getByText(/bàn giao lại nhà khi hết hợp đồng/)).toBeTruthy()
  })
})
