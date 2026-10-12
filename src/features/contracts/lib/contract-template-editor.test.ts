import { describe, expect, it } from 'vitest'
import type { ContractTemplateDto } from '../api/contract-templates-api'
import {
  buildReleasePayload,
  countChangedClauses,
  extractVariables,
  findUnknownVariables,
  renderTemplatePreview,
  validateEdits,
} from './contract-template-editor'

const template: ContractTemplateDto = {
  templateKey: 'VN_INDIVIDUAL_RESIDENTIAL_LEASE',
  version: 2,
  status: 'published',
  legalProfile: 'PRIVATE_CIVIL_APARTMENT_LEASE',
  schemaVersion: 2,
  referenceOnly: true,
  allowedVariables: ['monthlyRent', 'startDate'],
  addenda: [],
  citationIds: ['C1'],
  contentHash: 'h',
  annexDefinitions: [{ id: 'A', title: 'Phụ lục 1', required: true }],
  clauses: [
    {
      number: 1,
      heading: 'Giá thuê',
      content: 'Giá thuê là {{monthlyRent}}.',
      variableRefs: ['monthlyRent'],
      contentHash: 'x'.repeat(64),
      citationIds: ['C1'],
      protected: true,
    },
    {
      number: 2,
      heading: 'Thời hạn',
      content: 'Từ {{startDate}}.',
      variableRefs: ['startDate'],
      contentHash: 'y'.repeat(64),
      citationIds: ['C1'],
      protected: true,
    },
  ],
}

describe('contract template editor helpers', () => {
  it('extracts unique variables and flags the ones outside the allow-list', () => {
    expect(extractVariables('{{a}} và {{ b }} và {{a}}')).toEqual(['a', 'b'])
    expect(
      findUnknownVariables(
        '{{monthlyRent}} {{secret}}',
        template.allowedVariables
      )
    ).toEqual(['secret'])
  })

  it('fills sample values and keeps unknown variables visible in the preview', () => {
    expect(
      renderTemplatePreview('Giá {{monthlyRent}} / {{unknown}}', {
        monthlyRent: '1.000 VNĐ',
      })
    ).toBe('Giá 1.000 VNĐ / {{unknown}}')
  })

  it('counts only clauses whose heading or content really changed', () => {
    expect(
      countChangedClauses(template, {
        1: { heading: 'Giá thuê', content: 'Giá thuê là {{monthlyRent}}.' },
        2: { heading: 'Thời hạn', content: 'Từ ngày {{startDate}}.' },
      })
    ).toBe(1)
  })

  it('reports empty fields and unknown variables before publishing', () => {
    const errors = validateEdits(template, {
      1: { heading: '', content: 'x {{secret}}' },
    })
    expect(errors).toEqual(
      expect.arrayContaining([
        'Điều 1: thiếu tiêu đề',
        'Điều 1: biến không được phép {{secret}}',
      ])
    )
  })

  it('clears the hash only for edited clauses and keeps the rest untouched', () => {
    const payload = buildReleasePayload(
      template,
      {
        1: {
          heading: 'Giá thuê',
          content: 'Mới {{monthlyRent}} {{startDate}}',
        },
      },
      ' REF-2026-10 '
    )

    expect(payload.reviewReference).toBe('REF-2026-10')
    expect(payload.clauses[0]).toMatchObject({
      content: 'Mới {{monthlyRent}} {{startDate}}',
      contentHash: '',
      variableRefs: ['monthlyRent', 'startDate'],
    })
    expect(payload.clauses[1]).toBe(template.clauses[1])
    expect(payload.schemaVersion).toBe(2)
    expect(payload.annexDefinitions).toHaveLength(1)
  })
})
