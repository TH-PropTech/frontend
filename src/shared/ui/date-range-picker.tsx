'use client'

import * as React from 'react'
import { CalendarDays, X } from 'lucide-react'

export interface DateRange {
  from: Date | null
  to: Date | null
}

interface DateRangePickerProps {
  id: string
  label: string
  value: DateRange
  onChange: (range: DateRange) => void
  className?: string
}

function formatDate(date: Date | null): string {
  if (!date) return ''
  return date.toLocaleDateString('vi-VN', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
  })
}

function getDaysInMonth(year: number, month: number): number {
  return new Date(year, month + 1, 0).getDate()
}

function getFirstDayOfMonth(year: number, month: number): number {
  return new Date(year, month, 1).getDay()
}

const WEEKDAYS = ['CN', 'T2', 'T3', 'T4', 'T5', 'T6', 'T7']
const MONTHS_VI = [
  'Tháng 1',
  'Tháng 2',
  'Tháng 3',
  'Tháng 4',
  'Tháng 5',
  'Tháng 6',
  'Tháng 7',
  'Tháng 8',
  'Tháng 9',
  'Tháng 10',
  'Tháng 11',
  'Tháng 12',
]

interface MiniCalendarProps {
  year: number
  month: number
  selecting: 'from' | 'to'
  from: Date | null
  to: Date | null
  onSelect: (date: Date) => void
  onPrevMonth: () => void
  onNextMonth: () => void
}

function MiniCalendar({
  year,
  month,
  selecting,
  from,
  to,
  onSelect,
  onPrevMonth,
  onNextMonth,
}: MiniCalendarProps): React.ReactElement {
  const daysInMonth = getDaysInMonth(year, month)
  const firstDay = getFirstDayOfMonth(year, month)
  const cells: (number | null)[] = Array(firstDay).fill(null)
  for (let d = 1; d <= daysInMonth; d++) cells.push(d)

  const isSameDay = (a: Date | null, b: Date): boolean => {
    if (!a) return false
    return (
      a.getFullYear() === b.getFullYear() &&
      a.getMonth() === b.getMonth() &&
      a.getDate() === b.getDate()
    )
  }

  const isInRange = (d: number): boolean => {
    const date = new Date(year, month, d)
    if (!from || !to) return false
    return date > from && date < to
  }

  return (
    <div className="p-3 min-w-[220px]">
      <div className="flex items-center justify-between mb-2">
        <button
          type="button"
          onClick={onPrevMonth}
          className="p-1 rounded hover:bg-surface-muted transition-colors text-muted hover:text-fg"
        >
          <svg
            width="14"
            height="14"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.5"
          >
            <polyline points="15 18 9 12 15 6" />
          </svg>
        </button>
        <span className="text-xs font-bold text-fg">
          {MONTHS_VI[month]} {year}
        </span>
        <button
          type="button"
          onClick={onNextMonth}
          className="p-1 rounded hover:bg-surface-muted transition-colors text-muted hover:text-fg"
        >
          <svg
            width="14"
            height="14"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.5"
          >
            <polyline points="9 18 15 12 9 6" />
          </svg>
        </button>
      </div>

      <div className="grid grid-cols-7 gap-px mb-1">
        {WEEKDAYS.map(d => (
          <span
            key={d}
            className="text-[9px] font-bold text-muted text-center py-0.5"
          >
            {d}
          </span>
        ))}
      </div>

      <div className="grid grid-cols-7 gap-px">
        {cells.map((day, idx) => {
          if (!day) return <div key={idx} />
          const date = new Date(year, month, day)
          const isFrom = isSameDay(from, date)
          const isTo = isSameDay(to, date)
          const inRange = isInRange(day)
          const isActive = isFrom || isTo

          return (
            <button
              key={idx}
              type="button"
              onClick={() => onSelect(date)}
              className={`text-[11px] font-semibold h-7 w-7 rounded-lg mx-auto flex items-center justify-center transition-colors ${
                isActive
                  ? 'bg-primary text-on-control shadow-sm'
                  : inRange
                    ? 'bg-primary-soft text-primary'
                    : 'text-fg hover:bg-surface-muted'
              }`}
            >
              {day}
            </button>
          )
        })}
      </div>

      <p className="text-[10px] text-muted text-center mt-2">
        {selecting === 'from' ? 'Chọn ngày bắt đầu' : 'Chọn ngày kết thúc'}
      </p>
    </div>
  )
}

