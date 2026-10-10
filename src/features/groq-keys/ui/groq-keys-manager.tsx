'use client'

import * as React from 'react'
import { toast } from 'sonner'
import {
  addGroqKeys,
  checkGroqKey,
  deleteGroqKey,
  listGroqKeys,
  setGroqKeyStatus,
} from '../api/groq-keys-api'
import type {
  GroqKeyAction,
  GroqKeyCheck,
  GroqKeyCheckRow,
  GroqKeyItem,
} from '../model/groq-keys.types'
import { describeError, getKeyKind } from '../lib/format'
import { GroqCheckResults } from './groq-check-results'
import { GroqCostPanel } from './groq-cost-panel'
import { GroqKeyList } from './groq-key-list'

const MAX_CHECK_PER_RUN = 10

function parseKeys(text: string): string[] {
  return [...new Set(text.split(/[\s,]+/).filter(Boolean))]
}

function failedCheck(error: unknown): GroqKeyCheck {
  return {
    at: Date.now(),
    ok: false,
    error: describeError(error),
    models: [],
  }
}

export function GroqKeysManager(): React.ReactElement {
  const [text, setText] = React.useState('')
  const [results, setResults] = React.useState<GroqKeyCheckRow[] | null>(null)
  const [keys, setKeys] = React.useState<GroqKeyItem[] | null>(null)
  // Reference time for cooldown and "ago" labels; refreshed on every load.
  const [now, setNow] = React.useState<number>(() => Date.now())
  const [openId, setOpenId] = React.useState<string | null>(null)
  const [pending, setPending] = React.useState(0)
  const busy = pending > 0

  const track = React.useCallback(
    async (job: () => Promise<void>): Promise<void> => {
      setPending(count => count + 1)
      try {
        await job()
      } finally {
        setPending(count => count - 1)
      }
    },
    []
  )

  const loadKeys = React.useCallback(async (): Promise<void> => {
    const next = await listGroqKeys()
    setNow(Date.now())
    setKeys(next)
  }, [])

  // Runs a mutation, refreshes the list, then shows the result as a toast.
  const runAction = React.useCallback(
    (action: () => Promise<string | undefined>): Promise<void> =>
      track(async () => {
        try {
          const message = await action()
          await loadKeys()
          if (message) toast.success(message)
        } catch (cause: unknown) {
          toast.error(describeError(cause))
        }
      }),
    [track, loadKeys]
  )

  // Initial load. Async callbacks only, so no synchronous setState in the effect.
  React.useEffect(() => {
    let active = true
    const fetchKeys = async (): Promise<void> => {
      try {
        const next = await listGroqKeys()
        if (!active) return
        setNow(Date.now())
        setKeys(next)
      } catch (cause: unknown) {
        if (active) toast.error(describeError(cause))
      }
    }
    void fetchKeys()
    return () => {
      active = false
    }
  }, [])

  const parsed = parseKeys(text)
  const valid = (results ?? []).filter(row => row.res.ok)

  const checkTyped = (): Promise<void> =>
    track(async () => {
      const batch = parsed.slice(0, MAX_CHECK_PER_RUN)
      const rows = await Promise.all(
        batch.map(async key => {
          try {
            return { key, res: await checkGroqKey({ key }) }
          } catch (cause: unknown) {
            return { key, res: failedCheck(cause) }
          }
        })
      )
      setResults(rows)
    })

  const saveValid = (): Promise<void> =>
    runAction(async () => {
      const checks = Object.fromEntries(valid.map(row => [row.key, row.res]))
      const outcome = await addGroqKeys({
        keys: valid.map(row => row.key),
        checks,
      })
      setText('')
      setResults(null)
      const duplicate =
        outcome.duplicated > 0 ? ` (${outcome.duplicated} key đã có)` : ''
      return `Đã lưu ${outcome.added} key${duplicate}`
    })

  const recheck = (id: string): Promise<void> =>
    runAction(async () => {
      await checkGroqKey({ id })
      return undefined
    })

  const setStatus = (id: string, action: GroqKeyAction): Promise<void> =>
    runAction(async () => {
      await setGroqKeyStatus(id, action)
      if (action === 'reset') return 'Đã dùng lại key'
      return undefined
    })

  const toggleEnabled = (item: GroqKeyItem): void => {
    void setStatus(item._id, item.status === 'disabled' ? 'enable' : 'disable')
  }

  const remove = (item: GroqKeyItem): void => {
    if (!window.confirm('Xoá key này?')) return
    setOpenId(current => (current === item._id ? null : current))
    void runAction(async () => {
      await deleteGroqKey(item._id)
      return 'Đã xoá'
    })
  }

  const handleTextChange = (
    event: React.ChangeEvent<HTMLTextAreaElement>
  ): void => {
    setText(event.target.value)
    setResults(null)
    const element = event.currentTarget
    element.style.height = 'auto'
    element.style.height = `${Math.min(element.scrollHeight, 160)}px`
  }

  const list = keys ?? []
  const ready = list.filter(item => getKeyKind(item, now) === 'ready')
  const currentId = ready.reduce<GroqKeyItem | null>(
    (oldest, item) =>
      !oldest || item.createdAt < oldest.createdAt ? item : oldest,
    null
  )?._id
  const rows = [...list].sort((a, b) => a.createdAt - b.createdAt)

  return (
    <div className="space-y-5">
      <section
        aria-labelledby="groq-add-title"
        className="space-y-4 rounded-xl border border-border bg-surface p-5"
      >
        <h2 id="groq-add-title" className="text-sm font-bold text-fg">
          Thêm key
        </h2>
        <div className="flex flex-col gap-3 sm:flex-row sm:items-start">
          <label htmlFor="groq-key-input" className="sr-only">
            Key Groq cần thêm
          </label>
          <textarea
            id="groq-key-input"
            rows={1}
            value={text}
            placeholder="Dán key Groq (nhiều key: mỗi dòng một key)"
            onChange={handleTextChange}
            className="min-h-10 w-full flex-1 resize-none rounded-lg border border-border bg-surface px-3 py-2 font-mono text-sm text-fg placeholder:text-muted focus:outline-none focus:ring-2 focus:ring-primary/30"
          />
          <button
            type="button"
            disabled={!parsed.length || busy}
            onClick={() => void checkTyped()}
            className="shrink-0 rounded-lg bg-primary px-4 py-2 text-xs font-semibold text-on-control transition-colors hover:bg-primary-hover disabled:opacity-50"
          >
            {busy ? 'Đang xử lý...' : 'Kiểm tra'}
          </button>
        </div>
        {results && (
          <GroqCheckResults
            rows={results}
            totalTyped={parsed.length}
            savable={valid.length}
            busy={busy}
            onSave={() => void saveValid()}
          />
        )}
      </section>

      <div className="grid gap-5 lg:grid-cols-[minmax(0,1fr)_320px]">
        <section
          aria-labelledby="groq-list-title"
          className="min-w-0 overflow-hidden rounded-xl border border-border bg-surface"
        >
          <h2
            id="groq-list-title"
            className="border-b border-border px-4 py-3 text-sm font-bold text-fg"
          >
            Danh sách key
          </h2>
          <GroqKeyList
            keys={keys === null ? null : rows}
            currentId={currentId}
            now={now}
            openId={openId}
            busy={busy}
            onToggle={id => setOpenId(current => (current === id ? null : id))}
            onRecheck={id => void recheck(id)}
            onReset={id => void setStatus(id, 'reset')}
            onToggleEnabled={toggleEnabled}
            onDelete={remove}
          />
        </section>
        {keys !== null && <GroqCostPanel keys={list} ready={ready} />}
      </div>
    </div>
  )
}
