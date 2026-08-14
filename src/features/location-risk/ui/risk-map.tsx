'use client'

import 'leaflet/dist/leaflet.css'
import * as React from 'react'
import type { RiskLayerItem } from '../api/location-risk-api'

export function RiskMap({
  layers,
}: {
  layers: RiskLayerItem[]
}): React.ReactElement {
  const containerRef = React.useRef<HTMLDivElement>(null)

  React.useEffect(() => {
    const container = containerRef.current
    if (!container || layers.length === 0) return
    let active = true
    let destroy: (() => void) | undefined

    void import('leaflet').then(L => {
      if (!active || !containerRef.current) return
      const map = L.map(containerRef.current, {
        zoomControl: true,
        attributionControl: false,
      })
      const dangerColor =
        getComputedStyle(container).getPropertyValue('--danger')
      const group = L.featureGroup()
      layers.forEach(layer => {
        if (!layer.geoJson) return
        L.geoJSON(layer.geoJson as unknown as Parameters<typeof L.geoJSON>[0], {
          style: {
            color: dangerColor,
            fillColor: dangerColor,
            fillOpacity: Math.max(0.12, layer.severity / 125),
            weight: 2,
          },
        })
          .bindTooltip(`${layer.layerType}: ${layer.severity}/100`)
          .addTo(group)
      })
      group.addTo(map)
      if (group.getLayers().length > 0) map.fitBounds(group.getBounds())
      destroy = () => map.remove()
    })

    return () => {
      active = false
      destroy?.()
    }
  }, [layers])

  return (
    <div
      ref={containerRef}
      className="h-64 overflow-hidden rounded-2xl border border-border bg-surface-muted"
      aria-label="Bản đồ lớp rủi ro có dữ liệu hình học"
    />
  )
}
