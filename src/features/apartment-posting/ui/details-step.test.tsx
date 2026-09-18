import { describe, it, expect } from 'vitest'
import { render, screen, fireEvent } from '@testing-library/react'
import * as React from 'react'
import { useForm } from 'react-hook-form'
import { DetailsStep } from './details-step'
import type { ApartmentFormValues } from '../model/types'

function DetailsStepHarness({
  initialValues,
}: {
  initialValues?: Partial<ApartmentFormValues>
}) {
  const form = useForm<ApartmentFormValues>({
    defaultValues: {
      title: 'Căn hộ River Panorama 2 phòng ngủ',
      category: 'Căn hộ chung cư',
      description:
        'Căn hộ view sông Sài Gòn thoáng mát, đầy đủ nội thất cao cấp, sẵn sàng dọn vào ở ngay.',
      city: 'Hồ Chí Minh',
      district: 'Quận 7',
      ward: 'Phú Thuận',
      street: 'Hoàng Quốc Việt',
      address: '89 Hoàng Quốc Việt',
      priceMonthly: 14.5,
      area: 65,
      bedrooms: 2,
      bathrooms: 2,
      direction: 'Đông Nam',
      balconyDirection: 'Đông',
      furniture: 'Đầy đủ',
      electricity: 'Giá nhà nước',
      water: 'Giá nhà nước',
      internet: 'Miễn phí',
      amenities: ['pool', 'gym'],
      rentalPackages: [],
      ...initialValues,
    } as unknown as ApartmentFormValues,
  })

  return (
    <form>
      <DetailsStep form={form} />
    </form>
  )
}

describe('DetailsStep', () => {
  it('renders general apartment details inputs and embedded rental packages section', () => {
    render(<DetailsStepHarness />)

    expect(screen.getByText('Thông tin chi tiết tin đăng')).toBeDefined()
    expect(screen.getByLabelText(/Tiêu đề tin đăng/i)).toBeDefined()
    expect(screen.getByLabelText(/Loại hình bất động sản/i)).toBeDefined()
    expect(screen.getByLabelText(/Giá thuê hằng tháng/i)).toBeDefined()
    expect(screen.getByLabelText(/Diện tích sử dụng/i)).toBeDefined()
    expect(screen.getByLabelText(/Số phòng ngủ/i)).toBeDefined()
    expect(screen.getByLabelText(/Số phòng tắm\/WC/i)).toBeDefined()

    // Embedded RentalPackagesConfigSection
    expect(screen.getByTestId('rental-packages-config-section')).toBeDefined()
    expect(screen.getByTestId('package-card-12')).toBeDefined()
  })

  it('allows updating title and numeric values', () => {
    render(<DetailsStepHarness />)

    const titleInput = screen.getByLabelText(
      /Tiêu đề tin đăng/i
    ) as HTMLInputElement
    fireEvent.change(titleInput, {
      target: { value: 'Căn hộ The Sun Avenue 3PN view Landmark 81' },
    })
    expect(titleInput.value).toBe('Căn hộ The Sun Avenue 3PN view Landmark 81')

    const priceInput = screen.getByLabelText(
      /Giá thuê hằng tháng/i
    ) as HTMLInputElement
    fireEvent.change(priceInput, { target: { value: '20' } })
    expect(priceInput.value).toBe('20')
  })

  it('allows selecting amenities and activating rental packages in step', () => {
    render(<DetailsStepHarness />)

    // Toggle amenity
    const wifiAmenity = screen.getByLabelText(/Bãi đỗ xe/i)
    fireEvent.click(wifiAmenity)

    // Toggle rental package in step
    const toggle6 = screen.getByTestId('toggle-duration-6')
    fireEvent.click(toggle6)

    expect(screen.getByTestId('price-input-6')).toBeDefined()
  })
})
