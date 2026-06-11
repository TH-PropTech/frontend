'use client'

import * as React from 'react'
import Link from 'next/link'
import type { Route } from 'next'
import { useSearchParams } from 'next/navigation'
import { HomeHeader } from '@/widgets/home-dashboard/ui/home-header'
import { Button } from '@/shared/ui/button'
import { Footer } from '@/shared/ui/footer'

interface ApartmentItem {
  id: string
  title: string
  category: string
  tag: 'empty' | 'pending' | 'unavailable'
  tagText: string
  description: string
  location: string
  price: string
  area: string
  rooms: string
}

interface ProjectItem {
  id: string
  title: string
  developer: string
  location: string
  scale: string
  priceRange: string
  tagText: string
  tag: 'open' | 'handover'
  description: string
}

const mockProjects: ProjectItem[] = [
  {
    id: 'proj-1',
    title: 'Vinhomes Central Park',
    developer: 'Vingroup',
    location: 'Bình Thạnh, TP.HCM',
    scale: '18 blocks • 10,000+ căn hộ',
    priceRange: '15 - 45 triệu/tháng',
    tagText: 'Đang vận hành',
    tag: 'handover',
    description:
      'Khu đô thị hiện đại bậc nhất bên sông Sài Gòn với công viên 14ha và tháp Landmark 81 cao nhất Việt Nam.',
  },
  {
    id: 'proj-2',
    title: 'Masteri Thảo Điền',
    developer: 'Masterise Homes',
    location: 'Thảo Điền, Quận 2, TP.HCM',
    scale: '5 blocks • 3,000+ căn hộ',
    priceRange: '18 - 35 triệu/tháng',
    tagText: 'Sắp bàn giao block mới',
    tag: 'open',
    description:
      'Dự án căn hộ cao cấp kết nối trực tiếp ga Metro số 7 An Phú, đầy đủ tiện ích ngoại khu sang trọng.',
  },
  {
    id: 'proj-3',
    title: 'Empire City Thủ Thiêm',
    developer: 'Keppel Land',
    location: 'Thủ Thiêm, Quận 2, TP.HCM',
    scale: '11 blocks • Phân khu Linden',
    priceRange: '25 - 60 triệu/tháng',
    tagText: 'Đang bàn giao',
    tag: 'handover',
    description:
      'Khu phức hợp căn hộ hạng sang vị trí vàng Thủ Thiêm nhìn thẳng sang trung tâm Quận 1 qua sông Sài Gòn.',
  },
  {
    id: 'proj-4',
    title: 'Sunrise City',
    developer: 'Novaland',
    location: 'Quận 7, TP.HCM',
    scale: '12 blocks • 2,200 căn hộ',
    priceRange: '12 - 30 triệu/tháng',
    tagText: 'Đang vận hành',
    tag: 'handover',
    description:
      'Dự án căn hộ trung cao cấp trục đường Nguyễn Hữu Thọ đối diện Lotte Mart Quận 7, giao thông thuận tiện.',
  },
]

const mockApartments: ApartmentItem[] = [
  {
    id: 'PROP-CAR-101',
    title: 'Căn hộ cao tầng',
    category: 'Căn hộ đô thị',
    tag: 'empty',
    tagText: 'Trống',
    description:
      'Phù hợp khách thuê cần vị trí thuận tiện, tiện ích nội khu và quy trình đặt lịch xem rõ trạng thái.',
    location: 'Bình Thạnh, TP.HCM',
    price: '12 triệu / tháng',
    area: '54 m²',
    rooms: '1 PN, 1 WC',
  },
  {
    id: 'PROP-CAR-102',
    title: 'Nhà phố thương mại',
    category: 'Nhà phố thương mại',
    tag: 'pending',
    tagText: 'Đang chờ cọc',
    description:
      'Dành cho nhu cầu kết hợp ở và kinh doanh, cần tư vấn kỹ về dòng tiền, pháp lý và khả năng vận hành.',
    location: 'Quận 2, TP.HCM',
    price: '45 triệu / tháng',
    area: '120 m²',
    rooms: '3 lầu, 4 PN',
  },
  {
    id: 'PROP-CAR-103',
    title: 'Đô thị nghỉ dưỡng',
    category: 'Biệt thự nghỉ dưỡng',
    tag: 'unavailable',
    tagText: 'Đang cập nhật',
    description:
      'Phù hợp khách hàng ưu tiên không gian sống xanh, lịch khai thác dài hạn và quản lý tài sản từ xa.',
    location: 'Nhơn Trạch, Đồng Nai',
    price: '28 triệu / tháng',
    area: '250 m²',
    rooms: 'Villa sân vườn',
  },
]

