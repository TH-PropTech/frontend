import { render, screen } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import * as React from 'react'
import { FeaturedLocations } from '../featured-locations'
import type { DistrictStat } from '../../../model/home-apartment-stats'

const DISTRICTS: DistrictStat[] = [
  { name: 'Quận 1', count: 24, priceRange: '12–25 Tr' },
  { name: 'Bình Thạnh', count: 3, priceRange: '' },
]

describe('FeaturedLocations Component - API-driven districts', () => {
  it('renders one card per district with its real count and price range', () => {
    render(<FeaturedLocations districts={DISTRICTS} />)

    expect(screen.getByText(/khu vực nổi bật/i)).toBeInTheDocument()
    expect(screen.getByText('Quận 1')).toBeInTheDocument()
    expect(screen.getByText('24')).toBeInTheDocument()
    expect(screen.getByText(/căn hộ · 12–25 Tr/)).toBeInTheDocument()
  })

  it('omits the price range when the district has no priced apartments', () => {
    render(<FeaturedLocations districts={DISTRICTS} />)

    expect(screen.getByText('căn hộ')).toBeInTheDocument()
  })

  it('renders nothing when there are no districts (Empty State)', () => {
    const { container } = render(<FeaturedLocations districts={[]} />)

    expect(container).toBeEmptyDOMElement()
  })

  it('links each district card to /properties with encoded query parameters', () => {
    render(<FeaturedLocations districts={DISTRICTS} />)

    expect(screen.getByRole('link', { name: /quận 1/i })).toHaveAttribute(
      'href',
      '/properties?district=Qu%E1%BA%ADn%201'
    )
    expect(screen.getByRole('link', { name: /bình thạnh/i })).toHaveAttribute(
      'href',
      '/properties?district=B%C3%ACnh%20Th%E1%BA%A1nh'
    )
  })

  it('keeps horizontal scroll-snap classes for the mobile carousel', () => {
    const { container } = render(<FeaturedLocations districts={DISTRICTS} />)

    const scrollContainer = container.querySelector('.snap-x')
    expect(scrollContainer?.className).toContain('overflow-x-auto')
    expect(scrollContainer?.className).toContain('snap-mandatory')
    expect(container.querySelectorAll('.snap-start')).toHaveLength(2)
    expect(screen.getByText(/vuốt sang để xem thêm quận/i)).toBeInTheDocument()
  })
})
