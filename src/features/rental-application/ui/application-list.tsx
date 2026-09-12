'use client'

import { useQuery } from '@tanstack/react-query'
import { RotateCcw } from 'lucide-react'
import { Button } from '@/shared/ui/button'
import { getMyRentalApplications } from '../api/rental-application-api'
import { ApplicationStatusBadge } from './application-status-badge'

export function ApplicationList(): React.ReactElement {
  const applications = useQuery({
    queryKey: ['rental-applications', 'mine'],
    queryFn: getMyRentalApplications,
  })
  if (applications.isLoading)
    return <div className="h-28 animate-pulse rounded-2xl bg-surface-muted" />
  if (applications.isError)
    return (
      <div className="rounded-2xl border border-danger/30 p-4">
        <p className="text-sm text-danger">Không tải được hồ sơ ứng tuyển.</p>
        <Button
          size="sm"
          variant="outline"
          className="mt-2"
          onClick={() => applications.refetch()}
        >
          <RotateCcw className="h-4 w-4" />
          Thử lại
        </Button>
      </div>
    )
  if (!applications.data?.items.length)
    return (
      <p className="rounded-2xl border border-border bg-surface p-4 text-sm text-muted">
        Chưa có hồ sơ ứng tuyển.
      </p>
    )
  return (
    <div className="space-y-2">
      {applications.data.items.map(item => (
        <article
          key={item._id}
          className="flex items-center justify-between rounded-2xl border border-border bg-surface p-4"
        >
          <div>
            <p className="text-sm font-semibold text-fg">
              Ngày vào ở {new Date(item.moveInDate).toLocaleDateString('vi-VN')}
            </p>
            <p className="text-xs text-muted">
              {item.occupants} người ·{' '}
              {item.packageSnapshot?.durationMonths ?? '—'} tháng
              {item.status === 'accepted' && item.contractId
                ? ' · Có bản nháp hợp đồng'
                : ''}
            </p>
          </div>
          <ApplicationStatusBadge status={item.status} />
        </article>
      ))}
    </div>
  )
}
