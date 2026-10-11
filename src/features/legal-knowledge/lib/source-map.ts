import type { LegalDocItem } from '../model/legal-knowledge.types'

export const MANUAL_HOST = 'Nhập thủ công'

const OUTLINE_HEADING =
  /^(?:#{1,4}\s+(.+)|((?:Chương|CHƯƠNG|Mục|MỤC|Phần|PHẦN)\s+[IVXLCDM\d]+\b.*)|(Điều\s+\d+[a-z]?\s*[.:].*))$/

export interface LegalSourceGroup {
  host: string
  docs: LegalDocItem[]
  totalChars: number
  totalChunks: number
}

/** Hostname without "www.", or "Nhập thủ công" when the doc has no valid source link. */
export function sourceHost(url: string | undefined): string {
  if (!url) return MANUAL_HOST
  try {
    return new URL(url).hostname.replace(/^www\./, '')
  } catch {
    return MANUAL_HOST
  }
}

/** Groups docs by the site they were taken from; biggest sources first, manual entries last. */
export function groupBySource(
  docs: readonly LegalDocItem[]
): LegalSourceGroup[] {
  const groups = new Map<string, LegalSourceGroup>()
  for (const doc of docs) {
    const host = sourceHost(doc.sourceUrl)
    const group = groups.get(host) ?? {
      host,
      docs: [],
      totalChars: 0,
      totalChunks: 0,
    }
    group.docs.push(doc)
    group.totalChars += doc.contentLength
    group.totalChunks += doc.chunkCount
    groups.set(host, group)
  }
  return [...groups.values()].sort((a, b) => {
    if (a.host === MANUAL_HOST) return 1
    if (b.host === MANUAL_HOST) return -1
    return b.docs.length - a.docs.length || b.totalChars - a.totalChars
  })
}

/** Headings (Chương/Mục/Điều/markdown) of the stored text, to show what the doc covers. */
export function extractOutline(content: string, limit: number): string[] {
  const result: string[] = []
  for (const raw of content.split('\n')) {
    const line = raw.trim()
    if (line.length === 0 || line.length > 200) continue
    const match = OUTLINE_HEADING.exec(line)
    const heading = match?.[1] ?? match?.[2] ?? match?.[3]
    if (!heading) continue
    result.push(heading.trim())
    if (result.length >= limit) break
  }
  return result
}

export interface SourceTrust {
  /** true for state portals (*.gov.vn), whose text is the official publication. */
  official: boolean
  label: string
}

/** Rates how authoritative a source site is, so admins know what still needs checking. */
export function sourceTrust(host: string): SourceTrust {
  if (host === MANUAL_HOST) {
    return { official: false, label: 'Biên soạn thủ công' }
  }
  if (host === 'gov.vn' || host.endsWith('.gov.vn')) {
    return { official: true, label: 'Cổng cơ quan nhà nước (.gov.vn)' }
  }
  return { official: false, label: 'Trang tổng hợp, cần đối chiếu văn bản gốc' }
}
