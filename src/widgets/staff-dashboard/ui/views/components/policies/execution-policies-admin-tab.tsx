'use client'

import * as React from 'react'
import { Archive, CheckCircle2, Loader2, Plus, Save } from 'lucide-react'
import {
  archiveRentalExecutionPolicy,
  getAdminRentalExecutionPolicies,
  publishRentalExecutionPolicy,
  saveRentalExecutionPolicyDraft,
  type RentalExecutionPolicyDisclosure,
  type RentalExecutionPolicyRecord,
  type RentalExecutionPolicyStrategy,
} from '@/features/rental-execution-policies/api/rental-execution-policies-api'

const EMPTY_DISCLOSURE: RentalExecutionPolicyDisclosure = {
  sequenceLabel: '',
  depositLabel: '',
  effectivenessLabel: '',
  cancellationLabel: '',
}

type DraftState = {
  policyId: string
  strategy: RentalExecutionPolicyStrategy
  name: string
  description: string
  disclosure: RentalExecutionPolicyDisclosure
  expectedRevision: number
}

function toDraft(policy?: RentalExecutionPolicyRecord): DraftState {
  return {
    policyId: policy?.policyId ?? '',
    strategy: 'SIGN_FIRST',
    name: policy?.name ?? '',
    description: policy?.description ?? '',
    disclosure: policy?.disclosure ?? EMPTY_DISCLOSURE,
    expectedRevision: policy?.draftRevision ?? 1,
  }
}

