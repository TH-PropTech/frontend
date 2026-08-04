'use client'

import React, { useEffect, useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/shared/ui/card'
import { Button } from '@/shared/ui/button'
import { Switch } from '@/shared/ui/switch'
import { Bookmark, Trash2, Bell, Loader2 } from 'lucide-react'
import {
  getSavedSearches,
  deleteSavedSearch,
  toggleSearchAlert,
  SavedSearchItem,
} from '../api/saved-search-api'
import { appToast } from '@/shared/ui/app-toast'

interface SavedSearchesListProps {
  onSelectSearch?: (search: SavedSearchItem) => void
}

export const SavedSearchesList: React.FC<SavedSearchesListProps> = ({
  onSelectSearch,
}) => {
  const [searches, setSearches] = useState<SavedSearchItem[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    let active = true
    getSavedSearches()
      .then(res => {
        if (active) setSearches(res.items || [])
      })
      .catch((error: unknown) =>
        appToast.error(
          error instanceof Error ? error.message : 'Không thể tải bộ lọc đã lưu'
        )
      )
      .finally(() => {
        if (active) setLoading(false)
      })
    return () => {
      active = false
    }
  }, [])

  const handleDelete = async (id: string) => {
    try {
      await deleteSavedSearch(id)
      setSearches(prev => prev.filter(s => s._id !== id))
      appToast.success('Đã xóa bộ lọc tìm kiếm')
    } catch (error: unknown) {
      appToast.error(
        error instanceof Error ? error.message : 'Không thể xóa bộ lọc'
      )
    }
  }

  const handleToggleAlert = async (id: string, currentStatus: boolean) => {
    try {
      const updated = await toggleSearchAlert(id, !currentStatus)
      setSearches(prev =>
        prev.map(s =>
          s._id === id ? { ...s, alertEnabled: updated.alertEnabled } : s
        )
      )
      appToast.success(
        updated.alertEnabled
          ? 'Đã bật cảnh báo tìm kiếm'
          : 'Đã tắt cảnh báo tìm kiếm'
      )
    } catch (error: unknown) {
      appToast.error(
        error instanceof Error ? error.message : 'Không thể cập nhật cảnh báo'
      )
    }
  }

  if (loading) {
    return (
      <div
        className="flex items-center justify-center p-6 gap-2"
        style={{ color: 'var(--muted)' }}
      >
        <Loader2 className="w-4 h-4 animate-spin" />
        <span>Đang tải danh sách tìm kiếm đã lưu...</span>
      </div>
    )
  }

  if (searches.length === 0) {
    return (
      <div
        className="p-6 text-center border border-dashed rounded-lg"
        style={{
          borderColor: 'var(--border)',
          color: 'var(--muted)',
          backgroundColor: 'var(--surface-muted)',
        }}
      >
        <Bookmark
          className="w-8 h-8 mx-auto mb-2"
          style={{ color: 'var(--subtle)' }}
        />
        <p className="text-sm font-medium">
          Bạn chưa có bộ lọc tìm kiếm nào được lưu.
        </p>
      </div>
    )
  }

  return (
    <div className="space-y-3">
      {searches.map(search => (
        <Card
          key={search._id}
          style={{
            backgroundColor: 'var(--surface)',
            borderColor: 'var(--border)',
          }}
          className="transition-colors hover:border-[var(--border-strong)]"
        >
          <CardHeader className="py-3 px-4 flex flex-row items-center justify-between space-y-0">
            <CardTitle
              className="text-sm font-semibold cursor-pointer transition-colors"
              style={{ color: 'var(--fg)' }}
              onClick={() => onSelectSearch?.(search)}
            >
              {search.name}
            </CardTitle>
            <div className="flex items-center gap-2">
              <div
                className="flex items-center gap-1 text-xs mr-2"
                style={{ color: 'var(--muted)' }}
              >
                <Bell
                  className="w-3.5 h-3.5"
                  style={{
                    color: search.alertEnabled
                      ? 'var(--primary)'
                      : 'var(--subtle)',
                  }}
                />
                <Switch
                  checked={search.alertEnabled}
                  onCheckedChange={() =>
                    handleToggleAlert(search._id, search.alertEnabled)
                  }
                />
              </div>
              <Button
                variant="ghost"
                size="icon"
                className="w-7 h-7 hover:bg-[var(--surface-muted)]"
                style={{ color: 'var(--muted)' }}
                onClick={() => handleDelete(search._id)}
              >
                <Trash2 className="w-3.5 h-3.5" />
              </Button>
            </div>
          </CardHeader>
          <CardContent
            className="py-2 px-4 text-xs border-t flex flex-wrap gap-2"
            style={{ borderColor: 'var(--border)', color: 'var(--muted)' }}
          >
            {search.filters.city && (
              <span
                className="px-2 py-0.5 rounded border"
                style={{
                  backgroundColor: 'var(--surface-muted)',
                  borderColor: 'var(--border)',
                }}
              >
                {search.filters.city}
              </span>
            )}
            {search.filters.district && (
              <span
                className="px-2 py-0.5 rounded border"
                style={{
                  backgroundColor: 'var(--surface-muted)',
                  borderColor: 'var(--border)',
                }}
              >
                {search.filters.district}
              </span>
            )}
            {search.filters.maxPrice && (
              <span
                className="px-2 py-0.5 rounded border font-semibold"
                style={{
                  backgroundColor: 'var(--primary-soft)',
                  borderColor: 'var(--primary-soft)',
                  color: 'var(--primary)',
                }}
              >
                Dưới {search.filters.maxPrice.toFixed(1)} tr/tháng
              </span>
            )}
            {search.filters.bedrooms && (
              <span
                className="px-2 py-0.5 rounded border"
                style={{
                  backgroundColor: 'var(--surface-muted)',
                  borderColor: 'var(--border)',
                }}
              >
                {search.filters.bedrooms} PN
              </span>
            )}
          </CardContent>
        </Card>
      ))}
    </div>
  )
}
