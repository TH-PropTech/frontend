'use client'

import * as React from 'react'
import { CalendarDays, X } from 'lucide-react'
import { format, isValid, parseISO, startOfMonth } from 'date-fns'
import { vi } from 'date-fns/locale'

import { cn } from '@/shared/lib/utils'
import { Button } from '@/shared/ui/button'
import { Calendar } from '@/shared/ui/calendar'
import { OptionSelect, type SelectOption } from '@/shared/ui/option-select'
import { Popover, PopoverContent, PopoverTrigger } from '@/shared/ui/popover'

interface DatePickerProps {
  id?: string
  label?: string
  /** Chuỗi ISO `yyyy-MM-dd`; '' = chưa chọn. */
  value: string
  onChange: (value: string) => void
  placeholder?: string
  disabled?: boolean
  clearable?: boolean
  className?: string
  /** Ngày sớm nhất được chọn; mặc định chỉ giới hạn danh sách năm từ 1990. */
  minDate?: Date
  /** Ngày muộn nhất được chọn; mặc định chỉ giới hạn danh sách năm đến 2050. */
  maxDate?: Date
}

/**
 * Chọn ngày dùng chung thay cho `<input type="date">` native.
 * Giá trị trao đổi là chuỗi `yyyy-MM-dd` để thay thế trực tiếp input cũ.
 */
export function DatePicker({
  id,
  label,
  value,
  onChange,
  placeholder = 'Chọn ngày',
  disabled,
  clearable = true,
  className,
  minDate,
  maxDate,
}: DatePickerProps): React.ReactElement {
  const inputId =
    id ?? (label ? label.toLowerCase().replace(/\s+/g, '-') : undefined)
  const [open, setOpen] = React.useState(false)
  const parsed = value ? parseISO(value) : undefined
  const selected = parsed && isValid(parsed) ? parsed : undefined

  const field = (
    <div className={cn('flex gap-2', className)}>
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button
            {...(inputId ? { id: inputId } : {})}
            type="button"
            variant="outline"
            {...(disabled !== undefined ? { disabled } : {})}
            className="h-9 flex-1 justify-start rounded-lg border-border bg-surface px-3 text-sm font-normal"
          >
            <CalendarDays
              aria-hidden="true"
              className="mr-2 h-3.5 w-3.5 text-primary"
            />
            <span className={selected ? 'text-fg' : 'text-subtle'}>
              {selected ? format(selected, 'dd/MM/yyyy') : placeholder}
            </span>
          </Button>
        </PopoverTrigger>
        <PopoverContent
          align="start"
          className="w-auto rounded-2xl border border-border bg-surface p-0 shadow-xl"
        >
          <Calendar
            mode="single"
            locale={vi}
            captionLayout="dropdown"
            startMonth={minDate ? startOfMonth(minDate) : new Date(1990, 0)}
            endMonth={maxDate ? startOfMonth(maxDate) : new Date(2050, 11)}
            {...(minDate || maxDate
              ? {
                  disabled: [
                    ...(minDate ? [{ before: minDate }] : []),
                    ...(maxDate ? [{ after: maxDate }] : []),
                  ],
                }
              : {})}
            {...(selected
              ? { defaultMonth: selected }
              : maxDate
                ? { defaultMonth: maxDate }
                : {})}
            selected={selected}
            onSelect={date => {
              onChange(date ? format(date, 'yyyy-MM-dd') : '')
              setOpen(false)
            }}
          />
        </PopoverContent>
      </Popover>
      {clearable && selected && !disabled && (
        <Button
          type="button"
          variant="ghost"
          size="icon"
          aria-label="Xoá ngày"
          onClick={() => onChange('')}
          className="h-9 w-9"
        >
          <X className="h-3.5 w-3.5" />
        </Button>
      )}
    </div>
  )

  if (!label) return field
  return (
    <div className="flex flex-col gap-1">
      <label
        htmlFor={inputId}
        className="text-xs font-medium text-fg sm:text-sm"
      >
        {label}
      </label>
      {field}
    </div>
  )
}

const HOUR_OPTIONS: SelectOption[] = Array.from({ length: 24 }, (_, i) => {
  const text = String(i).padStart(2, '0')
  return { value: text, label: text }
})
const MINUTE_OPTIONS: SelectOption[] = Array.from({ length: 60 }, (_, i) => {
  const text = String(i).padStart(2, '0')
  return { value: text, label: text }
})

interface DateTimePickerProps {
  id?: string
  label?: string
  /** Chuỗi `yyyy-MM-ddTHH:mm` (định dạng của `datetime-local`); '' = chưa chọn. */
  value: string
  onChange: (value: string) => void
  placeholder?: string
  disabled?: boolean
  className?: string
}

/** Chọn ngày + giờ dùng chung thay cho `<input type="datetime-local">`. */
export function DateTimePicker({
  id,
  label,
  value,
  onChange,
  placeholder,
  disabled,
  className,
}: DateTimePickerProps): React.ReactElement {
  const [datePart = '', timePart = ''] = value.split('T')
  const [hour = '00', minute = '00'] = (timePart || '00:00').split(':')

  const emit = (date: string, h: string, m: string): void =>
    onChange(date ? `${date}T${h}:${m}` : '')

  const field = (
    <div className={cn('flex flex-wrap items-center gap-2', className)}>
      <DatePicker
        {...(id ? { id } : {})}
        value={datePart}
        onChange={date => emit(date, hour, minute)}
        {...(placeholder ? { placeholder } : {})}
        {...(disabled !== undefined ? { disabled } : {})}
        clearable
        className="min-w-[160px] flex-1"
      />
      <OptionSelect
        aria-label="Giờ"
        value={hour}
        onChange={h => emit(datePart, h, minute)}
        options={HOUR_OPTIONS}
        {...(disabled !== undefined || !datePart
          ? { disabled: disabled || !datePart }
          : {})}
        className="w-[72px]"
      />
      <span aria-hidden="true" className="text-muted">
        :
      </span>
      <OptionSelect
        aria-label="Phút"
        value={minute}
        onChange={m => emit(datePart, hour, m)}
        options={MINUTE_OPTIONS}
        {...(disabled !== undefined || !datePart
          ? { disabled: disabled || !datePart }
          : {})}
        className="w-[72px]"
      />
    </div>
  )

  if (!label) return field
  return (
    <div className="flex flex-col gap-1">
      <span className="text-xs font-medium text-fg sm:text-sm">{label}</span>
      {field}
    </div>
  )
}
