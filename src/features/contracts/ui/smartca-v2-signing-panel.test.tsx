import { fireEvent, render, screen, waitFor } from '@testing-library/react'
import { beforeEach, describe, expect, it, vi } from 'vitest'
import { SmartCaV2SigningPanel } from './smartca-v2-signing-panel'

const {
  cancelSmartCaSigningSession,
  getSmartCaCertificates,
  pollSmartCaSigningSession,
  submitSmartCaV2Sign,
} = vi.hoisted(() => ({
  cancelSmartCaSigningSession: vi.fn(),
  getSmartCaCertificates: vi.fn(),
  pollSmartCaSigningSession: vi.fn(),
  submitSmartCaV2Sign: vi.fn(),
}))

vi.mock('../api/contracts-api', () => ({
  cancelSmartCaSigningSession,
  getSmartCaCertificates,
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
    getSmartCaCertificates.mockResolvedValue({ certificates: [] })
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

  describe('certificate choice', () => {
    const TWO = {
      certificates: [
        {
          serialNumber: '5401010145290e7cd66ea0054c69c163',
          subject: 'CN=NGUYEN VAN A, UID=CCCD:079204001234, O=VNPT',
          validTo: '2027-10-11T00:00:00.000Z',
        },
        {
          serialNumber: '54010101c50b97a80d8bf76d6488494d',
          subject: 'CN=NGUYEN VAN A (TH), UID=CCCD:079204001234',
          validTo: '2027-10-11T00:00:00.000Z',
        },
      ],
    }

    it('lists several certificates by name without leaking the ID or the full serial', async () => {
      getSmartCaCertificates.mockResolvedValue(TWO)
      render(<SmartCaV2SigningPanel contractId="contract-1" disabled={false} />)

      const radios = await screen.findAllByRole('radio')
      expect(radios).toHaveLength(2)
      expect(document.body.textContent).not.toContain('079204001234')
      expect(document.body.textContent).not.toContain(
        '54010101c50b97a80d8bf76d6488494d'
      )
    })

    it('blocks signing until one certificate is chosen, then sends its serial', async () => {
      getSmartCaCertificates.mockResolvedValue(TWO)
      submitSmartCaV2Sign.mockResolvedValue(
        pendingSession({ status: 'signed' })
      )
      render(<SmartCaV2SigningPanel contractId="contract-1" disabled={false} />)
      await screen.findAllByRole('radio')

      await fillAndSubmit()
      expect(submitSmartCaV2Sign).not.toHaveBeenCalled()

      fireEvent.click(screen.getByLabelText(/NGUYEN VAN A \(TH\)/))
      await fillAndSubmit()

      await waitFor(() =>
        expect(submitSmartCaV2Sign).toHaveBeenCalledWith(
          'contract-1',
          expect.objectContaining({
            certificateSerial: '54010101c50b97a80d8bf76d6488494d',
          })
        )
      )
    })

    it('preselects the integrated certificate and blocks an ordinary choice', async () => {
      getSmartCaCertificates.mockResolvedValue({
        certificates: [
          {
            serialNumber: 'ORDINARY0c163',
            serviceType: 'SMARTCA',
            subject: 'CN=NGUYEN VAN A',
          },
          {
            serialNumber: 'INTEGRATED494d',
            serviceType: 'ESEAL',
            subject: 'CN=NGUYEN VAN A',
          },
        ],
      })
      submitSmartCaV2Sign.mockResolvedValue(
        pendingSession({ status: 'signed' })
      )
      render(<SmartCaV2SigningPanel contractId="contract-1" disabled={false} />)
      const radios = (await screen.findAllByRole('radio')) as HTMLInputElement[]
      expect(radios.filter(radio => radio.checked)).toHaveLength(1)
      expect(
        screen.getByLabelText(/Chứng thư tích hợp \(eSeal\)/)
      ).toBeChecked()

      fireEvent.click(screen.getByLabelText(/Chứng thư thường \(SmartCA\)/))
      expect(await screen.findByRole('alert')).toHaveTextContent(
        'Hãy chọn chứng thư tích hợp'
      )
      await fillAndSubmit()
      expect(submitSmartCaV2Sign).not.toHaveBeenCalled()
    })

    it('picks the only certificate automatically and shows no chooser', async () => {
      getSmartCaCertificates.mockResolvedValue({
        certificates: [TWO.certificates[0]],
      })
      submitSmartCaV2Sign.mockResolvedValue(
        pendingSession({ status: 'signed' })
      )
      render(<SmartCaV2SigningPanel contractId="contract-1" disabled={false} />)
      await waitFor(() => expect(getSmartCaCertificates).toHaveBeenCalled())
      expect(screen.queryAllByRole('radio')).toHaveLength(0)

      await fillAndSubmit()

      await waitFor(() =>
        expect(submitSmartCaV2Sign).toHaveBeenCalledWith(
          'contract-1',
          expect.objectContaining({
            certificateSerial: '5401010145290e7cd66ea0054c69c163',
          })
        )
      )
    })

    it('explains a server demand for a choice in plain Vietnamese', async () => {
      getSmartCaCertificates.mockResolvedValueOnce({ certificates: [] })
      submitSmartCaV2Sign.mockRejectedValueOnce(
        new Error('SMARTCA_CERTIFICATE_SELECTION_REQUIRED')
      )
      render(<SmartCaV2SigningPanel contractId="contract-1" disabled={false} />)

      await fillAndSubmit()

      expect(await screen.findByRole('alert')).toHaveTextContent(
        'nhiều chứng thư số'
      )
    })

    it('does not claim failure when the request was cut off', async () => {
      submitSmartCaV2Sign.mockRejectedValueOnce(new Error('Failed to fetch'))
      render(<SmartCaV2SigningPanel contractId="contract-1" disabled={false} />)

      await fillAndSubmit()

      expect(await screen.findByRole('alert')).toHaveTextContent(
        'chưa rõ đã ký hay chưa'
      )
    })
  })
})
