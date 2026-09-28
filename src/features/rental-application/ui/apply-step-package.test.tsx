import { cleanup, fireEvent, render, screen } from '@testing-library/react'
import { afterEach, describe, expect, it, vi } from 'vitest'
import { ApplyStepPackage } from './apply-step-package'
import type { RentalApplicationContext } from '../api/rental-application-api'

const mockPackages: RentalApplicationContext['packages'] = [
  {
    packageId: 'pkg-6m',
    version: 1,
    durationMonths: 6,
    monthlyRent: 15000000,
    depositPolicy: { type: 'MONTHS_OF_RENT', months: 1 },
    resolvedDepositAmount: 15000000,
    status: 'active',
    currency: 'VND',
    allowedExecutionPolicies: [
      {
        policyId: 'deposit-first',
        version: 1,
        strategy: 'DEPOSIT_FIRST',
        contentHash: 'hash-deposit',
      },
      {
        policyId: 'sign-first',
        version: 1,
        strategy: 'SIGN_FIRST',
        contentHash: 'hash-sign',
      },
    ],
    defaultExecutionPolicy: {
      policyId: 'deposit-first',
      version: 1,
      strategy: 'DEPOSIT_FIRST',
      contentHash: 'hash-deposit',
    },
  },
  {
    packageId: 'pkg-12m',
    version: 2,
    durationMonths: 12,
    monthlyRent: 14000000,
    depositPolicy: { type: 'MONTHS_OF_RENT', months: 2 },
    resolvedDepositAmount: 28000000,
    status: 'active',
    currency: 'VND',
  },
  {
    packageId: 'pkg-inactive',
    version: 1,
    durationMonths: 3,
    monthlyRent: 16000000,
    depositPolicy: { type: 'MONTHS_OF_RENT', months: 1 },
    resolvedDepositAmount: 16000000,
    status: 'inactive',
    currency: 'VND',
  },
]

