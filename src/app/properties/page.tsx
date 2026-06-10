'use client'

import * as React from 'react'
import Link from 'next/link'
import type { Route } from 'next'
import { HomeHeader } from '@/widgets/home-dashboard/ui/home-header'
import { Button } from '@/shared/ui/button'

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
      statusText = `Đang lọc danh sách căn hộ theo "${trimmed}"...`
    }
    setSearchStatus(statusText)
  }

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
        {/* Header Hero Section */}
        <section className="relative flex flex-col items-center justify-center bg-gradient-to-b from-[#f4eee7]/60 to-[#faf7f2] pb-24 pt-32 text-center rounded-b-[40px] border-b border-border">
          <div className="mx-auto w-full max-w-6xl px-6 md:px-10 z-10">
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

        {/* Apartments Grid Listing Section */}
        <section className="mx-auto max-w-6xl px-6 py-16 md:px-10">
          <div className="mb-10 flex flex-col md:flex-row md:items-end md:justify-between gap-6">
            <div className="space-y-2">
              <span className="font-display text-xs font-bold uppercase tracking-widest text-[#c65a3a]">
                KẾT QUẢ TÌM KIẾM
              </span>
              <h2 className="font-marketing text-3xl font-bold text-fg sm:text-4xl">
                Căn hộ khả dụng ({filteredApartments.length})
              </h2>
            </div>
            {searchStatus && (
              <p className="font-mono text-xs font-semibold text-[#c65a3a] animate-pulse-subtle bg-[#c65a3a]/10 px-3.5 py-1.5 rounded-full">
                {searchStatus}
              </p>
            )}
          </div>

          {filteredApartments.length === 0 ? (
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
          )}
        </section>
      </main>

      {/* Page Footer */}
      <footer className="border-t border-border bg-surface py-10">
        <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-6 px-6 sm:flex-row md:px-10">
          <div className="flex flex-col items-center gap-1 sm:items-start">
            <span className="font-display text-sm font-bold text-fg">
              © TH-PropTech · 2026
            </span>
            <span className="font-body text-[11px] text-muted">
              Khóa luận tốt nghiệp ngành KTPM · Đại học HUTECH
            </span>
          </div>
          <span className="text-center font-mono text-[11px] text-muted sm:text-right">
            Tư vấn thuê căn hộ · Trạng thái giao dịch · Bằng chứng Blockchain
          </span>
        </div>
      </footer>
    </div>
  )
}
