'use client'

import * as React from 'react'
import {
  AlertCircle,
  CheckCircle2,
  Clock,
  Copy,
  ExternalLink,
  Eye,
  FileText,
  Loader2,
  Plus,
  RefreshCw,
  Save,
  Send,
  Trash2,
} from 'lucide-react'
import {
  approveTerms,
  describeTermsError,
  getAdminLegalTermsState,
  publishLegalTerms,
  readTermsErrorCode,
  requestTermsChanges,
  saveLegalTermsDraft,
  submitTermsForReview,
  type AdminLegalTermsStateResponse,
  type LegalTermsSection,
  type TermsReviewStatus,
} from '@/features/legal-terms/api/legal-terms-api'
import { getAdminLegalSources } from '@/features/contracts/api/legal-sources-api'
import type { LegalSource } from '@/features/contracts/model/legal-governance-data'
import { AdminCard } from '@/shared/ui/admin-card'

const REVIEW_STEPS: {
  status: TermsReviewStatus | 'published'
  label: string
}[] = [
  { status: 'editing', label: 'Soạn thảo' },
  { status: 'in_review', label: 'Chờ duyệt' },
  { status: 'approved', label: 'Đã duyệt' },
  { status: 'published', label: 'Công bố' },
]

const WITHDRAW_NOTE = 'Người soạn rút lại để chỉnh sửa'

function shortId(id: string): string {
  return id.length > 8 ? id.slice(0, 8) : id
}

function formatDateTime(iso: string): string {
  return new Date(iso).toLocaleString('vi-VN')
}

