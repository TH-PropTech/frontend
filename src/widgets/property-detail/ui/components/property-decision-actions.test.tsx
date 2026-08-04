import { render, screen } from '@testing-library/react'
import { describe, expect, it, vi } from 'vitest'
import { PropertyDecisionActions } from './property-decision-actions'

vi.mock('@/features/living-cost', () => ({
  CostCalculatorModal: ({
    apartmentId,
    initialRent,
  }: {
    apartmentId: string
    initialRent: number
  }) => <div>{`cost-${apartmentId}-${initialRent}`}</div>,
}))
vi.mock('@/features/safety-reports', () => ({
  ReportFormDialog: ({
    targetId,
    targetTitle,
  }: {
    targetId: string
    targetTitle: string
  }) => <div>{`report-${targetId}-${targetTitle}`}</div>,
}))

describe('PropertyDecisionActions', () => {
  it('connects cost estimation and safety reporting to the selected listing', () => {
    render(
      <PropertyDecisionActions
        propertyId="apt-1"
        title="Căn hộ xanh"
        monthlyRent={12_000_000}
      />
    )

    expect(screen.getByText('cost-apt-1-12000000')).toBeInTheDocument()
    expect(screen.getByText('report-apt-1-Căn hộ xanh')).toBeInTheDocument()
  })
})
