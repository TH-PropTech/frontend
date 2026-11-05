import {
  cleanup,
  fireEvent,
  render,
  screen,
  waitFor,
} from '@testing-library/react'
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'
import * as moveIn from '@/features/move-in-settlement'
import { HandoverTemplateTab } from './handover-template-tab'

vi.mock('@/features/move-in-settlement', () => ({
  getHandoverTemplateAdmin: vi.fn(),
  saveHandoverTemplateDraft: vi.fn(),
  publishHandoverTemplate: vi.fn(),
}))

const published = {
  key: 'move-in-handover',
  status: 'published' as const,
  version: 2,
  draftRevision: 1,
  contentHash: 'h',
  publishedAt: null,
  inventoryDefaults: [{ name: 'Tủ lạnh', quantity: 1 }],
  checklist: [{ id: 'keys-handed', label: 'Đã giao chìa khóa' }],
}

describe('HandoverTemplateTab', () => {
  beforeEach(() => {
    vi.mocked(moveIn.getHandoverTemplateAdmin).mockResolvedValue({
      published,
      draft: null,
    })
  })
  afterEach(cleanup)

  it('loads the published template and keeps publish disabled until a draft is saved', async () => {
    render(<HandoverTemplateTab />)

    expect(await screen.findByDisplayValue('Tủ lạnh')).toBeTruthy()
    expect(screen.getByDisplayValue('Đã giao chìa khóa')).toBeTruthy()
    expect(
      (screen.getByRole('button', { name: 'Phát hành' }) as HTMLButtonElement)
        .disabled
    ).toBe(true)
  })

  it('saves an edited draft with the expected revision', async () => {
    vi.mocked(moveIn.saveHandoverTemplateDraft).mockResolvedValue(published)
    render(<HandoverTemplateTab />)
    const label = await screen.findByDisplayValue('Đã giao chìa khóa')

    fireEvent.change(label, { target: { value: 'Đã giao 2 chìa khóa' } })
    fireEvent.click(screen.getByRole('button', { name: /Lưu bản nháp/ }))

    await waitFor(() =>
      expect(moveIn.saveHandoverTemplateDraft).toHaveBeenCalledWith(1, {
        inventoryDefaults: [{ name: 'Tủ lạnh', quantity: 1 }],
        checklist: [{ id: 'keys-handed', label: 'Đã giao 2 chìa khóa' }],
      })
    )
  })

  it('publishes the saved draft with a reason', async () => {
    vi.mocked(moveIn.getHandoverTemplateAdmin).mockResolvedValue({
      published,
      draft: { ...published, status: 'draft', version: null, draftRevision: 3 },
    })
    vi.mocked(moveIn.publishHandoverTemplate).mockResolvedValue({
      ...published,
      version: 3,
    })
    render(<HandoverTemplateTab />)
    await screen.findByDisplayValue('Tủ lạnh')

    fireEvent.change(screen.getByLabelText('Lý do phát hành'), {
      target: { value: 'đổi checklist' },
    })
    fireEvent.click(screen.getByRole('button', { name: 'Phát hành' }))

    await waitFor(() =>
      expect(moveIn.publishHandoverTemplate).toHaveBeenCalledWith(
        3,
        'đổi checklist'
      )
    )
  })
})