export default function PropertiesPage(): React.ReactElement {
  const searchParams = useSearchParams()
  const tabParam = searchParams?.get('tab')
  const [activeTab, setActiveTab] = React.useState<'single' | 'project'>(
    tabParam === 'project' ? 'project' : 'single'
  )
  const [searchKeyword, setSearchKeyword] = React.useState('')
  const [searchStatus, setSearchStatus] = React.useState('')
  const [selectedArea, setSelectedArea] = React.useState('Toàn quốc')
  const [selectedType, setSelectedType] = React.useState('Tất cả')
  const [selectedPrice, setSelectedPrice] = React.useState('Tất cả')

  // Dropdown states
  const [isAreaOpen, setIsAreaOpen] = React.useState(false)
  const [isTypeOpen, setIsTypeOpen] = React.useState(false)
  const [isPriceOpen, setIsPriceOpen] = React.useState(false)

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

    if (selectedArea !== 'Toàn quốc') {
      if (
        selectedArea === 'Bình Thạnh' &&
        !proj.location.includes('Bình Thạnh')
      )
        return false
      if (selectedArea === 'Quận 2' && !proj.location.includes('Quận 2'))
        return false
      if (selectedArea === 'Đồng Nai' && !proj.location.includes('Đồng Nai'))
        return false
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

    // Area match
    if (selectedArea !== 'Toàn quốc') {
      if (selectedArea === 'Bình Thạnh' && !apt.location.includes('Bình Thạnh'))
        return false
      if (selectedArea === 'Quận 2' && !apt.location.includes('Quận 2'))
        return false
      if (selectedArea === 'Đồng Nai' && !apt.location.includes('Đồng Nai'))
        return false
    }

    // Type match
    if (selectedType !== 'Tất cả') {
      if (selectedType === 'Căn hộ' && !apt.category.includes('Căn hộ'))
        return false
      if (selectedType === 'Nhà phố' && !apt.category.includes('Nhà phố'))
        return false
      if (selectedType === 'Biệt thự' && !apt.category.includes('Biệt thự'))
        return false
    }

    return true
  })

  return (
    <div className="min-h-screen bg-bg text-fg selection:bg-primary/20 selection:text-primary">
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
              Tìm kiếm căn hộ lý tưởng
            </h1>
            <p className="mx-auto mt-2 max-w-xl font-body text-sm text-[#7a6a61]">
              Hệ thống lọc thông minh giúp bạn chọn đúng không gian sống mong
              muốn, minh bạch thông tin giao dịch.
            </p>
          </div>
        </section>

        {/* Search Console Container */}
        <section className="mx-auto -mt-10 max-w-5xl px-6 relative z-30">
          <div className="rounded-[24px] md:rounded-full bg-white border border-border shadow-[0_0_0_1px_rgba(198,90,58,0.08),0_20px_50px_rgba(43,33,30,0.12)] p-2">
            <form
              onSubmit={handleSearchSubmit}
              className="grid grid-cols-1 md:grid-cols-[1.4fr_1fr_1.1fr_1fr_auto] items-center w-full gap-3 md:gap-0"
            >
              {/* Keyword Section */}
              <div className="flex items-center gap-3 rounded-2xl md:rounded-none md:rounded-l-full hover:bg-[#c65a3a]/5 px-5 py-2.5 transition-all cursor-text focus-within:bg-[#c65a3a]/5 md:border-r md:border-[#c65a3a]/15">
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
                    placeholder="Tìm căn hộ của bạn..."
                    value={searchKeyword}
                    onChange={e => setSearchKeyword(e.target.value)}
                    className="w-full bg-transparent font-semibold text-fg placeholder-subtle focus:outline-none mt-0.5 text-sm"
                    autoComplete="off"
                  />
                </div>
              </div>

              {/* Area Section */}
              <div
                className="flex items-center gap-3 rounded-2xl md:rounded-none hover:bg-[#c65a3a]/5 px-5 py-2.5 transition-all cursor-pointer relative group md:border-r md:border-[#c65a3a]/15"
                onClick={() => setIsAreaOpen(!isAreaOpen)}
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
                    Khu vực
                  </span>
                  <span className="font-semibold text-fg text-sm mt-0.5 truncate">
                    {selectedArea}
                  </span>
                </div>
                {isAreaOpen && (
                  <div className="absolute left-0 top-[100%] mt-2 z-50 w-48 rounded-2xl border border-border bg-white p-2 shadow-xl animate-in fade-in slide-in-from-top-2 duration-150">
                    <button
                      type="button"
                      onClick={() => setSelectedArea('Toàn quốc')}
                      className="w-full rounded-xl px-4 py-2.5 text-left text-xs font-bold text-fg hover:bg-surface-muted transition-colors"
                    >
                      Toàn quốc
                    </button>
                    <button
                      type="button"
                      onClick={() => setSelectedArea('Bình Thạnh')}
                      className="w-full rounded-xl px-4 py-2.5 text-left text-xs font-bold text-fg hover:bg-surface-muted transition-colors"
                    >
                      Bình Thạnh
                    </button>
                    <button
                      type="button"
                      onClick={() => setSelectedArea('Quận 2')}
                      className="w-full rounded-xl px-4 py-2.5 text-left text-xs font-bold text-fg hover:bg-surface-muted transition-colors"
                    >
                      Quận 2
                    </button>
                    <button
                      type="button"
                      onClick={() => setSelectedArea('Đồng Nai')}
                      className="w-full rounded-xl px-4 py-2.5 text-left text-xs font-bold text-fg hover:bg-surface-muted transition-colors"
                    >
                      Đồng Nai
                    </button>
                  </div>
                )}
              </div>

              {/* Room Type Section */}
              <div
                className="flex items-center gap-3 rounded-2xl md:rounded-none hover:bg-[#c65a3a]/5 px-5 py-2.5 transition-all cursor-pointer relative group md:border-r md:border-[#c65a3a]/15"
                onClick={() => setIsTypeOpen(!isTypeOpen)}
                onMouseLeave={() => setIsTypeOpen(false)}
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
                    d="m2.25 12 8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25"
                  />
                </svg>
                <div className="flex flex-col flex-1 min-w-0 select-none">
                  <span className="text-[10px] uppercase font-bold text-muted tracking-wider">
                    Loại phòng
                  </span>
                  <span className="font-semibold text-fg text-sm mt-0.5 truncate">
                    {selectedType}
                  </span>
                </div>
                {isTypeOpen && (
                  <div className="absolute left-0 top-[100%] mt-2 z-50 w-48 rounded-2xl border border-border bg-white p-2 shadow-xl animate-in fade-in slide-in-from-top-2 duration-150">
                    <button
                      type="button"
                      onClick={() => setSelectedType('Tất cả')}
                      className="w-full rounded-xl px-4 py-2.5 text-left text-xs font-bold text-fg hover:bg-surface-muted transition-colors"
                    >
                      Tất cả
                    </button>
                    <button
                      type="button"
                      onClick={() => setSelectedType('Căn hộ')}
                      className="w-full rounded-xl px-4 py-2.5 text-left text-xs font-bold text-fg hover:bg-surface-muted transition-colors"
                    >
                      Căn hộ đô thị
                    </button>
                    <button
                      type="button"
                      onClick={() => setSelectedType('Nhà phố')}
                      className="w-full rounded-xl px-4 py-2.5 text-left text-xs font-bold text-fg hover:bg-surface-muted transition-colors"
                    >
                      Nhà phố thương mại
                    </button>
                    <button
                      type="button"
                      onClick={() => setSelectedType('Biệt thự')}
                      className="w-full rounded-xl px-4 py-2.5 text-left text-xs font-bold text-fg hover:bg-surface-muted transition-colors"
                    >
                      Biệt thự nghỉ dưỡng
                    </button>
                  </div>
                )}
              </div>

              {/* Price Section */}
              <div
                className="flex items-center gap-3 rounded-2xl md:rounded-none hover:bg-[#c65a3a]/5 px-5 py-2.5 transition-all cursor-pointer relative group md:border-r md:border-[#c65a3a]/15"
                onClick={() => setIsPriceOpen(!isPriceOpen)}
                onMouseLeave={() => setIsPriceOpen(false)}
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
                  <span className="font-semibold text-fg text-sm mt-0.5 truncate">
                    {selectedPrice}
                  </span>
                </div>
                {isPriceOpen && (
                  <div className="absolute right-0 top-[100%] mt-2 z-50 w-48 rounded-2xl border border-border bg-white p-2 shadow-xl animate-in fade-in slide-in-from-top-2 duration-150">
                    <button
                      type="button"
                      onClick={() => setSelectedPrice('Tất cả')}
                      className="w-full rounded-xl px-4 py-2.5 text-left text-xs font-bold text-fg hover:bg-surface-muted transition-colors"
                    >
                      Tất cả
                    </button>
                    <button
                      type="button"
                      onClick={() => setSelectedPrice('Dưới 15 triệu')}
                      className="w-full rounded-xl px-4 py-2.5 text-left text-xs font-bold text-fg hover:bg-surface-muted transition-colors"
                    >
                      Dưới 15 triệu
                    </button>
                    <button
                      type="button"
                      onClick={() => setSelectedPrice('Trên 15 triệu')}
                      className="w-full rounded-xl px-4 py-2.5 text-left text-xs font-bold text-fg hover:bg-surface-muted transition-colors"
                    >
                      Trên 15 triệu
                    </button>
                  </div>
                )}
              </div>

              {/* Submit button */}
              <div className="px-3 py-1 flex justify-center md:justify-end">
                <button
                  type="submit"
                  className="flex h-12 w-full md:h-12 md:w-12 items-center justify-center rounded-[14px] md:rounded-full bg-[#c65a3a] text-white shadow-md hover:bg-[#9f3f2a] hover:scale-105 active:scale-95 transition-all duration-200 shrink-0 cursor-pointer"
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

                      <h3 className="font-marketing text-lg font-bold text-fg">
                        {apt.title}
                      </h3>
                      <p className="mt-2 font-body text-xs text-muted leading-relaxed min-h-[50px]">
                        {apt.description}
                      </p>

                      {/* Metadata specs */}
                      <ul className="mt-4 border-t border-border/60 divide-y divide-border/60 text-xs font-semibold">
                        <li className="flex justify-between py-2.5">
                          <span className="text-muted">Vị trí</span>
                          <span className="text-fg">{apt.location}</span>
                        </li>
                        <li className="flex justify-between py-2.5">
                          <span className="text-muted">Giá thuê</span>
                          <span className="text-primary font-bold">
                            {apt.price}
                          </span>
                        </li>
                        <li className="flex justify-between py-2.5">
                          <span className="text-muted">Thông số</span>
                          <span className="font-mono text-[11px] text-fg">
                            {apt.area} ({apt.rooms})
                          </span>
                        </li>
                      </ul>
                    </div>

                    <Link href={'/contact' as Route} className="w-full mt-5">
                      <Button
                        variant="secondary"
                        className="w-full rounded-xl py-2.5 text-xs font-bold transition-all"
                      >
                        Tư vấn căn hộ này
                      </Button>
                    </Link>
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
    </div>
  )
}
