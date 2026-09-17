import { render, screen, waitFor, fireEvent } from '@testing-library/react'
import { describe, expect, it, vi, beforeEach } from 'vitest'
import {
  PublicServiceCitationPanel,
  DVC_LINKS,
} from './public-service-citation-panel'
import * as contractsApi from '../api/contracts-api'

vi.mock('../api/contracts-api', () => ({
  getPublicServiceChecklist: vi.fn(),
}))

describe('PublicServiceCitationPanel', () => {
  const mockChecklist: contractsApi.PublicServiceChecklist = {
    purpose: 'temporary-residence',
    externalProcedureCompleted: false,
    officialSourceUrl: DVC_LINKS.RESIDENCE_1004194,
    executionMethod: 'POC_ECONSENT',
    notarizationStatus: 'not-requested',
    disclaimer:
      'Hệ thống chỉ xuất checklist và bằng chứng hiện có; không tự nộp hoặc xác nhận thủ tục bên ngoài.',
    items: [
      {
        id: 'locked-contract-copy',
        status: 'available',
        required: true,
      },
      {
        id: 'signing-evidence',
        status: 'evidence-present',
        required: true,
      },
      {
        id: 'notarization-or-authentication',
        status: 'required-before-submission',
        required: true,
      },
    ],
  }

  beforeEach(() => {
    vi.clearAllMocks()
    vi.mocked(contractsApi.getPublicServiceChecklist).mockResolvedValue(
      mockChecklist
    )
  })

  it('renders direct buttons and links to public service portals with target="_blank"', async () => {
    render(
      <PublicServiceCitationPanel
        contractId="contract-123"
        contractCode="HD-2026-999"
      />
    )

    expect(
      screen.getByTestId('public-service-citation-panel')
    ).toBeInTheDocument()

    // Verify TTHC 1.004194 Direct Link
    const linkResidence = screen.getByTestId('link-dvc-residence-1004194')
    expect(linkResidence).toHaveAttribute('href', DVC_LINKS.RESIDENCE_1004194)
    expect(linkResidence).toHaveAttribute('target', '_blank')
    expect(linkResidence).toHaveAttribute('rel', 'noopener noreferrer')
    expect(linkResidence).toHaveTextContent(
      'Mở Cổng DVC Quốc gia (TTHC 1.004194)'
    )

    // Verify TTHC 1.007689 Direct Link
    const linkTax = screen.getByTestId('link-dvc-tax-1007689')
    expect(linkTax).toHaveAttribute('href', DVC_LINKS.RENTAL_TAX_1007689)
    expect(linkTax).toHaveAttribute('target', '_blank')
    expect(linkTax).toHaveAttribute('rel', 'noopener noreferrer')
    expect(linkTax).toHaveTextContent('Mở Cổng DVC Thuế (TTHC 1.007689)')

    // Verify Statutory legal foundation links
    const linkHousing = screen.getByTestId('link-legal-housing-law')
    expect(linkHousing).toHaveAttribute('href', DVC_LINKS.HOUSING_LAW_2023)
    expect(linkHousing).toHaveAttribute('target', '_blank')

    const linkDecree = screen.getByTestId('link-legal-decree-96')
    expect(linkDecree).toHaveAttribute('href', DVC_LINKS.DECREE_96_2024)

    const linkCivil = screen.getByTestId('link-legal-civil-code')
    expect(linkCivil).toHaveAttribute('href', DVC_LINKS.CIVIL_CODE_2015)
  })

  it('loads and displays contract live checklist items and badges', async () => {
    render(
      <PublicServiceCitationPanel
        contractId="contract-123"
        contractCode="HD-2026-999"
      />
    )

    await waitFor(() => {
      expect(screen.getByTestId('dvc-checklist-items')).toBeInTheDocument()
    })

    expect(screen.getByText('Bản hợp đồng đã khóa hash')).toBeInTheDocument()
    expect(screen.getByText('Có sẵn')).toBeInTheDocument()
    expect(
      screen.getByText('Bằng chứng ký số e-Consent / Sổ cái')
    ).toBeInTheDocument()
    expect(screen.getByText('Đã có bằng chứng')).toBeInTheDocument()
    expect(
      screen.getByText('Công chứng hoặc chứng thực (nếu thỏa thuận)')
    ).toBeInTheDocument()
    expect(screen.getByText('Cần hoàn tất trước khi nộp')).toBeInTheDocument()
  })

  it('renders disclaimer from API or fallback default', async () => {
    render(
      <PublicServiceCitationPanel
        contractId="contract-123"
        contractCode="HD-2026-999"
      />
    )

    await waitFor(() => {
      expect(screen.getByTestId('dvc-disclaimer')).toHaveTextContent(
        'Hệ thống chỉ xuất checklist và bằng chứng hiện có; không tự nộp hoặc xác nhận thủ tục bên ngoài.'
      )
    })
  })

  it('handles error state and allows refreshing checklist', async () => {
    vi.mocked(contractsApi.getPublicServiceChecklist).mockRejectedValueOnce(
      new Error('Lỗi mạng khi tải dữ liệu DVC')
    )

    render(<PublicServiceCitationPanel contractId="contract-123" />)

    await waitFor(() => {
      expect(
        screen.getByText('Lỗi mạng khi tải dữ liệu DVC')
      ).toBeInTheDocument()
    })

    // Click refresh button
    vi.mocked(contractsApi.getPublicServiceChecklist).mockResolvedValueOnce(
      mockChecklist
    )

    const refreshBtn = screen.getByLabelText('Tải lại đối soát hồ sơ DVC')
    fireEvent.click(refreshBtn)

    await waitFor(() => {
      expect(screen.getByTestId('dvc-checklist-items')).toBeInTheDocument()
    })
  })
})
