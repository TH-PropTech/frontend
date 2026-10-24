'use client'

import * as React from 'react'
import { ClipboardList, ShieldCheck, TrendingUp } from 'lucide-react'
import { Skeleton } from '@/shared/ui/skeleton'
import type { MyPostCounts } from '../../lib/use-web-community'

const MAX_LISTED_PROJECTS = 8

const COMMUNITY_RULES = [
  'Mỗi bài viết phải gắn kèm tên dự án/chung cư cụ thể.',
  'Nội dung phải liên quan đến lĩnh vực thuê căn hộ.',
  'Bài viết được kiểm duyệt trước khi hiển thị công khai.',
] as const

const MY_POST_ROWS = [
  { key: 'approved', label: 'Đã hiển thị', dotClassName: 'bg-success' },
  { key: 'pending', label: 'Đang chờ duyệt', dotClassName: 'bg-warning' },
  { key: 'rejected', label: 'Bị từ chối', dotClassName: 'bg-danger' },
] as const

interface CommunitySidebarProps {
  isAuthenticated: boolean
  myCounts: MyPostCounts
  /** `null` khi số liệu dự án đang tải. */
  projects: { name: string; posts: number }[] | null
  selectedProject: string | null
  onSelectProject: (project: string | null) => void
}

export function CommunitySidebar({
  isAuthenticated,
  myCounts,
  projects,
  selectedProject,
  onSelectProject,
}: CommunitySidebarProps): React.ReactElement {
  const listedProjects = projects?.slice(0, MAX_LISTED_PROJECTS) ?? null

  return (
    <div className="space-y-6">
      {isAuthenticated && (
        <section
          aria-labelledby="community-my-posts-heading"
          className="rounded-xl border border-border bg-surface p-4 shadow-sm"
        >
          <div className="mb-4 flex items-center justify-between border-b border-border/60 pb-3">
            <h3
              id="community-my-posts-heading"
              className="flex items-center gap-2 font-display text-xs font-bold uppercase tracking-wider text-fg"
            >
              <ClipboardList className="h-4 w-4 text-primary" aria-hidden />
              Bài viết của tôi
            </h3>
            <span className="rounded-full bg-primary-soft px-2 py-0.5 text-[11px] font-bold text-primary">
              {myCounts.total} bài
            </span>
          </div>
          <ul className="space-y-3">
            {MY_POST_ROWS.map(row => (
              <li
                key={row.key}
                className="flex items-center justify-between text-xs"
              >
                <span className="flex items-center gap-1.5 text-muted">
                  <span
                    className={`h-1.5 w-1.5 rounded-full ${row.dotClassName}`}
                  />
                  {row.label}
                </span>
                <span className="font-bold text-fg">{myCounts[row.key]}</span>
              </li>
            ))}
          </ul>
        </section>
      )}

      <section
        aria-labelledby="community-projects-heading"
        className="rounded-xl border border-border bg-surface p-4 shadow-sm"
      >
        <div className="mb-4 flex items-center justify-between">
          <h3
            id="community-projects-heading"
            className="flex items-center gap-2 font-display text-xs font-bold uppercase tracking-wider text-fg"
          >
            <TrendingUp className="h-4 w-4 text-primary" aria-hidden />
            Dự án nổi bật
          </h3>
          {selectedProject && (
            <button
              type="button"
              onClick={() => onSelectProject(null)}
              className="min-h-10 px-2 text-[11px] font-bold text-primary hover:underline"
            >
              Bỏ chọn
            </button>
          )}
        </div>

        {listedProjects === null ? (
          <div className="space-y-2" aria-busy="true">
            <Skeleton className="h-9 w-full" />
            <Skeleton className="h-9 w-full" />
            <Skeleton className="h-9 w-full" />
          </div>
        ) : listedProjects.length === 0 ? (
          <p className="py-3 text-center text-xs italic text-muted">
            Chưa có dự án nào có bài viết
          </p>
        ) : (
          <ul className="space-y-1.5">
            {listedProjects.map(project => {
              const isSelected =
                selectedProject?.toLowerCase() === project.name.toLowerCase()
              return (
                <li key={project.name}>
                  <button
                    type="button"
                    aria-pressed={isSelected}
                    onClick={() =>
                      onSelectProject(isSelected ? null : project.name)
                    }
                    className={`flex min-h-11 w-full items-center justify-between rounded-xl border px-3 py-2 text-left transition-colors ${
                      isSelected
                        ? 'border-primary/25 bg-primary-soft font-bold text-primary'
                        : 'border-transparent text-fg hover:bg-surface-muted'
                    }`}
                  >
                    <span className="min-w-0 break-words pr-2 text-xs font-medium">
                      {project.name}
                    </span>
                    <span
                      className={`shrink-0 whitespace-nowrap rounded-full px-2 py-0.5 text-[11px] font-bold ${
                        isSelected
                          ? 'bg-primary text-primary-foreground'
                          : 'border border-border bg-surface-muted text-muted'
                      }`}
                    >
                      {project.posts} bài
                    </span>
                  </button>
                </li>
              )
            })}
          </ul>
        )}
      </section>

      <section
        aria-labelledby="community-rules-heading"
        className="rounded-xl border border-border bg-surface p-4 shadow-sm"
      >
        <h3
          id="community-rules-heading"
          className="mb-3 flex items-center gap-2 font-display text-xs font-bold uppercase tracking-wider text-fg"
        >
          <ShieldCheck className="h-4 w-4 text-primary" aria-hidden />
          Quy tắc cộng đồng
        </h3>
        <ol className="space-y-2.5 text-xs leading-relaxed text-muted">
          {COMMUNITY_RULES.map((rule, index) => (
            <li key={rule} className="flex gap-2">
              <span className="shrink-0 font-bold text-primary">
                {String(index + 1).padStart(2, '0')}
              </span>
              {rule}
            </li>
          ))}
        </ol>
      </section>
    </div>
  )
}