describe('ApplyStepPackage Component', () => {
  afterEach(() => cleanup())

  it('renders only active packages and calculates UI subtotal', () => {
    const onSelect = vi.fn()
    const onBack = vi.fn()
    const onNext = vi.fn()

    render(
      <ApplyStepPackage
        packages={mockPackages}
        selectedPackageId=""
        onSelectPackage={onSelect}
        onBack={onBack}
        onNext={onNext}
      />
    )

    expect(screen.getByText(/Thời hạn: 6 tháng/)).toBeInTheDocument()
    expect(screen.getByText(/Thời hạn: 12 tháng/)).toBeInTheDocument()
    expect(screen.queryByText(/Thời hạn: 3 tháng/)).not.toBeInTheDocument()

    // 15,000,000 * 6 = 90,000,000
    expect(screen.getByText('90.000.000 ₫')).toBeInTheDocument()
    // 14,000,000 * 12 = 168,000,000
    expect(screen.getByText('168.000.000 ₫')).toBeInTheDocument()
  })

  it('lets the tenant choose an allowed payment cycle and updates the first invoice estimate', () => {
    const onSelectPaymentCycle = vi.fn()
    const packageWithSettlement = {
      ...mockPackages[0]!,
      settlementPolicy: {
        holdingDeposit: { type: 'PERCENT_OF_SECURITY' as const, percent: 30 },
        allowedPaymentCycles: [1, 3] as Array<1 | 3 | 6>,
        defaultPaymentCycle: 1 as const,
        firstPaymentDueOffsetDays: 3,
      },
      resolvedHoldingDepositAmount: 4_500_000,
      resolvedSecurityTopUpAmount: 10_500_000,
    }
    const { rerender } = render(
      <ApplyStepPackage
        packages={[packageWithSettlement]}
        selectedPackageId={packageWithSettlement.packageId}
        selectedPaymentCycleMonths={1}
        onSelectPaymentCycle={onSelectPaymentCycle}
        onSelectPackage={vi.fn()}
        onBack={vi.fn()}
        onNext={vi.fn()}
      />
    )
    expect(
      screen.getByText(
        /Kỳ đầu dự kiến: 15\.000\.000 ₫ \+ bù cọc 10\.500\.000 ₫/
      )
    ).toBeInTheDocument()
    fireEvent.change(screen.getByLabelText('Chu kỳ thanh toán tiền thuê'), {
      target: { value: '3' },
    })
    expect(onSelectPaymentCycle).toHaveBeenCalledWith(3)
    rerender(
      <ApplyStepPackage
        packages={[packageWithSettlement]}
        selectedPackageId={packageWithSettlement.packageId}
        selectedPaymentCycleMonths={3}
        onSelectPaymentCycle={onSelectPaymentCycle}
        onSelectPackage={vi.fn()}
        onBack={vi.fn()}
        onNext={vi.fn()}
      />
    )
    expect(
      screen.getByText(
        /Kỳ đầu dự kiến: 45\.000\.000 ₫ \+ bù cọc 10\.500\.000 ₫/
      )
    ).toBeInTheDocument()
  })

  it('disables next button when no package is selected', () => {
    render(
      <ApplyStepPackage
        packages={mockPackages}
        selectedPackageId=""
        onSelectPackage={vi.fn()}
        onBack={vi.fn()}
        onNext={vi.fn()}
      />
    )

    const nextBtn = screen.getByRole('button', {
      name: /Xem điều khoản & cam kết/i,
    })
    expect(nextBtn).toBeDisabled()
  })

  it('triggers onSelectPackage when a package card is clicked and enables next button', () => {
    const onSelect = vi.fn()
    const onNext = vi.fn()

    const { rerender } = render(
      <ApplyStepPackage
        packages={mockPackages}
        selectedPackageId=""
        onSelectPackage={onSelect}
        onBack={vi.fn()}
        onNext={onNext}
      />
    )

    fireEvent.click(screen.getByTestId('package-card-pkg-12m'))
    expect(onSelect).toHaveBeenCalledWith('pkg-12m')

    rerender(
      <ApplyStepPackage
        packages={mockPackages}
        selectedPackageId="pkg-12m"
        onSelectPackage={onSelect}
        onBack={vi.fn()}
        onNext={onNext}
      />
    )

    const nextBtn = screen.getByRole('button', {
      name: /Xem điều khoản & cam kết/i,
    })
    expect(nextBtn).not.toBeDisabled()
    fireEvent.click(nextBtn)
    expect(onNext).toHaveBeenCalledTimes(1)
  })

  it('triggers onBack when back button is clicked', () => {
    const onBack = vi.fn()

    render(
      <ApplyStepPackage
        packages={mockPackages}
        selectedPackageId=""
        onSelectPackage={vi.fn()}
        onBack={onBack}
        onNext={vi.fn()}
      />
    )

    fireEvent.click(
      screen.getByRole('button', { name: /Quay lại thông tin người thuê/i })
    )
    expect(onBack).toHaveBeenCalledTimes(1)
  })

  it('renders empty state when there are no active packages', () => {
    render(
      <ApplyStepPackage
        packages={[]}
        selectedPackageId=""
        onSelectPackage={vi.fn()}
        onBack={vi.fn()}
        onNext={vi.fn()}
      />
    )

    expect(screen.getByTestId('no-active-packages')).toBeInTheDocument()
  })

  it('renders admin-approved execution policies and emits the selected policy', () => {
    const onSelectPolicy = vi.fn()
    render(
      <ApplyStepPackage
        packages={mockPackages}
        selectedPackageId="pkg-6m"
        selectedExecutionPolicy={null}
        onSelectPackage={vi.fn()}
        onSelectExecutionPolicy={onSelectPolicy}
        onBack={vi.fn()}
        onNext={vi.fn()}
      />
    )

    expect(screen.getByTestId('execution-policy-selection')).toBeInTheDocument()
    const signFirst = screen.getByTestId('execution-policy-SIGN_FIRST')
    fireEvent.click(signFirst)
    expect(onSelectPolicy).toHaveBeenCalledWith({
      policyId: 'sign-first',
      version: 1,
      strategy: 'SIGN_FIRST',
      contentHash: 'hash-sign',
    })
  })
})
