import type { Metadata } from 'next'
import { ForgotPasswordForm } from '@/features/auth'

export const metadata: Metadata = {
  title: 'Quên mật khẩu',
  description: 'Đặt lại mật khẩu tài khoản TH PropTech bằng email đã đăng ký.',
}

export default function ForgotPasswordPage(): React.ReactElement {
  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col gap-2">
        <h1 className="font-display text-2xl font-bold tracking-tight text-fg sm:text-3xl">
          Quên mật khẩu?
        </h1>
      </div>
      <ForgotPasswordForm />
    </div>
  )
}
