import { cleanup, fireEvent, render, screen } from '@testing-library/react'
import { afterEach, describe, expect, it, vi } from 'vitest'
import type { LandlordApartmentItem } from '@/features/apartment-posting'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ListingCard } from './listing-card'

const apiMocks = vi.hoisted(() => ({ get: vi.fn() }))
vi.mock('@/shared/api', async importOriginal => {
  const actual = await importOriginal<typeof import('@/shared/api')>()
  return { ...actual, apiClient: { ...actual.apiClient, get: apiMocks.get } }
})

function buildItem(
  overrides: Partial<LandlordApartmentItem> = {}
): LandlordApartmentItem {
  return {
    id: 'apt-1',
    title: 'Căn hộ 2PN Vinhomes Grand Park',
    category: 'Căn hộ chung cư',
    description: 'Mô tả',
    location: 'Quận 9, TP.HCM',
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
    status: 'pending',
    rejectedReason: null,
    submittedAt: '2026-09-19T00:00:00.000Z',
    approvedAt: null,
    expiresAt: null,
    projectName: '',
    projectId: null,
    ...overrides,
  }
}

function renderCard(
  item: LandlordApartmentItem,
  handlers: { onEdit?: () => void; onRenew?: (id: string) => void } = {}
): void {
  render(
    <ListingCard
      item={item}
      onEdit={handlers.onEdit ?? vi.fn()}
      onRenew={handlers.onRenew ?? vi.fn()}
      isRenewing={false}
    />
  )
}

describe('ListingCard', () => {
  afterEach(() => cleanup())

  it('shows the VND price in millions', () => {
    renderCard(buildItem({ priceMonthly: 15_000_000 }))

    expect(screen.getByText('15 triệu/tháng')).toBeTruthy()
  })

  it('keeps decimals for non-round prices', () => {
    renderCard(buildItem({ priceMonthly: 12_500_000 }))

    expect(screen.getByText('12,5 triệu/tháng')).toBeTruthy()
  })

  it('offers renew on an expired listing and shows its badge', () => {
    const onRenew = vi.fn()
    renderCard(buildItem({ status: 'expired' }), { onRenew })

    expect(screen.getByText('Hết hạn')).toBeTruthy()
    fireEvent.click(screen.getByRole('button', { name: /Gia hạn/ }))

    expect(onRenew).toHaveBeenCalledWith('apt-1')
  })

  it('offers edit and resubmit on a rejected listing with the reason', () => {
    const onEdit = vi.fn()
    renderCard(
      buildItem({ status: 'rejected', rejectedReason: 'Ảnh không rõ ràng' }),
      { onEdit }
    )

    expect(screen.getByText(/Ảnh không rõ ràng/)).toBeTruthy()
    fireEvent.click(screen.getByRole('button', { name: /Sửa & Nộp lại/ }))

    expect(onEdit).toHaveBeenCalledTimes(1)
  })

  it('shows the pending badge and no action buttons while awaiting review', () => {
    renderCard(buildItem({ status: 'pending' }))

    expect(screen.getByText('Chờ kiểm duyệt')).toBeTruthy()
    // Only the commission info button remains; no edit/renew actions.
    expect(
      screen.getAllByRole('button').map(b => b.getAttribute('aria-label'))
    ).toEqual(['Xem phí hoa hồng', null])
    expect(
      screen.getByRole('button', { name: 'Yêu cầu thiết kế 3D' })
    ).toBeTruthy()
  })

  it('shows the 3D design request trigger and active status chip', () => {
    render(
      <QueryClientProvider client={new QueryClient()}>
        <ListingCard
          item={buildItem({ status: 'available' })}
          onEdit={vi.fn()}
          onRenew={vi.fn()}
          isRenewing={false}
          designRequestStatus="delivered"
        />
      </QueryClientProvider>
    )

    expect(
      screen.getByRole('button', { name: 'Yêu cầu thiết kế 3D' })
    ).toBeTruthy()
    expect(screen.getByText('3D: Chờ bạn duyệt')).toBeTruthy()
  })

  it('renders the commission info button and opens the dialog', async () => {
    apiMocks.get.mockResolvedValue({
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
        <ListingCard
          item={buildItem({ status: 'available' })}
          onEdit={vi.fn()}
          onRenew={vi.fn()}
          isRenewing={false}
        />
      </QueryClientProvider>
    )

    fireEvent.click(screen.getByRole('button', { name: 'Xem phí hoa hồng' }))

    expect(await screen.findByText('Phí hoa hồng nền tảng')).toBeTruthy()
    expect(apiMocks.get).toHaveBeenCalledWith(
      '/platform-fees/apartments/apt-1/commission'
    )
  })
})
