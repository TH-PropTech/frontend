'use client'

import * as React from 'react'
import { Loader2 } from 'lucide-react'
import {
  getContractTemplateAudits,
  getPublishedContractTemplate,
  type ContractTemplateAuditDto,
  type ContractTemplateDto,
} from '@/features/contracts'
import { AdminCard } from '@/shared/ui/admin-card'

const LEASE_TEMPLATE_KEY = 'VN_INDIVIDUAL_RESIDENTIAL_LEASE'

const STATUS_LABELS: Record<ContractTemplateDto['status'], string> = {
  draft: 'Bản nháp',
  published: 'Đang áp dụng',
  archived: 'Đã lưu trữ',
  retired: 'Đã ngừng dùng',
}

function formatDateTime(value?: string | null): string {
  return value ? new Date(value).toLocaleString('vi-VN') : '—'
}

/** Mẫu seed chưa có xác nhận pháp lý khi chuỗi tham chiếu ghi rõ PENDING-COUNSEL-REVIEW. */
function isPendingCounsel(reference?: string | null): boolean {
  return Boolean(reference?.includes('PENDING-COUNSEL-REVIEW'))
}

export function ActiveTemplateTab(): React.ReactElement {
  const [template, setTemplate] = React.useState<ContractTemplateDto | null>(
    null
  )
  const [audits, setAudits] = React.useState<ContractTemplateAuditDto[]>([])
  const [loading, setLoading] = React.useState(true)
  const [error, setError] = React.useState<string | null>(null)

  React.useEffect(() => {
    let active = true
    const load = async (): Promise<void> => {
      try {
        const [published, history] = await Promise.all([
          getPublishedContractTemplate(LEASE_TEMPLATE_KEY),
          getContractTemplateAudits(LEASE_TEMPLATE_KEY),
        ])
        if (!active) return
        setTemplate(published)
        setAudits(history)
      } catch (loadError) {
        if (active)
          setError(
            loadError instanceof Error
              ? loadError.message
              : 'Không tải được mẫu hợp đồng.'
          )
      } finally {
        if (active) setLoading(false)
      }
    }
    void load()
    return () => {
      active = false
    }
  }, [])

  if (loading) {
    return (
      <p className="flex items-center gap-2 text-xs text-muted">
        <Loader2 className="h-4 w-4 animate-spin" />
        Đang tải mẫu hợp đồng…
      </p>
    )
  }
  if (error || !template) {
    return (
      <p role="alert" className="text-xs text-danger">
        {error ?? 'Chưa có mẫu hợp đồng nào được phát hành.'}
      </p>
    )
  }

  const annexes = template.annexDefinitions ?? []
  const facts: Array<{ label: string; value: string }> = [
    { label: 'Mã mẫu', value: template.templateKey },
    { label: 'Phiên bản', value: `v${template.version}` },
    { label: 'Trạng thái', value: STATUS_LABELS[template.status] },
    { label: 'Hồ sơ pháp lý', value: template.legalProfile },
    { label: 'Phát hành lúc', value: formatDateTime(template.publishedAt) },
    { label: 'Người phát hành', value: template.publishedBy ?? '—' },
  ]

  return (
    <div className="space-y-4" data-testid="active-template">
      <AdminCard className="space-y-3 p-4">
        <h2 className="text-sm font-bold text-fg">
          Hợp đồng thuê mẫu đang áp dụng
        </h2>
        <dl className="grid grid-cols-[repeat(auto-fit,minmax(12rem,1fr))] gap-3 text-xs">
          {facts.map(fact => (
            <div key={fact.label}>
              <dt className="text-muted">{fact.label}</dt>
              <dd className="break-words font-semibold text-fg">
                {fact.value}
              </dd>
            </div>
          ))}
        </dl>
        {isPendingCounsel(template.reviewReference) ? (
          <p
            data-testid="counsel-warning"
            className="rounded-md border border-border bg-surface-muted p-2 text-xs text-muted"
          >
            Bản soạn tham khảo, chưa có xác nhận của luật sư (
            {template.reviewReference}).
          </p>
        ) : null}
        <p className="text-xs text-muted">
          Hợp đồng mới luôn dùng phiên bản đã phát hành mới nhất. Hợp đồng đã
          tạo giữ nguyên phiên bản đã khóa lúc tạo.
        </p>
      </AdminCard>

      <AdminCard className="space-y-2 p-4">
        <h3 className="text-sm font-bold text-fg">Phụ lục kèm hợp đồng</h3>
        {annexes.length === 0 ? (
          <p className="text-xs text-muted">Mẫu này không có phụ lục.</p>
        ) : (
          <ul className="space-y-2 text-xs" data-testid="annex-list">
            {annexes.map(annex => (
              <li key={annex.id}>
                <span className="font-semibold text-fg">{annex.title}</span>
                {annex.required ? ' · bắt buộc' : ''}
                {annex.description ? (
                  <span className="block text-muted">{annex.description}</span>
                ) : null}
              </li>
            ))}
          </ul>
        )}
      </AdminCard>

      <AdminCard className="space-y-2 p-4">
        <h3 className="text-sm font-bold text-fg">Lịch sử thay đổi</h3>
        {audits.length === 0 ? (
          <p className="text-xs text-muted">Chưa có lịch sử.</p>
        ) : (
          <ul className="space-y-1 text-xs" data-testid="audit-list">
            {audits.map((audit, index) => (
              <li key={audit._id ?? audit.id ?? index}>
                v{audit.version} · {audit.action} ·{' '}
                {formatDateTime(audit.createdAt)}
                {audit.reason ? ` · ${audit.reason}` : ''}
              </li>
            ))}
          </ul>
        )}
      </AdminCard>
    </div>
  )
}
