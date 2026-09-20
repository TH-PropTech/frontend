import { cleanup, fireEvent, render, screen } from '@testing-library/react'
import { afterEach, describe, expect, it, vi } from 'vitest'
import type { LandlordApartmentItem } from '@/features/apartment-posting'
import { ListingCard } from './listing-card'

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
    buildingName: '',
    buildingId: null,
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
    expect(screen.queryByRole('button')).toBeNull()
  })
})
