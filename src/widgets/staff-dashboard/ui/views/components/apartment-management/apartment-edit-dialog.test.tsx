import {
  cleanup,
  fireEvent,
  render,
  screen,
  waitFor,
} from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'
import { toast } from 'sonner'

import { apiClient } from '@/shared/api/api-client'
import { ApartmentEditDialog } from './apartment-edit-dialog'
import type { StaffApartment } from './types'

vi.mock('@/shared/api/api-client', () => ({
  apiClient: { patch: vi.fn() },
}))

vi.mock('sonner', () => ({
  toast: { success: vi.fn(), error: vi.fn() },
}))

const patch = vi.mocked(apiClient.patch)

const apartment: StaffApartment = {
  id: '507f1f77bcf86cd799439011',
  title: 'Căn hộ 2PN Vinhomes Grand Park',
  category: 'Căn hộ chung cư',
  description:
    'Căn hộ 2 phòng ngủ đầy đủ nội thất, gần trung tâm thương mại và trường học, an ninh 24/7.',
  location: 'Nguyễn Xiển, Long Thạnh Mỹ, Quận 9, TP.HCM',
  city: 'TP.HCM',
  district: 'Quận 9',
  ward: 'Long Thạnh Mỹ',
  street: 'Nguyễn Xiển',
  address: '12 Nguyễn Xiển',
  priceMonthly: 15_000_000,
  area: 65,
  bedrooms: 2,
  bathrooms: 2,
  direction: 'Đông',
  balconyDirection: 'Nam',
  furniture: 'Đầy đủ',
  moveInTime: 'Ngay',
  electricity: 'Giá nhà nước',
  water: 'Giá nhà nước',
  internet: 'Miễn phí',
  gallery: [],
  images360: [],
  vrUrl: '',
  amenities: [],
  status: 'available',
  isVerified: true,
  landlordId: 'landlord-1',
  rejectedReason: null,
  submittedAt: null,
  approvedAt: null,
  expiresAt: null,
  projectName: null,
}

function renderDialog(overrides: Partial<StaffApartment> = {}): {
  onSaved: ReturnType<typeof vi.fn>
  onClose: ReturnType<typeof vi.fn>
} {
  const onSaved = vi.fn()
  const onClose = vi.fn()
  render(
    <ApartmentEditDialog
      apartment={{ ...apartment, ...overrides }}
      onSaved={onSaved}
      onClose={onClose}
    />
  )
  return { onSaved, onClose }
}

function type(label: string, value: string): void {
  fireEvent.change(screen.getByLabelText(label), { target: { value } })
}

function submit(): void {
  fireEvent.click(screen.getByRole('button', { name: 'Lưu thay đổi' }))
}

