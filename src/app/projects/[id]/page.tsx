'use client'

import * as React from 'react'
import Link from 'next/link'
import type { Route } from 'next'
import { useParams } from 'next/navigation'
import { HomeHeader } from '@/widgets/home-dashboard/ui/home-header'
import { Footer } from '@/shared/ui/footer'
import { Button } from '@/shared/ui/button'

// Mock Projects Data with richer fields for premium UI
const mockProjects = {
  'proj-1': {
    id: 'proj-1',
    title: 'Vinhomes Central Park',
    developer: 'Vingroup',
    location: 'Bình Thạnh, TP.HCM',
    scale: '18 blocks • 10,000+ căn hộ',
    priceRange: '15 - 45 triệu/tháng',
    tagText: 'Đang vận hành',
    description:
      'Khu đô thị hiện đại bậc nhất bên sông Sài Gòn lấy cảm hứng từ công viên Central Park New York rộng lớn, sở hữu tòa tháp Landmark 81 kiêu hãnh.',
    features: [
      { label: 'Pháp lý', value: 'Sổ hồng sở hữu lâu dài' },
      { label: 'Bàn giao', value: 'Nội thất cơ bản cao cấp' },
      { label: 'Mật độ xây dựng', value: '16%' },
    ],
    amenities: [
      'Công viên ven sông 14ha',
      'Hồ bơi ngoài trời',
      'Landmark 81 Skyview',
      'Bệnh viện Vinmec',
      'Trường học Vinschool',
      'Bến du thuyền 5 sao',
    ],
    units: [
      {
        id: 'vin-101',
        name: '#VCP-P1-101',
        type: '1 PN',
        bedrooms: 1,
        area: '54 m²',
        price: '15 triệu/tháng',
        floor: 'Tầng 10',
        block: 'Park 1',
        view: 'Hướng Sông Sài Gòn',
      },
      {
        id: 'vin-102',
        name: '#VCP-P2-203',
        type: '2 PN',
        bedrooms: 2,
        area: '78 m²',
        price: '20 triệu/tháng',
        floor: 'Tầng 15',
        block: 'Park 2',
        view: 'Nội khu công viên',
      },
      {
        id: 'vin-103',
        name: '#VCP-L3-305',
        type: '3 PN',
        bedrooms: 3,
        area: '110 m²',
        price: '32 triệu/tháng',
        floor: 'Tầng 30',
        block: 'Landmark 3',
        view: 'Landmark 81 & Sông',
      },
      {
        id: 'vin-104',
        name: '#VCP-L81-4508',
        type: '4 PN',
        bedrooms: 4,
        area: '160 m²',
        price: '45 triệu/tháng',
        floor: 'Tầng 45',
        block: 'Landmark 81',
        view: 'Toàn cảnh thành phố',
      },
    ],
  },
  'proj-2': {
    id: 'proj-2',
    title: 'Masteri Thảo Điền',
    developer: 'Masterise Homes',
    location: 'Thảo Điền, Quận 2, TP.HCM',
    scale: '5 blocks • 3,000+ căn hộ',
    priceRange: '18 - 35 triệu/tháng',
    tagText: 'Sắp bàn giao',
    description:
      'Dự án căn hộ cao cấp sở hữu vị trí đẳng cấp ngay trung tâm Thảo Điền, kết nối trực tiếp ga Metro số 7 An Phú mang lại giá trị gia tăng vượt trội.',
    features: [
      { label: 'Pháp lý', value: 'Sổ hồng từng căn' },
      { label: 'Bàn giao', value: 'Hoàn thiện cao cấp' },
      { label: 'Mật độ xây dựng', value: '34%' },
    ],
    amenities: [
      'Trung tâm thương mại Vincom Mega Mall',
      'Hồ bơi cảnh quan',
      'Khu BBQ ngoài trời',
      'Sân tennis & bóng rổ',
      'Phòng Gym hiện đại',
      'Lối đi bộ xanh',
    ],
    units: [
      {
        id: 'mas-201',
        name: '#MAS-T1-1205',
        type: '1 PN',
        bedrooms: 1,
        area: '50 m²',
        price: '18 triệu/tháng',
        floor: 'Tầng 12',
        block: 'Tòa T1',
        view: 'Xa lộ Hà Nội',
      },
      {
        id: 'mas-202',
        name: '#MAS-T3-1802',
        type: '2 PN',
        bedrooms: 2,
        area: '72 w²',
        price: '24 triệu/tháng',
        floor: 'Tầng 18',
        block: 'Tòa T3',
        view: 'Biệt thự Thảo Điền',
      },
      {
        id: 'mas-203',
        name: '#MAS-T5-2808',
        type: '3 PN',
        bedrooms: 3,
        area: '96 m²',
        price: '35 triệu/tháng',
        floor: 'Tầng 28',
        block: 'Tòa T5',
        view: 'Sông Sài Gòn',
      },
    ],
  },
  'proj-3': {
    id: 'proj-3',
    title: 'Empire City Thủ Thiêm',
    developer: 'Keppel Land',
    location: 'Thủ Thiêm, Quận 2, TP.HCM',
    scale: '11 blocks • Phân khu Linden',
    priceRange: '25 - 60 triệu/tháng',
    tagText: 'Đang bàn giao',
    description:
      'Khu phức hợp căn hộ hạng sang vị trí kim cương tại bán đảo Thủ Thiêm. Tầm nhìn vĩnh cửu ôm trọn dòng sông Sài Gòn hướng về trung tâm Quận 1.',
    features: [
      { label: 'Pháp lý', value: 'Sở hữu lâu dài (VN)' },
      { label: 'Bàn giao', value: 'Nội thất nhập khẩu Châu Âu' },
      { label: 'Mật độ xây dựng', value: '22%' },
    ],
    amenities: [
      'Tháp quan sát Empire 88 tầng',
      'Hồ bơi nước ấm 50m',
      'Rạp chiếu phim ngoài trời',
      'Khu vui chơi trẻ em',
      'Đường chạy bộ ven sông',
      'Sảnh Lounge sang trọng',
    ],
    units: [
      {
        id: 'emp-301',
        name: '#EMP-LD-0504',
        type: '2 PN',
        bedrooms: 2,
        area: '93 m²',
        price: '30 triệu/tháng',
        floor: 'Tầng 5',
        block: 'Linden Residences',
        view: 'Hồ bơi & Nội khu',
      },
      {
        id: 'emp-302',
        name: '#EMP-TL-1208',
        type: '3 PN',
        bedrooms: 3,
        area: '127 m²',
        price: '42 triệu/tháng',
        floor: 'Tầng 12',
        block: 'Tilia Residences',
        view: 'Sông Sài Gòn & Q.1',
      },
      {
        id: 'emp-303',
        name: '#EMP-Cove-2001',
        type: '4 PN',
        bedrooms: 4,
        area: '212 m²',
        price: '60 triệu/tháng',
        floor: 'Tầng 20',
        block: 'Cove Residences',
        view: 'Trực diện sông Q.1',
      },
    ],
  },
  'proj-4': {
    id: 'proj-4',
    title: 'Sunrise City',
    developer: 'Novaland',
    location: 'Quận 7, TP.HCM',
    scale: '12 blocks • 2,200 căn hộ',
    priceRange: '12 - 30 triệu/tháng',
    tagText: 'Đang vận hành',
    description:
      'Tổ hợp căn hộ cao cấp và thương mại dịch vụ ngay cửa ngõ Nam Sài Gòn, đối diện siêu thị Lotte Mart Quận 7 sầm uất.',
    features: [
      { label: 'Pháp lý', value: 'Sổ hồng sẵn sàng' },
      { label: 'Bàn giao', value: 'Nội thất đầy đủ' },
      { label: 'Mật độ xây dựng', value: '40%' },
    ],
    amenities: [
      'Hồ bơi tràn bờ bờ Tây',
      'Đường đi bộ nội khu',
      'Phòng Gym chuẩn quốc tế',
      'Khu BBQ',
      'Trung tâm thương mại tài chính',
      'Hệ thống an ninh 3 lớp',
    ],
    units: [
      {
        id: 'sun-401',
        name: '#SUN-S1-0812',
        type: '1 PN',
        bedrooms: 1,
        area: '56 m²',
        price: '12 triệu/tháng',
        floor: 'Tầng 8',
        block: 'South Towers',
        view: 'Khu Him Lam',
      },
      {
        id: 'sun-402',
        name: '#SUN-C2-1504',
        type: '2 PN',
        bedrooms: 2,
        area: '76 m²',
        price: '16 triệu/tháng',
        floor: 'Tầng 15',
        block: 'Central Towers',
        view: 'Hồ bơi nội khu',
      },
      {
        id: 'sun-403',
        name: '#SUN-N3-2201',
        type: '3 PN',
        bedrooms: 3,
        area: '99 m²',
        price: '22 triệu/tháng',
        floor: 'Tầng 22',
        block: 'North Towers',
        view: 'Trung tâm Quận 1',
      },
    ],
  },
}