export function ExecutionPoliciesAdminTab(): React.ReactElement {
  const [policies, setPolicies] = React.useState<RentalExecutionPolicyRecord[]>(
    []
  )
  const [draft, setDraft] = React.useState<DraftState>(() => toDraft())
  const [loading, setLoading] = React.useState(true)
  const [saving, setSaving] = React.useState(false)
  const [error, setError] = React.useState<string | null>(null)
  const [success, setSuccess] = React.useState<string | null>(null)

  const reload = React.useCallback(async (): Promise<void> => {
    setLoading(true)
    setError(null)
    try {
      const result = await getAdminRentalExecutionPolicies()
      setPolicies(result)
      const firstDraft = result.find(policy => policy.status === 'draft')
      if (firstDraft) setDraft(toDraft(firstDraft))
    } catch (cause: unknown) {
      setError(cause instanceof Error ? cause.message : 'Không thể tải policy')
    } finally {
      setLoading(false)
    }
  }, [])

  React.useEffect(() => {
    let active = true
    void getAdminRentalExecutionPolicies()
      .then(result => {
        if (!active) return
        setPolicies(result)
        const firstDraft = result.find(policy => policy.status === 'draft')
        if (firstDraft) setDraft(toDraft(firstDraft))
      })
      .catch((cause: unknown) => {
        if (active) {
          setError(
            cause instanceof Error ? cause.message : 'Không thể tải policy'
          )
        }
      })
      .finally(() => {
        if (active) setLoading(false)
      })
    return () => {
      active = false
    }
  }, [])

  const updateDisclosure = (
    key: keyof RentalExecutionPolicyDisclosure,
    value: string
  ): void => {
    setDraft(previous => ({
      ...previous,
      disclosure: { ...previous.disclosure, [key]: value },
    }))
  }

  const saveDraft = async (): Promise<void> => {
    setSaving(true)
    setError(null)
    setSuccess(null)
    try {
      const saved = await saveRentalExecutionPolicyDraft({
        ...(draft.policyId ? { policyId: draft.policyId } : {}),
        strategy: draft.strategy,
        name: draft.name.trim(),
        description: draft.description.trim(),
        disclosure: draft.disclosure,
        expectedRevision: draft.expectedRevision,
      })
      setPolicies(previous => [
        ...previous.filter(
          policy =>
            !(policy.policyId === saved.policyId && policy.status === 'draft')
        ),
        saved,
      ])
      setDraft(toDraft(saved))
      setSuccess('Đã lưu bản nháp policy.')
    } catch (cause: unknown) {
      setError(
        cause instanceof Error ? cause.message : 'Không thể lưu bản nháp'
      )
    } finally {
      setSaving(false)
    }
  }

  const publishDraft = async (): Promise<void> => {
    if (!draft.policyId) return
    setSaving(true)
    setError(null)
    setSuccess(null)
    try {
      const published = await publishRentalExecutionPolicy(draft.policyId, {
        expectedRevision: draft.expectedRevision,
        reason: 'Admin duyệt policy cho luồng thuê PROP-321',
      })
      setPolicies(previous => [...previous, published])
      setSuccess(`Đã publish revision ${published.version}.`)
      await reload()
    } catch (cause: unknown) {
      setError(
        cause instanceof Error ? cause.message : 'Không thể publish policy'
      )
    } finally {
      setSaving(false)
    }
  }

  const archivePolicy = async (
    policy: RentalExecutionPolicyRecord
  ): Promise<void> => {
    if (policy.version === null) return
    setSaving(true)
    setError(null)
    setSuccess(null)
    try {
      const archived = await archiveRentalExecutionPolicy(
        policy.policyId,
        policy.version,
        'Admin archive revision cũ'
      )
      setPolicies(previous =>
        previous.map(item =>
          item.policyId === archived.policyId &&
          item.version === archived.version
            ? archived
            : item
        )
      )
      setSuccess(`Đã archive revision ${archived.version}.`)
    } catch (cause: unknown) {
      setError(
        cause instanceof Error ? cause.message : 'Không thể archive policy'
      )
    } finally {
      setSaving(false)
    }
  }

  if (loading) {
    return (
      <div className="flex items-center gap-2 p-8 text-sm text-muted">
        <Loader2 className="h-4 w-4 animate-spin" /> Đang tải execution policy…
      </div>
    )
  }

  return (
    <div className="space-y-6" data-testid="execution-policies-admin-tab">
      {error ? (
        <div
          role="alert"
          className="rounded-xl border border-danger/30 bg-danger-soft p-3 text-xs text-danger"
        >
          {error}
        </div>
      ) : null}
      {success ? (
        <div className="flex items-center gap-2 rounded-xl border border-success/30 bg-success-soft/30 p-3 text-xs text-success">
          <CheckCircle2 className="h-4 w-4" /> {success}
        </div>
      ) : null}

      <section className="space-y-4 rounded-2xl border border-border bg-surface p-5">
        <div className="flex items-center justify-between gap-3">
          <div>
            <h3 className="text-sm font-bold text-fg">
              Catalog trình tự đặt cọc & ký
            </h3>
            <p className="mt-1 text-xs text-muted">
              Chỉ còn một trình tự: ký trước, cọc sau; bản đã publish là
              immutable.
            </p>
          </div>
          <button
            type="button"
            data-testid="execution-policy-new-draft"
            onClick={() => setDraft(toDraft())}
            className="inline-flex items-center gap-1 rounded-lg border border-border px-3 py-2 text-xs text-muted hover:bg-surface-muted"
          >
            <Plus className="h-3.5 w-3.5" /> Draft mới
          </button>
        </div>

        <div className="grid gap-3 sm:grid-cols-2">
          <label className="space-y-1 text-xs text-muted">
            Policy ID
            <input
              data-testid="execution-policy-id"
              value={draft.policyId}
              onChange={event =>
                setDraft(previous => ({
                  ...previous,
                  policyId: event.target.value,
                }))
              }
              className="h-9 w-full rounded-lg border border-border bg-bg px-3 text-xs text-fg"
              placeholder="sign-first"
            />
          </label>
          <label className="space-y-1 text-xs text-muted sm:col-span-2">
            Tên policy
            <input
              data-testid="execution-policy-name"
              value={draft.name}
              onChange={event =>
                setDraft(previous => ({
                  ...previous,
                  name: event.target.value,
                }))
              }
              className="h-9 w-full rounded-lg border border-border bg-bg px-3 text-xs text-fg"
            />
          </label>
          <label className="space-y-1 text-xs text-muted sm:col-span-2">
            Mô tả
            <textarea
              data-testid="execution-policy-description"
              value={draft.description}
              onChange={event =>
                setDraft(previous => ({
                  ...previous,
                  description: event.target.value,
                }))
              }
              rows={2}
              className="w-full rounded-lg border border-border bg-bg px-3 py-2 text-xs text-fg"
            />
          </label>
        </div>

        <div className="grid gap-3 sm:grid-cols-2">
          {(
            Object.keys(EMPTY_DISCLOSURE) as Array<
              keyof RentalExecutionPolicyDisclosure
            >
          ).map(key => (
            <label key={key} className="space-y-1 text-xs text-muted">
              {key}
              <input
                data-testid={`execution-policy-disclosure-${key}`}
                value={draft.disclosure[key]}
                onChange={event => updateDisclosure(key, event.target.value)}
                className="h-9 w-full rounded-lg border border-border bg-bg px-3 text-xs text-fg"
              />
            </label>
          ))}
        </div>

        <div className="flex flex-wrap gap-2">
          <button
            type="button"
            data-testid="execution-policy-save-draft"
            disabled={saving}
            onClick={() => void saveDraft()}
            className="inline-flex items-center gap-1 rounded-lg bg-control px-3 py-2 text-xs text-on-control disabled:opacity-50"
          >
            <Save className="h-3.5 w-3.5" /> Lưu draft
          </button>
          <button
            type="button"
            data-testid="execution-policy-publish"
            disabled={saving || !draft.policyId}
            onClick={() => void publishDraft()}
            className="rounded-lg border border-primary px-3 py-2 text-xs text-primary disabled:opacity-50"
          >
            Publish revision
          </button>
        </div>
      </section>

      <section className="space-y-3 rounded-2xl border border-border bg-surface p-5">
        <h3 className="text-sm font-bold text-fg">Revision đã ghi nhận</h3>
        {policies.length === 0 ? (
          <p className="text-xs text-muted">Chưa có revision.</p>
        ) : (
          policies.map(policy => (
            <article
              key={`${policy.policyId}-${policy.version ?? 'draft'}`}
              className="flex flex-col gap-3 rounded-xl border border-border/80 bg-surface-muted/30 p-3 sm:flex-row sm:items-center sm:justify-between"
            >
              <div className="text-xs">
                <p className="font-semibold text-fg">
                  {policy.policyId} · v{policy.version ?? 'draft'}
                </p>
                <p className="mt-1 text-muted">
                  {policy.name} · {policy.status}
                </p>
                <p className="mt-1 font-mono text-[10px] text-subtle">
                  {policy.contentHash ?? 'hash sẽ sinh khi publish'}
                </p>
              </div>
              <div className="flex gap-2">
                {policy.status === 'draft' ? (
                  <button
                    type="button"
                    data-testid={`execution-policy-edit-${policy.policyId}`}
                    onClick={() => setDraft(toDraft(policy))}
                    className="rounded-lg border border-border px-3 py-1.5 text-xs text-muted"
                  >
                    Sửa draft
                  </button>
                ) : null}
                {policy.status === 'published' && policy.version !== null ? (
                  <button
                    type="button"
                    data-testid={`execution-policy-archive-${policy.policyId}-${policy.version}`}
                    disabled={saving}
                    onClick={() => void archivePolicy(policy)}
                    className="inline-flex items-center gap-1 rounded-lg border border-warning/40 px-3 py-1.5 text-xs text-warning disabled:opacity-50"
                  >
                    <Archive className="h-3.5 w-3.5" /> Archive
                  </button>
                ) : null}
              </div>
            </article>
          ))
        )}
      </section>
    </div>
  )
}
