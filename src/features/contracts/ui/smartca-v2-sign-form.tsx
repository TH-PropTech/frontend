'use client'

import { useState } from 'react'
import { signSmartCaV2 } from '../api/contracts-api'

interface SmartCaV2SignFormProps {
  contractId: string
  disabled: boolean
  onSigned?: () => void
}

/**
 * Ký SmartCA v2: mật khẩu + OTP của VNPT SmartCA (không phải Smart OTP nội bộ).
 * Hai giá trị chỉ nằm trong state của form, bị xóa sau mỗi lần gửi và khi
 * component unmount; không đưa vào URL, storage hay thông báo lỗi.
 */
export function SmartCaV2SignForm({
  contractId,
  disabled,
  onSigned,
}: SmartCaV2SignFormProps) {
  const [password, setPassword] = useState('')
  const [otp, setOtp] = useState('')
  const [submitting, setSubmitting] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const handleSubmit = async (): Promise<void> => {
    setSubmitting(true)
    setError(null)
    try {
      await signSmartCaV2(contractId, {
        smartCaPassword: password,
        smartCaOtp: otp,
      })
      onSigned?.()
    } catch {
      setError(
        'Không ký được bằng SmartCA. Kiểm tra mật khẩu, OTP còn hiệu lực rồi thử lại.'
      )
    } finally {
      setPassword('')
      setOtp('')
      setSubmitting(false)
    }
  }

  const inputClass =
    'w-full rounded-lg border border-[var(--border)] bg-[var(--surface)] px-3 py-2 text-xs text-[var(--fg)] focus:outline-none focus:border-[var(--primary)]'

  return (
    <form
      className="space-y-3"
      onSubmit={event => {
        event.preventDefault()
        void handleSubmit()
      }}
    >
      <label className="block space-y-1 text-[11px] font-semibold text-[var(--muted)]">
        Mật khẩu SmartCA
        <input
          type="password"
          autoComplete="off"
          value={password}
          onChange={event => setPassword(event.target.value)}
          className={inputClass}
        />
      </label>
      <label className="block space-y-1 text-[11px] font-semibold text-[var(--muted)]">
        OTP SmartCA
        <input
          type="text"
          inputMode="numeric"
          autoComplete="off"
          value={otp}
          onChange={event => setOtp(event.target.value)}
          className={inputClass}
        />
      </label>
      {error ? (
        <p role="alert" className="text-[11px] text-[var(--danger)]">
          {error}
        </p>
      ) : null}
      <button
        type="submit"
        disabled={disabled || submitting || !password || !otp}
        className="w-full inline-flex items-center justify-center gap-2 px-4 py-2.5 text-xs font-bold rounded-lg bg-[var(--primary)] text-white hover:opacity-90 disabled:opacity-50 transition-opacity"
      >
        {submitting ? 'Đang ký...' : 'Ký bằng SmartCA (mật khẩu + OTP)'}
      </button>
    </form>
  )
}
