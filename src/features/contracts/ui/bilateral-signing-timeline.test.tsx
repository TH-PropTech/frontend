import { describe, it, expect, vi } from 'vitest'
import { render, screen, fireEvent } from '@testing-library/react'
import * as React from 'react'
import { BilateralSigningTimeline } from './bilateral-signing-timeline'

describe('BilateralSigningTimeline', () => {
  const tenantBase = {
    name: 'Nguyễn Văn Thuê',
    hasSigned: false,
    signedAt: null,
    signatureHash: null,
    maskedCccd: '079******123',
  }

  const landlordBase = {
    name: 'Trần Thị Chủ Nhà',
    hasSigned: false,
    signedAt: null,
    signatureHash: null,
    maskedCccd: '080******456',
  }

  it('renders neither signed state (0/2) correctly', () => {
    render(
      <BilateralSigningTimeline tenant={tenantBase} landlord={landlordBase} />
    )

    expect(screen.getByTestId('bilateral-signing-timeline')).toBeDefined()
    expect(
      screen.getByText('Tiến trình ký số song phương VNPT SmartCA')
    ).toBeDefined()
    expect(screen.getByText('Chưa ký (0/2)')).toBeDefined()
    expect(screen.getByTestId('tenant-signed-badge').textContent).toBe(
      'Chưa ký'
    )
    expect(screen.getByTestId('landlord-signed-badge').textContent).toBe(
      'Chưa ký'
    )
  })

  it('renders partial signed state (1/2) when only tenant signed', () => {
    render(
      <BilateralSigningTimeline
        tenant={{
          ...tenantBase,
          hasSigned: true,
          signedAt: '2026-09-18T10:30:00.000Z',
          signatureHash: '0xabc1234567890abcdef1234567890abcdef1234567890',
        }}
        landlord={landlordBase}
      />
    )

    expect(screen.getByText('Chờ đối ứng (1/2)')).toBeDefined()
    expect(screen.getByTestId('tenant-signed-badge').textContent).toBe(
      'Đã ký số'
    )
    expect(screen.getByTestId('landlord-signed-badge').textContent).toBe(
      'Chưa ký'
    )
    expect(screen.getByText(/0xabc123/)).toBeDefined()
  })

  it('renders both signed state (2/2) when both have signed', () => {
    render(
      <BilateralSigningTimeline
        tenant={{
          ...tenantBase,
          hasSigned: true,
          signedAt: '2026-09-18T10:30:00.000Z',
          signatureHash: '0xabc1234567890abcdef1234567890abcdef1234567890',
        }}
        landlord={{
          ...landlordBase,
          hasSigned: true,
          signedAt: '2026-09-18T11:00:00.000Z',
          signatureHash: '0xdef9876543210fedcba9876543210fedcba9876543210',
        }}
      />
    )

    expect(screen.getByText('Đã ký song phương (2/2)')).toBeDefined()
    expect(screen.getByTestId('tenant-signed-badge').textContent).toBe(
      'Đã ký số'
    )
    expect(screen.getByTestId('landlord-signed-badge').textContent).toBe(
      'Đã ký số'
    )
    expect(
      screen.getByText(/Hợp đồng đã hoàn tất ký số song phương pháp lý/i)
    ).toBeDefined()
  })

  it('renders signing action button for eligible tenant and triggers onSignClick', () => {
    const onSignMock = vi.fn()
    render(
      <BilateralSigningTimeline
        tenant={tenantBase}
        landlord={landlordBase}
        userRole="tenant"
        isEligibleToSign={true}
        onSignClick={onSignMock}
      />
    )

    const signBtn = screen.getByTestId('tenant-sign-now-btn')
    expect(signBtn).toBeDefined()
    expect(screen.getByText('Ký số VNPT SmartCA ngay')).toBeDefined()
    fireEvent.click(signBtn)
    expect(onSignMock).toHaveBeenCalledTimes(1)
  })

  it('renders signing action button for eligible landlord and triggers onSignClick', () => {
    const onSignMock = vi.fn()
    render(
      <BilateralSigningTimeline
        tenant={tenantBase}
        landlord={landlordBase}
        userRole="landlord"
        isEligibleToSign={true}
        onSignClick={onSignMock}
      />
    )

    const signBtn = screen.getByTestId('landlord-sign-now-btn')
    expect(signBtn).toBeDefined()
    fireEvent.click(signBtn)
    expect(onSignMock).toHaveBeenCalledTimes(1)
  })

  it('handles edge cases with null or empty optional strings gracefully', () => {
    render(
      <BilateralSigningTimeline
        tenant={{
          name: 'Anonymous Tenant',
          hasSigned: true,
          signedAt: null,
          signatureHash: null,
          maskedCccd: null,
        }}
        landlord={{
          name: 'Anonymous Landlord',
          hasSigned: false,
          signedAt: null,
          signatureHash: null,
          maskedCccd: null,
        }}
      />
    )

    expect(screen.getByTestId('bilateral-signing-timeline')).toBeDefined()
  })

  // ---------------------------------------------------------------------------
  // isActiveStep visual state tests
  // ---------------------------------------------------------------------------
  describe('isActiveStep prop', () => {
    it('adds ring highlight class when isActiveStep=true', () => {
      render(
        <BilateralSigningTimeline
          tenant={tenantBase}
          landlord={landlordBase}
          isActiveStep={true}
        />
      )
      const wrapper = screen.getByTestId('bilateral-signing-timeline-wrapper')
      expect(wrapper.className).toContain('ring-2')
      expect(wrapper.className).toContain('ring-[var(--primary)]')
    })

    it('adds opacity-50 and pointer-events-none when isActiveStep=false', () => {
      render(
        <BilateralSigningTimeline
          tenant={tenantBase}
          landlord={landlordBase}
          isActiveStep={false}
        />
      )
      const wrapper = screen.getByTestId('bilateral-signing-timeline-wrapper')
      expect(wrapper.className).toContain('opacity-50')
      expect(wrapper.className).toContain('pointer-events-none')
    })

    it('adds no extra class when isActiveStep is undefined', () => {
      render(
        <BilateralSigningTimeline tenant={tenantBase} landlord={landlordBase} />
      )
      const wrapper = screen.getByTestId('bilateral-signing-timeline-wrapper')
      expect(wrapper.className).not.toContain('ring-2')
      expect(wrapper.className).not.toContain('opacity-50')
      expect(wrapper.className).not.toContain('pointer-events-none')
    })
  })
})
