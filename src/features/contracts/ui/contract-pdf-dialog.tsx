'use client'

import * as React from 'react'
import { FileText } from 'lucide-react'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/shared/ui/dialog'
import { ContractPdfPreview } from './contract-pdf-preview'

export interface ContractPdfDialogProps {
  contractId: string
  contractCode: string
  /** Có ít nhất một bên đã ký: mới hiện tab "Bản đã ký". */
  hasSignature?: boolean
  label?: string
  className?: string
}

/** Nút mở hộp thoại xem PDF hợp đồng (bản gốc / bản đã ký), dùng được ở mọi bước. */
export function ContractPdfDialog({
  contractId,
  contractCode,
  hasSignature = false,
  label = 'Xem bản PDF hợp đồng',
  className = '',
}: ContractPdfDialogProps): React.ReactElement {
  const [open, setOpen] = React.useState(false)
  const [variant, setVariant] = React.useState<'canonical' | 'signed'>(
    'canonical'
  )

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        className={`inline-flex min-h-10 items-center gap-2 rounded-lg border border-[var(--border)] bg-[var(--surface)] px-3.5 py-2 text-xs font-bold text-[var(--fg)] transition-colors hover:border-[var(--primary)] hover:text-[var(--primary)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--primary)] ${className}`}
      >
        <FileText className="h-4 w-4" aria-hidden="true" />
        {label}
      </button>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="max-h-[92dvh] w-[calc(100vw-1rem)] max-w-5xl gap-3 overflow-y-auto p-4 sm:p-6">
          <DialogHeader>
            <DialogTitle>Bản PDF hợp đồng {contractCode}</DialogTitle>
            <DialogDescription>
              Bản PDF chuẩn dùng để xem, tải xuống và ký số.
            </DialogDescription>
          </DialogHeader>
          {hasSignature ? (
            <div
              role="tablist"
              aria-label="Chọn bản PDF"
              className="flex gap-2"
            >
              {(
                [
                  ['canonical', 'Bản gốc'],
                  ['signed', 'Bản đã ký'],
                ] as const
              ).map(([id, text]) => (
                <button
                  key={id}
                  type="button"
                  role="tab"
                  aria-selected={variant === id}
                  onClick={() => setVariant(id)}
                  className={`rounded-lg border px-3 py-1.5 text-xs font-bold ${
                    variant === id
                      ? 'border-[var(--primary)] text-[var(--primary)]'
                      : 'border-[var(--border)] text-[var(--muted)]'
                  }`}
                >
                  {text}
                </button>
              ))}
            </div>
          ) : null}
          {open ? (
            <ContractPdfPreview
              contractId={contractId}
              contractCode={contractCode}
              variant={variant}
              compact
            />
          ) : null}
        </DialogContent>
      </Dialog>
    </>
  )
}
