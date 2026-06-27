'use client'

import * as React from 'react'
import Link from 'next/link'
import type { Route } from 'next'
import { useRouter } from 'next/navigation'
import { Input } from '@/shared/ui/input'
import { Button } from '@/shared/ui/button'
import { apiClient } from '@/shared/api/api-client'
import { toast } from 'sonner'
import { FeePolicyModal } from './auth-modals'

type LoginMode = 'password' | 'passwordless-email' | 'two-factor'

interface LoginSuccessResponse {
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

interface Login2faResponse {
  is2faRequired: true
  twoFactorTempToken: string
  user: {
    _id: string
    email: string
  }
}

type LoginResult = LoginSuccessResponse | Login2faResponse

export function LoginForm(): React.ReactElement {
  const router = useRouter()
  const [loginMode, setLoginMode] = React.useState<LoginMode>('password')
  const [isLoading, setIsLoading] = React.useState(false)
  const [email, setEmail] = React.useState('')
  const [password, setPassword] = React.useState('')
  const [errorMsg, setErrorMsg] = React.useState('')
  const [successMsg, setSuccessMsg] = React.useState('')
  const [twoFactorTempToken, setTwoFactorTempToken] = React.useState('')
  const [twoFactorCode, setTwoFactorCode] = React.useState('')
  const [showFeeModal, setShowFeeModal] = React.useState(false)

  async function handleSubmit(
    e: React.FormEvent<HTMLFormElement>
  ): Promise<void> {
    e.preventDefault()
    setErrorMsg('')
    setSuccessMsg('')
    setIsLoading(true)

    if (loginMode === 'password') {
      try {
        const response = await apiClient.post<LoginResult>('/auth/login', {
          emailOrPhone: email,
          password,
        })

        if ('is2faRequired' in response && response.is2faRequired) {
          setTwoFactorTempToken(response.twoFactorTempToken)
          setLoginMode('two-factor')
          setTwoFactorCode('')
          setIsLoading(false)
          return
        }

        const successResp = response as LoginSuccessResponse

        // Save authentication token
        localStorage.setItem('accessToken', successResp.accessToken)
        localStorage.setItem('refreshToken', successResp.refreshToken)
        localStorage.setItem('user', JSON.stringify(successResp.user))

        setSuccessMsg('Đăng nhập thành công! Đang chuyển hướng...')
        toast.success('Đăng nhập thành công!', {
          description: `Chào mừng quay trở lại, ${successResp.user.name}!`,
        })

        setTimeout(() => {
          if (
            successResp.user.roles.includes('staff') ||
            successResp.user.roles.includes('admin')
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
        toast.error(msg)
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
        const response = await apiClient.post<LoginResult>(
          '/auth/login-otp/request',
          {
            email,
          }
        )

        setSuccessMsg(
          'Mã OTP xác thực đăng nhập đã được gửi đến email của bạn.'
        )
        toast.success('Đã gửi mã OTP đăng nhập!', {
          description: 'Vui lòng kiểm tra hòm thư của bạn để lấy mã OTP.',
        })

        if ('is2faRequired' in response && response.is2faRequired) {
          setTwoFactorTempToken(response.twoFactorTempToken)
          setLoginMode('two-factor')
          setTwoFactorCode('')
          setIsLoading(false)
          return
        }
      } catch (err: unknown) {
        const msg =
          err instanceof Error ? err.message : 'Yêu cầu đăng nhập thất bại.'
        setErrorMsg(msg)
        toast.error(msg)
      } finally {
        setIsLoading(false)
      }
    } else if (loginMode === 'two-factor') {
      try {
        const response = await apiClient.post<LoginSuccessResponse>(
          '/auth/2fa/authenticate',
          {
            twoFactorTempToken,
            code: twoFactorCode,
          }
        )

        localStorage.setItem('accessToken', response.accessToken)
        localStorage.setItem('refreshToken', response.refreshToken)
        localStorage.setItem('user', JSON.stringify(response.user))

        setSuccessMsg('Xác thực 2FA thành công! Đang chuyển hướng...')
        toast.success('Xác thực 2FA thành công!')
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
            : 'Xác thực 2FA thất bại. Vui lòng kiểm tra lại mã.'
        setErrorMsg(msg)
        toast.error(msg)
      } finally {
        setIsLoading(false)
      }
    }
  }

  return (
    <>
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
            Đăng nhập không mật khẩu
          </button>
        </>
      )}

      {/* ═══════════════════════════════════════
         MODE 2: PASSWORDLESS - ENTER EMAIL
         ═══════════════════════════════════════ */}
      {loginMode === 'passwordless-email' && (
        <div className="space-y-4 animate-in fade-in slide-in-from-right-4 duration-300">
          <div>
            <h3 className="text-sm font-bold text-fg font-marketing">
              Xác thực không mật khẩu (bằng 2FA)
            </h3>
            <p className="text-xs text-muted mt-1">
              Nhập email của bạn để tiến hành đăng nhập trực tiếp bằng mã xác
              thực 2FA.
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
         MODE 3: TWO-FACTOR AUTHENTICATION INPUT
         ═══════════════════════════════════════ */}
      {loginMode === 'two-factor' && (
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
              Nhập mã OTP 6 chữ số từ ứng dụng xác thực của bạn (hoặc mã dự
              phòng) để đăng nhập.
            </p>
          </div>

          <Input
            label="Mã OTP 2FA hoặc Mã dự phòng"
            type="text"
            placeholder="000000"
            maxLength={9}
            value={twoFactorCode}
            onChange={e => setTwoFactorCode(e.target.value)}
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
              setTwoFactorCode('')
              setLoginMode('password')
            }}
            className="w-full text-center text-xs font-semibold text-muted hover:text-fg transition-colors mt-2"
          >
            Quay lại nhập mật khẩu
          </button>
        </div>
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

      <div className="text-center mt-2 border-t border-border pt-4">
        <button
          type="button"
          onClick={() => setShowFeeModal(true)}
          className="text-xs font-medium text-muted hover:text-primary transition-colors inline-flex items-center gap-1"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="14"
            height="14"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <circle cx="12" cy="12" r="10" />
            <line x1="12" x2="12" y1="16" y2="12" />
            <line x1="12" x2="12" y1="8" y2="8" />
          </svg>
          Tìm hiểu chính sách biểu phí & quy định
        </button>
      </div>
    </form>
    <FeePolicyModal
      isOpen={showFeeModal}
      onClose={() => setShowFeeModal(false)}
    />
  </>
)
}
