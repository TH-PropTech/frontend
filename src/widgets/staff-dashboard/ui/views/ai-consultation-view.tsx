'use client'

import * as React from 'react'
import { apiClient } from '@/shared/api/api-client'
import { toast } from 'sonner'

interface MessageItem {
  role: 'user' | 'assistant' | 'system'
  content: string
  timestamp: string
}

interface ConsultationLog {
  _id: string
  logId: string
  userId?: string | null
  messages: MessageItem[]
  status:
    | 'pending'
    | 'email_sent'
    | 'in_progress'
    | 'completed'
    | 'transferred'
    | 'failed'
  result: 'interested' | 'not_interested' | 'registered' | 'completed'
  recommendedPackage?: string | null
  duration: number
  notes?: string | null
  createdAt: string
}

interface UserRecord {
  _id: string
  fullName: string
  email: string
}

export function AiConsultationView(): React.ReactElement {
  const [logs, setLogs] = React.useState<ConsultationLog[]>([])
  const [users, setUsers] = React.useState<UserRecord[]>([])
  const [loading, setLoading] = React.useState(true)
  const [inviting, setInviting] = React.useState(false)
  const [isAdmin, setIsAdmin] = React.useState(false)

  // Form states
  const [selectedUserId, setSelectedUserId] = React.useState('')
  const [customEmail, setCustomEmail] = React.useState('')
  const [customName, setCustomName] = React.useState('')
  const [useCustom, setUseCustom] = React.useState(false)

  // Dialog state
  const [viewingLog, setViewingLog] = React.useState<ConsultationLog | null>(
    null
  )

  React.useEffect(() => {
    if (typeof window !== 'undefined') {
      try {
        const stored = localStorage.getItem('user')
        if (stored) {
          const parsed = JSON.parse(stored) as { roles?: string[] }
          if (parsed?.roles?.includes('admin')) {
            // eslint-disable-next-line react-hooks/set-state-in-effect
            setIsAdmin(true)
          }
        }
      } catch (e) {
        console.warn('Failed to parse user roles:', e)
      }
    }
  }, [])

  const loadData = React.useCallback(async () => {
    setLoading(true)
    try {
      const [logsData, usersData] = await Promise.all([
        apiClient.get<ConsultationLog[]>('/ai-consultation/logs'),
        apiClient.get<UserRecord[]>('/users'),
      ])
      setLogs(logsData || [])
      setUsers(usersData || [])
    } catch (err) {
      console.error('Failed to load consultation logs or users:', err)
      toast.error('Không thể tải dữ liệu trợ lý ảo.')
    } finally {
      setLoading(false)
    }
  }, [])

  React.useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    void loadData()
  }, [loadData])

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
        // For custom guest email without system account, we trigger start without userId first
        // and we will handle sending invitation mail from backend directly if we support it.
        // Wait, startSession supports optional userId. Let's make an API call to start.
        toast.info('Đang khởi tạo phiên tư vấn AI...')
      }

      await apiClient.post('/ai-consultation/start', {
        userId: useCustom ? undefined : targetUserId,
      })

      toast.success('Đã gửi thư mời tư vấn AI tới email khách hàng thành công!')
      setSelectedUserId('')
      setCustomEmail('')
      setCustomName('')
      void loadData()
    } catch (err) {
      console.error('Failed to send consultation invitation:', err)
      toast.error('Có lỗi xảy ra khi gửi thư mời.')
    } finally {
      setInviting(false)
    }
  }

  const formatDuration = (seconds: number): string => {
    const min = Math.floor(seconds / 60)
    const sec = seconds % 60
    return `${min}:${sec.toString().padStart(2, '0')}`
  }

  const getParticipantInfo = (
    log: ConsultationLog
  ): { name: string; email: string } => {
    if (!log.userId) {
      return { name: 'Khách vãng lai', email: 'N/A' }
    }
    const match = users.find(u => u._id === log.userId)
    return match
      ? { name: match.fullName, email: match.email }
      : { name: 'Người dùng hệ thống', email: 'Chưa rõ' }
  }

  const getStatusBadgeClass = (status: string): string => {
    switch (status) {
      case 'completed':
        return 'bg-accent-2/10 text-accent-2'
      case 'in_progress':
        return 'bg-accent-3/10 text-accent-3'
      case 'email_sent':
        return 'bg-blue-500/10 text-blue-500'
      case 'transferred':
        return 'bg-purple-500/10 text-purple-500'
      case 'failed':
        return 'bg-accent/10 text-accent'
      default:
        return 'bg-fg/5 text-muted'
    }
  }

  const getStatusText = (status: string): string => {
    switch (status) {
      case 'completed':
        return 'Hoàn thành'
      case 'in_progress':
        return 'Đang đàm thoại'
      case 'email_sent':
        return 'Đã gửi thư mời'
      case 'transferred':
        return 'Đã chuyển nhân viên'
      case 'failed':
        return 'Thất bại'
      default:
        return 'Đang chờ'
    }
  }

  if (loading) {
    return (
      <div className="flex h-64 items-center justify-center">
        <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent" />
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* View Header */}
      <div>
        <h2 className="text-xl font-bold text-fg font-marketing">
          Trợ lý ảo AI & Gửi thư mời tư vấn
        </h2>
        <p className="text-xs text-muted mt-1">
          Gửi thư mời tư vấn căn hộ tới email khách hàng, giám sát thời lượng
          cuộc gọi và xem báo cáo tóm tắt nhu cầu.
        </p>
      </div>

      {/* Grid: Form & Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Invite Form / Unauthorized Message */}
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
                <strong className="text-fg">Nhân viên vận hành (Staff)</strong>.
                Chỉ có tài khoản{' '}
                <strong className="text-fg">Quản trị viên (Admin)</strong> mới
                được phân quyền tạo và gửi thư mời tư vấn AI mới tới khách hàng.
              </div>
            </div>
          )}
        </div>

        {/* Small stats cards */}
        <div className="bg-surface border border-line rounded-xl p-5 shadow-sm flex flex-col justify-between">
          <div className="space-y-2">
            <h3 className="text-sm font-bold text-fg font-marketing">
              Chỉ số vận hành AI
            </h3>
            <div className="grid grid-cols-2 gap-3 pt-2">
              <div className="p-3 bg-bg/20 border border-line rounded-lg text-center">
                <span className="block text-[10px] text-muted font-bold">
                  Tổng cuộc gọi
                </span>
                <span className="text-lg font-bold text-fg font-display">
                  {logs.length}
                </span>
              </div>
              <div className="p-3 bg-bg/20 border border-line rounded-lg text-center">
                <span className="block text-[10px] text-muted font-bold">
                  Quan tâm căn hộ
                </span>
                <span className="text-lg font-bold text-accent-2 font-display">
                  {logs.filter(l => l.result === 'interested').length}
                </span>
              </div>
            </div>
          </div>
          <div className="border-t border-line/50 pt-3 text-[11px] text-muted leading-relaxed font-body">
            Hệ thống tự động phân tích cuộc gọi sau khi kết thúc và gửi thông
            tin đề xuất căn hộ qua email cho khách.
          </div>
        </div>
      </div>

      {/* Logs Table */}
      <div className="bg-surface border border-line rounded-xl overflow-hidden shadow-sm">
        <div className="p-4 border-b border-line bg-surface-muted/10">
          <h3 className="text-xs font-bold uppercase tracking-wider text-muted">
            Lịch sử tư vấn
          </h3>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse text-xs">
            <thead>
              <tr className="bg-surface-muted/30 border-b border-line text-muted uppercase tracking-wider font-semibold font-body">
                <th className="p-4">Mã cuộc gọi</th>
                <th className="p-4">Khách hàng</th>
                <th className="p-4">Thời lượng</th>
                <th className="p-4">Trạng thái</th>
                <th className="p-4">Kết quả phân tích AI</th>
                <th className="p-4">Căn hộ đề xuất</th>
                <th className="p-4 text-right">Hành động</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-line/60">
              {logs.map(log => {
                const info = getParticipantInfo(log)
                return (
                  <tr
                    key={log.logId}
                    className="hover:bg-bg/10 transition-colors"
                  >
                    <td className="p-4 font-mono font-bold text-fg">
                      {log.logId}
                    </td>
                    <td className="p-4">
                      <div className="font-semibold text-fg">{info.name}</div>
                      <div className="text-[10px] text-muted mt-0.5">
                        {info.email}
                      </div>
                    </td>
                    <td className="p-4 font-mono">
                      {formatDuration(log.duration)}
                    </td>
                    <td className="p-4">
                      <span
                        className={`text-[9px] font-bold px-2 py-0.5 rounded-full ${getStatusBadgeClass(
                          log.status
                        )}`}
                      >
                        {getStatusText(log.status)}
                      </span>
                    </td>
                    <td className="p-4">
                      {log.status === 'completed' ? (
                        <span
                          className={`text-[9px] font-bold px-2 py-0.5 rounded-full ${
                            log.result === 'interested'
                              ? 'bg-accent-2/10 text-accent-2'
                              : 'bg-fg/5 text-muted'
                          }`}
                        >
                          {log.result === 'interested'
                            ? 'Quan tâm thuê'
                            : 'Chưa có nhu cầu'}
                        </span>
                      ) : (
                        <span className="text-muted italic text-[11px]">-</span>
                      )}
                    </td>
                    <td className="p-4 font-semibold text-fg">
                      {log.recommendedPackage || (
                        <span className="text-muted font-normal italic text-[11px]">
                          Không có
                        </span>
                      )}
                    </td>
                    <td className="p-4 text-right space-x-1.5">
                      <button
                        onClick={() => setViewingLog(log)}
                        className="px-2.5 py-1 bg-fg/5 hover:bg-fg/10 text-fg rounded-md font-semibold transition-colors"
                      >
                        Chi tiết cuộc gọi
                      </button>
                      <a
                        href={`http://localhost:3001/ai-consultation/chat-view?logId=${log.logId}`}
                        target="_blank"
                        rel="noreferrer"
                        className="inline-block px-2.5 py-1 bg-primary/10 hover:bg-primary/20 text-primary rounded-md font-semibold transition-colors text-center"
                      >
                        Thử đàm thoại
                      </a>
                    </td>
                  </tr>
                )
              })}
              {logs.length === 0 && (
                <tr>
                  <td
                    colSpan={7}
                    className="p-8 text-center text-subtle font-body"
                  >
                    Chưa có cuộc gọi tư vấn AI nào được thực hiện.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Transcript Detail Dialog */}
      {viewingLog && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div
            className="absolute inset-0 bg-fg/50 backdrop-blur-sm"
            onClick={() => setViewingLog(null)}
          />
          <div className="relative z-10 w-full max-w-2xl bg-surface border border-line rounded-xl shadow-xl overflow-hidden animate-in fade-in zoom-in-95 duration-200">
            {/* Header */}
            <div className="p-5 border-b border-line flex justify-between items-center">
              <div>
                <h3 className="text-sm font-bold text-fg font-marketing">
                  Chi tiết cuộc gọi {viewingLog.logId}
                </h3>
                <p className="text-[10px] text-muted mt-0.5">
                  Thời lượng: {formatDuration(viewingLog.duration)} | Trạng
                  thái: {getStatusText(viewingLog.status)}
                </p>
              </div>
              <button
                onClick={() => setViewingLog(null)}
                className="p-1 hover:bg-fg/5 rounded-lg transition-colors text-muted"
              >
                <svg
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.5"
                >
                  <line x1="18" y1="6" x2="6" y2="18" />
                  <line x1="6" y1="6" x2="18" y2="18" />
                </svg>
              </button>
            </div>

            {/* Content Body */}
            <div className="p-5 space-y-4 max-h-[350px] overflow-y-auto bg-bg/10">
              {viewingLog.messages.length === 0 ? (
                <div className="text-center text-muted py-8 text-xs font-body">
                  Không có tin nhắn đàm thoại nào được ghi lại.
                </div>
              ) : (
                viewingLog.messages.map((m, idx) => (
                  <div
                    key={idx}
                    className={`flex flex-col max-w-[80%] ${
                      m.role === 'user'
                        ? 'ml-auto items-end'
                        : 'mr-auto items-start'
                    }`}
                  >
                    <div
                      className={`p-3 rounded-xl text-xs font-body shadow-sm leading-relaxed ${
                        m.role === 'user'
                          ? 'bg-primary text-on-control rounded-tr-none'
                          : 'bg-surface border border-line text-fg rounded-tl-none'
                      }`}
                    >
                      {m.content}
                    </div>
                    <span className="text-[8px] text-muted mt-1 px-1">
                      {m.role === 'user' ? 'Khách hàng' : 'Trợ lý AI'}
                    </span>
                  </div>
                ))
              )}
            </div>

            {/* AI Summary Section */}
            {viewingLog.status === 'completed' && (
              <div className="p-5 border-t border-line bg-surface-muted/15 text-xs space-y-2">
                <div className="flex justify-between items-center">
                  <span className="font-bold text-fg">
                    Phân tích tóm tắt của AI:
                  </span>
                  <span
                    className={`text-[9px] font-bold px-2 py-0.5 rounded-full ${
                      viewingLog.result === 'interested'
                        ? 'bg-accent-2/10 text-accent-2'
                        : 'bg-fg/5 text-muted'
                    }`}
                  >
                    {viewingLog.result === 'interested'
                      ? 'Có quan tâm căn hộ'
                      : 'Chưa có nhu cầu'}
                  </span>
                </div>
                <div className="bg-bg/25 border border-line rounded-lg p-3 space-y-1.5 font-body">
                  <p>
                    <strong>Căn hộ đề xuất:</strong>{' '}
                    <span className="text-primary font-semibold">
                      {viewingLog.recommendedPackage || 'Chưa đề xuất'}
                    </span>
                  </p>
                  <p>
                    <strong>Ghi chú nhu cầu:</strong>{' '}
                    {viewingLog.notes || 'Không có ghi chú.'}
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  )
}
