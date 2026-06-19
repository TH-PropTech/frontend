'use client'

import * as React from 'react'
import { ApartmentItem } from '@/entities/properties'
import { Crown, Maximize2, Scale, Shield, Info, Sparkles } from 'lucide-react'
import { getColor } from './compare-config'

export interface CompareChartsProps {
  compareApartments: ApartmentItem[]
}

export function CompareCharts({
  compareApartments,
}: CompareChartsProps): React.ReactElement | null {
  const getRentPrice = React.useCallback((apt: ApartmentItem) => {
    return apt.priceNum ? apt.priceNum * 1000000 : 15000000
  }, [])

  const getUnitPrice = React.useCallback(
    (apt: ApartmentItem) => {
      return getRentPrice(apt) / (apt.areaNum || 1)
    },
    [getRentPrice]
  )

  const getTrustScore = React.useCallback((apt: ApartmentItem) => {
    return apt.isVerified ? 98 : 75
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
      const tScore = getTrustScore(apt)

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
          { x: 285, y: y3, val: `${tScore}%` },
        ],
      }
    })
  }, [compareApartments, getUnitPrice, getTrustScore])

  const recommendations = React.useMemo(() => {
    if (compareApartments.length < 2) return null
    const sortedCheapest = [...compareApartments].sort(
      (a, b) => (a.priceNum ?? 999) - (b.priceNum ?? 999)
    )
    const cheapest = sortedCheapest[0]

    const sortedLargest = [...compareApartments].sort(
      (a, b) => (b.areaNum ?? 0) - (a.areaNum ?? 0)
    )
    const largest = sortedLargest[0]

    const sortedBestValue = [...compareApartments].sort(
      (a, b) => getUnitPrice(a) - getUnitPrice(b)
    )
    const bestValue = sortedBestValue[0]

    const sortedMostTrusted = [...compareApartments].sort(
      (a, b) => getTrustScore(b) - getTrustScore(a)
    )
    const mostTrusted = sortedMostTrusted[0]

    if (!cheapest || !largest || !bestValue || !mostTrusted) return null

    return {
      cheapest: cheapest as ApartmentItem,
      largest: largest as ApartmentItem,
      bestValue: bestValue as ApartmentItem,
      mostTrusted: mostTrusted as ApartmentItem,
    }
  }, [compareApartments, getUnitPrice, getTrustScore])

  if (compareApartments.length < 2) return null

  return (
    <div className="space-y-8 animate-in fade-in duration-200">
      {/* 1. Bar Charts Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Chart 1: Rent Price */}
        <div className="bg-slate-50 dark:bg-surface-muted rounded-2xl p-5 border border-border space-y-4 shadow-sm">
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
                        <Crown className="h-3 w-3 text-emerald-500 fill-emerald-500" />
                      )}
                    </span>
                  </div>
                  <div className="w-full bg-slate-200/50 dark:bg-surface rounded-full h-6 overflow-hidden shadow-inner border border-border/50">
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
        <div className="bg-slate-50 dark:bg-surface-muted rounded-2xl p-5 border border-border space-y-4 shadow-sm">
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
                        <Crown className="h-3 w-3 text-emerald-500 fill-emerald-500" />
                      )}
                    </span>
                  </div>
                  <div className="w-full bg-slate-200/50 dark:bg-surface rounded-full h-6 overflow-hidden shadow-inner border border-border/50">
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

      {/* 2. Donut Charts Section (Biểu đồ tròn) */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Donut 1: Price Share */}
        <div className="bg-slate-50 dark:bg-surface-muted rounded-2xl p-5 border border-border space-y-4 shadow-sm">
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
                stroke="#e2e8f0"
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
              <circle
                cx="60"
                cy="60"
                r="30"
                className="fill-slate-50 dark:fill-surface-muted"
              />
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
        <div className="bg-slate-50 dark:bg-surface-muted rounded-2xl p-5 border border-border space-y-4 shadow-sm">
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
                stroke="#e2e8f0"
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
              <circle
                cx="60"
                cy="60"
                r="30"
                className="fill-slate-50 dark:fill-surface-muted"
              />
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

      {/* 3. Area Chart Section (Biểu đồ miền) */}
      <div className="bg-slate-50 dark:bg-surface-muted rounded-2xl p-5 border border-border space-y-4 shadow-sm">
        <h4 className="font-display text-xs font-bold text-fg flex items-center gap-1.5 uppercase tracking-wide">
          <Scale className="h-4 w-4 text-primary" />
          Biểu đồ miền: Tương quan so sánh chỉ số tổng hợp (Giá - Diện tích -
          Đơn giá - Độ tin cậy)
        </h4>
        <div className="relative">
          <svg
            viewBox="0 0 320 170"
            width="100%"
            height="100%"
            className="bg-white dark:bg-surface rounded-xl border border-border p-2"
          >
            {/* Grid Lines & Labels */}
            {[20, 47.5, 75, 102.5, 130].map((y, i) => (
              <line
                key={i}
                x1="30"
                y1={y}
                x2="300"
                y2={y}
                stroke="#f1f5f9"
                strokeWidth="1"
                strokeDasharray="2 2"
              />
            ))}

            {/* Vertical grid lines */}
            {[45, 125, 205, 285].map((x, i) => (
              <line
                key={i}
                x1={x}
                y1="20"
                x2={x}
                y2="140"
                stroke="#f1f5f9"
                strokeWidth="1"
              />
            ))}

            {/* Render Area Polygons */}
            {areaChartData.map((item, idx) => (
              <g key={idx}>
                {/* Filled Area */}
                <polygon
                  points={item.polygonPoints}
                  fill={item.color.fill}
                  fillOpacity="0.15"
                  className="transition-all duration-500"
                />
                {/* Boundary line */}
                <polyline
                  points={item.linePoints}
                  fill="none"
                  stroke={item.color.fill}
                  strokeWidth="2.5"
                  className="transition-all duration-500"
                />
                {/* Node dots */}
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

            {/* X-Axis labels */}
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
              Tin cậy
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
        </div>
      </div>

      {/* 4. Detailed Explanations & Dynamic Recommendations */}
      {recommendations && (
        <div className="bg-gradient-to-br from-primary/5 via-slate-50 to-primary/5 dark:from-primary/10 dark:via-surface-muted dark:to-primary/10 border border-primary/20 rounded-2xl p-6 space-y-5 shadow-sm relative overflow-hidden">
          <div className="absolute top-0 right-0 w-24 h-24 bg-primary/5 rounded-full blur-2xl pointer-events-none" />

          <div className="flex items-center gap-2 border-b border-primary/10 pb-3">
            <div className="h-8 w-8 rounded-lg bg-primary-soft flex items-center justify-center text-primary">
              <Scale className="h-4.5 w-4.5" />
            </div>
            <div>
              <h4 className="font-marketing text-sm font-extrabold text-fg">
                Bảng Phân Tích & Đối Chiếu Khuyến Nghị Tối Ưu
              </h4>
              <p className="text-[10px] text-muted">
                Tự động đánh giá chi tiết các chỉ số tài chính, không gian và độ
                tin cậy của các căn hộ được chọn.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
            <div className="bg-white/80 dark:bg-surface/80 rounded-xl p-4 border border-border space-y-2">
              <span className="inline-flex items-center gap-1 text-[10px] font-bold text-emerald-600 uppercase">
                <Crown className="h-3.5 w-3.5" />
                Tối ưu chi phí hàng tháng
              </span>
              <p className="font-semibold text-fg leading-snug">
                {recommendations.cheapest.title}
              </p>
              <p className="text-[11px] text-muted leading-relaxed">
                Căn hộ có giá thuê hợp lý nhất trong danh sách so sánh hiện tại
                ở mức **{recommendations.cheapest.priceNum} Tr/tháng**. Lựa chọn
                này giúp giảm bớt gánh nặng tài chính hàng tháng, lý tưởng cho
                những ai muốn tích lũy thêm ngân sách dự phòng.
              </p>
            </div>

            <div className="bg-white/80 dark:bg-surface/80 rounded-xl p-4 border border-border space-y-2">
              <span className="inline-flex items-center gap-1 text-[10px] font-bold text-blue-600 uppercase">
                <Maximize2 className="h-3.5 w-3.5" />
                Không gian rộng rãi nhất
              </span>
              <p className="font-semibold text-fg leading-snug">
                {recommendations.largest.title}
              </p>
              <p className="text-[11px] text-muted leading-relaxed">
                Với diện tích sử dụng lên tới **
                {recommendations.largest.areaNum} m²**, căn hộ này mang đến
                không gian sinh hoạt vô cùng thoải mái và rộng rãi. Rất thích
                hợp cho những hộ gia đình có con nhỏ hoặc những ai mong muốn
                thiết lập phòng làm việc tại nhà.
              </p>
            </div>

            <div className="bg-white/80 dark:bg-surface/80 rounded-xl p-4 border border-border space-y-2">
              <span className="inline-flex items-center gap-1 text-[10px] font-bold text-amber-600 uppercase">
                <Scale className="h-3.5 w-3.5" />
                Hiệu quả sử dụng dòng tiền
              </span>
              <p className="font-semibold text-fg leading-snug">
                {recommendations.bestValue.title}
              </p>
              <p className="text-[11px] text-muted leading-relaxed">
                Căn hộ đạt đơn giá thuê tốt nhất ở mức **
                {new Intl.NumberFormat('vi-VN').format(
                  Math.round(getUnitPrice(recommendations.bestValue))
                )}{' '}
                đ/m²**. Đây là lựa chọn mang lại hiệu năng sử dụng cao nhất trên
                từng đồng chi trả cho không gian thực tế.
              </p>
            </div>

            <div className="bg-white/80 dark:bg-surface/80 rounded-xl p-4 border border-border space-y-2">
              <span className="inline-flex items-center gap-1 text-[10px] font-bold text-indigo-600 uppercase">
                <Shield className="h-3.5 w-3.5" />
                Độ tin cậy & an toàn pháp lý
              </span>
              <p className="font-semibold text-fg leading-snug">
                {recommendations.mostTrusted.title}
              </p>
              <p className="text-[11px] text-muted leading-relaxed">
                Nổi bật với điểm số xác minh Blockchain cao nhất ở mức **
                {getTrustScore(recommendations.mostTrusted)}%**. Mọi thông tin
                hợp đồng, pháp lý của chủ nhà đều đã được mã hóa và lưu trữ an
                toàn, hạn chế tối đa rủi ro tin ảo.
              </p>
            </div>
          </div>

          <div className="bg-white/60 dark:bg-surface/40 rounded-xl p-4 border border-border text-xs leading-relaxed text-fg space-y-3">
            <div className="flex items-center gap-1.5 font-bold text-[11px] text-muted uppercase tracking-wider">
              <Sparkles className="h-3.5 w-3.5 text-primary" />
              <span>Báo cáo phân tích đối chiếu chi tiết:</span>
            </div>
            <div className="space-y-2 font-body text-fg/90 text-[11.5px]">
              <p>
                {`Qua phân tích dữ liệu, căn hộ tại "${recommendations.cheapest.projectName || recommendations.cheapest.title}" có lợi thế vượt trội về giá thuê hàng tháng (${recommendations.cheapest.priceNum} Tr/tháng), giúp bạn tiết kiệm chi tiêu tối ưu.`}
              </p>
              <p>
                {`Tuy nhiên, nếu xét về diện tích rộng lớn thì căn hộ "${recommendations.largest.title}" là điểm nhấn với ${recommendations.largest.areaNum} m² sàn sử dụng. Khi quy đổi về giá trị kinh tế trên từng mét vuông, căn hộ "${recommendations.bestValue.title}" chứng minh độ hiệu quả sử dụng dòng tiền lý tưởng nhất nhờ đơn giá thuê thấp nhất.`}
              </p>
              <p>
                {`Khuyến nghị tổng hợp: Nếu ngân sách của bạn được đặt lên hàng đầu, căn hộ tại ${recommendations.cheapest.projectName || recommendations.cheapest.location} là quyết định sáng suốt nhất. Nếu không gian sống rộng rãi để phục vụ gia đình đông người là ưu tiên, hãy lựa chọn căn hộ ${recommendations.largest.title}. Để hạn chế rủi ro pháp lý và có giao dịch minh bạch tuyệt đối, hãy lựa chọn ${recommendations.mostTrusted.title} vì đã được xác minh toàn diện thông qua Blockchain.`}
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
