/* eslint-disable react-hooks/set-state-in-effect */
'use client'

import * as React from 'react'

interface BookmarkState {
  articleId: string
  stepIndex: number
  savedAt: number
}

interface GuideBookmarkResult {
  bookmark: BookmarkState | null
  setBookmark: (stepIndex: number) => void
  clearBookmark: () => void
}

const STORAGE_KEY = 'mascot-bookmarks'

/**
 * Smart bookmark hook — pin exactly 1 step per article for resume later.
 * Persists in localStorage.
 */
export function useGuideBookmark(articleId: string): GuideBookmarkResult {
  const [bookmark, setBookmarkState] = React.useState<BookmarkState | null>(
    null
  )

  // Load bookmark on mount / articleId change
  React.useEffect(() => {
    try {
      const data = localStorage.getItem(STORAGE_KEY)
      if (!data) return
      const bookmarks: BookmarkState[] = JSON.parse(data)
      const found = bookmarks.find(b => b.articleId === articleId) ?? null
      setBookmarkState(found)
    } catch {
      /* ignore corrupt data */
    }
  }, [articleId])

  const setBookmark = React.useCallback(
    (stepIndex: number): void => {
      try {
        const data = localStorage.getItem(STORAGE_KEY)
        const bookmarks: BookmarkState[] = data ? JSON.parse(data) : []
        const filtered = bookmarks.filter(b => b.articleId !== articleId)
        const newBookmark: BookmarkState = {
          articleId,
          stepIndex,
          savedAt: Date.now(),
        }
        filtered.push(newBookmark)
        localStorage.setItem(STORAGE_KEY, JSON.stringify(filtered))
        setBookmarkState(newBookmark)
      } catch {
        /* ignore storage errors */
      }
    },
    [articleId]
  )

  const clearBookmark = React.useCallback((): void => {
    try {
      const data = localStorage.getItem(STORAGE_KEY)
      if (!data) return
      const bookmarks: BookmarkState[] = JSON.parse(data)
      const filtered = bookmarks.filter(b => b.articleId !== articleId)
      localStorage.setItem(STORAGE_KEY, JSON.stringify(filtered))
      setBookmarkState(null)
    } catch {
      /* ignore storage errors */
    }
  }, [articleId])

  return { bookmark, setBookmark, clearBookmark }
}
