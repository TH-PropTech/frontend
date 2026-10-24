import * as React from 'react'
import Image from 'next/image'
import type { WebCommunityPost } from '../../lib/use-web-community'
import { CommentsSection } from './comments-section'
import { UserAvatar } from './user-avatar'

const ROLE_CONFIG = {
  tenant: { label: 'Khách thuê', className: 'bg-primary/10 text-primary' },
  landlord: { label: 'Chủ nhà', className: 'bg-accent/10 text-accent-DEFAULT' },
  staff: { label: 'Đội ngũ TH', className: 'bg-danger/10 text-danger' },
  admin: { label: 'Quản trị viên', className: 'bg-danger/10 text-danger' },
} as const

const TOPIC_CONFIG = {
  qa: {
    label: 'Hỏi đáp',
    className: 'bg-primary/8 text-primary border-primary/15',
  },
  review: {
    label: 'Đánh giá',
    className: 'bg-success/8 text-success border-success/15',
  },
  roommate: {
    label: 'Ở ghép',
    className: 'bg-accent/8 text-accent-DEFAULT border-accent/15',
  },
} as const

interface PostCardProps {
  post: WebCommunityPost
  onUpvote: (id: string) => void
  onCommentAdded?: (id: string) => void
  onDeletePost?: (id: string) => void
  onCommentRemoved?: (id: string) => void
  onSelectProject?: (project: string) => void
  currentUser?: { roles?: string[] } | null
  isAuthenticated?: boolean
  onAuthRequired?: (() => void) | undefined
}

