'use client'

import * as React from 'react'
import Link from 'next/link'
import type { Route } from 'next'
import { Button } from '@/shared/ui/button'

export function LandlordSection(): React.ReactElement {
  return (
    <section className="mx-auto max-w-6xl px-6 py-24 md:px-10">
      <div className="relative overflow-hidden rounded-3xl border border-border bg-gradient-to-br from-primary-soft/30 via-white to-accent-soft/20 p-8 md:p-12">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 md:items-center">
          <div className="space-y-6">
            <span className="font-mono text-xs font-bold uppercase tracking-widest text-primary">
              DÀNH CHO CHỦ NHÀ
            </span>
            <h2 className="font-marketing text-3xl font-bold text-fg sm:text-4xl">
              Quản lý căn hộ cho thuê thông minh & hiệu quả hơn
            </h2>
            <p className="font-body text-sm leading-relaxed text-muted">
              TH-PropTech cung cấp công cụ SAAS chuyên nghiệp giúp chủ nhà tối
              ưu tỷ lệ lấp đầy phòng, quản lý hợp đồng thuê và lịch hẹn xem nhà
              tự động.
            </p>
            <div className="space-y-3 font-body text-sm text-fg">
              {[
                'Đăng tin căn hộ nhanh chóng, hỗ trợ tích hợp VR Tour 3D',
                'Duyệt lịch xem nhà tự động của khách thuê thông qua lịch biểu thông minh',
                'Ký hợp đồng điện tử và nhận cọc an toàn, minh bạch',
                'Báo cáo doanh thu và tình hình lấp đầy phòng theo thời gian thực',
              ].map((benefit, i) => (
                <div key={i} className="flex items-start gap-2.5">
                  <div className="mt-1 flex h-4 w-4 shrink-0 items-center justify-center rounded-full bg-primary text-white">
                    <svg
                      className="h-2.5 w-2.5"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth={3.5}
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M4.5 12.75l6 6 9-13.5"
                      />
                    </svg>
                  </div>
                  <span className="text-xs">{benefit}</span>
                </div>
              ))}
            </div>
            <div className="pt-2">
              <Link href={'/process' as Route}>
                <Button
                  variant="primary"
                  className="rounded-full bg-primary hover:bg-primary-hover text-white font-bold"
                >
                  Tìm hiểu quy trình ký gửi
                </Button>
              </Link>
            </div>
          </div>
          <div className="flex flex-col gap-4 rounded-2xl border border-border bg-white p-6 shadow-sm">
            <span className="font-display text-xs font-bold text-muted uppercase">
              Quy trình ký gửi
            </span>
            <div className="relative border-l border-border pl-4 space-y-6">
              {[
                {
                  title: '1. Đăng ký tài khoản',
                  desc: 'Tạo tài khoản chủ nhà và xác minh thông tin sở hữu.',
                },
                {
                  title: '2. Tải lên thông tin',
                  desc: 'Đăng tải thông tin, diện tích, hình ảnh và tiện ích căn hộ.',
                },
                {
                  title: '3. Tích hợp VR Tour',
                  desc: 'Hỗ trợ chụp ảnh 360° tạo VR Tour trực quan cho căn hộ.',
                },
                {
                  title: '4. Bắt đầu vận hành',
                  desc: 'Nhận yêu cầu xem nhà, ký hợp đồng trực tuyến và thu cọc.',
                },
              ].map((step, idx) => (
                <div key={idx} className="relative">
                  <div className="absolute -left-[22px] top-1 flex h-3 w-3 items-center justify-center rounded-full bg-primary ring-4 ring-white" />
                  <h4 className="font-display text-sm font-bold text-fg">
                    {step.title}
                  </h4>
                  <p className="font-body text-xs text-muted mt-0.5">
                    {step.desc}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
