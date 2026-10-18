import { render, screen } from '@testing-library/react'
import { describe, expect, it, vi } from 'vitest'
import type { ApartmentItem } from '@/entities/properties'
import { PriceTrendPanel } from './price-trend-panel'
import { PropertyReviews } from './property-reviews'

const property = {
  id: 'property-1',
  title: 'Căn hộ thử nghiệm',
  priceNum: 18,
  areaNum: 65,
  bedrooms: 2,
  bathrooms: 1,
  price: '18 triệu/tháng',
  area: '65 m2',
  projectName: 'Dự án thử nghiệm',
  isVerified: true,
} as ApartmentItem

describe('property detail demo-data disclosures', () => {
  it('labels every static intelligence panel as illustrative data', () => {
    render(
      <>
        <PriceTrendPanel property={property} onExplain={vi.fn()} />
        <PropertyReviews />
      </>
    )

    expect(screen.getAllByText('Dữ liệu minh hoạ')).toHaveLength(3)
  })
})
