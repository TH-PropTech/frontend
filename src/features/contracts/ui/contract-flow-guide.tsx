'use client'

import * as React from 'react'
import Link from 'next/link'
import type { Route } from 'next'
import {
  CheckCircle2,
  Coins,
  FileText,
  Home,
  Loader2,
  PenLine,
  Zap,
} from 'lucide-react'
import type {
  ContractFlowStageStatus,
  ContractFlowView,
  ContractStatus,
} from '../api/contracts-api'
import {
  resolveContractActiveStep,
  type ContractActiveStep,
} from '../lib/resolve-contract-active-step'
import { toContractStepHref } from '../lib/contract-flow-steps'

export interface ContractFlowGuideProps {
  strategy: 'DEPOSIT_FIRST' | 'SIGN_FIRST'
  status: ContractStatus
  depositStatus?: string | null | undefined
  signedByTenant?: boolean | undefined
  signedByLandlord?: boolean | undefined
  contractId?: string
  /** Khối `flow` của server; khi có thì quyết định thứ tự và trạng thái bước. */
  serverFlow?: ContractFlowView | null | undefined
}

interface StepDef {
  key: ContractActiveStep
  label: string
  shortLabel: string
  icon: React.ElementType
}

const DEPOSIT_FIRST_STEPS: StepDef[] = [
  {
    key: 'document',
    label: 'Đọc hợp đồng',
    shortLabel: 'Hợp đồng',
    icon: FileText,
  },
  {
    key: 'deposit',
    label: 'Đặt cọc',
    shortLabel: 'Đặt cọc',
    icon: Coins,
  },
  {
    key: 'signing',
    label: 'Ký số SmartCA',
    shortLabel: 'Ký số',
    icon: PenLine,
  },
  {
    key: 'ledger',
    label: 'Kích hoạt',
    shortLabel: 'Kích hoạt',
    icon: Zap,
  },
]

const SIGN_FIRST_STEPS: StepDef[] = [
  {
    key: 'document',
    label: 'Đọc hợp đồng',
    shortLabel: 'Hợp đồng',
    icon: FileText,
  },
  {
    key: 'signing',
    label: 'Ký số SmartCA',
    shortLabel: 'Ký số',
    icon: PenLine,
  },
  {
    key: 'deposit',
    label: 'Đặt cọc',
    shortLabel: 'Đặt cọc',
    icon: Coins,
  },
  {
    key: 'ledger',
    label: 'Kích hoạt',
    shortLabel: 'Kích hoạt',
    icon: Zap,
  },
]

const MOVE_IN_STEP: StepDef = {
  key: 'move-in',
  label: 'Nhận nhà',
  shortLabel: 'Nhận nhà',
  icon: Home,
}

const STEP_BY_KEY: Record<Exclude<ContractActiveStep, 'completed'>, StepDef> = {
  document: DEPOSIT_FIRST_STEPS[0] as StepDef,
  deposit: DEPOSIT_FIRST_STEPS[1] as StepDef,
  signing: DEPOSIT_FIRST_STEPS[2] as StepDef,
  ledger: DEPOSIT_FIRST_STEPS[3] as StepDef,
  'move-in': MOVE_IN_STEP,
}

type StepState = 'done' | 'active' | 'upcoming' | 'blocked'

const SERVER_STATE: Record<ContractFlowStageStatus, StepState> = {
  done: 'done',
  active: 'active',
  blocked: 'blocked',
  upcoming: 'upcoming',
  skipped: 'upcoming',
}

function getStepState(
  stepKey: ContractActiveStep,
  activeStep: ContractActiveStep,
  steps: StepDef[]
): StepState {
  const activeIdx = steps.findIndex(s => s.key === activeStep)
  const stepIdx = steps.findIndex(s => s.key === stepKey)
  if (activeStep === 'completed') return 'done'
  if (stepIdx < activeIdx) return 'done'
  if (stepIdx === activeIdx) return 'active'
  return 'upcoming'
}

/**
 * ContractFlowGuide
 *
 * Hiển thị 4 bước của luồng hợp đồng với trạng thái done/active/upcoming.
 * Không xóa bất kỳ panel nào, chèn vào đầu right panel của ContractWorkspace.
 *
 * [uc_contract_flow_guide]
 */
