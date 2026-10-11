'use client'

import * as React from 'react'
import type { GroqKeyItem } from '../model/groq-keys.types'
import {
  estimateCost,
  estimateLoad,
  formatCount,
  formatUsd,
  formatVnd,
  GROQ_PRICES,
} from '../lib/format'
import { OptionSelect } from '@/shared/ui/option-select'
import { GroqKeyMeter } from './groq-key-meter'

const CUSTOM_MODEL = 'custom'
const DEFAULT_MODEL = 'llama-3.3-70b-versatile'

function readStored(key: string, fallback: string): string {
  try {
    return localStorage.getItem(key) ?? fallback
  } catch {
    return fallback
  }
}

function writeStored(key: string, value: string): void {
  try {
    localStorage.setItem(key, value)
  } catch {
    // Storage can be blocked; the panel still works without persistence.
  }
}

function readNumber(key: string, fallback: number): number {
  const parsed = Number(readStored(key, String(fallback)))
  return Number.isFinite(parsed) ? parsed : fallback
}

function sumOf(
  items: readonly GroqKeyItem[],
  pick: (key: GroqKeyItem) => number | undefined
): number {
  return items.reduce((total, key) => total + (pick(key) ?? 0), 0)
}

interface NumberFieldProps {
  id: string
  label: string
  value: number
  step: number
  suffix?: string
  onChange: (value: number) => void
}

function NumberField({
  id,
  label,
  value,
  step,
  suffix,
  onChange,
}: NumberFieldProps): React.ReactElement {
  return (
    <div className="flex flex-col gap-1">
      <label htmlFor={id} className="text-xs font-medium text-fg">
        {label}
      </label>
      <div className="flex items-center gap-2">
        <input
          id={id}
          type="number"
          min={0}
          step={step}
          value={Number.isFinite(value) ? value : ''}
          onChange={event =>
            onChange(Math.max(0, parseFloat(event.target.value) || 0))
          }
          className="h-9 w-full min-w-0 rounded-lg border border-border bg-surface px-3 text-sm text-fg focus:outline-none focus:ring-2 focus:ring-primary/30"
        />
        {suffix && <span className="text-xs text-muted">{suffix}</span>}
      </div>
    </div>
  )
}

function Row({
  label,
  value,
  total = false,
  tone,
}: {
  label: string
  value: string
  total?: boolean
  tone?: 'ok' | 'bad' | undefined
}): React.ReactElement {
  const toneClass =
    tone === 'bad' ? 'text-danger' : tone === 'ok' ? 'text-success' : 'text-fg'
  return (
    <div
      className={`flex items-center justify-between gap-3 py-1.5 text-xs ${
        total ? 'border-t border-border pt-2 font-semibold' : ''
      }`}
    >
      <span className="text-muted">{label}</span>
      <b className={toneClass}>{value}</b>
    </div>
  )
}

export interface GroqCostPanelProps {
  keys: readonly GroqKeyItem[]
  ready: readonly GroqKeyItem[]
}

