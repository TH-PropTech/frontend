'use client'

import * as React from 'react'
import { createPortal } from 'react-dom'

const APT_COORDS: [number, number] = [10.7947, 106.7218] // lat, lng of Vinhomes Central Park

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

export function CommuteEstimator(): React.ReactElement {
  const [mapLoaded, setMapLoaded] = React.useState(false)
  const [distanceKm, setDistanceKm] = React.useState<number>(5.8) // Default Q1 distance
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
    if (typeof window === 'undefined') return

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
  }, [])

  // 2. Initialize and Manage Map Instance
  React.useEffect(() => {
    if (!mapLoaded || !mapContainerRef.current || typeof window === 'undefined')
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
    }).setView(APT_COORDS, 12)
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
    L.marker(APT_COORDS, { icon: aptIcon })
      .addTo(map)
      .bindPopup('<b>Căn hộ Vinhomes Central Park</b>')
      .openPopup()

    const initialPreset = PRESETS[0]
    if (!initialPreset) return

    const destMarker = L.marker(initialPreset.coords, {
      icon: destIcon,
      draggable: true,
    }).addTo(map)
    destMarkerRef.current = destMarker

    // Connection Polyline
    const polyline = L.polyline([APT_COORDS, initialPreset.coords], {
      color: '#C65A3A',
      weight: 3,
      dashArray: '6, 8',
      opacity: 0.8,
    }).addTo(map)
    polylineRef.current = polyline

    // Trigger state synchronization helper
    const syncState = (latlng: { lat: number; lng: number }): void => {
      const dist = calculateDistance(
        APT_COORDS[0],
        APT_COORDS[1],
        latlng.lat,
        latlng.lng
      )
      setDistanceKm(Number(dist.toFixed(1)))
      destMarker.setLatLng(latlng)
      polyline.setLatLngs([APT_COORDS, latlng])
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
        polyline.setLatLngs([APT_COORDS, e.target.getLatLng()])
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
  }, [mapLoaded])

  // Preset Selection Action
  const handlePresetSelect = (
    presetId: string,
    coords: [number, number]
  ): void => {
    setSelectedPreset(presetId)
    const dist = calculateDistance(
      APT_COORDS[0],
      APT_COORDS[1],
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
      polylineRef.current.setLatLngs([APT_COORDS, coords])
      mapInstanceRef.current.panTo(coords)
    }
  }

  // Calculate transit parameters based on dynamic distance
  const times = React.useMemo(() => getTransitTimes(distanceKm), [distanceKm])

  const [showExplain, setShowExplain] = React.useState(false)
  const [mounted, setMounted] = React.useState(false)
  React.useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setMounted(true)
  }, [])

  return (
    <div className="bg-white border border-border rounded-3xl p-6 md:p-8 shadow-sm space-y-5">
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

      {mounted &&
        showExplain &&
        typeof window !== 'undefined' &&
        createPortal(
          <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/60 backdrop-blur-md p-4 transition-all duration-300">
            <div className="bg-white border border-border rounded-3xl max-w-lg w-full p-6 md:p-8 shadow-2xl relative space-y-5 animate-scale-up border-primary/20">
              <h4 className="font-marketing text-lg md:text-xl font-bold text-fg flex items-center gap-2 border-b border-border pb-3.5">
                <span className="h-2.5 w-2.5 rounded-full bg-primary animate-pulse" />
                Công thức ước tính thời gian di chuyển dự kiến
              </h4>

              <div className="space-y-4 max-h-[70vh] overflow-y-auto pr-1">
                <div className="space-y-1.5">
                  <span className="text-[10px] font-extrabold text-muted-foreground uppercase tracking-wider block">
                    Nguyên lý hoạt động:
                  </span>
                  <p className="text-xs text-fg-muted font-body leading-relaxed font-semibold">
                    Khoảng cách địa lý đường chim bay được tính toán tức thời
                    bằng công thức toán học bán kính Trái Đất (Haversine) từ tọa
                    độ GPS thực tế của tòa nhà đến điểm bạn kéo thả hoặc chỉ
                    định trên bản đồ Leaflet. Thời gian di chuyển dự kiến được
                    lập trình dựa trên tốc độ di chuyển trung bình thực tế tại
                    khu vực TP.HCM đối với từng loại phương tiện giao thông.
                  </p>
                </div>

                <div className="bg-surface-muted border border-border/80 rounded-2xl p-4 space-y-2 shadow-inner">
                  <span className="text-[10px] font-extrabold text-primary uppercase tracking-wider block">
                    Công thức tính toán:
                  </span>
                  <div className="font-mono text-xs text-primary font-bold leading-relaxed">
                    T_bình_thường = (Quãng_đường / Vận_tốc) * 60 phút
                    <br />
                    T_cao_điểm = T_bình_thường * Hệ_số_ùn_tắc_giao_thông
                  </div>
                </div>

                <div className="bg-success/5 border border-success/20 rounded-2xl p-4 space-y-1.5">
                  <span className="text-[10px] font-extrabold text-success uppercase tracking-wider block">
                    Ví dụ trực quan:
                  </span>
                  <p className="text-xs text-success/90 font-medium leading-relaxed font-body">
                    Ví dụ: Quãng đường từ căn hộ Vinhomes Central Park đến Quận
                    1 dài 5.8 km. Đi xe máy trong giờ thấp điểm mất khoảng 15
                    phút (vận tốc trung bình 28km/h). Trong giờ cao điểm kẹt xe
                    (7h30-8h30 sáng), do ùn tắc tại ngã tư Hàng Xanh và cầu Thị
                    Nghè, thời gian di chuyển dự kiến tăng thêm 75% lên thành 26
                    phút (Dự kiến).
                  </p>
                </div>

                <div className="space-y-2 pt-1">
                  <span className="text-[10px] font-extrabold text-muted-foreground uppercase tracking-wider block">
                    Tham số vận tốc & Hệ số giờ cao điểm:
                  </span>
                  <ul className="space-y-2 text-xs font-semibold text-fg-muted font-body pl-5 list-decimal leading-relaxed">
                    <li>
                      <span className="text-fg font-bold">Xe máy:</span> Tốc độ
                      bình thường 28km/h, giờ cao điểm kẹt xe tăng 75% thời gian
                      di chuyển.
                    </li>
                    <li>
                      <span className="text-fg font-bold">Xe ô tô / Taxi:</span>{' '}
                      Tốc độ bình thường 24km/h, giờ cao điểm kẹt xe tăng 100%
                      thời gian (gấp đôi) do đi chung làn ô tô ùn ứ.
                    </li>
                    <li>
                      <span className="text-fg font-bold">
                        Tàu điện Metro (Dự kiến):
                      </span>{' '}
                      Tốc độ 45km/h cố định hoàn toàn không bị ảnh hưởng bởi ùn
                      tắc mặt đất.
                    </li>
                    <li>
                      <span className="text-fg font-bold">
                        Xe Bus công cộng:
                      </span>{' '}
                      Tốc độ 18km/h, giờ cao điểm tăng 80% thời gian di chuyển
                      do thời gian dừng đón trả khách kéo dài.
                    </li>
                  </ul>
                </div>
              </div>

              <div className="flex justify-end pt-3 border-t border-border/60">
                <button
                  onClick={() => setShowExplain(false)}
                  className="bg-primary text-white text-xs font-bold px-5 py-3 rounded-xl hover:bg-primary/90 transition-all active:scale-95 cursor-pointer shadow-md shadow-primary/10"
                >
                  Đóng giải thích
                </button>
              </div>
            </div>
          </div>,
          document.body
        )}
    </div>
  )
}
