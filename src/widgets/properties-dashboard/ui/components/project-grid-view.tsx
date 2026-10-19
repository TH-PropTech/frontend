'use client'

import * as React from 'react'
import { ApiProjectCard } from './api-project-card'
import { ProjectCard } from './project-card'

interface ProjectGridViewProps {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  apiProjects: any[]
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  filteredApiProjects: any[]
  isLoadingProjects: boolean
  setActiveTab: (tab: 'single' | 'project') => void
  setSearchKeyword: (keyword: string) => void
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  filteredProjects: any[]
}

export function ProjectGridView({
  apiProjects,
  filteredApiProjects,
  isLoadingProjects,
  setActiveTab,
  setSearchKeyword,
  filteredProjects,
}: ProjectGridViewProps): React.ReactElement {
  /* ── Show project list (API first, fallback to mock) ── */
  if (isLoadingProjects) {
    return (
      <div className="text-center py-20">
        <div className="inline-flex items-center gap-3 text-primary">
          <svg className="h-5 w-5 animate-spin" viewBox="0 0 24 24" fill="none">
            <circle
              className="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="4"
            />
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
            />
          </svg>
          <span className="font-body text-sm font-semibold">
            Đang tải dự án...
          </span>
        </div>
      </div>
    )
  }

  if (apiProjects.length > 0) {
    if (filteredApiProjects.length === 0) {
      return (
        <div className="text-center py-20 rounded-3xl border border-dashed border-border bg-surface-muted/40">
          <p className="font-body text-sm text-muted">
            Không tìm thấy dự án phù hợp với bộ lọc hiện tại.
          </p>
        </div>
      )
    }
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredApiProjects.map(proj => (
          <ApiProjectCard
            key={proj.id}
            project={proj}
            onSelect={() => {
              setSearchKeyword(proj.name)
              setActiveTab('single')
            }}
          />
        ))}
      </div>
    )
  }

  if (filteredProjects.length === 0) {
    return (
      <div className="text-center py-20 rounded-3xl border border-dashed border-border bg-surface-muted/40">
        <p className="font-body text-sm text-muted">
          Không tìm thấy dự án phù hợp với bộ lọc hiện tại.
        </p>
      </div>
    )
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
      {filteredProjects.map(proj => (
        <ProjectCard key={proj.id} proj={proj} />
      ))}
    </div>
  )
}
