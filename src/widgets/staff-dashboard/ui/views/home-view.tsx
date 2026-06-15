'use client'

import * as React from 'react'
import { IsometricBuilding } from './components/isometric-building'

interface HomeViewProps {
  onNavigateTab: (
    tab: 'properties' | 'kyc' | 'disputes' | 'schedules' | 'community'
  ) => void
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
            <IsometricBuilding />
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

              {/* Task 4 */}
              <button
                onClick={() => onNavigateTab('community')}
                className="w-full p-3 bg-bg/40 border border-line hover:border-primary hover:bg-primary-soft/30 rounded-xl text-left transition-all duration-200 flex items-center gap-3 group"
              >
                <div className="h-8 w-8 rounded-lg bg-primary/10 border border-primary/20 text-primary flex items-center justify-center shrink-0">
                  <svg
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2.5"
                  >
                    <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
                  </svg>
                </div>
                <div className="flex-grow overflow-hidden">
                  <span className="text-xs font-bold text-fg block group-hover:text-primary transition-colors leading-tight">
                    Duyệt bài viết cộng đồng
                  </span>
                  <span className="text-[10px] text-muted block mt-0.5">
                    Kiểm duyệt nội dung đăng của cư dân
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
