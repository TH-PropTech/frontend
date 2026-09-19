'use client'

import * as React from 'react'
import { useRouter } from 'next/navigation'
import type { Route } from 'next'
import {
  MapPin,
  BadgeDollarSign,
  BedDouble,
  Search,
  ChevronDown,
  Sparkles,
} from 'lucide-react'

export interface QuickSearchDistrictOption {
  label: string
  value: string
}

export interface QuickSearchPriceOption {
  label: string
  value: string
  minPrice: string
  maxPrice: string
}

export interface QuickSearchBedroomOption {
  label: string
  value: string
}

export const QUICK_SEARCH_DISTRICTS: QuickSearchDistrictOption[] = [
  { label: 'Tất cả khu vực', value: '' },
  { label: 'Quận 1', value: 'Quận 1' },
  { label: 'Quận 2', value: 'Quận 2' },
  { label: 'Quận 7', value: 'Quận 7' },
  { label: 'Bình Thạnh', value: 'Bình Thạnh' },
  { label: 'Thủ Đức', value: 'Thủ Đức' },
  { label: 'Phú Nhuận', value: 'Phú Nhuận' },
]

export const QUICK_SEARCH_PRICES: QuickSearchPriceOption[] = [
  { label: 'Tất cả mức giá', value: 'all', minPrice: '', maxPrice: '' },
  {
    label: 'Dưới 10 triệu',
    value: 'under-10',
    minPrice: '',
    maxPrice: '10000000',
  },
  {
    label: '10 – 15 triệu',
    value: '10-15',
    minPrice: '10000000',
    maxPrice: '15000000',
  },
  {
    label: '15 – 25 triệu',
    value: '15-25',
    minPrice: '15000000',
    maxPrice: '25000000',
  },
  {
    label: 'Trên 25 triệu',
    value: 'above-25',
    minPrice: '25000000',
    maxPrice: '',
  },
]

export const QUICK_SEARCH_BEDROOMS: QuickSearchBedroomOption[] = [
  { label: 'Tất cả loại phòng', value: 'all' },
  { label: '1 phòng ngủ', value: '1' },
  { label: '2 phòng ngủ', value: '2' },
  { label: '3+ phòng ngủ', value: '3' },
]

interface PopularSuggestion {
  label: string
  district?: string
  priceBracket?: string
  bedrooms?: string
}

export const POPULAR_SUGGESTIONS: PopularSuggestion[] = [
  { label: 'Quận 1', district: 'Quận 1' },
  { label: 'Dưới 10 triệu', priceBracket: 'under-10' },
  { label: '2 phòng ngủ', bedrooms: '2' },
  { label: 'Bình Thạnh', district: 'Bình Thạnh' },
  { label: '10 – 15 triệu', priceBracket: '10-15' },
]

