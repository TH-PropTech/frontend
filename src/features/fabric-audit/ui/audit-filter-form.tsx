'use client'

import { DatePicker } from '@/shared/ui/date-picker'
import { OptionSelect } from '@/shared/ui/option-select'
import * as React from 'react'
import { ledgerEventLabel } from '@/shared/lib/ledger-event-labels'
import { Button } from '@/shared/ui/button'
import { Input } from '@/shared/ui/input'
import {
  DEFAULT_AUDIT_FILTERS,
  validateAuditFilters,
  type AuditFilters,
} from '../model/audit-filters'
import { deliveryStateView, verificationStateView } from '../model/labels'
import {
  AUDIT_DELIVERY_STATES,
  AUDIT_EVENT_TYPES,
  AUDIT_VERIFICATION_STATES,
} from '../model/schemas'
import { InlineError } from './panel-states'

export interface AuditFilterFormProps {
  filters: AuditFilters
  onApply: (filters: AuditFilters) => void
}

/**
 * Holds a draft of the filters; only "Áp dụng" publishes it (to the URL via the parent), so typing
 * never triggers a request per keystroke.
 */
export function AuditFilterForm({
  filters,
  onApply,
}: AuditFilterFormProps): React.ReactElement {
  const [draft, setDraft] = React.useState<AuditFilters>(filters)
  const [error, setError] = React.useState<string | null>(null)

  const patch = (change: Partial<AuditFilters>): void =>
    setDraft(current => ({ ...current, ...change }))

  const submit = (event: React.FormEvent<HTMLFormElement>): void => {
    event.preventDefault()
    const next: AuditFilters = {
      ...draft,
      contractId: draft.contractId.trim(),
      txId: draft.txId.trim(),
      page: 1,
    }
    const problem = validateAuditFilters(next)
    setError(problem)
    if (!problem) onApply(next)
  }

  const reset = (): void => {
    setDraft(DEFAULT_AUDIT_FILTERS)
    setError(null)
    onApply(DEFAULT_AUDIT_FILTERS)
  }

  return (
    <form
      onSubmit={submit}
      aria-label="Bộ lọc sự kiện"
      className="space-y-3 rounded-xl border border-border bg-surface p-4"
    >
      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
        <Input
          label="Mã hợp đồng"
          value={draft.contractId}
          maxLength={64}
          onChange={event => patch({ contractId: event.target.value })}
        />
        <OptionSelect
          id="audit-filter-event-type"
          label="Loại sự kiện"
          value={draft.eventType}
          onChange={eventType => patch({ eventType })}
          allLabel="Tất cả"
          options={AUDIT_EVENT_TYPES.map(type => ({
            value: type,
            label: ledgerEventLabel(type),
          }))}
        />
        <OptionSelect
          id="audit-filter-state"
          label="Trạng thái chuyển"
          value={draft.state}
          onChange={state => patch({ state: state as AuditFilters['state'] })}
          allLabel="Tất cả"
          options={AUDIT_DELIVERY_STATES.map(state => ({
            value: state,
            label: deliveryStateView(state).label,
          }))}
        />
        <OptionSelect
          id="audit-filter-verification"
          label="Xác minh"
          value={draft.verificationState}
          onChange={verificationState =>
            patch({
              verificationState:
                verificationState as AuditFilters['verificationState'],
            })
          }
          allLabel="Tất cả"
          options={AUDIT_VERIFICATION_STATES.map(state => ({
            value: state,
            label: verificationStateView(state).label,
          }))}
        />
        <DatePicker
          label="Từ ngày"
          value={draft.from}
          onChange={from => patch({ from })}
        />
        <DatePicker
          label="Đến ngày"
          value={draft.to}
          onChange={to => patch({ to })}
        />
        <Input
          label="Mã giao dịch (TxID)"
          value={draft.txId}
          maxLength={128}
          onChange={event => patch({ txId: event.target.value })}
        />
      </div>
      {error ? <InlineError message={error} /> : null}
      <div className="flex justify-end gap-2">
        <Button type="button" variant="secondary" onClick={reset}>
          Xóa bộ lọc
        </Button>
        <Button type="submit">Áp dụng bộ lọc</Button>
      </div>
    </form>
  )
}
