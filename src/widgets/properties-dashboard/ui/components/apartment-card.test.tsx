import { cleanup, render, screen } from '@testing-library/react'
import { afterEach, describe, expect, it, vi } from 'vitest'
import { ApartmentCard } from './apartment-card'

vi.mock('@/shared/lib/use-favorites', () => ({
  useFavorites: () => ({
    isFavorite: () => false,
    toggleFavorite: () => true,
  }),
}))

vi.mock(
  '@/widgets/community-dashboard/ui/components/auth-required-modal',
  () => ({
    AuthRequiredModal: () => null,
  })
)

const baseApartment = {
  id: 'apt-1',
  title: 'Apartment',
  price: '12 triệu/tháng',
  priceNum: 12,
  area: '60 m²',
  areaNum: 60,
  rooms: '2 PN - 1 WC',
  category: 'Căn hộ',
  location: 'Quận 1',
  tag: 'empty',
  tagText: 'Trống',
  description: 'Mô tả',
  isVerified: true,
  hasMedia: false,
  amenities: [],
}

describe('ApartmentCard availability projection', () => {
  afterEach(() => cleanup())

  it.each([
    ['reserved', 'Có người giữ chỗ'],
    ['deposit-paid', 'Đã đặt cọc'],
    ['rented', 'Đang cho thuê'],
  ] as const)('renders the %s backend availability label', (status, label) => {
    render(
      <ApartmentCard
        apt={{
          ...baseApartment,
          rentalAvailabilityStatus: status,
          rentalAvailabilityLabel: label,
        }}
      />
    )

    expect(
      screen.getByRole('status', { name: `Tình trạng thuê: ${label}` })
    ).toHaveTextContent(label)
  })

  it('renders available status text without relying on color alone', () => {
    render(
      <ApartmentCard
        apt={{
          ...baseApartment,
          rentalAvailabilityStatus: 'available',
          rentalAvailabilityLabel: 'Đang trống',
        }}
      />
    )

    expect(screen.getByRole('status')).toHaveTextContent('Đang trống')
  })
})
