import { render, screen } from '@testing-library/react'
import { describe, it, expect, vi } from 'vitest'
import * as React from 'react'
import { FeaturedApartments } from '../featured-apartments'
import type { RecommendationResult } from '@/features/ai-recommendation'
import type { FeaturedCard } from '../../../model/home-apartment-stats'

const CARD: FeaturedCard = {
  id: 'apt-1',
  name: 'Căn hộ Thật Quận 2',
  district: 'Quận 2',
  rent_price: 14_000_000,
  rooms: 2,
  reasons: ['Dự án Masteri'],
  match_score: 0,
  isVerified: false,
  hasVr: false,
}

const defaultProps = {
  apartments: [CARD],
  isApartmentsLoading: false,
  results: [],
  isLoading: false,
  likedIds: {},
  hasSubmitted: false,
  handleFeedback: vi.fn(),
  onOpenSurvey: vi.fn(),
  isAuthenticated: false,
}

describe('FeaturedApartments Component - API data & AI Recommendations', () => {
  it('renders apartments from the API and the AI survey banner before the survey', () => {
    render(<FeaturedApartments {...defaultProps} />)

    expect(screen.getByText(/căn hộ nổi bật & minh bạch/i)).toBeInTheDocument()
    expect(
      screen.getByRole('button', { name: /bắt đầu khảo sát/i })
    ).toBeInTheDocument()
    expect(
      screen.getByRole('heading', { name: /căn hộ thật quận 2/i })
    ).toBeInTheDocument()
    expect(screen.getByText('Dự án Masteri')).toBeInTheDocument()
  })

  it('shows VR and verified badges only when the apartment really has them', () => {
    const { rerender } = render(<FeaturedApartments {...defaultProps} />)
    expect(screen.queryByText(/vr 360°/i)).not.toBeInTheDocument()
    expect(screen.queryByText(/đã kiểm duyệt/i)).not.toBeInTheDocument()

    rerender(
      <FeaturedApartments
        {...defaultProps}
        apartments={[{ ...CARD, hasVr: true, isVerified: true }]}
      />
    )
    expect(screen.getByText(/vr 360°/i)).toBeInTheDocument()
    expect(screen.getByText(/đã kiểm duyệt/i)).toBeInTheDocument()
  })

  it('shows at most 3 apartments', () => {
    const many = Array.from({ length: 5 }, (_, i) => ({
      ...CARD,
      id: `apt-${i}`,
      name: `Căn hộ ${i}`,
    }))
    render(<FeaturedApartments {...defaultProps} apartments={many} />)

    expect(screen.getAllByRole('link', { name: /chi tiết/i })).toHaveLength(3)
  })

  it('shows an empty state instead of invented apartments when the API returns none', () => {
    render(<FeaturedApartments {...defaultProps} apartments={[]} />)

    expect(
      screen.getByText(/chưa có căn hộ nào để hiển thị/i)
    ).toBeInTheDocument()
    expect(screen.queryByText(/landmark 81/i)).not.toBeInTheDocument()
  })

  it('shows skeleton placeholders, not the empty state, while apartments load', () => {
    const { container } = render(
      <FeaturedApartments
        {...defaultProps}
        apartments={[]}
        isApartmentsLoading={true}
      />
    )

    expect(container.querySelector('.animate-pulse')).toBeInTheDocument()
    expect(
      screen.queryByText(/chưa có căn hộ nào để hiển thị/i)
    ).not.toBeInTheDocument()
  })

  it('renders AI recommendation results when user has submitted survey', () => {
    const aiResults: RecommendationResult[] = [
      {
        id: 'rec-1',
        name: 'Căn hộ Sunrise City Quận 7',
        district: 'Quận 7',
        rent_price: 12000000,
        rooms: 2,
        has_gym: true,
        has_parking: true,
        match_score: 95,
        reasons: ['Gần trường đại học', 'Hồ bơi tràn viền'],
        confidence: 'Cao',
        contributions: {
          finance: 0.95,
          location: 0.95,
          demographics: 0.9,
          amenities: 0.9,
        },
      },
    ]

    render(
      <FeaturedApartments
        {...defaultProps}
        hasSubmitted={true}
        results={aiResults}
      />
    )

    expect(
      screen.getByText(/căn hộ ai gợi ý phù hợp nhất/i)
    ).toBeInTheDocument()
    expect(screen.getByText(/95% khớp/i)).toBeInTheDocument()
    expect(
      screen.getByRole('heading', { name: /căn hộ sunrise city quận 7/i })
    ).toBeInTheDocument()
  })

  it('renders empty state when survey yielded 0 matching apartments', () => {
    render(
      <FeaturedApartments {...defaultProps} hasSubmitted={true} results={[]} />
    )

    expect(
      screen.getByText(/chưa tìm thấy căn hộ phù hợp hoàn toàn/i)
    ).toBeInTheDocument()
    expect(
      screen.getByRole('button', { name: /thay đổi thông tin khảo sát/i })
    ).toBeInTheDocument()
  })
})