export function GroqCostPanel({
  keys,
  ready,
}: GroqCostPanelProps): React.ReactElement {
  const [model, setModel] = React.useState(() =>
    readStored('cost.model', DEFAULT_MODEL)
  )
  const [inputPrice, setInputPrice] = React.useState(
    () => GROQ_PRICES[model]?.[0] ?? 0.59
  )
  const [outputPrice, setOutputPrice] = React.useState(
    () => GROQ_PRICES[model]?.[1] ?? 0.79
  )
  const [tokensIn, setTokensIn] = React.useState(() =>
    readNumber('cost.tin', 1500)
  )
  const [tokensOut, setTokensOut] = React.useState(() =>
    readNumber('cost.tout', 500)
  )
  const [requestsPerDay, setRequestsPerDay] = React.useState(() =>
    readNumber('cost.rpd', 2000)
  )
  const [rate, setRate] = React.useState(() => readNumber('cost.rate', 25000))

  React.useEffect(() => {
    writeStored('cost.model', model)
    writeStored('cost.tin', String(tokensIn))
    writeStored('cost.tout', String(tokensOut))
    writeStored('cost.rpd', String(requestsPerDay))
    writeStored('cost.rate', String(rate))
  }, [model, tokensIn, tokensOut, requestsPerDay, rate])

  const pickModel = (next: string): void => {
    setModel(next)
    const prices = GROQ_PRICES[next]
    if (prices) {
      setInputPrice(prices[0])
      setOutputPrice(prices[1])
    }
  }

  const tokensLimit = sumOf(ready, key => key.check?.limits?.tokensLimit)
  const tokensRemaining = sumOf(
    ready,
    key => key.check?.limits?.tokensRemaining
  )
  const requestsLimit = sumOf(ready, key => key.check?.limits?.requestsLimit)
  const requestsRemaining = sumOf(
    ready,
    key => key.check?.limits?.requestsRemaining
  )
  const served = sumOf(keys, key => key.usageCount)

  const cost = estimateCost({
    inputPrice,
    outputPrice,
    tokensIn,
    tokensOut,
    requestsPerDay,
  })
  const load = estimateLoad({
    tokensIn,
    tokensOut,
    requestsPerDay,
    capacity: {
      readyCount: ready.length,
      tokensLimit,
      requestsLimit,
    },
  })

  const verdict =
    load.keysNeeded === 0
      ? 'Chưa đủ dữ liệu'
      : load.keysNeeded > ready.length
        ? `Thiếu ~${load.keysNeeded - ready.length} key`
        : `Đủ (cần ~${load.keysNeeded} key)`
  const verdictTone =
    load.keysNeeded === 0
      ? undefined
      : load.keysNeeded > ready.length
        ? 'bad'
        : 'ok'

  const panelClass = 'space-y-4 rounded-xl border border-border bg-surface p-5'
  const titleClass = 'text-sm font-bold text-fg'

  return (
    <aside className="space-y-5" aria-label="Dung lượng và chi phí">
      <section className={panelClass}>
        <h2 className={titleClass}>Dung lượng hệ thống</h2>
        <div className="grid grid-cols-2 gap-3">
          <div className="rounded-lg bg-surface-muted p-3">
            <span className="block text-[11px] text-muted">Key sẵn sàng</span>
            <b className="text-lg text-fg">
              {ready.length}
              <small className="text-xs text-muted"> / {keys.length}</small>
            </b>
          </div>
          <div className="rounded-lg bg-surface-muted p-3">
            <span className="block text-[11px] text-muted">Đã cấp key</span>
            <b className="text-lg text-fg">
              {formatCount(served)}
              <small className="text-xs text-muted"> lần</small>
            </b>
          </div>
        </div>
        {tokensLimit > 0 ? (
          <div className="space-y-3">
            <GroqKeyMeter
              label="Token / phút (gộp)"
              remaining={tokensRemaining}
              limit={tokensLimit}
            />
            {requestsLimit > 0 && (
              <GroqKeyMeter
                label="Request / ngày (gộp)"
                remaining={requestsRemaining}
                limit={requestsLimit}
              />
            )}
            <p className="text-xs text-muted">
              Cộng từ {ready.length} key sẵn sàng đã kiểm tra. Mở một key →
              “Kiểm tra lại” để cập nhật số liệu.
            </p>
          </div>
        ) : (
          <p className="text-xs text-muted">
            Chưa có số liệu hạn mức. Mở một key và bấm “Kiểm tra lại”.
          </p>
        )}
      </section>

      <section className={panelClass}>
        <h2 className={titleClass}>Tính chi phí</h2>
        <div className="flex flex-col gap-1">
          <label
            htmlFor="groq-cost-model"
            className="text-xs font-medium text-fg"
          >
            Model
          </label>
          <OptionSelect
            id="groq-cost-model"
            value={model}
            onChange={pickModel}
            options={[
              ...(GROQ_PRICES[model]
                ? []
                : [{ value: CUSTOM_MODEL, label: 'Tuỳ chỉnh' }]),
              ...Object.keys(GROQ_PRICES).map(name => ({
                value: name,
                label: name,
              })),
            ]}
          />
        </div>
        <div className="grid grid-cols-2 gap-3">
          <NumberField
            id="groq-cost-input-price"
            label="Giá input"
            value={inputPrice}
            step={0.01}
            suffix="$/1M"
            onChange={value => {
              setInputPrice(value)
              setModel(CUSTOM_MODEL)
            }}
          />
          <NumberField
            id="groq-cost-output-price"
            label="Giá output"
            value={outputPrice}
            step={0.01}
            suffix="$/1M"
            onChange={value => {
              setOutputPrice(value)
              setModel(CUSTOM_MODEL)
            }}
          />
          <NumberField
            id="groq-cost-tokens-in"
            label="Token vào / request"
            value={tokensIn}
            step={100}
            onChange={setTokensIn}
          />
          <NumberField
            id="groq-cost-tokens-out"
            label="Token ra / request"
            value={tokensOut}
            step={50}
            onChange={setTokensOut}
          />
          <NumberField
            id="groq-cost-rpd"
            label="Request / ngày"
            value={requestsPerDay}
            step={100}
            onChange={setRequestsPerDay}
          />
          <NumberField
            id="groq-cost-rate"
            label="Tỷ giá"
            value={rate}
            step={500}
            suffix="đ/$"
            onChange={setRate}
          />
        </div>
        <div>
          <Row
            label="1 request"
            value={`${formatUsd(cost.perRequest)} ≈ ${formatVnd(cost.perRequest * rate)}`}
          />
          <Row
            label="1 ngày"
            value={`${formatUsd(cost.perDay)} ≈ ${formatVnd(cost.perDay * rate)}`}
          />
          <Row
            label="1 tháng (30 ngày)"
            value={`${formatUsd(cost.perMonth)} ≈ ${formatVnd(cost.perMonth * rate)}`}
            total
          />
        </div>
        <p className="text-xs text-muted">
          Giá tham khảo của Groq nếu dùng gói trả phí. Key free thì chi phí thực
          tế là 0đ — đây là số tiền bạn tiết kiệm được.
        </p>
      </section>

      <section className={panelClass}>
        <h2 className={titleClass}>Ước tính tải</h2>
        <div>
          <Row
            label="Token / request"
            value={formatCount(load.tokensPerRequest)}
          />
          <Row
            label="Token / ngày cần"
            value={formatCount(load.tokensPerDay)}
          />
          <Row
            label="Tối đa / phút (pool)"
            value={
              tokensLimit
                ? `${formatCount(load.requestsPerMinute)} request`
                : '—'
            }
          />
          <Row
            label="Hạn mức / ngày (pool)"
            value={
              requestsLimit ? `${formatCount(requestsLimit)} request` : '—'
            }
          />
          <Row label="Đánh giá" value={verdict} tone={verdictTone} total />
        </div>
      </section>
    </aside>
  )
}
