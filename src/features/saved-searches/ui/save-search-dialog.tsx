'use client'

import React, { useState } from 'react'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/shared/ui/dialog'
import { Button } from '@/shared/ui/button'
import { Input } from '@/shared/ui/input'
import { Switch } from '@/shared/ui/switch'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/shared/ui/select'
import { BookmarkPlus, Bell, Loader2 } from 'lucide-react'
import { createSavedSearch, SavedSearchFilters } from '../api/saved-search-api'
import { appToast } from '@/shared/ui/app-toast'

interface SaveSearchDialogProps {
  currentFilters: SavedSearchFilters
  trigger?: React.ReactNode
  onSuccess?: () => void
}

export const SaveSearchDialog: React.FC<SaveSearchDialogProps> = ({
  currentFilters,
  trigger,
  onSuccess,
}) => {
  const [open, setOpen] = useState(false)
  const [name, setName] = useState('')
  const [alertEnabled, setAlertEnabled] = useState(true)
  const [alertFrequency, setAlertFrequency] = useState<
    'instant' | 'daily' | 'weekly'
  >('daily')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!name.trim()) {
      const message = 'Vui lòng nhập tên cho bộ lọc'
      setError(message)
      appToast.error(message)
      return
    }

    try {
      setLoading(true)
      setError(null)
      await createSavedSearch({
        name: name.trim(),
        filters: currentFilters,
        alertEnabled,
        alertFrequency,
      })
      setOpen(false)
      setName('')
      appToast.success('Đã lưu bộ lọc và cấu hình cảnh báo')
      onSuccess?.()
    } catch (err: unknown) {
      const message =
        err instanceof Error ? err.message : 'Không thể lưu bộ lọc'
      setError(message)
      appToast.error(message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        {trigger ?? (
          <Button
            variant="outline"
            size="sm"
            className="gap-1.5 border-primary-200 text-primary-700 hover:bg-primary-50"
          >
            <BookmarkPlus className="w-4 h-4 text-primary-600" />
            <span>Lưu tìm kiếm</span>
          </Button>
        )}
      </DialogTrigger>
      <DialogContent className="sm:max-w-[420px]">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2 text-fg">
            <BookmarkPlus className="w-5 h-5 text-primary" />
            Lưu bộ lọc tìm kiếm
          </DialogTitle>
          <DialogDescription>
            Nhận thông báo tự động khi có căn hộ mới hoặc giảm giá phù hợp.
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSave} className="space-y-4 py-2">
          {error && (
            <div className="p-3 text-sm rounded-md bg-primary-soft text-danger border border-border">
              {error}
            </div>
          )}

          <div className="space-y-1.5">
            <label className="text-sm font-medium text-fg">Tên bộ lọc</label>
            <Input
              placeholder="Ví dụ: Căn hộ 2PN Cầu Giấy dưới 15tr..."
              value={name}
              onChange={e => setName(e.target.value)}
              required
            />
          </div>

          <div className="flex items-center justify-between pt-2 border-t border-border">
            <div className="space-y-0.5">
              <span className="text-sm font-medium text-fg flex items-center gap-1.5">
                <Bell className="w-4 h-4 text-primary" />
                Bật nhận thông báo
              </span>
              <p className="text-xs text-muted">
                Gửi notification khi có tin đăng mới
              </p>
            </div>
            <Switch checked={alertEnabled} onCheckedChange={setAlertEnabled} />
          </div>

          {alertEnabled && (
            <div className="space-y-1.5">
              <label className="text-sm font-medium text-fg">
                Tần suất nhận
              </label>
              <Select
                value={alertFrequency}
                onValueChange={val =>
                  setAlertFrequency(val as 'instant' | 'daily' | 'weekly')
                }
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="instant">
                    Tức thì (Khi có tin mới)
                  </SelectItem>
                  <SelectItem value="daily">Hàng ngày (Tổng hợp)</SelectItem>
                  <SelectItem value="weekly">Hàng tuần</SelectItem>
                </SelectContent>
              </Select>
            </div>
          )}

          <DialogFooter className="pt-2">
            <Button
              type="button"
              variant="ghost"
              onClick={() => setOpen(false)}
              disabled={loading}
            >
              Hủy
            </Button>
            <Button
              type="submit"
              disabled={loading}
              className="gap-2 bg-primary hover:bg-primary-hover text-surface"
            >
              {loading ? (
                <Loader2 className="w-4 h-4 animate-spin" />
              ) : (
                <BookmarkPlus className="w-4 h-4" />
              )}
              Lưu tìm kiếm
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}
