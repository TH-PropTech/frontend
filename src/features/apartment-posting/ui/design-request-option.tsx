'use client'

import * as React from 'react'
import { Checkbox } from '@/shared/ui/checkbox'
import { Textarea } from '@/shared/ui/textarea'

export const DESIGN_BRIEF_MAX = 2000

interface DesignRequestOptionProps {
  enabled: boolean
  brief: string
  onEnabledChange: (enabled: boolean) => void
  onBriefChange: (brief: string) => void
  disabled?: boolean
}

/** Tuỳ chọn gửi kèm yêu cầu thiết kế 3D khi đăng tin (không thuộc dữ liệu căn hộ). */
export function DesignRequestOption({
  enabled,
  brief,
  onEnabledChange,
  onBriefChange,
  disabled = false,
}: DesignRequestOptionProps): React.ReactElement {
  return (
    <section className="space-y-3 rounded-xl border border-border p-4">
      <h3 className="text-sm font-bold text-fg">
        Yêu cầu thiết kế 3D (tùy chọn)
      </h3>
      <div className="flex items-center gap-2">
        <Checkbox
          id="design-request-enabled"
          checked={enabled}
          disabled={disabled}
          onCheckedChange={checked => onEnabledChange(checked === true)}
        />
        <label htmlFor="design-request-enabled" className="text-sm">
          Gửi yêu cầu thiết kế 3D cho căn hộ này
        </label>
      </div>
      {enabled ? (
        <div>
          <label
            htmlFor="design-request-option-brief"
            className="text-xs font-bold text-fg"
          >
            Mô tả yêu cầu thiết kế
          </label>
          <Textarea
            id="design-request-option-brief"
            value={brief}
            maxLength={DESIGN_BRIEF_MAX}
            disabled={disabled}
            onChange={event => onBriefChange(event.target.value)}
            placeholder="Phong cách, màu sắc, bố trí nội thất mong muốn..."
            className="mt-1 min-h-24"
          />
          <p className="mt-1 text-right text-[11px] text-muted">
            {brief.length}/{DESIGN_BRIEF_MAX}
          </p>
        </div>
      ) : null}
    </section>
  )
}
