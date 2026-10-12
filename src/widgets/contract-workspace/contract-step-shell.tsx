'use client'

import type { ReactElement, ReactNode } from 'react'
import Link from 'next/link'
import type { Route } from 'next'
import { ArrowLeft, ArrowRight, LockKeyhole } from 'lucide-react'
import type {
  ContractActiveStep,
  ContractFlowStepDefinition,
  ContractRouteStep,
  ContractStepState,
} from '@/features/contracts'
import { getContractStepState, toContractStepHref } from '@/features/contracts'

/** Ghi chú trạng thái thật của một bước (ví dụ cọc chưa thanh toán) thay cho nhãn mặc định. */
export type ContractStepNote = { text: string; tone: 'warning' | 'info' }

export interface ContractStepShellProps {
  stepNotes?: Partial<Record<ContractRouteStep, ContractStepNote>>
  contractId: string
  contractCode: string
  contractStatus: string
  step: ContractRouteStep
  activeStep: ContractActiveStep
  steps: readonly ContractFlowStepDefinition[]
  children: ReactNode
  guardMessage?: string | null
  activeStepHref: string
  activeStepLabel?: string | undefined
  nextStep?: ContractRouteStep | null
  nextStepHref?: string | null
  nextDisabled?: boolean
  nextLabel?: string
}

function stateLabel(state: ContractStepState): string {
  if (state === 'done') return 'Đã hoàn tất'
  if (state === 'active') return 'Đang thực hiện'
  return 'Chưa đến lượt'
}

