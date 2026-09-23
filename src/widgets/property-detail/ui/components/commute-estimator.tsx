'use client'

import * as React from 'react'
import { CommuteExplainModal } from './commute-explain-modal'

type Coordinates = [number, number]

function getCoordsForDistrict(district?: string): Coordinates | null {
  if (!district) return null
  const d = district.toLowerCase()
  if (d.includes('quận 7') || d.includes('quan 7') || d.includes('7')) {
    return [10.7554, 106.7025]
  }
  if (
    d.includes('thủ đức') ||
    d.includes('thu duc') ||
    d.includes('quận 2') ||
    d.includes('quan 2') ||
    d.includes('quận 9')
  ) {
    return [10.7981, 106.7456]
  }
  if (d.includes('quận 1') || d.includes('quan 1')) {
    return [10.7769, 106.7009]
  }
  return null
}

export interface CommuteEstimatorProps {
  property?: {
    district?: string
    title?: string
  }
}

const PRESETS = [
  {
    id: 'Q1',
    name: 'Quận 1 (Trung tâm)',
    coords: [10.7769, 106.7009] as [number, number],
  },
  {
    id: 'Q3',
    name: 'Quận 3 (Hồ Con Rùa)',
    coords: [10.7828, 106.6958] as [number, number],
  },
  {
    id: 'Q9',
    name: 'Quận 9 (Khu CNC)',
    coords: [10.8444, 106.7979] as [number, number],
  },
  {
    id: 'TD',
    name: 'Thủ Đức (Đại học QG)',
    coords: [10.8747, 106.8028] as [number, number],
  },
  {
    id: 'TSN',
    name: 'Sân bay Tân Sơn Nhất',
    coords: [10.8184, 106.6644] as [number, number],
  },
]

function calculateDistance(
  lat1: number,
  lon1: number,
  lat2: number,
  lon2: number
): number {
  const R = 6371 // Radius of the earth in km
  const dLat = ((lat2 - lat1) * Math.PI) / 180
  const dLon = ((lon2 - lon1) * Math.PI) / 180
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos((lat1 * Math.PI) / 180) *
      Math.cos((lat2 * Math.PI) / 180) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2)
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a))
  const d = R * c
  return d
}

function getTransitTimes(distance: number) {
  return {
    motor: {
      normal: Math.max(2, Math.round((distance / 28) * 60) + 1),
      peak: Math.max(4, Math.round((distance / 16) * 60) + 3),
    },
    car: {
      normal: Math.max(3, Math.round((distance / 24) * 60) + 2),
      peak: Math.max(6, Math.round((distance / 12) * 60) + 4),
    },
    metro: {
      normal: Math.max(1, Math.round((distance / 45) * 60) + 3),
      peak: Math.max(1, Math.round((distance / 45) * 60) + 3), // traffic-free
    },
    bus: {
      normal: Math.max(5, Math.round((distance / 18) * 60) + 5),
      peak: Math.max(10, Math.round((distance / 10) * 60) + 8),
    },
  }
}

