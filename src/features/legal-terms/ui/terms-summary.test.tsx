import { cleanup, render, screen } from '@testing-library/react'
import { afterEach, describe, expect, it } from 'vitest'
import { TermsSummary } from './terms-summary'
import type { PublicLegalTermsResponse } from '../api/legal-terms-api'

const mockTerms: PublicLegalTermsResponse = {
  key: 'rental-terms-canonical',
  version: 2,
  title: 'Quy chế thuê nhà tiêu chuẩn',
  summary: 'Tóm tắt quy định thuê nhà và trách nhiệm hai bên.',
  contentHash: 'a1b2c3d4e5f67890abcdef1234567890abcdef12',
  publishedAt: '2026-09-01T00:00:00Z',
  sections: [
    {
      id: 'sec-1',
      heading: 'Điều 1: Mục đích thuê',
      body: 'Căn hộ chỉ sử dụng vào mục đích để ở.',
      order: 1,
    },
    {
      id: 'sec-2',
      heading: 'Điều 2: Tiền cọc',
      body: 'Tiền cọc bảo đảm thực hiện hợp đồng.',
      order: 2,
    },
  ],
}

describe('TermsSummary Component', () => {
  afterEach(() => cleanup())

  it('renders loading state when loading is true', () => {
    render(<TermsSummary terms={null} loading={true} />)
    expect(screen.getByTestId('terms-summary-loading')).toBeInTheDocument()
  })

  it('renders error state when error is provided or terms is null', () => {
    const { rerender } = render(
      <TermsSummary terms={null} error="Không thể kết nối máy chủ" />
    )
    expect(screen.getByTestId('terms-summary-error')).toHaveTextContent(
      'Không thể kết nối máy chủ'
    )

    rerender(<TermsSummary terms={null} />)
    expect(screen.getByTestId('terms-summary-error')).toHaveTextContent(
      'Không tải được nội dung điều khoản áp dụng.'
    )
  })

  it('renders happy path with terms details, version, formatted hash, and sections', () => {
    render(<TermsSummary terms={mockTerms} />)
    expect(
      screen.getByText('Quy chế thuê nhà tiêu chuẩn (v2)')
    ).toBeInTheDocument()
    expect(
      screen.getByText('Tóm tắt quy định thuê nhà và trách nhiệm hai bên.')
    ).toBeInTheDocument()
    expect(screen.getByText('Điều 1: Mục đích thuê')).toBeInTheDocument()
    expect(screen.getByText('Điều 2: Tiền cọc')).toBeInTheDocument()
    expect(screen.getByText(/Hash: a1b2c3d4/)).toBeInTheDocument()

    const fullTermsLink = screen.getByRole('link', {
      name: /Xem toàn văn quy chế/i,
    })
    expect(fullTermsLink).toHaveAttribute('href', '/terms')
    expect(fullTermsLink).toHaveAttribute('target', '_blank')
  })

  it('handles terms with empty sections and short hash gracefully', () => {
    const shortTerms: PublicLegalTermsResponse = {
      ...mockTerms,
      contentHash: 'hash-short',
      sections: [],
    }
    render(<TermsSummary terms={shortTerms} />)
    expect(screen.getByText(/Hash: hash-short/)).toBeInTheDocument()
    expect(screen.queryByText('Các điều khoản chính:')).not.toBeInTheDocument()
  })
})
