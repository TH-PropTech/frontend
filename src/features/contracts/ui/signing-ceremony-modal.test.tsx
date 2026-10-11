import { fireEvent, render, screen, waitFor } from '@testing-library/react'
import { beforeEach, describe, expect, it, vi } from 'vitest'
import { SigningCeremonyModal } from './signing-ceremony-modal'

const {
  cancelSmartCaSigningSession,
  createSmartCaSigningSession,
  getSmartCaCertificates,
  pollSmartCaSigningSession,
} = vi.hoisted(() => ({
  cancelSmartCaSigningSession: vi.fn(),
  createSmartCaSigningSession: vi.fn(),
  getSmartCaCertificates: vi.fn(),
  pollSmartCaSigningSession: vi.fn(),
}))

vi.mock('../api/contracts-api', () => ({
  initiateContractOtp: vi.fn(),
  verifyContractOtp: vi.fn(),
  issueSigningGrant: vi.fn(),
  signContract: vi.fn(),
  verifySigner: vi.fn(),
  cancelSmartCaSigningSession,
  createSmartCaSigningSession,
  getSmartCaCertificates,
  pollSmartCaSigningSession,
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
  await screen.findByRole('button', { name: 'Gửi yêu cầu ký VNPT SmartCA' })
}

function pendingSession(overrides: Record<string, unknown> = {}) {
  return {
    id: 'session-1',
    contractId: 'c1',
    signerId: 'tenant-1',
    signerRole: 'tenant',
    artifactHash: 'a'.repeat(64),
    providerTransactionId: 'sca-1',
    status: 'pending',
    documentId: 'contract-c1-r1',
    expiresAt: new Date(Date.now() + 15 * 60 * 1000).toISOString(),
    ...overrides,
  }
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
    fireEvent.click(
      screen.getByRole('radio', { name: /Sinh trắc học [+] Smart OTP/ })
    )
    const startButton = screen.getByLabelText('Bắt đầu ký kết')
    expect(startButton).toBeDisabled()

    fireEvent.click(screen.getByLabelText('Xác nhận đồng thuận'))
    fireEvent.click(startButton)

    expect(screen.getByTestId('face-verify-camera')).toBeInTheDocument()
  })

  it('offers the signing methods as options and shows only the selected one', () => {
    renderModal()

    const smartca = screen.getByRole('radio', {
      name: /VNPT SmartCA [(]duyệt trong app[)]/,
    })
    const biometric = screen.getByRole('radio', {
      name: /Sinh trắc học [+] Smart OTP/,
    })
    expect(smartca).toHaveAttribute('aria-checked', 'true')
    expect(screen.queryByLabelText('Bắt đầu ký kết')).not.toBeInTheDocument()

    fireEvent.click(biometric)
    expect(biometric).toHaveAttribute('aria-checked', 'true')
    expect(smartca).toHaveAttribute('aria-checked', 'false')
    expect(screen.getByLabelText('Bắt đầu ký kết')).toBeInTheDocument()
    expect(
      screen.queryByRole('button', { name: 'Chuẩn bị ký VNPT SmartCA' })
    ).not.toBeInTheDocument()
  })

  it('hides the dev sign option unless the test flag is enabled', () => {
    renderModal()

    expect(
      screen.queryByRole('radio', { name: /Ký thử [(]dev sign[)]/ })
    ).not.toBeInTheDocument()
  })

  it('never shows a SmartCA password or OTP field', async () => {
    renderModal()
    await openSmartCaForm()

    expect(screen.queryByLabelText(/mật khẩu/i)).not.toBeInTheDocument()
    expect(screen.queryByLabelText(/otp vnpt/i)).not.toBeInTheDocument()
  })

  it('loads one certificate and submits a signing request without credentials', async () => {
    createSmartCaSigningSession.mockResolvedValue(pendingSession())
    renderModal()

    await openSmartCaForm()
    expect(screen.getByDisplayValue('SERIAL-001')).toBeInTheDocument()
    fireEvent.click(
      screen.getByRole('button', { name: 'Gửi yêu cầu ký VNPT SmartCA' })
    )

    await waitFor(() =>
      expect(createSmartCaSigningSession).toHaveBeenCalledWith(
        'c1',
        expect.objectContaining({
          certificateSerial: 'SERIAL-001',
          idempotencyKey: expect.any(String),
        })
      )
    )
    expect(screen.getByTestId('smartca-session-status')).toHaveTextContent(
      'Đang chờ duyệt trong app VNPT SmartCA'
    )
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

  it('keeps one idempotency key across a transient failure retry', async () => {
    createSmartCaSigningSession
      .mockRejectedValueOnce(new Error('SMARTCA_PROVIDER_UNAVAILABLE'))
      .mockResolvedValueOnce(pendingSession())
    renderModal()
    await openSmartCaForm()

    fireEvent.click(
      screen.getByRole('button', { name: 'Gửi yêu cầu ký VNPT SmartCA' })
    )
    await screen.findByText(/SMARTCA_PROVIDER_UNAVAILABLE/)

    fireEvent.click(
      screen.getByRole('button', { name: 'Gửi yêu cầu ký VNPT SmartCA' })
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

  it('resets the SmartCA signing UI when the modal is closed and reopened', async () => {
    const onClose = vi.fn()
    const { rerender } = render(
      <SigningCeremonyModal {...props} onClose={onClose} />
    )
    await openSmartCaForm()

    fireEvent.click(screen.getByLabelText('Đóng cửa sổ'))
    expect(onClose).toHaveBeenCalledTimes(1)
    rerender(
      <SigningCeremonyModal {...props} isOpen={false} onClose={onClose} />
    )
    rerender(<SigningCeremonyModal {...props} onClose={onClose} />)

    expect(
      screen.queryByRole('button', { name: 'Gửi yêu cầu ký VNPT SmartCA' })
    ).not.toBeInTheDocument()
  })
})
