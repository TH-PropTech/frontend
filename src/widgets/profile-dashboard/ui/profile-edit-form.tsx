'use client'

import * as React from 'react'
import { Button } from '@/shared/ui/button'
import { apiClient, ApiClientError } from '@/shared/api/api-client'
import { toast } from 'sonner'
import { Edit3, X } from 'lucide-react'

export const VN_PHONE_REGEX = /^(0|\+84)(3|5|7|8|9)\d{8}$/

interface ProfileEditFormProps {
  initialFullName: string
  initialPhone?: string
  onClose: () => void
  onSuccess: (updated: { fullName: string; phone?: string }) => void
}

export function ProfileEditForm({
  initialFullName,
  initialPhone = '',
  onClose,
  onSuccess,
}: ProfileEditFormProps): React.ReactElement {
  const [fullName, setFullName] = React.useState(initialFullName)
  const [phone, setPhone] = React.useState(initialPhone)
  const [phoneError, setPhoneError] = React.useState<string | null>(null)
  const [generalError, setGeneralError] = React.useState<string | null>(null)
  const [isSubmitting, setIsSubmitting] = React.useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setPhoneError(null)
    setGeneralError(null)

    const trimmedPhone = phone.trim()
    if (trimmedPhone && !VN_PHONE_REGEX.test(trimmedPhone)) {
      setPhoneError('Số điện thoại không đúng định dạng Việt Nam')
      return
    }

    setIsSubmitting(true)
    try {
      const payload: { fullName?: string; phone?: string } = {}
      if (fullName.trim()) payload.fullName = fullName.trim()
      if (trimmedPhone) payload.phone = trimmedPhone

      await apiClient.patch('/users/me', payload)

      // Update localStorage
      try {
        const stored = localStorage.getItem('user')
        if (stored) {
          const u = JSON.parse(stored)
          if (payload.fullName) u.name = payload.fullName
          if (payload.phone) u.phone = payload.phone
          localStorage.setItem('user', JSON.stringify(u))
        }
      } catch (err) {
        console.error('Failed to update local user storage:', err)
      }

      toast.success('Cập nhật thông tin hồ sơ thành công!')
      onSuccess({ fullName: fullName.trim(), phone: trimmedPhone })
      onClose()
    } catch (err) {
      if (err instanceof ApiClientError && err.status === 400) {
        const msg = err.body?.message
        if (Array.isArray(msg)) {
          const phoneMsg = msg.find(
            (m: string) =>
              m.toLowerCase().includes('phone') ||
              m.toLowerCase().includes('điện thoại')
          )
          if (phoneMsg) {
            setPhoneError('Số điện thoại không hợp lệ')
          } else {
            setGeneralError(msg.join(', '))
          }
        } else if (typeof msg === 'string') {
          if (msg.toLowerCase().includes('phone')) {
            setPhoneError(msg)
          } else {
            setGeneralError(msg)
          }
        } else {
          setGeneralError('Thông tin cập nhật không hợp lệ')
        }
      } else {
        const msg =
          err instanceof Error ? err.message : 'Không thể cập nhật hồ sơ'
        setGeneralError(msg)
      }
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm p-4">
      <div className="bg-white rounded-3xl p-6 md:p-8 max-w-md w-full shadow-xl border border-border space-y-5 animate-in fade-in zoom-in-95 duration-150 text-left">
        <div className="flex items-center justify-between border-b border-border/50 pb-3">
          <div className="flex items-center gap-2">
            <Edit3 className="h-4.5 w-4.5 text-primary" />
            <h3 className="font-marketing text-base font-bold text-fg">
              Chỉnh sửa thông tin cá nhân
            </h3>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="p-1 rounded-full text-muted hover:text-fg hover:bg-surface-muted transition-colors cursor-pointer"
            aria-label="Đóng"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-1.5">
            <label className="text-xs font-bold text-fg block">
              Tên hiển thị
            </label>
            <input
              type="text"
              required
              value={fullName}
              onChange={e => setFullName(e.target.value)}
              placeholder="Nhập tên hiển thị"
              className="w-full border border-border rounded-xl px-4 py-2.5 text-xs text-fg bg-surface focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary/20"
            />
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-bold text-fg block">
              Số điện thoại
            </label>
            <input
              type="tel"
              value={phone}
              onChange={e => {
                setPhone(e.target.value)
                if (phoneError) setPhoneError(null)
              }}
              placeholder="Ví dụ: 0912345678 hoặc +84912345678"
              className={`w-full border rounded-xl px-4 py-2.5 text-xs text-fg bg-surface focus:outline-none focus:ring-1 ${
                phoneError
                  ? 'border-destructive focus:border-destructive focus:ring-destructive/20'
                  : 'border-border focus:border-primary focus:ring-primary/20'
              }`}
            />
            {phoneError && (
              <p className="text-[11px] text-destructive font-medium mt-1">
                {phoneError}
              </p>
            )}
          </div>

          {generalError && (
            <p className="text-[11px] text-destructive font-medium">
              {generalError}
            </p>
          )}

          <div className="flex justify-end gap-2.5 pt-3 border-t border-border/50">
            <Button
              type="button"
              variant="outline"
              onClick={onClose}
              disabled={isSubmitting}
              className="h-9 text-xs rounded-full px-4"
            >
              Hủy
            </Button>
            <Button
              type="submit"
              loading={isSubmitting}
              className="h-9 text-xs rounded-full px-5 font-bold"
            >
              Lưu thay đổi
            </Button>
          </div>
        </form>
      </div>
    </div>
  )
}
