'use client'

import * as React from 'react'
import {
  AlertTriangle,
  CheckCircle2,
  ChevronDown,
  ChevronUp,
  History,
  RotateCcw,
  Send,
} from 'lucide-react'
import {
  SAMPLE_TEMPLATE_VALUES,
  buildReleasePayload,
  clauseChange,
  countChangedClauses,
  findUnknownVariables,
  getContractTemplateAudits,
  getPublishedContractTemplate,
  publishContractTemplateRelease,
  renderTemplatePreview,
  validateEdits,
  type ClauseEdit,
  type ContractTemplateAuditDto,
  type ContractTemplateDto,
} from '@/features/contracts'
import { OptionSelect } from '@/shared/ui/option-select'
import { Input } from '@/shared/ui/input'
import { Textarea } from '@/shared/ui/textarea'

const TEMPLATE_OPTIONS = [
  {
    value: 'VN_INDIVIDUAL_RESIDENTIAL_LEASE',
    label: 'Cá nhân cho thuê căn hộ (VN_INDIVIDUAL_RESIDENTIAL_LEASE)',
  },
  {
    value: 'VN_RE_BUSINESS_ND96_APPENDIX_II',
    label: 'Kinh doanh bất động sản (VN_RE_BUSINESS_ND96_APPENDIX_II)',
  },
] as const

type Notice = { type: 'success' | 'error'; text: string }

function errorText(cause: unknown, fallback: string): string {
  return cause instanceof Error ? cause.message : fallback
}

function shortHash(hash?: string | null): string {
  if (!hash) return '—'
  return hash.length > 16 ? `${hash.slice(0, 8)}…${hash.slice(-8)}` : hash
}

function formatWhen(value?: string | null): string {
  if (!value) return '—'
  const date = new Date(value)
  return Number.isNaN(date.getTime())
    ? '—'
    : date.toLocaleString('vi-VN', { hour12: false })
}

