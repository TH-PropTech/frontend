import { cleanup, fireEvent, render, screen } from '@testing-library/react'
import { afterEach, describe, expect, it, vi } from 'vitest'
import { RentalApplicationApply } from './rental-application-apply'
import type { RentalApplicationItem } from '@/features/rental-application'
import * as flowModule from '../model/use-rental-application-flow'

vi.mock('../model/use-rental-application-flow')

const baseMockState: flowModule.FlowState = {
  step: 1,
  apartmentId: 'apt-101',
  context: {
    enabled: true,
    eligible: true,
    reasonCode: null,
    listing: {
      id: 'apt-101',
      title: 'Căn hộ Masteri Thảo Điền',
      address: '159 Xa Lộ Hà Nội',
      area: 70,
      status: 'available',
      landlordDisplayName: 'Lê Hoàng',
    },
    pricingRevision: 1,
    packages: [
      {
        packageId: 'pkg-12',
        version: 1,
        durationMonths: 12,
        monthlyRent: 15000000,
        depositPolicy: { type: 'MONTHS_OF_RENT', months: 2 },
        resolvedDepositAmount: 30000000,
        status: 'active',
        currency: 'VND',
      },
    ],
    disclosure: {
      version: 'disc-1',
      hash: 'hash-1',
      items: [
        {
          id: 'd-1',
          title: 'Quy định chung',
          body: 'Nội dung',
          required: true,
        },
      ],
    },
    terms: {
      key: 'canonical',
      version: 1,
      hash: 'hash-terms',
      url: '/terms',
    },
  },
  termsDoc: {
    key: 'canonical',
    version: 1,
    title: 'Điều khoản mẫu',
    summary: 'Tóm tắt',
    sections: [],
    contentHash: 'hash-terms',
    publishedAt: null,
  },
  loadingContext: false,
  loadingTerms: false,
  submitting: false,
  error: null,
  termsError: null,
  details: {
    occupants: 1,
    moveInDate: '2030-01-01',
    occupation: 'Kế toán',
    hasPets: false,
    notes: '',
  },
  selectedPackageId: 'pkg-12',
  selectedPaymentCycleMonths: 1,
  feeAcknowledged: false,
  selectedExecutionPolicy: null,
  executionPolicyAccepted: false,
  acknowledgedDisclosures: ['d-1'],
  termsAccepted: true,
  submittedApplication: null,
  pendingApplicationExists: false,
}

const mockActions = {
  loadContext: vi.fn(),
  updateDetails: vi.fn(),
  selectPackage: vi.fn(),
  selectPaymentCycle: vi.fn(),
  setFeeAcknowledged: vi.fn(),
  setExecutionPolicyAccepted: vi.fn(),
  toggleDisclosure: vi.fn(),
  setTermsAccepted: vi.fn(),
  goToStep2: vi.fn(),
  goToStep3: vi.fn(),
  backToStep: vi.fn(),
  submitApplication: vi.fn(),
  refreshSubmittedApplication: vi.fn().mockResolvedValue(undefined),
  clearError: vi.fn(),
  dismissPendingApplicationModal: vi.fn(),
}

