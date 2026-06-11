'use client'

import * as React from 'react'
import { EscrowLineChart } from './components/escrow-line-chart'
import { SystemLoadBarChart } from './components/system-load-bar-chart'
import { TaskDoughnutChart } from './components/task-doughnut-chart'

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

function StatCard({
  title,
  value,
  subtext,
  trend,
  icon,
}: StatCardProps): React.ReactElement {
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
  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-300">
      {/* Welcome banner with Sticker */}
      <div className="bg-surface border border-line rounded-2xl p-6 flex flex-col md:flex-row justify-between items-start md:items-center gap-6 relative overflow-hidden shadow-sm">
        <div className="flex items-center gap-4 relative z-10">
          {/* Custom Blockchain Network Sticker */}
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
            <circle cx="20" cy="20" r="4" fill="#f2b66d" />
            <circle cx="44" cy="20" r="4" fill="#6b8e4e" />
            <circle cx="20" cy="44" r="4" fill="#e37253" />
            <circle cx="44" cy="44" r="4" fill="#c79354" />
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

      {/* DETAILED STATISTICS SECTION */}
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

      {/* ANALYTICS CHARTS ROW */}
      <div className="grid grid-cols-1 xl:grid-cols-12 gap-6">
        {/* Left: Escrow Deposit Line Chart */}
        <div className="xl:col-span-5">
          <EscrowLineChart />
        </div>

        {/* Center: System Load Bar Chart */}
        <div className="xl:col-span-4">
          <SystemLoadBarChart />
        </div>

        {/* Right: Task Distribution Doughnut Chart */}
        <div className="xl:col-span-3">
          <TaskDoughnutChart />
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
