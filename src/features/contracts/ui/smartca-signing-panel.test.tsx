import { act, fireEvent, render, screen, waitFor } from '@testing-library/react'
import { beforeEach, describe, expect, it, vi } from 'vitest'
import { SmartCaSigningPanel } from './smartca-signing-panel'

const {
  cancelSmartCaSigningSession,
  createSmartCaSigningSession,
  getSmartCaCertificates,
  getSmartCaSigningSession,
  pollSmartCaSigningSession,
  realtimeClient,
} = vi.hoisted(() => ({
  cancelSmartCaSigningSession: vi.fn(),
  createSmartCaSigningSession: vi.fn(),
  getSmartCaCertificates: vi.fn(),
  getSmartCaSigningSession: vi.fn(),
  pollSmartCaSigningSession: vi.fn(),
  realtimeClient: {
    subscribe: vi.fn(),
    unsubscribe: vi.fn(),
    dispose: vi.fn(),
  },
}))

let realtimeOptions: {
  onConnectionStateChange?: (state: string) => void
} = {}

vi.mock('../api/contracts-api', () => ({
  cancelSmartCaSigningSession,
  createSmartCaSigningSession,
  getSmartCaCertificates,
  getSmartCaSigningSession,
  pollSmartCaSigningSession,
}))

vi.mock('../api/smartca-events-client', () => ({
  createSmartCaEventsClient: (options: typeof realtimeOptions) => {
    realtimeOptions = options
    return realtimeClient
  },
}))

const certificate = {
  serialNumber: 'SERIAL-001',
  subject: 'CN=Test Tenant',
  issuer: 'CN=VNPT Test CA',
  validFrom: '2026-01-01T00:00:00.000Z',
  validTo: '2099-01-01T00:00:00.000Z',
}

function pendingSession(overrides: Record<string, unknown> = {}) {
  return {
    id: 'session-1',
    contractId: 'contract-1',
    signerId: 'tenant-1',
    signerRole: 'tenant',
    artifactHash: 'a'.repeat(64),
    providerTransactionId: 'provider-tx-1',
    status: 'pending',
    documentId: 'contract-contract-1-r1',
    expiresAt: new Date(Date.now() + 15 * 60 * 1000).toISOString(),
    ...overrides,
  }
}

async function loadCertificateForm(): Promise<void> {
  fireEvent.click(
    screen.getByRole('button', { name: 'Chuẩn bị ký VNPT SmartCA' })
  )
  await screen.findByRole('button', { name: 'Gửi yêu cầu ký VNPT SmartCA' })
}

