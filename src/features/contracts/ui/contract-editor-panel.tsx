'use client'

import * as React from 'react'
import { LockKeyhole, Save } from 'lucide-react'
import { Button } from '@/shared/ui/button'
import {
  lockContractContent,
  saveContractContent,
  type ContractItem,
} from '../api/contracts-api'

export interface ContractEditorPanelProps {
  contract: ContractItem
  initialContent: Record<string, unknown>
  onChange: (contract: ContractItem) => void
}

export function ContractEditorPanel({
  contract,
  initialContent,
  onChange,
}: ContractEditorPanelProps): React.ReactElement {
  const [content, setContent] = React.useState(() =>
    JSON.stringify(initialContent, null, 2)
  )
  const [busy, setBusy] = React.useState(false)
  const [error, setError] = React.useState<string | null>(null)

  const save = async (): Promise<void> => {
    setBusy(true)
    setError(null)
    try {
      const parsed = JSON.parse(content) as Record<string, unknown>
      const updated = await saveContractContent(
        contract._id,
        parsed,
        contract.contentRevision ?? 0
      )
      onChange(updated)
      setContent(JSON.stringify(updated.editorContent ?? parsed, null, 2))
    } catch (saveError) {
      setError(
        saveError instanceof Error
          ? saveError.message
          : 'Nội dung không hợp lệ hoặc phiên bản đã cũ.'
      )
    } finally {
      setBusy(false)
    }
  }

  const lock = async (): Promise<void> => {
    setBusy(true)
    setError(null)
    try {
      onChange(
        await lockContractContent(contract._id, contract.contentRevision ?? 0)
      )
    } catch (lockError) {
      setError(
        lockError instanceof Error
          ? lockError.message
          : 'Không thể khóa nội dung hợp đồng.'
      )
    } finally {
      setBusy(false)
    }
  }

  const locked = Boolean(contract.contentLockedHash)
  return (
    <section className="space-y-3 rounded-2xl border border-border bg-surface p-5">
      <div className="flex items-center justify-between gap-3">
        <div>
          <h3 className="font-semibold text-fg">Nội dung hợp đồng</h3>
          <p className="text-xs text-muted">
            Phiên bản {contract.contentRevision ?? 0} · protected fields chỉ
            được server chấp nhận.
          </p>
        </div>
        {locked ? <LockKeyhole className="h-4 w-4 text-success" /> : null}
      </div>
      <textarea
        value={content}
        onChange={event => setContent(event.target.value)}
        readOnly={locked || busy}
        aria-label="Nội dung JSON hợp đồng"
        className="min-h-48 w-full rounded-xl border border-border bg-bg p-3 font-mono text-xs text-fg"
      />
      <div className="flex flex-wrap gap-2">
        <Button
          type="button"
          disabled={locked || busy}
          onClick={() => void save()}
        >
          <Save className="h-4 w-4" /> Lưu bản nháp
        </Button>
        <Button
          type="button"
          variant="secondary"
          disabled={locked || busy}
          onClick={() => void lock()}
        >
          <LockKeyhole className="h-4 w-4" /> Khóa nội dung
        </Button>
      </div>
      {error ? <p className="text-sm text-danger">{error}</p> : null}
    </section>
  )
}
