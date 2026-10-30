import { render, screen } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import * as React from 'react'
import { LandlordSection } from '../landlord-section'

describe('LandlordSection Component - PropTech Blockchain & AI Workflow', () => {
  it('renders section title, badge and proper PropTech positioning without SAAS/room rental terms', () => {
    render(<LandlordSection />)

    expect(screen.getByText(/^dành cho chủ nhà$/i)).toBeInTheDocument()
    expect(
      screen.getByRole('heading', {
        level: 2,
        name: /quản lý căn hộ cho thuê thông minh & hiệu quả hơn/i,
      })
    ).toBeInTheDocument()

    // Verifies PropTech, Blockchain & AI positioning
    const text = document.body.textContent ?? ''
    expect(text).toMatch(/proptech/i)
    expect(text).toMatch(/blockchain/i)
    expect(text).toMatch(/căn hộ/i)

    // Asserts absolute removal of prohibited legacy terms
    expect(text).not.toMatch(/công cụ saas/i)
    expect(text).not.toMatch(/phòng trọ/i)
    expect(text).not.toMatch(/quy trình ký gửi/i)
    expect(text).not.toMatch(/vr tour 360/i)
    expect(text).not.toMatch(/video call/i)
  })

  it('contains the 4 core pillars: 3D Three.js, eKYC & direct visits, VNPT SmartCA & Fabric, transparent payout', () => {
    render(<LandlordSection />)
    const text = document.body.textContent ?? ''

    // 1. 3D & Floorplan
    expect(text).toMatch(/three\.js/i)
    expect(text).toMatch(/floorplan/i)

    // 2. eKYC & Direct in-person visits (no video call)
    expect(text).toMatch(/ekyc/i)
    expect(text).toMatch(/xem nhà trực tiếp/i)

    // 3. VNPT SmartCA, Decree 96/2024 & Hyperledger Fabric
    expect(text).toMatch(/vnpt smartca/i)
    expect(text).toMatch(/96\/2024\/nđ-cp/i)
    expect(text).toMatch(/hyperledger fabric/i)
    expect(text).toMatch(/lưu vết/i)

    // 4. Payout to non-custodial wallet / bank
    expect(text).toMatch(/ví cá nhân/i)
    expect(text).toMatch(/giải ngân/i)
  })

  it('provides CTA button pointing to /properties/new with >= 44px touch target', () => {
    render(<LandlordSection />)

    const ctaLink = screen.getByRole('link', {
      name: /đăng tin căn hộ/i,
    })
    expect(ctaLink).toBeInTheDocument()
    expect(ctaLink).toHaveAttribute('href', '/properties/new')

    // Prohibit legacy /process destination
    expect(ctaLink).not.toHaveAttribute('href', '/process')

    // Touch target >= 44px
    const button = ctaLink.querySelector('button') || ctaLink
    expect(button.className).toMatch(/min-h-11|h-11|min-h-\[44px\]/)
  })

  it('renders 4 sequential operational steps for landlords', () => {
    render(<LandlordSection />)

    expect(screen.getByText(/quy trình dành cho chủ nhà/i)).toBeInTheDocument()
    expect(
      screen.getByText(/1\. Đăng tin & Tích hợp mô hình 3D/i)
    ).toBeInTheDocument()
    expect(
      screen.getByText(/2\. Thẩm định hồ sơ & Duyệt lịch hẹn/i)
    ).toBeInTheDocument()
    expect(
      screen.getByText(/3\. Ký số hợp đồng chuẩn pháp lý/i)
    ).toBeInTheDocument()
    expect(
      screen.getByText(/4\. Nhận cọc & Giải ngân minh bạch/i)
    ).toBeInTheDocument()
  })
})
