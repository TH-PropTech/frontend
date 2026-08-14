import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import { NearbyFacilitiesCard } from './nearby-facilities-card'

describe('NearbyFacilitiesCard', () => {
  it('renders the area overview, facilities and provenance', () => {
    render(
      <NearbyFacilitiesCard
        profile={{
          _id: 'profile-1',
          district: 'Quận 7',
          city: 'Hồ Chí Minh',
          overview: 'Khu vực thuận tiện.',
          facilities: [
            { type: 'school', name: 'Trường A', distanceMeters: 500 },
          ],
          source: 'Khảo sát',
          disclaimer: 'Thông tin tham khảo',
          lastSurveyedAt: '2026-01-01',
        }}
      />
    )
    expect(screen.getByText('Khu vực thuận tiện.')).toBeTruthy()
    expect(screen.getByText('Trường A')).toBeTruthy()
    expect(screen.getByText(/Khảo sát/)).toBeTruthy()
  })
})
