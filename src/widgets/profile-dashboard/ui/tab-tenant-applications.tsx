'use client'

import * as React from 'react'
import { FileText } from 'lucide-react'
import { ApplicationList } from '@/features/rental-application'

export function TabTenantApplications(): React.ReactElement {
  return (
    <div className="space-y-6" data-testid="tab-tenant-applications">
      <div className="flex flex-col gap-1 border-b border-border pb-4">
        <div className="flex items-center gap-2 text-primary font-semibold text-sm">
          <FileText className="h-4 w-4" />
          <span>Quản lý giao dịch thuê</span>
        </div>
        <h2 className="font-display text-xl font-bold text-fg">
          Hồ sơ đặt thuê của tôi
        </h2>
        <p className="text-xs text-muted">
          Theo dõi trạng thái duyệt từ chủ nhà và truy cập hợp đồng số khi được
          chấp thuận.
        </p>
      </div>

      <ApplicationList />
    </div>
  )
}
