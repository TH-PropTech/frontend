'use client'

import { useState, type ReactElement } from 'react'
import { AlertCircle, CheckCircle2, Clock3, LockKeyhole } from 'lucide-react'
import {
  BilateralSigningTimeline,
  ContractDocumentViewer,
  FabricLedgerEvidenceCard,
  lockContractContent,
  SigningCeremonyModal,
  type ContractRouteStep,
  type ContractViewDto,
} from '@/features/contracts'
import { DepositPaymentPanel } from '@/features/payments'
import type { ContractAuditEventDto } from '@/features/contracts'
import type { UseContractWorkspaceOptions } from './use-contract-workspace'

export interface ContractStepContentProps {
  contractId: string
  currentUserId?: UseContractWorkspaceOptions['currentUserId']
  step: ContractRouteStep
  data: ContractViewDto
  auditEvents: ContractAuditEventDto[]
  isTenant: boolean
  signerName: string
  signerRole: 'tenant' | 'landlord'
  isSigningModalOpen: boolean
  isDownloadingPdf: boolean
  isDownloadingDocx: boolean
  isVerifyingIntegrity: boolean
  integrityResult: {
    isValid: boolean | null
    verificationStatus?: 'valid' | 'invalid' | 'not-recorded' | 'unavailable'
    message?: string
  } | null
  setIsSigningModalOpen: (open: boolean) => void
  loadData: (isBackground?: boolean) => Promise<void>
  /** Làm mới nền, không thay trang bằng spinner. */
  refresh: () => Promise<void>
  handleDownloadPdf: () => Promise<void>
  handleDownloadDocx: () => Promise<void>
  handleVerifyIntegrity: () => Promise<void>
}

interface ContractArtifactStepProps {
  contractId: string
  data: ContractViewDto
  loadData: (isBackground?: boolean) => Promise<void>
  isDownloadingPdf: boolean
  isDownloadingDocx: boolean
  handleDownloadPdf: () => Promise<void>
  handleDownloadDocx: () => Promise<void>
}

function ContractArtifactStep({
  contractId,
  data,
  loadData,
  isDownloadingPdf,
  isDownloadingDocx,
  handleDownloadPdf,
  handleDownloadDocx,
}: ContractArtifactStepProps): ReactElement {
  const [isLocking, setIsLocking] = useState(false)
  const [lockError, setLockError] = useState<string | null>(null)
  const canLock = data.actions.canLockContent === true
  const downloadHandlers = data.actions.canDownloadArtifact
    ? { onDownloadPdf: handleDownloadPdf, onDownloadDocx: handleDownloadDocx }
    : {}

  const handleLock = async (): Promise<void> => {
    setIsLocking(true)
    setLockError(null)
    try {
      await lockContractContent(contractId, data.document.revision)
      await loadData(true)
    } catch (error: unknown) {
      setLockError(
        error instanceof Error
          ? error.message
          : 'Không thể khóa nội dung hợp đồng.'
      )
    } finally {
      setIsLocking(false)
    }
  }

  return (
    <div className="space-y-4">
      <ContractDocumentViewer
        document={data.document}
        contractCode={data.contract.code}
        status={data.contract.status}
        networkMode={data.ledger.networkMode}
        parties={data.parties}
        property={data.contract.property}
        commercial={data.contract.commercial}
        startDate={data.contract.startDate}
        endDate={data.contract.endDate}
        {...downloadHandlers}
        isDownloading={isDownloadingPdf || isDownloadingDocx}
      />
      <section className="rounded-xl border border-[var(--border)] bg-[var(--surface)] p-5 shadow-sm">
        <div className="flex items-start gap-3">
          <LockKeyhole
            className="mt-0.5 h-5 w-5 shrink-0 text-[var(--primary)]"
            aria-hidden="true"
          />
          <div className="flex-1">
            <h2 className="text-sm font-bold">Artifact hợp đồng</h2>
            <p className="mt-1 text-xs leading-relaxed text-[var(--muted)]">
              {data.document.lockedHash
                ? 'Nội dung đã khóa và sẵn sàng cho các bước thanh toán, ký số và ghi nhận Fabric.'
                : 'Hãy kiểm tra nội dung trước khi khóa artifact để bảo toàn cùng một digest cho hai chữ ký.'}
            </p>
            {canLock ? (
              <button
                type="button"
                onClick={() => void handleLock()}
                disabled={isLocking}
                className="mt-3 inline-flex min-h-10 items-center gap-2 rounded-lg bg-[var(--primary)] px-4 py-2 text-xs font-bold text-white transition-opacity hover:opacity-90 disabled:opacity-50 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--primary)]"
              >
                <LockKeyhole className="h-4 w-4" aria-hidden="true" />
                {isLocking ? 'Đang khóa nội dung...' : 'Khóa artifact hợp đồng'}
              </button>
            ) : (
              <p className="mt-3 inline-flex items-center gap-1.5 text-xs font-semibold text-[var(--success)]">
                <CheckCircle2 className="h-4 w-4" aria-hidden="true" />
                {data.document.lockedHash
                  ? 'Artifact hợp đồng đã được khóa bảo toàn và sẵn sàng ký kết'
                  : 'Đang chờ Chủ nhà kiểm tra và khóa nội dung hợp đồng'}
              </p>
            )}
            {lockError ? (
              <p
                className="mt-2 flex items-start gap-1.5 text-xs text-[var(--danger)]"
                role="alert"
              >
                <AlertCircle
                  className="mt-0.5 h-4 w-4 shrink-0"
                  aria-hidden="true"
                />
                {lockError}
              </p>
            ) : null}
          </div>
        </div>
      </section>
    </div>
  )
}