export function PostCard({
  post,
  onUpvote,
  onCommentAdded,
  onDeletePost,
  onCommentRemoved,
  onSelectProject,
  currentUser,
  isAuthenticated = true,
  onAuthRequired,
}: PostCardProps): React.ReactElement {
  const [showComments, setShowComments] = React.useState(false)
  const role = ROLE_CONFIG[post.authorRole]
  const topic = TOPIC_CONFIG[post.topic]

  const isStaffOrAdmin = React.useMemo(() => {
    if (!currentUser?.roles) return false
    return currentUser.roles.some(
      r => r.toLowerCase() === 'staff' || r.toLowerCase() === 'admin'
    )
  }, [currentUser])

  return (
    <article className="group rounded-2xl border border-border bg-white p-5 sm:p-6 shadow-[0_1px_3px_rgba(0,0,0,0.04)] hover:shadow-[0_8px_30px_rgba(0,0,0,0.06)] hover:border-primary/15 transition-all duration-300">
      {/* Author row */}
      <div className="flex items-center justify-between gap-3">
        <div className="flex items-center gap-3 min-w-0">
          <UserAvatar
            src={post.authorAvatar}
            name={post.authorName}
            size="md"
            className="ring-2 ring-border"
          />
          <div className="min-w-0">
            <div className="flex items-center gap-2 flex-wrap">
              <span className="text-sm font-bold text-fg truncate">
                {post.authorName}
              </span>
              <span
                className={`rounded-md px-1.5 py-0.5 text-[10px] font-bold shrink-0 ${role.className}`}
              >
                {role.label}
              </span>
            </div>
            <span className="text-[11px] text-muted block mt-0.5">
              {post.createdAt}
            </span>
          </div>
        </div>

        <div className="flex items-center gap-2 shrink-0">
          {isStaffOrAdmin && (
            <button
              onClick={() => {
                if (window.confirm('Bạn có chắc chắn muốn gỡ bài viết này?')) {
                  onDeletePost?.(post.id)
                }
              }}
              className="rounded-lg bg-danger/10 border border-danger/20 hover:bg-danger/20 text-danger px-2.5 py-1 text-[10px] font-bold transition-all cursor-pointer"
            >
              Gỡ bài
            </button>
          )}
          <span
            className={`rounded-full border px-2.5 sm:px-3 py-1 text-[10px] font-bold shrink-0 ${topic.className}`}
          >
            {topic.label}
          </span>
        </div>
      </div>

      {/* Content */}
      <div className="mt-4 space-y-2">
        <h3 className="font-display text-base font-bold text-fg leading-snug group-hover:text-primary transition-colors duration-200">
          {post.title}
        </h3>
        <p className="text-sm text-muted leading-relaxed break-words">
          {post.content}
        </p>
      </div>

      {/* Images */}
      {post.images.length > 0 && (
        <div className="mt-4 flex flex-wrap gap-2">
          {post.images.map((img, idx) => (
            <div
              key={idx}
              className="relative h-28 sm:h-32 w-40 sm:w-44 rounded-xl overflow-hidden border border-border hover:scale-[1.02] transition-transform cursor-pointer"
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

      {/* Footer */}
      <div className="mt-5 flex flex-wrap items-center justify-between gap-3 border-t border-border/60 pt-4">
        {onSelectProject ? (
          <button
            type="button"
            onClick={() => onSelectProject(post.projectName)}
            className="rounded-lg bg-surface-muted/80 hover:bg-primary/10 hover:text-primary border border-border/70 px-3 py-1.5 text-[11px] font-semibold text-muted flex items-center gap-1.5 transition-colors cursor-pointer shrink-0"
            title={`Lọc bài viết theo dự án ${post.projectName}`}
          >
            <svg
              className="h-3.5 w-3.5 shrink-0 text-muted/80"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"
              />
            </svg>
            <span className="whitespace-nowrap">{post.projectName}</span>
          </button>
        ) : (
          <span className="rounded-lg bg-surface-muted/60 border border-border/70 px-3 py-1.5 text-[11px] font-semibold text-muted flex items-center gap-1.5 shrink-0">
            <svg
              className="h-3.5 w-3.5 shrink-0 text-muted/80"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"
              />
            </svg>
            <span className="whitespace-nowrap">{post.projectName}</span>
          </span>
        )}

        <div className="flex items-center gap-2 sm:gap-4 shrink-0">
          <button
            type="button"
            onClick={() => {
              if (!isAuthenticated) {
                onAuthRequired?.()
                return
              }
              onUpvote(post.id)
            }}
            className={`flex items-center gap-1.5 text-xs font-bold transition-all duration-200 cursor-pointer rounded-lg px-2.5 sm:px-3 py-1.5 whitespace-nowrap shrink-0 ${
              post.hasUpvoted
                ? 'text-primary bg-primary/10'
                : 'text-muted hover:text-primary hover:bg-primary/5'
            }`}
            aria-label={`${post.upvotes} người thấy hữu ích`}
          >
            <svg
              className="h-4 w-4 shrink-0"
              fill={post.hasUpvoted ? 'currentColor' : 'none'}
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M6.633 10.25c.806 0 1.533-.446 2.031-1.08a9.041 9.041 0 0 1 2.861-2.4c.723-.384 1.35-.956 1.653-1.715a4.498 4.498 0 0 0 .322-1.672V2.75a.75.75 0 0 1 .75-.75 2.25 2.25 0 0 1 2.25 2.25c0 1.152-.26 2.243-.723 3.218-.266.558.107 1.282.725 1.282m0 0h3.126c1.026 0 1.945.694 2.054 1.715.045.422.068.85.068 1.285a11.95 11.95 0 0 1-2.649 7.521c-.388.482-.987.729-1.605.729H13.48c-.483 0-.964-.078-1.423-.23l-3.114-1.04a4.501 4.501 0 0 0-1.423-.23H5.904m10.598-9.75H14.25M5.904 18.5c.083.205.173.405.27.602.197.4-.078.898-.523.898h-.908c-.889 0-1.713-.518-1.972-1.368a12 12 0 0 1-.521-3.507c0-1.553.295-3.036.831-4.398C3.387 9.953 4.167 9.5 5 9.5h1.053c.472 0 .745.556.5.96a8.958 8.958 0 0 0-1.302 4.665c0 1.194.232 2.333.654 3.375Z"
              />
            </svg>
            <span className="whitespace-nowrap">{post.upvotes} Hữu ích</span>
          </button>

          <button
            type="button"
            onClick={() => setShowComments(!showComments)}
            aria-expanded={showComments}
            className={`flex items-center gap-1.5 text-xs font-bold transition-all duration-200 cursor-pointer rounded-lg px-2.5 sm:px-3 py-1.5 whitespace-nowrap shrink-0 ${
              showComments
                ? 'text-primary bg-primary/10'
                : 'text-muted hover:text-primary hover:bg-primary/5'
            }`}
            aria-label={`${post.commentsCount} bình luận`}
          >
            <svg
              className="h-4 w-4 shrink-0"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M8.625 12a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0H8.25m4.125 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0H12m4.125 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0h-.375M21 12c0 4.556-4.03 8.25-9 8.25a9.764 9.764 0 0 1-2.555-.337A5.972 5.972 0 0 1 5.41 20.97a5.969 5.969 0 0 1-.474-.065 4.48 4.48 0 0 0 .978-2.025c.09-.457-.133-.901-.467-1.226C3.93 16.178 3 14.189 3 12c0-4.556 4.03-8.25 9-8.25s9 3.694 9 8.25Z"
              />
            </svg>
            <span className="whitespace-nowrap">
              {post.commentsCount} Bình luận
            </span>
          </button>
        </div>
      </div>

      {showComments && (
        <CommentsSection
          postId={post.id}
          onCommentAdded={() => onCommentAdded?.(post.id)}
          onCommentRemoved={() => onCommentRemoved?.(post.id)}
          currentUser={currentUser}
          isAuthenticated={isAuthenticated}
          onAuthRequired={onAuthRequired}
        />
      )}
    </article>
  )
}