export function CommuteEstimator({
  property,
}: CommuteEstimatorProps = {}): React.ReactElement {
  const aptCoords = React.useMemo(
    () => getCoordsForDistrict(property?.district),
    [property?.district]
  )
  const [mapLoaded, setMapLoaded] = React.useState(false)
  const initialDist = React.useMemo(() => {
    if (!aptCoords) return 0
    return Number(
      calculateDistance(
        aptCoords[0],
        aptCoords[1],
        PRESETS[0]!.coords[0],
        PRESETS[0]!.coords[1]
      ).toFixed(1)
    )
  }, [aptCoords])
  const [distanceKm, setDistanceKm] = React.useState<number>(initialDist)
  const [selectedPreset, setSelectedPreset] = React.useState<string>('Q1')

  const mapContainerRef = React.useRef<HTMLDivElement>(null)
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const mapInstanceRef = React.useRef<any>(null)
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const destMarkerRef = React.useRef<any>(null)
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const polylineRef = React.useRef<any>(null)

  // 1. Load Leaflet CSS and JS Dynamically on client-side
  React.useEffect(() => {
    if (typeof window === 'undefined' || !aptCoords) return

    const linkId = 'leaflet-css'
    if (!document.getElementById(linkId)) {
      const link = document.createElement('link')
      link.id = linkId
      link.rel = 'stylesheet'
      link.href = 'https://unpkg.com/leaflet@1.9.4/dist/leaflet.css'
      document.head.appendChild(link)
    }

    const scriptId = 'leaflet-js'
    if (!document.getElementById(scriptId)) {
      const script = document.createElement('script')
      script.id = scriptId
      script.src = 'https://unpkg.com/leaflet@1.9.4/dist/leaflet.js'
      script.onload = (): void => {
        setMapLoaded(true)
      }
      document.head.appendChild(script)
    } else {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      if ((window as any).L) {
        // eslint-disable-next-line react-hooks/set-state-in-effect
        setMapLoaded(true)
      }
    }
  }, [aptCoords])

  // 2. Initialize and Manage Map Instance
  React.useEffect(() => {
    if (
      !aptCoords ||
      !mapLoaded ||
      !mapContainerRef.current ||
      typeof window === 'undefined'
    )
      return
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const L = (window as any).L
    if (!L) return

    // Avoid double initialization
    if (mapInstanceRef.current) return

    // Initialize Map
    const map = L.map(mapContainerRef.current, {
      zoomControl: true,
      scrollWheelZoom: false,
    }).setView(aptCoords, 12)
    mapInstanceRef.current = map

    // CartoDB Positron Premium Light Tiles
    L.tileLayer(
      'https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png',
      {
        attribution: '&copy; OpenStreetMap contributors &copy; CARTO',
        subdomains: 'abcd',
        maxZoom: 20,
      }
    ).addTo(map)

    // Custom CSS-based HTML DivIcons
    const aptIcon = L.divIcon({
      html: `
        <div class="flex items-center justify-center">
          <div class="h-9 w-9 rounded-full bg-primary flex items-center justify-center shadow-lg border-2 border-white animate-bounce-subtle">
            <svg class="h-4.5 w-4.5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2.5">
              <path stroke-linecap="round" stroke-linejoin="round" d="m2.25 12 8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25" />
            </svg>
          </div>
        </div>
      `,
      className: '',
      iconSize: [36, 36],
      iconAnchor: [18, 36],
    })

    const destIcon = L.divIcon({
      html: `
        <div class="flex items-center justify-center">
          <div class="h-9 w-9 rounded-full bg-accent flex items-center justify-center shadow-lg border-2 border-white">
            <svg class="h-4.5 w-4.5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2.5">
              <path stroke-linecap="round" stroke-linejoin="round" d="M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
              <path stroke-linecap="round" stroke-linejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25s-7.5-4.108-7.5-11.25a7.5 7.5 0 1 1 15 0Z" />
            </svg>
          </div>
        </div>
      `,
      className: '',
      iconSize: [36, 36],
      iconAnchor: [18, 36],
    })

    // Add Markers
    const aptLabel = property?.title ? property.title : 'Vị trí căn hộ'
    L.marker(aptCoords, { icon: aptIcon })
      .addTo(map)
      .bindPopup(`<b>${aptLabel}</b>`)
      .openPopup()

    const initialPreset = PRESETS[0]
    if (!initialPreset) return

    const destMarker = L.marker(initialPreset.coords, {
      icon: destIcon,
      draggable: true,
    }).addTo(map)
    destMarkerRef.current = destMarker

    // Connection Polyline
    const polyline = L.polyline([aptCoords, initialPreset.coords], {
      color: '#C65A3A',
      weight: 3,
      dashArray: '6, 8',
      opacity: 0.8,
    }).addTo(map)
    polylineRef.current = polyline

    // Trigger state synchronization helper
    const syncState = (latlng: { lat: number; lng: number }): void => {
      const dist = calculateDistance(
        aptCoords[0],
        aptCoords[1],
        latlng.lat,
        latlng.lng
      )
      setDistanceKm(Number(dist.toFixed(1)))
      destMarker.setLatLng(latlng)
      polyline.setLatLngs([aptCoords, latlng])
    }

    // Map click selection
    map.on('click', (e: { latlng: { lat: number; lng: number } }): void => {
      syncState(e.latlng)
      setSelectedPreset('') // Clear preset highlights since user clicked custom location
    })

    // Drag-and-drop marker support
    destMarker.on(
      'drag',
      (e: {
        target: { getLatLng: () => { lat: number; lng: number } }
      }): void => {
        polyline.setLatLngs([aptCoords, e.target.getLatLng()])
      }
    )
    destMarker.on(
      'dragend',
      (e: {
        target: { getLatLng: () => { lat: number; lng: number } }
      }): void => {
        syncState(e.target.getLatLng())
        setSelectedPreset('')
      }
    )

    // Cleanup on unmount
    return (): void => {
      if (mapInstanceRef.current) {
        mapInstanceRef.current.remove()
        mapInstanceRef.current = null
      }
    }
  }, [mapLoaded, aptCoords, property?.title])

  // Preset Selection Action
  const handlePresetSelect = (presetId: string, coords: Coordinates): void => {
    if (!aptCoords) return
    setSelectedPreset(presetId)
    const dist = calculateDistance(
      aptCoords[0],
      aptCoords[1],
      coords[0],
      coords[1]
    )
    setDistanceKm(Number(dist.toFixed(1)))

    if (
      destMarkerRef.current &&
      polylineRef.current &&
      mapInstanceRef.current
    ) {
      destMarkerRef.current.setLatLng(coords)
      polylineRef.current.setLatLngs([aptCoords, coords])
      mapInstanceRef.current.panTo(coords)
    }
  }

  // Calculate transit parameters based on dynamic distance
  const times = React.useMemo(() => getTransitTimes(distanceKm), [distanceKm])

  const [showExplain, setShowExplain] = React.useState(false)

  if (!aptCoords) {
    return (
      <div className="bg-white border border-border rounded-3xl p-4 md:p-5 shadow-sm">
        <p className="text-sm font-semibold text-muted-foreground">
          Chưa có tọa độ cho vị trí căn hộ này.
        </p>
      </div>
    )
  }

  return (
    <div className="bg-white border border-border rounded-3xl p-4 md:p-5 shadow-sm space-y-4">
      <div className="space-y-1">
        <h3 className="font-marketing text-xl font-bold text-fg flex items-center justify-between gap-2">
          <div className="flex items-center gap-2">
            <span className="h-2.5 w-2.5 rounded-full bg-primary" />
            Ước tính thời gian và chi phí di chuyển (Commute Estimator)
          </div>
          <button
            onClick={() => setShowExplain(true)}
            className="text-muted-foreground hover:text-primary transition-colors cursor-pointer p-1"
            title="Xem giải thích thuật toán tính toán"
          >
            <svg className="h-5 w-5" viewBox="0 0 24 24">
              <circle
                cx="12"
                cy="12"
                r="9"
                stroke="currentColor"
                strokeWidth="2"
                fill="none"
              />
              <circle cx="12" cy="8.2" r="1.2" fill="currentColor" />
              <line
                x1="12"
                y1="11.5"
                x2="12"
                y2="16.5"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
              />
            </svg>
          </button>
        </h3>
        <p className="font-body text-sm text-muted-foreground font-medium leading-relaxed">
          Tương tác trực quan bằng cách bấm chọn điểm đến trên bản đồ hoặc chọn
          điểm lưu nhanh để tính toán chi tiết.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 border border-border rounded-2xl p-4 md:p-6 bg-surface-muted/20">
        {/* Left Side: Interactive Map Container */}
        <div className="lg:col-span-5 flex flex-col gap-3">
          <div className="relative w-full h-[280px] lg:h-[340px] rounded-2xl overflow-hidden border border-border bg-white shadow-inner z-10">
            {!mapLoaded && (
              <div className="absolute inset-0 flex items-center justify-center bg-surface-muted text-xs font-semibold text-muted-foreground">
                Đang tải bản đồ tương tác...
              </div>
            )}
            <div ref={mapContainerRef} className="w-full h-full" />
          </div>
          <span className="text-[11px] font-bold text-muted-foreground leading-relaxed">
            * Kéo ghim Cam hoặc bấm điểm bất kỳ trên bản đồ để cập nhật khoảng
            cách thực tế.
          </span>
        </div>

        {/* Right Side: Travel Calculations and Presets */}
        <div className="lg:col-span-7 flex flex-col justify-between space-y-6">
          {/* Preset Location Chips */}
          <div className="space-y-3">
            <span className="text-xs font-extrabold text-fg uppercase tracking-wider block">
              Điểm đến thường dùng:
            </span>
            <div className="flex flex-wrap gap-2">
              {PRESETS.map(preset => (
                <button
                  key={preset.id}
                  onClick={() => handlePresetSelect(preset.id, preset.coords)}
                  className={`text-xs font-bold px-3.5 py-2.5 rounded-xl border transition-all active:scale-95 cursor-pointer ${
                    selectedPreset === preset.id
                      ? 'bg-primary border-primary text-white shadow-sm'
                      : 'bg-white border-border/80 text-fg hover:bg-surface-muted'
                  }`}
                >
                  {preset.name}
                </button>
              ))}
            </div>
          </div>

          {/* Current Distance Display Card */}
          <div className="bg-white border border-border/60 rounded-2xl p-4 flex items-center justify-between shadow-sm">
            <span className="text-xs font-extrabold text-muted-foreground uppercase tracking-wider">
              Khoảng cách đường chim bay:
            </span>
            <div className="flex items-baseline gap-1">
              <span className="text-2xl font-display font-black text-primary">
                {distanceKm}
              </span>
              <span className="text-xs font-extrabold text-primary uppercase">
                km
              </span>
            </div>
          </div>

          {/* Transit Estimates List */}
          <div className="space-y-4">
            {[
              { label: 'Xe máy', times: times.motor, color: 'bg-primary' },
              { label: 'Xe ô tô / Taxi', times: times.car, color: 'bg-accent' },
              {
                label: 'Tàu điện Metro (Dự kiến)',
                times: times.metro,
                color: 'bg-success',
              },
              {
                label: 'Xe Bus công cộng',
                times: times.bus,
                color: 'bg-muted-foreground/60',
              },
            ].map((vehicle, idx) => (
              <div key={idx} className="space-y-1.5">
                <div className="flex justify-between items-center text-xs font-bold text-fg">
                  <span>{vehicle.label}</span>
                  <span className="font-mono text-xs text-muted-foreground font-semibold">
                    {vehicle.times.normal} phút (Dự kiến - Thấp điểm) /{' '}
                    <span className="text-danger font-extrabold">
                      {vehicle.times.peak} phút
                    </span>{' '}
                    (Dự kiến - Cao điểm)
                  </span>
                </div>
                {/* Visual Progress Bar */}
                <div className="h-3 w-full bg-white border border-border rounded-full overflow-hidden flex shadow-inner">
                  <div
                    style={{
                      width: `${Math.min(vehicle.times.normal * 1.2, 50)}%`,
                    }}
                    className={`h-full ${vehicle.color}`}
                  />
                  <div
                    style={{
                      width: `${Math.min((vehicle.times.peak - vehicle.times.normal) * 1.2, 50)}%`,
                    }}
                    className="h-full bg-danger/40"
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <CommuteExplainModal
        isOpen={showExplain}
        onClose={() => setShowExplain(false)}
      />
    </div>
  )
}
