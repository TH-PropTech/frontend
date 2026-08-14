'use client'

import React, { useEffect, useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/shared/ui/card'
import { ReportStatusBadge } from './report-status-badge'
import { ShieldCheck, Calendar, FileText, Loader2 } from 'lucide-react'
import { getMySafetyReports, SafetyReportItem } from '../api/safety-report-api'
import { appToast } from '@/shared/ui/app-toast'

export const MyReportsList: React.FC = () => {
  const [reports, setReports] = useState<SafetyReportItem[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    let active = true
    getMySafetyReports()
      .then(res => {
        if (active) setReports(res.items || [])
      })
      .catch((requestError: unknown) => {
        const message =
          requestError instanceof Error
            ? requestError.message
            : 'Không thể tải danh sách báo cáo'
        if (active) setError(message)
        appToast.error(message)
      })
      .finally(() => {
        if (active) setLoading(false)
      })
    return () => {
      active = false
    }
  }, [])

  if (loading) {
    return (
      <div className="flex items-center justify-center p-8 text-muted gap-2">
        <Loader2 className="w-5 h-5 animate-spin" />
        <span>Đang tải danh sách báo cáo...</span>
      </div>
    )
  }

  if (error) {
    return (
      <div className="p-4 text-center text-danger bg-primary-soft rounded-lg">
        {error}
      </div>
    )
  }

  if (reports.length === 0) {
    return (
      <Card className="text-center p-8 border-dashed">
        <CardContent className="space-y-3">
          <ShieldCheck className="w-12 h-12 mx-auto text-success opacity-60" />
          <p className="font-medium text-fg">Tài khoản của bạn an toàn</p>
          <p className="text-sm text-muted">
            Bạn chưa gửi báo cáo vi phạm an toàn nào.
          </p>
        </CardContent>
      </Card>
    )
  }

  return (
    <div className="space-y-3">
      {reports.map(report => (
        <Card key={report._id} className="hover:shadow-sm transition-shadow">
          <CardHeader className="py-3 px-4 flex flex-row items-center justify-between space-y-0">
            <CardTitle className="text-sm font-medium text-fg flex items-center gap-2">
              <FileText className="w-4 h-4 text-muted" />
              <span>
                {report.targetTitle || `Đối tượng: ${report.targetId}`}
              </span>
            </CardTitle>
            <ReportStatusBadge status={report.status} />
          </CardHeader>
          <CardContent className="py-2 px-4 space-y-2 text-xs text-muted border-t border-border">
            <p className="line-clamp-2 text-sm text-fg">{report.description}</p>
            <div className="flex items-center justify-between text-subtle pt-1">
              <span>Loại: {report.category}</span>
              <span className="flex items-center gap-1">
                <Calendar className="w-3 h-3" />
                {new Date(report.createdAt).toLocaleDateString('vi-VN')}
              </span>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}
