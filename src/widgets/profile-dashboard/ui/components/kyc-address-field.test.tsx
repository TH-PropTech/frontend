import { fireEvent, render, screen } from '@testing-library/react'
import { beforeEach, describe, expect, it, vi } from 'vitest'
import { useVietnamLocations } from '@/shared/lib/use-vietnam-locations'
import { KycAddressField } from './kyc-address-field'

vi.mock('@/shared/lib/use-vietnam-locations', () => ({
  useVietnamLocations: vi.fn(),
}))

const PROVINCES = [
  {
    name: 'Thành phố Hồ Chí Minh',
    code: 79,
    division_type: 'thành phố trung ương',
    codename: 'ho_chi_minh',
    phone_code: 28,
  },
  {
    name: 'Tỉnh Đắk Lắk',
    code: 66,
    division_type: 'tỉnh',
    codename: 'dak_lak',
    phone_code: 262,
  },
]

function mockLocations(provinces = PROVINCES, loading = false): void {
  vi.mocked(useVietnamLocations).mockReturnValue({
    provinces,
    districts: [],
    wards: [],
    isLoadingProvinces: loading,
    isLoadingDistricts: false,
    isLoadingWards: false,
  })
}

describe('KycAddressField', () => {
  beforeEach(() => {
    vi.clearAllMocks()
    mockLocations()
  })

  it('splits an OCR address into the province picker and the detail line', () => {
    render(
      <KycAddressField
        label="Nơi thường trú"
        value="12 Lê Lợi, Thành phố Hồ Chí Minh"
        onChange={vi.fn()}
      />
    )

    expect(
      screen.getByRole('combobox', { name: /Tỉnh\/Thành phố/ })
    ).toHaveTextContent('Thành phố Hồ Chí Minh')
    expect(screen.getByLabelText(/Địa chỉ chi tiết/)).toHaveValue('12 Lê Lợi')
  })

  it('re-joins the detail with the province when the user types', () => {
    const onChange = vi.fn()
    render(
      <KycAddressField
        label="Nơi thường trú"
        value="12 Lê Lợi, Thành phố Hồ Chí Minh"
        onChange={onChange}
      />
    )

    fireEvent.change(screen.getByLabelText(/Địa chỉ chi tiết/), {
      target: { value: '34 Nguyễn Huệ' },
    })

    expect(onChange).toHaveBeenLastCalledWith(
      '34 Nguyễn Huệ, Thành phố Hồ Chí Minh'
    )
  })

  it('keeps an old-province address as detail and asks to pick the current province', () => {
    render(
      <KycAddressField
        label="Quê quán"
        value="Hòa An, Phú Hòa, Phú Yên"
        onChange={vi.fn()}
      />
    )

    expect(screen.getByLabelText(/Địa chỉ chi tiết/)).toHaveValue(
      'Hòa An, Phú Hòa, Phú Yên'
    )
    expect(screen.getByText(/Chọn Tỉnh\/Thành phố hiện hành/)).toBeVisible()
  })

  it('shows the validation error', () => {
    render(
      <KycAddressField
        label="Nơi thường trú"
        value=""
        onChange={vi.fn()}
        error="Vui lòng nhập nơi thường trú"
      />
    )

    expect(screen.getByRole('alert')).toHaveTextContent('nơi thường trú')
  })

  it('falls back to one free-text line when the province list cannot load', () => {
    mockLocations([], false)
    const onChange = vi.fn()
    render(
      <KycAddressField
        label="Nơi thường trú"
        value="12 Lê Lợi"
        onChange={onChange}
      />
    )

    expect(screen.queryByRole('combobox')).toBeNull()
    fireEvent.change(screen.getByLabelText('Nơi thường trú'), {
      target: { value: '99 Hai Bà Trưng' },
    })
    expect(onChange).toHaveBeenCalledWith('99 Hai Bà Trưng')
  })
})