describe('SmartCaSigningPanel', () => {
  beforeEach(() => {
    vi.clearAllMocks()
    realtimeOptions = {}
    getSmartCaCertificates.mockResolvedValue({ certificates: [certificate] })
  })

  it('keeps preparation disabled until the parent ceremony has consent', () => {
    render(<SmartCaSigningPanel contractId="contract-1" disabled />)

    expect(
      screen.getByRole('button', { name: 'Chuẩn bị ký VNPT SmartCA' })
    ).toBeDisabled()
    expect(
      screen.queryByLabelText('Chứng thư VNPT SmartCA')
    ).not.toBeInTheDocument()
  })

  it('never shows a password or OTP input', async () => {
    render(<SmartCaSigningPanel contractId="contract-1" disabled={false} />)
    await loadCertificateForm()

    expect(screen.queryByLabelText(/mật khẩu/i)).not.toBeInTheDocument()
    expect(screen.queryByLabelText(/otp/i)).not.toBeInTheDocument()
    expect(
      document.querySelector('[data-testid="smartca-password"]')
    ).not.toBeInTheDocument()
    expect(
      document.querySelector('[data-testid="smartca-otp"]')
    ).not.toBeInTheDocument()
  })

  it('submits one auto-selected certificate and shows the pending doc_id', async () => {
    createSmartCaSigningSession.mockResolvedValue(pendingSession())
    render(<SmartCaSigningPanel contractId="contract-1" disabled={false} />)
    await loadCertificateForm()

    fireEvent.click(
      screen.getByRole('button', { name: 'Gửi yêu cầu ký VNPT SmartCA' })
    )

    await waitFor(() =>
      expect(createSmartCaSigningSession).toHaveBeenCalledWith(
        'contract-1',
        expect.objectContaining({
          certificateSerial: 'SERIAL-001',
          idempotencyKey: expect.any(String),
        })
      )
    )
    expect(screen.getByRole('status')).toHaveTextContent(
      'Đang chờ duyệt trong app VNPT SmartCA'
    )
    expect(screen.getByRole('status')).toHaveTextContent(
      'contract-contract-1-r1'
    )
  })

  it('requires selection at the multiple-certificate boundary', async () => {
    getSmartCaCertificates.mockResolvedValueOnce({
      certificates: [
        certificate,
        { ...certificate, serialNumber: 'SERIAL-002' },
      ],
    })
    render(<SmartCaSigningPanel contractId="contract-1" disabled={false} />)
    await loadCertificateForm()

    const selector = screen.getByLabelText('Chứng thư VNPT SmartCA')
    expect(selector).toHaveValue('')
    fireEvent.change(selector, { target: { value: 'SERIAL-002' } })
    expect(selector).toHaveValue('SERIAL-002')
  })

  it('shows an empty state and safely retries provider failures', async () => {
    getSmartCaCertificates.mockResolvedValueOnce({ certificates: [] })
    render(<SmartCaSigningPanel contractId="contract-1" disabled={false} />)
    fireEvent.click(
      screen.getByRole('button', { name: 'Chuẩn bị ký VNPT SmartCA' })
    )
    expect(await screen.findByRole('alert')).toHaveTextContent(
      'Không có chứng thư SmartCA hợp lệ'
    )

    getSmartCaCertificates.mockRejectedValueOnce(
      new Error('SMARTCA_PROVIDER_UNAVAILABLE')
    )
    fireEvent.click(
      screen.getByRole('button', { name: 'Thử tải lại chứng thư SmartCA' })
    )
    await waitFor(() =>
      expect(screen.getByRole('alert')).toHaveTextContent(
        'SMARTCA_PROVIDER_UNAVAILABLE'
      )
    )
  })

  it('shows the rejection error without leaking anything to local storage or the DOM', async () => {
    createSmartCaSigningSession.mockRejectedValueOnce(
      new Error('SMARTCA_CREDENTIAL_OR_REQUEST_REJECTED')
    )
    render(<SmartCaSigningPanel contractId="contract-1" disabled={false} />)
    await loadCertificateForm()
    fireEvent.click(
      screen.getByRole('button', { name: 'Gửi yêu cầu ký VNPT SmartCA' })
    )

    expect(await screen.findByRole('alert')).toHaveTextContent(
      'SMARTCA_CREDENTIAL_OR_REQUEST_REJECTED'
    )
  })

  describe('event-driven status check and retry', () => {
    it('checks once from the Tôi đã ký button and transitions to signed', async () => {
      createSmartCaSigningSession.mockResolvedValue(pendingSession())
      pollSmartCaSigningSession.mockResolvedValue(
        pendingSession({ status: 'signed' })
      )
      const onSigned = vi.fn()
      render(
        <SmartCaSigningPanel
          contractId="contract-1"
          disabled={false}
          onSigned={onSigned}
        />
      )
      await loadCertificateForm()
      fireEvent.click(
        screen.getByRole('button', { name: 'Gửi yêu cầu ký VNPT SmartCA' })
      )
      await screen.findByTestId('smartca-session-status')

      fireEvent.click(
        screen.getByRole('button', {
          name: 'Tôi đã ký – Kiểm tra kết quả',
        })
      )
      await waitFor(() => expect(onSigned).toHaveBeenCalledTimes(1))
      expect(pollSmartCaSigningSession).toHaveBeenCalledTimes(1)
      expect(screen.getByRole('status')).toHaveTextContent(
        'bằng chứng giao dịch SmartCA đã được xác minh'
      )
    })

    it('shows the manual fallback when realtime is disconnected', async () => {
      createSmartCaSigningSession.mockResolvedValue(pendingSession())
      render(<SmartCaSigningPanel contractId="contract-1" disabled={false} />)
      await loadCertificateForm()
      fireEvent.click(
        screen.getByRole('button', { name: 'Gửi yêu cầu ký VNPT SmartCA' })
      )
      await screen.findByTestId('smartca-session-status')

      act(() => realtimeOptions.onConnectionStateChange?.('exhausted'))

      expect(await screen.findByText(/Mất kết nối/)).toBeInTheDocument()
    })

    it('allows cancelling a pending session', async () => {
      createSmartCaSigningSession.mockResolvedValue(pendingSession())
      cancelSmartCaSigningSession.mockResolvedValue(
        pendingSession({ status: 'cancelled' })
      )
      render(<SmartCaSigningPanel contractId="contract-1" disabled={false} />)
      await loadCertificateForm()
      fireEvent.click(
        screen.getByRole('button', { name: 'Gửi yêu cầu ký VNPT SmartCA' })
      )
      await screen.findByRole('button', { name: 'Hủy giao dịch' })

      fireEvent.click(screen.getByRole('button', { name: 'Hủy giao dịch' }))

      await waitFor(() =>
        expect(screen.getByRole('status')).toHaveTextContent(
          'Phiên ký VNPT SmartCA đã bị hủy'
        )
      )
    })

    it('lets the signer retry with a new idempotency key after expiry', async () => {
      createSmartCaSigningSession
        .mockResolvedValueOnce(pendingSession({ id: 'session-1' }))
        .mockResolvedValueOnce(pendingSession({ id: 'session-2' }))
      pollSmartCaSigningSession.mockResolvedValue(
        pendingSession({ id: 'session-1', status: 'expired' })
      )
      render(<SmartCaSigningPanel contractId="contract-1" disabled={false} />)
      await loadCertificateForm()
      fireEvent.click(
        screen.getByRole('button', { name: 'Gửi yêu cầu ký VNPT SmartCA' })
      )
      await waitFor(() =>
        expect(screen.getByTestId('smartca-session-status')).toBeVisible()
      )
      fireEvent.click(
        screen.getByRole('button', {
          name: 'Tôi đã ký – Kiểm tra kết quả',
        })
      )
      await waitFor(() =>
        expect(screen.getByRole('status')).toHaveTextContent(
          'Phiên ký VNPT SmartCA đã hết hạn'
        )
      )

      fireEvent.click(screen.getByRole('button', { name: 'Thử ký lại' }))

      await waitFor(() =>
        expect(createSmartCaSigningSession).toHaveBeenCalledTimes(2)
      )
      const keys = createSmartCaSigningSession.mock.calls.map(
        call => (call[1] as { idempotencyKey: string }).idempotencyKey
      )
      expect(keys[0]).not.toBe(keys[1])
    })
  })
})
