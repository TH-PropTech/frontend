import { beforeEach, describe, it, expect, vi } from 'vitest'
import { render, screen, fireEvent } from '@testing-library/react'
import * as React from 'react'
import { useForm } from 'react-hook-form'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { RentalPackagesConfigSection } from './rental-packages-config-section'
import type { ApartmentFormValues } from '../model/types'

const apiMocks = vi.hoisted(() => ({ post: vi.fn() }))
vi.mock('@/shared/api', async importOriginal => {
  const actual = await importOriginal<typeof import('@/shared/api')>()
  return { ...actual, apiClient: { ...actual.apiClient, post: apiMocks.post } }
})

const toastMocks = vi.hoisted(() => ({ info: vi.fn() }))
vi.mock('@/shared/ui/app-toast', () => ({
  appToast: { info: toastMocks.info, success: vi.fn(), error: vi.fn() },
}))

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
  beforeEach(() => {
    toastMocks.info.mockClear()
  })

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

  it('disables the commission info button until a package is enabled, then previews enabled packages', async () => {
    apiMocks.post.mockResolvedValue({
      scheduleAvailable: true,
      dueDaysAfterActivation: 7,
      vatRatePercent: 10,
      pricesIncludeVat: false,
      landlordText: null,
      packages: [],
    })
    const client = new QueryClient({
      defaultOptions: { queries: { retry: false } },
    })
    render(
      <QueryClientProvider client={client}>
        <TestHarness initialValues={{ priceMonthly: 15 }} />
      </QueryClientProvider>
    )
    const info = screen.getByRole('button', { name: 'Xem phí hoa hồng' })
    expect((info as HTMLButtonElement).disabled).toBe(true)

    fireEvent.click(screen.getByTestId('toggle-duration-12'))
    expect((info as HTMLButtonElement).disabled).toBe(false)
    fireEvent.click(info)

    expect(await screen.findByText('Phí hoa hồng nền tảng')).toBeDefined()
    expect(apiMocks.post).toHaveBeenCalledWith(
      '/platform-fees/landlord-commission/preview',
      { packages: [{ durationMonths: 12, monthlyRent: 15_000_000 }] }
    )
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

  it('configures settlement and updates the first-cycle rent estimate', () => {
    render(<TestHarness initialValues={{ priceMonthly: 15 }} />)
    fireEvent.click(screen.getByTestId('toggle-duration-12'))
    const section = screen.getByTestId('settlement-policy-12')
    fireEvent.click(section.querySelector('button')!)
    fireEvent.change(
      screen.getByRole('combobox', { name: 'Chu kỳ mặc định 12 tháng' }),
      { target: { value: '3' } }
    )
    expect(screen.getByText(/Kỳ đầu: 45\.000\.000 ₫/)).toBeInTheDocument()
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

  it('offers no execution strategy selector (sign-first is the only flow)', () => {
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

    expect(screen.queryByTestId('execution-policy-config-12')).toBeNull()
  })

  describe('prepaid rent', () => {
    const sixMonth = {
      packageId: 'pkg-6',
      version: 1,
      durationMonths: 6 as const,
      monthlyRent: 10_000_000,
      depositPolicy: { type: 'MONTHS_OF_RENT' as const, months: 1 },
      status: 'active' as const,
    }
    const renderSix = (extra: Record<string, unknown> = {}) =>
      render(
        <TestHarness
          initialValues={{
            rentalPackages: [{ ...sixMonth, ...extra }],
          }}
        />
      )

    it('starts on the default rule and tells the landlord nothing was chosen', () => {
      renderSix()
      expect(
        (screen.getByTestId('prepaid-mode-6-DEFAULT') as HTMLInputElement)
          .checked
      ).toBe(true)
      expect(
        screen.getByText(/Chưa chọn: áp dụng kỳ thanh toán đầu/)
      ).toBeDefined()
      expect(toastMocks.info).not.toHaveBeenCalled()
    })

    it('warns that the terms must be stated clearly when a deposit-only package is chosen', () => {
      renderSix()
      fireEvent.click(screen.getByTestId('prepaid-mode-6-NONE'))

      expect(toastMocks.info).toHaveBeenCalledTimes(1)
      expect(toastMocks.info.mock.calls[0]?.[0]).toMatch(/chỉ thu tiền cọc/i)
      expect(toastMocks.info.mock.calls[0]?.[1]).toMatchObject({
        title: 'Cần quy định rõ ràng',
      })
      expect(screen.getByTestId('prepaid-summary-6').textContent).toContain(
        'Khách trả khi nhận nhà: 10.000.000 ₫ (chỉ cọc)'
      )
    })

    it('shows the amount the tenant pays at move-in for a prepaid-months package', () => {
      renderSix()
      fireEvent.click(screen.getByTestId('prepaid-mode-6-MONTHS'))

      expect(toastMocks.info).toHaveBeenCalledTimes(1)
      expect(toastMocks.info.mock.calls[0]?.[0]).toMatch(/ghi vào hợp đồng/i)
      const months = screen.getByTestId('prepaid-months-6') as HTMLInputElement
      expect(months.value).toBe('2')
      expect(screen.getByTestId('prepaid-summary-6').textContent).toContain(
        '10.000.000 ₫ cọc + 20.000.000 ₫ tiền thuê (2 tháng) = 30.000.000 ₫'
      )

      fireEvent.change(months, { target: { value: '4' } })
      expect(screen.getByTestId('prepaid-summary-6').textContent).toContain(
        '+ 40.000.000 ₫ tiền thuê (4 tháng) = 50.000.000 ₫'
      )
    })

    it('keeps prepaid months below the package duration (a full prepayment is its own option)', () => {
      renderSix()
      fireEvent.click(screen.getByTestId('prepaid-mode-6-MONTHS'))
      const months = screen.getByTestId('prepaid-months-6') as HTMLInputElement

      fireEvent.change(months, { target: { value: '9' } })
      expect(months.value).toBe('5')
      fireEvent.change(months, { target: { value: '0' } })
      expect(months.value).toBe('1')
    })

    it('charges the whole duration when the rent is fully prepaid', () => {
      renderSix()
      fireEvent.click(screen.getByTestId('prepaid-mode-6-FULL'))

      expect(screen.getByTestId('prepaid-summary-6').textContent).toContain(
        '10.000.000 ₫ cọc + 60.000.000 ₫ tiền thuê (6 tháng) = 70.000.000 ₫'
      )
    })

    it('goes back to the default rule without warning', () => {
      renderSix({ prepaidRent: { type: 'FULL' } })
      toastMocks.info.mockClear()

      fireEvent.click(screen.getByTestId('prepaid-mode-6-DEFAULT'))

      expect(toastMocks.info).not.toHaveBeenCalled()
      expect(screen.queryByTestId('prepaid-summary-6')).toBeNull()
    })

    it('reminds the landlord to enable move-in settlement so the prepayment is collected then', () => {
      renderSix({ prepaidRent: { type: 'MONTHS', months: 2 } })
      expect(screen.getByTestId('prepaid-summary-6').textContent).toMatch(
        /Bật "Quyết toán nhận nhà"/
      )
    })
  })
})
