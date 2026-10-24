import * as React from 'react'
import Image from 'next/image'
import { Building2, MessageCircle, ThumbsUp, Trash2 } from 'lucide-react'
import {
  hasModeratorRole,
  ROLE_BADGE_CLASSES,
  ROLE_LABELS,
  TOPIC_LABELS,
  type CommunityPostStatus,
  type CommunityTopic,
  type StoredUser,
  type WebCommunityPost,
} from '../../lib/community-types'
import { CommentsSection } from './comments-section'
import { ConfirmDeleteDialog } from './confirm-delete-dialog'
import { UserAvatar } from './user-avatar'

const TOPIC_CLASSES: Record<CommunityTopic, string> = {
  qa: 'bg-primary-soft text-primary border-primary/15',
  review: 'bg-success-soft text-success border-success/15',
  roommate: 'bg-accent-soft text-fg border-accent/30',
}

const STATUS_BADGES: Partial<
  Record<CommunityPostStatus, { label: string; className: string }>
> = {
  pending: {
    label: 'Đang chờ duyệt',
    className: 'bg-warning-soft text-fg border-warning/30',
  },
  rejected: {
    label: 'Bị từ chối',
    className: 'bg-danger-soft text-danger border-danger/20',
  },
}

const ACTION_BUTTON_CLASSES =
  'flex min-h-11 shrink-0 items-center gap-1.5 whitespace-nowrap rounded-lg px-3 py-1.5 text-xs font-bold transition-colors'

interface PostCardProps {
  post: WebCommunityPost
  onUpvote: (id: string) => void
  onCommentAdded?: (id: string) => void
  /** Số bình luận đã bị xóa (gồm cả các trả lời con). */
  onCommentRemoved?: (id: string, removedCount: number) => void
  onDeletePost?: (id: string) => void
  isDeleting?: boolean
  onSelectProject?: (project: string) => void
  currentUser?: StoredUser | null
  isAuthenticated?: boolean
  onAuthRequired?: (() => void) | undefined
}

