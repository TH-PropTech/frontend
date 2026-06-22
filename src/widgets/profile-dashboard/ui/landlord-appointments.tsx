'use client'

import * as React from 'react'
import { Card } from '@/shared/ui/card'
import { Button } from '@/shared/ui/button'
import { Badge } from '@/shared/ui/badge'
import { Calendar, Clock, User, Phone, Check, X } from 'lucide-react'
import { Appointment } from '../model/types'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from '@/shared/ui/dialog'
import { toast } from 'sonner'

interface LandlordAppointmentsProps {
  appointments: Appointment[]
  onApprove: (id: string) => void
  onReject: (id: string, reason: string) => void
}

export function LandlordAppointments({
  appointments,
  onApprove,
  onReject,
}: LandlordAppointmentsProps): React.ReactElement {
  const pendingApts = appointments.filter(a => a.status === 'pending')
  const [rejectingAptId, setRejectingAptId] = React.useState<string | null>(
    null
  )
  const [reason, setReason] = React.useState('')

  const handleConfirmReject = () => {
    if (!reason.trim()) {
      toast.error('Vui lòng nhập lý do từ chối!')
      return
    }
    if (rejectingAptId) {
      onReject(rejectingAptId, reason.trim())
      setRejectingAptId(null)
      setReason('')
    }
  }

  return (
    <Card className="bg-white border border-border rounded-3xl p-6 shadow-sm text-left space-y-5">
      <div className="flex items-center justify-between border-b border-border/50 pb-3">
        <div className="flex items-center gap-2">
          <Calendar className="h-4.5 w-4.5 text-primary" />
          <h4 className="font-marketing text-sm font-bold text-fg">
            Lịch hẹn xem nhà chờ xác nhận
          </h4>
        </div>
        <Badge
          variant="outline"
          className="text-[10px] font-bold bg-primary-soft text-primary border-primary/15"
        >
          {pendingApts.length} yêu cầu mới
        </Badge>
      </div>

      {pendingApts.length === 0 ? (
        <p className="text-xs text-muted py-2 text-center font-medium">
          Không có lịch hẹn nào đang chờ duyệt.
        </p>
      ) : (
        <div className="space-y-4">
          {pendingApts.map(apt => (
            <div
              key={apt.id}
              className="border border-border/60 rounded-2xl p-4 bg-surface/30 flex flex-col md:flex-row md:items-center justify-between gap-4 text-xs"
            >
              <div className="space-y-2">
                <div className="font-bold text-fg font-display">
                  {apt.propertyName}
                </div>
                <div className="grid grid-cols-2 gap-x-6 gap-y-1.5 text-muted">
                  <div className="flex items-center gap-1.5">
                    <User className="h-3.5 w-3.5 text-subtle" />
                    <span>
                      Khách:{' '}
                      <strong className="text-fg">{apt.guestName}</strong>
                    </span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <Phone className="h-3.5 w-3.5 text-subtle" />
                    <span>
                      SĐT: <strong className="text-fg">{apt.phone}</strong>
                    </span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <Calendar className="h-3.5 w-3.5 text-subtle" />
                    <span>
                      Ngày: <strong className="text-fg">{apt.date}</strong>
                    </span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <Clock className="h-3.5 w-3.5 text-subtle" />
                    <span>
                      Giờ: <strong className="text-fg">{apt.time}</strong>
                    </span>
                  </div>
                </div>
              </div>

              <div className="flex gap-2 self-start md:self-auto shrink-0">
                <Button
                  onClick={() => onApprove(apt.id)}
                  className="bg-primary hover:bg-primary-hover text-white text-[10px] font-bold rounded-full h-8 px-4 flex items-center gap-1 cursor-pointer"
                >
                  <Check className="h-3 w-3" />
                  Xác nhận
                </Button>
                <Button
                  onClick={() => setRejectingAptId(apt.id)}
                  variant="outline"
                  className="border border-border hover:bg-surface-muted text-fg text-[10px] font-bold rounded-full h-8 px-4 flex items-center gap-1 cursor-pointer"
                >
                  <X className="h-3 w-3" />
                  Từ chối
                </Button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Reject Reason Dialog */}
      <Dialog
        open={!!rejectingAptId}
        onOpenChange={open => {
          if (!open) {
            setRejectingAptId(null)
            setReason('')
          }
        }}
      >
        <DialogContent className="bg-white rounded-3xl max-w-md p-6 border border-border shadow-lg text-left">
          <DialogHeader>
            <DialogTitle className="font-marketing text-lg font-bold text-fg">
              Từ chối lịch hẹn
            </DialogTitle>
            <DialogDescription className="text-xs text-muted font-body">
              Vui lòng nhập lý do từ chối lịch hẹn xem phòng này. Lý do sẽ được
              gửi đến khách thuê.
            </DialogDescription>
          </DialogHeader>
          <div className="py-2">
            <textarea
              value={reason}
              onChange={e => setReason(e.target.value)}
              placeholder="Ví dụ: Tôi bận việc đột xuất vào giờ này / Phòng hiện không sẵn sàng..."
              className="w-full min-h-24 p-3 border border-border rounded-xl text-xs focus:outline-none focus:ring-1 focus:ring-primary font-body text-fg bg-white"
            />
          </div>
          <DialogFooter className="flex justify-end gap-2 mt-2">
            <Button
              variant="outline"
              onClick={() => {
                setRejectingAptId(null)
                setReason('')
              }}
              className="border border-border hover:bg-surface-muted text-xs rounded-xl h-9 px-4 cursor-pointer"
            >
              Hủy bỏ
            </Button>
            <Button
              onClick={handleConfirmReject}
              className="bg-primary hover:bg-primary-hover text-white text-xs rounded-xl h-9 px-4 cursor-pointer font-bold"
            >
              Xác nhận từ chối
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </Card>
  )
}
