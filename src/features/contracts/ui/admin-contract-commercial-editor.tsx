'use client'

import { OptionSelect } from '@/shared/ui/option-select'
import * as React from 'react'
import { AlertCircle, CheckCircle2, LockKeyhole, Save } from 'lucide-react'
import { Alert, AlertDescription, AlertTitle } from '@/shared/ui/alert'
import { Badge } from '@/shared/ui/badge'
import { Button } from '@/shared/ui/button'
import { Input } from '@/shared/ui/input'
import {
  getAdminContractEditor,
  saveAdminCommercialDraft,
  validateAdminCommercialDraft,
  type ContractCommercialDraft,
  type ContractCommercialValidation,
} from '../api/contracts-api'

export interface AdminContractCommercialEditorProps {
  contractId: string
}

const EMPTY_DRAFT: ContractCommercialDraft = {
  monthlyRent: 0,
  deposit: 0,
  paymentDay: 1,
  latePenaltyRate: 0,
  terminationNoticeDays: 30,
  durationMonths: 12,
  handoverNotes: '',
  inventoryReference: '',
  noticePeriodDays: 30,
  addendaIds: [],
}

const UTILITY_OPTIONS = [
  ['electricity', 'Tiền điện'],
  ['water', 'Tiền nước'],
  ['internet', 'Internet'],
  ['managementFee', 'Phí quản lý'],
] as const

const ADDENDA_OPTIONS = [
  ['HANDOVER_RECORD', 'Biên bản bàn giao'],
  ['INVENTORY_LIST', 'Danh mục nội thất'],
  ['BUILDING_RULES', 'Nội quy tòa nhà'],
  ['DEPOSIT_RECEIPT', 'Biên nhận đặt cọc'],
] as const

