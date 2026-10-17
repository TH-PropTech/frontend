'use client'

import * as React from 'react'
import { createPortal } from 'react-dom'
import { toast } from 'sonner'
import { Eye, EyeOff, Pencil, Plus, Trash2, X } from 'lucide-react'
import {
  createAdminDesign,
  deleteAdminDesign,
  listAdminDesigns,
  updateAdminDesign,
} from '../api/floorplan-designs-api'
import { toFloorplanConfig } from '../model/floorplan-config'
import {
  THEME_META,
  normalizeFloorplanDesign,
  normalizeFloorplanLayout,
  type FloorplanLayout,
  resolveDesignPalette,
  type AdminFloorplanDesign,
  type FloorplanDesign,
  type FloorplanDesignInput,
} from '../model/floorplan-design'
import { ApartmentFloorplanFrame } from './apartment-floorplan-frame'
import {
  DesignEditorForm,
  EMPTY_DRAFT,
  type DesignDraft,
} from './design-editor-form'

export interface DesignableApartment {
  id: string
  title: string
  bedrooms: number
  bathrooms: number
  area: number
  furniture?: string | undefined
}

interface ApartmentDesignsManagerProps {
  apartment: DesignableApartment
  onClose: () => void
}

const PREVIEW_ID = 'draft-preview'

function toDraft(design: AdminFloorplanDesign): DesignDraft {
  return {
    id: design.id,
    name: design.name,
    description: design.description,
    theme: design.theme,
    palette: design.palette,
    layout: normalizeFloorplanLayout(design.layout),
    furnishing: design.furnishing ?? 'inherit',
    defaultHour: design.defaultHour,
    visible: design.visible,
    order: design.order,
  }
}

function toInput(draft: DesignDraft): FloorplanDesignInput {
  return {
    name: draft.name.trim(),
    description: draft.description.trim(),
    theme: draft.theme,
    palette: draft.palette,
    layout: draft.layout,
    furnishing: draft.furnishing === 'inherit' ? null : draft.furnishing,
    defaultHour: draft.defaultHour,
    visible: draft.visible,
    order: draft.order,
  }
}

function previewDesign(draft: DesignDraft): FloorplanDesign | null {
  return normalizeFloorplanDesign({
    id: PREVIEW_ID,
    name: draft.name.trim() || 'Thiết kế mới',
    description: draft.description,
    theme: draft.theme,
    palette: draft.palette,
    layout: draft.layout,
    furnishing: draft.furnishing === 'inherit' ? null : draft.furnishing,
    defaultHour: draft.defaultHour,
  })
}

