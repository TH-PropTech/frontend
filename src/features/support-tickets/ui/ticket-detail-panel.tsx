'use client'

import React, { useEffect, useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/shared/ui/card'
import { Button } from '@/shared/ui/button'
import { Textarea } from '@/shared/ui/textarea'
import { TicketStatusBadge, TicketPriorityBadge } from './ticket-status-badge'
import { Send, Clock, CheckCircle2, User, Shield, Loader2 } from 'lucide-react'
import {
  getTicketDetail,
  addTicketMessage,
  closeSupportTicket,
  SupportTicketItem,
  TicketMessageItem,
} from '../api/support-ticket-api'
import { appToast } from '@/shared/ui/app-toast'

interface TicketDetailPanelProps {
  ticketId: string
  onClosePanel?: () => void
}

export const TicketDetailPanel: React.FC<TicketDetailPanelProps> = ({
  ticketId,
}) => {
  const [data, setData] = useState<{
    ticket: SupportTicketItem
    messages: TicketMessageItem[]
  } | null>(null)
  const [reply, setReply] = useState('')
  const [loading, setLoading] = useState(true)
  const [sending, setSending] = useState(false)

  useEffect(() => {
    let active = true
    getTicketDetail(ticketId)
      .then(res => {
        if (active) setData(res)
      })
      .catch((error: unknown) =>
        appToast.error(
          error instanceof Error
            ? error.message
            : 'Không thể tải chi tiết ticket'
        )
      )
      .finally(() => {
        if (active) setLoading(false)
      })
    return () => {
      active = false
    }
  }, [ticketId])

  const handleSendReply = async () => {
    if (!reply.trim()) return
    try {
      setSending(true)
      const newMsg = await addTicketMessage(ticketId, reply.trim())
      setData(prev =>
        prev
          ? {
              ...prev,
              messages: [...prev.messages, newMsg],
              ticket: { ...prev.ticket, status: 'waiting_staff' },
            }
          : null
      )
      setReply('')
      appToast.success('Đã gửi phản hồi')
    } catch (error: unknown) {
      appToast.error(
        error instanceof Error ? error.message : 'Không thể gửi phản hồi'
      )
    } finally {
      setSending(false)
    }
  }

  const handleCloseTicket = async () => {
    try {
      const updated = await closeSupportTicket(ticketId)
      setData(prev => (prev ? { ...prev, ticket: updated } : null))
      appToast.success('Đã đóng yêu cầu hỗ trợ')
    } catch (error: unknown) {
      appToast.error(
        error instanceof Error ? error.message : 'Không thể đóng yêu cầu hỗ trợ'
      )
    }
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center p-8 text-muted gap-2">
        <Loader2 className="w-5 h-5 animate-spin" />
        <span>Đang tải chi tiết ticket...</span>
      </div>
    )
  }

  if (!data) {
    return (
      <div className="p-4 text-center text-muted">
        Không thể tìm thấy chi tiết ticket.
      </div>
    )
  }

  const { ticket, messages } = data

  return (
    <Card className="shadow-sm">
      <CardHeader className="py-4 px-6 border-b border-border flex flex-row items-center justify-between">
        <div className="space-y-1">
          <CardTitle className="text-base font-bold text-fg">
            {ticket.subject}
          </CardTitle>
          <div className="flex items-center gap-2 text-xs text-muted">
            <span>Mã ticket: #{ticket._id}</span>
            <span>•</span>
            <span className="flex items-center gap-1">
              <Clock className="w-3.5 h-3.5" />
              SLA Hạn: {new Date(ticket.slaDeadline).toLocaleString('vi-VN')}
            </span>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <TicketPriorityBadge priority={ticket.priority} />
          <TicketStatusBadge status={ticket.status} />
          {ticket.status !== 'closed' && (
            <Button
              variant="outline"
              size="sm"
              className="text-xs border-border"
              onClick={handleCloseTicket}
            >
              Đóng ticket
            </Button>
          )}
        </div>
      </CardHeader>

      <CardContent className="p-6 space-y-6">
        {/* Messages Thread */}
        <div className="space-y-4 max-h-[400px] overflow-y-auto pr-2">
          {messages.map(msg => {
            const isStaff = ['staff', 'admin'].includes(msg.senderRole)

            return (
              <div
                key={msg._id}
                className={`flex gap-3 text-xs ${
                  isStaff ? 'flex-row-reverse' : 'flex-row'
                }`}
              >
                <div
                  className={`w-7 h-7 rounded-full flex items-center justify-center shrink-0 ${
                    isStaff
                      ? 'bg-primary-soft text-primary'
                      : 'bg-surface-muted text-fg'
                  }`}
                >
                  {isStaff ? (
                    <Shield className="w-4 h-4" />
                  ) : (
                    <User className="w-4 h-4" />
                  )}
                </div>

                <div
                  className={`p-3 rounded-lg max-w-[80%] space-y-1 ${
                    isStaff
                      ? 'bg-primary-soft text-fg border border-border'
                      : 'bg-surface-muted text-fg'
                  }`}
                >
                  <div className="flex items-center justify-between gap-4 text-[10px] text-subtle">
                    <span className="font-semibold text-fg">
                      {isStaff ? 'Đội ngũ Hỗ trợ (Staff)' : 'Bạn'}
                    </span>
                    <span>
                      {new Date(msg.createdAt).toLocaleTimeString('vi-VN', {
                        hour: '2-digit',
                        minute: '2-digit',
                      })}
                    </span>
                  </div>
                  <p className="text-sm whitespace-pre-wrap">{msg.content}</p>
                </div>
              </div>
            )
          })}
        </div>

        {/* Reply Form */}
        {ticket.status !== 'closed' ? (
          <div className="pt-4 border-t border-border space-y-3">
            <Textarea
              placeholder="Nhập nội dung phản hồi của bạn..."
              value={reply}
              onChange={e => setReply(e.target.value)}
              rows={3}
            />
            <div className="flex justify-end">
              <Button
                onClick={handleSendReply}
                disabled={sending || !reply.trim()}
                className="gap-2 bg-primary hover:bg-primary-hover text-surface"
              >
                {sending ? (
                  <Loader2 className="w-4 h-4 animate-spin" />
                ) : (
                  <Send className="w-4 h-4" />
                )}
                Gửi phản hồi
              </Button>
            </div>
          </div>
        ) : (
          <div className="p-3 bg-surface-muted text-center text-xs text-muted rounded-md border border-border">
            <CheckCircle2 className="w-4 h-4 mx-auto mb-1 text-subtle" />
            Yêu cầu hỗ trợ này đã hoàn tất và đóng lại.
          </div>
        )}
      </CardContent>
    </Card>
  )
}
