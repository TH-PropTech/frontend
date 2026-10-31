'use client'

import * as React from 'react'
import Link from 'next/link'
import type { Route } from 'next'
import { Input } from '@/shared/ui/input'
import { Button } from '@/shared/ui/button'
import { apiClient } from '@/shared/api/api-client'

export function ForgotPasswordForm(): React.ReactElement {
  const [isLoading, setIsLoading] = React.useState(false)
  const [isSent, setIsSent] = React.useState(false)
  const [email, setEmail] = React.useState('')
  const [otp, setOtp] = React.useState('')
  const [newPassword, setNewPassword] = React.useState('')
  const [confirmPassword, setConfirmPassword] = React.useState('')
  const [errorMsg, setErrorMsg] = React.useState('')
  const [successMsg, setSuccessMsg] = React.useState('')

  async function handleSendOtp(
    e: React.FormEvent<HTMLFormElement>
  ): Promise<void> {
    e.preventDefault()
    setErrorMsg('')
    setSuccessMsg('')
    setIsLoading(true)

    try {
      await apiClient.post('/auth/forgot-password/request', { email })
      setSuccessMsg('Mã OTP khôi phục mật khẩu đã được gửi đến email của bạn.')
      setIsSent(true)
    } catch (err: unknown) {
      const msg =
        err instanceof Error ? err.message : 'Yêu cầu gửi OTP thất bại.'
      setErrorMsg(msg)
    } finally {
      setIsLoading(false)
    }
  }

  async function handleResetPassword(
    e: React.FormEvent<HTMLFormElement>
  ): Promise<void> {
    e.preventDefault()
    setErrorMsg('')
    setSuccessMsg('')

    if (newPassword !== confirmPassword) {
      setErrorMsg('Mật khẩu xác nhận không khớp.')
      return
    }

    setIsLoading(true)

    try {
      await apiClient.post('/auth/forgot-password/reset', {
        email,
        otp,
        newPassword,
      })

      setSuccessMsg(
        'Đặt lại mật khẩu thành công! Đang chuyển hướng về trang đăng nhập...'
      )
      setTimeout(() => {
        window.location.href = '/login'
      }, 2000)
    } catch (err: unknown) {
      const msg =
        err instanceof Error
          ? err.message
          : 'Đặt lại mật khẩu thất bại. Vui lòng kiểm tra lại OTP.'
      setErrorMsg(msg)
    } finally {
      setIsLoading(false)
    }
  }

  if (isSent) {
    return (
      <form
        onSubmit={handleResetPassword}
        className="flex flex-col gap-5 animate-in fade-in duration-300"
      >
        <div className="flex flex-col gap-2">
          <h3 className="font-display text-lg font-bold text-fg">
            Nhập mã xác thực & Mật khẩu mới
          </h3>
          <p className="text-sm text-muted leading-relaxed">
            Mã OTP đã được gửi đến email{' '}
            <strong className="text-fg">{email}</strong>. Vui lòng nhập mã OTP
            và điền mật khẩu mới của bạn bên dưới.
          </p>
        </div>

        {errorMsg && (
          <div className="bg-accent/10 border border-accent/20 text-accent text-xs p-3 rounded-lg font-semibold">
            {errorMsg}
          </div>
        )}
        {successMsg && (
          <div className="bg-accent-2/10 border border-accent-2/20 text-accent-2 text-xs p-3 rounded-lg font-semibold">
            {successMsg}
          </div>
        )}

        <Input
          label="Mã xác thực OTP (6 chữ số)"
          type="text"
          placeholder="000000"
          maxLength={6}
          value={otp}
          onChange={e => setOtp(e.target.value.replace(/\D/g, ''))}
          required
          className="min-h-11 text-center tracking-widest text-lg font-bold"
          icon={
            <svg
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <circle cx="12" cy="12" r="10" />
              <polyline points="12 6 12 12 16 14" />
            </svg>
          }
        />

        <Input
          className="min-h-11"
          label="Mật khẩu mới"
          type="password"
          placeholder="Tối thiểu 8 ký tự"
          required
          value={newPassword}
          onChange={e => setNewPassword(e.target.value)}
          minLength={8}
          icon={
            <svg
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
              <path d="M7 11V7a5 5 0 0 1 10 0v4" />
            </svg>
          }
        />

        <Input
          className="min-h-11"
          label="Xác nhận mật khẩu mới"
          type="password"
          placeholder="Nhập lại mật khẩu mới"
          required
          value={confirmPassword}
          onChange={e => setConfirmPassword(e.target.value)}
          minLength={8}
          icon={
            <svg
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
            </svg>
          }
        />

        <Button
          type="submit"
          size="lg"
          loading={isLoading}
          className="min-h-11 w-full"
        >
          Xác thực & Đặt lại mật khẩu
        </Button>

        <button
          type="button"
          onClick={() => setIsSent(false)}
          className="text-center text-xs font-semibold text-muted hover:text-fg transition-colors"
        >
          Quay lại nhập email
        </button>
      </form>
    )
  }

  return (
    <form
      onSubmit={handleSendOtp}
      className="flex flex-col gap-5 animate-in fade-in duration-300"
    >
      <div className="flex flex-col gap-2">
        <p className="text-sm text-muted leading-relaxed">
          Nhập địa chỉ email đã đăng ký. Chúng tôi sẽ gửi cho bạn mã OTP để tiến
          hành đặt lại mật khẩu.
        </p>
      </div>

      {errorMsg && (
        <div className="bg-accent/10 border border-accent/20 text-accent text-xs p-3 rounded-lg font-semibold">
          {errorMsg}
        </div>
      )}
      {successMsg && (
        <div className="bg-accent-2/10 border border-accent-2/20 text-accent-2 text-xs p-3 rounded-lg font-semibold">
          {successMsg}
        </div>
      )}

      <Input
        className="min-h-11"
        label="Email"
        type="email"
        placeholder="email@example.com"
        value={email}
        onChange={e => setEmail(e.target.value)}
        required
        autoComplete="email"
        autoFocus
        icon={
          <svg
            width="18"
            height="18"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <rect x="2" y="4" width="20" height="16" rx="2" />
            <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
          </svg>
        }
      />

      <Button
        type="submit"
        size="lg"
        loading={isLoading}
        className="min-h-11 w-full"
      >
        Gửi mã OTP khôi phục
      </Button>

      <Link
        href={'/login' as Route}
        className="inline-flex min-h-11 items-center justify-center text-center text-sm font-medium text-primary hover:text-primary-hover transition-colors"
      >
        ← Quay lại đăng nhập
      </Link>
    </form>
  )
}
