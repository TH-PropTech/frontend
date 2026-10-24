'use client'

import * as React from 'react'
import { Plus, Search, X } from 'lucide-react'
import type {
  CommunityFilters,
  CommunityTopicFilter,
} from '../../lib/community-types'

export const FEED_PANEL_ID = 'community-feed-panel'

const TOPIC_TABS: { id: CommunityTopicFilter; label: string }[] = [
  { id: 'all', label: 'Tất cả' },
  { id: 'qa', label: 'Hỏi đáp' },
  { id: 'review', label: 'Đánh giá' },
  { id: 'roommate', label: 'Tìm bạn ở ghép' },
]

const CHIP_CLEAR_CLASSES =
  'ml-1 flex h-6 w-6 items-center justify-center rounded-full hover:bg-black/5'

interface CommunityToolbarProps {
  filters: CommunityFilters
  onTopicChange: (topic: CommunityTopicFilter) => void
  onSearchChange: (value: string) => void
  onProjectClear: () => void
  onReset: () => void
  showCreateButton: boolean
  onCreateClick: () => void
}

export function CommunityToolbar({
  filters,
  onTopicChange,
  onSearchChange,
  onProjectClear,
  onReset,
  showCreateButton,
  onCreateClick,
}: CommunityToolbarProps): React.ReactElement {
  const hasActiveFilters = Boolean(filters.project || filters.search)

  return (
    <div className="space-y-4 rounded-2xl border border-border/80 bg-surface p-4 shadow-sm">
      <div className="flex flex-col items-stretch justify-between gap-4 lg:flex-row lg:items-center">
        <div
          role="tablist"
          aria-label="Chủ đề thảo luận"
          className="no-scrollbar flex w-full items-center overflow-x-auto scroll-smooth rounded-full border border-border/80 bg-surface-muted p-1 lg:w-auto"
        >
          {TOPIC_TABS.map(tab => {
            const isActive = filters.topic === tab.id
            return (
              <button
                key={tab.id}
                type="button"
                role="tab"
                aria-selected={isActive}
                aria-controls={FEED_PANEL_ID}
                onClick={() => onTopicChange(tab.id)}
                className={`min-h-11 shrink-0 whitespace-nowrap rounded-full px-4 py-2 text-xs font-bold transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-primary ${
                  isActive
                    ? 'bg-primary text-primary-foreground shadow-sm'
                    : 'text-muted hover:text-fg'
                }`}
              >
                {tab.label}
              </button>
            )
          })}
        </div>

        <div className="relative w-full min-w-[200px] max-w-md flex-1">
          <Search
            className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-muted/70"
            aria-hidden
          />
          <input
            type="search"
            aria-label="Tìm bài viết"
            value={filters.search}
            onChange={event => onSearchChange(event.target.value)}
            placeholder="Tìm bài viết, dự án, nội dung..."
            className="min-h-11 w-full rounded-full border border-border/80 bg-surface-muted/60 py-2 pl-10 pr-10 text-xs text-fg transition-all placeholder:text-muted/70 focus:border-primary focus:outline-none focus-visible:ring-2 focus-visible:ring-primary/20 [&::-webkit-search-cancel-button]:hidden"
          />
          {filters.search && (
            <button
              type="button"
              aria-label="Xóa từ khóa tìm kiếm"
              onClick={() => onSearchChange('')}
              className="absolute right-1.5 top-1/2 flex h-9 w-9 -translate-y-1/2 items-center justify-center rounded-full text-muted hover:text-fg"
            >
              <X className="h-4 w-4" aria-hidden />
            </button>
          )}
        </div>

        {showCreateButton && (
          <button
            type="button"
            onClick={onCreateClick}
            className="flex min-h-11 w-full shrink-0 items-center justify-center gap-2 whitespace-nowrap rounded-xl bg-primary px-5 py-2.5 text-xs font-bold text-primary-foreground shadow-md transition-all duration-200 hover:-translate-y-0.5 hover:bg-primary-hover active:translate-y-0 lg:w-auto"
          >
            <Plus className="h-4 w-4 shrink-0" aria-hidden />
            Đăng bài mới
          </button>
        )}
      </div>

      {hasActiveFilters && (
        <div className="flex flex-wrap items-center gap-2 border-t border-border/40 pt-2 text-xs text-muted">
          <span className="font-medium">Đang lọc:</span>
          {filters.project && (
            <span className="inline-flex items-center gap-1.5 rounded-full border border-primary/20 bg-primary-soft py-0.5 pl-2.5 pr-1 text-[11px] font-bold text-primary">
              Dự án: {filters.project}
              <button
                type="button"
                aria-label="Bỏ lọc dự án"
                onClick={onProjectClear}
                className={CHIP_CLEAR_CLASSES}
              >
                <X className="h-3 w-3" aria-hidden />
              </button>
            </span>
          )}
          {filters.search && (
            <span className="inline-flex items-center gap-1.5 rounded-full border border-border bg-surface-muted py-0.5 pl-2.5 pr-1 text-[11px] text-fg">
              Từ khóa: &quot;{filters.search}&quot;
              <button
                type="button"
                aria-label="Xóa từ khóa"
                onClick={() => onSearchChange('')}
                className={CHIP_CLEAR_CLASSES}
              >
                <X className="h-3 w-3" aria-hidden />
              </button>
            </span>
          )}
          <button
            type="button"
            onClick={onReset}
            className="ml-auto min-h-10 px-2 text-[11px] font-bold text-primary hover:underline"
          >
            Đặt lại bộ lọc
          </button>
        </div>
      )}
    </div>
  )
}
