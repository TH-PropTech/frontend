'use client'

import * as React from 'react'

interface StatCardProps {
  title: string
  value: string | number
  subtext: string
  trend?: {
    value: string
    type: 'up' | 'down' | 'neutral'
  }
  icon: React.ReactNode
}

function StatCard({ title, value, subtext, trend, icon }: StatCardProps): React.ReactElement {
  return (
    <div className="bg-surface border border-line rounded-xl p-5 shadow-sm hover:translate-y-[-2px] hover:shadow-md transition-all duration-300">
      <div className="flex items-center justify-between">
        <span className="text-xs font-semibold text-muted tracking-wide uppercase font-body">
          {title}
        </span>
        <div className="p-2 bg-primary/5 text-primary rounded-lg">{icon}</div>
      </div>
      <div className="mt-4 flex items-baseline gap-2">
        <span className="text-2xl font-bold text-fg font-display">{value}</span>
        {trend && (
          <span
            className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
              trend.type === 'up'
                ? 'bg-accent-2/10 text-accent-2'
                : trend.type === 'down'
                  ? 'bg-accent/10 text-accent'
                  : 'bg-muted/10 text-muted'
            }`}
          >
            {trend.value}
          </span>
        )}
      </div>
      <p className="mt-1 text-xs text-subtle font-body">{subtext}</p>
    </div>
  )
}

export function OverviewView(): React.ReactElement {
  // Chart interaction states
  const [hoveredPoint, setHoveredPoint] = React.useState<number | null>(null)
  const [hoveredBar, setHoveredBar] = React.useState<number | null>(null)

  const lineChartData = [
    { label: 'T2', value: '1.20 ETH', x: 40, y: 140, details: '12 giao dịch' },
    { label: 'T3', value: '1.80 ETH', x: 110, y: 120, details: '18 giao dịch' },
    { label: 'T4', value: '1.50 ETH', x: 180, y: 130, details: '15 giao dịch' },
    { label: 'T5', value: '2.90 ETH', x: 250, y: 90, details: '24 giao dịch' },
    { label: 'T6', value: '3.40 ETH', x: 320, y: 75, details: '30 giao dịch' },
    { label: 'T7', value: '4.50 ETH', x: 390, y: 45, details: '41 giao dịch' },
    { label: 'CN', value: '4.85 ETH', x: 460, y: 35, details: '48 giao dịch' },
  ]

  const barChartData = [
    { hour: '04h', transactions: 12, height: 35 },
    { hour: '08h', transactions: 24, height: 70 },
    { hour: '12h', transactions: 32, height: 95 },
    { hour: '16h', transactions: 18, height: 55 },
    { hour: '20h', transactions: 29, height: 85 },
    { hour: '24h', transactions: 15, height: 45 },
  ]

  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-300">
      {/* Welcome banner with Sticker */}
      <div className="bg-surface border border-line rounded-2xl p-6 flex flex-col md:flex-row justify-between items-start md:items-center gap-6 relative overflow-hidden shadow-sm">
        <div className="flex items-center gap-4 relative z-10">
          {/* Custom Blockchain Network Sticker (aligned to warm brand colors) */}
          <svg
            width="56"
            height="56"
            viewBox="0 0 64 64"
            fill="none"
            className="shrink-0 drop-shadow-[0_4px_10px_rgba(198,90,58,0.12)]"
          >
            <rect
              x="4"
              y="4"
              width="56"
              height="56"
              rx="14"
              fill="#ffffff"
              stroke="#c65a3a"
              strokeWidth="2"
            />
            <rect
              x="7"
              y="7"
              width="50"
              height="50"
              rx="11"
              fill="url(#sticker-bg)"
            />
            {/* Grid matrix lines */}
            <line
              x1="20"
              y1="20"
              x2="44"
              y2="44"
              stroke="#c65a3a"
              strokeWidth="1.5"
              strokeOpacity="0.15"
              strokeDasharray="3,3"
            />
            <line
              x1="44"
              y1="20"
              x2="20"
              y2="44"
              stroke="#c65a3a"
              strokeWidth="1.5"
              strokeOpacity="0.15"
              strokeDasharray="3,3"
            />
            {/* Blockchain nodes */}
            <circle cx="20" cy="20" r="4" fill="#f2b66d" />
            <circle cx="44" cy="20" r="4" fill="#6b8e4e" />
            <circle cx="20" cy="44" r="4" fill="#e37253" />
            <circle cx="44" cy="44" r="4" fill="#c79354" />
            {/* Core active node with brand ping */}
            <circle
              cx="32"
              cy="32"
              r="8"
              fill="#c65a3a"
              fillOpacity="0.2"
              className="animate-ping"
              style={{ animationDuration: '2.5s' }}
            />
            <circle
              cx="32"
              cy="32"
              r="5"
              fill="#ffffff"
              stroke="#c65a3a"
              strokeWidth="1.5"
            />
            <circle cx="32" cy="32" r="2.5" fill="#c65a3a" />
            <defs>
              <linearGradient id="sticker-bg" x1="0" y1="0" x2="1" y2="1">
                <stop offset="0%" stopColor="#fffcf9" />
                <stop offset="100%" stopColor="#fbeae3" />
              </linearGradient>
            </defs>
          </svg>

          <div>
            <h2 className="text-lg font-bold text-fg font-marketing">
              Chào ngày làm việc mới, culi vận hành!
            </h2>
            <p className="text-xs text-muted mt-1">
              Hệ thống phân tích dữ liệu và giám sát mạng lưới giao dịch
              TH-PropTech thời gian thực.
            </p>
          </div>
        </div>
        <div className="flex gap-2 relative z-10 shrink-0">
          <span className="text-xs font-semibold bg-accent-2/10 text-accent-2 px-3 py-2 rounded-lg border border-accent-2/20">
            Node Blockchain: Hoạt động (99.8% uptime)
          </span>
        </div>
      </div>

      {/* ═══════════════════════════════════════
         DETAILED STATISTICS SECTION (8 Cards)
         ═══════════════════════════════════════ */}
      <div className="space-y-3">
        <h3 className="text-xs font-bold text-muted font-body uppercase tracking-wider">
          Thông số Hoạt động Vận hành
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <StatCard
            title="Tin đăng chờ duyệt"
            value="12 căn"
            subtext="6 tin mới gửi trong 3 giờ qua"
            trend={{ value: '+25%', type: 'up' }}
            icon={
              <svg
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
              >
                <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
                <polyline points="9 22 9 12 15 12 15 22" />
              </svg>
            }
          />
          <StatCard
            title="KYC chờ đối soát"
            value="28 hồ sơ"
            subtext="Thời gian chờ trung bình: 14 phút"
            trend={{ value: '+12%', type: 'up' }}
            icon={
              <svg
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
              >
                <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                <polyline points="14 2 14 8 20 8" />
                <line x1="16" y1="13" x2="8" y2="13" />
                <line x1="16" y1="17" x2="8" y2="17" />
              </svg>
            }
          />
          <StatCard
            title="Tranh chấp cọc"
            value="3 vụ việc"
            subtext="Cần culi phán quyết khẩn cấp"
            trend={{ value: 'Yêu cầu xử lý', type: 'down' }}
            icon={
              <svg
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
              >
                <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
              </svg>
            }
          />
          <StatCard
            title="Lịch hẹn hôm nay"
            value="14 cuộc"
            subtext="Gồm 8 lịch xem nhà trực tiếp"
            trend={{ value: 'Bình thường', type: 'neutral' }}
            icon={
              <svg
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
              >
                <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
                <line x1="16" y1="2" x2="16" y2="6" />
                <line x1="8" y1="2" x2="8" y2="6" />
                <line x1="3" y1="10" x2="21" y2="10" />
              </svg>
            }
          />
        </div>
      </div>

      <div className="space-y-3">
        <h3 className="text-xs font-bold text-muted font-body uppercase tracking-wider">
          Số liệu Blockchain & Mạng lưới
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <StatCard
            title="Tổng quỹ cọc Escrow"
            value="4.85 ETH"
            subtext="~365,000,000 VND đang bị khóa"
            trend={{ value: 'Tăng trưởng', type: 'up' }}
            icon={
              <svg
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
              >
                <rect x="2" y="5" width="20" height="14" rx="2" ry="2" />
                <line x1="2" y1="10" x2="22" y2="10" />
              </svg>
            }
          />
          <StatCard
            title="Smart Contracts"
            value="142 Hợp đồng"
            subtext="Đã biên dịch và triển khai thành công"
            trend={{ value: '100% Khớp', type: 'neutral' }}
            icon={
              <svg
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
              >
                <polyline points="16 18 22 12 16 6" />
                <polyline points="8 6 2 12 8 18" />
              </svg>
            }
          />
          <StatCard
            title="Gas Fee trung bình"
            value="12.5 Gwei"
            subtext="Phí gas mạng lưới đang rất rẻ"
            trend={{ value: 'Tốt', type: 'up' }}
            icon={
              <svg
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
              >
                <path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
              </svg>
            }
          />
          <StatCard
            title="Độ trễ Node Ping"
            value="42 ms"
            subtext="Thời gian phản hồi với cổng RPC"
            trend={{ value: 'Rất nhanh', type: 'up' }}
            icon={
              <svg
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
              >
                <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" />
              </svg>
            }
          />
        </div>
      </div>

      {/* ═══════════════════════════════════════
         ANALYTICS CHARTS ROW (3 Charts)
         ═══════════════════════════════════════ */}
      <div className="grid grid-cols-1 xl:grid-cols-12 gap-6">
        {/* Left: Escrow Deposit Line Chart */}
        <div className="xl:col-span-5 bg-surface border border-line rounded-xl p-5 shadow-sm flex flex-col justify-between">
          <div>
            <div className="flex justify-between items-center">
              <h4 className="text-xs font-bold text-fg font-body uppercase tracking-wider">
                Xu hướng Quỹ cọc Escrow
              </h4>
              <span className="text-[9px] font-bold text-accent-2 bg-accent-2/10 px-2 py-0.5 rounded border border-accent-2/20">
                +304.2%
              </span>
            </div>
            <p className="text-[11px] text-muted mt-1">
              Tổng tích lũy cọc ký quỹ qua Smart Contract.
            </p>
          </div>

          <div className="relative mt-4 min-h-[160px] flex items-center justify-center">
            <svg
              className="w-full h-full max-h-[160px]"
              viewBox="0 0 500 180"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <defs>
                <linearGradient id="escrow-grad" x1="0" y1="0" x2="0" y2="1">
                  <stop
                    offset="0%"
                    stopColor="var(--primary)"
                    stopOpacity="0.25"
                  />
                  <stop
                    offset="100%"
                    stopColor="var(--primary)"
                    stopOpacity="0.00"
                  />
                </linearGradient>
              </defs>
              <line
                x1="40"
                y1="35"
                x2="460"
                y2="35"
                stroke="var(--line)"
                strokeWidth="0.5"
                strokeDasharray="4,4"
              />
              <line
                x1="40"
                y1="85"
                x2="460"
                y2="85"
                stroke="var(--line)"
                strokeWidth="0.5"
                strokeDasharray="4,4"
              />
              <line
                x1="40"
                y1="140"
                x2="460"
                y2="140"
                stroke="var(--line)"
                strokeWidth="1"
              />

              <text
                x="30"
                y="40"
                fill="var(--muted)"
                fontSize="8"
                textAnchor="end"
              >
                5.0 ETH
              </text>
              <text
                x="30"
                y="90"
                fill="var(--muted)"
                fontSize="8"
                textAnchor="end"
              >
                2.5 ETH
              </text>
              <text
                x="30"
                y="143"
                fill="var(--muted)"
                fontSize="8"
                textAnchor="end"
              >
                0 ETH
              </text>

              <path
                d="M 40,140 L 40,140 L 110,120 L 180,130 L 250,90 L 320,75 L 390,45 L 460,35 L 460,140 Z"
                fill="url(#escrow-grad)"
              />
              <path
                d="M 40,140 L 110,120 L 180,130 L 250,90 L 320,75 L 390,45 L 460,35"
                stroke="var(--primary)"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />

              {hoveredPoint !== null && lineChartData[hoveredPoint] && (
                <line
                  x1={lineChartData[hoveredPoint].x}
                  y1="20"
                  x2={lineChartData[hoveredPoint].x}
                  y2="140"
                  stroke="var(--primary)"
                  strokeWidth="1.2"
                  strokeDasharray="2,2"
                />
              )}

              {lineChartData.map((pt, idx) => (
                <g
                  key={idx}
                  className="cursor-pointer"
                  onMouseEnter={() => setHoveredPoint(idx)}
                  onMouseLeave={() => setHoveredPoint(null)}
                >
                  <circle cx={pt.x} cy={pt.y} r="10" fill="transparent" />
                  <circle
                    cx={pt.x}
                    cy={pt.y}
                    r={hoveredPoint === idx ? '5' : '3.5'}
                    fill={
                      hoveredPoint === idx ? 'var(--primary)' : 'var(--surface)'
                    }
                    stroke="var(--primary)"
                    strokeWidth="2"
                  />
                </g>
              ))}

              {lineChartData.map((pt, idx) => (
                <text
                  key={idx}
                  x={pt.x}
                  y="156"
                  fill={
                    hoveredPoint === idx ? 'var(--primary)' : 'var(--muted)'
                  }
                  fontSize="9"
                  fontWeight={hoveredPoint === idx ? 'bold' : 'normal'}
                  textAnchor="middle"
                >
                  {pt.label}
                </text>
              ))}

              {hoveredPoint !== null && lineChartData[hoveredPoint] && (
                <g
                  transform={`translate(${lineChartData[hoveredPoint].x > 250 ? lineChartData[hoveredPoint].x - 105 : lineChartData[hoveredPoint].x + 10}, ${lineChartData[hoveredPoint].y - 30})`}
                >
                  <rect
                    width="95"
                    height="40"
                    rx="6"
                    fill="var(--surface)"
                    stroke="var(--line)"
                    strokeWidth="1"
                    filter="drop-shadow(0 2px 4px rgba(0,0,0,0.05))"
                  />
                  <text
                    x="8"
                    y="15"
                    fill="var(--muted)"
                    fontSize="8"
                    fontWeight="bold"
                  >
                    {lineChartData[hoveredPoint].label} (Tích lũy)
                  </text>
                  <text
                    x="8"
                    y="25"
                    fill="var(--fg)"
                    fontSize="10"
                    fontWeight="bold"
                  >
                    {lineChartData[hoveredPoint].value}
                  </text>
                  <text
                    x="8"
                    y="33"
                    fill="var(--primary)"
                    fontSize="7"
                    fontWeight="semibold"
                  >
                    {lineChartData[hoveredPoint].details}
                  </text>
                </g>
              )}
            </svg>
          </div>
        </div>

        {/* Center: System Load Bar Chart */}
        <div className="xl:col-span-4 bg-surface border border-line rounded-xl p-5 shadow-sm flex flex-col justify-between">
          <div>
            <div className="flex justify-between items-center">
              <h4 className="text-xs font-bold text-fg font-body uppercase tracking-wider">
                Tải lượng & Giao dịch mạng
              </h4>
              <span className="text-[9px] font-bold text-muted bg-fg/5 px-2 py-0.5 rounded border border-line">
                24 giờ qua
              </span>
            </div>
            <p className="text-[11px] text-muted mt-1">
              Cường độ giao dịch qua Smart Contract theo giờ.
            </p>
          </div>

          <div className="relative mt-4 min-h-[160px] flex items-center justify-center">
            <svg
              className="w-full h-full max-h-[160px]"
              viewBox="0 0 320 180"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <defs>
                <linearGradient id="bar-grad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="var(--primary)" />
                  <stop offset="100%" stopColor="#e37253" />
                </linearGradient>
              </defs>
              <line
                x1="30"
                y1="35"
                x2="290"
                y2="35"
                stroke="var(--line)"
                strokeWidth="0.5"
                strokeDasharray="4,4"
              />
              <line
                x1="30"
                y1="85"
                x2="290"
                y2="85"
                stroke="var(--line)"
                strokeWidth="0.5"
                strokeDasharray="4,4"
              />
              <line
                x1="30"
                y1="135"
                x2="290"
                y2="135"
                stroke="var(--line)"
                strokeWidth="1"
              />

              {/* Bars rendering */}
              {barChartData.map((bar, idx) => {
                const barWidth = 22
                const gap = 20
                const startX = 40 + idx * (barWidth + gap)
                const y = 135 - bar.height
                return (
                  <g
                    key={idx}
                    className="cursor-pointer"
                    onMouseEnter={() => setHoveredBar(idx)}
                    onMouseLeave={() => setHoveredBar(null)}
                  >
                    {/* Background hover guide path */}
                    {hoveredBar === idx && (
                      <rect
                        x={startX - 4}
                        y="20"
                        width={barWidth + 8}
                        height="115"
                        fill="var(--fg)"
                        fillOpacity="0.03"
                        rx="4"
                      />
                    )}
                    {/* The bar */}
                    <rect
                      x={startX}
                      y={y}
                      width={barWidth}
                      height={bar.height}
                      fill="url(#bar-grad)"
                      fillOpacity={hoveredBar === idx ? '1' : '0.8'}
                      rx="3"
                      className="transition-all duration-200"
                    />
                    {/* x-axis Label */}
                    <text
                      x={startX + barWidth / 2}
                      y="152"
                      fill={
                        hoveredBar === idx ? 'var(--primary)' : 'var(--muted)'
                      }
                      fontSize="9"
                      fontWeight={hoveredBar === idx ? 'bold' : 'normal'}
                      textAnchor="middle"
                    >
                      {bar.hour}
                    </text>
                  </g>
                )
              })}

              {/* Tooltip */}
              {hoveredBar !== null && barChartData[hoveredBar] && (
                <g
                  transform={`translate(${barChartData[hoveredBar].transactions > 20 ? 110 : 160}, 15)`}
                >
                  <rect
                    width="90"
                    height="25"
                    rx="4"
                    fill="var(--surface)"
                    stroke="var(--line)"
                    strokeWidth="1"
                    filter="drop-shadow(0 2px 4px rgba(0,0,0,0.05))"
                  />
                  <text
                    x="45"
                    y="16"
                    fill="var(--fg)"
                    fontSize="9"
                    fontWeight="bold"
                    textAnchor="middle"
                  >
                    {barChartData[hoveredBar].transactions} Tx giao dịch
                  </text>
                </g>
              )}
            </svg>
          </div>
        </div>

        {/* Right: Task Distribution Doughnut Chart */}
        <div className="xl:col-span-3 bg-surface border border-line rounded-xl p-5 shadow-sm flex flex-col justify-between">
          <div>
            <h4 className="text-xs font-bold text-fg font-body uppercase tracking-wider">
              Phân bổ Công việc
            </h4>
            <p className="text-[11px] text-muted mt-1">
              Tỉ lệ phần trăm các loại hồ sơ tồn đọng.
            </p>
          </div>

          <div className="flex justify-center items-center py-2 relative">
            <svg width="120" height="120" viewBox="0 0 200 200">
              <circle
                cx="100"
                cy="100"
                r="75"
                fill="transparent"
                stroke="var(--line)"
                strokeWidth="16"
              />
              <circle
                cx="100"
                cy="100"
                r="75"
                fill="transparent"
                stroke="#c65a3a"
                strokeWidth="18"
                strokeDasharray="235.6 471.2"
                strokeDashoffset="0"
                strokeLinecap="round"
                transform="rotate(-90 100 100)"
              />
              <circle
                cx="100"
                cy="100"
                r="75"
                fill="transparent"
                stroke="#6b8e4e"
                strokeWidth="18"
                strokeDasharray="164.9 471.2"
                strokeDashoffset="-235.6"
                strokeLinecap="round"
                transform="rotate(-90 100 100)"
              />
              <circle
                cx="100"
                cy="100"
                r="75"
                fill="transparent"
                stroke="#d64545"
                strokeWidth="18"
                strokeDasharray="70.7 471.2"
                strokeDashoffset="-400.5"
                strokeLinecap="round"
                transform="rotate(-90 100 100)"
              />
              <text
                x="100"
                y="96"
                fill="var(--fg)"
                fontSize="24"
                fontWeight="bold"
                textAnchor="middle"
                className="font-display"
              >
                43
              </text>
              <text
                x="100"
                y="116"
                fill="var(--muted)"
                fontSize="9"
                fontWeight="bold"
                textAnchor="middle"
                className="tracking-wider uppercase"
              >
                TÁC VỤ
              </text>
            </svg>
          </div>

          <div className="space-y-1.5 pt-3 border-t border-line">
            <div className="flex justify-between items-center text-[10px] font-semibold">
              <div className="flex items-center gap-1.5">
                <span className="h-2 w-2 rounded-full bg-[#c65a3a]" />
                <span className="text-muted">Duyệt tin bđs</span>
              </div>
              <span className="text-fg">21 căn (50%)</span>
            </div>
            <div className="flex justify-between items-center text-[10px] font-semibold">
              <div className="flex items-center gap-1.5">
                <span className="h-2 w-2 rounded-full bg-[#6b8e4e]" />
                <span className="text-muted">Định danh KYC</span>
              </div>
              <span className="text-fg">15 hs (35%)</span>
            </div>
            <div className="flex justify-between items-center text-[10px] font-semibold">
              <div className="flex items-center gap-1.5">
                <span className="h-2 w-2 rounded-full bg-[#d64545]" />
                <span className="text-muted">Tranh chấp cọc</span>
              </div>
              <span className="text-fg">7 hs (15%)</span>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Work queues list */}
        <div className="lg:col-span-2 bg-surface border border-line rounded-xl p-5 shadow-sm">
          <h3 className="text-base font-bold text-fg font-marketing mb-4">
            Danh sách công việc ưu tiên
          </h3>
          <div className="space-y-3">
            <div className="flex items-center justify-between p-3.5 bg-bg/40 border border-line rounded-lg hover:bg-bg/60 transition-colors">
              <div className="flex items-center gap-3">
                <div className="h-2 w-2 rounded-full bg-accent animate-pulse" />
                <div>
                  <h4 className="text-xs font-semibold text-fg">
                    Tranh chấp: Hủy hợp đồng căn hộ #104
                  </h4>
                  <p className="text-xs text-subtle mt-0.5">
                    Người dùng Nguyễn Văn A yêu cầu rút cọc sớm. Chủ nhà từ
                    chối.
                  </p>
                </div>
              </div>
              <span className="text-xs text-accent font-medium bg-accent/5 px-2.5 py-1 rounded border border-accent/10">
                Tranh chấp
              </span>
            </div>

            <div className="flex items-center justify-between p-3.5 bg-bg/40 border border-line rounded-lg hover:bg-bg/60 transition-colors">
              <div className="flex items-center gap-3">
                <div className="h-2 w-2 rounded-full bg-accent-3" />
                <div>
                  <h4 className="text-xs font-semibold text-fg">
                    Duyệt KYC: Trần Thị B
                  </h4>
                  <p className="text-xs text-subtle mt-0.5">
                    Đã tải ảnh chân dung và mặt trước/mặt sau CCCD mới.
                  </p>
                </div>
              </div>
              <span className="text-xs text-accent-3 font-medium bg-accent-3/5 px-2.5 py-1 rounded border border-accent-3/10">
                Duyệt KYC
              </span>
            </div>

            <div className="flex items-center justify-between p-3.5 bg-bg/40 border border-line rounded-lg hover:bg-bg/60 transition-colors">
              <div className="flex items-center gap-3">
                <div className="h-2 w-2 rounded-full bg-accent-2" />
                <div>
                  <h4 className="text-xs font-semibold text-fg">
                    Duyệt tin đăng: Căn hộ Landmark 81 - 2PN
                  </h4>
                  <p className="text-xs text-subtle mt-0.5">
                    Chủ nhà Nguyễn Đức C đã tải lên ảnh quét VR 360° hoàn chỉnh.
                  </p>
                </div>
              </div>
              <span className="text-xs text-accent-2 font-medium bg-accent-2/5 px-2.5 py-1 rounded border border-accent-2/10">
                Duyệt tin
              </span>
            </div>
          </div>
        </div>

        {/* Blockchain System logs */}
        <div className="bg-surface border border-line rounded-xl p-5 shadow-sm">
          <h3 className="text-base font-bold text-fg font-marketing mb-4">
            Lịch sử giao dịch Blockchain
          </h3>
          <div className="space-y-4">
            <div className="flex gap-3 items-start">
              <div className="mt-1 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-accent-2/10 text-accent-2">
                <svg
                  width="12"
                  height="12"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <polyline points="20 6 9 17 4 12" />
                </svg>
              </div>
              <div>
                <p className="text-xs font-semibold text-fg">
                  Khóa cọc thành công (Escrow Lock)
                </p>
                <p className="text-xs text-subtle mt-0.5">
                  Căn hộ #201 bởi ví `0x71C...897` (1.2 ETH)
                </p>
                <span className="text-[10px] text-muted-foreground font-mono block mt-1">
                  Block: #18920144 • 2 phút trước
                </span>
              </div>
            </div>

            <div className="flex gap-3 items-start">
              <div className="mt-1 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-accent-2/10 text-accent-2">
                <svg
                  width="12"
                  height="12"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <polyline points="20 6 9 17 4 12" />
                </svg>
              </div>
              <div>
                <p className="text-xs font-semibold text-fg">
                  Khởi tạo Hợp đồng thông minh (Deploy)
                </p>
                <p className="text-xs text-subtle mt-0.5">
                  Hợp đồng thuê căn hộ Landmark 81 - Phòng 1502
                </p>
                <span className="text-[10px] text-muted-foreground font-mono block mt-1">
                  Tx: `0x8fa...a1e` • 15 phút trước
                </span>
              </div>
            </div>

            <div className="flex gap-3 items-start">
              <div className="mt-1 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-accent-3/10 text-accent-3">
                <svg
                  width="12"
                  height="12"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <circle cx="12" cy="12" r="10" />
                  <line x1="12" y1="8" x2="12" y2="12" />
                  <line x1="12" y1="16" x2="12.01" y2="16" />
                </svg>
              </div>
              <div>
                <p className="text-xs font-semibold text-fg">
                  Giao dịch chờ xác nhận (Pending)
                </p>
                <p className="text-xs text-subtle mt-0.5">
                  Thanh toán tiền thuê tháng 6 căn hộ #109
                </p>
                <span className="text-[10px] text-muted-foreground font-mono block mt-1">
                  Tx: `0x2b2...890` • Đang chờ...
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
