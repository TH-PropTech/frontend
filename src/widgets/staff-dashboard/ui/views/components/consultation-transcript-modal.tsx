'use client'

import * as React from 'react'

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

interface ConsultationTranscriptModalProps {
  viewingLog: ConsultationLog
  onClose: () => void
  participantName: string
  participantEmail: string
  formatDuration: (seconds: number) => string
  getStatusText: (status: string) => string
}

export function ConsultationTranscriptModal({
  viewingLog,
  onClose,
  participantName,
  participantEmail,
  formatDuration,
  getStatusText,
}: ConsultationTranscriptModalProps): React.ReactElement {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div
        className="absolute inset-0 bg-fg/50 backdrop-blur-sm"
        onClick={onClose}
      />
      <div className="relative z-10 w-full max-w-2xl bg-surface border border-line rounded-xl shadow-xl overflow-hidden animate-in fade-in zoom-in-95 duration-200">
        {/* Header */}
        <div className="p-5 border-b border-line flex justify-between items-center">
          <div>
            <h3 className="text-sm font-bold text-fg font-marketing">
              Chi tiết cuộc gọi {viewingLog.logId} ({participantName})
            </h3>
            <p className="text-[10px] text-muted mt-0.5">
              Khách hàng: {participantEmail} | Thời lượng:{' '}
              {formatDuration(viewingLog.duration)} | Trạng thái:{' '}
              {getStatusText(viewingLog.status)}
            </p>
          </div>
          <button
            onClick={onClose}
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
  )
}
