'use client'

import * as React from 'react'

interface CostBreakdownPanelProps {
  bookingDeposit: number
  escrowDeposit: number
  firstMonthRent: number
  totalInitial: number
  formatCurrency: (val: number) => string
  onExplain: (data: {
    title: string
    description: string
    formula?: string
    visualExample?: string
    steps?: string[]
  }) => void
}

export function CostBreakdownPanel({
  bookingDeposit,
  escrowDeposit,
  firstMonthRent,
  totalInitial,
  formatCurrency,
  onExplain,
}: CostBreakdownPanelProps): React.ReactElement {
  return (
    <div className="bg-white border border-border rounded-3xl p-6 md:p-8 shadow-sm space-y-4">
      <h3 className="font-marketing text-xl font-bold text-fg flex items-center justify-between gap-2">
        <div className="flex items-center gap-2 text-left">
          <span className="h-2.5 w-2.5 rounded-full bg-primary" />
          Phân bổ chi phí ban đầu khi ký hợp đồng
        </div>
        <button
          onClick={() =>
            onExplain({
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
      <p className="font-body text-sm text-muted-foreground font-medium leading-relaxed text-left">
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

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mt-2 text-left">
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

        <div className="w-full lg:w-auto lg:min-w-[240px] border-t lg:border-t-0 lg:border-l border-border pt-5 lg:pt-0 lg:pl-8 flex flex-col justify-center text-left">
          <span className="text-xs font-extrabold text-muted-foreground uppercase tracking-wider block">
            Tổng chi phí thanh toán ban đầu
          </span>
          <span className="text-3xl font-display font-black text-primary mt-1.5">
            {formatCurrency(totalInitial)}
          </span>
        </div>
      </div>
    </div>
  )
}
