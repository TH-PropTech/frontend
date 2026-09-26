import { fireEvent, render, screen, waitFor } from '@testing-library/react'
import { beforeEach, describe, expect, it, vi } from 'vitest'
import { SigningCeremonyModal } from './signing-ceremony-modal'

const { createSmartCaSigningSession, getSmartCaCertificates } = vi.hoisted(
  () => ({
    createSmartCaSigningSession: vi.fn(),
    getSmartCaCertificates: vi.fn(),
  })
)

vi.mock('../api/contracts-api', () => ({
  initiateContractOtp: vi.fn(),
  verifyContractOtp: vi.fn(),
  issueSigningGrant: vi.fn(),
  signContract: vi.fn(),
  verifySigner: vi.fn(),
  createSmartCaSigningSession,
  getSmartCaCertificates,
}))

const props = {
  isOpen: true,
  onClose: vi.fn(),
  contractId: 'c1',
  contractCode: 'HD-101',
  signerName: 'Trần Thị Thuê',
  signerRole: 'tenant' as const,
}

function renderModal() {
  return render(<SigningCeremonyModal {...props} />)
}

async function openSmartCaForm(): Promise<void> {
  fireEvent.click(screen.getByLabelText('Xác nhận đồng thuận'))
  fireEvent.click(
    screen.getByRole('button', { name: 'Chuẩn bị ký VNPT SmartCA' })
  )
  await screen.findByLabelText('Mật khẩu VNPT SmartCA')
}

function enterSmartCaCredentials(
  password = 'password-redacted',
  otp = '654321'
): void {
  fireEvent.change(screen.getByLabelText('Mật khẩu VNPT SmartCA'), {
    target: { value: password },
  })
  fireEvent.change(screen.getByLabelText('OTP VNPT SmartCA'), {
    target: { value: otp },
  })
}

