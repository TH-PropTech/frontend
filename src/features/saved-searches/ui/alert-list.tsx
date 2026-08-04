'use client'

import React, { useEffect, useState } from 'react'
import { Card, CardContent } from '@/shared/ui/card'
import { Button } from '@/shared/ui/button'
import { Badge } from '@/shared/ui/badge'
import {
  Bell,
  CheckCheck,
  Sparkles,
  TrendingDown,
  Clock,
  Loader2,
} from 'lucide-react'
import {
  getSearchAlerts,
  markAlertRead,
  markAllAlertsRead,
  SearchAlertItem,
} from '../api/saved-search-api'
import { appToast } from '@/shared/ui/app-toast'

export const AlertList: React.FC = () => {
  const [alerts, setAlerts] = useState<SearchAlertItem[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    let active = true
    getSearchAlerts()
      .then(res => {
        if (active) setAlerts(res.items || [])
      })
      .catch((error: unknown) =>
        appToast.error(
          error instanceof Error ? error.message : 'Không thể tải cảnh báo'
        )
      )
      .finally(() => {
        if (active) setLoading(false)
      })
    return () => {
      active = false
    }
  }, [])

  const handleMarkRead = async (id: string) => {
    try {
      await markAlertRead(id)
      setAlerts(prev =>
        prev.map(a => (a._id === id ? { ...a, isRead: true } : a))
      )
    } catch (error: unknown) {
      appToast.error(
        error instanceof Error ? error.message : 'Không thể cập nhật cảnh báo'
      )
    }
  }

  const handleMarkAllRead = async () => {
    try {
      await markAllAlertsRead()
      setAlerts(prev => prev.map(a => ({ ...a, isRead: true })))
      appToast.success('Đã đánh dấu tất cả cảnh báo là đã đọc')
    } catch (error: unknown) {
      appToast.error(
        error instanceof Error ? error.message : 'Không thể cập nhật cảnh báo'
      )
    }
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center p-6 text-muted gap-2">
        <Loader2 className="w-4 h-4 animate-spin" />
        <span>Đang tải thông báo...</span>
      </div>
    )
  }

  if (alerts.length === 0) {
    return (
      <div className="p-6 text-center text-muted border border-border border-dashed rounded-lg">
        <Bell className="w-8 h-8 mx-auto text-subtle mb-2" />
        <p className="text-sm">Không có thông báo cảnh báo nào mới.</p>
      </div>
    )
  }

  return (
    <div className="space-y-3">
      <div className="flex justify-between items-center text-xs text-muted">
        <span>
          Cảnh báo bất động sản ({alerts.filter(a => !a.isRead).length} chưa
          đọc)
        </span>
        <Button
          variant="ghost"
          size="sm"
          className="h-7 text-xs text-primary hover:text-primary-hover gap-1"
          onClick={handleMarkAllRead}
        >
          <CheckCheck className="w-3.5 h-3.5" />
          Đánh dấu tất cả đã đọc
        </Button>
      </div>

      {alerts.map(alert => (
        <Card
          key={alert._id}
          className={`transition-colors cursor-pointer ${
            !alert.isRead ? 'bg-primary-soft border-border' : 'bg-surface'
          }`}
          onClick={() => !alert.isRead && handleMarkRead(alert._id)}
        >
          <CardContent className="p-3 flex items-start gap-3">
            <div className="p-2 rounded-full bg-primary-soft text-primary shrink-0 mt-0.5">
              {alert.triggerType === 'price_change' ? (
                <TrendingDown className="w-4 h-4 text-success" />
              ) : alert.triggerType === 'new_listing' ? (
                <Sparkles className="w-4 h-4 text-primary" />
              ) : (
                <Clock className="w-4 h-4 text-info" />
              )}
            </div>

            <div className="flex-1 min-w-0 space-y-1">
              <div className="flex items-center justify-between gap-2">
                <span className="font-semibold text-xs text-fg truncate">
                  {alert.apartmentTitle}
                </span>
                {!alert.isRead && (
                  <Badge className="bg-primary text-surface text-[10px] px-1.5 py-0 h-4">
                    Mới
                  </Badge>
                )}
              </div>
              <p className="text-xs text-muted">{alert.matchReason}</p>
              <span className="text-[10px] text-subtle block pt-0.5">
                {new Date(alert.createdAt).toLocaleString('vi-VN')}
              </span>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}
