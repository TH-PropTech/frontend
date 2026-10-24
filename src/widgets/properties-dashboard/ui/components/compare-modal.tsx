'use client'

import * as React from 'react'
import { createPortal } from 'react-dom'
import { ApartmentItem } from '@/entities/properties'
import {
  Scale,
  X,
  Info,
  Crown,
  Waves,
  Dumbbell,
  Car,
  ArrowUpDown,
  ShieldCheck,
  Cat,
  Trees,
} from 'lucide-react'
import { getColor, buildCriteria } from './compare-config'
import { CompareCharts } from './compare-charts'

export interface CompareModalProps {
  show: boolean
  onClose: () => void
  compareApartments: ApartmentItem[]
}

export function CompareModal({
  show,
  onClose,
  compareApartments,
}: CompareModalProps): React.ReactElement | null {
  const [compareTab, setCompareTab] = React.useState<'matrix' | 'charts'>(
    'matrix'
  )
  const [mounted, setMounted] = React.useState(false)

  React.useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setMounted(true)
    return () => setMounted(false)
  }, [])

  const getUnitPrice = React.useCallback((apt: ApartmentItem) => {
    return (apt.priceNum * 1000000) / (apt.areaNum || 1)
  }, [])

  const criteria = React.useMemo(() => {
    return buildCriteria(compareApartments, getUnitPrice)
  }, [compareApartments, getUnitPrice])

  if (!mounted || !show) return null

  return createPortal(
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[9999] flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl w-full max-w-5xl p-6 md:p-8 max-h-[90vh] overflow-y-auto space-y-6 shadow-2xl animate-in fade-in zoom-in-95 duration-200 border border-border flex flex-col justify-between">
        {/* Modal Header */}
        <div className="flex items-start justify-between border-b border-border pb-4">
          <div className="space-y-1">
            <h3 className="font-marketing text-xl font-bold text-fg flex items-center gap-2">
              <Scale className="h-5 w-5 text-primary" />
              Dashboard So Sánh Căn Hộ Thông Minh
            </h3>
            <p className="font-body text-xs text-muted max-w-2xl">
              Đối chiếu chi tiết 12 thông số thuộc tính và phân tích dữ liệu
              trực quan bằng biểu đồ kèm khuyến nghị chuyên sâu tự động.
            </p>
          </div>
          <button
            onClick={onClose}
            className="h-9 w-9 rounded-full border border-border flex items-center justify-center text-muted hover:text-fg hover:bg-surface-muted transition-all duration-200 hover:rotate-90 cursor-pointer"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        {/* Tab Controller */}
        <div className="flex bg-slate-100 dark:bg-surface-muted p-1 rounded-xl w-fit border border-border">
          <button
            onClick={() => setCompareTab('matrix')}
            className={`px-4 py-2 text-xs font-bold rounded-lg transition-all cursor-pointer ${
              compareTab === 'matrix'
                ? 'bg-white dark:bg-surface shadow-sm text-primary'
                : 'text-muted hover:text-fg'
            }`}
          >
            Bảng đối chiếu thông số
          </button>
          <button
            onClick={() => setCompareTab('charts')}
            className={`px-4 py-2 text-xs font-bold rounded-lg transition-all cursor-pointer ${
              compareTab === 'charts'
                ? 'bg-white dark:bg-surface shadow-sm text-primary'
                : 'text-muted hover:text-fg'
            }`}
          >
            Phân tích trực quan & Khuyến nghị
          </button>
        </div>

        {/* Tab content 1: Matrix Table */}
        {compareTab === 'matrix' && (
          <div className="overflow-x-auto -mx-2 px-2 scrollbar-thin scrollbar-thumb-border scrollbar-track-transparent">
            <table className="w-full text-left border-collapse text-xs">
              <thead>
                <tr className="border-b border-border">
                  <th className="p-4 text-muted uppercase tracking-wider font-semibold min-w-[180px] font-display bg-white sticky left-0 z-20 border-r border-border">
                    Đặc tính so sánh
                  </th>
                  {compareApartments.map((apt, idx) => {
                    const color = getColor(idx)
                    return (
                      <th key={apt.id} className="p-4 min-w-[220px] align-top">
                        <div
                          className={`bg-surface-muted rounded-xl p-3 border-t-4 ${color.border} border-x border-b border-border space-y-2 relative overflow-hidden text-left group`}
                        >
                          <div
                            className="absolute inset-0 opacity-5 pointer-events-none"
                            style={{
                              backgroundImage:
                                'radial-gradient(circle at 50% 50%, var(--primary) 1.5px, transparent 0)',
                              backgroundSize: '8px 8px',
                            }}
                          />
                          <div className="relative z-10 space-y-1">
                            <span className="inline-block px-2 py-0.5 rounded-full bg-slate-200/50 dark:bg-surface-muted text-muted text-[9px] font-bold uppercase tracking-wider">
                              {apt.category}
                            </span>
                            <h4 className="font-marketing text-xs font-bold line-clamp-2 min-h-[32px] text-fg leading-tight">
                              {apt.title}
                            </h4>
                            <p
                              className={`text-xs font-extrabold ${color.text}`}
                            >
                              {apt.price}
                            </p>
                            <div className="flex items-center gap-1 mt-1 text-[9px] text-muted">
                              <span
                                className="h-2 w-2 rounded-full"
                                style={{ backgroundColor: color.fill }}
                              />
                              <span>{color.name}</span>
                            </div>
                          </div>
                        </div>
                      </th>
                    )
                  })}
                  <th className="p-4 text-muted uppercase tracking-wider font-semibold min-w-[280px] font-display bg-slate-50 border-l border-border sticky right-0 z-20">
                    Đánh giá đối chiếu & Phân tích
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border/60">
                {criteria.map(row => (
                  <tr
                    key={row.key}
                    className="hover:bg-slate-50/50 dark:hover:bg-surface-muted/20 transition-colors"
                  >
                    <td className="p-4 font-semibold text-fg bg-white sticky left-0 z-10 border-r border-border">
                      <div className="flex items-center gap-1.5 relative group cursor-help w-full">
                        <span className="truncate max-w-[140px]">
                          {row.label}
                        </span>
                        <Info className="h-3.5 w-3.5 text-muted hover:text-primary transition-colors shrink-0" />
                        <div className="absolute left-full top-1/2 -translate-y-1/2 ml-2.5 hidden group-hover:block w-64 bg-slate-900 text-white text-[11px] p-3 rounded-xl shadow-xl z-50 leading-relaxed font-normal whitespace-normal pointer-events-none border border-slate-700/50">
                          <p className="font-bold mb-1 text-primary">
                            {row.label}
                          </p>
                          {row.explain}
                        </div>
                      </div>
                    </td>

                    {compareApartments.map(apt => {
                      const isWin = row.isWinner ? row.isWinner(apt) : false
                      const val = row.getValue(apt)
                      return (
                        <td
                          key={apt.id}
                          className={`p-4 align-middle transition-all duration-200 ${
                            isWin
                              ? 'bg-emerald-500/5 text-emerald-900 dark:text-emerald-300 font-medium'
                              : 'text-fg'
                          }`}
                        >
                          <div className="flex flex-wrap items-center gap-1.5">
                            {isWin && (
                              <Crown className="h-3.5 w-3.5 text-emerald-600 dark:text-emerald-400 fill-emerald-600/10 shrink-0 animate-pulse" />
                            )}
                            <div className="text-xs">{val}</div>
                            {isWin && row.winnerText && (
                              <span className="inline-flex items-center gap-0.5 px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 dark:bg-emerald-950/80 dark:text-emerald-300 text-[8px] font-extrabold uppercase tracking-wider shrink-0">
                                {row.winnerText}
                              </span>
                            )}
                          </div>
                        </td>
                      )
                    })}
                    <td className="p-4 text-[11px] text-fg/80 bg-slate-50/90 dark:bg-surface-muted/90 backdrop-blur-sm border-l border-border sticky right-0 z-10 leading-relaxed font-body font-medium max-w-[280px]">
                      {row.getAnalysis
                        ? row.getAnalysis(compareApartments)
                        : 'Không có dữ liệu'}
                    </td>
                  </tr>
                ))}
                {/* Amenities Row */}
                <tr className="hover:bg-slate-50/50 dark:hover:bg-surface-muted/20 transition-colors">
                  <td className="p-4 font-semibold text-fg bg-white sticky left-0 z-10 border-r border-border">
                    <div className="flex items-center gap-1.5 relative group cursor-help w-full">
                      <span className="truncate max-w-[140px]">
                        Tiện ích nổi khu
                      </span>
                      <Info className="h-3.5 w-3.5 text-muted hover:text-primary transition-colors shrink-0" />
                      <div className="absolute left-full top-1/2 -translate-y-1/2 ml-2.5 hidden group-hover:block w-64 bg-slate-900 text-white text-[11px] p-3 rounded-xl shadow-xl z-50 leading-relaxed font-normal whitespace-normal pointer-events-none border border-slate-700/50">
                        Các tiện ích nội khu được thừa hưởng như hồ bơi, phòng
                        gym, hầm đỗ xe, v.v.
                      </div>
                    </div>
                  </td>
                  {compareApartments.map(apt => (
                    <td key={apt.id} className="p-4 align-middle">
                      <div className="flex flex-wrap gap-1 max-w-[200px]">
                        {apt.amenities && apt.amenities.length > 0 ? (
                          apt.amenities.map((amenity, index) => (
                            <span
                              key={index}
                              className="inline-flex items-center gap-1 px-2 py-0.5 rounded bg-slate-100 dark:bg-surface border border-border text-[9px] font-medium text-muted whitespace-nowrap"
                            >
                              {amenity === 'pool' && (
                                <Waves className="h-3 w-3 text-primary" />
                              )}
                              {amenity === 'gym' && (
                                <Dumbbell className="h-3 w-3 text-primary" />
                              )}
                              {amenity === 'parking' && (
                                <Car className="h-3 w-3 text-primary" />
                              )}
                              {amenity === 'elevator' && (
                                <ArrowUpDown className="h-3 w-3 text-primary" />
                              )}
                              {amenity === 'security' && (
                                <ShieldCheck className="h-3 w-3 text-primary" />
                              )}
                              {amenity === 'pets' && (
                                <Cat className="h-3 w-3 text-primary" />
                              )}
                              {amenity === 'park' && (
                                <Trees className="h-3 w-3 text-primary" />
                              )}
                              <span>
                                {amenity === 'pool'
                                  ? 'Hồ bơi'
                                  : amenity === 'gym'
                                    ? 'Phòng gym'
                                    : amenity === 'parking'
                                      ? 'Đỗ xe'
                                      : amenity === 'elevator'
                                        ? 'Thang máy'
                                        : amenity === 'security'
                                          ? 'Bảo vệ'
                                          : amenity === 'pets'
                                            ? 'Thú cưng'
                                            : amenity === 'park'
                                              ? 'Công viên'
                                              : amenity}
                              </span>
                            </span>
                          ))
                        ) : (
                          <span className="text-muted text-[10px]">
                            Chưa có thông tin
                          </span>
                        )}
                      </div>
                    </td>
                  ))}
                  <td className="p-4 text-[11px] text-fg/80 bg-slate-50/90 dark:bg-surface-muted/90 backdrop-blur-sm border-l border-border sticky right-0 z-10 leading-relaxed font-body font-medium max-w-[280px]">
                    {(() => {
                      const counts = compareApartments.map(
                        a => a.amenities?.length || 0
                      )
                      const maxIdx = counts.indexOf(Math.max(...counts))
                      const bestApt = compareApartments[maxIdx]
                      if (bestApt && Math.max(...counts) > 0) {
                        return `Căn "${bestApt.title}" sở hữu nhiều tiện ích nội khu nhất (${Math.max(...counts)} dịch vụ), mang lại trải nghiệm sống tiện nghi nhất.`
                      }
                      return 'Các căn hộ có số lượng tiện ích nội khu tương đương nhau.'
                    })()}
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        )}

        {/* Tab content 2: SVG/HTML Charts & AI Advisor */}
        {compareTab === 'charts' && (
          <CompareCharts compareApartments={compareApartments} />
        )}

        {/* Modal Footer */}
        <div className="flex justify-end gap-3 border-t border-border pt-4">
          <button
            onClick={onClose}
            className="px-6 py-2.5 rounded-full border border-border text-xs font-bold hover:bg-slate-100 dark:hover:bg-surface-muted transition-all cursor-pointer font-display"
          >
            Đóng
          </button>
        </div>
      </div>
    </div>,
    document.body
  )
}
