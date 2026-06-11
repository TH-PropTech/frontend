'use client'

import * as React from 'react'
import Link from 'next/link'
import type { Route } from 'next'
import type { ApartmentItem } from '@/entities/properties'

interface PropertyDetailHeroProps {
  property: ApartmentItem
}

export function PropertyDetailHero({
  property,
}: PropertyDetailHeroProps): React.ReactElement {
  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-[#f5ece2] via-[#faf6f1] to-bg pb-20 pt-36 rounded-b-[40px] border-b border-border">
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
        </svg>
      </div>

      <div className="absolute -left-32 -top-32 w-96 h-96 bg-primary/5 rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute -right-32 -bottom-32 w-96 h-96 bg-accent/5 rounded-full blur-[100px] pointer-events-none" />

      <div className="mx-auto w-full max-w-6xl px-6 md:px-10 z-10 relative">
        {/* Back Button */}
        <div className="mb-6">
          <Link href={'/properties?tab=single' as Route}>
            <span className="text-xs font-bold text-primary hover:underline flex items-center gap-1.5 cursor-pointer w-fit">
              &larr; Quay lại danh sách căn hộ
            </span>
          </Link>
        </div>

        <div className="flex flex-wrap items-center gap-3 mb-5">
          <span
            className={`rounded-full px-3.5 py-1 text-[10px] font-extrabold uppercase tracking-wider border backdrop-blur-sm ${
              property.tag === 'empty'
                ? 'bg-success-soft/60 text-success border-success/25'
                : property.tag === 'pending'
                  ? 'bg-accent-soft/60 text-primary border-primary/25'
                  : 'bg-info-soft/60 text-info border-info/25'
            }`}
          >
            {property.tagText}
          </span>
          {property.isVerified && (
            <span className="inline-flex items-center gap-1 text-[10px] font-extrabold uppercase tracking-widest text-success bg-success-soft/80 border border-success/20 px-3 py-1 rounded-full backdrop-blur-sm">
              <svg
                className="h-3 w-3"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth="3"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="m4.5 12.75 6 6 9-13.5"
                />
              </svg>
              Tin xác thực
            </span>
          )}
          <span className="font-mono text-xs font-bold text-muted">
            Mã tin:{' '}
            <span className="text-fg font-extrabold font-mono">
              {property.id}
            </span>
          </span>
        </div>

        <h1 className="font-marketing text-3xl font-extrabold leading-tight text-fg md:text-5xl tracking-tight max-w-4xl">
          {property.title}
        </h1>

        {/* Price tag below title */}
        <div className="mt-6 flex flex-wrap items-baseline gap-2">
          <span className="text-muted text-sm font-semibold">
            Giá thuê căn hộ:
          </span>
          <span className="text-3xl font-black text-primary font-mono">
            {property.price}
          </span>
        </div>

        {/* Quick Specs Bento Widget */}
        <div className="mt-8 grid grid-cols-2 sm:grid-cols-4 gap-4 max-w-3xl border-t border-border/80 pt-6">
          <div className="bg-white/60 border border-border/80 p-3.5 rounded-xl shadow-sm">
            <span className="text-[10px] uppercase font-bold text-muted tracking-wider block">
              Diện tích
            </span>
            <p className="font-mono text-sm font-bold text-fg mt-1">
              {property.area}
            </p>
          </div>
          <div className="bg-white/60 border border-border/80 p-3.5 rounded-xl shadow-sm">
            <span className="text-[10px] uppercase font-bold text-muted tracking-wider block">
              Thiết kế
            </span>
            <p className="font-body text-sm font-bold text-fg mt-1">
              {property.rooms}
            </p>
          </div>
          <div className="bg-white/60 border border-border/80 p-3.5 rounded-xl shadow-sm">
            <span className="text-[10px] uppercase font-bold text-muted tracking-wider block">
              Hướng nhà
            </span>
            <p className="font-body text-sm font-bold text-fg mt-1">
              {property.direction}
            </p>
          </div>
          <div className="bg-white/60 border border-border/80 p-3.5 rounded-xl shadow-sm">
            <span className="text-[10px] uppercase font-bold text-muted tracking-wider block">
              Nội thất
            </span>
            <p className="font-body text-sm font-bold text-fg mt-1">
              {property.furniture}
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
