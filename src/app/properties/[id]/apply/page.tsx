import * as React from 'react'
import type { Metadata } from 'next'
import { RentalApplicationApply } from '@/widgets/rental-application-apply'

interface ApplyPageRouteProps {
  params: Promise<{ id: string }>
}

export const metadata: Metadata = {
  title: 'Đặt thuê căn hộ | TH-PropTech',
  description:
    'Hoàn tất hồ sơ đăng ký thuê căn hộ và xác nhận cam kết trực tuyến.',
}

export default async function PropertyApplyRoute({
  params,
}: ApplyPageRouteProps): Promise<React.ReactElement> {
  const { id } = await params
  return <RentalApplicationApply apartmentId={id} />
}
