import { fireEvent, render, screen, waitFor } from '@testing-library/react'
import { beforeEach, describe, expect, it, vi } from 'vitest'
import { ContractEditorPanel } from './contract-editor-panel'

const mocks = vi.hoisted(() => ({ save: vi.fn(), lock: vi.fn() }))
vi.mock('../api/contracts-api', () => ({
  saveContractContent: mocks.save,
  lockContractContent: mocks.lock,
}))

describe('ContractEditorPanel', () => {
  beforeEach(() => vi.clearAllMocks())

  it('saves with the observed revision and then locks through CAS', async () => {
    const contract = {
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
      status: 'draft' as const,
      contractHash: null,
      blockchainAddress: null,
      signedByTenant: false,
      signedByLandlord: false,
      contentRevision: 2,
    }
    mocks.save.mockResolvedValue({ ...contract, contentRevision: 3 })
    mocks.lock.mockResolvedValue({
      ...contract,
      contentRevision: 3,
      contentLockedHash: 'a'.repeat(64),
    })
    const onChange = vi.fn()
    render(
      <ContractEditorPanel
        contract={contract}
        initialContent={{ sections: [] }}
        onChange={onChange}
      />
    )

    fireEvent.click(screen.getByRole('button', { name: /Lưu bản nháp/i }))
    await waitFor(() =>
      expect(mocks.save).toHaveBeenCalledWith('contract-1', { sections: [] }, 2)
    )
    fireEvent.click(screen.getByRole('button', { name: /Khóa nội dung/i }))
    await waitFor(() =>
      expect(mocks.lock).toHaveBeenCalledWith('contract-1', 2)
    )
  })
})
