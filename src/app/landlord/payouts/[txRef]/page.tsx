import type { Metadata } from 'next'
import { PayoutSimulation } from '@/features/payout-simulation'

export const metadata: Metadata = {
  title: 'Xác nhận kết quả chuyển tiền',
}

export default async function PayoutPage({
  params,
}: {
  params: Promise<{ txRef: string }>
}): Promise<React.ReactElement> {
  const { txRef } = await params
  return <PayoutSimulation txRef={txRef} />
}
