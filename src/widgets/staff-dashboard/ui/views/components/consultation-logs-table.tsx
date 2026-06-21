'use client'

import * as React from 'react'
import { env } from '@/shared/config/env'

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

interface ConsultationLogsTableProps {
  paginatedLogs: ConsultationLog[]
  filteredLogs: ConsultationLog[]
  searchTerm: string
  setSearchTerm: (val: string) => void
  statusFilter: string
  setStatusFilter: (val: string) => void
  resultFilter: string
  setResultFilter: (val: string) => void
  currentPage: number
  totalPages: number
  setCurrentPage: React.Dispatch<React.SetStateAction<number>>
  itemsPerPage: number
  getParticipantInfo: (log: ConsultationLog) => { name: string; email: string }
  formatDuration: (seconds: number) => string
  getStatusBadgeClass: (status: string) => string
  getStatusText: (status: string) => string
  onViewDetails: (log: ConsultationLog) => void
}

export function ConsultationLogsTable({
  paginatedLogs,
  filteredLogs,
  searchTerm,
  setSearchTerm,
  statusFilter,
  setStatusFilter,
  resultFilter,
  setResultFilter,
  currentPage,
  totalPages,
  setCurrentPage,
  itemsPerPage,
  getParticipantInfo,
  formatDuration,
  getStatusBadgeClass,
  getStatusText,
  onViewDetails,
}: ConsultationLogsTableProps): React.ReactElement {
  return (
    <div className="bg-surface border border-line rounded-xl overflow-hidden shadow-sm">
      <div className="p-4 border-b border-line bg-surface-muted/10 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <h3 className="text-xs font-bold uppercase tracking-wider text-muted">
          Lịch sử tư vấn
        </h3>
        <div className="flex flex-wrap items-center gap-3">
          {/* Search */}
          <input
            type="text"
            placeholder="Tìm kiếm mã/tên/email..."
            value={searchTerm}
            onChange={e => setSearchTerm(e.target.value)}
            className="text-xs px-3 py-1.5 border border-line rounded-lg bg-bg/25 focus:outline-none focus:border-accent w-48 font-body text-fg"
          />
          {/* Status Filter */}
          <select
            value={statusFilter}
            onChange={e => setStatusFilter(e.target.value)}
            className="text-xs px-3 py-1.5 border border-line rounded-lg bg-bg/25 focus:outline-none focus:border-accent font-body text-fg"
          >
            <option value="">-- Trạng thái --</option>
            <option value="completed">Hoàn thành</option>
            <option value="in_progress">Đang đàm thoại</option>
            <option value="email_sent">Đã gửi thư mời</option>
            <option value="transferred">Đã chuyển nhân viên</option>
            <option value="failed">Thất bại</option>
          </select>
          {/* Result Filter */}
          <select
            value={resultFilter}
            onChange={e => setResultFilter(e.target.value)}
            className="text-xs px-3 py-1.5 border border-line rounded-lg bg-bg/25 focus:outline-none focus:border-accent font-body text-fg"
          >
            <option value="">-- Kết quả AI --</option>
            <option value="interested">Quan tâm</option>
            <option value="not_interested">Chưa có nhu cầu</option>
          </select>
        </div>
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
          <tbody className="divide-y divide-line/60 font-body">
            {paginatedLogs.map(log => {
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
                      onClick={() => onViewDetails(log)}
                      className="px-2.5 py-1 bg-fg/5 hover:bg-fg/10 text-fg rounded-md font-semibold transition-colors"
                    >
                      Chi tiết cuộc gọi
                    </button>
                    <a
                      href={`${env.apiUrl}/ai-consultation/chat-view?logId=${log.logId}`}
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
            {filteredLogs.length === 0 && (
              <tr>
                <td
                  colSpan={7}
                  className="p-8 text-center text-muted italic font-body"
                >
                  Chưa có cuộc gọi tư vấn AI nào được thực hiện hoặc không tìm
                  thấy kết quả phù hợp.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
      {totalPages > 1 && (
        <div className="p-4 border-t border-line flex items-center justify-between bg-surface-muted/10 text-xs">
          <span className="text-muted font-body">
            Hiển thị {(currentPage - 1) * itemsPerPage + 1}-
            {Math.min(currentPage * itemsPerPage, filteredLogs.length)} trong số{' '}
            {filteredLogs.length} cuộc gọi
          </span>
          <div className="flex items-center gap-2">
            <button
              onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
              disabled={currentPage === 1}
              className="px-3 py-1.5 bg-fg/5 hover:bg-fg/10 text-fg rounded-md font-semibold transition-colors disabled:opacity-50 font-body"
            >
              Trước
            </button>
            <span className="font-semibold text-fg font-body">
              Trang {currentPage} / {totalPages}
            </span>
            <button
              onClick={() =>
                setCurrentPage(prev => Math.min(prev + 1, totalPages))
              }
              disabled={currentPage === totalPages}
              className="px-3 py-1.5 bg-fg/5 hover:bg-fg/10 text-fg rounded-md font-semibold transition-colors disabled:opacity-50 font-body"
            >
              Sau
            </button>
          </div>
        </div>
      )}
    </div>
  )
}
