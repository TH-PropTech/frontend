import { render, screen } from '@testing-library/react'
import { describe, it, expect, vi } from 'vitest'
import * as React from 'react'
import { HeroSection } from '../hero-section'

vi.mock('next/navigation', () => ({
  useRouter: () => ({
    push: vi.fn(),
  }),
}))

describe('HeroSection Component - Integration with Quick Search Bar', () => {
  it('renders hero title, description, and embedded quick search bar (Happy Path)', () => {
    render(<HeroSection />)

    expect(
      screen.getByRole('heading', {
        level: 1,
        name: /tìm căn hộ phù hợp/i,
      })
    ).toBeInTheDocument()

    expect(screen.getByTestId('hero-quick-search-bar')).toBeInTheDocument()
    expect(
      screen.getByTestId('quick-search-district-trigger')
    ).toBeInTheDocument()
    expect(screen.getByTestId('quick-search-price-trigger')).toBeInTheDocument()
    expect(
      screen.getByTestId('quick-search-bedrooms-trigger')
    ).toBeInTheDocument()
  })

  it('renders hero background image with proper priority and alt attributes (Visual Integrity)', () => {
    render(<HeroSection />)

    const heroImg = screen.getByAltText(/th-proptech hero background/i)
    expect(heroImg).toBeInTheDocument()
  })
})
