'use client'

import * as React from 'react'
import { Badge } from '@/shared/ui/badge'
import { Button } from '@/shared/ui/button'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/shared/ui/dialog'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/shared/ui/table'
import type { DesignRequestStatus } from '../api/design-requests-api'
import {
  STAFF_KIND_LABELS,
  STAFF_STATUS_LABELS,
  STAFF_STATUS_ORDER,
  STAFF_STATUS_TONE,
  defaultQueueStatuses,
} from '../model/staff-design-request-labels'
import { useDesignRequestQueue } from '../model/staff-design-requests'
import { StaffDesignRequestDetail } from './staff-design-request-detail'

const PAGE_SIZE = 20

const dateTime = (iso: string): string => new Date(iso).toLocaleString('vi-VN')

export interface StaffDesignRequestsViewProps {
  role: 'staff' | 'admin'
}

/** Hàng đợi yêu cầu thiết kế 3D: nhân viên phân loại, quản trị viên nhận và giao thiết kế. */
export function StaffDesignRequestsView({
  role,
}: StaffDesignRequestsViewProps): React.ReactElement {
  const [statuses, setStatuses] = React.useState<DesignRequestStatus[]>(() =>
    defaultQueueStatuses(role)
  )
  const [page, setPage] = React.useState(1)
  const [selectedId, setSelectedId] = React.useState<string | null>(null)

  const queue = useDesignRequestQueue({ statuses, page, limit: PAGE_SIZE })

  const toggleStatus = (status: DesignRequestStatus): void => {
    setStatuses(current =>
      current.includes(status)
        ? current.filter(item => item !== status)
        : [...current, status]
    )
    setPage(1)
  }

  const items = queue.data?.items ?? []
  const total = queue.data?.total ?? 0
  const totalPages = Math.max(1, Math.ceil(total / PAGE_SIZE))

  return (
    <div className="space-y-5">
      <div>
        <h2 className="text-xl font-bold font-marketing text-fg">
          Yêu cầu thiết kế 3D
        </h2>
        <p className="mt-1 text-xs text-muted">
          {role === 'admin'
            ? 'Nhận yêu cầu đã được chuyển lên, dựng thiết kế 3D và giao cho chủ nhà duyệt.'
            : 'Phân loại yêu cầu của chủ nhà: chuyển quản trị viên, yêu cầu bổ sung hoặc từ chối.'}
        </p>
      </div>

      <div
        role="group"
        aria-label="Lọc theo trạng thái"
        className="flex flex-wrap gap-2"
      >
        {STAFF_STATUS_ORDER.map(status => {
          const active = statuses.includes(status)
          return (
            <button
              key={status}
              type="button"
              aria-pressed={active}
              onClick={() => toggleStatus(status)}
              className={`rounded-full border px-3 py-1 text-xs font-semibold transition ${
                active
                  ? 'border-primary bg-primary text-on-control'
                  : 'border-line text-muted hover:bg-surface-muted'
              }`}
            >
              {STAFF_STATUS_LABELS[status]}
            </button>
          )
        })}
      </div>

      {queue.isPending ? (
        <p role="status" className="text-sm text-muted">
          Đang tải...
        </p>
      ) : queue.isError ? (
        <p role="alert" className="text-sm text-danger">
          Không tải được hàng đợi yêu cầu.
        </p>
      ) : items.length === 0 ? (
        <p role="status" className="text-sm text-muted">
          Không có yêu cầu nào khớp bộ lọc.
        </p>
      ) : (
        <div className="overflow-hidden rounded-xl border border-line bg-surface">
          <Table data-testid="design-request-table">
            <TableHeader>
              <TableRow>
                <TableHead>Tạo lúc</TableHead>
                <TableHead>Cập nhật</TableHead>
                <TableHead>Căn hộ</TableHead>
                <TableHead>Chủ nhà</TableHead>
                <TableHead>Loại</TableHead>
                <TableHead>Trạng thái</TableHead>
                <TableHead>Vòng</TableHead>
                <TableHead aria-label="Hành động" />
              </TableRow>
            </TableHeader>
            <TableBody>
              {items.map(item => (
                <TableRow
                  key={item.id}
                  data-testid={`design-request-${item.id}`}
                >
                  <TableCell>{dateTime(item.createdAt)}</TableCell>
                  <TableCell>{dateTime(item.updatedAt)}</TableCell>
                  <TableCell>{item.apartment?.title ?? '—'}</TableCell>
                  <TableCell>{item.landlord?.name ?? '—'}</TableCell>
                  <TableCell>{STAFF_KIND_LABELS[item.kind]}</TableCell>
                  <TableCell>
                    <Badge
                      variant="outline"
                      className={STAFF_STATUS_TONE[item.status]}
                    >
                      {STAFF_STATUS_LABELS[item.status]}
                    </Badge>
                  </TableCell>
                  <TableCell>{item.revision}</TableCell>
                  <TableCell>
                    <Button
                      type="button"
                      size="sm"
                      variant="secondary"
                      onClick={() => setSelectedId(item.id)}
                    >
                      Xem
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      )}

      {!queue.isPending && items.length > 0 ? (
        <div className="flex items-center justify-between text-xs text-muted">
          <span>
            Trang {page}/{totalPages} · {total} yêu cầu
          </span>
          <div className="flex gap-2">
            <Button
              type="button"
              variant="secondary"
              size="sm"
              disabled={page <= 1}
              onClick={() => setPage(current => Math.max(1, current - 1))}
            >
              Trước
            </Button>
            <Button
              type="button"
              variant="secondary"
              size="sm"
              disabled={page >= totalPages}
              onClick={() => setPage(current => current + 1)}
            >
              Sau
            </Button>
          </div>
        </div>
      ) : null}

      <Dialog
        open={selectedId !== null}
        onOpenChange={open => {
          if (!open) setSelectedId(null)
        }}
      >
        <DialogContent className="max-h-[90vh] max-w-2xl overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Chi tiết yêu cầu thiết kế 3D</DialogTitle>
            <DialogDescription>
              Xem nội dung, lịch sử và xử lý yêu cầu.
            </DialogDescription>
          </DialogHeader>
          {selectedId ? (
            <StaffDesignRequestDetail requestId={selectedId} role={role} />
          ) : null}
        </DialogContent>
      </Dialog>
    </div>
  )
}
