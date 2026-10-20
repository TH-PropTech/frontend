'use client'

import * as React from 'react'
import { AdminCard } from '@/shared/ui/admin-card'

export interface BarChartDataPoint {
  label: string
  pending: number
  confirmed: number
  cancelled: number
}

interface BookingBarChartProps {
  data: BarChartDataPoint[]
  title?: string
}

export function BookingBarChart({
  data,
  title = 'Lịch hẹn theo ngày',
}: BookingBarChartProps): React.ReactElement {
  const [hovered, setHovered] = React.useState<number | null>(null)

  const maxVal = Math.max(
    ...data.flatMap(d => [d.pending + d.confirmed + d.cancelled]),
    1
  )

  return (
    <AdminCard className="p-5 sm:p-6 flex flex-col justify-between h-full">
      <div className="flex items-center justify-between mb-1">
        <h4 className="text-xs font-bold text-fg font-body uppercase tracking-wider">
          {title}
        </h4>
        <div className="flex items-center gap-3 text-xs font-semibold">
          <span className="flex items-center gap-1.5">
            <span
              className="inline-block w-2.5 h-2.5 rounded-sm"
              style={{ background: 'var(--warning)' }}
            />
            <span className="text-muted">Chờ</span>
          </span>
          <span className="flex items-center gap-1.5">
            <span
              className="inline-block w-2.5 h-2.5 rounded-sm"
              style={{ background: 'var(--success)' }}
            />
            <span className="text-muted">Xác nhận</span>
          </span>
          <span className="flex items-center gap-1.5">
            <span
              className="inline-block w-2.5 h-2.5 rounded-sm"
              style={{ background: 'var(--danger)' }}
            />
            <span className="text-muted">Huỷ</span>
          </span>
        </div>
      </div>
      <p className="text-[11px] text-muted mb-4 font-body">
        Phân bổ lịch hẹn xem nhà theo từng ngày và trạng thái.
      </p>

      {data.length === 0 ? (
        <div className="flex-1 min-h-[180px] flex items-center justify-center">
          <p className="text-xs text-muted font-body">Không có dữ liệu</p>
        </div>
      ) : (
        <div className="flex-1 flex items-end gap-2 sm:gap-4 pt-4 min-h-[180px]">
          {data.map((d, i) => {
            const total = d.pending + d.confirmed + d.cancelled
            const pendingH = maxVal > 0 ? (d.pending / maxVal) * 150 : 0
            const confirmedH = maxVal > 0 ? (d.confirmed / maxVal) * 150 : 0
            const cancelledH = maxVal > 0 ? (d.cancelled / maxVal) * 150 : 0

            return (
              <div
                key={d.label}
                className="flex-1 flex flex-col items-center gap-1.5 cursor-pointer group relative"
                onMouseEnter={() => setHovered(i)}
                onMouseLeave={() => setHovered(null)}
              >
                {hovered === i && (
                  <div className="absolute -top-9 z-10 bg-fg text-on-control text-[10px] font-bold px-2.5 py-1 rounded-md shadow-md whitespace-nowrap animate-in fade-in duration-100 font-body">
                    {total} lịch hẹn
                  </div>
                )}
                <div
                  className="w-full flex flex-col-reverse items-center gap-px max-w-[48px]"
                  style={{ height: 150 }}
                >
                  {d.cancelled > 0 && (
                    <div
                      className="w-full rounded-t-sm transition-all duration-300 group-hover:opacity-90"
                      style={{
                        height: cancelledH,
                        background: 'var(--danger)',
                        opacity: hovered !== null && hovered !== i ? 0.4 : 1,
                      }}
                    />
                  )}
                  {d.confirmed > 0 && (
                    <div
                      className="w-full transition-all duration-300 group-hover:opacity-90"
                      style={{
                        height: confirmedH,
                        background: 'var(--success)',
                        opacity: hovered !== null && hovered !== i ? 0.4 : 1,
                      }}
                    />
                  )}
                  {d.pending > 0 && (
                    <div
                      className="w-full rounded-t-sm transition-all duration-300 group-hover:opacity-90"
                      style={{
                        height: pendingH,
                        background: 'var(--warning)',
                        opacity: hovered !== null && hovered !== i ? 0.4 : 1,
                      }}
                    />
                  )}
                </div>
                <span
                  className={`text-[11px] font-semibold font-body transition-colors ${hovered === i ? 'text-primary font-bold' : 'text-muted'}`}
                >
                  {d.label}
                </span>
              </div>
            )
          })}
        </div>
      )}
    </AdminCard>
  )
}
