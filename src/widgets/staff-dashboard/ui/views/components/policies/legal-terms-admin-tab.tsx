'use client'

import * as React from 'react'
import {
  AlertCircle,
  CheckCircle2,
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
  getAdminLegalTermsState,
  publishLegalTerms,
  saveLegalTermsDraft,
  type AdminLegalTermsStateResponse,
  type LegalTermsSection,
} from '@/features/legal-terms/api/legal-terms-api'

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
  const [successMessage, setSuccessMessage] = React.useState<string | null>(
    null
  )

  // Draft editable state
  const [draftTitle, setDraftTitle] = React.useState('')
  const [draftSummary, setDraftSummary] = React.useState('')
  const [draftSections, setDraftSections] = React.useState<LegalTermsSection[]>(
    []
  )

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
          }))
        )
      }
    },
    []
  )

  const reloadData = React.useCallback(async () => {
    setLoading(true)
    setError(null)
    setSuccessMessage(null)
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
  }, [applyLoadedData])

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
        id: current.id,
        heading: field === 'heading' ? val : current.heading,
        body: field === 'body' ? val : current.body,
        order: current.order,
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
        })),
        expectedRevision,
      })
      setSuccessMessage('Đã lưu bản nháp thành công!')
      await reloadData()
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : 'Lỗi lưu bản nháp. Có thể do phiên bản đã bị thay đổi.'
      )
    } finally {
      setSaving(false)
    }
  }

  const handlePublish = async (): Promise<void> => {
    const expectedRevision = data?.draft?.draftRevision ?? 1
    setPublishing(true)
    setError(null)
    setSuccessMessage(null)
    try {
      const publishedDoc = await publishLegalTerms({ expectedRevision })
      setShowPublishModal(false)
      setSuccessMessage(
        `Đã công bố phiên bản v${publishedDoc.version} thành công! Mã băm SHA-256 đã được sinh bất biến.`
      )
      await reloadData()
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : 'Lỗi công bố điều khoản. Vui lòng kiểm tra lại xung đột phiên bản.'
      )
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
  const draft = data?.draft

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
      <div className="rounded-2xl border border-border bg-surface p-6 shadow-xs">
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
                {published.publishedAt
                  ? new Date(published.publishedAt).toLocaleString('vi-VN')
                  : 'N/A'}
              </span>
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
      </div>

      {/* ═══ DRAFT EDITOR / PREVIEW ═══ */}
      <div className="rounded-2xl border border-border bg-surface p-6 shadow-xs space-y-6">
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
              disabled={saving || publishing}
              className="inline-flex items-center gap-1.5 px-4 py-2 text-xs font-semibold rounded-xl bg-primary text-white hover:bg-primary-hover active:scale-[0.98] transition-all disabled:opacity-50"
            >
              {saving ? (
                <Loader2 className="h-3.5 w-3.5 animate-spin" />
              ) : (
                <Save className="h-3.5 w-3.5" />
              )}
              Lưu bản nháp
            </button>
            <button
              type="button"
              onClick={() => setShowPublishModal(true)}
              disabled={saving || publishing}
              className="inline-flex items-center gap-1.5 px-4 py-2 text-xs font-semibold rounded-xl bg-accent text-white hover:opacity-90 active:scale-[0.98] transition-all disabled:opacity-50"
            >
              <Send className="h-3.5 w-3.5" />
              Công bố phiên bản mới
            </button>
          </div>
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
                <div
                  key={sec.id}
                  className="p-4 rounded-xl border border-border bg-surface space-y-2"
                >
                  <h4 className="text-sm font-bold text-fg">{sec.heading}</h4>
                  <p className="text-xs text-muted leading-relaxed whitespace-pre-wrap">
                    {sec.body}
                  </p>
                </div>
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
                  className="inline-flex items-center gap-1 px-3 py-1.5 text-xs font-semibold rounded-lg bg-surface-muted hover:bg-surface-raised border border-border text-primary transition-colors"
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
                        onChange={e =>
                          handleSectionChange(idx, 'heading', e.target.value)
                        }
                        placeholder="Tiêu đề điều khoản..."
                        className="flex-1 h-9 px-3 text-xs rounded-lg border border-border bg-bg text-fg focus:outline-hidden focus:border-primary font-semibold"
                      />
                      <button
                        type="button"
                        onClick={() => handleRemoveSection(idx)}
                        disabled={draftSections.length <= 1}
                        aria-label="Xóa điều khoản"
                        className="p-2 text-danger hover:bg-danger/10 rounded-lg transition-colors disabled:opacity-30"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                    <textarea
                      value={sec.body}
                      onChange={e =>
                        handleSectionChange(idx, 'body', e.target.value)
                      }
                      rows={4}
                      placeholder="Nội dung chi tiết của điều khoản..."
                      className="w-full p-3 text-xs rounded-lg border border-border bg-bg text-fg focus:outline-hidden focus:border-primary resize-y"
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>

      {/* ═══ PUBLISH CONFIRMATION MODAL ═══ */}
      {showPublishModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-xs p-4 animate-in fade-in duration-200">
          <div className="max-w-md w-full rounded-2xl bg-surface border border-border p-6 shadow-xl space-y-4">
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
                toàn bộ nội dung. Phiên bản này sẽ có hiệu lực ngay lập tức và{' '}
                <strong>không thể chỉnh sửa hoặc xóa</strong> để đảm bảo tính
                toàn vẹn pháp lý với các hồ sơ thuê căn hộ.
              </p>
            </div>

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
                Xác nhận công bố ngay
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
