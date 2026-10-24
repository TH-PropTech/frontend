'use client'

import * as React from 'react'
import { ApartmentItem } from '@/entities/properties'
import { Crown, Maximize2, Scale, Shield, Info } from 'lucide-react'
import { getColor, getVerifiedScore } from './compare-config'
import { CompareRecommendations } from './compare-recommendations'

export interface CompareChartsProps {
  compareApartments: ApartmentItem[]
}

export function CompareCharts({
  compareApartments,
}: CompareChartsProps): React.ReactElement | null {
  const getUnitPrice = React.useCallback((apt: ApartmentItem) => {
    return (apt.priceNum * 1000000) / (apt.areaNum || 1)
  }, [])

  // Donut chart data calculations
  const donutRentData = React.useMemo(() => {
    const total = compareApartments.reduce(
      (sum, a) => sum + (a.priceNum ?? 0),
      0
    )
    return compareApartments.map((a, idx) => {
      const val = a.priceNum ?? 0
      const pct = total > 0 ? val / total : 0
      const strokeDash = `${pct * 251.2} 251.2`
      const prevSum = compareApartments
        .slice(0, idx)
        .reduce((sum, p) => sum + ((p.priceNum ?? 0) / (total || 1)) * 251.2, 0)
      const strokeOffset = -prevSum
      return {
        title: a.title,
        val: `${val} Tr`,
        pctText: `${Math.round(pct * 100)}%`,
        strokeDash,
        strokeOffset,
        color: getColor(idx),
      }
    })
  }, [compareApartments])

  const donutAreaData = React.useMemo(() => {
    const total = compareApartments.reduce(
      (sum, a) => sum + (a.areaNum ?? 0),
      0
    )
    return compareApartments.map((a, idx) => {
      const val = a.areaNum ?? 0
      const pct = total > 0 ? val / total : 0
      const strokeDash = `${pct * 251.2} 251.2`
      const prevSum = compareApartments
        .slice(0, idx)
        .reduce((sum, p) => sum + ((p.areaNum ?? 0) / (total || 1)) * 251.2, 0)
      const strokeOffset = -prevSum
      return {
        title: a.title,
        val: `${val} m²`,
        pctText: `${Math.round(pct * 100)}%`,
        strokeDash,
        strokeOffset,
        color: getColor(idx),
      }
    })
  }, [compareApartments])

  // Area Chart normalization and plotting
  const areaChartData = React.useMemo(() => {
    const prices = compareApartments.map(a => a.priceNum ?? 10)
    const minPrice = Math.min(...prices)
    const maxPrice = Math.max(...prices)
    const getPriceScore = (p: number) =>
      maxPrice === minPrice
        ? 80
        : 30 + 70 * (1 - (p - minPrice) / (maxPrice - minPrice))

    const areas = compareApartments.map(a => a.areaNum ?? 40)
    const minArea = Math.min(...areas)
    const maxArea = Math.max(...areas)
    const getAreaScore = (a: number) =>
      maxArea === minArea ? 80 : 30 + 70 * ((a - minArea) / (maxArea - minArea))

    const uPrices = compareApartments.map(getUnitPrice)
    const minUP = Math.min(...uPrices)
    const maxUP = Math.max(...uPrices)
    const getValueScore = (up: number) =>
      maxUP === minUP ? 80 : 30 + 70 * (1 - (up - minUP) / (maxUP - minUP))

    const getScoreY = (score: number) => 140 - (score / 100) * 110

    return compareApartments.map((apt, idx) => {
      const pScore = getPriceScore(apt.priceNum ?? 10)
      const aScore = getAreaScore(apt.areaNum ?? 40)
      const vScore = getValueScore(getUnitPrice(apt))
      const tScore = getVerifiedScore(apt)

      const y0 = getScoreY(pScore)
      const y1 = getScoreY(aScore)
      const y2 = getScoreY(vScore)
      const y3 = getScoreY(tScore)

      const color = getColor(idx)

      return {
        title: apt.title,
        color,
        polygonPoints: `45,140 45,${y0} 125,${y1} 205,${y2} 285,${y3} 285,140`,
        linePoints: `45,${y0} 125,${y1} 205,${y2} 285,${y3}`,
        dots: [
          { x: 45, y: y0, val: `${apt.priceNum} Tr` },
          { x: 125, y: y1, val: `${apt.areaNum} m²` },
          { x: 205, y: y2, val: `${Math.round(getUnitPrice(apt) / 1000)}k/m²` },
          { x: 285, y: y3, val: apt.isVerified ? 'Đã duyệt' : 'Chưa duyệt' },
        ],
      }
    })
  }, [compareApartments, getUnitPrice])

  if (compareApartments.length < 2) return null

  return (
    <div className="space-y-8 animate-in fade-in duration-200">
      {/* 1. Bar Charts Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Chart 1: Rent Price */}
        <div className="bg-surface-muted rounded-2xl p-5 border border-border space-y-4 shadow-sm">
          <h4 className="font-display text-xs font-bold text-fg flex items-center gap-1.5 uppercase tracking-wide">
            <Info className="h-4 w-4 text-primary" />
            Biểu đồ cột: Giá Thuê Hàng Tháng (Triệu VND/tháng)
          </h4>
          <div className="space-y-4">
            {compareApartments.map((apt, idx) => {
              const prices = compareApartments.map(a => a.priceNum ?? 10)
              const maxVal = Math.max(...prices)
              const pct = maxVal > 0 ? ((apt.priceNum ?? 0) / maxVal) * 100 : 50
              const isCheapest = (apt.priceNum ?? 999) === Math.min(...prices)
              const color = getColor(idx)
              return (
                <div key={apt.id} className="space-y-1.5">
                  <div className="flex justify-between text-[11px]">
                    <span className="font-medium text-fg truncate max-w-[240px]">
                      {apt.title}
                    </span>
                    <span className="font-extrabold text-primary flex items-center gap-1">
                      {apt.priceNum} Tr
                      {isCheapest && (
                        <Crown className="h-3 w-3 text-success fill-success" />
                      )}
                    </span>
                  </div>
                  <div className="w-full bg-surface rounded-full h-6 overflow-hidden shadow-inner border border-border/50">
                    <div
                      className="h-full rounded-full transition-all duration-700 relative flex items-center justify-end pr-2"
                      style={{ width: `${pct}%`, backgroundColor: color.fill }}
                    >
                      {pct >= 20 && (
                        <span className="text-[9px] font-extrabold text-white drop-shadow-sm">
                          {apt.priceNum} Tr
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        </div>

        {/* Chart 2: Area */}
        <div className="bg-surface-muted rounded-2xl p-5 border border-border space-y-4 shadow-sm">
          <h4 className="font-display text-xs font-bold text-fg flex items-center gap-1.5 uppercase tracking-wide">
            <Maximize2 className="h-4 w-4 text-primary" />
            Biểu đồ cột: Diện Tích Sử Dụng (m²)
          </h4>
          <div className="space-y-4">
            {compareApartments.map((apt, idx) => {
              const areas = compareApartments.map(a => a.areaNum ?? 40)
              const maxVal = Math.max(...areas)
              const pct = maxVal > 0 ? ((apt.areaNum ?? 0) / maxVal) * 100 : 50
              const isLargest = (apt.areaNum ?? 0) === maxVal
              const color = getColor(idx)
              return (
                <div key={apt.id} className="space-y-1.5">
                  <div className="flex justify-between text-[11px]">
                    <span className="font-medium text-fg truncate max-w-[240px]">
                      {apt.title}
                    </span>
                    <span className="font-extrabold text-fg flex items-center gap-1">
                      {apt.areaNum} m²
                      {isLargest && (
                        <Crown className="h-3 w-3 text-success fill-success" />
                      )}
                    </span>
                  </div>
                  <div className="w-full bg-surface rounded-full h-6 overflow-hidden shadow-inner border border-border/50">
                    <div
                      className="h-full rounded-full transition-all duration-700 relative flex items-center justify-end pr-2"
                      style={{ width: `${pct}%`, backgroundColor: color.fill }}
                    >
                      {pct >= 20 && (
                        <span className="text-[9px] font-extrabold text-white drop-shadow-sm">
                          {apt.areaNum} m²
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </div>

      {/* 2. Donut Charts Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Donut 1: Price Share */}
        <div className="bg-surface-muted rounded-2xl p-5 border border-border space-y-4 shadow-sm">
          <h4 className="font-display text-xs font-bold text-fg flex items-center gap-1.5 uppercase tracking-wide">
            <Info className="h-4 w-4 text-primary" />
            Biểu đồ tròn: Tỷ trọng phân bổ chi phí thuê
          </h4>
          <div className="flex flex-row items-center justify-around gap-4">
            <svg
              width="120"
              height="120"
              viewBox="0 0 120 120"
              className="flex-shrink-0"
            >
              <circle
                cx="60"
                cy="60"
                r="40"
                fill="transparent"
                stroke="var(--border)"
                strokeWidth="12"
              />
              {donutRentData.map((item, idx) => (
                <circle
                  key={idx}
                  cx="60"
                  cy="60"
                  r="40"
                  fill="transparent"
                  stroke={item.color.fill}
                  strokeWidth="14"
                  strokeDasharray={item.strokeDash}
                  strokeDashoffset={item.strokeOffset}
                  transform="rotate(-90 60 60)"
                  className="transition-all duration-500"
                />
              ))}
              <circle cx="60" cy="60" r="30" className="fill-surface-muted" />
            </svg>
            <div className="flex-1 space-y-1.5 max-w-[200px]">
              {donutRentData.map((item, idx) => (
                <div
                  key={idx}
                  className="flex items-center justify-between text-[10px]"
                >
                  <div className="flex items-center gap-1.5 truncate max-w-[120px]">
                    <div
                      className="w-2 h-2 rounded-full flex-shrink-0"
                      style={{ backgroundColor: item.color.fill }}
                    />
                    <span className="font-medium text-fg truncate">
                      {item.title}
                    </span>
                  </div>
                  <span className="font-bold text-muted">
                    {item.val} ({item.pctText})
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Donut 2: Area Share */}
        <div className="bg-surface-muted rounded-2xl p-5 border border-border space-y-4 shadow-sm">
          <h4 className="font-display text-xs font-bold text-fg flex items-center gap-1.5 uppercase tracking-wide">
            <Maximize2 className="h-4 w-4 text-primary" />
            Biểu đồ tròn: Tỷ trọng phân bổ tổng diện tích
          </h4>
          <div className="flex flex-row items-center justify-around gap-4">
            <svg
              width="120"
              height="120"
              viewBox="0 0 120 120"
              className="flex-shrink-0"
            >
              <circle
                cx="60"
                cy="60"
                r="40"
                fill="transparent"
                stroke="var(--border)"
                strokeWidth="12"
              />
              {donutAreaData.map((item, idx) => (
                <circle
                  key={idx}
                  cx="60"
                  cy="60"
                  r="40"
                  fill="transparent"
                  stroke={item.color.fill}
                  strokeWidth="14"
                  strokeDasharray={item.strokeDash}
                  strokeDashoffset={item.strokeOffset}
                  transform="rotate(-90 60 60)"
                  className="transition-all duration-500"
                />
              ))}
              <circle cx="60" cy="60" r="30" className="fill-surface-muted" />
            </svg>
            <div className="flex-1 space-y-1.5 max-w-[200px]">
              {donutAreaData.map((item, idx) => (
                <div
                  key={idx}
                  className="flex items-center justify-between text-[10px]"
                >
                  <div className="flex items-center gap-1.5 truncate max-w-[120px]">
                    <div
                      className="w-2 h-2 rounded-full flex-shrink-0"
                      style={{ backgroundColor: item.color.fill }}
                    />
                    <span className="font-medium text-fg truncate">
                      {item.title}
                    </span>
                  </div>
                  <span className="font-bold text-muted">
                    {item.val} ({item.pctText})
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* 3. Area Chart Section */}
      <div className="bg-surface-muted rounded-2xl p-5 border border-border space-y-4 shadow-sm">
        <h4 className="font-display text-xs font-bold text-fg flex items-center gap-1.5 uppercase tracking-wide">
          <Scale className="h-4 w-4 text-primary" />
          Biểu đồ miền: Tương quan so sánh chỉ số tổng hợp (Giá - Diện tích -
          Đơn giá - Kiểm duyệt)
        </h4>
        <p className="text-[11px] text-muted leading-relaxed -mt-2">
          Biểu đồ bên dưới chuẩn hoá 4 tiêu chí đánh giá quan trọng thành thang
          điểm 0 – 100, sau đó vẽ đường xu hướng cho từng căn hộ. Đường nào nằm{' '}
          <strong className="text-fg">càng cao</strong> ở một trục nghĩa là căn
          hộ đó <strong className="text-fg">càng vượt trội</strong> ở tiêu chí
          tương ứng.
        </p>
        <div className="relative">
          <svg
            viewBox="0 0 320 170"
            width="100%"
            height="100%"
            className="bg-surface rounded-xl border border-border p-2"
          >
            {[20, 47.5, 75, 102.5, 130].map((y, i) => (
              <line
                key={i}
                x1="30"
                y1={y}
                x2="300"
                y2={y}
                stroke="var(--border)"
                strokeWidth="1"
                strokeDasharray="2 2"
              />
            ))}
            {[45, 125, 205, 285].map((x, i) => (
              <line
                key={i}
                x1={x}
                y1="20"
                x2={x}
                y2="140"
                stroke="var(--border)"
                strokeWidth="1"
              />
            ))}
            {areaChartData.map((item, idx) => (
              <g key={idx}>
                <polygon
                  points={item.polygonPoints}
                  fill={item.color.fill}
                  fillOpacity="0.15"
                  className="transition-all duration-500"
                />
                <polyline
                  points={item.linePoints}
                  fill="none"
                  stroke={item.color.fill}
                  strokeWidth="2.5"
                  className="transition-all duration-500"
                />
                {item.dots.map((dot, dIdx) => (
                  <g key={dIdx}>
                    <circle
                      cx={dot.x}
                      cy={dot.y}
                      r="4.5"
                      fill={item.color.fill}
                      stroke="#ffffff"
                      strokeWidth="1.5"
                    />
                    <text
                      x={dot.x}
                      y={dot.y - 7}
                      textAnchor="middle"
                      className="text-[7.5px] font-extrabold fill-fg/80"
                    >
                      {dot.val}
                    </text>
                  </g>
                ))}
              </g>
            ))}
            <text
              x="45"
              y="152"
              textAnchor="middle"
              className="text-[8px] font-bold fill-muted uppercase"
            >
              Giá rẻ nhất
            </text>
            <text
              x="125"
              y="152"
              textAnchor="middle"
              className="text-[8px] font-bold fill-muted uppercase"
            >
              Rộng nhất
            </text>
            <text
              x="205"
              y="152"
              textAnchor="middle"
              className="text-[8px] font-bold fill-muted uppercase"
            >
              Đáng tiền
            </text>
            <text
              x="285"
              y="152"
              textAnchor="middle"
              className="text-[8px] font-bold fill-muted uppercase"
            >
              Kiểm duyệt
            </text>
          </svg>

          {/* Legend */}
          <div className="flex flex-wrap gap-4 mt-3 justify-center text-[10px]">
            {areaChartData.map((item, idx) => (
              <div key={idx} className="flex items-center gap-1.5">
                <div
                  className="w-3 h-1.5 rounded"
                  style={{ backgroundColor: item.color.fill }}
                />
                <span className="font-semibold text-fg">{item.title}</span>
              </div>
            ))}
          </div>

          {/* Metric Descriptions */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mt-4 pt-4 border-t border-border/50">
            <div className="space-y-0.5">
              <span className="text-[10px] font-bold text-fg uppercase tracking-wide flex items-center gap-1">
                <Crown className="h-3 w-3 text-success" /> Giá rẻ nhất
              </span>
              <p className="text-[10px] text-muted leading-snug">
                Giá thuê hàng tháng (Tr/tháng). Cao = thuê rẻ hơn đối thủ.
              </p>
            </div>
            <div className="space-y-0.5">
              <span className="text-[10px] font-bold text-fg uppercase tracking-wide flex items-center gap-1">
                <Maximize2 className="h-3 w-3 text-info" /> Rộng nhất
              </span>
              <p className="text-[10px] text-muted leading-snug">
                Diện tích sàn sử dụng (m²). Cao = không gian lớn hơn.
              </p>
            </div>
            <div className="space-y-0.5">
              <span className="text-[10px] font-bold text-fg uppercase tracking-wide flex items-center gap-1">
                <Scale className="h-3 w-3 text-warning" /> Đáng tiền
              </span>
              <p className="text-[10px] text-muted leading-snug">
                Đơn giá thuê trên m² (đ/m²). Cao = mỗi đồng thuê được nhiều diện
                tích hơn.
              </p>
            </div>
            <div className="space-y-0.5">
              <span className="text-[10px] font-bold text-fg uppercase tracking-wide flex items-center gap-1">
                <Shield className="h-3 w-3 text-primary" /> Kiểm duyệt
              </span>
              <p className="text-[10px] text-muted leading-snug">
                Tin đăng đã được nhân viên hệ thống kiểm duyệt (cao) hoặc chưa
                (thấp).
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* 4. Dynamic Recommendations (extracted component) */}
      <CompareRecommendations
        compareApartments={compareApartments}
        getUnitPrice={getUnitPrice}
      />
    </div>
  )
}
