'use client'

import * as React from 'react'
import Link from 'next/link'
import type { Route } from 'next'
import { useRouter } from 'next/navigation'
import { Input } from '@/shared/ui/input'
import { Button } from '@/shared/ui/button'
import { apiClient } from '@/shared/api/api-client'
import { TermsModal, PrivacyModal } from './auth-modals'

export function RegisterForm(): React.ReactElement {
  const router = useRouter()
  const [isLoading, setIsLoading] = React.useState(false)
  const [showTerms, setShowTerms] = React.useState(false)
  const [showPrivacy, setShowPrivacy] = React.useState(false)

  // Controlled states for register inputs
  const [fullName, setFullName] = React.useState('')
  const [phone, setPhone] = React.useState('')
  const [email, setEmail] = React.useState('')
  const [cccd, setCccd] = React.useState('')
  const [password, setPassword] = React.useState('')
  const [confirmPassword, setConfirmPassword] = React.useState('')
  const [errorMsg, setErrorMsg] = React.useState('')
  const [successMsg, setSuccessMsg] = React.useState('')

  // OTP state
  const [isOtpSent, setIsOtpSent] = React.useState(false)
  const [otp, setOtp] = React.useState('')

  // Gửi OTP đăng ký
  async function handleSubmit(
    e: React.FormEvent<HTMLFormElement>
  ): Promise<void> {
    e.preventDefault()
    setErrorMsg('')
    setSuccessMsg('')

    if (password !== confirmPassword) {
      setErrorMsg('Mật khẩu xác nhận không khớp.')
      return
    }

    setIsLoading(true)

    try {
      await apiClient.post('/auth/signup/request-otp', {
        email,
        phone,
      })
      setSuccessMsg('Mã OTP xác thực đăng ký đã được gửi đến email của bạn.')
      setIsOtpSent(true)
    } catch (err: unknown) {
      const msg =
        err instanceof Error ? err.message : 'Yêu cầu gửi OTP đăng ký thất bại.'
      setErrorMsg(msg)
    } finally {
      setIsLoading(false)
    }
  }

  // Xác nhận OTP để hoàn tất đăng ký
  async function handleRegister(
    e: React.FormEvent<HTMLFormElement>
  ): Promise<void> {
    e.preventDefault()
    setErrorMsg('')
    setSuccessMsg('')
    setIsLoading(true)

    try {
      await apiClient.post('/auth/signup', {
        email,
        phone,
        password,
        fullName,
        role,
        otp,
      })

      setSuccessMsg('Đăng ký tài khoản thành công! Đang chuyển hướng...')
      localStorage.setItem('showWelcomeModal', 'true')
      setTimeout(() => {
        router.push('/login' as Route)
      }, 2000)
    } catch (err: unknown) {
      const msg =
        err instanceof Error
          ? err.message
          : 'Xác thực OTP đăng ký thất bại. Vui lòng kiểm tra lại.'
      setErrorMsg(msg)
    } finally {
      setIsLoading(false)
    }
  }

  // Gửi lại mã OTP
  async function handleResendOtp(): Promise<void> {
    setErrorMsg('')
    setSuccessMsg('')
    setIsLoading(true)

    try {
      await apiClient.post('/auth/signup/request-otp', {
        email,
        phone,
      })
      setSuccessMsg('Mã OTP mới đã được gửi lại vào email của bạn.')
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : 'Gửi lại OTP thất bại.'
      setErrorMsg(msg)
    } finally {
      setIsLoading(false)
    }
  }

  if (isOtpSent) {
    return (
      <form
        onSubmit={handleRegister}
        className="flex flex-col gap-5 animate-in fade-in duration-300"
      >
        <div className="flex flex-col gap-2">
          <h3 className="font-display text-lg font-bold text-fg">
            Xác thực Đăng ký Tài khoản
          </h3>
          <p className="text-sm text-muted leading-relaxed">
            Mã OTP xác thực đã được gửi đến email{' '}
            <strong className="text-fg">{email}</strong>. Vui lòng nhập mã OTP
            để kích hoạt tài khoản của bạn.
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
          className="text-center tracking-widest text-lg font-bold"
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

        <Button
          type="submit"
          size="lg"
          loading={isLoading}
          className="w-full mt-1"
        >
          Xác nhận & Hoàn tất
        </Button>

        <div className="flex flex-col gap-2 text-center text-sm">
          <button
            type="button"
            onClick={handleResendOtp}
            disabled={isLoading}
            className="font-semibold text-primary hover:text-primary-hover underline transition-colors disabled:opacity-50"
          >
            Gửi lại mã OTP
          </button>

          <button
            type="button"
            onClick={() => {
              setIsOtpSent(false)
              setOtp('')
              setErrorMsg('')
              setSuccessMsg('')
            }}
            className="text-muted hover:text-fg underline transition-colors"
          >
            Quay lại sửa thông tin
          </button>
        </div>
      </form>
    )
  }

  return (
    <>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        {/* Error / Success messages */}
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

        {/* Name row */}
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <Input
            label="Họ và tên"
            type="text"
            placeholder="Nguyễn Văn A"
            value={fullName}
            onChange={e => setFullName(e.target.value)}
            required
            autoComplete="name"
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
                <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                <circle cx="12" cy="7" r="4" />
              </svg>
            }
          />
          <Input
            label="Số điện thoại"
            type="tel"
            placeholder="0912 345 678"
            value={phone}
            onChange={e => setPhone(e.target.value.replace(/\D/g, ''))}
            required
            autoComplete="tel"
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
                <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z" />
              </svg>
            }
          />
        </div>

        <Input
          label="Email"
          type="email"
          placeholder="email@example.com"
          value={email}
          onChange={e => setEmail(e.target.value)}
          required
          autoComplete="email"
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

        <Input
          label="CCCD / CMND"
          type="text"
          placeholder="0012345678901"
          value={cccd}
          onChange={e => setCccd(e.target.value.replace(/\D/g, ''))}
          required
          autoComplete="off"
          maxLength={12}
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
              <rect x="2" y="5" width="20" height="14" rx="2" />
              <line x1="2" y1="10" x2="22" y2="10" />
            </svg>
          }
        />

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <Input
            label="Mật khẩu"
            type="password"
            placeholder="Tối thiểu 8 ký tự"
            value={password}
            onChange={e => setPassword(e.target.value)}
            required
            autoComplete="new-password"
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
            label="Xác nhận mật khẩu"
            type="password"
            placeholder="Nhập lại mật khẩu"
            value={confirmPassword}
            onChange={e => setConfirmPassword(e.target.value)}
            required
            autoComplete="new-password"
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
        </div>

        {/* Terms */}
        <label className="flex items-start gap-2.5 cursor-pointer">
          <input
            type="checkbox"
            required
            className="mt-0.5 h-4 w-4 rounded border-border accent-primary"
          />
          <span className="text-xs text-muted leading-relaxed">
            Tôi đồng ý với{' '}
            <button
              type="button"
              onClick={() => setShowTerms(true)}
              className="font-medium text-primary hover:text-primary-hover underline focus:outline-none"
            >
              Điều khoản sử dụng
            </button>{' '}
            và{' '}
            <button
              type="button"
              onClick={() => setShowPrivacy(true)}
              className="font-medium text-primary hover:text-primary-hover underline focus:outline-none"
            >
              Chính sách bảo mật
            </button>
          </span>
        </label>

        <Button
          type="submit"
          size="lg"
          loading={isLoading}
          className="w-full mt-1"
        >
          Tạo tài khoản
        </Button>

        {/* Divider */}
        <div className="relative flex items-center gap-4">
          <div className="h-px flex-1 bg-border" />
          <span className="text-xs text-subtle">hoặc</span>
          <div className="h-px flex-1 bg-border" />
        </div>

        {/* Social */}
        <Button type="button" variant="secondary" size="lg" className="w-full">
          <svg width="18" height="18" viewBox="0 0 24 24" aria-hidden="true">
            <path
              d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 0 1-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z"
              fill="#4285F4"
            />
            <path
              d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
              fill="#34A853"
            />
            <path
              d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
              fill="#FBBC05"
            />
            <path
              d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
              fill="#EA4335"
            />
          </svg>
          Đăng ký với Google
        </Button>

        <p className="text-center text-sm text-muted">
          Đã có tài khoản?{' '}
          <Link
            href={'/login' as Route}
            className="font-semibold text-primary hover:text-primary-hover transition-colors"
          >
            Đăng nhập
          </Link>
        </p>
      </form>

      {/* ── Terms of Service Modal ── */}
      <TermsModal isOpen={showTerms} onClose={() => setShowTerms(false)} />

      {/* ── Privacy Policy Modal ── */}
      <PrivacyModal
        isOpen={showPrivacy}
        onClose={() => setShowPrivacy(false)}
      />
    </>
  )
}
