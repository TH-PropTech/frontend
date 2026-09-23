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
} from 'lucide-react'
import {
  getPublicServiceChecklist,
  type PublicServiceChecklist,
} from '../api/contracts-api'
import {
  PublicServiceDetailModal,
  type PublicServiceProcedureKey,
} from './public-service-detail-modal'

export interface PublicServiceCitationPanelProps {
  contractId: string
  contractCode?: string
}

export const DVC_LINKS = {
  RESIDENCE_1004194: 'https://dichvucong.bocongan.gov.vn/',
  RENTAL_TAX_1007689: 'https://thuedientu.gdt.gov.vn/',
  HOUSING_LAW_2023:
    'https://vanban.chinhphu.vn/default.aspx?pageid=27160&docid=209214',
  DECREE_96_2024:
    'https://vanban.chinhphu.vn/default.aspx?pageid=27160&docid=210747',
  CIVIL_CODE_2015:
    'https://vanban.chinhphu.vn/default.aspx?pageid=27160&docid=183049',
} as const

function itemLabel(id: PublicServiceChecklist['items'][number]['id']): string {
  switch (id) {
    case 'locked-contract-copy':
      return 'Bản hợp đồng đã khóa hash'
    case 'signing-evidence':
      return 'Bằng chứng ký số e-Consent / Sổ cái'
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

export function PublicServiceCitationPanel({
  contractId,
  contractCode,
}: PublicServiceCitationPanelProps): React.ReactElement {
  const [checklist, setChecklist] =
    React.useState<PublicServiceChecklist | null>(null)
  const [loading, setLoading] = React.useState(true)
  const [error, setError] = React.useState<string | null>(null)
  const [selectedProcedure, setSelectedProcedure] =
    React.useState<PublicServiceProcedureKey | null>(null)

  const handleRefresh = React.useCallback(async () => {
    setLoading(true)
    setError(null)
    try {
      const data = await getPublicServiceChecklist(
        contractId,
        'temporary-residence'
      )
      setChecklist(data)
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : 'Không thể tải dữ liệu đối soát dịch vụ công.'
      )
    } finally {
      setLoading(false)
    }
  }, [contractId])

  React.useEffect(() => {
    let active = true
    getPublicServiceChecklist(contractId, 'temporary-residence')
      .then(data => {
        if (active) {
          setChecklist(data)
          setLoading(false)
        }
      })
      .catch((err: unknown) => {
        if (active) {
          setError(
            err instanceof Error
              ? err.message
              : 'Không thể tải dữ liệu đối soát dịch vụ công.'
          )
          setLoading(false)
        }
      })
    return () => {
      active = false
    }
  }, [contractId])

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
            onClick={() => void handleRefresh()}
            disabled={loading}
            aria-label="Tải lại đối soát hồ sơ DVC"
            className="text-[var(--muted)] hover:text-[var(--primary)] p-1 rounded transition-colors disabled:opacity-50"
          >
            <RefreshCw
              className={`w-3.5 h-3.5 ${loading ? 'animate-spin' : ''}`}
            />
          </button>
        </div>

        {/* Direct Action Links for Public Service Procedures */}
        <div className="space-y-3">
          <span className="text-[11px] font-semibold text-[var(--muted)] uppercase tracking-wide">
            Thủ tục Hành chính Trực tuyến
          </span>

          {/* TTHC 1.004194: Đăng ký tạm trú */}
          <div className="p-3 rounded-lg border border-[var(--border)] bg-[var(--surface-muted)] flex flex-col gap-2.5">
            <div className="flex items-start justify-between gap-2">
              <div className="flex items-start gap-2">
                <Building2 className="w-4 h-4 text-[var(--primary)] shrink-0 mt-0.5" />
                <div>
                  <span className="inline-block px-1.5 py-0.5 rounded text-[10px] font-mono font-bold bg-[var(--surface)] text-[var(--primary)] border border-[var(--border)] mb-1">
                    Mã TTHC: 1.004194
                  </span>
                  <h5 className="text-xs font-bold text-[var(--fg)]">
                    Đăng ký Thường trú / Tạm trú tại chỗ ở do thuê
                  </h5>
                  <p className="text-[11px] text-[var(--muted)] mt-0.5">
                    Bộ Công an / Cổng DVC Quốc gia tiếp nhận trực tuyến với hồ
                    sơ hợp đồng thuê nhà hợp pháp{' '}
                    {contractCode ? `(${contractCode})` : ''}.
                  </p>
                </div>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => setSelectedProcedure('1.004194')}
                data-testid="btn-view-procedure-1004194"
                className="inline-flex items-center justify-center gap-1.5 flex-1 px-3 py-2 text-xs font-semibold rounded-lg bg-[var(--primary)] text-white hover:opacity-90 transition-opacity"
              >
                <Eye className="w-3.5 h-3.5" />
                <span>Xem chi tiết quy trình & hồ sơ</span>
              </button>
              <a
                href={DVC_LINKS.RESIDENCE_1004194}
                target="_blank"
                rel="noopener noreferrer"
                data-testid="link-dvc-residence-1004194"
                title="Mở Cổng DVC Quốc gia (Link gốc)"
                className="inline-flex items-center justify-center p-2 rounded-lg border border-[var(--border)] bg-[var(--surface)] text-[var(--muted)] hover:text-[var(--primary)] hover:border-[var(--primary)] transition-colors"
              >
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>

          {/* TTHC 1.007689: Khai thuế cá nhân cho thuê BĐS */}
          <div className="p-3 rounded-lg border border-[var(--border)] bg-[var(--surface-muted)] flex flex-col gap-2.5">
            <div className="flex items-start justify-between gap-2">
              <div className="flex items-start gap-2">
                <Receipt className="w-4 h-4 text-[var(--primary)] shrink-0 mt-0.5" />
                <div>
                  <span className="inline-block px-1.5 py-0.5 rounded text-[10px] font-mono font-bold bg-[var(--surface)] text-[var(--primary)] border border-[var(--border)] mb-1">
                    Mã TTHC: 1.007689
                  </span>
                  <h5 className="text-xs font-bold text-[var(--fg)]">
                    Khai thuế đối với cá nhân cho thuê tài sản
                  </h5>
                  <p className="text-[11px] text-[var(--muted)] mt-0.5">
                    Tổng cục Thuế tiếp nhận hồ sơ lần đầu gồm bản sao hợp đồng
                    và bảng kê doanh thu theo biểu mẫu hiện hành.
                  </p>
                </div>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => setSelectedProcedure('1.007689')}
                data-testid="btn-view-procedure-1007689"
                className="inline-flex items-center justify-center gap-1.5 flex-1 px-3 py-2 text-xs font-semibold rounded-lg border border-[var(--border)] bg-[var(--surface)] text-[var(--fg)] hover:text-[var(--primary)] hover:border-[var(--primary)] transition-colors"
              >
                <Eye className="w-3.5 h-3.5" />
                <span>Xem chi tiết kê khai thuế</span>
              </button>
              <a
                href={DVC_LINKS.RENTAL_TAX_1007689}
                target="_blank"
                rel="noopener noreferrer"
                data-testid="link-dvc-tax-1007689"
                title="Mở Cổng DVC Thuế (Link gốc)"
                className="inline-flex items-center justify-center p-2 rounded-lg border border-[var(--border)] bg-[var(--surface)] text-[var(--muted)] hover:text-[var(--primary)] hover:border-[var(--primary)] transition-colors"
              >
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>
        </div>

        {/* Statutory Legal Foundations */}
        <div className="space-y-2 border-t border-[var(--border)] pt-3">
          <span className="text-[11px] font-semibold text-[var(--muted)] uppercase tracking-wide flex items-center gap-1.5">
            <BookOpen className="w-3.5 h-3.5 text-[var(--primary)]" />
            Căn cứ Pháp luật Việt Nam
          </span>
          <ul className="space-y-1.5 text-xs">
            <li className="flex items-center justify-between gap-2">
              <button
                type="button"
                onClick={() => setSelectedProcedure('housing-law-2023')}
                className="inline-flex items-center gap-1 text-[var(--fg)] hover:text-[var(--primary)] transition-colors text-left"
              >
                <FileCheck className="w-3.5 h-3.5 text-[var(--muted)] shrink-0" />
                <span className="underline underline-offset-2">
                  Luật Nhà ở 27/2023/QH15 (Điều 163, 164)
                </span>
                <Eye className="w-3 h-3 text-[var(--primary)] ml-1" />
              </button>
              <a
                href={DVC_LINKS.HOUSING_LAW_2023}
                target="_blank"
                rel="noopener noreferrer"
                data-testid="link-legal-housing-law"
                className="text-[var(--muted)] hover:text-[var(--primary)] p-1"
                title="Mở văn bản gốc"
              >
                <ExternalLink className="w-3 h-3" />
              </a>
            </li>
            <li className="flex items-center justify-between gap-2">
              <button
                type="button"
                onClick={() => setSelectedProcedure('nd96-2024')}
                className="inline-flex items-center gap-1 text-[var(--fg)] hover:text-[var(--primary)] transition-colors text-left"
              >
                <FileCheck className="w-3.5 h-3.5 text-[var(--muted)] shrink-0" />
                <span className="underline underline-offset-2">
                  Nghị định 96/2024/NĐ-CP (Mẫu Phụ lục II)
                </span>
                <Eye className="w-3 h-3 text-[var(--primary)] ml-1" />
              </button>
              <a
                href={DVC_LINKS.DECREE_96_2024}
                target="_blank"
                rel="noopener noreferrer"
                data-testid="link-legal-decree-96"
                className="text-[var(--muted)] hover:text-[var(--primary)] p-1"
                title="Mở văn bản gốc"
              >
                <ExternalLink className="w-3 h-3" />
              </a>
            </li>
            <li className="flex items-center justify-between gap-2">
              <button
                type="button"
                onClick={() => setSelectedProcedure('civil-code-2015')}
                className="inline-flex items-center gap-1 text-[var(--fg)] hover:text-[var(--primary)] transition-colors text-left"
              >
                <FileCheck className="w-3.5 h-3.5 text-[var(--muted)] shrink-0" />
                <span className="underline underline-offset-2">
                  Bộ luật Dân sự 2015 (Điều 328, 472)
                </span>
                <Eye className="w-3 h-3 text-[var(--primary)] ml-1" />
              </button>
              <a
                href={DVC_LINKS.CIVIL_CODE_2015}
                target="_blank"
                rel="noopener noreferrer"
                data-testid="link-legal-civil-code"
                className="text-[var(--muted)] hover:text-[var(--primary)] p-1"
                title="Mở văn bản gốc"
              >
                <ExternalLink className="w-3 h-3" />
              </a>
            </li>
          </ul>
        </div>

        {/* Live Contract Checklist Status */}
        <div className="border-t border-[var(--border)] pt-3 space-y-2">
          <span className="text-[11px] font-semibold text-[var(--muted)] uppercase tracking-wide">
            Đối soát hồ sơ hợp đồng hiện tại
          </span>

          {loading && (
            <div className="text-center py-3 text-xs text-[var(--muted)] flex items-center justify-center gap-2">
              <RefreshCw className="w-3.5 h-3.5 animate-spin text-[var(--primary)]" />
              <span>Đang kiểm tra dữ liệu đối soát...</span>
            </div>
          )}

          {error && (
            <div className="p-2.5 rounded-lg bg-[var(--surface-muted)] border border-[var(--danger)] text-xs text-[var(--danger)]">
              {error}
            </div>
          )}

          {checklist && !loading && (
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

      {/* In-app procedure detail modal */}
      <PublicServiceDetailModal
        procedureKey={selectedProcedure}
        onClose={() => setSelectedProcedure(null)}
        contractCode={contractCode}
      />
    </>
  )
}
