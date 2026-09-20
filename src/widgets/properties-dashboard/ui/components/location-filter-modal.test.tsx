import * as React from 'react'
import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import { describe, expect, it, vi, beforeEach } from 'vitest'
import { LocationFilterModal } from './location-filter-modal'

vi.mock('@/shared/lib/use-vietnam-locations', () => ({
  useVietnamLocations: vi.fn(
    (provinceCode: number | null, districtCode: number | null) => ({
      provinces: [
        { name: 'Thành phố Hồ Chí Minh', code: 79 },
        { name: 'Thành phố Hà Nội', code: 1 },
        { name: 'Thành phố Đà Nẵng', code: 48 },
      ],
      districts:
        provinceCode === 79
          ? [
              { name: 'Quận 1', code: 760, province_code: 79 },
              { name: 'Quận Bình Thạnh', code: 765, province_code: 79 },
            ]
          : [],
      wards:
        districtCode === 760
          ? [
              { name: 'Phường Bến Nghé', code: 26740, district_code: 760 },
              { name: 'Phường Bến Thành', code: 26743, district_code: 760 },
            ]
          : [],
      isLoadingProvinces: false,
      isLoadingDistricts: false,
      isLoadingWards: false,
    })
  ),
}))

describe('LocationFilterModal Component (5 Dimensions)', () => {
  const defaultProps = {
    onClose: vi.fn(),
    onApply: vi.fn(),
    selectedCity: 'Thành phố Hồ Chí Minh',
    setSelectedCity: vi.fn(),
    selectedDistrict: 'Quận 1',
    setSelectedDistrict: vi.fn(),
    selectedWard: '',
    setSelectedWard: vi.fn(),
    selectedProvinceCode: 79,
    setSelectedProvinceCode: vi.fn(),
    selectedDistrictCode: 760,
    setSelectedDistrictCode: vi.fn(),
  }

  beforeEach(() => {
    vi.clearAllMocks()
  })

  // Dimension 1: Happy Path
  it('renders modal with selected city and district and enables district selector', () => {
    render(<LocationFilterModal {...defaultProps} />)

    expect(screen.getByText('Chọn khu vực')).toBeInTheDocument()
    expect(screen.getByText('Tỉnh / Thành phố')).toBeInTheDocument()
    expect(screen.getByText('Quận / Huyện')).toBeInTheDocument()
    expect(screen.getByText('Phường / Xã')).toBeInTheDocument()

    // Trigger should display the selected values
    expect(screen.getByText('Thành phố Hồ Chí Minh')).toBeInTheDocument()
    expect(screen.getByText('Quận 1')).toBeInTheDocument()
  })

  // Dimension 2: Auto-resolve Boundary Case
  it('auto-resolves province and codes when only selectedDistrict is provided', async () => {
    const setSelectedCity = vi.fn()
    const setSelectedProvinceCode = vi.fn()
    const setSelectedDistrictCode = vi.fn()

    render(
      <LocationFilterModal
        {...defaultProps}
        selectedCity=""
        setSelectedCity={setSelectedCity}
        selectedProvinceCode={null}
        setSelectedProvinceCode={setSelectedProvinceCode}
        selectedDistrict="Quận 1"
        selectedDistrictCode={null}
        setSelectedDistrictCode={setSelectedDistrictCode}
      />
    )

    await waitFor(() => {
      expect(setSelectedCity).toHaveBeenCalledWith('Thành phố Hồ Chí Minh')
      expect(setSelectedProvinceCode).toHaveBeenCalledWith(79)
      expect(setSelectedDistrictCode).toHaveBeenCalledWith(760)
    })
  })

  // Dimension 3: Reset functionality
  it('resets all location state when clicking "Đặt lại"', () => {
    const setSelectedCity = vi.fn()
    const setSelectedDistrict = vi.fn()
    const setSelectedWard = vi.fn()
    const setSelectedProvinceCode = vi.fn()
    const setSelectedDistrictCode = vi.fn()

    render(
      <LocationFilterModal
        {...defaultProps}
        setSelectedCity={setSelectedCity}
        setSelectedDistrict={setSelectedDistrict}
        setSelectedWard={setSelectedWard}
        setSelectedProvinceCode={setSelectedProvinceCode}
        setSelectedDistrictCode={setSelectedDistrictCode}
      />
    )

    const resetButton = screen.getByRole('button', { name: 'Đặt lại' })
    fireEvent.click(resetButton)

    expect(setSelectedCity).toHaveBeenCalledWith('')
    expect(setSelectedDistrict).toHaveBeenCalledWith('')
    expect(setSelectedWard).toHaveBeenCalledWith('')
    expect(setSelectedProvinceCode).toHaveBeenCalledWith(null)
    expect(setSelectedDistrictCode).toHaveBeenCalledWith(null)
  })

  // Dimension 4: Apply and Confirm
  it('calls onApply and onClose when clicking "Xác nhận"', () => {
    const onApply = vi.fn()
    const onClose = vi.fn()

    render(
      <LocationFilterModal
        {...defaultProps}
        onApply={onApply}
        onClose={onClose}
      />
    )

    const confirmButton = screen.getByRole('button', { name: 'Xác nhận' })
    fireEvent.click(confirmButton)

    expect(onApply).toHaveBeenCalledTimes(1)
    expect(onClose).toHaveBeenCalledTimes(1)
  })

  // Dimension 5: Fallback Item Rendering
  it('renders fallback item if selectedDistrict is not yet in the fetched districts list', () => {
    render(
      <LocationFilterModal {...defaultProps} selectedDistrict="Quận Tân Phú" />
    )

    expect(screen.getByText('Quận Tân Phú')).toBeInTheDocument()
  })
})
