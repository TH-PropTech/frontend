import * as React from 'react'
import type { Metadata } from 'next'
import { ContractWorkspace } from '@/widgets/contract-workspace'

interface ContractPageRouteProps {
  params: Promise<{ id: string }>
}

export const metadata: Metadata = {
  title: 'Không gian hợp đồng & Ký xác nhận | TH-PropTech',
  description:
    'Không gian làm việc hợp đồng thuê căn hộ: Đối soát điều khoản, thanh toán cọc an toàn, đối soát sinh trắc học và ký số Smart OTP.',
}

export default async function ContractPageRoute({
  params,
}: ContractPageRouteProps): Promise<React.ReactElement> {
  const { id } = await params

  return (
    <main className="w-full min-h-screen bg-[var(--bg)] text-[var(--fg)]">
      <ContractWorkspace contractId={id} />
    </main>
  )
}
