import { render, screen } from '@testing-library/react'
import { describe, expect, it, vi } from 'vitest'
import { HomeDashboard } from '../src/widgets/home-dashboard/ui/home-dashboard'

// Mock next/image since it requires special loaders in test environments
vi.mock('next/image', () => ({
  default: function MockImage({
    src,
    alt,
  }: {
    src: string
    alt: string
  }): React.ReactElement {
    return <div data-testid="mock-image" data-src={src} data-alt={alt} />
  },
}))

describe('HomeDashboard', () => {
  it('renders the home page layout correctly', () => {
    render(<HomeDashboard />)

    expect(
      screen.getByRole('heading', {
        name: /tìm căn hộ phù hợp/i,
      })
    ).toBeInTheDocument()
    expect(screen.getByText(/trải nghiệm căn hộ vr 360°/i)).toBeInTheDocument()
  })
})
