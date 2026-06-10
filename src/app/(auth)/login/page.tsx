import type { Metadata } from 'next'
import { LoginForm } from '@/features/auth'

export const metadata: Metadata = {
  title: 'Đăng nhập',
  description:
    'Đăng nhập vào hệ thống TH PropTech để quản lý giao dịch thuê căn hộ chung cư.',
}

export default function LoginPage(): React.ReactElement {
  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col gap-2">
        <h1 className="font-display text-2xl font-bold tracking-tight text-fg sm:text-3xl">
          Chào mừng trở lại
        </h1>
        <p className="text-sm text-muted">
          Đăng nhập để tiếp tục quản lý giao dịch thuê căn hộ
        </p>
      </div>
      <LoginForm />
    </div>
  )
}
