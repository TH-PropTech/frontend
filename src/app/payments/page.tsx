import type { Metadata } from 'next'
import { PaymentResultPanel } from '@/features/payments/ui/payment-result-panel'

export const metadata: Metadata = {
  title: 'Kết quả thanh toán',
}

export default async function PaymentsPage({
  searchParams,
}: {
  searchParams: Promise<{ txRef?: string | string[] }>
}): Promise<React.ReactElement> {
  const { txRef } = await searchParams
  return <PaymentResultPanel txRef={typeof txRef === 'string' ? txRef : null} />
}
