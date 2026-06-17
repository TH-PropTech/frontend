import * as React from 'react'

interface SelectedProjectHeaderProps {
  selectedApiProjectId: string | null
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  apiProjects: any[]
}

export function SelectedProjectHeader({
  selectedApiProjectId,
  apiProjects,
}: SelectedProjectHeaderProps): React.ReactElement | null {
  const selectedProj = React.useMemo(() => {
    return apiProjects.find(p => p.id === selectedApiProjectId)
  }, [apiProjects, selectedApiProjectId])

  if (!selectedProj) return null

  return (
    <div className="mb-8 rounded-2xl border border-primary/20 bg-gradient-to-r from-primary/5 to-accent/5 p-6">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h3 className="font-marketing text-xl font-bold text-fg">
            {selectedProj.name}
          </h3>
          <p className="mt-1 font-body text-xs text-muted flex items-center gap-1.5">
            <svg
              className="h-3.5 w-3.5 shrink-0"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
              />
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25s-7.5-4.108-7.5-11.25a7.5 7.5 0 1 1 15 0Z"
              />
            </svg>
            {selectedProj.location}
          </p>
          <p className="mt-1 text-[11px] font-semibold text-primary">
            Chủ đầu tư: {selectedProj.investor}
          </p>
        </div>
        <div className="flex flex-wrap gap-2">
          {selectedProj.amenities.slice(0, 4).map((a: string) => (
            <span
              key={a}
              className="rounded-full bg-white/80 border border-border text-muted px-3 py-1 text-[10px] font-semibold"
            >
              {a}
            </span>
          ))}
        </div>
      </div>
    </div>
  )
}