describe('SigningCeremonyModal', () => {
  beforeEach(() => {
    vi.clearAllMocks()
    getSmartCaCertificates.mockResolvedValue({
      certificates: [
        {
          serialNumber: 'SERIAL-001',
          subject: 'CN=Test Tenant',
          issuer: 'CN=VNPT Test CA',
          validFrom: '2026-01-01T00:00:00.000Z',
          validTo: '2099-01-01T00:00:00.000Z',
        },
      ],
    })
  })

  it('renders nothing when isOpen is false', () => {
    const { container } = render(
      <SigningCeremonyModal {...props} isOpen={false} />
    )
    expect(container.firstChild).toBeNull()
  })

  it('preserves the face verification and internal Smart OTP ceremony', () => {
    renderModal()

    expect(screen.getByTestId('signing-ceremony-modal')).toBeInTheDocument()
    expect(screen.getByText('Xác nhận ký số VNPT SmartCA')).toBeInTheDocument()
    const startButton = screen.getByLabelText('Bắt đầu ký kết')
    expect(startButton).toBeDisabled()

    fireEvent.click(screen.getByLabelText('Xác nhận đồng thuận'))
    fireEvent.click(startButton)

    expect(screen.getByTestId('face-verify-camera')).toBeInTheDocument()
  })

  it('loads one certificate, validates transient credentials and signs with VNPT OTP', async () => {
    createSmartCaSigningSession.mockResolvedValue({
      id: 'session-1',
      contractId: 'c1',
      signerId: 'tenant-1',
      signerRole: 'tenant',
      artifactHash: 'a'.repeat(64),
      providerTransactionId: 'sca-signed-1',
      status: 'signed',
      expiresAt: '2030-01-01T00:00:00.000Z',
    })
    renderModal()

    await openSmartCaForm()
    expect(screen.getByDisplayValue('SERIAL-001')).toBeInTheDocument()
    const submit = screen.getByRole('button', {
      name: 'Xác nhận ký VNPT SmartCA',
    })
    expect(submit).toBeDisabled()
    enterSmartCaCredentials()
    expect(submit).toBeEnabled()
    fireEvent.click(submit)

    await waitFor(() =>
      expect(createSmartCaSigningSession).toHaveBeenCalledWith(
        'c1',
        expect.objectContaining({
          certificateSerial: 'SERIAL-001',
          smartCaPassword: 'password-redacted',
          smartCaOtp: '654321',
          idempotencyKey: expect.any(String),
        })
      )
    )
    expect(screen.getByTestId('smartca-session-status')).toHaveTextContent(
      'bằng chứng giao dịch SmartCA đã được xác minh'
    )
    expect(screen.getByLabelText('Mật khẩu VNPT SmartCA')).toHaveValue('')
    expect(screen.getByLabelText('OTP VNPT SmartCA')).toHaveValue('')
  })

  it('requires explicit selection when multiple certificates are available', async () => {
    getSmartCaCertificates.mockResolvedValueOnce({
      certificates: [
        { serialNumber: 'SERIAL-001', subject: 'CN=First' },
        { serialNumber: 'SERIAL-002', subject: 'CN=Second' },
      ],
    })
    renderModal()

    await openSmartCaForm()
    const selector = screen.getByLabelText('Chứng thư VNPT SmartCA')
    expect(selector).toHaveValue('')
    fireEvent.change(selector, { target: { value: 'SERIAL-002' } })
    expect(selector).toHaveValue('SERIAL-002')
  })

  it('renders empty and provider-error certificate states with retry action', async () => {
    getSmartCaCertificates.mockResolvedValueOnce({ certificates: [] })
    renderModal()
    fireEvent.click(screen.getByLabelText('Xác nhận đồng thuận'))
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

  it('keeps one idempotency key across retry and clears credentials after each request', async () => {
    createSmartCaSigningSession
      .mockRejectedValueOnce(new Error('SMARTCA_PROVIDER_UNAVAILABLE'))
      .mockResolvedValueOnce({
        id: 'session-1',
        contractId: 'c1',
        signerId: 'tenant-1',
        signerRole: 'tenant',
        artifactHash: 'a'.repeat(64),
        providerTransactionId: 'sca-signed-1',
        status: 'signed',
        expiresAt: '2030-01-01T00:00:00.000Z',
      })
    renderModal()
    await openSmartCaForm()

    enterSmartCaCredentials('first-password', '111111')
    fireEvent.click(
      screen.getByRole('button', { name: 'Xác nhận ký VNPT SmartCA' })
    )
    await screen.findByText(/SMARTCA_PROVIDER_UNAVAILABLE/)
    expect(screen.getByLabelText('Mật khẩu VNPT SmartCA')).toHaveValue('')
    expect(screen.getByLabelText('OTP VNPT SmartCA')).toHaveValue('')

    enterSmartCaCredentials('second-password', '222222')
    fireEvent.click(
      screen.getByRole('button', { name: 'Xác nhận ký VNPT SmartCA' })
    )
    await waitFor(() =>
      expect(createSmartCaSigningSession).toHaveBeenCalledTimes(2)
    )
    const firstKey = createSmartCaSigningSession.mock.calls[0]?.[1]
      ?.idempotencyKey as string
    const secondKey = createSmartCaSigningSession.mock.calls[1]?.[1]
      ?.idempotencyKey as string
    expect(secondKey).toBe(firstKey)
  })

  it('resets SmartCA credential UI when the modal is closed and reopened', async () => {
    const onClose = vi.fn()
    const { rerender } = render(
      <SigningCeremonyModal {...props} onClose={onClose} />
    )
    await openSmartCaForm()
    enterSmartCaCredentials()

    fireEvent.click(screen.getByLabelText('Đóng cửa sổ'))
    expect(onClose).toHaveBeenCalledTimes(1)
    rerender(
      <SigningCeremonyModal {...props} isOpen={false} onClose={onClose} />
    )
    rerender(<SigningCeremonyModal {...props} onClose={onClose} />)

    expect(
      screen.queryByLabelText('Mật khẩu VNPT SmartCA')
    ).not.toBeInTheDocument()
  })
})
