'use client'

import * as React from 'react'
import { Skeleton } from '@/shared/ui/skeleton'
import type { GroqKeyItem, GroqKeyKind } from '../model/groq-keys.types'
import {
  formatAgo,
  formatCount,
  formatTimeLeft,
  getKeyKind,
} from '../lib/format'
import { GroqKeyDetail } from './groq-key-detail'

const KIND_DOT: Record<GroqKeyKind, string> = {
  ready: 'bg-success',
  rest: 'bg-warning',
  invalid: 'bg-danger',
  off: 'bg-muted',
}

const TAG_TONE = {
  primary: 'bg-primary-soft text-primary',
  warning: 'bg-warning-soft text-warning',
  danger: 'bg-danger-soft text-danger',
  muted: 'bg-surface-muted text-muted',
} as const

export function GroqKeyDot({
  kind,
  className = '',
}: {
  kind: GroqKeyKind
  className?: string
}): React.ReactElement {
  return (
    <span
      aria-hidden="true"
      className={`inline-block h-2.5 w-2.5 shrink-0 rounded-full ${KIND_DOT[kind]} ${className}`}
    />
  )
}

function Tag({
  tone,
  children,
}: {
  tone: keyof typeof TAG_TONE
  children: React.ReactNode
}): React.ReactElement {
  return (
    <span
      className={`rounded-md px-2 py-0.5 font-sans text-[11px] font-semibold ${TAG_TONE[tone]}`}
    >
      {children}
    </span>
  )
}

const ACTION_BUTTON =
  'rounded-lg px-2.5 py-1.5 text-xs font-semibold text-muted transition-colors hover:bg-surface-muted hover:text-fg disabled:opacity-50'

export interface GroqKeyListProps {
  keys: readonly GroqKeyItem[] | null
  currentId?: string | undefined
  now: number
  openId: string | null
  busy: boolean
  onToggle: (id: string) => void
  onRecheck: (id: string) => void
  onReset: (id: string) => void
  onToggleEnabled: (item: GroqKeyItem) => void
  onDelete: (item: GroqKeyItem) => void
}

export function GroqKeyList({
  keys,
  currentId,
  now,
  openId,
  busy,
  onToggle,
  onRecheck,
  onReset,
  onToggleEnabled,
  onDelete,
}: GroqKeyListProps): React.ReactElement {
  if (keys === null) {
    return (
      <div role="status" aria-busy="true" className="space-y-3 p-5">
        <p className="text-xs text-muted">Đang tải danh sách key...</p>
        {[0, 1, 2].map(index => (
          <Skeleton key={index} className="h-12 w-full" />
        ))}
      </div>
    )
  }

  if (keys.length === 0) {
    return (
      <div className="px-5 py-10 text-center">
        <p className="text-sm font-bold text-fg">Chưa có key nào</p>
        <p className="mt-1 text-xs text-muted">
          Dán key Groq ở trên để bắt đầu.
        </p>
      </div>
    )
  }

  return (
    <ul className="divide-y divide-border">
      {keys.map(item => {
        const kind = getKeyKind(item, now)
        const isOpen = openId === item._id
        const detailId = `groq-key-detail-${item._id}`
        const toggleLabel = item.status === 'disabled' ? 'Bật' : 'Tắt'
        return (
          <li key={item._id}>
            <div className="flex items-start gap-3 px-4 py-3">
              <GroqKeyDot kind={kind} className="mt-1.5" />
              <button
                type="button"
                aria-expanded={isOpen}
                aria-controls={detailId}
                onClick={() => onToggle(item._id)}
                className="min-w-0 flex-1 rounded-md text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-primary/40"
              >
                <span className="flex flex-wrap items-center gap-2 font-mono text-sm text-fg">
                  {item.key}
                  {item._id === currentId && (
                    <Tag tone="primary">Đang dùng</Tag>
                  )}
                  {kind === 'rest' && (
                    <Tag tone="warning">
                      Hết token · còn {formatTimeLeft(item.cooldownUntil, now)}
                    </Tag>
                  )}
                  {kind === 'invalid' && <Tag tone="danger">Key lỗi</Tag>}
                  {kind === 'off' && <Tag tone="muted">Đã tắt</Tag>}
                </span>
                <span
                  className="mt-1 block text-xs text-muted"
                  title={item.lastError}
                >
                  Cấp {formatCount(item.usageCount)} lần ·{' '}
                  {formatAgo(item.lastUsedAt, now)}
                  {item.check?.ok && ` · ${item.check.models.length} model`}
                  {item.check?.limits?.tokensRemaining !== undefined &&
                    ` · còn ${formatCount(item.check.limits.tokensRemaining)} token/phút`}
                </span>
              </button>
              <div className="flex shrink-0 items-center gap-1">
                {(kind === 'rest' || kind === 'invalid') && (
                  <button
                    type="button"
                    aria-label={`Dùng lại key ${item.key}`}
                    disabled={busy}
                    onClick={() => onReset(item._id)}
                    className={ACTION_BUTTON}
                  >
                    Dùng lại
                  </button>
                )}
                <button
                  type="button"
                  aria-label={`${toggleLabel} key ${item.key}`}
                  disabled={busy}
                  onClick={() => onToggleEnabled(item)}
                  className={ACTION_BUTTON}
                >
                  {toggleLabel}
                </button>
                <button
                  type="button"
                  aria-label={`Xoá key ${item.key}`}
                  disabled={busy}
                  onClick={() => onDelete(item)}
                  className={`${ACTION_BUTTON} hover:text-danger`}
                >
                  Xoá
                </button>
              </div>
            </div>
            {isOpen && (
              <GroqKeyDetail
                id={detailId}
                check={item.check}
                busy={busy}
                onRecheck={() => onRecheck(item._id)}
              />
            )}
          </li>
        )
      })}
    </ul>
  )
}
