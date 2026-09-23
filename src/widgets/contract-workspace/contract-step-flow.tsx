'use client'

import type { ReactElement } from 'react'
import Link from 'next/link'
import {
  resolveContractActiveStep,
  getContractFlowSteps,
  getContractStepState,
  getNextContractStep,
  toContractStepHref,
  type ContractRouteStep,
} from '@/features/contracts'
import { useContractWorkspace } from './use-contract-workspace'
import { ContractStepContent } from './contract-step-content'
import { ContractStepShell } from './contract-step-shell'

export interface ContractStepFlowProps {
  contractId: string
  step: ContractRouteStep
  currentUserId?: string | undefined
}

function getGuardMessage(
  step: ContractRouteStep,
  activeStep: ReturnType<typeof resolveContractActiveStep>,
  strategy: 'DEPOSIT_FIRST' | 'SIGN_FIRST'
): string | null {
  if (activeStep === 'completed') return null
  if (
    step === 'signing' &&
    strategy === 'DEPOSIT_FIRST' &&
    activeStep === 'deposit'
  ) {
    return 'Chính sách DEPOSIT_FIRST yêu cầu xác nhận tiền cọc trước khi mở phiên ký số.'
  }
  if (
    step === 'deposit' &&
    strategy === 'SIGN_FIRST' &&
    activeStep === 'signing'
  ) {
    return 'Chính sách SIGN_FIRST chỉ mở bước đặt cọc sau khi cả hai bên hoàn tất ký số.'
  }
  return `Hợp đồng đang ở bước ${activeStep}; hãy hoàn tất bước hiện tại trước.`
}

function getNextDisabled(
  step: ContractRouteStep,
  data: NonNullable<ReturnType<typeof useContractWorkspace>['data']>
): boolean {
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

function getNextLabel(step: ContractRouteStep, disabled: boolean): string {
  if (!disabled) return 'Tiếp tục'
  if (step === 'document') return 'Khóa artifact để tiếp tục'
  if (step === 'deposit') return 'Hoàn tất đặt cọc để tiếp tục'
  if (step === 'signing') return 'Chờ đủ hai chữ ký'
  return 'Đang chờ ghi nhận Fabric'
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
  })
  const steps = getContractFlowSteps(strategy)
  const stepState = getContractStepState(step, activeStep, steps)
  const isGuarded = stepState === 'upcoming'
  const nextStep = getNextContractStep(step, strategy)
  const nextStepHref = nextStep
    ? toContractStepHref(contractId, nextStep)
    : null
  const nextDisabled = getNextDisabled(step, data)
  const activeStepHref =
    activeStep === 'completed'
      ? toContractStepHref(contractId, 'ledger')
      : toContractStepHref(contractId, activeStep)

  return (
    <ContractStepShell
      contractId={contractId}
      contractCode={data.contract.code}
      contractStatus={data.contract.status}
      step={step}
      activeStep={activeStep}
      steps={steps}
      activeStepHref={activeStepHref}
      activeStepLabel={steps.find(item => item.key === activeStep)?.label}
      guardMessage={
        isGuarded ? getGuardMessage(step, activeStep, strategy) : null
      }
      nextStep={nextStep}
      nextStepHref={nextStepHref}
      nextDisabled={nextDisabled}
      nextLabel={getNextLabel(step, nextDisabled)}
    >
      <ContractStepContent
        contractId={contractId}
        currentUserId={currentUserId}
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
        handleDownloadPdf={workspace.handleDownloadPdf}
        handleDownloadDocx={workspace.handleDownloadDocx}
        handleVerifyIntegrity={workspace.handleVerifyIntegrity}
      />
    </ContractStepShell>
  )
}
