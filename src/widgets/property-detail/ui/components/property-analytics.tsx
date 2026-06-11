'use client'

import * as React from 'react'
import { createPortal } from 'react-dom'
import type { ApartmentItem } from '@/entities/properties'
import { RentCalculator } from './rent-calculator'
import { CommuteEstimator } from './commute-estimator'
import { PropertyComparison } from './property-comparison'

const formatCurrency = (val: number): string => {
  return val.toLocaleString('vi-VN') + ' đ'
}

interface PropertyAnalyticsProps {
  property: ApartmentItem
}

export function PropertyAnalytics({
  property,
}: PropertyAnalyticsProps): React.ReactElement {
  const price = property.priceNum ? property.priceNum * 1000000 : 18000000
  const bookingDeposit = price
  const escrowDeposit = price * 2
  const firstMonthRent = price
  const totalInitial = bookingDeposit + escrowDeposit + firstMonthRent

  const [explainData, setExplainData] = React.useState<{
    title: string
    description: string
    formula?: string
    visualExample?: string
    steps?: string[]
  } | null>(null)

  const [mounted, setMounted] = React.useState(false)
  React.useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setMounted(true)
  }, [])

  return (
    <div className="space-y-8">
      {/* 1. Price Historical Trends & Blockchain Ledger Trust Verification */}
      <div className="bg-white border border-border rounded-3xl p-6 md:p-8 shadow-sm grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Price Trend Line Chart */}
        <div className="space-y-4">
          <h3 className="font-marketing text-xl font-bold text-fg flex items-center justify-between gap-2">
            <div className="flex items-center gap-2">
              <span className="h-2.5 w-2.5 rounded-full bg-primary" />
              Biến động giá thuê 12 tháng qua
            </div>
            <button
              onClick={() =>
                setExplainData({
                  title: 'Công thức ghi chép biến động giá',
                  description:
                    'Dữ liệu lịch sử biến động giá của căn hộ và dự án được thu thập thực tế từ các hợp đồng thuê nhà đã được ký kết và mã hóa an toàn trên mạng lưới Blockchain.',
                  formula: 'P_tb = (1 / N) * Tổng(P_i)',
                  visualExample:
                    'Ví dụ: Căn hộ này có giá thuê hiện tại là 18.000.000 đ/tháng. Vào tháng 7/2025, giá thuê trung bình của căn hộ tương đương trong dự án là 19.500.000 đ/tháng. Biểu đồ đường màu đỏ thể hiện xu hướng giảm nhẹ 7.6% trong 12 tháng qua do biến động thị trường chung cư quận Bình Thạnh.',
                  steps: [
                    'Thu thập dữ liệu giá thuê thực tế đã khớp của căn hộ trong quá khứ.',
                    'Tổng hợp giá thuê trung bình của các căn cùng phân khúc trong cùng dự án.',
                    'Loại bỏ các giao dịch bất thường (outliers) để hiển thị xu hướng chuẩn xác.',
                  ],
                })
              }
              className="text-muted-foreground hover:text-primary transition-colors cursor-pointer p-1"
              title="Xem giải thích thuật toán"
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
            Dữ liệu giá thuê thực tế được đối chiếu từ các giao dịch thuê nhà đã
            ghi nhận trên chuỗi khối Blockchain.
          </p>

          <div className="relative border border-border rounded-2xl p-5 bg-surface-muted/20">
            <svg
              viewBox="0 0 400 220"
              className="w-full h-auto overflow-visible"
            >
              <line
                x1="40"
                y1="20"
                x2="380"
                y2="20"
                stroke="#C9B8AE"
                strokeWidth="0.75"
                strokeDasharray="3"
              />
              <line
                x1="40"
                y1="60"
                x2="380"
                y2="60"
                stroke="#C9B8AE"
                strokeWidth="0.75"
                strokeDasharray="3"
              />
              <line
                x1="40"
                y1="100"
                x2="380"
                y2="100"
                stroke="#C9B8AE"
                strokeWidth="0.75"
                strokeDasharray="3"
              />
              <line
                x1="40"
                y1="140"
                x2="380"
                y2="140"
                stroke="#C9B8AE"
                strokeWidth="0.75"
                strokeDasharray="3"
              />
              <line
                x1="40"
                y1="170"
                x2="380"
                y2="170"
                stroke="#8E7A6E"
                strokeWidth="1.25"
              />
              <line
                x1="40"
                y1="20"
                x2="40"
                y2="170"
                stroke="#8E7A6E"
                strokeWidth="1.25"
              />

              <text
                x="5"
                y="24"
                fill="#4B3E36"
                className="font-mono text-[11px] font-bold"
              >
                20Tr
              </text>
              <text
                x="5"
                y="64"
                fill="#4B3E36"
                className="font-mono text-[11px] font-bold"
              >
                18Tr
              </text>
              <text
                x="5"
                y="104"
                fill="#4B3E36"
                className="font-mono text-[11px] font-bold"
              >
                16Tr
              </text>
              <text
                x="5"
                y="144"
                fill="#4B3E36"
                className="font-mono text-[11px] font-bold"
              >
                14Tr
              </text>

              <text
                x="40"
                y="192"
                fill="#4B3E36"
                className="font-body text-[11px] font-bold text-center"
              >
                T7/25
              </text>
              <text
                x="125"
                y="192"
                fill="#4B3E36"
                className="font-body text-[11px] font-bold"
              >
                T10/25
              </text>
              <text
                x="210"
                y="192"
                fill="#4B3E36"
                className="font-body text-[11px] font-bold"
              >
                T1/26
              </text>
              <text
                x="295"
                y="192"
                fill="#4B3E36"
                className="font-body text-[11px] font-bold"
              >
                T4/26
              </text>
              <text
                x="360"
                y="192"
                fill="#4B3E36"
                className="font-body text-[11px] font-bold"
              >
                T7/26
              </text>

              <path
                d="M 40 130 Q 125 120 210 110 T 380 95"
                fill="none"
                stroke="#A49389"
                strokeWidth="2"
                strokeDasharray="4 2"
              />
              <path
                d="M 40 110 Q 125 105 210 90 T 380 75"
                fill="none"
                stroke="#F2B66D"
                strokeWidth="2.5"
              />
              <path
                d="M 40 95 Q 125 95 210 80 T 380 60"
                fill="none"
                stroke="#C65A3A"
                strokeWidth="3.5"
              />

              <circle
                cx="210"
                cy="80"
                r="5"
                className="fill-primary stroke-white stroke-2"
              />
              <circle
                cx="380"
                cy="60"
                r="5"
                className="fill-primary stroke-white stroke-2"
              />
            </svg>

            <div className="flex justify-center gap-5 mt-4 flex-wrap border-t border-border/40 pt-3">
              <div className="flex items-center gap-2">
                <span className="h-3 w-7 rounded bg-primary block" />
                <span className="font-body text-xs text-fg font-bold">
                  Căn hộ này
                </span>
              </div>
              <div className="flex items-center gap-2">
                <span className="h-3 w-7 rounded bg-accent block" />
                <span className="font-body text-xs text-fg font-bold">
                  Dự án trung bình
                </span>
              </div>
              <div className="flex items-center gap-2">
                <span className="h-3 w-7 rounded border border-dashed border-muted-foreground block" />
                <span className="font-body text-xs text-fg font-bold">
                  Khu vực lân cận
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Blockchain Trust Ledger Score */}
        <div className="space-y-4">
          <h3 className="font-marketing text-xl font-bold text-fg flex items-center justify-between gap-2">
            <div className="flex items-center gap-2">
              <span className="h-2.5 w-2.5 rounded-full bg-accent-2" />
              Điểm tin cậy & Xác thực Blockchain
            </div>
            <button
              onClick={() =>
                setExplainData({
                  title: 'Logic tính điểm tín nhiệm (Trust Score)',
                  description:
                    'Chỉ số tin cậy thể hiện mức độ an toàn pháp lý của căn hộ và độ uy tín của chủ nhà, được tính toán tự động dựa trên hợp đồng thông minh.',
                  formula:
                    'Score = (Tỷ_lệ_đúng_hạn * 0.5) + (Xác_thực_KYC * 0.3) + (Không_tranh_chấp * 0.2)',
                  visualExample:
                    'Ví dụ: Căn hộ Vinhomes Central Park này đạt 98 điểm (Mức rất an toàn) nhờ: Sổ hồng đã được mã hóa chuỗi khối (30đ), Danh tính chủ hộ (KYC) trùng khớp 100% với dữ liệu quốc gia (30đ), Lịch sử thanh toán & trả cọc 10 hợp đồng trước đây hoàn toàn đúng hạn (38đ).',
                  steps: [
                    'Xác thực danh tính chủ hộ (KYC) và kiểm tra tính hợp lệ của Sổ hồng căn hộ.',
                    'Đánh giá tỷ lệ thanh toán đúng hạn và lịch sử thực hiện nghĩa vụ qua ví Smart Contract.',
                    'Khấu trừ điểm nếu có tranh chấp hoặc hủy hợp đồng không đúng cam kết.',
                  ],
                })
              }
              className="text-muted-foreground hover:text-primary transition-colors cursor-pointer p-1"
              title="Xem giải thích điểm số"
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
            Hồ sơ pháp lý căn hộ và thông tin giao dịch đặt cọc giữ chỗ đã được
            xác thực mã hóa phi tập trung.
          </p>

          <div className="bg-surface-muted/30 border border-border rounded-2xl p-6 gap-6 flex flex-col justify-between min-h-[250px]">
            <div className="flex items-center justify-between">
              <div className="space-y-1">
                <span className="text-xs font-extrabold text-muted-foreground uppercase tracking-wider block">
                  Chỉ số Trust Score
                </span>
                <span className="text-4xl font-display font-black text-success">
                  98% Verified
                </span>
              </div>
              <div className="h-14 w-14 rounded-2xl bg-success-soft border border-success/30 items-center justify-center flex">
                <svg
                  className="h-7 w-7 text-success"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth="3"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M9 12.75 11.25 15 15 9.75M21 12c0 1.268-.63 2.39-1.593 3.068a3.745 3.745 0 0 1-1.043 3.296 3.745 3.745 0 0 1-3.296 1.043A3.745 3.745 0 0 1 12 21c-1.268 0-2.39-.63-3.068-1.593a3.746 3.746 0 0 1-3.296-1.043 3.745 3.745 0 0 1-1.043-3.296A3.745 3.745 0 0 1 3 12c0-1.268.63-2.39 1.593-3.068a3.745 3.745 0 0 1 1.043-3.296 3.746 3.746 0 0 1 3.296-1.043A3.746 3.746 0 0 1 12 3c1.268 0 2.39.63 3.068 1.593a3.746 3.746 0 0 1 3.296 1.043 3.746 3.746 0 0 1 1.043 3.296A3.745 3.745 0 0 1 21 12Z"
                  />
                </svg>
              </div>
            </div>

            <div className="space-y-3 border-t border-border pt-4">
              {[
                { label: 'Chủ hộ đã xác minh định danh (KYC Landlord)' },
                {
                  label: 'Sổ hồng căn hộ đã băm mã hóa trên sổ cái Blockchain',
                },
                { label: 'Hợp đồng liên kết Smart Contract ký quỹ tự động' },
              ].map((item, idx) => (
                <div
                  key={idx}
                  className="flex items-center gap-3 text-sm font-bold text-fg/90"
                >
                  <svg
                    className="h-5 w-5 text-success shrink-0"
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
                  <span>{item.label}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* 2. Living Ambient Radar */}
      <div className="bg-white border border-border rounded-3xl p-6 md:p-8 shadow-sm space-y-4">
        <h3 className="font-marketing text-xl font-bold text-fg flex items-center justify-between gap-2">
          <div className="flex items-center gap-2">
            <span className="h-2.5 w-2.5 rounded-full bg-primary" />
            Đánh giá môi trường sống (Living Ambient Radar)
          </div>
          <button
            onClick={() =>
              setExplainData({
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
        <p className="font-body text-sm text-muted-foreground font-medium leading-relaxed">
          Các chỉ số được đo lường thực tế dựa trên vị trí địa lý của căn hộ
          trong tòa nhà chung cư.
        </p>

        <div className="flex flex-col md:flex-row items-center gap-8 md:gap-12 border border-border rounded-2xl p-6 bg-surface-muted/20">
          <div className="w-48 h-48 shrink-0 flex items-center justify-center bg-white border border-border rounded-2xl p-3 shadow-sm">
            <svg
              viewBox="0 0 200 200"
              className="w-full h-full overflow-visible"
            >
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

          <div className="flex-1 gap-4 flex flex-col w-full">
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

      {/* 3. Energy Efficiency Rating */}
      <div className="bg-white border border-border rounded-3xl p-6 md:p-8 shadow-sm space-y-4">
        <h3 className="font-marketing text-xl font-bold text-fg flex items-center justify-between gap-2">
          <div className="flex items-center gap-2">
            <span className="h-2.5 w-2.5 rounded-full bg-primary" />
            Nhãn hiệu suất năng lượng căn hộ
          </div>
          <button
            onClick={() =>
              setExplainData({
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
        <p className="font-body text-sm text-muted-foreground font-medium leading-relaxed">
          Ước tính hiệu quả sử dụng năng lượng và chi phí phụ sinh hoạt trung
          bình mỗi tháng.
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

          <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
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

      {/* 4. Cost Breakdown */}
      <div className="bg-white border border-border rounded-3xl p-6 md:p-8 shadow-sm space-y-4">
        <h3 className="font-marketing text-xl font-bold text-fg flex items-center justify-between gap-2">
          <div className="flex items-center gap-2">
            <span className="h-2.5 w-2.5 rounded-full bg-primary" />
            Phân bổ chi phí ban đầu khi ký hợp đồng
          </div>
          <button
            onClick={() =>
              setExplainData({
                title: 'Cơ chế ký quỹ chi phí ban đầu (Escrow Logic)',
                description:
                  'Khoản tiền ký quỹ và đặt cọc được đảm bảo an toàn bằng Smart Contract tự động, giảm thiểu rủi ro bùng cọc hoặc tranh chấp.',
                visualExample:
                  'Ví dụ: Với căn hộ giá thuê 18.000.000 đ/tháng: Cọc giữ chỗ (Booking - 25% = 18Tr) chuyển trước để khóa tin; Cọc ký quỹ (Escrow - 50% = 36Tr) giữ trên Smart Contract hoàn trả khi hết hợp đồng; Thuê tháng đầu (25% = 18Tr) chuyển cho chủ nhà khi nhận bàn giao nhà. Tổng thanh toán ban đầu: 72.000.000 đ.',
                steps: [
                  'Cọc giữ chỗ (Booking - 25%): Chuyển vào Smart Contract để khóa căn hộ, tránh chủ nhà cho thuê bên thứ ba.',
                  'Ký quỹ (Escrow - 50%): Khoản tiền bảo đảm (tương đương 2 tháng tiền thuê) được khóa trên ví Multisig của Smart Contract, tự động hoàn trả khi thanh lý hợp đồng.',
                  'Tiền thuê tháng đầu (25%): Tự động mở khóa giải ngân cho chủ nhà khi khách ký biên bản nhận bàn giao nhà thành công.',
                ],
              })
            }
            className="text-muted-foreground hover:text-primary transition-colors cursor-pointer p-1"
            title="Xem giải thích cơ chế ký quỹ"
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
          Biểu đồ phân bổ nguồn tiền cần chuẩn bị ban đầu bao gồm các khoản cọc
          ký quỹ (Escrow) được hoàn trả khi chấm dứt hợp đồng.
        </p>

        <div className="border border-border rounded-2xl p-6 bg-surface-muted/20 gap-6 flex flex-col lg:flex-row items-center">
          <div className="w-full lg:flex-1 gap-5 flex flex-col">
            <div className="h-6 w-full rounded-full border border-border bg-white overflow-hidden flex shadow-inner">
              <div style={{ width: '25%' }} className="h-full bg-warning" />
              <div style={{ width: '50%' }} className="h-full bg-primary" />
              <div style={{ width: '25%' }} className="h-full bg-success" />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mt-2">
              <div className="flex items-center gap-3 bg-white border border-border/60 rounded-2xl p-3.5 shadow-sm">
                <span className="h-3.5 w-3.5 rounded-full bg-warning shrink-0" />
                <div className="flex-1 min-w-0">
                  <span className="font-body text-[11px] font-bold text-muted-foreground block uppercase truncate">
                    Cọc giữ chỗ (Booking)
                  </span>
                  <span className="font-mono text-sm text-fg font-extrabold block mt-0.5">
                    {formatCurrency(bookingDeposit)} (25%)
                  </span>
                </div>
              </div>

              <div className="flex items-center gap-3 bg-white border border-border/60 rounded-2xl p-3.5 shadow-sm">
                <span className="h-3.5 w-3.5 rounded-full bg-primary shrink-0" />
                <div className="flex-1 min-w-0">
                  <span className="font-body text-[11px] font-bold text-muted-foreground block uppercase truncate">
                    Ký quỹ (Escrow)
                  </span>
                  <span className="font-mono text-sm text-fg font-extrabold block mt-0.5">
                    {formatCurrency(escrowDeposit)} (50%)
                  </span>
                </div>
              </div>

              <div className="flex items-center gap-3 bg-white border border-border/60 rounded-2xl p-3.5 shadow-sm">
                <span className="h-3.5 w-3.5 rounded-full bg-success shrink-0" />
                <div className="flex-1 min-w-0">
                  <span className="font-body text-[11px] font-bold text-muted-foreground block uppercase truncate">
                    Thuê tháng đầu
                  </span>
                  <span className="font-mono text-sm text-fg font-extrabold block mt-0.5">
                    {formatCurrency(firstMonthRent)} (25%)
                  </span>
                </div>
              </div>
            </div>
          </div>

          <div className="w-full lg:w-auto lg:min-w-[240px] border-t lg:border-t-0 lg:border-l border-border pt-5 lg:pt-0 lg:pl-8 flex flex-col justify-center">
            <span className="text-xs font-extrabold text-muted-foreground uppercase tracking-wider block">
              Tổng chi phí thanh toán ban đầu
            </span>
            <span className="text-3xl font-display font-black text-primary mt-1.5">
              {formatCurrency(totalInitial)}
            </span>
          </div>
        </div>
      </div>

      {/* 5. Rent Affordability Calculator */}
      <RentCalculator price={price} />

      {/* 6. Commute & Transit Estimator */}
      <CommuteEstimator />

      {/* 7. Quick Comparison Matrix */}
      <PropertyComparison property={property} />

      {/* Logic Explanation Modal */}
      {mounted &&
        explainData &&
        typeof window !== 'undefined' &&
        createPortal(
          <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/60 backdrop-blur-md p-4 transition-all duration-300">
            <div className="bg-white border border-border rounded-3xl max-w-lg w-full p-6 md:p-8 shadow-2xl relative space-y-5 animate-scale-up border-primary/20">
              <h4 className="font-marketing text-lg md:text-xl font-bold text-fg flex items-center gap-2 border-b border-border pb-3.5">
                <span className="h-2.5 w-2.5 rounded-full bg-primary animate-pulse" />
                {explainData.title}
              </h4>

              <div className="space-y-4 max-h-[70vh] overflow-y-auto pr-1">
                <div className="space-y-1.5">
                  <span className="text-[10px] font-extrabold text-muted-foreground uppercase tracking-wider block">
                    Nguyên lý hoạt động:
                  </span>
                  <p className="text-xs text-fg-muted font-body leading-relaxed font-semibold">
                    {explainData.description}
                  </p>
                </div>

                {explainData.formula && (
                  <div className="bg-surface-muted border border-border/80 rounded-2xl p-4 space-y-1 shadow-inner">
                    <span className="text-[10px] font-extrabold text-primary uppercase tracking-wider block">
                      Công thức tính toán:
                    </span>
                    <div className="font-mono text-xs text-primary font-bold">
                      {explainData.formula}
                    </div>
                  </div>
                )}

                {explainData.visualExample && (
                  <div className="bg-success/5 border border-success/20 rounded-2xl p-4 space-y-1.5">
                    <span className="text-[10px] font-extrabold text-success uppercase tracking-wider block">
                      Ví dụ trực quan:
                    </span>
                    <p className="text-xs text-success/90 font-medium leading-relaxed font-body">
                      {explainData.visualExample}
                    </p>
                  </div>
                )}

                {explainData.steps && (
                  <div className="space-y-2 pt-1">
                    <span className="text-[10px] font-extrabold text-muted-foreground uppercase tracking-wider block">
                      Các bước xử lý hệ thống:
                    </span>
                    <ul className="space-y-2 text-xs font-semibold text-fg-muted font-body pl-5 list-decimal leading-relaxed">
                      {explainData.steps.map((step, idx) => (
                        <li
                          key={idx}
                          className="marker:text-primary marker:font-bold"
                        >
                          {step}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>

              <div className="flex justify-end pt-3 border-t border-border/60">
                <button
                  onClick={() => setExplainData(null)}
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
