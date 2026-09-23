import * as React from 'react'
import type { Metadata } from 'next'
import { redirect } from 'next/navigation'

interface ApplicationDetailPageProps {
  params: Promise<{ id: string }>
}

export const metadata: Metadata = {
  title: 'Chi tiết hồ sơ thuê căn hộ | TH-PropTech',
  description: 'Chi tiết hồ sơ đăng ký thuê căn hộ và quy trình ký hợp đồng.',
}

export default async function ApplicationDetailPage({
  params,
}: ApplicationDetailPageProps): Promise<React.ReactElement> {
  const { id } = await params
  redirect(`/rental-applications/${id}/contract-invite`)
}
