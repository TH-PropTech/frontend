'use client'

import * as React from 'react'
import type { ApartmentItem } from '@/entities/properties'

interface PriceTrendPanelProps {
  property: ApartmentItem
  onExplain: (data: {
    title: string
    description: string
    formula?: string
    visualExample?: string
    steps?: string[]
  }) => void
}

export function PriceTrendPanel({
  onExplain,
}: PriceTrendPanelProps): React.ReactElement {
  return (
    <div className="bg-white border border-border rounded-3xl p-6 md:p-8 shadow-sm grid grid-cols-1 lg:grid-cols-2 gap-8">
      {/* Price Trend Line Chart */}
      <div className="space-y-4">
        <h3 className="font-marketing text-xl font-bold text-fg flex items-center justify-between gap-2">
          <div className="flex items-center gap-2 text-left">
            <span className="h-2.5 w-2.5 rounded-full bg-primary" />
            Biến động giá thuê 12 tháng qua
          </div>
          <button
            onClick={() =>
              onExplain({
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
        <p className="font-body text-sm text-muted-foreground font-medium leading-relaxed text-left">
          Dữ liệu giá thuê thực tế được đối chiếu từ các giao dịch thuê nhà đã
          ghi nhận trên chuỗi khối Blockchain.
        </p>

        <div className="relative border border-border rounded-2xl p-5 bg-surface-muted/20">
          <svg viewBox="0 0 400 220" className="w-full h-auto overflow-visible">
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
          <div className="flex items-center gap-2 text-left">
            <span className="h-2.5 w-2.5 rounded-full bg-accent-2" />
            Điểm tin cậy & Xác thực Blockchain
          </div>
          <button
            onClick={() =>
              onExplain({
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
        <p className="font-body text-sm text-muted-foreground font-medium leading-relaxed text-left">
          Hồ sơ pháp lý căn hộ và thông tin giao dịch đặt cọc giữ chỗ đã được
          xác thực mã hóa phi tập trung.
        </p>

        <div className="bg-surface-muted/30 border border-border rounded-2xl p-6 gap-6 flex flex-col justify-between min-h-[250px]">
          <div className="flex items-center justify-between">
            <div className="space-y-1 text-left">
              <span className="text-xs font-extrabold text-muted-foreground uppercase tracking-wider block">
                Chỉ số Trust Score
              </span>
              <span className="text-4xl font-display font-black text-success">
                98% Điểm Tín nhiệm
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

          <div className="space-y-3 border-t border-border pt-4 text-left">
            {[
              { label: 'Chủ hộ đã xác minh định danh (KYC Landlord)' },
              {
                label: 'Sổ hồng căn hộ đã băm mã hóa trên hệ thống Blockchain',
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
  )
}
