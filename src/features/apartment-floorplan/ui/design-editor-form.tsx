'use client'

import * as React from 'react'
import { RotateCcw } from 'lucide-react'
import type { FurnishingLevel } from '../model/floorplan-config'
import {
  FLOORPLAN_THEMES,
  PALETTE_KEYS,
  PALETTE_LABELS,
  THEME_META,
  resolveDesignPalette,
  emptyLayout,
  isLayoutEmpty,
  summarizeLayout,
  type FloorplanLayout,
  type FloorplanPalette,
  type FloorplanTheme,
  type PaletteKey,
} from '../model/floorplan-design'

/** Bản nháp đang chỉnh trong form. `furnishing: 'inherit'` = theo mức nội thất của tin đăng. */
export interface DesignDraft {
  id: string | null
  name: string
  description: string
  theme: FloorplanTheme
  palette: FloorplanPalette
  /** Bố cục đồ nội thất tuỳ chỉnh (kéo thả trong khung xem trước), toạ độ theo mẫu. */
  layout: FloorplanLayout
  furnishing: FurnishingLevel | 'inherit'
  defaultHour: number
  visible: boolean
  order: number
}

export const EMPTY_DRAFT: DesignDraft = {
  id: null,
  name: '',
  description: '',
  theme: 'modern',
  palette: {},
  layout: emptyLayout(),
  furnishing: 'inherit',
  defaultHour: 10,
  visible: true,
  order: 0,
}

const FURNISHING_LABELS: Record<DesignDraft['furnishing'], string> = {
  inherit: 'Theo tin đăng',
  bare: 'Không nội thất',
  partial: 'Nội thất cơ bản',
  full: 'Đầy đủ nội thất',
}

interface DesignEditorFormProps {
  draft: DesignDraft
  saving: boolean
  onChange: (draft: DesignDraft) => void
  onSave: () => void
  onCancel: () => void
}

const inputClass =
  'w-full rounded-xl border border-border bg-bg px-3 py-2 text-sm text-fg focus:border-primary focus:outline-none'

