import type { WebCommunityPost } from '../../lib/use-web-community'
import { UserAvatar } from './user-avatar'

interface StaffModerationPanelProps {
  posts: WebCommunityPost[]
  onApprove: (id: string) => void
  onReject: (id: string) => void
}

export function StaffModerationPanel({
  posts,
  onApprove,
  onReject,
}: StaffModerationPanelProps): React.ReactElement {
  return (
    <div className="rounded-2xl border-2 border-dashed border-danger/30 bg-danger/[0.03] p-6 space-y-5">
      <div className="flex items-center gap-3">
        <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-danger/10">
          <svg
            className="h-4 w-4 text-danger"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth="2"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M9 12.75 11.25 15 15 9.75m-3-7.036A11.959 11.959 0 0 1 3.598 6 11.99 11.99 0 0 0 3 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285Z"
            />
          </svg>
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
            className="rounded-xl bg-white border border-border p-4 space-y-3 shadow-sm"
          >
            <div className="flex items-center gap-2.5">
              <UserAvatar
                src={post.authorAvatar}
                name={post.authorName}
                size="sm"
              />
              <div>
                <span className="text-xs font-bold text-fg">
                  {post.authorName}
                </span>
                <span className="text-[11px] text-muted ml-2">
                  {post.createdAt}
                </span>
              </div>
              <span className="ml-auto rounded-full bg-warning/10 border border-warning/20 px-2.5 py-0.5 text-[10px] font-bold text-warning">
                Chờ duyệt
              </span>
            </div>

            <div>
              <h4 className="text-sm font-bold text-fg">{post.title}</h4>
              <p className="text-xs text-muted mt-1 line-clamp-2">
                {post.content}
              </p>
            </div>

            <div className="flex gap-2.5 pt-1">
              <button
                type="button"
                onClick={() => onReject(post.id)}
                className="flex-1 rounded-lg border border-border bg-white py-2 text-[11px] font-bold text-muted hover:bg-surface-muted hover:text-fg transition-all cursor-pointer"
              >
                Từ chối
              </button>
              <button
                type="button"
                onClick={() => onApprove(post.id)}
                className="flex-1 rounded-lg bg-success py-2 text-[11px] font-bold text-white hover:bg-success/90 transition-all cursor-pointer"
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
