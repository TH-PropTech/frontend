'use client'

import * as React from 'react'
import { createPortal } from 'react-dom'
import { mockApartments, type ApartmentItem } from '@/entities/properties'

const formatCurrency = (val: number): string => {
  return val.toLocaleString('vi-VN') + ' đ'
}

interface PropertyComparisonProps {
  property: ApartmentItem
}

export function PropertyComparison({
  property,
}: PropertyComparisonProps): React.ReactElement {
  const price = property.priceNum ? property.priceNum * 1000000 : 18000000
  const [showExplain, setShowExplain] = React.useState(false)
  const [mounted, setMounted] = React.useState(false)
  React.useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setMounted(true)
  }, [])

  // Comparison options
  const compareOptions = React.useMemo(() => {
    return mockApartments.filter(apt => apt.id !== property.id)
  }, [property.id])

  const [compareId, setCompareId] = React.useState<string>(
    compareOptions[0]?.id || ''
  )
  const compareApt = React.useMemo(() => {
    return compareOptions.find(apt => apt.id === compareId) || compareOptions[0]
  }, [compareId, compareOptions])

  return (
    <div className="bg-white border border-border rounded-3xl p-6 md:p-8 shadow-sm space-y-5">
      <h3 className="font-marketing text-xl font-bold text-fg flex items-center justify-between gap-2">
        <div className="flex items-center gap-2">
          <span className="h-2.5 w-2.5 rounded-full bg-primary" />
          Ma trận so sánh nhanh căn hộ (Property Comparison)
        </div>
        <button
          onClick={() => setShowExplain(true)}
          className="text-muted-foreground hover:text-primary transition-colors cursor-pointer p-1"
          title="Xem giải thích ma trận so sánh"
        >
          <svg className="h-5 w-5" viewBox="0 0 24 24">
            <circle
              cx="12"
              cy="12"
              r="9"
              stroke="currentColor"
              strokeWidth="2"
              fill="none"
            />
            <circle cx="12" cy="8.2" r="1.2" fill="currentColor" />
            <line
              x1="12"
              y1="11.5"
              x2="12"
              y2="16.5"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
            />
          </svg>
        </button>
      </h3>
      <p className="font-body text-sm text-muted-foreground font-medium leading-relaxed">
        Chọn một căn hộ khác trong danh sách để so sánh nhanh các thông số pháp
        lý, chất lượng và chi phí vận hành.
      </p>

      <div className="border border-border rounded-2xl p-6 bg-surface-muted/20 space-y-5">
        <div className="flex flex-col sm:flex-row sm:items-center gap-3 border-b border-border/40 pb-4">
          <span className="text-sm font-bold text-fg shrink-0">
            So sánh với:
          </span>
          <select
            value={compareId}
            onChange={e => setCompareId(e.target.value)}
            className="bg-white border border-border rounded-xl px-4 py-2.5 text-sm font-bold text-fg focus:outline-none focus:border-primary flex-1 max-w-md shadow-sm"
          >
            {compareOptions.map(opt => (
              <option key={opt.id} value={opt.id}>
                {opt.title} ({opt.price})
              </option>
            ))}
          </select>
        </div>

        {/* Matrix table */}
        {compareApt && (
          <div className="border border-border rounded-2xl overflow-hidden bg-white text-sm shadow-sm">
            <div className="grid grid-cols-3 bg-surface-muted/40 border-b border-border p-4 font-extrabold text-fg text-center">
              <span>Tiêu chí</span>
              <span className="text-primary font-black">Căn hộ này</span>
              <span className="text-muted-foreground font-black">
                Căn hộ đối chiếu
              </span>
            </div>

            {[
              {
                label: 'Giá thuê hàng tháng',
                v1: formatCurrency(price),
                v2: formatCurrency(compareApt.priceNum * 1000000),
                better: price < compareApt.priceNum * 1000000 ? 1 : 2,
              },
              {
                label: 'Diện tích sử dụng',
                v1: `${property.areaNum} m²`,
                v2: `${compareApt.areaNum} m²`,
                better: property.areaNum > compareApt.areaNum ? 1 : 2,
              },
              {
                label: 'Số phòng ngủ',
                v1: `${property.bedrooms} PN`,
                v2: `${compareApt.bedrooms} PN`,
                better: property.bedrooms >= compareApt.bedrooms ? 1 : 2,
              },
              {
                label: 'Độ tin cậy Blockchain',
                v1: '98% Điểm',
                v2: compareApt.isVerified ? '96% Điểm' : 'Chưa xác thực',
                better: 1,
              },
              {
                label: 'Hiệu suất năng lượng',
                v1: 'Mức A (Tiết kiệm)',
                v2: 'Mức B (Khá tốt)',
                better: 1,
              },
              {
                label: 'Dự án chung cư',
                v1: property.projectName || 'Không thuộc dự án',
                v2: compareApt.projectName || 'Không thuộc dự án',
                better: 0,
              },
            ].map((row, idx) => (
              <div
                key={idx}
                className="grid grid-cols-3 border-b border-border last:border-0 p-4 text-center items-center"
              >
                <span className="font-bold text-left text-fg-muted">
                  {row.label}
                </span>
                <span
                  className={`p-2 rounded-xl text-center font-semibold ${row.better === 1 ? 'bg-success-soft font-black text-success border border-success/20 shadow-sm' : 'text-fg'}`}
                >
                  {row.v1}
                </span>
                <span
                  className={`p-2 rounded-xl text-center font-semibold ${row.better === 2 ? 'bg-success-soft font-black text-success border border-success/20 shadow-sm' : 'text-fg'}`}
                >
                  {row.v2}
                </span>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Logic Explanation Modal */}
      {mounted &&
        showExplain &&
        typeof window !== 'undefined' &&
        createPortal(
          <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/60 backdrop-blur-md p-4 transition-all duration-300">
            <div className="bg-white border border-border rounded-3xl max-w-lg w-full p-6 md:p-8 shadow-2xl relative space-y-5 animate-scale-up border-primary/20">
              <h4 className="font-marketing text-lg md:text-xl font-bold text-fg flex items-center gap-2 border-b border-border pb-3.5">
                <span className="h-2.5 w-2.5 rounded-full bg-primary animate-pulse" />
                Nguyên lý so sánh đối chiếu căn hộ
              </h4>

              <div className="space-y-4 max-h-[70vh] overflow-y-auto pr-1">
                <div className="space-y-1.5">
                  <span className="text-[10px] font-extrabold text-muted-foreground uppercase tracking-wider block">
                    Nguyên lý hoạt động:
                  </span>
                  <p className="text-xs text-fg-muted font-body leading-relaxed font-semibold">
                    Bảng so sánh đối chiếu tự động làm nổi bật các thuộc tính
                    vượt trội của một căn hộ so với căn hộ đối chiếu, giúp bạn
                    nhanh chóng đánh giá tương quan hiệu quả kinh tế, diện tích
                    sinh hoạt và độ an toàn pháp lý để đưa ra quyết định tối ưu.
                  </p>
                </div>

                <div className="bg-success/5 border border-success/20 rounded-2xl p-4 space-y-1.5">
                  <span className="text-[10px] font-extrabold text-success uppercase tracking-wider block">
                    Ví dụ trực quan:
                  </span>
                  <p className="text-xs text-success/90 font-medium leading-relaxed font-body">
                    Ví dụ: Khi so sánh căn hộ Vinhomes Central Park (18Tr/tháng
                    - 75m²) với căn hộ đối chiếu Masteri Thảo Điền (12Tr/tháng -
                    48m²), hệ thống sẽ tự động làm nổi bật màu xanh lá cho
                    Masteri Thảo Điền ở tiêu chí &quot;Giá thuê&quot; vì rẻ hơn
                    6 triệu, nhưng sẽ làm nổi bật Vinhomes Central Park ở tiêu
                    chí &quot;Diện tích&quot; vì rộng hơn 27m².
                  </p>
                </div>

                <div className="space-y-2 pt-1">
                  <span className="text-[10px] font-extrabold text-muted-foreground uppercase tracking-wider block">
                    Cách thức đánh giá tiêu chuẩn:
                  </span>
                  <ul className="space-y-2 text-xs font-semibold text-fg-muted font-body pl-5 list-decimal leading-relaxed">
                    <li>
                      <span className="text-fg font-bold">Giá thuê:</span> Căn
                      hộ nào có giá thuê thấp hơn sẽ được làm nổi bật màu xanh
                      lá.
                    </li>
                    <li>
                      <span className="text-fg font-bold">
                        Diện tích &amp; Phòng ngủ:
                      </span>{' '}
                      Căn hộ nào có diện tích rộng hơn hoặc có số phòng ngủ
                      nhiều hơn sẽ thắng ở tiêu chí này.
                    </li>
                    <li>
                      <span className="text-fg font-bold">
                        Độ tin cậy Blockchain:
                      </span>{' '}
                      Điểm xác thực của căn hộ nào cao hơn trên Blockchain (do
                      chủ hộ KYC và sổ đỏ chuẩn hóa) sẽ được làm nổi bật.
                    </li>
                    <li>
                      <span className="text-fg font-bold">
                        Hiệu suất năng lượng:
                      </span>{' '}
                      Nhãn năng lượng tốt hơn (ví dụ A tốt hơn B) sẽ được ưu
                      tiên chọn.
                    </li>
                  </ul>
                </div>
              </div>

              <div className="flex justify-end pt-3 border-t border-border/60">
                <button
                  onClick={() => setShowExplain(false)}
                  className="bg-primary text-white text-xs font-bold px-5 py-3 rounded-xl hover:bg-primary/90 transition-all active:scale-95 cursor-pointer shadow-md shadow-primary/10"
                >
                  Đóng giải thích
                </button>
              </div>
            </div>
          </div>,
          document.body
        )}
    </div>
  )
}
