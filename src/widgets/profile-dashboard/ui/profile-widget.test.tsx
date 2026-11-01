import { describe, it, expect, vi, beforeEach } from 'vitest'
import { render, screen, fireEvent } from '@testing-library/react'
import * as React from 'react'
import { ProfileWidget } from './profile-widget'
import * as useProfileModule from '../model/use-profile'

const replaceMock = vi.fn()
vi.mock('next/navigation', () => ({
  useRouter: () => ({
    replace: replaceMock,
    push: vi.fn(),
  }),
}))

vi.mock('../model/use-profile', () => ({
  useProfile: vi.fn(),
}))

vi.mock('./profile-header', () => ({
  ProfileHeader: () => <div data-testid="profile-header">ProfileHeader</div>,
}))

vi.mock('./tab-progress', () => ({
  TabProgress: () => <div data-testid="tab-progress">TabProgress</div>,
}))

vi.mock('./tab-bills', () => ({
  TabBills: () => <div data-testid="tab-bills">TabBills</div>,
}))

vi.mock('./tab-maintenance', () => ({
  TabMaintenance: () => <div data-testid="tab-maintenance">TabMaintenance</div>,
}))

vi.mock('./tab-blockchain', () => ({
  TabBlockchain: () => <div data-testid="tab-blockchain">TabBlockchain</div>,
}))

vi.mock('./tab-security', () => ({
  TabSecurity: () => <div data-testid="tab-security">TabSecurity</div>,
}))

vi.mock('./tab-my-listings', () => ({
  TabMyListings: () => <div data-testid="tab-my-listings">TabMyListings</div>,
}))

vi.mock('./tab-landlord-applications', () => ({
  TabLandlordApplications: () => (
    <div data-testid="tab-landlord-applications">TabLandlordApplications</div>
  ),
}))

vi.mock('./modal-kyc', () => ({ ModalKyc: () => null }))
vi.mock('./modal-handover', () => ({ ModalHandover: () => null }))
vi.mock('./modal-contract', () => ({ ModalContract: () => null }))
vi.mock('./modal-handover-archive', () => ({
  ModalHandoverArchive: () => null,
}))
vi.mock('./profile-feature-hub', () => ({ ProfileFeatureHub: () => null }))

describe('ProfileWidget', () => {
  const baseProfile = {
    role: 'tenant' as const,
    activeTab: 'progress' as const,
    setActiveTab: vi.fn(),
    activePropertyId: 'prop-1',
    properties: [],
    showContractModal: false,
    setShowContractModal: vi.fn(),
    contractViewOnly: false,
    handleViewSignedContract: vi.fn(),
    showHandoverArchiveModal: false,
    setShowHandoverArchiveModal: vi.fn(),
    showKycModal: false,
    setShowKycModal: vi.fn(),
    kycStatus: 'not-started' as const,
    kycForm: {
      fullName: '',
      cccdNumber: '',
      dob: '',
      address: '',
      gender: '',
      nationality: '',
      placeOfOrigin: '',
      issueDate: '',
      placeOfIssue: '',
    },
    activeProperty: null,
    isInitialLoading: false,
    bills: [],
    maintenanceTickets: [],
    blockchainLogs: [],
  }

  beforeEach(() => {
    vi.clearAllMocks()
    localStorage.setItem('accessToken', 'test-token')
  })

  it('redirects to /login when unauthenticated', () => {
    localStorage.removeItem('accessToken')
    vi.mocked(useProfileModule.useProfile).mockReturnValue(
      baseProfile as unknown as ReturnType<typeof useProfileModule.useProfile>
    )

    render(<ProfileWidget />)
    expect(replaceMock).toHaveBeenCalledWith('/login')
  })

  it('does not render landlord tabs when role is tenant', () => {
    vi.mocked(useProfileModule.useProfile).mockReturnValue(
      baseProfile as unknown as ReturnType<typeof useProfileModule.useProfile>
    )

    render(<ProfileWidget />)

    expect(screen.queryByText('Tin đăng của tôi')).toBeNull()
    expect(screen.queryByText('Hồ sơ đặt thuê')).toBeNull()
  })

  it('renders landlord tabs and rental-applications tab when role is landlord', () => {
    vi.mocked(useProfileModule.useProfile).mockReturnValue({
      ...baseProfile,
      role: 'landlord',
      activeTab: 'rental-applications',
    } as unknown as ReturnType<typeof useProfileModule.useProfile>)

    render(<ProfileWidget />)

    expect(screen.getAllByText('Tin đăng của tôi').length).toBeGreaterThan(0)
    expect(screen.getAllByText('Hồ sơ đặt thuê').length).toBeGreaterThan(0)
    expect(screen.getByTestId('tab-landlord-applications')).toBeDefined()
  })

  it('renders tenant rental applications tab label when role is tenant', () => {
    const setActiveTabMock = vi.fn()
    vi.mocked(useProfileModule.useProfile).mockReturnValue({
      ...baseProfile,
      role: 'tenant',
      activeTab: 'progress',
      setActiveTab: setActiveTabMock,
    } as unknown as ReturnType<typeof useProfileModule.useProfile>)

    render(<ProfileWidget />)

    const tenantTab = screen.getAllByRole('tab', {
      name: /đơn thuê đã gửi/i,
    })[0]!
    expect(tenantTab).toBeDefined()
    fireEvent.pointerDown(tenantTab, { button: 0, ctrlKey: false })
    fireEvent.keyDown(tenantTab, { key: 'Enter', code: 'Enter' })
    expect(setActiveTabMock).toHaveBeenCalledWith('rental-applications')
  })

  it('renders skeleton and does not flash empty state or defaults when isInitialLoading is true', () => {
    vi.mocked(useProfileModule.useProfile).mockReturnValue({
      ...baseProfile,
      isInitialLoading: true,
    } as unknown as ReturnType<typeof useProfileModule.useProfile>)

    const { container } = render(<ProfileWidget />)
    expect(screen.queryByTestId('tab-progress')).toBeNull()
    expect(screen.queryByTestId('profile-header')).toBeNull()
    expect(container.textContent).not.toContain('Chưa có căn hộ nào')
    expect(container.textContent).not.toContain('Đăng nhập')
  })
})