export function ContractStepContent({
  contractId,
  currentUserId,
  step,
  data,
  auditEvents,
  isTenant,
  signerName,
  signerRole,
  isSigningModalOpen,
  isDownloadingPdf,
  isDownloadingDocx,
  isVerifyingIntegrity,
  integrityResult,
  setIsSigningModalOpen,
  loadData,
  refresh,
  handleDownloadPdf,
  handleDownloadDocx,
  handleVerifyIntegrity,
}: ContractStepContentProps): ReactElement {
  const signingEligibility = data.actions.signingEligibility

  if (step === 'document') {
    return (
      <ContractArtifactStep
        contractId={contractId}
        data={data}
        loadData={loadData}
        isDownloadingPdf={isDownloadingPdf}
        isDownloadingDocx={isDownloadingDocx}
        handleDownloadPdf={handleDownloadPdf}
        handleDownloadDocx={handleDownloadDocx}
      />
    )
  }

  if (step === 'deposit') {
    return (
      <div className="space-y-4">
        <section className="rounded-xl border border-[var(--primary)]/30 bg-[var(--primary-soft)]/20 p-5">
          <h2 className="text-sm font-bold">Điều kiện đặt cọc</h2>
          <p className="mt-1 text-xs leading-relaxed text-[var(--muted)]">
            {data.contract.executionPolicy?.nextAction ??
              'Hoàn tất khoản đặt cọc theo chính sách hợp đồng.'}
          </p>
        </section>
        <DepositPaymentPanel
          deposit={data.deposit}
          isTenant={isTenant}
          contractId={contractId}
          onPaymentSuccess={() => void refresh()}
          onRefresh={() => void refresh()}
          isActiveStep
        />
      </div>
    )
  }

  if (step === 'signing') {
    return (
      <div className="space-y-4">
        <section className="rounded-xl border border-[var(--primary)]/30 bg-[var(--primary-soft)]/20 p-5">
          <h2 className="text-sm font-bold">Ký số trên cùng artifact</h2>
          <p className="mt-1 text-xs leading-relaxed text-[var(--muted)]">
            {signingEligibility.eligible
              ? 'Bạn có thể bắt đầu xác thực eKYC, Smart OTP và phiên ký VNPT SmartCA.'
              : (signingEligibility.message ??
                'Hệ thống chưa mở điều kiện ký cho hợp đồng này.')}
          </p>
        </section>
        <BilateralSigningTimeline
          tenant={data.parties.tenant}
          landlord={data.parties.landlord}
          contractStatus={data.contract.status}
          currentUserId={currentUserId}
          userRole={signerRole}
          isEligibleToSign={signingEligibility.eligible}
          onSignClick={() => setIsSigningModalOpen(true)}
          isActiveStep
        />
        <SigningCeremonyModal
          isOpen={isSigningModalOpen}
          onClose={() => setIsSigningModalOpen(false)}
          contractId={contractId}
          contractCode={data.contract.code}
          signerName={signerName}
          signerRole={signerRole}
          onSigningSuccess={() => {
            setIsSigningModalOpen(false)
            void refresh()
          }}
        />
      </div>
    )
  }

  if (step === 'move-in') {
    return (
      <section
        data-testid="contract-step-move-in"
        className="rounded-xl border border-[var(--border)] bg-[var(--surface)] p-5 shadow-sm"
      >
        <h2 className="text-sm font-bold">Quyết toán và bàn giao nhận nhà</h2>
        <p className="mt-1 text-xs leading-relaxed text-[var(--muted)]">
          Khoản quyết toán nhận nhà, yêu cầu thanh toán và biên bản bàn giao sẽ
          hiển thị tại đây khi hợp đồng có quyết toán.
        </p>
      </section>
    )
  }

  return (
    <div className="space-y-4">
      <section className="rounded-xl border border-[var(--border)] bg-[var(--surface)] p-5 shadow-sm">
        <div className="flex items-start gap-3">
          <Clock3
            className="mt-0.5 h-5 w-5 shrink-0 text-[var(--primary)]"
            aria-hidden="true"
          />
          <div>
            <h2 className="text-sm font-bold">Ghi nhận và đối soát Fabric</h2>
            <p className="mt-1 text-xs leading-relaxed text-[var(--muted)]">
              Bằng chứng chỉ được xác nhận sau khi worker commit transaction
              thật qua Fabric Gateway.
            </p>
          </div>
        </div>
      </section>
      <FabricLedgerEvidenceCard
        contractId={contractId}
        contractCode={data.contract.code}
        contractHash={data.document.lockedHash}
        connectionState={data.ledger.connectionState}
        blockNumber={data.ledger.blockNumber}
        txHash={data.ledger.txHash}
        verifiedAt={data.ledger.verifiedAt}
        networkMode={data.ledger.networkMode}
        status={data.ledger.status}
        onVerifyIntegrity={handleVerifyIntegrity}
        isVerifying={isVerifyingIntegrity}
        integrityResult={integrityResult}
      />
      <section className="rounded-xl border border-[var(--border)] bg-[var(--surface)] p-5 shadow-sm">
        <h2 className="text-sm font-bold">Audit trail</h2>
        {auditEvents.length === 0 ? (
          <p className="mt-2 text-xs text-[var(--muted)]">
            Chưa có sự kiện ledger để hiển thị.
          </p>
        ) : (
          <ul className="mt-3 space-y-2">
            {auditEvents.map(event => (
              <li
                key={event.id}
                className="rounded-lg border border-[var(--border)] bg-[var(--surface-muted)] p-3 text-xs"
              >
                <div className="flex flex-wrap justify-between gap-2 font-semibold">
                  <span>{event.displayCode}</span>
                  <span className="text-[var(--muted)]">{event.status}</span>
                </div>
                <p className="mt-1 text-[var(--muted)]">{event.description}</p>
              </li>
            ))}
          </ul>
        )}
      </section>
    </div>
  )
}