function toLocalInput(d: Date): string {
  const pad = (n: number): string => String(n).padStart(2, '0')
  return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}T${pad(d.getHours())}:${pad(d.getMinutes())}`
}

function normalizeSections(sections: LegalTermsSection[]): string {
  return JSON.stringify(
    sections.map((sec, idx) => ({
      id: sec.id.trim() || `sec-${idx + 1}`,
      heading: sec.heading.trim(),
      body: sec.body.trim(),
      sourceKeys: [...(sec.sourceKeys ?? [])].sort(),
    }))
  )
}

export function LegalTermsAdminTab(): React.ReactElement {
  const [data, setData] = React.useState<AdminLegalTermsStateResponse | null>(
    null
  )
  const [loading, setLoading] = React.useState(true)
  const [saving, setSaving] = React.useState(false)
  const [publishing, setPublishing] = React.useState(false)
  const [error, setError] = React.useState<string | null>(null)
  const [copiedHash, setCopiedHash] = React.useState(false)
  const [showPublishModal, setShowPublishModal] = React.useState(false)
  const [previewMode, setPreviewMode] = React.useState(false)
  const [reviewBusy, setReviewBusy] = React.useState(false)
  const [showChangesModal, setShowChangesModal] = React.useState(false)
  const [changesNote, setChangesNote] = React.useState('')
  const [effectiveMode, setEffectiveMode] = React.useState<'now' | 'scheduled'>(
    'now'
  )
  const [scheduledAt, setScheduledAt] = React.useState('')
  const [modalError, setModalError] = React.useState<string | null>(null)
  const [successMessage, setSuccessMessage] = React.useState<string | null>(
    null
  )

  // Draft editable state
  const [draftTitle, setDraftTitle] = React.useState('')
  const [draftSummary, setDraftSummary] = React.useState('')
  const [draftSections, setDraftSections] = React.useState<LegalTermsSection[]>(
    []
  )
  const [legalSources, setLegalSources] = React.useState<LegalSource[]>([])

  React.useEffect(() => {
    let active = true
    getAdminLegalSources()
      .then(sources => {
        if (active) setLegalSources(sources)
      })
      .catch(() => {
        // Picker nguồn pháp lý là tùy chọn; để trống nếu tải lỗi.
      })
    return () => {
      active = false
    }
  }, [])

  const applyLoadedData = React.useCallback(
    (res: AdminLegalTermsStateResponse) => {
      setData(res)
      if (res.draft) {
        setDraftTitle(res.draft.title)
        setDraftSummary(res.draft.summary)
        setDraftSections(res.draft.sections || [])
      } else if (res.published) {
        setDraftTitle(res.published.title)
        setDraftSummary(res.published.summary)
        setDraftSections(
          res.published.sections.map(s => ({
            id: s.id,
            heading: s.heading,
            body: s.body,
            order: s.order,
            ...(s.sourceKeys ? { sourceKeys: s.sourceKeys } : {}),
          }))
        )
      }
    },
    []
  )

  const reloadData = React.useCallback(
    async (opts?: { keepMessages?: boolean }) => {
      setLoading(true)
      if (!opts?.keepMessages) {
        setError(null)
        setSuccessMessage(null)
      }
      try {
        const res = await getAdminLegalTermsState()
        applyLoadedData(res)
      } catch (err) {
        setError(
          err instanceof Error
            ? err.message
            : 'Không thể tải thông tin điều khoản dịch vụ'
        )
      } finally {
        setLoading(false)
      }
    },
    [applyLoadedData]
  )

  React.useEffect(() => {
    let active = true
    getAdminLegalTermsState()
      .then(res => {
        if (active) applyLoadedData(res)
      })
      .catch(err => {
        if (active) {
          setError(
            err instanceof Error
              ? err.message
              : 'Không thể tải thông tin điều khoản dịch vụ'
          )
        }
      })
      .finally(() => {
        if (active) setLoading(false)
      })
    return () => {
      active = false
    }
  }, [applyLoadedData])

  const copyHash = async (hash: string): Promise<void> => {
    try {
      await navigator.clipboard.writeText(hash)
      setCopiedHash(true)
      setTimeout(() => setCopiedHash(false), 2000)
    } catch {
      // Ignore clipboard write failures in non-supported environments
    }
  }

  const handleSectionChange = (
    index: number,
    field: 'heading' | 'body',
    val: string
  ): void => {
    setDraftSections(prev => {
      const current = prev[index]
      if (!current) return prev
      const next = [...prev]
      next[index] = {
        ...current,
        heading: field === 'heading' ? val : current.heading,
        body: field === 'body' ? val : current.body,
      }
      return next
    })
  }

  const handleToggleSectionSource = (index: number, key: string): void => {
    setDraftSections(prev => {
      const current = prev[index]
      if (!current) return prev
      const selected = current.sourceKeys ?? []
      const next = [...prev]
      next[index] = {
        ...current,
        sourceKeys: selected.includes(key)
          ? selected.filter(k => k !== key)
          : [...selected, key],
      }
      return next
    })
  }

  const handleAddSection = (): void => {
    const nextOrder = draftSections.length + 1
    const newSection: LegalTermsSection = {
      id: `sec-${Date.now()}`,
      heading: `${nextOrder}. Tiêu đề điều khoản`,
      body: '',
      order: nextOrder,
    }
    setDraftSections(prev => [...prev, newSection])
  }

  const handleRemoveSection = (index: number): void => {
    setDraftSections(prev =>
      prev.filter((_, i) => i !== index).map((s, i) => ({ ...s, order: i + 1 }))
    )
  }

  const handleSaveDraft = async (): Promise<void> => {
    const expectedRevision = data?.draft?.draftRevision ?? 1
    setSaving(true)
    setError(null)
    setSuccessMessage(null)
    try {
      await saveLegalTermsDraft({
        title: draftTitle.trim(),
        summary: draftSummary.trim(),
        sections: draftSections.map((s, idx) => ({
          id: s.id.trim() || `sec-${idx + 1}`,
          heading: s.heading.trim(),
          body: s.body.trim(),
          order: idx + 1,
          ...(s.sourceKeys?.length ? { sourceKeys: s.sourceKeys } : {}),
        })),
        expectedRevision,
      })
      await reloadData({ keepMessages: true })
      setSuccessMessage('Đã lưu bản nháp thành công!')
    } catch (err) {
      setError(
        describeTermsError(
          err,
          'Lỗi lưu bản nháp. Có thể do phiên bản đã bị thay đổi.'
        )
      )
      if (readTermsErrorCode(err) === 'TERMS_DRAFT_STALE') {
        await reloadData({ keepMessages: true })
      }
    } finally {
      setSaving(false)
    }
  }

  const runReviewAction = async (
    fn: () => Promise<unknown>,
    success: string,
    onDone?: () => void
  ): Promise<void> => {
    setReviewBusy(true)
    setError(null)
    setSuccessMessage(null)
    try {
      await fn()
      onDone?.()
      await reloadData({ keepMessages: true })
      setSuccessMessage(success)
    } catch (err) {
      setError(describeTermsError(err, 'Thao tác duyệt thất bại.'))
      const code = readTermsErrorCode(err)
      if (
        code === 'TERMS_DRAFT_STALE' ||
        code === 'TERMS_INVALID_REVIEW_STATE'
      ) {
        await reloadData({ keepMessages: true })
      }
    } finally {
      setReviewBusy(false)
    }
  }

  const handleSubmitReview = (): Promise<void> =>
    runReviewAction(
      () => submitTermsForReview(data?.draft?.draftRevision ?? 1),
      'Đã gửi bản nháp chờ duyệt.'
    )

  const handleApprove = (): Promise<void> =>
    runReviewAction(
      () => approveTerms(data?.draft?.draftRevision ?? 1),
      'Đã duyệt bản nháp. Có thể công bố phiên bản mới.'
    )

  const handleRequestChanges = (note: string, success: string): Promise<void> =>
    runReviewAction(
      () => requestTermsChanges(data?.draft?.draftRevision ?? 1, note),
      success,
      () => {
        setShowChangesModal(false)
        setChangesNote('')
      }
    )

  const handlePublish = async (): Promise<void> => {
    const expectedRevision = data?.draft?.draftRevision ?? 1
    if (effectiveMode === 'scheduled' && !scheduledAt) {
      setModalError('Hãy chọn ngày giờ có hiệu lực.')
      return
    }
    setPublishing(true)
    setError(null)
    setModalError(null)
    setSuccessMessage(null)
    try {
      const publishedDoc = await publishLegalTerms({
        expectedRevision,
        ...(effectiveMode === 'scheduled'
          ? { effectiveFrom: new Date(scheduledAt).toISOString() }
          : {}),
      })
      setShowPublishModal(false)
      const wasScheduled = effectiveMode === 'scheduled'
      setEffectiveMode('now')
      setScheduledAt('')
      await reloadData({ keepMessages: true })
      setSuccessMessage(
        wasScheduled
          ? `Đã công bố phiên bản v${publishedDoc.version}, sẽ có hiệu lực theo lịch hẹn.`
          : `Đã công bố phiên bản v${publishedDoc.version} thành công! Mã băm SHA-256 đã được sinh bất biến.`
      )
    } catch (err) {
      const message = describeTermsError(
        err,
        'Lỗi công bố điều khoản. Vui lòng kiểm tra lại xung đột phiên bản.'
      )
      if (readTermsErrorCode(err) === 'TERMS_EFFECTIVE_FROM_INVALID') {
        setModalError(message)
      } else {
        setShowPublishModal(false)
        setError(message)
        if (readTermsErrorCode(err) === 'TERMS_DRAFT_STALE') {
          await reloadData({ keepMessages: true })
        }
      }
    } finally {
      setPublishing(false)
    }
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center p-12 text-muted">
        <Loader2 className="h-6 w-6 animate-spin mr-2" />
        <span>Đang tải thông tin điều khoản dịch vụ…</span>
      </div>
    )
  }

  const published = data?.published
  const scheduled = data?.scheduled ?? null
  const draft = data?.draft
  const reviewStatus: TermsReviewStatus = draft?.reviewStatus ?? 'editing'
  const readOnly = reviewStatus !== 'editing'
  const busy = saving || publishing || reviewBusy
  const isDirty = draft
    ? draftTitle.trim() !== draft.title.trim() ||
      draftSummary.trim() !== draft.summary.trim() ||
      normalizeSections(draftSections) !== normalizeSections(draft.sections)
    : true
  const activeStep = REVIEW_STEPS.findIndex(st => st.status === reviewStatus)
  const now = new Date()
  const minLocal = toLocalInput(now)
  const maxLocal = toLocalInput(
    new Date(now.getFullYear() + 1, now.getMonth(), now.getDate(), 23, 59)
  )

  return (
    <div className="space-y-6">
      {/* Alert Notifications */}
      {error && (
        <div className="flex items-start gap-3 p-4 rounded-xl border border-danger/30 bg-danger/10 text-danger text-sm">
          <AlertCircle className="h-5 w-5 shrink-0 mt-0.5" />
          <div className="flex-1">
            <p className="font-semibold">Đã xảy ra sự cố</p>
            <p className="text-xs mt-0.5">{error}</p>
          </div>
          <button
            onClick={() => void reloadData()}
            type="button"
            className="flex items-center gap-1 text-xs underline font-semibold hover:opacity-80"
          >
            <RefreshCw className="h-3 w-3" /> Tải lại
          </button>
        </div>
      )}

      {successMessage && (
        <div className="flex items-center gap-2 p-4 rounded-xl border border-success/30 bg-success/10 text-success text-sm">
          <CheckCircle2 className="h-5 w-5 shrink-0" />
          <p className="font-medium text-xs">{successMessage}</p>
        </div>
      )}

      {/* ═══ CURRENT PUBLISHED BANNER ═══ */}
      <AdminCard className="p-6 shadow-xs">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-border">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <span className="text-xs font-semibold text-muted uppercase tracking-wider">
                Bản đang công bố chính thức
              </span>
              {published ? (
                <span className="px-2 py-0.5 rounded-full text-xs font-bold bg-success/10 text-success border border-success/30">
                  v{published.version} — Active
                </span>
              ) : (
                <span className="px-2 py-0.5 rounded-full text-xs font-bold bg-warning/10 text-warning border border-warning/30">
                  Chưa công bố
                </span>
              )}
            </div>
            <h2 className="text-lg font-bold text-fg">
              {published?.title || 'Chưa có điều khoản nào được công bố'}
            </h2>
          </div>

          <div className="flex items-center gap-2">
            <a
              href="/terms"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 px-3.5 py-2 text-xs font-semibold rounded-xl border border-border hover:bg-surface-muted text-fg transition-colors"
            >
              <ExternalLink className="h-3.5 w-3.5" />
              Xem trang Public (/terms)
            </a>
          </div>
        </div>

        {published ? (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-4 text-xs">
            <div className="space-y-1">
              <span className="text-muted block">Ngày công bố</span>
              <span className="font-semibold text-fg block">
                {published.publishedAt ? (
                  formatDateTime(published.publishedAt)
                ) : (
                  <span className="italic text-muted">Chưa cập nhật</span>
                )}
              </span>
              {(published.effectiveFrom ?? published.publishedAt) ? (
                <span className="text-muted block">
                  Có hiệu lực từ{' '}
                  {formatDateTime(
                    (published.effectiveFrom ?? published.publishedAt) as string
                  )}
                </span>
              ) : null}
            </div>
            <div className="space-y-1 md:col-span-2">
              <span className="text-muted block">
                Mã băm SHA-256 (Canonical Content Hash)
              </span>
              <div className="flex items-center gap-2 font-mono text-[11px] text-muted bg-surface-muted p-2 rounded-lg break-all">
                <span className="truncate flex-1">{published.contentHash}</span>
                <button
                  type="button"
                  onClick={() => void copyHash(published.contentHash)}
                  aria-label="Sao chép mã băm"
                  className="p-1 rounded hover:bg-surface text-fg shrink-0"
                >
                  <Copy className="h-3.5 w-3.5" />
                </button>
                {copiedHash && (
                  <span className="text-success text-[10px] shrink-0">
                    Đã chép!
                  </span>
                )}
              </div>
            </div>
          </div>
        ) : null}
      </AdminCard>

      {scheduled ? (
        <div className="flex items-start gap-3 p-4 rounded-xl border border-primary/30 bg-primary/10 text-primary text-sm">
          <Clock className="h-5 w-5 shrink-0 mt-0.5" />
          <div className="flex-1 text-xs space-y-1">
            <p className="font-semibold">
              Phiên bản v{scheduled.version} sẽ có hiệu lực từ{' '}
              {formatDateTime(
                (scheduled.effectiveFrom ??
                  scheduled.publishedAt ??
                  '') as string
              )}
            </p>
            <p className="font-mono text-[11px] break-all">
              Mã băm SHA-256: {scheduled.contentHash}
            </p>
          </div>
        </div>
      ) : null}

      {/* ═══ DRAFT EDITOR / PREVIEW ═══ */}
      <AdminCard className="p-6 shadow-xs space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-border">
          <div>
            <div className="flex items-center gap-2">
              <h3 className="text-base font-bold text-fg">
                Soạn thảo bản nháp (Draft Editor)
              </h3>
              <span className="px-2 py-0.5 rounded-full text-xs font-medium bg-primary-soft text-primary border border-primary/20">
                Revision {draft?.draftRevision ?? 1}
              </span>
            </div>
            <p className="text-xs text-muted mt-0.5">
              Cập nhật nội dung dự thảo trước khi công bố phiên bản tiếp theo.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => setPreviewMode(prev => !prev)}
              className="inline-flex items-center gap-1.5 px-3 py-2 text-xs font-semibold rounded-xl border border-border hover:bg-surface-muted text-fg transition-colors"
            >
              <Eye className="h-3.5 w-3.5" />
              {previewMode ? 'Quay lại soạn thảo' : 'Xem trước bản nháp'}
            </button>
            <button
              type="button"
              onClick={() => void handleSaveDraft()}
              disabled={busy || readOnly}
              className="inline-flex items-center gap-1.5 px-4 py-2 text-xs font-semibold rounded-xl bg-primary text-white hover:bg-primary-hover active:scale-[0.98] transition-all disabled:opacity-50"
            >
              {saving ? (
                <Loader2 className="h-3.5 w-3.5 animate-spin" />
              ) : (
                <Save className="h-3.5 w-3.5" />
              )}
              Lưu bản nháp
            </button>
            {reviewStatus === 'editing' ? (
              <button
                type="button"
                onClick={() => void handleSubmitReview()}
                disabled={busy || !draft || isDirty}
                title={
                  isDirty ? 'Hãy lưu bản nháp trước khi gửi duyệt' : undefined
                }
                className="inline-flex items-center gap-1.5 px-4 py-2 text-xs font-semibold rounded-xl border border-primary text-primary hover:bg-primary/10 transition-colors disabled:opacity-50"
              >
                Gửi duyệt
              </button>
            ) : null}
            {reviewStatus === 'in_review' ? (
              <>
                <button
                  type="button"
                  onClick={() => void handleApprove()}
                  disabled={busy}
                  className="inline-flex items-center gap-1.5 px-4 py-2 text-xs font-semibold rounded-xl bg-success text-white hover:opacity-90 transition-all disabled:opacity-50"
                >
                  Duyệt
                </button>
                <button
                  type="button"
                  onClick={() => setShowChangesModal(true)}
                  disabled={busy}
                  className="inline-flex items-center gap-1.5 px-4 py-2 text-xs font-semibold rounded-xl border border-warning text-warning hover:bg-warning/10 transition-colors disabled:opacity-50"
                >
                  Yêu cầu sửa
                </button>
              </>
            ) : null}
            {readOnly ? (
              <button
                type="button"
                onClick={() =>
                  void handleRequestChanges(
                    WITHDRAW_NOTE,
                    'Đã đưa bản nháp về trạng thái soạn thảo.'
                  )
                }
                disabled={busy}
                className="inline-flex items-center gap-1.5 px-3 py-2 text-xs font-semibold rounded-xl border border-border hover:bg-surface-muted text-fg transition-colors disabled:opacity-50"
              >
                Quay lại soạn thảo
              </button>
            ) : null}
            <button
              type="button"
              onClick={() => {
                setModalError(null)
                setShowPublishModal(true)
              }}
              disabled={busy || reviewStatus !== 'approved'}
              title={
                reviewStatus !== 'approved'
                  ? 'Cần được duyệt trước khi công bố'
                  : undefined
              }
              className="inline-flex items-center gap-1.5 px-4 py-2 text-xs font-semibold rounded-xl bg-accent text-white hover:opacity-90 active:scale-[0.98] transition-all disabled:opacity-50"
            >
              <Send className="h-3.5 w-3.5" />
              Công bố phiên bản mới
            </button>
          </div>
        </div>

        {/* Review status bar */}
        <div className="space-y-3" data-testid="terms-review-bar">
          <ol className="flex flex-wrap items-center gap-2 text-xs">
            {REVIEW_STEPS.map((step, idx) => {
              const active = idx === activeStep
              const done = idx < activeStep
              return (
                <li
                  key={step.status}
                  aria-current={active ? 'step' : undefined}
                  className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full border font-semibold ${
                    active
                      ? 'bg-primary text-white border-primary'
                      : done
                        ? 'bg-success/10 text-success border-success/30'
                        : 'bg-bg text-muted border-border'
                  }`}
                >
                  {done ? <CheckCircle2 className="h-3.5 w-3.5" /> : null}
                  {step.label}
                </li>
              )
            })}
          </ol>
          {draft?.submittedAt && reviewStatus !== 'editing' ? (
            <p className="text-[11px] text-muted">
              Gửi duyệt
              {draft.submittedBy
                ? ` bởi ${shortId(draft.submittedBy)}`
                : ''}{' '}
              lúc {formatDateTime(draft.submittedAt)}
            </p>
          ) : null}
          {draft?.reviewedAt && reviewStatus === 'approved' ? (
            <p className="text-[11px] text-muted">
              Duyệt
              {draft.reviewedBy
                ? ` bởi ${shortId(draft.reviewedBy)}`
                : ''} lúc {formatDateTime(draft.reviewedAt)}
            </p>
          ) : null}
          {reviewStatus === 'in_review' ? (
            <p className="text-[11px] text-warning">
              Đang chờ duyệt — chỉnh sửa sẽ đưa bản nháp về trạng thái soạn thảo
            </p>
          ) : null}
          {reviewStatus === 'editing' && draft?.reviewNote ? (
            <div className="rounded-xl border border-warning/40 bg-warning/10 p-3 text-xs text-warning">
              <p className="font-semibold">Yêu cầu sửa: {draft.reviewNote}</p>
              {draft.reviewedBy ? (
                <p className="mt-0.5 text-[11px]">
                  Bởi {shortId(draft.reviewedBy)}
                  {draft.reviewedAt
                    ? ` lúc ${formatDateTime(draft.reviewedAt)}`
                    : ''}
                </p>
              ) : null}
            </div>
          ) : null}
        </div>

        {previewMode ? (
          /* Live Preview Container */
          <div className="rounded-xl border border-border bg-surface-muted/30 p-6 space-y-6">
            <div className="border-b border-border pb-4">
              <span className="text-[11px] font-bold text-accent uppercase tracking-wider">
                Xem trước bản nháp
              </span>
              <h2 className="text-xl font-bold text-fg mt-1">{draftTitle}</h2>
              <p className="text-xs text-muted mt-2 leading-relaxed">
                {draftSummary}
              </p>
            </div>
            <div className="space-y-4">
              {draftSections.map(sec => (
                <AdminCard key={sec.id} className="p-4 space-y-2">
                  <h4 className="text-sm font-bold text-fg">{sec.heading}</h4>
                  <p className="text-xs text-muted leading-relaxed whitespace-pre-wrap">
                    {sec.body}
                  </p>
                  {sec.sourceKeys?.length ? (
                    <div className="flex flex-wrap gap-1.5 pt-1">
                      {sec.sourceKeys.map(key => (
                        <span
                          key={key}
                          className="inline-flex items-center px-2 py-0.5 rounded-full bg-primary/10 text-primary text-[10px] font-semibold"
                        >
                          {legalSources.find(s => s.key === key)?.title ?? key}
                        </span>
                      ))}
                    </div>
                  ) : null}
                </AdminCard>
              ))}
            </div>
          </div>
        ) : (
          /* Draft Editor Form */
          <div className="space-y-5">
            <div>
              <label className="block text-xs font-semibold text-fg mb-1.5">
                Tiêu đề văn bản điều khoản
              </label>
              <input
                type="text"
                value={draftTitle}
                readOnly={readOnly}
                onChange={e => setDraftTitle(e.target.value)}
                placeholder="VD: Điều khoản Dịch vụ Thuê Căn hộ & Quy định Vận hành"
                className="w-full h-10 px-3.5 text-xs rounded-xl border border-border bg-bg text-fg focus:outline-hidden focus:border-primary"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-fg mb-1.5">
                Tóm tắt nội dung quy định
              </label>
              <textarea
                value={draftSummary}
                readOnly={readOnly}
                onChange={e => setDraftSummary(e.target.value)}
                rows={3}
                placeholder="Tóm tắt căn cứ pháp lý và nghĩa vụ cốt lõi của các bên tham gia thuê căn hộ..."
                className="w-full p-3 text-xs rounded-xl border border-border bg-bg text-fg focus:outline-hidden focus:border-primary resize-y"
              />
            </div>

            {/* Sections Management */}
            <div className="space-y-3 pt-2">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-fg">
                  Danh sách các điều khoản ({draftSections.length})
                </span>
                <button
                  type="button"
                  onClick={handleAddSection}
                  disabled={readOnly}
                  className="inline-flex items-center gap-1 px-3 py-1.5 text-xs font-semibold rounded-lg bg-surface-muted hover:bg-surface-raised border border-border text-primary transition-colors disabled:opacity-50"
                >
                  <Plus className="h-3.5 w-3.5" /> Thêm điều khoản
                </button>
              </div>

              <div className="space-y-3">
                {draftSections.map((sec, idx) => (
                  <div
                    key={sec.id}
                    className="p-4 rounded-xl border border-border bg-surface-muted/20 space-y-3"
                  >
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-bold text-muted w-6">
                        #{idx + 1}
                      </span>
                      <input
                        type="text"
                        value={sec.heading}
                        readOnly={readOnly}
                        onChange={e =>
                          handleSectionChange(idx, 'heading', e.target.value)
                        }
                        placeholder="Tiêu đề điều khoản..."
                        className="flex-1 h-9 px-3 text-xs rounded-lg border border-border bg-bg text-fg focus:outline-hidden focus:border-primary font-semibold"
                      />
                      <button
                        type="button"
                        onClick={() => handleRemoveSection(idx)}
                        disabled={readOnly || draftSections.length <= 1}
                        aria-label="Xóa điều khoản"
                        className="p-2 text-danger hover:bg-danger/10 rounded-lg transition-colors disabled:opacity-30"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                    <textarea
                      value={sec.body}
                      readOnly={readOnly}
                      onChange={e =>
                        handleSectionChange(idx, 'body', e.target.value)
                      }
                      rows={4}
                      placeholder="Nội dung chi tiết của điều khoản..."
                      className="w-full p-3 text-xs rounded-lg border border-border bg-bg text-fg focus:outline-hidden focus:border-primary resize-y"
                    />

                    <div className="space-y-1.5">
                      <span className="block text-[11px] font-semibold text-muted">
                        Căn cứ Nguồn pháp lý (tùy chọn)
                      </span>
                      {legalSources.length === 0 ? (
                        <p className="text-[11px] text-muted italic">
                          Chưa tải được danh sách Nguồn pháp lý.
                        </p>
                      ) : (
                        <div className="flex flex-wrap gap-1.5">
                          {legalSources.map(source => {
                            const selected = (sec.sourceKeys ?? []).includes(
                              source.key
                            )
                            return (
                              <button
                                key={source.key}
                                type="button"
                                onClick={() =>
                                  handleToggleSectionSource(idx, source.key)
                                }
                                aria-pressed={selected}
                                disabled={readOnly}
                                className={`px-2 py-1 rounded-full text-[10px] font-semibold border transition-colors ${
                                  selected
                                    ? 'bg-primary text-white border-primary'
                                    : 'bg-bg text-muted border-border hover:border-primary/50'
                                }`}
                              >
                                {source.title}
                              </button>
                            )
                          })}
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </AdminCard>

      {/* ═══ PUBLISH CONFIRMATION MODAL ═══ */}
      {showPublishModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-xs p-4 animate-in fade-in duration-200">
          <AdminCard className="max-w-md w-full p-6 shadow-xl space-y-4">
            <div className="flex items-center gap-3 text-accent">
              <div className="p-2.5 rounded-full bg-accent/10">
                <FileText className="h-6 w-6" />
              </div>
              <div>
                <h3 className="text-base font-bold text-fg">
                  Xác nhận công bố điều khoản
                </h3>
                <p className="text-xs text-muted">
                  Phiên bản mới:{' '}
                  <strong className="text-fg">
                    v{(published?.version ?? 0) + 1}
                  </strong>
                </p>
              </div>
            </div>

            <div className="rounded-xl border border-warning/30 bg-warning/10 p-3.5 text-xs text-warning leading-relaxed space-y-2">
              <p className="font-semibold flex items-center gap-1.5">
                <AlertCircle className="h-4 w-4 shrink-0" />
                Cảnh báo tính bất biến (Immutable Legal Document)
              </p>
              <p>
                Sau khi công bố, hệ thống sẽ tạo mã băm SHA-256 chính thức từ
                toàn bộ nội dung. Phiên bản này{' '}
                {effectiveMode === 'now'
                  ? 'sẽ có hiệu lực ngay lập tức'
                  : 'sẽ có hiệu lực vào thời điểm đã hẹn'}{' '}
                và <strong>không thể chỉnh sửa hoặc xóa</strong> để đảm bảo tính
                toàn vẹn pháp lý với các hồ sơ thuê căn hộ.
              </p>
            </div>

            <fieldset className="space-y-2 text-xs">
              <legend className="font-semibold text-fg mb-1">
                Có hiệu lực từ
              </legend>
              <label className="flex items-center gap-2 text-fg">
                <input
                  type="radio"
                  name="effective-mode"
                  checked={effectiveMode === 'now'}
                  onChange={() => setEffectiveMode('now')}
                />
                Ngay khi công bố
              </label>
              <label className="flex items-center gap-2 text-fg">
                <input
                  type="radio"
                  name="effective-mode"
                  checked={effectiveMode === 'scheduled'}
                  onChange={() => setEffectiveMode('scheduled')}
                />
                Hẹn ngày giờ
              </label>
              {effectiveMode === 'scheduled' ? (
                <div className="space-y-1.5 pl-6">
                  <input
                    type="datetime-local"
                    aria-label="Ngày giờ có hiệu lực"
                    value={scheduledAt}
                    min={minLocal}
                    max={maxLocal}
                    onChange={e => setScheduledAt(e.target.value)}
                    className="h-9 px-3 text-xs rounded-lg border border-border bg-bg text-fg"
                  />
                  <p className="text-[11px] text-warning">
                    Phiên bản hẹn giờ chỉ thay thế phiên bản hiện hành vào đúng
                    thời điểm đã chọn.
                  </p>
                </div>
              ) : null}
              {modalError ? (
                <p role="alert" className="text-[11px] text-danger">
                  {modalError}
                </p>
              ) : null}
            </fieldset>

            <div className="flex items-center justify-end gap-2 pt-2">
              <button
                type="button"
                onClick={() => setShowPublishModal(false)}
                disabled={publishing}
                className="px-4 py-2 text-xs font-semibold rounded-xl border border-border text-fg hover:bg-surface-muted transition-colors"
              >
                Hủy bỏ
              </button>
              <button
                type="button"
                onClick={() => void handlePublish()}
                disabled={publishing}
                className="inline-flex items-center gap-1.5 px-4 py-2 text-xs font-semibold rounded-xl bg-accent text-white hover:opacity-90 transition-all disabled:opacity-50"
              >
                {publishing && <Loader2 className="h-3.5 w-3.5 animate-spin" />}
                {effectiveMode === 'now'
                  ? 'Xác nhận công bố ngay'
                  : 'Xác nhận hẹn công bố'}
              </button>
            </div>
          </AdminCard>
        </div>
      )}

      {showChangesModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
          <AdminCard
            role="dialog"
            aria-label="Yêu cầu sửa bản nháp"
            className="max-w-md w-full p-6 shadow-xl space-y-4"
          >
            <h3 className="text-base font-bold text-fg">
              Yêu cầu sửa bản nháp
            </h3>
            <div>
              <label
                htmlFor="terms-changes-note"
                className="block text-xs font-semibold text-fg mb-1.5"
              >
                Nội dung cần sửa (bắt buộc)
              </label>
              <textarea
                id="terms-changes-note"
                value={changesNote}
                maxLength={1000}
                rows={4}
                onChange={e => setChangesNote(e.target.value)}
                className="w-full p-3 text-xs rounded-xl border border-border bg-bg text-fg resize-y"
              />
            </div>
            <div className="flex items-center justify-end gap-2">
              <button
                type="button"
                onClick={() => setShowChangesModal(false)}
                disabled={reviewBusy}
                className="px-4 py-2 text-xs font-semibold rounded-xl border border-border text-fg hover:bg-surface-muted"
              >
                Hủy
              </button>
              <button
                type="button"
                onClick={() =>
                  void handleRequestChanges(
                    changesNote.trim(),
                    'Đã gửi yêu cầu sửa cho người soạn.'
                  )
                }
                disabled={reviewBusy || !changesNote.trim()}
                className="px-4 py-2 text-xs font-semibold rounded-xl bg-warning text-white disabled:opacity-50"
              >
                Gửi yêu cầu sửa
              </button>
            </div>
          </AdminCard>
        </div>
      )}
    </div>
  )
}
