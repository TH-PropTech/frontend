'use client'

import * as React from 'react'
import Link from 'next/link'
import type { Route } from 'next'
import { useRouter } from 'next/navigation'
import { Input } from '@/shared/ui/input'
import { Button } from '@/shared/ui/button'
import { apiClient } from '@/shared/api/api-client'

type LoginMode = 'password' | 'passwordless-email' | 'passwordless-otp'

interface LoginResponse {
  accessToken: string
  refreshToken: string
  user: {
    _id: string
    email: string
    name: string
    phone: string
    roles: string[]
    kycStatus: string
  }
}

export function LoginForm(): React.ReactElement {
  const router = useRouter()
  const [loginMode, setLoginMode] = React.useState<LoginMode>('password')
  const [isLoading, setIsLoading] = React.useState(false)
  const [email, setEmail] = React.useState('')
  const [password, setPassword] = React.useState('')
  const [otp, setOtp] = React.useState('')
  const [errorMsg, setErrorMsg] = React.useState('')
  const [successMsg, setSuccessMsg] = React.useState('')

  async function handleSubmit(
    e: React.FormEvent<HTMLFormElement>
  ): Promise<void> {
    e.preventDefault()
    setErrorMsg('')
    setSuccessMsg('')
    setIsLoading(true)

    if (loginMode === 'password') {
      try {
        const response = await apiClient.post<LoginResponse>('/auth/login', {
          emailOrPhone: email,
          password,
        })

        // Save authentication token
        localStorage.setItem('accessToken', response.accessToken)
        localStorage.setItem('refreshToken', response.refreshToken)
        localStorage.setItem('user', JSON.stringify(response.user))

        setSuccessMsg('Đăng nhập thành công! Đang chuyển hướng...')

        setTimeout(() => {
          if (
            response.user.roles.includes('staff') ||
            response.user.roles.includes('admin')
          ) {
            router.push('/staff' as Route)
          } else {
            router.push('/' as Route)
          }
        }, 1000)
      } catch (err: unknown) {
        const msg =
          err instanceof Error
            ? err.message
            : 'Đăng nhập thất bại. Vui lòng kiểm tra lại thông tin.'
        setErrorMsg(msg)
      } finally {
        setIsLoading(false)
      }
    } else if (loginMode === 'passwordless-email') {
      if (!email) {
        setErrorMsg('Vui lòng nhập Email.')
        setIsLoading(false)
        return
      }

      try {
        await apiClient.post('/auth/login-otp/request', { email })
        setSuccessMsg('Mã OTP đăng nhập đã được gửi tới email của bạn.')
        setLoginMode('passwordless-otp')
      } catch (err: unknown) {
        const msg =
          err instanceof Error ? err.message : 'Yêu cầu mã OTP thất bại.'
        setErrorMsg(msg)
      } finally {
        setIsLoading(false)
      }
    } else if (loginMode === 'passwordless-otp') {
      try {
        const response = await apiClient.post<LoginResponse>(
          '/auth/login-otp/verify',
          {
            email,
            otp,
          }
        )

        localStorage.setItem('accessToken', response.accessToken)
        localStorage.setItem('refreshToken', response.refreshToken)
        localStorage.setItem('user', JSON.stringify(response.user))

        setSuccessMsg('Xác thực thành công! Đang chuyển hướng...')
        setTimeout(() => {
          if (
            response.user.roles.includes('staff') ||
            response.user.roles.includes('admin')
          ) {
            router.push('/staff' as Route)
          } else {
            router.push('/' as Route)
          }
        }, 1000)
      } catch (err: unknown) {
        const msg =
          err instanceof Error ? err.message : 'Xác thực OTP thất bại.'
        setErrorMsg(msg)
      } finally {
        setIsLoading(false)
      }
    }
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col gap-5 transition-all duration-300"
    >
      {/* Alert Messages */}
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

      {/* ═══════════════════════════════════════
         MODE 1: STANDARD PASSWORD LOGIN
         ═══════════════════════════════════════ */}
      {loginMode === 'password' && (
        <>
          <Input
            label="Email hoặc Tên tài khoản"
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

          <div className="flex flex-col gap-1.5">
            <Input
              label="Mật khẩu"
              type="password"
              placeholder="••••••••"
              value={password}
              onChange={e => setPassword(e.target.value)}
              required
              autoComplete="current-password"
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
            <div className="flex justify-end">
              <Link
                href={'/forgot-password' as Route}
                className="text-xs font-medium text-primary hover:text-primary-hover transition-colors"
              >
                Quên mật khẩu?
              </Link>
            </div>
          </div>

          <Button
            type="submit"
            size="lg"
            loading={isLoading}
            className="w-full mt-1"
          >
            Đăng nhập
          </Button>

          {/* Passwordless Toggle Trigger */}
          <button
            type="button"
            onClick={() => {
              setErrorMsg('')
              setSuccessMsg('')
              setLoginMode('passwordless-email')
            }}
            className="text-xs font-semibold text-primary hover:text-primary-hover transition-colors flex items-center justify-center gap-1.5 mt-1 hover:underline"
          >
            <svg
              width="14"
              height="14"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
            >
              <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
              <path d="M7 11V7a5 5 0 0 1 10 0v4" />
              <circle cx="12" cy="16" r="1.5" />
            </svg>
            Đăng nhập không cần mật khẩu (TOTP 2FA)
          </button>
        </>
      )}

      {/* ═══════════════════════════════════════
         MODE 2: PASSWORDLESS - ENTER ACCOUNT
         ═══════════════════════════════════════ */}
      {loginMode === 'passwordless-email' && (
        <div className="space-y-4 animate-in fade-in slide-in-from-right-4 duration-300">
          <div>
            <h3 className="text-sm font-bold text-fg font-marketing">
              Xác thực không mật khẩu
            </h3>
            <p className="text-xs text-muted mt-1">
              Nhập email hoặc tên tài khoản của bạn. Nếu bạn đã kích hoạt bảo
              mật Google Authenticator, hệ thống sẽ yêu cầu nhập mã OTP.
            </p>
          </div>

          <Input
            label="Email hoặc Tên tài khoản"
            type="text"
            placeholder="operator@th-proptech.vn"
            value={email}
            onChange={e => setEmail(e.target.value)}
            required
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

          <Button
            type="submit"
            size="lg"
            loading={isLoading}
            className="w-full mt-2"
          >
            Tiếp tục
          </Button>

          <button
            type="button"
            onClick={() => {
              setErrorMsg('')
              setSuccessMsg('')
              setLoginMode('password')
            }}
            className="w-full text-center text-xs font-semibold text-muted hover:text-fg transition-colors mt-2"
          >
            Quay lại đăng nhập thường
          </button>
        </div>
      )}

      {/* ═══════════════════════════════════════
         MODE 3: PASSWORDLESS - ENTER TOTP OTP
         ═══════════════════════════════════════ */}
      {loginMode === 'passwordless-otp' && (
        <div className="space-y-4 animate-in fade-in slide-in-from-right-4 duration-300">
          <div className="text-center">
            <div className="inline-flex p-3 bg-primary/5 text-primary rounded-full mb-3">
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
              >
                <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
                <path d="M7 11V7a5 5 0 0 1 10 0v4" />
                <circle cx="12" cy="16" r="1.5" />
              </svg>
            </div>
            <h3 className="text-sm font-bold text-fg font-marketing">
              Nhập mã xác thực 2FA
            </h3>
            <p className="text-xs text-muted mt-1">
              Tài khoản <strong className="text-fg">{email}</strong> đã kích
              hoạt Google Authenticator.
            </p>
          </div>

          <div className="bg-surface-muted/30 border border-line rounded-lg p-3 text-center text-[10px] text-muted">
            💡 Thử nghiệm: Nhập mã{' '}
            <strong className="text-primary">123456</strong> để đăng nhập thành
            công.
          </div>

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
            className="w-full mt-2"
          >
            Xác minh & Đăng nhập
          </Button>

          <button
            type="button"
            onClick={() => {
              setErrorMsg('')
              setSuccessMsg('')
              setOtp('')
              setLoginMode('passwordless-email')
            }}
            className="w-full text-center text-xs font-semibold text-muted hover:text-fg transition-colors mt-2"
          >
            Quay lại nhập tài khoản
          </button>
        </div>
      )}

      {/* Divider (only show in password mode) */}
      {loginMode === 'password' && (
        <>
          <div className="relative flex items-center gap-4">
            <div className="h-px flex-1 bg-border" />
            <span className="text-xs text-subtle">hoặc</span>
            <div className="h-px flex-1 bg-border" />
          </div>

          {/* Social login */}
          <Button
            type="button"
            variant="secondary"
            size="lg"
            className="w-full"
          >
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
            Đăng nhập với Google
          </Button>
        </>
      )}

      {loginMode === 'password' && (
        <p className="text-center text-sm text-muted">
          Chưa có tài khoản?{' '}
          <Link
            href={'/register' as Route}
            className="font-semibold text-primary hover:text-primary-hover transition-colors"
          >
            Đăng ký ngay
          </Link>
        </p>
      )}
    </form>
  )
}
