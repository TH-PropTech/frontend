'use client'

import { useState, type ReactElement } from 'react'
import { AlertCircle, CheckCircle2, Clock3, LockKeyhole } from 'lucide-react'
import {
  BilateralSigningTimeline,
  ContractDocumentViewer,
  ContractViewSwitcher,
  FabricLedgerEvidenceCard,
  getLedgerStatusLabel,
  isDepositPaid,
  lockContractContent,
  renderAndLockContractArtifact,
  SigningCeremonyModal,
  type ContractRouteStep,
  type ContractViewDto,
} from '@/features/contracts'
import { DepositPaymentPanel } from '@/features/payments'
import { PaymentSchedulePanel } from '@/features/payments/ui/payment-schedule-panel'
import { MoveInSettlementPanel } from '@/features/move-in-settlement'
import { MoveOutPanel, toMoveOutGates } from '@/features/move-out-settlement'
import { OccupantRequestsPanel } from '@/features/occupant-requests'
import type { ContractAuditEventDto } from '@/features/contracts'
import { ledgerEventLabel } from '@/shared/lib/ledger-event-labels'
import { LandlordReceiptsPanel } from './landlord-receipts-panel'
import type { UseContractWorkspaceOptions } from './use-contract-workspace'

function StepGuide({
  title,
  steps,
}: {
  title: string
  steps: readonly string[]
}): ReactElement {
  return (
    <section
      data-testid="step-guide"
      className="rounded-md border border-[var(--border)] bg-[var(--surface)] p-5 shadow-sm"
    >
      <h3 className="text-xs font-bold uppercase tracking-wider text-[var(--muted)]">
        {title}
      </h3>
      <ol className="mt-3 grid gap-3 sm:grid-cols-3">
        {steps.map((text, index) => (
          <li key={text} className="flex items-start gap-3 text-xs">
            <span
              aria-hidden="true"
              className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-[var(--primary-soft)] text-[11px] font-bold text-[var(--primary)]"
            >
              {index + 1}
            </span>
            <span className="leading-relaxed text-[var(--fg)]">{text}</span>
          </li>
        ))}
      </ol>
    </section>
  )
}

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
  const canLockContent = data.actions.canLockContent === true
  const canLock = canLockContent || data.actions.canLockArtifact === true
  const downloadHandlers = data.actions.canDownloadArtifact
    ? { onDownloadPdf: handleDownloadPdf, onDownloadDocx: handleDownloadDocx }
    : {}

  const handleLock = async (): Promise<void> => {
    setIsLocking(true)
    setLockError(null)
    try {
      if (canLockContent) {
        await lockContractContent(contractId, data.document.revision)
      }
      // Khóa nội dung xong phải có ngay bản PDF chuẩn thì SmartCA mới mở phiên ký.
      await renderAndLockContractArtifact(contractId)
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
      <ContractViewSwitcher
        contractId={contractId}
        contractCode={data.contract.code}
        pdfAvailable={data.actions.canDownloadArtifact === true}
        page={
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
        }
      />
      <section className="rounded-md border border-[var(--border)] bg-[var(--surface)] p-5 shadow-sm">
        <div className="flex items-start gap-3">
          <LockKeyhole
            className="mt-0.5 h-5 w-5 shrink-0 text-[var(--primary)]"
            aria-hidden="true"
          />
          <div className="flex-1">
            <h2 className="text-sm font-bold">Bản PDF hợp đồng</h2>
            <p className="mt-1 text-xs leading-relaxed text-[var(--muted)]">
              {data.document.lockedHash
                ? 'Nội dung đã khóa và sẵn sàng cho các bước thanh toán, ký số và lưu vết hợp đồng.'
                : 'Hãy kiểm tra nội dung trước khi khóa bản PDF để cả hai bên cùng ký đúng một bản.'}
            </p>
            {canLock ? (
              <button
                type="button"
                onClick={() => void handleLock()}
                disabled={isLocking}
                className="mt-3 inline-flex min-h-10 items-center gap-2 rounded-sm bg-[var(--primary)] px-4 py-2 text-xs font-bold text-white transition-opacity hover:opacity-90 disabled:opacity-50 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--primary)]"
              >
                <LockKeyhole className="h-4 w-4" aria-hidden="true" />
                {isLocking
                  ? 'Đang khóa và tạo PDF...'
                  : 'Khóa nội dung & tạo bản PDF'}
              </button>
            ) : (
              <p className="mt-3 inline-flex items-center gap-1.5 text-xs font-semibold text-[var(--success)]">
                <CheckCircle2 className="h-4 w-4" aria-hidden="true" />
                {data.document.canonicalArtifact
                  ? 'Bản PDF hợp đồng đã được khóa và sẵn sàng ký kết'
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
  const bothSigned =
    data.parties.tenant.hasSigned && data.parties.landlord.hasSigned

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
        <section className="rounded-md border border-[var(--primary)]/30 bg-[var(--primary-soft)]/20 p-5">
          <h2 className="text-sm font-bold">Điều kiện đặt cọc</h2>
          <p className="mt-1 text-xs leading-relaxed text-[var(--muted)]">
            {data.contract.executionPolicy?.nextAction ??
              'Hoàn tất khoản đặt cọc theo chính sách hợp đồng.'}
          </p>
        </section>
        <StepGuide
          title="Quy trình đặt cọc"
          steps={[
            'Kiểm tra số tiền cọc và điều khoản hoàn trả trong hợp đồng.',
            'Chọn cổng thanh toán rồi xác nhận thanh toán.',
            'Hệ thống tự ghi nhận tiền cọc và mở bước tiếp theo.',
          ]}
        />
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
        <section className="rounded-md border border-[var(--primary)]/30 bg-[var(--primary-soft)]/20 p-5">
          <h2 className="text-sm font-bold">Ký số trên cùng một bản PDF</h2>
          <p className="mt-1 text-xs leading-relaxed text-[var(--muted)]">
            {bothSigned
              ? 'Cả hai bên đã ký. Hợp đồng đã đủ chữ ký trên cùng một bản PDF; bước tiếp theo là lưu vết chống sửa đổi.'
              : signingEligibility.eligible
                ? 'Bạn có thể bắt đầu ký. Hãy đọc lại bản PDF trước, sau đó chọn phương thức ký phù hợp.'
                : (signingEligibility.message ??
                  'Hệ thống chưa mở điều kiện ký cho hợp đồng này.')}
          </p>
        </section>
        {!bothSigned && signingEligibility.eligible ? (
          <StepGuide
            title="Cách ký hợp đồng"
            steps={[
              'Đọc kỹ bản PDF hợp đồng (nút "Xem bản PDF hợp đồng" phía trên).',
              'Bấm ký và chọn phương thức: SmartCA hoặc sinh trắc + Smart OTP.',
              'Xác nhận; hệ thống ghi nhận chữ ký và chờ bên còn lại.',
            ]}
          />
        ) : null}
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

  if (step === 'move-out') {
    return (
      <div data-testid="contract-step-move-out" className="space-y-4">
        <MoveOutPanel
          contractId={contractId}
          role={signerRole}
          depositAmount={data.contract.commercial.deposit}
          gates={toMoveOutGates(data.flow?.nextActions ?? [])}
          onChanged={refresh}
          phase={data.flow?.moveOut?.phase}
          utilityRates={data.contract.commercial.utilityRates}
        />
      </div>
    )
  }

  if (step === 'move-in') {
    return (
      <div data-testid="contract-step-move-in" className="space-y-4">
        <LandlordReceiptsPanel
          contractId={contractId}
          viewerRole={signerRole}
        />
        <MoveInSettlementPanel
          settlement={data.settlement ?? null}
          role={signerRole}
          depositConfirmed={isDepositPaid(data.deposit?.status)}
          utilityRates={data.contract.commercial.utilityRates}
          onRefresh={() => void refresh()}
          onOpenInvoices={() =>
            document
              .getElementById('payment-schedule')
              ?.scrollIntoView({ behavior: 'smooth' })
          }
        />
        <OccupantRequestsPanel
          contractId={contractId}
          role={signerRole}
          contractActive={data.contract.status === 'active'}
          currentRent={data.contract.commercial.monthlyRent}
          onChanged={refresh}
        />
        <PaymentSchedulePanel contractId={contractId} viewerRole={signerRole} />
      </div>
    )
  }

  return (
    <div className="space-y-4">
      <section className="rounded-md border border-[var(--border)] bg-[var(--surface)] p-5 shadow-sm">
        <div className="flex items-start gap-3">
          <Clock3
            className="mt-0.5 h-5 w-5 shrink-0 text-[var(--primary)]"
            aria-hidden="true"
          />
          <div>
            <h2 className="text-sm font-bold">
              Lưu vết và đối soát chống sửa đổi
            </h2>
            <p className="mt-1 text-xs leading-relaxed text-[var(--muted)]">
              Bằng chứng chỉ được xác nhận sau khi hệ thống ghi nhận xong giao
              dịch lưu vết thật.
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
      <section className="rounded-md border border-[var(--border)] bg-[var(--surface)] p-5 shadow-sm">
        <h2 className="text-sm font-bold">Nhật ký bằng chứng</h2>
        {auditEvents.length === 0 ? (
          <p className="mt-2 text-xs text-[var(--muted)]">
            Chưa có sự kiện ledger để hiển thị.
          </p>
        ) : (
          <ul className="mt-3 space-y-2">
            {auditEvents.map(event => (
              <li
                key={event.id}
                className="rounded-sm border border-[var(--border)] bg-[var(--surface-muted)] p-3 text-xs"
              >
                <div className="flex flex-wrap justify-between gap-2 font-semibold">
                  <span>{ledgerEventLabel(event.eventType)}</span>
                  <span className="text-[var(--muted)]">
                    {getLedgerStatusLabel(event.status)}
                  </span>
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
