'use client'

import * as React from 'react'
import Link from 'next/link'
import type { Route } from 'next'
import { Input } from '@/shared/ui/input'
import { Button } from '@/shared/ui/button'

export function ForgotPasswordForm(): React.ReactElement {
  const [isLoading, setIsLoading] = React.useState(false)
  const [isSent, setIsSent] = React.useState(false)

  function handleSubmit(e: React.FormEvent<HTMLFormElement>): void {
    e.preventDefault()
    setIsLoading(true)
    setTimeout(() => {
      setIsLoading(false)
      setIsSent(true)
    }, 2000)
  }

  if (isSent) {
    return (
      <div className="flex flex-col items-center gap-5 text-center">
        {/* Success icon */}
        <div className="flex h-16 w-16 items-center justify-center rounded-full bg-success-soft">
          <svg
            width="28"
            height="28"
            viewBox="0 0 24 24"
            fill="none"
            stroke="var(--success)"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
            <polyline points="22 4 12 14.01 9 11.01" />
          </svg>
        </div>
        <div className="flex flex-col gap-2">
          <h3 className="font-display text-lg font-bold text-fg">
            Đã gửi email thành công!
          </h3>
          <p className="text-sm text-muted leading-relaxed">
            Vui lòng kiểm tra hộp thư email của bạn và nhấn vào liên kết trong
            email để đặt lại mật khẩu. Liên kết có hiệu lực trong 15 phút.
          </p>
        </div>
        <Button
          type="button"
          variant="secondary"
          size="lg"
          className="w-full"
          onClick={() => setIsSent(false)}
        >
          Gửi lại email
        </Button>
        <Link
          href={'/login' as Route}
          className="text-sm font-medium text-primary hover:text-primary-hover transition-colors"
        >
          ← Quay lại đăng nhập
        </Link>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-5">
      <div className="flex flex-col gap-2">
        <p className="text-sm text-muted leading-relaxed">
          Nhập địa chỉ email đã đăng ký. Chúng tôi sẽ gửi cho bạn liên kết để
          đặt lại mật khẩu.
        </p>
      </div>

      <Input
        label="Email"
        type="email"
        placeholder="email@example.com"
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

      <Button type="submit" size="lg" loading={isLoading} className="w-full">
        Gửi link đặt lại mật khẩu
      </Button>

      <Link
        href={'/login' as Route}
        className="text-center text-sm font-medium text-primary hover:text-primary-hover transition-colors"
      >
        ← Quay lại đăng nhập
      </Link>
    </form>
  )
}
