import { describe, expect, it, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import type { ContractViewDto } from '@/features/contracts'
import type {
  ContractFlowStageKey,
  ContractFlowStageStatus,
  ContractFlowView,
} from '@/features/contracts'
import { ContractStepFlow } from './contract-step-flow'

const mockUseContractWorkspace = vi.hoisted(() => vi.fn())

vi.mock('./use-contract-workspace', () => ({
  useContractWorkspace: mockUseContractWorkspace,
}))

const contractView: ContractViewDto = {
  contract: {
    id: 'contract-1',
    code: 'HD-001',
    status: 'deposit-pending',
    property: {
      id: 'property-1',
      title: 'Apartment',
      address: null,
      area: null,
      furniture: null,
      value: 0,
    },
    commercial: {
      monthlyRent: 10000000,
      deposit: 10000000,
      paymentDay: 5,
      latePenaltyRate: 0,
      terminationNoticeDays: 30,
    },
    startDate: '2030-01-01',
    endDate: '2031-01-01',
    executionMethod: 'SMARTCA',
    notarizationStatus: 'not-requested',
    executionPolicy: {
      policyId: 'policy-1',
      version: 1,
      strategy: 'DEPOSIT_FIRST',
      depositConfirmed: false,
      activationReady: false,
      nextAction: 'Thanh toán tiền cọc',
    },
  },
  document: {
    mode: 'locked',
    revision: 1,
    lockedAt: '2030-01-01T00:00:00.000Z',
    lockedHash: 'hash-1',
    hashSchemaVersion: 1,
    legalProfile: null,
    templateVersion: 'v1',
    sections: [
      {
        id: 'section-1',
        number: 1,
        title: 'Thông tin thuê',
        content: 'Nội dung',
        protected: true,
        hash: 'section-hash',
      },
    ],
    annexes: [],
    integrity: 'valid',
  },
  parties: {
    tenant: {
      id: 'tenant-1',
      name: 'Tenant',
      role: 'tenant',
      maskedCccd: null,
      address: null,
      kycStatus: 'verified',
      hasSigned: false,
    },
    landlord: {
      id: 'landlord-1',
      name: 'Landlord',
      role: 'landlord',
      maskedCccd: null,
      address: null,
      kycStatus: 'verified',
      hasSigned: false,
    },
  },
  deposit: {
    agreementId: 'deposit-1',
    agreementCode: 'DC-001',
    amount: 10000000,
    currency: 'VND',
    status: 'pending',
    consentGiven: true,
    paidAt: null,
    txHash: null,
  },
  actions: {
    canPayDeposit: true,
    paymentReasonCode: null,
    signingEligibility: {
      eligible: false,
      reasonCode: 'DEPOSIT_REQUIRED',
      message: 'Thanh toán cọc trước khi ký',
    },
    canDownloadArtifact: true,
    artifactReasonCode: null,
    canEditContent: false,
    canLockContent: false,
  },
  access: {
    canReadWorkspace: true,
    canSign: true,
    isOriginalParticipant: true,
    isSuccessorOwner: false,
  },
  ledger: {
    networkMode: 'fabric',
    connectionState: 'connected',
    status: 'not-requested',
    txHash: null,
    blockNumber: null,
    verifiedAt: null,
    onChainValid: null,
  },
}

function configureHook(overrides: Record<string, unknown> = {}) {
  mockUseContractWorkspace.mockReturnValue({
    data: contractView,
    auditEvents: [],
    isLoading: false,
    error: null,
    isSigningModalOpen: false,
    isDownloadingPdf: false,
    isDownloadingDocx: false,
    isVerifyingIntegrity: false,
    integrityResult: null,
    noticeMessage: null,
    isTenant: true,
    signerName: 'Tenant',
    signerRole: 'tenant',
    setIsSigningModalOpen: vi.fn(),
    setNoticeMessage: vi.fn(),
    loadData: vi.fn(),
    handleDownloadPdf: vi.fn(),
    handleDownloadDocx: vi.fn(),
    handleVerifyIntegrity: vi.fn(),
    ...overrides,
  })
}

describe('ContractStepFlow', () => {
  it('shows the contract summary and a PDF button on every step', () => {
    configureHook()

    render(<ContractStepFlow contractId="contract-1" step="deposit" />)

    expect(screen.getByTestId('contract-summary-card')).toHaveTextContent(
      'HD-001'
    )
    expect(
      screen.getByRole('button', { name: /xem bản pdf hợp đồng/i })
    ).toBeInTheDocument()
  })

  it('shows the real deposit status and amount in words instead of a blanket completed label', () => {
    configureHook()

    render(<ContractStepFlow contractId="contract-1" step="deposit" />)

    expect(screen.getByTestId('contract-stepper')).toHaveTextContent(
      'Chờ thanh toán'
    )
    expect(screen.getByTestId('deposit-amount-words')).toHaveTextContent(
      'mười triệu đồng'
    )
    expect(screen.getByTestId('step-guide')).toHaveTextContent(
      'Quy trình đặt cọc'
    )
  })

  it('renders the current step with route navigation links', () => {
    configureHook()

    render(<ContractStepFlow contractId="contract-1" step="deposit" />)

    expect(screen.getByTestId('contract-step-flow')).toBeInTheDocument()
    expect(mockUseContractWorkspace).toHaveBeenCalledWith(
      expect.objectContaining({
        contractId: 'contract-1',
        enablePolling: false,
      })
    )
    expect(screen.getByRole('link', { name: /^hợp đồng/i })).toHaveAttribute(
      'href',
      '/contracts/contract-1/steps/document'
    )
    expect(screen.getByRole('link', { name: /quay lại/i })).toHaveAttribute(
      'href',
      '/contracts/contract-1/steps/document'
    )
  })

  it('shows loading state before contract data is available', () => {
    configureHook({ isLoading: true, data: null })

    render(<ContractStepFlow contractId="contract-1" step="document" />)

    expect(screen.getByTestId('contract-step-flow-loading')).toBeInTheDocument()
  })

  it('guards an upcoming signing route and points back to the active deposit step', () => {
    configureHook()

    render(<ContractStepFlow contractId="contract-1" step="signing" />)

    expect(screen.getByTestId('contract-step-guard')).toHaveTextContent(
      /chưa đủ điều kiện/i
    )
    expect(
      screen.getByRole('link', { name: /về bước đặt cọc/i })
    ).toHaveAttribute('href', '/contracts/contract-1/steps/deposit')
  })

  it('shows Fabric ledger evidence and keeps manual verification available on the ledger route', () => {
    const handleVerifyIntegrity = vi.fn()
    configureHook({
      data: {
        ...contractView,
        contract: {
          ...contractView.contract,
          status: 'active',
          executionPolicy: {
            ...contractView.contract.executionPolicy,
            depositConfirmed: true,
            activationReady: true,
          },
        },
        parties: {
          tenant: { ...contractView.parties.tenant, hasSigned: true },
          landlord: { ...contractView.parties.landlord, hasSigned: true },
        },
        deposit: { ...contractView.deposit, status: 'paid' },
        ledger: {
          ...contractView.ledger,
          networkMode: 'fabric',
          connectionState: 'connected',
          status: 'committed',
          txHash: 'tx-123',
          blockNumber: 42,
        },
      },
      handleVerifyIntegrity,
    })

    render(<ContractStepFlow contractId="contract-1" step="ledger" />)

    expect(screen.getByTestId('network-mode-fabric')).toBeInTheDocument()
    expect(screen.getByTestId('fabric-block-number')).toHaveTextContent('#42')
    expect(screen.getByTestId('verify-integrity-btn')).toBeInTheDocument()
  })
})

describe('ContractStepFlow with server flow', () => {
  const withFlow = (
    stages: Array<[ContractFlowStageKey, ContractFlowStageStatus]>,
    activeStage: ContractFlowView['activeStage'],
    nextActions: ContractFlowView['nextActions'] = []
  ): ContractViewDto => ({
    ...contractView,
    contract: { ...contractView.contract, status: 'draft' },
    document: {
      ...contractView.document,
      mode: 'draft',
      lockedAt: null,
      lockedHash: null,
    },
    flow: {
      version: 1,
      strategy: 'DEPOSIT_FIRST',
      stages: stages.map(([key, status]) => ({
        key,
        status,
        blockers: [],
        completedAt: null,
      })),
      activeStage,
      nextActions,
    },
  })

  it('DEPOSIT_FIRST cho phép "Tiếp tục" từ document sang deposit sau khi đồng ý cọc', () => {
    configureHook({
      data: withFlow(
        [
          ['document', 'done'],
          ['deposit', 'active'],
          ['signing', 'upcoming'],
          ['ledger', 'upcoming'],
        ],
        'deposit'
      ),
    })

    render(<ContractStepFlow contractId="contract-1" step="document" />)

    expect(screen.getByRole('link', { name: /tiếp tục/i })).toHaveAttribute(
      'href',
      '/contracts/contract-1/steps/deposit'
    )
  })

  it('mở bước deposit khi stage document còn active nhưng tenant có CONSENT_DEPOSIT', () => {
    configureHook({
      data: withFlow(
        [
          ['document', 'active'],
          ['deposit', 'upcoming'],
          ['signing', 'upcoming'],
          ['ledger', 'upcoming'],
        ],
        'document',
        [
          {
            action: 'CONSENT_DEPOSIT',
            actorRole: 'tenant',
            enabled: true,
            reasonCode: null,
            stage: 'deposit',
          },
        ]
      ),
    })

    render(<ContractStepFlow contractId="contract-1" step="deposit" />)

    expect(screen.queryByTestId('contract-step-guard')).not.toBeInTheDocument()
    expect(screen.getByText('Bước 2/4')).toBeInTheDocument()
  })

  it('route move-in của hợp đồng không có quyết toán hiển thị không áp dụng và liên kết về bước active', () => {
    configureHook({
      data: withFlow(
        [
          ['document', 'done'],
          ['deposit', 'active'],
          ['signing', 'upcoming'],
          ['ledger', 'upcoming'],
        ],
        'deposit'
      ),
    })

    render(<ContractStepFlow contractId="contract-1" step="move-in" />)

    expect(screen.getByTestId('contract-step-guard')).toHaveTextContent(
      /không có bước nhận nhà/i
    )
    expect(
      screen.getByRole('link', { name: /về bước đặt cọc/i })
    ).toHaveAttribute('href', '/contracts/contract-1/steps/deposit')
  })
})
