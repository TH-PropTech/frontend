'use client'

import type { ReactElement } from 'react'
import Link from 'next/link'
import {
  resolveContractActiveStep,
  getContractFlowSteps,
  getContractStepState,
  getContractStatusLabel,
  getNextContractStep,
  resolvePanelActivity,
  toContractStepHref,
  ContractPdfDialog,
  ContractSummaryCard,
  type ContractFlowView,
  type ContractRouteStep,
} from '@/features/contracts'
import { useContractWorkspace } from './use-contract-workspace'
import { ContractStepContent } from './contract-step-content'
import { ContractStepShell, type ContractStepNote } from './contract-step-shell'

export interface ContractStepFlowProps {
  contractId: string
  step: ContractRouteStep
  currentUserId?: string | undefined
}

function getGuardMessage(
  step: ContractRouteStep,
  activeStep: ReturnType<typeof resolveContractActiveStep>,
  strategy: 'DEPOSIT_FIRST' | 'SIGN_FIRST',
  hasStep: boolean,
  activeLabel: string
): string | null {
  if (!hasStep && step === 'move-in') {
    return 'Hợp đồng này không có bước nhận nhà vì không có quyết toán nhận nhà.'
  }
  if (activeStep === 'completed') return null
  if (
    step === 'signing' &&
    strategy === 'DEPOSIT_FIRST' &&
    activeStep === 'deposit'
  ) {
    return 'Hợp đồng này yêu cầu cọc trước, ký sau: hãy xác nhận tiền cọc để mở phiên ký số.'
  }
  if (
    step === 'deposit' &&
    strategy === 'SIGN_FIRST' &&
    activeStep === 'signing'
  ) {
    return 'Hợp đồng này ký trước, cọc sau: bước đặt cọc mở khi cả hai bên đã ký số.'
  }
  return `Hợp đồng đang ở bước "${activeLabel}"; hãy hoàn tất bước này trước.`
}

function getNextDisabled(
  step: ContractRouteStep,
  data: NonNullable<ReturnType<typeof useContractWorkspace>['data']>,
  nextStep: ContractRouteStep | null,
  activeStep: ReturnType<typeof resolveContractActiveStep>
): boolean {
  const flow: ContractFlowView | undefined = data.flow
  if (flow) {
    const stage = flow.stages.find(item => item.key === step)
    const nextOpen =
      nextStep !== null && resolvePanelActivity(nextStep, activeStep, flow)
    return !(stage?.status === 'done' || nextOpen)
  }
  if (step === 'document') return data.document.mode !== 'locked'
  if (step === 'deposit') {
    return (
      !data.deposit || !['paid', 'transferred'].includes(data.deposit.status)
    )
  }
  if (step === 'signing') {
    return !(data.parties.tenant.hasSigned && data.parties.landlord.hasSigned)
  }
  return true
}

/** Nhãn trạng thái trung thực cho thanh bước: không hiện "Đã hoàn tất" khi cọc hoặc chữ ký còn thiếu. */
export function getStepNotes(
  data: NonNullable<ReturnType<typeof useContractWorkspace>['data']>
): Partial<Record<ContractRouteStep, ContractStepNote>> {
  const notes: Partial<Record<ContractRouteStep, ContractStepNote>> = {}
  const deposit = data.deposit
  if (
    deposit &&
    deposit.amount > 0 &&
    !['paid', 'transferred'].includes(deposit.status)
  ) {
    notes.deposit = { text: 'Chờ thanh toán', tone: 'warning' }
  }
  const signed =
    Number(data.parties.tenant.hasSigned) +
    Number(data.parties.landlord.hasSigned)
  if (signed === 1) {
    notes.signing = { text: 'Đã ký 1/2 bên', tone: 'warning' }
  }
  return notes
}

function getNextLabel(step: ContractRouteStep, disabled: boolean): string {
  if (!disabled) return 'Tiếp tục'
  if (step === 'document') return 'Khóa bản PDF để tiếp tục'
  if (step === 'deposit') return 'Hoàn tất đặt cọc để tiếp tục'
  if (step === 'signing') return 'Chờ đủ hai chữ ký'
  return 'Đang chờ lưu vết hợp đồng'
}

