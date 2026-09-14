'use client'

import { useState, useRef, useEffect } from 'react'
import {
  KeyRound,
  Clock,
  RotateCcw,
  CheckCircle2,
  AlertCircle,
  Sparkles,
  RefreshCw,
} from 'lucide-react'

export interface SmartOtpStepProps {
  challenge: string
  otpCodeHint?: string | null
  onSubmit: (otpCode: string) => Promise<void> | void
  onResend?: () => Promise<void> | void
  onCancel?: () => void
  isLoading?: boolean
  error?: string | null
}

export function SmartOtpStep({
  challenge,
  otpCodeHint,
  onSubmit,
  onResend,
  onCancel,
  isLoading = false,
  error,
}: SmartOtpStepProps) {
  const [digits, setDigits] = useState<string[]>(['', '', '', '', '', ''])
  const [timeLeft, setTimeLeft] = useState(120)
  const inputRefs = useRef<(HTMLInputElement | null)[]>([])

  // Countdown timer
  useEffect(() => {
    if (timeLeft <= 0) return
    const timer = setInterval(() => {
      setTimeLeft(prev => prev - 1)
    }, 1000)
    return () => clearInterval(timer)
  }, [timeLeft])

  // Focus first input on mount
  useEffect(() => {
    inputRefs.current[0]?.focus()
  }, [])

  const handleDigitChange = (index: number, val: string) => {
    // Only accept numeric
    const cleanVal = val.replace(/\D/g, '')
    if (!cleanVal && val !== '') return

    const newDigits = [...digits]
    if (cleanVal.length > 1) {
      // Handle paste
      const pasted = cleanVal.slice(0, 6).split('')
      for (let i = 0; i < 6; i++) {
        newDigits[i] = pasted[i] || ''
      }
      setDigits(newDigits)
      if (pasted.length === 6) {
        inputRefs.current[5]?.focus()
        onSubmit(newDigits.join(''))
      } else {
        inputRefs.current[Math.min(pasted.length, 5)]?.focus()
      }
      return
    }

    newDigits[index] = cleanVal
    setDigits(newDigits)

    // Auto advance focus
    if (cleanVal && index < 5) {
      inputRefs.current[index + 1]?.focus()
    }

    // Auto submit if all 6 digits entered
    if (cleanVal && index === 5 && newDigits.every(d => d !== '')) {
      onSubmit(newDigits.join(''))
    }
  }

  const handleKeyDown = (
    index: number,
    e: React.KeyboardEvent<HTMLInputElement>
  ) => {
    if (e.key === 'Backspace' && !digits[index] && index > 0) {
      inputRefs.current[index - 1]?.focus()
    }
  }

  const handleQuickFill = () => {
    if (!otpCodeHint || otpCodeHint.length !== 6) return
    const split = otpCodeHint.split('')
    setDigits(split)
    inputRefs.current[5]?.focus()
    onSubmit(otpCodeHint)
  }

  const handleResendClick = async () => {
    setTimeLeft(120)
    setDigits(['', '', '', '', '', ''])
    await onResend?.()
    inputRefs.current[0]?.focus()
  }

  const isComplete = digits.every(d => d !== '')

  return (
    <div
      data-testid="smart-otp-step"
      className="flex flex-col items-center gap-4 w-full text-center"
    >
      <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[var(--fg)]">
        <KeyRound className="w-4 h-4 text-[var(--primary)]" />
        <span>Bước 2: Ký xác nhận qua Smart OTP</span>
      </div>

      {/* Challenge Display */}
      <div className="p-3 rounded-lg bg-[var(--surface-muted)] border border-[var(--border)] w-full max-w-sm flex items-center justify-between gap-2 text-xs">
        <span className="text-[var(--muted)]">Mã phiên đối soát:</span>
        <span className="font-mono font-bold text-[var(--primary)]">
          {challenge || 'CHAL-POC-VERIFY'}
        </span>
      </div>

      {/* PoC Fast Testing Code Hint */}
      {otpCodeHint && (
        <div
          data-testid="otp-hint-banner"
          className="flex items-center justify-between gap-2 p-2.5 rounded-lg border border-[var(--primary)] bg-[var(--surface-muted)] w-full max-w-sm text-xs"
        >
          <div className="flex items-center gap-1.5 text-[var(--primary)] font-medium">
            <Sparkles className="w-4 h-4 shrink-0" />
            <span>
              Mã OTP mô phỏng: <strong>{otpCodeHint}</strong>
            </span>
          </div>
          <button
            type="button"
            onClick={handleQuickFill}
            aria-label="Điền nhanh mã OTP"
            className="px-2 py-1 text-[11px] font-bold rounded bg-[var(--primary)] text-white hover:opacity-90 transition-opacity"
          >
            Điền nhanh
          </button>
        </div>
      )}

      {/* 6 Digit Input Boxes */}
      <div className="flex items-center justify-center gap-2 my-2">
        {digits.map((digit, idx) => (
          <input
            key={idx}
            ref={el => {
              inputRefs.current[idx] = el
            }}
            type="text"
            inputMode="numeric"
            pattern="[0-9]*"
            maxLength={6}
            value={digit}
            onChange={e => handleDigitChange(idx, e.target.value)}
            onKeyDown={e => handleKeyDown(idx, e)}
            disabled={isLoading || timeLeft <= 0}
            aria-label={`Số OTP thứ ${idx + 1}`}
            className="w-10 h-12 sm:w-12 sm:h-14 text-center text-lg sm:text-xl font-bold font-mono rounded-lg border-2 border-[var(--border)] bg-[var(--surface)] text-[var(--fg)] focus:border-[var(--primary)] focus:outline-none transition-colors"
          />
        ))}
      </div>

      {/* Timer & Resend */}
      <div className="flex items-center gap-2 text-xs text-[var(--muted)]">
        <Clock className="w-3.5 h-3.5" />
        {timeLeft > 0 ? (
          <span>
            Mã OTP còn hiệu lực trong:{' '}
            <strong className="text-[var(--fg)]">{timeLeft}s</strong>
          </span>
        ) : (
          <span className="text-[var(--danger)] font-medium">
            Mã OTP đã hết hiệu lực.
          </span>
        )}
      </div>

      {/* Error Message */}
      {error && (
        <div className="flex items-center gap-1.5 text-xs text-[var(--danger)] max-w-xs text-center">
          <AlertCircle className="w-4 h-4 shrink-0" />
          <span>{error}</span>
        </div>
      )}

      {/* CTA Buttons */}
      <div className="flex flex-col gap-2 w-full max-w-xs mt-2">
        <button
          type="button"
          onClick={() => onSubmit(digits.join(''))}
          disabled={!isComplete || isLoading || timeLeft <= 0}
          aria-label="Xác nhận ký số OTP"
          className="w-full inline-flex items-center justify-center gap-2 px-4 py-2.5 text-xs font-bold rounded-lg bg-[var(--primary)] text-white hover:opacity-90 disabled:opacity-50 transition-opacity shadow-sm"
        >
          {isLoading ? (
            <>
              <RefreshCw className="w-4 h-4 animate-spin" />
              <span>Đang xác nhận chữ ký...</span>
            </>
          ) : (
            <>
              <CheckCircle2 className="w-4 h-4" />
              <span>Xác nhận ký hợp đồng</span>
            </>
          )}
        </button>

        {timeLeft <= 0 && onResend && (
          <button
            type="button"
            onClick={handleResendClick}
            disabled={isLoading}
            aria-label="Gửi lại mã OTP"
            className="w-full inline-flex items-center justify-center gap-1.5 px-3 py-2 text-xs font-semibold rounded-lg border border-[var(--border)] bg-[var(--surface-muted)] text-[var(--fg)] hover:bg-[var(--surface)] transition-colors"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Gửi lại mã OTP mới</span>
          </button>
        )}

        {onCancel && (
          <button
            type="button"
            onClick={onCancel}
            className="text-xs text-[var(--muted)] hover:underline mt-1"
          >
            Quay lại
          </button>
        )}
      </div>
    </div>
  )
}
