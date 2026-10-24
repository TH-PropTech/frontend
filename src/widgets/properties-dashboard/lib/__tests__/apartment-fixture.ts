import type { ApartmentItem } from '@/entities/properties'

export function makeApartment(
  overrides: Partial<ApartmentItem> = {}
): ApartmentItem {
  return {
    id: 'apt-1',
    title: 'Căn hộ 2PN Vinhomes Central Park',
    category: 'Căn hộ chung cư',
    tag: 'empty',
    tagText: 'Còn trống',
    description: 'Căn hộ view sông.',
    location: 'Bình Thạnh, TP.HCM',
    price: '15 triệu/tháng',
    priceNum: 15,
    area: '70 m²',
    areaNum: 70,
    rooms: '2 PN • 2 WC',
    city: 'Thành phố Hồ Chí Minh',
    district: 'Bình Thạnh',
    ward: 'Phường 22',
    street: 'Nguyễn Hữu Cảnh',
    projectName: 'Vinhomes Central Park',
    bedrooms: 2,
    bathrooms: 2,
    direction: 'Đông',
    balconyDirection: 'Đông',
    furniture: 'Đầy đủ',
    moveInTime: 'Ngay lập tức',
    electricityPriceType: 'Giá nhà nước',
    waterPriceType: 'Giá nhà nước',
    internetPriceType: 'Miễn phí',
    amenities: ['pool', 'gym'],
    isVerified: true,
    hasMedia: true,
    ...overrides,
  }
}
