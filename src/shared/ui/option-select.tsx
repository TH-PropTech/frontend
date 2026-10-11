'use client'

import * as React from 'react'

import { cn } from '@/shared/lib/utils'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/shared/ui/select'

export interface SelectOption {
  value: string
  label: string
  disabled?: boolean
}

// Radix Select không cho phép item có value rỗng nên dùng sentinel nội bộ.
const ALL_VALUE = '__all__'

interface OptionSelectProps {
  id?: string
  /** Nhãn hiển thị phía trên (cùng kiểu với `Input`). */
  label?: string
  value: string
  onChange: (value: string) => void
  options: readonly SelectOption[]
  placeholder?: string
  /** Thêm mục "tất cả" ứng với giá trị rỗng ('') — dùng cho bộ lọc. */
  allLabel?: string
  disabled?: boolean
  className?: string
  'aria-label'?: string
  'data-testid'?: string
}

/**
 * Dropdown dùng chung thay cho `<select>` native: nhận mảng option phẳng.
 */
export function OptionSelect({
  id,
  label,
  value,
  onChange,
  options,
  placeholder = 'Chọn...',
  allLabel,
  disabled,
  className,
  'aria-label': ariaLabel,
  'data-testid': testId,
}: OptionSelectProps): React.ReactElement {
  const inputId =
    id ?? (label ? label.toLowerCase().replace(/\s+/g, '-') : undefined)
  const current = value === '' && allLabel ? ALL_VALUE : value
  const hasValue =
    current === ALL_VALUE || options.some(option => option.value === value)

  const select = (
    <Select
      value={hasValue ? current : ''}
      onValueChange={next => onChange(next === ALL_VALUE ? '' : next)}
      {...(disabled !== undefined ? { disabled } : {})}
    >
      <SelectTrigger
        {...(inputId ? { id: inputId } : {})}
        {...(ariaLabel ? { 'aria-label': ariaLabel } : {})}
        {...(testId ? { 'data-testid': testId } : {})}
        className={cn(
          'h-9 rounded-lg border-border bg-surface px-3 text-sm text-fg',
          className
        )}
      >
        <SelectValue placeholder={placeholder} />
      </SelectTrigger>
      <SelectContent className="max-h-64">
        {allLabel ? (
          <SelectItem value={ALL_VALUE}>{allLabel}</SelectItem>
        ) : null}
        {options.map(option => (
          <SelectItem
            key={option.value}
            value={option.value}
            {...(option.disabled ? { disabled: true } : {})}
          >
            {option.label}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  )

  if (!label) return select
  return (
    <div className="flex flex-col gap-1">
      <label
        htmlFor={inputId}
        className="text-xs font-medium text-fg sm:text-sm"
      >
        {label}
      </label>
      {select}
    </div>
  )
}
