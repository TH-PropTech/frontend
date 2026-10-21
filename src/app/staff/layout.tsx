import type { Metadata } from 'next'
import type { ReactNode } from 'react'

import { StaffDashboard } from '@/widgets/staff-dashboard'

import { RoleGuard } from '@/shared/ui/role-guard'

export const metadata: Metadata = {
  title: 'Bảng điều khiển Nhân viên',
  description:
    'Hệ thống phê duyệt tin đăng, KYC, lịch xem nhà và hỗ trợ khách hàng dành cho nhân viên vận hành TH PropTech.',
}

export default function StaffLayout({
  children,
}: Readonly<{ children: ReactNode }>): React.ReactElement {
  return (
    <RoleGuard allowedRoles={['admin', 'staff']}>
      <StaffDashboard />
      {children}
    </RoleGuard>
  )
}