export function ContractStepFlow({
  contractId,
  step,
  currentUserId,
}: ContractStepFlowProps): ReactElement {
  const workspace = useContractWorkspace({
    contractId,
    currentUserId,
    enablePolling: false,
  })

  if (workspace.isLoading) {
    return (
      <main
        data-testid="contract-step-flow-loading"
        className="flex min-h-screen items-center justify-center bg-[var(--bg)] px-4 py-16 text-sm text-[var(--muted)]"
      >
        Đang tải bước hợp đồng...
      </main>
    )
  }

  if (workspace.error || !workspace.data) {
    return (
      <main
        data-testid="contract-step-flow-error"
        className="flex min-h-screen flex-col items-center justify-center gap-4 bg-[var(--bg)] px-4 py-16 text-center"
      >
        <p className="text-sm font-semibold text-[var(--danger)]">
          {workspace.error ?? 'Không thể tải dữ liệu hợp đồng.'}
        </p>
        <Link
          href="/rental-applications"
          className="inline-flex min-h-10 items-center rounded-lg bg-[var(--primary)] px-4 py-2 text-xs font-bold text-white"
        >
          Về danh sách hồ sơ
        </Link>
      </main>
    )
  }

  const { data } = workspace
  const strategy = data.contract.executionPolicy?.strategy ?? 'DEPOSIT_FIRST'
  const activeStep = resolveContractActiveStep({
    strategy,
    status: data.contract.status,
    depositStatus: data.deposit?.status,
    signedByTenant: data.parties.tenant.hasSigned,
    signedByLandlord: data.parties.landlord.hasSigned,
    serverFlow: data.flow,
  })
  const steps = getContractFlowSteps(strategy, data.flow)
  const hasStep = steps.some(item => item.key === step)
  const stepState = getContractStepState(step, activeStep, steps)
  const isGuarded =
    !hasStep ||
    (stepState === 'upcoming' &&
      !resolvePanelActivity(step, activeStep, data.flow))
  const nextStep = getNextContractStep(step, strategy, data.flow)
  const nextStepHref = nextStep
    ? toContractStepHref(contractId, nextStep)
    : null
  const nextDisabled = getNextDisabled(step, data, nextStep, activeStep)
  const activeStepHref =
    activeStep === 'completed'
      ? toContractStepHref(contractId, 'ledger')
      : toContractStepHref(contractId, activeStep)

  return (
    <ContractStepShell
      contractId={contractId}
      contractCode={data.contract.code}
      contractStatus={getContractStatusLabel(data.contract.status)}
      step={step}
      activeStep={activeStep}
      steps={steps}
      activeStepHref={activeStepHref}
      activeStepLabel={steps.find(item => item.key === activeStep)?.label}
      guardMessage={
        isGuarded
          ? getGuardMessage(
              step,
              activeStep,
              strategy,
              hasStep,
              steps.find(item => item.key === activeStep)?.label ?? activeStep
            )
          : null
      }
      nextStep={nextStep}
      nextStepHref={nextStepHref}
      nextDisabled={nextDisabled}
      nextLabel={getNextLabel(step, nextDisabled)}
      stepNotes={getStepNotes(data)}
    >
      <div className="flex flex-col gap-3">
        <ContractSummaryCard
          contract={data.contract}
          parties={data.parties}
          ledger={data.ledger}
          activeStage={activeStep}
          {...(data.financialSummary
            ? { financialSummary: data.financialSummary }
            : {})}
          viewerRole={workspace.signerRole}
        />
        {data.actions.canDownloadArtifact ? (
          <div className="flex justify-end">
            <ContractPdfDialog
              contractId={contractId}
              contractCode={data.contract.code}
              hasSignature={
                data.parties.tenant.hasSigned || data.parties.landlord.hasSigned
              }
            />
          </div>
        ) : null}
      </div>
      <ContractStepContent
        contractId={contractId}
        currentUserId={workspace.currentUserId}
        step={step}
        data={data}
        auditEvents={workspace.auditEvents}
        isTenant={workspace.isTenant}
        signerName={workspace.signerName}
        signerRole={workspace.signerRole}
        isSigningModalOpen={workspace.isSigningModalOpen}
        isDownloadingPdf={workspace.isDownloadingPdf}
        isDownloadingDocx={workspace.isDownloadingDocx}
        isVerifyingIntegrity={workspace.isVerifyingIntegrity}
        integrityResult={workspace.integrityResult}
        setIsSigningModalOpen={workspace.setIsSigningModalOpen}
        loadData={workspace.loadData}
        refresh={workspace.refresh}
        handleDownloadPdf={workspace.handleDownloadPdf}
        handleDownloadDocx={workspace.handleDownloadDocx}
        handleVerifyIntegrity={workspace.handleVerifyIntegrity}
      />
    </ContractStepShell>
  )
}
