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
import { Button } from '@/shared/ui/button'
import { Badge } from '@/shared/ui/badge'
import {
  ContractDocumentViewer,
  ContractFlowGuide,
  PartyInfoCards,
  ContractStatusTimeline,
  SigningCeremonyModal,
  PublicServiceCitationPanel,
  BilateralSigningTimeline,
  FabricLedgerEvidenceCard,
  resolveContractActiveStep,
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
  currentUserId: currentUserIdProp,
}: ContractWorkspaceProps) {
  const {
    currentUserId,
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
  } = useContractWorkspace({ contractId, currentUserId: currentUserIdProp })

  const [activeMobileTab, setActiveMobileTab] = useState<MobileTab>('document')
  const [isDocumentExpanded, setIsDocumentExpanded] = useState(false)

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

  // Compute active step once — used by ContractFlowGuide, DepositPaymentPanel, BilateralSigningTimeline
  const activeStep = resolveContractActiveStep({
    strategy: contract.executionPolicy?.strategy ?? 'DEPOSIT_FIRST',
    status: contract.status,
    depositStatus: deposit?.status,
    signedByTenant: parties.tenant.hasSigned,
    signedByLandlord: parties.landlord.hasSigned,
  })

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
      className="w-full max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 py-4 sm:py-6 flex flex-col gap-4 sm:gap-6"
    >
      {/* Top Breadcrumb & Metadata Header */}
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-[var(--border)] pb-3 sm:pb-4">
        <div className="flex flex-wrap items-center gap-2 sm:gap-3">
          <Link
            href={'/rental-applications' as Route}
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-[var(--muted)] hover:text-[var(--primary)] transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Danh sách hồ sơ</span>
          </Link>
          <span className="text-[var(--border)] hidden sm:inline">|</span>
          <div className="flex flex-wrap items-center gap-2 text-xs">
            <span className="font-bold font-mono text-[var(--fg)]">
              {contract.code}
            </span>
            <Badge
              variant="outline"
              className="text-[10px] font-bold uppercase text-[var(--primary)] bg-[var(--surface-muted)]"
            >
              {contract.status}
            </Badge>
            {isSimulation ? (
              <Badge
                variant="outline"
                className="text-[10px] font-bold text-[var(--warning)] bg-[var(--surface-muted)]"
              >
                Mô phỏng PoC
              </Badge>
            ) : (
              <Badge
                variant="outline"
                className="text-[10px] font-bold text-[var(--success)] bg-[var(--surface-muted)]"
              >
                Hyperledger
              </Badge>
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
            <span className="leading-relaxed">{noticeMessage}</span>
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
        className={`p-3.5 sm:p-4 rounded-xl border flex flex-col sm:flex-row sm:items-center justify-between gap-3 sm:gap-4 transition-all ${
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
          <Button
            type="button"
            variant="primary"
            onClick={() => setIsSigningModalOpen(true)}
            aria-label="Tiến hành ký hợp đồng điện tử"
            className="h-10 px-4 sm:px-5 text-xs font-bold shrink-0 shadow hover:scale-[1.02] transition-transform"
          >
            <Sparkles className="w-4 h-4 mr-1.5" />
            <span>Ký số VNPT SmartCA ngay</span>
          </Button>
        )}
      </div>

      {/* Mobile Tab Switching Bar (hidden on desktop lg) */}
      <div className="flex lg:hidden items-center border-b border-[var(--border)] pb-2 overflow-x-auto gap-1.5 text-xs font-medium no-scrollbar">
        <button
          type="button"
          onClick={() => setActiveMobileTab('document')}
          className={`px-3 py-1.5 rounded-lg whitespace-nowrap transition-colors ${
            activeMobileTab === 'document'
              ? 'bg-[var(--primary)] text-white font-semibold shadow-sm'
              : 'text-[var(--muted)] hover:text-[var(--fg)] hover:bg-[var(--surface-muted)]'
          }`}
        >
          Văn bản hợp đồng
        </button>
        <button
          type="button"
          onClick={() => setActiveMobileTab('parties')}
          className={`px-3 py-1.5 rounded-lg whitespace-nowrap transition-colors ${
            activeMobileTab === 'parties'
              ? 'bg-[var(--primary)] text-white font-semibold shadow-sm'
              : 'text-[var(--muted)] hover:text-[var(--fg)] hover:bg-[var(--surface-muted)]'
          }`}
        >
          Bên tham gia
        </button>
        <button
          type="button"
          onClick={() => setActiveMobileTab('actions')}
          className={`px-3 py-1.5 rounded-lg whitespace-nowrap transition-colors ${
            activeMobileTab === 'actions'
              ? 'bg-[var(--primary)] text-white font-semibold shadow-sm'
              : 'text-[var(--muted)] hover:text-[var(--fg)] hover:bg-[var(--surface-muted)]'
          }`}
        >
          Đặt cọc & Tiến trình
        </button>
        <button
          type="button"
          onClick={() => setActiveMobileTab('public-service')}
          className={`px-3 py-1.5 rounded-lg whitespace-nowrap transition-colors ${
            activeMobileTab === 'public-service'
              ? 'bg-[var(--primary)] text-white font-semibold shadow-sm'
              : 'text-[var(--muted)] hover:text-[var(--fg)] hover:bg-[var(--surface-muted)]'
          }`}
        >
          Dịch vụ công & Pháp lý
        </button>
        <button
          type="button"
          onClick={() => setActiveMobileTab('audit')}
          className={`px-3 py-1.5 rounded-lg whitespace-nowrap transition-colors ${
            activeMobileTab === 'audit'
              ? 'bg-[var(--primary)] text-white font-semibold shadow-sm'
              : 'text-[var(--muted)] hover:text-[var(--fg)] hover:bg-[var(--surface-muted)]'
          }`}
        >
          Sổ cái & Audit
        </button>
      </div>

      {/* Responsive Workspace Grid (Supports 2-Column Split or Full-Width Reading Mode) */}
      <div
        className={`grid grid-cols-1 ${
          isDocumentExpanded ? 'lg:grid-cols-1' : 'lg:grid-cols-12'
        } gap-6 items-start`}
      >
        {/* Left Column: A4 Document Viewer */}
        <div
          className={`${
            isDocumentExpanded ? 'lg:col-span-1' : 'lg:col-span-7 xl:col-span-8'
          } flex flex-col gap-6 ${
            activeMobileTab === 'document' ? 'block' : 'hidden lg:block'
          }`}
        >
          <ContractDocumentViewer
            document={document}
            contractCode={contract.code}
            status={contract.status}
            networkMode={ledger.networkMode}
            parties={parties}
            property={contract.property}
            commercial={contract.commercial}
            startDate={contract.startDate}
            endDate={contract.endDate}
            createdAt={document.lockedAt || contract.startDate}
            onDownloadPdf={handleDownloadPdf}
            onDownloadDocx={handleDownloadDocx}
            isDownloading={isDownloadingPdf || isDownloadingDocx}
            isExpanded={isDocumentExpanded}
            onToggleExpand={() => setIsDocumentExpanded(!isDocumentExpanded)}
          />
        </div>

        {/* Right Column: Interactive Panes & Ledgers */}
        <div
          className={`${
            isDocumentExpanded ? 'lg:col-span-1' : 'lg:col-span-5 xl:col-span-4'
          } flex flex-col gap-6 ${
            activeMobileTab !== 'document' ? 'block' : 'hidden lg:block'
          }`}
        >
          {/* Contract Flow Guide — chỉ rõ bước hiện tại theo strategy (Actions tab on mobile) */}
          <div
            className={
              activeMobileTab === 'actions' ? 'block' : 'hidden lg:block'
            }
          >
            <ContractFlowGuide
              contractId={contractId}
              strategy={contract.executionPolicy?.strategy ?? 'DEPOSIT_FIRST'}
              status={contract.status}
              depositStatus={deposit?.status}
              signedByTenant={parties.tenant.hasSigned}
              signedByLandlord={parties.landlord.hasSigned}
            />
          </div>

          {/* Party Info Cards (Parties tab on mobile) */}
          <div
            className={
              activeMobileTab === 'parties' ? 'block' : 'hidden lg:block'
            }
          >
            <PartyInfoCards
              tenant={parties.tenant}
              landlord={parties.landlord}
              currentUserId={currentUserId}
            />
          </div>

          {/* Deposit Payment Panel & Policy (Actions tab on mobile) */}
          {contract.executionPolicy ? (
            <section
              data-testid="contract-execution-policy"
              className={`rounded-xl border border-[var(--primary)]/30 bg-[var(--primary-soft)]/20 p-4 sm:p-5 shadow-sm ${
                activeMobileTab === 'actions' ? 'block' : 'hidden lg:block'
              }`}
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

          <div
            className={
              activeMobileTab === 'actions' ? 'block' : 'hidden lg:block'
            }
          >
            <DepositPaymentPanel
              deposit={deposit}
              isTenant={isTenant}
              contractId={contractId}
              onPaymentSuccess={() => loadData(false)}
              isActiveStep={activeStep === 'deposit'}
            />
          </div>

          {/* Bilateral Signing Stepper (Actions tab on mobile) */}
          <div
            className={
              activeMobileTab === 'actions' ? 'block' : 'hidden lg:block'
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
              isActiveStep={activeStep === 'signing'}
            />
          </div>

          {/* Contract Status Timeline (Actions tab on mobile) */}
          <div
            className={
              activeMobileTab === 'actions' ? 'block' : 'hidden lg:block'
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

          {/* Public Service & Legal Citation Panel (Public-service tab on mobile) */}
          <div
            className={
              activeMobileTab === 'public-service' ? 'block' : 'hidden lg:block'
            }
          >
            <PublicServiceCitationPanel
              contractId={contractId}
              contractCode={contract.code}
            />
          </div>

          {/* Fabric Ledger Evidence Card (Audit tab on mobile) */}
          <div
            className={
              activeMobileTab === 'audit' ? 'block' : 'hidden lg:block'
            }
          >
            <FabricLedgerEvidenceCard
              contractId={contractId}
              contractCode={contract.code}
              contractHash={document.lockedHash}
              connectionState={ledger.connectionState}
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

          {/* Audit Events Trail Drawer (Audit tab on mobile) */}
          {auditEvents && auditEvents.length > 0 && (
            <div
              data-testid="audit-events-panel"
              className={`rounded-xl border border-[var(--border)] bg-[var(--surface)] p-4 sm:p-5 shadow-sm flex flex-col gap-3 ${
                activeMobileTab === 'audit' ? 'block' : 'hidden lg:block'
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
