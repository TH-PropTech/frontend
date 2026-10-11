import { afterEach, describe, expect, it, vi } from 'vitest'
import { cleanup, render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { ContractViewSwitcher } from './contract-view-switcher'

const mocks = vi.hoisted(() => ({ download: vi.fn() }))
vi.mock('../api/contracts-api', () => ({
  downloadContractArtifact: mocks.download,
}))

describe('ContractViewSwitcher', () => {
  afterEach(() => {
    cleanup()
    vi.clearAllMocks()
  })

  it('shows the page view first and only loads the PDF when its tab is opened', async () => {
    URL.createObjectURL = vi.fn(() => 'blob:pdf-1')
    URL.revokeObjectURL = vi.fn()
    mocks.download.mockResolvedValue(new Blob(['%PDF-1.7']))
    const user = userEvent.setup()
    render(
      <ContractViewSwitcher
        contractId="c-1"
        contractCode="HD-1"
        pdfAvailable
        page={<div>Bản trình bày hợp đồng</div>}
      />
    )

    expect(screen.getByText('Bản trình bày hợp đồng')).toBeTruthy()
    expect(mocks.download).not.toHaveBeenCalled()

    await user.click(screen.getByRole('tab', { name: /Bản PDF/ }))
    expect(await screen.findByTitle('Bản PDF hợp đồng HD-1')).toBeTruthy()
    expect(mocks.download).toHaveBeenCalledWith('c-1', 'pdf')
  })

  it('disables the PDF tab until the PDF has been locked', () => {
    render(
      <ContractViewSwitcher
        contractId="c-1"
        contractCode="HD-1"
        pdfAvailable={false}
        page={<div>Bản trình bày hợp đồng</div>}
      />
    )

    expect(
      (screen.getByRole('tab', { name: /Bản PDF/ }) as HTMLButtonElement)
        .disabled
    ).toBe(true)
    expect(mocks.download).not.toHaveBeenCalled()
  })
})