export default function ProjectDetailPage(): React.ReactElement {
  const params = useParams()
  const projectId = (params?.id as string) || 'proj-1'
  const project =
    mockProjects[projectId as keyof typeof mockProjects] ||
    mockProjects['proj-1']

  const [selectedUnits, setSelectedUnits] = React.useState<string[]>([])
  const [bedroomFilter, setBedroomFilter] = React.useState<number | null>(null)
  const [isSubmitting, setIsSubmitting] = React.useState(false)
  const [showSuccessToast, setShowSuccessToast] = React.useState(false)

  // Filter units purely in memory (preventing layout re-calculations or lag)
  const displayedUnits = React.useMemo(() => {
    if (bedroomFilter === null) return project.units
    return project.units.filter(u => u.bedrooms === bedroomFilter)
  }, [project.units, bedroomFilter])

  // Toggle selection for a single unit
  const handleToggleSelect = (unitId: string) => {
    setSelectedUnits(prev =>
      prev.includes(unitId)
        ? prev.filter(id => id !== unitId)
        : [...prev, unitId]
    )
  }

  // Toggle selection for all filtered units
  const handleToggleSelectAll = () => {
    const displayedIds = displayedUnits.map(u => u.id)
    const allSelected = displayedIds.every(id => selectedUnits.includes(id))
    if (allSelected) {
      setSelectedUnits(prev => prev.filter(id => !displayedIds.includes(id)))
    } else {
      setSelectedUnits(prev => Array.from(new Set([...prev, ...displayedIds])))
    }
  }

  // Handle Bulk Request Submission
  const handleBulkRequest = () => {
    setIsSubmitting(true)
    setTimeout(() => {
      setIsSubmitting(false)
      setShowSuccessToast(true)
      setSelectedUnits([])
      setTimeout(() => setShowSuccessToast(false), 4000)
    }, 1200)
  }

  const selectedNames = project.units
    .filter(u => selectedUnits.includes(u.id))
    .map(u => u.name)
    .join(', ')

  return (
    <div className="min-h-screen bg-bg text-fg selection:bg-primary/20 selection:text-primary relative pb-28">
      <HomeHeader />

      <main className="w-full">
        {/* Premium Banner Hero Section (Warm Cream Design with Topography Overlay) */}
        <section className="relative overflow-hidden bg-gradient-to-b from-[#f5ece2] via-[#faf6f1] to-bg pb-24 pt-36 rounded-b-[40px] border-b border-border">
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
              className="w-full h-full min-w-[1440px] min-h-[400px]"
              viewBox="0 0 1440 400"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              preserveAspectRatio="none"
            >
              <path
                d="M-100 100 C 300 20, 600 180, 1000 80 C 1200 40, 1500 120, 1600 100"
                stroke="#c65a3a"
                strokeWidth="1.5"
                fill="none"
              />
              <path
                d="M-100 130 C 300 50, 600 210, 1000 110 C 1200 70, 1500 150, 1600 130"
                stroke="#c65a3a"
                strokeWidth="1.5"
                fill="none"
              />
              <path
                d="M-100 160 C 300 80, 600 240, 1000 140 C 1200 100, 1500 180, 1600 160"
                stroke="#c65a3a"
                strokeWidth="1.5"
                fill="none"
              />
              <path
                d="M-100 190 C 300 110, 600 270, 1000 170 C 1200 130, 1500 210, 1600 190"
                stroke="#c65a3a"
                strokeWidth="1.5"
                fill="none"
              />
              <path
                d="M-100 220 C 300 140, 600 300, 1000 200 C 1200 160, 1500 240, 1600 220"
                stroke="#c65a3a"
                strokeWidth="1.5"
                fill="none"
              />
              <path
                d="M-100 250 C 300 170, 600 330, 1000 230 C 1200 190, 1500 270, 1600 250"
                stroke="#c65a3a"
                strokeWidth="1.5"
                fill="none"
              />

              <path
                d="M 100 350 C 400 220, 700 380, 1100 280 C 1300 240, 1500 320, 1600 300"
                stroke="#c65a3a"
                strokeWidth="1.5"
                fill="none"
              />
              <path
                d="M 100 380 C 400 250, 700 410, 1100 310 C 1300 270, 1500 350, 1600 330"
                stroke="#c65a3a"
                strokeWidth="1.5"
                fill="none"
              />
            </svg>
          </div>

          <div className="absolute -left-32 -top-32 w-96 h-96 bg-[#c65a3a]/5 rounded-full blur-[100px] pointer-events-none" />
          <div className="absolute -right-32 -bottom-32 w-96 h-96 bg-[#f2b66d]/5 rounded-full blur-[100px] pointer-events-none" />

          <div className="mx-auto w-full max-w-6xl px-6 md:px-10 z-10 relative">
            {/* Back Button */}
            <div className="mb-6">
              <Link href={'/properties?tab=project' as Route}>
                <span className="text-xs font-bold text-primary hover:underline flex items-center gap-1.5 cursor-pointer w-fit">
                  &larr; Quay lại danh sách dự án
                </span>
              </Link>
            </div>

            <div className="flex flex-wrap items-center gap-3 mb-5">
              <span className="font-mono text-[10px] font-extrabold uppercase tracking-widest text-primary bg-primary/10 border border-primary/20 px-3.5 py-1 rounded-full backdrop-blur-sm">
                {project.tagText}
              </span>
              <span className="font-mono text-xs font-bold text-[#7a6a61]">
                Chủ đầu tư:{' '}
                <span className="text-fg font-extrabold">
                  {project.developer}
                </span>
              </span>
            </div>

            <h1 className="font-display text-4xl font-extrabold leading-tight text-[#2b211e] md:text-6xl tracking-tight max-w-4xl">
              {project.title}
            </h1>

            <p className="mt-4 font-body text-sm md:text-base text-[#7a6a61] max-w-3xl leading-relaxed">
              {project.description}
            </p>

            {/* Project Specs Bento Widgets */}
            <div className="mt-10 grid grid-cols-1 sm:grid-cols-3 gap-5 max-w-4xl border-t border-border/80 pt-8">
              {project.features.map((feat, idx) => (
                <div
                  key={idx}
                  className="bg-white/60 border border-border/80 p-4 rounded-2xl shadow-sm hover:border-[#c65a3a]/25 transition-all duration-300"
                >
                  <span className="text-[10px] uppercase font-bold text-muted tracking-wider block">
                    {feat.label}
                  </span>
                  <p className="font-body text-sm font-bold text-[#2b211e] mt-1">
                    {feat.value}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Bento Grid & Details section */}
        <section className="mx-auto max-w-6xl px-6 py-12 md:px-10 grid grid-cols-1 lg:grid-cols-[2fr_1fr] gap-8">
          <div className="space-y-6">
            <div className="bg-white border border-border rounded-3xl p-6 md:p-8 shadow-sm">
              <h3 className="font-marketing text-lg font-bold text-fg mb-4 flex items-center gap-2">
                <span className="h-2 w-2 rounded-full bg-[#c65a3a]" />
                Mô tả quy hoạch & Vị trí
              </h3>
              <p className="font-body text-sm text-[#7a6a61] leading-relaxed">
                Tọa lạc tại khu vực có liên kết vùng hoàn hảo, dự án không chỉ
                cung cấp không gian sống thời thượng mà còn thừa hưởng trọn vẹn
                toàn bộ hệ sinh thái tiện ích đẳng cấp. Với mật độ xanh bao phủ
                lớn, cư dân tại đây sẽ được trải nghiệm một phong cách sống nghỉ
                dưỡng sinh thái ngay lòng đô thị.
              </p>
              <div className="mt-6 grid grid-cols-2 gap-4">
                <div className="border border-border rounded-2xl p-4 bg-surface-muted/30">
                  <span className="text-[10px] font-bold text-muted uppercase tracking-wider">
                    Vị trí kết nối
                  </span>
                  <p className="font-body text-xs font-semibold text-fg mt-1">
                    {project.location}
                  </p>
                </div>
                <div className="border border-border rounded-2xl p-4 bg-surface-muted/30">
                  <span className="text-[10px] font-bold text-muted uppercase tracking-wider">
                    Quy mô xây dựng
                  </span>
                  <p className="font-body text-xs font-semibold text-fg mt-1">
                    {project.scale}
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white border border-border rounded-3xl p-6 shadow-sm h-fit">
            <h3 className="font-marketing text-base font-bold text-fg mb-4 flex items-center gap-2">
              <span className="h-2 w-2 rounded-full bg-[#f2b66d]" />
              Tiện ích cao cấp
            </h3>
            <ul className="grid grid-cols-1 gap-3">
              {project.amenities.map((item, idx) => (
                <li
                  key={idx}
                  className="flex items-center gap-2.5 text-xs font-semibold text-[#7a6a61] bg-surface-muted/40 px-3.5 py-2.5 rounded-xl border border-border/30 hover:border-[#c65a3a]/20 transition-all"
                >
                  <svg
                    className="h-4 w-4 text-[#c65a3a] shrink-0"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth="2.5"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* Available Units Selection Section */}
        <section className="mx-auto max-w-6xl px-6 py-8 md:px-10">
          <div className="border-t border-border pt-12 mb-8 flex flex-col md:flex-row md:items-end md:justify-between gap-6">
            <div className="space-y-2">
              <span className="font-display text-xs font-bold uppercase tracking-widest text-[#c65a3a]">
                DANH SÁCH CĂN HỘ TRỐNG
              </span>
              <h2 className="font-marketing text-2xl font-bold text-fg sm:text-3xl">
                Cơ cấu căn hộ khả dụng ({project.units.length})
              </h2>
              <p className="font-body text-xs text-muted">
                Tích chọn nhanh các căn hộ bạn quan tâm để đăng ký tư vấn sỉ
                hoặc lên lịch kiểm tra phòng trống.
              </p>
            </div>

            {/* Memory-efficient inline tab filters to prevent drop frames */}
            <div className="flex flex-wrap items-center gap-1.5 bg-surface-muted p-1 rounded-full border border-border/60">
              <button
                onClick={() => setBedroomFilter(null)}
                className={`rounded-full px-3.5 py-1.5 text-xs font-bold transition-all ${
                  bedroomFilter === null
                    ? 'bg-white text-fg shadow-sm'
                    : 'text-muted hover:text-fg'
                }`}
              >
                Tất cả
              </button>
              {[1, 2, 3, 4].map(num => {
                const count = project.units.filter(
                  u => u.bedrooms === num
                ).length
                if (count === 0) return null
                return (
                  <button
                    key={num}
                    onClick={() => setBedroomFilter(num)}
                    className={`rounded-full px-3.5 py-1.5 text-xs font-bold transition-all ${
                      bedroomFilter === num
                        ? 'bg-white text-fg shadow-sm'
                        : 'text-muted hover:text-fg'
                    }`}
                  >
                    {num} PN ({count})
                  </button>
                )
              })}
            </div>
          </div>

          {/* Table Container with GPU accelerated shadow/border layout */}
          <div className="overflow-x-auto rounded-2xl border border-border bg-white shadow-sm transition-shadow duration-300 hover:shadow-md">
            <table className="w-full border-collapse text-left text-sm">
              <thead>
                <tr className="border-b border-border bg-surface-muted/50 text-xs font-bold text-[#7a6a61] uppercase tracking-wider select-none">
                  <th className="p-4 w-12 text-center">
                    <input
                      type="checkbox"
                      checked={
                        displayedUnits.length > 0 &&
                        displayedUnits.every(u => selectedUnits.includes(u.id))
                      }
                      onChange={handleToggleSelectAll}
                      className="h-4.5 w-4.5 rounded border-border text-primary focus:ring-primary/20 cursor-pointer"
                    />
                  </th>
                  <th className="p-4">Mã căn</th>
                  <th className="p-4">Vị trí block</th>
                  <th className="p-4">Loại phòng</th>
                  <th className="p-4">Diện tích</th>
                  <th className="p-4">Tầm nhìn (View)</th>
                  <th className="p-4">Giá thuê</th>
                  <th className="p-4">Trạng thái</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border/60 font-body">
                {displayedUnits.map(unit => {
                  const isSelected = selectedUnits.includes(unit.id)
                  return (
                    <tr
                      key={unit.id}
                      className={`hover:bg-[#c65a3a]/5 transition-all duration-150 cursor-pointer ${
                        isSelected
                          ? 'bg-[#c65a3a]/5 border-l-2 border-[#c65a3a]'
                          : ''
                      }`}
                      onClick={() => handleToggleSelect(unit.id)}
                    >
                      <td
                        className="p-4 text-center"
                        onClick={e => e.stopPropagation()}
                      >
                        <input
                          type="checkbox"
                          checked={isSelected}
                          onChange={() => handleToggleSelect(unit.id)}
                          className="h-4.5 w-4.5 rounded border-border text-primary focus:ring-primary/20 cursor-pointer"
                        />
                      </td>
                      <td className="p-4 font-mono font-bold text-fg">
                        {unit.name}
                      </td>
                      <td className="p-4 text-muted text-xs">
                        {unit.block} • {unit.floor}
                      </td>
                      <td className="p-4 text-fg text-xs font-semibold">
                        {unit.type}
                      </td>
                      <td className="p-4 font-mono text-xs">{unit.area}</td>
                      <td className="p-4 text-[#7a6a61] text-xs font-medium">
                        {unit.view}
                      </td>
                      <td className="p-4 font-mono font-bold text-primary text-xs">
                        {unit.price}
                      </td>
                      <td className="p-4">
                        <span className="inline-flex items-center gap-1 rounded-full bg-success-soft px-2.5 py-0.5 text-[10px] font-bold text-success">
                          <span className="h-1.5 w-1.5 rounded-full bg-success animate-pulse" />
                          Phòng trống
                        </span>
                      </td>
                    </tr>
                  )
                })}
              </tbody>
            </table>
          </div>
        </section>
      </main>

      {/* Floating Action Bar with hardware acceleration & glassmorphism styling */}
      <div
        className={`fixed bottom-6 left-1/2 -translate-x-1/2 z-[100] w-full max-w-4xl px-4 transition-all duration-500 ease-out transform will-change-[transform,opacity] ${
          selectedUnits.length > 0
            ? 'translate-y-0 opacity-100'
            : 'translate-y-12 opacity-0 pointer-events-none'
        }`}
      >
        <div className="rounded-2xl border border-white/20 bg-white/90 shadow-[0_20px_50px_rgba(43,33,30,0.18)] p-4 flex flex-col md:flex-row md:items-center justify-between gap-4 backdrop-blur-md">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#c65a3a]/15 text-[#c65a3a]">
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
                  d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01"
                />
              </svg>
            </div>
            <div className="min-w-0">
              <span className="text-[9px] text-muted font-bold uppercase tracking-wider block">
                Yêu cầu tham quan dự án
              </span>
              <p className="font-body text-xs font-bold text-fg truncate">
                Đã chọn{' '}
                <span className="text-primary font-extrabold">
                  {selectedUnits.length}
                </span>{' '}
                căn hộ: {selectedNames}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2 shrink-0">
            <button
              onClick={() => setSelectedUnits([])}
              className="px-4 py-2.5 text-xs font-bold text-muted hover:text-fg transition-colors"
            >
              Hủy chọn
            </button>
            <Button
              loading={isSubmitting}
              onClick={handleBulkRequest}
              className="rounded-xl px-5 py-2.5 text-xs font-bold shadow-lg shadow-primary/15"
            >
              Đặt lịch xem sỉ ({selectedUnits.length} căn)
            </Button>
          </div>
        </div>
      </div>

      {/* Success Notification Toast */}
      <div
        className={`fixed top-24 right-6 z-[100] max-w-md transition-all duration-300 transform will-change-[transform,opacity] ${
          showSuccessToast
            ? 'translate-y-0 opacity-100'
            : '-translate-y-4 opacity-0 pointer-events-none'
        }`}
      >
        <div className="rounded-2xl border border-success-strong bg-success-soft/20 backdrop-blur-md p-4 shadow-lg flex gap-3">
          <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-success text-white">
            <svg
              className="h-4 w-4"
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
          </div>
          <div>
            <h4 className="font-marketing text-sm font-bold text-success-strong">
              Gửi lịch xem phòng thành công!
            </h4>
            <p className="font-body text-xs text-[#7a6a61] mt-0.5 leading-relaxed">
              Hệ thống đã tự động lên lịch xem phòng cho các căn đã chọn. Chuyên
              viên tư vấn dự án sẽ liên hệ lại với bạn trong vòng 15 phút.
            </p>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  )
}
