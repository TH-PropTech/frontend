import * as React from 'react'
import type { GroqKeyCheck } from '../model/groq-keys.types'
import { formatAgo, formatCount } from '../lib/format'
import { GroqKeyMeter } from './groq-key-meter'

export interface GroqKeyDetailProps {
  id: string
  check?: GroqKeyCheck | undefined
  busy: boolean
  onRecheck: () => void
}

export function GroqKeyDetail({
  id,
  check,
  busy,
  onRecheck,
}: GroqKeyDetailProps): React.ReactElement {
  return (
    <div id={id} className="space-y-3 border-t border-border px-4 py-3">
      {!check ? (
        <p className="text-xs text-muted">Chưa kiểm tra key này.</p>
      ) : !check.ok ? (
        <p className="text-xs text-danger">{check.error}</p>
      ) : (
        <>
          {check.limited && (
            <p className="text-xs text-danger">
              Key đang chạm hạn mức: {check.message}
            </p>
          )}
          <GroqKeyMeter
            label="Token / phút còn lại"
            remaining={check.limits?.tokensRemaining}
            limit={check.limits?.tokensLimit}
            resetIn={check.limits?.tokensReset}
          />
          <GroqKeyMeter
            label="Request / ngày còn lại"
            remaining={check.limits?.requestsRemaining}
            limit={check.limits?.requestsLimit}
            resetIn={check.limits?.requestsReset}
          />
          <p className="text-xs font-semibold text-fg">
            {check.models.length} model đang hoạt động
          </p>
          <ul className="flex flex-wrap gap-1.5">
            {check.models.map(model => (
              <li
                key={model.id}
                title={`${model.owner} · ${formatCount(model.ctx)} ctx`}
                className="rounded-md bg-surface-muted px-2 py-0.5 font-mono text-[11px] text-fg"
              >
                {model.id}
              </li>
            ))}
          </ul>
        </>
      )}
      <div className="flex items-center justify-between gap-3">
        <span className="text-xs text-muted">
          {check ? `Kiểm tra ${formatAgo(check.at)}` : ''}
        </span>
        <button
          type="button"
          disabled={busy}
          onClick={onRecheck}
          className="rounded-lg border border-border px-3 py-1.5 text-xs font-semibold text-fg transition-colors hover:bg-surface-muted disabled:opacity-50"
        >
          {busy ? 'Đang kiểm tra...' : 'Kiểm tra lại'}
        </button>
      </div>
    </div>
  )
}
