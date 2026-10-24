import * as React from 'react'
import { ShieldCheck } from 'lucide-react'
import type { WebCommunityPost } from '../../lib/community-types'
import { UserAvatar } from './user-avatar'

interface StaffModerationPanelProps {
  posts: WebCommunityPost[]
  onApprove: (id: string) => void
  onReject: (id: string) => void
  isBusy?: boolean
}

export function StaffModerationPanel({
  posts,
  onApprove,
  onReject,
  isBusy = false,
}: StaffModerationPanelProps): React.ReactElement {
  return (
    <div className="space-y-5 rounded-xl border-2 border-dashed border-danger/30 bg-danger-soft/40 p-4 sm:p-6">
      <div className="flex items-center gap-3">
        <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-danger-soft">
          <ShieldCheck className="h-4 w-4 text-danger" aria-hidden />
        </div>
        <div>
          <h3 className="font-display text-sm font-bold text-danger">
            Kiểm duyệt bài viết cộng đồng
          </h3>
          <p className="text-[11px] text-muted">
            {posts.length} bài viết đang chờ phê duyệt
          </p>
        </div>
      </div>

      <div className="space-y-3">
        {posts.map(post => (
          <div
            key={post.id}
            className="space-y-3 rounded-xl border border-border bg-surface p-4 shadow-sm"
          >
            <div className="flex items-center gap-2.5">
              <UserAvatar
                src={post.authorAvatar}
                name={post.authorName}
                size="sm"
              />
              <div className="min-w-0">
                <span className="text-xs font-bold text-fg">
                  {post.authorName}
                </span>
                <span className="ml-2 text-[11px] text-muted">
                  {post.createdAt}
                </span>
              </div>
              <span className="ml-auto whitespace-nowrap rounded-full border border-warning/30 bg-warning-soft px-2.5 py-0.5 text-[11px] font-bold text-fg">
                Chờ duyệt
              </span>
            </div>

            <div>
              <h4 className="text-sm font-bold text-fg">{post.title}</h4>
              <p className="mt-1 line-clamp-2 text-xs text-muted">
                {post.content}
              </p>
              <p className="mt-1 text-[11px] font-semibold text-muted">
                Dự án: {post.projectName}
              </p>
            </div>

            <div className="flex gap-2.5 pt-1">
              <button
                type="button"
                disabled={isBusy}
                onClick={() => onReject(post.id)}
                className="min-h-11 flex-1 rounded-lg border border-border bg-surface py-2 text-[11px] font-bold text-muted transition-colors hover:bg-surface-muted hover:text-fg disabled:opacity-60"
              >
                Từ chối
              </button>
              <button
                type="button"
                disabled={isBusy}
                onClick={() => onApprove(post.id)}
                className="min-h-11 flex-1 rounded-lg bg-success py-2 text-[11px] font-bold text-white transition-colors hover:bg-success/90 disabled:opacity-60"
              >
                Phê duyệt
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
