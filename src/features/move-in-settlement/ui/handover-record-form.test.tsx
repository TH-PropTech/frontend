import {
  cleanup,
  fireEvent,
  render,
  screen,
  waitFor,
} from '@testing-library/react'
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'
import * as api from '../api/move-in-settlement-api'
import { HandoverRecordForm } from './handover-record-form'

vi.mock('../api/move-in-settlement-api', () => ({
  getHandoverTemplate: vi.fn(),
}))
vi.mock('@/shared/api/upload-images', () => ({
  uploadImages: vi.fn().mockResolvedValue(['https://cdn.example.com/m.jpg']),
}))
vi.mock('@/entities/legal-source', async () => {
  const actual = await vi.importActual<object>('@/entities/legal-source')
  return { ...actual, LegalReferences: () => null }
})

const PHOTO = new File([new Uint8Array(10)], 'cong-to.jpg', {
  type: 'image/jpeg',
})

async function attachMeterPhotos(): Promise<void> {
  fireEvent.change(screen.getByLabelText('Chọn ảnh công tơ điện'), {
    target: { files: [PHOTO] },
  })
  await screen.findByAltText('Ảnh công tơ điện 1')
  fireEvent.change(screen.getByLabelText('Chọn ảnh công tơ nước'), {
    target: { files: [PHOTO] },
  })
  await screen.findByAltText('Ảnh công tơ nước 1')
}

const template = {
  key: 'move-in-handover',
  status: 'published' as const,
  version: 2,
  draftRevision: 1,
  contentHash: 'h',
  publishedAt: null,
  inventoryDefaults: [{ name: 'Tủ lạnh', quantity: 2 }],
  checklist: [
    { id: 'keys-handed', label: 'Đã giao chìa khóa' },
    { id: 'condition-checked', label: 'Đã kiểm tra hiện trạng' },
  ],
}

function fillRequired(): void {
  fireEvent.change(screen.getByLabelText('Thời gian bàn giao'), {
    target: { value: '2026-10-01T09:00' },
  })
  fireEvent.change(screen.getByLabelText('Chỉ số điện'), {
    target: { value: '10' },
  })
  fireEvent.change(screen.getByLabelText('Chỉ số nước'), {
    target: { value: '20' },
  })
  fireEvent.change(screen.getByLabelText('Số chìa khóa'), {
    target: { value: '2' },
  })
}

describe('HandoverRecordForm template', () => {
  beforeEach(() => {
    vi.mocked(api.getHandoverTemplate).mockReset()
  })
  afterEach(cleanup)

  it('prefills default items and sends the checklist answers', async () => {
    vi.mocked(api.getHandoverTemplate).mockResolvedValue(template)
    const onSubmit = vi.fn()
    render(
      <HandoverRecordForm busy={false} isRevision={false} onSubmit={onSubmit} />
    )

    expect(await screen.findByDisplayValue('Tủ lạnh')).toBeTruthy()
    fireEvent.click(screen.getByLabelText('Đã giao chìa khóa'))
    fillRequired()
    await attachMeterPhotos()
    fireEvent.click(screen.getByRole('button', { name: /Ghi biên bản/ }))

    await waitFor(() => expect(onSubmit).toHaveBeenCalledTimes(1))
    const sent = onSubmit.mock.calls[0]?.[0] as {
      checklist: unknown
      inventoryItems: Array<{ name: string; quantity: number }>
    }
    expect(sent.checklist).toEqual([
      { id: 'keys-handed', checked: true },
      { id: 'condition-checked', checked: false },
    ])
    expect(sent.inventoryItems[0]).toMatchObject({
      name: 'Tủ lạnh',
      quantity: 2,
    })
  })

  it('falls back to the blank form without a checklist when the template fails to load', async () => {
    vi.mocked(api.getHandoverTemplate).mockRejectedValue(new Error('offline'))
    const onSubmit = vi.fn()
    render(
      <HandoverRecordForm busy={false} isRevision={false} onSubmit={onSubmit} />
    )

    fillRequired()
    await attachMeterPhotos()
    fireEvent.click(screen.getByRole('button', { name: /Ghi biên bản/ }))

    await waitFor(() => expect(onSubmit).toHaveBeenCalledTimes(1))
    const sent = onSubmit.mock.calls[0]?.[0] as Record<string, unknown>
    expect('checklist' in sent).toBe(false)
    expect(sent.meterPhotos).toEqual({
      electricity: ['https://cdn.example.com/m.jpg'],
      water: ['https://cdn.example.com/m.jpg'],
    })
  })

  it('submits with only one meter photo attached', async () => {
    vi.mocked(api.getHandoverTemplate).mockResolvedValue(null)
    const onSubmit = vi.fn()
    render(
      <HandoverRecordForm busy={false} isRevision={false} onSubmit={onSubmit} />
    )
    fillRequired()
    fireEvent.change(screen.getByLabelText('Chọn ảnh công tơ điện'), {
      target: { files: [PHOTO] },
    })
    await screen.findByAltText('Ảnh công tơ điện 1')
    fireEvent.click(screen.getByRole('button', { name: /Ghi biên bản/ }))

    expect(onSubmit).toHaveBeenCalledTimes(1)
    expect(onSubmit.mock.calls[0]![0].meterPhotos.water).toEqual([])
    expect(onSubmit.mock.calls[0]![0].meterPhotos.electricity).toHaveLength(1)
  })

  it('shows the hand-back settlement note with the contract rates', () => {
    vi.mocked(api.getHandoverTemplate).mockResolvedValue(null)
    render(
      <HandoverRecordForm
        busy={false}
        isRevision={false}
        utilityRates={{
          electricityPerKwh: 3500,
          waterPerM3: 20000,
          serviceFeeMonthly: 200000,
        }}
        onSubmit={vi.fn()}
      />
    )
    expect(screen.getByText(/bàn giao lại nhà khi hết hợp đồng/)).toBeTruthy()
    expect(screen.getByTestId('utility-rates-line').textContent).toContain(
      'điện 3.500 đồng/kWh'
    )
  })
})
