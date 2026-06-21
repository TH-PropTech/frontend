'use client'

import * as React from 'react'
import { apiClient } from '@/shared/api/api-client'
import { toast } from 'sonner'
import { ConsultationInviteForm } from './components/consultation-invite-form'
import { ConsultationTranscriptModal } from './components/consultation-transcript-modal'
import { ConsultationLogsTable } from './components/consultation-logs-table'

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
  const [isAdmin, setIsAdmin] = React.useState(false)

  // Dialog state
  const [viewingLog, setViewingLog] = React.useState<ConsultationLog | null>(
    null
  )

  // Search, Filter & Pagination states
  const [searchTerm, setSearchTerm] = React.useState('')
  const [statusFilter, setStatusFilter] = React.useState('')
  const [resultFilter, setResultFilter] = React.useState('')
  const [currentPage, setCurrentPage] = React.useState(1)
  const itemsPerPage = 10

  const getParticipantInfo = React.useCallback(
    (log: ConsultationLog): { name: string; email: string } => {
      if (!log.userId) {
        return { name: 'Khách vãng lai', email: 'N/A' }
      }
      const match = users.find(u => u._id === log.userId)
      return match
        ? { name: match.fullName, email: match.email }
        : { name: 'Người dùng hệ thống', email: 'Chưa rõ' }
    },
    [users]
  )

  const filteredLogs = React.useMemo(() => {
    return logs.filter(log => {
      const info = getParticipantInfo(log)
      const matchesSearch =
        log.logId.toLowerCase().includes(searchTerm.toLowerCase()) ||
        info.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        info.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
        (log.recommendedPackage || '')
          .toLowerCase()
          .includes(searchTerm.toLowerCase())

      const matchesStatus = !statusFilter || log.status === statusFilter
      const matchesResult = !resultFilter || log.result === resultFilter

      return matchesSearch && matchesStatus && matchesResult
    })
  }, [logs, searchTerm, statusFilter, resultFilter, getParticipantInfo])

  const totalPages = Math.ceil(filteredLogs.length / itemsPerPage)

  const paginatedLogs = React.useMemo(() => {
    const startIndex = (currentPage - 1) * itemsPerPage
    return filteredLogs.slice(startIndex, startIndex + itemsPerPage)
  }, [filteredLogs, currentPage])

  React.useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setCurrentPage(1)
  }, [searchTerm, statusFilter, resultFilter])

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

  const formatDuration = (seconds: number): string => {
    const min = Math.floor(seconds / 60)
    const sec = seconds % 60
    return `${min}:${sec.toString().padStart(2, '0')}`
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

  const selectedParticipantInfo = viewingLog
    ? getParticipantInfo(viewingLog)
    : null

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
        <ConsultationInviteForm
          isAdmin={isAdmin}
          users={users}
          onSuccessInvite={() => void loadData()}
        />

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
      <ConsultationLogsTable
        paginatedLogs={paginatedLogs}
        filteredLogs={filteredLogs}
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        statusFilter={statusFilter}
        setStatusFilter={setStatusFilter}
        resultFilter={resultFilter}
        setResultFilter={setResultFilter}
        currentPage={currentPage}
        totalPages={totalPages}
        setCurrentPage={setCurrentPage}
        itemsPerPage={itemsPerPage}
        getParticipantInfo={getParticipantInfo}
        formatDuration={formatDuration}
        getStatusBadgeClass={getStatusBadgeClass}
        getStatusText={getStatusText}
        onViewDetails={log => setViewingLog(log)}
      />

      {/* Transcript Detail Dialog */}
      {viewingLog && selectedParticipantInfo && (
        <ConsultationTranscriptModal
          viewingLog={viewingLog}
          onClose={() => setViewingLog(null)}
          participantName={selectedParticipantInfo.name}
          participantEmail={selectedParticipantInfo.email}
          formatDuration={formatDuration}
          getStatusText={getStatusText}
        />
      )}
    </div>
  )
}
