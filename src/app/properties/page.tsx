'use client'

import * as React from 'react'
import Link from 'next/link'
import type { Route } from 'next'
import { useSearchParams } from 'next/navigation'
import { HomeHeader } from '@/widgets/home-dashboard/ui/home-header'
import { Button } from '@/shared/ui/button'
import { Footer } from '@/shared/ui/footer'

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

interface ProjectItem {
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
}

const mockProjects: ProjectItem[] = [
  {
    id: 'proj-1',
    title: 'Vinhomes Central Park',
    developer: 'Vingroup',
    location: 'Bình Thạnh, TP.HCM',
    scale: '18 blocks • 10,000+ căn hộ',
    priceRange: '15 - 45 triệu/tháng',
    minPrice: 15,
    maxPrice: 45,
    tagText: 'Đang vận hành',
    tag: 'handover',
    description:
      'Khu đô thị hiện đại bậc nhất bên sông Sài Gòn với công viên 14ha và tháp Landmark 81 cao nhất Việt Nam.',
    city: 'TP.HCM',
    district: 'Bình Thạnh',
    ward: 'Phường 22',
    street: 'Nguyễn Hữu Cảnh',
    isVerified: true,
    hasMedia: true,
    amenities: ['pool', 'gym', 'parking', 'elevator', 'security', 'park'],
  },
  {
    id: 'proj-2',
    title: 'Masteri Thảo Điền',
    developer: 'Masterise Homes',
    location: 'Thảo Điền, Quận 2, TP.HCM',
    scale: '5 blocks • 3,000+ căn hộ',
    priceRange: '18 - 35 triệu/tháng',
    minPrice: 18,
    maxPrice: 35,
    tagText: 'Sắp bàn giao block mới',
    tag: 'open',
    description:
      'Dự án căn hộ cao cấp kết nối trực tiếp ga Metro số 7 An Phú, đầy đủ tiện ích ngoại khu sang trọng.',
    city: 'TP.HCM',
    district: 'Quận 2',
    ward: 'Phường Thảo Điền',
    street: 'Xa Lộ Hà Nội',
    isVerified: true,
    hasMedia: true,
    amenities: ['pool', 'gym', 'parking', 'elevator', 'security'],
  },
  {
    id: 'proj-3',
    title: 'Empire City Thủ Thiêm',
    developer: 'Keppel Land',
    location: 'Thủ Thiêm, Quận 2, TP.HCM',
    scale: '11 blocks • Phân khu Linden',
    priceRange: '25 - 60 triệu/tháng',
    minPrice: 25,
    maxPrice: 60,
    tagText: 'Đang bàn giao',
    tag: 'handover',
    description:
      'Khu phức hợp căn hộ hạng sang vị trí vàng Thủ Thiêm nhìn thẳng sang trung tâm Quận 1 qua sông Sài Gòn.',
    city: 'TP.HCM',
    district: 'Quận 2',
    ward: 'Phường Thủ Thiêm',
    street: 'Mai Chí Thọ',
    isVerified: true,
    hasMedia: true,
    amenities: ['pool', 'gym', 'parking', 'elevator', 'security', 'park'],
  },
  {
    id: 'proj-4',
    title: 'Sunrise City',
    developer: 'Novaland',
    location: 'Quận 7, TP.HCM',
    scale: '12 blocks • 2,200 căn hộ',
    priceRange: '12 - 30 triệu/tháng',
    minPrice: 12,
    maxPrice: 30,
    tagText: 'Đang vận hành',
    tag: 'handover',
    description:
      'Dự án căn hộ trung cao cấp trục đường Nguyễn Hữu Thọ đối diện Lotte Mart Quận 7, giao thông thuận tiện.',
    city: 'TP.HCM',
    district: 'Quận 7',
    ward: 'Phường Tân Hưng',
    street: 'Nguyễn Hữu Thọ',
    isVerified: true,
    hasMedia: true,
    amenities: ['pool', 'gym', 'parking', 'elevator', 'security'],
  },
  {
    id: 'proj-5',
    title: 'Vinhomes Smart City',
    developer: 'Vingroup',
    location: 'Nam Từ Liêm, Hà Nội',
    scale: '58 blocks • 40,000+ căn hộ',
    priceRange: '8 - 22 triệu/tháng',
    minPrice: 8,
    maxPrice: 22,
    tagText: 'Đang vận hành',
    tag: 'handover',
    description:
      'Đại đô thị thông minh chuẩn quốc tế đầu tiên tại Việt Nam với công viên thể thao quy mô hàng đầu Đông Nam Á.',
    city: 'Hà Nội',
    district: 'Nam Từ Liêm',
    ward: 'Phường Tây Mỗ',
    street: 'Đại Lộ Thăng Long',
    isVerified: true,
    hasMedia: true,
    amenities: [
      'pool',
      'gym',
      'parking',
      'elevator',
      'security',
      'park',
      'pets',
    ],
  },
  {
    id: 'proj-6',
    title: 'Discovery Complex',
    developer: 'Kinh Đô TCI Group',
    location: 'Cầu Giấy, Hà Nội',
    scale: '2 blocks • Tháp căn hộ 54 tầng',
    priceRange: '10 - 28 triệu/tháng',
    minPrice: 10,
    maxPrice: 28,
    tagText: 'Đang vận hành',
    tag: 'handover',
    description:
      'Tổ hợp trung tâm thương mại, văn phòng và căn hộ cao cấp sở hữu vị trí đắc địa trung tâm quận Cầu Giấy.',
    city: 'Hà Nội',
    district: 'Cầu Giấy',
    ward: 'Phường Dịch Vọng',
    street: 'Khúc Thừa Dụ',
    isVerified: true,
    hasMedia: true,
    amenities: ['pool', 'gym', 'parking', 'elevator', 'security'],
  },
]

