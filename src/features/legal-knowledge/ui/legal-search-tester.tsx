'use client'

import * as React from 'react'
import { toast } from 'sonner'
import { searchLegalKnowledge } from '../api/legal-knowledge-api'
import { describeError, formatScore, isHttpUrl } from '../lib/format'
import type { LegalSearchHit } from '../model/legal-knowledge.types'

const EXCERPT_CHARS = 400

export function LegalSearchTester(): React.ReactElement {
  const [query, setQuery] = React.useState('')
  const [searching, setSearching] = React.useState(false)
  const [hits, setHits] = React.useState<LegalSearchHit[] | null>(null)

  const runSearch = async (): Promise<void> => {
    const text = query.trim()
    if (!text) return
    setSearching(true)
    try {
      setHits(await searchLegalKnowledge(text, 5))
    } catch (cause: unknown) {
      toast.error(describeError(cause))
    } finally {
      setSearching(false)
    }
  }

  return (
    <section
      aria-labelledby="legal-search-title"
      className="space-y-4 rounded-xl border border-border bg-surface p-5"
    >
      <div>
        <h2 id="legal-search-title" className="text-sm font-bold text-fg">
          Thử hỏi tri thức
        </h2>
        <p className="mt-1 text-xs text-muted">
          Tìm trong các văn bản đang áp dụng, đúng cách chatbot tra cứu. Bản
          nháp và bản đã lưu trữ không được tìm thấy.
        </p>
      </div>
      <form
        className="flex flex-col gap-3 sm:flex-row"
        onSubmit={event => {
          event.preventDefault()
          void runSearch()
        }}
      >
        <label htmlFor="legal-search-query" className="sr-only">
          Câu hỏi thử nghiệm
        </label>
        <input
          id="legal-search-query"
          value={query}
          placeholder="VD: Đặt cọc thuê nhà tối đa bao nhiêu tháng?"
          onChange={event => setQuery(event.target.value)}
          className="w-full flex-1 rounded-lg border border-border bg-surface px-3 py-2 text-sm text-fg placeholder:text-muted focus:outline-none focus:ring-2 focus:ring-primary/30"
        />
        <button
          type="submit"
          disabled={!query.trim() || searching}
          className="shrink-0 rounded-lg bg-primary px-4 py-2 text-xs font-semibold text-on-control transition-colors hover:bg-primary-hover disabled:opacity-50"
        >
          {searching ? 'Đang tìm...' : 'Tìm'}
        </button>
      </form>

      {hits !== null && hits.length === 0 && (
        <p className="text-xs text-muted">
          Chưa có nội dung phù hợp trong kho tri thức đã xuất bản.
        </p>
      )}

      {hits !== null && hits.length > 0 && (
        <ol className="space-y-3">
          {hits.map((hit, index) => (
            <li
              key={`${hit.docId}-${index}`}
              className="space-y-1.5 rounded-lg border border-border p-3"
            >
              <div className="flex flex-wrap items-center gap-2 text-xs">
                <span className="font-bold text-fg">{hit.title}</span>
                {hit.heading && (
                  <span className="text-muted">· {hit.heading}</span>
                )}
                <span className="ml-auto rounded-md bg-surface-muted px-2 py-0.5 font-mono text-[11px] text-muted">
                  điểm {formatScore(hit.score)}
                </span>
              </div>
              <p className="whitespace-pre-line text-xs leading-relaxed text-fg">
                {hit.text.length > EXCERPT_CHARS
                  ? `${hit.text.slice(0, EXCERPT_CHARS)}…`
                  : hit.text}
              </p>
              {isHttpUrl(hit.sourceUrl) && (
                <a
                  href={hit.sourceUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xs font-semibold text-primary hover:underline"
                >
                  Mở nguồn
                </a>
              )}
            </li>
          ))}
        </ol>
      )}
    </section>
  )
}
