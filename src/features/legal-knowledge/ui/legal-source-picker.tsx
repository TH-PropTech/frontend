'use client'

import * as React from 'react'
import { getAdminLegalSources } from '@/features/contracts'

export interface LegalSourcePickerProps {
  onPick: (source: { url: string; title: string }) => void
}

/** Lists the existing legal sources (contracts module) so the admin can reuse their link. Renders nothing on failure or when empty. */
export function LegalSourcePicker({
  onPick,
}: LegalSourcePickerProps): React.ReactElement | null {
  const [sources, setSources] = React.useState<
    { key: string; title: string; url: string }[]
  >([])

  React.useEffect(() => {
    let active = true
    getAdminLegalSources()
      .then(rows => {
        if (!active) return
        setSources(
          rows
            .filter(row => row.externalUrl)
            .map(row => ({
              key: row.key,
              title: row.title,
              url: row.externalUrl,
            }))
        )
      })
      .catch(() => {
        if (active) setSources([])
      })
    return () => {
      active = false
    }
  }, [])

  if (sources.length === 0) return null

  return (
    <label className="flex flex-col gap-1 text-xs font-semibold text-muted sm:max-w-xs">
      Chọn từ nguồn có sẵn
      <select
        defaultValue=""
        onChange={event => {
          const picked = sources.find(item => item.key === event.target.value)
          if (picked) onPick({ url: picked.url, title: picked.title })
        }}
        className="rounded-lg border border-border bg-surface px-3 py-2 text-sm font-normal text-fg focus:outline-none focus:ring-2 focus:ring-primary/30"
      >
        <option value="">— Chọn nguồn —</option>
        {sources.map(item => (
          <option key={item.key} value={item.key}>
            {item.title}
          </option>
        ))}
      </select>
    </label>
  )
}