export function PostCard({
  post,
  onUpvote,
  onCommentAdded,
  onCommentRemoved,
  onDeletePost,
  isDeleting = false,
  onSelectProject,
  currentUser,
  isAuthenticated = true,
  onAuthRequired,
}: PostCardProps): React.ReactElement {
  const [showComments, setShowComments] = React.useState(false)
  const [confirmingDelete, setConfirmingDelete] = React.useState(false)
  const isModerator = hasModeratorRole(currentUser)
  const canDelete = Boolean(onDeletePost) && (isModerator || post.isOwn)
  const removalAsModerator = isModerator && !post.isOwn
  const statusBadge = STATUS_BADGES[post.status]

  const handleUpvote = (): void => {
    if (!isAuthenticated) {
      onAuthRequired?.()
      return
    }
    onUpvote(post.id)
  }

  return (
    <article className="group rounded-xl border border-border bg-surface p-4 shadow-sm transition-all duration-300 hover:border-primary/15 hover:shadow-md sm:p-6">
      <div className="flex items-center justify-between gap-3">
        <div className="flex min-w-0 items-center gap-3">
          <UserAvatar
            src={post.authorAvatar}
            name={post.authorName}
            size="md"
            className="ring-2 ring-border"
          />
          <div className="min-w-0">
            <div className="flex flex-wrap items-center gap-2">
              <span className="truncate text-sm font-bold text-fg">
                {post.authorName}
              </span>
              <span
                className={`shrink-0 rounded-md px-1.5 py-0.5 text-[11px] font-bold ${ROLE_BADGE_CLASSES[post.authorRole]}`}
              >
                {ROLE_LABELS[post.authorRole]}
              </span>
            </div>
            <span className="mt-0.5 block text-[11px] text-muted">
              {post.createdAt}
            </span>
          </div>
        </div>

        <div className="flex shrink-0 flex-wrap items-center justify-end gap-2">
          {statusBadge && (
            <span
              className={`whitespace-nowrap rounded-full border px-3 py-1 text-[11px] font-bold ${statusBadge.className}`}
            >
              {statusBadge.label}
            </span>
          )}
          <span
            className={`whitespace-nowrap rounded-full border px-3 py-1 text-[11px] font-bold ${TOPIC_CLASSES[post.topic]}`}
          >
            {TOPIC_LABELS[post.topic]}
          </span>
          {canDelete && (
            <button
              type="button"
              onClick={() => setConfirmingDelete(true)}
              className="flex min-h-10 items-center gap-1 rounded-lg border border-danger/20 bg-danger-soft px-2.5 py-1 text-[11px] font-bold text-danger transition-colors hover:bg-danger/20"
            >
              <Trash2 className="h-3.5 w-3.5" aria-hidden />
              {removalAsModerator ? 'Gỡ bài' : 'Xóa bài'}
            </button>
          )}
        </div>
      </div>

      <div className="mt-4 space-y-2">
        <h3 className="font-display text-base font-bold leading-snug text-fg transition-colors duration-200 group-hover:text-primary">
          {post.title}
        </h3>
        <p className="whitespace-pre-line break-words text-sm leading-relaxed text-muted">
          {post.content}
        </p>
      </div>

      {post.images.length > 0 && (
        <div className="mt-4 flex flex-wrap gap-2">
          {post.images.map(img => (
            <div
              key={img}
              className="relative h-28 w-40 overflow-hidden rounded-xl border border-border sm:h-32 sm:w-44"
            >
              <Image
                src={img}
                alt="Hình ảnh bài viết"
                fill
                sizes="(max-width: 640px) 160px, 176px"
                unoptimized
                className="object-cover"
              />
            </div>
          ))}
        </div>
      )}

      <div className="mt-5 flex flex-wrap items-center justify-between gap-3 border-t border-border/60 pt-4">
        {onSelectProject ? (
          <button
            type="button"
            onClick={() => onSelectProject(post.projectName)}
            className="flex min-h-10 shrink-0 items-center gap-1.5 rounded-lg border border-border/70 bg-surface-muted px-3 py-1.5 text-[11px] font-semibold text-muted transition-colors hover:bg-primary-soft hover:text-primary"
            title={`Lọc bài viết theo dự án ${post.projectName}`}
          >
            <Building2 className="h-3.5 w-3.5 shrink-0" aria-hidden />
            <span className="break-words text-left">{post.projectName}</span>
          </button>
        ) : (
          <span className="flex shrink-0 items-center gap-1.5 rounded-lg border border-border/70 bg-surface-muted px-3 py-1.5 text-[11px] font-semibold text-muted">
            <Building2 className="h-3.5 w-3.5 shrink-0" aria-hidden />
            <span className="break-words">{post.projectName}</span>
          </span>
        )}

        <div className="flex shrink-0 items-center gap-2 sm:gap-4">
          <button
            type="button"
            onClick={handleUpvote}
            aria-pressed={post.hasUpvoted}
            aria-label={`${post.upvotes} người thấy hữu ích`}
            className={`${ACTION_BUTTON_CLASSES} ${
              post.hasUpvoted
                ? 'bg-primary-soft text-primary'
                : 'text-muted hover:bg-primary/5 hover:text-primary'
            }`}
          >
            <ThumbsUp
              className="h-4 w-4 shrink-0"
              fill={post.hasUpvoted ? 'currentColor' : 'none'}
              aria-hidden
            />
            <span>{post.upvotes} Hữu ích</span>
          </button>

          <button
            type="button"
            onClick={() => setShowComments(open => !open)}
            aria-expanded={showComments}
            aria-label={`${post.commentsCount} bình luận`}
            className={`${ACTION_BUTTON_CLASSES} ${
              showComments
                ? 'bg-primary-soft text-primary'
                : 'text-muted hover:bg-primary/5 hover:text-primary'
            }`}
          >
            <MessageCircle className="h-4 w-4 shrink-0" aria-hidden />
            <span>{post.commentsCount} Bình luận</span>
          </button>
        </div>
      </div>

      {showComments && (
        <CommentsSection
          postId={post.id}
          onCommentAdded={() => onCommentAdded?.(post.id)}
          onCommentRemoved={removedCount =>
            onCommentRemoved?.(post.id, removedCount)
          }
          currentUser={currentUser}
          isAuthenticated={isAuthenticated}
          onAuthRequired={onAuthRequired}
        />
      )}

      <ConfirmDeleteDialog
        open={confirmingDelete}
        onOpenChange={setConfirmingDelete}
        title={removalAsModerator ? 'Gỡ bài viết này?' : 'Xóa bài viết này?'}
        description={
          removalAsModerator
            ? 'Bài viết và toàn bộ bình luận sẽ bị gỡ, tác giả sẽ nhận được thông báo.'
            : 'Bài viết và toàn bộ bình luận của nó sẽ bị xóa vĩnh viễn.'
        }
        confirmLabel={removalAsModerator ? 'Gỡ bài' : 'Xóa bài'}
        isPending={isDeleting}
        onConfirm={() => onDeletePost?.(post.id)}
      />
    </article>
  )
}
