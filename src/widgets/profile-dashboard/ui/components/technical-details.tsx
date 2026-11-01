'use client'

import * as React from 'react'
import { Copy } from 'lucide-react'
import { toast } from 'sonner'

interface TechnicalDetailsProps {
  label?: string
  value: string
  className?: string
}

/**
 * Hiển thị mã kỹ thuật (mã băm, mã hợp đồng, mã giao dịch) trong khối details
 * đóng mặc định kèm nút sao chép. Bảng chính chỉ hiện chuỗi rút gọn.
 */
export function TechnicalDetails({
  label = 'Chi tiết kỹ thuật',
  value,
  className = '',
}: TechnicalDetailsProps): React.ReactElement {
  const handleCopy = (e: React.MouseEvent) => {
    e.stopPropagation()
    navigator.clipboard.writeText(value)
    toast.success('Đã sao chép mã kỹ thuật vào bộ nhớ tạm')
  }

  const truncated = value.length > 8 ? `${value.slice(0, 8)}…` : value

  return (
    <div className={`space-y-1 ${className}`}>
      <span className="font-mono text-xs text-primary" title={value}>
        {truncated}
      </span>
      <details className="text-left group text-[11px] text-muted">
        <summary className="cursor-pointer select-none text-muted hover:text-fg transition-colors flex items-center gap-1">
          <span>{label}</span>
          <span className="text-[9px] group-open:rotate-180 transition-transform">
            ▾
          </span>
        </summary>
        <div className="mt-1.5 p-2 rounded-lg bg-surface-muted/40 border border-border/60 flex items-center justify-between gap-2">
          <span className="font-mono text-[10px] text-fg break-all select-all">
            {value}
          </span>
          <button
            type="button"
            onClick={handleCopy}
            className="p-1 text-muted hover:text-primary transition-colors shrink-0"
            title="Sao chép toàn bộ mã"
            aria-label="Sao chép toàn bộ mã"
          >
            <Copy className="h-3 w-3" />
          </button>
        </div>
      </details>
    </div>
  )
}
