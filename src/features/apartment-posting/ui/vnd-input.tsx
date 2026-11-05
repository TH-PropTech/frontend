'use client'

import * as React from 'react'
import { Input } from '@/shared/ui/input'

const VND = new Intl.NumberFormat('vi-VN')
// 12 digits is far above any rent we accept and keeps the value a safe integer.
const MAX_DIGITS = 12

type VndInputProps = Omit<
  React.ComponentProps<typeof Input>,
  'value' | 'onChange' | 'type'
> & {
  valueVnd: number
  onValueChange: (vnd: number) => void
}

/** Whole-dong amount typed in full ("12.500.000"); digits only, grouped as the landlord types. */
export function VndInput({
  valueVnd,
  onValueChange,
  ...props
}: VndInputProps): React.ReactElement {
  return (
    <Input
      {...props}
      type="text"
      inputMode="numeric"
      autoComplete="off"
      value={valueVnd > 0 ? VND.format(valueVnd) : ''}
      onChange={e =>
        onValueChange(
          Number(e.target.value.replace(/\D/g, '').slice(0, MAX_DIGITS)) || 0
        )
      }
    />
  )
}
