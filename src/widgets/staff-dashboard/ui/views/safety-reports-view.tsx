'use client'

import * as React from 'react'
import { Loader2, ShieldAlert } from 'lucide-react'
import { Button } from '@/shared/ui/button'
import {
  getModerationQueue,
  updateReportStatus,
  type SafetyReportItem,
} from '@/features/safety-reports'
import { appToast } from '@/shared/ui/app-toast'
import { AdminCard } from '@/shared/ui/admin-card'
import { AdminErrorState } from '@/shared/ui/admin-error-state'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from '@/shared/ui/dialog'
import { Textarea } from '@/shared/ui/textarea'
import { useCan } from '@/shared/lib/permissions'
import {
  getRiskLevelLabel,
  getReportStatusLabel,
} from '../../model/admin-labels'

type TargetStatus = 'investigating' | 'resolved' | 'dismissed'

const DEFAULT_NOTES: Record<TargetStatus, string> = {
  investigating: 'Đang tiến hành kiểm tra và xác minh thông tin báo cáo.',
  resolved: 'Đã hoàn tất xử lý vi phạm theo quy định của nền tảng.',
  dismissed: 'Báo cáo không có dấu hiệu vi phạm hoặc thiếu căn cứ.',
}

export function SafetyReportsView(): React.ReactElement {
  const can = useCan()
  const canUpdate = can('update', 'SafetyReport')
  const [reports, setReports] = React.useState<SafetyReportItem[]>([])
  const [loading, setLoading] = React.useState(true)
  const [error, setError] = React.useState<string | null>(null)

  const [targetAction, setTargetAction] = React.useState<{
    report: SafetyReportItem
    status: TargetStatus
  } | null>(null)
  const [note, setNote] = React.useState('')
  const [isSubmitting, setIsSubmitting] = React.useState(false)

  const loadReports = React.useCallback(() => {
    setLoading(true)
    setError(null)
    getModerationQueue()
      .then(result => setReports(result.items))
      .catch((err: unknown) => {
        const msg =
          err instanceof Error
            ? err.message
            : 'Không thể tải hàng đợi kiểm duyệt'
        setError(msg)
        appToast.error(msg)
      })
      .finally(() => setLoading(false))
  }, [])

  React.useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    loadReports()
  }, [loadReports])

  const openActionDialog = (
    report: SafetyReportItem,
    status: TargetStatus
  ): void => {
    setTargetAction({ report, status })
    setNote(DEFAULT_NOTES[status])
  }

  const handleConfirmUpdate = async (): Promise<void> => {
    if (!targetAction) return
    const trimmed = note.trim()
    if (trimmed.length < 5) {
      appToast.error('Ghi chú xử lý phải có ít nhất 5 ký tự')
      return
    }

    setIsSubmitting(true)
    try {
      const updated = await updateReportStatus(
        targetAction.report._id,
        targetAction.status,
        trimmed
      )
      setReports(current =>
        current.map(item => (item._id === updated._id ? updated : item))
      )
      appToast.success('Đã cập nhật trạng thái báo cáo')
      setTargetAction(null)
      setNote('')
    } catch (err: unknown) {
      appToast.error(
        err instanceof Error ? err.message : 'Không thể cập nhật báo cáo'
      )
    } finally {
      setIsSubmitting(false)
    }
  }

  if (loading) {
    return (
      <div className="flex items-center gap-2 p-8 text-muted">
        <Loader2 className="h-5 w-5 animate-spin" /> Đang tải báo cáo...
      </div>
    )
  }

  if (error) {
    return (
      <AdminErrorState
        title="Lỗi tải danh sách báo cáo an toàn"
        message={error}
        onRetry={loadReports}
      />
    )
  }

  return (
    <div className="space-y-4">
      <div>
        <h2 className="flex items-center gap-2 text-xl font-bold text-fg">
          <ShieldAlert className="h-5 w-5 text-primary" /> Kiểm duyệt báo cáo an
          toàn
        </h2>
        <p className="mt-1 text-sm text-muted">
          Ưu tiên rủi ro cao và theo dõi trạng thái ẩn tin đăng.
        </p>
      </div>
      {reports.length === 0 ? (
        <AdminCard className="border-dashed p-8 text-center text-sm text-muted">
          Không có báo cáo chờ xử lý.
        </AdminCard>
      ) : (
        reports.map(report => (
          <article
            key={report._id}
            className="rounded-2xl border border-border bg-surface p-5"
          >
            <div className="flex flex-wrap items-start justify-between gap-3">
              <div>
                <h3 className="font-bold text-fg">
                  {report.targetTitle ?? report.targetId}
                </h3>
                <p className="mt-1 text-sm text-muted">{report.description}</p>
              </div>
              <span className="rounded-full bg-primary-soft px-3 py-1 text-xs font-bold text-primary">
                {getRiskLevelLabel(report.riskLevel)} ·{' '}
                {getReportStatusLabel(report.status)}
              </span>
            </div>
            {canUpdate ? (
              <div className="mt-4 flex flex-wrap gap-2">
                <Button
                  type="button"
                  size="sm"
                  variant="outline"
                  onClick={() => openActionDialog(report, 'investigating')}
                >
                  Điều tra
                </Button>
                <Button
                  type="button"
                  size="sm"
                  onClick={() => openActionDialog(report, 'resolved')}
                >
                  Đã xử lý
                </Button>
                <Button
                  type="button"
                  size="sm"
                  variant="ghost"
                  onClick={() => openActionDialog(report, 'dismissed')}
                >
                  Bỏ qua
                </Button>
              </div>
            ) : null}
          </article>
        ))
      )}

      {/* Dialog xác nhận và nhập ghi chú xử lý */}
      <Dialog
        open={!!targetAction}
        onOpenChange={open => {
          if (!open) {
            setTargetAction(null)
            setNote('')
          }
        }}
      >
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>
              {targetAction?.status === 'investigating'
                ? 'Chuyển sang trạng thái điều tra'
                : targetAction?.status === 'resolved'
                  ? 'Đánh dấu đã xử lý báo cáo'
                  : 'Bỏ qua báo cáo'}
            </DialogTitle>
            <DialogDescription>
              Nhập ghi chú xử lý cho báo cáo: &quot;
              {targetAction?.report.targetTitle ??
                targetAction?.report.targetId}
              &quot;
            </DialogDescription>
          </DialogHeader>
          <div className="py-2 space-y-2">
            <Textarea
              value={note}
              onChange={e => setNote(e.target.value)}
              placeholder="Ghi chú kết quả xử lý (tối thiểu 5 ký tự)..."
              rows={4}
              className="resize-none text-xs"
            />
          </div>
          <DialogFooter className="gap-2 sm:gap-0">
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={() => {
                setTargetAction(null)
                setNote('')
              }}
              disabled={isSubmitting}
            >
              Hủy
            </Button>
            <Button
              type="button"
              size="sm"
              onClick={() => void handleConfirmUpdate()}
              disabled={isSubmitting || note.trim().length < 5}
            >
              {isSubmitting ? 'Đang lưu...' : 'Xác nhận'}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
