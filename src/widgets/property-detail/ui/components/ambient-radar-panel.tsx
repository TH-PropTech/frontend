'use client'

import * as React from 'react'

interface AmbientRadarPanelProps {
  onExplain: (data: {
    title: string
    description: string
    formula?: string
    visualExample?: string
    steps?: string[]
  }) => void
}

export function AmbientRadarPanel({
  onExplain,
}: AmbientRadarPanelProps): React.ReactElement {
  return (
    <div className="bg-white border border-border rounded-3xl p-6 md:p-8 shadow-sm space-y-4">
      <h3 className="font-marketing text-xl font-bold text-fg flex items-center justify-between gap-2">
        <div className="flex items-center gap-2 text-left">
          <span className="h-2.5 w-2.5 rounded-full bg-primary" />
          Đánh giá môi trường sống (Living Ambient Radar)
        </div>
        <button
          onClick={() =>
            onExplain({
              title: 'Phương pháp đánh giá môi trường sống',
              description:
                'Chỉ số môi trường sống (Noise, Ventilation, Light...) phản ánh trực quan điều kiện sống của căn hộ dựa trên dữ liệu đo lường thực tế tại tòa nhà.',
              visualExample:
                'Ví dụ: Chỉ số "Yên tĩnh" đạt 90% nghĩa là độ ồn thực đo được tại ban công căn hộ chỉ khoảng 42 dB (tương đương tiếng thì thầm, rất lý tưởng để làm việc). Chỉ số "Ánh sáng" đạt 80% nhờ hướng ban công Đông Nam đón nắng sáng trực tiếp từ 6h00 đến 10h30 hàng ngày.',
              steps: [
                'Yên tĩnh: Đo bằng độ ồn trung bình (dB) thu được từ cảm biến môi trường nội khu.',
                'Ánh sáng & Gió: Tính từ hướng ban công, diện tích tiếp sáng và mật độ xây dựng.',
                'Tiện đi lại: Khoảng cách tiếp cận ga Metro, trạm xe bus và đường chính.',
                'Riêng tư: Khoảng cách giữa các căn hộ đối diện và mật độ cư dân trên mỗi sàn.',
              ],
            })
          }
          className="text-muted-foreground hover:text-primary transition-colors cursor-pointer p-1"
          title="Xem giải thích tiêu chí"
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
        Các chỉ số được đo lường thực tế dựa trên vị trí địa lý của căn hộ trong
        tòa nhà chung cư.
      </p>

      <div className="flex flex-col md:flex-row items-center gap-8 md:gap-12 border border-border rounded-2xl p-6 bg-surface-muted/20">
        <div className="w-48 h-48 shrink-0 flex items-center justify-center bg-white border border-border rounded-2xl p-3 shadow-sm">
          <svg viewBox="0 0 200 200" className="w-full h-full overflow-visible">
            <polygon
              points="100,20 176,75 147,165 53,165 24,75"
              fill="none"
              stroke="#C9B8AE"
              strokeWidth="0.75"
            />
            <polygon
              points="100,40 160,84 137,152 63,152 40,84"
              fill="none"
              stroke="#C9B8AE"
              strokeWidth="0.75"
            />
            <polygon
              points="100,60 145,93 128,139 72,139 55,93"
              fill="none"
              stroke="#C9B8AE"
              strokeWidth="0.75"
            />
            <polygon
              points="100,80 130,102 118,126 82,126 70,102"
              fill="none"
              stroke="#C9B8AE"
              strokeWidth="0.75"
            />

            <line
              x1="100"
              y1="100"
              x2="100"
              y2="20"
              stroke="#8E7A6E"
              strokeWidth="1"
            />
            <line
              x1="100"
              y1="100"
              x2="176"
              y2="75"
              stroke="#8E7A6E"
              strokeWidth="1"
            />
            <line
              x1="100"
              y1="100"
              x2="147"
              y2="165"
              stroke="#8E7A6E"
              strokeWidth="1"
            />
            <line
              x1="100"
              y1="100"
              x2="53"
              y2="165"
              stroke="#8E7A6E"
              strokeWidth="1"
            />
            <line
              x1="100"
              y1="100"
              x2="24"
              y2="75"
              stroke="#8E7A6E"
              strokeWidth="1"
            />

            <text
              x="100"
              y="11"
              fill="#4B3E36"
              className="font-body text-[11px] font-bold"
              textAnchor="middle"
            >
              Yên tĩnh
            </text>
            <text
              x="183"
              y="78"
              fill="#4B3E36"
              className="font-body text-[11px] font-bold"
            >
              Ánh sáng
            </text>
            <text
              x="151"
              y="179"
              fill="#4B3E36"
              className="font-body text-[11px] font-bold"
            >
              Thông gió
            </text>
            <text
              x="49"
              y="179"
              fill="#4B3E36"
              className="font-body text-[11px] font-bold"
              textAnchor="end"
            >
              Tiện đi lại
            </text>
            <text
              x="16"
              y="78"
              fill="#4B3E36"
              className="font-body text-[11px] font-bold"
              textAnchor="end"
            >
              Riêng tư
            </text>

            <polygon
              points="100,28 151.2,80 132,154.4 67.2,144.8 30.1,76.5"
              fill="rgba(198, 90, 58, 0.3)"
              stroke="#C65A3A"
              strokeWidth="2.5"
            />
          </svg>
        </div>

        <div className="flex-1 gap-4 flex flex-col w-full text-left">
          {[
            { label: 'Sự yên tĩnh (Quietness)', score: 90 },
            { label: 'Ánh sáng tự nhiên (Light)', score: 80 },
            { label: 'Độ thông gió (Ventilation)', score: 85 },
            { label: 'Tiện đi lại (Accessibility)', score: 70 },
            { label: 'Sự riêng tư (Privacy)', score: 92 },
          ].map((item, idx) => (
            <div key={idx} className="gap-2 flex flex-col">
              <div className="flex justify-between items-center text-sm font-bold text-fg">
                <span>{item.label}</span>
                <span className="text-primary text-sm font-extrabold">
                  {item.score}%
                </span>
              </div>
              <div className="h-2.5 w-full bg-white border border-border rounded-full overflow-hidden">
                <div
                  style={{ width: `${item.score}%` }}
                  className="h-full bg-primary"
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
