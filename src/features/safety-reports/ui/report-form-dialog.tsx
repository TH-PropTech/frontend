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
import { Textarea } from '@/shared/ui/textarea'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/shared/ui/select'
import { ShieldAlert, AlertTriangle, Send, Loader2 } from 'lucide-react'
import {
  createSafetyReport,
  SafetyReportCategory,
  SafetyReportTargetType,
} from '../api/safety-report-api'
import { appToast } from '@/shared/ui/app-toast'

interface ReportFormDialogProps {
  targetType: SafetyReportTargetType
  targetId: string
  targetTitle?: string
  trigger?: React.ReactNode
  onSuccess?: () => void
}

const CATEGORY_OPTIONS: { value: SafetyReportCategory; label: string }[] = [
  { value: 'fake_listing', label: 'Tin đăng ảo / Thông tin sai sự thật' },
  { value: 'external_payment', label: 'Yêu cầu chuyển tiền ngoài hệ thống' },
  { value: 'wrong_info', label: 'Thông tin căn hộ không chính xác' },
  { value: 'harassment', label: 'Quấy rầy / Ngôn từ không phù hợp' },
  { value: 'spam', label: 'Spam / Đăng lặp lại' },
  { value: 'danger', label: 'Có hành vi dấu hiệu lừa đảo nguy hiểm' },
]

export const ReportFormDialog: React.FC<ReportFormDialogProps> = ({
  targetType,
  targetId,
  targetTitle,
  trigger,
  onSuccess,
}) => {
  const [open, setOpen] = useState(false)
  const [category, setCategory] = useState<SafetyReportCategory>('fake_listing')
  const [description, setDescription] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (description.trim().length < 10) {
      const message = 'Vui lòng nhập mô tả chi tiết ít nhất 10 ký tự'
      setError(message)
      appToast.error(message)
      return
    }

    try {
      setLoading(true)
      setError(null)
      const payload: Parameters<typeof createSafetyReport>[0] = {
        targetType,
        targetId,
        category,
        description: description.trim(),
      }
      if (targetTitle) payload.targetTitle = targetTitle

      await createSafetyReport(payload)
      setOpen(false)
      setDescription('')
      appToast.success('Đã gửi báo cáo an toàn để kiểm duyệt')
      onSuccess?.()
    } catch (err: unknown) {
      const message =
        err instanceof Error ? err.message : 'Đã xảy ra lỗi khi gửi báo cáo'
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
            className="gap-1.5 text-primary border-border hover:bg-primary-soft"
          >
            <ShieldAlert className="w-4 h-4 text-primary" />
            <span>Báo cáo vi phạm</span>
          </Button>
        )}
      </DialogTrigger>
      <DialogContent className="sm:max-w-[480px]">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2 text-danger">
            <AlertTriangle className="w-5 h-5" />
            Báo cáo an toàn & chống lừa đảo
          </DialogTitle>
          <DialogDescription>
            Báo cáo của bạn sẽ được đội ngũ hỗ trợ kiểm duyệt bảo mật.
            {targetTitle && (
              <span className="block mt-1 font-medium text-fg">
                Đối tượng: {targetTitle}
              </span>
            )}
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4 py-2">
          {error && (
            <div className="p-3 text-sm rounded-md bg-primary-soft text-danger border border-border">
              {error}
            </div>
          )}

          <div className="space-y-1.5">
            <label className="text-sm font-medium text-fg">
              Danh mục vi phạm
            </label>
            <Select
              value={category}
              onValueChange={val => setCategory(val as SafetyReportCategory)}
            >
              <SelectTrigger>
                <SelectValue placeholder="Chọn loại vi phạm" />
              </SelectTrigger>
              <SelectContent>
                {CATEGORY_OPTIONS.map(opt => (
                  <SelectItem key={opt.value} value={opt.value}>
                    {opt.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-1.5">
            <label className="text-sm font-medium text-fg">
              Mô tả chi tiết sự việc
            </label>
            <Textarea
              placeholder="Nêu rõ thông tin vi phạm, thời gian hoặc bằng chứng cụ thể..."
              value={description}
              onChange={e => setDescription(e.target.value)}
              rows={4}
              required
            />
          </div>

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
              className="gap-2 bg-danger text-surface hover:opacity-90"
            >
              {loading ? (
                <Loader2 className="w-4 h-4 animate-spin" />
              ) : (
                <Send className="w-4 h-4" />
              )}
              Gửi báo cáo
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}
