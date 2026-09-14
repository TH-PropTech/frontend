'use client'

import { useEffect, useState } from 'react'
import { ShieldCheck, Sparkles } from 'lucide-react'

export interface SignatureAnimationProps {
  signerName?: string
  role?: 'tenant' | 'landlord'
  onComplete?: () => void
  durationMs?: number
}

export function SignatureAnimation({
  signerName = 'Người ký',
  role = 'tenant',
  onComplete,
  durationMs = 2200,
}: SignatureAnimationProps) {
  const [animationDone, setAnimationDone] = useState(false)

  useEffect(() => {
    // Check prefers-reduced-motion safely
    const prefersReducedMotion =
      typeof window !== 'undefined' &&
      typeof window.matchMedia === 'function' &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches

    const timeout = setTimeout(
      () => {
        setAnimationDone(true)
        onComplete?.()
      },
      prefersReducedMotion ? 100 : durationMs
    )

    return () => clearTimeout(timeout)
  }, [durationMs, onComplete])

  const roleText =
    role === 'tenant' ? 'Bên thuê (Bên B)' : 'Bên cho thuê (Bên A)'

  return (
    <div
      data-testid="signature-animation"
      className="flex flex-col items-center justify-center p-6 w-full text-center gap-6"
    >
      <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[var(--primary)]">
        <Sparkles className="w-4 h-4 animate-spin text-[var(--primary)]" />
        <span>Khắc ấn chữ ký số e-Consent</span>
      </div>

      {/* Signature & Seal Animation Container */}
      <div className="relative w-72 h-44 rounded-xl border-2 border-dashed border-[var(--border)] bg-[var(--surface)] p-4 flex flex-col items-center justify-center shadow-inner overflow-hidden">
        {/* Animated Cursive SVG Signature Path */}
        <svg
          viewBox="0 0 300 120"
          className="w-56 h-24 text-[var(--primary)]"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M 20 80 C 60 20, 70 110, 110 50 C 130 10, 150 90, 180 40 C 200 10, 210 80, 240 30 C 250 15, 270 90, 290 60"
            stroke="currentColor"
            strokeWidth="3.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="animate-[dash_1.8s_ease-in-out_forwards]"
            style={{
              strokeDasharray: 600,
              strokeDashoffset: animationDone ? 0 : 600,
              transition: 'stroke-dashoffset 1.8s ease-in-out',
            }}
          />
        </svg>

        {/* Signer Text Name below signature */}
        <span className="text-xs font-bold font-serif text-[var(--fg)] tracking-wide mt-1">
          {signerName}
        </span>
        <span className="text-[10px] text-[var(--muted)]">{roleText}</span>

        {/* Digital Seal Stamp */}
        <div
          data-testid="digital-seal-stamp"
          className={`absolute -right-2 -bottom-2 w-20 h-20 rounded-full border-2 border-[var(--success)] flex flex-col items-center justify-center p-1 bg-[var(--surface)]/90 backdrop-blur-sm shadow-sm transition-all duration-500 rotate-[-12deg] ${
            animationDone ? 'scale-100 opacity-100' : 'scale-50 opacity-0'
          }`}
        >
          <ShieldCheck className="w-5 h-5 text-[var(--success)]" />
          <span className="text-[8px] font-extrabold uppercase text-[var(--success)] tracking-tighter text-center leading-none mt-0.5">
            E-CONSENT
            <br />
            XÁC NHẬN
          </span>
        </div>
      </div>

      <div className="flex flex-col items-center gap-1">
        <p className="text-xs font-semibold text-[var(--fg)]">
          {animationDone
            ? 'Đã gắn chữ ký số và bằng chứng sinh trắc học vào hợp đồng!'
            : 'Đang tạo bằng chứng xác thực và ký số vào bản hợp đồng...'}
        </p>
        <p className="text-[11px] text-[var(--muted)] max-w-xs">
          Mã băm SHA-256 nội dung hợp đồng và biên bản đối soát khuôn mặt đã
          được liên kết bất biến.
        </p>
      </div>
    </div>
  )
}
