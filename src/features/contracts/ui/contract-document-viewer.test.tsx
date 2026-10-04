import { render, screen, fireEvent } from '@testing-library/react'
import { describe, expect, it, vi } from 'vitest'
import {
  ContractDocumentViewer,
  type ContractDocumentViewerProps,
} from './contract-document-viewer'
import type { ContractDocumentView } from '../api/contracts-api'

describe('ContractDocumentViewer', () => {
  const mockDocument: ContractDocumentView = {
    mode: 'locked',
    revision: 1,
    lockedAt: '2026-03-14T00:00:00Z',
    lockedHash: '0x1234567890abcdef',
    hashSchemaVersion: 1,
    legalProfile: null,
    templateVersion: '1.0',
    canonicalArtifact: {
      artifactId: 'artifact-2026-001',
      revision: 4,
      templateKey: 'lease-vn',
      templateVersion: 7,
      artifactHash: 'a'.repeat(64),
      contentType: 'application/pdf',
    },
    sections: [
      {
        id: 'article-1',
        number: 1,
        title: 'Đối tượng hợp đồng và mô tả căn hộ',
        content: 'Bên A đồng ý cho Bên B thuê căn hộ 101 chung cư Sunrise.',
        protected: true,
        hash: 'hash-1',
      },
      {
        id: 'article-2',
        number: 2,
        title: 'Mục đích sử dụng',
        content: 'Căn hộ chỉ được sử dụng cho mục đích để ở.',
        protected: false,
        hash: 'hash-2',
      },
    ],
    annexes: [
      {
        id: 'annex-1',
        title: 'Biên bản bàn giao hiện trạng',
        description: 'Mô tả chi tiết trang thiết bị bàn giao',
        required: true,
      },
      {
        id: 'annex-2',
        title: 'Nội quy nhà chung cư và an toàn PCCC',
        description: 'Quy chuẩn an toàn chung cư',
        required: true,
      },
    ],
    integrity: 'valid',
  }

  const defaultProps: ContractDocumentViewerProps = {
    document: mockDocument,
    contractCode: 'HD-2026-001',
    status: 'awaiting-signature',
    networkMode: 'simulation',
  }

  it('renders National Header, contract code, status and watermark', () => {
    render(<ContractDocumentViewer {...defaultProps} />)
    expect(
      screen.getByText(/CỘNG HÒA XÃ HỘI CHỦ NGHĨA VIỆT NAM/i)
    ).toBeInTheDocument()
    expect(screen.getByText('HD-2026-001')).toBeInTheDocument()
    expect(screen.getByText(/Chờ ký/i)).toBeInTheDocument()
    expect(screen.getByTestId('simulation-banner')).toBeInTheDocument()
    expect(screen.getByTestId('contract-watermark')).toBeInTheDocument()
  })

  it('keeps the A4 paper padding compact beside the workspace sidebar', () => {
    render(<ContractDocumentViewer {...defaultProps} />)

    expect(screen.getByTestId('contract-document-paper')).toHaveClass('md:p-10')
  })

  it('renders the canonical PDF version, digest, and official citation links', () => {
    render(<ContractDocumentViewer {...defaultProps} />)

    const artifactPanel = screen.getByTestId('canonical-artifact-panel')
    expect(artifactPanel).toHaveTextContent('artifact-2026-001')
    expect(artifactPanel).toHaveTextContent('Bản sửa đổi 4')
    expect(artifactPanel).toHaveTextContent('a'.repeat(64))

    const decreeLink = screen.getByRole('link', {
      name: /Nghị định số 96\/2024\/NĐ-CP/i,
    })
    expect(decreeLink).toHaveAttribute(
      'href',
      'https://xaydungchinhsach.chinhphu.vn/mau-hop-dong-thue-nha-o-119240827172441217.htm'
    )
    expect(decreeLink).toHaveAttribute('target', '_blank')
    expect(decreeLink).toHaveAttribute('rel', 'noopener noreferrer')
  })

  it('renders articles with protected badges and correct section heading numbering', () => {
    render(<ContractDocumentViewer {...defaultProps} />)
    expect(
      screen.getByText('Điều 1. Đối tượng hợp đồng và mô tả căn hộ')
    ).toBeInTheDocument()
    expect(screen.getByText('Điều 2. Mục đích sử dụng')).toBeInTheDocument()
    expect(screen.getByText('Bảo vệ')).toBeInTheDocument()
  })

  it('does not double prefix when section title already starts with "Điều "', () => {
    const docWithPrefixedTitle: ContractDocumentView = {
      ...mockDocument,
      sections: [
        {
          id: 'article-5',
          number: 5,
          title: 'Điều 5. Foo',
          content: 'Nội dung điều 5',
          protected: false,
          hash: 'hash-5',
        },
      ],
    }

    render(
      <ContractDocumentViewer
        {...defaultProps}
        document={docWithPrefixedTitle}
      />
    )

    expect(screen.getByText('Điều 5. Foo')).toBeInTheDocument()
    expect(screen.queryByText(/Điều 1\. Điều 5\. Foo/)).not.toBeInTheDocument()
  })

  it('renders annexes with required badges', () => {
    render(<ContractDocumentViewer {...defaultProps} />)
    expect(screen.getByText('Biên bản bàn giao hiện trạng')).toBeInTheDocument()
    expect(
      screen.getByText('Nội quy nhà chung cư và an toàn PCCC')
    ).toBeInTheDocument()
    expect(screen.getAllByText('Bắt buộc')).toHaveLength(2)
  })

  it('renders a published layout in configured order and separates supplementary clauses', () => {
    const documentWithLayout: ContractDocumentView = {
      ...mockDocument,
      layout: {
        profileKey: 'lease-v2',
        version: 4,
        blocks: [
          {
            blockId: 'SIGNATURES',
            order: 1,
            title: 'Signatures',
            visible: true,
          },
          {
            blockId: 'LEGAL_ARTICLES',
            order: 2,
            title: 'Articles',
            visible: true,
          },
          { blockId: 'PARTIES', order: 3, title: 'Parties', visible: true },
          { blockId: 'PROPERTY', order: 4, title: 'Property', visible: true },
          {
            blockId: 'SUPPLEMENTARY_CLAUSES',
            order: 5,
            title: 'Supplementary',
            visible: true,
          },
          { blockId: 'ANNEXES', order: 6, title: 'Annexes', visible: false },
          { blockId: 'HEADER', order: 7, title: 'Header', visible: true },
        ],
      },
      supplementaryClauses: [
        {
          id: 'custom-1',
          title: 'Pet clause',
          content: 'Pets are allowed with prior notice.',
        },
      ],
    }

    render(
      <ContractDocumentViewer {...defaultProps} document={documentWithLayout} />
    )

    expect(screen.getByTestId('contract-layout-profile')).toHaveTextContent(
      'Lease v2'
    )
    expect(screen.getByTestId('contract-layout-blocks')).toHaveTextContent(
      'SignaturesArticlesPartiesPropertySupplementaryHeader'
    )
    expect(screen.getByTestId('supplementary-clauses')).toHaveTextContent(
      'Pet clause'
    )
    expect(
      screen.getByTestId('supplementary-clause-custom-1')
    ).toHaveTextContent('Pets are allowed with prior notice.')
    expect(screen.queryByTestId('annex-annex-1')).not.toBeInTheDocument()
  })

  it('filters articles by search input', () => {
    render(<ContractDocumentViewer {...defaultProps} />)
    const searchInput = screen.getByLabelText('Tìm kiếm điều khoản')
    fireEvent.change(searchInput, { target: { value: 'mục đích' } })

    expect(
      screen.queryByText('Điều 1. Đối tượng hợp đồng và mô tả căn hộ')
    ).not.toBeInTheDocument()
    expect(screen.getByText('Điều 2. Mục đích sử dụng')).toBeInTheDocument()
  })

  it('shows empty message when search yields no results', () => {
    render(<ContractDocumentViewer {...defaultProps} />)
    const searchInput = screen.getByLabelText('Tìm kiếm điều khoản')
    fireEvent.change(searchInput, {
      target: { value: 'từ khóa không tồn tại' },
    })

    expect(
      screen.getByText(/Không tìm thấy điều khoản phù hợp/i)
    ).toBeInTheDocument()
  })

  it('filters articles by section selector', () => {
    render(<ContractDocumentViewer {...defaultProps} />)
    const select = screen.getByLabelText('Lọc theo điều khoản')
    fireEvent.change(select, { target: { value: 'article-1' } })

    expect(
      screen.getByText('Điều 1. Đối tượng hợp đồng và mô tả căn hộ')
    ).toBeInTheDocument()
    expect(
      screen.queryByText('Điều 2. Mục đích sử dụng')
    ).not.toBeInTheDocument()
  })

  it('triggers onDownloadPdf and onDownloadDocx when buttons clicked', () => {
    const onDownloadPdf = vi.fn()
    const onDownloadDocx = vi.fn()
    render(
      <ContractDocumentViewer
        {...defaultProps}
        onDownloadPdf={onDownloadPdf}
        onDownloadDocx={onDownloadDocx}
      />
    )

    fireEvent.click(screen.getByLabelText('Tải bản PDF'))
    expect(onDownloadPdf).toHaveBeenCalledTimes(1)

    fireEvent.click(screen.getByLabelText('Tải bản DOCX'))
    expect(onDownloadDocx).toHaveBeenCalledTimes(1)
  })

  it('triggers window.print when print button clicked', () => {
    const printSpy = vi.spyOn(window, 'print').mockImplementation(() => {})
    render(<ContractDocumentViewer {...defaultProps} />)

    fireEvent.click(screen.getByLabelText('In hợp đồng'))
    expect(printSpy).toHaveBeenCalledTimes(1)
    printSpy.mockRestore()
  })

  it('renders legal citations box, party information with eKYC status, and SmartCA signature blocks', () => {
    const propsWithParties: ContractDocumentViewerProps = {
      ...defaultProps,
      parties: {
        landlord: {
          id: 'landlord-1',
          name: 'Nguyễn Văn Chủ Nhà',
          role: 'landlord',
          kycStatus: 'verified',
          maskedCccd: '079******123',
          address: 'Thành phố Hồ Chí Minh',
          hasSigned: true,
          signedAt: '2026-03-15T08:30:00Z',
          provider: 'smartca',
          providerTransactionId: 'sca-landlord-1',
          certificateSerial: 'cert-landlord-1',
          signatureAlgorithm: 'RSA-PSS-SHA256',
        },
        tenant: {
          id: 'tenant-1',
          name: 'Trần Thị Thuê Nhà',
          role: 'tenant',
          kycStatus: 'verified',
          maskedCccd: '080******456',
          address: 'Quận 1, TP.HCM',
          hasSigned: false,
          signedAt: null,
        },
      },
    }

    render(<ContractDocumentViewer {...propsWithParties} />)

    // Legal citations
    expect(
      screen.getByText(/Nghị định số 96\/2024\/NĐ-CP/i)
    ).toBeInTheDocument()
    expect(
      screen.getByText(/Luật Kinh doanh bất động sản số 29\/2023\/QH15/i)
    ).toBeInTheDocument()

    // Parties
    expect(screen.getAllByText('Nguyễn Văn Chủ Nhà')).toHaveLength(2)
    expect(screen.getByText('079******123')).toBeInTheDocument()
    expect(screen.getAllByText('Trần Thị Thuê Nhà')).toHaveLength(2)
    expect(screen.getByText('080******456')).toBeInTheDocument()
    expect(screen.getAllByText(/Đã xác thực eKYC/i)).toHaveLength(2)

    // Signatures
    expect(screen.getByText(/Đại diện bên cho thuê/i)).toBeInTheDocument()
    expect(screen.getByText(/Đại diện bên thuê/i)).toBeInTheDocument()
    expect(screen.getByText('Chờ bên thuê ký')).toBeInTheDocument()
    expect(screen.getByTestId('landlord-signature-evidence')).toHaveTextContent(
      'sca-landlord-1'
    )
    expect(screen.getByTestId('landlord-signature-evidence')).toHaveTextContent(
      'cert-landlord-1'
    )
  })

  it('switches between Paginated A4 and Continuous view modes', () => {
    render(<ContractDocumentViewer {...defaultProps} />)

    // Default view mode is pages, should have page 1 marker
    expect(screen.getByText(/— Trang 1 \/ 4/i)).toBeInTheDocument()

    // Switch to continuous mode
    const continuousButton = screen.getByTitle('Chế độ cuộn liên tục')
    fireEvent.click(continuousButton)

    // In continuous mode, page footer markers are hidden
    expect(screen.queryByText(/— Trang 1 \/ 4/i)).not.toBeInTheDocument()

    // Switch back to paginated A4 mode
    const pagesButton = screen.getByTitle('Chế độ phân trang A4')
    fireEvent.click(pagesButton)
    expect(screen.getByText(/— Trang 1 \/ 4/i)).toBeInTheDocument()
  })

  it('adjusts zoom level when Zoom In and Zoom Out buttons clicked', () => {
    render(<ContractDocumentViewer {...defaultProps} />)

    expect(screen.getByText('100%')).toBeInTheDocument()

    const zoomInBtn = screen.getByTitle('Phóng to')
    fireEvent.click(zoomInBtn)
    expect(screen.getByText('110%')).toBeInTheDocument()

    const zoomOutBtn = screen.getByTitle('Thu nhỏ')
    fireEvent.click(zoomOutBtn)
    expect(screen.getByText('100%')).toBeInTheDocument()
  })

  it('keeps technical metadata collapsed by default', () => {
    render(<ContractDocumentViewer {...defaultProps} />)

    const details = screen.getByTestId('contract-technical-details')
    expect(details.tagName).toBe('DETAILS')
    expect(details).not.toHaveAttribute('open')
    expect(details).toContainElement(
      screen.getByTestId('canonical-artifact-panel')
    )
  })

  it('renders articles numbered above 12 in paginated mode', () => {
    render(
      <ContractDocumentViewer
        {...defaultProps}
        document={{
          ...mockDocument,
          sections: [
            ...mockDocument.sections,
            {
              id: 'article-13',
              number: 13,
              title: 'Điều khoản bổ sung',
              content: 'Nội dung điều 13.',
              protected: false,
              hash: 'hash-13',
            },
          ],
        }}
      />
    )

    expect(screen.getByTestId('article-13')).toBeInTheDocument()
  })

  it('does not invent party names when data is missing', () => {
    render(<ContractDocumentViewer {...defaultProps} parties={{}} />)

    expect(screen.queryByText('Nguyễn Văn Chủ Nhà')).not.toBeInTheDocument()
    expect(screen.queryByText('Trần Thị Thuê Nhà')).not.toBeInTheDocument()
    expect(screen.getAllByText('Chưa cập nhật').length).toBeGreaterThan(0)
  })

  it('shows legal basis names and plain labels instead of internal codes', () => {
    const { container } = render(
      <ContractDocumentViewer
        {...defaultProps}
        document={{
          ...mockDocument,
          legalProfile: 'PRIVATE_CIVIL_APARTMENT_LEASE',
          citationIds: [
            'DECREE_96_2024_APPENDIX_II_RESIDENTIAL_LEASE',
            'SOME_NEW_LEGAL_BASIS_CODE',
          ],
          sections: [
            {
              ...mockDocument.sections[0]!,
              citationIds: ['HOUSING_LAW_2023_ART_163_164'],
            },
            ...mockDocument.sections.slice(1),
          ],
        }}
      />
    )

    expect(
      screen.getAllByRole('link', {
        name: /Phụ lục II – Mẫu hợp đồng thuê nhà ở/,
      }).length
    ).toBeGreaterThan(0)
    expect(screen.getByText('Thuê căn hộ giữa cá nhân')).toBeInTheDocument()
    expect(screen.getByText('Some new legal basis code')).toBeInTheDocument()
    expect(container.textContent).not.toMatch(/[A-Z]{3,}(_[A-Z0-9]+){2,}/)
  })
})
