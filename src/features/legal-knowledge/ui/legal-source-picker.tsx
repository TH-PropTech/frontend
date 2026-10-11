'use client'

import * as React from 'react'
import { getAdminLegalSources } from '@/features/contracts'
import { FilterAutocomplete } from '@/shared/ui/filter-autocomplete'

export interface LegalSourcePickerProps {
  onPick: (source: { url: string; title: string }) => void
}

interface PickerSource {
  key: string
  title: string
  url: string
}

/** Lists the existing legal sources (contracts module) so the admin can reuse their link. Renders nothing on failure or when empty. */
export function LegalSourcePicker({
  onPick,
}: LegalSourcePickerProps): React.ReactElement | null {
  const [sources, setSources] = React.useState<PickerSource[]>([])
  const [picked, setPicked] = React.useState('')

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
    <FilterAutocomplete
      id="legal-source-picker"
      label="Chọn từ nguồn có sẵn"
      placeholder="Gõ để tìm nguồn..."
      className="sm:max-w-sm"
      value={picked}
      options={sources.map(item => ({
        value: item.key,
        label: item.title,
        sublabel: item.url,
      }))}
      onChange={key => {
        setPicked(key)
        const source = sources.find(item => item.key === key)
        if (source) onPick({ url: source.url, title: source.title })
      }}
    />
  )
}
