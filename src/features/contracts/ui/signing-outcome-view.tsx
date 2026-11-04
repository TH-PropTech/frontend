'use client'

import { AlertCircle, CheckCircle2, HelpCircle } from 'lucide-react'

export type SigningOutcome =
  | { status: 'success' }
  /** `unknown`: the request was cut off, so the signature may already be recorded. */
  | { status: 'failure'; reason: string; unknown: boolean }

interface SigningOutcomeViewProps {
  outcome: SigningOutcome
  /** Closes the dialog and refreshes the contract. */
  onDone: () => void
  /** Back to the signing form (not offered when the result is unknown). */
  onRetry: () => void
}

/** The result every signing method ends in, so the signer never has to guess. */
export function SigningOutcomeView({
  outcome,
  onDone,
  onRetry,
}: SigningOutcomeViewProps) {
  if (outcome.status === 'success') {
    return (
      <div
        role="status"
        data-testid="signing-outcome-success"
        className="flex flex-col items-center justify-center gap-4 p-6 text-center"
      >
        <div className="flex h-14 w-14 items-center justify-center rounded-full border-2 border-[var(--success)] bg-[var(--surface-muted)] text-[var(--success)]">
          <CheckCircle2 className="h-8 w-8" aria-hidden="true" />
        </div>
        <div>
          <h4 className="text-base font-bold tracking-tight text-[var(--fg)]">
            Ký hợp đồng thành công!
          </h4>
          <p className="mx-auto mt-1 max-w-sm text-xs text-[var(--muted)]">
            Chữ ký của bạn đã được ghi nhận. Đóng cửa sổ này để xem trạng thái
            hợp đồng.
          </p>
        </div>
        <button
          type="button"
          onClick={onDone}
          aria-label="Hoàn tất và đóng"
          className="inline-flex w-full max-w-xs items-center justify-center rounded-lg bg-[var(--primary)] px-4 py-2.5 text-xs font-bold text-white shadow-sm hover:opacity-90"
        >
          Hoàn tất & Đóng
        </button>
      </div>
    )
  }

  const { reason, unknown } = outcome
  return (
    <div
      role="alert"
      data-testid="signing-outcome-failure"
      className="flex flex-col items-center justify-center gap-4 p-6 text-center"
    >
      <div
        className={`flex h-14 w-14 items-center justify-center rounded-full border-2 bg-[var(--surface-muted)] ${
          unknown
            ? 'border-[var(--warning)] text-[var(--warning)]'
            : 'border-[var(--danger)] text-[var(--danger)]'
        }`}
      >
        {unknown ? (
          <HelpCircle className="h-8 w-8" aria-hidden="true" />
        ) : (
          <AlertCircle className="h-8 w-8" aria-hidden="true" />
        )}
      </div>
      <div>
        <h4 className="text-base font-bold tracking-tight text-[var(--fg)]">
          {unknown ? 'Chưa rõ kết quả ký' : 'Ký hợp đồng chưa thành công'}
        </h4>
        <p className="mx-auto mt-1 max-w-sm text-xs text-[var(--muted)]">
          {reason}
        </p>
      </div>
      <div className="flex w-full max-w-xs flex-col gap-2">
        {unknown ? (
          <button
            type="button"
            onClick={onDone}
            className="inline-flex items-center justify-center rounded-lg bg-[var(--primary)] px-4 py-2.5 text-xs font-bold text-white shadow-sm hover:opacity-90"
          >
            Kiểm tra lại hợp đồng
          </button>
        ) : (
          <>
            <button
              type="button"
              onClick={onRetry}
              className="inline-flex items-center justify-center rounded-lg bg-[var(--primary)] px-4 py-2.5 text-xs font-bold text-white shadow-sm hover:opacity-90"
            >
              Thử lại
            </button>
            <button
              type="button"
              onClick={onDone}
              className="inline-flex items-center justify-center rounded-lg border border-[var(--border)] px-4 py-2.5 text-xs font-bold text-[var(--fg)] hover:bg-[var(--surface-muted)]"
            >
              Đóng
            </button>
          </>
        )}
      </div>
    </div>
  )
}
