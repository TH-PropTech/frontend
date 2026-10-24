import { render, screen } from '@testing-library/react'
import { describe, it, expect, vi } from 'vitest'
import * as React from 'react'
import { FeaturedApartments } from '../featured-apartments'
import type { RecommendationResult } from '@/features/ai-recommendation'

describe('FeaturedApartments Component - Fallback Curation & AI Recommendations', () => {
  const defaultProps = {
    results: [],
    isLoading: false,
    likedIds: {},
    hasSubmitted: false,
    handleFeedback: vi.fn(),
    onOpenSurvey: vi.fn(),
    isAuthenticated: false,
  }

  it('renders curated fallback apartments and AI survey banner when user has not submitted survey', () => {
    render(<FeaturedApartments {...defaultProps} />)

    // Heading
    expect(screen.getByText(/căn hộ nổi bật & minh bạch/i)).toBeInTheDocument()

    // AI Callout Banner
    expect(
      screen.getByText(/tìm căn hộ phù hợp với nhu cầu và túi tiền của bạn/i)
    ).toBeInTheDocument()
    expect(
      screen.getByRole('button', { name: /bắt đầu khảo sát/i })
    ).toBeInTheDocument()

    // 3 Curated apartments
    expect(screen.getByText(/landmark 81/i)).toBeInTheDocument()
    expect(screen.getByText(/masteri an phú/i)).toBeInTheDocument()
    expect(screen.getByText(/the sun avenue/i)).toBeInTheDocument()

    // Price tags & badges
    expect(screen.getAllByText(/vr 360°/i).length).toBeGreaterThanOrEqual(3)
    expect(screen.getAllByText(/nổi bật/i).length).toBeGreaterThanOrEqual(3)
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
