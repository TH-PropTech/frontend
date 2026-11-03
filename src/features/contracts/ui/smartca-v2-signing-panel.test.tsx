import { fireEvent, render, screen, waitFor } from '@testing-library/react'
import { beforeEach, describe, expect, it, vi } from 'vitest'
import { SmartCaV2SigningPanel } from './smartca-v2-signing-panel'

const {
  cancelSmartCaSigningSession,
  pollSmartCaSigningSession,
  submitSmartCaV2Sign,
} = vi.hoisted(() => ({
  cancelSmartCaSigningSession: vi.fn(),
  pollSmartCaSigningSession: vi.fn(),
  submitSmartCaV2Sign: vi.fn(),
}))

vi.mock('../api/contracts-api', () => ({
  cancelSmartCaSigningSession,
  pollSmartCaSigningSession,
  submitSmartCaV2Sign,
}))

function pendingSession(overrides: Record<string, unknown> = {}) {
  return {
    id: 'session-1',
    contractId: 'contract-1',
    signerId: 'tenant-1',
    signerRole: 'tenant',
    artifactHash: 'a'.repeat(64),
    providerTransactionId: 'provider-tx-1',
    status: 'pending',
    expiresAt: new Date(Date.now() + 5 * 60 * 1000).toISOString(),
    ...overrides,
  }
}

async function fillAndSubmit(): Promise<void> {
  fireEvent.change(screen.getByLabelText('Mật khẩu SmartCA'), {
    target: { value: 'Secret@123' },
  })
  fireEvent.change(screen.getByLabelText('OTP SmartCA'), {
    target: { value: '123456' },
  })
  fireEvent.click(
    screen.getByRole('button', { name: 'Gửi yêu cầu ký VNPT SmartCA' })
  )
}

describe('SmartCaV2SigningPanel', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  it('shows password and OTP inputs', () => {
    render(<SmartCaV2SigningPanel contractId="contract-1" disabled={false} />)

    expect(screen.getByLabelText('Mật khẩu SmartCA')).toBeInTheDocument()
    expect(screen.getByLabelText('OTP SmartCA')).toBeInTheDocument()
  })

  it('keeps submit disabled until both fields are filled, and disabled without consent', () => {
    render(<SmartCaV2SigningPanel contractId="contract-1" disabled />)

    expect(
      screen.getByRole('button', { name: 'Gửi yêu cầu ký VNPT SmartCA' })
    ).toBeDisabled()
  })

  it('submits password + otp and shows the signed result', async () => {
    submitSmartCaV2Sign.mockResolvedValue(pendingSession({ status: 'signed' }))
    const onSigned = vi.fn()
    render(
      <SmartCaV2SigningPanel
        contractId="contract-1"
        disabled={false}
        onSigned={onSigned}
      />
    )

    await fillAndSubmit()

    await waitFor(() =>
      expect(submitSmartCaV2Sign).toHaveBeenCalledWith(
        'contract-1',
        expect.objectContaining({
          smartCaPassword: 'Secret@123',
          smartCaOtp: '123456',
          idempotencyKey: expect.any(String),
        })
      )
    )
    await waitFor(() => expect(onSigned).toHaveBeenCalledTimes(1))
    expect(screen.getByRole('status')).toHaveTextContent(
      'bằng chứng giao dịch SmartCA đã được xác minh'
    )
  })

  it('clears password and otp from the form after submit', async () => {
    submitSmartCaV2Sign.mockResolvedValue(pendingSession({ status: 'signed' }))
    render(<SmartCaV2SigningPanel contractId="contract-1" disabled={false} />)

    await fillAndSubmit()

    await waitFor(() =>
      expect(
        screen.queryByLabelText('Mật khẩu SmartCA')
      ).not.toBeInTheDocument()
    )
  })

  it('shows the rejection error from the provider', async () => {
    submitSmartCaV2Sign.mockRejectedValueOnce(
      new Error('SMARTCA_CREDENTIAL_OR_REQUEST_REJECTED')
    )
    render(<SmartCaV2SigningPanel contractId="contract-1" disabled={false} />)

    await fillAndSubmit()

    expect(await screen.findByRole('alert')).toHaveTextContent(
      'VNPT SmartCA từ chối yêu cầu'
    )
  })

  it('allows checking a pending session and cancelling it', async () => {
    submitSmartCaV2Sign.mockResolvedValue(pendingSession())
    cancelSmartCaSigningSession.mockResolvedValue(
      pendingSession({ status: 'cancelled' })
    )
    render(<SmartCaV2SigningPanel contractId="contract-1" disabled={false} />)

    await fillAndSubmit()
    await screen.findByRole('button', { name: 'Hủy giao dịch' })

    fireEvent.click(screen.getByRole('button', { name: 'Hủy giao dịch' }))

    await waitFor(() =>
      expect(screen.getByRole('alert')).toHaveTextContent('không thành công')
    )
  })
})
