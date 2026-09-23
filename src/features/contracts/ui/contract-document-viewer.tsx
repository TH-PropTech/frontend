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
  ExternalLink,
  ZoomIn,
  ZoomOut,
  BookOpen,
  ScrollText,
  Building2,
  User,
  Lock,
  Maximize2,
  Minimize2,
} from 'lucide-react'
import { Button } from '@/shared/ui/button'
import { Badge } from '@/shared/ui/badge'
import type {
  ContractDocumentView,
  ContractPartyView,
  ContractPropertySnapshot,
  ContractCommercialSnapshot,
} from '../api/contracts-api'

export interface ContractDocumentViewerProps {
  document: ContractDocumentView
  contractCode: string
  status: string
  networkMode?: 'simulation' | 'fabric'
  parties?: {
    tenant?: ContractPartyView | null
    landlord?: ContractPartyView | null
  }
  property?: ContractPropertySnapshot | null
  commercial?: ContractCommercialSnapshot | null
  startDate?: string | null
  endDate?: string | null
  createdAt?: string | null
  onDownloadPdf?: () => void
  onDownloadDocx?: () => void
  isDownloading?: boolean
  isExpanded?: boolean
  onToggleExpand?: () => void
}

const OFFICIAL_CITATIONS = [
  {
    label: 'Nghị định số 96/2024/NĐ-CP (Phụ lục II)',
    href: 'https://xaydungchinhsach.chinhphu.vn/mau-hop-dong-thue-nha-o-119240827172441217.htm',
  },
  {
    label: 'Luật Nhà ở 27/2023/QH15',
    href: 'https://vbpl.vn/FileData/TW/Lists/vbpq/Attachments/178409/tvHienThiToanVan_14-VBHN-VPQH%20Lu%E1%BA%ADt%20nh%C3%A0%20%E1%BB%9F%202.pdf',
  },
  {
    label: 'Luật Kinh doanh bất động sản số 29/2023/QH15',
    href: 'https://vanban.chinhphu.vn/',
  },
] as const

function SignatureEvidence({
  party,
  role,
}: {
  party?: ContractPartyView | null
  role: 'tenant' | 'landlord'
}) {
  if (!party?.hasSigned || !party.providerTransactionId) return null

  return (
    <div
      data-testid={`${role}-signature-evidence`}
      className="mt-2 w-full rounded-lg border border-[var(--border)] bg-[var(--surface-muted)]/60 p-2.5 text-left text-[10px] text-[var(--muted)] space-y-1"
    >
      <div className="flex items-center gap-1 font-semibold text-[var(--fg)]">
        <Lock className="w-3 h-3 text-[var(--primary)]" />
        <span>
          Chữ ký số{' '}
          {party.provider === 'smartca' ? 'VNPT SmartCA' : 'nhà cung cấp'}
        </span>
      </div>
      <p className="font-mono break-all text-[9.5px]">
        TxID: {party.providerTransactionId}
      </p>
      {party.certificateSerial ? (
        <p className="font-mono break-all text-[9.5px]">
          Serial chứng thư: {party.certificateSerial}
        </p>
      ) : null}
      {party.signatureAlgorithm ? (
        <p>Thuật toán: {party.signatureAlgorithm}</p>
      ) : null}
      {party.verifiedAt ? (
        <p>Thời điểm đối soát: {formatDisplayDate(party.verifiedAt)}</p>
      ) : null}
    </div>
  )
}

function formatDisplayDate(dateStr?: string | null): string {
  if (!dateStr) return 'Chưa xác định'
  const date = new Date(dateStr)
  return Number.isNaN(date.getTime())
    ? 'Chưa xác định'
    : date.toLocaleDateString('vi-VN')
}