export function ContractStepShell({
  contractId,
  contractCode,
  contractStatus,
  step,
  activeStep,
  steps,
  children,
  guardMessage,
  activeStepHref,
  activeStepLabel = 'hiện tại',
  nextStep,
  nextStepHref,
  nextDisabled = false,
  nextLabel = 'Tiếp tục',
  stepNotes = {},
}: ContractStepShellProps): ReactElement {
  const currentStep = steps.find(item => item.key === step)
  const isGuarded = Boolean(guardMessage)

  return (
    <main
      data-testid="contract-step-flow"
      className="mx-auto flex min-h-screen w-full max-w-5xl flex-col gap-6 px-4 py-6 text-[var(--fg)] sm:px-6 lg:px-8"
    >
      <header className="flex flex-wrap items-center justify-between gap-3 border-b border-[var(--border)] pb-4">
        <div>
          <Link
            href={`/contracts/${encodeURIComponent(contractId)}`}
            className="mb-2 inline-flex min-h-9 items-center gap-1.5 text-xs font-semibold text-[var(--muted)] transition-colors hover:text-[var(--primary)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--primary)]"
          >
            <ArrowLeft className="h-4 w-4" aria-hidden="true" />
            Về không gian hợp đồng
          </Link>
          <h1 className="text-lg font-bold tracking-tight">
            {currentStep?.label ?? 'Hợp đồng'}
          </h1>
          <p className="mt-1 text-xs text-[var(--muted)]">
            {contractCode} · Trạng thái: {contractStatus}
          </p>
        </div>
        <span className="rounded-full border border-[var(--border)] bg-[var(--surface-muted)] px-2.5 py-1 text-[11px] font-bold uppercase tracking-wider text-[var(--primary)]">
          Bước {steps.findIndex(item => item.key === step) + 1}/{steps.length}
        </span>
      </header>

      <nav aria-label="Tiến trình hợp đồng" data-testid="contract-stepper">
        <ol className="-mx-4 flex snap-x gap-2 overflow-x-auto px-4 pb-1 no-scrollbar sm:mx-0 sm:grid sm:grid-cols-4 sm:overflow-visible sm:px-0">
          {steps.map(item => {
            const state = getContractStepState(item.key, activeStep, steps)
            const href = toContractStepHref(contractId, item.key)
            const isCurrent = item.key === step
            const note = stepNotes[item.key]
            const stateText = note?.text ?? stateLabel(state)
            const stateTone =
              note?.tone === 'warning'
                ? 'font-semibold text-[var(--warning)]'
                : 'text-[var(--muted)]'

            return (
              <li
                key={item.key}
                className="min-w-[8.5rem] shrink-0 snap-start sm:min-w-0"
              >
                {state === 'upcoming' ? (
                  <span
                    aria-disabled="true"
                    data-state={state}
                    className="flex min-h-12 cursor-not-allowed flex-col justify-center rounded-lg border border-dashed border-[var(--border)] bg-[var(--surface-muted)] px-3 py-2 text-left"
                  >
                    <span className="text-[11px] font-bold uppercase tracking-wider text-[var(--muted)]">
                      {item.label}
                    </span>
                    <span className={`text-[11px] ${stateTone}`}>
                      {stateText}
                    </span>
                  </span>
                ) : (
                  <Link
                    href={href as Route}
                    aria-current={isCurrent ? 'step' : undefined}
                    data-state={state}
                    className={`flex min-h-12 flex-col justify-center rounded-lg border px-3 py-2 text-left transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--primary)] ${
                      isCurrent
                        ? 'border-[var(--primary)] bg-[var(--primary-soft)]'
                        : 'border-[var(--border)] bg-[var(--surface)] hover:border-[var(--primary)]'
                    }`}
                  >
                    <span className="text-[11px] font-bold uppercase tracking-wider text-[var(--fg)]">
                      {item.label}
                    </span>
                    <span className={`text-[11px] ${stateTone}`}>
                      {stateText}
                    </span>
                  </Link>
                )}
              </li>
            )
          })}
        </ol>
      </nav>

      {isGuarded ? (
        <section
          data-testid="contract-step-guard"
          aria-live="polite"
          className="flex flex-col gap-3 rounded-xl border border-[var(--warning)] bg-[var(--surface-muted)] p-5"
        >
          <div className="flex items-start gap-3">
            <LockKeyhole
              className="mt-0.5 h-5 w-5 shrink-0 text-[var(--warning)]"
              aria-hidden="true"
            />
            <div>
              <h2 className="text-sm font-bold">Bước này chưa đủ điều kiện</h2>
              <p className="mt-1 text-xs leading-relaxed text-[var(--muted)]">
                {guardMessage}
              </p>
            </div>
          </div>
          <Link
            href={activeStepHref as Route}
            className="inline-flex min-h-10 w-fit items-center gap-2 rounded-lg bg-[var(--primary)] px-4 py-2 text-xs font-bold text-white transition-opacity hover:opacity-90 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--primary)]"
          >
            Về bước {activeStepLabel}
            <ArrowRight className="h-4 w-4" aria-hidden="true" />
          </Link>
        </section>
      ) : (
        <section className="flex flex-1 flex-col gap-6">{children}</section>
      )}

      {!isGuarded ? (
        <footer className="sticky bottom-0 z-10 -mx-4 flex items-center justify-between gap-3 border-t border-[var(--border)] bg-[var(--bg)] px-4 py-3 pb-[max(0.75rem,env(safe-area-inset-bottom))] sm:static sm:mx-0 sm:px-0 sm:pb-0 sm:pt-4">
          {currentStep && currentStep.key !== 'document' ? (
            <Link
              href={
                toContractStepHref(
                  contractId,
                  steps[
                    Math.max(0, steps.findIndex(item => item.key === step) - 1)
                  ]?.key ?? 'document'
                ) as Route
              }
              className="inline-flex min-h-10 items-center gap-2 rounded-lg border border-[var(--border)] bg-[var(--surface)] px-4 py-2 text-xs font-semibold text-[var(--fg)] hover:border-[var(--primary)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--primary)]"
            >
              <ArrowLeft className="h-4 w-4" aria-hidden="true" />
              Quay lại
            </Link>
          ) : (
            <span />
          )}
          {nextStep && nextStepHref ? (
            nextDisabled ? (
              <span className="inline-flex min-h-10 cursor-not-allowed items-center gap-2 rounded-lg bg-[var(--surface-muted)] px-4 py-2 text-xs font-bold text-[var(--muted)]">
                {nextLabel}
                <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </span>
            ) : (
              <Link
                href={nextStepHref as Route}
                className="inline-flex min-h-10 items-center gap-2 rounded-lg bg-[var(--primary)] px-4 py-2 text-xs font-bold text-white transition-opacity hover:opacity-90 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--primary)]"
              >
                {nextLabel}
                <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </Link>
            )
          ) : null}
        </footer>
      ) : null}
    </main>
  )
}
