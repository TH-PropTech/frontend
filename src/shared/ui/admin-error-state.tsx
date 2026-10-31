'use client'

import * as React from 'react'
import { AlertCircle, RotateCcw } from 'lucide-react'
import { Button } from '@/shared/ui/button'
import { cn } from '@/shared/lib/utils'

export interface AdminErrorStateProps {
  message?: string
  onRetry?: () => void
  className?: string
  title?: string
}

export function AdminErrorState({
  message = 'Không thể tải dữ liệu. Vui lòng thử lại.',
  onRetry,
  className,
  title = 'Đã có lỗi xảy ra',
}: AdminErrorStateProps): React.ReactElement {
  return (
    <div
      role="alert"
      className={cn(
        'flex flex-col items-center justify-center p-8 rounded-2xl border border-destructive/20 bg-destructive/5 text-center',
        className
      )}
    >
      <div className="h-10 w-10 rounded-full bg-destructive/10 text-destructive flex items-center justify-center mb-3">
        <AlertCircle className="h-5 w-5" />
      </div>
      <h3 className="text-sm font-bold text-fg mb-1">{title}</h3>
      <p className="text-xs text-muted max-w-md mb-4">{message}</p>
      {onRetry && (
        <Button
          type="button"
          variant="outline"
          size="sm"
          onClick={onRetry}
          className="gap-2 text-xs"
        >
          <RotateCcw className="h-3.5 w-3.5" />
          Thử lại
        </Button>
      )}
    </div>
  )
}
