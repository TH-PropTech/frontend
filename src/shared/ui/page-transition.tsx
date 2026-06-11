'use client'

import * as React from 'react'
import { usePathname, useSearchParams } from 'next/navigation'

export function PageTransition(): React.ReactElement | null {
  const pathname = usePathname()
  const searchParams = useSearchParams()
  const [isActive, setIsActive] = React.useState(false)
  const [isFadingOut, setIsFadingOut] = React.useState(false)

  // Lưu trữ thời điểm bắt đầu để giữ loading ít nhất 1 giây (1000ms)
  const startTimeRef = React.useRef<number>(0)
  const isTransitioningRef = React.useRef<boolean>(false)
  const timerRef = React.useRef<NodeJS.Timeout | null>(null)

  const stopTransition = React.useCallback(() => {
    const elapsed = Date.now() - startTimeRef.current
    const remainingTime = Math.max(0, 1000 - elapsed)

    if (timerRef.current) clearTimeout(timerRef.current)

    timerRef.current = setTimeout(() => {
      setIsFadingOut(true)
      // Chờ animation fade out (300ms) kết thúc mới tắt hoàn toàn
      timerRef.current = setTimeout(() => {
        setIsActive(false)
        setIsFadingOut(false)
        isTransitioningRef.current = false
      }, 300)
    }, remainingTime)
  }, [])

  // Khi pathname hoặc searchParams thay đổi, dừng transition
  React.useEffect(() => {
    if (isTransitioningRef.current) {
      stopTransition()
    }
    return (): void => {
      if (timerRef.current) clearTimeout(timerRef.current)
    }
  }, [pathname, searchParams, stopTransition])

  // Lắng nghe click chuột toàn cục trên các thẻ <a> để kích hoạt transition
  React.useEffect(() => {
    const handleLinkClick = (e: MouseEvent): void => {
      // Tìm thẻ <a> gần nhất
      let target = e.target as HTMLElement | null
      while (target && target.tagName !== 'A') {
        target = target.parentElement
      }

      if (!target) return

      const anchor = target as HTMLAnchorElement
      const href = anchor.getAttribute('href')

      // Bỏ qua nếu là liên kết ngoài, mở tab mới, hoặc liên kết dạng hash/javascript/tel/mail
      if (
        !href ||
        href.startsWith('#') ||
        href.startsWith('javascript:') ||
        href.startsWith('tel:') ||
        href.startsWith('mailto:') ||
        anchor.target === '_blank' ||
        e.ctrlKey ||
        e.metaKey ||
        e.shiftKey ||
        e.button !== 0 // Chỉ bắt click chuột trái
      ) {
        return
      }

      // Kiểm tra xem có cùng host không
      const url = new URL(anchor.href, window.location.href)
      if (url.origin !== window.location.origin) {
        return
      }

      // Tránh kích hoạt lại nếu đang click vào chính trang hiện tại mà không đổi route
      const currentUrl = new URL(window.location.href)
      if (
        url.pathname === currentUrl.pathname &&
        url.search === currentUrl.search
      ) {
        return
      }

      // Kích hoạt transition
      if (timerRef.current) clearTimeout(timerRef.current)
      startTimeRef.current = Date.now()
      isTransitioningRef.current = true
      setIsFadingOut(false)
      setIsActive(true)
    }

    document.addEventListener('click', handleLinkClick)
    return (): void => {
      document.removeEventListener('click', handleLinkClick)
      if (timerRef.current) clearTimeout(timerRef.current)
    }
  }, [])

  if (!isActive) return null

  return (
    <div
      className={`fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-bg/90 backdrop-blur-[4px] transition-opacity duration-300 will-change-[opacity] ${
        isFadingOut ? 'opacity-0 pointer-events-none' : 'opacity-100'
      }`}
    >
      <div className="relative flex h-32 w-32 items-center justify-center">
        {/* Vòng tròn quỹ đạo 1 (Xoay cùng chiều kim đồng hồ) */}
        <div className="absolute inset-0 rounded-full border border-dashed border-primary/30 animate-[spin_8s_linear_infinite] will-change-transform" />

        {/* Vòng tròn quỹ đạo 2 (Xoay ngược chiều kim đồng hồ) */}
        <div className="absolute inset-2 rounded-full border border-double border-primary/20 border-t-primary/60 border-b-primary/60 animate-[spin_4s_linear_infinite_reverse] will-change-transform" />

        {/* Khối Isometric 3D (Được mô phỏng tinh xảo bằng SVG xoay/nhấp nhô) */}
        <div className="relative z-10 flex h-16 w-16 items-center justify-center animate-[bounce_2s_ease-in-out_infinite] will-change-transform">
          <svg
            viewBox="0 0 100 100"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="h-full w-full animate-[spin_6s_linear_infinite] will-change-transform"
          >
            <defs>
              <linearGradient
                id="primary-glow"
                x1="0%"
                y1="0%"
                x2="100%"
                y2="100%"
              >
                <stop offset="0%" stopColor="#C65A3A" />
                <stop offset="100%" stopColor="#F2B66D" />
              </linearGradient>
            </defs>
            {/* Mặt trên khối lập phương (isometric) */}
            <polygon
              points="50,15 80,32 50,50 20,32"
              fill="url(#primary-glow)"
              opacity="0.85"
              stroke="#FAF7F2"
              strokeWidth="1.5"
            />
            {/* Mặt trái */}
            <polygon
              points="20,32 50,50 50,85 20,67"
              fill="#C65A3A"
              opacity="0.95"
              stroke="#FAF7F2"
              strokeWidth="1.5"
            />
            {/* Mặt phải */}
            <polygon
              points="50,50 80,32 80,67 50,85"
              fill="#8F3C22"
              stroke="#FAF7F2"
              strokeWidth="1.5"
            />

            {/* Vòng đai bảo mật Blockchain bao quanh (đứt khúc) */}
            <path
              d="M10,50 Q50,75 90,50"
              stroke="#F2B66D"
              strokeWidth="2"
              strokeLinecap="round"
              strokeDasharray="4 8"
              opacity="0.8"
            />
            <path
              d="M90,50 Q50,25 10,50"
              stroke="#C65A3A"
              strokeWidth="2"
              strokeLinecap="round"
              strokeDasharray="4 8"
              opacity="0.8"
            />
          </svg>
        </div>

        {/* Điểm nút blockchain chuyển động */}
        <div className="absolute -top-1 left-1/2 h-2.5 w-2.5 -translate-x-1/2 rounded-full bg-[#F2B66D] shadow-[0_0_8px_#F2B66D]" />
        <div className="absolute -bottom-1 left-1/2 h-2.5 w-2.5 -translate-x-1/2 rounded-full bg-[#C65A3A] shadow-[0_0_8px_#C65A3A]" />
      </div>

      {/* Text thông báo nhỏ ở dưới */}
      <div className="mt-6 flex flex-col items-center gap-1.5">
        <span className="font-display text-sm font-bold uppercase tracking-widest text-[#7a6a61]">
          TH-<span className="text-primary">PropTech</span>
        </span>
        <div className="flex items-center gap-1">
          <span className="h-1.5 w-1.5 rounded-full bg-primary animate-pulse" />
          <span className="font-body text-[11px] font-semibold text-[#7a6a61] tracking-wide">
            Đang tải không gian giao dịch...
          </span>
        </div>
      </div>
    </div>
  )
}
