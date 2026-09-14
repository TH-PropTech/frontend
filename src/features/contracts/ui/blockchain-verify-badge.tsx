'use client'

import { useState } from 'react'
import {
  ShieldCheck,
  Info,
  Copy,
  Check,
  RefreshCw,
  AlertTriangle,
} from 'lucide-react'
import type { ContractLedgerSummary } from '../api/contracts-api'

export interface BlockchainVerifyBadgeProps {
  ledger: ContractLedgerSummary
  contractId: string
  onVerifyIntegrity?: () => Promise<void> | void
  isVerifying?: boolean
  integrityResult?: { isValid: boolean; message?: string } | null
}

export function BlockchainVerifyBadge({
  ledger,
  contractId,
  onVerifyIntegrity,
  isVerifying = false,
  integrityResult,
}: BlockchainVerifyBadgeProps) {
  const [copied, setCopied] = useState(false)

  const isSimulation = ledger?.networkMode === 'simulation'
  const txHash = ledger?.txHash

  const handleCopy = async () => {
    if (!txHash) return
    try {
      await navigator.clipboard.writeText(txHash)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch {
      // Fallback
    }
  }

  const truncatedTxHash = txHash
    ? `${txHash.substring(0, 10)}...${txHash.substring(txHash.length - 8)}`
    : 'Chưa khởi tạo'

  return (
    <div
      data-testid="blockchain-verify-badge"
      data-contract-id={contractId}
      className="w-full rounded-xl border border-[var(--border)] bg-[var(--surface)] p-5 shadow-sm flex flex-col gap-4"
    >
      {/* Header with Network Mode */}
      <div className="flex items-center justify-between gap-2">
        <div className="flex items-center gap-2">
          <ShieldCheck className="w-4 h-4 text-[var(--primary)]" />
          <h4 className="text-xs font-bold uppercase tracking-wider text-[var(--fg)]">
            Xác thực Blockchain & Sổ cái
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
            Hyperledger Fabric
          </span>
        )}
      </div>

      {/* Simulation explanation notice */}
      {isSimulation && (
        <p className="text-[11px] text-[var(--muted)] leading-relaxed">
          Giao dịch hợp đồng và mã băm được mô phỏng trong môi trường PoC theo
          quy chuẩn chuỗi khối Hyperledger Fabric. Không cấp số khối (block
          number) như tài sản pháp lý chính thức.
        </p>
      )}

      {/* Hash & Ledger details */}
      <div className="space-y-2 text-xs">
        {/* Transaction Hash */}
        <div className="flex items-center justify-between gap-2 p-2 rounded-lg bg-[var(--surface-muted)] border border-[var(--border)]">
          <div className="flex flex-col min-w-0">
            <span className="text-[10px] uppercase font-bold text-[var(--muted)]">
              Mã giao dịch (txHash)
            </span>
            <span
              className="font-mono text-[11px] text-[var(--fg)] truncate"
              title={txHash || ''}
            >
              {truncatedTxHash}
            </span>
          </div>

          {txHash && (
            <button
              type="button"
              onClick={handleCopy}
              aria-label="Sao chép mã giao dịch"
              className="p-1.5 rounded-md hover:bg-[var(--surface)] text-[var(--muted)] hover:text-[var(--fg)] transition-colors relative"
            >
              {copied ? (
                <Check className="w-3.5 h-3.5 text-[var(--success)]" />
              ) : (
                <Copy className="w-3.5 h-3.5" />
              )}
              {copied && (
                <span className="absolute -top-7 right-0 px-1.5 py-0.5 text-[10px] font-medium bg-[var(--surface-raised)] text-[var(--fg)] rounded shadow-sm border border-[var(--border)] whitespace-nowrap">
                  Đã sao chép!
                </span>
              )}
            </button>
          )}
        </div>

        {/* Block Number & Timestamp */}
        <div className="grid grid-cols-2 gap-2 text-xs">
          <div className="p-2 rounded-lg bg-[var(--surface-muted)] border border-[var(--border)]">
            <span className="text-[10px] uppercase font-bold text-[var(--muted)] block">
              Số khối (Block)
            </span>
            <span className="font-mono font-medium text-[var(--fg)] text-[11px]">
              {isSimulation
                ? 'Không áp dụng (PoC)'
                : ledger?.blockNumber
                  ? `#${ledger.blockNumber}`
                  : 'Đang ghi nhận'}
            </span>
          </div>

          <div className="p-2 rounded-lg bg-[var(--surface-muted)] border border-[var(--border)]">
            <span className="text-[10px] uppercase font-bold text-[var(--muted)] block">
              Trạng thái sổ cái
            </span>
            <span className="font-medium text-[var(--primary)] text-[11px] uppercase">
              {ledger?.status || 'Chưa ghi nhận'}
            </span>
          </div>
        </div>
      </div>

      {/* Integrity result banner */}
      {integrityResult && (
        <div
          data-testid="integrity-result-box"
          className={`flex items-center gap-2 p-3 rounded-lg border text-xs ${
            integrityResult.isValid
              ? 'bg-[var(--surface-muted)] border-[var(--success)] text-[var(--success)]'
              : 'bg-[var(--surface-muted)] border-[var(--danger)] text-[var(--danger)]'
          }`}
        >
          {integrityResult.isValid ? (
            <ShieldCheck className="w-4 h-4 shrink-0" />
          ) : (
            <AlertTriangle className="w-4 h-4 shrink-0" />
          )}
          <span className="font-medium">
            {integrityResult.message ||
              (integrityResult.isValid
                ? 'Tính toàn vẹn hợp đồng hợp lệ: Hash khớp 100% với bản ghi sổ cái.'
                : 'Cảnh báo sai lệch: Nội dung đã bị thay đổi so với bản gốc trên sổ cái!')}
          </span>
        </div>
      )}

      {/* Verification button */}
      {onVerifyIntegrity && (
        <button
          type="button"
          onClick={onVerifyIntegrity}
          disabled={isVerifying || !txHash}
          aria-label="Xác minh tính toàn vẹn"
          className="w-full inline-flex items-center justify-center gap-2 px-3 py-2 text-xs font-semibold rounded-lg border border-[var(--border)] bg-[var(--surface-muted)] text-[var(--fg)] hover:bg-[var(--surface)] disabled:opacity-50 transition-colors"
        >
          <RefreshCw
            className={`w-3.5 h-3.5 ${isVerifying ? 'animate-spin' : ''}`}
          />
          <span>
            {isVerifying
              ? 'Đang kiểm tra đối soát...'
              : 'Xác minh tính toàn vẹn (Tamper Check)'}
          </span>
        </button>
      )}
    </div>
  )
}
