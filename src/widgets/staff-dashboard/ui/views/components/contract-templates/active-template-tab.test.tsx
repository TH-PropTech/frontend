import { cleanup, render, screen } from '@testing-library/react'
import { afterEach, describe, expect, it, vi } from 'vitest'
import * as contracts from '@/features/contracts'
import { ActiveTemplateTab } from './active-template-tab'

vi.mock('@/features/contracts', () => ({
  getPublishedContractTemplate: vi.fn(),
  getContractTemplateAudits: vi.fn(),
}))

const template = {
  templateKey: 'VN_INDIVIDUAL_RESIDENTIAL_LEASE',
  version: 7,
  status: 'published' as const,
  legalProfile: 'PRIVATE_CIVIL_APARTMENT_LEASE' as const,
  clauses: [],
  schemaVersion: 1,
  reviewReference: 'PROP-321-LEGAL-DRAFT-PENDING-COUNSEL-REVIEW',
  annexDefinitions: [
    {
      id: 'HANDOVER_RECORD',
      title: 'Phụ lục 1: Biên bản bàn giao',
      required: true,
    },
  ],
  allowedVariables: [],
  addenda: [],
  citationIds: [],
  contentHash: 'h',
  publishedAt: '2026-10-01T00:00:00.000Z',
}

describe('ActiveTemplateTab', () => {
  afterEach(cleanup)

  it('shows the active version, annexes, audits and the counsel warning', async () => {
    vi.mocked(contracts.getPublishedContractTemplate).mockResolvedValue(
      template
    )
    vi.mocked(contracts.getContractTemplateAudits).mockResolvedValue([
      {
        _id: 'a1',
        templateKey: template.templateKey,
        version: 7,
        action: 'PUBLISHED',
        actorId: 'admin',
        createdAt: '2026-10-01T00:00:00.000Z',
      },
    ])

    render(<ActiveTemplateTab />)

    expect(await screen.findByText('v7')).toBeTruthy()
    expect(screen.getByText('Đang áp dụng')).toBeTruthy()
    expect(screen.getByTestId('counsel-warning')).toBeTruthy()
    expect(screen.getByText('Phụ lục 1: Biên bản bàn giao')).toBeTruthy()
    expect(screen.getByTestId('audit-list').textContent).toContain('PUBLISHED')
  })

  it('shows an error when the template cannot be loaded', async () => {
    vi.mocked(contracts.getPublishedContractTemplate).mockRejectedValue(
      new Error('boom')
    )
    vi.mocked(contracts.getContractTemplateAudits).mockResolvedValue([])

    render(<ActiveTemplateTab />)

    expect((await screen.findByRole('alert')).textContent).toBe('boom')
  })
})