export function DesignEditorForm({
  draft,
  saving,
  onChange,
  onSave,
  onCancel,
}: DesignEditorFormProps): React.ReactElement {
  const effective = resolveDesignPalette(draft)
  const set = <K extends keyof DesignDraft>(
    key: K,
    value: DesignDraft[K]
  ): void => onChange({ ...draft, [key]: value })

  const setColor = (key: PaletteKey, value: string): void =>
    onChange({ ...draft, palette: { ...draft.palette, [key]: value } })

  const resetColor = (key: PaletteKey): void => {
    const next = { ...draft.palette }
    delete next[key]
    onChange({ ...draft, palette: next })
  }

  const hour = Math.floor(draft.defaultHour)
  const minutes = Math.round((draft.defaultHour - hour) * 60)

  return (
    <form
      className="space-y-4"
      onSubmit={event => {
        event.preventDefault()
        onSave()
      }}
    >
      <div>
        <label
          htmlFor="design-name"
          className="mb-1 block text-xs font-semibold text-fg"
        >
          Tên thiết kế
        </label>
        <input
          id="design-name"
          className={inputClass}
          value={draft.name}
          maxLength={60}
          placeholder="Ví dụ: Bắc Âu sáng"
          onChange={event => set('name', event.target.value)}
        />
      </div>

      <div>
        <label
          htmlFor="design-description"
          className="mb-1 block text-xs font-semibold text-fg"
        >
          Mô tả ngắn
        </label>
        <input
          id="design-description"
          className={inputClass}
          value={draft.description}
          maxLength={200}
          placeholder="Hiện cạnh tên thiết kế khi người xem chọn"
          onChange={event => set('description', event.target.value)}
        />
      </div>

      <fieldset>
        <legend className="mb-1 text-xs font-semibold text-fg">
          Phong cách
        </legend>
        <div className="flex flex-wrap gap-2">
          {FLOORPLAN_THEMES.map(theme => {
            const active = draft.theme === theme
            return (
              <button
                key={theme}
                type="button"
                aria-pressed={active}
                onClick={() => set('theme', theme)}
                className={`flex items-center gap-2 rounded-xl border px-3 py-2 text-xs font-semibold transition ${
                  active
                    ? 'border-primary bg-primary-soft text-primary'
                    : 'border-border text-muted hover:bg-surface-muted'
                }`}
              >
                <span className="flex" aria-hidden="true">
                  {(['floor', 'sofa', 'accent'] as const).map(key => (
                    <i
                      key={key}
                      className="-ml-1 h-4 w-3 rounded-full border border-white first:ml-0"
                      style={{ background: THEME_META[theme].palette[key] }}
                    />
                  ))}
                </span>
                {THEME_META[theme].label}
              </button>
            )
          })}
        </div>
      </fieldset>

      <fieldset>
        <legend className="mb-1 text-xs font-semibold text-fg">
          Tuỳ chỉnh màu (bỏ trống = màu của phong cách)
        </legend>
        <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
          {PALETTE_KEYS.map(key => {
            const overridden = draft.palette[key] !== undefined
            return (
              <div
                key={key}
                className="flex items-center gap-2 rounded-xl border border-border px-3 py-2"
              >
                <input
                  type="color"
                  aria-label={`Màu ${PALETTE_LABELS[key].toLowerCase()}`}
                  value={effective[key]}
                  onChange={event => setColor(key, event.target.value)}
                  className="h-7 w-9 cursor-pointer rounded border border-border bg-transparent p-0"
                />
                <span className="flex-1 text-xs text-fg">
                  {PALETTE_LABELS[key]}
                  <span className="ml-1 text-[11px] text-subtle">
                    {overridden ? 'tuỳ chỉnh' : 'mặc định'}
                  </span>
                </span>
                {overridden ? (
                  <button
                    type="button"
                    onClick={() => resetColor(key)}
                    aria-label={`Đặt lại màu ${PALETTE_LABELS[key].toLowerCase()}`}
                    className="rounded-lg p-1 text-muted hover:bg-surface-muted"
                  >
                    <RotateCcw className="h-3.5 w-3.5" aria-hidden="true" />
                  </button>
                ) : null}
              </div>
            )
          })}
        </div>
      </fieldset>

      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
        <div>
          <label
            htmlFor="design-furnishing"
            className="mb-1 block text-xs font-semibold text-fg"
          >
            Mức nội thất
          </label>
          <select
            id="design-furnishing"
            className={inputClass}
            value={draft.furnishing}
            onChange={event =>
              set('furnishing', event.target.value as DesignDraft['furnishing'])
            }
          >
            {(
              Object.keys(FURNISHING_LABELS) as DesignDraft['furnishing'][]
            ).map(level => (
              <option key={level} value={level}>
                {FURNISHING_LABELS[level]}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label
            htmlFor="design-hour"
            className="mb-1 flex justify-between text-xs font-semibold text-fg"
          >
            <span>Giờ mở đầu</span>
            <span className="text-muted">
              {String(hour).padStart(2, '0')}:{String(minutes).padStart(2, '0')}
            </span>
          </label>
          <input
            id="design-hour"
            type="range"
            min={6}
            max={18}
            step={0.25}
            value={draft.defaultHour}
            onChange={event => set('defaultHour', Number(event.target.value))}
            className="w-full accent-[color:var(--primary)]"
          />
        </div>
      </div>

      <fieldset>
        <legend className="mb-1 text-xs font-semibold text-fg">
          Bố cục đồ nội thất
        </legend>
        <div className="rounded-xl border border-border p-3 text-xs text-muted">
          <p>
            Bấm <b className="text-fg">Chỉnh bố cục</b> trong khung xem trước,
            kéo đồ để dời, xoay, ẩn/hiện hoặc thêm đồ từ danh mục. Bố cục lưu
            riêng cho thiết kế này.
          </p>
          <p className="mt-2 flex items-center justify-between gap-2">
            <span data-testid="layout-summary">
              {isLayoutEmpty(draft.layout)
                ? 'Đang dùng bố cục mẫu'
                : (() => {
                    const s = summarizeLayout(draft.layout)
                    return `${s.adjusted} đồ đã chỉnh · ${s.hidden} đang ẩn · ${s.added} đồ thêm`
                  })()}
            </span>
            {isLayoutEmpty(draft.layout) ? null : (
              <button
                type="button"
                onClick={() => set('layout', emptyLayout())}
                className="shrink-0 rounded-lg border border-border px-2 py-1 font-semibold text-fg hover:bg-surface-muted"
              >
                Đặt lại bố cục
              </button>
            )}
          </p>
        </div>
      </fieldset>

      <label className="flex items-center gap-2 text-xs font-semibold text-fg">
        <input
          type="checkbox"
          checked={draft.visible}
          onChange={event => set('visible', event.target.checked)}
        />
        Hiển thị cho người xem
      </label>

      <div className="flex gap-2 pt-1">
        <button
          type="submit"
          disabled={saving || !draft.name.trim()}
          className="flex-1 rounded-xl bg-primary px-4 py-2.5 text-xs font-bold text-white transition hover:bg-primary-hover disabled:opacity-50"
        >
          {saving ? 'Đang lưu...' : draft.id ? 'Lưu thay đổi' : 'Thêm thiết kế'}
        </button>
        <button
          type="button"
          onClick={onCancel}
          className="rounded-xl border border-border px-4 py-2.5 text-xs font-semibold text-muted hover:bg-surface-muted"
        >
          Huỷ
        </button>
      </div>
    </form>
  )
}
