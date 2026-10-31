import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import * as React from 'react'
import { LandlordTenantInfo } from './landlord-tenant-info'

const info = {
  name: 'Trần Thị B',
  phone: '0900000001',
  startDate: '01/01/2026',
  duration: '12 tháng',
  endDate: '01/01/2027',
  paymentStatus: 'Chưa có dữ liệu',
}

describe('LandlordTenantInfo', () => {
  it('hiện thông tin khách thuê thật và không có hạng tín dụng', () => {
    const { container } = render(
      <LandlordTenantInfo status="Đang thuê" price={1} liveInfo={info} />
    )
    expect(screen.getByText('Trần Thị B')).toBeDefined()
    expect(container.textContent).not.toMatch(/tín dụng|Hạng/i)
  })

  it('đang thuê nhưng chưa có dữ liệu thì hiện "Chưa có dữ liệu", không dùng tên demo', () => {
    const { container } = render(
      <LandlordTenantInfo status="Đang thuê" price={1} />
    )
    expect(screen.getByText('Chưa có dữ liệu')).toBeDefined()
    expect(container.textContent).not.toMatch(/demo|Nguyễn Văn A/i)
  })

  it('căn trống không hiện lượt xem / yêu thích gán cứng', () => {
    const { container } = render(
      <LandlordTenantInfo status="Trống" price={5000000} />
    )
    expect(container.textContent).toContain('Căn hộ hiện tại đang trống')
    expect(container.textContent).not.toMatch(/Lượt xem|Lượt yêu thích/)
  })

  it('căn chờ cọc hiện đúng tiêu đề', () => {
    render(<LandlordTenantInfo status="Đang chờ cọc" price={1} />)
    expect(screen.getByText('Đang chờ khách thuê nộp cọc')).toBeDefined()
  })
})
