'use client'

import * as React from 'react'
import {
  Building2,
  ExternalLink,
  FileCheck,
  Scale,
  AlertTriangle,
  Receipt,
  BookOpen,
  RefreshCw,
  CheckCircle2,
  Clock,
  Eye,
  Flame,
  Building,
  Cpu,
} from 'lucide-react'
import {
  getPublicServiceChecklist,
  type PublicServiceChecklist,
} from '../api/contracts-api'
import { getContractPanelSources } from '../api/legal-sources-api'
import type {
  LegalSource,
  LegalSourceIcon,
} from '../model/legal-governance-data'
import { PublicServiceDetailModal } from './public-service-detail-modal'

export interface PublicServiceCitationPanelProps {
  contractId: string
  contractCode?: string
}

const SOURCE_ICONS: Record<
  LegalSourceIcon,
  React.ComponentType<{ className?: string }>
> = {
  residence: Building2,
  tax: Receipt,
  law: Scale,
  decree: FileCheck,
  fire: Flame,
  building: Building,
  digital: Cpu,
}

function itemLabel(id: PublicServiceChecklist['items'][number]['id']): string {
  switch (id) {
    case 'locked-contract-copy':
      return 'Bản hợp đồng đã khóa hash'
    case 'signing-evidence':
      return 'Bằng chứng ký số / lưu vết'
    case 'notarization-or-authentication':
      return 'Công chứng hoặc chứng thực (nếu thỏa thuận)'
  }
}

function statusBadge(
  status: PublicServiceChecklist['items'][number]['status']
) {
  switch (status) {
    case 'available':
      return (
        <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-[var(--success)] bg-[var(--surface-muted)] px-2 py-0.5 rounded-full border border-[var(--border)]">
          <CheckCircle2 className="w-3 h-3" />
          Có sẵn
        </span>
      )
    case 'evidence-present':
      return (
        <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-[var(--primary)] bg-[var(--surface-muted)] px-2 py-0.5 rounded-full border border-[var(--border)]">
          <CheckCircle2 className="w-3 h-3" />
          Đã có bằng chứng
        </span>
      )
    case 'required-before-submission':
      return (
        <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-[var(--warning)] bg-[var(--surface-muted)] px-2 py-0.5 rounded-full border border-[var(--border)]">
          <Clock className="w-3 h-3" />
          Cần hoàn tất trước khi nộp
        </span>
      )
  }
}

type LoadState<T> =
  | { status: 'loading' }
  | { status: 'error'; message: string }
  | { status: 'ready'; data: T }

/** Tải dữ liệu với cờ huỷ khi unmount; `reload` để thử lại */
function useLoad<T>(
  load: () => Promise<T>,
  fallbackError: string
): [LoadState<T>, () => void] {
  const [state, setState] = React.useState<LoadState<T>>({
    status: 'loading',
  })
  const [attempt, setAttempt] = React.useState(0)

  React.useEffect(() => {
    let active = true
    load()
      .then(data => {
        if (active) setState({ status: 'ready', data })
      })
      .catch((err: unknown) => {
        if (active) {
          setState({
            status: 'error',
            message: err instanceof Error ? err.message : fallbackError,
          })
        }
      })
    return () => {
      active = false
    }
  }, [load, fallbackError, attempt])

  const reload = React.useCallback(() => {
    setState({ status: 'loading' })
    setAttempt(n => n + 1)
  }, [])
  return [state, reload]
}

