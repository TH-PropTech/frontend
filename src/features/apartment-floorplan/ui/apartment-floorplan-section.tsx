'use client'

import * as React from 'react'
import { Box } from 'lucide-react'
import type { ApartmentItem } from '@/entities/properties'
import { listApartmentDesigns } from '../api/floorplan-designs-api'
import { toFloorplanCampus } from '../model/floorplan-campus'
import { toFloorplanConfig } from '../model/floorplan-config'
import type { FloorplanDesign } from '../model/floorplan-design'
import { ApartmentFloorplanFrame } from './apartment-floorplan-frame'

interface ApartmentFloorplanSectionProps {
  property: Pick<
    ApartmentItem,
    'id' | 'bedrooms' | 'bathrooms' | 'areaNum' | 'furniture'
  > &
    Partial<Pick<ApartmentItem, 'title' | 'projectName'>>
}

/**
 * Thiết kế đang bật của căn hộ, tải khi người dùng mở viewer. null = đang tải.
 * Lỗi mạng không chặn viewer: rơi về danh sách rỗng (viewer dùng phong cách mặc định).
 */
function useApartmentDesigns(
  apartmentId: string,
  enabled: boolean
): FloorplanDesign[] | null {
  const [loaded, setLoaded] = React.useState<{
    id: string
    designs: FloorplanDesign[]
  } | null>(null)

  React.useEffect(() => {
    if (!enabled) return
    let active = true
    void listApartmentDesigns(apartmentId)
      .catch((): FloorplanDesign[] => [])
      .then(designs => {
        if (active) setLoaded({ id: apartmentId, designs })
      })
    return () => {
      active = false
    }
  }, [apartmentId, enabled])

  return loaded?.id === apartmentId ? loaded.designs : null
}

export function ApartmentFloorplanSection({
  property,
}: ApartmentFloorplanSectionProps): React.ReactElement {
  const [isOpen, setIsOpen] = React.useState(false)
  const designs = useApartmentDesigns(property.id, isOpen)
  const config = React.useMemo(
    () => toFloorplanConfig(property, designs ?? []),
    [property, designs]
  )
  // Mở viewer: sa bàn trước, căn đang xem sáng lên; bấm vào mới vào phòng
  const campus = React.useMemo(
    () =>
      config
        ? toFloorplanCampus(
            config,
            property.title || 'Căn hộ này',
            property.projectName || 'Tòa nhà'
          )
        : undefined,
    [config, property.title, property.projectName]
  )
  const handleOpen = (): void => setIsOpen(true)
  const handleClose = (): void => setIsOpen(false)

  if (!config) {
    return (
      <section className="mx-auto max-w-6xl px-6 pb-2 pt-3 md:px-10">
        <div className="rounded-3xl border border-border bg-surface p-6 text-sm text-muted">
          Chưa đủ thông tin để tạo sơ đồ 3D minh hoạ cho căn hộ này.
        </div>
      </section>
    )
  }

  if (isOpen) {
    return (
      <section className="mx-auto max-w-6xl px-6 pb-2 pt-3 md:px-10">
        {designs === null ? (
          <div className="flex h-[560px] items-center justify-center rounded-3xl border border-border bg-surface text-sm font-semibold text-muted">
            Đang chuẩn bị sơ đồ 3D...
          </div>
        ) : (
          <ApartmentFloorplanFrame
            config={config}
            {...(campus ? { campus } : {})}
            onClose={handleClose}
          />
        )}
      </section>
    )
  }

  return (
    <section className="mx-auto max-w-6xl px-6 pb-2 pt-3 md:px-10">
      <div className="flex flex-col items-start justify-between gap-5 rounded-3xl border border-border bg-surface p-4 md:flex-row md:items-center">
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
