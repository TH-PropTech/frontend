import { cleanup, render, screen } from '@testing-library/react'
import { afterEach, describe, expect, it, vi } from 'vitest'
import type { ApartmentItem } from '@/entities/properties'
import { PropertyDetailHero } from './property-detail-hero'

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

const property: ApartmentItem = {
  id: 'apt-1',
  title: 'Apartment',
  category: 'Căn hộ',
  tag: 'empty',
  tagText: 'Trống',
  description: 'Mô tả',
  location: 'Quận 1',
  price: '12 triệu/tháng',
  priceNum: 12,
  area: '60 m²',
  areaNum: 60,
  rooms: '2 PN - 1 WC',
  city: 'TP.HCM',
  district: 'Quận 1',
  ward: 'Phường 1',
  street: 'Đường A',
  projectName: '',
  bedrooms: 2,
  bathrooms: 1,
  direction: 'Đông',
  balconyDirection: 'Đông',
  furniture: 'Đủ đồ',
  moveInTime: 'Ngay',
  electricityPriceType: 'Nhà nước',
  waterPriceType: 'Nhà nước',
  internetPriceType: 'Cố định',
  amenities: [],
  isVerified: true,
  hasMedia: false,
  gallery: [],
  images360: [],
  landlord: null,
  rentalAvailabilityStatus: 'reserved',
  rentalAvailabilityLabel: 'Có người giữ chỗ',
}

describe('PropertyDetailHero availability projection', () => {
  afterEach(() => cleanup())

  it('renders the backend availability label as accessible status text', () => {
    render(<PropertyDetailHero property={property} />)

    expect(screen.getByRole('status')).toHaveTextContent('Có người giữ chỗ')
    expect(screen.getByRole('status')).toHaveAttribute(
      'aria-label',
      'Tình trạng thuê: Có người giữ chỗ'
    )
  })

  it('hiển thị giá thuê dạng đầy đủ, không lẫn "triệu"', () => {
    const { container } = render(<PropertyDetailHero property={property} />)
    expect(container.textContent).toContain(
      `${(12_000_000).toLocaleString('vi-VN')} ₫/tháng`
    )
    expect(container.textContent).not.toContain('triệu/tháng')
  })

  it('không dùng cỡ chữ dưới 11px (class contract)', () => {
    const { container } = render(<PropertyDetailHero property={property} />)
    expect(container.innerHTML).not.toMatch(/text-\[(8|9|10)px\]/)
  })
})
