'use client'

import { useState, type ReactElement } from 'react'
import { Check, Copy } from 'lucide-react'

export interface TechnicalDetailItem {
  label: string
  value: string
}

export interface ContractTechnicalDetailsProps {
  items: readonly TechnicalDetailItem[]
}

/** Khối "Chi tiết kỹ thuật": đóng sẵn, mã nội bộ chỉ hiện ở đây kèm nút sao chép. */
export function ContractTechnicalDetails({
  items,
}: ContractTechnicalDetailsProps): ReactElement | null {
  const [copiedLabel, setCopiedLabel] = useState<string | null>(null)
  if (items.length === 0) return null

  const copy = async (item: TechnicalDetailItem): Promise<void> => {
    try {
      await navigator.clipboard.writeText(item.value)
      setCopiedLabel(item.label)
      window.setTimeout(() => setCopiedLabel(null), 1500)
    } catch (error) {
      console.warn('Không thể sao chép vào bộ nhớ tạm', error)
    }
  }

  return (
    <details
      data-testid="contract-meta-technical-details"
      className="rounded-md border border-[var(--border)] bg-[var(--surface)] text-xs"
    >
      <summary className="min-h-11 cursor-pointer select-none px-3 py-3 font-semibold text-[var(--muted)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--primary)]">
        Chi tiết kỹ thuật
      </summary>
      <dl className="space-y-2 border-t border-[var(--border)] px-3 py-3">
        {items.map(item => (
          <div
            key={item.label}
            className="flex flex-wrap items-center justify-between gap-2"
          >
            <dt className="text-[var(--muted)]">{item.label}</dt>
            <dd className="flex min-w-0 items-center gap-1.5">
              <span className="min-w-0 break-all font-mono text-[11px] font-semibold text-[var(--fg)]">
                {item.value}
              </span>
              <button
                type="button"
                onClick={() => void copy(item)}
                aria-label={`Sao chép ${item.label}`}
                className="inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-md text-[var(--muted)] hover:text-[var(--primary)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-[var(--primary)]"
              >
                {copiedLabel === item.label ? (
                  <Check className="h-3.5 w-3.5" aria-hidden="true" />
                ) : (
                  <Copy className="h-3.5 w-3.5" aria-hidden="true" />
                )}
              </button>
            </dd>
          </div>
        ))}
      </dl>
    </details>
  )
}
