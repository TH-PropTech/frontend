'use client'

import * as React from 'react'
import { AlertTriangle, ListChecks } from 'lucide-react'
import { Button } from '@/shared/ui/button'
import {
  getPublicServiceChecklist,
  type PublicServiceChecklist,
} from '../api/contracts-api'

export interface PublicServiceChecklistPanelProps {
  contractId: string
}

function itemLabel(id: PublicServiceChecklist['items'][number]['id']): string {
  switch (id) {
    case 'locked-contract-copy':
      return 'Bản hợp đồng đã khóa'
    case 'signing-evidence':
      return 'Bằng chứng ký trong phạm vi PoC'
    case 'notarization-or-authentication':
      return 'Công chứng hoặc chứng thực'
  }
}

function statusLabel(
  status: PublicServiceChecklist['items'][number]['status']
): string {
  switch (status) {
    case 'available':
      return 'Có sẵn'
    case 'evidence-present':
      return 'Đã có bằng chứng'
    case 'required-before-submission':
      return 'Cần bổ sung trước khi nộp'
  }
}

export function PublicServiceChecklistPanel({
  contractId,
}: PublicServiceChecklistPanelProps): React.ReactElement {
  const [checklist, setChecklist] =
    React.useState<PublicServiceChecklist | null>(null)
  const [loading, setLoading] = React.useState(false)
  const [error, setError] = React.useState<string | null>(null)

  const loadChecklist = async (): Promise<void> => {
    setLoading(true)
    setError(null)
    try {
      setChecklist(
        await getPublicServiceChecklist(contractId, 'permanent-residence')
      )
    } catch (loadError) {
      setError(
        loadError instanceof Error
          ? loadError.message
          : 'Không tải được checklist dịch vụ công.'
      )
    } finally {
      setLoading(false)
    }
  }

  return (
    <section className="space-y-3 rounded-xl border border-border bg-surface-muted p-4">
      <Button
        type="button"
        variant="secondary"
        disabled={loading}
        onClick={() => void loadChecklist()}
      >
        <ListChecks className="h-4 w-4" />
        {loading ? 'Đang tải checklist...' : 'Xem checklist đăng ký thường trú'}
      </Button>

      {error ? (
        <p className="text-sm text-danger" role="alert">
          {error}
        </p>
      ) : null}

      {checklist ? (
        <div className="space-y-3" aria-live="polite">
          <p className="flex items-start gap-2 text-sm text-warning">
            <AlertTriangle className="mt-0.5 h-4 w-4 shrink-0" />
            {checklist.disclaimer}
          </p>
          <p className="text-xs font-semibold text-muted">
            Thủ tục bên ngoài chưa hoàn tất
          </p>
          <a
            className="text-sm text-primary underline underline-offset-2"
            href={checklist.officialSourceUrl}
            target="_blank"
            rel="noreferrer"
          >
            Xem nguồn hướng dẫn chính thức
          </a>
          <ul className="space-y-2 text-sm text-muted">
            {checklist.items.map(item => (
              <li
                key={item.id}
                className="flex items-center justify-between gap-3"
              >
                <span>{itemLabel(item.id)}</span>
                <span className="text-xs text-subtle">
                  {statusLabel(item.status)}
                </span>
              </li>
            ))}
          </ul>
        </div>
      ) : null}
    </section>
  )
}
