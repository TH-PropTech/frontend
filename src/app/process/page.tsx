'use client'

import * as React from 'react'
import { HomeHeader } from '@/widgets/home-dashboard/ui/home-header'

export default function ProcessPage(): React.ReactElement {
  return (
    <div className="min-h-screen bg-bg text-fg selection:bg-primary/20 selection:text-primary">
      <HomeHeader />

      <main className="w-full">
        {/* Header Hero Section */}
        <section className="relative flex flex-col items-center justify-center bg-gradient-to-b from-[#f4eee7]/60 to-[#faf7f2] pb-24 pt-32 text-center rounded-b-[40px] border-b border-border">
          <div className="mx-auto w-full max-w-6xl px-6 md:px-10 z-10">
            <span className="font-mono text-xs font-bold uppercase tracking-widest text-[#c65a3a] mb-2 block">
              MINH BẠCH GIAO DỊCH
            </span>
            <h1 className="font-display text-3xl font-bold leading-tight sm:text-4xl text-[#2b211e]">
              Hành trình thuê bảo mật bằng Blockchain
            </h1>
            <p className="mx-auto mt-2 max-w-xl font-body text-sm text-[#7a6a61]">
              Mọi mốc giao dịch quan trọng trong toàn bộ hành trình thuê nhà của
              bạn đều được băm và ghi lại vĩnh viễn trên sổ cái Blockchain.
            </p>
          </div>
        </section>

        {/* Process Timeline Section */}
        <section className="mx-auto max-w-6xl px-6 py-16 md:px-10">
          <div className="rounded-2xl border border-border bg-white shadow-sm overflow-hidden">
            <div className="grid grid-cols-1 divide-y divide-border md:grid-cols-4 md:divide-y-0 md:divide-x">
              <div className="p-8 space-y-4 flex flex-col justify-between min-h-[300px]">
                <div>
                  <span className="font-mono text-xs font-bold text-primary">
                    STEP 01
                  </span>
                  <h3 className="font-marketing text-lg font-bold text-fg mt-2">
                    Đăng ký & Tư vấn
                  </h3>
                  <p className="font-body text-xs text-muted leading-relaxed mt-2">
                    Lọc phòng, chọn mức giá phù hợp. Hồ sơ cá nhân (KYC) được số
                    hóa và chuẩn hóa bằng công nghệ OCR.
                  </p>
                </div>
                <div className="mt-4 rounded-lg bg-bg/50 p-2.5 font-mono text-[9px] text-muted-foreground border border-border/40">
                  <span className="text-primary font-bold">Log:</span>{' '}
                  KYC_INIT_HASH
                </div>
              </div>

              <div className="p-8 space-y-4 flex flex-col justify-between min-h-[300px]">
                <div>
                  <span className="font-mono text-xs font-bold text-primary">
                    STEP 02
                  </span>
                  <h3 className="font-marketing text-lg font-bold text-fg mt-2">
                    Đặt lịch & Xem phòng
                  </h3>
                  <p className="font-body text-xs text-muted leading-relaxed mt-2">
                    Đặt lịch xem nhà trực tiếp hoặc đi tour thực tế qua kính VR
                    360°, đảm bảo phòng đúng như mô tả trên tin đăng.
                  </p>
                </div>
                <div className="mt-4 rounded-lg bg-bg/50 p-2.5 font-mono text-[9px] text-muted-foreground border border-border/40">
                  <span className="text-primary font-bold">Log:</span>{' '}
                  TOUR_CONFIRM_0x7e3
                </div>
              </div>

              <div className="p-8 space-y-4 flex flex-col justify-between min-h-[300px]">
                <div>
                  <span className="font-mono text-xs font-bold text-primary">
                    STEP 03
                  </span>
                  <h3 className="font-marketing text-lg font-bold text-fg mt-2">
                    Đặt cọc minh bạch
                  </h3>
                  <p className="font-body text-xs text-muted leading-relaxed mt-2">
                    Số tiền đặt cọc giữ chỗ và biên nhận chuyển tiền được băm
                    (hash) tự động và lưu vết trên hệ thống Ledger bảo mật.
                  </p>
                </div>
                <div className="mt-4 rounded-lg bg-bg/50 p-2.5 font-mono text-[9px] text-muted-foreground border border-border/40">
                  <span className="text-primary font-bold">Ledger:</span>{' '}
                  TX_0x2d9a3b8e4f1
                </div>
              </div>

              <div className="p-8 space-y-4 flex flex-col justify-between min-h-[300px]">
                <div>
                  <span className="font-mono text-xs font-bold text-primary">
                    STEP 04
                  </span>
                  <h3 className="font-marketing text-lg font-bold text-fg mt-2">
                    Ký kết & Thanh toán
                  </h3>
                  <p className="font-body text-xs text-muted leading-relaxed mt-2">
                    Smart Contract khóa các điều khoản hợp đồng. Toàn bộ hóa đơn
                    tiền phòng hàng tháng đều lưu vết minh bạch.
                  </p>
                </div>
                <div className="mt-4 rounded-lg bg-bg/50 p-2.5 font-mono text-[9px] text-muted-foreground border border-border/40">
                  <span className="text-primary font-bold">Ledger:</span>{' '}
                  CONTRACT_SIGNED_0x8f
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* Page Footer */}
      <footer className="border-t border-border bg-surface py-10">
        <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-6 px-6 sm:flex-row md:px-10">
          <div className="flex flex-col items-center gap-1 sm:items-start">
            <span className="font-display text-sm font-bold text-fg">
              © TH-PropTech · 2026
            </span>
            <span className="font-body text-[11px] text-muted">
              Khóa luận tốt nghiệp ngành KTPM · Đại học HUTECH
            </span>
          </div>
          <span className="text-center font-mono text-[11px] text-muted sm:text-right">
            Tư vấn thuê căn hộ · Trạng thái giao dịch · Bằng chứng Blockchain
          </span>
        </div>
      </footer>
    </div>
  )
}
