import * as React from 'react'
import type { Metadata } from 'next'
import { ContractInvitePanel } from '@/features/rental-application'

interface ContractInvitePageProps {
  params: Promise<{ id: string }>
}

export const metadata: Metadata = {
  title: 'Đề nghị ký hợp đồng thuê nhà | TH-PropTech',
  description:
    'Chủ nhà đã chấp thuận hồ sơ. Xem tóm tắt hợp đồng và hoàn tất ký số SmartCA để xác lập quan hệ thuê nhà.',
}

export default async function ContractInvitePage({
  params,
}: ContractInvitePageProps): Promise<React.ReactElement> {
  const { id } = await params

  return (
    <main className="min-h-screen bg-[var(--bg)] text-[var(--fg)]">
      <ContractInvitePanel applicationId={id} />
    </main>
  )
}