describe('RentalApplicationApply Widget', () => {
  afterEach(() => cleanup())

  it('renders loading skeleton when loadingContext is true', () => {
    vi.mocked(flowModule.useRentalApplicationFlow).mockReturnValue({
      state: { ...baseMockState, loadingContext: true },
      actions: mockActions,
    })

    render(<RentalApplicationApply apartmentId="apt-101" />)
    expect(screen.getByTestId('rental-application-loading')).toBeInTheDocument()
  })

  it('renders context error state with retry button when context load fails', () => {
    vi.mocked(flowModule.useRentalApplicationFlow).mockReturnValue({
      state: {
        ...baseMockState,
        context: null,
        error: 'Lỗi mạng máy chủ',
      },
      actions: mockActions,
    })

    render(<RentalApplicationApply apartmentId="apt-101" />)
    expect(
      screen.getByTestId('rental-application-context-error')
    ).toBeInTheDocument()
    expect(screen.getByText('Lỗi mạng máy chủ')).toBeInTheDocument()

    fireEvent.click(screen.getByRole('button', { name: /Thử lại/i }))
    expect(mockActions.loadContext).toHaveBeenCalled()
  })

  it('renders maintenance state when context.enabled is false', () => {
    vi.mocked(flowModule.useRentalApplicationFlow).mockReturnValue({
      state: {
        ...baseMockState,
        context: { ...baseMockState.context!, enabled: false },
      },
      actions: mockActions,
    })

    render(<RentalApplicationApply apartmentId="apt-101" />)
    expect(
      screen.getByTestId('rental-application-disabled')
    ).toBeInTheDocument()
  })

  it('renders ineligible state when context.eligible is false', () => {
    vi.mocked(flowModule.useRentalApplicationFlow).mockReturnValue({
      state: {
        ...baseMockState,
        context: { ...baseMockState.context!, eligible: false },
      },
      actions: mockActions,
    })

    render(<RentalApplicationApply apartmentId="apt-101" />)
    expect(
      screen.getByTestId('rental-application-ineligible')
    ).toBeInTheDocument()
  })

  it('renders Step 1 form by default with stepper and listing title', () => {
    vi.mocked(flowModule.useRentalApplicationFlow).mockReturnValue({
      state: { ...baseMockState, step: 1 },
      actions: mockActions,
    })

    render(<RentalApplicationApply apartmentId="apt-101" />)
    expect(
      screen.getByRole('heading', {
        name: /Đặt thuê: Căn hộ Masteri Thảo Điền/i,
      })
    ).toBeInTheDocument()
    expect(screen.getByTestId('apply-step-info-form')).toBeInTheDocument()
  })

  it('renders Step 1 form with dynamic moveInDateLabel from context.flowProfile', () => {
    vi.mocked(flowModule.useRentalApplicationFlow).mockReturnValue({
      state: {
        ...baseMockState,
        step: 1,
        context: {
          ...baseMockState.context!,
          flowProfile: {
            profileId: 'p-custom',
            name: 'Custom',
            version: 1,
            hash: 'hash-custom',
            precedence: 'GLOBAL',
            steps: {
              step1: {
                moveInDateLabel: 'Thời điểm nhận chìa khóa căn hộ',
                minMoveInLeadDays: 2,
                maxMoveInLeadDays: 45,
                minOccupants: 1,
                maxOccupants: 8,
                allowNotes: true,
                notesMaxLength: 800,
              },
              step2: { headerTitle: '', depositNoticeBody: '', badgeRules: [] },
              step3: {
                consentCheckboxLabel: '',
                consentStatement: '',
                disclosures: [],
              },
              step4: { heroSuccessTitle: '', timelineSteps: [] },
            },
          },
        },
      },
      actions: mockActions,
    })

    render(<RentalApplicationApply apartmentId="apt-101" />)
    expect(
      screen.getByText('Thời điểm nhận chìa khóa căn hộ')
    ).toBeInTheDocument()
    expect(screen.getByText('+2 đến +45 ngày')).toBeInTheDocument()
  })

  it('renders Step 2 package selector when step is 2', () => {
    vi.mocked(flowModule.useRentalApplicationFlow).mockReturnValue({
      state: { ...baseMockState, step: 2 },
      actions: mockActions,
    })

    render(<RentalApplicationApply apartmentId="apt-101" />)
    expect(screen.getByTestId('apply-step-package')).toBeInTheDocument()
  })

  it('renders Step 3 consent when step is 3', () => {
    vi.mocked(flowModule.useRentalApplicationFlow).mockReturnValue({
      state: { ...baseMockState, step: 3 },
      actions: mockActions,
    })

    render(<RentalApplicationApply apartmentId="apt-101" />)
    expect(screen.getByTestId('apply-step-consent')).toBeInTheDocument()
  })

  it('renders Step 4 submitted confirmation when step is 4', () => {
    const mockApp = {
      _id: 'app-success-123',
      apartmentId: 'apt-101',
      tenantId: 'tenant-1',
      landlordId: 'landlord-1',
      status: 'pending',
      reasonCode: null,
      actorId: null,
      actorTimestamp: null,
      createdAt: '2026-09-13T10:00:00Z',
      updatedAt: '2026-09-13T10:00:00Z',
      occupants: 1,
      moveInDate: '2030-01-01',
      occupation: 'Kế toán',
      hasPets: false,
      packageSnapshot: baseMockState.context!.packages[0],
    } as unknown as RentalApplicationItem

    vi.mocked(flowModule.useRentalApplicationFlow).mockReturnValue({
      state: {
        ...baseMockState,
        step: 4,
        submittedApplication: mockApp,
      },
      actions: mockActions,
    })

    render(<RentalApplicationApply apartmentId="apt-101" />)
    expect(screen.getByTestId('apply-step-submitted')).toBeInTheDocument()

    fireEvent.click(
      screen.getByRole('button', { name: 'Kiểm tra phản hồi của chủ nhà' })
    )
    expect(mockActions.refreshSubmittedApplication).toHaveBeenCalledOnce()
  })

  it('renders recoverable error banner and allows clearing error', () => {
    vi.mocked(flowModule.useRentalApplicationFlow).mockReturnValue({
      state: {
        ...baseMockState,
        error: 'Gói thuê đã thay đổi, vui lòng chọn lại.',
      },
      actions: mockActions,
    })

    render(<RentalApplicationApply apartmentId="apt-101" />)
    expect(screen.getByTestId('flow-error-banner')).toBeInTheDocument()
    expect(
      screen.getByText('Gói thuê đã thay đổi, vui lòng chọn lại.')
    ).toBeInTheDocument()

    fireEvent.click(screen.getByText('✕'))
    expect(mockActions.clearError).toHaveBeenCalled()
  })

  it('renders horizontal stepper navigation and consolidated 2-card sidebar without raw hashes', () => {
    vi.mocked(flowModule.useRentalApplicationFlow).mockReturnValue({
      state: { ...baseMockState, step: 1 },
      actions: mockActions,
    })

    render(<RentalApplicationApply apartmentId="apt-101" />)

    // Stepper navigation
    const stepperNav = screen.getByRole('navigation', {
      name: /Tiến trình 4 bước hoàn thành hồ sơ/i,
    })
    expect(stepperNav).toBeInTheDocument()
    expect(screen.getByText('Thông tin người thuê')).toBeInTheDocument()
    expect(screen.getByText('Gói thuê & Đặt cọc')).toBeInTheDocument()
    expect(screen.getByText('Điều khoản & Cam kết')).toBeInTheDocument()
    expect(screen.getByText('Xác nhận hồ sơ')).toBeInTheDocument()

    // Sidebar: Card 1 - Property Dossier & Financial Summary
    expect(screen.getByText('Hồ sơ căn hộ & Chi phí')).toBeInTheDocument()
    expect(screen.getByText('70 m²')).toBeInTheDocument()
    expect(screen.getByText('15.000.000 ₫')).toBeInTheDocument()
    expect(screen.getByText('30.000.000 ₫')).toBeInTheDocument()

    // Sidebar: Card 2 - Tenant Protection Guarantee
    expect(screen.getByText('Bảo vệ quyền lợi người thuê')).toBeInTheDocument()
    expect(screen.getByText('Chứng thực số an toàn')).toBeInTheDocument()
    expect(
      screen.getByText(/Giá thuê cam kết cố định theo gói niêm yết/i)
    ).toBeInTheDocument()

    // Verify raw cryptographic technical hashes are NOT exposed
    expect(screen.queryByText(/SHA-256/i)).not.toBeInTheDocument()
    expect(screen.queryByText(/Khóa băm quy chế/i)).not.toBeInTheDocument()
  })

  it('renders pending application exists modal when pendingApplicationExists is true', () => {
    vi.mocked(flowModule.useRentalApplicationFlow).mockReturnValue({
      state: { ...baseMockState, pendingApplicationExists: true },
      actions: mockActions,
    })

    render(<RentalApplicationApply apartmentId="apt-101" />)

    expect(screen.getByText('Hồ sơ đang chờ phản hồi')).toBeInTheDocument()
    expect(
      screen.getByText(
        'Bạn đã gửi hồ sơ cho căn hộ này rồi, vui lòng chờ chủ nhà phản hồi.'
      )
    ).toBeInTheDocument()

    const viewApplicationsBtn = screen.getByRole('link', {
      name: /Xem hồ sơ đã gửi/i,
    })
    expect(viewApplicationsBtn).toHaveAttribute('href', '/rental-applications')

    const backToApartmentBtn = screen.getByRole('link', {
      name: /Quay lại căn hộ/i,
    })
    expect(backToApartmentBtn).toHaveAttribute('href', '/properties/apt-101')
  })
})
