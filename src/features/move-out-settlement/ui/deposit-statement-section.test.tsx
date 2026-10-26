import {
  fireEvent,
  render,
  screen,
  waitFor,
  within,
} from '@testing-library/react'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { beforeEach, describe, expect, it, vi } from 'vitest'
import { ApiClientError } from '@/shared/api'
import * as api from '../api/move-out-api'
import {
  BANNED_TERMS,
  INTERNAL_CODE,
  makeStatement,
} from '../test-fixtures/move-out.fixtures'
import type { MoveOutGates } from '../api/move-out-types'
import { DepositStatementSection } from './deposit-statement-section'

vi.mock('../api/move-out-api', () => ({
  getDepositStatement: vi.fn(),
  saveDepositStatementDraft: vi.fn(),
  submitDepositStatement: vi.fn(),
  respondDepositStatement: vi.fn(),
  disputeDepositStatement: vi.fn(),
  recordDepositRefund: vi.fn(),
  acknowledgeDepositRefund: vi.fn(),
  uploadEvidencePhotos: vi.fn(),
}))

const renderSection = (
  role: 'tenant' | 'landlord',
  enabled = true,
  gates?: MoveOutGates
): ReturnType<typeof render> => {
  const client = new QueryClient({
    defaultOptions: { queries: { retry: false } },
  })
  return render(
    <QueryClientProvider client={client}>
      <DepositStatementSection
        contractId="c1"
        role={role}
        enabled={enabled}
        gates={gates}
        depositAmount={10_000_000}
      />
    </QueryClientProvider>
  )
}

