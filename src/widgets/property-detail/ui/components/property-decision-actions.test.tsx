import { render, screen } from '@testing-library/react'
import { describe, expect, it, vi } from 'vitest'
import { PropertyDecisionActions } from './property-decision-actions'

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
  it('connects safety reporting to the selected listing', () => {
    render(<PropertyDecisionActions propertyId="apt-1" title="Căn hộ xanh" />)

    expect(screen.getByText('report-apt-1-Căn hộ xanh')).toBeInTheDocument()
  })
})
