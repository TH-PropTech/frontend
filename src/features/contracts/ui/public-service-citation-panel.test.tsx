import {
  render,
  screen,
  waitFor,
  fireEvent,
  within,
} from '@testing-library/react'
import { describe, expect, it, vi, beforeEach } from 'vitest'
import { PublicServiceCitationPanel } from './public-service-citation-panel'
import * as contractsApi from '../api/contracts-api'
import * as legalSourcesApi from '../api/legal-sources-api'
import {
  HOUSING_LAW_SOURCE,
  PANEL_SOURCES,
  TAX_SOURCE,
  makeLegalSource,
} from '../test-fixtures/legal-sources.fixture'

vi.mock('../api/contracts-api', () => ({
  getPublicServiceChecklist: vi.fn(),
}))

vi.mock('../api/legal-sources-api', () => ({
  getContractPanelSources: vi.fn(),
}))

describe('PublicServiceCitationPanel', () => {
  const mockChecklist: contractsApi.PublicServiceChecklist = {
    purpose: 'temporary-residence',
    externalProcedureCompleted: false,
    officialSourceUrl: makeLegalSource().externalUrl,
    executionMethod: 'POC_ECONSENT',
    notarizationStatus: 'not-requested',
    disclaimer:
      'Hệ thống chỉ xuất checklist và bằng chứng hiện có; không tự nộp hoặc xác nhận thủ tục bên ngoài.',
    items: [
      { id: 'locked-contract-copy', status: 'available', required: true },
      { id: 'signing-evidence', status: 'evidence-present', required: true },
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
    vi.mocked(legalSourcesApi.getContractPanelSources).mockResolvedValue(
      PANEL_SOURCES
    )
  })

  it('renders every admin-managed source with link-source-<key> links', async () => {
    render(
      <PublicServiceCitationPanel
        contractId="contract-123"
        contractCode="HD-2026-999"
      />
    )

    for (const source of PANEL_SOURCES) {
      const link = await screen.findByTestId(`link-source-${source.key}`)
      expect(link).toHaveAttribute('href', source.externalUrl)
      expect(link).toHaveAttribute('target', '_blank')
      expect(link).toHaveAttribute('rel', 'noopener noreferrer')
    }
    expect(legalSourcesApi.getContractPanelSources).toHaveBeenCalledTimes(1)
  })

  it('khử trùng nguồn theo key và không phát cảnh báo key trùng', async () => {
    const errorSpy = vi.spyOn(console, 'error').mockImplementation(() => {})
    const dup = PANEL_SOURCES[0]!
    vi.mocked(legalSourcesApi.getContractPanelSources).mockResolvedValue([
      ...PANEL_SOURCES,
      dup,
    ])
    render(<PublicServiceCitationPanel contractId="contract-123" />)

    expect(await screen.findAllByTestId(`link-source-${dup.key}`)).toHaveLength(
      1
    )
    const keyWarnings = errorSpy.mock.calls.filter(c =>
      String(c[0]).includes('same key')
    )
    expect(keyWarnings).toHaveLength(0)
    errorSpy.mockRestore()
  })

  it('groups procedures and legal texts separately', async () => {
    render(<PublicServiceCitationPanel contractId="contract-123" />)

    const procedureHeading = await screen.findByText(
      'Thủ tục Hành chính Trực tuyến'
    )
    const procedureGroup = procedureHeading.parentElement as HTMLElement
    expect(
      within(procedureGroup).getByTestId(`link-source-${TAX_SOURCE.key}`)
    ).toBeInTheDocument()
    expect(
      within(procedureGroup).queryByTestId(
        `link-source-${HOUSING_LAW_SOURCE.key}`
      )
    ).toBeNull()

    const lawHeading = screen.getByText('Căn cứ Pháp luật Việt Nam')
    const lawGroup = lawHeading.parentElement as HTMLElement
    expect(
      within(lawGroup).getByTestId(`link-source-${HOUSING_LAW_SOURCE.key}`)
    ).toBeInTheDocument()
  })

  it('shows loading state while sources are pending', () => {
    vi.mocked(legalSourcesApi.getContractPanelSources).mockReturnValue(
      new Promise(() => undefined)
    )

    render(<PublicServiceCitationPanel contractId="contract-123" />)

    expect(screen.getByTestId('legal-sources-loading')).toBeInTheDocument()
  })

  it('shows empty state when no source is configured', async () => {
    vi.mocked(legalSourcesApi.getContractPanelSources).mockResolvedValue([])

    render(<PublicServiceCitationPanel contractId="contract-123" />)

    expect(await screen.findByTestId('legal-sources-empty')).toBeInTheDocument()
  })

  it('shows error with retry and keeps the checklist working', async () => {
    vi.mocked(legalSourcesApi.getContractPanelSources)
      .mockRejectedValueOnce(new Error('Lỗi tải nguồn pháp lý'))
      .mockResolvedValueOnce(PANEL_SOURCES)

    render(<PublicServiceCitationPanel contractId="contract-123" />)

    const error = await screen.findByTestId('legal-sources-error')
    expect(error).toHaveTextContent('Lỗi tải nguồn pháp lý')
    expect(await screen.findByTestId('dvc-checklist-items')).toBeInTheDocument()

    fireEvent.click(within(error).getByRole('button', { name: 'Thử lại' }))

    expect(
      await screen.findByTestId(`link-source-${TAX_SOURCE.key}`)
    ).toBeInTheDocument()
  })

  it('loads and displays contract live checklist items and badges', async () => {
    render(<PublicServiceCitationPanel contractId="contract-123" />)

    await waitFor(() => {
      expect(screen.getByTestId('dvc-checklist-items')).toBeInTheDocument()
    })
    expect(screen.getByText('Bản hợp đồng đã khóa hash')).toBeInTheDocument()
    expect(screen.getByText('Có sẵn')).toBeInTheDocument()
    expect(screen.getByText('Đã có bằng chứng')).toBeInTheDocument()
    expect(screen.getByText('Cần hoàn tất trước khi nộp')).toBeInTheDocument()
    expect(screen.getByTestId('dvc-disclaimer')).toHaveTextContent(
      mockChecklist.disclaimer
    )
  })

  it('refresh button reloads checklist and sources after an error', async () => {
    vi.mocked(contractsApi.getPublicServiceChecklist).mockRejectedValueOnce(
      new Error('Lỗi mạng khi tải dữ liệu DVC')
    )

    render(<PublicServiceCitationPanel contractId="contract-123" />)

    expect(
      await screen.findByText('Lỗi mạng khi tải dữ liệu DVC')
    ).toBeInTheDocument()

    fireEvent.click(
      screen.getByLabelText('Tải lại nguồn DVC và đối soát hồ sơ')
    )

    expect(await screen.findByTestId('dvc-checklist-items')).toBeInTheDocument()
    expect(legalSourcesApi.getContractPanelSources).toHaveBeenCalledTimes(2)
  })

  it('opens the detail modal with the selected source', async () => {
    render(
      <PublicServiceCitationPanel
        contractId="contract-123"
        contractCode="HD-2026-999"
      />
    )

    fireEvent.click(await screen.findByTestId('btn-view-source-1.004194'))

    const dialog = screen.getByRole('dialog')
    expect(within(dialog).getByText('TTHC 1.004194')).toBeInTheDocument()
    expect(within(dialog).getByText('HD-2026-999')).toBeInTheDocument()

    fireEvent.click(screen.getByRole('button', { name: 'Đóng' }))
    expect(screen.queryByRole('dialog')).not.toBeInTheDocument()
  })
})
