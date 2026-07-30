'use client'

import * as React from 'react'
import Link from 'next/link'
import { HomeHeader } from '@/widgets/home-dashboard/ui/home-header'
import { Sparkles, X, Info, Lock, LogIn, Home } from 'lucide-react'

export default function AIVisualPage(): React.ReactElement {
  const [isAuthenticated, setIsAuthenticated] = React.useState<boolean | null>(
    null
  )
  const [isOpen, setIsOpen] = React.useState(false)

  React.useEffect(() => {
    // Check authentication status
    const token = localStorage.getItem('accessToken')
    const user = localStorage.getItem('user')
    if (token && user) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setIsAuthenticated(true)
      // Show onboarding modal automatically on first visit
      const hasSeen = localStorage.getItem('ai-visual-onboarding-seen')
      if (!hasSeen) {
        setIsOpen(true)
      }
    } else {
      setIsAuthenticated(false)
    }
  }, [])

  const handleClose = () => {
    localStorage.setItem('ai-visual-onboarding-seen', 'true')
    setIsOpen(false)
  }

  // Loading/checking State
  if (isAuthenticated === null) {
    return (
      <div className="relative min-h-screen bg-[#faf7f2] flex flex-col">
        <HomeHeader />
        <div className="flex-1 flex flex-col items-center justify-center pt-16 gap-3">
          <div className="w-10 h-10 border-4 border-[#9F3F2A] border-t-transparent rounded-full animate-spin"></div>
          <p className="text-xs text-[#8A7968] font-body">
            Đang kiểm tra quyền truy cập...
          </p>
        </div>
      </div>
    )
  }

  // Block Screen for Unauthenticated Users
  if (!isAuthenticated) {
    return (
      <div className="relative min-h-screen bg-[#faf7f2] flex flex-col overflow-hidden">
        <HomeHeader />
        <div className="flex-1 flex flex-col items-center justify-center px-6 pt-16">
          <div className="max-w-md w-full bg-[#FFFDF9] border border-[#e3d8d0] rounded-3xl p-8 shadow-xl text-center space-y-6 animate-in fade-in zoom-in-95 duration-200">
            {/* Lock Icon */}
            <div className="mx-auto w-16 h-16 rounded-full bg-[#9F3F2A]/5 flex items-center justify-center border border-[#9F3F2A]/10 relative">
              <Lock className="w-7 h-7 text-[#9F3F2A]" />
              <span className="absolute top-0.5 right-0.5 w-2.5 h-2.5 bg-[#c65a3a] rounded-full animate-ping" />
              <span className="absolute top-0.5 right-0.5 w-2.5 h-2.5 bg-[#c65a3a] rounded-full" />
            </div>

            {/* Content */}
            <div className="space-y-2">
              <h1 className="text-lg font-bold text-fg font-display">
                Yêu cầu Đăng nhập
              </h1>
              <p className="text-xs text-[#8A7968] font-body leading-relaxed">
                Hệ thống trực quan hóa thuật toán gợi ý căn hộ bằng AI cần xác
                thực tài khoản để cá nhân hóa mô hình dự đoán và bảo vệ tài
                nguyên máy chủ. Vui lòng đăng nhập để bắt đầu trải nghiệm.
              </p>
            </div>

            {/* Actions */}
            <div className="space-y-3 pt-2">
              <Link
                href="/login"
                className="w-full bg-[#9F3F2A] hover:bg-[#833221] text-white font-bold font-display text-xs py-3.5 rounded-full transition-all active:scale-95 shadow-md shadow-[#9F3F2A]/10 flex items-center justify-center gap-2 cursor-pointer"
              >
                <LogIn className="w-4 h-4" />
                Đăng nhập ngay
              </Link>
              <Link
                href="/"
                className="w-full bg-white hover:bg-[#FFFDF9] text-[#8A7968] font-bold font-display text-xs py-3.5 rounded-full border border-[#e3d8d0] transition-all active:scale-95 flex items-center justify-center gap-2 cursor-pointer"
              >
                <Home className="w-4 h-4" />
                Quay lại Trang chủ
              </Link>
            </div>
          </div>
        </div>
      </div>
    )
  }

  // Normal Screen for Authenticated Users
  return (
    <div className="relative h-screen bg-[#faf7f2] flex flex-col overflow-hidden">
      {/* Absolute Dynamic Header */}
      <HomeHeader />

      {/* Main Content Area containing Python Recommender iframe */}
      <div className="flex-1 w-full pt-16">
        <iframe
          src="http://localhost:5001/?embed=true"
          className="w-full h-full border-0"
          title="Trực quan Thuật toán AI"
        />
      </div>

      {/* Floating Info Help Button */}
      <button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-4 right-4 z-40 bg-white hover:bg-[#FFFDF9] border border-[#e3d8d0] shadow-lg rounded-full p-3 text-[#9F3F2A] transition-all hover:scale-105 active:scale-95 cursor-pointer flex items-center justify-center gap-1.5"
        title="Hướng dẫn sử dụng"
      >
        <Info className="w-5 h-5 shrink-0" />
        <span className="text-xs font-bold font-display pr-1 hidden sm:inline">
          Trợ giúp AI
        </span>
      </button>

      {/* Onboarding Guide Modal */}
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          {/* Backdrop */}
          <div
            className="absolute inset-0 bg-black/40 backdrop-blur-sm transition-opacity"
            onClick={handleClose}
          />

          {/* Modal Container */}
          <div className="relative bg-[#FFFDF9] border border-[#e3d8d0] rounded-3xl p-8 max-w-md w-full shadow-2xl space-y-6 z-10 animate-in fade-in zoom-in-95 duration-200">
            {/* Close Button */}
            <button
              onClick={handleClose}
              className="absolute right-6 top-6 p-1 rounded-full hover:bg-[#e3d8d0]/40 text-[#8A7968] transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Header */}
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-[#9F3F2A]/10 flex items-center justify-center shrink-0">
                <Sparkles className="w-5 h-5 text-[#9F3F2A]" />
              </div>
              <div>
                <h3 className="text-base font-bold text-fg font-display">
                  Hướng dẫn Trực quan AI
                </h3>
                <p className="text-[10px] text-[#8A7968] font-mono uppercase tracking-widest">
                  TH-Proptech AI Engine
                </p>
              </div>
            </div>

            {/* Steps explanation */}
            <div className="space-y-4 font-body text-xs text-[#8A7968] leading-relaxed">
              <p>
                Trang web này giúp bạn quan sát cách trí tuệ nhân tạo (AI) hoạt
                động để tính toán, chấm điểm và lựa chọn căn hộ thích hợp cho
                bạn.
              </p>

              <div className="space-y-3 pt-2">
                <div className="flex gap-2.5">
                  <span className="w-5 h-5 rounded-full bg-[#9F3F2A]/10 text-[#9F3F2A] font-bold text-[10px] flex items-center justify-center shrink-0 mt-0.5 font-mono">
                    1
                  </span>
                  <div>
                    <strong className="text-fg block">
                      Thiết lập thông số (Bên trái):
                    </strong>
                    Thay đổi độ tuổi, thu nhập, số phòng ngủ và các tiện ích
                    mong muốn.
                  </div>
                </div>

                <div className="flex gap-2.5">
                  <span className="w-5 h-5 rounded-full bg-[#9F3F2A]/10 text-[#9F3F2A] font-bold text-[10px] flex items-center justify-center shrink-0 mt-0.5 font-mono">
                    2
                  </span>
                  <div>
                    <strong className="text-fg block">
                      Kích hoạt đề xuất:
                    </strong>
                    Nhấn nút{' '}
                    <strong className="text-[#9F3F2A]">
                      &ldquo;Đề xuất ngay&rdquo;
                    </strong>{' '}
                    ở dưới cùng khung bên trái để gửi dữ liệu cho AI.
                  </div>
                </div>

                <div className="flex gap-2.5">
                  <span className="w-5 h-5 rounded-full bg-[#9F3F2A]/10 text-[#9F3F2A] font-bold text-[10px] flex items-center justify-center shrink-0 mt-0.5 font-mono">
                    3
                  </span>
                  <div>
                    <strong className="text-fg block">
                      Xem biểu đồ thuật toán (Bên phải):
                    </strong>
                    AI sẽ chấm điểm tương thích (khớp %) và hiển thị biểu đồ cột
                    phân tích rõ tại sao căn hộ đó lại phù hợp với bạn.
                  </div>
                </div>
              </div>
            </div>

            {/* Action */}
            <div className="pt-2">
              <button
                onClick={handleClose}
                className="w-full bg-[#9F3F2A] hover:bg-[#833221] text-white font-bold font-display text-xs py-3.5 rounded-full transition-all active:scale-95 cursor-pointer shadow-md shadow-[#9F3F2A]/10"
              >
                Đã hiểu, bắt đầu khám phá
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