export function AdminContractCommercialEditor({
  contractId,
}: AdminContractCommercialEditorProps): React.ReactElement {
  const [draft, setDraft] = React.useState<ContractCommercialDraft>(EMPTY_DRAFT)
  const [initialDraft, setInitialDraft] =
    React.useState<ContractCommercialDraft>(EMPTY_DRAFT)
  const [revision, setRevision] = React.useState(0)
  const [locked, setLocked] = React.useState(false)
  const [loading, setLoading] = React.useState(true)
  const [busy, setBusy] = React.useState(false)
  const [error, setError] = React.useState<string | null>(null)
  const [validation, setValidation] =
    React.useState<ContractCommercialValidation | null>(null)
  const [saved, setSaved] = React.useState(false)

  const load = React.useCallback(async (): Promise<void> => {
    setLoading(true)
    setError(null)
    try {
      const response = await getAdminContractEditor(contractId)
      const next = response.commercial ?? EMPTY_DRAFT
      setDraft(next)
      setInitialDraft(next)
      setRevision(response.revision)
      setLocked(response.locked)
    } catch (cause: unknown) {
      setError(
        cause instanceof Error
          ? cause.message
          : 'Không tải được trình soạn thảo hợp đồng.'
      )
    } finally {
      setLoading(false)
    }
  }, [contractId])

  React.useEffect(() => {
    let cancelled = false
    queueMicrotask(() => {
      if (!cancelled) void load()
    })
    return () => {
      cancelled = true
    }
  }, [load])

  const setNumber = (
    field: keyof ContractCommercialDraft,
    value: string
  ): void => {
    const numberValue = Number(value)
    setDraft(current => ({
      ...current,
      [field]: Number.isFinite(numberValue) ? numberValue : 0,
    }))
    setSaved(false)
  }

  const setText = (
    field: keyof ContractCommercialDraft,
    value: string
  ): void => {
    setDraft(current => ({ ...current, [field]: value }))
    setSaved(false)
  }

  const setUtility = (
    field: string,
    value: 'tenant' | 'landlord' | 'shared'
  ): void => {
    setDraft(current => ({
      ...current,
      utilities: { ...(current.utilities ?? {}), [field]: value },
    }))
    setSaved(false)
  }

  const toggleAddendum = (id: string): void => {
    setDraft(current => {
      const ids = new Set(current.addendaIds ?? [])
      if (ids.has(id)) ids.delete(id)
      else ids.add(id)
      return { ...current, addendaIds: [...ids] }
    })
    setSaved(false)
  }

  const validate = async (): Promise<ContractCommercialValidation | null> => {
    setBusy(true)
    setError(null)
    setSaved(false)
    try {
      const result = await validateAdminCommercialDraft(contractId, draft)
      setValidation(result)
      if (!result.valid) setError(result.errors.join(', '))
      return result
    } catch (cause: unknown) {
      setError(
        cause instanceof Error ? cause.message : 'Không xác thực được bản nháp.'
      )
      return null
    } finally {
      setBusy(false)
    }
  }

  const save = async (): Promise<void> => {
    const result = await validate()
    if (!result?.valid || locked) return
    setBusy(true)
    setError(null)
    try {
      const response = await saveAdminCommercialDraft(
        contractId,
        draft,
        revision
      )
      setRevision(response.revision)
      setInitialDraft(draft)
      setLocked(response.locked)
      setSaved(true)
    } catch (cause: unknown) {
      setError(
        cause instanceof Error ? cause.message : 'Lưu bản nháp thất bại.'
      )
    } finally {
      setBusy(false)
    }
  }

  const changedFields = Object.keys(draft).filter(
    field =>
      JSON.stringify(draft[field as keyof ContractCommercialDraft]) !==
      JSON.stringify(initialDraft[field as keyof ContractCommercialDraft])
  )

  if (loading) {
    return (
      <div className="rounded-2xl border border-border bg-surface p-5 text-sm text-muted">
        Đang tải dữ liệu thương mại…
      </div>
    )
  }

  if (error && !draft) {
    return (
      <Alert variant="destructive">
        <AlertCircle className="h-4 w-4" />
        <AlertTitle>Không mở được trình soạn thảo</AlertTitle>
        <AlertDescription>{error}</AlertDescription>
      </Alert>
    )
  }

  return (
    <section
      className="space-y-5 rounded-2xl border border-border bg-surface p-5"
      data-testid="admin-contract-commercial-editor"
    >
      <header className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <h2 className="text-lg font-semibold text-fg">
            Điều chỉnh thương mại hợp đồng
          </h2>
          <p className="mt-1 text-xs text-muted">
            Revision {revision} · chỉ chỉnh biến giao dịch, không chỉnh điều
            khoản luật.
          </p>
        </div>
        <Badge variant={locked ? 'secondary' : 'outline'}>
          {locked ? (
            <>
              <LockKeyhole className="mr-1 h-3.5 w-3.5" /> Đã khóa
            </>
          ) : (
            'Bản nháp'
          )}
        </Badge>
      </header>

      {error ? (
        <Alert variant="destructive">
          <AlertCircle className="h-4 w-4" />
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      ) : null}
      {saved ? (
        <Alert>
          <CheckCircle2 className="h-4 w-4" />
          <AlertDescription>Đã lưu sau khi server xác nhận.</AlertDescription>
        </Alert>
      ) : null}

      <div className="grid gap-4 md:grid-cols-2">
        <Input
          label="Giá thuê mỗi tháng (VND)"
          type="number"
          min={0}
          value={draft.monthlyRent}
          disabled={locked || busy}
          onChange={event => setNumber('monthlyRent', event.target.value)}
        />
        <Input
          label="Tiền đặt cọc (VND)"
          type="number"
          min={0}
          value={draft.deposit}
          disabled={locked || busy}
          onChange={event => setNumber('deposit', event.target.value)}
        />
        <Input
          label="Ngày thanh toán"
          type="number"
          min={1}
          max={31}
          value={draft.paymentDay}
          disabled={locked || busy}
          onChange={event => setNumber('paymentDay', event.target.value)}
        />
        <Input
          label="Lãi chậm trả (%/năm)"
          type="number"
          min={0}
          max={20}
          step="0.01"
          value={draft.latePenaltyRate}
          disabled={locked || busy}
          onChange={event => setNumber('latePenaltyRate', event.target.value)}
        />
        <Input
          label="Thời hạn thuê (tháng)"
          type="number"
          min={1}
          max={120}
          value={draft.durationMonths}
          disabled={locked || busy}
          onChange={event => setNumber('durationMonths', event.target.value)}
        />
        <Input
          label="Báo trước chấm dứt (ngày)"
          type="number"
          min={1}
          max={365}
          value={draft.terminationNoticeDays}
          disabled={locked || busy}
          onChange={event =>
            setNumber('terminationNoticeDays', event.target.value)
          }
        />
        <Input
          label="Tham chiếu kiểm kê"
          value={draft.inventoryReference ?? ''}
          disabled={locked || busy}
          onChange={event => setText('inventoryReference', event.target.value)}
        />
        <Input
          label="Thời hạn báo trước thương mại"
          type="number"
          min={1}
          max={365}
          value={draft.noticePeriodDays ?? draft.terminationNoticeDays}
          disabled={locked || busy}
          onChange={event => setNumber('noticePeriodDays', event.target.value)}
        />
      </div>

      <div className="grid gap-4 rounded-xl border border-border bg-surface-muted p-4 md:grid-cols-2">
        <div className="space-y-3">
          <h3 className="text-sm font-semibold text-fg">Phân bổ tiện ích</h3>
          {UTILITY_OPTIONS.map(([field, label]) => (
            <label
              key={field}
              className="flex items-center justify-between gap-3 text-xs text-fg"
            >
              <span>{label}</span>
              <OptionSelect
                value={draft.utilities?.[field] ?? 'tenant'}
                disabled={locked || busy}
                onChange={value =>
                  setUtility(field, value as 'tenant' | 'landlord' | 'shared')
                }
                className="w-40 text-xs"
                options={[
                  { value: 'tenant', label: 'Bên thuê' },
                  { value: 'landlord', label: 'Bên cho thuê' },
                  { value: 'shared', label: 'Phân bổ chung' },
                ]}
              />
            </label>
          ))}
        </div>
        <div className="space-y-3">
          <h3 className="text-sm font-semibold text-fg">Phụ lục được duyệt</h3>
          {ADDENDA_OPTIONS.map(([id, label]) => (
            <label key={id} className="flex items-center gap-2 text-xs text-fg">
              <input
                type="checkbox"
                checked={draft.addendaIds?.includes(id) ?? false}
                disabled={locked || busy}
                onChange={() => toggleAddendum(id)}
              />
              {label}
            </label>
          ))}
        </div>
      </div>

      <label className="flex flex-col gap-1 text-xs font-medium text-fg">
        Ghi chú bàn giao
        <textarea
          className="min-h-24 rounded-md border border-border bg-surface px-3 py-2 text-sm text-fg outline-none focus:border-primary"
          value={draft.handoverNotes ?? ''}
          disabled={locked || busy}
          onChange={event => setText('handoverNotes', event.target.value)}
        />
      </label>

      <div className="rounded-xl border border-border bg-surface-muted p-4">
        <h3 className="text-sm font-semibold text-fg">
          Vùng được bảo vệ · chỉ đọc
        </h3>
        <p className="mt-1 text-xs text-muted">
          Điều khoản pháp lý, danh tính, quyền tài sản, template version, chữ
          ký, mã xác thực và bằng chứng lưu vết do máy chủ quản lý.
        </p>
      </div>

      {changedFields.length > 0 ? (
        <p className="text-xs text-muted">
          Thay đổi chưa lưu: {changedFields.join(', ')}
        </p>
      ) : null}
      {validation?.changedFields.length ? (
        <p className="text-xs text-muted">
          Server diff: {validation.changedFields.join(', ')}
        </p>
      ) : null}

      <div className="flex flex-wrap gap-2">
        <Button
          type="button"
          variant="secondary"
          disabled={busy}
          onClick={() => void validate()}
        >
          Kiểm tra
        </Button>
        <Button
          type="button"
          disabled={locked || busy}
          onClick={() => void save()}
        >
          <Save className="mr-2 h-4 w-4" /> Lưu bản nháp
        </Button>
        <Button
          type="button"
          variant="ghost"
          disabled={busy}
          onClick={() => void load()}
        >
          Tải lại
        </Button>
      </div>
    </section>
  )
}