/** Quản lý thiết kế 3D của một căn hộ: danh sách, ẩn/hiện, thêm/sửa/xoá, xem trước trực tiếp. */
export function ApartmentDesignsManager({
  apartment,
  onClose,
}: ApartmentDesignsManagerProps): React.ReactElement {
  const [designs, setDesigns] = React.useState<AdminFloorplanDesign[] | null>(
    null
  )
  const [loadError, setLoadError] = React.useState(false)
  const [draft, setDraft] = React.useState<DesignDraft | null>(null)
  // Ảnh chụp bản nháp lúc mở form: so sánh để biết có thay đổi chưa lưu hay không.
  const [baseline, setBaseline] = React.useState('')
  const [saving, setSaving] = React.useState(false)

  React.useEffect(() => {
    let active = true
    void listAdminDesigns(apartment.id)
      .then(list => {
        if (active) setDesigns(list)
      })
      .catch(() => {
        if (active) setLoadError(true)
      })
    return () => {
      active = false
    }
  }, [apartment.id])

  const property = React.useMemo(
    () => ({
      id: apartment.id,
      bedrooms: apartment.bedrooms,
      bathrooms: apartment.bathrooms,
      areaNum: apartment.area,
      furniture: apartment.furniture ?? '',
    }),
    [apartment]
  )

  // Đang chỉnh thì xem trước đúng bản nháp; không thì xem toàn bộ thiết kế đã lưu.
  const previewConfig = React.useMemo(() => {
    if (draft) {
      const design = previewDesign(draft)
      return toFloorplanConfig(property, design ? [design] : [])
    }
    const saved = (designs ?? [])
      .map(design => normalizeFloorplanDesign(design))
      .filter((design): design is FloorplanDesign => design !== null)
    return toFloorplanConfig(property, saved)
  }, [draft, designs, property])

  const openDraft = (next: DesignDraft): void => {
    setBaseline(JSON.stringify(next))
    setDraft(next)
  }

  const isDirty = draft !== null && JSON.stringify(draft) !== baseline

  /** Có thay đổi chưa lưu thì hỏi lại trước khi bỏ; bản đã lưu luôn giữ nguyên. */
  const confirmDiscard = (): boolean =>
    !isDirty || window.confirm('Bỏ các thay đổi chưa lưu của thiết kế này?')

  const handleCancel = (): void => {
    if (confirmDiscard()) setDraft(null)
  }

  const handleClose = (): void => {
    if (confirmDiscard()) onClose()
  }

  // Bản nháp bố cục từ khung xem trước (chỉ nhận cho đúng thiết kế đang xem trước).
  const handleLayoutChange = React.useCallback(
    (designId: string, layout: FloorplanLayout): void => {
      if (designId !== PREVIEW_ID) return
      setDraft(current => (current ? { ...current, layout } : current))
    },
    []
  )

  const handleSave = async (): Promise<void> => {
    if (!draft) return
    setSaving(true)
    try {
      const saved = draft.id
        ? await updateAdminDesign(apartment.id, draft.id, toInput(draft))
        : await createAdminDesign(apartment.id, {
            ...toInput(draft),
            order: designs?.length ?? 0,
          })
      setDesigns(current => {
        const list = current ?? []
        return draft.id
          ? list.map(item => (item.id === saved.id ? saved : item))
          : [...list, saved]
      })
      setDraft(null)
      toast.success(draft.id ? 'Đã lưu thiết kế' : 'Đã thêm thiết kế')
    } catch {
      toast.error('Không lưu được thiết kế. Vui lòng thử lại.')
    } finally {
      setSaving(false)
    }
  }

  const handleToggle = async (design: AdminFloorplanDesign): Promise<void> => {
    try {
      const saved = await updateAdminDesign(apartment.id, design.id, {
        visible: !design.visible,
      })
      setDesigns(current =>
        (current ?? []).map(item => (item.id === saved.id ? saved : item))
      )
      toast.success(saved.visible ? 'Đã hiện thiết kế' : 'Đã ẩn thiết kế')
    } catch {
      toast.error('Không đổi được trạng thái hiển thị.')
    }
  }

  const handleDelete = async (design: AdminFloorplanDesign): Promise<void> => {
    if (!window.confirm(`Xoá thiết kế "${design.name}"?`)) return
    try {
      await deleteAdminDesign(apartment.id, design.id)
      setDesigns(current =>
        (current ?? []).filter(item => item.id !== design.id)
      )
      toast.success('Đã xoá thiết kế')
    } catch {
      toast.error('Không xoá được thiết kế.')
    }
  }

  // Gắn thẳng vào <body>: modal nằm trong khối cha có transform/hiệu ứng thì `fixed` bị tính theo khối đó (hở một dải trắng ở trên).
  return createPortal(
    <div
      role="dialog"
      aria-modal="true"
      aria-label={`Thiết kế 3D: ${apartment.title}`}
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-3"
    >
      <div className="flex h-[94vh] w-full max-w-7xl flex-col overflow-hidden rounded-3xl bg-surface shadow-xl">
        <header className="flex items-start justify-between gap-4 border-b border-border px-5 py-4">
          <div className="min-w-0">
            <h2 className="font-marketing text-lg font-bold text-fg">
              Thiết kế 3D căn hộ
            </h2>
            <p className="truncate text-xs text-muted">
              {apartment.title} · {apartment.bedrooms} phòng ngủ ·{' '}
              {apartment.area} m²
            </p>
          </div>
          <button
            type="button"
            onClick={handleClose}
            aria-label="Đóng"
            className="rounded-xl border border-border p-2 text-muted hover:bg-surface-muted"
          >
            <X className="h-4 w-4" aria-hidden="true" />
          </button>
        </header>

        <div className="grid min-h-0 flex-1 grid-cols-1 gap-4 overflow-y-auto p-4 lg:grid-cols-[320px_1fr] lg:overflow-hidden">
          <div className="min-h-0 space-y-3 lg:overflow-y-auto lg:pr-2">
            {draft ? (
              <DesignEditorForm
                draft={draft}
                saving={saving}
                onChange={setDraft}
                onSave={() => void handleSave()}
                onCancel={handleCancel}
              />
            ) : (
              <>
                <button
                  type="button"
                  onClick={() => openDraft({ ...EMPTY_DRAFT })}
                  className="flex w-full items-center justify-center gap-2 rounded-xl bg-primary px-4 py-2.5 text-xs font-bold text-white transition hover:bg-primary-hover"
                >
                  <Plus className="h-4 w-4" aria-hidden="true" />
                  Thêm thiết kế
                </button>

                {loadError ? (
                  <p className="rounded-xl border border-border p-4 text-xs text-muted">
                    Không tải được danh sách thiết kế.
                  </p>
                ) : designs === null ? (
                  <p className="p-4 text-xs text-muted">Đang tải...</p>
                ) : designs.length === 0 ? (
                  <p className="rounded-xl border border-dashed border-border p-4 text-xs leading-relaxed text-muted">
                    Căn hộ chưa có thiết kế nào. Người xem sẽ thấy một phong
                    cách mặc định do hệ thống chọn. Thêm thiết kế để tự quyết
                    định phong cách, màu sắc và mức nội thất.
                  </p>
                ) : (
                  <ul className="space-y-2">
                    {designs.map(design => {
                      const colors = resolveDesignPalette(design)
                      return (
                        <li
                          key={design.id}
                          className={`rounded-2xl border border-border p-3 ${
                            design.visible ? '' : 'opacity-60'
                          }`}
                        >
                          <div className="flex items-center gap-2">
                            <span className="flex shrink-0" aria-hidden="true">
                              {(['floor', 'sofa', 'accent'] as const).map(
                                key => (
                                  <i
                                    key={key}
                                    className="-ml-1 h-5 w-3.5 rounded-full border-2 border-white shadow-sm first:ml-0"
                                    style={{ background: colors[key] }}
                                  />
                                )
                              )}
                            </span>
                            <div className="min-w-0 flex-1">
                              <p className="truncate text-sm font-semibold text-fg">
                                {design.name}
                              </p>
                              <p className="truncate text-[11px] text-muted">
                                {THEME_META[design.theme].label}
                                {design.visible ? '' : ' · đang ẩn'}
                              </p>
                            </div>
                            <button
                              type="button"
                              onClick={() => void handleToggle(design)}
                              aria-label={
                                design.visible
                                  ? `Ẩn thiết kế ${design.name}`
                                  : `Hiện thiết kế ${design.name}`
                              }
                              className="rounded-lg p-1.5 text-muted hover:bg-surface-muted"
                            >
                              {design.visible ? (
                                <Eye className="h-4 w-4" aria-hidden="true" />
                              ) : (
                                <EyeOff
                                  className="h-4 w-4"
                                  aria-hidden="true"
                                />
                              )}
                            </button>
                            <button
                              type="button"
                              onClick={() => openDraft(toDraft(design))}
                              aria-label={`Sửa thiết kế ${design.name}`}
                              className="rounded-lg p-1.5 text-muted hover:bg-surface-muted"
                            >
                              <Pencil className="h-4 w-4" aria-hidden="true" />
                            </button>
                            <button
                              type="button"
                              onClick={() => void handleDelete(design)}
                              aria-label={`Xoá thiết kế ${design.name}`}
                              className="rounded-lg p-1.5 text-danger hover:bg-danger-soft"
                            >
                              <Trash2 className="h-4 w-4" aria-hidden="true" />
                            </button>
                          </div>
                        </li>
                      )
                    })}
                  </ul>
                )}
              </>
            )}
          </div>

          <div className="flex min-h-[420px] min-w-0 flex-col lg:min-h-0">
            <p className="mb-2 shrink-0 text-xs font-semibold text-fg">
              {draft ? 'Xem trước bản nháp' : 'Xem trước'}
            </p>
            {designs === null && !loadError ? (
              <p className="rounded-2xl border border-border p-6 text-sm text-muted">
                Đang chuẩn bị xem trước...
              </p>
            ) : previewConfig ? (
              <ApartmentFloorplanFrame
                config={previewConfig}
                variant="bare"
                className="min-h-0 flex-1"
                heightClass="min-h-[360px] flex-1"
                editable={draft !== null}
                onLayoutChange={handleLayoutChange}
              />
            ) : (
              <p className="rounded-2xl border border-border p-6 text-sm text-muted">
                Căn hộ thiếu thông tin (diện tích, số phòng) để dựng sơ đồ 3D.
              </p>
            )}
          </div>
        </div>
      </div>
    </div>,
    document.body
  )
}
