'use client'

import { useState } from 'react'
import Link from 'next/link'
import type { Route } from 'next'
import {
  ArrowLeft,
  FileSignature,
  AlertCircle,
  History,
  Info,
  Landmark,
  ShieldCheck,
  Sparkles,
  X,
} from 'lucide-react'
import {
  ContractDocumentViewer,
  PartyInfoCards,
  ContractStatusTimeline,
  SigningCeremonyModal,
  PublicServiceCitationPanel,
  BilateralSigningTimeline,
  FabricLedgerEvidenceCard,
} from '@/features/contracts'
import { DepositPaymentPanel } from '@/features/payments'
import { useContractWorkspace } from './use-contract-workspace'

export interface ContractWorkspaceProps {
  contractId: string
  currentUserId?: string
}

type MobileTab = 'document' | 'parties' | 'actions' | 'public-service' | 'audit'

export function ContractWorkspace({
  contractId,
  currentUserId,
}: ContractWorkspaceProps) {
  const {
    data,
    auditEvents,
    isLoading,
    error,
    isSigningModalOpen,
    isDownloadingPdf,
    isDownloadingDocx,
    isVerifyingIntegrity,
    integrityResult,
    noticeMessage,
    isTenant,
    signerName,
    signerRole,
    setIsSigningModalOpen,
    setNoticeMessage,
    loadData,
    handleDownloadPdf,
    handleDownloadDocx,
    handleVerifyIntegrity,
  } = useContractWorkspace({ contractId, currentUserId })

  const [activeMobileTab, setActiveMobileTab] = useState<MobileTab>('document')

  if (isLoading) {
    return (
      <div
        data-testid="contract-workspace-loading"
        className="w-full max-w-7xl mx-auto px-4 py-16 text-center flex flex-col items-center justify-center gap-3"
      >
        <div className="w-8 h-8 rounded-full border-2 border-[var(--primary)] border-t-transparent animate-spin" />
        <span className="text-xs text-[var(--muted)]">
          Đang tải không gian làm việc hợp đồng...
        </span>
      </div>
    )
  }

  if (error || !data) {
    return (
      <div
        data-testid="contract-workspace-error"
        className="w-full max-w-7xl mx-auto px-4 py-16 text-center flex flex-col items-center justify-center gap-4"
      >
        <AlertCircle className="w-10 h-10 text-[var(--danger)]" />
        <div className="max-w-md">
          <h3 className="text-base font-bold text-[var(--fg)]">
            Không thể tải hợp đồng
          </h3>
          <p className="text-xs text-[var(--muted)] mt-1">
            {error ||
              'Hợp đồng không tồn tại hoặc bạn không có quyền truy cập.'}
          </p>
        </div>
        <Link
          href={'/rental-applications' as Route}
          className="inline-flex items-center gap-1.5 px-4 py-2 text-xs font-semibold rounded-lg bg-[var(--primary)] text-white hover:opacity-90 transition-opacity"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Quay lại danh sách</span>
        </Link>
      </div>
    )
  }

  const { contract, document, parties, deposit, actions, ledger, access } = data
  const { signingEligibility } = actions
  const isSimulation = ledger?.networkMode === 'simulation'
  const isSuccessorOwner = access?.isSuccessorOwner === true

  const getReasonMessage = (reason: string | null) => {
    if (!reason) return `Hợp đồng đang ở trạng thái ${contract.status}.`
    switch (reason) {
      case 'DEPOSIT_NOT_PAID':
      case 'DEPOSIT_REQUIRED':
        return 'Vui lòng thanh toán khoản tiền đặt cọc bảo đảm trước khi mở quyền ký hợp đồng.'
      case 'KYC_NOT_VERIFIED':
        return 'Tài khoản của bạn chưa hoàn tất định danh KYC hoặc hồ sơ chưa được duyệt.'
      case 'CONTENT_NOT_LOCKED':
        return 'Nội dung hợp đồng đang trong giai đoạn soạn thảo, chưa chốt khóa phiên bản.'
      case 'ALREADY_SIGNED':
        return 'Bạn đã hoàn tất ký xác nhận VNPT SmartCA cho hợp đồng này. Đang chờ bên còn lại ký kết.'
      case 'NOT_PARTICIPANT':
        return 'Bạn không phải là bên tham gia (Chủ nhà hoặc Khách thuê) của hợp đồng này.'
      default:
        return `Hợp đồng đang ở trạng thái ${contract.status}.`
    }
  }

  return (
    <div
      data-testid="contract-workspace"
      className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 flex flex-col gap-6"
    >
      {/* Top Breadcrumb & Metadata Header */}
      <div className="flex flex-wrap items-center justify-between gap-4 border-b border-[var(--border)] pb-4">
        <div className="flex items-center gap-3">
          <Link
            href={'/rental-applications' as Route}
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-[var(--muted)] hover:text-[var(--primary)] transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Danh sách hồ sơ</span>
          </Link>
          <span className="text-[var(--border)]">|</span>
          <div className="flex items-center gap-2 text-xs">
            <span className="font-bold font-mono text-[var(--fg)]">
              {contract.code}
            </span>
            <span className="px-2 py-0.5 rounded-full text-[10px] font-bold uppercase bg-[var(--surface-muted)] text-[var(--primary)] border border-[var(--border)]">
              {contract.status}
            </span>
            {isSimulation ? (
              <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-[var(--surface-muted)] text-[var(--warning)] border border-[var(--border)]">
                Mô phỏng PoC
              </span>
            ) : (
              <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-[var(--surface-muted)] text-[var(--success)] border border-[var(--border)]">
                Hyperledger
              </span>
            )}
          </div>
        </div>

        <div className="text-xs text-[var(--muted)]">
          Bản sửa đổi:{' '}
          <strong className="text-[var(--fg)]">{`v${document.revision}`}</strong>
        </div>
      </div>

      {isSuccessorOwner ? (
        <div
          data-testid="successor-access-banner"
          className="flex items-start gap-3 rounded-xl border border-[var(--info)] bg-[var(--surface-muted)] p-4 text-xs text-[var(--fg)]"
        >
          <ShieldCheck className="mt-0.5 h-4 w-4 shrink-0 text-[var(--info)]" />
          <div>
            <p className="font-semibold">Quyền truy cập chủ nhà kế nhiệm</p>
            <p className="mt-1 leading-relaxed text-[var(--muted)]">
              Bạn được phép xem workspace theo transfer đã hoàn tất. Chủ nhà
              pháp lý gốc vẫn là {parties.landlord.name}; quyền kế nhiệm không
              thay thế chữ ký, snapshot pháp lý hoặc bằng chứng blockchain.
            </p>
          </div>
        </div>
      ) : null}

      {/* Notice Message Banner if present */}
      {noticeMessage && (
        <div
          data-testid="workspace-notice-banner"
          className="flex items-start justify-between gap-2 p-3 rounded-lg border border-[var(--warning)] bg-[var(--surface-muted)] text-xs text-[var(--fg)] animate-in fade-in duration-200"
        >
          <div className="flex items-start gap-2">
            <Info className="w-4 h-4 text-[var(--warning)] shrink-0 mt-0.5" />
            <span>{noticeMessage}</span>
          </div>
          <button
            type="button"
            onClick={() => setNoticeMessage(null)}
            className="text-[var(--muted)] hover:text-[var(--fg)] p-0.5"
            aria-label="Đóng thông báo"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        </div>
      )}

      {/* Prominent Signing Action Hero Banner */}
      <div
        data-testid="signing-eligibility-banner"
        className={`p-4 rounded-xl border flex flex-col sm:flex-row sm:items-center justify-between gap-4 transition-all ${
          signingEligibility.eligible
            ? 'bg-[var(--surface)] border-[var(--primary)] shadow-sm'
            : 'bg-[var(--surface-muted)] border-[var(--border)] text-[var(--muted)]'
        }`}
      >
        <div className="flex items-start gap-3">
          <div
            className={`w-9 h-9 rounded-lg flex items-center justify-center shrink-0 border ${
              signingEligibility.eligible
                ? 'bg-[var(--primary)] text-white border-[var(--primary)]'
                : 'bg-[var(--surface)] text-[var(--muted)] border-[var(--border)]'
            }`}
          >
            <FileSignature className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-xs font-bold uppercase tracking-wider text-[var(--fg)]">
              {signingEligibility.eligible
                ? 'Sẵn sàng ký hợp đồng điện tử'
                : 'Trạng thái ký kết hợp đồng'}
            </h3>
            <p className="text-xs leading-relaxed mt-0.5 text-[var(--fg)]">
              {signingEligibility.eligible
                ? 'Toàn bộ điều kiện tiên quyết đã hoàn tất. Bạn có thể xác thực sinh trắc học và Smart OTP để ký số VNPT SmartCA.'
                : signingEligibility.message ||
                  getReasonMessage(signingEligibility.reasonCode)}
            </p>
          </div>
        </div>

        {signingEligibility.eligible && (
          <button
            type="button"
            onClick={() => setIsSigningModalOpen(true)}
            aria-label="Tiến hành ký hợp đồng điện tử"
            className="inline-flex items-center justify-center gap-2 px-5 py-2.5 text-xs font-bold rounded-lg bg-[var(--primary)] text-white hover:opacity-90 shadow transition-all shrink-0 hover:scale-[1.02]"
          >
            <Sparkles className="w-4 h-4" />
            <span>Ký số VNPT SmartCA ngay</span>
          </button>
        )}
      </div>

      {/* Mobile Tab Switching Bar (hidden on desktop) */}
      <div className="flex lg:hidden items-center justify-between border-b border-[var(--border)] pb-2 overflow-x-auto gap-2 text-xs font-medium">
        <button
          type="button"
          onClick={() => setActiveMobileTab('document')}
          className={`px-3 py-1.5 rounded-md whitespace-nowrap ${
            activeMobileTab === 'document'
              ? 'bg-[var(--primary)] text-white'
              : 'text-[var(--muted)] hover:text-[var(--fg)]'
          }`}
        >
          Văn bản hợp đồng
        </button>
        <button
          type="button"
          onClick={() => setActiveMobileTab('parties')}
          className={`px-3 py-1.5 rounded-md whitespace-nowrap ${
            activeMobileTab === 'parties'
              ? 'bg-[var(--primary)] text-white'
              : 'text-[var(--muted)] hover:text-[var(--fg)]'
          }`}
        >
          Bên tham gia
        </button>
        <button
          type="button"
          onClick={() => setActiveMobileTab('actions')}
          className={`px-3 py-1.5 rounded-md whitespace-nowrap ${
            activeMobileTab === 'actions'
              ? 'bg-[var(--primary)] text-white'
              : 'text-[var(--muted)] hover:text-[var(--fg)]'
          }`}
        >
          Đặt cọc & Tiến trình
        </button>
        <button
          type="button"
          onClick={() => setActiveMobileTab('public-service')}
          className={`px-3 py-1.5 rounded-md whitespace-nowrap ${
            activeMobileTab === 'public-service'
              ? 'bg-[var(--primary)] text-white'
              : 'text-[var(--muted)] hover:text-[var(--fg)]'
          }`}
        >
          Dịch vụ công & Pháp lý
        </button>
        <button
          type="button"
          onClick={() => setActiveMobileTab('audit')}
          className={`px-3 py-1.5 rounded-md whitespace-nowrap ${
            activeMobileTab === 'audit'
              ? 'bg-[var(--primary)] text-white'
              : 'text-[var(--muted)] hover:text-[var(--fg)]'
          }`}
        >
          Sổ cái & Audit
        </button>
      </div>

      {/* 2-Column Responsive Workspace Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left Column: A4 Document Viewer */}
        <div
          className={`lg:col-span-7 xl:col-span-8 flex flex-col gap-6 ${
            activeMobileTab === 'document' ? 'block' : 'hidden lg:block'
          }`}
        >
          <ContractDocumentViewer
            document={document}
            contractCode={contract.code}
            status={contract.status}
            networkMode={ledger.networkMode}
            onDownloadPdf={handleDownloadPdf}
            onDownloadDocx={handleDownloadDocx}
            isDownloading={isDownloadingPdf || isDownloadingDocx}
          />
        </div>

        {/* Right Column: Interactive Panes & Ledgers */}
        <div
          className={`lg:col-span-5 xl:col-span-4 flex flex-col gap-6 ${
            activeMobileTab !== 'document' ? 'block' : 'hidden lg:block'
          }`}
        >
          {/* Party Info Cards */}
          {(activeMobileTab === 'parties' || true) && (
            <div
              className={
                activeMobileTab === 'parties' || activeMobileTab === 'document'
                  ? 'block'
                  : 'hidden lg:block'
              }
            >
              <PartyInfoCards
                tenant={parties.tenant}
                landlord={parties.landlord}
                currentUserId={currentUserId}
              />
            </div>
          )}

          {/* Deposit Payment Panel */}
          {contract.executionPolicy ? (
            <section
              data-testid="contract-execution-policy"
              className="rounded-xl border border-[var(--primary)]/30 bg-[var(--primary-soft)]/20 p-5 shadow-sm"
            >
              <div className="flex items-start gap-3">
                <Landmark
                  className="mt-0.5 h-5 w-5 shrink-0 text-[var(--primary)]"
                  aria-hidden="true"
                />
                <div className="space-y-1 text-xs">
                  <h3 className="font-bold text-[var(--fg)]">
                    Trình tự cọc và ký đã chốt
                  </h3>
                  <p className="font-semibold text-[var(--primary)]">
                    {contract.executionPolicy.strategy === 'DEPOSIT_FIRST'
                      ? 'Cọc trước, sau đó ký hợp đồng'
                      : 'Ký hợp đồng trước, sau đó thanh toán cọc'}
                  </p>
                  <p className="leading-relaxed text-[var(--muted)]">
                    {contract.executionPolicy.nextAction}
                  </p>
                </div>
              </div>
            </section>
          ) : null}

          {(activeMobileTab === 'actions' || true) && (
            <div
              className={
                activeMobileTab === 'actions' || activeMobileTab === 'document'
                  ? 'block'
                  : 'hidden lg:block'
              }
            >
              <DepositPaymentPanel
                deposit={deposit}
                isTenant={isTenant}
                contractId={contractId}
                onPaymentSuccess={() => loadData(false)}
              />
            </div>
          )}

          {/* Bilateral Signing Stepper */}
          {(activeMobileTab === 'actions' || true) && (
            <div
              className={
                activeMobileTab === 'actions' || activeMobileTab === 'document'
                  ? 'block'
                  : 'hidden lg:block'
              }
            >
              <BilateralSigningTimeline
                tenant={parties.tenant}
                landlord={parties.landlord}
                contractStatus={contract.status}
                currentUserId={currentUserId}
                userRole={signerRole}
                isEligibleToSign={signingEligibility.eligible}
                onSignClick={() => setIsSigningModalOpen(true)}
              />
            </div>
          )}

          {/* Contract Status Timeline */}
          {(activeMobileTab === 'actions' || true) && (
            <div
              className={
                activeMobileTab === 'actions' || activeMobileTab === 'document'
                  ? 'block'
                  : 'hidden lg:block'
              }
            >
              <ContractStatusTimeline
                status={contract.status}
                {...(contract.executionPolicy?.strategy
                  ? { strategy: contract.executionPolicy.strategy }
                  : {})}
                depositStatus={deposit?.status}
                signedByTenant={parties.tenant.hasSigned}
                signedByLandlord={parties.landlord.hasSigned}
                txHash={ledger.txHash}
              />
            </div>
          )}

          {/* Public Service & Legal Citation Panel */}
          <div
            className={
              activeMobileTab === 'public-service' ||
              activeMobileTab === 'document'
                ? 'block'
                : 'hidden lg:block'
            }
          >
            <PublicServiceCitationPanel
              contractId={contractId}
              contractCode={contract.code}
            />
          </div>

          {/* Fabric Ledger Evidence Card */}
          {(activeMobileTab === 'audit' || true) && (
            <div
              className={
                activeMobileTab === 'audit' || activeMobileTab === 'document'
                  ? 'block'
                  : 'hidden lg:block'
              }
            >
              <FabricLedgerEvidenceCard
                contractId={contractId}
                contractCode={contract.code}
                contractHash={document.lockedHash}
                blockNumber={ledger.blockNumber}
                txHash={ledger.txHash}
                verifiedAt={ledger.verifiedAt}
                networkMode={ledger.networkMode}
                status={ledger.status}
                onVerifyIntegrity={handleVerifyIntegrity}
                isVerifying={isVerifyingIntegrity}
                integrityResult={integrityResult}
              />
            </div>
          )}

          {/* Audit Events Trail Drawer */}
          {auditEvents && auditEvents.length > 0 && (
            <div
              data-testid="audit-events-panel"
              className={`rounded-xl border border-[var(--border)] bg-[var(--surface)] p-5 shadow-sm flex flex-col gap-3 ${
                activeMobileTab === 'audit' || activeMobileTab === 'document'
                  ? 'block'
                  : 'hidden lg:block'
              }`}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <History className="w-4 h-4 text-[var(--primary)]" />
                  <h4 className="text-xs font-bold uppercase tracking-wider text-[var(--fg)]">
                    Nhật ký sự kiện sổ cái ({auditEvents.length})
                  </h4>
                </div>
              </div>

              <div className="space-y-2 max-h-60 overflow-y-auto pr-1">
                {auditEvents.map(evt => (
                  <div
                    key={evt.id}
                    className="p-2.5 rounded-lg bg-[var(--surface-muted)] border border-[var(--border)] text-xs flex flex-col gap-1"
                  >
                    <div className="flex items-center justify-between text-[10px]">
                      <span className="font-bold font-mono text-[var(--primary)]">
                        {evt.eventType}
                      </span>
                      <span className="text-[var(--muted)]">
                        {new Date(evt.occurredAt).toLocaleTimeString('vi-VN')}
                      </span>
                    </div>
                    <p className="text-[11px] text-[var(--fg)]">
                      {evt.description}
                    </p>
                    {evt.txHash && (
                      <span className="font-mono text-[10px] text-[var(--muted)] truncate">
                        tx: {evt.txHash}
                      </span>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Signing Ceremony Modal Wizard */}
      <SigningCeremonyModal
        isOpen={isSigningModalOpen}
        onClose={() => setIsSigningModalOpen(false)}
        contractId={contractId}
        contractCode={contract.code}
        signerName={signerName}
        signerRole={signerRole}
        onSigningSuccess={() => {
          setIsSigningModalOpen(false)
          loadData(false)
        }}
      />
    </div>
  )
}
