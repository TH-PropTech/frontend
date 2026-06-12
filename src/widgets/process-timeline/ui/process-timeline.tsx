'use client'

import * as React from 'react'
import { HomeHeader } from '@/widgets/home-dashboard/ui/home-header'
import { Footer } from '@/shared/ui/footer'

export function ProcessTimeline(): React.ReactElement {
  const [role, setRole] = React.useState<'tenant' | 'landlord'>('tenant')

  const stepsData = {
    tenant: [
      {
        step: 'STEP 01',
        title: 'Đăng ký & Tư vấn',
        desc: 'Lọc phòng, chọn mức giá phù hợp. Hồ sơ cá nhân (KYC) được số hóa và chuẩn hóa bằng công nghệ OCR.',
        logLabel: 'Log:',
        logVal: 'KYC_INIT_HASH',
      },
      {
        step: 'STEP 02',
        title: 'Đặt lịch & Xem phòng',
        desc: 'Đặt lịch xem nhà trực tiếp hoặc đi tour thực tế qua kính VR 360°, đảm bảo phòng đúng như mô tả trên tin đăng.',
        logLabel: 'Log:',
        logVal: 'TOUR_CONFIRM_0x7e3',
      },
      {
        step: 'STEP 03',
        title: 'Đặt cọc minh bạch',
        desc: 'Số tiền đặt cọc giữ chỗ và biên nhận chuyển tiền được băm (hash) tự động và lưu vết trên hệ thống Ledger bảo mật.',
        logLabel: 'Ledger:',
        logVal: 'TX_0x2d9a3b8e4f1',
      },
      {
        step: 'STEP 04',
        title: 'Ký kết & Thanh toán',
        desc: 'Smart Contract khóa các điều khoản hợp đồng. Toàn bộ hóa đơn tiền phòng hàng tháng đều lưu vết minh bạch.',
        logLabel: 'Ledger:',
        logVal: 'CONTRACT_SIGNED_0x8f',
      },
    ],
    landlord: [
      {
        step: 'STEP 01',
        title: 'Ký số & Định danh KYC',
        desc: 'Xác minh danh tính chủ sở hữu tài sản. Tạo ví điện tử liên kết phục vụ thanh toán hợp đồng thông minh.',
        logLabel: 'Log:',
        logVal: 'KYC_LANDLORD_HASH',
      },
      {
        step: 'STEP 02',
        title: 'Đăng tin & Token hóa',
        desc: 'Tạo hồ sơ tài sản trực tuyến, kiểm tra giấy tờ pháp lý của chung cư và phát hành tin đăng căn hộ trên ứng dụng.',
        logLabel: 'Log:',
        logVal: 'PROP_TOKEN_0x5b3',
      },
      {
        step: 'STEP 03',
        title: 'Tiếp nhận đặt lịch & Cọc',
        desc: 'Nhận và phê duyệt yêu cầu hẹn xem nhà của khách. Giám sát tiền đặt cọc giữ chỗ được khóa an toàn vào Smart Contract Escrow.',
        logLabel: 'Ledger:',
        logVal: 'ESCROW_DEP_0x2d9',
      },
      {
        step: 'STEP 04',
        title: 'Ký hợp đồng & Thu tiền',
        desc: 'Ký số hợp đồng thuê bằng ví blockchain. Theo dõi lịch thu tiền thuê tự động hàng tháng từ khách thuê.',
        logLabel: 'Ledger:',
        logVal: 'LEASE_ACTIVE_0x992',
      },
    ],
  }

  return (
    <div className="min-h-screen bg-bg text-fg selection:bg-primary/20 selection:text-primary">
      <HomeHeader />

      <main className="w-full text-left">
        {/* Header Hero Section (Warm Cream Design with Topography Overlay) */}
        <section className="relative flex flex-col items-center justify-center bg-gradient-to-b from-[#f5ece2] via-[#faf6f1] to-bg pb-20 pt-32 text-center rounded-b-[40px] border-b border-border">
          {/* Topography SVG Background (extremely lightweight, vector-rendered) */}
          <div
            className="absolute inset-0 opacity-[0.08] pointer-events-none select-none overflow-hidden"
            style={{
              willChange: 'transform',
              transform: 'translate3d(0, 0, 0)',
              backfaceVisibility: 'hidden',
            }}
          >
            <svg
              className="w-full h-full min-w-[1440px] min-h-[300px]"
              viewBox="0 0 1440 300"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              preserveAspectRatio="none"
            >
              <path
                d="M-100 80 C 300 10, 600 150, 1000 60 C 1200 30, 1500 100, 1600 80"
                stroke="currentColor"
                className="text-primary"
                strokeWidth="1.5"
                fill="none"
              />
              <path
                d="M-100 110 C 300 40, 600 180, 1000 90 C 1200 60, 1500 130, 1600 110"
                stroke="currentColor"
                className="text-primary"
                strokeWidth="1.5"
                fill="none"
              />
              <path
                d="M-100 140 C 300 70, 600 210, 1000 120 C 1200 90, 1500 160, 1600 140"
                stroke="currentColor"
                className="text-primary"
                strokeWidth="1.5"
                fill="none"
              />
              <path
                d="M-100 170 C 300 100, 600 240, 1000 150 C 1200 120, 1500 190, 1600 170"
                stroke="currentColor"
                className="text-primary"
                strokeWidth="1.5"
                fill="none"
              />
              <path
                d="M-100 200 C 300 130, 600 270, 1000 180 C 1200 150, 1500 220, 1600 200"
                stroke="currentColor"
                className="text-primary"
                strokeWidth="1.5"
                fill="none"
              />

              <path
                d="M 100 250 C 400 150, 700 290, 1100 210 C 1300 180, 1500 250, 1600 230"
                stroke="currentColor"
                className="text-primary"
                strokeWidth="1.5"
                fill="none"
              />
              <path
                d="M 100 280 C 400 180, 700 320, 1100 240 C 1300 210, 1500 280, 1600 260"
                stroke="currentColor"
                className="text-primary"
                strokeWidth="1.5"
                fill="none"
              />
            </svg>
          </div>

          <div className="absolute -left-32 -top-32 w-96 h-96 bg-primary/5 rounded-full blur-[100px] pointer-events-none" />
          <div className="absolute -right-32 -bottom-32 w-96 h-96 bg-accent/5 rounded-full blur-[100px] pointer-events-none" />

          <div className="mx-auto w-full max-w-6xl px-6 md:px-10 z-10 relative">
            <span className="font-mono text-xs font-bold uppercase tracking-widest text-primary mb-2 block">
              MINH BẠCH GIAO DỊCH
            </span>
            <h1 className="font-marketing text-3xl font-bold leading-tight sm:text-4xl text-fg">
              {role === 'tenant'
                ? 'Hành trình thuê bảo mật bằng Blockchain'
                : 'Tiến trình cho thuê minh bạch qua Blockchain'}
            </h1>
            <p className="mx-auto mt-2 max-w-xl font-body text-sm text-muted">
              {role === 'tenant'
                ? 'Mọi mốc giao dịch quan trọng trong toàn bộ hành trình thuê nhà của bạn đều được băm và ghi lại vĩnh viễn trên sổ cái Blockchain.'
                : 'Mọi mốc giao dịch quan trọng trong toàn bộ lịch trình quản lý cho thuê căn hộ đều được ghi lại bất biến bảo vệ quyền sở hữu của bạn.'}
            </p>

            {/* Segmented Control Switcher */}
            <div className="mx-auto max-w-xs flex bg-surface-muted p-1 rounded-xl border border-border mt-8">
              <button
                onClick={() => setRole('tenant')}
                className={`flex-1 py-2 rounded-lg text-xs font-semibold transition-all duration-200 ${
                  role === 'tenant'
                    ? 'bg-primary text-white shadow-sm'
                    : 'text-muted hover:text-fg'
                }`}
              >
                Hành trình đi thuê
              </button>
              <button
                onClick={() => setRole('landlord')}
                className={`flex-1 py-2 rounded-lg text-xs font-semibold transition-all duration-200 ${
                  role === 'landlord'
                    ? 'bg-accent text-fg shadow-sm'
                    : 'text-muted hover:text-fg'
                }`}
              >
                Lịch trình cho thuê
              </button>
            </div>
          </div>
        </section>

        {/* Process Timeline Section */}
        <section className="mx-auto max-w-6xl px-6 py-16 md:px-10">
          <div className="rounded-2xl border border-border bg-white shadow-sm overflow-hidden">
            <div className="grid grid-cols-1 divide-y divide-border md:grid-cols-4 md:divide-y-0 md:divide-x">
              {stepsData[role].map((s, idx) => (
                <div
                  key={idx}
                  className="p-8 space-y-4 flex flex-col justify-between min-h-[300px]"
                >
                  <div>
                    <span
                      className={`font-mono text-xs font-bold ${role === 'tenant' ? 'text-primary' : 'text-accent'}`}
                    >
                      {s.step}
                    </span>
                    <h3 className="font-marketing text-lg font-bold text-fg mt-2">
                      {s.title}
                    </h3>
                    <p className="font-body text-xs text-muted leading-relaxed mt-2">
                      {s.desc}
                    </p>
                  </div>
                  <div className="mt-4 rounded-lg bg-bg/50 p-2.5 font-mono text-[9px] text-muted border border-border/40">
                    <span
                      className={`${role === 'tenant' ? 'text-primary' : 'text-accent'} font-bold`}
                    >
                      {s.logLabel}
                    </span>{' '}
                    {s.logVal}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>

      {/* Page Footer */}
      <Footer />
    </div>
  )
}
