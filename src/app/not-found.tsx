import Link from 'next/link'
import type { Route } from 'next'
import { Button } from '@/shared/ui/button'

export default function NotFound(): React.ReactElement {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-bg px-6 text-center text-fg selection:bg-primary/20 selection:text-primary relative overflow-hidden">
      {/* Subtle background glow effects */}
      <div className="absolute top-1/4 left-1/4 h-[500px] w-[500px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-primary/5 blur-[100px] pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 h-[400px] w-[400px] translate-x-1/2 translate-y-1/2 rounded-full bg-accent/5 blur-[100px] pointer-events-none" />

      <div className="relative z-10 flex w-full max-w-2xl flex-col items-center">
        {/* Animated Cube */}
        <div className="relative mb-6 flex h-36 w-36 items-center justify-center">
          <div className="absolute inset-0 rounded-full border border-dashed border-primary/30 animate-[spin_8s_linear_infinite] will-change-transform" />
          <div className="absolute inset-3 rounded-full border border-double border-primary/20 border-t-primary/60 border-b-primary/60 animate-[spin_4s_linear_infinite_reverse] will-change-transform" />

          <div className="relative z-10 flex h-20 w-20 items-center justify-center animate-[bounce_2s_ease-in-out_infinite] will-change-transform">
            <svg
              viewBox="0 0 100 100"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="h-full w-full animate-[spin_6s_linear_infinite] will-change-transform"
            >
              <defs>
                <linearGradient
                  id="notfound-glow"
                  x1="0%"
                  y1="0%"
                  x2="100%"
                  y2="100%"
                >
                  <stop offset="0%" stopColor="#C65A3A" />
                  <stop offset="100%" stopColor="#F2B66D" />
                </linearGradient>
              </defs>
              <polygon
                points="50,15 80,32 50,50 20,32"
                fill="url(#notfound-glow)"
                opacity="0.85"
                stroke="#FAF7F2"
                strokeWidth="1.5"
              />
              <polygon
                points="20,32 50,50 50,85 20,67"
                fill="#C65A3A"
                opacity="0.95"
                stroke="#FAF7F2"
                strokeWidth="1.5"
              />
              <polygon
                points="50,50 80,32 80,67 50,85"
                fill="#8F3C22"
                stroke="#FAF7F2"
                strokeWidth="1.5"
              />
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

          <div className="absolute -top-1.5 left-1/2 h-3 w-3 -translate-x-1/2 rounded-full bg-[#F2B66D] shadow-[0_0_10px_#F2B66D]" />
          <div className="absolute -bottom-1.5 left-1/2 h-3 w-3 -translate-x-1/2 rounded-full bg-[#C65A3A] shadow-[0_0_10px_#C65A3A]" />
        </div>

        {/* Text Content */}
        <h1 className="font-marketing text-[5rem] font-bold tracking-tight text-fg leading-none mb-4">
          404
        </h1>
        <h2 className="text-xl font-bold text-fg mb-4 max-w-lg">
          Không tìm thấy trang hoặc bạn không có quyền truy cập
        </h2>
        <p className="text-sm leading-relaxed text-muted max-w-[460px]">
          Trang bạn đang cố truy cập không tồn tại, đã bị gỡ bỏ hoặc tài khoản
          của bạn chưa được cấp quyền để xem nội dung này.
        </p>

        {/* Action Button */}
        <Link href={'/' as Route} className="mt-10">
          <Button
            size="lg"
            className="rounded-full bg-[#9f3f2a] hover:bg-[#833221] px-10 h-12 text-white font-bold shadow-lg shadow-[#9f3f2a]/20 transition-all hover:shadow-xl active:scale-95"
          >
            Quay lại trang chủ
          </Button>
        </Link>
      </div>
    </main>
  )
}