export function ContractTemplatesAdminTab(): React.ReactElement {
  const [templateKey, setTemplateKey] = React.useState<string>(
    TEMPLATE_OPTIONS[0].value
  )
  const [template, setTemplate] = React.useState<ContractTemplateDto | null>(
    null
  )
  const [audits, setAudits] = React.useState<ContractTemplateAuditDto[]>([])
  const [loading, setLoading] = React.useState(true)
  const [loadError, setLoadError] = React.useState<string | null>(null)
  const [edits, setEdits] = React.useState<Record<number, ClauseEdit>>({})
  const [openClause, setOpenClause] = React.useState<number | null>(null)
  const [showPreview, setShowPreview] = React.useState<Record<number, boolean>>(
    {}
  )
  const [reviewReference, setReviewReference] = React.useState('')
  const [confirming, setConfirming] = React.useState(false)
  const [publishing, setPublishing] = React.useState(false)
  const [notice, setNotice] = React.useState<Notice | null>(null)
  const [reloadKey, setReloadKey] = React.useState(0)

  React.useEffect(() => {
    let active = true
    /* eslint-disable react-hooks/set-state-in-effect */
    setLoading(true)
    setLoadError(null)
    setEdits({})
    setConfirming(false)
    /* eslint-enable react-hooks/set-state-in-effect */
    Promise.all([
      getPublishedContractTemplate(templateKey),
      getContractTemplateAudits(templateKey).catch(() => []),
    ])
      .then(([published, history]) => {
        if (!active) return
        setTemplate(published)
        setAudits(history)
      })
      .catch((cause: unknown) => {
        if (!active) return
        setTemplate(null)
        setLoadError(errorText(cause, 'Không tải được mẫu hợp đồng.'))
      })
      .finally(() => {
        if (active) setLoading(false)
      })
    return () => {
      active = false
    }
  }, [templateKey, reloadKey])

  const changed = template ? countChangedClauses(template, edits) : 0
  const problems = template ? validateEdits(template, edits) : []
  const canPublish =
    changed > 0 &&
    problems.length === 0 &&
    reviewReference.trim().length > 0 &&
    !publishing

  const setEdit = (
    number: number,
    patch: Partial<ClauseEdit>,
    base: ClauseEdit
  ): void => {
    setEdits(current => ({
      ...current,
      [number]: { ...base, ...current[number], ...patch },
    }))
    setConfirming(false)
  }

  const handlePublish = async (): Promise<void> => {
    if (!template || !canPublish) return
    setPublishing(true)
    setNotice(null)
    try {
      const released = await publishContractTemplateRelease(
        templateKey,
        buildReleasePayload(template, edits, reviewReference)
      )
      setNotice({
        type: 'success',
        text: `Đã phát hành phiên bản ${released.version}. Hợp đồng mới sẽ dùng phiên bản này; hợp đồng đã khóa giữ nguyên.`,
      })
      setReviewReference('')
      setReloadKey(value => value + 1)
    } catch (cause: unknown) {
      setNotice({
        type: 'error',
        text: errorText(cause, 'Không thể phát hành phiên bản mới.'),
      })
    } finally {
      setPublishing(false)
      setConfirming(false)
    }
  }

  const pendingReview = Boolean(
    template?.reviewReference && /PENDING|DRAFT/i.test(template.reviewReference)
  )

  return (
    <div className="space-y-5" data-testid="contract-templates-admin-tab">
      <section className="rounded-xl border border-border bg-surface p-5 shadow-2xs">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div className="sm:w-96">
            <OptionSelect
              label="Mẫu hợp đồng"
              value={templateKey}
              onChange={setTemplateKey}
              options={TEMPLATE_OPTIONS}
              data-testid="template-key-select"
            />
          </div>
          {template ? (
            <dl className="flex flex-wrap gap-x-5 gap-y-1 text-xs">
              <div>
                <dt className="text-muted">Phiên bản đang dùng</dt>
                <dd
                  className="font-bold text-fg"
                  data-testid="template-version"
                >
                  v{template.version}
                </dd>
              </div>
              <div>
                <dt className="text-muted">Phát hành</dt>
                <dd className="font-semibold text-fg">
                  {formatWhen(template.publishedAt)}
                </dd>
              </div>
              <div>
                <dt className="text-muted">Mã băm nội dung</dt>
                <dd className="font-mono text-fg">
                  {shortHash(template.contentHash)}
                </dd>
              </div>
              <div>
                <dt className="text-muted">Tham chiếu thẩm định</dt>
                <dd className="font-semibold text-fg">
                  {template.reviewReference ?? '—'}
                </dd>
              </div>
            </dl>
          ) : null}
        </div>

        {pendingReview ? (
          <p
            role="status"
            data-testid="template-review-warning"
            className="mt-4 flex items-start gap-2 rounded-lg border border-warning bg-surface-muted p-3 text-xs text-fg"
          >
            <AlertTriangle className="mt-0.5 h-4 w-4 shrink-0 text-warning" />
            Phiên bản này đang ở trạng thái bản nháp chờ luật sư thẩm định. Hãy
            cho người có chuyên môn pháp lý rà soát và phát hành bản mới kèm mã
            tham chiếu thẩm định trước khi dùng cho giao dịch thật.
          </p>
        ) : null}
        <p className="mt-3 text-[11px] leading-relaxed text-muted">
          Mọi điều khoản là nội dung pháp lý được bảo vệ: chỉnh sửa tạo ra một
          phiên bản mới kèm mã tham chiếu thẩm định. Phiên bản cũ và các hợp
          đồng đã khóa giữ nguyên nội dung đã ký.
        </p>
      </section>

      {notice ? (
        <p
          role={notice.type === 'error' ? 'alert' : 'status'}
          className={`rounded-lg border p-3 text-xs ${
            notice.type === 'error'
              ? 'border-danger text-danger'
              : 'border-success text-success'
          }`}
        >
          {notice.text}
        </p>
      ) : null}

      {loading ? (
        <p className="text-xs text-muted" role="status">
          Đang tải mẫu hợp đồng...
        </p>
      ) : null}
      {loadError ? (
        <p role="alert" className="text-xs text-danger">
          {loadError}
        </p>
      ) : null}

      {template ? (
        <section className="space-y-2" aria-label="Các điều khoản của mẫu">
          {template.clauses.map(clause => {
            const edit = edits[clause.number]
            const base: ClauseEdit = {
              heading: clause.heading,
              content: clause.content ?? '',
            }
            const current = { ...base, ...edit }
            const isOpen = openClause === clause.number
            const isEdited = clauseChange(clause, edit) === 'edited'
            const unknown = findUnknownVariables(
              current.content,
              template.allowedVariables
            )
            return (
              <article
                key={clause.number}
                data-testid={`clause-${clause.number}`}
                className="rounded-xl border border-border bg-surface shadow-2xs"
              >
                <button
                  type="button"
                  aria-expanded={isOpen}
                  onClick={() => setOpenClause(isOpen ? null : clause.number)}
                  className="flex w-full items-center justify-between gap-3 px-4 py-3 text-left"
                >
                  <span className="text-sm font-bold text-fg">
                    Điều {clause.number}. {current.heading}
                  </span>
                  <span className="flex items-center gap-2">
                    {isEdited ? (
                      <span
                        data-testid={`clause-${clause.number}-edited`}
                        className="rounded-full border border-primary bg-primary-soft px-2 py-0.5 text-[10px] font-bold text-primary"
                      >
                        Đã sửa
                      </span>
                    ) : null}
                    {isOpen ? (
                      <ChevronUp className="h-4 w-4 text-muted" />
                    ) : (
                      <ChevronDown className="h-4 w-4 text-muted" />
                    )}
                  </span>
                </button>

                {isOpen ? (
                  <div className="space-y-3 border-t border-border p-4">
                    <Input
                      label="Tiêu đề điều khoản"
                      value={current.heading}
                      onChange={event =>
                        setEdit(
                          clause.number,
                          { heading: event.target.value },
                          base
                        )
                      }
                    />
                    <div className="space-y-1">
                      <label
                        htmlFor={`clause-content-${clause.number}`}
                        className="text-xs font-medium text-fg"
                      >
                        Nội dung (mỗi dòng là một đoạn; dòng bắt đầu bằng khoảng
                        trắng là mục con)
                      </label>
                      <Textarea
                        id={`clause-content-${clause.number}`}
                        rows={12}
                        value={current.content}
                        onChange={event =>
                          setEdit(
                            clause.number,
                            { content: event.target.value },
                            base
                          )
                        }
                        className="font-mono text-xs leading-relaxed"
                      />
                    </div>

                    <div>
                      <p className="mb-1 text-[11px] font-semibold text-muted">
                        Chèn biến (bấm để thêm vào cuối nội dung)
                      </p>
                      <div className="flex flex-wrap gap-1.5">
                        {template.allowedVariables.map(name => (
                          <button
                            key={name}
                            type="button"
                            onClick={() =>
                              setEdit(
                                clause.number,
                                {
                                  content: `${current.content}{{${name}}}`,
                                },
                                base
                              )
                            }
                            className="rounded-md border border-border bg-surface-muted px-2 py-0.5 font-mono text-[10px] text-fg hover:border-primary"
                          >
                            {`{{${name}}}`}
                          </button>
                        ))}
                      </div>
                    </div>

                    {unknown.length > 0 ? (
                      <p
                        role="alert"
                        className="flex items-start gap-2 text-xs text-danger"
                      >
                        <AlertTriangle className="mt-0.5 h-3.5 w-3.5 shrink-0" />
                        Biến không được phép:{' '}
                        {unknown.map(name => `{{${name}}}`).join(', ')}
                      </p>
                    ) : null}

                    <div className="flex flex-wrap gap-2">
                      <button
                        type="button"
                        onClick={() =>
                          setShowPreview(state => ({
                            ...state,
                            [clause.number]: !state[clause.number],
                          }))
                        }
                        className="rounded-lg border border-border px-3 py-1.5 text-xs font-bold text-fg hover:border-primary"
                      >
                        {showPreview[clause.number]
                          ? 'Ẩn xem trước'
                          : 'Xem trước với dữ liệu mẫu'}
                      </button>
                      {isEdited ? (
                        <button
                          type="button"
                          onClick={() =>
                            setEdits(state => {
                              const next = { ...state }
                              delete next[clause.number]
                              return next
                            })
                          }
                          className="inline-flex items-center gap-1.5 rounded-lg border border-border px-3 py-1.5 text-xs font-bold text-fg hover:border-primary"
                        >
                          <RotateCcw className="h-3.5 w-3.5" />
                          Hoàn tác điều này
                        </button>
                      ) : null}
                    </div>

                    {showPreview[clause.number] ? (
                      <div
                        data-testid={`clause-${clause.number}-preview`}
                        className="whitespace-pre-wrap rounded-lg border border-dashed border-border bg-surface-muted p-3 text-xs leading-relaxed text-fg"
                      >
                        {renderTemplatePreview(
                          current.content,
                          SAMPLE_TEMPLATE_VALUES
                        )}
                      </div>
                    ) : null}
                  </div>
                ) : null}
              </article>
            )
          })}
        </section>
      ) : null}

      {template ? (
        <section
          className="space-y-3 rounded-xl border border-border bg-surface p-5 shadow-2xs"
          aria-label="Phát hành phiên bản mới"
        >
          <h3 className="text-sm font-bold text-fg">Phát hành phiên bản mới</h3>
          <p className="text-xs text-muted" data-testid="changed-count">
            {changed > 0
              ? `${changed} điều khoản đã sửa so với v${template.version}.`
              : 'Chưa có thay đổi nào để phát hành.'}
          </p>
          {problems.length > 0 ? (
            <ul role="alert" className="list-disc pl-5 text-xs text-danger">
              {problems.map(problem => (
                <li key={problem}>{problem}</li>
              ))}
            </ul>
          ) : null}
          <Input
            label="Mã tham chiếu thẩm định pháp lý (bắt buộc)"
            placeholder="Ví dụ: LUATSU-2026-10-HD-THUE"
            value={reviewReference}
            onChange={event => {
              setReviewReference(event.target.value)
              setConfirming(false)
            }}
          />
          {confirming ? (
            <div className="flex flex-wrap items-center gap-3">
              <p className="text-xs font-semibold text-fg">
                Phát hành tạo phiên bản v{template.version + 1}. Xác nhận?
              </p>
              <button
                type="button"
                disabled={!canPublish}
                onClick={() => void handlePublish()}
                className="inline-flex items-center gap-2 rounded-lg bg-primary px-4 py-2 text-xs font-bold text-white disabled:opacity-50"
              >
                <CheckCircle2 className="h-4 w-4" />
                {publishing ? 'Đang phát hành...' : 'Xác nhận phát hành'}
              </button>
              <button
                type="button"
                onClick={() => setConfirming(false)}
                className="rounded-lg border border-border px-4 py-2 text-xs font-bold text-fg"
              >
                Hủy
              </button>
            </div>
          ) : (
            <button
              type="button"
              disabled={!canPublish}
              onClick={() => setConfirming(true)}
              className="inline-flex items-center gap-2 rounded-lg bg-primary px-4 py-2 text-xs font-bold text-white disabled:opacity-50"
            >
              <Send className="h-4 w-4" />
              Phát hành phiên bản mới
            </button>
          )}
        </section>
      ) : null}

      {audits.length > 0 ? (
        <section className="rounded-xl border border-border bg-surface p-5 shadow-2xs">
          <h3 className="flex items-center gap-2 text-sm font-bold text-fg">
            <History className="h-4 w-4" />
            Lịch sử phát hành
          </h3>
          <ul className="mt-3 space-y-2" data-testid="template-audits">
            {audits.slice(0, 10).map((audit, index) => (
              <li
                key={audit.id ?? `${audit.version}-${audit.action}-${index}`}
                className="rounded-lg border border-border bg-surface-muted p-3 text-xs"
              >
                <div className="flex flex-wrap justify-between gap-2 font-semibold text-fg">
                  <span>
                    v{audit.version} · {audit.action}
                  </span>
                  <span className="text-muted">
                    {formatWhen(audit.createdAt)}
                  </span>
                </div>
                {audit.reviewReference ? (
                  <p className="mt-1 text-muted">
                    Tham chiếu: {audit.reviewReference}
                  </p>
                ) : null}
                {audit.reason ? (
                  <p className="text-muted">Lý do: {audit.reason}</p>
                ) : null}
              </li>
            ))}
          </ul>
        </section>
      ) : null}
    </div>
  )
}