export const mockApartments: ApartmentItem[] = [
  {
    id: 'PROP-CAR-101',
    title: 'Căn hộ cao cấp Vinhomes Central Park 2PN',
    category: 'Căn hộ chung cư',
    tag: 'empty',
    tagText: 'Trống',
    description:
      'Cho thuê căn hộ Vinhomes Central Park, tầng cao view sông và công viên 14ha tuyệt đẹp, đầy đủ nội thất sang trọng.',
    location: 'Bình Thạnh, TP.HCM',
    price: '18 triệu / tháng',
    priceNum: 18,
    area: '75 m²',
    areaNum: 75,
    rooms: '2 PN, 2 WC',
    city: 'TP.HCM',
    district: 'Bình Thạnh',
    ward: 'Phường 22',
    street: 'Nguyễn Hữu Cảnh',
    projectName: 'Vinhomes Central Park',
    bedrooms: 2,
    bathrooms: 2,
    direction: 'Đông Nam',
    balconyDirection: 'Đông Nam',
    furniture: 'Đầy đủ',
    moveInTime: 'Ngay lập tức',
    electricityPriceType: 'Giá nhà nước',
    waterPriceType: 'Giá nhà nước',
    internetPriceType: 'Cố định',
    amenities: [
      'pool',
      'gym',
      'parking',
      'elevator',
      'security',
      'pets',
      'park',
    ],
    isVerified: true,
    hasMedia: true,
  },
  {
    id: 'PROP-CAR-102',
    title: 'Studio Masteri Thảo Điền nội thất cơ bản',
    category: 'Căn hộ chung cư',
    tag: 'pending',
    tagText: 'Đang chờ cọc',
    description:
      'Căn hộ studio Masteri Thảo Điền, phù hợp cho người nước ngoài hoặc chuyên gia làm việc tại trung tâm, gần ga Metro.',
    location: 'Quận 2, TP.HCM',
    price: '12 triệu / tháng',
    priceNum: 12,
    area: '48 m²',
    areaNum: 48,
    rooms: '1 PN, 1 WC',
    city: 'TP.HCM',
    district: 'Quận 2',
    ward: 'Phường Thảo Điền',
    street: 'Xa Lộ Hà Nội',
    projectName: 'Masteri Thảo Điền',
    bedrooms: 1,
    bathrooms: 1,
    direction: 'Tây',
    balconyDirection: 'Tây Nam',
    furniture: 'Cơ bản',
    moveInTime: 'Trong tháng này',
    electricityPriceType: 'Giá nhà nước',
    waterPriceType: 'Giá nhà nước',
    internetPriceType: 'Tự lắp',
    amenities: ['pool', 'gym', 'parking', 'elevator', 'security'],
    isVerified: true,
    hasMedia: true,
  },
  {
    id: 'PROP-CAR-103',
    title: 'Căn hộ Sunrise City 3PN rộng rãi view hồ bơi',
    category: 'Căn hộ chung cư',
    tag: 'unavailable',
    tagText: 'Đang cập nhật',
    description:
      'Cho thuê nhanh căn hộ Sunrise City Quận 7 đối diện Lotte Mart, lầu cao thoáng mát, nội thất cao cấp nhập khẩu.',
    location: 'Quận 7, TP.HCM',
    price: '25 triệu / tháng',
    priceNum: 25,
    area: '110 m²',
    areaNum: 110,
    rooms: '3 PN, 2 WC',
    city: 'TP.HCM',
    district: 'Quận 7',
    ward: 'Phường Tân Hưng',
    street: 'Nguyễn Hữu Thọ',
    projectName: 'Sunrise City',
    bedrooms: 3,
    bathrooms: 2,
    direction: 'Nam',
    balconyDirection: 'Đông Nam',
    furniture: 'Cao cấp',
    moveInTime: 'Tháng sau',
    electricityPriceType: 'Giá kinh doanh',
    waterPriceType: 'Giá kinh doanh',
    internetPriceType: 'Cố định',
    amenities: ['pool', 'gym', 'parking', 'elevator', 'security', 'pets'],
    isVerified: false,
    hasMedia: true,
  },
  {
    id: 'PROP-CAR-104',
    title: 'Penthouse Discovery Complex Cầu Giấy đẳng cấp',
    category: 'Căn hộ chung cư',
    tag: 'empty',
    tagText: 'Trống',
    description:
      'Cho thuê siêu phẩm Penthouse tại Discovery Complex Cầu Giấy, không gian thông tầng, sân vườn rộng, thiết kế cực kỳ hiện đại.',
    location: 'Cầu Giấy, Hà Nội',
    price: '55 triệu / tháng',
    priceNum: 55,
    area: '210 m²',
    areaNum: 210,
    rooms: '4 PN, 3 WC',
    city: 'Hà Nội',
    district: 'Cầu Giấy',
    ward: 'Phường Dịch Vọng',
    street: 'Khúc Thừa Dụ',
    projectName: 'Discovery Complex',
    bedrooms: 4,
    bathrooms: 3,
    direction: 'Đông',
    balconyDirection: 'Đông Nam',
    furniture: 'Cao cấp',
    moveInTime: 'Linh hoạt',
    electricityPriceType: 'Giá nhà nước',
    waterPriceType: 'Giá nhà nước',
    internetPriceType: 'Cố định',
    amenities: ['pool', 'gym', 'parking', 'elevator', 'security', 'park'],
    isVerified: true,
    hasMedia: true,
  },
  {
    id: 'PROP-CAR-105',
    title: 'Căn hộ Vinhomes Smart City 2PN giá tốt',
    category: 'Căn hộ chung cư',
    tag: 'empty',
    tagText: 'Trống',
    description:
      'Căn hộ Vinhomes Smart City Tây Mỗ mới nhận bàn giao, ban công Đông Bắc thoáng mát, nhà nguyên bản chủ đầu tư chưa nội thất.',
    location: 'Nam Từ Liêm, Hà Nội',
    price: '10 triệu / tháng',
    priceNum: 10,
    area: '58 m²',
    areaNum: 58,
    rooms: '2 PN, 1 WC',
    city: 'Hà Nội',
    district: 'Nam Từ Liêm',
    ward: 'Phường Tây Mỗ',
    street: 'Đại Lộ Thăng Long',
    projectName: 'Vinhomes Smart City',
    bedrooms: 2,
    bathrooms: 1,
    direction: 'Bắc',
    balconyDirection: 'Đông Bắc',
    furniture: 'Không nội thất',
    moveInTime: 'Trong tháng này',
    electricityPriceType: 'Giá nhà nước',
    waterPriceType: 'Giá nhà nước',
    internetPriceType: 'Cố định',
    amenities: [
      'pool',
      'gym',
      'parking',
      'elevator',
      'security',
      'pets',
      'park',
    ],
    isVerified: true,
    hasMedia: false,
  },
  {
    id: 'PROP-CAR-106',
    title: 'Chung cư mini Cầu Giấy full đồ mới tinh',
    category: 'Chung cư mini, căn hộ dịch vụ',
    tag: 'empty',
    tagText: 'Trống',
    description:
      'Chung cư mini cao cấp Khúc Thừa Dụ, có thang máy, khóa vân tay an ninh, đầy đủ điều hòa, nóng lạnh, giường tủ, máy giặt riêng.',
    location: 'Cầu Giấy, Hà Nội',
    price: '6.5 triệu / tháng',
    priceNum: 6.5,
    area: '35 m²',
    areaNum: 35,
    rooms: '1 PN, 1 WC',
    city: 'Hà Nội',
    district: 'Cầu Giấy',
    ward: 'Phường Dịch Vọng',
    street: 'Khúc Thừa Dụ',
    projectName: '',
    bedrooms: 1,
    bathrooms: 1,
    direction: 'Đông',
    balconyDirection: 'Đông',
    furniture: 'Đầy đủ',
    moveInTime: 'Ngay lập tức',
    electricityPriceType: 'Tự thỏa thuận',
    waterPriceType: 'Tự thỏa thuận',
    internetPriceType: 'Miễn phí',
    amenities: ['parking', 'elevator', 'security'],
    isVerified: true,
    hasMedia: true,
  },
  {
    id: 'PROP-CAR-107',
    title: 'Nhà riêng nguyên căn Điện Biên Phủ Bình Thạnh',
    category: 'Nhà riêng',
    tag: 'empty',
    tagText: 'Trống',
    description:
      'Cho thuê nhà riêng nguyên căn đường Điện Biên Phủ, giáp Quận 1, hẻm xe hơi thông thoáng, phù hợp ở gia đình hoặc làm văn phòng.',
    location: 'Bình Thạnh, TP.HCM',
    price: '15 triệu / tháng',
    priceNum: 15,
    area: '60 m²',
    areaNum: 60,
    rooms: '2 PN, 2 WC',
    city: 'TP.HCM',
    district: 'Bình Thạnh',
    ward: 'Phường 25',
    street: 'Điện Biên Phủ',
    projectName: '',
    bedrooms: 2,
    bathrooms: 2,
    direction: 'Tây Nam',
    balconyDirection: 'Tây Nam',
    furniture: 'Cơ bản',
    moveInTime: 'Ngay lập tức',
    electricityPriceType: 'Giá nhà nước',
    waterPriceType: 'Giá nhà nước',
    internetPriceType: 'Tự lắp',
    amenities: ['parking', 'pets'],
    isVerified: false,
    hasMedia: true,
  },
  {
    id: 'PROP-CAR-108',
    title: 'Biệt thự nghỉ dưỡng SwanBay đảo Đại Phước',
    category: 'Nhà biệt thự, liền kề',
    tag: 'empty',
    tagText: 'Trống',
    description:
      'Biệt thự đơn lập SwanBay Nhơn Trạch view sông thoáng đãng, sân vườn rộng, bể bơi mini, nội thất cao cấp chuẩn resort 5 sao.',
    location: 'Nhơn Trạch, Đồng Nai',
    price: '42 triệu / tháng',
    priceNum: 42,
    area: '250 m²',
    areaNum: 250,
    rooms: '4 PN, 4 WC',
    city: 'Đồng Nai',
    district: 'Nhơn Trạch',
    ward: 'Xã Đại Phước',
    street: 'Lý Thái Tổ',
    projectName: 'SwanBay',
    bedrooms: 4,
    bathrooms: 4,
    direction: 'Nam',
    balconyDirection: 'Nam',
    furniture: 'Cao cấp',
    moveInTime: 'Linh hoạt',
    electricityPriceType: 'Giá kinh doanh',
    waterPriceType: 'Giá kinh doanh',
    internetPriceType: 'Cố định',
    amenities: ['pool', 'gym', 'parking', 'security', 'pets', 'park'],
    isVerified: true,
    hasMedia: true,
  },
]

// Structure of cascade locations
interface LocationHierarchy {
  [province: string]: {
    [district: string]: {
      wards: string[]
      streets: string[]
      projects: string[]
    }
  }
}

const locationData: LocationHierarchy = {
  'TP.HCM': {
    'Bình Thạnh': {
      wards: ['Phường 22', 'Phường 25'],
      streets: ['Nguyễn Hữu Cảnh', 'Điện Biên Phủ'],
      projects: ['Vinhomes Central Park', 'Landmark 81'],
    },
    'Quận 2': {
      wards: ['Phường Thảo Điền', 'Phường Thủ Thiêm'],
      streets: ['Xa Lộ Hà Nội', 'Mai Chí Thọ'],
      projects: ['Masteri Thảo Điền', 'Empire City'],
    },
    'Quận 7': {
      wards: ['Phường Tân Hưng', 'Phường Phú Mỹ'],
      streets: ['Nguyễn Hữu Thọ', 'Huỳnh Tấn Phát'],
      projects: ['Sunrise City'],
    },
  },
  'Hà Nội': {
    'Nam Từ Liêm': {
      wards: ['Phường Tây Mỗ', 'Phường Mỹ Đình'],
      streets: ['Đại Lộ Thăng Long', 'Phạm Hùng'],
      projects: ['Vinhomes Smart City', 'The Manor'],
    },
    'Cầu Giấy': {
      wards: ['Phường Dịch Vọng', 'Phường Nghĩa Tân'],
      streets: ['Khúc Thừa Dụ', 'Xuân Thủy'],
      projects: ['Discovery Complex', 'Indochina Plaza'],
    },
  },
  'Đồng Nai': {
    'Nhơn Trạch': {
      wards: ['Xã Đại Phước', 'Xã Hiệp Phước'],
      streets: ['Lý Thái Tổ', 'Tôn Đức Thắng'],
      projects: ['SwanBay', 'King Bay'],
    },
  },
}

