import { describe, it, expect, vi, beforeEach } from 'vitest'
import { render, screen } from '@testing-library/react'
import * as React from 'react'
import { ProfileWidget } from './profile-widget'
import * as useProfileModule from '../model/use-profile'

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
    hasPasskey: false,
    setHasPasskey: vi.fn(),
    handleRegisterPasskey: vi.fn(),
    handleLoginPasskey: vi.fn(),
    showKycModal: false,
    setShowKycModal: vi.fn(),
    kycStatus: 'unverified' as const,
    kycData: {
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
    handleKycSubmit: vi.fn(),
    isScanning: false,
    handleOcrScan: vi.fn(),
    sessions: [],
    handleRevokeSession: vi.fn(),
    unreadCount: 0,
    notifications: [],
    handleMarkAsRead: vi.fn(),
    handleMarkAllAsRead: vi.fn(),
    activeProperty: null,
    contract: null,
    handoverDoc: null,
    bills: [],
    maintenanceTickets: [],
    blockchainLogs: [],
    depositRefund: null,
    isProcessing: false,
    handleProcessAction: vi.fn(),
  }

  beforeEach(() => {
    vi.clearAllMocks()
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

    expect(screen.getByText('Tin đăng của tôi')).toBeDefined()
    expect(screen.getByText('Hồ sơ đặt thuê')).toBeDefined()
    expect(screen.getByTestId('tab-landlord-applications')).toBeDefined()
  })
})
