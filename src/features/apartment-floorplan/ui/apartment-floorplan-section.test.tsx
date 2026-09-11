import { fireEvent, render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import { ApartmentFloorplanSection } from './apartment-floorplan-section'

const property = {
  id: 'apt-1',
  bedrooms: 2,
  bathrooms: 2,
  areaNum: 75,
  furniture: 'Đầy đủ nội thất',
}

describe('ApartmentFloorplanSection', () => {
  it('does not mount the iframe until the viewer is activated', () => {
    render(<ApartmentFloorplanSection property={property} />)

    expect(screen.queryByTitle('Sơ đồ 3D minh hoạ')).not.toBeInTheDocument()
    expect(
      screen.getByRole('button', { name: 'Xem sơ đồ 3D minh hoạ' })
    ).toBeInTheDocument()
  })

  it('exposes the illustration disclaimer and listing summary', () => {
    render(<ApartmentFloorplanSection property={property} />)

    expect(screen.getByText('Sơ đồ 3D minh hoạ')).toBeInTheDocument()
    expect(
      screen.getByText(/có thể khác hiện trạng thực tế/i)
    ).toBeInTheDocument()
    expect(screen.getByText(/2 phòng ngủ/)).toBeInTheDocument()
  })

  it('mounts the isolated viewer only after activation', () => {
    render(<ApartmentFloorplanSection property={property} />)

    fireEvent.click(
      screen.getByRole('button', { name: 'Xem sơ đồ 3D minh hoạ' })
    )

    expect(screen.getByTitle('Sơ đồ 3D minh hoạ')).toHaveAttribute(
      'src',
      '/apartment-floorplan/index.html'
    )
    expect(
      screen.getByRole('button', { name: 'Đóng sơ đồ 3D' })
    ).toBeInTheDocument()
  })

  it('shows a non-blocking fallback when listing data is incomplete', () => {
    render(<ApartmentFloorplanSection property={{ ...property, areaNum: 0 }} />)

    expect(
      screen.getByText(/Chưa đủ thông tin để tạo sơ đồ 3D/i)
    ).toBeInTheDocument()
    expect(screen.queryByTitle('Sơ đồ 3D minh hoạ')).not.toBeInTheDocument()
  })
})
