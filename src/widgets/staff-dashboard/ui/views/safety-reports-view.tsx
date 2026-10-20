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
import { useCan } from '@/shared/lib/permissions'

export function SafetyReportsView(): React.ReactElement {
  const can = useCan()
  const canUpdate = can('update', 'SafetyReport')
  const [reports, setReports] = React.useState<SafetyReportItem[]>([])
  const [loading, setLoading] = React.useState(true)

  React.useEffect(() => {
    let active = true
    getModerationQueue()
      .then(result => {
        if (active) setReports(result.items)
      })
      .catch((error: unknown) =>
        appToast.error(
          error instanceof Error
            ? error.message
            : 'Không thể tải hàng đợi kiểm duyệt'
        )
      )
      .finally(() => {
        if (active) setLoading(false)
      })
    return () => {
      active = false
    }
  }, [])

  const updateStatus = async (
    report: SafetyReportItem,
    status: 'investigating' | 'resolved' | 'dismissed'
  ): Promise<void> => {
    try {
      const updated = await updateReportStatus(
        report._id,
        status,
        `Staff cập nhật: ${status}`
      )
      setReports(current =>
        current.map(item => (item._id === updated._id ? updated : item))
      )
      appToast.success('Đã cập nhật trạng thái báo cáo')
    } catch (error: unknown) {
      appToast.error(
        error instanceof Error ? error.message : 'Không thể cập nhật báo cáo'
      )
    }
  }

  if (loading)
    return (
      <div className="flex items-center gap-2 p-8 text-muted">
        <Loader2 className="h-5 w-5 animate-spin" /> Đang tải báo cáo...
      </div>
    )

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
                {report.riskLevel} · {report.status}
              </span>
            </div>
            {canUpdate ? (
              <div className="mt-4 flex flex-wrap gap-2">
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => void updateStatus(report, 'investigating')}
                >
                  Điều tra
                </Button>
                <Button
                  size="sm"
                  onClick={() => void updateStatus(report, 'resolved')}
                >
                  Đã xử lý
                </Button>
                <Button
                  size="sm"
                  variant="ghost"
                  onClick={() => void updateStatus(report, 'dismissed')}
                >
                  Bỏ qua
                </Button>
              </div>
            ) : null}
          </article>
        ))
      )}
    </div>
  )
}