describe('DepositStatementSection', () => {
  beforeEach(() => vi.clearAllMocks())

  it('stays closed until the move-out handover is completed', () => {
    renderSection('landlord', false)
    expect(
      screen.getByText(/sẽ mở sau khi biên bản trả nhà hoàn tất/)
    ).toBeDefined()
    expect(api.getDepositStatement).not.toHaveBeenCalled()
  })

  it('shows an error with retry when loading fails', async () => {
    vi.mocked(api.getDepositStatement).mockRejectedValue(new Error('x'))
    renderSection('tenant')
    expect(await screen.findByRole('button', { name: 'Thử lại' })).toBeDefined()
  })

  it('shows the empty state to the tenant', async () => {
    vi.mocked(api.getDepositStatement).mockResolvedValue(null)
    renderSection('tenant')
    expect(
      await screen.findByText(/Chủ nhà chưa lập bảng khấu trừ/)
    ).toBeDefined()
  })

  it('blocks a landlord draft whose total exceeds the deposit', async () => {
    vi.mocked(api.getDepositStatement).mockResolvedValue(null)
    renderSection('landlord')
    fireEvent.click(
      await screen.findByRole('button', { name: /Thêm khoản khấu trừ/ })
    )
    const row = screen.getByTestId('deduction-line-editor')
    const [reason, amount] = Array.from(row.querySelectorAll('input'))
    fireEvent.change(reason as HTMLInputElement, {
      target: { value: 'Sửa tường' },
    })
    fireEvent.change(amount as HTMLInputElement, {
      target: { value: '10000001' },
    })
    expect(screen.getByRole('alert').textContent).toMatch(/vượt quá tiền cọc/)
    expect(
      (
        screen.getByRole('button', {
          name: 'Chốt và gửi khách',
        }) as HTMLButtonElement
      ).disabled
    ).toBe(true)
    fireEvent.change(amount as HTMLInputElement, {
      target: { value: '500000' },
    })
    vi.mocked(api.saveDepositStatementDraft).mockResolvedValue(makeStatement())
    vi.mocked(api.submitDepositStatement).mockResolvedValue(makeStatement())
    fireEvent.click(screen.getByRole('button', { name: 'Chốt và gửi khách' }))
    await waitFor(() =>
      expect(api.submitDepositStatement).toHaveBeenCalledWith('c1')
    )
    expect(api.saveDepositStatementDraft).toHaveBeenCalledWith('c1', [
      { reason: 'Sửa tường', amount: 500000 },
    ])
  })

  it('uploads an evidence photo and attaches its URL', async () => {
    vi.mocked(api.getDepositStatement).mockResolvedValue(null)
    vi.mocked(api.uploadEvidencePhotos).mockResolvedValue([
      'https://cdn.test/a.png',
    ])
    renderSection('landlord')
    fireEvent.click(
      await screen.findByRole('button', { name: /Thêm khoản khấu trừ/ })
    )
    fireEvent.change(screen.getByTestId('evidence-input-0'), {
      target: { files: [new File(['x'], 'a.png', { type: 'image/png' })] },
    })
    expect(
      await screen.findByAltText('Ảnh chứng từ khoản khấu trừ')
    ).toBeDefined()
  })

  it('rejects a non-image evidence file before uploading', async () => {
    vi.mocked(api.getDepositStatement).mockResolvedValue(null)
    renderSection('landlord')
    fireEvent.click(
      await screen.findByRole('button', { name: /Thêm khoản khấu trừ/ })
    )
    fireEvent.change(screen.getByTestId('evidence-input-0'), {
      target: {
        files: [new File(['x'], 'a.pdf', { type: 'application/pdf' })],
      },
    })
    expect((await screen.findByRole('alert')).textContent).toMatch(
      /JPG hoặc PNG/
    )
    expect(api.uploadEvidencePhotos).not.toHaveBeenCalled()
  })

  it('lets the tenant accept one line and reject another with a required note', async () => {
    vi.mocked(api.getDepositStatement).mockResolvedValue(makeStatement())
    vi.mocked(api.respondDepositStatement).mockResolvedValue(makeStatement())
    renderSection('tenant')
    const lines = await screen.findAllByTestId('deduction-line')
    fireEvent.click(within(lines[0] as HTMLElement).getByLabelText('Đồng ý'))
    fireEvent.click(within(lines[1] as HTMLElement).getByLabelText('Phản đối'))
    const send = screen.getByRole('button', {
      name: 'Gửi phản hồi',
    }) as HTMLButtonElement
    expect(send.disabled).toBe(true)
    fireEvent.change(screen.getByLabelText('Lý do phản đối khoản 2'), {
      target: { value: 'Không có hư hỏng' },
    })
    fireEvent.click(send)
    await waitFor(() =>
      expect(api.respondDepositStatement).toHaveBeenCalledWith('c1', [
        { lineId: 'l1', decision: 'accept' },
        { lineId: 'l2', decision: 'reject', note: 'Không có hư hỏng' },
      ])
    )
  })

  it('explains the expired window and blocks responses', async () => {
    vi.mocked(api.getDepositStatement).mockResolvedValue(
      makeStatement({ responseDueAt: '2020-01-01T00:00:00.000Z' })
    )
    renderSection('tenant')
    expect(
      await screen.findByText(/Đã quá hạn phản hồi nên không thể gửi thêm/)
    ).toBeDefined()
    expect(screen.queryByRole('button', { name: 'Gửi phản hồi' })).toBeNull()
  })

  it('maps a server-side expired error to plain Vietnamese', async () => {
    vi.mocked(api.getDepositStatement).mockResolvedValue(makeStatement())
    vi.mocked(api.respondDepositStatement).mockRejectedValue(
      new ApiClientError('x', 409, {
        code: 'STATEMENT_RESPONSE_EXPIRED',
        message: 'x',
      })
    )
    renderSection('tenant')
    const lines = await screen.findAllByTestId('deduction-line')
    for (const line of lines) {
      fireEvent.click(within(line as HTMLElement).getByLabelText('Đồng ý'))
    }
    fireEvent.click(screen.getByRole('button', { name: 'Gửi phản hồi' }))
    expect((await screen.findByRole('alert')).textContent).toMatch(
      /Đã quá hạn phản hồi bảng khấu trừ/
    )
  })

  it('records a refund declaration without any file input and shows the disclaimer', async () => {
    vi.mocked(api.getDepositStatement).mockResolvedValue(
      makeStatement({
        status: 'accepted',
        refundDueAt: '2999-01-01T00:00:00.000Z',
      })
    )
    vi.mocked(api.recordDepositRefund).mockResolvedValue(makeStatement())
    renderSection('landlord')
    const form = await screen.findByRole('form', {
      name: 'Khai báo đã hoàn cọc',
    })
    expect(form.querySelector('input[type="file"]')).toBeNull()
    expect(
      screen.getByText(
        /Nền tảng không giữ, không chuyển và không kiểm chứng tiền/
      )
    ).toBeDefined()
    const [amount, paidAt, ref] = Array.from(form.querySelectorAll('input'))
    fireEvent.change(amount as HTMLInputElement, {
      target: { value: '7500000' },
    })
    fireEvent.change(paidAt as HTMLInputElement, {
      target: { value: '2026-10-05T09:00' },
    })
    fireEvent.change(ref as HTMLInputElement, { target: { value: 'FT123' } })
    fireEvent.click(screen.getByRole('button', { name: 'Tôi đã hoàn cọc' }))
    await waitFor(() => expect(api.recordDepositRefund).toHaveBeenCalled())
    expect(vi.mocked(api.recordDepositRefund).mock.calls[0]?.[1]).toMatchObject(
      {
        amount: 7500000,
        transactionRef: 'FT123',
      }
    )
  })

  it('lets the tenant acknowledge a declared refund', async () => {
    vi.mocked(api.getDepositStatement).mockResolvedValue(
      makeStatement({
        status: 'refund-recorded',
        refunds: [
          {
            id: 'r1',
            amount: 7_500_000,
            transactionRef: 'FT123',
            paidAt: '2026-10-05T00:00:00.000Z',
            note: null,
            recordedAt: '2026-10-05T00:00:00.000Z',
            tenantAcknowledgedAt: null,
          },
        ],
      })
    )
    vi.mocked(api.acknowledgeDepositRefund).mockResolvedValue(makeStatement())
    renderSection('tenant')
    fireEvent.click(await screen.findByRole('button', { name: 'Tôi đã nhận' }))
    await waitFor(() =>
      expect(api.acknowledgeDepositRefund).toHaveBeenCalledWith('c1', 'r1')
    )
  })

  it('shows the overdue refund status and stays free of banned terms and codes', async () => {
    vi.mocked(api.getDepositStatement).mockResolvedValue(
      makeStatement({
        status: 'accepted',
        acceptedReason: 'tenant-no-response',
        refundDueAt: '2020-01-01T00:00:00.000Z',
        refundOverdueAt: '2020-01-02T00:00:00.000Z',
      })
    )
    renderSection('tenant')
    expect((await screen.findAllByRole('alert'))[0]?.textContent).toMatch(
      /Quá hạn hoàn cọc/
    )
    const text = document.body.textContent ?? ''
    expect(text).not.toMatch(BANNED_TERMS)
    expect(text).not.toMatch(INTERNAL_CODE)
  })

  it('shows the closed reason', async () => {
    vi.mocked(api.getDepositStatement).mockResolvedValue(
      makeStatement({ status: 'closed', closeReason: 'tenant-acknowledged' })
    )
    renderSection('landlord')
    expect(
      await screen.findByText(/đã xác nhận nhận đủ tiền cọc/)
    ).toBeDefined()
  })
  it('disables the tenant response and refund acknowledgement with Vietnamese reasons', async () => {
    vi.mocked(api.getDepositStatement).mockResolvedValue(makeStatement())
    renderSection('tenant', true, {
      RESPOND_DEPOSIT_STATEMENT: {
        enabled: false,
        reasonCode: 'STATEMENT_NOT_AWAITING_TENANT',
      },
    })
    const lines = await screen.findAllByTestId('deduction-line')
    for (const line of lines) {
      fireEvent.click(within(line as HTMLElement).getByLabelText('Đồng ý'))
    }
    expect(
      (
        screen.getByRole('button', {
          name: 'Gửi phản hồi',
        }) as HTMLButtonElement
      ).disabled
    ).toBe(true)
    expect(screen.getByTestId('move-out-blocked-reason').textContent).toMatch(
      /không còn chờ phản hồi/
    )
  })

  it('blocks the landlord refund form when the flow disallows it', async () => {
    vi.mocked(api.getDepositStatement).mockResolvedValue(
      makeStatement({ status: 'accepted' })
    )
    renderSection('landlord', true, {
      RECORD_DEPOSIT_REFUND: {
        enabled: false,
        reasonCode: 'STATEMENT_REFUND_NOT_ALLOWED',
      },
    })
    const submit = await screen.findByRole('button', {
      name: 'Tôi đã hoàn cọc',
    })
    expect((submit as HTMLButtonElement).disabled).toBe(true)
    expect(screen.getByTestId('move-out-blocked-reason').textContent).toMatch(
      /Chưa thể khai báo hoàn cọc/
    )
  })
})
