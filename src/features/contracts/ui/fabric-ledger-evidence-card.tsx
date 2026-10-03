'use client'

import * as React from 'react'
import {
  AlertCircle,
  Blocks,
  Check,
  CheckCircle2,
  Clock,
  Copy,
  FileCheck2,
  Hash,
  Info,
  RefreshCw,
  ShieldCheck,
} from 'lucide-react'
import {
  layerStateLabel,
  normalizeLayerStatus,
  resolveIntegrityState,
  type VerificationLayerState,
} from '../lib/ledger-evidence-view'
import { EvidencePackageDownload } from './evidence-package-download'
import { LedgerEvidenceDrawer } from './ledger-evidence-drawer'

export interface FabricLedgerEvidenceCardProps {
  contractId: string
  contractCode?: string
  contractHash?: string | null
  connectionState?: 'disabled' | 'connected' | 'unavailable' | undefined
  blockNumber?: number | null
  txHash?: string | null
  verifiedAt?: string | null
  networkMode?: 'simulation' | 'fabric'
  status?: string
  onVerifyIntegrity?: () => Promise<void> | void
  isVerifying?: boolean
  integrityResult?: {
    isValid: boolean | null
    verificationStatus?:
      | 'valid'
      | 'verified'
      | 'invalid'
      | 'mismatch'
      | 'not-recorded'
      | 'unavailable'
    message?: string
    layers?: {
      offChain: IntegrityLayerView
      artifact: IntegrityLayerView
      onChain: IntegrityLayerView
    }
  } | null
}

interface IntegrityLayerView {
  status: string
  hash: string | null
  reason: string | null
}

function formatDate(dateStr?: string | null): string {
  if (!dateStr) return '—'
  try {
    const d = new Date(dateStr)
    return d.toLocaleString('vi-VN', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
    })
  } catch {
    return dateStr
  }
}

function truncateString(
  str?: string | null,
  startChars = 10,
  endChars = 8
): string {
  if (!str) return '—'
  if (str.length <= startChars + endChars + 3) return str
  return `${str.slice(0, startChars)}...${str.slice(-endChars)}`
}

function integrityBanner(state: VerificationLayerState): {
  title: string
  message: string
  tone: 'success' | 'warning' | 'danger'
} {
  switch (state) {
    case 'verified':
      return {
        title: 'Xác thực toàn vẹn thành công',
        message:
          'Mã băm văn bản hợp đồng khớp với dữ liệu đã cam kết trên Hyperledger Fabric.',
        tone: 'success',
      }
    case 'mismatch':
      return {
        title: 'Cảnh báo sai lệch toàn vẹn dữ liệu',
        message:
          'Phát hiện sai lệch giữa nội dung văn bản hiện tại và dữ liệu đã cam kết trên sổ cái.',
        tone: 'danger',
      }
    case 'not-recorded':
      return {
        title: 'Chưa có bản ghi',
        message: 'Bằng chứng này chưa được ghi nhận trên sổ cái.',
        tone: 'warning',
      }
    default:
      return {
        title: 'Chưa thể xác minh',
        message: 'Không thể truy vấn sổ cái tại thời điểm này.',
        tone: 'warning',
      }
  }
}

