'use client'

import {
  FileText,
  CreditCard,
  PenTool,
  CheckCircle2,
  Clock,
  AlertTriangle,
} from 'lucide-react'
import type { ContractStatus } from '../api/contracts-api'

export interface ContractStatusTimelineProps {
  status: ContractStatus
  strategy?: 'DEPOSIT_FIRST' | 'SIGN_FIRST'
  depositStatus?: string | undefined
  signedByTenant?: boolean | undefined
  signedByLandlord?: boolean | undefined
  txHash?: string | null | undefined
}

interface TimelineStep {
  id: string
  title: string
  description: string
  state: 'completed' | 'current' | 'upcoming' | 'failed'
  icon: typeof FileText
}

export function ContractStatusTimeline({
  status,
  strategy = 'DEPOSIT_FIRST',
  depositStatus,
  signedByTenant = false,
  signedByLandlord = false,
  txHash,
}: ContractStatusTimelineProps) {
  const isSignFirst = strategy === 'SIGN_FIRST'

  // Determine state of each step
  const isDraft = status === 'draft'
  const isFullySignedPendingDeposit = status === 'fully-signed-pending-deposit'
  const isDepositPending =
    status === 'deposit-pending' || isFullySignedPendingDeposit
  const isDepositPaid =
    depositStatus === 'paid' ||
    depositStatus === 'transferred' ||
    status === 'deposit-paid' ||
    (!isSignFirst && status === 'awaiting-signature') ||
    status === 'active' ||
    status === 'completed'
  const isAwaitingSig = status === 'awaiting-signature'
  const isBothSigned =
    (signedByTenant && signedByLandlord) || isFullySignedPendingDeposit
  const isActive = status === 'active' || status === 'completed'
  const isTerminated = status === 'terminated' || status === 'cancelled'

  const draftStep: TimelineStep = {
    id: 'step-draft',
    title: 'Khởi tạo dự thảo',
    description: 'Soạn thảo và chốt nội dung pháp lý',
    state: 'completed',
    icon: FileText,
  }

  const depositStep: TimelineStep = {
    id: 'step-deposit',
    title: 'Đặt cọc bảo đảm',
    description:
      isSignFirst && isFullySignedPendingDeposit
        ? 'Chờ thanh toán cọc để kích hoạt'
        : isDepositPaid
          ? 'Đã thanh toán cọc an toàn'
          : isDepositPending
            ? 'Chờ thanh toán cọc'
            : 'Chưa thanh toán cọc',
    state: isDepositPaid
      ? 'completed'
      : isDepositPending
        ? 'current'
        : isDraft
          ? 'upcoming'
          : 'completed',
    icon: CreditCard,
  }

  const signStep: TimelineStep = {
    id: 'step-sign',
    title: 'Ký số VNPT SmartCA',
    description: isBothSigned
      ? 'Cả hai bên đã hoàn tất ký số'
      : signedByTenant
        ? 'Bên thuê đã ký, chờ chủ nhà'
        : signedByLandlord
          ? 'Chủ nhà đã ký, chờ bên thuê'
          : isAwaitingSig
            ? 'Chờ cả hai bên ký số'
            : 'Chờ đến lượt ký',
    state: isBothSigned
      ? 'completed'
      : isAwaitingSig
        ? 'current'
        : isActive
          ? 'completed'
          : 'upcoming',
    icon: PenTool,
  }

  const ledgerStep: TimelineStep = {
    id: 'step-ledger',
    title: 'Ghi nhận sổ cái & Kích hoạt',
    description: isTerminated
      ? 'Hợp đồng đã chấm dứt'
      : isSignFirst && isFullySignedPendingDeposit
        ? 'Chờ cọc để neo Fabric'
        : isActive
          ? txHash
            ? 'Đã kích hoạt & neo hash sổ cái'
            : 'Đã kích hoạt (Đang chờ đồng bộ sổ cái)'
          : 'Kích hoạt sau khi hai bên ký',
    state: isTerminated ? 'failed' : isActive ? 'completed' : 'upcoming',
    icon: isTerminated ? AlertTriangle : CheckCircle2,
  }

  const steps: TimelineStep[] =
    strategy === 'SIGN_FIRST'
      ? [draftStep, signStep, depositStep, ledgerStep]
      : [draftStep, depositStep, signStep, ledgerStep]

  return (
    <div
      data-testid="contract-status-timeline"
      className="w-full rounded-xl border border-[var(--border)] bg-[var(--surface)] p-5 shadow-sm"
    >
      <div className="flex items-center justify-between gap-2 mb-6">
        <h4 className="text-xs font-bold uppercase tracking-wider text-[var(--muted)]">
          Tiến trình hợp đồng
        </h4>
        <div className="flex items-center gap-1.5 text-xs font-semibold text-[var(--primary)]">
          <Clock className="w-3.5 h-3.5" />
          <span className="uppercase">{status}</span>
        </div>
      </div>

      <div className="relative flex flex-col md:flex-row items-start md:items-center justify-between gap-4 md:gap-2">
        {/* Horizontal connector line on desktop */}
        <div
          aria-hidden="true"
          className="hidden md:block absolute top-5 left-8 right-8 h-0.5 bg-[var(--border)] -z-0"
        />

        {steps.map(step => {
          const Icon = step.icon
          const isCompleted = step.state === 'completed'
          const isCurrent = step.state === 'current'
          const isFailed = step.state === 'failed'

          return (
            <div
              key={step.id}
              data-testid={step.id}
              data-state={step.state}
              className="relative z-10 flex md:flex-col items-center md:text-center gap-3 md:gap-2 w-full md:w-1/4"
            >
              {/* Step indicator circle */}
              <div
                className={`w-10 h-10 rounded-full flex items-center justify-center shrink-0 border-2 transition-all ${
                  isCompleted
                    ? 'bg-[var(--surface)] border-[var(--success)] text-[var(--success)]'
                    : isCurrent
                      ? 'bg-[var(--surface)] border-[var(--primary)] text-[var(--primary)] ring-4 ring-[var(--surface-muted)]'
                      : isFailed
                        ? 'bg-[var(--surface)] border-[var(--danger)] text-[var(--danger)]'
                        : 'bg-[var(--surface-muted)] border-[var(--border)] text-[var(--muted)]'
                }`}
              >
                {isCompleted ? (
                  <CheckCircle2 className="w-5 h-5" />
                ) : (
                  <Icon className="w-4 h-4" />
                )}
              </div>

              {/* Step text info */}
              <div className="flex flex-col">
                <span
                  className={`text-xs font-bold leading-tight ${
                    isCurrent
                      ? 'text-[var(--primary)]'
                      : isCompleted
                        ? 'text-[var(--fg)]'
                        : isFailed
                          ? 'text-[var(--danger)]'
                          : 'text-[var(--muted)]'
                  }`}
                >
                  {step.title}
                </span>
                <span className="text-[11px] text-[var(--muted)] leading-tight mt-0.5 max-w-[160px]">
                  {step.description}
                </span>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
