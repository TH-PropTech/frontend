'use client'

import * as React from 'react'
import type { ApiProjectItem } from '@/entities/properties'

export interface ApiProjectCardProps {
  project: ApiProjectItem
  onSelect: () => void
}

export function ApiProjectCard({
  project,
  onSelect,
}: ApiProjectCardProps): React.ReactElement {
  const imageUrl = project.images[0] ?? null

  return (
    <article
      className="group cursor-pointer rounded-2xl border border-border bg-white overflow-hidden shadow-sm hover:translate-y-[-4px] hover:border-primary/40 hover:shadow-lg transition-all duration-300"
      onClick={onSelect}
    >
      {/* Image Section */}
      <div className="relative h-44 bg-gradient-to-br from-primary/10 to-accent/10 overflow-hidden">
        {imageUrl ? (
          <img
            src={imageUrl}
            alt={project.name}
            className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center">
            <div
              className="absolute inset-0 opacity-10"
              style={{
                backgroundImage:
                  'radial-gradient(circle at 50% 50%, var(--primary) 1.5px, transparent 0)',
                backgroundSize: '10px 10px',
              }}
            />
            <svg
              className="relative z-10 h-14 w-14 text-primary/25"
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
          </div>
        )}

        {/* Tag */}
        <span className="absolute top-3 left-3 rounded-full bg-primary/90 text-white px-3 py-1 text-[10px] font-bold shadow-sm">
          Dự án
        </span>

        {/* Investor badge */}
        <span className="absolute bottom-3 left-3 rounded-full bg-white/90 backdrop-blur-sm text-fg px-3 py-1 text-[10px] font-bold shadow-sm">
          {project.investor}
        </span>
      </div>

      {/* Content Section */}
      <div className="p-5">
        <h3 className="font-marketing text-lg font-bold text-fg leading-tight group-hover:text-primary transition-colors">
          {project.name}
        </h3>

        <p className="mt-1.5 font-body text-xs text-muted flex items-center gap-1.5">
          <svg
            className="h-3.5 w-3.5 text-muted shrink-0"
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
          {project.location}
        </p>

        {project.description && (
          <p className="mt-2.5 font-body text-xs text-fg/70 leading-relaxed line-clamp-2">
            {project.description}
          </p>
        )}

        {/* Amenities */}
        {project.amenities.length > 0 && (
          <div className="mt-3 flex flex-wrap gap-1.5">
            {project.amenities.slice(0, 3).map(amenity => (
              <span
                key={amenity}
                className="rounded-full bg-surface-muted text-muted px-2.5 py-0.5 text-[10px] font-semibold border border-border"
              >
                {amenity}
              </span>
            ))}
            {project.amenities.length > 3 && (
              <span className="rounded-full bg-primary/10 text-primary px-2.5 py-0.5 text-[10px] font-bold">
                +{project.amenities.length - 3}
              </span>
            )}
          </div>
        )}

        {/* Footer */}
        <div className="mt-4 pt-3 border-t border-border flex items-center justify-between">
          <span className="text-[10px] font-bold text-muted uppercase tracking-wider">
            {project.city} • {project.district}
          </span>
          <span className="text-xs font-bold text-primary group-hover:translate-x-1 transition-transform inline-flex items-center gap-1">
            Xem tòa nhà
            <svg
              className="h-3.5 w-3.5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth="2.5"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3"
              />
            </svg>
          </span>
        </div>
      </div>
    </article>
  )
}