function ProcedureCard({
  source,
  onView,
}: {
  source: LegalSource
  onView: () => void
}): React.ReactElement {
  const Icon = SOURCE_ICONS[source.icon]
  return (
    <div className="p-3 rounded-lg border border-[var(--border)] bg-[var(--surface-muted)] flex flex-col gap-2.5">
      <div className="flex items-start gap-2">
        <Icon className="w-4 h-4 text-[var(--primary)] shrink-0 mt-0.5" />
        <div>
          <span className="inline-block px-1.5 py-0.5 rounded text-[10px] font-mono font-bold bg-[var(--surface)] text-[var(--primary)] border border-[var(--border)] mb-1">
            {source.code}
          </span>
          <h5 className="text-xs font-bold text-[var(--fg)]">{source.title}</h5>
          {source.subtitle && (
            <p className="text-[11px] text-[var(--muted)] mt-0.5">
              {source.subtitle}
            </p>
          )}
        </div>
      </div>
      <div className="flex items-center gap-2">
        <button
          type="button"
          onClick={onView}
          data-testid={`btn-view-source-${source.key}`}
          className="inline-flex items-center justify-center gap-1.5 flex-1 px-3 py-2 text-xs font-semibold rounded-lg border border-[var(--border)] bg-[var(--surface)] text-[var(--fg)] hover:text-[var(--primary)] hover:border-[var(--primary)] transition-colors"
        >
          <Eye className="w-3.5 h-3.5" />
          <span>Xem chi tiết quy trình & hồ sơ</span>
        </button>
        <a
          href={source.externalUrl}
          target="_blank"
          rel="noopener noreferrer"
          data-testid={`link-source-${source.key}`}
          title={`Mở trang ${source.code} trên Cổng DVC Quốc gia`}
          className="inline-flex items-center justify-center p-2 rounded-lg border border-[var(--border)] bg-[var(--surface)] text-[var(--muted)] hover:text-[var(--primary)] hover:border-[var(--primary)] transition-colors"
        >
          <ExternalLink className="w-3.5 h-3.5" />
        </a>
      </div>
    </div>
  )
}

function LegalTextItem({
  source,
  onView,
}: {
  source: LegalSource
  onView: () => void
}): React.ReactElement {
  return (
    <li className="flex items-center justify-between gap-2">
      <button
        type="button"
        onClick={onView}
        data-testid={`btn-view-source-${source.key}`}
        className="inline-flex items-center gap-1 text-[var(--fg)] hover:text-[var(--primary)] transition-colors text-left"
      >
        <FileCheck className="w-3.5 h-3.5 text-[var(--muted)] shrink-0" />
        <span className="underline underline-offset-2">
          {source.title} ({source.code})
        </span>
        <Eye className="w-3 h-3 text-[var(--primary)] ml-1" />
      </button>
      <a
        href={source.externalUrl}
        target="_blank"
        rel="noopener noreferrer"
        data-testid={`link-source-${source.key}`}
        className="text-[var(--muted)] hover:text-[var(--primary)] p-1"
        title="Mở văn bản gốc"
      >
        <ExternalLink className="w-3 h-3" />
      </a>
    </li>
  )
}

