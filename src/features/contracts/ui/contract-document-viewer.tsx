'use client'

import { useState, useMemo } from 'react'
import {
  FileText,
  Download,
  Printer,
  Search,
  ShieldCheck,
  Layers,
  ChevronDown,
  Info,
  CheckCircle2,
} from 'lucide-react'
import type { ContractDocumentView } from '../api/contracts-api'

export interface ContractDocumentViewerProps {
  document: ContractDocumentView
  contractCode: string
  status: string
  networkMode?: 'simulation' | 'fabric'
  onDownloadPdf?: () => void
  onDownloadDocx?: () => void
  isDownloading?: boolean
}

export function ContractDocumentViewer({
  document,
  contractCode,
  status,
  networkMode = 'simulation',
  onDownloadPdf,
  onDownloadDocx,
  isDownloading = false,
}: ContractDocumentViewerProps) {
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedSectionId, setSelectedSectionId] = useState<string>('all')

  const isSimulation = networkMode === 'simulation'

  const filteredSections = useMemo(() => {
    let list = document?.sections || []
    if (selectedSectionId !== 'all') {
      list = list.filter(s => s.id === selectedSectionId)
    }
    if (searchTerm.trim()) {
      const term = searchTerm.toLowerCase().trim()
      list = list.filter(
        s =>
          s.title.toLowerCase().includes(term) ||
          s.content.toLowerCase().includes(term)
      )
    }
    return list
  }, [document?.sections, selectedSectionId, searchTerm])

  const handlePrint = () => {
    window.print()
  }

  return (
    <div className="relative flex flex-col gap-4 w-full">
      {/* Simulation Banner Notice */}
      {isSimulation && (
        <div
          data-testid="simulation-banner"
          className="flex items-center gap-2.5 px-4 py-2.5 rounded-lg border text-xs font-medium bg-[var(--surface-muted)] border-[var(--warning)] text-[var(--fg)]"
        >
          <Info className="w-4 h-4 text-[var(--warning)] shrink-0" />
          <span>
            <strong>MÔ PHỎNG BLOCKCHAIN (SIMULATION):</strong> Bản thể hiện điện
            tử này được khởi tạo trong môi trường thử nghiệm PoC phục vụ đối
            soát quy trình ký số e-Consent.
          </span>
        </div>
      )}

      {/* Control / Toolbar */}
      <div className="flex flex-wrap items-center justify-between gap-3 p-3 rounded-lg border border-[var(--border)] bg-[var(--surface)] shadow-sm print:hidden">
        {/* Search & Filter */}
        <div className="flex flex-wrap items-center gap-2.5 flex-1 min-w-[280px]">
          <div className="relative flex-1 min-w-[180px]">
            <Search className="w-4 h-4 absolute left-2.5 top-1/2 -translate-y-1/2 text-[var(--muted)]" />
            <input
              type="text"
              placeholder="Tìm kiếm điều khoản..."
              value={searchTerm}
              onChange={e => setSearchTerm(e.target.value)}
              aria-label="Tìm kiếm điều khoản"
              className="w-full pl-8 pr-3 py-1.5 text-xs rounded-md border border-[var(--border)] bg-[var(--bg)] text-[var(--fg)] placeholder:text-[var(--muted)] focus:outline-none focus:ring-1 focus:ring-[var(--primary)]"
            />
          </div>

          <div className="relative min-w-[150px]">
            <select
              value={selectedSectionId}
              onChange={e => setSelectedSectionId(e.target.value)}
              aria-label="Lọc theo điều khoản"
              className="w-full appearance-none px-3 py-1.5 pr-8 text-xs rounded-md border border-[var(--border)] bg-[var(--bg)] text-[var(--fg)] focus:outline-none focus:ring-1 focus:ring-[var(--primary)] cursor-pointer"
            >
              <option value="all">Tất cả điều khoản (12)</option>
              {document?.sections?.map(s => (
                <option key={s.id} value={s.id}>
                  Điều {s.number}: {s.title}
                </option>
              ))}
            </select>
            <ChevronDown className="w-3.5 h-3.5 absolute right-2.5 top-1/2 -translate-y-1/2 text-[var(--muted)] pointer-events-none" />
          </div>
        </div>

        {/* Action buttons */}
        <div className="flex items-center gap-2">
          {onDownloadPdf && (
            <button
              type="button"
              onClick={onDownloadPdf}
              disabled={isDownloading}
              aria-label="Tải bản PDF"
              className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded-md bg-[var(--primary)] text-white hover:opacity-90 disabled:opacity-50 transition-opacity"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Tải PDF</span>
            </button>
          )}

          {onDownloadDocx && (
            <button
              type="button"
              onClick={onDownloadDocx}
              disabled={isDownloading}
              aria-label="Tải bản DOCX"
              className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded-md border border-[var(--border)] bg-[var(--surface-muted)] text-[var(--fg)] hover:bg-[var(--surface)] transition-colors"
            >
              <FileText className="w-3.5 h-3.5" />
              <span>DOCX</span>
            </button>
          )}

          <button
            type="button"
            onClick={handlePrint}
            aria-label="In hợp đồng"
            className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded-md border border-[var(--border)] bg-[var(--surface-muted)] text-[var(--fg)] hover:bg-[var(--surface)] transition-colors"
          >
            <Printer className="w-3.5 h-3.5" />
            <span>In</span>
          </button>
        </div>
      </div>

      {/* A4 Document Paper Container */}
      <div className="relative w-full max-w-4xl mx-auto rounded-xl border border-[var(--border)] bg-[var(--surface)] shadow-md p-6 sm:p-10 md:p-14 overflow-hidden print:border-none print:shadow-none print:p-0">
        {/* Subtle Watermark Stamp */}
        <div
          data-testid="contract-watermark"
          aria-hidden="true"
          className="absolute inset-0 pointer-events-none flex items-center justify-center select-none overflow-hidden"
        >
          <div className="text-[var(--muted)] opacity-[0.06] -rotate-45 text-4xl sm:text-6xl font-black uppercase tracking-widest text-center leading-tight">
            {isSimulation ? 'MÔ PHỎNG BLOCKCHAIN' : 'BẢN THUÊ ĐIỆN TỬ'}
            <br />
            {contractCode}
          </div>
        </div>

        {/* National Header */}
        <div className="text-center mb-8 border-b border-[var(--border)] pb-6">
          <p className="text-xs font-bold tracking-wider text-[var(--fg)] uppercase">
            CỘNG HÒA XÃ HỘI CHỦ NGHĨA VIỆT NAM
          </p>
          <p className="text-xs font-medium text-[var(--muted)] mt-0.5">
            Độc lập - Tự do - Hạnh phúc
          </p>
          <div className="w-24 h-0.5 bg-[var(--fg)] mx-auto my-3" />

          <h1 className="text-lg sm:text-2xl font-bold uppercase tracking-tight text-[var(--fg)] mt-4">
            HỢP ĐỒNG THUÊ CĂN HỘ CHUNG CƯ
          </h1>
          <p className="text-xs text-[var(--muted)] mt-1">
            Số:{' '}
            <span className="font-semibold text-[var(--fg)]">
              {contractCode}
            </span>{' '}
            | Trạng thái:{' '}
            <span className="font-semibold text-[var(--primary)] uppercase">
              {status}
            </span>
          </p>
          {document?.lockedHash && (
            <p className="text-[11px] font-mono text-[var(--muted)] mt-1 truncate max-w-md mx-auto">
              Hash nội dung: {document.lockedHash}
            </p>
          )}
        </div>

        {/* 12 Articles List */}
        <div className="flex flex-col gap-6">
          {filteredSections.length === 0 ? (
            <div className="py-8 text-center text-xs text-[var(--muted)]">
              Không tìm thấy điều khoản phù hợp với từ khóa &ldquo;{searchTerm}
              &rdquo;.
            </div>
          ) : (
            filteredSections.map(section => (
              <article
                key={section.id}
                id={`article-${section.number}`}
                data-testid={`article-${section.number}`}
                className="scroll-mt-6"
              >
                <div className="flex items-center justify-between gap-2 mb-2">
                  <h2 className="text-sm font-bold text-[var(--fg)] tracking-tight">
                    Điều {section.number}. {section.title}
                  </h2>
                  {section.protected && (
                    <span
                      title="Điều khoản chuẩn bảo vệ pháp lý"
                      className="inline-flex items-center gap-1 px-2 py-0.5 text-[10px] font-medium rounded-full bg-[var(--surface-muted)] text-[var(--primary)] border border-[var(--border)]"
                    >
                      <ShieldCheck className="w-3 h-3 text-[var(--primary)]" />
                      Bảo vệ
                    </span>
                  )}
                </div>
                <div className="text-xs leading-relaxed text-[var(--fg)] whitespace-pre-line text-justify pl-2 border-l-2 border-[var(--border)]">
                  {section.content}
                </div>
              </article>
            ))
          )}
        </div>

        {/* 4 Annexes Section */}
        {document?.annexes &&
          document.annexes.length > 0 &&
          selectedSectionId === 'all' && (
            <div className="mt-10 pt-8 border-t border-[var(--border)]">
              <div className="flex items-center gap-2 mb-4">
                <Layers className="w-4 h-4 text-[var(--primary)]" />
                <h3 className="text-sm font-bold text-[var(--fg)] uppercase tracking-wider">
                  DANH MỤC PHỤ LỤC HỢP ĐỒNG ĐÍNH KÈM
                </h3>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {document.annexes.map(annex => (
                  <div
                    key={annex.id}
                    data-testid={`annex-${annex.id}`}
                    className="p-3.5 rounded-lg border border-[var(--border)] bg-[var(--surface-muted)] text-xs flex flex-col justify-between"
                  >
                    <div>
                      <div className="flex items-center justify-between gap-1 mb-1">
                        <span className="font-semibold text-[var(--fg)]">
                          {annex.title}
                        </span>
                        {annex.required ? (
                          <span className="text-[10px] font-medium text-[var(--primary)] bg-[var(--surface)] px-1.5 py-0.5 rounded border border-[var(--border)]">
                            Bắt buộc
                          </span>
                        ) : (
                          <span className="text-[10px] text-[var(--muted)]">
                            Tùy chọn
                          </span>
                        )}
                      </div>
                      {annex.description && (
                        <p className="text-[11px] text-[var(--muted)] leading-relaxed mt-1">
                          {annex.description}
                        </p>
                      )}
                    </div>
                    <div className="mt-2.5 pt-2 border-t border-[var(--border)] flex items-center gap-1.5 text-[10px] text-[var(--muted)]">
                      <CheckCircle2 className="w-3 h-3 text-[var(--success)]" />
                      <span>Đính kèm tự động theo mẫu chuẩn</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

        {/* Closing Seal & Signatures Box */}
        <div className="mt-12 pt-8 border-t border-[var(--border)] grid grid-cols-2 gap-6 text-center text-xs">
          <div>
            <p className="font-bold text-[var(--fg)] uppercase">
              ĐẠI DIỆN BÊN CHO THUÊ (BÊN A)
            </p>
            <p className="text-[11px] text-[var(--muted)] italic mt-0.5">
              (Ký điện tử / Ký xác nhận)
            </p>
            <div className="h-20 flex items-center justify-center text-[var(--muted)] text-[11px] italic">
              {status === 'active' || status === 'completed'
                ? 'Đã xác nhận ký số e-Consent'
                : 'Chờ hoàn tất ký'}
            </div>
          </div>
          <div>
            <p className="font-bold text-[var(--fg)] uppercase">
              ĐẠI DIỆN BÊN THUÊ (BÊN B)
            </p>
            <p className="text-[11px] text-[var(--muted)] italic mt-0.5">
              (Ký điện tử / Ký xác nhận)
            </p>
            <div className="h-20 flex items-center justify-center text-[var(--muted)] text-[11px] italic">
              {status === 'active' || status === 'completed'
                ? 'Đã xác nhận ký số e-Consent'
                : 'Chờ hoàn tất ký'}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
