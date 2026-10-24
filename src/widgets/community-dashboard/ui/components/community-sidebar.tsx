'use client'

import * as React from 'react'

interface CommunitySidebarProps {
  showMyPosts: boolean
  setShowMyPosts: (v: boolean) => void
  myTotalCount: number
  myPendingCount: number
  myApprovedCount: number
  projectStats?: { name: string; posts: number }[]
  selectedProject?: string | null
  onSelectProject?: (project: string) => void
  isAuthenticated?: boolean
  onAuthRequired?: () => void
}

export function CommunitySidebar({
  showMyPosts,
  setShowMyPosts,
  myTotalCount,
  myPendingCount,
  myApprovedCount,
  projectStats,
  selectedProject,
  onSelectProject,
  isAuthenticated = true,
  onAuthRequired,
}: CommunitySidebarProps): React.ReactElement {
  const displayProjects = React.useMemo(() => {
    return projectStats || []
  }, [projectStats])
  return (
    <div className="space-y-6">
      {/* My Posts Tracker widget */}
      <div className="rounded-2xl border border-border bg-white p-5 shadow-[0_1px_3px_rgba(0,0,0,0.04)]">
        <div className="flex items-center justify-between mb-4 pb-3 border-b border-border/60">
          <h3 className="font-display text-xs font-bold text-fg uppercase tracking-wider">
            Bài viết của tôi
          </h3>
          <span className="rounded-full bg-primary/10 px-2 py-0.5 text-[10px] font-bold text-primary">
            {myTotalCount} bài
          </span>
        </div>

        <div className="space-y-3">
          <div className="flex items-center justify-between text-xs">
            <span className="text-muted flex items-center gap-1.5">
              <span className="h-1.5 w-1.5 rounded-full bg-success" />
              Đã hiển thị
            </span>
            <span className="font-bold text-fg">{myApprovedCount}</span>
          </div>

          <div className="flex items-center justify-between text-xs">
            <span className="text-muted flex items-center gap-1.5">
              <span className="h-1.5 w-1.5 rounded-full bg-warning" />
              Đang chờ duyệt
            </span>
            <span className="font-bold text-fg">{myPendingCount}</span>
          </div>

          <button
            type="button"
            onClick={() => {
              if (!isAuthenticated) {
                onAuthRequired?.()
                return
              }
              setShowMyPosts(!showMyPosts)
            }}
            className={`w-full mt-2 rounded-xl py-2 px-3 text-xs font-bold transition-all border flex items-center justify-center gap-2 cursor-pointer ${
              showMyPosts
                ? 'bg-primary text-white border-primary shadow-sm'
                : 'bg-white border-border text-muted hover:border-primary/30 hover:text-fg'
            }`}
          >
            <svg
              className="h-4 w-4"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"
              />
            </svg>
            {showMyPosts ? 'Hiển thị tất cả' : 'Chỉ xem bài của tôi'}
          </button>
        </div>
      </div>

      {/* Trending Projects widget */}
      <div className="rounded-2xl border border-border bg-white p-5 shadow-[0_1px_3px_rgba(0,0,0,0.04)]">
        <div className="flex items-center justify-between mb-4">
          <h3 className="font-display text-xs font-bold text-fg uppercase tracking-wider flex items-center gap-2">
            <svg
              className="h-4 w-4 text-primary"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"
              />
            </svg>
            Dự án nổi bật
          </h3>
          {selectedProject && (
            <button
              type="button"
              onClick={() => onSelectProject?.(selectedProject)}
              className="text-[10px] font-bold text-primary hover:underline cursor-pointer"
            >
              Bỏ chọn
            </button>
          )}
        </div>
        {displayProjects.length === 0 ? (
          <p className="text-xs text-muted italic text-center py-3">
            Chưa có dự án nào có bài viết
          </p>
        ) : (
          <div className="space-y-1.5">
            {displayProjects.map(proj => {
              const isSelected =
                selectedProject?.toLowerCase() === proj.name.toLowerCase()
              return (
                <button
                  key={proj.name}
                  type="button"
                  onClick={() => onSelectProject?.(proj.name)}
                  className={`w-full flex items-center justify-between px-3 py-2 rounded-xl text-left transition-all cursor-pointer ${
                    isSelected
                      ? 'bg-primary/10 border border-primary/25 text-primary font-bold'
                      : 'hover:bg-surface-muted/60 text-fg border border-transparent'
                  }`}
                >
                  <span className="text-xs font-medium truncate pr-2">
                    {proj.name}
                  </span>
                  <span
                    className={`text-[10px] font-bold px-2 py-0.5 rounded-full shrink-0 ${
                      isSelected
                        ? 'bg-primary text-white'
                        : 'text-muted bg-surface-muted border border-border/60'
                    }`}
                  >
                    {proj.posts} bài
                  </span>
                </button>
              )
            })}
          </div>
        )}
      </div>

      {/* Community Guidelines */}
      <div className="rounded-2xl border border-border bg-white p-5 shadow-[0_1px_3px_rgba(0,0,0,0.04)]">
        <h3 className="font-display text-xs font-bold text-fg uppercase tracking-wider mb-3 flex items-center gap-2">
          <svg
            className="h-4 w-4 text-primary"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth="2"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
            />
          </svg>
          Quy tắc cộng đồng
        </h3>
        <ul className="space-y-2.5 text-xs text-muted leading-relaxed">
          <li className="flex gap-2">
            <span className="text-primary font-bold shrink-0">01</span>
            Mỗi bài viết phải gắn kèm tên dự án/chung cư cụ thể.
          </li>
          <li className="flex gap-2">
            <span className="text-primary font-bold shrink-0">02</span>
            Nội dung phải liên quan đến lĩnh vực thuê căn hộ.
          </li>
          <li className="flex gap-2">
            <span className="text-primary font-bold shrink-0">03</span>
            Bài viết được kiểm duyệt trước khi hiển thị công khai.
          </li>
          <li className="flex gap-2">
            <span className="text-primary font-bold shrink-0">04</span>
            Tối đa 5 hình ảnh, dung lượng mỗi ảnh không quá 5MB.
          </li>
        </ul>
      </div>
    </div>
  )
}
