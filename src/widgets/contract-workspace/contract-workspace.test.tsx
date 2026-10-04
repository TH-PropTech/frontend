import {
  render,
  screen,
  fireEvent,
  waitFor,
  within,
} from '@testing-library/react'
import { describe, expect, it, vi, beforeEach } from 'vitest'
import { ContractWorkspace } from './contract-workspace'
import * as contractsApi from '@/features/contracts/api/contracts-api'
import * as legalSourcesApi from '@/features/contracts/api/legal-sources-api'
import { PANEL_SOURCES } from '@/features/contracts/test-fixtures/legal-sources.fixture'

vi.mock('@/features/contracts/api/contracts-api', async () => {
  const actual = await vi.importActual<typeof contractsApi>(
    '@/features/contracts/api/contracts-api'
  )
  return {
    ...actual,
    getContractView: vi.fn(),
    getContractAuditEvents: vi.fn(),
    downloadContractArtifact: vi.fn(),
    verifyContractIntegrity: vi.fn(),
    initDepositPayment: vi.fn(),
    getPublicServiceChecklist: vi.fn(),
  }
})

vi.mock('@/features/contracts/api/legal-sources-api', () => ({
  getContractPanelSources: vi.fn(),
}))
describe('ContractWorkspace', () => {
  const mockView: contractsApi.ContractViewDto = {
    contract: {
      id: 'c-100',
      code: 'HD-2026-100',
      status: 'awaiting-signature',
      property: {
        id: 'prop-1',
        title: 'Căn hộ Sunrise City',
        address: '23 Nguyễn Hữu Thọ, Q7',
        area: 75,
        furniture: 'Đầy đủ',
        value: 15000000,
      },
      commercial: {
        monthlyRent: 15000000,
        deposit: 30000000,
        paymentDay: 5,
        latePenaltyRate: 0.05,
        terminationNoticeDays: 30,
      },
      startDate: '2026-04-01T00:00:00Z',
      endDate: '2027-04-01T00:00:00Z',
      executionMethod: 'POC_ECONSENT',
      notarizationStatus: 'not-requested',
      executionPolicy: {
        policyId: 'sign-first',
        version: 1,
        strategy: 'SIGN_FIRST',
        depositConfirmed: false,
        activationReady: false,
        nextAction: 'Chờ xác nhận tiền cọc để kích hoạt hợp đồng.',
      },
    },
    document: {
      mode: 'locked',
      revision: 2,
      lockedAt: '2026-03-14T01:00:00Z',
      lockedHash: '0xhash123456789',
      hashSchemaVersion: 1,
      legalProfile: null,
      templateVersion: '1.0',
      sections: [
        {
          id: 'sec-1',
          number: 1,
          title: 'Đối tượng hợp đồng',
          content: 'Bên A cho Bên B thuê căn hộ Sunrise City.',
          protected: true,
          hash: 'h-1',
        },
      ],
      annexes: [
        {
          id: 'anx-1',
          title: 'Phụ lục trang thiết bị',
          description: 'Danh sách bàn giao',
          required: true,
        },
      ],
      integrity: 'valid',
    },
    parties: {
      tenant: {
        id: 'user-tenant',
        name: 'Trần Văn Thuê',
        role: 'tenant',
        maskedCccd: '079***111',
        address: 'Hà Nội',
        kycStatus: 'verified',
        hasSigned: false,
      },
      landlord: {
        id: 'user-landlord',
        name: 'Lê Thị Chủ',
        role: 'landlord',
        maskedCccd: '079***222',
        address: 'TP.HCM',
        kycStatus: 'verified',
        hasSigned: true,
      },
    },
    deposit: {
      agreementId: 'dpa-555',
      agreementCode: 'DA-555',
      status: 'paid',
      amount: 30000000,
      currency: 'VND',
      consentGiven: true,
      paidAt: '2026-03-14T02:00:00Z',
      txHash: '0xpay123',
    },
    actions: {
      canPayDeposit: false,
      paymentReasonCode: 'DEPOSIT_ALREADY_PAID',
      canDownloadArtifact: true,
      artifactReasonCode: null,
      signingEligibility: {
        eligible: true,
        reasonCode: null,
        message: null,
      },
    },
    ledger: {
      networkMode: 'simulation',
      status: 'confirmed-simulation',
      txHash: '0xledger123456',
      blockNumber: null,
      verifiedAt: '2026-03-14T02:10:00Z',
      onChainValid: true,
    },
  }

  beforeEach(() => {
    vi.clearAllMocks()
    vi.mocked(contractsApi.getContractView).mockResolvedValue(mockView)
    vi.mocked(contractsApi.getContractAuditEvents).mockResolvedValue([
      {
        id: 'evt-1',
        category: 'ledger',
        eventType: 'contract.locked',
        status: 'completed',
        occurredAt: '2026-03-14T01:00:00Z',
        actorRole: 'system',
        networkMode: 'simulation',
        txHash: '0xevt1',
        blockNumber: null,
        retryable: false,
        displayCode: 'LOCKED',
        description: 'Đã khóa nội dung hợp đồng',
      },
    ])
    vi.mocked(legalSourcesApi.getContractPanelSources).mockResolvedValue(
      PANEL_SOURCES
    )
    vi.mocked(contractsApi.getPublicServiceChecklist).mockResolvedValue({
      purpose: 'temporary-residence',
      externalProcedureCompleted: false,
      officialSourceUrl: 'https://dichvucong.bocongan.gov.vn/',
      executionMethod: 'POC_ECONSENT',
      notarizationStatus: 'not-requested',
      disclaimer: 'Hệ thống chỉ xuất checklist và bằng chứng hiện có.',
      items: [
        { id: 'locked-contract-copy', status: 'available', required: true },
        { id: 'signing-evidence', status: 'evidence-present', required: true },
        {
          id: 'notarization-or-authentication',
          status: 'required-before-submission',
          required: true,
        },
      ],
    })
  })

  it('renders loading indicator initially then displays full workspace', async () => {
    render(<ContractWorkspace contractId="c-100" currentUserId="user-tenant" />)

    expect(screen.getByTestId('contract-workspace-loading')).toBeInTheDocument()

    await waitFor(() => {
      expect(screen.getByTestId('contract-workspace')).toBeInTheDocument()
      expect(screen.getAllByText('HD-2026-100').length).toBeGreaterThan(0)
      expect(screen.getByText('v2')).toBeInTheDocument()
      expect(
        screen.getByTestId('contract-execution-policy')
      ).toBeInTheDocument()
      expect(screen.getByText('Mô phỏng PoC')).toBeInTheDocument()
      expect(
        within(screen.getByTestId('contract-status-timeline'))
          .getAllByTestId(/^step-/)
          .map(step => step.getAttribute('data-testid'))
      ).toEqual(['step-draft', 'step-sign', 'step-deposit', 'step-ledger'])
    })
  })

  it('keeps flex gap on both columns so desktop panels are not stacked flush', async () => {
    render(<ContractWorkspace contractId="c-100" currentUserId="user-tenant" />)

    const timeline = await screen.findByTestId('contract-amendment-timeline')
    const rightColumn = timeline.parentElement as HTMLElement
    const leftColumn = screen.getByTestId('contract-document-paper')
      .parentElement?.parentElement as HTMLElement

    for (const column of [leftColumn, rightColumn]) {
      expect(column).toHaveClass('flex-col', 'gap-6')
      expect(column).not.toHaveClass('block', 'lg:block')
    }
    expect(leftColumn).toHaveClass('flex')
    expect(rightColumn).toHaveClass('hidden', 'lg:flex')
  })

  it('resolves the viewer from the stored login user when the route passes no currentUserId', async () => {
    window.localStorage.setItem(
      'user',
      JSON.stringify({ _id: 'user-landlord' })
    )
    try {
      render(<ContractWorkspace contractId="c-100" />)

      const landlordCard = await screen.findByTestId('party-card-landlord')
      expect(
        within(landlordCard).getByTestId('current-user-badge')
      ).toBeInTheDocument()
      expect(
        within(screen.getByTestId('party-card-tenant')).queryByTestId(
          'current-user-badge'
        )
      ).not.toBeInTheDocument()
    } finally {
      window.localStorage.removeItem('user')
    }
  })

  it('labels successor access while preserving the original legal landlord', async () => {
    vi.mocked(contractsApi.getContractView).mockResolvedValueOnce({
      ...mockView,
      access: {
        canReadWorkspace: true,
        canSign: false,
        isOriginalParticipant: false,
        isSuccessorOwner: true,
      },
    })

    render(<ContractWorkspace contractId="c-100" currentUserId="successor-1" />)

    await waitFor(() => {
      expect(screen.getByTestId('successor-access-banner')).toBeInTheDocument()
      expect(
        screen.getByText(/Chủ nhà pháp lý gốc vẫn là Lê Thị Chủ/)
      ).toBeInTheDocument()
    })
  })

  it('displays signing CTA when user is eligible and opens modal on click', async () => {
    render(<ContractWorkspace contractId="c-100" currentUserId="user-tenant" />)

    await waitFor(() => {
      expect(
        screen.getByTestId('signing-eligibility-banner')
      ).toBeInTheDocument()
    })

    const signBtn = screen.getByLabelText('Tiến hành ký hợp đồng điện tử')
    expect(signBtn).toBeInTheDocument()

    fireEvent.click(signBtn)

    await waitFor(() => {
      expect(screen.getByTestId('signing-ceremony-modal')).toBeInTheDocument()
    })
  })

  it('displays audit events panel with event description', async () => {
    render(<ContractWorkspace contractId="c-100" currentUserId="user-tenant" />)

    await waitFor(() => {
      expect(screen.getByTestId('audit-events-panel')).toBeInTheDocument()
      expect(screen.getByText('Đã khóa nội dung hợp đồng')).toBeInTheDocument()
    })
  })

  it('displays error message when API fails', async () => {
    vi.mocked(contractsApi.getContractView).mockRejectedValue(
      new Error('Lỗi kết nối cơ sở dữ liệu')
    )

    render(<ContractWorkspace contractId="c-100" currentUserId="user-tenant" />)

    await waitFor(() => {
      expect(screen.getByTestId('contract-workspace-error')).toBeInTheDocument()
      expect(screen.getByText('Lỗi kết nối cơ sở dữ liệu')).toBeInTheDocument()
    })
  })

  it('displays public service citation panel with direct links to portals', async () => {
    render(<ContractWorkspace contractId="c-100" currentUserId="user-tenant" />)

    await waitFor(() => {
      expect(
        screen.getByTestId('public-service-citation-panel')
      ).toBeInTheDocument()
      expect(screen.getByTestId('link-source-1.004194')).toHaveAttribute(
        'href',
        expect.stringContaining(
          'thu-tuc-hanh-chinh/019d2bf7-770b-734d-b7fb-5e1995f194f4'
        )
      )
      expect(screen.getByTestId('link-source-1.007689')).toHaveAttribute(
        'href',
        expect.stringContaining(
          'thu-tuc-hanh-chinh/019d2bfc-2d93-73ec-ba2f-8d6aef8f7950'
        )
      )
    })
  })

  it('displays bilateral signing timeline and fabric ledger evidence card in workspace', async () => {
    render(<ContractWorkspace contractId="c-100" currentUserId="user-tenant" />)

    await waitFor(() => {
      expect(
        screen.getByTestId('bilateral-signing-timeline')
      ).toBeInTheDocument()
      expect(
        screen.getByTestId('fabric-ledger-evidence-card')
      ).toBeInTheDocument()
      expect(screen.getByText('Chờ đối ứng (1/2)')).toBeInTheDocument()
    })
  })

  it('renders ContractFlowGuide and sets isActiveStep correctly when strategy=DEPOSIT_FIRST and status=deposit-pending', async () => {
    vi.mocked(contractsApi.getContractView).mockResolvedValueOnce({
      ...mockView,
      contract: {
        ...mockView.contract,
        status: 'deposit-pending',
        executionPolicy: {
          ...mockView.contract.executionPolicy!,
          strategy: 'DEPOSIT_FIRST',
        },
      },
      deposit: {
        ...mockView.deposit!,
        status: 'pending',
        paidAt: null,
        txHash: null,
      },
    })

    render(<ContractWorkspace contractId="c-100" currentUserId="user-tenant" />)

    await waitFor(() => {
      expect(screen.getByTestId('contract-flow-guide')).toBeInTheDocument()
      const depositWrapper = screen.getByTestId('deposit-payment-panel-wrapper')
      expect(depositWrapper.className).toContain('ring-2')
      const signingWrapper = screen.getByTestId(
        'bilateral-signing-timeline-wrapper'
      )
      expect(signingWrapper.className).toContain('opacity-50')
      expect(signingWrapper.className).toContain('pointer-events-none')
    })
  })

  describe('with server flow', () => {
    const draftFlowView = (
      nextActions: contractsApi.ContractFlowAction[]
    ): contractsApi.ContractViewDto => ({
      ...mockView,
      contract: {
        ...mockView.contract,
        status: 'draft',
        executionPolicy: {
          policyId: 'deposit-first',
          version: 1,
          strategy: 'DEPOSIT_FIRST',
          depositConfirmed: false,
          activationReady: false,
          nextAction: 'Xác nhận tiền cọc trước khi ký SmartCA.',
        },
      },
      deposit: {
        agreementId: 'dpa-555',
        agreementCode: 'DA-555',
        status: 'draft',
        amount: 30000000,
        currency: 'VND',
        consentGiven: false,
        contentRevision: 1,
        contentHash: 'deposit-hash',
        paidAt: null,
        txHash: null,
      },
      flow: {
        version: 1,
        strategy: 'DEPOSIT_FIRST',
        stages: [
          {
            key: 'document',
            status: 'active',
            blockers: [],
            completedAt: null,
          },
          {
            key: 'deposit',
            status: 'upcoming',
            blockers: [],
            completedAt: null,
          },
          {
            key: 'signing',
            status: 'upcoming',
            blockers: [],
            completedAt: null,
          },
          {
            key: 'ledger',
            status: 'upcoming',
            blockers: [],
            completedAt: null,
          },
        ],
        activeStage: 'document',
        nextActions,
      },
    })
    const consentAction: contractsApi.ContractFlowAction = {
      action: 'CONSENT_DEPOSIT',
      actorRole: 'tenant',
      enabled: true,
      reasonCode: null,
      stage: 'deposit',
    }

    it('tenant bấm được "Đồng ý thỏa thuận cọc" khi hợp đồng còn draft', async () => {
      vi.mocked(contractsApi.getContractView).mockResolvedValue(
        draftFlowView([consentAction])
      )

      render(
        <ContractWorkspace contractId="c-100" currentUserId="user-tenant" />
      )

      const consentButton = await screen.findByLabelText(
        'Đồng ý thỏa thuận cọc'
      )
      expect(consentButton).toBeEnabled()
      expect(
        screen.getByTestId('deposit-payment-panel-wrapper')
      ).not.toHaveClass('pointer-events-none')
      expect(screen.getByTestId('flow-step-document')).toHaveAttribute(
        'data-state',
        'active'
      )
    })

    it('landlord thấy trạng thái chờ khách thuê và không có nút đồng ý', async () => {
      vi.mocked(contractsApi.getContractView).mockResolvedValue(
        draftFlowView([])
      )

      render(
        <ContractWorkspace contractId="c-100" currentUserId="user-landlord" />
      )

      await screen.findByTestId('contract-workspace')
      expect(
        screen.queryByLabelText('Đồng ý thỏa thuận cọc')
      ).not.toBeInTheDocument()
      expect(screen.getByTestId('deposit-payment-panel-wrapper')).toHaveClass(
        'pointer-events-none'
      )
    })

    it('đặt thẻ tóm tắt và banner hành động kế tiếp ở đầu workspace', async () => {
      vi.mocked(contractsApi.getContractView).mockResolvedValue(
        draftFlowView([consentAction])
      )

      render(
        <ContractWorkspace contractId="c-100" currentUserId="user-tenant" />
      )

      const summary = await screen.findByTestId('contract-summary-card')
      const banner = screen.getByTestId('next-action-banner')
      const guide = screen.getByTestId('contract-flow-guide')
      expect(banner).toHaveTextContent('Đồng ý thỏa thuận cọc')
      expect(
        summary.compareDocumentPosition(banner) &
          Node.DOCUMENT_POSITION_FOLLOWING
      ).toBeTruthy()
      expect(
        banner.compareDocumentPosition(guide) & Node.DOCUMENT_POSITION_FOLLOWING
      ).toBeTruthy()
    })

    it('làm mới nền khi tab được focus lại mà không hiện spinner toàn trang', async () => {
      render(
        <ContractWorkspace contractId="c-100" currentUserId="user-tenant" />
      )
      await screen.findByTestId('contract-workspace')

      fireEvent(window, new Event('focus'))

      await waitFor(() =>
        expect(contractsApi.getContractView).toHaveBeenCalledTimes(2)
      )
      expect(
        screen.queryByTestId('contract-workspace-loading')
      ).not.toBeInTheDocument()
      expect(screen.getByTestId('contract-workspace')).toBeInTheDocument()
    })

    it('vẫn tải workspace khi audit-events lỗi ở lần tải đầu', async () => {
      vi.mocked(contractsApi.getContractAuditEvents).mockRejectedValue(
        new Error('AUDIT_UNAVAILABLE')
      )

      render(
        <ContractWorkspace contractId="c-100" currentUserId="user-tenant" />
      )

      expect(
        await screen.findByTestId('contract-workspace')
      ).toBeInTheDocument()
      expect(
        screen.queryByTestId('contract-workspace-error')
      ).not.toBeInTheDocument()
    })
  })

  describe('gateway return hint (?payment=)', () => {
    it('never shows paid when the hint says succeeded but the server says unpaid', async () => {
      vi.mocked(contractsApi.getContractView).mockResolvedValue({
        ...mockView,
        deposit: mockView.deposit
          ? {
              ...mockView.deposit,
              status: 'pending',
              paidAt: null,
              txHash: null,
            }
          : null,
      })
      window.history.replaceState(
        null,
        '',
        '/contracts/c-100?payment=succeeded&provider=vnpay'
      )

      render(<ContractWorkspace contractId="c-100" />)

      expect(
        await screen.findByText(/đang chờ cổng xác nhận giao dịch/)
      ).toBeInTheDocument()
      expect(
        screen.queryByText('Thanh toán đã được hệ thống xác nhận.')
      ).toBeNull()
      expect(window.location.search).toBe('')
    })

    it('confirms payment only from the server-reported paid deposit', async () => {
      window.history.replaceState(
        null,
        '',
        '/contracts/c-100?payment=succeeded'
      )

      render(<ContractWorkspace contractId="c-100" />)

      expect(
        await screen.findByText('Thanh toán đã được hệ thống xác nhận.')
      ).toBeInTheDocument()
    })
  })
})
