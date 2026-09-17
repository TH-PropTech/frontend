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
})
