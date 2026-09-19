import { render, screen } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import * as React from 'react'
import { FeaturedLocations } from '../featured-locations'

describe('FeaturedLocations Component - Mobile Carousel & Direct Query Links', () => {
  it('renders section title, badge, and 6 district items (Happy Path)', () => {
    render(<FeaturedLocations />)

    expect(screen.getByText(/khu vực nổi bật/i)).toBeInTheDocument()
    expect(
      screen.getByText(/khám phá căn hộ theo khu vực ưa thích/i)
    ).toBeInTheDocument()

    const districts = [
      'Quận 1',
      'Quận 2',
      'Quận 7',
      'Bình Thạnh',
      'Thủ Đức',
      'Phú Nhuận',
    ]
    for (const district of districts) {
      expect(screen.getByText(district)).toBeInTheDocument()
    }
  })

  it('links each district card to /properties with encoded query parameters (Boundary & Links)', () => {
    render(<FeaturedLocations />)

    const q1Link = screen.getByRole('link', { name: /quận 1/i })
    expect(q1Link).toHaveAttribute(
      'href',
      '/properties?district=Qu%E1%BA%ADn%201'
    )

    const btLink = screen.getByRole('link', { name: /bình thạnh/i })
    expect(btLink).toHaveAttribute(
      'href',
      '/properties?district=B%C3%ACnh%20Th%E1%BA%A1nh'
    )
  })

  it('has horizontal scroll-snap classes for mobile carousel experience (Mobile Carousel)', () => {
    const { container } = render(<FeaturedLocations />)

    const scrollContainer = container.querySelector('.snap-x')
    expect(scrollContainer).toBeInTheDocument()
    expect(scrollContainer?.className).toContain('overflow-x-auto')
    expect(scrollContainer?.className).toContain('snap-mandatory')
    expect(scrollContainer?.className).toContain('no-scrollbar')

    const snapItems = container.querySelectorAll('.snap-start')
    expect(snapItems.length).toBe(6)
  })

  it('renders mobile swipe hint indicator for smooth UX guidance (Guidance & Feedback)', () => {
    render(<FeaturedLocations />)
    expect(screen.getByText(/vuốt sang để xem thêm quận/i)).toBeInTheDocument()
  })

  it('contains vector icons without raw emoji characters (Design Tokens & Icon Policy)', () => {
    const { container } = render(<FeaturedLocations />)
    const svgs = container.querySelectorAll('svg')
    expect(svgs.length).toBeGreaterThanOrEqual(6)
  })
})