export function DateRangePicker({
  id,
  label,
  value,
  onChange,
  className = '',
}: DateRangePickerProps): React.ReactElement {
  const [open, setOpen] = React.useState(false)
  const [selecting, setSelecting] = React.useState<'from' | 'to'>('from')
  const [viewYear, setViewYear] = React.useState(new Date().getFullYear())
  const [viewMonth, setViewMonth] = React.useState(new Date().getMonth())
  const ref = React.useRef<HTMLDivElement>(null)

  React.useEffect(() => {
    const handler = (e: MouseEvent): void => {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false)
      }
    }
    if (open) document.addEventListener('mousedown', handler)
    return () => document.removeEventListener('mousedown', handler)
  }, [open])

  const handleSelect = (date: Date): void => {
    if (selecting === 'from') {
      onChange({ from: date, to: null })
      setSelecting('to')
    } else {
      if (value.from && date < value.from) {
        onChange({ from: date, to: value.from })
      } else {
        onChange({ from: value.from, to: date })
      }
      setOpen(false)
      setSelecting('from')
    }
  }

  const handleClear = (): void => {
    onChange({ from: null, to: null })
    setSelecting('from')
  }

  const handlePrevMonth = (): void => {
    if (viewMonth === 0) {
      setViewMonth(11)
      setViewYear(y => y - 1)
    } else {
      setViewMonth(m => m - 1)
    }
  }

  const handleNextMonth = (): void => {
    if (viewMonth === 11) {
      setViewMonth(0)
      setViewYear(y => y + 1)
    } else {
      setViewMonth(m => m + 1)
    }
  }

  const displayText =
    value.from || value.to
      ? `${formatDate(value.from)} → ${formatDate(value.to)}`
      : 'Chọn khoảng ngày...'

  return (
    <div ref={ref} className={`relative ${className}`}>
      <label
        htmlFor={id}
        className="block text-[10px] font-bold text-muted uppercase tracking-wider mb-1"
      >
        {label}
      </label>
      <div className="relative">
        <button
          id={id}
          type="button"
          onClick={() => setOpen(prev => !prev)}
          className="w-full flex items-center gap-2 px-3 py-2 text-xs font-semibold bg-surface border border-border rounded-lg hover:border-border-strong transition-colors shadow-sm min-w-[200px] text-left"
        >
          <CalendarDays className="h-3.5 w-3.5 text-muted shrink-0" />
          <span className={value.from ? 'text-fg' : 'text-muted'}>
            {displayText}
          </span>
        </button>
        {(value.from || value.to) && (
          <button
            type="button"
            onClick={e => {
              e.stopPropagation()
              handleClear()
            }}
            className="absolute right-2.5 top-1/2 -translate-y-1/2 p-0.5 rounded text-muted hover:text-fg transition-colors"
          >
            <X className="h-3 w-3" />
          </button>
        )}
      </div>

      {open && (
        <div className="absolute top-full mt-1 left-0 z-50 bg-surface border border-border rounded-xl shadow-lg animate-in fade-in slide-in-from-top-2 duration-150">
          <MiniCalendar
            year={viewYear}
            month={viewMonth}
            selecting={selecting}
            from={value.from}
            to={value.to}
            onSelect={handleSelect}
            onPrevMonth={handlePrevMonth}
            onNextMonth={handleNextMonth}
          />
        </div>
      )}
    </div>
  )
}