describe('ApartmentEditDialog', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })
  afterEach(() => cleanup())

  it('prefills the form and shows the price in millions', () => {
    renderDialog()

    expect((screen.getByLabelText('Tiêu đề') as HTMLInputElement).value).toBe(
      apartment.title
    )
    expect(
      (screen.getByLabelText('Giá thuê (triệu/tháng)') as HTMLInputElement)
        .value
    ).toBe('15')
    expect(screen.getByLabelText('Loại hình').textContent).toContain(
      'Căn hộ chung cư'
    )
  })

  it('only offers the two apartment categories', async () => {
    renderDialog()

    await userEvent.click(screen.getByLabelText('Loại hình'))
    const options = (await screen.findAllByRole('option')).map(
      option => option.textContent
    )

    expect(options).toEqual([
      'Căn hộ chung cư',
      'Chung cư mini, căn hộ dịch vụ',
    ])
  })

  it('blocks an invalid form and shows the validation message', () => {
    renderDialog()
    type('Tiêu đề', 'ngắn')
    submit()

    expect(screen.getByText(/Tiêu đề phải dài tối thiểu 10 ký tự/)).toBeTruthy()
    expect(patch).not.toHaveBeenCalled()
  })

  it.each([
    ['Giá thuê (triệu/tháng)', '0'],
    ['Diện tích (m²)', '0'],
    ['Số phòng ngủ', '-1'],
  ])('rejects %s = %s', (label, value) => {
    renderDialog()
    type(label, value)
    submit()

    expect(patch).not.toHaveBeenCalled()
  })

  it('saves an approved listing with the price in VND and without touching the location', async () => {
    const saved = { ...apartment, title: 'Căn hộ 2PN đã chỉnh sửa' }
    patch.mockResolvedValue(saved)
    const { onSaved } = renderDialog()
    type('Tiêu đề', 'Căn hộ 2PN đã chỉnh sửa')
    type('Giá thuê (triệu/tháng)', '12.5')

    submit()

    await waitFor(() => expect(onSaved).toHaveBeenCalledWith(saved))
    const [url, body] = patch.mock.calls[0] as [string, Record<string, unknown>]
    expect(url).toBe(`/apartments/${apartment.id}`)
    expect(body).toMatchObject({
      title: 'Căn hộ 2PN đã chỉnh sửa',
      priceMonthly: 12_500_000,
      area: 65,
      bedrooms: 2,
      category: 'Căn hộ chung cư',
    })
    expect(body).not.toHaveProperty('location')
    expect(body).not.toHaveProperty('status')
    expect(body).not.toHaveProperty('isVerified')
  })

  it('recomposes the location when an address part changes', async () => {
    patch.mockResolvedValue(apartment)
    renderDialog()
    type('Đường', 'Lê Văn Việt')

    submit()

    await waitFor(() => expect(patch).toHaveBeenCalled())
    const body = patch.mock.calls[0]?.[1] as Record<string, unknown>
    expect(body.location).toBe('Lê Văn Việt, Long Thạnh Mỹ, Quận 9, TP.HCM')
  })

  it('keeps the dialog open and reports the error when the save fails', async () => {
    patch.mockRejectedValue(new Error('Không có quyền'))
    const { onSaved, onClose } = renderDialog()

    submit()

    await waitFor(() =>
      expect(toast.error).toHaveBeenCalledWith('Không có quyền')
    )
    expect(onSaved).not.toHaveBeenCalled()
    expect(onClose).not.toHaveBeenCalled()
  })

  it('closes without saving on cancel', () => {
    const { onClose } = renderDialog()

    fireEvent.click(screen.getByRole('button', { name: 'Hủy' }))

    expect(onClose).toHaveBeenCalledTimes(1)
    expect(patch).not.toHaveBeenCalled()
  })
})

const policy = {
  policyId: 'policy-1',
  version: 1,
  // Dữ liệu cũ từ API có thể còn DEPOSIT_FIRST; khi ghi phải chuẩn hóa về SIGN_FIRST
  strategy: 'DEPOSIT_FIRST' as unknown as 'SIGN_FIRST',
  contentHash: 'hash-1',
}

const packagePriced: Partial<StaffApartment> = {
  pricingMode: 'packages',
  pricingRevision: 3,
  priceMonthly: 14_000_000,
  rentalPackages: [
    {
      packageId: 'pkg-12m',
      version: 1,
      durationMonths: 12,
      monthlyRent: 14_000_000,
      depositPolicy: { type: 'MONTHS_OF_RENT', months: 2 },
      status: 'active',
      resolvedDepositAmount: 28_000_000,
      allowedExecutionPolicies: [policy],
      defaultExecutionPolicy: policy,
    },
  ],
}

function lastBody(): Record<string, unknown> {
  return patch.mock.calls[0]?.[1] as Record<string, unknown>
}

