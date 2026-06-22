'use client'

import * as React from 'react'
import { Card } from '@/shared/ui/card'
import { Button } from '@/shared/ui/button'
import { Badge } from '@/shared/ui/badge'
import { Calendar, Clock, User, Phone, X, Info } from 'lucide-react'
import { Appointment } from '../model/types'

interface TenantAppointmentsProps {
  appointments: Appointment[]
  onCancel: (id: string) => void
}

export function TenantAppointments({
  appointments,
  onCancel,
}: TenantAppointmentsProps): React.ReactElement {
  return (
    <Card className="bg-white border border-border rounded-3xl p-6 shadow-sm text-left space-y-5">
      <div className="flex items-center justify-between border-b border-border/50 pb-3">
        <div className="flex items-center gap-2">
          <Calendar className="h-4.5 w-4.5 text-primary" />
          <h4 className="font-marketing text-sm font-bold text-fg">
            Lịch hẹn xem nhà của bạn
          </h4>
        </div>
        <Badge
          variant="outline"
          className="text-[10px] font-bold bg-primary-soft text-primary border-primary/15"
        >
          {appointments.length} lịch hẹn
        </Badge>
      </div>

      {appointments.length === 0 ? (
        <p className="text-xs text-muted py-2 text-center font-medium">
          Bạn chưa đăng ký lịch hẹn xem nhà nào.
        </p>
      ) : (
        <div className="space-y-4">
          {appointments.map(apt => (
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
                      Người đặt:{' '}
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
                {apt.status === 'rejected' && (
                  <div className="flex items-start gap-1 text-[10px] text-danger bg-danger-soft/10 p-1.5 rounded-lg border border-danger/10 mt-1">
                    <Info className="h-3 w-3 mt-0.5 shrink-0" />
                    <span>Bị từ chối.</span>
                  </div>
                )}
              </div>

              <div className="flex items-center gap-3 self-start md:self-auto shrink-0">
                <span
                  className={`text-[10px] font-bold px-3 py-1 rounded-full ${
                    apt.status === 'confirmed'
                      ? 'bg-success-soft text-success border border-success/15'
                      : apt.status === 'pending'
                        ? 'bg-warning-soft text-warning border border-warning/15'
                        : apt.status === 'rejected'
                          ? 'bg-danger-soft text-danger border border-danger/15'
                          : 'bg-surface-muted text-muted border border-border'
                  }`}
                >
                  {apt.status === 'confirmed' && 'Đã duyệt'}
                  {apt.status === 'pending' && 'Chờ duyệt'}
                  {apt.status === 'rejected' && 'Bị từ chối'}
                  {apt.status === 'cancelled' && 'Đã hủy'}
                  {apt.status === 'completed' && 'Hoàn thành'}
                </span>

                {(apt.status === 'pending' || apt.status === 'confirmed') && (
                  <Button
                    onClick={() => onCancel(apt.id)}
                    variant="outline"
                    className="border border-danger/25 hover:bg-danger-soft/10 text-danger text-[10px] font-bold rounded-full h-8 px-4 flex items-center gap-1 cursor-pointer transition-all"
                  >
                    <X className="h-3 w-3" />
                    Hủy lịch
                  </Button>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </Card>
  )
}
