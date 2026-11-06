import { fireEvent, render, screen, waitFor } from '@testing-library/react'
import { beforeEach, describe, expect, it, vi } from 'vitest'
import { ContractAmendmentTimeline } from './contract-amendment-timeline'

const getAmendments = vi.hoisted(() => vi.fn())
const createAmendment = vi.hoisted(() => vi.fn())

vi.mock('../api/contracts-api', () => ({
  getContractAmendments: getAmendments,
  createContractAmendment: createAmendment,
}))

// DatePicker thật dùng popover; thay bằng ô nhập ISO để test jsdom.
vi.mock('@/shared/ui/date-picker', () => ({
  DatePicker: (props: {
    label?: string
    value: string
    onChange: (value: string) => void
  }) => (
    <input
      aria-label={props.label}
      value={props.value}
      onChange={event => props.onChange(event.target.value)}
    />
  ),
}))

function renderParticipantForm(): void {
  render(
    <ContractAmendmentTimeline
      contractId="contract-1"
      canManage={false}
      canRequest
      canSign
    />
  )
}

function fillDate(): void {
  fireEvent.change(screen.getByLabelText(/Ngày bắt đầu áp dụng/), {
    target: { value: '2030-01-01' },
  })
}

describe('ContractAmendmentTimeline', () => {
  beforeEach(() => {
    vi.clearAllMocks()
    getAmendments.mockResolvedValue([])
  })

  it('shows an empty state for a contract with no amendments', async () => {
    render(
      <ContractAmendmentTimeline
        contractId="contract-1"
        canManage={false}
        canSign={false}
      />
    )

    await waitFor(() =>
      expect(getAmendments).toHaveBeenCalledWith('contract-1')
    )
    expect(
      screen.getByTestId('contract-amendment-timeline')
    ).toBeInTheDocument()
    expect(screen.getByText(/phụ lục nào/)).toBeInTheDocument()
  })

  it('lets a participant start an amendment without staff rights', async () => {
    render(
      <ContractAmendmentTimeline
        contractId="contract-1"
        canManage={false}
        canRequest
        canSign
      />
    )
    await waitFor(() => expect(getAmendments).toHaveBeenCalled())
    expect(screen.getByLabelText(/Giá thuê mới/)).toBeInTheDocument()
  })

  it('hides the create form from a viewer who cannot request', async () => {
    render(
      <ContractAmendmentTimeline
        contractId="contract-1"
        canManage={false}
        canSign={false}
      />
    )
    await waitFor(() => expect(getAmendments).toHaveBeenCalled())
    expect(screen.queryByLabelText(/Giá thuê mới/)).not.toBeInTheDocument()
  })

  it('lets a participant amend the custom clauses with a character counter', async () => {
    createAmendment.mockResolvedValue({})
    renderParticipantForm()
    await waitFor(() => expect(getAmendments).toHaveBeenCalled())

    const clauses = screen.getByLabelText(/Điều khoản riêng/)
    fireEvent.change(clauses, { target: { value: 'Không nuôi thú cưng.' } })
    fillDate()

    expect(screen.getByText('20/2000')).toBeInTheDocument()
    fireEvent.click(screen.getByRole('button', { name: 'Tạo phụ lục' }))

    await waitFor(() => expect(createAmendment).toHaveBeenCalledTimes(1))
    expect(createAmendment).toHaveBeenCalledWith('contract-1', {
      changes: [{ field: 'customClauses', after: 'Không nuôi thú cưng.' }],
      effectiveFrom: new Date('2030-01-01T00:00:00').toISOString(),
    })
  })

  it('sends rent and custom clauses together when both are filled', async () => {
    createAmendment.mockResolvedValue({})
    renderParticipantForm()
    await waitFor(() => expect(getAmendments).toHaveBeenCalled())

    fireEvent.change(screen.getByLabelText(/Giá thuê mới/), {
      target: { value: '17000000' },
    })
    fireEvent.change(screen.getByLabelText(/Điều khoản riêng/), {
      target: { value: 'Giữ xe miễn phí.' },
    })
    fillDate()
    fireEvent.click(screen.getByRole('button', { name: 'Tạo phụ lục' }))

    await waitFor(() => expect(createAmendment).toHaveBeenCalledTimes(1))
    expect(createAmendment.mock.calls[0]?.[1].changes).toEqual([
      { field: 'monthlyRent', after: 17_000_000 },
      { field: 'customClauses', after: 'Giữ xe miễn phí.' },
    ])
  })

  it('keeps the create button disabled with no change or no date', async () => {
    renderParticipantForm()
    await waitFor(() => expect(getAmendments).toHaveBeenCalled())
    const button = screen.getByRole('button', { name: 'Tạo phụ lục' })

    fillDate()
    expect(button).toBeDisabled()

    fireEvent.change(screen.getByLabelText(/Điều khoản riêng/), {
      target: { value: '   ' },
    })
    expect(button).toBeDisabled()

    fireEvent.change(screen.getByLabelText(/Điều khoản riêng/), {
      target: { value: 'Có nội dung' },
    })
    expect(button).toBeEnabled()
  })

  it('caps the custom clauses at 2000 characters', async () => {
    renderParticipantForm()
    await waitFor(() => expect(getAmendments).toHaveBeenCalled())

    expect(screen.getByLabelText(/Điều khoản riêng/)).toHaveAttribute(
      'maxlength',
      '2000'
    )
  })

  it('shows the backend error when creating the amendment fails', async () => {
    createAmendment.mockRejectedValue(new Error('Không tạo được phụ lục.'))
    renderParticipantForm()
    await waitFor(() => expect(getAmendments).toHaveBeenCalled())

    fireEvent.change(screen.getByLabelText(/Điều khoản riêng/), {
      target: { value: 'Nội dung' },
    })
    fillDate()
    fireEvent.click(screen.getByRole('button', { name: 'Tạo phụ lục' }))

    expect(
      await screen.findByText('Không tạo được phụ lục.')
    ).toBeInTheDocument()
  })
})