export function ContractFlowGuide({
  strategy,
  status,
  depositStatus,
  signedByTenant,
  signedByLandlord,
  contractId,
  serverFlow,
}: ContractFlowGuideProps): React.ReactElement {
  const activeStep = resolveContractActiveStep({
    strategy,
    status,
    depositStatus,
    signedByTenant,
    signedByLandlord,
    serverFlow,
  })

  const steps = serverFlow
    ? serverFlow.stages.map(stage => STEP_BY_KEY[stage.key])
    : strategy === 'DEPOSIT_FIRST'
      ? DEPOSIT_FIRST_STEPS
      : SIGN_FIRST_STEPS
  const stateOf = (stepKey: ContractActiveStep): StepState => {
    const serverStage = serverFlow?.stages.find(stage => stage.key === stepKey)
    return serverStage
      ? SERVER_STATE[serverStage.status]
      : getStepState(stepKey, activeStep, steps)
  }
  const isCompleted = activeStep === 'completed'

  const activeStepDef = steps.find(s => s.key === activeStep)
  const activeIdx = steps.findIndex(s => s.key === activeStep)

  return (
    <div
      data-testid="contract-flow-guide"
      className="rounded-xl border border-[var(--border)] bg-[var(--surface)] p-4 shadow-sm"
    >
      {/* Header */}
      <div className="mb-3 flex items-center gap-2">
        <div className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-[var(--primary)] text-white">
          {isCompleted ? (
            <CheckCircle2 className="h-3 w-3" aria-hidden="true" />
          ) : (
            <Loader2 className="h-3 w-3 animate-spin" aria-hidden="true" />
          )}
        </div>
        <span className="text-xs font-bold uppercase tracking-wider text-[var(--fg)]">
          {isCompleted
            ? 'Hợp đồng hoàn tất'
            : activeStepDef
              ? `Bước hiện tại: ${activeStepDef.label}`
              : 'Tiến trình hợp đồng'}
        </span>
      </div>

      {/* Step indicators */}
      <div
        className="flex items-center gap-0"
        role="list"
        aria-label="Tiến trình hợp đồng"
      >
        {steps.map((step, idx) => {
          const state = stateOf(step.key)
          const isLast = idx === steps.length - 1
          const Icon = step.icon

          return (
            <React.Fragment key={step.key}>
              <div
                role="listitem"
                data-testid={`flow-step-${step.key}`}
                data-state={state}
                className="flex flex-col items-center gap-1"
              >
                {/* Circle indicator */}
                <div
                  className={`flex h-7 w-7 items-center justify-center rounded-full border-2 transition-all ${
                    state === 'done'
                      ? 'border-[var(--success)] bg-[var(--success)] text-white'
                      : state === 'blocked'
                        ? 'border-[var(--danger)] bg-[var(--surface)] text-[var(--danger)]'
                        : state === 'active'
                          ? 'border-[var(--primary)] bg-[var(--primary)] text-white ring-2 ring-[var(--primary)]/30'
                          : 'border-[var(--border)] bg-[var(--surface-muted)] text-[var(--muted)]'
                  }`}
                  aria-label={`${step.label}: ${state === 'done' ? 'Đã hoàn thành' : state === 'blocked' ? 'Đang bị chặn' : state === 'active' ? 'Đang thực hiện' : 'Chưa đến lượt'}`}
                >
                  {state === 'done' ? (
                    <CheckCircle2 className="h-3.5 w-3.5" aria-hidden="true" />
                  ) : (
                    <Icon className="h-3.5 w-3.5" aria-hidden="true" />
                  )}
                </div>

                {/* Label */}
                <span
                  className={`max-w-[64px] text-center text-[10px] font-medium leading-tight ${
                    state === 'active'
                      ? 'text-[var(--primary)]'
                      : state === 'done'
                        ? 'text-[var(--success)]'
                        : 'text-[var(--muted)]'
                  }`}
                >
                  {step.shortLabel}
                </span>
              </div>

              {/* Connector line between steps */}
              {!isLast && (
                <div
                  aria-hidden="true"
                  className={`mb-4 h-px flex-1 transition-colors ${
                    state === 'done' || idx < activeIdx || isCompleted
                      ? 'bg-[var(--success)]'
                      : 'bg-[var(--border)]'
                  }`}
                />
              )}
            </React.Fragment>
          )
        })}
      </div>

      {/* Strategy badge */}
      <p className="mt-2 text-right text-[11px] text-[var(--muted)]">
        {strategy === 'DEPOSIT_FIRST'
          ? 'Cọc trước → Ký sau'
          : 'Ký trước → Cọc sau'}
      </p>

      {contractId && activeStep !== 'completed' ? (
        <Link
          data-testid="contract-flow-current-step-link"
          href={toContractStepHref(contractId, activeStep) as Route}
          className="mt-3 inline-flex min-h-10 w-full items-center justify-center rounded-lg bg-[var(--primary)] px-4 py-2 text-xs font-bold text-white transition-opacity hover:opacity-90 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--primary)]"
        >
          Mở bước hiện tại
        </Link>
      ) : null}
    </div>
  )
}
