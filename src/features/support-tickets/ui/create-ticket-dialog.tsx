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
import { Textarea } from '@/shared/ui/textarea'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/shared/ui/select'
import { LifeBuoy, Send, Loader2 } from 'lucide-react'
import {
  createSupportTicket,
  TicketCategory,
  TicketPriority,
} from '../api/support-ticket-api'
import { appToast } from '@/shared/ui/app-toast'

interface CreateTicketDialogProps {
  trigger?: React.ReactNode
  onSuccess?: () => void
}

const CATEGORY_OPTIONS: { value: TicketCategory; label: string }[] = [
  { value: 'account', label: 'Tài khoản & Xác thực' },
  { value: 'listing', label: 'Đăng tin & Căn hộ' },
  { value: 'booking', label: 'Đặt lịch xem nhà' },
  { value: 'payment', label: 'Thanh toán & Hợp đồng' },
  { value: 'kyc', label: 'Dịch vụ KYC / Xác minh' },
  { value: 'technical', label: 'Lỗi kỹ thuật / Ứng dụng' },
  { value: 'feedback', label: 'Góp ý & Thắc mắc khác' },
]

export const CreateTicketDialog: React.FC<CreateTicketDialogProps> = ({
  trigger,
  onSuccess,
}) => {
  const [open, setOpen] = useState(false)
  const [category, setCategory] = useState<TicketCategory>('booking')
  const [priority, setPriority] = useState<TicketPriority>('normal')
  const [subject, setSubject] = useState('')
  const [description, setDescription] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!subject.trim() || description.trim().length < 10) {
      const message =
        'Vui lòng điền tiêu đề và mô tả chi tiết tối thiểu 10 ký tự'
      setError(message)
      appToast.error(message)
      return
    }

    try {
      setLoading(true)
      setError(null)
      await createSupportTicket({
        category,
        priority,
        subject: subject.trim(),
        description: description.trim(),
      })
      setOpen(false)
      setSubject('')
      setDescription('')
      appToast.success('Đã tạo yêu cầu hỗ trợ và bắt đầu theo dõi SLA')
      onSuccess?.()
    } catch (err: unknown) {
      const message =
        err instanceof Error ? err.message : 'Đã xảy ra lỗi khi gửi yêu cầu'
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
            size="sm"
            className="gap-1.5 bg-primary hover:bg-primary-hover text-surface"
          >
            <LifeBuoy className="w-4 h-4" />
            <span>Gửi yêu cầu hỗ trợ</span>
          </Button>
        )}
      </DialogTrigger>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2 text-fg">
            <LifeBuoy className="w-5 h-5 text-primary-600" />
            Tạo yêu cầu hỗ trợ (SLA Cam kết)
          </DialogTitle>
          <DialogDescription>
            Đội ngũ hỗ trợ sẽ phản hồi trong khung thời gian cam kết theo mức độ
            ưu tiên.
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4 py-2">
          {error && (
            <div className="p-3 text-sm rounded-md bg-primary-soft text-danger border border-border">
              {error}
            </div>
          )}

          <div className="grid grid-cols-2 gap-3">
            <div className="space-y-1">
              <label className="text-xs font-medium text-fg">
                Chủ đề hỗ trợ
              </label>
              <Select
                value={category}
                onValueChange={val => setCategory(val as TicketCategory)}
              >
                <SelectTrigger>
                  <SelectValue />
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

            <div className="space-y-1">
              <label className="text-xs font-medium text-fg">
                Mức độ ưu tiên
              </label>
              <Select
                value={priority}
                onValueChange={val => setPriority(val as TicketPriority)}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="low">Thấp (SLA 72 giờ)</SelectItem>
                  <SelectItem value="normal">
                    Bình thường (SLA 24 giờ)
                  </SelectItem>
                  <SelectItem value="high">Cao (SLA 8 giờ)</SelectItem>
                  <SelectItem value="urgent">Khẩn cấp (SLA 4 giờ)</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="space-y-1.5">
            <label className="text-sm font-medium text-fg">
              Tiêu đề yêu cầu
            </label>
            <Input
              placeholder="Tóm tắt ngắn gọn vấn đề cần hỗ trợ..."
              value={subject}
              onChange={e => setSubject(e.target.value)}
              required
            />
          </div>

          <div className="space-y-1.5">
            <label className="text-sm font-medium text-fg">
              Mô tả chi tiết
            </label>
            <Textarea
              placeholder="Cung cấp mã đặt lịch, mã hợp đồng hoặc thông tin chi tiết để xử lý nhanh hơn..."
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
              className="gap-2 bg-primary hover:bg-primary-hover text-surface"
            >
              {loading ? (
                <Loader2 className="w-4 h-4 animate-spin" />
              ) : (
                <Send className="w-4 h-4" />
              )}
              Tạo ticket
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}
