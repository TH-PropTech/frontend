'use client'

import * as React from 'react'
import { Box } from 'lucide-react'
import type { ApartmentItem } from '@/entities/properties'
import { toFloorplanConfig } from '../model/floorplan-config'
import { ApartmentFloorplanFrame } from './apartment-floorplan-frame'

interface ApartmentFloorplanSectionProps {
  property: Pick<
    ApartmentItem,
    'id' | 'bedrooms' | 'bathrooms' | 'areaNum' | 'furniture'
  >
}

export function ApartmentFloorplanSection({
  property,
}: ApartmentFloorplanSectionProps): React.ReactElement {
  const [isOpen, setIsOpen] = React.useState(false)
  const config = React.useMemo(() => toFloorplanConfig(property), [property])
  const handleOpen = (): void => setIsOpen(true)
  const handleClose = (): void => setIsOpen(false)

  if (!config) {
    return (
      <section className="mx-auto max-w-6xl px-6 py-6 md:px-10">
        <div className="rounded-3xl border border-border bg-surface p-6 text-sm text-muted">
          Chưa đủ thông tin để tạo sơ đồ 3D minh hoạ cho căn hộ này.
        </div>
      </section>
    )
  }

  if (isOpen) {
    return (
      <section className="mx-auto max-w-6xl px-6 py-6 md:px-10">
        <ApartmentFloorplanFrame config={config} onClose={handleClose} />
      </section>
    )
  }

  return (
    <section className="mx-auto max-w-6xl px-6 py-6 md:px-10">
      <div className="flex flex-col items-start justify-between gap-5 rounded-3xl border border-border bg-surface p-6 md:flex-row md:items-center">
        <div className="flex gap-4">
          <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-primary-soft text-primary">
            <Box className="h-5 w-5" aria-hidden="true" />
          </div>
          <div>
            <h3 className="font-marketing text-lg font-bold text-fg">
              Sơ đồ 3D minh hoạ
            </h3>
            <p className="mt-1 max-w-2xl text-xs leading-relaxed text-muted">
              Khám phá bố cục tham khảo của căn hộ với {property.bedrooms} phòng
              ngủ và {property.bathrooms} phòng vệ sinh trên diện tích{' '}
              {property.areaNum} m².
            </p>
            <p className="mt-2 text-[11px] font-medium text-subtle">
              Bố cục mô phỏng từ tin đăng, có thể khác hiện trạng thực tế.
            </p>
          </div>
        </div>
        <button
          type="button"
          onClick={handleOpen}
          className="inline-flex shrink-0 items-center gap-2 rounded-2xl bg-primary px-5 py-3 text-xs font-bold text-white transition hover:bg-primary-hover active:scale-[0.98]"
        >
          <Box className="h-4 w-4" aria-hidden="true" />
          Xem sơ đồ 3D minh hoạ
        </button>
      </div>
    </section>
  )
}
