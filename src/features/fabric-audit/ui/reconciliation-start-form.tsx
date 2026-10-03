'use client'

import * as React from 'react'
import { PlayCircle } from 'lucide-react'
import { ledgerEventLabel } from '@/shared/lib/ledger-event-labels'
import { Button } from '@/shared/ui/button'
import { Checkbox } from '@/shared/ui/checkbox'
import { Input } from '@/shared/ui/input'
import { useStartReconciliationRun } from '../api/fabric-audit-hooks'
import { describeFabricAuditError } from '../model/error-messages'
import {
  SCOPE_ERROR_MESSAGES,
  validateReconciliationScope,
  type ReconciliationScopeInput,
} from '../model/reconciliation-scope'
import { RECONCILIATION_EVENT_TYPES } from '../model/schemas'
import { InlineError } from './panel-states'

const EMPTY_DRAFT: ReconciliationScopeInput = {
  from: '',
  to: '',
  contractIds: '',
  eventTypes: [],
}

/** Operator-only form. The scope is validated locally first so an unbounded run never leaves the browser. */
export function ReconciliationStartForm(): React.ReactElement {
  const [draft, setDraft] = React.useState(EMPTY_DRAFT)
  const [error, setError] = React.useState<string | null>(null)
  const [notice, setNotice] = React.useState<string | null>(null)
  const start = useStartReconciliationRun()

  const toggleEventType = (type: string, checked: boolean): void =>
    setDraft(current => ({
      ...current,
      eventTypes: checked
        ? [...current.eventTypes, type]
        : current.eventTypes.filter(item => item !== type),
    }))

  const submit = async (
    event: React.FormEvent<HTMLFormElement>
  ): Promise<void> => {
    event.preventDefault()
    setNotice(null)
    const result = validateReconciliationScope(draft)
    if (!result.ok) {
      const code = Object.values(result.errors)[0]
      setError(code ? SCOPE_ERROR_MESSAGES[code] : null)
      return
    }
    setError(null)
    try {
      await start.mutateAsync(result.value)
      setDraft(EMPTY_DRAFT)
      setNotice('Đã bắt đầu lần đối soát mới.')
    } catch (cause) {
      setError(describeFabricAuditError(cause))
    }
  }

  return (
    <form
      onSubmit={event => void submit(event)}
      aria-label="Bắt đầu đối soát"
      className="space-y-3 rounded-xl border border-border bg-surface p-4"
    >
      <div>
        <h3 className="text-sm font-bold text-fg">
          Bắt đầu đối soát có giới hạn
        </h3>
        <p className="text-xs text-muted">
          Cần khoảng thời gian tối đa 92 ngày hoặc danh sách hợp đồng cụ thể. Hệ
          thống không quét toàn bộ sổ cái.
        </p>
      </div>
      <div className="grid gap-3 sm:grid-cols-2">
        <Input
          label="Từ ngày"
          type="date"
          value={draft.from}
          onChange={event =>
            setDraft(current => ({ ...current, from: event.target.value }))
          }
        />
        <Input
          label="Đến ngày"
          type="date"
          value={draft.to}
          onChange={event =>
            setDraft(current => ({ ...current, to: event.target.value }))
          }
        />
      </div>
      <div className="flex flex-col gap-1">
        <label
          htmlFor="reconciliation-contract-ids"
          className="text-xs font-medium text-fg sm:text-sm"
        >
          Mã hợp đồng (ObjectId)
        </label>
        <textarea
          id="reconciliation-contract-ids"
          rows={2}
          value={draft.contractIds}
          placeholder="Mỗi mã cách nhau bởi dấu phẩy hoặc xuống dòng"
          onChange={event =>
            setDraft(current => ({
              ...current,
              contractIds: event.target.value,
            }))
          }
          className="w-full rounded-md border border-border bg-surface px-3 py-2 font-mono text-xs text-fg outline-none focus:border-primary focus:ring-2 focus:ring-primary-soft"
        />
      </div>
      <fieldset className="space-y-2">
        <legend className="text-xs font-medium text-fg sm:text-sm">
          Loại sự kiện (bật quét bằng chứng mồ côi khi chọn)
        </legend>
        <div className="grid gap-2 sm:grid-cols-2">
          {RECONCILIATION_EVENT_TYPES.map(type => {
            const id = `reconciliation-event-${type}`
            return (
              <div key={type} className="flex items-center gap-2">
                <Checkbox
                  id={id}
                  checked={draft.eventTypes.includes(type)}
                  onCheckedChange={checked =>
                    toggleEventType(type, checked === true)
                  }
                />
                <label htmlFor={id} className="text-xs text-fg">
                  {ledgerEventLabel(type)}
                </label>
              </div>
            )
          })}
        </div>
      </fieldset>
      {error ? <InlineError message={error} /> : null}
      {notice ? (
        <p role="status" className="text-sm font-medium text-success">
          {notice}
        </p>
      ) : null}
      <div className="flex justify-end">
        <Button type="submit" loading={start.isPending}>
          <PlayCircle className="h-4 w-4" aria-hidden="true" /> Bắt đầu đối soát
        </Button>
      </div>
    </form>
  )
}
