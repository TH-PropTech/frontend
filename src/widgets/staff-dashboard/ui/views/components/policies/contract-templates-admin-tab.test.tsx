import { beforeEach, describe, expect, it, vi } from 'vitest'
import { fireEvent, render, screen, waitFor } from '@testing-library/react'
import type { ContractTemplateDto } from '@/features/contracts'
import { ContractTemplatesAdminTab } from './contract-templates-admin-tab'

const api = vi.hoisted(() => ({
  getPublishedContractTemplate: vi.fn(),
  getContractTemplateAudits: vi.fn(),
  publishContractTemplateRelease: vi.fn(),
}))

vi.mock('@/features/contracts', async importOriginal => {
  const original = await importOriginal<typeof import('@/features/contracts')>()
  return { ...original, ...api }
})

const template: ContractTemplateDto = {
  templateKey: 'VN_INDIVIDUAL_RESIDENTIAL_LEASE',
  version: 2,
  status: 'published',
  legalProfile: 'PRIVATE_CIVIL_APARTMENT_LEASE',
  schemaVersion: 2,
  referenceOnly: true,
  reviewReference: 'PROP-321-LEGAL-DRAFT-2026-10-PENDING-COUNSEL-REVIEW',
  allowedVariables: ['monthlyRent'],
  addenda: [],
  citationIds: ['C1'],
  contentHash: 'a'.repeat(64),
  annexDefinitions: [{ id: 'A', title: 'Phụ lục 1', required: true }],
  clauses: [
    {
      number: 1,
      heading: 'Giá thuê',
      content: 'Giá thuê là {{monthlyRent}}.',
      variableRefs: ['monthlyRent'],
      contentHash: 'b'.repeat(64),
      citationIds: ['C1'],
      protected: true,
    },
  ],
}

async function openFirstClause(): Promise<HTMLTextAreaElement> {
  await screen.findByTestId('template-version')
  fireEvent.click(screen.getByRole('button', { name: /Điều 1\. Giá thuê/ }))
  return screen.getByLabelText(/Nội dung \(mỗi dòng/) as HTMLTextAreaElement
}

describe('ContractTemplatesAdminTab', () => {
  beforeEach(() => {
    vi.clearAllMocks()
    api.getPublishedContractTemplate.mockResolvedValue(template)
    api.getContractTemplateAudits.mockResolvedValue([
      {
        templateKey: template.templateKey,
        version: 2,
        action: 'legal-release-published',
        actorId: 'system-legal-bootstrap',
        reviewReference: 'PROP-321',
      },
    ])
  })

  it('shows the published version, the pending-review warning and the audit history', async () => {
    render(<ContractTemplatesAdminTab />)

    expect(await screen.findByTestId('template-version')).toHaveTextContent(
      'v2'
    )
    expect(screen.getByTestId('template-review-warning')).toHaveTextContent(
      'chờ luật sư thẩm định'
    )
    expect(screen.getByTestId('template-audits')).toHaveTextContent(
      'legal-release-published'
    )
    expect(screen.getByTestId('changed-count')).toHaveTextContent(
      'Chưa có thay đổi'
    )
  })

  it('marks an edited clause, previews it with sample data and blocks unknown variables', async () => {
    render(<ContractTemplatesAdminTab />)
    const textarea = await openFirstClause()

    fireEvent.change(textarea, {
      target: { value: 'Giá {{monthlyRent}} và {{secret}}' },
    })

    expect(screen.getByTestId('clause-1-edited')).toBeInTheDocument()
    expect(screen.getAllByRole('alert')[0]).toHaveTextContent('{{secret}}')
    expect(
      screen.getByRole('button', { name: /Phát hành phiên bản mới/ })
    ).toBeDisabled()

    fireEvent.change(textarea, {
      target: { value: 'Giá thuê {{monthlyRent}}' },
    })
    fireEvent.click(screen.getByRole('button', { name: /Xem trước/ }))
    expect(screen.getByTestId('clause-1-preview')).toHaveTextContent(
      'Giá thuê 12.500.000 VNĐ'
    )
  })

  it('requires a review reference, confirms, then publishes the next version', async () => {
    api.publishContractTemplateRelease.mockResolvedValue({
      ...template,
      version: 3,
    })
    render(<ContractTemplatesAdminTab />)
    const textarea = await openFirstClause()
    fireEvent.change(textarea, {
      target: { value: 'Giá thuê mới {{monthlyRent}}' },
    })

    const publish = screen.getByRole('button', {
      name: /Phát hành phiên bản mới/,
    })
    expect(publish).toBeDisabled()

    fireEvent.change(screen.getByLabelText(/Mã tham chiếu thẩm định/), {
      target: { value: 'LUATSU-2026-10' },
    })
    expect(publish).toBeEnabled()
    fireEvent.click(publish)
    expect(screen.getByText(/tạo phiên bản v3/)).toBeInTheDocument()
    fireEvent.click(screen.getByRole('button', { name: /Xác nhận phát hành/ }))

    await waitFor(() =>
      expect(api.publishContractTemplateRelease).toHaveBeenCalledTimes(1)
    )
    const [key, payload] = api.publishContractTemplateRelease.mock.calls[0] as [
      string,
      { reviewReference: string; clauses: Array<{ contentHash: string }> },
    ]
    expect(key).toBe('VN_INDIVIDUAL_RESIDENTIAL_LEASE')
    expect(payload.reviewReference).toBe('LUATSU-2026-10')
    expect(payload.clauses[0]?.contentHash).toBe('')
    expect(
      await screen.findByText(/Đã phát hành phiên bản 3/)
    ).toBeInTheDocument()
  })

  it('shows an error when the template cannot be loaded', async () => {
    api.getPublishedContractTemplate.mockRejectedValue(new Error('boom'))
    render(<ContractTemplatesAdminTab />)

    expect(await screen.findByRole('alert')).toHaveTextContent('boom')
  })
})
