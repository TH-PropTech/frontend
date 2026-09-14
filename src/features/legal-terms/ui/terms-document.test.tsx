import { render, screen, fireEvent } from '@testing-library/react'
import { describe, expect, it, vi } from 'vitest'
import { TermsDocument } from './terms-document'
import type {
  PublicLegalTermsResponse,
  PublicPolicyItem,
} from '../api/legal-terms-api'

const mockTerms: PublicLegalTermsResponse = {
  key: 'rental-service-terms',
  version: 1,
  title: 'Điều khoản Dịch vụ Thuê Căn hộ',
  summary: 'Tóm tắt các quy định pháp luật.',
  contentHash:
    'a1b2c3d4e5f6a1b2c3d4e5f6a1b2c3d4e5f6a1b2c3d4e5f6a1b2c3d4e5f6a1b2',
  publishedAt: '2026-09-13T00:00:00.000Z',
  sections: [
    {
      id: 'sec-1',
      heading: '1. Căn cứ pháp lý',
      body: 'Tuân thủ Luật Nhà ở 2023.',
      order: 1,
    },
    {
      id: 'sec-2',
      heading: '2. Quy định đặt cọc',
      body: 'Cọc tối đa theo quy định.',
      order: 2,
    },
  ],
}

const mockPolicies: PublicPolicyItem[] = [
  {
    key: 'PLATFORM_FEE_PERCENT',
    value: '1',
    description: 'Phí hoa hồng dịch vụ',
    unit: '%',
    legalReference: 'Quy chế sàn',
  },
]

describe('TermsDocument', () => {
  it('renders title, version, summary and sections', () => {
    render(<TermsDocument terms={mockTerms} policies={mockPolicies} />)

    expect(screen.getByText('Điều khoản Dịch vụ Thuê Căn hộ')).toBeDefined()
    expect(screen.getByText('v1')).toBeDefined()
    expect(screen.getByText('Tóm tắt các quy định pháp luật.')).toBeDefined()
    expect(screen.getAllByText('1. Căn cứ pháp lý')).toHaveLength(2)
    expect(screen.getAllByText('2. Quy định đặt cọc')).toHaveLength(2)
    expect(screen.getByText('Tuân thủ Luật Nhà ở 2023.')).toBeDefined()
  })

  it('renders public policies appendix', () => {
    render(<TermsDocument terms={mockTerms} policies={mockPolicies} />)

    expect(screen.getByText('Phí hoa hồng dịch vụ')).toBeDefined()
    expect(screen.getByText('1 %')).toBeDefined()
    expect(screen.getByText('Quy chế sàn')).toBeDefined()
  })

  it('copies content hash to clipboard on button click', async () => {
    const writeTextMock = vi.fn().mockResolvedValue(undefined)
    Object.assign(navigator, {
      clipboard: {
        writeText: writeTextMock,
      },
    })

    render(<TermsDocument terms={mockTerms} policies={mockPolicies} />)

    const copyBtn = screen.getByLabelText('Sao chép mã băm')
    fireEvent.click(copyBtn)

    expect(writeTextMock).toHaveBeenCalledWith(mockTerms.contentHash)
  })
})
