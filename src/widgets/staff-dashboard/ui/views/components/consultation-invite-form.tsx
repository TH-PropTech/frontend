'use client'

import * as React from 'react'
import { apiClient } from '@/shared/api/api-client'
import { toast } from 'sonner'

interface UserRecord {
  _id: string
  fullName: string
  email: string
}

interface ConsultationInviteFormProps {
  isAdmin: boolean
  users: UserRecord[]
  onSuccessInvite: () => void
}

export function ConsultationInviteForm({
  isAdmin,
  users,
  onSuccessInvite,
}: ConsultationInviteFormProps): React.ReactElement {
  const [selectedUserId, setSelectedUserId] = React.useState('')
  const [customEmail, setCustomEmail] = React.useState('')
  const [customName, setCustomName] = React.useState('')
  const [useCustom, setUseCustom] = React.useState(false)
  const [inviting, setInviting] = React.useState(false)

  const handleInvite = async (e: React.FormEvent): Promise<void> => {
    e.preventDefault()
    setInviting(true)
    try {
      const targetUserId = selectedUserId
      if (useCustom) {
        if (!customEmail || !customName) {
          toast.error('Vui lòng nhập đầy đủ thông tin khách hàng tự do.')
          setInviting(false)
          return
        }
      }

      await apiClient.post('/ai-consultation/start', {
        userId: useCustom ? undefined : targetUserId,
      })

      toast.success('Đã gửi thư mời tư vấn AI tới email khách hàng thành công!')
      setSelectedUserId('')
      setCustomEmail('')
      setCustomName('')
      onSuccessInvite()
    } catch (err) {
      console.error('Failed to send consultation invitation:', err)
      toast.error('Có lỗi xảy ra khi gửi thư mời.')
    } finally {
      setInviting(false)
    }
  }

  return (
    <div className="md:col-span-2 bg-surface border border-line rounded-xl p-5 shadow-sm space-y-4">
      <h3 className="text-sm font-bold text-fg font-marketing">
        Gửi thư mời mới
      </h3>
      {isAdmin ? (
        <form onSubmit={handleInvite} className="space-y-3">
          {/* Toggle System User / Custom Guest */}
          <div className="flex gap-4 border-b border-line pb-2 mb-3">
            <button
              type="button"
              onClick={() => setUseCustom(false)}
              className={`text-xs font-bold pb-1 transition-all border-b-2 ${
                !useCustom
                  ? 'border-primary text-primary'
                  : 'border-transparent text-muted'
              }`}
            >
              Chọn người dùng hệ thống
            </button>
            <button
              type="button"
              onClick={() => setUseCustom(true)}
              className={`text-xs font-bold pb-1 transition-all border-b-2 ${
                useCustom
                  ? 'border-primary text-primary'
                  : 'border-transparent text-muted'
              }`}
            >
              Khách hàng tự do
            </button>
          </div>

          {!useCustom ? (
            <div className="space-y-1">
              <label className="text-[10px] uppercase font-bold text-muted">
                Chọn tài khoản
              </label>
              <select
                value={selectedUserId}
                onChange={e => setSelectedUserId(e.target.value)}
                className="w-full text-xs p-2.5 border border-line rounded-lg bg-bg/25 focus:outline-none focus:border-accent"
                required
              >
                <option value="">-- Chọn khách hàng --</option>
                {users.map(u => (
                  <option key={u._id} value={u._id}>
                    {u.fullName} ({u.email})
                  </option>
                ))}
              </select>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div className="space-y-1">
                <label className="text-[10px] uppercase font-bold text-muted">
                  Họ và tên
                </label>
                <input
                  type="text"
                  value={customName}
                  onChange={e => setCustomName(e.target.value)}
                  placeholder="Nguyễn Văn A"
                  className="w-full text-xs p-2.5 border border-line rounded-lg bg-bg/25 focus:outline-none focus:border-accent"
                  required
                />
              </div>
              <div className="space-y-1">
                <label className="text-[10px] uppercase font-bold text-muted">
                  Email
                </label>
                <input
                  type="email"
                  value={customEmail}
                  onChange={e => setCustomEmail(e.target.value)}
                  placeholder="customer@gmail.com"
                  className="w-full text-xs p-2.5 border border-line rounded-lg bg-bg/25 focus:outline-none focus:border-accent"
                  required
                />
              </div>
            </div>
          )}

          <button
            type="submit"
            disabled={inviting}
            className="w-full py-2.5 bg-primary hover:bg-primary-hover text-on-control text-xs font-bold rounded-lg transition-colors flex items-center justify-center gap-1"
          >
            {inviting ? (
              <div className="h-4 w-4 animate-spin rounded-full border-2 border-on-control border-t-transparent" />
            ) : (
              'Gửi Thư Mời Qua Mail (Resend)'
            )}
          </button>
        </form>
      ) : (
        <div className="p-4 bg-accent/5 border border-accent/15 rounded-lg flex items-start gap-3">
          <svg
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.5"
            className="text-accent shrink-0 mt-0.5"
          >
            <circle cx="12" cy="12" r="10" />
            <line x1="12" y1="8" x2="12" y2="12" />
            <line x1="12" y1="16" x2="12.01" y2="16" />
          </svg>
          <div className="text-xs font-body text-muted leading-relaxed">
            Bạn đang đăng nhập dưới quyền{' '}
            <strong className="text-fg">Nhân viên vận hành (Staff)</strong>. Chỉ
            có tài khoản{' '}
            <strong className="text-fg">Quản trị viên (Admin)</strong> mới được
            phân quyền tạo và gửi thư mời tư vấn AI mới tới khách hàng.
          </div>
        </div>
      )}
    </div>
  )
}
