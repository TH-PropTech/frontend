import { fireEvent, render, screen, waitFor } from '@testing-library/react'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { beforeEach, describe, expect, it, vi } from 'vitest'
import { ApiClientError } from '@/shared/api'
import * as api from '../api/move-out-api'
import {
  BANNED_TERMS,
  HASH,
  INTERNAL_CODE,
  makeHandover,
} from '../test-fixtures/move-out.fixtures'
import type { MoveOutGates } from '../api/move-out-types'
import { MoveOutHandoverSection } from './move-out-handover-section'

vi.mock('../api/move-out-api', () => ({
  getMoveOutHandover: vi.fn(),
  recordMoveOutHandover: vi.fn(),
  reviseMoveOutHandover: vi.fn(),
  confirmMoveOutHandover: vi.fn(),
  objectMoveOutHandover: vi.fn(),
  disputeMoveOutHandover: vi.fn(),
  downloadMoveOutHandoverPdf: vi.fn(),
}))
vi.mock('sonner', () => ({ toast: { error: vi.fn() } }))

const renderSection = (
  role: 'tenant' | 'landlord',
  gates?: MoveOutGates,
  onChanged?: () => unknown
) => {
  const onCompletedChange = vi.fn()
  const client = new QueryClient({
    defaultOptions: { queries: { retry: false } },
  })
  render(
    <QueryClientProvider client={client}>
      <MoveOutHandoverSection
        contractId="c1"
        role={role}
        gates={gates}
        onChanged={onChanged}
        onCompletedChange={onCompletedChange}
      />
    </QueryClientProvider>
  )
  return { onCompletedChange }
}

