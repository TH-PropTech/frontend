import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import { AdminContractList } from './admin-contract-list'

describe('AdminContractList', () => {
  it('links each contract to the existing commercial editor', () => {
    render(
      <AdminContractList
        initialContracts={[
          {
            _id: 'contract-1',
            contractCode: 'CTR-1',
            propertyId: 'property-1',
            propertyTitle: 'Demo apartment',
            tenantId: 'tenant-1',
            landlordId: 'landlord-1',
            startDate: '2026-01-01',
            endDate: '2027-01-01',
            monthlyRent: 100,
            deposit: 100,
            paymentDay: 1,
            status: 'active',
            contractHash: null,
            blockchainAddress: null,
            signedByTenant: true,
            signedByLandlord: true,
          },
        ]}
      />
    )
    expect(screen.getByRole('link', { name: /CTR-1/ })).toHaveAttribute(
      'href',
      '/admin/contracts/contract-1'
    )
  })
})
