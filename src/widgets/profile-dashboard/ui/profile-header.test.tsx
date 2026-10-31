import { describe, it, expect, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import * as React from 'react'
import { ProfileHeader } from './profile-header'
import type { UseProfileReturn } from '../model/use-profile'

vi.mock('./landlord-header-wallet', () => ({
  LandlordHeaderWallet: () => <div data-testid="landlord-wallet" />,
}))

function makeProfile(
  overrides: Partial<UseProfileReturn> = {}
): UseProfileReturn {
  return {
    role: 'tenant',
    isKycVerified: true,
    kycStatus: 'verified',
    kycForm: { cccdNumber: '080123456567' },
    isWalletConnected: false,
    walletAddress: '',
    usdtBalance: 0,
    handleConnectWallet: vi.fn(),
    handleCopyText: vi.fn(),
    setShowKycModal: vi.fn(),
    handleRoleChange: vi.fn(),
    ...overrides,
  } as unknown as UseProfileReturn
}

describe('ProfileHeader', () => {
  it('che số CCCD và không để chuỗi 12 chữ số trong DOM', () => {
    const { container } = render(<ProfileHeader profile={makeProfile()} />)
    expect(screen.getByText(/CCCD: 080\*\*\*567/)).toBeDefined()
    expect(container.innerHTML).not.toMatch(/\d{12}/)
  })

  it('hiện "Đã xác thực" khi số CCCD thiếu hoặc quá ngắn', () => {
    render(
      <ProfileHeader
        profile={makeProfile({
          kycForm: { cccdNumber: '' } as UseProfileReturn['kycForm'],
        })}
      />
    )
    expect(screen.getByText(/CCCD: Đã xác thực/)).toBeDefined()
  })

  it('không hiển thị điểm tín dụng ở cả hai vai trò', () => {
    for (const role of ['tenant', 'landlord'] as const) {
      const { container, unmount } = render(
        <ProfileHeader profile={makeProfile({ role })} />
      )
      expect(container.textContent).not.toMatch(
        /Điểm tín dụng|780|820|Hạng Vàng|Kim Cương/
      )
      unmount()
    }
  })

  it('chưa xác minh KYC thì không hiện số CCCD, chỉ có lời mời xác minh', () => {
    const { container } = render(
      <ProfileHeader
        profile={makeProfile({
          isKycVerified: false,
          kycStatus: 'not-started',
        })}
      />
    )
    expect(container.innerHTML).not.toMatch(/\d{12}/)
    expect(screen.getByText(/Yêu cầu xác minh danh tính CCCD/)).toBeDefined()
  })
})