export function ContractDocumentViewer({
  document,
  contractCode,
  status,
  networkMode = 'simulation',
  parties,
  property,
  startDate,
  createdAt,
  onDownloadPdf,
  onDownloadDocx,
  isDownloading = false,
  isExpanded: controlledExpanded,
  onToggleExpand,
}: ContractDocumentViewerProps) {
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedSectionId, setSelectedSectionId] = useState<string>('all')
  const [viewMode, setViewMode] = useState<'pages' | 'continuous'>('pages')
  const [zoomLevel, setZoomLevel] = useState<number>(1.0)
  const [internalExpanded, setInternalExpanded] = useState(false)

  const isExpanded = controlledExpanded ?? internalExpanded

  const handleToggleExpand = () => {
    if (onToggleExpand) {
      onToggleExpand()
    } else {
      setInternalExpanded(!internalExpanded)
    }
  }

  const isSimulation = networkMode === 'simulation'

  const filteredSections = useMemo(() => {
    let list = document.sections || []
    if (selectedSectionId !== 'all') {
      list = list.filter(
        s =>
          s.id === selectedSectionId ||
          `article-${s.number}` === selectedSectionId
      )
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
  }, [document.sections, selectedSectionId, searchTerm])

  const handlePrint = () => {
    window.print()
  }

  const handleSectionSelect = (sectionId: string) => {
    setSelectedSectionId(sectionId)
    if (sectionId !== 'all') {
      setTimeout(() => {
        const el =
          window.document.getElementById(sectionId) ||
          window.document.querySelector(`[data-testid="${sectionId}"]`)
        if (el) {
          el.scrollIntoView({ behavior: 'smooth', block: 'start' })
        }
      }, 50)
    }
  }

  const handleZoomIn = () => {
    setZoomLevel(prev => Math.min(1.25, Number((prev + 0.1).toFixed(2))))
  }

  const handleZoomOut = () => {
    setZoomLevel(prev => Math.max(0.85, Number((prev - 0.1).toFixed(2))))
  }

  const formatNationalDate = (dateStr?: string | null): string => {
    if (!dateStr) return 'Ngày ... tháng ... năm ....'
    const d = new Date(dateStr)
    if (isNaN(d.getTime())) return 'Ngày ... tháng ... năm ....'
    return `Ngày ${d.getDate()} tháng ${d.getMonth() + 1} năm ${d.getFullYear()}`
  }

  const isFilteredOrSearched =
    selectedSectionId !== 'all' || searchTerm.trim().length > 0

  // Group sections by page for Paginated A4 View (Standard 4 Pages)
  const page1Sections = (document.sections || []).filter(
    s => s.number === 1 || s.number === 2
  )
  const page2Sections = (document.sections || []).filter(
    s => s.number >= 3 && s.number <= 6
  )
  const page3Sections = (document.sections || []).filter(
    s => s.number >= 7 && s.number <= 9
  )
  const page4Sections = (document.sections || []).filter(
    s => s.number >= 10 && s.number <= 12
  )

  const renderArticle = (
    section: (typeof document.sections)[0],
    index: number
  ) => {
    const sectionNum = section.number ?? index + 1
    const headingTitle = section.title.startsWith('Điều ')
      ? section.title
      : `Điều ${sectionNum}. ${section.title}`

    return (
      <article
        key={section.id}
        id={section.id}
        data-testid={`article-${section.number}`}
        className="scroll-mt-6 rounded-lg border border-[var(--border)]/60 bg-[var(--surface-muted)]/15 p-4 sm:p-5 transition-colors"
      >
        <div className="flex items-center justify-between gap-2 mb-2.5 pb-2 border-b border-[var(--border)]/40">
          <h2 className="text-xs sm:text-sm font-bold text-[var(--fg)] tracking-tight">
            {headingTitle}
          </h2>
          {section.protected && (
            <span
              title="Điều khoản chuẩn bảo vệ pháp lý theo Nghị định 96/2024/NĐ-CP"
              className="inline-flex items-center gap-1 px-2 py-0.5 text-[10px] font-medium rounded-full bg-[var(--surface-muted)] text-[var(--primary)] border border-[var(--border)]"
            >
              <ShieldCheck className="w-3 h-3 text-[var(--primary)]" />
              Bảo vệ
            </span>
          )}
        </div>
        <div className="text-xs sm:text-[13px] leading-relaxed text-[var(--fg)] whitespace-pre-line text-justify pl-1 sm:pl-2">
          {section.content}
        </div>
      </article>
    )
  }

  return (
    <div className="relative flex flex-col gap-4 w-full">
      {/* Simulation Banner Notice */}
      {isSimulation && (
        <div
          data-testid="simulation-banner"
          className="flex items-center gap-2.5 px-3.5 py-2.5 rounded-lg border text-xs font-medium bg-[var(--surface-muted)] border-[var(--warning)] text-[var(--fg)]"
        >
          <Info className="w-4 h-4 text-[var(--warning)] shrink-0" />
          <span className="leading-relaxed">
            <strong>MÔ PHỎNG BLOCKCHAIN (SIMULATION):</strong> Bản thể hiện điện
            tử này được khởi tạo trong môi trường thử nghiệm PoC phục vụ đối
            soát quy trình ký số e-Consent.
          </span>
        </div>
      )}

      {/* Modern Control / Reader Toolbar (2-Tier Responsive Design) */}
      <div className="flex flex-col gap-2.5 p-2.5 sm:p-3 rounded-xl border border-[var(--border)] bg-[var(--surface)] shadow-sm print:hidden">
        {/* Tier 1: Search, Filter & Action Buttons */}
        <div className="flex flex-wrap items-center justify-between gap-2.5 w-full">
          {/* Search & Article Dropdown */}
          <div className="flex flex-1 items-center gap-2 min-w-[240px]">
            <div className="relative flex-1 min-w-[130px]">
              <Search className="w-4 h-4 absolute left-2.5 top-1/2 -translate-y-1/2 text-[var(--muted)] pointer-events-none" />
              <input
                type="text"
                placeholder="Tìm điều khoản..."
                value={searchTerm}
                onChange={e => setSearchTerm(e.target.value)}
                aria-label="Tìm kiếm điều khoản"
                className="w-full pl-8 pr-3 py-1.5 text-xs rounded-md border border-[var(--border)] bg-[var(--bg)] text-[var(--fg)] placeholder:text-[var(--muted)] focus:outline-none focus:ring-1 focus:ring-[var(--primary)]"
              />
            </div>

            <div className="relative min-w-[130px] max-w-[200px]">
              <select
                value={selectedSectionId}
                onChange={e => handleSectionSelect(e.target.value)}
                aria-label="Lọc theo điều khoản"
                className="w-full appearance-none px-2.5 py-1.5 pr-7 text-xs rounded-md border border-[var(--border)] bg-[var(--bg)] text-[var(--fg)] focus:outline-none focus:ring-1 focus:ring-[var(--primary)] cursor-pointer truncate"
              >
                <option value="all">
                  Tất cả ({document?.sections?.length || 12} điều)
                </option>
                {document?.sections?.map(s => (
                  <option key={s.id} value={s.id}>
                    Điều {s.number}: {s.title}
                  </option>
                ))}
              </select>
              <ChevronDown className="w-3.5 h-3.5 absolute right-2 top-1/2 -translate-y-1/2 text-[var(--muted)] pointer-events-none" />
            </div>
          </div>

          {/* Action buttons */}
          <div className="flex items-center gap-1.5 shrink-0 ml-auto">
            {onDownloadPdf && (
              <Button
                type="button"
                size="sm"
                variant="primary"
                onClick={onDownloadPdf}
                disabled={isDownloading}
                aria-label="Tải bản PDF"
                className="h-8 px-2.5 text-xs font-semibold"
              >
                <Download className="w-3.5 h-3.5" />
                <span>PDF</span>
              </Button>
            )}

            {onDownloadDocx && (
              <Button
                type="button"
                size="sm"
                variant="secondary"
                onClick={onDownloadDocx}
                disabled={isDownloading}
                aria-label="Tải bản DOCX"
                className="h-8 px-2.5 text-xs"
              >
                <FileText className="w-3.5 h-3.5" />
                <span>DOCX</span>
              </Button>
            )}

            <Button
              type="button"
              size="sm"
              variant="secondary"
              onClick={handlePrint}
              aria-label="In hợp đồng"
              className="h-8 px-2.5 text-xs"
              title="In văn bản"
            >
              <Printer className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">In</span>
            </Button>

            {/* Expand / Collapse Full Width Button */}
            <Button
              type="button"
              size="sm"
              variant="secondary"
              onClick={handleToggleExpand}
              aria-label={
                isExpanded ? 'Thu gọn màn hình' : 'Mở rộng toàn màn hình'
              }
              className="h-8 px-2 text-xs"
              title={isExpanded ? 'Thu gọn 2 cột' : 'Mở rộng full màn hình'}
            >
              {isExpanded ? (
                <Minimize2 className="w-3.5 h-3.5 text-[var(--primary)]" />
              ) : (
                <Maximize2 className="w-3.5 h-3.5" />
              )}
            </Button>
          </div>
        </div>

        {/* Tier 2: View Mode Switcher, Zoom Controls & Quick Indicator */}
        <div className="flex flex-wrap items-center justify-between gap-2 pt-2 border-t border-[var(--border)]/60 text-xs">
          {/* Left: View Mode Pills */}
          <div className="inline-flex items-center p-0.5 rounded-lg border border-[var(--border)] bg-[var(--surface-muted)]">
            <button
              type="button"
              onClick={() => setViewMode('pages')}
              className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-md text-[11px] font-medium transition-colors ${
                viewMode === 'pages'
                  ? 'bg-[var(--surface)] text-[var(--primary)] shadow-xs font-semibold'
                  : 'text-[var(--muted)] hover:text-[var(--fg)]'
              }`}
              title="Chế độ phân trang A4"
            >
              <BookOpen className="w-3.5 h-3.5" />
              <span>Khổ A4</span>
            </button>
            <button
              type="button"
              onClick={() => setViewMode('continuous')}
              className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-md text-[11px] font-medium transition-colors ${
                viewMode === 'continuous'
                  ? 'bg-[var(--surface)] text-[var(--primary)] shadow-xs font-semibold'
                  : 'text-[var(--muted)] hover:text-[var(--fg)]'
              }`}
              title="Chế độ cuộn liên tục"
            >
              <ScrollText className="w-3.5 h-3.5" />
              <span>Cuộn</span>
            </button>
          </div>

          {/* Right: Zoom Controls & Security Status */}
          <div className="flex items-center gap-2">
            <div className="inline-flex items-center gap-1 px-1 py-0.5 rounded-lg border border-[var(--border)] bg-[var(--surface-muted)] text-[11px]">
              <button
                type="button"
                onClick={handleZoomOut}
                disabled={zoomLevel <= 0.85}
                className="p-1 text-[var(--muted)] hover:text-[var(--fg)] disabled:opacity-40"
                title="Thu nhỏ"
              >
                <ZoomOut className="w-3.5 h-3.5" />
              </button>
              <span className="w-9 text-center font-mono text-[10px] text-[var(--fg)] font-semibold">
                {Math.round(zoomLevel * 100)}%
              </span>
              <button
                type="button"
                onClick={handleZoomIn}
                disabled={zoomLevel >= 1.25}
                className="p-1 text-[var(--muted)] hover:text-[var(--fg)] disabled:opacity-40"
                title="Phóng to"
              >
                <ZoomIn className="w-3.5 h-3.5" />
              </button>
            </div>

            <span className="hidden sm:inline-flex items-center gap-1 text-[10px] text-[var(--muted)] font-medium">
              <ShieldCheck className="w-3.5 h-3.5 text-[var(--success)]" />
              <span>12 Điều · Chuẩn NĐ 96/2024</span>
            </span>
          </div>
        </div>
      </div>

      {/* A4 Document Paper Container with Zoom scale */}
      <div
        data-testid="contract-document-paper"
        style={{
          transform: zoomLevel !== 1 ? `scale(${zoomLevel})` : undefined,
          transformOrigin: 'top center',
        }}
        className="relative w-full max-w-4xl mx-auto rounded-xl border border-[var(--border)] bg-[var(--surface)] shadow-md p-4 sm:p-8 md:p-10 overflow-hidden print:border-none print:shadow-none print:p-0 transition-all duration-200"
      >
        {/* Subtle Watermark Stamp */}
        <div
          data-testid="contract-watermark"
          aria-hidden="true"
          className="absolute inset-0 pointer-events-none flex items-center justify-center select-none overflow-hidden"
        >
          <div className="text-[var(--muted)] opacity-[0.05] -rotate-45 text-4xl sm:text-6xl font-black uppercase tracking-widest text-center leading-tight">
            {isSimulation ? 'MÔ PHỎNG BLOCKCHAIN' : 'BẢN THUÊ ĐIỆN TỬ'}
            <br />
            {contractCode}
          </div>
        </div>

        {/* ==================================================================== */}
        {/* PAGE 1: NATIONAL HEADER, CONTRACT TITLE, CITATIONS, PARTIES, ART 1-2 */}
        {/* ==================================================================== */}
        <section className="space-y-6">
          {/* National Header */}
          <div className="text-center border-b border-[var(--border)] pb-6">
            <p className="text-xs sm:text-sm font-bold tracking-wider text-[var(--fg)] uppercase">
              CỘNG HÒA XÃ HỘI CHỦ NGHĨA VIỆT NAM
            </p>
            <p className="text-xs sm:text-sm font-semibold text-[var(--muted)] mt-0.5">
              Độc lập - Tự do - Hạnh phúc
            </p>
            <div className="w-28 h-0.5 bg-[var(--fg)] mx-auto my-3" />
            <p className="text-xs text-[var(--muted)] italic mt-2">
              {formatNationalDate(createdAt || startDate)}
            </p>

            <h1 className="text-lg sm:text-2xl font-bold uppercase tracking-tight text-[var(--fg)] mt-4">
              HỢP ĐỒNG THUÊ CĂN HỘ CHUNG CƯ
            </h1>
            <p className="text-xs text-[var(--muted)] mt-1.5">
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
              <p className="text-[11px] text-[var(--muted)] mt-1.5 truncate max-w-md mx-auto">
                <span>Mã toàn vẹn hợp đồng:</span>{' '}
                <span className="font-mono font-semibold text-[var(--fg)]">
                  {document.lockedHash.length > 20
                    ? `${document.lockedHash.slice(0, 10)}...${document.lockedHash.slice(-8)}`
                    : document.lockedHash}
                </span>
              </p>
            )}
          </div>

          {/* Canonical Artifact Panel (if available) */}
          {document.canonicalArtifact ? (
            <section
              data-testid="canonical-artifact-panel"
              aria-label="Canonical PDF artifact"
              className="rounded-xl border border-[var(--primary)]/30 bg-[var(--primary-soft)]/20 p-4 text-xs"
            >
              <div className="flex items-start gap-2">
                <FileText className="mt-0.5 h-4 w-4 shrink-0 text-[var(--primary)]" />
                <div className="min-w-0 flex-1">
                  <h2 className="font-bold text-[var(--fg)]">
                    Artifact PDF chuẩn dùng cho view, tải xuống và ký số
                  </h2>
                  <div className="mt-2 grid gap-1 text-[var(--muted)] sm:grid-cols-2">
                    <p>
                      Mã artifact:{' '}
                      <span className="font-mono text-[var(--fg)]">
                        {document.canonicalArtifact.artifactId}
                      </span>
                    </p>
                    <p>
                      Revision{' '}
                      <span className="font-semibold text-[var(--fg)]">
                        {document.canonicalArtifact.revision}
                      </span>
                    </p>
                    <p>
                      Template:{' '}
                      <span className="font-mono text-[var(--fg)]">
                        {document.canonicalArtifact.templateKey}@
                        {document.canonicalArtifact.templateVersion}
                      </span>
                    </p>
                    <p>
                      Định dạng:{' '}
                      <span className="font-mono text-[var(--fg)]">
                        {document.canonicalArtifact.contentType}
                      </span>
                    </p>
                  </div>
                  <p className="mt-2 break-all font-mono text-[10px] text-[var(--fg)]">
                    SHA-256: {document.canonicalArtifact.artifactHash}
                  </p>
                </div>
              </div>
            </section>
          ) : (
            <section
              data-testid="canonical-artifact-empty"
              role="status"
              className="rounded-xl border border-[var(--warning)]/40 bg-[var(--surface-muted)] p-4 text-xs text-[var(--fg)]"
            >
              Chưa có canonical PDF artifact. Hợp đồng chưa đủ điều kiện để ký
              SmartCA.
            </section>
          )}

          {/* Legal Citations Box (Phụ lục II Nghị định 96/2024/NĐ-CP) */}
          <div className="rounded-lg border border-[var(--border)] bg-[var(--surface-muted)]/50 p-4 text-xs text-[var(--muted)] leading-relaxed space-y-1.5 italic">
            <p>
              • Căn cứ Bộ luật Dân sự số 91/2015/QH13 ngày 24 tháng 11 năm 2015;
            </p>
            <p>
              • Căn cứ Luật Nhà ở số 27/2023/QH15 ngày 27 tháng 11 năm 2023;
            </p>
            {OFFICIAL_CITATIONS.map(citation => (
              <p key={citation.href} className="flex items-start gap-1">
                <span aria-hidden="true">•</span>
                <a
                  href={citation.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 text-[var(--primary)] underline underline-offset-2 hover:text-[var(--primary-hover)] font-medium"
                >
                  {citation.label}
                  <ExternalLink
                    className="h-3 w-3 shrink-0"
                    aria-hidden="true"
                  />
                  <span className="sr-only">
                    Mở nguồn chính thức trong tab mới
                  </span>
                </a>
              </p>
            ))}
            <p>
              • Căn cứ Luật Giao dịch điện tử số 20/2023/QH15 ngày 22 tháng 06
              năm 2023;
            </p>
            <p>
              • Căn cứ hồ sơ bất động sản và sự thỏa thuận tự nguyện giữa hai
              bên.
            </p>
          </div>

          {/* Parties Information Box */}
          <div className="space-y-4 text-xs">
            <p className="font-bold text-[var(--fg)] italic">
              Hai bên chúng tôi gồm:
            </p>

            {/* BÊN A */}
            <div className="rounded-xl border border-[var(--border)] bg-[var(--surface-muted)]/30 p-4 space-y-2.5">
              <div className="flex items-center justify-between border-b border-[var(--border)] pb-2">
                <div className="flex items-center gap-2">
                  <Building2 className="w-4 h-4 text-[var(--primary)] shrink-0" />
                  <h3 className="font-bold text-xs uppercase tracking-wide text-[var(--fg)]">
                    I. BÊN CHO THUÊ NHÀ Ở (BÊN A)
                  </h3>
                </div>
                {parties?.landlord?.kycStatus === 'verified' && (
                  <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-[var(--success)]">
                    <ShieldCheck className="w-3.5 h-3.5" /> Đã xác thực eKYC
                  </span>
                )}
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-4 gap-y-2 text-xs">
                <p>
                  <span className="text-[var(--muted)]">
                    Họ và tên chủ nhà:
                  </span>{' '}
                  <strong className="text-[var(--fg)]">
                    {parties?.landlord?.name || 'Nguyễn Văn Chủ Nhà'}
                  </strong>
                </p>
                <p>
                  <span className="text-[var(--muted)]">Số CCCD/ĐDPL:</span>{' '}
                  <strong className="font-mono text-[var(--fg)]">
                    {parties?.landlord?.maskedCccd || 'Chưa cung cấp'}
                  </strong>
                </p>
                <p className="sm:col-span-2">
                  <span className="text-[var(--muted)]">
                    Nơi đăng ký thường trú / Địa chỉ:
                  </span>{' '}
                  <span className="text-[var(--fg)]">
                    {parties?.landlord?.address ||
                      property?.address ||
                      'Thành phố Hồ Chí Minh'}
                  </span>
                </p>
              </div>
            </div>

            {/* BÊN B */}
            <div className="rounded-xl border border-[var(--border)] bg-[var(--surface-muted)]/30 p-4 space-y-2.5">
              <div className="flex items-center justify-between border-b border-[var(--border)] pb-2">
                <div className="flex items-center gap-2">
                  <User className="w-4 h-4 text-[var(--primary)] shrink-0" />
                  <h3 className="font-bold text-xs uppercase tracking-wide text-[var(--fg)]">
                    II. BÊN THUÊ NHÀ Ở (BÊN B)
                  </h3>
                </div>
                {parties?.tenant?.kycStatus === 'verified' && (
                  <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-[var(--success)]">
                    <ShieldCheck className="w-3.5 h-3.5" /> Đã xác thực eKYC
                  </span>
                )}
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-4 gap-y-2 text-xs">
                <p>
                  <span className="text-[var(--muted)]">
                    Họ và tên khách thuê:
                  </span>{' '}
                  <strong className="text-[var(--fg)]">
                    {parties?.tenant?.name || 'Trần Thị Thuê Nhà'}
                  </strong>
                </p>
                <p>
                  <span className="text-[var(--muted)]">Số CCCD/ĐDPL:</span>{' '}
                  <strong className="font-mono text-[var(--fg)]">
                    {parties?.tenant?.maskedCccd || 'Chưa cung cấp'}
                  </strong>
                </p>
                <p className="sm:col-span-2">
                  <span className="text-[var(--muted)]">
                    Nơi đăng ký thường trú / Địa chỉ:
                  </span>{' '}
                  <span className="text-[var(--fg)]">
                    {parties?.tenant?.address || 'Quận 1, TP.HCM'}
                  </span>
                </p>
              </div>
            </div>

            <p className="italic text-[var(--fg)] pt-1">
              Hai bên chúng tôi thống nhất ký kết hợp đồng cho thuê nhà ở với
              các điều khoản chi tiết sau đây:
            </p>
          </div>

          {/* When Filtered or Continuous mode: Render matching articles */}
          {(isFilteredOrSearched || viewMode === 'continuous') && (
            <div className="flex flex-col gap-5 pt-2">
              {filteredSections.length === 0 ? (
                <div className="py-8 text-center text-xs text-[var(--muted)]">
                  Không tìm thấy điều khoản phù hợp với từ khóa &ldquo;
                  {searchTerm}&rdquo;.
                </div>
              ) : (
                filteredSections.map((section, idx) =>
                  renderArticle(section, idx)
                )
              )}
            </div>
          )}

          {/* When in standard Paginated mode and NOT filtered: Render Page 1 Articles */}
          {!isFilteredOrSearched && viewMode === 'pages' && (
            <div className="flex flex-col gap-5 pt-2">
              {page1Sections.map((section, idx) => renderArticle(section, idx))}
              <div className="pt-4 border-t border-dashed border-[var(--border)] text-center text-[11px] text-[var(--muted)]">
                <span>— Trang 1 / 4 · Hợp đồng số: {contractCode} —</span>
              </div>
            </div>
          )}
        </section>

        {/* ==================================================================== */}
        {/* PAGE 2: ARTICLES 3, 4, 5, 6 (Shown in Paginated A4 View) */}
        {/* ==================================================================== */}
        {!isFilteredOrSearched &&
          viewMode === 'pages' &&
          page2Sections.length > 0 && (
            <section className="mt-12 pt-10 border-t-2 border-[var(--border)]/60 space-y-6">
              <div className="flex items-center justify-between pb-2 border-b border-[var(--border)] text-[11px] text-[var(--muted)]">
                <span className="font-semibold uppercase text-[var(--fg)]">
                  HỢP ĐỒNG THUÊ CĂN HỘ CHUNG CƯ
                </span>
                <span>Số: {contractCode}</span>
              </div>
              <div className="flex flex-col gap-5">
                {page2Sections.map((section, idx) =>
                  renderArticle(section, idx + 2)
                )}
              </div>
              <div className="pt-4 border-t border-dashed border-[var(--border)] text-center text-[11px] text-[var(--muted)]">
                <span>— Trang 2 / 4 · Hợp đồng số: {contractCode} —</span>
              </div>
            </section>
          )}

        {/* ==================================================================== */}
        {/* PAGE 3: ARTICLES 7, 8, 9 (Shown in Paginated A4 View) */}
        {/* ==================================================================== */}
        {!isFilteredOrSearched &&
          viewMode === 'pages' &&
          page3Sections.length > 0 && (
            <section className="mt-12 pt-10 border-t-2 border-[var(--border)]/60 space-y-6">
              <div className="flex items-center justify-between pb-2 border-b border-[var(--border)] text-[11px] text-[var(--muted)]">
                <span className="font-semibold uppercase text-[var(--fg)]">
                  HỢP ĐỒNG THUÊ CĂN HỘ CHUNG CƯ
                </span>
                <span>Số: {contractCode}</span>
              </div>
              <div className="flex flex-col gap-5">
                {page3Sections.map((section, idx) =>
                  renderArticle(section, idx + 6)
                )}
              </div>
              <div className="pt-4 border-t border-dashed border-[var(--border)] text-center text-[11px] text-[var(--muted)]">
                <span>— Trang 3 / 4 · Hợp đồng số: {contractCode} —</span>
              </div>
            </section>
          )}

        {/* ==================================================================== */}
        {/* PAGE 4: ARTICLES 10, 11, 12, ANNEXES, AND DIGITAL SIGNATURES */}
        {/* ==================================================================== */}
        {!isFilteredOrSearched &&
          viewMode === 'pages' &&
          page4Sections.length > 0 && (
            <section className="mt-12 pt-10 border-t-2 border-[var(--border)]/60 space-y-6">
              <div className="flex items-center justify-between pb-2 border-b border-[var(--border)] text-[11px] text-[var(--muted)]">
                <span className="font-semibold uppercase text-[var(--fg)]">
                  HỢP ĐỒNG THUÊ CĂN HỘ CHUNG CƯ
                </span>
                <span>Số: {contractCode}</span>
              </div>
              <div className="flex flex-col gap-5">
                {page4Sections.map((section, idx) =>
                  renderArticle(section, idx + 9)
                )}
              </div>
            </section>
          )}

        {/* 4 Annexes Section */}
        {document?.annexes &&
          document.annexes.length > 0 &&
          selectedSectionId === 'all' && (
            <div className="mt-10 pt-8 border-t border-[var(--border)]">
              <div className="flex items-center gap-2 mb-4">
                <Layers className="w-4 h-4 text-[var(--primary)]" />
                <h3 className="text-xs sm:text-sm font-bold text-[var(--fg)] uppercase tracking-wider">
                  DANH MỤC PHỤ LỤC HỢP ĐỒNG ĐÍNH KÈM
                </h3>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                {document.annexes.map(annex => (
                  <div
                    key={annex.id}
                    data-testid={`annex-${annex.id}`}
                    className="p-3.5 sm:p-4 rounded-xl border border-[var(--border)] bg-[var(--surface-muted)]/40 text-xs flex flex-col justify-between gap-3"
                  >
                    <div>
                      <div className="flex items-start justify-between gap-2.5 mb-1.5">
                        <span className="font-bold text-[var(--fg)] text-xs leading-snug flex-1 min-w-0">
                          {annex.title}
                        </span>
                        {annex.required ? (
                          <Badge
                            variant="outline"
                            className="text-[10px] font-bold text-[var(--primary)] bg-[var(--surface)] shrink-0 whitespace-nowrap px-2 py-0.5"
                          >
                            Bắt buộc
                          </Badge>
                        ) : (
                          <Badge
                            variant="outline"
                            className="text-[10px] text-[var(--muted)] bg-[var(--surface)] shrink-0 whitespace-nowrap px-2 py-0.5"
                          >
                            Tùy chọn
                          </Badge>
                        )}
                      </div>
                      {annex.description && (
                        <p className="text-[11px] text-[var(--muted)] leading-relaxed">
                          {annex.description}
                        </p>
                      )}
                    </div>
                    <div className="pt-2.5 border-t border-[var(--border)]/60 flex items-center gap-1.5 text-[10px] text-[var(--muted)]">
                      <CheckCircle2 className="w-3.5 h-3.5 text-[var(--success)] shrink-0" />
                      <span>Đính kèm tự động theo mẫu chuẩn</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

        {/* Closing Seal & Official Signatures Box */}
        <div className="mt-10 sm:mt-12 pt-6 sm:pt-8 border-t border-[var(--border)] grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6 text-center text-xs">
          {/* Bên A Signature */}
          <div className="rounded-xl border border-[var(--border)]/60 bg-[var(--surface-muted)]/20 p-4 flex flex-col justify-between">
            <div>
              <p className="font-bold text-[var(--fg)] uppercase tracking-wide">
                ĐẠI DIỆN BÊN CHO THUÊ (BÊN A)
              </p>
              <p className="text-[11px] text-[var(--muted)] italic mt-0.5">
                (Ký điện tử / Chữ ký số VNPT SmartCA)
              </p>
              <div className="h-20 flex flex-col items-center justify-center text-xs mt-2">
                {parties?.landlord?.hasSigned ||
                status === 'active' ||
                status === 'completed' ? (
                  <div className="flex flex-col items-center gap-1 text-[var(--success)] font-semibold">
                    <CheckCircle2 className="w-5 h-5 text-[var(--success)]" />
                    <span>Đã ký số xác nhận</span>
                    <span className="text-[10px] font-normal text-[var(--muted)]">
                      {parties?.landlord?.signedAt
                        ? formatDisplayDate(parties.landlord.signedAt)
                        : 'Chứng thư số X.509 hợp lệ'}
                    </span>
                  </div>
                ) : (
                  <span className="text-[var(--muted)] text-[11px] italic">
                    Chờ bên cho thuê ký
                  </span>
                )}
              </div>
              <SignatureEvidence
                party={parties?.landlord ?? null}
                role="landlord"
              />
            </div>
            <p className="font-semibold text-xs text-[var(--fg)] mt-3 pt-2 border-t border-[var(--border)]/40">
              {parties?.landlord?.name || 'Nguyễn Văn Chủ Nhà'}
            </p>
          </div>

          {/* Bên B Signature */}
          <div className="rounded-xl border border-[var(--border)]/60 bg-[var(--surface-muted)]/20 p-4 flex flex-col justify-between">
            <div>
              <p className="font-bold text-[var(--fg)] uppercase tracking-wide">
                ĐẠI DIỆN BÊN THUÊ (BÊN B)
              </p>
              <p className="text-[11px] text-[var(--muted)] italic mt-0.5">
                (Ký điện tử / Chữ ký số VNPT SmartCA)
              </p>
              <div className="h-20 flex flex-col items-center justify-center text-xs mt-2">
                {parties?.tenant?.hasSigned ||
                status === 'active' ||
                status === 'completed' ? (
                  <div className="flex flex-col items-center gap-1 text-[var(--success)] font-semibold">
                    <CheckCircle2 className="w-5 h-5 text-[var(--success)]" />
                    <span>Đã ký số xác nhận</span>
                    <span className="text-[10px] font-normal text-[var(--muted)]">
                      {parties?.tenant?.signedAt
                        ? formatDisplayDate(parties.tenant.signedAt)
                        : 'Chứng thư số X.509 hợp lệ'}
                    </span>
                  </div>
                ) : (
                  <span className="text-[var(--muted)] text-[11px] italic">
                    Chờ bên thuê ký
                  </span>
                )}
              </div>
              <SignatureEvidence
                party={parties?.tenant ?? null}
                role="tenant"
              />
            </div>
            <p className="font-semibold text-xs text-[var(--fg)] mt-3 pt-2 border-t border-[var(--border)]/40">
              {parties?.tenant?.name || 'Trần Thị Thuê Nhà'}
            </p>
          </div>
        </div>

        {!isFilteredOrSearched && viewMode === 'pages' && (
          <div className="mt-8 pt-4 border-t border-dashed border-[var(--border)] text-center text-[11px] text-[var(--muted)]">
            <span>
              — Trang 4 / 4 · Hợp đồng số: {contractCode} · TH-PropTech Secured
              Document —
            </span>
          </div>
        )}
      </div>
    </div>
  )
}