export function FabricLedgerEvidenceCard({
  contractId,
  contractHash,
  connectionState = 'unavailable',
  blockNumber,
  txHash,
  verifiedAt,
  networkMode = 'fabric',
  status = 'not-requested',
  onVerifyIntegrity,
  isVerifying = false,
  integrityResult,
}: FabricLedgerEvidenceCardProps): React.ReactElement {
  const [copiedTx, setCopiedTx] = React.useState(false)
  const [copiedHash, setCopiedHash] = React.useState(false)
  const [isEvidenceOpen, setIsEvidenceOpen] = React.useState(false)

  const isSimulation = networkMode === 'simulation'
  const integrityState = integrityResult
    ? resolveIntegrityState(integrityResult)
    : null
  const banner = integrityState ? integrityBanner(integrityState) : null

  const handleCopyTx = async () => {
    if (!txHash) return
    try {
      await navigator.clipboard.writeText(txHash)
      setCopiedTx(true)
      setTimeout(() => setCopiedTx(false), 2000)
    } catch {
      // Fallback ignore
    }
  }

  const handleCopyHash = async () => {
    if (!contractHash) return
    try {
      await navigator.clipboard.writeText(contractHash)
      setCopiedHash(true)
      setTimeout(() => setCopiedHash(false), 2000)
    } catch {
      // Fallback ignore
    }
  }

  return (
    <div
      data-testid="fabric-ledger-evidence-card"
      data-contract-id={contractId}
      className="w-full rounded-xl border border-[var(--border)] bg-[var(--surface)] p-5 shadow-sm space-y-4"
    >
      {/* Header */}
      <div className="flex items-center justify-between gap-2 border-b border-[var(--border)] pb-3">
        <div className="flex items-center gap-2">
          <ShieldCheck className="h-4 w-4 text-[var(--primary)]" />
          <h4 className="text-xs font-bold uppercase tracking-wider text-[var(--fg)]">
            Minh chứng sổ cái Blockchain Hyperledger Fabric
          </h4>
        </div>

        {isSimulation ? (
          <span
            data-testid="network-mode-simulation"
            className="inline-flex items-center gap-1 px-2 py-0.5 rounded text-[11px] font-medium bg-[var(--surface-muted)] text-[var(--warning)] border border-[var(--border)]"
          >
            <Info className="w-3 h-3 text-[var(--warning)]" />
            Mô phỏng blockchain
          </span>
        ) : (
          <span
            data-testid="network-mode-fabric"
            className="inline-flex items-center gap-1 px-2 py-0.5 rounded text-[11px] font-medium bg-[var(--surface-muted)] text-[var(--success)] border border-[var(--border)]"
          >
            <ShieldCheck className="w-3 h-3 text-[var(--success)]" />
            Hyperledger Fabric MSP
          </span>
        )}
      </div>

      <div className="flex items-center justify-between gap-3 rounded-lg border border-[var(--border)] bg-[var(--surface-muted)] px-3 py-2 text-xs">
        <span className="font-semibold text-[var(--muted)]">
          Trạng thái kết nối Fabric
        </span>
        <span
          data-testid="fabric-connection-state"
          className={
            connectionState === 'connected'
              ? 'font-bold text-[var(--success)]'
              : 'font-bold text-[var(--warning)]'
          }
        >
          {connectionState === 'connected'
            ? 'Đã kết nối'
            : connectionState === 'disabled'
              ? 'Đã tắt'
              : 'Không khả dụng'}
        </span>
      </div>

      <div className="flex items-center justify-between gap-3 rounded-lg border border-[var(--border)] bg-[var(--surface-muted)] px-3 py-2 text-xs">
        <span className="font-semibold text-[var(--muted)]">
          Trạng thái ghi sổ
        </span>
        <span
          data-testid="fabric-ledger-status"
          className="font-mono font-bold text-[var(--fg)]"
        >
          {status}
        </span>
      </div>

      {/* Description */}
      <p className="text-[11px] text-[var(--muted)] leading-relaxed">
        {isSimulation
          ? 'Giao dịch hợp đồng được mô phỏng theo chuẩn Hyperledger Fabric channel proptech-channel trong môi trường thử nghiệm.'
          : 'Hợp đồng được băm SHA-256 và gắn chữ ký số song phương, lưu trữ bất biến trên kênh chuỗi khối Hyperledger Fabric.'}
      </p>

      {/* Grid of Ledger Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs">
        {/* Block Number */}
        <div className="flex items-center justify-between gap-2 p-3 rounded-lg bg-[var(--surface-muted)] border border-[var(--border)]">
          <div className="flex items-center gap-2 min-w-0">
            <Blocks className="h-4 w-4 text-[var(--primary)] shrink-0" />
            <div className="flex flex-col min-w-0">
              <span className="text-[10px] uppercase text-[var(--muted)] font-semibold">
                Khối sổ cái (Block Height)
              </span>
              <span
                data-testid="fabric-block-number"
                className="font-mono font-bold text-[var(--fg)] text-xs truncate"
              >
                {isSimulation
                  ? 'Mô phỏng'
                  : blockNumber != null
                    ? `#${blockNumber}`
                    : 'Đang xử lý...'}
              </span>
            </div>
          </div>
        </div>

        {/* Commitment Timestamp */}
        <div className="flex items-center justify-between gap-2 p-3 rounded-lg bg-[var(--surface-muted)] border border-[var(--border)]">
          <div className="flex items-center gap-2 min-w-0">
            <Clock className="h-4 w-4 text-[var(--primary)] shrink-0" />
            <div className="flex flex-col min-w-0">
              <span className="text-[10px] uppercase text-[var(--muted)] font-semibold">
                Thời điểm ghi sổ cái
              </span>
              <span
                data-testid="fabric-timestamp"
                className="font-mono text-[var(--fg)] text-xs truncate"
              >
                {formatDate(verifiedAt)}
              </span>
            </div>
          </div>
        </div>

        {/* Transaction ID */}
        <div className="flex items-center justify-between gap-2 p-3 rounded-lg bg-[var(--surface-muted)] border border-[var(--border)] md:col-span-2">
          <div className="flex items-center gap-2 min-w-0 flex-1">
            <Hash className="h-4 w-4 text-[var(--primary)] shrink-0" />
            <div className="flex flex-col min-w-0 flex-1">
              <span className="text-[10px] uppercase text-[var(--muted)] font-semibold">
                Mã định danh giao dịch (TxID)
              </span>
              <span
                data-testid="fabric-tx-hash"
                className="font-mono text-[var(--fg)] text-xs truncate select-all"
                title={txHash || 'Chưa có TxID'}
              >
                {txHash ? truncateString(txHash, 14, 12) : 'Chưa có TxID'}
              </span>
            </div>
          </div>
          {txHash && (
            <button
              type="button"
              onClick={handleCopyTx}
              data-testid="copy-tx-btn"
              className="p-1.5 rounded bg-[var(--surface)] border border-[var(--border)] hover:bg-[var(--surface-muted)] text-[var(--muted)] hover:text-[var(--fg)] shrink-0 transition-colors"
              title="Sao chép TxID"
              aria-label="Sao chép TxID"
            >
              {copiedTx ? (
                <Check className="w-3.5 h-3.5 text-[var(--success)]" />
              ) : (
                <Copy className="w-3.5 h-3.5" />
              )}
            </button>
          )}
        </div>

        {/* Full-text SHA-256 Hash */}
        <div className="flex items-center justify-between gap-2 p-3 rounded-lg bg-[var(--surface-muted)] border border-[var(--border)] md:col-span-2">
          <div className="flex items-center gap-2 min-w-0 flex-1">
            <FileCheck2 className="h-4 w-4 text-[var(--primary)] shrink-0" />
            <div className="flex flex-col min-w-0 flex-1">
              <span className="text-[10px] uppercase text-[var(--muted)] font-semibold">
                Mã băm toàn văn hợp đồng (SHA-256 Digest)
              </span>
              <span
                data-testid="fabric-contract-hash"
                className="font-mono text-[var(--fg)] text-xs truncate select-all"
                title={contractHash || 'Chưa băm hợp đồng'}
              >
                {contractHash
                  ? truncateString(contractHash, 14, 12)
                  : 'Chưa băm hợp đồng'}
              </span>
            </div>
          </div>
          {contractHash && (
            <button
              type="button"
              onClick={handleCopyHash}
              data-testid="copy-hash-btn"
              className="p-1.5 rounded bg-[var(--surface)] border border-[var(--border)] hover:bg-[var(--surface-muted)] text-[var(--muted)] hover:text-[var(--fg)] shrink-0 transition-colors"
              title="Sao chép mã băm"
              aria-label="Sao chép mã băm"
            >
              {copiedHash ? (
                <Check className="w-3.5 h-3.5 text-[var(--success)]" />
              ) : (
                <Copy className="w-3.5 h-3.5" />
              )}
            </button>
          )}
        </div>
      </div>

      {/* Integrity Verification Result Banner */}
      {integrityResult && banner && (
        <div
          data-testid="integrity-result-banner"
          className={`flex items-start gap-2 p-3 rounded-lg border text-xs ${
            banner.tone === 'success'
              ? 'border-[var(--success)] bg-[var(--surface-muted)] text-[var(--success)]'
              : banner.tone === 'danger'
                ? 'border-[var(--danger)] bg-[var(--surface-muted)] text-[var(--danger)]'
                : 'border-[var(--warning)] bg-[var(--surface-muted)] text-[var(--warning)]'
          }`}
        >
          {banner.tone === 'success' ? (
            <CheckCircle2 className="w-4 h-4 shrink-0 mt-0.5" />
          ) : (
            <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
          )}
          <div className="flex flex-col">
            <span className="font-bold">{banner.title}</span>
            <span className="text-[11px] text-[var(--muted)] mt-0.5">
              {integrityResult.message || banner.message}
            </span>
          </div>
        </div>
      )}

      {integrityResult?.layers ? (
        <section
          data-testid="integrity-layers"
          className="space-y-2 rounded-lg border border-[var(--border)] bg-[var(--surface-muted)] p-3"
        >
          <h5 className="text-[10px] font-semibold uppercase tracking-wide text-[var(--muted)]">
            Ba lớp xác minh
          </h5>
          <div className="grid gap-2 sm:grid-cols-3">
            {(
              [
                ['offChain', 'Off-chain'],
                ['artifact', 'Artifact'],
                ['onChain', 'On-chain'],
              ] as const
            ).map(([key, label]) => {
              const layer = integrityResult.layers?.[key]
              return (
                <div
                  key={key}
                  className="rounded border border-[var(--border)] p-2 text-[11px]"
                >
                  <div className="font-semibold text-[var(--fg)]">{label}</div>
                  <div
                    data-testid={`integrity-layer-${key}`}
                    className="mt-1 font-mono text-[var(--muted)]"
                  >
                    {layerStateLabel(normalizeLayerStatus(layer?.status))}
                  </div>
                  {layer?.reason ? (
                    <p className="mt-1 text-[10px] text-[var(--muted)]">
                      {layer.reason}
                    </p>
                  ) : null}
                </div>
              )
            })}
          </div>
        </section>
      ) : null}

      <button
        type="button"
        data-testid="open-ledger-evidence"
        onClick={() => setIsEvidenceOpen(true)}
        className="w-full inline-flex items-center justify-center gap-2 px-4 py-2 text-xs font-semibold rounded-lg bg-[var(--surface-muted)] border border-[var(--border)] text-[var(--fg)] hover:border-[var(--primary)] hover:text-[var(--primary)] transition-colors"
      >
        Xem chi tiết sổ cái
      </button>
      <EvidencePackageDownload contractId={contractId} />
      <LedgerEvidenceDrawer
        contractId={contractId}
        open={isEvidenceOpen}
        onOpenChange={setIsEvidenceOpen}
      />

      {/* Action Button */}
      {onVerifyIntegrity && (
        <button
          type="button"
          onClick={onVerifyIntegrity}
          disabled={isVerifying}
          data-testid="verify-integrity-btn"
          className="w-full inline-flex items-center justify-center gap-2 px-4 py-2 text-xs font-semibold rounded-lg bg-[var(--surface-muted)] border border-[var(--border)] text-[var(--fg)] hover:border-[var(--primary)] hover:text-[var(--primary)] transition-colors disabled:opacity-50"
        >
          <RefreshCw
            className={`w-3.5 h-3.5 ${isVerifying ? 'animate-spin text-[var(--primary)]' : ''}`}
          />
          <span>
            {isVerifying
              ? 'Đang đối soát sổ cái...'
              : 'Đối soát toàn vẹn sổ cái Blockchain'}
          </span>
        </button>
      )}
    </div>
  )
}