export function HeroQuickSearchBar(): React.ReactElement {
  const router = useRouter()

  const [selectedDistrict, setSelectedDistrict] = React.useState<string>('')
  const [selectedPrice, setSelectedPrice] = React.useState<string>('all')
  const [selectedBedroom, setSelectedBedroom] = React.useState<string>('all')

  const [openDropdown, setOpenDropdown] = React.useState<
    'district' | 'price' | 'bedroom' | null
  >(null)

  const containerRef = React.useRef<HTMLDivElement>(null)

  React.useEffect(() => {
    const handleOutsideClick = (e: MouseEvent): void => {
      if (
        containerRef.current &&
        !containerRef.current.contains(e.target as Node)
      ) {
        setOpenDropdown(null)
      }
    }
    if (openDropdown) {
      document.addEventListener('mousedown', handleOutsideClick)
    }
    return () => {
      document.removeEventListener('mousedown', handleOutsideClick)
    }
  }, [openDropdown])

  const executeSearch = (
    overrideDistrict?: string,
    overridePrice?: string,
    overrideBedroom?: string
  ): void => {
    const districtToUse =
      overrideDistrict !== undefined ? overrideDistrict : selectedDistrict
    const priceToUse =
      overridePrice !== undefined ? overridePrice : selectedPrice
    const bedroomToUse =
      overrideBedroom !== undefined ? overrideBedroom : selectedBedroom

    const params = new URLSearchParams()

    if (districtToUse) {
      params.set('district', districtToUse)
    }

    const priceObj = QUICK_SEARCH_PRICES.find(p => p.value === priceToUse)
    if (priceObj) {
      if (priceObj.minPrice) params.set('minPrice', priceObj.minPrice)
      if (priceObj.maxPrice) params.set('maxPrice', priceObj.maxPrice)
    }

    if (bedroomToUse && bedroomToUse !== 'all') {
      params.set('bedrooms', bedroomToUse)
    }

    const queryString = params.toString()
    const targetUrl = queryString ? `/properties?${queryString}` : '/properties'
    router.push(targetUrl as Route)
  }

  const selectedDistrictLabel =
    QUICK_SEARCH_DISTRICTS.find(d => d.value === selectedDistrict)?.label ||
    'Tất cả khu vực'

  const selectedPriceLabel =
    QUICK_SEARCH_PRICES.find(p => p.value === selectedPrice)?.label ||
    'Tất cả mức giá'

  const selectedBedroomLabel =
    QUICK_SEARCH_BEDROOMS.find(b => b.value === selectedBedroom)?.label ||
    'Tất cả loại phòng'

  return (
    <div
      ref={containerRef}
      data-testid="hero-quick-search-bar"
      className="w-full max-w-4xl pt-2"
    >
      {/* Floating Pill Search Console */}
      <div className="relative rounded-2xl md:rounded-full bg-white/95 backdrop-blur-md p-2 shadow-[0_20px_50px_rgba(0,0,0,0.22)] border border-white/40 flex flex-col md:flex-row items-stretch md:items-center gap-2 md:gap-0">
        {/* District Field */}
        <div className="relative flex-1">
          <button
            type="button"
            data-testid="quick-search-district-trigger"
            aria-label="Chọn khu vực tìm kiếm"
            aria-expanded={openDropdown === 'district'}
            onClick={() =>
              setOpenDropdown(prev => (prev === 'district' ? null : 'district'))
            }
            className="w-full flex items-center gap-3 px-4 py-2.5 rounded-xl md:rounded-full text-left hover:bg-stone-100/70 transition-colors cursor-pointer"
          >
            <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-primary-soft text-primary">
              <MapPin className="h-4 w-4" />
            </div>
            <div className="flex-1 min-w-0">
              <span className="block text-[10px] font-bold uppercase tracking-wider text-muted">
                Khu vực
              </span>
              <span className="block truncate text-xs sm:text-sm font-semibold text-fg">
                {selectedDistrictLabel}
              </span>
            </div>
            <ChevronDown
              className={`h-4 w-4 text-muted shrink-0 transition-transform duration-200 ${
                openDropdown === 'district' ? 'rotate-180' : ''
              }`}
            />
          </button>

          {openDropdown === 'district' && (
            <div
              data-testid="district-dropdown-menu"
              className="absolute left-0 top-full mt-2 w-full min-w-[200px] z-50 rounded-2xl border border-border bg-white p-1.5 shadow-xl animate-in fade-in slide-in-from-top-2 duration-150"
            >
              {QUICK_SEARCH_DISTRICTS.map(d => (
                <button
                  key={d.value}
                  type="button"
                  data-testid={`district-option-${d.value || 'all'}`}
                  onClick={() => {
                    setSelectedDistrict(d.value)
                    setOpenDropdown(null)
                  }}
                  className={`w-full text-left px-3.5 py-2 text-xs font-semibold rounded-xl transition-colors cursor-pointer ${
                    selectedDistrict === d.value
                      ? 'bg-primary text-white'
                      : 'text-fg hover:bg-stone-100'
                  }`}
                >
                  {d.label}
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Divider on Desktop */}
        <div className="hidden md:block w-px h-8 bg-stone-200 shrink-0" />

        {/* Price Field */}
        <div className="relative flex-1">
          <button
            type="button"
            data-testid="quick-search-price-trigger"
            aria-label="Chọn khoảng giá"
            aria-expanded={openDropdown === 'price'}
            onClick={() =>
              setOpenDropdown(prev => (prev === 'price' ? null : 'price'))
            }
            className="w-full flex items-center gap-3 px-4 py-2.5 rounded-xl md:rounded-full text-left hover:bg-stone-100/70 transition-colors cursor-pointer"
          >
            <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-primary-soft text-primary">
              <BadgeDollarSign className="h-4 w-4" />
            </div>
            <div className="flex-1 min-w-0">
              <span className="block text-[10px] font-bold uppercase tracking-wider text-muted">
                Khoảng giá
              </span>
              <span className="block truncate text-xs sm:text-sm font-semibold text-fg">
                {selectedPriceLabel}
              </span>
            </div>
            <ChevronDown
              className={`h-4 w-4 text-muted shrink-0 transition-transform duration-200 ${
                openDropdown === 'price' ? 'rotate-180' : ''
              }`}
            />
          </button>

          {openDropdown === 'price' && (
            <div
              data-testid="price-dropdown-menu"
              className="absolute left-0 top-full mt-2 w-full min-w-[200px] z-50 rounded-2xl border border-border bg-white p-1.5 shadow-xl animate-in fade-in slide-in-from-top-2 duration-150"
            >
              {QUICK_SEARCH_PRICES.map(p => (
                <button
                  key={p.value}
                  type="button"
                  data-testid={`price-option-${p.value}`}
                  onClick={() => {
                    setSelectedPrice(p.value)
                    setOpenDropdown(null)
                  }}
                  className={`w-full text-left px-3.5 py-2 text-xs font-semibold rounded-xl transition-colors cursor-pointer ${
                    selectedPrice === p.value
                      ? 'bg-primary text-white'
                      : 'text-fg hover:bg-stone-100'
                  }`}
                >
                  {p.label}
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Divider on Desktop */}
        <div className="hidden md:block w-px h-8 bg-stone-200 shrink-0" />

        {/* Bedroom Field */}
        <div className="relative flex-1">
          <button
            type="button"
            data-testid="quick-search-bedrooms-trigger"
            aria-label="Chọn số phòng ngủ"
            aria-expanded={openDropdown === 'bedroom'}
            onClick={() =>
              setOpenDropdown(prev => (prev === 'bedroom' ? null : 'bedroom'))
            }
            className="w-full flex items-center gap-3 px-4 py-2.5 rounded-xl md:rounded-full text-left hover:bg-stone-100/70 transition-colors cursor-pointer"
          >
            <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-primary-soft text-primary">
              <BedDouble className="h-4 w-4" />
            </div>
            <div className="flex-1 min-w-0">
              <span className="block text-[10px] font-bold uppercase tracking-wider text-muted">
                Loại phòng
              </span>
              <span className="block truncate text-xs sm:text-sm font-semibold text-fg">
                {selectedBedroomLabel}
              </span>
            </div>
            <ChevronDown
              className={`h-4 w-4 text-muted shrink-0 transition-transform duration-200 ${
                openDropdown === 'bedroom' ? 'rotate-180' : ''
              }`}
            />
          </button>

          {openDropdown === 'bedroom' && (
            <div
              data-testid="bedroom-dropdown-menu"
              className="absolute left-0 top-full mt-2 w-full min-w-[200px] z-50 rounded-2xl border border-border bg-white p-1.5 shadow-xl animate-in fade-in slide-in-from-top-2 duration-150"
            >
              {QUICK_SEARCH_BEDROOMS.map(b => (
                <button
                  key={b.value}
                  type="button"
                  data-testid={`bedroom-option-${b.value}`}
                  onClick={() => {
                    setSelectedBedroom(b.value)
                    setOpenDropdown(null)
                  }}
                  className={`w-full text-left px-3.5 py-2 text-xs font-semibold rounded-xl transition-colors cursor-pointer ${
                    selectedBedroom === b.value
                      ? 'bg-primary text-white'
                      : 'text-fg hover:bg-stone-100'
                  }`}
                >
                  {b.label}
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Search CTA Button */}
        <div className="p-1 shrink-0">
          <button
            type="button"
            data-testid="quick-search-submit-button"
            onClick={() => executeSearch()}
            className="w-full md:w-auto h-11 px-6 rounded-xl md:rounded-full bg-primary hover:bg-primary-hover text-white font-bold text-xs sm:text-sm shadow-md hover:shadow-lg transition-all active:scale-95 flex items-center justify-center gap-2 cursor-pointer"
          >
            <Search className="h-4 w-4" />
            <span>Tìm kiếm</span>
          </button>
        </div>
      </div>

      {/* Popular Search Suggestions */}
      <div className="mt-3 flex flex-wrap items-center gap-2 text-white/90">
        <span className="inline-flex items-center gap-1 font-body text-[11px] font-medium text-white/80">
          <Sparkles className="h-3 w-3 text-amber-300" />
          Gợi ý nhanh:
        </span>
        {POPULAR_SUGGESTIONS.map(sug => (
          <button
            key={sug.label}
            type="button"
            data-testid={`suggestion-chip-${sug.label}`}
            onClick={() => {
              if (sug.district) setSelectedDistrict(sug.district)
              if (sug.priceBracket) setSelectedPrice(sug.priceBracket)
              if (sug.bedrooms) setSelectedBedroom(sug.bedrooms)
              executeSearch(sug.district, sug.priceBracket, sug.bedrooms)
            }}
            className="rounded-full bg-black/25 hover:bg-black/40 backdrop-blur-sm border border-white/20 px-2.5 py-1 text-[11px] font-medium text-white transition-all hover:scale-105 active:scale-95 cursor-pointer"
          >
            {sug.label}
          </button>
        ))}
      </div>
    </div>
  )
}
