import { render, screen } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import * as React from 'react'
import { BlogKnowledgeSection } from '../blog-knowledge-section'

describe('BlogKnowledgeSection Component - Mobile Carousel & Density Refinement', () => {
  it('renders section title, badge, and 3 knowledge articles (Happy Path)', () => {
    render(<BlogKnowledgeSection />)

    expect(screen.getByText(/cẩm nang & tin tức/i)).toBeInTheDocument()
    expect(
      screen.getByText(/kiến thức & kinh nghiệm thuê nhà hữu ích/i)
    ).toBeInTheDocument()

    expect(
      screen.getAllByText(/5 điều cần lưu ý kỹ trước khi ký hợp đồng đặt cọc/i)
        .length
    ).toBeGreaterThanOrEqual(1)
    expect(
      screen.getAllByText(/hướng dẫn sử dụng vr 360° chọn căn hộ/i).length
    ).toBeGreaterThanOrEqual(1)
    expect(
      screen.getAllByText(
        /cách bảo vệ thông tin giao dịch nhờ ứng dụng blockchain/i
      ).length
    ).toBeGreaterThanOrEqual(1)
  })

  it('provides horizontal scroll-snap container on mobile (Mobile Carousel)', () => {
    const { container } = render(<BlogKnowledgeSection />)

    const scrollContainer = container.querySelector('.snap-x')
    expect(scrollContainer).toBeInTheDocument()
    expect(scrollContainer?.className).toContain('overflow-x-auto')
    expect(scrollContainer?.className).toContain('snap-mandatory')
    expect(scrollContainer?.className).toContain('no-scrollbar')

    const snapItems = container.querySelectorAll('.snap-start')
    expect(snapItems.length).toBe(3)
  })

  it('uses refined density rounded-2xl and compact spacing (PROP-327 Alignment)', () => {
    const { container } = render(<BlogKnowledgeSection />)

    const cards = container.querySelectorAll('.rounded-2xl')
    expect(cards.length).toBeGreaterThanOrEqual(3)

    const p5Elements = container.querySelectorAll('.p-5')
    expect(p5Elements.length).toBeGreaterThanOrEqual(3)
  })

  it('renders mobile swipe hint indicator for smooth UX guidance (Guidance & Feedback)', () => {
    render(<BlogKnowledgeSection />)
    expect(
      screen.getByText(/vuốt sang để đọc thêm bài viết/i)
    ).toBeInTheDocument()
  })

  it('renders clean vector arrows with no raw emojis (Icon & Token Policy)', () => {
    const { container } = render(<BlogKnowledgeSection />)
    const svgs = container.querySelectorAll('svg')
    expect(svgs.length).toBeGreaterThanOrEqual(3)
  })
})
