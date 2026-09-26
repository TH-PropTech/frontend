'use client'

import * as React from 'react'
import {
  X,
  Building2,
  Receipt,
  FileCheck,
  Scale,
  Clock,
  ExternalLink,
  ShieldCheck,
  CheckCircle2,
  FileText,
  AlertCircle,
  HelpCircle,
  Flame,
  Building,
  Cpu,
} from 'lucide-react'
import type { LegalSource } from '../model/legal-governance-data'

export interface PublicServiceDetailModalProps {
  /** Nguồn pháp lý/DVC cần hiển thị; `null` để đóng modal */
  source: LegalSource | null
  onClose: () => void
  contractCode?: string | undefined
}

export function PublicServiceDetailModal({
  source: data,
  onClose,
  contractCode,
}: PublicServiceDetailModalProps): React.ReactElement | null {
  if (!data) return null

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="dvc-modal-title"
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4 backdrop-blur-sm animate-in fade-in duration-200"
      onClick={onClose}
    >
      <div
        className="relative flex max-h-[90vh] w-full max-w-3xl flex-col rounded-2xl border border-[var(--border)] bg-[var(--surface)] shadow-2xl overflow-hidden"
        onClick={e => e.stopPropagation()}
      >
        {/* Modal Header */}
        <div className="flex items-start justify-between border-b border-[var(--border)] bg-[var(--surface-muted)] px-6 py-4">
          <div className="flex items-start gap-3">
            <div className="mt-1 flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-[var(--primary-soft)] text-[var(--primary)] border border-[var(--border)]">
              {data.icon === 'residence' && <Building2 className="h-5 w-5" />}
              {data.icon === 'tax' && <Receipt className="h-5 w-5" />}
              {data.icon === 'decree' && <FileCheck className="h-5 w-5" />}
              {data.icon === 'law' && <Scale className="h-5 w-5" />}
              {data.icon === 'fire' && (
                <Flame className="h-5 w-5 text-[var(--danger)]" />
              )}
              {data.icon === 'building' && <Building className="h-5 w-5" />}
              {data.icon === 'digital' && (
                <Cpu className="h-5 w-5 text-[var(--accent)]" />
              )}
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="inline-block px-2 py-0.5 rounded text-[11px] font-mono font-bold bg-[var(--surface)] text-[var(--primary)] border border-[var(--border)]">
                  {data.code}
                </span>
                {contractCode && (
                  <span className="text-[11px] text-[var(--muted)]">
                    Áp dụng cho HĐ:{' '}
                    <strong className="text-[var(--fg)]">{contractCode}</strong>
                  </span>
                )}
              </div>
              <h3
                id="dvc-modal-title"
                className="mt-1 text-base font-bold text-[var(--fg)] leading-snug"
              >
                {data.title}
              </h3>
              <p className="text-xs text-[var(--muted)]">{data.subtitle}</p>
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label="Đóng cửa sổ"
            className="rounded-lg p-1.5 text-[var(--muted)] hover:bg-[var(--surface)] hover:text-[var(--fg)] transition-colors"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Modal Body (Scrollable) */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6 text-xs text-[var(--fg)]">
          {/* Overview Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3 p-4 rounded-xl border border-[var(--border)] bg-[var(--surface-muted)]">
            <div>
              <span className="text-[11px] font-semibold text-[var(--muted)] block mb-0.5">
                Cơ quan tiếp nhận:
              </span>
              <p className="font-semibold text-[var(--fg)]">{data.agency}</p>
            </div>
            <div>
              <span className="text-[11px] font-semibold text-[var(--muted)] block mb-0.5">
                Thời hạn giải quyết:
              </span>
              <p className="font-semibold text-[var(--success)] flex items-center gap-1">
                <Clock className="w-3.5 h-3.5" />
                {data.duration}
              </p>
            </div>
            <div>
              <span className="text-[11px] font-semibold text-[var(--muted)] block mb-0.5">
                Lệ phí thủ tục:
              </span>
              <p className="font-semibold text-[var(--fg)]">{data.fee}</p>
            </div>
          </div>

          {/* Description */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-[var(--primary)] flex items-center gap-1.5 mb-2">
              <HelpCircle className="w-4 h-4" />
              Tổng quan nghiệp vụ
            </h4>
            <p className="leading-relaxed text-[var(--muted)] bg-[var(--surface)] p-3 rounded-lg border border-[var(--border)]">
              {data.description}
            </p>
          </div>

          {/* Dossier Items (Hồ sơ cần nộp) */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-[var(--primary)] flex items-center gap-1.5 mb-2">
              <FileText className="w-4 h-4" />
              Thành phần hồ sơ cần chuẩn bị
            </h4>
            <div className="space-y-2">
              {data.dossierItems.map((item, idx) => (
                <div
                  key={idx}
                  className="flex items-start gap-3 p-3 rounded-lg border border-[var(--border)] bg-[var(--surface)]"
                >
                  <div className="mt-0.5">
                    {item.isPropTechExport ? (
                      <ShieldCheck className="w-4 h-4 text-[var(--success)]" />
                    ) : (
                      <CheckCircle2 className="w-4 h-4 text-[var(--primary)]" />
                    )}
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      <h5 className="font-bold text-[var(--fg)]">
                        {item.title}
                      </h5>
                      {item.isPropTechExport && (
                        <span className="px-1.5 py-0.5 rounded text-[10px] font-bold bg-[var(--success)] text-white">
                          Có sẵn từ TH-PropTech
                        </span>
                      )}
                    </div>
                    <p className="mt-0.5 text-[11px] text-[var(--muted)] leading-relaxed">
                      {item.detail}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Steps (Trình tự các bước) */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-[var(--primary)] flex items-center gap-1.5 mb-2">
              <CheckCircle2 className="w-4 h-4" />
              Trình tự các bước thực hiện
            </h4>
            <div className="space-y-2.5">
              {data.steps.map(s => (
                <div
                  key={s.step}
                  className="flex items-start gap-3 p-3 rounded-lg border border-[var(--border)] bg-[var(--surface-muted)]"
                >
                  <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-[var(--primary)] text-white text-[11px] font-bold">
                    {s.step}
                  </span>
                  <div className="flex-1">
                    <h5 className="font-bold text-[var(--fg)]">{s.title}</h5>
                    <p className="mt-0.5 text-[11px] text-[var(--muted)] leading-relaxed">
                      {s.detail}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Legal Grounds */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-[var(--primary)] flex items-center gap-1.5 mb-2">
              <Scale className="w-4 h-4" />
              Căn cứ Pháp luật Việt Nam
            </h4>
            <ul className="space-y-1.5">
              {data.legalGrounds.map((lg, idx) => (
                <li
                  key={idx}
                  className="p-2.5 rounded-lg border border-[var(--border)] bg-[var(--surface)] flex items-start justify-between gap-2"
                >
                  <div>
                    <span className="font-bold text-[var(--fg)] block">
                      {lg.title}
                    </span>
                    <span className="text-[11px] text-[var(--muted)]">
                      {lg.article}
                    </span>
                  </div>
                  {lg.url && (
                    <a
                      href={lg.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      data-testid={`link-legal-ground-${idx}`}
                      title="Mở văn bản gốc"
                      className="p-1 text-[var(--muted)] hover:text-[var(--primary)]"
                    >
                      <ExternalLink className="h-3.5 w-3.5" />
                    </a>
                  )}
                </li>
              ))}
            </ul>
          </div>

          {/* Notes Alert */}
          {data.notes.length > 0 && (
            <div className="p-3.5 rounded-xl border border-[var(--border)] bg-[var(--surface-muted)] flex items-start gap-2.5">
              <AlertCircle className="w-4 h-4 text-[var(--warning)] shrink-0 mt-0.5" />
              <div className="space-y-1 text-[11px] text-[var(--muted)]">
                <span className="font-bold text-[var(--fg)] block">
                  Lưu ý quan trọng:
                </span>
                <ul className="list-disc list-inside space-y-0.5">
                  {data.notes.map((note, idx) => (
                    <li key={idx}>{note}</li>
                  ))}
                </ul>
              </div>
            </div>
          )}
        </div>

        {/* Modal Footer */}
        <div className="flex flex-wrap items-center justify-between gap-3 border-t border-[var(--border)] bg-[var(--surface-muted)] px-6 py-4">
          <p className="text-[11px] text-[var(--muted)]">
            Hệ thống TH-PropTech cung cấp hồ sơ điện tử đối soát theo Luật Giao
            dịch điện tử 2023.
          </p>
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={onClose}
              className="rounded-lg border border-[var(--border)] bg-[var(--surface)] px-4 py-2 text-xs font-semibold text-[var(--fg)] hover:bg-[var(--surface-muted)] transition-colors"
            >
              Đóng
            </button>
            <a
              href={data.externalUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 rounded-lg bg-[var(--primary)] px-4 py-2 text-xs font-bold text-white transition-opacity hover:opacity-90"
            >
              <span>
                {data.kind === 'procedure'
                  ? 'Mở Cổng DVC Quốc gia (Link gốc)'
                  : 'Mở văn bản gốc'}
              </span>
              <ExternalLink className="h-3.5 w-3.5" />
            </a>
          </div>
        </div>
      </div>
    </div>
  )
}
