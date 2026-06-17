'use client'

import * as React from 'react'
import { useParams } from 'next/navigation'
import { HomeHeader } from '@/widgets/home-dashboard/ui/home-header'
import { Footer } from '@/shared/ui/footer'
import { Button } from '@/shared/ui/button'
import { mockProjects, type ProjectItem } from '@/entities/properties'
import { ProjectDetailHero } from './components/project-detail-hero'

export function ProjectDetail(): React.ReactElement {
  const params = useParams()
  const projectId = (params?.id as string) || 'proj-1'

  // Fetch target project from unified mock dataset
  const project = React.useMemo(() => {
    return (mockProjects.find(p => p.id === projectId) ||
      mockProjects[0]) as Required<ProjectItem>
  }, [projectId])

  const [selectedUnits, setSelectedUnits] = React.useState<string[]>([])
  const [bedroomFilter, setBedroomFilter] = React.useState<number | null>(null)
  const [isSubmitting, setIsSubmitting] = React.useState(false)
  const [showSuccessToast, setShowSuccessToast] = React.useState(false)

  // Filter units dynamically in memory
  const displayedUnits = React.useMemo(() => {
    if (!project.units) return []
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

  const selectedNames = React.useMemo(() => {
    if (!project.units) return ''
    return project.units
      .filter(u => selectedUnits.includes(u.id))
      .map(u => u.name)
      .join(', ')
  }, [project.units, selectedUnits])

  return (
    <div className="min-h-screen bg-bg text-fg selection:bg-primary/20 selection:text-primary relative">
      <HomeHeader />

      <main className="w-full">
        {/* Premium Banner Hero Section (Warm Cream Design with Topography Overlay) */}
        <ProjectDetailHero project={project} />

        {/* Bento Grid & Details section */}
        <section className="mx-auto max-w-6xl px-6 py-12 md:px-10 grid grid-cols-1 lg:grid-cols-[2fr_1fr] gap-8">
          <div className="space-y-6">
            <div className="bg-white border border-border rounded-3xl p-6 md:p-8 shadow-sm">
              <h3 className="font-marketing text-lg font-bold text-fg mb-4 flex items-center gap-2">
                <span className="h-2 w-2 rounded-full bg-primary" />
                Mô tả quy hoạch & Vị trí
              </h3>
              <p className="font-body text-sm text-muted leading-relaxed">
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
              <span className="h-2 w-2 rounded-full bg-accent animate-pulse-subtle" />
              Tiện ích cao cấp
            </h3>
            <ul className="grid grid-cols-1 gap-3">
              {project.amenities.map((item, idx) => (
                <li
                  key={idx}
                  className="flex items-center gap-2.5 text-xs font-semibold text-muted bg-surface-muted/40 px-3.5 py-2.5 rounded-xl border border-border/30 hover:border-primary/20 transition-all"
                >
                  <svg
                    className="h-4 w-4 text-primary shrink-0"
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
        {project.units && project.units.length > 0 && (
          <section className="mx-auto max-w-6xl px-6 py-8 md:px-10">
            <div className="border-t border-border pt-12 mb-8 flex flex-col md:flex-row md:items-end md:justify-between gap-6">
              <div className="space-y-2 text-left">
                <span className="font-display text-xs font-bold uppercase tracking-widest text-primary">
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

              {/* Memory-efficient inline tab filters */}
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
                  const count = project.units?.filter(
                    u => u.bedrooms === num
                  ).length
                  if (!count || count === 0) return null
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

            {/* Table Container */}
            <div className="overflow-x-auto rounded-2xl border border-border bg-white shadow-sm transition-shadow duration-300 hover:shadow-md">
              <table className="w-full border-collapse text-left text-sm">
                <thead>
                  <tr className="border-b border-border bg-surface-muted/50 text-xs font-bold text-muted uppercase tracking-wider select-none">
                    <th className="p-4 w-12 text-center">
                      <input
                        type="checkbox"
                        checked={
                          displayedUnits.length > 0 &&
                          displayedUnits.every(u =>
                            selectedUnits.includes(u.id)
                          )
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
                        className={`hover:bg-primary/5 transition-all duration-150 cursor-pointer ${
                          isSelected
                            ? 'bg-primary/5 border-l-2 border-primary'
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
                        <td className="p-4 text-muted text-xs font-medium">
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
        )}
      </main>

      {/* Floating Action Bar */}
      <div
        className={`fixed bottom-6 left-1/2 -translate-x-1/2 z-[100] w-full max-w-4xl px-4 transition-all duration-500 ease-out transform will-change-[transform,opacity] ${
          selectedUnits.length > 0
            ? 'translate-y-0 opacity-100'
            : 'translate-y-12 opacity-0 pointer-events-none'
        }`}
      >
        <div className="rounded-2xl border border-white/20 bg-white/90 shadow-[0_20px_50px_rgba(43,33,30,0.18)] p-4 flex flex-col md:flex-row md:items-center justify-between gap-4 backdrop-blur-md">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-primary/15 text-primary">
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
            <div className="min-w-0 text-left">
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
          <div className="text-left">
            <h4 className="font-marketing text-sm font-bold text-success-strong">
              Gửi lịch xem phòng thành công!
            </h4>
            <p className="font-body text-xs text-muted mt-0.5 leading-relaxed">
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
