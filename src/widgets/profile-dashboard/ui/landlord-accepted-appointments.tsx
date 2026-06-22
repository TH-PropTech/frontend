'use client'

import * as React from 'react'
import { Card } from '@/shared/ui/card'
import { Button } from '@/shared/ui/button'
import { Badge } from '@/shared/ui/badge'
import { Calendar, Clock, User, Phone, CheckCircle2 } from 'lucide-react'
import { Appointment } from '../model/types'

interface LandlordAcceptedAppointmentsProps {
  appointments: Appointment[]
  onComplete: (id: string) => void
}

export function LandlordAcceptedAppointments({
  appointments,
  onComplete,
}: LandlordAcceptedAppointmentsProps): React.ReactElement {
  const confirmedApts = appointments.filter(a => a.status === 'confirmed')

  // Group appointments by date and sort chronologically
  const grouped = React.useMemo(() => {
    const map: Record<string, Appointment[]> = {}
    confirmedApts.forEach(apt => {
      const dateKey = apt.date || 'Chưa xác định ngày'
      if (!map[dateKey]) map[dateKey] = []
      map[dateKey].push(apt)
    })

    return Object.entries(map).sort((a, b) => {
      const parseDate = (dStr: string) => {
        const parts = dStr.split('/')
        if (parts.length === 3) {
          return new Date(
            Number(parts[2]),
            Number(parts[1]) - 1,
            Number(parts[0])
          ).getTime()
        }
        return 0
      }
      return parseDate(a[0]) - parseDate(b[0])
    })
  }, [confirmedApts])

  return (
    <Card className="bg-white border border-border rounded-3xl p-6 shadow-sm text-left space-y-5">
      <div className="flex items-center justify-between border-b border-border/50 pb-3">
        <div className="flex items-center gap-2">
          <CheckCircle2 className="h-4.5 w-4.5 text-success" />
          <h4 className="font-marketing text-sm font-bold text-fg">
            Lịch hẹn xem nhà đã xác nhận
          </h4>
        </div>
        <Badge
          variant="outline"
          className="text-[10px] font-bold bg-success-soft/25 text-success border-success/15"
        >
          {confirmedApts.length} lịch hẹn
        </Badge>
      </div>

      {confirmedApts.length === 0 ? (
        <p className="text-xs text-muted py-2 text-center font-medium">
          Chưa có lịch hẹn nào được xác nhận.
        </p>
      ) : (
        <div className="space-y-6">
          {grouped.map(([date, apts]) => (
            <div key={date} className="space-y-3">
              <div className="flex items-center gap-2">
                <span className="h-1.5 w-1.5 rounded-full bg-primary" />
                <span className="text-xs font-bold text-fg uppercase tracking-wider font-display">
                  {date}
                </span>
              </div>
              <div className="space-y-3 pl-3.5 border-l border-border/60">
                {apts.map(apt => (
                  <div
                    key={apt.id}
                    className="border border-border/50 rounded-2xl p-4 bg-primary-soft/5 flex flex-col md:flex-row md:items-center justify-between gap-4 text-xs hover:border-primary/20 transition-all"
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
                            SĐT:{' '}
                            <strong className="text-fg">{apt.phone}</strong>
                          </span>
                        </div>
                        <div className="flex items-center gap-1.5">
                          <Calendar className="h-3.5 w-3.5 text-subtle" />
                          <span>
                            Ngày:{' '}
                            <strong className="text-fg">{apt.date}</strong>
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
                      <a
                        href={`tel:${apt.phone}`}
                        className="border border-border hover:bg-surface-muted text-fg text-[10px] font-bold rounded-full h-8 px-4 flex items-center justify-center gap-1.5 cursor-pointer decoration-none text-inherit"
                      >
                        <Phone className="h-3 w-3" />
                        Gọi điện
                      </a>
                      <Button
                        onClick={() => onComplete(apt.id)}
                        className="bg-success hover:bg-success-hover text-white text-[10px] font-bold rounded-full h-8 px-4 flex items-center gap-1 cursor-pointer"
                      >
                        Đã xem phòng
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}
    </Card>
  )
}
