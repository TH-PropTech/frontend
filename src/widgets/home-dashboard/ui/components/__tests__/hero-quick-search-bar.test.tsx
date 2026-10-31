import { render, screen, fireEvent } from '@testing-library/react'
import { describe, it, expect, vi, beforeEach } from 'vitest'
import * as React from 'react'
import { HeroQuickSearchBar } from '../hero-quick-search-bar'

const pushMock = vi.fn()

vi.mock('next/navigation', () => ({
  useRouter: () => ({
    push: pushMock,
  }),
}))

// Stand-in for the shared cascade modal (Radix Select is impractical in jsdom).
vi.mock(
  '@/widgets/properties-dashboard/ui/components/location-filter-modal',
  () => ({
    LocationFilterModal: (props: {
      onClose: () => void
      setSelectedCity: (v: string) => void
      setSelectedDistrict: (v: string) => void
      setSelectedWard: (v: string) => void
    }) => (
      <div data-testid="location-filter-modal-stub">
        <button
          type="button"
          data-testid="stub-pick-location"
          onClick={() => {
            props.setSelectedCity('Thành phố Hồ Chí Minh')
            props.setSelectedWard('Phường Bình Thạnh')
          }}
        >
          pick
        </button>
        <button type="button" onClick={props.onClose}>
          Xác nhận
        </button>
      </div>
    ),
  })
)

