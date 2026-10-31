'use client'

import * as React from 'react'
import { Box, Search } from 'lucide-react'
import { apiClient } from '@/shared/api/api-client'
import { AdminErrorState } from '@/shared/ui/admin-error-state'
import {
  ApartmentDesignsManager,
  type DesignableApartment,
} from '@/features/apartment-floorplan'

interface ManagedApartment extends DesignableApartment {
  location: string
  status: string
}

/** Admin: chọn căn hộ rồi quản lý thiết kế 3D của căn đó (thêm, ẩn/hiện, màu sắc, nội thất). */
export function ApartmentDesignsView(): React.ReactElement {
  const [apartments, setApartments] = React.useState<ManagedApartment[] | null>(
    null
  )
  const [failed, setFailed] = React.useState(false)
  const [query, setQuery] = React.useState('')
  const [selected, setSelected] = React.useState<ManagedApartment | null>(null)

  const load = React.useCallback(async () => {
    setFailed(false)
    try {
      const list = await apiClient.get<ManagedApartment[]>('/apartments/manage')
      setApartments(list)
    } catch {
      setFailed(true)
    }
  }, [])

  React.useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    void load()
  }, [load])

  const filtered = React.useMemo(() => {
    const q = query.trim().toLowerCase()
    return (apartments ?? []).filter(
      apartment =>
        !q ||
        apartment.title.toLowerCase().includes(q) ||
        apartment.location.toLowerCase().includes(q)
    )
  }, [apartments, query])

  return (
    <div className="space-y-5">
      <div>
        <h1 className="text-xl font-bold font-marketing text-fg">
          Thiết kế 3D căn hộ
        </h1>
        <p className="mt-1 text-xs text-muted">
          Mỗi căn hộ có thể có nhiều thiết kế (phong cách, màu sắc, mức nội
          thất). Bật/tắt từng thiết kế để quyết định người xem được thấy gì; căn
          chưa có thiết kế sẽ dùng phong cách mặc định.
        </p>
      </div>

      <label className="relative block max-w-md">
        <span className="sr-only">Tìm căn hộ</span>
        <Search
          className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted"
          aria-hidden="true"
        />
        <input
          value={query}
          onChange={event => setQuery(event.target.value)}
          placeholder="Tìm theo tên hoặc địa chỉ..."
          className="w-full rounded-xl border border-border bg-surface py-2.5 pl-9 pr-3 text-sm text-fg focus:border-primary focus:outline-none"
        />
      </label>

      {failed ? (
        <AdminErrorState
          title="Lỗi tải danh sách thiết kế 3D"
          message="Không thể tải danh sách căn hộ để quản lý thiết kế 3D."
          onRetry={load}
        />
      ) : apartments === null ? (
        <p className="p-6 text-sm text-muted">Đang tải...</p>
      ) : filtered.length === 0 ? (
        <p className="rounded-2xl border border-border p-6 text-sm text-muted">
          Không có căn hộ phù hợp.
        </p>
      ) : (
        <ul className="grid grid-cols-1 gap-3 md:grid-cols-2 xl:grid-cols-3">
          {filtered.map(apartment => (
            <li
              key={apartment.id}
              className="flex flex-col justify-between gap-3 rounded-2xl border border-border bg-surface p-4"
            >
              <div className="min-w-0">
                <p className="truncate text-sm font-semibold text-fg">
                  {apartment.title}
                </p>
                <p className="truncate text-xs text-muted">
                  {apartment.location}
                </p>
                <p className="mt-1 text-[11px] text-muted">
                  {apartment.bedrooms} phòng ngủ · {apartment.bathrooms} phòng
                  vệ sinh · {apartment.area} m²
                </p>
              </div>
              <button
                type="button"
                onClick={() => setSelected(apartment)}
                className="flex items-center justify-center gap-2 rounded-xl border border-border px-3 py-2 text-xs font-semibold text-fg transition hover:bg-surface-muted"
              >
                <Box className="h-4 w-4" aria-hidden="true" />
                Quản lý thiết kế 3D
              </button>
            </li>
          ))}
        </ul>
      )}

      {selected ? (
        <ApartmentDesignsManager
          apartment={selected}
          onClose={() => setSelected(null)}
        />
      ) : null}
    </div>
  )
}
