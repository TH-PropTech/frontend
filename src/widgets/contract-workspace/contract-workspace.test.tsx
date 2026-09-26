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
      expect(screen.getByTestId('link-dvc-residence-1004194')).toHaveAttribute(
        'href',
        expect.stringContaining('dichvucong.bocongan.gov.vn')
      )
      expect(screen.getByTestId('link-dvc-tax-1007689')).toHaveAttribute(
        'href',
        expect.stringContaining('thuedientu.gdt.gov.vn')
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
})