describe('ApartmentEditDialog amenities and rental packages', () => {
  beforeEach(() => {
    vi.clearAllMocks()
    patch.mockResolvedValue(apartment)
  })
  afterEach(() => cleanup())

  it('shows the current amenities as checked', () => {
    renderDialog({ amenities: ['pool'] })

    expect((screen.getByLabelText('Bể bơi') as HTMLInputElement).checked).toBe(
      true
    )
    expect(
      (screen.getByLabelText('Phòng gym') as HTMLInputElement).checked
    ).toBe(false)
  })

  it('sends the toggled amenity list', async () => {
    renderDialog({ amenities: ['pool'] })

    fireEvent.click(screen.getByLabelText('Phòng gym'))
    fireEvent.click(screen.getByLabelText('Bể bơi'))
    submit()

    await waitFor(() => expect(patch).toHaveBeenCalled())
    expect(lastBody().amenities).toEqual(['gym'])
  })

  it('does not send rentalPackages when they were not touched', async () => {
    renderDialog()

    submit()

    await waitFor(() => expect(patch).toHaveBeenCalled())
    expect(lastBody()).not.toHaveProperty('rentalPackages')
  })

  it('lets staff enable a package and sends it without server-only fields', async () => {
    renderDialog({ pricingMode: 'legacy', rentalPackages: [] })

    fireEvent.click(screen.getByTestId('toggle-duration-6'))
    submit()

    await waitFor(() => expect(patch).toHaveBeenCalled())
    expect(lastBody().rentalPackages).toEqual([
      {
        packageId: 'pkg-6m',
        version: 1,
        durationMonths: 6,
        monthlyRent: 15_000_000,
        depositPolicy: { type: 'MONTHS_OF_RENT', months: 1 },
        status: 'active',
      },
    ])
  })

  it('uses the price typed above as the default rent of a new package', async () => {
    renderDialog({ pricingMode: 'legacy', rentalPackages: [] })
    type('Giá thuê (triệu/tháng)', '20')

    fireEvent.click(screen.getByTestId('toggle-duration-3'))
    submit()

    await waitFor(() => expect(patch).toHaveBeenCalled())
    const packages = lastBody().rentalPackages as Array<{
      monthlyRent: number
    }>
    expect(packages[0]?.monthlyRent).toBe(20_000_000)
  })

  it('locks the base price of a package-priced listing and does not send it', async () => {
    renderDialog(packagePriced)

    expect(
      (screen.getByLabelText('Giá thuê (triệu/tháng)') as HTMLInputElement)
        .disabled
    ).toBe(true)
    type('Tiêu đề', 'Căn hộ 2PN đã chỉnh sửa')
    submit()

    await waitFor(() => expect(patch).toHaveBeenCalled())
    expect(lastBody()).not.toHaveProperty('priceMonthly')
    expect(lastBody()).not.toHaveProperty('rentalPackages')
  })

  it('sends an edited package stripped of resolved data but keeping execution policies', async () => {
    renderDialog(packagePriced)

    fireEvent.change(screen.getByTestId('price-input-12'), {
      target: { value: '13000000' },
    })
    submit()

    await waitFor(() => expect(patch).toHaveBeenCalled())
    expect(lastBody().rentalPackages).toEqual([
      {
        packageId: 'pkg-12m',
        version: 1,
        durationMonths: 12,
        monthlyRent: 13_000_000,
        depositPolicy: { type: 'MONTHS_OF_RENT', months: 2 },
        status: 'active',
        allowedExecutionPolicies: [{ ...policy, strategy: 'SIGN_FIRST' }],
        defaultExecutionPolicy: { ...policy, strategy: 'SIGN_FIRST' },
      },
    ])
  })

  it('can switch every package off and unlocks the plain price', async () => {
    renderDialog(packagePriced)

    fireEvent.click(screen.getByTestId('toggle-duration-12'))

    expect(
      (screen.getByLabelText('Giá thuê (triệu/tháng)') as HTMLInputElement)
        .disabled
    ).toBe(false)
    submit()

    await waitFor(() => expect(patch).toHaveBeenCalled())
    expect(lastBody().rentalPackages).toEqual([])
    expect(lastBody().priceMonthly).toBe(14_000_000)
  })
})
