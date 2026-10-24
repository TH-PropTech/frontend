'use client'

import * as React from 'react'
import { AlertTriangle, Loader2, MessageSquare } from 'lucide-react'
import { Skeleton } from '@/shared/ui/skeleton'
import type { StoredUser, WebCommunityPost } from '../../lib/community-types'
import type { FeedTab } from '../../lib/use-web-community'
import { FEED_PANEL_ID } from './community-toolbar'
import { PostCard } from './post-card'
import { StaffModerationPanel } from './staff-moderation-panel'

const SKELETON_CARD_COUNT = 3
const tabId = (tab: FeedTab): string => `community-feed-tab-${tab}`

export interface FeedStatus {
  isLoading: boolean
  isError: boolean
  retry: () => void
  hasNextPage: boolean
  isFetchingNextPage: boolean
  fetchNextPage: () => void
}

interface CommunityFeedProps {
  tab: FeedTab
  onTabChange: (tab: FeedTab) => void
  isAuthenticated: boolean
  isModerator: boolean
  pendingCount: number
  posts: WebCommunityPost[]
  status: FeedStatus
  hasActiveFilters: boolean
  onResetFilters: () => void
  currentUser: StoredUser | null
  onAuthRequired: () => void
  onUpvote: (id: string) => void
  onDeletePost: (id: string) => void
  isDeletingPost: boolean
  onCommentAdded: (id: string) => void
  onCommentRemoved: (id: string, removedCount: number) => void
  onSelectProject: (project: string) => void
  onApprove: (id: string) => void
  onReject: (id: string) => void
  isModerating: boolean
}

function EmptyState({
  title,
  hint,
  action,
}: {
  title: string
  hint: string
  action?: React.ReactNode
}): React.ReactElement {
  return (
    <div className="rounded-3xl border border-dashed border-border bg-surface-muted/40 p-6 py-16 text-center sm:py-20">
      <MessageSquare
        className="mx-auto mb-3 h-10 w-10 text-muted/60"
        aria-hidden
      />
      <p className="font-body text-sm font-semibold text-fg">{title}</p>
      <p className="mx-auto mt-1 max-w-sm font-body text-xs text-muted">
        {hint}
      </p>
      {action}
    </div>
  )
}

