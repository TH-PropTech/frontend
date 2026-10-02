import { fireEvent, render, screen, waitFor } from '@testing-library/react'
import { describe, expect, it, vi } from 'vitest'
import { LayoutProfileEditor } from './layout-profile-editor'

const mocks = vi.hoisted(() => ({ preview: vi.fn(), save: vi.fn() }))

vi.mock('../api/contract-layouts-api', () => ({
  previewContractLayout: mocks.preview,
  saveContractLayoutDraft: mocks.save,
}))

const profile = {
  profileKey: 'default',
  version: 1,
  status: 'draft' as const,
  legalProfile: 'PRIVATE_CIVIL_APARTMENT_LEASE' as const,
  blocks: [
    { blockId: 'PARTIES', order: 1, title: 'Parties', visible: true },
    { blockId: 'SIGNATURES', order: 2, title: 'Signatures', visible: true },
  ],
  supplementaryClauses: [],
}

describe('LayoutProfileEditor', () => {
  it('does not allow hiding a mandatory block and calls preview endpoint', async () => {
    mocks.preview.mockResolvedValue(profile)
    render(
      <LayoutProfileEditor profileKey="default" initialProfile={profile} />
    )

    const requiredSwitch = screen.getByRole('switch', {
      name: 'Hiển thị Signatures',
    })
    expect(requiredSwitch).toBeDisabled()
    fireEvent.click(screen.getByRole('button', { name: /Xem trước/i }))

    await waitFor(() => expect(mocks.preview).toHaveBeenCalledWith('default'))
  })
})
