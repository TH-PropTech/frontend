'use client'

import * as React from 'react'
import Link from 'next/link'
import type { Route } from 'next'
import type { ProjectItem } from '@/entities/properties'

interface ProjectDetailHeroProps {
  project: Required<ProjectItem>
}

export function ProjectDetailHero({
  project,
}: ProjectDetailHeroProps): React.ReactElement {
  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-[#f5ece2] via-[#faf6f1] to-bg pb-24 pt-36 rounded-b-[40px] border-b border-border">
      {/* Topography SVG Background (extremely lightweight, vector-rendered) */}
      <div
        className="absolute inset-0 opacity-[0.08] pointer-events-none select-none overflow-hidden"
        style={{
          willChange: 'transform',
          transform: 'translate3d(0, 0, 0)',
          backfaceVisibility: 'hidden',
        }}
      >
        <svg
          className="w-full h-full min-w-[1440px] min-h-[400px]"
          viewBox="0 0 1440 400"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          preserveAspectRatio="none"
        >
          <path
            d="M-100 100 C 300 20, 600 180, 1000 80 C 1200 40, 1500 120, 1600 100"
            stroke="currentColor"
            className="text-primary"
            strokeWidth="1.5"
            fill="none"
          />
          <path
            d="M-100 130 C 300 50, 600 210, 1000 110 C 1200 70, 1500 150, 1600 130"
            stroke="currentColor"
            className="text-primary"
            strokeWidth="1.5"
            fill="none"
          />
          <path
            d="M-100 160 C 300 80, 600 240, 1000 140 C 1200 100, 1500 180, 1600 160"
            stroke="currentColor"
            className="text-primary"
            strokeWidth="1.5"
            fill="none"
          />
          <path
            d="M-100 190 C 300 110, 600 270, 1000 170 C 1200 130, 1500 210, 1600 190"
            stroke="currentColor"
            className="text-primary"
            strokeWidth="1.5"
            fill="none"
          />
          <path
            d="M-100 220 C 300 140, 600 300, 1000 200 C 1200 160, 1500 240, 1600 220"
            stroke="currentColor"
            className="text-primary"
            strokeWidth="1.5"
            fill="none"
          />
          <path
            d="M-100 250 C 300 170, 600 330, 1000 230 C 1200 190, 1500 270, 1600 250"
            stroke="currentColor"
            className="text-primary"
            strokeWidth="1.5"
            fill="none"
          />

          <path
            d="M 100 350 C 400 220, 700 380, 1100 280 C 1300 240, 1500 320, 1600 300"
            stroke="currentColor"
            className="text-primary"
            strokeWidth="1.5"
            fill="none"
          />
          <path
            d="M 100 380 C 400 250, 700 410, 1100 310 C 1300 270, 1500 350, 1600 330"
            stroke="currentColor"
            className="text-primary"
            strokeWidth="1.5"
            fill="none"
          />
        </svg>
      </div>

      <div className="absolute -left-32 -top-32 w-96 h-96 bg-primary/5 rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute -right-32 -bottom-32 w-96 h-96 bg-accent/5 rounded-full blur-[100px] pointer-events-none" />

      <div className="mx-auto w-full max-w-6xl px-6 md:px-10 z-10 relative">
        {/* Back Button */}
        <div className="mb-6">
          <Link href={'/properties?tab=project' as Route}>
            <span className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-border bg-white text-xs font-bold text-fg hover:text-primary hover:border-primary/40 hover:shadow-sm active:scale-95 transition-all cursor-pointer">
              <svg
                className="w-3.5 h-3.5 text-primary"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth="2.5"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M10.5 19.5 3 12m0 0 7.5-7.5M3 12h18"
                />
              </svg>
              <span>Quay lại danh sách dự án</span>
            </span>
          </Link>
        </div>

        <div className="flex flex-wrap items-center gap-3 mb-5">
          <span className="font-mono text-[10px] font-extrabold uppercase tracking-widest text-primary bg-primary/10 border border-primary/20 px-3.5 py-1 rounded-full backdrop-blur-sm">
            {project.tagText}
          </span>
          <span className="font-mono text-xs font-bold text-muted">
            Chủ đầu tư:{' '}
            <span className="text-fg font-extrabold">{project.developer}</span>
          </span>
        </div>

        <h1 className="font-marketing text-4xl font-extrabold leading-tight text-fg md:text-6xl tracking-tight max-w-4xl">
          {project.title}
        </h1>

        <p className="mt-4 font-body text-sm md:text-base text-muted max-w-3xl leading-relaxed">
          {project.description}
        </p>

        {/* Project Specs Bento Widgets */}
        <div className="mt-10 grid grid-cols-1 sm:grid-cols-3 gap-5 max-w-4xl border-t border-border/80 pt-8">
          {project.features?.map((feat, idx) => (
            <div
              key={idx}
              className="bg-white/60 border border-border/80 p-4 rounded-2xl shadow-sm hover:border-primary/25 transition-all duration-300"
            >
              <span className="text-[10px] uppercase font-bold text-muted tracking-wider block">
                {feat.label}
              </span>
              <p className="font-body text-sm font-bold text-fg mt-1">
                {feat.value}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
