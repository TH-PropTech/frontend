'use client'

import * as React from 'react'
import { createPortal } from 'react-dom'

interface RentCalculatorProps {
  price: number
}

export function RentCalculator({
  price,
}: RentCalculatorProps): React.ReactElement {
  const [income, setIncome] = React.useState<number>(50) // in millions VND
  const [showExplain, setShowExplain] = React.useState(false)
  const [mounted, setMounted] = React.useState(false)
  React.useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setMounted(true)
  }, [])
  const rentRatio = Math.round((price / (income * 1000000)) * 100)

  // Financial safety calculation
  let safetyText =
    'An toàn tài chính - Mức chi trả rất an toàn cho thu nhập của bạn.'
  let safetyColor = 'text-success bg-success/15 border-success/30 shadow-sm'
  let safetyBarColor = 'bg-success'

  if (rentRatio > 30 && rentRatio <= 45) {
    safetyText =
      'Cần cân nhắc - Bạn nên cân đối chi phí sinh hoạt khác để tránh áp lực.'
    safetyColor = 'text-warning bg-warning/10 border-warning/30 shadow-sm'
    safetyBarColor = 'bg-warning'
  } else if (rentRatio > 45) {
    safetyText =
      'Rủi ro cao - Tiền thuê chiếm dụng tỷ trọng quá lớn trong tổng thu nhập.'
    safetyColor = 'text-danger bg-danger/10 border-danger/30 shadow-sm'
    safetyBarColor = 'bg-danger'
  }

  return (
    <div className="bg-white border border-border rounded-3xl p-6 md:p-8 shadow-sm space-y-5">
      <h3 className="font-marketing text-xl font-bold text-fg flex items-center justify-between gap-2">
        <div className="flex items-center gap-2">
          <span className="h-2.5 w-2.5 rounded-full bg-primary" />
          Đánh giá khả năng chi trả tài chính (Rent Affordability Calculator)
        </div>
        <button
          onClick={() => setShowExplain(true)}
          className="text-muted-foreground hover:text-primary transition-colors cursor-pointer p-1"
          title="Xem giải thích quy tắc chi trả"
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
        Kéo thanh trượt để nhập mức thu nhập hàng tháng của bạn để kiểm tra độ
        an toàn ngân sách đối với căn hộ này.
      </p>

      <div className="border border-border rounded-2xl p-6 bg-surface-muted/20 space-y-5">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <span className="text-sm font-bold text-fg">
            Thu nhập hàng tháng:
          </span>
          <span className="text-xl font-display font-black text-primary">
            {income} Triệu VND
          </span>
        </div>

        <input
          type="range"
          min={10}
          max={120}
          step={2}
          value={income}
          onChange={e => setIncome(Number(e.target.value))}
          className="w-full h-3 bg-white border border-border rounded-lg appearance-none cursor-pointer accent-primary focus:outline-none"
        />

        <div className="space-y-2.5 pt-2">
          <div className="flex justify-between items-center text-xs font-extrabold text-muted-foreground">
            <span>Tỷ lệ tiền thuê / thu nhập:</span>
            <span className="text-fg text-sm font-bold font-mono">
              {rentRatio}%
            </span>
          </div>

          {/* Visual Gauge Bar */}
          <div className="h-4.5 w-full bg-white border border-border rounded-full overflow-hidden flex relative shadow-inner">
            <div
              style={{ width: '30%' }}
              className="h-full bg-success/20 border-r border-border/20"
            />
            <div
              style={{ width: '15%' }}
              className="h-full bg-warning/20 border-r border-border/20"
            />
            <div style={{ width: '55%' }} className="h-full bg-danger/20" />

            <div
              style={{ left: `${Math.min(rentRatio, 100)}%` }}
              className={`absolute top-0 bottom-0 w-2.5 -ml-1.25 ${safetyBarColor} shadow-md`}
            />
          </div>

          <div className="flex justify-between text-[10px] font-black text-muted-foreground pt-1">
            <span>AN TOÀN (≤30%)</span>
            <span>CÂN NHẮC (31-45%)</span>
            <span>RỦI RO (&gt;45%)</span>
          </div>
        </div>

        <div
          className={`p-5 border rounded-xl font-body text-sm font-bold text-center ${safetyColor}`}
        >
          {safetyText}
        </div>
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
                Quy tắc đánh giá khả năng chi trả (30% Rule)
              </h4>

              <div className="space-y-4 max-h-[70vh] overflow-y-auto pr-1">
                <div className="space-y-1.5">
                  <span className="text-[10px] font-extrabold text-muted-foreground uppercase tracking-wider block">
                    Nguyên lý hoạt động:
                  </span>
                  <p className="text-xs text-fg-muted font-body leading-relaxed font-semibold">
                    Quy tắc 30% là khuyến nghị quản lý tài chính cá nhân tiêu
                    chuẩn. Bạn nên dành tối đa 30% tổng thu nhập hàng tháng cho
                    chi phí thuê nhà để có đủ ngân sách cho ăn uống, đi lại, học
                    tập, tiết kiệm và các sự vụ dự phòng khẩn cấp.
                  </p>
                </div>

                <div className="bg-surface-muted border border-border/80 rounded-2xl p-4 space-y-1 shadow-inner">
                  <span className="text-[10px] font-extrabold text-primary uppercase tracking-wider block">
                    Công thức tính toán:
                  </span>
                  <div className="font-mono text-xs text-primary font-bold">
                    Tỷ lệ (%) = (Giá thuê / Thu nhập hàng tháng) * 100%
                  </div>
                </div>

                <div className="bg-success/5 border border-success/20 rounded-2xl p-4 space-y-1.5">
                  <span className="text-[10px] font-extrabold text-success uppercase tracking-wider block">
                    Ví dụ trực quan:
                  </span>
                  <p className="text-xs text-success/90 font-medium leading-relaxed font-body">
                    Ví dụ: Thu nhập của bạn là 50.000.000 đ/tháng. Giá thuê căn
                    hộ này là 18.000.000 đ/tháng, chiếm 36% thu nhập. Tỷ lệ này
                    nằm trong vùng CẢNH BÁO (31% - 45%), do đó hệ thống đề xuất
                    bạn nên cân đối cắt giảm bớt chi tiêu ăn uống hay giải trí
                    ngoài để đảm bảo an toàn tài chính.
                  </p>
                </div>

                <div className="space-y-2 pt-1">
                  <span className="text-[10px] font-extrabold text-muted-foreground uppercase tracking-wider block">
                    Mức phân loại khả năng:
                  </span>
                  <ul className="space-y-2 text-xs font-semibold text-fg-muted font-body pl-5 list-decimal leading-relaxed">
                    <li>
                      <span className="text-success font-bold">
                        An toàn (≤30%):
                      </span>{' '}
                      Rất tốt cho sức khỏe tài chính dài hạn.
                    </li>
                    <li>
                      <span className="text-warning font-bold">
                        Cần cân nhắc (31% - 45%):
                      </span>{' '}
                      Cần thắt chặt các chi tiêu không cần thiết khác để bù đắp.
                    </li>
                    <li>
                      <span className="text-danger font-bold">
                        Rủi ro cao (&gt;45%):
                      </span>{' '}
                      Mức cảnh báo nguy hiểm, dễ gặp căng thẳng tài chính nếu
                      mất nguồn thu.
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
