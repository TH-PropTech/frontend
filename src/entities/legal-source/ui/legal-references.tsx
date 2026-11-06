'use client'

import * as React from 'react'
import { ExternalLink, Scale } from 'lucide-react'
import {
  getPublicLegalSources,
  type PublicLegalSource,
} from '../api/legal-source-api'

export interface LegalReferencesProps {
  /** Khóa các nguồn liên quan tới màn hình này, theo thứ tự hiển thị. */
  sourceKeys: readonly string[]
  /** Giải thích theo ngữ cảnh, đi kèm các nguồn. */
  note?: string
  title?: string
}

/**
 * Khối "Cơ sở pháp lý" thu gọn mặc định. Không tải được danh mục thì chỉ còn phần
 * giải thích (nếu có), không chặn thao tác của màn hình.
 */
export function LegalReferences({
  sourceKeys,
  note,
  title = 'Cơ sở pháp lý',
}: LegalReferencesProps): React.ReactElement | null {
  const [sources, setSources] = React.useState<PublicLegalSource[]>([])
  const keysId = sourceKeys.join('|')

  React.useEffect(() => {
    let active = true
    getPublicLegalSources()
      .then(all => {
        if (!active) return
        const wanted = keysId.split('|')
        setSources(
          wanted.flatMap(key => all.filter(source => source.key === key))
        )
      })
      .catch(() => {
        if (active) setSources([])
      })
    return () => {
      active = false
    }
  }, [keysId])

  if (sources.length === 0 && !note) return null

  return (
    <details
      data-testid="legal-references"
      className="rounded-lg border border-border bg-surface-muted p-3 text-sm"
    >
      <summary className="flex cursor-pointer items-center gap-2 font-medium text-fg">
        <Scale className="h-4 w-4 text-info" aria-hidden="true" />
        {title}
      </summary>
      <div className="mt-2 space-y-3">
        {note ? <p className="text-muted">{note}</p> : null}
        <ul className="space-y-3">
          {sources.map(source => (
            <li key={source.key} className="space-y-1">
              <a
                href={source.externalUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1 font-medium text-info underline"
              >
                {source.code} - {source.title}
                <ExternalLink className="h-3.5 w-3.5" aria-hidden="true" />
                <span className="sr-only">(mở trong tab mới)</span>
              </a>
              {source.legalGrounds.map(ground => (
                <p
                  key={`${ground.title}-${ground.article}`}
                  className="text-xs"
                >
                  {ground.title}: {ground.article}
                </p>
              ))}
              {source.notes.map(item => (
                <p key={item} className="text-xs text-muted">
                  {item}
                </p>
              ))}
            </li>
          ))}
        </ul>
      </div>
    </details>
  )
}
