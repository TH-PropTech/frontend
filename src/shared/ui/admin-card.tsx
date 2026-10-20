import * as React from 'react'

import { cn } from '@/shared/lib/utils'

/**
 * Khung card dùng chung cho toàn bộ màn hình admin.
 * Đổi bo góc / viền / nền / bóng ở đây là áp dụng cho mọi trang admin.
 * Padding và layout truyền qua className.
 */
const AdminCard = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn(
      'rounded-md border border-border bg-surface shadow-sm',
      className
    )}
    {...props}
  />
))
AdminCard.displayName = 'AdminCard'

export { AdminCard }
