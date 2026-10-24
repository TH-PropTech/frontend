import { render, screen } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import * as React from 'react'
import { ApartmentTypes } from '../apartment-types'
import type { BedroomStat } from '../../../model/home-apartment-stats'

const TYPES: BedroomStat[] = [
  { bedrooms: 1, count: 4, areaRange: '40–55 m²', minPrice: 'Từ 8 Tr' },
  { bedrooms: 2, count: 1, areaRange: '', minPrice: '' },
]

describe('ApartmentTypes Component - API-driven bedroom groups', () => {
  it('renders area, minimum price and count taken from the stats', () => {
    render(<ApartmentTypes types={TYPES} />)

    expect(screen.getByText('1 Phòng ngủ')).toBeInTheDocument()
    expect(screen.getByText('40–55 m²')).toBeInTheDocument()
    expect(screen.getByText('Từ 8 Tr')).toBeInTheDocument()
    expect(screen.getByText('4 căn hộ')).toBeInTheDocument()
  })

  it('skips area and price lines when the stats have none', () => {
    render(<ApartmentTypes types={TYPES} />)

    expect(screen.getByText('1 căn hộ')).toBeInTheDocument()
    expect(screen.getAllByText(/m²/)).toHaveLength(1)
    expect(screen.getAllByText(/^Từ /)).toHaveLength(1)
  })

  it('links each group to the matching bedrooms filter', () => {
    render(<ApartmentTypes types={TYPES} />)

    expect(screen.getByRole('link', { name: /2 phòng ngủ/i })).toHaveAttribute(
      'href',
      '/properties?bedrooms=2'
    )
  })

  it('renders nothing when there are no groups (Empty State)', () => {
    const { container } = render(<ApartmentTypes types={[]} />)

    expect(container).toBeEmptyDOMElement()
  })
})
