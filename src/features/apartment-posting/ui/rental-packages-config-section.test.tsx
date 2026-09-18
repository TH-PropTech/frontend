import { describe, it, expect } from 'vitest'
import { render, screen, fireEvent } from '@testing-library/react'
import * as React from 'react'
import { useForm } from 'react-hook-form'
import { RentalPackagesConfigSection } from './rental-packages-config-section'
import type { ApartmentFormValues } from '../model/types'

function TestHarness({
  initialValues,
}: {
  initialValues?: Partial<ApartmentFormValues>
}) {
  const form = useForm<ApartmentFormValues>({
    defaultValues: {
      title: 'Căn hộ cao cấp Masteri',
      category: 'apartment',
      description: 'Mô tả căn hộ',
      city: 'Hồ Chí Minh',
      district: 'Quận 2',
      ward: 'Thảo Điền',
      street: 'Xa lộ Hà Nội',
      address: 'Số 1 Xa lộ Hà Nội',
      priceMonthly: 12.5,
      area: 75,
      bedrooms: 2,
      bathrooms: 2,
      furniture: 'full',
      amenities: ['wifi'],
      rentalPackages: [],
      ...initialValues,
    } as unknown as ApartmentFormValues,
  })

  return (
    <form>
      <RentalPackagesConfigSection form={form} />
    </form>
  )
}

describe('RentalPackagesConfigSection', () => {
  it('renders all duration options and fallback info message when no package is active', () => {
    render(<TestHarness />)

    expect(screen.getByTestId('rental-packages-config-section')).toBeDefined()
    expect(screen.getByTestId('package-card-12')).toBeDefined()
    expect(screen.getByTestId('package-card-6')).toBeDefined()
    expect(screen.getByTestId('package-card-3')).toBeDefined()
    expect(screen.getByTestId('package-card-24')).toBeDefined()

    expect(
      screen.getByText(/hệ thống sẽ tự động tạo một gói chuẩn/i)
    ).toBeDefined()
  })

  it('allows toggling on a 12-month package and calculates default price and deposit', () => {
    render(<TestHarness initialValues={{ priceMonthly: 15 }} />)

    const toggle12 = screen.getByTestId('toggle-duration-12')
    fireEvent.click(toggle12)

    // Price input should appear with 15 (million VND)
    const priceInput = screen.getByTestId('price-input-12') as HTMLInputElement
    expect(priceInput).toBeDefined()
    expect(priceInput.value).toBe('15')

    // Deposit preview should show 15.000.000 (1 month)
    expect(screen.getByText(/15\.000\.000/)).toBeDefined()
  })

  it('allows editing monthly price for an active package', () => {
    render(
      <TestHarness
        initialValues={{
          rentalPackages: [
            {
              packageId: 'pkg-12',
              version: 1,
              durationMonths: 12,
              monthlyRent: 15000000,
              depositPolicy: { type: 'MONTHS_OF_RENT', months: 1 },
              status: 'active',
            },
          ],
        }}
      />
    )

    const priceInput = screen.getByTestId('price-input-12') as HTMLInputElement
    fireEvent.change(priceInput, { target: { value: '18.5' } })
    expect(priceInput.value).toBe('18.5')
  })

  it('allows changing deposit value for active package', () => {
    render(
      <TestHarness
        initialValues={{
          rentalPackages: [
            {
              packageId: 'pkg-6',
              version: 1,
              durationMonths: 6,
              monthlyRent: 10000000,
              depositPolicy: { type: 'MONTHS_OF_RENT', months: 1 },
              status: 'active',
            },
          ],
        }}
      />
    )

    const depositInput = screen.getByTestId('deposit-val-6') as HTMLInputElement
    expect(depositInput.value).toBe('1')

    fireEvent.change(depositInput, { target: { value: '2' } })
    expect(depositInput.value).toBe('2')
    expect(screen.getByText(/20\.000\.000/)).toBeDefined()
  })

  it('allows toggling off an active package', () => {
    render(
      <TestHarness
        initialValues={{
          rentalPackages: [
            {
              packageId: 'pkg-3',
              version: 1,
              durationMonths: 3,
              monthlyRent: 8000000,
              depositPolicy: { type: 'MONTHS_OF_RENT', months: 1 },
              status: 'active',
            },
          ],
        }}
      />
    )

    expect(screen.queryByTestId('price-input-3')).not.toBeNull()

    const toggle3 = screen.getByTestId('toggle-duration-3')
    fireEvent.click(toggle3)

    // Should disappear
    expect(screen.queryByTestId('price-input-3')).toBeNull()
  })
})