describe('HeroQuickSearchBar Component - 5 Dimensions Suite', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  // Dimension 1: Happy Path
  it('renders all 4 search selectors (keyword, district, price, bedroom) and navigates with filtered query params on submit (Happy Path)', () => {
    render(<HeroQuickSearchBar />)

    expect(screen.getByTestId('hero-quick-search-bar')).toBeInTheDocument()
    expect(screen.getByTestId('quick-search-keyword-input')).toBeInTheDocument()
    expect(
      screen.getByTestId('quick-search-district-trigger')
    ).toBeInTheDocument()
    expect(screen.getByTestId('quick-search-price-trigger')).toBeInTheDocument()
    expect(
      screen.getByTestId('quick-search-bedrooms-trigger')
    ).toBeInTheDocument()

    // 1. Enter Keyword "Vinhomes"
    const keywordInput = screen.getByTestId('quick-search-keyword-input')
    fireEvent.change(keywordInput, {
      target: { value: 'Vinhomes Central Park' },
    })
    expect(keywordInput).toHaveValue('Vinhomes Central Park')

    // 2. Select location through the shared cascade modal
    expect(
      screen.getByTestId('quick-search-district-trigger')
    ).toHaveTextContent('Toàn quốc')
    fireEvent.click(screen.getByTestId('quick-search-district-trigger'))
    fireEvent.click(screen.getByTestId('stub-pick-location'))
    fireEvent.click(screen.getByText('Xác nhận'))
    expect(
      screen.getByTestId('quick-search-district-trigger')
    ).toHaveTextContent('Thành phố Hồ Chí Minh • Phường Bình Thạnh')

    // 3. Select Price "10 – 15 triệu"
    fireEvent.click(screen.getByTestId('quick-search-price-trigger'))
    const priceOption = screen.getByTestId('price-option-10-15')
    fireEvent.click(priceOption)
    expect(screen.getByTestId('quick-search-price-trigger')).toHaveTextContent(
      '10 – 15 triệu'
    )

    // 4. Select Bedroom "2 phòng ngủ"
    fireEvent.click(screen.getByTestId('quick-search-bedrooms-trigger'))
    const bedroomOption = screen.getByTestId('bedroom-option-2')
    fireEvent.click(bedroomOption)
    expect(
      screen.getByTestId('quick-search-bedrooms-trigger')
    ).toHaveTextContent('2 phòng ngủ')

    // 5. Click Submit
    fireEvent.click(screen.getByTestId('quick-search-submit-button'))

    expect(pushMock).toHaveBeenCalledTimes(1)
    const pushedUrl = String(pushMock.mock.calls[0]?.[0] ?? '')
    expect(pushedUrl).toContain('/properties?')
    expect(pushedUrl).toContain('search=Vinhomes+Central+Park')
    const pushedParams = new URL(pushedUrl, 'http://x').searchParams
    expect(pushedParams.get('city')).toBe('Thành phố Hồ Chí Minh')
    expect(pushedParams.get('district')).toBeNull()
    expect(pushedParams.get('ward')).toBe('Phường Bình Thạnh')
    expect(pushedUrl).toContain('minPrice=10')
    expect(pushedUrl).toContain('maxPrice=15')
    expect(pushedUrl).toContain('bedrooms=2')
  })

  // Dimension 2: Boundary & Edge Cases
  it('navigates cleanly to /properties when submitted with default options and triggers search on Enter key (Boundary Case)', () => {
    render(<HeroQuickSearchBar />)

    // Submit with empty inputs
    fireEvent.click(screen.getByTestId('quick-search-submit-button'))
    expect(pushMock).toHaveBeenCalledTimes(1)
    expect(pushMock).toHaveBeenCalledWith('/properties')

    // Press Enter in keyword input
    const keywordInput = screen.getByTestId('quick-search-keyword-input')
    fireEvent.change(keywordInput, { target: { value: 'Masteri' } })
    fireEvent.keyDown(keywordInput, { key: 'Enter', code: 'Enter' })
    expect(pushMock).toHaveBeenCalledTimes(2)
    expect(pushMock).toHaveBeenLastCalledWith('/properties?search=Masteri')
  })

  // Dimension 3: Negative / Quick-chip Path
  it('triggers immediate search when clicking popular suggestion tags', () => {
    render(<HeroQuickSearchBar />)

    const q1Tag = screen.getByTestId('suggestion-chip-Sài Gòn')
    fireEvent.click(q1Tag)

    const chipParams = new URL(
      String(pushMock.mock.calls[0]?.[0] ?? ''),
      'http://x'
    ).searchParams
    expect(chipParams.get('city')).toBe('Thành phố Hồ Chí Minh')
    expect(chipParams.get('district')).toBeNull()
    expect(chipParams.get('ward')).toBe('Phường Sài Gòn')

    const under10Tag = screen.getByTestId('suggestion-chip-Dưới 10 triệu')
    fireEvent.click(under10Tag)

    expect(pushMock).toHaveBeenCalledWith(
      expect.stringContaining('maxPrice=10')
    )

    const twoBedroomTag = screen.getByTestId('suggestion-chip-2 phòng ngủ')
    fireEvent.click(twoBedroomTag)

    expect(pushMock).toHaveBeenCalledWith('/properties?bedrooms=2')
  })

  // Dimension 4: Full Branch Coverage
  it('toggles dropdown menus and handles outside click properly (Branch Coverage)', () => {
    render(
      <div>
        <div data-testid="outside-element">Outside</div>
        <HeroQuickSearchBar />
      </div>
    )

    const priceTrigger = screen.getByTestId('quick-search-price-trigger')

    // Open dropdown
    fireEvent.click(priceTrigger)
    expect(priceTrigger).toHaveAttribute('aria-expanded', 'true')
    expect(screen.getByTestId('price-option-10-15')).toBeInTheDocument()

    // Toggle close
    fireEvent.click(priceTrigger)
    expect(priceTrigger).toHaveAttribute('aria-expanded', 'false')

    // Open again and click outside to close
    fireEvent.click(priceTrigger)
    expect(priceTrigger).toHaveAttribute('aria-expanded', 'true')
    fireEvent.mouseDown(screen.getByTestId('outside-element'))
    expect(priceTrigger).toHaveAttribute('aria-expanded', 'false')

    // Price branch: "Dưới 10 triệu"
    fireEvent.click(screen.getByTestId('quick-search-price-trigger'))
    fireEvent.click(screen.getByTestId('price-option-under-10'))
    fireEvent.click(screen.getByTestId('quick-search-submit-button'))
    expect(pushMock).toHaveBeenCalledWith('/properties?maxPrice=10')

    // Price branch: "Trên 25 triệu"
    fireEvent.click(screen.getByTestId('quick-search-price-trigger'))
    fireEvent.click(screen.getByTestId('price-option-above-25'))
    fireEvent.click(screen.getByTestId('quick-search-submit-button'))
    expect(pushMock).toHaveBeenCalledWith('/properties?minPrice=25')
  })

  // Dimension 5: Safe Isolation & Accessibility
  it('has accessible labels and handles bedroom branches (Safe Isolation & a11y)', () => {
    render(<HeroQuickSearchBar />)

    expect(
      screen.getByLabelText(/nhập từ khóa tìm kiếm căn hộ hoặc dự án/i)
    ).toBeInTheDocument()
    expect(screen.getByLabelText(/chọn khu vực tìm kiếm/i)).toBeInTheDocument()
    expect(screen.getByLabelText(/chọn khoảng giá/i)).toBeInTheDocument()
    expect(screen.getByLabelText(/chọn số phòng ngủ/i)).toBeInTheDocument()

    // Bedroom 1 PN
    fireEvent.click(screen.getByTestId('quick-search-bedrooms-trigger'))
    fireEvent.click(screen.getByTestId('bedroom-option-1'))
    fireEvent.click(screen.getByTestId('quick-search-submit-button'))
    expect(pushMock).toHaveBeenCalledWith('/properties?bedrooms=1')

    // Bedroom 4+ PN
    fireEvent.click(screen.getByTestId('quick-search-bedrooms-trigger'))
    fireEvent.click(screen.getByTestId('bedroom-option-4'))
    fireEvent.click(screen.getByTestId('quick-search-submit-button'))
    expect(pushMock).toHaveBeenCalledWith('/properties?bedrooms=4')
  })

  // Class contract: jsdom không áp CSS nên chỉ kiểm tra class kích thước.
  it('chip gợi ý đạt vùng chạm 40px và chữ 12px; nhãn trường tối thiểu 11px', () => {
    const { container } = render(<HeroQuickSearchBar />)
    const chip = screen.getByTestId('suggestion-chip-Sài Gòn')
    expect(chip.className).toContain('min-h-10')
    expect(chip.className).toContain('text-xs')
    expect(container.innerHTML).not.toMatch(/text-\[(8|9|10)px\]/)
  })
})
