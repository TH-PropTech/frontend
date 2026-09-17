import * as React from 'react'
import type { Metadata, Route } from 'next'
import Link from 'next/link'
import { ArrowLeft, FileText } from 'lucide-react'
import { ApplicationList } from '@/features/rental-application'

export const metadata: Metadata = {
  title: 'Hồ sơ đặt thuê của tôi | TH-PropTech',
  description:
    'Theo dõi tiến trình và trạng thái các hồ sơ đăng ký thuê căn hộ.',
}

export default function RentalApplicationsPage(): React.ReactElement {
  return (
    <main className="mx-auto max-w-4xl px-4 py-8 sm:px-6">
      <nav aria-label="Điều hướng" className="mb-4">
        <Link
          href={'/properties' as Route}
          className="inline-flex items-center gap-1.5 text-xs font-medium text-muted transition hover:text-primary"
        >
          <ArrowLeft aria-hidden="true" className="h-3.5 w-3.5" />
          <span>Quay lại danh sách căn hộ</span>
        </Link>
      </nav>

      <header className="mb-6 space-y-1">
        <div className="flex items-center gap-2 text-xs font-semibold text-primary">
          <FileText aria-hidden="true" className="h-4 w-4" />
          <span>Quản lý giao dịch thuê</span>
        </div>
        <h1 className="font-display text-2xl font-bold tracking-tight text-fg sm:text-3xl">
          Hồ sơ đặt thuê của tôi
        </h1>
        <p className="text-sm text-muted">
          Theo dõi trạng thái duyệt từ chủ nhà và truy cập hợp đồng số khi được
          chấp thuận.
        </p>
      </header>

      <section>
        <ApplicationList />
      </section>
    </main>
  )
}
