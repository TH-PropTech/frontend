'use client'

import * as React from 'react'
import { useRouter } from 'next/navigation'
import type { Route } from 'next'
import {
  Search,
  MapPin,
  BadgeDollarSign,
  BedDouble,
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
  { label: 'Bình Thạnh', value: 'Bình Thạnh' },
  { label: 'Quận 2', value: 'Quận 2' },
  { label: 'Quận 7', value: 'Quận 7' },
  { label: 'Quận 1', value: 'Quận 1' },
  { label: 'Thủ Đức', value: 'Thủ Đức' },
  { label: 'Cầu Giấy', value: 'Cầu Giấy' },
  { label: 'Nam Từ Liêm', value: 'Nam Từ Liêm' },
  { label: 'Phú Nhuận', value: 'Phú Nhuận' },
]

export const QUICK_SEARCH_PRICES: QuickSearchPriceOption[] = [
  { label: 'Tất cả mức giá', value: 'all', minPrice: '', maxPrice: '' },
  {
    label: 'Dưới 10 triệu',
    value: 'under-10',
    minPrice: '',
    maxPrice: '10',
  },
  {
    label: '10 – 15 triệu',
    value: '10-15',
    minPrice: '10',
    maxPrice: '15',
  },
  {
    label: '15 – 25 triệu',
    value: '15-25',
    minPrice: '15',
    maxPrice: '25',
  },
  {
    label: 'Trên 25 triệu',
    value: 'above-25',
    minPrice: '25',
    maxPrice: '',
  },
]

export const QUICK_SEARCH_BEDROOMS: QuickSearchBedroomOption[] = [
  { label: 'Tất cả loại phòng', value: 'all' },
  { label: '1 phòng ngủ', value: '1' },
  { label: '2 phòng ngủ', value: '2' },
  { label: '3 phòng ngủ', value: '3' },
  { label: '4+ phòng ngủ', value: '4' },
]

interface PopularSuggestion {
  label: string
  district?: string
  priceBracket?: string
  bedrooms?: string
}

export const POPULAR_SUGGESTIONS: PopularSuggestion[] = [
  { label: 'Quận 1', district: 'Quận 1' },
  { label: 'Bình Thạnh', district: 'Bình Thạnh' },
  { label: 'Dưới 10 triệu', priceBracket: 'under-10' },
  { label: '2 phòng ngủ', bedrooms: '2' },
  { label: '10 – 15 triệu', priceBracket: '10-15' },
]

