'use client'

import * as React from 'react'
import Link from 'next/link'
import type { Route } from 'next'
import { formatRentPrice, formatRentPriceCompact } from '@/entities/properties'
import 'leaflet/dist/leaflet.css'

function escapeHtml(value: string): string {
  return value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;')
}

export const PROPERTY_MAP_TILE_URL =
  'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'
export const PROPERTY_MAP_ATTRIBUTION =
  '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'

interface PropertiesMapProps {
  activeTab: 'single' | 'project'
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  filteredApartments: any[]
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  filteredProjects: any[]
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  selectedMapApt: any
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  setSelectedMapApt: (apt: any) => void
}

// Helper to generate deterministic coordinates from alphanumeric string IDs
function getDeterministicCoords(id: string | number, index: number) {
  let hash = 0
  const str = String(id || index)
  for (let i = 0; i < str.length; i++) {
    hash = str.charCodeAt(i) + ((hash << 5) - hash)
  }
  const latSeed = Math.sin(hash) * 0.012
  const lngSeed = Math.cos(hash + 1) * 0.015
  return {
    lat: 10.7769 + latSeed,
    lng: 106.7009 + lngSeed,
  }
}

export function PropertiesMap({
  activeTab,
  filteredApartments,
  filteredProjects,
  selectedMapApt,
  setSelectedMapApt,
}: PropertiesMapProps): React.ReactElement {
  const mapRef = React.useRef<HTMLDivElement>(null)
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const leafletMapRef = React.useRef<any>(null)
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const markersRef = React.useRef<any[]>([])

  React.useEffect(() => {
    if (typeof window === 'undefined' || !mapRef.current) return

    let isMounted = true

    // Dynamically import Leaflet to support Next.js SSR
    import('leaflet').then(L => {
      if (!isMounted || !mapRef.current) return

      // Clean up previous map instance if any
      if (leafletMapRef.current) {
        leafletMapRef.current.remove()
        leafletMapRef.current = null
      }

      // HCMC center coordinates: [10.7769, 106.7009]
      const map = L.map(mapRef.current, {
        zoomControl: false,
      }).setView([10.7769, 106.7009], 13)

      leafletMapRef.current = map

      // Use public OpenStreetMap tiles so the map works without a provider API key.
      L.tileLayer(PROPERTY_MAP_TILE_URL, {
        attribution: PROPERTY_MAP_ATTRIBUTION,
        maxZoom: 19,
      }).addTo(map)

      // Add custom zoom controls on bottom right
      L.control
        .zoom({
          position: 'bottomright',
        })
        .addTo(map)

      // Render pins based on activeTab
      const items =
        activeTab === 'single' ? filteredApartments : filteredProjects

      // Clear old markers
      markersRef.current.forEach(m => m.remove())
      markersRef.current = []

      items.forEach((item, index) => {
        // Generate coordinates around HCMC using deterministic math
        const { lat, lng } = getDeterministicCoords(item.id, index)

        const labelText = escapeHtml(
          String(
            activeTab === 'single'
              ? formatRentPriceCompact(item.priceNum, item.price)
              : item.title
          )
        )
        const colorClass =
          activeTab === 'single' ? 'bg-[#C65A3A]' : 'bg-[#10B981]'
        const arrowColorClass =
          activeTab === 'single' ? 'bg-[#C65A3A]' : 'bg-[#10B981]'

        const size: [number, number] =
          activeTab === 'single' ? [100, 34] : [140, 34]
        const anchor: [number, number] =
          activeTab === 'single' ? [50, 34] : [70, 34]

        const customIcon = L.divIcon({
          className: 'custom-leaflet-marker',
          html: `
            <div class="relative flex flex-col items-center">
              <div class="px-2.5 py-1 rounded-full shadow-lg text-white text-[9px] font-bold ${colorClass} border border-white whitespace-nowrap cursor-pointer hover:scale-105 transition-transform truncate max-w-full">${labelText}</div>
              <div class="w-1.5 h-1.5 ${arrowColorClass} rotate-45 -mt-1 shadow-sm border-r border-b border-white"></div>
            </div>
          `,
          iconSize: size,
          iconAnchor: anchor,
        })

        const marker = L.marker([lat, lng], { icon: customIcon }).addTo(map)

        marker.on('click', () => {
          setSelectedMapApt(item)
          map.setView([lat, lng], 14, { animate: true })
        })

        markersRef.current.push(marker)
      })

      // Fit bounds if we have items
      if (items.length > 0) {
        const coords = items.map((item, index) => {
          const { lat, lng } = getDeterministicCoords(item.id, index)
          return L.latLng(lat, lng)
        })
        const bounds = L.latLngBounds(coords)
        map.fitBounds(bounds, { padding: [50, 50] })
      }
    })

    return () => {
      isMounted = false
      if (leafletMapRef.current) {
        leafletMapRef.current.remove()
        leafletMapRef.current = null
      }
    }
  }, [activeTab, filteredApartments, filteredProjects, setSelectedMapApt])

  return (
    <div className="relative border border-border rounded-3xl overflow-hidden h-[500px] bg-[#E5E9F0] shadow-sm flex flex-1">
      {/* Map container */}
      <div ref={mapRef} className="absolute inset-0 z-0 w-full h-full" />

      {/* Pin Detail Popup Overlay */}
      {selectedMapApt && (
        <div className="absolute bottom-5 left-5 z-[1000] bg-white/95 backdrop-blur-md border border-border rounded-2xl p-4 shadow-2xl max-w-[280px] md:max-w-sm animate-fade-in space-y-3 border-l-4 border-l-primary">
          <div className="flex justify-between items-start gap-4">
            <div>
              <span className="text-[10px] font-bold text-primary uppercase tracking-wider">
                {selectedMapApt.category || 'Căn hộ'}
              </span>
              <h4 className="font-marketing text-xs font-bold text-fg line-clamp-2 leading-relaxed">
                {selectedMapApt.title || selectedMapApt.name}
              </h4>
              <p className="text-xs text-primary font-extrabold mt-1">
                {formatRentPrice(
                  selectedMapApt.priceNum,
                  selectedMapApt.price || selectedMapApt.priceRange
                )}
              </p>
            </div>
            <button
              onClick={() => setSelectedMapApt(null)}
              className="text-muted hover:text-fg text-xs font-bold p-1 cursor-pointer hover:bg-surface-muted rounded-lg shrink-0 transition-colors"
            >
              <svg
                className="h-3.5 w-3.5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth="2.5"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M6 18 18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>
          <div className="flex gap-2">
            <Link
              href={`/properties/${selectedMapApt.id}` as Route}
              className="flex-1"
            >
              <button className="w-full bg-primary text-white text-[10px] font-bold rounded-lg py-2 hover:bg-primary-hover active:scale-95 transition-colors cursor-pointer shadow-sm">
                Xem chi tiết
              </button>
            </Link>
          </div>
        </div>
      )}
    </div>
  )
}
