'use client'

import * as React from 'react'
import Link from 'next/link'
import type { Route } from 'next'
import { Button } from '@/shared/ui/button'
import {
  ArrowRight,
  CheckCircle2,
  Building2,
  Box,
  CalendarCheck,
  FileSignature,
  Wallet,
} from 'lucide-react'

const BENEFITS = [
  'Đăng tin căn hộ nhanh chóng, tích hợp Mô hình 3D tương tác (Interactive 3D Walkthrough) & Công cụ thiết kế layout căn hộ (Floorplan 3D Editor / Design Requests) qua Three.js',
  'Khách trải nghiệm xem trước căn hộ qua Mô hình 3D tương tác, đặt lịch hẹn xem nhà trực tiếp và nộp Hồ sơ đăng ký thuê (Rental Application) kèm eKYC CCCD',
  'Chủ nhà thẩm định và phê duyệt hồ sơ trên hệ thống, tạo hợp đồng điện tử chuẩn Nghị định 96/2024/NĐ-CP và ký số VNPT SmartCA',
  'Lưu vết tính toàn vẹn và chống sửa đổi trên Blockchain (Hyperledger Fabric), nhận tiền cọc an toàn và giải ngân tự động minh bạch về ví cá nhân (Non-custodial Wallet) hoặc ngân hàng',
]

const STEPS = [
  {
    step: '1',
    icon: Box,
    title: '1. Đăng tin & Tích hợp mô hình 3D',
    desc: 'Đăng tải thông tin căn hộ, tích hợp Mô hình 3D tương tác (Three.js) hoặc gửi yêu cầu thiết kế layout căn hộ (Floorplan 3D Editor / Design Requests).',
  },
  {
    step: '2',
    icon: CalendarCheck,
    title: '2. Thẩm định hồ sơ & Duyệt lịch hẹn',
    desc: 'Khách thuê xem trước mô hình 3D, đặt lịch hẹn xem nhà trực tiếp và gửi Hồ sơ thuê kèm eKYC CCCD để chủ nhà thẩm định, phê duyệt trước khi tạo hợp đồng.',
  },
  {
    step: '3',
    icon: FileSignature,
    title: '3. Ký số hợp đồng chuẩn pháp lý',
    desc: 'Khởi tạo hợp đồng theo mẫu chuẩn Nghị định 96/2024/NĐ-CP, tích hợp Ký số VNPT SmartCA và lưu vết tính toàn vẹn trên Blockchain (Hyperledger Fabric).',
  },
  {
    step: '4',
    icon: Wallet,
    title: '4. Nhận cọc & Giải ngân minh bạch',
    desc: 'Khách thuê thanh toán tiền cọc trực tuyến an toàn, hệ thống tự động giải ngân minh bạch về ví cá nhân (Non-custodial Wallet) hoặc tài khoản ngân hàng của chủ nhà.',
  },
]

export function LandlordSection(): React.ReactElement {
  return (
    <section className="mx-auto max-w-6xl px-6 py-24 md:px-10">
      <div className="relative overflow-hidden rounded-3xl border border-border bg-gradient-to-br from-primary-soft/30 via-white to-accent-soft/20 p-8 md:p-12">
        <div className="grid grid-cols-1 gap-10 lg:grid-cols-2 lg:items-center">
          <div className="space-y-6">
            <div className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary-soft/50 px-3.5 py-1">
              <Building2 className="h-3.5 w-3.5 text-primary" />
              <span className="font-mono text-xs font-bold uppercase tracking-widest text-primary">
                DÀNH CHO CHỦ NHÀ
              </span>
            </div>
            <h2 className="font-marketing text-3xl font-bold text-fg sm:text-4xl leading-tight">
              Quản lý căn hộ cho thuê thông minh & hiệu quả hơn
            </h2>
            <p className="font-body text-sm leading-relaxed text-muted">
              TH-PropTech là nền tảng PropTech tích hợp công nghệ Blockchain và
              Trí tuệ nhân tạo (AI), hỗ trợ chủ nhà cho thuê căn hộ chung cư
              minh bạch, tối ưu tỷ lệ lấp đầy, thẩm định hồ sơ khách thuê tự
              động và quản lý hợp đồng chuẩn pháp lý.
            </p>
            <div className="space-y-3.5 font-body text-sm text-fg">
              {BENEFITS.map((benefit, i) => (
                <div key={i} className="flex items-start gap-3">
                  <div className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary">
                    <CheckCircle2 className="h-4 w-4 text-primary shrink-0" />
                  </div>
                  <span className="text-xs leading-relaxed text-fg">
                    {benefit}
                  </span>
                </div>
              ))}
            </div>
            <div className="pt-2">
              <Link
                href={'/properties/new' as Route}
                aria-label="Bắt đầu đăng tin căn hộ"
              >
                <Button
                  variant="primary"
                  className="min-h-11 rounded-full bg-primary hover:bg-primary-hover px-6 py-3 text-sm font-bold text-white shadow-sm transition-all hover:shadow-md active:scale-95 inline-flex items-center gap-2 cursor-pointer"
                >
                  <span>Bắt đầu đăng tin căn hộ</span>
                  <ArrowRight className="h-4 w-4" />
                </Button>
              </Link>
            </div>
          </div>
          <div className="flex flex-col gap-5 rounded-2xl border border-border bg-white p-6 sm:p-8 shadow-sm">
            <div className="flex items-center justify-between border-b border-border pb-3">
              <span className="font-display text-xs font-bold uppercase tracking-wider text-muted">
                Quy trình dành cho chủ nhà
              </span>
              <span className="font-mono text-[11px] font-semibold text-primary">
                4 bước chuẩn hóa
              </span>
            </div>
            <div className="relative border-l-2 border-primary/20 pl-5 space-y-6 ml-2">
              {STEPS.map(step => (
                <div key={step.step} className="relative">
                  <div className="absolute -left-[29px] top-0.5 flex h-4 w-4 items-center justify-center rounded-full bg-primary ring-4 ring-white shadow-xs" />
                  <div className="space-y-1">
                    <h4 className="font-display text-sm font-bold text-fg flex items-center gap-2">
                      {step.title}
                    </h4>
                    <p className="font-body text-xs text-muted leading-relaxed">
                      {step.desc}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
