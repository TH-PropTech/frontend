'use client'

import Link from 'next/link'
import type { Route } from 'next'
import { useQuery } from '@tanstack/react-query'
import { getGatewayPaymentResult } from '../api/payments-api'

export function PaymentResultPanel({
  txRef,
}: {
  txRef: string | null
}): React.ReactElement {
  const { data, isPending, isError } = useQuery({
    queryKey: ['gateway-payment-result', txRef],
    queryFn: () => getGatewayPaymentResult(txRef ?? ''),
    enabled: Boolean(txRef),
    retry: false,
    refetchInterval: query =>
      query.state.data?.targetPaid ||
      query.state.data?.attemptStatus === 'failed'
        ? false
        : 3000,
  })

  let title = 'Không tìm thấy giao dịch để kiểm tra'
  let description = 'Vui lòng mở lại giao dịch từ tài khoản của bạn.'
  if (txRef && isPending) {
    title = 'Đang kiểm tra thanh toán'
    description = 'Hệ thống đang tải trạng thái giao dịch từ máy chủ.'
  } else if (txRef && isError) {
    title = 'Không tải được trạng thái thanh toán'
    description = 'Vui lòng đăng nhập và thử tải lại trang.'
  } else if (data?.targetPaid) {
    title = 'Thanh toán đã được xác nhận'
    description = 'Khoản thanh toán đã được ghi nhận trên hệ thống.'
  } else if (data?.attemptStatus === 'failed') {
    title = 'Thanh toán chưa hoàn tất'
    description = 'Cổng thanh toán đã báo giao dịch không thành công.'
  } else if (data) {
    title = 'Đang chờ xác nhận thanh toán'
    description =
      'Hệ thống sẽ tự cập nhật khi nhận được xác nhận từ cổng thanh toán.'
  }

  const href = data?.contractId
    ? `/contracts/${encodeURIComponent(data.contractId)}`
    : '/rental-applications'

  return (
    <main className="min-h-screen bg-[var(--bg)] px-4 py-16 text-[var(--fg)]">
      <section className="mx-auto max-w-xl rounded-2xl border border-[var(--border)] bg-[var(--surface)] p-8 shadow-sm">
        <h1 className="text-2xl font-bold">{title}</h1>
        <p className="mt-3 text-sm text-[var(--muted)]">{description}</p>
        {data ? (
          <p className="mt-4 text-xs text-[var(--muted)]">
            Mã giao dịch: {data.txRef}
          </p>
        ) : null}
        <Link
          href={href as Route}
          className="mt-6 inline-flex rounded-lg bg-[var(--primary)] px-4 py-2 text-sm font-semibold text-white"
        >
          {data?.contractId ? 'Về hợp đồng' : 'Về hồ sơ thuê'}
        </Link>
      </section>
    </main>
  )
}
