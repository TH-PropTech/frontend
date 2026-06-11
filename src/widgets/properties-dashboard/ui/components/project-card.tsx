'use client'

import * as React from 'react'
import Link from 'next/link'
import type { Route } from 'next'
import { Button } from '@/shared/ui/button'

interface Project {
  id: string
  title: string
  developer: string
  location: string
  description: string
  scale: string
  priceRange: string
  tagText: string
  city: string
  district: string
  ward: string
  street: string
  isVerified: boolean
  hasMedia: boolean
  amenities: string[]
  minPrice: number
  maxPrice: number
}

interface ProjectCardProps {
  proj: Project
}

export function ProjectCard({ proj }: ProjectCardProps): React.ReactElement {
  return (
    <article className="flex flex-col justify-between rounded-2xl border border-border bg-white p-6 shadow-sm hover:translate-y-[-4px] hover:border-border-strong hover:shadow-md transition-all duration-300">
      <div>
        {/* Visual Card Top */}
        <div className="relative mb-5 flex h-40 flex-col justify-between rounded-xl border border-border bg-gradient-to-br from-primary/10 to-accent/10 p-5">
          {/* Grid background simulation */}
          <div
            className="absolute inset-0 opacity-10"
            style={{
              backgroundImage:
                'radial-gradient(circle at 50% 50%, var(--primary) 1.5px, transparent 0)',
              backgroundSize: '10px 10px',
            }}
          />
          <div className="relative z-10 flex items-center justify-between">
            <span className="rounded-full bg-primary/15 text-primary px-3 py-0.5 text-[10px] font-bold">
              {proj.tagText}
            </span>
            <span className="font-mono text-[9px] font-bold text-muted uppercase tracking-wider">
              DỰ ÁN TÒA NHÀ
            </span>
          </div>
          <span className="relative z-10 font-mono text-[10px] font-bold text-primary uppercase">
            Chủ đầu tư: {proj.developer}
          </span>
        </div>

        <h3 className="font-marketing text-xl font-bold text-fg">
          {proj.title}
        </h3>
        <p className="mt-1 font-body text-xs text-muted">{proj.location}</p>
        <p className="mt-3 font-body text-xs text-fg/80 leading-relaxed">
          {proj.description}
        </p>

        <div className="mt-5 flex items-center justify-between border-t border-border pt-4 text-xs font-semibold text-muted">
          <span>Quy mô dự án</span>
          <span className="font-mono text-fg font-bold">{proj.scale}</span>
        </div>
      </div>

      <div className="mt-6 flex items-center justify-between">
        <div className="flex flex-col">
          <span className="text-[9px] font-bold text-muted uppercase tracking-wider">
            Khoảng giá thuê dự kiến
          </span>
          <span className="font-mono text-base font-extrabold text-primary">
            {proj.priceRange}
          </span>
        </div>

        <Link href={`/projects/${proj.id}` as Route}>
          <Button
            variant="secondary"
            className="rounded-xl px-5 py-2.5 text-xs font-bold transition-all"
          >
            Chi tiết dự án
          </Button>
        </Link>
      </div>
    </article>
  )
}
