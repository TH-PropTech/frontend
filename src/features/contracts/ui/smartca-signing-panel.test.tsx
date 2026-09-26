import { fireEvent, render, screen, waitFor } from '@testing-library/react'
import { beforeEach, describe, expect, it, vi } from 'vitest'
import { SmartCaSigningPanel } from './smartca-signing-panel'

const { createSmartCaSigningSession, getSmartCaCertificates } = vi.hoisted(
  () => ({
    createSmartCaSigningSession: vi.fn(),
    getSmartCaCertificates: vi.fn(),
  })
)

vi.mock('../api/contracts-api', () => ({
  createSmartCaSigningSession,
  getSmartCaCertificates,
}))

const certificate = {
  serialNumber: 'SERIAL-001',
  subject: 'CN=Test Tenant',
  issuer: 'CN=VNPT Test CA',
  validFrom: '2026-01-01T00:00:00.000Z',
  validTo: '2099-01-01T00:00:00.000Z',
}

async function loadCertificateForm(): Promise<void> {
  fireEvent.click(
    screen.getByRole('button', { name: 'Chuẩn bị ký VNPT SmartCA' })
  )
  await screen.findByLabelText('Mật khẩu VNPT SmartCA')
}

describe('SmartCaSigningPanel', () => {
  beforeEach(() => {
    vi.clearAllMocks()
    getSmartCaCertificates.mockResolvedValue({ certificates: [certificate] })
  })

  it('keeps preparation disabled until the parent ceremony has consent', () => {
    render(<SmartCaSigningPanel contractId="contract-1" disabled />)

    expect(
      screen.getByRole('button', { name: 'Chuẩn bị ký VNPT SmartCA' })
    ).toBeDisabled()
    expect(screen.queryByLabelText('OTP VNPT SmartCA')).not.toBeInTheDocument()
  })

  it('submits one auto-selected certificate and clears transient credentials', async () => {
    createSmartCaSigningSession.mockResolvedValue({
      id: 'session-1',
      contractId: 'contract-1',
      signerId: 'tenant-1',
      signerRole: 'tenant',
      artifactHash: 'a'.repeat(64),
      providerTransactionId: 'provider-tx-1',
      status: 'signed',
      expiresAt: '2030-01-01T00:00:00.000Z',
    })
    render(<SmartCaSigningPanel contractId="contract-1" disabled={false} />)
    await loadCertificateForm()

    fireEvent.change(screen.getByLabelText('Mật khẩu VNPT SmartCA'), {
      target: { value: 'password-redacted' },
    })
    fireEvent.change(screen.getByLabelText('OTP VNPT SmartCA'), {
      target: { value: '000000' },
    })
    fireEvent.click(
      screen.getByRole('button', { name: 'Xác nhận ký VNPT SmartCA' })
    )

    await waitFor(() =>
      expect(createSmartCaSigningSession).toHaveBeenCalledWith(
        'contract-1',
        expect.objectContaining({
          certificateSerial: 'SERIAL-001',
          smartCaPassword: 'password-redacted',
          smartCaOtp: '000000',
          idempotencyKey: expect.any(String),
        })
      )
    )
    expect(screen.getByLabelText('Mật khẩu VNPT SmartCA')).toHaveValue('')
    expect(screen.getByLabelText('OTP VNPT SmartCA')).toHaveValue('')
    expect(screen.getByRole('status')).toHaveTextContent(
      'bằng chứng giao dịch SmartCA đã được xác minh'
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

  it('clears credentials after a rejected request without leaking them into the error', async () => {
    createSmartCaSigningSession.mockRejectedValueOnce(
      new Error('SMARTCA_CREDENTIAL_OR_REQUEST_REJECTED')
    )
    render(<SmartCaSigningPanel contractId="contract-1" disabled={false} />)
    await loadCertificateForm()
    fireEvent.change(screen.getByLabelText('Mật khẩu VNPT SmartCA'), {
      target: { value: 'password-redacted' },
    })
    fireEvent.change(screen.getByLabelText('OTP VNPT SmartCA'), {
      target: { value: '000000' },
    })
    fireEvent.click(
      screen.getByRole('button', { name: 'Xác nhận ký VNPT SmartCA' })
    )

    expect(await screen.findByRole('alert')).toHaveTextContent(
      'SMARTCA_CREDENTIAL_OR_REQUEST_REJECTED'
    )
    expect(screen.getByRole('alert')).not.toHaveTextContent('password-redacted')
    expect(screen.getByLabelText('Mật khẩu VNPT SmartCA')).toHaveValue('')
    expect(screen.getByLabelText('OTP VNPT SmartCA')).toHaveValue('')
  })
})