export function HeroQuickSearchBar(): React.ReactElement {
  const router = useRouter()

  const [searchKeyword, setSearchKeyword] = React.useState<string>('')
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
    overrideBedroom?: string,
    overrideKeyword?: string
  ): void => {
    const keywordToUse =
      overrideKeyword !== undefined ? overrideKeyword : searchKeyword
    const districtToUse =
      overrideDistrict !== undefined ? overrideDistrict : selectedDistrict
    const priceToUse =
      overridePrice !== undefined ? overridePrice : selectedPrice
    const bedroomToUse =
      overrideBedroom !== undefined ? overrideBedroom : selectedBedroom

    const params = new URLSearchParams()

    if (keywordToUse && keywordToUse.trim()) {
      params.set('search', keywordToUse.trim())
    }

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

  const selectedPriceLabel =
    QUICK_SEARCH_PRICES.find(p => p.value === selectedPrice)?.label || 'Tất cả'

  const selectedBedroomLabel =
    QUICK_SEARCH_BEDROOMS.find(b => b.value === selectedBedroom)?.label ||
    'Tất cả'

  return (
    <div
      ref={containerRef}
      data-testid="hero-quick-search-bar"
      className="w-full max-w-6xl pt-2"
    >
      {/* Floating Pill Search Console - Explicit z-30 to stay above suggestions and siblings */}
      <div className="relative z-30 rounded-xl lg:rounded-2xl bg-white/95 backdrop-blur-md p-2 shadow-[0_20px_50px_rgba(0,0,0,0.22)] border border-white/40 flex flex-col lg:flex-row items-stretch lg:items-center gap-2 lg:gap-0">
        {/* Keyword Field */}
        <div className="relative flex-[1.3] min-w-0">
          <div className="flex items-center gap-2.5 px-3.5 py-2 rounded-lg text-left hover:bg-surface-muted/80 focus-within:bg-surface-muted/80 transition-colors">
            <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-primary-soft text-primary">
              <Search className="h-4 w-4" />
            </div>
            <div className="flex-1 min-w-0">
              <label
                htmlFor="hero-quick-search-keyword"
                className="block text-[10px] font-bold uppercase tracking-wider text-muted cursor-pointer"
              >
                Từ khóa
              </label>
              <input
                id="hero-quick-search-keyword"
                type="text"
                data-testid="quick-search-keyword-input"
                aria-label="Nhập từ khóa tìm kiếm căn hộ hoặc dự án"
                placeholder="Tên căn hộ, dự án, vị trí..."
                value={searchKeyword}
                onChange={e => setSearchKeyword(e.target.value)}
                onKeyDown={e => {
                  if (e.key === 'Enter') {
                    e.preventDefault()
                    executeSearch()
                  }
                }}
                className="w-full bg-transparent font-semibold text-xs sm:text-sm text-fg placeholder:text-subtle focus:outline-none truncate"
                autoComplete="off"
              />
            </div>
          </div>
        </div>

        {/* Divider on Desktop */}
        <div className="hidden lg:block w-px h-8 bg-border/60 shrink-0" />

        {/* District Field */}
        <div className="relative flex-1 min-w-0">
          <button
            type="button"
            data-testid="quick-search-district-trigger"
            aria-label="Chọn khu vực tìm kiếm"
            aria-expanded={openDropdown === 'district'}
            onClick={() =>
              setOpenDropdown(prev => (prev === 'district' ? null : 'district'))
            }
            className="w-full flex items-center gap-2.5 px-3.5 py-2 rounded-lg text-left hover:bg-surface-muted/80 transition-colors cursor-pointer"
          >
            <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-primary-soft text-primary">
              <MapPin className="h-4 w-4" />
            </div>
            <div className="flex-1 min-w-0">
              <span className="block text-[10px] font-bold uppercase tracking-wider text-muted">
                Khu vực
              </span>
              <span className="block truncate text-xs sm:text-sm font-semibold text-fg">
                {selectedDistrict || 'Tất cả'}
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
              ref={el => {
                if (el) el.scrollTop = 0
              }}
              data-testid="district-dropdown-menu"
              className="absolute left-0 top-full mt-2 w-full min-w-[220px] max-h-72 overflow-y-auto no-scrollbar z-[100] rounded-2xl border border-border bg-white dark:bg-surface p-1.5 shadow-[0_20px_50px_rgba(0,0,0,0.25)] animate-in fade-in slide-in-from-top-2 duration-150"
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
                      : 'text-fg hover:bg-surface-muted'
                  }`}
                >
                  {d.label}
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Divider on Desktop */}
        <div className="hidden lg:block w-px h-8 bg-border/60 shrink-0" />

        {/* Price Field */}
        <div className="relative flex-1 min-w-0">
          <button
            type="button"
            data-testid="quick-search-price-trigger"
            aria-label="Chọn khoảng giá"
            aria-expanded={openDropdown === 'price'}
            onClick={() =>
              setOpenDropdown(prev => (prev === 'price' ? null : 'price'))
            }
            className="w-full flex items-center gap-2.5 px-3.5 py-2 rounded-lg text-left hover:bg-surface-muted/80 transition-colors cursor-pointer"
          >
            <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-primary-soft text-primary">
              <BadgeDollarSign className="h-4 w-4" />
            </div>
            <div className="flex-1 min-w-0">
              <span className="block text-[10px] font-bold uppercase tracking-wider text-muted">
                Khoảng giá
              </span>
              <span className="block truncate text-xs sm:text-sm font-semibold text-fg">
                {selectedPrice === 'all' ? 'Tất cả' : selectedPriceLabel}
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
              ref={el => {
                if (el) el.scrollTop = 0
              }}
              data-testid="price-dropdown-menu"
              className="absolute left-0 top-full mt-2 w-full min-w-[220px] max-h-72 overflow-y-auto no-scrollbar z-[100] rounded-2xl border border-border bg-white dark:bg-surface p-1.5 shadow-[0_20px_50px_rgba(0,0,0,0.25)] animate-in fade-in slide-in-from-top-2 duration-150"
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
                      : 'text-fg hover:bg-surface-muted'
                  }`}
                >
                  {p.label}
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Divider on Desktop */}
        <div className="hidden lg:block w-px h-8 bg-border/60 shrink-0" />

        {/* Bedroom Field */}
        <div className="relative flex-1 min-w-0">
          <button
            type="button"
            data-testid="quick-search-bedrooms-trigger"
            aria-label="Chọn số phòng ngủ"
            aria-expanded={openDropdown === 'bedroom'}
            onClick={() =>
              setOpenDropdown(prev => (prev === 'bedroom' ? null : 'bedroom'))
            }
            className="w-full flex items-center gap-2.5 px-3.5 py-2 rounded-lg text-left hover:bg-surface-muted/80 transition-colors cursor-pointer"
          >
            <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-primary-soft text-primary">
              <BedDouble className="h-4 w-4" />
            </div>
            <div className="flex-1 min-w-0">
              <span className="block text-[10px] font-bold uppercase tracking-wider text-muted">
                Loại phòng
              </span>
              <span className="block truncate text-xs sm:text-sm font-semibold text-fg">
                {selectedBedroom === 'all' ? 'Tất cả' : selectedBedroomLabel}
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
              ref={el => {
                if (el) el.scrollTop = 0
              }}
              data-testid="bedroom-dropdown-menu"
              className="absolute left-0 top-full mt-2 w-full min-w-[220px] max-h-72 overflow-y-auto no-scrollbar z-[100] rounded-2xl border border-border bg-white dark:bg-surface p-1.5 shadow-[0_20px_50px_rgba(0,0,0,0.25)] animate-in fade-in slide-in-from-top-2 duration-150"
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
                      : 'text-fg hover:bg-surface-muted'
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
            className="w-full lg:w-auto h-11 px-5 lg:px-6 rounded-xl bg-primary hover:bg-primary-hover text-white font-bold text-xs sm:text-sm shadow-md hover:shadow-lg transition-all active:scale-95 flex items-center justify-center gap-2 cursor-pointer"
          >
            <Search className="h-4 w-4" />
            <span>Tìm kiếm</span>
          </button>
        </div>
      </div>

      {/* Popular Search Suggestions - Lower z-index so dropdowns always float on top */}
      <div className="relative z-10 mt-3 flex flex-wrap items-center gap-2 text-white/90">
        <span className="inline-flex items-center gap-1.5 font-body text-[11px] font-medium text-white/80">
          <Sparkles className="h-3.5 w-3.5 text-primary-soft" />
          Gợi ý nhanh:
        </span>
        {POPULAR_SUGGESTIONS.map(sug => (
          <button
            key={sug.label}
            type="button"
            data-testid={`suggestion-chip-${sug.label}`}
            onClick={() => {
              if (sug.district) {
                setSelectedDistrict(sug.district)
                executeSearch(sug.district, 'all', 'all', '')
              } else if (sug.priceBracket) {
                setSelectedPrice(sug.priceBracket)
                executeSearch('', sug.priceBracket, 'all', '')
              } else if (sug.bedrooms) {
                setSelectedBedroom(sug.bedrooms)
                executeSearch('', 'all', sug.bedrooms, '')
              }
            }}
            className="rounded-full bg-white/15 hover:bg-white/25 backdrop-blur-sm border border-white/25 px-3 py-1 text-[11px] font-medium text-white transition-all hover:scale-105 active:scale-95 cursor-pointer"
          >
            {sug.label}
          </button>
        ))}
      </div>
    </div>
  )
}
