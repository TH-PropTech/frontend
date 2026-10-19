import {
  cleanup,
  fireEvent,
  render,
  screen,
  waitFor,
} from '@testing-library/react'
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'
import { PoliciesView } from './policies-view'
import * as legalTermsApi from '@/features/legal-terms/api/legal-terms-api'
import * as legalSourcesApi from '@/features/contracts/api/legal-sources-api'
import {
  PANEL_SOURCES,
  REGULATIONS,
} from '@/features/contracts/test-fixtures/legal-sources.fixture'

vi.mock('@/features/legal-terms/api/legal-terms-api', async () => {
  const actual = await vi.importActual<typeof legalTermsApi>(
    '@/features/legal-terms/api/legal-terms-api'
  )
  return {
    ...actual,
    getAdminLegalTermsState: vi.fn(),
    saveLegalTermsDraft: vi.fn(),
    publishLegalTerms: vi.fn(),
    submitTermsForReview: vi.fn(),
    approveTerms: vi.fn(),
    requestTermsChanges: vi.fn(),
    getAdminPolicies: vi.fn(),
    updatePolicy: vi.fn(),
    updatePolicyStatus: vi.fn(),
  }
})

vi.mock('@/features/contracts/api/legal-sources-api', async () => {
  const actual = await vi.importActual<typeof legalSourcesApi>(
    '@/features/contracts/api/legal-sources-api'
  )
  return {
    ...actual,
    getAdminLegalSources: vi.fn(),
    getAdminPlatformRegulations: vi.fn(),
  }
})

const mockTermsState: legalTermsApi.AdminLegalTermsStateResponse = {
  published: {
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
    ],
  },
  draft: {
    key: 'rental-service-terms',
    title: 'Điều khoản Dịch vụ Thuê Căn hộ (Dự thảo)',
    summary: 'Tóm tắt dự thảo mới.',
    draftRevision: 2,
    updatedAt: '2026-09-13T01:00:00.000Z',
    sections: [
      {
        id: 'sec-1',
        heading: '1. Căn cứ pháp lý',
        body: 'Tuân thủ Luật Nhà ở 2023 và Luật BĐS 2023.',
        order: 1,
      },
    ],
  },
}

const mockPolicies: legalTermsApi.AdminPolicyItem[] = [
  {
    key: 'PLATFORM_FEE_PERCENT',
    value: '1.5',
    description: 'Phí hoa hồng dịch vụ',
    unit: '%',
    legalReference: 'Quy chế sàn',
    status: 'active',
  },
  {
    key: 'MAX_DEPOSIT_MONTHS',
    value: '3',
    description: 'Số tháng tiền cọc tối đa',
    unit: 'tháng',
    legalReference: 'Luật Nhà ở',
    status: 'inactive',
  },
]