export default function PropertiesPage(): React.ReactElement {
  const searchParams = useSearchParams()
  const tabParam = searchParams?.get('tab')
  const [activeTab, setActiveTab] = React.useState<'single' | 'project'>(
    tabParam === 'project' ? 'project' : 'single'
  )
  const [searchKeyword, setSearchKeyword] = React.useState('')
  const [searchStatus, setSearchStatus] = React.useState('')
  const [selectedType, setSelectedType] = React.useState('Tất cả')

  // Detailed Cascade Location States
  const [selectedCity, setSelectedCity] = React.useState('')
  const [selectedDistrict, setSelectedDistrict] = React.useState('')
  const [selectedWard, setSelectedWard] = React.useState('')
  const [selectedStreet, setSelectedStreet] = React.useState('')
  const [selectedProject, setSelectedProject] = React.useState('')

  // Price & Area Range States
  const [minPrice, setMinPrice] = React.useState<number | ''>('')
  const [maxPrice, setMaxPrice] = React.useState<number | ''>('')
  const [minArea, setMinArea] = React.useState<number | ''>('')
  const [maxArea, setMaxArea] = React.useState<number | ''>('')

  // Advanced Drawer States
  const [isVerifiedOnly, setIsVerifiedOnly] = React.useState(false)
  const [bedroomsFilter, setBedroomsFilter] = React.useState<number | 'all'>(
    'all'
  )
  const [bathroomsFilter, setBathroomsFilter] = React.useState<number | 'all'>(
    'all'
  )
  const [directionFilter, setDirectionFilter] = React.useState<string>('all')
  const [balconyDirectionFilter, setBalconyDirectionFilter] =
    React.useState<string>('all')
  const [furnitureFilter, setFurnitureFilter] = React.useState<string>('all')
  const [moveInTimeFilter, setMoveInTimeFilter] = React.useState<string>('all')
  const [electricityPriceFilter, setElectricityPriceFilter] =
    React.useState<string>('all')
  const [waterPriceFilter, setWaterPriceFilter] = React.useState<string>('all')
  const [internetPriceFilter, setInternetPriceFilter] =
    React.useState<string>('all')
  const [selectedAmenities, setSelectedAmenities] = React.useState<string[]>([])
  const [hasMediaOnly, setHasMediaOnly] = React.useState(false)

  // Dropdown & Modal UI Open States
  const [isLocationModalOpen, setIsLocationModalOpen] = React.useState(false)
  const [isPriceModalOpen, setIsPriceModalOpen] = React.useState(false)
  const [isAreaModalOpen, setIsAreaOpen] = React.useState(false)
  const [isAdvancedDrawerOpen, setIsAdvancedDrawerOpen] = React.useState(false)

  // Reset all filters helper
  const resetFilters = (): void => {
    setSelectedCity('')
    setSelectedDistrict('')
    setSelectedWard('')
    setSelectedStreet('')
    setSelectedProject('')
    setMinPrice('')
    setMaxPrice('')
    setMinArea('')
    setMaxArea('')
    setIsVerifiedOnly(false)
    setBedroomsFilter('all')
    setBathroomsFilter('all')
    setDirectionFilter('all')
    setBalconyDirectionFilter('all')
    setFurnitureFilter('all')
    setMoveInTimeFilter('all')
    setElectricityPriceFilter('all')
    setWaterPriceFilter('all')
    setInternetPriceFilter('all')
    setSelectedAmenities([])
    setHasMediaOnly(false)
    setSelectedType('Tất cả')
    setSearchKeyword('')
    setSearchStatus('')
  }

  // Active filters count
  const activeFiltersCount = React.useMemo(() => {
    let count = 0
    if (selectedCity) count++
    if (selectedDistrict) count++
    if (selectedWard) count++
    if (selectedStreet) count++
    if (selectedProject) count++
    if (minPrice !== '' || maxPrice !== '') count++
    if (minArea !== '' || maxArea !== '') count++
    if (isVerifiedOnly) count++
    if (bedroomsFilter !== 'all') count++
    if (bathroomsFilter !== 'all') count++
    if (directionFilter !== 'all') count++
    if (balconyDirectionFilter !== 'all') count++
    if (furnitureFilter !== 'all') count++
    if (moveInTimeFilter !== 'all') count++
    if (electricityPriceFilter !== 'all') count++
    if (waterPriceFilter !== 'all') count++
    if (internetPriceFilter !== 'all') count++
    if (selectedAmenities.length > 0) count++
    if (hasMediaOnly) count++
    if (selectedType !== 'Tất cả') count++
    return count
  }, [
    selectedCity,
    selectedDistrict,
    selectedWard,
    selectedStreet,
    selectedProject,
    minPrice,
    maxPrice,
    minArea,
    maxArea,
    isVerifiedOnly,
    bedroomsFilter,
    bathroomsFilter,
    directionFilter,
    balconyDirectionFilter,
    furnitureFilter,
    moveInTimeFilter,
    electricityPriceFilter,
    waterPriceFilter,
    internetPriceFilter,
    selectedAmenities,
    hasMediaOnly,
    selectedType,
  ])

  const handleSearchSubmit = (e: React.FormEvent): void => {
    e.preventDefault()
    const trimmed = searchKeyword.trim()
    let statusText = 'Đang hiển thị kết quả lọc.'
    if (trimmed) {
      statusText = `Đang lọc theo "${trimmed}"...`
    }
    setSearchStatus(statusText)
  }

  // Filter projects
  const filteredProjects = mockProjects.filter(proj => {
    if (searchKeyword.trim()) {
      const kw = searchKeyword.toLowerCase()
      const matchTitle = proj.title.toLowerCase().includes(kw)
      const matchDev = proj.developer.toLowerCase().includes(kw)
      const matchLoc = proj.location.toLowerCase().includes(kw)
      if (!matchTitle && !matchDev && !matchLoc) return false
    }

    // Cascade Location match
    if (selectedCity && proj.city !== selectedCity) return false
    if (selectedDistrict && proj.district !== selectedDistrict) return false
    if (selectedWard && proj.ward !== selectedWard) return false
    if (selectedStreet && proj.street !== selectedStreet) return false

    // Price range match (overlapping ranges)
    if (minPrice !== '' && proj.maxPrice < Number(minPrice)) return false
    if (maxPrice !== '' && proj.minPrice > Number(maxPrice)) return false

    // Verified match
    if (isVerifiedOnly && !proj.isVerified) return false

    // Media match
    if (hasMediaOnly && !proj.hasMedia) return false

    // Amenities match (project must have all selected)
    if (selectedAmenities.length > 0) {
      const hasAll = selectedAmenities.every(amenity =>
        proj.amenities.includes(amenity)
      )
      if (!hasAll) return false
    }

    return true
  })

  // Filter apartments
  const filteredApartments = mockApartments.filter(apt => {
    // Keyword match
    if (searchKeyword.trim()) {
      const kw = searchKeyword.toLowerCase()
      const matchTitle = apt.title.toLowerCase().includes(kw)
      const matchDesc = apt.description.toLowerCase().includes(kw)
      const matchLoc = apt.location.toLowerCase().includes(kw)
      if (!matchTitle && !matchDesc && !matchLoc) return false
    }

    // Cascade Location match
    if (selectedCity && apt.city !== selectedCity) return false
    if (selectedDistrict && apt.district !== selectedDistrict) return false
    if (selectedWard && apt.ward !== selectedWard) return false
    if (selectedStreet && apt.street !== selectedStreet) return false
    if (selectedProject && apt.projectName !== selectedProject) return false

    // Type match
    if (selectedType !== 'Tất cả') {
      if (apt.category !== selectedType) return false
    }

    // Price range match
    if (minPrice !== '' && apt.priceNum < Number(minPrice)) return false
    if (maxPrice !== '' && apt.priceNum > Number(maxPrice)) return false

    // Area range match
    if (minArea !== '' && apt.areaNum < Number(minArea)) return false
    if (maxArea !== '' && apt.areaNum > Number(maxArea)) return false

    // Bedrooms match
    if (bedroomsFilter !== 'all' && apt.bedrooms !== Number(bedroomsFilter))
      return false

    // Bathrooms match
    if (bathroomsFilter !== 'all' && apt.bathrooms !== Number(bathroomsFilter))
      return false

    // Direction match
    if (directionFilter !== 'all' && apt.direction !== directionFilter)
      return false

    // Balcony direction match
    if (
      balconyDirectionFilter !== 'all' &&
      apt.balconyDirection !== balconyDirectionFilter
    )
      return false

    // Furniture match
    if (furnitureFilter !== 'all' && apt.furniture !== furnitureFilter)
      return false

    // Move-in time match
    if (moveInTimeFilter !== 'all' && apt.moveInTime !== moveInTimeFilter)
      return false

    // Utility prices matches
    if (
      electricityPriceFilter !== 'all' &&
      apt.electricityPriceType !== electricityPriceFilter
    )
      return false
    if (waterPriceFilter !== 'all' && apt.waterPriceType !== waterPriceFilter)
      return false
    if (
      internetPriceFilter !== 'all' &&
      apt.internetPriceType !== internetPriceFilter
    )
      return false

    // Verified match
    if (isVerifiedOnly && !apt.isVerified) return false

    // Media match
    if (hasMediaOnly && !apt.hasMedia) return false

    // Amenities match
    if (selectedAmenities.length > 0) {
      const hasAll = selectedAmenities.every(amenity =>
        apt.amenities.includes(amenity)
      )
      if (!hasAll) return false
    }

    return true
  })

  const locationLabel = React.useMemo(() => {
    const parts = []
    if (selectedCity) parts.push(selectedCity)
    if (selectedDistrict) parts.push(selectedDistrict)
    if (selectedWard) parts.push(selectedWard)
    if (selectedProject) parts.push(selectedProject)
    else if (selectedStreet) parts.push(selectedStreet)
    return parts.length > 0 ? parts.join(' • ') : 'Toàn quốc'
  }, [
    selectedCity,
    selectedDistrict,
    selectedWard,
    selectedStreet,
    selectedProject,
  ])

  const priceLabel = React.useMemo(() => {
    if (minPrice === '' && maxPrice === '') return 'Tất cả'
    if (minPrice !== '' && maxPrice === '') return `Từ ${minPrice} tr`
    if (minPrice === '' && maxPrice !== '') return `Dưới ${maxPrice} tr`
    return `${minPrice} - ${maxPrice} tr`
  }, [minPrice, maxPrice])

  const areaLabel = React.useMemo(() => {
    if (minArea === '' && maxArea === '') return 'Tất cả'
    if (minArea !== '' && maxArea === '') return `Từ ${minArea} m²`
    if (minArea === '' && maxArea !== '') return `Dưới ${maxArea} m²`
    return `${minArea} - ${maxArea} m²`
  }, [minArea, maxArea])

  return (
    <div className="min-h-screen bg-bg text-fg selection:bg-primary/20 selection:text-primary relative overflow-x-hidden">
      <HomeHeader />

      <main className="w-full">
        {/* Header Hero Section (Warm Cream Design with Topography Overlay) */}
        <section className="relative flex flex-col items-center justify-center bg-gradient-to-b from-[#f5ece2] via-[#faf6f1] to-bg pb-24 pt-32 text-center rounded-b-[40px] border-b border-border">
          {/* Topography SVG Background (extremely lightweight, vector-rendered) */}
          <div
            className="absolute inset-0 opacity-[0.08] pointer-events-none select-none overflow-hidden"
            style={{
              willChange: 'transform',
              transform: 'translate3d(0, 0, 0)',
              backfaceVisibility: 'hidden',
            }}
          >
            <svg
              className="w-full h-full min-w-[1440px] min-h-[300px]"
              viewBox="0 0 1440 300"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              preserveAspectRatio="none"
            >
              <path
                d="M-100 80 C 300 10, 600 150, 1000 60 C 1200 30, 1500 100, 1600 80"
                stroke="#c65a3a"
                strokeWidth="1.5"
                fill="none"
              />
              <path
                d="M-100 110 C 300 40, 600 180, 1000 90 C 1200 60, 1500 130, 1600 110"
                stroke="#c65a3a"
                strokeWidth="1.5"
                fill="none"
              />
              <path
                d="M-100 140 C 300 70, 600 210, 1000 120 C 1200 90, 1500 160, 1600 140"
                stroke="#c65a3a"
                strokeWidth="1.5"
                fill="none"
              />
              <path
                d="M-100 170 C 300 100, 600 240, 1000 150 C 1200 120, 1500 190, 1600 170"
                stroke="#c65a3a"
                strokeWidth="1.5"
                fill="none"
              />
              <path
                d="M-100 200 C 300 130, 600 270, 1000 180 C 1200 150, 1500 220, 1600 200"
                stroke="#c65a3a"
                strokeWidth="1.5"
                fill="none"
              />

              <path
                d="M 100 250 C 400 150, 700 290, 1100 210 C 1300 180, 1500 250, 1600 230"
                stroke="#c65a3a"
                strokeWidth="1.5"
                fill="none"
              />
              <path
                d="M 100 280 C 400 180, 700 320, 1100 240 C 1300 210, 1500 280, 1600 260"
                stroke="#c65a3a"
                strokeWidth="1.5"
                fill="none"
              />
            </svg>
          </div>

          <div className="absolute -left-32 -top-32 w-96 h-96 bg-[#c65a3a]/5 rounded-full blur-[100px] pointer-events-none" />
          <div className="absolute -right-32 -bottom-32 w-96 h-96 bg-[#f2b66d]/5 rounded-full blur-[100px] pointer-events-none" />

          <div className="mx-auto w-full max-w-6xl px-6 md:px-10 z-10 relative">
            <span className="font-mono text-xs font-bold uppercase tracking-widest text-[#c65a3a] mb-2 block">
              Danh mục bất động sản
            </span>
            <h1 className="font-display text-3xl font-bold leading-tight sm:text-4xl text-[#2b211e]">
              Tìm thuê căn hộ lý tưởng
            </h1>
            <p className="mx-auto mt-2 max-w-xl font-body text-sm text-[#7a6a61]">
              Hệ thống lọc thông minh giúp bạn chọn đúng không gian sống mong
              muốn, thông tin minh bạch, cập nhật chính xác.
            </p>
          </div>
        </section>

        {/* Search Console Container */}
        <section className="mx-auto -mt-10 max-w-5xl px-6 relative z-30">
          <div className="rounded-[24px] lg:rounded-full bg-white border border-border shadow-[0_0_0_1px_rgba(198,90,58,0.08),0_20px_50px_rgba(43,33,30,0.12)] p-2">
            <form
              onSubmit={handleSearchSubmit}
              className="grid grid-cols-1 lg:grid-cols-[1.4fr_1.1fr_1fr_1fr_auto_auto] items-center w-full gap-3 lg:gap-0"
            >
              {/* Keyword Section */}
              <div className="flex items-center gap-3 rounded-2xl lg:rounded-none lg:rounded-l-full hover:bg-[#c65a3a]/5 px-5 py-2.5 transition-all cursor-text focus-within:bg-[#c65a3a]/5 lg:border-r lg:border-[#c65a3a]/15">
                <svg
                  className="h-5 w-5 text-primary shrink-0"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth="2.5"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="m21 21-4.35-4.35m1.35-5.4a6.75 6.75 0 1 1-13.5 0 6.75 6.75 0 0 1 13.5 0Z"
                  />
                </svg>
                <div className="flex flex-col flex-1 min-w-0">
                  <span className="text-[10px] uppercase font-bold text-muted tracking-wider">
                    Từ khóa
                  </span>
                  <input
                    type="search"
                    placeholder="Nhập địa điểm, tên dự án..."
                    value={searchKeyword}
                    onChange={e => setSearchKeyword(e.target.value)}
                    className="w-full bg-transparent font-semibold text-fg placeholder-subtle focus:outline-none mt-0.5 text-xs"
                    autoComplete="off"
                  />
                </div>
              </div>

              {/* Cascade Location Section */}
              <div
                className="flex items-center gap-3 rounded-2xl lg:rounded-none hover:bg-[#c65a3a]/5 px-5 py-2.5 transition-all cursor-pointer relative group lg:border-r lg:border-[#c65a3a]/15"
                onClick={() => {
                  setIsLocationModalOpen(!isLocationModalOpen)
                  setIsPriceModalOpen(false)
                  setIsAreaOpen(false)
                }}
                onMouseLeave={() => setIsLocationModalOpen(false)}
              >
                <svg
                  className="h-5 w-5 text-primary shrink-0"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth="2.5"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
                  />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25s-7.5-4.108-7.5-11.25a7.5 7.5 0 1 1 15 0Z"
                  />
                </svg>
                <div className="flex flex-col flex-1 min-w-0 select-none">
                  <span className="text-[10px] uppercase font-bold text-muted tracking-wider">
                    Khu vực & Dự án
                  </span>
                  <span className="font-semibold text-fg text-xs mt-0.5 truncate">
                    {locationLabel}
                  </span>
                </div>
                {isLocationModalOpen && (
                  <div
                    className="absolute left-0 top-[100%] mt-2 z-50 w-80 md:w-96 rounded-2xl border border-border bg-white p-4 shadow-xl animate-in fade-in slide-in-from-top-2 duration-150 space-y-4"
                    onClick={e => e.stopPropagation()}
                  >
                    <div className="flex items-center justify-between border-b border-border pb-2">
                      <span className="font-bold text-sm text-fg">
                        Chọn khu vực & dự án
                      </span>
                      <button
                        type="button"
                        onClick={() => {
                          setSelectedCity('')
                          setSelectedDistrict('')
                          setSelectedWard('')
                          setSelectedStreet('')
                          setSelectedProject('')
                        }}
                        className="text-xs font-semibold text-primary hover:underline cursor-pointer"
                      >
                        Đặt lại
                      </button>
                    </div>

                    <div className="space-y-3 text-left">
                      {/* City */}
                      <div>
                        <label className="text-[10px] font-bold text-muted uppercase">
                          Tỉnh / Thành phố
                        </label>
                        <select
                          value={selectedCity}
                          onChange={e => {
                            setSelectedCity(e.target.value)
                            setSelectedDistrict('')
                            setSelectedWard('')
                            setSelectedStreet('')
                            setSelectedProject('')
                          }}
                          className="w-full mt-1 px-3 py-2 text-xs font-semibold rounded-xl border border-border bg-surface-muted focus:outline-none focus:border-primary cursor-pointer"
                        >
                          <option value="">Chọn Tỉnh/Thành phố</option>
                          {Object.keys(locationData).map(city => (
                            <option key={city} value={city}>
                              {city}
                            </option>
                          ))}
                        </select>
                      </div>

                      {/* District */}
                      <div>
                        <label className="text-[10px] font-bold text-muted uppercase">
                          Quận / Huyện
                        </label>
                        <select
                          value={selectedDistrict}
                          disabled={!selectedCity}
                          onChange={e => {
                            setSelectedDistrict(e.target.value)
                            setSelectedWard('')
                            setSelectedStreet('')
                            setSelectedProject('')
                          }}
                          className="w-full mt-1 px-3 py-2 text-xs font-semibold rounded-xl border border-border bg-surface-muted focus:outline-none focus:border-primary disabled:opacity-50 cursor-pointer"
                        >
                          <option value="">Chọn Quận/Huyện</option>
                          {selectedCity &&
                            locationData[selectedCity] &&
                            Object.keys(locationData[selectedCity]).map(
                              dist => (
                                <option key={dist} value={dist}>
                                  {dist}
                                </option>
                              )
                            )}
                        </select>
                      </div>

                      {/* Ward */}
                      <div>
                        <label className="text-[10px] font-bold text-muted uppercase">
                          Phường / Xã
                        </label>
                        <select
                          value={selectedWard}
                          disabled={!selectedDistrict}
                          onChange={e => {
                            setSelectedWard(e.target.value)
                          }}
                          className="w-full mt-1 px-3 py-2 text-xs font-semibold rounded-xl border border-border bg-surface-muted focus:outline-none focus:border-primary disabled:opacity-50 cursor-pointer"
                        >
                          <option value="">Chọn Phường/Xã</option>
                          {selectedCity &&
                            selectedDistrict &&
                            locationData[selectedCity]?.[selectedDistrict] &&
                            locationData[selectedCity][
                              selectedDistrict
                            ].wards.map(ward => (
                              <option key={ward} value={ward}>
                                {ward}
                              </option>
                            ))}
                        </select>
                      </div>

                      <div className="grid grid-cols-2 gap-2">
                        {/* Street */}
                        <div>
                          <label className="text-[10px] font-bold text-muted uppercase">
                            Đường / Phố
                          </label>
                          <select
                            value={selectedStreet}
                            disabled={!selectedDistrict}
                            onChange={e => {
                              setSelectedStreet(e.target.value)
                              setSelectedProject('')
                            }}
                            className="w-full mt-1 px-3 py-2 text-xs font-semibold rounded-xl border border-border bg-surface-muted focus:outline-none focus:border-primary disabled:opacity-50 cursor-pointer"
                          >
                            <option value="">Chọn Đường</option>
                            {selectedCity &&
                              selectedDistrict &&
                              locationData[selectedCity]?.[selectedDistrict] &&
                              locationData[selectedCity][
                                selectedDistrict
                              ].streets.map(street => (
                                <option key={street} value={street}>
                                  {street}
                                </option>
                              ))}
                          </select>
                        </div>

                        {/* Project */}
                        <div>
                          <label className="text-[10px] font-bold text-muted uppercase">
                            Dự án
                          </label>
                          <select
                            value={selectedProject}
                            disabled={!selectedDistrict}
                            onChange={e => {
                              setSelectedProject(e.target.value)
                              setSelectedStreet('')
                            }}
                            className="w-full mt-1 px-3 py-2 text-xs font-semibold rounded-xl border border-border bg-surface-muted focus:outline-none focus:border-primary disabled:opacity-50 cursor-pointer"
                          >
                            <option value="">Chọn Dự án</option>
                            {selectedCity &&
                              selectedDistrict &&
                              locationData[selectedCity]?.[selectedDistrict] &&
                              locationData[selectedCity][
                                selectedDistrict
                              ].projects.map(project => (
                                <option key={project} value={project}>
                                  {project}
                                </option>
                              ))}
                          </select>
                        </div>
                      </div>
                    </div>

                    <button
                      type="button"
                      onClick={() => setIsLocationModalOpen(false)}
                      className="px-4 py-2.5 text-xs font-bold text-white bg-primary hover:bg-primary-hover rounded-xl transition-colors w-full text-center cursor-pointer shadow-sm"
                    >
                      Xác nhận
                    </button>
                  </div>
                )}
              </div>

              {/* Price Range Section */}
              <div
                className="flex items-center gap-3 rounded-2xl lg:rounded-none hover:bg-[#c65a3a]/5 px-5 py-2.5 transition-all cursor-pointer relative group lg:border-r lg:border-[#c65a3a]/15"
                onClick={() => {
                  setIsPriceModalOpen(!isPriceModalOpen)
                  setIsLocationModalOpen(false)
                  setIsAreaOpen(false)
                }}
                onMouseLeave={() => setIsPriceModalOpen(false)}
              >
                <svg
                  className="h-5 w-5 text-primary shrink-0"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth="2.5"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M12 6v12m-3-2.818.879.659c1.171.879 3.07.879 4.242 0 1.172-.879 1.172-2.303 0-3.182C13.536 12.219 12.768 12 12 12c-.725 0-1.45-.22-2.003-.659-1.106-.879-1.106-2.303 0-3.182s2.9-.879 4.006 0l.415.33M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
                  />
                </svg>
                <div className="flex flex-col flex-1 min-w-0 select-none">
                  <span className="text-[10px] uppercase font-bold text-muted tracking-wider">
                    Mức giá
                  </span>
                  <span className="font-semibold text-fg text-xs mt-0.5 truncate">
                    {priceLabel}
                  </span>
                </div>
                {isPriceModalOpen && (
                  <div
                    className="absolute left-0 lg:left-auto lg:right-0 top-[100%] mt-2 z-50 w-72 rounded-2xl border border-border bg-white p-4 shadow-xl animate-in fade-in slide-in-from-top-2 duration-150 space-y-4"
                    onClick={e => e.stopPropagation()}
                  >
                    <div className="flex items-center justify-between border-b border-border pb-2">
                      <span className="font-bold text-sm text-fg">
                        Chọn khoảng giá
                      </span>
                      <button
                        type="button"
                        onClick={() => {
                          setMinPrice('')
                          setMaxPrice('')
                        }}
                        className="text-xs font-semibold text-primary hover:underline cursor-pointer"
                      >
                        Xóa
                      </button>
                    </div>

                    <div className="flex items-center gap-2">
                      <input
                        type="number"
                        placeholder="Từ (Tr)"
                        value={minPrice}
                        onChange={e =>
                          setMinPrice(
                            e.target.value !== '' ? Number(e.target.value) : ''
                          )
                        }
                        className="w-full px-3 py-2 text-xs font-semibold rounded-xl border border-border bg-surface-muted focus:outline-none focus:border-primary"
                      />
                      <span className="text-muted text-xs">→</span>
                      <input
                        type="number"
                        placeholder="Đến (Tr)"
                        value={maxPrice}
                        onChange={e =>
                          setMaxPrice(
                            e.target.value !== '' ? Number(e.target.value) : ''
                          )
                        }
                        className="w-full px-3 py-2 text-xs font-semibold rounded-xl border border-border bg-surface-muted focus:outline-none focus:border-primary"
                      />
                    </div>

                    <div className="space-y-1.5 max-h-48 overflow-y-auto pr-1 text-left">
                      {(
                        [
                          { label: 'Tất cả khoảng giá', min: '', max: '' },
                          { label: 'Dưới 3 triệu', min: '', max: 3 },
                          { label: '3 - 5 triệu', min: 3, max: 5 },
                          { label: '5 - 10 triệu', min: 5, max: 10 },
                          { label: '10 - 20 triệu', min: 10, max: 20 },
                          { label: '20 - 40 triệu', min: 20, max: 40 },
                          { label: 'Trên 40 triệu', min: 40, max: '' },
                        ] as {
                          label: string
                          min: number | ''
                          max: number | ''
                        }[]
                      ).map(preset => (
                        <button
                          key={preset.label}
                          type="button"
                          onClick={() => {
                            setMinPrice(preset.min)
                            setMaxPrice(preset.max)
                            setIsPriceModalOpen(false)
                          }}
                          className="w-full text-left text-xs px-3 py-2 rounded-xl text-fg hover:bg-surface-muted transition-colors font-semibold flex justify-between cursor-pointer"
                        >
                          <span>{preset.label}</span>
                          {minPrice === preset.min &&
                            maxPrice === preset.max && (
                              <svg
                                className="h-4 w-4 text-primary"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                                strokeWidth="2.5"
                              >
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  d="m4.5 12.75 6 6 9-13.5"
                                />
                              </svg>
                            )}
                        </button>
                      ))}
                    </div>

                    <button
                      type="button"
                      onClick={() => setIsPriceModalOpen(false)}
                      className="px-4 py-2.5 text-xs font-bold text-white bg-primary hover:bg-primary-hover rounded-xl transition-colors w-full text-center cursor-pointer shadow-sm"
                    >
                      Xác nhận
                    </button>
                  </div>
                )}
              </div>

              {/* Area Section */}
              <div
                className="flex items-center gap-3 rounded-2xl lg:rounded-none hover:bg-[#c65a3a]/5 px-5 py-2.5 transition-all cursor-pointer relative group lg:border-r lg:border-[#c65a3a]/15"
                onClick={() => {
                  setIsAreaOpen(!isAreaModalOpen)
                  setIsLocationModalOpen(false)
                  setIsPriceModalOpen(false)
                }}
                onMouseLeave={() => setIsAreaOpen(false)}
              >
                <svg
                  className="h-5 w-5 text-primary shrink-0"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth="2.5"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M3.75 3.75v16.5m0-16.5h16.5m-16.5 0v16.5m16.5-16.5v16.5m0-16.5H3.75m16.5 16.5H3.75m16.5 0V3.75"
                  />
                </svg>
                <div className="flex flex-col flex-1 min-w-0 select-none">
                  <span className="text-[10px] uppercase font-bold text-muted tracking-wider">
                    Diện tích
                  </span>
                  <span className="font-semibold text-fg text-xs mt-0.5 truncate">
                    {areaLabel}
                  </span>
                </div>
                {isAreaModalOpen && (
                  <div
                    className="absolute left-0 lg:left-auto lg:right-0 top-[100%] mt-2 z-50 w-72 rounded-2xl border border-border bg-white p-4 shadow-xl animate-in fade-in slide-in-from-top-2 duration-150 space-y-4"
                    onClick={e => e.stopPropagation()}
                  >
                    <div className="flex items-center justify-between border-b border-border pb-2">
                      <span className="font-bold text-sm text-fg">
                        Chọn diện tích
                      </span>
                      <button
                        type="button"
                        onClick={() => {
                          setMinArea('')
                          setMaxArea('')
                        }}
                        className="text-xs font-semibold text-primary hover:underline cursor-pointer"
                      >
                        Xóa
                      </button>
                    </div>

                    <div className="flex items-center gap-2">
                      <input
                        type="number"
                        placeholder="Từ (m²)"
                        value={minArea}
                        onChange={e =>
                          setMinArea(
                            e.target.value !== '' ? Number(e.target.value) : ''
                          )
                        }
                        className="w-full px-3 py-2 text-xs font-semibold rounded-xl border border-border bg-surface-muted focus:outline-none focus:border-primary"
                      />
                      <span className="text-muted text-xs">→</span>
                      <input
                        type="number"
                        placeholder="Đến (m²)"
                        value={maxArea}
                        onChange={e =>
                          setMaxArea(
                            e.target.value !== '' ? Number(e.target.value) : ''
                          )
                        }
                        className="w-full px-3 py-2 text-xs font-semibold rounded-xl border border-border bg-surface-muted focus:outline-none focus:border-primary"
                      />
                    </div>

                    <div className="space-y-1.5 max-h-48 overflow-y-auto pr-1 text-left">
                      {(
                        [
                          { label: 'Tất cả diện tích', min: '', max: '' },
                          { label: 'Dưới 30 m²', min: '', max: 30 },
                          { label: '30 - 50 m²', min: 30, max: 50 },
                          { label: '50 - 80 m²', min: 50, max: 80 },
                          { label: '80 - 100 m²', min: 80, max: 100 },
                          { label: '100 - 150 m²', min: 100, max: 150 },
                          { label: 'Trên 150 m²', min: 150, max: '' },
                        ] as {
                          label: string
                          min: number | ''
                          max: number | ''
                        }[]
                      ).map(preset => (
                        <button
                          key={preset.label}
                          type="button"
                          onClick={() => {
                            setMinArea(preset.min)
                            setMaxArea(preset.max)
                            setIsAreaOpen(false)
                          }}
                          className="w-full text-left text-xs px-3 py-2 rounded-xl text-fg hover:bg-surface-muted transition-colors font-semibold flex justify-between cursor-pointer"
                        >
                          <span>{preset.label}</span>
                          {minArea === preset.min && maxArea === preset.max && (
                            <svg
                              className="h-4 w-4 text-primary"
                              fill="none"
                              viewBox="0 0 24 24"
                              stroke="currentColor"
                              strokeWidth="2.5"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="m4.5 12.75 6 6 9-13.5"
                              />
                            </svg>
                          )}
                        </button>
                      ))}
                    </div>

                    <button
                      type="button"
                      onClick={() => setIsAreaOpen(false)}
                      className="px-4 py-2.5 text-xs font-bold text-white bg-primary hover:bg-primary-hover rounded-xl transition-colors w-full text-center cursor-pointer shadow-sm"
                    >
                      Xác nhận
                    </button>
                  </div>
                )}
              </div>

              {/* Advanced Filters Button */}
              <div className="px-3 py-1 flex justify-center">
                <button
                  type="button"
                  onClick={() => setIsAdvancedDrawerOpen(true)}
                  className={`flex items-center gap-2 px-4 py-2.5 rounded-xl border font-bold text-xs transition-all cursor-pointer ${
                    activeFiltersCount > 0
                      ? 'border-primary bg-primary-soft text-primary'
                      : 'border-border bg-white text-muted hover:bg-surface-muted'
                  }`}
                >
                  <svg
                    className="h-4 w-4"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth="2.5"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M10.5 6h9.75M10.5 6a1.5 1.5 0 1 1-3 0m3 0a1.5 1.5 0 1 0-3 0M3.75 6H7.5m3 12h9.75m-9.75 0a1.5 1.5 0 0 1-3 0m3 0a1.5 1.5 0 0 0-3 0m-3.75 0H7.5m9-6h3.75m-3.75 0a1.5 1.5 0 0 1-3 0m3 0a1.5 1.5 0 0 0-3 0m-9.75 0h9.75"
                    />
                  </svg>
                  <span>Lọc thêm</span>
                  {activeFiltersCount > 0 && (
                    <span className="bg-primary text-white text-[10px] rounded-full h-5 w-5 flex items-center justify-center font-bold">
                      {activeFiltersCount}
                    </span>
                  )}
                </button>
              </div>

              {/* Submit button */}
              <div className="px-3 py-1 flex justify-center lg:justify-end">
                <button
                  type="submit"
                  className="flex h-11 w-full lg:h-11 lg:w-11 items-center justify-center rounded-[12px] lg:rounded-full bg-[#c65a3a] text-white shadow-md hover:bg-[#9f3f2a] hover:scale-105 active:scale-95 transition-all duration-200 shrink-0 cursor-pointer"
                  aria-label="Tìm kiếm căn hộ"
                >
                  <svg
                    className="h-5 w-5 shrink-0 text-white"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth="2.5"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="m21 21-4.35-4.35m1.35-5.4a6.75 6.75 0 1 1-13.5 0 6.75 6.75 0 0 1 13.5 0Z"
                    />
                  </svg>
                </button>
              </div>
            </form>
          </div>
        </section>

        {/* Tab Switcher */}
        <section className="mx-auto max-w-lg mt-12 px-6">
          <div className="flex rounded-full bg-surface-muted p-1 border border-border">
            <button
              onClick={() => {
                setActiveTab('single')
                setSearchStatus('')
              }}
              className={`flex-1 rounded-full py-2.5 text-xs font-bold transition-all duration-300 ${
                activeTab === 'single'
                  ? 'bg-[#c65a3a] text-white shadow-md'
                  : 'text-muted hover:text-fg'
              }`}
            >
              Căn hộ thuê lẻ (Chủ nhà cá nhân)
            </button>
            <button
              onClick={() => {
                setActiveTab('project')
                setSearchStatus('')
              }}
              className={`flex-1 rounded-full py-2.5 text-xs font-bold transition-all duration-300 ${
                activeTab === 'project'
                  ? 'bg-[#c65a3a] text-white shadow-md'
                  : 'text-muted hover:text-fg'
              }`}
            >
              Dự án / Tòa nhà (Chủ đầu tư)
            </button>
          </div>
        </section>

        {/* Apartments & Projects Grid Listing Section */}
        <section className="mx-auto max-w-6xl px-6 py-12 md:px-10">
          <div className="mb-10 flex flex-col md:flex-row md:items-end md:justify-between gap-6">
            <div className="space-y-2">
              <span className="font-display text-xs font-bold uppercase tracking-widest text-[#c65a3a]">
                KẾT QUẢ TÌM KIẾM
              </span>
              <h2 className="font-marketing text-3xl font-bold text-fg sm:text-4xl">
                {activeTab === 'single'
                  ? `Căn hộ khả dụng (${filteredApartments.length})`
                  : `Dự án & Tòa nhà chung cư (${filteredProjects.length})`}
              </h2>
            </div>
            {searchStatus && (
              <p className="font-mono text-xs font-semibold text-[#c65a3a] animate-pulse-subtle bg-[#c65a3a]/10 px-3.5 py-1.5 rounded-full">
                {searchStatus}
              </p>
            )}
          </div>

          {activeTab === 'single' ? (
            filteredApartments.length === 0 ? (
              <div className="text-center py-20 rounded-3xl border border-dashed border-border bg-surface-muted/40">
                <p className="font-body text-sm text-muted">
                  Không tìm thấy căn hộ phù hợp với bộ lọc hiện tại.
                </p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {filteredApartments.map(apt => (
                  <article
                    key={apt.id}
                    className="flex flex-col justify-between rounded-2xl border border-border bg-white p-5 shadow-sm hover:translate-y-[-4px] hover:border-border-strong hover:shadow-md transition-all duration-300"
                  >
                    <div>
                      {/* Visual Card Top */}
                      <div className="relative mb-4 flex h-36 flex-col justify-between rounded-xl border border-border bg-surface-muted p-4">
                        {/* Grid background simulation */}
                        <div
                          className="absolute inset-0 opacity-15"
                          style={{
                            backgroundImage:
                              'radial-gradient(circle at 50% 50%, #c65a3a 1.5px, transparent 0)',
                            backgroundSize: '10px 10px',
                          }}
                        />
                        <div className="relative z-10 flex items-center justify-between">
                          <span
                            className={`rounded-full px-2.5 py-0.5 text-[10px] font-bold ${
                              apt.tag === 'empty'
                                ? 'bg-success-soft text-success'
                                : apt.tag === 'pending'
                                  ? 'bg-accent-soft text-primary'
                                  : 'bg-info-soft text-info'
                            }`}
                          >
                            {apt.tagText}
                          </span>
                          <span className="font-mono text-[9px] font-bold text-muted uppercase">
                            {apt.id.split('-').pop()}
                          </span>
                        </div>
                        <span className="relative z-10 font-mono text-[10px] font-bold text-muted uppercase">
                          {apt.category}
                        </span>
                      </div>

                      <h3 className="font-marketing text-lg font-bold text-fg line-clamp-1">
                        {apt.title}
                      </h3>
                      <div className="mt-1 flex items-baseline">
                        <span className="text-base font-extrabold text-primary">
                          {apt.price}
                        </span>
                      </div>
                      <p className="mt-2.5 font-body text-xs text-muted leading-relaxed line-clamp-2 min-h-[36px]">
                        {apt.description}
                      </p>

                      {/* Specs & Location section */}
                      <div className="mt-4 pt-4 border-t border-border/60 space-y-3">
                        {/* Location */}
                        <div className="flex items-center gap-1.5 text-xs font-medium text-muted">
                          <svg
                            className="h-3.5 w-3.5 text-subtle shrink-0"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                            strokeWidth="2.5"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              d="M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
                            />
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1 1 15 0Z"
                            />
                          </svg>
                          <span className="truncate">{apt.location}</span>
                        </div>

                        {/* Specs grid */}
                        <div className="flex items-center gap-3 text-xs font-semibold text-fg/80">
                          <span className="flex items-center gap-1">
                            <svg
                              className="h-3.5 w-3.5 text-muted shrink-0"
                              fill="none"
                              viewBox="0 0 24 24"
                              stroke="currentColor"
                              strokeWidth="2.5"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M3.75 3.75v16.5m0-16.5h16.5m-16.5 0v16.5m16.5-16.5v16.5m0-16.5H3.75m16.5 16.5H3.75m16.5 0V3.75"
                              />
                            </svg>
                            <span>{apt.area}</span>
                          </span>
                          <span className="h-3 w-px bg-border-strong/40" />
                          <span className="flex items-center gap-1">
                            <svg
                              className="h-3.5 w-3.5 text-muted shrink-0"
                              fill="none"
                              viewBox="0 0 24 24"
                              stroke="currentColor"
                              strokeWidth="2.5"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M20.25 14.15v-2.625c0-1.036-.84-1.875-1.875-1.875H5.625c-1.036 0-1.875.84-1.875 1.875v2.625M3 16.25V5.625C3 4.59 3.84 3.75 4.875 3.75H9.75c1.036 0 1.875.84 1.875 1.875v2.25m3 0V5.625c0-1.036.84-1.875 1.875-1.875h4.875c1.036 0 1.875.84 1.875 1.875V16.25M3 16.25h18M3 16.25v2.25m18-2.25v2.25"
                              />
                            </svg>
                            <span>{apt.rooms}</span>
                          </span>
                        </div>
                      </div>
                    </div>

                    <div className="mt-5 flex gap-3">
                      <Link
                        href={`/properties/${apt.id}` as Route}
                        className="flex-1"
                      >
                        <Button
                          variant="primary"
                          className="w-full rounded-xl py-2.5 text-xs font-bold transition-all"
                        >
                          Xem chi tiết
                        </Button>
                      </Link>
                      <Link href={'/contact' as Route} className="flex-1">
                        <Button
                          variant="secondary"
                          className="w-full rounded-xl py-2.5 text-xs font-bold transition-all"
                        >
                          Tư vấn
                        </Button>
                      </Link>
                    </div>
                  </article>
                ))}
              </div>
            )
          ) : filteredProjects.length === 0 ? (
            <div className="text-center py-20 rounded-3xl border border-dashed border-border bg-surface-muted/40">
              <p className="font-body text-sm text-muted">
                Không tìm thấy dự án phù hợp với bộ lọc hiện tại.
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {filteredProjects.map(proj => (
                <article
                  key={proj.id}
                  className="flex flex-col justify-between rounded-2xl border border-border bg-white p-6 shadow-sm hover:translate-y-[-4px] hover:border-border-strong hover:shadow-md transition-all duration-300"
                >
                  <div>
                    {/* Visual Card Top */}
                    <div className="relative mb-5 flex h-40 flex-col justify-between rounded-xl border border-border bg-gradient-to-br from-[#c65a3a]/10 to-[#f2b66d]/10 p-5">
                      {/* Grid background simulation */}
                      <div
                        className="absolute inset-0 opacity-10"
                        style={{
                          backgroundImage:
                            'radial-gradient(circle at 50% 50%, #c65a3a 1.5px, transparent 0)',
                          backgroundSize: '10px 10px',
                        }}
                      />
                      <div className="relative z-10 flex items-center justify-between">
                        <span className="rounded-full bg-primary/15 text-primary px-3 py-0.5 text-[10px] font-bold">
                          {proj.tagText}
                        </span>
                        <span className="font-mono text-[9px] font-bold text-muted uppercase tracking-wider">
                          DỰ ÁN TÒA NHÀ
                        </span>
                      </div>
                      <span className="relative z-10 font-mono text-[10px] font-bold text-[#c65a3a] uppercase">
                        Chủ đầu tư: {proj.developer}
                      </span>
                    </div>

                    <h3 className="font-marketing text-xl font-bold text-fg">
                      {proj.title}
                    </h3>
                    <p className="mt-1 font-body text-xs text-muted">
                      {proj.location}
                    </p>
                    <p className="mt-3 font-body text-xs text-fg/80 leading-relaxed">
                      {proj.description}
                    </p>

                    <div className="mt-5 flex items-center justify-between border-t border-border pt-4 text-xs font-semibold text-[#7a6a61]">
                      <span>Quy mô dự án</span>
                      <span className="font-mono text-fg font-bold">
                        {proj.scale}
                      </span>
                    </div>
                  </div>

                  <div className="mt-6 flex items-center justify-between">
                    <div className="flex flex-col">
                      <span className="text-[9px] font-bold text-muted uppercase tracking-wider">
                        Khoảng giá thuê dự kiến
                      </span>
                      <span className="font-mono text-base font-extrabold text-primary">
                        {proj.priceRange}
                      </span>
                    </div>

                    <Link href={`/projects/${proj.id}` as Route}>
                      <Button
                        variant="secondary"
                        className="rounded-xl px-5 py-2.5 text-xs font-bold transition-all"
                      >
                        Chi tiết dự án
                      </Button>
                    </Link>
                  </div>
                </article>
              ))}
            </div>
          )}
        </section>
      </main>

      {/* Page Footer */}
      <Footer />

      {/* Advanced Drawer Overlay Backdrop */}
      {isAdvancedDrawerOpen && (
        <div
          className="fixed inset-0 z-[99] bg-[#2b211e]/40 backdrop-blur-sm transition-opacity duration-300"
          onClick={() => setIsAdvancedDrawerOpen(false)}
        />
      )}

      {/* Advanced Drawer Panel */}
      <div
        className={`fixed inset-y-0 right-0 z-[100] w-full max-w-md bg-white border-l border-border shadow-2xl flex flex-col justify-between transform transition-transform duration-300 ease-in-out ${
          isAdvancedDrawerOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        {/* Header */}
        <div className="p-4 border-b border-border flex items-center justify-between bg-surface-muted">
          <div className="flex items-center gap-2">
            <svg
              className="h-5 w-5 text-primary"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth="2.5"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M10.5 6h9.75M10.5 6a1.5 1.5 0 1 1-3 0m3 0a1.5 1.5 0 1 0-3 0M3.75 6H7.5m3 12h9.75m-9.75 0a1.5 1.5 0 0 1-3 0m3 0a1.5 1.5 0 0 0-3 0m-3.75 0H7.5m9-6h3.75m-3.75 0a1.5 1.5 0 0 1-3 0m3 0a1.5 1.5 0 0 0-3 0m-9.75 0h9.75"
              />
            </svg>
            <span className="font-display font-bold text-base text-fg">
              Bộ lọc nâng cao
            </span>
          </div>
          <button
            type="button"
            onClick={() => setIsAdvancedDrawerOpen(false)}
            className="p-1 rounded-full text-muted hover:bg-border/40 hover:text-fg transition-colors cursor-pointer"
          >
            <svg
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth="2.5"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M6 18 18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>

        {/* Content (Scrollable body) */}
        <div className="flex-1 overflow-y-auto p-5 space-y-6 scrollbar text-left">
          {/* Property Type */}
          <div className="space-y-3">
            <h3 className="text-xs font-bold uppercase tracking-wider text-primary">
              Loại bất động sản
            </h3>
            <div className="flex flex-wrap gap-2">
              {[
                'Tất cả',
                'Căn hộ chung cư',
                'Chung cư mini, căn hộ dịch vụ',
                'Nhà riêng',
                'Nhà biệt thự, liền kề',
              ].map(type => (
                <button
                  key={type}
                  type="button"
                  onClick={() => setSelectedType(type)}
                  className={`px-3 py-2 text-xs font-bold rounded-xl border transition-all cursor-pointer ${
                    selectedType === type
                      ? 'bg-primary text-white border-primary shadow-sm'
                      : 'bg-white text-fg border-border hover:bg-surface-muted'
                  }`}
                >
                  {type === 'Tất cả' ? 'Tất cả loại hình' : type}
                </button>
              ))}
            </div>
          </div>

          {/* Rooms configuration */}
          <div className="space-y-3 border-t border-border/60 pt-5">
            <h3 className="text-xs font-bold uppercase tracking-wider text-primary">
              Cơ cấu phòng ngủ & WC
            </h3>

            {/* Bedrooms */}
            <div>
              <label className="text-xs font-bold text-muted block mb-1.5">
                Số phòng ngủ
              </label>
              <div className="flex gap-1.5">
                {['all', 1, 2, 3, 4].map(val => (
                  <button
                    key={val}
                    type="button"
                    onClick={() => setBedroomsFilter(val as number | 'all')}
                    className={`flex-1 py-2 text-xs font-bold rounded-xl border transition-all cursor-pointer ${
                      bedroomsFilter === val
                        ? 'bg-primary text-white border-primary shadow-sm'
                        : 'bg-white text-fg border-border hover:bg-surface-muted'
                    }`}
                  >
                    {val === 'all'
                      ? 'Tất cả'
                      : val === 4
                        ? '4+ PN'
                        : `${val} PN`}
                  </button>
                ))}
              </div>
            </div>

            {/* Bathrooms */}
            <div>
              <label className="text-xs font-bold text-muted block mb-1.5">
                Số phòng tắm, vệ sinh
              </label>
              <div className="flex gap-1.5">
                {['all', 1, 2, 3, 4].map(val => (
                  <button
                    key={val}
                    type="button"
                    onClick={() => setBathroomsFilter(val as number | 'all')}
                    className={`flex-1 py-2 text-xs font-bold rounded-xl border transition-all cursor-pointer ${
                      bathroomsFilter === val
                        ? 'bg-primary text-white border-primary shadow-sm'
                        : 'bg-white text-fg border-border hover:bg-surface-muted'
                    }`}
                  >
                    {val === 'all'
                      ? 'Tất cả'
                      : val === 4
                        ? '4+ WC'
                        : `${val} WC`}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Orientations */}
          <div className="space-y-3 border-t border-border/60 pt-5">
            <h3 className="text-xs font-bold uppercase tracking-wider text-primary">
              Hướng nhà & ban công
            </h3>
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="text-xs font-bold text-muted block mb-1.5">
                  Hướng nhà chính
                </label>
                <select
                  value={directionFilter}
                  onChange={e => setDirectionFilter(e.target.value)}
                  className="w-full px-3 py-2 text-xs font-semibold rounded-xl border border-border bg-white focus:outline-none focus:border-primary cursor-pointer"
                >
                  <option value="all">Tất cả hướng</option>
                  {[
                    'Đông',
                    'Tây',
                    'Nam',
                    'Bắc',
                    'Đông Bắc',
                    'Đông Nam',
                    'Tây Bắc',
                    'Tây Nam',
                  ].map(dir => (
                    <option key={dir} value={dir}>
                      {dir}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label className="text-xs font-bold text-muted block mb-1.5">
                  Hướng ban công
                </label>
                <select
                  value={balconyDirectionFilter}
                  onChange={e => setBalconyDirectionFilter(e.target.value)}
                  className="w-full px-3 py-2 text-xs font-semibold rounded-xl border border-border bg-white focus:outline-none focus:border-primary cursor-pointer"
                >
                  <option value="all">Tất cả hướng</option>
                  {[
                    'Đông',
                    'Tây',
                    'Nam',
                    'Bắc',
                    'Đông Bắc',
                    'Đông Nam',
                    'Tây Bắc',
                    'Tây Nam',
                  ].map(dir => (
                    <option key={dir} value={dir}>
                      {dir}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>

          {/* Furniture & Timing */}
          <div className="space-y-3 border-t border-border/60 pt-5">
            <h3 className="text-xs font-bold uppercase tracking-wider text-primary">
              Nội thất & Bàn giao
            </h3>
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="text-xs font-bold text-muted block mb-1.5">
                  Nội thất
                </label>
                <select
                  value={furnitureFilter}
                  onChange={e => setFurnitureFilter(e.target.value)}
                  className="w-full px-3 py-2 text-xs font-semibold rounded-xl border border-border bg-white focus:outline-none focus:border-primary cursor-pointer"
                >
                  <option value="all">Tất cả trạng thái</option>
                  {['Đầy đủ', 'Cơ bản', 'Không nội thất', 'Cao cấp'].map(f => (
                    <option key={f} value={f}>
                      {f}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label className="text-xs font-bold text-muted block mb-1.5">
                  Thời gian nhận nhà
                </label>
                <select
                  value={moveInTimeFilter}
                  onChange={e => setMoveInTimeFilter(e.target.value)}
                  className="w-full px-3 py-2 text-xs font-semibold rounded-xl border border-border bg-white focus:outline-none focus:border-primary cursor-pointer"
                >
                  <option value="all">Linh hoạt</option>
                  {[
                    'Ngay lập tức',
                    'Trong tháng này',
                    'Tháng sau',
                    'Linh hoạt',
                  ].map(t => (
                    <option key={t} value={t}>
                      {t}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>

          {/* Living Costs (Utility profiles) */}
          <div className="space-y-3 border-t border-border/60 pt-5">
            <h3 className="text-xs font-bold uppercase tracking-wider text-primary">
              Biểu phí sinh hoạt
            </h3>
            <div className="space-y-2.5">
              <div className="flex items-center justify-between gap-3 text-xs">
                <span className="font-semibold text-muted">Mức giá điện</span>
                <select
                  value={electricityPriceFilter}
                  onChange={e => setElectricityPriceFilter(e.target.value)}
                  className="px-2 py-1.5 font-bold rounded-lg border border-border bg-white focus:outline-none focus:border-primary cursor-pointer"
                >
                  <option value="all">Tất cả</option>
                  {['Giá nhà nước', 'Giá kinh doanh', 'Tự thỏa thuận'].map(
                    t => (
                      <option key={t} value={t}>
                        {t}
                      </option>
                    )
                  )}
                </select>
              </div>
              <div className="flex items-center justify-between gap-3 text-xs">
                <span className="font-semibold text-muted">Mức giá nước</span>
                <select
                  value={waterPriceFilter}
                  onChange={e => setWaterPriceFilter(e.target.value)}
                  className="px-2 py-1.5 font-bold rounded-lg border border-border bg-white focus:outline-none focus:border-primary cursor-pointer"
                >
                  <option value="all">Tất cả</option>
                  {['Giá nhà nước', 'Giá kinh doanh', 'Tự thỏa thuận'].map(
                    t => (
                      <option key={t} value={t}>
                        {t}
                      </option>
                    )
                  )}
                </select>
              </div>
              <div className="flex items-center justify-between gap-3 text-xs">
                <span className="font-semibold text-muted">
                  Giá thuê Internet
                </span>
                <select
                  value={internetPriceFilter}
                  onChange={e => setInternetPriceFilter(e.target.value)}
                  className="px-2 py-1.5 font-bold rounded-lg border border-border bg-white focus:outline-none focus:border-primary cursor-pointer"
                >
                  <option value="all">Tất cả</option>
                  {['Miễn phí', 'Cố định', 'Tự lắp'].map(t => (
                    <option key={t} value={t}>
                      {t}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>

          {/* Verification and Media */}
          <div className="space-y-3 border-t border-border/60 pt-5">
            <h3 className="text-xs font-bold uppercase tracking-wider text-primary">
              Thông tin kiểm duyệt
            </h3>
            <div className="space-y-2.5">
              <label className="flex items-center justify-between cursor-pointer">
                <span className="text-xs font-bold text-muted">
                  Chỉ hiển thị Tin xác thực
                </span>
                <div className="relative">
                  <input
                    type="checkbox"
                    checked={isVerifiedOnly}
                    onChange={e => setIsVerifiedOnly(e.target.checked)}
                    className="sr-only peer"
                  />
                  <div className="w-9 h-5 bg-border rounded-full peer peer-focus:ring-2 peer-focus:ring-primary/20 peer-checked:after:translate-x-full after:content-[''] after:absolute after:top-0.5 after:left-[2px] after:bg-white after:border-border after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-primary" />
                </div>
              </label>

              <label className="flex items-center justify-between cursor-pointer">
                <span className="text-xs font-bold text-muted">
                  Tin có hình ảnh / video
                </span>
                <div className="relative">
                  <input
                    type="checkbox"
                    checked={hasMediaOnly}
                    onChange={e => setHasMediaOnly(e.target.checked)}
                    className="sr-only peer"
                  />
                  <div className="w-9 h-5 bg-border rounded-full peer peer-focus:ring-2 peer-focus:ring-primary/20 peer-checked:after:translate-x-full after:content-[''] after:absolute after:top-0.5 after:left-[2px] after:bg-white after:border-border after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-primary" />
                </div>
              </label>
            </div>
          </div>

          {/* Amenities checkboxes */}
          <div className="space-y-3 border-t border-border/60 pt-5">
            <h3 className="text-xs font-bold uppercase tracking-wider text-primary">
              Tiện ích căn hộ & dự án
            </h3>
            <div className="grid grid-cols-2 gap-2">
              {[
                { key: 'pool', label: 'Hồ bơi' },
                { key: 'gym', label: 'Phòng gym' },
                { key: 'parking', label: 'Bãi đỗ xe' },
                { key: 'elevator', label: 'Thang máy' },
                { key: 'security', label: 'Bảo vệ 24/7' },
                { key: 'pets', label: 'Cho nuôi thú cưng' },
                { key: 'park', label: 'Công viên nội khu' },
              ].map(amenity => {
                const isSelected = selectedAmenities.includes(amenity.key)
                return (
                  <button
                    key={amenity.key}
                    type="button"
                    onClick={() => {
                      if (isSelected) {
                        setSelectedAmenities(
                          selectedAmenities.filter(a => a !== amenity.key)
                        )
                      } else {
                        setSelectedAmenities([
                          ...selectedAmenities,
                          amenity.key,
                        ])
                      }
                    }}
                    className={`flex items-center justify-between p-2.5 rounded-xl border text-left text-xs font-semibold transition-all cursor-pointer ${
                      isSelected
                        ? 'border-primary bg-primary-soft text-primary font-bold'
                        : 'border-border bg-white text-muted hover:bg-surface-muted'
                    }`}
                  >
                    <span>{amenity.label}</span>
                    {isSelected && (
                      <svg
                        className="h-3.5 w-3.5 text-primary"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth="3"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="m4.5 12.75 6 6 9-13.5"
                        />
                      </svg>
                    )}
                  </button>
                )
              })}
            </div>
          </div>
        </div>

        {/* Footer actions */}
        <div className="p-4 border-t border-border bg-surface-muted flex gap-3">
          <button
            type="button"
            onClick={resetFilters}
            className="flex-1 py-3 border border-border rounded-xl font-bold text-xs text-[#7a6a61] bg-white hover:bg-border/20 transition-all active:scale-98 cursor-pointer"
          >
            Đặt lại bộ lọc
          </button>
          <button
            type="button"
            onClick={() => setIsAdvancedDrawerOpen(false)}
            className="flex-1 py-3 bg-[#c65a3a] text-white rounded-xl font-bold text-xs hover:bg-[#9f3f2a] transition-all active:scale-98 shadow-md cursor-pointer"
          >
            Áp dụng ({filteredApartments.length + filteredProjects.length})
          </button>
        </div>
      </div>
    </div>
  )
}
