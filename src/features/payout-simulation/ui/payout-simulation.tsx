'use client'

import { useState } from 'react'
import { Banknote, CheckCircle, Loader2, XCircle } from 'lucide-react'
import { settlePayout } from '@/entities/payout'
import { Button } from '@/shared/ui/button'
import { Card } from '@/shared/ui/card'

type PageState = 'idle' | 'loading' | 'done-success' | 'done-failed' | 'error'

export function PayoutSimulation({
  txRef,
}: {
  txRef: string
}): React.ReactElement {
  const [state, setState] = useState<PageState>('idle')
  const [error, setError] = useState('')

  const handleOutcome = async (
    outcome: 'success' | 'failed'
  ): Promise<void> => {
    setState('loading')
    setError('')
    try {
      await settlePayout(txRef, outcome)
      setState(outcome === 'success' ? 'done-success' : 'done-failed')
    } catch (settleError) {
      setError(
        settleError instanceof Error
          ? settleError.message
          : 'Không thể xác nhận kết quả.'
      )
      setState('error')
    }
  }

  const isLoading = state === 'loading'

  return (
    <main className="flex min-h-screen items-center justify-center bg-bg px-4 py-16">
      <Card className="w-full max-w-md space-y-6 border border-border bg-surface p-8 shadow-md">
        <header className="flex flex-col items-center gap-3 text-center">
          <span
            className="rounded-2xl bg-primary-soft p-3 text-primary"
            aria-hidden="true"
          >
            <Banknote className="h-7 w-7" />
          </span>
          <h1 className="font-display text-xl font-bold text-fg">
            Giả lập kết quả chuyển tiền
          </h1>
          <p className="text-sm text-muted">
            Mã giao dịch: <code className="font-mono text-fg">{txRef}</code>
          </p>
        </header>

        {state === 'idle' || state === 'loading' ? (
          <div className="flex flex-col gap-3 sm:flex-row">
            <Button
              disabled={isLoading}
              onClick={() => void handleOutcome('success')}
              className="flex-1 bg-success text-white hover:opacity-90"
            >
              {isLoading ? (
                <Loader2 className="h-4 w-4 animate-spin" />
              ) : (
                <CheckCircle className="h-4 w-4" />
              )}
              Thành công
            </Button>
            <Button
              disabled={isLoading}
              variant="outline"
              onClick={() => void handleOutcome('failed')}
              className="flex-1 border-danger text-danger hover:bg-danger/10"
            >
              <XCircle className="h-4 w-4" /> Thất bại
            </Button>
          </div>
        ) : null}

        {state === 'done-success' ? (
          <p
            role="status"
            className="rounded-xl bg-success-soft p-4 text-center font-bold text-success"
          >
            Chuyển tiền thành công!
          </p>
        ) : null}
        {state === 'done-failed' ? (
          <p
            role="status"
            className="rounded-xl bg-danger/10 p-4 text-center font-bold text-danger"
          >
            Chuyển tiền thất bại!
          </p>
        ) : null}
        {state === 'error' ? (
          <div
            role="alert"
            className="space-y-3 rounded-xl bg-danger/10 p-4 text-center text-danger"
          >
            <p>{error}</p>
            <Button variant="outline" onClick={() => setState('idle')}>
              Thử lại
            </Button>
          </div>
        ) : null}
      </Card>
    </main>
  )
}
