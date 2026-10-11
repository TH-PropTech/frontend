import * as React from 'react'
import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import { describe, expect, it, vi, beforeEach } from 'vitest'
import { LocationFilterModal } from './location-filter-modal'

vi.mock('@/shared/lib/use-vietnam-locations', () => ({
  useVietnamLocations: vi.fn((provinceCode: number | null) => ({
    provinces: [
      { name: 'Thành phố Hồ Chí Minh', code: 79 },
      { name: 'Thành phố Hà Nội', code: 1 },
      { name: 'Thành phố Đà Nẵng', code: 48 },
    ],
    districts: [],
    wards:
      provinceCode === 79
        ? [
            { name: 'Phường Vườn Lài', code: 27190, province_code: 79 },
            { name: 'Phường An Hội Đông', code: 26911, province_code: 79 },
          ]
        : [],
    isLoadingProvinces: false,
    isLoadingDistricts: false,
    isLoadingWards: false,
  })),
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
  it('renders province and ward selectors without a district level', () => {
    render(<LocationFilterModal {...defaultProps} />)

    expect(screen.getByText('Chọn khu vực')).toBeInTheDocument()
    expect(screen.getByText('Tỉnh / Thành phố')).toBeInTheDocument()
    expect(screen.queryByText('Quận / Huyện')).not.toBeInTheDocument()
    expect(screen.getByText('Phường / Xã')).toBeInTheDocument()

    // Trigger should display the selected values
    expect(screen.getByText('Thành phố Hồ Chí Minh')).toBeInTheDocument()
  })

  it('gives the reset button a themed focus ring instead of the default outline', () => {
    render(<LocationFilterModal {...defaultProps} />)

    const reset = screen.getByRole('button', { name: 'Đặt lại' })
    expect(reset).toHaveClass('focus-visible:ring-2')
    expect(reset).toHaveClass('focus:outline-none')
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
  it('renders a fallback item when the selected ward is not in the fetched list', () => {
    render(<LocationFilterModal {...defaultProps} selectedWard="Phường Cũ" />)

    expect(screen.getByText('Phường Cũ')).toBeInTheDocument()
  })
})
