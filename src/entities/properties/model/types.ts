export interface ApartmentItem {
  id: string
  title: string
  category: string // e.g. "Căn hộ chung cư", "Chung cư mini, căn hộ dịch vụ", "Nhà riêng", "Nhà biệt thự, liền kề", "Nhà mặt phố", "Nhà trọ, phòng trọ", "Shophouse, nhà phố thương mại", "Văn phòng", "Cửa hàng, ki ốt", "Kho, nhà xưởng, đất", "Bất động sản khác"
  tag: 'empty' | 'pending' | 'unavailable'
  tagText: string
  description: string
  location: string
  price: string
  priceNum: number // in millions of VND/month
  area: string
  areaNum: number // in m²
  rooms: string // visual description

  // Detailed Location
  city: string
  district: string
  ward: string
  street: string
  projectName: string // empty string if not in a project

  // Advanced Filter Specs
  bedrooms: number
  bathrooms: number
  direction: string // e.g., 'Đông', 'Tây', 'Nam', 'Bắc', 'Đông Bắc', 'Đông Nam', 'Tây Bắc', 'Tây Nam'
  balconyDirection: string
  furniture: string // e.g., 'Đầy đủ', 'Cơ bản', 'Không nội thất', 'Cao cấp'
  moveInTime: string // e.g., 'Ngay lập tức', 'Trong tháng này', 'Tháng sau'
  electricityPriceType: string // e.g., 'Giá nhà nước', 'Giá kinh doanh', 'Tự thỏa thuận'
  waterPriceType: string // e.g., 'Giá nhà nước', 'Giá kinh doanh', 'Tự thỏa thuận'
  internetPriceType: string // e.g., 'Miễn phí', 'Cố định', 'Tự lắp'
  amenities: string[] // e.g., ['pool', 'gym', 'parking', 'elevator', 'security', 'pets', 'park']
  isVerified: boolean
  hasMedia: boolean // has photos/video
}

export interface ProjectUnit {
  id: string
  name: string
  type: string
  bedrooms: number
  area: string
  price: string
  floor: string
  block: string
  view: string
}

export interface ProjectFeature {
  label: string
  value: string
}

export interface ProjectItem {
  id: string
  title: string
  developer: string
  location: string
  scale: string
  priceRange: string
  minPrice: number // min rent in million VND
  maxPrice: number // max rent in million VND
  tagText: string
  tag: 'open' | 'handover'
  description: string

  // Detailed Location
  city: string
  district: string
  ward: string
  street: string

  // Advanced features
  isVerified: boolean
  hasMedia: boolean
  amenities: string[]

  // Rich details for premium view
  features?: ProjectFeature[]
  units?: ProjectUnit[]
}

export interface LocationHierarchy {
  [province: string]: {
    [district: string]: {
      wards: string[]
      streets: string[]
      projects: string[]
    }
  }
}
