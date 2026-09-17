'use client'

import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { CheckCircle2, Clock3, RefreshCw, TriangleAlert } from 'lucide-react'
import { Button } from '@/shared/ui/button'
import {
  confirmListingFreshness,
  getListingFreshness,
  type FreshnessStatus,
} from '../api/listing-freshness-api'

const STATUS_CONTENT: Record<
  FreshnessStatus,
  { label: string; className: string; icon: typeof CheckCircle2 }
> = {
  fresh: {
    label: 'Tin mới cập nhật',
    className: 'border-success/30 bg-success/10 text-success',
    icon: CheckCircle2,
  },
  needs_confirmation: {
    label: 'Cần xác nhận lại',
    className: 'border-warning/30 bg-warning/10 text-warning',
    icon: Clock3,
  },
  stale: {
    label: 'Tin đã lâu chưa cập nhật',
    className: 'border-danger/30 bg-danger/10 text-danger',
    icon: TriangleAlert,
  },
}

export function FreshnessBadge({
  listingId,
  canConfirm = false,
}: {
  listingId: string
  canConfirm?: boolean
}): React.ReactElement | null {
  const queryClient = useQueryClient()
  const isRealId = /^[0-9a-f]{24}$/i.test(listingId)
  const freshness = useQuery({
    queryKey: ['listing-freshness', listingId],
    queryFn: () => getListingFreshness(listingId),
    enabled: isRealId,
  })
  const confirm = useMutation({
    mutationFn: () => confirmListingFreshness(listingId),
    onSuccess: data => {
      queryClient.setQueryData(['listing-freshness', listingId], data)
    },
  })

  if (!isRealId) return null
  if (freshness.isLoading) {
    return (
      <div className="h-8 w-40 animate-pulse rounded-full bg-surface-muted" />
    )
  }
  if (freshness.isError || !freshness.data) {
    return <span className="text-xs text-muted">Chưa kiểm tra được độ mới</span>
  }

  const content = STATUS_CONTENT[freshness.data.status]
  const Icon = content.icon

  return (
    <div className="flex flex-wrap items-center gap-2">
      <span
        className={`inline-flex items-center gap-1.5 rounded-full border px-3 py-1.5 text-xs font-semibold ${content.className}`}
      >
        <Icon className="h-3.5 w-3.5" aria-hidden="true" />
        {content.label}
        <span className="text-current/70">
          · {freshness.data.daysSinceUpdate} ngày
        </span>
      </span>
      {canConfirm && freshness.data.needsConfirmation ? (
        <Button
          size="sm"
          variant="outline"
          loading={confirm.isPending}
          onClick={() => confirm.mutate()}
        >
          <RefreshCw className="h-3.5 w-3.5" aria-hidden="true" />
          Xác nhận tin còn hiệu lực
        </Button>
      ) : null}
      {confirm.isError ? (
        <span className="text-xs text-danger">
          Không thể xác nhận. Hãy thử lại.
        </span>
      ) : null}
    </div>
  )
}
