import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import { CommunityHero } from './community-hero'

describe('CommunityHero', () => {
  it('shows the headline without any invented members or numbers when stats are missing', () => {
    render(<CommunityHero />)

    expect(
      screen.getByRole('heading', { name: /Hỏi đáp & Đánh giá căn hộ/ })
    ).toBeInTheDocument()
    expect(screen.queryByRole('list')).not.toBeInTheDocument()
    expect(screen.queryByText('Thạch')).not.toBeInTheDocument()
    expect(screen.queryByText(/năng động/)).not.toBeInTheDocument()
  })

  it('treats zero counts as missing', () => {
    render(<CommunityHero contributorCount={0} projectCount={0} />)
    expect(screen.queryByRole('list')).not.toBeInTheDocument()
  })

  it('shows the real contributor and project counts', () => {
    render(<CommunityHero contributorCount={12} projectCount={4} />)

    expect(
      screen.getByText('12 người đã đóng góp bài viết')
    ).toBeInTheDocument()
    expect(screen.getByText('4 dự án đang thảo luận')).toBeInTheDocument()
  })

  it('shows only the figure that is available', () => {
    render(<CommunityHero projectCount={3} />)

    expect(screen.getByText('3 dự án đang thảo luận')).toBeInTheDocument()
    expect(screen.queryByText(/người đã đóng góp/)).not.toBeInTheDocument()
  })
})
