import {
  LEGAL_DOC_CATEGORIES,
  type LegalDocCategory,
  type LegalDocItem,
} from '../model/legal-knowledge.types'

/** One hue per document type, picked to sit on the warm app palette. */
export const CATEGORY_COLORS: Readonly<Record<LegalDocCategory, string>> = {
  luat: '#c65a3a',
  'nghi-dinh': '#e9a23b',
  'thong-tu': '#6b8e4e',
  'quyet-dinh': '#7a6a61',
  'noi-quy': '#4f7a8f',
  'hop-dong-mau': '#9a6bb0',
  'thu-tuc': '#d98c5f',
  faq: '#5a9e8f',
  khac: '#a49389',
}

/**
 * Gives every document a slot on the brain. Documents that already had a slot keep it, so nodes never
 * jump when the list changes; new ones take the lowest free slot, so they fill the visible side first.
 */
export function allocateSlots(
  ids: readonly string[],
  previous: ReadonlyMap<string, number>,
  slotCount: number
): Map<string, number> {
  const next = new Map<string, number>()
  const used = new Set<number>()
  for (const id of ids) {
    const slot = previous.get(id)
    if (slot !== undefined && slot < slotCount && !used.has(slot)) {
      next.set(id, slot)
      used.add(slot)
    }
  }
  for (const id of ids) {
    if (next.has(id)) continue
    let slot = 0
    while (slot < slotCount && used.has(slot)) slot += 1
    if (slot === slotCount) slot = next.size % slotCount
    next.set(id, slot)
    used.add(slot)
  }
  return next
}

function normalized(value: string | undefined): string {
  return (value ?? '').trim().toLocaleLowerCase('vi-VN')
}

/** Links related documents: same issuer, two shared keywords, or neighbours of one type. */
export function buildDocEdges(
  docs: readonly LegalDocItem[]
): Array<[string, string]> {
  const edges = new Map<string, [string, string]>()
  const link = (a: LegalDocItem, b: LegalDocItem): void => {
    const [first, second] = a._id < b._id ? [a._id, b._id] : [b._id, a._id]
    edges.set(`${first}|${second}`, [first, second])
  }
  const keywords = docs.map(
    doc => new Set(doc.keywords.map(word => normalized(word)))
  )
  for (let i = 0; i < docs.length; i += 1) {
    for (let j = i + 1; j < docs.length; j += 1) {
      const a = docs[i]
      const b = docs[j]
      if (!a || !b) continue
      const issuer = normalized(a.issuer)
      let shared = 0
      for (const word of keywords[i] ?? []) {
        if (word && keywords[j]?.has(word)) shared += 1
      }
      if ((issuer && issuer === normalized(b.issuer)) || shared >= 2) {
        link(a, b)
      }
    }
  }
  for (const category of LEGAL_DOC_CATEGORIES) {
    const same = docs
      .filter(doc => doc.category === category)
      .sort((x, y) => x.title.localeCompare(y.title, 'vi'))
    for (let i = 1; i < same.length; i += 1) {
      const a = same[i - 1]
      const b = same[i]
      if (a && b) link(a, b)
    }
  }
  return [...edges.values()]
}

export interface CategoryCount {
  category: LegalDocCategory
  count: number
}

/** Categories that have at least one document, in the fixed display order. */
export function countByCategory(
  docs: readonly LegalDocItem[]
): CategoryCount[] {
  return LEGAL_DOC_CATEGORIES.map(category => ({
    category,
    count: docs.filter(doc => doc.category === category).length,
  })).filter(item => item.count > 0)
}