export function PublicServiceCitationPanel({
  contractId,
  contractCode,
}: PublicServiceCitationPanelProps): React.ReactElement {
  const loadChecklist = React.useCallback(
    () => getPublicServiceChecklist(contractId, 'temporary-residence'),
    [contractId]
  )
  const [checklistState, reloadChecklist] = useLoad(
    loadChecklist,
    'Không thể tải dữ liệu đối soát dịch vụ công.'
  )
  const [sourcesState, reloadSources] = useLoad(
    getContractPanelSources,
    'Không thể tải nguồn Dịch vụ công & Pháp lý.'
  )
  const [selectedSource, setSelectedSource] =
    React.useState<LegalSource | null>(null)

  const checklist =
    checklistState.status === 'ready' ? checklistState.data : null
  const sources = sourcesState.status === 'ready' ? sourcesState.data : []
  const procedures = sources.filter(s => s.kind === 'procedure')
  const legalTexts = sources.filter(s => s.kind === 'legal_text')
  const isLoading =
    checklistState.status === 'loading' || sourcesState.status === 'loading'

  const handleRefresh = (): void => {
    reloadChecklist()
    reloadSources()
  }

  return (
    <>
      <div
        data-testid="public-service-citation-panel"
        className="rounded-xl border border-[var(--border)] bg-[var(--surface)] p-5 shadow-sm flex flex-col gap-4"
      >
        {/* Header */}
        <div className="flex items-center justify-between border-b border-[var(--border)] pb-3">
          <div className="flex items-center gap-2">
            <Scale className="w-4 h-4 text-[var(--primary)]" />
            <h4 className="text-xs font-bold uppercase tracking-wider text-[var(--fg)]">
              Nguồn Dịch vụ công & Pháp lý
            </h4>
          </div>
          <button
            type="button"
            onClick={handleRefresh}
            disabled={isLoading}
            aria-label="Tải lại nguồn DVC và đối soát hồ sơ"
            className="text-[var(--muted)] hover:text-[var(--primary)] p-1 rounded transition-colors disabled:opacity-50"
          >
            <RefreshCw
              className={`w-3.5 h-3.5 ${isLoading ? 'animate-spin' : ''}`}
            />
          </button>
        </div>

        {/* Admin-managed sources */}
        {sourcesState.status === 'loading' && (
          <div
            data-testid="legal-sources-loading"
            className="text-center py-3 text-xs text-[var(--muted)] flex items-center justify-center gap-2"
          >
            <RefreshCw className="w-3.5 h-3.5 animate-spin text-[var(--primary)]" />
            <span>Đang tải nguồn Dịch vụ công & Pháp lý...</span>
          </div>
        )}

        {sourcesState.status === 'error' && (
          <div
            data-testid="legal-sources-error"
            className="p-2.5 rounded-lg bg-[var(--surface-muted)] border border-[var(--danger)] text-xs text-[var(--danger)] flex items-center justify-between gap-2"
          >
            <span>{sourcesState.message}</span>
            <button
              type="button"
              onClick={reloadSources}
              className="font-semibold underline underline-offset-2"
            >
              Thử lại
            </button>
          </div>
        )}

        {sourcesState.status === 'ready' && sources.length === 0 && (
          <p
            data-testid="legal-sources-empty"
            className="text-xs text-[var(--muted)] text-center py-2"
          >
            Chưa có nguồn Dịch vụ công hoặc văn bản pháp lý nào được cấu hình.
          </p>
        )}

        {procedures.length > 0 && (
          <div className="space-y-3">
            <span className="text-[11px] font-semibold text-[var(--muted)] uppercase tracking-wide">
              Thủ tục Hành chính Trực tuyến
            </span>
            {procedures.map(source => (
              <ProcedureCard
                key={source.key}
                source={source}
                onView={() => setSelectedSource(source)}
              />
            ))}
          </div>
        )}

        {legalTexts.length > 0 && (
          <div className="space-y-2 border-t border-[var(--border)] pt-3">
            <span className="text-[11px] font-semibold text-[var(--muted)] uppercase tracking-wide flex items-center gap-1.5">
              <BookOpen className="w-3.5 h-3.5 text-[var(--primary)]" />
              Căn cứ Pháp luật Việt Nam
            </span>
            <ul className="space-y-1.5 text-xs">
              {legalTexts.map(source => (
                <LegalTextItem
                  key={source.key}
                  source={source}
                  onView={() => setSelectedSource(source)}
                />
              ))}
            </ul>
          </div>
        )}

        {/* Live Contract Checklist Status */}
        <div className="border-t border-[var(--border)] pt-3 space-y-2">
          <span className="text-[11px] font-semibold text-[var(--muted)] uppercase tracking-wide">
            Đối soát hồ sơ hợp đồng hiện tại
          </span>

          {checklistState.status === 'loading' && (
            <div className="text-center py-3 text-xs text-[var(--muted)] flex items-center justify-center gap-2">
              <RefreshCw className="w-3.5 h-3.5 animate-spin text-[var(--primary)]" />
              <span>Đang kiểm tra dữ liệu đối soát...</span>
            </div>
          )}

          {checklistState.status === 'error' && (
            <div className="p-2.5 rounded-lg bg-[var(--surface-muted)] border border-[var(--danger)] text-xs text-[var(--danger)]">
              {checklistState.message}
            </div>
          )}

          {checklist && (
            <ul className="space-y-2 text-xs" data-testid="dvc-checklist-items">
              {checklist.items.map(item => (
                <li
                  key={item.id}
                  className="flex items-center justify-between gap-2 p-2 rounded bg-[var(--surface-muted)] border border-[var(--border)]"
                >
                  <span className="text-[var(--fg)] font-medium">
                    {itemLabel(item.id)}
                  </span>
                  {statusBadge(item.status)}
                </li>
              ))}
            </ul>
          )}
        </div>

        {/* Disclaimer Alert */}
        <div
          data-testid="dvc-disclaimer"
          className="p-3 rounded-lg border border-[var(--border)] bg-[var(--surface-muted)] text-[11px] leading-relaxed text-[var(--muted)] flex items-start gap-2"
        >
          <AlertTriangle className="w-4 h-4 text-[var(--warning)] shrink-0 mt-0.5" />
          <span>
            {checklist?.disclaimer ??
              'Hệ thống hỗ trợ đối soát dữ liệu và trích xuất hồ sơ điện tử; công dân tự thực hiện nộp và nhận kết quả trực tuyến trên Cổng Dịch vụ công Quốc gia theo quy định.'}
          </span>
        </div>
      </div>

      {/* In-app source detail modal */}
      <PublicServiceDetailModal
        source={selectedSource}
        onClose={() => setSelectedSource(null)}
        contractCode={contractCode}
      />
    </>
  )
}
