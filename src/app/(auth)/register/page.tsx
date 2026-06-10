import type { Metadata } from 'next'
import { RegisterForm } from '@/features/auth'

export const metadata: Metadata = {
  title: 'Đăng ký',
  description:
    'Tạo tài khoản TH PropTech để tìm kiếm, đặt lịch xem và thuê căn hộ chung cư minh bạch.',
}

export default function RegisterPage(): React.ReactElement {
  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col gap-2">
        <h1 className="font-display text-2xl font-bold tracking-tight text-fg sm:text-3xl">
          Tạo tài khoản mới
        </h1>
        <p className="text-sm text-muted">
          Đăng ký để bắt đầu tìm kiếm căn hộ phù hợp với bạn
        </p>
      </div>
      <RegisterForm />
    </div>
  )
}