describe('PoliciesView', () => {
  afterEach(() => {
    cleanup()
    vi.clearAllMocks()
  })

  beforeEach(() => {
    vi.mocked(legalTermsApi.getAdminLegalTermsState).mockResolvedValue(
      mockTermsState
    )
    vi.mocked(legalTermsApi.getAdminPolicies).mockResolvedValue(mockPolicies)
    vi.mocked(legalSourcesApi.getAdminLegalSources).mockResolvedValue(
      PANEL_SOURCES
    )
    vi.mocked(legalSourcesApi.getAdminPlatformRegulations).mockResolvedValue(
      REGULATIONS
    )
    vi.mocked(legalTermsApi.saveLegalTermsDraft).mockResolvedValue({
      success: true,
      draftRevision: 3,
    })
    vi.mocked(legalTermsApi.publishLegalTerms).mockResolvedValue({
      key: 'rental-service-terms',
      version: 2,
      title: 'Điều khoản Dịch vụ Thuê Căn hộ (Dự thảo)',
      summary: 'Tóm tắt dự thảo mới.',
      contentHash:
        'f6e5d4c3b2a1f6e5d4c3b2a1f6e5d4c3b2a1f6e5d4c3b2a1f6e5d4c3b2a1f6e5',
      publishedAt: '2026-09-13T02:00:00.000Z',
      sections: [],
    })
    vi.mocked(legalTermsApi.updatePolicy).mockResolvedValue({
      key: 'PLATFORM_FEE_PERCENT',
      value: '2.0',
      description: 'Phí hoa hồng dịch vụ',
      unit: '%',
      legalReference: 'Quy chế sàn',
      status: 'active',
    })
    vi.mocked(legalTermsApi.updatePolicyStatus).mockResolvedValue({
      key: 'PLATFORM_FEE_PERCENT',
      value: '1.5',
      description: 'Phí hoa hồng dịch vụ',
      unit: '%',
      legalReference: 'Quy chế sàn',
      status: 'inactive',
    })
  })

  it('renders legal terms tab by default and displays published terms metadata', async () => {
    render(<PoliciesView />)

    expect(
      await screen.findByText('Quản trị Điều khoản, Chính sách & Dịch vụ công')
    ).toBeDefined()
    expect(screen.getByText('v1 — Active')).toBeDefined()
    expect(screen.getByText('Revision 2')).toBeDefined()
    expect(
      screen.getByDisplayValue('Điều khoản Dịch vụ Thuê Căn hộ (Dự thảo)')
    ).toBeDefined()
  })

  it('allows editing draft title and saving draft', async () => {
    render(<PoliciesView />)

    const titleInput = await screen.findByDisplayValue(
      'Điều khoản Dịch vụ Thuê Căn hộ (Dự thảo)'
    )
    fireEvent.change(titleInput, {
      target: { value: 'Điều khoản Bản Sửa Đổi' },
    })

    const saveBtn = screen.getByRole('button', { name: /Lưu bản nháp/i })
    fireEvent.click(saveBtn)

    await waitFor(() => {
      expect(legalTermsApi.saveLegalTermsDraft).toHaveBeenCalledWith(
        expect.objectContaining({
          title: 'Điều khoản Bản Sửa Đổi',
          expectedRevision: 2,
        })
      )
    })
  })

  it('opens confirmation modal and publishes terms', async () => {
    vi.mocked(legalTermsApi.getAdminLegalTermsState).mockResolvedValue({
      ...mockTermsState,
      draft: { ...mockTermsState.draft!, reviewStatus: 'approved' },
    })
    render(<PoliciesView />)

    const publishBtn = await screen.findByRole('button', {
      name: /Công bố phiên bản mới/i,
    })
    fireEvent.click(publishBtn)

    expect(screen.getByText('Xác nhận công bố điều khoản')).toBeDefined()
    expect(screen.getByText('v2')).toBeDefined()

    const confirmBtn = screen.getByRole('button', {
      name: /Xác nhận công bố ngay/i,
    })
    fireEvent.click(confirmBtn)

    await waitFor(() => {
      expect(legalTermsApi.publishLegalTerms).toHaveBeenCalledWith({
        expectedRevision: 2,
      })
    })
  })

  it('lets staff tag a clause with an existing legal source and saves the key', async () => {
    render(<PoliciesView />)

    await screen.findByDisplayValue('Điều khoản Dịch vụ Thuê Căn hộ (Dự thảo)')

    const sourceButton = await screen.findByRole('button', {
      name: 'Đăng ký tạm trú tại chỗ ở hợp pháp do thuê',
    })
    expect(sourceButton).toHaveAttribute('aria-pressed', 'false')
    fireEvent.click(sourceButton)
    expect(sourceButton).toHaveAttribute('aria-pressed', 'true')

    fireEvent.click(screen.getByRole('button', { name: /Lưu bản nháp/i }))

    await waitFor(() => {
      expect(legalTermsApi.saveLegalTermsDraft).toHaveBeenCalledWith(
        expect.objectContaining({
          sections: expect.arrayContaining([
            expect.objectContaining({ sourceKeys: ['1.004194'] }),
          ]),
        })
      )
    })
  })

  it('switches to operational policies tab and displays policies table', async () => {
    render(<PoliciesView />)

    const policiesTabBtn = await screen.findByRole('button', {
      name: /Chính sách vận hành/i,
    })
    fireEvent.click(policiesTabBtn)

    expect(
      await screen.findByText('Bảng tham số chính sách vận hành')
    ).toBeDefined()
    expect(screen.getByText('PLATFORM_FEE_PERCENT')).toBeDefined()
    expect(screen.getByText('MAX_DEPOSIT_MONTHS')).toBeDefined()
    expect(screen.getByText('1.5 %')).toBeDefined()
  })

  it('allows toggling policy status and editing policy value', async () => {
    render(<PoliciesView />)

    const policiesTabBtn = await screen.findByRole('button', {
      name: /Chính sách vận hành/i,
    })
    fireEvent.click(policiesTabBtn)

    await screen.findByText('PLATFORM_FEE_PERCENT')

    // Test toggle status
    const toggleBtn = screen.getByRole('button', { name: 'Tạm ngưng' })
    fireEvent.click(toggleBtn)

    await waitFor(() => {
      expect(legalTermsApi.updatePolicyStatus).toHaveBeenCalledWith(
        'PLATFORM_FEE_PERCENT',
        'inactive'
      )
    })

    // Test edit value
    const editBtn = screen.getByLabelText('Sửa giá trị PLATFORM_FEE_PERCENT')
    fireEvent.click(editBtn)

    const valInput = screen.getByDisplayValue('1.5')
    fireEvent.change(valInput, { target: { value: '2.0' } })

    const saveValBtn = screen.getByLabelText('Lưu giá trị')
    fireEvent.click(saveValBtn)

    await waitFor(() => {
      expect(legalTermsApi.updatePolicy).toHaveBeenCalledWith(
        'PLATFORM_FEE_PERCENT',
        '2.0'
      )
    })
  })

  it('switches to public-services governance tab and displays governance studio', async () => {
    render(<PoliciesView />)

    const governanceTabBtn = await screen.findByTestId(
      'tab-public-services-governance'
    )
    fireEvent.click(governanceTabBtn)

    expect(await screen.findByTestId('public-services-admin-tab')).toBeDefined()
    expect(screen.getByText('Quy định Đang Áp dụng')).toBeDefined()
    expect(screen.getByTestId('regulation-card-REG-RES-01')).toBeDefined()
  })

  it('switches to legal sources section inside governance and lists admin-managed sources', async () => {
    render(<PoliciesView />)

    fireEvent.click(await screen.findByTestId('tab-public-services-governance'))
    fireEvent.click(await screen.findByTestId('tab-legal-sources'))

    expect(await screen.findByTestId('legal-sources-admin-tab')).toBeDefined()
    for (const source of PANEL_SOURCES) {
      expect(screen.getByTestId(`legal-source-row-${source.key}`)).toBeDefined()
    }
  })
})
