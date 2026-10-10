'use client'

import * as React from 'react'
import type { GroqKeyCheckRow } from '../model/groq-keys.types'
import { formatCount, maskKey } from '../lib/format'
import { GroqKeyDot } from './groq-key-list'

export interface GroqCheckResultsProps {
  rows: readonly GroqKeyCheckRow[]
  totalTyped: number
  savable: number
  busy: boolean
  onSave: () => void
}

function describeRow(row: GroqKeyCheckRow): string {
  const { res } = row
  if (!res.ok) return res.error ?? 'Key không hợp lệ'
  const remaining = res.limits?.tokensRemaining
  const parts = [`${res.models.length} model hoạt động`]
  if (remaining !== undefined) {
    parts.push(`còn ${formatCount(remaining)} token/phút`)
  }
  if (res.limited) parts.push('đang chạm hạn mức')
  return parts.join(' · ')
}

export function GroqCheckResults({
  rows,
  totalTyped,
  savable,
  busy,
  onSave,
}: GroqCheckResultsProps): React.ReactElement {
  return (
    <div className="space-y-2">
      <ul className="space-y-2" aria-label="Kết quả kiểm tra key">
        {rows.map(row => (
          <li
            key={row.key}
            className="flex items-start gap-3 rounded-lg border border-border bg-surface-muted/50 px-3 py-2.5"
          >
            <GroqKeyDot
              kind={
                row.res.ok ? (row.res.limited ? 'rest' : 'ready') : 'invalid'
              }
              className="mt-1.5"
            />
            <div className="min-w-0">
              <p className="font-mono text-sm text-fg">{maskKey(row.key)}</p>
              <p className="text-xs text-muted">{describeRow(row)}</p>
            </div>
          </li>
        ))}
      </ul>
      {totalTyped > rows.length && (
        <p className="text-xs text-muted">
          Chỉ kiểm tra {rows.length} key đầu mỗi lần.
        </p>
      )}
      <div className="flex justify-end pt-1">
        <button
          type="button"
          disabled={!savable || busy}
          onClick={onSave}
          className="rounded-lg bg-primary px-4 py-2 text-xs font-semibold text-on-control transition-colors hover:bg-primary-hover disabled:opacity-50"
        >
          {savable ? `Lưu ${savable} key hợp lệ` : 'Không có key hợp lệ'}
        </button>
      </div>
    </div>
  )
}