describe('MoveOutHandoverSection', () => {
  beforeEach(() => vi.clearAllMocks())

  it('shows loading then an error with retry', async () => {
    vi.mocked(api.getMoveOutHandover).mockRejectedValue(new Error('x'))
    renderSection('tenant')
    expect(screen.getByRole('status').textContent).toMatch(/Đang tải/)
    expect(await screen.findByRole('alert')).toBeDefined()
    fireEvent.click(screen.getByRole('button', { name: 'Thử lại' }))
    await waitFor(() => expect(api.getMoveOutHandover).toHaveBeenCalledTimes(2))
  })

  it('tells the tenant nothing is recorded yet (empty state)', async () => {
    vi.mocked(api.getMoveOutHandover).mockResolvedValue(null)
    renderSection('tenant')
    expect(await screen.findByText(/Chủ nhà chưa lập biên bản/)).toBeDefined()
  })

  it('lets the landlord record a handover', async () => {
    vi.mocked(api.getMoveOutHandover).mockResolvedValue(null)
    vi.mocked(api.recordMoveOutHandover).mockResolvedValue(makeHandover())
    renderSection('landlord')
    const form = await screen.findByRole('form', { name: 'Biên bản trả nhà' })
    const inputs = form.querySelectorAll('input')
    fireEvent.change(inputs[0] as HTMLInputElement, {
      target: { value: '2026-10-01T10:00' },
    })
    fireEvent.change(inputs[1] as HTMLInputElement, {
      target: { value: '120' },
    })
    fireEvent.change(inputs[2] as HTMLInputElement, { target: { value: '30' } })
    fireEvent.change(inputs[3] as HTMLInputElement, { target: { value: '2' } })
    fireEvent.click(
      screen.getByRole('button', { name: 'Ghi biên bản trả nhà' })
    )
    await waitFor(() => expect(api.recordMoveOutHandover).toHaveBeenCalled())
    const input = vi.mocked(api.recordMoveOutHandover).mock.calls[0]?.[1]
    expect(input).toMatchObject({ electricity: 120, water: 30, keyCount: 2 })
  })

  it('lets the tenant confirm with the current hash', async () => {
    vi.mocked(api.getMoveOutHandover).mockResolvedValue(makeHandover())
    vi.mocked(api.confirmMoveOutHandover).mockResolvedValue(makeHandover())
    renderSection('tenant')
    fireEvent.click(
      await screen.findByRole('button', { name: 'Xác nhận biên bản' })
    )
    await waitFor(() =>
      expect(api.confirmMoveOutHandover).toHaveBeenCalledWith('c1', HASH)
    )
  })

  it('tells the parent to refresh the contract after a successful action', async () => {
    vi.mocked(api.getMoveOutHandover).mockResolvedValue(makeHandover())
    vi.mocked(api.confirmMoveOutHandover).mockResolvedValue(makeHandover())
    const onChanged = vi.fn()
    renderSection('tenant', undefined, onChanged)
    fireEvent.click(
      await screen.findByRole('button', { name: 'Xác nhận biên bản' })
    )
    await waitFor(() => expect(onChanged).toHaveBeenCalledTimes(1))
  })

  it('does not refresh the contract when the action fails', async () => {
    vi.mocked(api.getMoveOutHandover).mockResolvedValue(makeHandover())
    vi.mocked(api.confirmMoveOutHandover).mockRejectedValue(new Error('x'))
    const onChanged = vi.fn()
    renderSection('tenant', undefined, onChanged)
    fireEvent.click(
      await screen.findByRole('button', { name: 'Xác nhận biên bản' })
    )
    await screen.findByRole('alert')
    expect(onChanged).not.toHaveBeenCalled()
  })

  it('requires a note to object and sends it', async () => {
    vi.mocked(api.getMoveOutHandover).mockResolvedValue(makeHandover())
    vi.mocked(api.objectMoveOutHandover).mockResolvedValue(makeHandover())
    renderSection('tenant')
    fireEvent.click(
      await screen.findByRole('button', { name: 'Phản đối biên bản' })
    )
    const submit = screen.getByRole('button', { name: 'Gửi phản đối' })
    expect((submit as HTMLButtonElement).disabled).toBe(true)
    fireEvent.change(screen.getByLabelText('Điểm chưa đúng'), {
      target: { value: 'Sai số điện' },
    })
    fireEvent.click(submit)
    await waitFor(() =>
      expect(api.objectMoveOutHandover).toHaveBeenCalledWith(
        'c1',
        HASH,
        'Sai số điện'
      )
    )
  })

  it('shows a mapped error message when the revision is stale', async () => {
    vi.mocked(api.getMoveOutHandover).mockResolvedValue(makeHandover())
    vi.mocked(api.confirmMoveOutHandover).mockRejectedValue(
      new ApiClientError('x', 409, {
        code: 'MOVE_OUT_REVISION_STALE',
        message: 'x',
      })
    )
    renderSection('tenant')
    fireEvent.click(
      await screen.findByRole('button', { name: 'Xác nhận biên bản' })
    )
    expect((await screen.findByRole('alert')).textContent).toMatch(
      /vừa được cập nhật/
    )
  })

  it('says the deadline has passed when the response window is over', async () => {
    vi.mocked(api.getMoveOutHandover).mockResolvedValue(
      makeHandover({ responseDueAt: '2020-01-01T00:00:00.000Z' })
    )
    renderSection('tenant')
    expect(
      await screen.findByText(/Đã quá hạn, biên bản sẽ được xem là đã đồng ý/)
    ).toBeDefined()
  })

  it('offers the PDF and reports completion when the handover is completed', async () => {
    vi.mocked(api.getMoveOutHandover).mockResolvedValue(
      makeHandover({
        status: 'completed',
        completedAt: '2026-10-03T00:00:00.000Z',
        completionReason: 'tenant-no-response',
      })
    )
    const { onCompletedChange } = renderSection('landlord')
    expect(
      await screen.findByRole('button', { name: /Tải PDF biên bản/ })
    ).toBeDefined()
    expect(screen.getByText(/không phản hồi trong hạn/)).toBeDefined()
    await waitFor(() =>
      expect(onCompletedChange).toHaveBeenLastCalledWith(true)
    )
  })

  it('shows the disputed state without banned terms or internal codes', async () => {
    vi.mocked(api.getMoveOutHandover).mockResolvedValue(
      makeHandover({
        status: 'disputed',
        dispute: {
          by: 'tenant',
          note: 'Không đồng ý',
          at: '2026-10-02T00:00:00.000Z',
        },
      })
    )
    renderSection('landlord')
    expect(await screen.findByText(/Nền tảng không phân xử/)).toBeDefined()
    const text = document.body.textContent ?? ''
    expect(text).not.toMatch(BANNED_TERMS)
    expect(text).not.toMatch(INTERNAL_CODE)
  })
  it('disables confirm and objection and explains why when the flow blocks them', async () => {
    vi.mocked(api.getMoveOutHandover).mockResolvedValue(makeHandover())
    renderSection('tenant', {
      CONFIRM_MOVE_OUT_HANDOVER: {
        enabled: false,
        reasonCode: 'MOVE_OUT_HANDOVER_DISPUTED',
      },
      REPORT_MOVE_OUT_DISCREPANCY: {
        enabled: false,
        reasonCode: 'MOVE_OUT_HANDOVER_DISPUTED',
      },
    })
    const confirm = await screen.findByRole('button', {
      name: 'Xác nhận biên bản',
    })
    expect((confirm as HTMLButtonElement).disabled).toBe(true)
    const reasons = screen.getAllByTestId('move-out-blocked-reason')
    expect(reasons).toHaveLength(1)
    expect(reasons[0]?.textContent).toMatch(/đang có tranh chấp/)
    expect(document.body.textContent ?? '').not.toMatch(INTERNAL_CODE)
  })

  it('keeps actions enabled when the flow enables them', async () => {
    vi.mocked(api.getMoveOutHandover).mockResolvedValue(makeHandover())
    renderSection('tenant', {
      CONFIRM_MOVE_OUT_HANDOVER: { enabled: true, reasonCode: null },
    })
    const confirm = await screen.findByRole('button', {
      name: 'Xác nhận biên bản',
    })
    expect((confirm as HTMLButtonElement).disabled).toBe(false)
    expect(screen.queryByTestId('move-out-blocked-reason')).toBeNull()
  })
})
