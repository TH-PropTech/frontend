'use client'

import * as React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import type { Route } from 'next'
import { Button } from '@/shared/ui/button'

export function HeroSection(): React.ReactElement {
  return (
    <section className="relative flex min-h-[90vh] items-center justify-center overflow-hidden pb-24 pt-32 rounded-b-[40px] shadow-[0_24px_50px_-10px_rgba(43,33,30,0.16)] border-b border-white/5">
      {/* Parallax / Animated Background Frame */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/c10c12b6-901f-4f31-ba98-50fd2e28df00.png"
          alt="TH-PropTech Hero Background"
          fill
          priority
          className="object-cover brightness-[0.55] saturate-[0.85] transition-transform duration-1000"
        />
        {/* Warm brown gradient overlays from prototype */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#2b211e]/82 via-[#2b211e]/60 to-[#2b211e]/20" />
        <div className="absolute inset-0 bg-gradient-to-b from-[#2b211e]/20 to-[#2b211e]/30" />
      </div>

      {/* Hero Content Inner */}
      <div className="relative z-10 mx-auto w-full max-w-6xl px-6 md:px-10">
        <div className="max-w-3xl space-y-6 text-white animate-in fade-in slide-in-from-bottom-8 duration-700">
          <span className="font-mono text-xs font-bold uppercase tracking-widest text-white/85">
            Trustworthy PropTech SaaS
          </span>
          <h1 className="font-display text-4xl font-bold leading-[1.02] tracking-tight sm:text-5xl md:text-[62px] text-white">
            Tìm căn hộ phù hợp,
            <br />
            minh bạch từng bước.
          </h1>
          <p className="max-w-xl font-body text-base md:text-lg text-white/85 leading-relaxed">
            TH-PropTech giúp khách thuê lọc căn hộ, đặt lịch xem, theo dõi đặt
            cọc, hợp đồng và thanh toán trong một luồng vận hành rõ trạng thái.
          </p>
          <div className="flex flex-wrap gap-4 pt-2">
            <Link href={'/properties' as Route}>
              <Button
                variant="primary"
                size="lg"
                className="rounded-full shadow-[0_14px_32px_rgba(198,90,58,0.25)] bg-primary hover:bg-primary-hover text-white font-bold transition-all hover:-translate-y-0.5"
              >
                Tìm căn hộ ngay
              </Button>
            </Link>
            <Link href={'/vr' as Route}>
              <Button
                variant="secondary"
                size="lg"
                className="rounded-full border border-white/45 bg-white/10 text-white backdrop-blur-md hover:bg-white/20 font-bold transition-all hover:-translate-y-0.5"
              >
                Khám phá VR 3D
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}
