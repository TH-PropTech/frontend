'use client'

import * as React from 'react'
import Link from 'next/link'
import type { Route } from 'next'
import type { ApiBuildingItem } from '@/entities/properties'

interface BuildingCardProps {
  building: ApiBuildingItem
  onSelectBuilding?: (buildingId: string) => void
}

export function BuildingCard({
  building,
  onSelectBuilding,
}: BuildingCardProps): React.ReactElement {
  const imageUrl = building.images[0] ?? null

  return (
    <article className="group rounded-2xl border border-border bg-white overflow-hidden shadow-sm hover:translate-y-[-4px] hover:border-border-strong hover:shadow-md transition-all duration-300">
      {/* Image Section */}
      <div className="relative h-48 bg-gradient-to-br from-primary/10 to-accent/10 overflow-hidden">
        {imageUrl ? (
          <img
            src={imageUrl}
            alt={building.name}
            className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center">
            <svg
              className="h-12 w-12 text-primary/30"
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

        {/* Floor count badge */}
        {building.floorsCount && (
          <span className="absolute top-3 right-3 rounded-full bg-white/90 backdrop-blur-sm text-fg px-3 py-1 text-[10px] font-bold shadow-sm">
            {building.floorsCount} tầng
          </span>
        )}

        {/* 360° badge */}
        {building.images360.length > 0 && (
          <span className="absolute top-3 left-3 rounded-full bg-primary/90 text-white px-2.5 py-1 text-[10px] font-bold flex items-center gap-1">
            <svg
              className="h-3 w-3"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M6.827 6.175A2.31 2.31 0 0 1 5.186 7.23c-.38.054-.757.112-1.134.175C2.999 7.58 2.25 8.507 2.25 9.574V18a2.25 2.25 0 0 0 2.25 2.25h15A2.25 2.25 0 0 0 21.75 18V9.574c0-1.067-.75-1.994-1.802-2.169a47.865 47.865 0 0 0-1.134-.175 2.31 2.31 0 0 1-1.64-1.055l-.822-1.316a2.192 2.192 0 0 0-1.736-1.039 48.774 48.774 0 0 0-5.232 0 2.192 2.192 0 0 0-1.736 1.039l-.821 1.316Z"
              />
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M16.5 12.75a4.5 4.5 0 1 1-9 0 4.5 4.5 0 0 1 9 0ZM18.75 10.5h.008v.008h-.008V10.5Z"
              />
            </svg>
            360°
          </span>
        )}
      </div>

      {/* Content Section */}
      <div className="p-5">
        <h4 className="font-marketing text-base font-bold text-fg leading-tight">
          {building.name}
        </h4>

        {building.projectName && (
          <p className="mt-1 text-[11px] font-semibold text-primary">
            {building.projectName}
          </p>
        )}

        {building.location && (
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
            {building.location}
          </p>
        )}

        {building.description && (
          <p className="mt-2.5 font-body text-xs text-fg/70 leading-relaxed line-clamp-2">
            {building.description}
          </p>
        )}

        {/* Amenities */}
        {building.amenities.length > 0 && (
          <div className="mt-3 flex flex-wrap gap-1.5">
            {building.amenities.slice(0, 3).map(amenity => (
              <span
                key={amenity}
                className="rounded-full bg-surface-muted text-muted px-2.5 py-0.5 text-[10px] font-semibold border border-border"
              >
                {amenity}
              </span>
            ))}
            {building.amenities.length > 3 && (
              <span className="rounded-full bg-primary/10 text-primary px-2.5 py-0.5 text-[10px] font-bold">
                +{building.amenities.length - 3}
              </span>
            )}
          </div>
        )}

        {/* Footer Actions */}
        <div className="mt-4 pt-3 border-t border-border flex items-center justify-between">
          <div className="flex items-center gap-1.5 text-[10px] font-bold text-muted uppercase tracking-wider">
            <svg
              className="h-3.5 w-3.5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M2.25 21h19.5m-18-18v18m10.5-18v18m6-13.5V21M6.75 6.75h.75m-.75 3h.75m-.75 3h.75m3-6h.75m-.75 3h.75m-.75 3h.75M6.75 21v-3.375c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21M3 3h12m-.75 4.5H21m-3.75 3H21m-3.75 3H21"
              />
            </svg>
            Tòa nhà
          </div>
          <div className="flex items-center gap-2.5">
            <Link
              href={`/projects/${building.projectId || 'proj-1'}` as Route}
              onClick={e => e.stopPropagation()}
              className="text-xs font-bold text-accent hover:text-accent-hover transition-colors flex items-center gap-1 cursor-pointer"
            >
              <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 20l-5.447-2.724A2 2 0 013 15.382V6.618a2 2 0 011.053-1.784L9 2l5 2.5L19.447 2.2a2 2 0 012.553 1.784v8.764a2 2 0 01-1.053 1.784L15 17.5l-6 2.5z" />
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 20V9.5M15 17.5V7.5" />
              </svg>
              Sa bàn 3D
            </Link>
            <span className="text-border text-xs font-light">|</span>
            <Link
              href={`/properties?building=${building.id}` as Route}
              onClick={e => {
                if (onSelectBuilding) {
                  e.preventDefault()
                  e.stopPropagation()
                  e.nativeEvent.stopPropagation()
                  e.nativeEvent.stopImmediatePropagation()
                  onSelectBuilding(building.id)
                }
              }}
              className="text-xs font-bold text-primary hover:text-primary-hover transition-colors"
            >
              Xem căn hộ →
            </Link>
          </div>
        </div>
      </div>
    </article>
  )
}
