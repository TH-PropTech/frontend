'use client'

import * as React from 'react'

interface HomeViewProps {
  onNavigateTab: (tab: 'properties' | 'kyc' | 'disputes' | 'schedules') => void
}

export function HomeView({ onNavigateTab }: HomeViewProps): React.ReactElement {
  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-300">
      {/* Welcome Hero Banner */}
      <div className="relative bg-gradient-to-r from-primary to-primary-hover text-on-control rounded-2xl p-6 sm:p-8 overflow-hidden shadow-md">
        <div
          className="absolute inset-0 opacity-10"
          style={{
            backgroundImage:
              'radial-gradient(circle at 50% 50%, #ffffff 1.5px, transparent 0)',
            backgroundSize: '16px 16px',
          }}
        />
        <div className="relative z-10 flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
          <div className="space-y-2 max-w-lg">
            <span className="text-[10px] font-bold tracking-widest uppercase bg-white/10 px-2.5 py-1 rounded-full border border-white/10">
              BÀN LÀM VIỆC VẬN HÀNH
            </span>
            <h2 className="text-xl sm:text-2xl font-bold font-marketing leading-tight">
              Chào mừng quay trở lại, Culi Vận Hành #04!
            </h2>
            <p className="text-xs text-white/80 leading-relaxed font-body">
              Tất cả các cổng giao dịch, cổng kết nối VR 360° và các Escrow
              Smart Contracts trên chuỗi khối vẫn đang vận hành ổn định. Chúc
              bạn một ngày làm việc hiệu quả!
            </p>
          </div>
          <div className="flex gap-2">
            <button
              onClick={() => onNavigateTab('properties')}
              className="px-4 py-2.5 bg-white text-primary text-xs font-bold rounded-lg shadow-sm hover:bg-white/95 transition-all"
            >
              Duyệt tin ngay
            </button>
            <button
              onClick={() => onNavigateTab('kyc')}
              className="px-4 py-2.5 bg-white/10 hover:bg-white/15 border border-white/20 text-white text-xs font-bold rounded-lg transition-all"
            >
              Đối chiếu KYC
            </button>
          </div>
        </div>
      </div>

      {/* Main Grid: Interactive Isometric Building and Tasks */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
        {/* Left: Futuristic Architectural Isometric Building */}
        <div className="lg:col-span-7 bg-surface border border-line rounded-2xl p-6 shadow-sm flex flex-col justify-between overflow-hidden relative min-h-[440px]">
          <div className="relative z-10">
            <h3 className="text-sm font-bold text-fg font-marketing">
              Mô hình Số hóa Tòa nhà TH-PropTech
            </h3>
            <p className="text-xs text-muted mt-1">
              Hệ thống mạng lưới dữ liệu bất động sản ảo được ánh xạ thời gian
              thực.
            </p>
          </div>

          {/* Isometric Building SVG Graphics */}
          <div className="flex-grow flex items-center justify-center py-4 select-none relative z-10">
            <svg
              className="w-full max-w-[480px] aspect-[1.2/1]"
              viewBox="-60 0 580 400"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <defs>
                {/* Orange Gradients */}
                <linearGradient id="orange-top" x1="0" y1="0" x2="1" y2="1">
                  <stop offset="0%" stopColor="#fffdf9" />
                  <stop offset="100%" stopColor="#f5e3dc" />
                </linearGradient>
                <linearGradient id="orange-left" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#e37253" />
                  <stop offset="100%" stopColor="#c65a3a" />
                </linearGradient>
                <linearGradient id="orange-right" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#c65a3a" />
                  <stop offset="100%" stopColor="#9f3f2a" />
                </linearGradient>

                {/* Green Gradients */}
                <linearGradient id="green-top" x1="0" y1="0" x2="1" y2="1">
                  <stop offset="0%" stopColor="#fffdf9" />
                  <stop offset="100%" stopColor="#e8f0df" />
                </linearGradient>
                <linearGradient id="green-left" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#82ad5f" />
                  <stop offset="100%" stopColor="#6b8e4e" />
                </linearGradient>
                <linearGradient id="green-right" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#6b8e4e" />
                  <stop offset="100%" stopColor="#526f3b" />
                </linearGradient>

                {/* Gold Gradients */}
                <linearGradient id="gold-top" x1="0" y1="0" x2="1" y2="1">
                  <stop offset="0%" stopColor="#fffdf9" />
                  <stop offset="100%" stopColor="#fcebd4" />
                </linearGradient>
                <linearGradient id="gold-left" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#f7cd99" />
                  <stop offset="100%" stopColor="#f2b66d" />
                </linearGradient>
                <linearGradient id="gold-right" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#f2b66d" />
                  <stop offset="100%" stopColor="#c79354" />
                </linearGradient>

                {/* Base Gradients */}
                <linearGradient id="base-top" x1="0" y1="0" x2="1" y2="1">
                  <stop offset="0%" stopColor="#fffdf9" />
                  <stop offset="100%" stopColor="#f4eee7" />
                </linearGradient>
                <linearGradient id="base-left" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#e3d8d0" />
                  <stop offset="100%" stopColor="#c9b8ae" />
                </linearGradient>
                <linearGradient id="base-right" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#c9b8ae" />
                  <stop offset="100%" stopColor="#a49389" />
                </linearGradient>
              </defs>

              {/* Ground shadow */}
              <ellipse
                cx="280"
                cy="340"
                rx="150"
                ry="35"
                fill="#2b211e"
                fillOpacity="0.05"
              />

              {/* ═══════════════════════════════════════
                 BASE FOUNDATION LAYER
                 ═══════════════════════════════════════ */}
              <g className="transition-all duration-300">
                {/* Top face */}
                <path
                  d="M 280, 270 L 400, 320 L 280, 370 L 160, 320 Z"
                  fill="url(#base-top)"
                  stroke="#e3d8d0"
                  strokeWidth="1.5"
                />
                {/* Left face */}
                <path
                  d="M 160, 320 L 280, 370 L 280, 385 L 160, 335 Z"
                  fill="url(#base-left)"
                  stroke="#c9b8ae"
                  strokeWidth="1"
                />
                {/* Right face */}
                <path
                  d="M 280, 370 L 400, 320 L 400, 335 L 280, 385 Z"
                  fill="url(#base-right)"
                  stroke="#a49389"
                  strokeWidth="1"
                />
              </g>

              {/* ═══════════════════════════════════════
                 LAYER 1: SMART LEASE LAYER (Bottom Cube)
                 ═══════════════════════════════════════ */}
              <g className="cursor-pointer group">
                {/* Left Face */}
                <path
                  d="M 190, 215 L 280, 260 L 280, 300 L 190, 255 Z"
                  fill="url(#orange-left)"
                  stroke="#c65a3a"
                  strokeWidth="0.75"
                  className="transition-all duration-200 group-hover:opacity-90"
                />
                {/* Right Face */}
                <path
                  d="M 280, 260 L 370, 215 L 370, 255 L 280, 300 Z"
                  fill="url(#orange-right)"
                  stroke="#9f3f2a"
                  strokeWidth="0.75"
                  className="transition-all duration-200 group-hover:opacity-90"
                />
                {/* Top Face */}
                <path
                  d="M 280, 170 L 370, 215 L 280, 260 L 190, 215 Z"
                  fill="url(#orange-top)"
                  stroke="#c65a3a"
                  strokeWidth="1.5"
                  className="transition-all duration-200 group-hover:opacity-95"
                />

                {/* Grid details on top face */}
                <path
                  d="M 280, 190 L 340, 220 M 280, 210 L 310, 225 M 280, 230 L 280, 250"
                  stroke="#c65a3a"
                  strokeWidth="0.5"
                  strokeOpacity="0.4"
                />

                {/* Left Leader Line & Tag */}
                <path
                  d="M 190, 235 L 130, 205 L 90, 205"
                  stroke="#c65a3a"
                  strokeWidth="1.2"
                  strokeDasharray="3,3"
                  className="transition-all duration-200 opacity-60 group-hover:opacity-100"
                />
                <circle cx="190" cy="235" r="2.5" fill="#c65a3a" />
                <text
                  x="83"
                  y="198"
                  fill="var(--fg)"
                  fontSize="10"
                  fontWeight="bold"
                  textAnchor="end"
                  className="transition-all duration-200 group-hover:fill-primary"
                >
                  SMART CONTRACT
                </text>
                <text
                  x="83"
                  y="210"
                  fill="var(--primary)"
                  fontSize="8.5"
                  fontWeight="semibold"
                  textAnchor="end"
                >
                  2 Hợp đồng mới
                </text>
              </g>

              {/* ═══════════════════════════════════════
                 LAYER 2: VR SPATIAL LAYER (Middle Cube)
                 ═══════════════════════════════════════ */}
              <g className="cursor-pointer group">
                {/* Left Face */}
                <path
                  d="M 210, 140 L 280, 175 L 280, 210 L 210, 175 Z"
                  fill="url(#green-left)"
                  stroke="#6b8e4e"
                  strokeWidth="0.75"
                  className="transition-all duration-200 group-hover:opacity-90"
                />
                {/* Right Face */}
                <path
                  d="M 280, 175 L 350, 140 L 350, 175 L 280, 210 Z"
                  fill="url(#green-right)"
                  stroke="#526f3b"
                  strokeWidth="0.75"
                  className="transition-all duration-200 group-hover:opacity-90"
                />
                {/* Top Face */}
                <path
                  d="M 280, 105 L 350, 140 L 280, 175 L 210, 140 Z"
                  fill="url(#green-top)"
                  stroke="#6b8e4e"
                  strokeWidth="1.5"
                  className="transition-all duration-200 group-hover:opacity-95"
                />

                {/* Glowing VR Dot */}
                <circle
                  cx="280"
                  cy="140"
                  r="4.5"
                  fill="#6b8e4e"
                  className="animate-pulse"
                />

                {/* Right Leader Line & Tag */}
                <path
                  d="M 350, 158 L 410, 125 L 440, 125"
                  stroke="#6b8e4e"
                  strokeWidth="1.2"
                  strokeDasharray="3,3"
                  className="transition-all duration-200 opacity-60 group-hover:opacity-100"
                />
                <circle cx="350" cy="158" r="2.5" fill="#6b8e4e" />
                <text
                  x="447"
                  y="117"
                  fill="var(--fg)"
                  fontSize="10"
                  fontWeight="bold"
                  textAnchor="start"
                  className="transition-all duration-200 group-hover:fill-accent-2"
                >
                  VR 360 ROOM
                </text>
                <text
                  x="447"
                  y="130"
                  fill="#6b8e4e"
                  fontSize="8.5"
                  fontWeight="semibold"
                  textAnchor="start"
                >
                  Chất lượng đạt chuẩn
                </text>
              </g>

              {/* ═══════════════════════════════════════
                 LAYER 3: KYC CENTER LAYER (Top Cube)
                 ═══════════════════════════════════════ */}
              <g className="cursor-pointer group">
                {/* Left Face */}
                <path
                  d="M 230, 75 L 280, 100 L 280, 130 L 230, 105 Z"
                  fill="url(#gold-left)"
                  stroke="#f2b66d"
                  strokeWidth="0.75"
                  className="transition-all duration-200 group-hover:opacity-90"
                />
                {/* Right Face */}
                <path
                  d="M 280, 100 L 330, 75 L 330, 105 L 280, 130 Z"
                  fill="url(#gold-right)"
                  stroke="#c79354"
                  strokeWidth="0.75"
                  className="transition-all duration-200 group-hover:opacity-90"
                />
                {/* Top Face */}
                <path
                  d="M 280, 50 L 330, 75 L 280, 100 L 230, 75 Z"
                  fill="url(#gold-top)"
                  stroke="#f2b66d"
                  strokeWidth="1.5"
                  className="transition-all duration-200 group-hover:opacity-95"
                />

                {/* Antenna broadcast */}
                <line
                  x1="280"
                  y1="50"
                  x2="280"
                  y2="20"
                  stroke="#f2b66d"
                  strokeWidth="1.5"
                />
                <circle
                  cx="280"
                  cy="18"
                  r="3.5"
                  fill="#f2b66d"
                  className="animate-ping"
                  style={{ animationDuration: '3s' }}
                />
                <circle cx="280" cy="18" r="2.5" fill="#f2b66d" />

                {/* Left Leader Line & Tag */}
                <path
                  d="M 230, 90 L 160, 60 L 90, 60"
                  stroke="#f2b66d"
                  strokeWidth="1.2"
                  strokeDasharray="3,3"
                  className="transition-all duration-200 opacity-60 group-hover:opacity-100"
                />
                <circle cx="230" cy="90" r="2.5" fill="#f2b66d" />
                <text
                  x="83"
                  y="52"
                  fill="var(--fg)"
                  fontSize="10"
                  fontWeight="bold"
                  textAnchor="end"
                  className="transition-all duration-200 group-hover:fill-accent-2"
                >
                  KYC HUB
                </text>
                <text
                  x="83"
                  y="65"
                  fill="#c79354"
                  fontSize="8.5"
                  fontWeight="semibold"
                  textAnchor="end"
                >
                  2 hồ sơ chờ duyệt
                </text>
              </g>
            </svg>
          </div>

          <div className="border-t border-line pt-3 flex justify-between items-center text-[10px] text-muted font-mono relative z-10">
            <span>Server status: Online</span>
            <span>Blockchain Sync: 100%</span>
          </div>
        </div>

        {/* Right: Operations Tasks lists */}
        <div className="lg:col-span-5 flex flex-col gap-4">
          {/* Quick status progress */}
          <div className="bg-surface border border-line rounded-2xl p-5 shadow-sm space-y-4">
            <h4 className="text-xs font-bold text-fg font-body uppercase tracking-wider">
              Tiến độ hôm nay
            </h4>
            <div className="space-y-2">
              <div className="flex justify-between text-xs font-semibold">
                <span className="text-muted">Hồ sơ đã xử lý</span>
                <span className="text-fg">14 / 20</span>
              </div>
              <div className="w-full bg-fg/10 h-2 rounded-full overflow-hidden">
                <div
                  className="h-full bg-accent-2 rounded-full"
                  style={{ width: '70%' }}
                />
              </div>
              <p className="text-[10px] text-muted">
                Hoàn thành thêm 6 hồ sơ để đạt chỉ tiêu ngày.
              </p>
            </div>
          </div>

          {/* Action Tasks Card */}
          <div className="bg-surface border border-line rounded-2xl p-5 shadow-sm space-y-4 flex-1">
            <h4 className="text-xs font-bold text-fg font-body uppercase tracking-wider">
              Lối tắt tác vụ nhanh
            </h4>

            <div className="space-y-2">
              {/* Task 1 */}
              <button
                onClick={() => onNavigateTab('properties')}
                className="w-full p-3 bg-bg/40 border border-line hover:border-primary hover:bg-primary-soft/30 rounded-xl text-left transition-all duration-200 flex items-center gap-3 group"
              >
                <div className="h-8 w-8 rounded-lg bg-[#c65a3a]/10 border border-[#c65a3a]/25 text-primary flex items-center justify-center shrink-0">
                  <svg
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2.5"
                  >
                    <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
                  </svg>
                </div>
                <div className="flex-grow overflow-hidden">
                  <span className="text-xs font-bold text-fg block group-hover:text-primary transition-colors leading-tight">
                    Duyệt tin bất động sản
                  </span>
                  <span className="text-[10px] text-muted block mt-0.5">
                    2 tin đang chờ kiểm định pháp lý & VR
                  </span>
                </div>
              </button>

              {/* Task 2 */}
              <button
                onClick={() => onNavigateTab('kyc')}
                className="w-full p-3 bg-bg/40 border border-line hover:border-accent-2 hover:bg-accent-2/10 rounded-xl text-left transition-all duration-200 flex items-center gap-3 group"
              >
                <div className="h-8 w-8 rounded-lg bg-[#6b8e4e]/10 border border-[#6b8e4e]/20 text-[#6b8e4e] flex items-center justify-center shrink-0">
                  <svg
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2.5"
                  >
                    <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                  </svg>
                </div>
                <div className="flex-grow overflow-hidden">
                  <span className="text-xs font-bold text-fg block group-hover:text-accent-2 transition-colors leading-tight">
                    Xác minh danh tính (KYC)
                  </span>
                  <span className="text-[10px] text-muted block mt-0.5">
                    2 người dùng chờ đối soát CCCD
                  </span>
                </div>
              </button>

              {/* Task 3 */}
              <button
                onClick={() => onNavigateTab('disputes')}
                className="w-full p-3 bg-bg/40 border border-line hover:border-accent hover:bg-accent/10 rounded-xl text-left transition-all duration-200 flex items-center gap-3 group"
              >
                <div className="h-8 w-8 rounded-lg bg-[#d64545]/10 border border-[#d64545]/20 text-[#d64545] flex items-center justify-center shrink-0">
                  <svg
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2.5"
                  >
                    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                  </svg>
                </div>
                <div className="flex-grow overflow-hidden">
                  <span className="text-xs font-bold text-fg block group-hover:text-accent transition-colors leading-tight">
                    Xử lý tranh chấp cọc Escrow
                  </span>
                  <span className="text-[10px] text-muted block mt-0.5">
                    2 hợp đồng đang có khiếu nại cọc
                  </span>
                </div>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
