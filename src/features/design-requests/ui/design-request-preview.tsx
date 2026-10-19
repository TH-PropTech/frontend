'use client'

import * as React from 'react'
import {
  ApartmentFloorplanFrame,
  normalizeFloorplanDesigns,
  toFloorplanConfig,
  type AdminFloorplanDesign,
} from '@/features/apartment-floorplan'

export interface DesignRequestApartmentInfo {
  bedrooms: number
  bathrooms: number
  area: number
  furniture?: string | null
}

interface DesignRequestPreviewProps {
  apartmentId: string
  apartment: DesignRequestApartmentInfo | undefined
  design: AdminFloorplanDesign
}

/** Xem trước 3D thiết kế được bàn giao, dùng lại khung viewer của sơ đồ căn hộ. */
export function DesignRequestPreview({
  apartmentId,
  apartment,
  design,
}: DesignRequestPreviewProps): React.ReactElement {
  const config = React.useMemo(() => {
    if (!apartment) return null
    return toFloorplanConfig(
      {
        id: apartmentId,
        bedrooms: apartment.bedrooms,
        bathrooms: apartment.bathrooms,
        areaNum: apartment.area,
        furniture: apartment.furniture ?? '',
      },
      normalizeFloorplanDesigns([design])
    )
  }, [apartmentId, apartment, design])

  if (!config) {
    return (
      <p className="rounded-2xl border border-border p-4 text-sm text-muted">
        Chưa đủ thông tin căn hộ để dựng bản xem trước 3D.
      </p>
    )
  }
  return (
    <ApartmentFloorplanFrame
      config={config}
      variant="bare"
      heightClass="h-[320px]"
    />
  )
}
