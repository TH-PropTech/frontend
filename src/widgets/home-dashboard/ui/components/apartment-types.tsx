'use client'

import * as React from 'react'
import Link from 'next/link'
import type { Route } from 'next'
import { Building2 } from 'lucide-react'
import type { BedroomStat } from '../../model/home-apartment-stats'

interface ApartmentTypesProps {
  types: BedroomStat[]
}

export function ApartmentTypes({
  types,
}: ApartmentTypesProps): React.ReactElement | null {
  if (types.length === 0) return null

  return (
    <section className="border-y border-border bg-surface py-24">
      <div className="mx-auto max-w-6xl px-6 md:px-10">
        <div className="mb-16 text-center">
          <span className="font-mono text-xs font-bold uppercase tracking-widest text-primary">
            LOẠI HÌNH CĂN HỘ
          </span>
          <h2 className="mt-3 font-marketing text-3xl font-bold text-fg sm:text-4xl">
            Đa dạng lựa chọn theo nhu cầu
          </h2>
          <p className="mx-auto mt-4 max-w-xl font-body text-sm text-muted">
            Diện tích và giá thuê được tổng hợp từ các căn hộ đang có trên hệ
            thống.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-3">
          {types.map(item => (
            <Link
              key={item.bedrooms}
              href={`/properties?bedrooms=${item.bedrooms}` as Route}
              className="group flex flex-col items-center gap-3 rounded-2xl border border-border bg-white p-6 text-center shadow-sm hover:shadow-md hover:border-primary/30 transition-all"
            >
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl text-primary group-hover:text-primary-hover transition-colors">
                <Building2 className="h-6 w-6" aria-hidden="true" />
              </div>
              <h3 className="font-display text-sm font-bold text-fg">
                {item.bedrooms} Phòng ngủ
              </h3>
              {item.areaRange && (
                <span className="font-body text-[11px] text-muted">
                  {item.areaRange}
                </span>
              )}
              {item.minPrice && (
                <span className="font-display text-xs font-bold text-primary">
                  {item.minPrice}
                </span>
              )}
              <span className="font-body text-[11px] text-muted">
                {item.count} căn hộ
              </span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}
