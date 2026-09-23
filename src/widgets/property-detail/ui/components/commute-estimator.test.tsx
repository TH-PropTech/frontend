import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import { CommuteEstimator } from './commute-estimator'

describe('CommuteEstimator', () => {
  it('does not fabricate a map location when the property has no supported district', () => {
    render(
      <CommuteEstimator property={{ district: 'Khu vực chưa xác định' }} />
    )

    expect(
      screen.getByText('Chưa có tọa độ cho vị trí căn hộ này.')
    ).toBeInTheDocument()
  })
})
