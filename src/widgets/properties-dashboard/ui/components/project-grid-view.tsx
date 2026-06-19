'use client'

import * as React from 'react'
import { SelectedProjectHeader } from './selected-project-header'
import { BuildingCard } from './building-card'
import { ApiProjectCard } from './api-project-card'
import { ProjectCard } from './project-card'

interface ProjectGridViewProps {
  selectedApiProjectId: string | null
  setSelectedApiProjectId: (id: string | null) => void
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  apiProjects: any[]
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  filteredApiProjects: any[]
  isLoadingProjects: boolean
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  apiBuildings: any[]
  isLoadingBuildings: boolean
  setSelectedBuildingId: (id: string | null) => void
  setActiveTab: (tab: 'single' | 'project') => void
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  filteredProjects: any[]
}

export function ProjectGridView({
  selectedApiProjectId,
  setSelectedApiProjectId,
  apiProjects,
  filteredApiProjects,
  isLoadingProjects,
  apiBuildings,
  isLoadingBuildings,
  setSelectedBuildingId,
  setActiveTab,
  filteredProjects,
}: ProjectGridViewProps): React.ReactElement {
  if (selectedApiProjectId) {
    return (
      <div>
        <SelectedProjectHeader
          selectedApiProjectId={selectedApiProjectId}
          apiProjects={apiProjects}
        />

        {isLoadingBuildings ? (
          <div className="text-center py-20">
            <div className="inline-flex items-center gap-3 text-primary">
              <svg
                className="h-5 w-5 animate-spin"
                viewBox="0 0 24 24"
                fill="none"
              >
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
                Đang tải tòa nhà...
              </span>
            </div>
          </div>
        ) : apiBuildings.length === 0 ? (
          <div className="text-center py-20 rounded-3xl border border-dashed border-border bg-surface-muted/40">
            <svg
              className="mx-auto h-12 w-12 text-muted/40 mb-4"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth="1.5"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M2.25 21h19.5m-18-18v18m10.5-18v18m6-13.5V21M6.75 6.75h.75m-.75 3h.75m-.75 3h.75m3-6h.75m-.75 3h.75m-.75 3h.75M6.75 21v-3.375c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21M3 3h12m-.75 4.5H21m-3.75 3H21m-3.75 3H21"
              />
            </svg>
            <p className="font-body text-sm text-muted">
              Chưa có tòa nhà nào trong dự án này.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {apiBuildings.map(building => (
              <BuildingCard
                key={building.id}
                building={building}
                onSelectBuilding={bId => {
                  setSelectedBuildingId(bId)
                  setActiveTab('single')
                }}
              />
            ))}
          </div>
        )}
      </div>
    )
  }

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
            onSelect={() => setSelectedApiProjectId(proj.id)}
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
