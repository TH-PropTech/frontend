import { describe, expect, it } from 'vitest'
import type { LegalDocItem } from '../model/legal-knowledge.types'
import {
  extractOutline,
  groupBySource,
  MANUAL_HOST,
  sourceHost,
  sourceTrust,
} from './source-map'

function doc(overrides: Partial<LegalDocItem>): LegalDocItem {
  return {
    _id: 'id',
    title: 'Tài liệu',
    category: 'luat',
    keywords: [],
    status: 'published',
    chunkCount: 2,
    contentLength: 100,
    contentSource: 'link',
    createdAt: '2026-10-11T00:00:00.000Z',
    updatedAt: '2026-10-11T00:00:00.000Z',
    ...overrides,
  }
}

describe('sourceHost', () => {
  it('drops www and returns the hostname', () => {
    expect(sourceHost('https://www.caselaw.vn/van-ban/1')).toBe('caselaw.vn')
  })

  it('falls back to manual for empty or invalid links', () => {
    expect(sourceHost(undefined)).toBe(MANUAL_HOST)
    expect(sourceHost('khong-phai-link')).toBe(MANUAL_HOST)
  })
})

describe('groupBySource', () => {
  it('groups by host, largest first, manual last', () => {
    const groups = groupBySource([
      doc({ _id: 'a' }),
      doc({ _id: 'b', sourceUrl: 'https://chinhphu.vn/x', contentLength: 50 }),
      doc({ _id: 'c', sourceUrl: 'https://caselaw.vn/1', contentLength: 10 }),
      doc({ _id: 'd', sourceUrl: 'https://caselaw.vn/2', contentLength: 20 }),
    ])
    expect(groups.map(group => group.host)).toEqual([
      'caselaw.vn',
      'chinhphu.vn',
      MANUAL_HOST,
    ])
    expect(groups[0]).toMatchObject({ totalChars: 30, totalChunks: 4 })
  })
})

describe('extractOutline', () => {
  it('collects chapter, article and markdown headings in order', () => {
    const content = [
      'Văn bản mở đầu không phải tiêu đề',
      'Chương I. Quy định chung',
      'Điều 1. Phạm vi điều chỉnh',
      '## Hồ sơ cần chuẩn bị',
      'Nội dung thường.',
      'Điều 2: Đối tượng áp dụng',
    ].join('\n')
    expect(extractOutline(content, 10)).toEqual([
      'Chương I. Quy định chung',
      'Điều 1. Phạm vi điều chỉnh',
      'Hồ sơ cần chuẩn bị',
      'Điều 2: Đối tượng áp dụng',
    ])
  })

  it('stops at the limit', () => {
    const content = 'Điều 1. A\nĐiều 2. B\nĐiều 3. C'
    expect(extractOutline(content, 2)).toHaveLength(2)
  })
})

describe('sourceTrust', () => {
  it('marks .gov.vn hosts as official', () => {
    expect(sourceTrust('dichvucong.bocongan.gov.vn').official).toBe(true)
    expect(sourceTrust('gov.vn').official).toBe(true)
  })

  it('asks admins to cross-check aggregator sites and flags manual entries', () => {
    expect(sourceTrust('caselaw.vn')).toMatchObject({ official: false })
    expect(sourceTrust('notgov.vn').official).toBe(false)
    expect(sourceTrust(MANUAL_HOST).label).toBe('Biên soạn thủ công')
  })
})
