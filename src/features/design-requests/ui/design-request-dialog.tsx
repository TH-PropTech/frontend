'use client'

import * as React from 'react'
import { Box } from 'lucide-react'
import { Button } from '@/shared/ui/button'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/shared/ui/dialog'
import type { DesignRequestSummary } from '../api/design-requests-api'
import { isTerminalDesignRequestStatus } from '../model/design-request-status'
import {
  useDesignRequest,
  useMyDesignRequests,
} from '../model/use-landlord-design-requests'
import {
  DesignRequestActiveView,
  DesignRequestStatusBadge,
} from './design-request-active-view'
import { NewDesignRequestForm } from './design-request-new-form'
import type { DesignRequestApartmentInfo } from './design-request-preview'

const POLL_MS = 10_000

export interface DesignRequestDialogProps {
  apartmentId: string
  apartmentTitle: string
  trigger?: React.ReactNode
  /** Thông tin căn hộ để dựng bản xem trước 3D khi thiết kế được bàn giao. */
  apartment?: DesignRequestApartmentInfo
}

function newestFirst(items: DesignRequestSummary[]): DesignRequestSummary[] {
  return [...items].sort(
    (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
  )
}

function History({
  items,
}: {
  items: DesignRequestSummary[]
}): React.ReactElement | null {
  if (items.length === 0) return null
  return (
    <details className="rounded-xl border border-border/60 p-3 text-sm">
      <summary className="cursor-pointer text-xs font-bold text-fg">
        Lịch sử yêu cầu
      </summary>
      <ul className="mt-2 space-y-2">
        {items.map(item => (
          <li
            key={item.id}
            className="flex items-start justify-between gap-2 text-xs"
          >
            <span className="line-clamp-2 text-fg">{item.brief}</span>
            <span className="shrink-0 space-y-1 text-right">
              <DesignRequestStatusBadge status={item.status} />
              <span className="block text-[10px] text-muted">
                {new Date(item.createdAt).toLocaleDateString('vi-VN')}
              </span>
            </span>
          </li>
        ))}
      </ul>
    </details>
  )
}

function DialogBody({
  apartmentId,
  apartment,
}: {
  apartmentId: string
  apartment: DesignRequestApartmentInfo | undefined
}): React.ReactElement {
  const list = useMyDesignRequests(
    { apartmentId, limit: 50 },
    { refetchIntervalMs: POLL_MS }
  )
  const items = React.useMemo(
    () => newestFirst(list.data?.items ?? []),
    [list.data]
  )
  const active = items.find(item => !isTerminalDesignRequestStatus(item.status))
  const detail = useDesignRequest(active?.id ?? null, {
    refetchIntervalMs: POLL_MS,
  })

  if (list.isLoading) {
    return <p className="text-sm text-muted">Đang tải yêu cầu...</p>
  }
  if (list.isError) {
    return (
      <p role="alert" className="text-sm text-danger">
        Không tải được yêu cầu thiết kế 3D. Vui lòng thử lại.
      </p>
    )
  }

  if (!active) {
    return (
      <div className="space-y-4">
        <NewDesignRequestForm apartmentId={apartmentId} />
        <History items={items} />
      </div>
    )
  }

  if (detail.isError) {
    return (
      <p role="alert" className="text-sm text-danger">
        Không tải được chi tiết yêu cầu. Vui lòng thử lại.
      </p>
    )
  }
  if (!detail.data) {
    return <p className="text-sm text-muted">Đang tải yêu cầu...</p>
  }
  return <DesignRequestActiveView request={detail.data} apartment={apartment} />
}

/** Chủ nhà gửi / theo dõi yêu cầu thiết kế 3D cho một căn hộ. */
export function DesignRequestDialog({
  apartmentId,
  apartmentTitle,
  trigger,
  apartment,
}: DesignRequestDialogProps): React.ReactElement {
  return (
    <Dialog>
      <DialogTrigger asChild>
        {trigger ?? (
          <Button
            type="button"
            variant="outline"
            size="sm"
            className="shrink-0 gap-1"
          >
            <Box className="h-3.5 w-3.5" aria-hidden="true" />
            Yêu cầu thiết kế 3D
          </Button>
        )}
      </DialogTrigger>
      <DialogContent className="max-h-[90vh] max-w-2xl overflow-y-auto text-left">
        <DialogHeader>
          <DialogTitle>Yêu cầu thiết kế 3D</DialogTitle>
          <DialogDescription>{apartmentTitle}</DialogDescription>
        </DialogHeader>
        <DialogBody apartmentId={apartmentId} apartment={apartment} />
      </DialogContent>
    </Dialog>
  )
}
