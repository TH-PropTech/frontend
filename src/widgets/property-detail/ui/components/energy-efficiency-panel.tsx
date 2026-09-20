'use client'

import * as React from 'react'

interface EnergyEfficiencyPanelProps {
  onExplain: (data: {
    title: string
    description: string
    formula?: string
    visualExample?: string
    steps?: string[]
  }) => void
}

export function EnergyEfficiencyPanel({
  onExplain,
}: EnergyEfficiencyPanelProps): React.ReactElement {
  return (
    <div className="bg-white border border-border rounded-3xl p-4 md:p-5 shadow-sm space-y-4">
      <h3 className="font-marketing text-xl font-bold text-fg flex items-center justify-between gap-2">
        <div className="flex items-center gap-2 text-left">
          <span className="h-2.5 w-2.5 rounded-full bg-primary" />
          Nhãn hiệu suất năng lượng căn hộ
        </div>
        <button
          onClick={() =>
            onExplain({
              title: 'Thuật toán tính nhãn năng lượng và chi phí',
              description:
                'Phân hạng hiệu suất năng lượng (A đến E) giúp dự đoán lượng điện năng tiêu thụ và chi phí tiện ích đi kèm khi sinh sống tại căn hộ.',
              formula:
                'Cost_tiện_ích = Điện_bình_quân + Nước_bình_quân + Phí_quản_lý + Internet',
              visualExample:
                'Ví dụ: Căn hộ được gắn nhãn hạng A (Tiết kiệm nhất). Nhờ hệ thống kính Low-E cản nhiệt tốt và 3 điều hòa Inverter thế hệ mới, hóa đơn điện dự kiến chỉ là 820.000 đ/tháng thay vì 1.450.000 đ/tháng ở các căn hộ thông thường hạng C.',
              steps: [
                'Hạng A: Căn hộ sử dụng thiết bị đạt chuẩn Inverter tiết kiệm điện, cách nhiệt tốt.',
                'Điện sinh hoạt: Ước tính từ công suất định mức của điều hòa, tủ lạnh, thiết bị bếp.',
                'Phí quản lý: Biểu phí hành chính thu bởi Ban quản lý tòa nhà tính trên diện tích căn hộ.',
              ],
            })
          }
          className="text-muted-foreground hover:text-primary transition-colors cursor-pointer p-1"
          title="Xem giải thích nhãn năng lượng"
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
      <p className="font-body text-sm text-muted-foreground font-medium leading-relaxed text-left">
        Ước tính hiệu quả sử dụng năng lượng và chi phí phụ sinh hoạt trung bình
        mỗi tháng.
      </p>

      <div className="border border-border rounded-2xl p-6 bg-surface-muted/20 grid grid-cols-1 lg:grid-cols-12 gap-6">
        <div className="lg:col-span-5 flex flex-col justify-center">
          <div className="flex items-center gap-2 bg-white border border-border p-3 rounded-2xl justify-between shadow-sm">
            {[
              {
                level: 'A',
                desc: 'Tiết kiệm',
                color: 'bg-success text-white border-success',
              },
              {
                level: 'B',
                desc: 'Tốt',
                color: 'border-border text-muted-foreground font-semibold',
              },
              {
                level: 'C',
                desc: 'Trung bình',
                color: 'border-border text-muted-foreground font-semibold',
              },
              {
                level: 'D',
                desc: 'Tiêu hao',
                color: 'border-border text-muted-foreground font-semibold',
              },
              {
                level: 'E',
                desc: 'Lãng phí',
                color: 'border-border text-muted-foreground font-semibold',
              },
            ].map((item, idx) => (
              <div
                key={idx}
                className={`flex-1 py-3 rounded-xl border flex flex-col items-center gap-1.5 shadow-sm transition-all ${
                  item.level === 'A'
                    ? item.color
                    : 'bg-white border-border hover:bg-surface-muted/10'
                }`}
              >
                <span
                  className={`font-display font-extrabold text-lg ${item.level === 'A' ? 'text-white' : 'text-fg'}`}
                >
                  {item.level}
                </span>
                <span
                  className={`text-[10px] font-bold ${item.level === 'A' ? 'text-white/95' : 'text-muted-foreground'}`}
                >
                  {item.desc}
                </span>
              </div>
            ))}
          </div>
        </div>

        <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm text-left">
          <div className="p-4 border border-border bg-white rounded-xl flex flex-col gap-1.5 shadow-sm">
            <span className="text-xs font-extrabold text-muted-foreground uppercase block">
              Điện sinh hoạt (Bình quân)
            </span>
            <span className="font-extrabold text-base text-fg">
              820.000 đ/tháng
            </span>
          </div>
          <div className="p-4 border border-border bg-white rounded-xl flex flex-col gap-1.5 shadow-sm">
            <span className="text-xs font-extrabold text-muted-foreground uppercase block">
              Nước sinh hoạt (Bình quân)
            </span>
            <span className="font-extrabold text-base text-fg">
              145.000 đ/tháng
            </span>
          </div>
          <div className="p-4 border border-border bg-white rounded-xl flex flex-col gap-1.5 shadow-sm">
            <span className="text-xs font-extrabold text-muted-foreground uppercase block">
              Phí quản lý tòa nhà
            </span>
            <span className="font-extrabold text-base text-fg">
              950.000 đ/tháng
            </span>
          </div>
          <div className="p-4 border border-border bg-white rounded-xl flex flex-col gap-1.5 shadow-sm">
            <span className="text-xs font-extrabold text-muted-foreground uppercase block">
              Mạng Internet & Truyền hình
            </span>
            <span className="font-extrabold text-base text-fg">
              250.000 đ/tháng
            </span>
          </div>
        </div>
      </div>
    </div>
  )
}