export function CommunityFeed({
  tab,
  onTabChange,
  isAuthenticated,
  isModerator,
  pendingCount,
  posts,
  status,
  hasActiveFilters,
  onResetFilters,
  currentUser,
  onAuthRequired,
  onUpvote,
  onDeletePost,
  isDeletingPost,
  onCommentAdded,
  onCommentRemoved,
  onSelectProject,
  onApprove,
  onReject,
  isModerating,
}: CommunityFeedProps): React.ReactElement {
  const tabs: { id: FeedTab; label: string; isDanger?: boolean }[] = [
    { id: 'public', label: 'Bài viết cộng đồng' },
    ...(isAuthenticated
      ? [{ id: 'mine' as const, label: 'Bài viết của tôi' }]
      : []),
    ...(isModerator
      ? [{ id: 'moderation' as const, label: 'Kiểm duyệt', isDanger: true }]
      : []),
  ]

  const renderBody = (): React.ReactNode => {
    if (status.isLoading) {
      return (
        <div className="space-y-5" aria-busy="true" role="status">
          <span className="sr-only">Đang tải bài viết...</span>
          {Array.from({ length: SKELETON_CARD_COUNT }, (_, index) => (
            <Skeleton key={index} className="h-44 w-full rounded-xl" />
          ))}
        </div>
      )
    }

    if (status.isError) {
      return (
        <div
          role="alert"
          className="rounded-3xl border border-danger/20 bg-danger-soft/40 p-6 py-14 text-center"
        >
          <AlertTriangle
            className="mx-auto mb-3 h-9 w-9 text-danger"
            aria-hidden
          />
          <p className="text-sm font-semibold text-fg">
            Không thể tải bài viết
          </p>
          <p className="mt-1 text-xs text-muted">
            Vui lòng kiểm tra kết nối rồi thử lại.
          </p>
          <button
            type="button"
            onClick={status.retry}
            className="mt-4 min-h-11 rounded-xl border border-border bg-surface px-5 text-xs font-bold text-primary shadow-sm transition-colors hover:border-primary"
          >
            Thử lại
          </button>
        </div>
      )
    }

    if (tab === 'moderation') {
      return posts.length === 0 ? (
        <EmptyState
          title="Không có bài viết nào đang chờ kiểm duyệt"
          hint="Tất cả bài viết cộng đồng đã được xử lý xong."
        />
      ) : (
        <StaffModerationPanel
          posts={posts}
          onApprove={onApprove}
          onReject={onReject}
          isBusy={isModerating}
        />
      )
    }

    if (posts.length === 0) {
      return (
        <EmptyState
          title={
            tab === 'mine' && !hasActiveFilters
              ? 'Bạn chưa đăng bài viết nào'
              : 'Không tìm thấy bài viết nào'
          }
          hint={
            hasActiveFilters
              ? 'Thử xóa bộ lọc hoặc tìm kiếm với từ khóa khác.'
              : 'Hãy là người đầu tiên chia sẻ câu hỏi hoặc trải nghiệm cùng cộng đồng.'
          }
          action={
            hasActiveFilters ? (
              <button
                type="button"
                onClick={onResetFilters}
                className="mt-4 min-h-11 rounded-xl border border-border bg-surface px-4 text-xs font-bold text-primary shadow-sm transition-colors hover:border-primary"
              >
                Xóa tất cả bộ lọc
              </button>
            ) : null
          }
        />
      )
    }

    return (
      <div className="space-y-5">
        {posts.map(post => (
          <PostCard
            key={post.id}
            post={post}
            onUpvote={onUpvote}
            onCommentAdded={onCommentAdded}
            onCommentRemoved={onCommentRemoved}
            onDeletePost={onDeletePost}
            isDeleting={isDeletingPost}
            onSelectProject={onSelectProject}
            currentUser={currentUser}
            isAuthenticated={isAuthenticated}
            onAuthRequired={onAuthRequired}
          />
        ))}
        {status.hasNextPage && (
          <div className="flex justify-center pt-2">
            <button
              type="button"
              disabled={status.isFetchingNextPage}
              onClick={status.fetchNextPage}
              className="flex min-h-11 items-center gap-2 rounded-xl border border-border bg-surface px-6 text-xs font-bold text-primary shadow-sm transition-colors hover:border-primary disabled:opacity-60"
            >
              {status.isFetchingNextPage && (
                <Loader2 className="h-4 w-4 animate-spin" aria-hidden />
              )}
              Xem thêm bài viết
            </button>
          </div>
        )}
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div
        role="tablist"
        aria-label="Danh sách bài viết"
        className="no-scrollbar mb-6 flex gap-6 overflow-x-auto border-b border-border/60"
      >
        {tabs.map(item => {
          const isActive = tab === item.id
          return (
            <button
              key={item.id}
              id={tabId(item.id)}
              type="button"
              role="tab"
              aria-selected={isActive}
              aria-controls={FEED_PANEL_ID}
              onClick={() => onTabChange(item.id)}
              className={`relative flex min-h-11 shrink-0 items-center gap-1.5 whitespace-nowrap pb-3 text-sm font-bold transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-primary ${
                isActive
                  ? item.isDanger
                    ? 'text-danger'
                    : 'text-primary'
                  : 'text-muted hover:text-fg'
              }`}
            >
              {item.label}
              {item.id === 'moderation' && pendingCount > 0 && (
                <span className="rounded-full bg-danger px-1.5 text-[11px] font-bold text-white">
                  {pendingCount}
                </span>
              )}
              {isActive && (
                <span
                  className={`absolute bottom-0 left-0 right-0 h-0.5 rounded-full ${item.isDanger ? 'bg-danger' : 'bg-primary'}`}
                />
              )}
            </button>
          )
        })}
      </div>

      <div id={FEED_PANEL_ID} role="tabpanel" aria-labelledby={tabId(tab)}>
        {renderBody()}
      </div>
    </div>
  )
}
