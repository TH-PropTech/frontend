import { render, screen, waitFor } from '@testing-library/react'
import { beforeEach, describe, expect, it, vi } from 'vitest'
import { ContractParticipantPanel } from './contract-participant-panel'

const mocks = vi.hoisted(() => ({
  get: vi.fn(),
  verify: vi.fn(),
  grant: vi.fn(),
  sign: vi.fn(),
  download: vi.fn(),
}))

vi.mock('../api/contracts-api', () => ({
  getContract: mocks.get,
  verifyContractIntegrity: mocks.verify,
  issueSigningGrant: mocks.grant,
  signContract: mocks.sign,
  downloadContractArtifact: mocks.download,
}))

describe('ContractParticipantPanel', () => {
  beforeEach(() => vi.clearAllMocks())

  it('renders the participant contract and signing-grant boundary', async () => {
    mocks.get.mockResolvedValue({
      _id: 'contract-1',
      contractCode: 'CTR-1',
      propertyId: 'apartment-1',
      propertyTitle: 'Căn hộ thử nghiệm',
      tenantId: 'tenant-1',
      landlordId: 'landlord-1',
      startDate: '2030-01-01',
      endDate: '2031-01-01',
      monthlyRent: 12000000,
      deposit: 24000000,
      paymentDay: 5,
      status: 'awaiting-signature',
      contractHash: null,
      blockchainAddress: null,
      signedByTenant: false,
      signedByLandlord: false,
    })

    render(<ContractParticipantPanel contractId="contract-1" />)

    await waitFor(() => expect(screen.getByText('CTR-1')).toBeTruthy())
    expect(screen.getByPlaceholderText('Biometric grant ID')).toBeTruthy()
    expect(screen.getByText(/Cấp grant và ký/i)).toBeTruthy()
  })
})
